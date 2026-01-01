import { useState, useEffect } from "react";
import { 
  BarChart3, 
  Users, 
  Eye, 
  Clock, 
  MessageCircle,
  Calendar,
  RefreshCw,
  LogOut,
  Loader2,
  Mail,
  Phone,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Visitor {
  id: string;
  page_path: string;
  referrer: string | null;
  created_at: string;
}

interface WhatsAppClick {
  id: string;
  button_location: string;
  page_path: string;
  created_at: string;
}

interface ContactQuery {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  project_type: string;
  education_level: string;
  field_of_study: string | null;
  deadline: string | null;
  message: string | null;
  status: string;
  created_at: string;
}

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  change, 
  changeType = "positive" 
}: { 
  title: string; 
  value: string | number; 
  icon: React.ElementType; 
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
}) => (
  <Card className="p-6 bg-card border-border/50">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-muted-foreground mb-1">{title}</p>
        <p className="text-2xl md:text-3xl font-bold text-foreground">{value}</p>
        {change && (
          <p className={`text-sm mt-2 ${
            changeType === "positive" ? "text-green-600" : 
            changeType === "negative" ? "text-red-600" : "text-muted-foreground"
          }`}>
            {change}
          </p>
        )}
      </div>
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon className="w-6 h-6 text-primary" />
      </div>
    </div>
  </Card>
);

const AdminLogin = ({ onLogin }: { onLogin: () => void }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from("admin_users")
        .select("*")
        .eq("username", username)
        .eq("password_hash", password)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        sessionStorage.setItem("adminLoggedIn", "true");
        onLogin();
        toast({ title: "Welcome!", description: "Logged in successfully." });
      } else {
        toast({ 
          title: "Invalid Credentials", 
          description: "Please check your username and password.",
          variant: "destructive" 
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({ 
        title: "Error", 
        description: "Something went wrong. Please try again.",
        variant: "destructive" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">Admin Login</h1>
          <p className="text-muted-foreground mt-2">Project Zone Dashboard</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="mt-1"
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
};

const AdminDashboard = ({ onLogout }: { onLogout: () => void }) => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [whatsappClicks, setWhatsappClicks] = useState<WhatsAppClick[]>([]);
  const [contactQueries, setContactQueries] = useState<ContactQuery[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [visitorsRes, clicksRes, queriesRes] = await Promise.all([
        supabase.from("visitors").select("*").order("created_at", { ascending: false }).limit(100),
        supabase.from("whatsapp_clicks").select("*").order("created_at", { ascending: false }).limit(100),
        supabase.from("contact_queries").select("*").order("created_at", { ascending: false }).limit(50),
      ]);

      if (visitorsRes.data) setVisitors(visitorsRes.data);
      if (clicksRes.data) setWhatsappClicks(clicksRes.data);
      if (queriesRes.data) setContactQueries(queriesRes.data);
      setLastRefresh(new Date());
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Set up realtime subscriptions
    const visitorsChannel = supabase
      .channel("visitors-realtime")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "visitors" }, (payload) => {
        setVisitors(prev => [payload.new as Visitor, ...prev].slice(0, 100));
      })
      .subscribe();

    const clicksChannel = supabase
      .channel("clicks-realtime")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "whatsapp_clicks" }, (payload) => {
        setWhatsappClicks(prev => [payload.new as WhatsAppClick, ...prev].slice(0, 100));
      })
      .subscribe();

    const queriesChannel = supabase
      .channel("queries-realtime")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "contact_queries" }, (payload) => {
        setContactQueries(prev => [payload.new as ContactQuery, ...prev].slice(0, 50));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(visitorsChannel);
      supabase.removeChannel(clicksChannel);
      supabase.removeChannel(queriesChannel);
    };
  }, []);

  const todayVisitors = visitors.filter(v => 
    new Date(v.created_at).toDateString() === new Date().toDateString()
  ).length;

  const todayClicks = whatsappClicks.filter(c => 
    new Date(c.created_at).toDateString() === new Date().toDateString()
  ).length;

  const conversionRate = visitors.length > 0 
    ? ((whatsappClicks.length / visitors.length) * 100).toFixed(1) 
    : "0";

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminLoggedIn");
    onLogout();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container px-4">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="font-bold text-xl text-foreground">Admin Dashboard</h1>
              <p className="text-xs text-muted-foreground">Project Zone Analytics (Live)</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground hidden sm:inline">
                Updated: {lastRefresh.toLocaleTimeString()}
              </span>
              <Button variant="outline" size="sm" onClick={fetchData} disabled={isLoading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard 
            title="Total Visitors" 
            value={visitors.length}
            icon={Users}
            change={`${todayVisitors} today`}
            changeType="positive"
          />
          <StatCard 
            title="Today's Visitors" 
            value={todayVisitors}
            icon={Eye}
            changeType="positive"
          />
          <StatCard 
            title="WhatsApp Clicks" 
            value={whatsappClicks.length}
            icon={MessageCircle}
            change={`${todayClicks} today`}
            changeType="positive"
          />
          <StatCard 
            title="Conversion Rate" 
            value={`${conversionRate}%`}
            icon={BarChart3}
            change="Clicks / Visitors"
            changeType="neutral"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Visitors */}
          <Card className="p-6 bg-card border-border/50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-foreground">Recent Visitors</h2>
              <Eye className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {visitors.slice(0, 10).map((visitor) => (
                <div key={visitor.id} className="flex items-center justify-between text-sm py-2 border-b border-border/30 last:border-0">
                  <div>
                    <p className="text-foreground">{visitor.page_path}</p>
                    <p className="text-xs text-muted-foreground">{visitor.referrer || "Direct"}</p>
                  </div>
                  <span className="text-muted-foreground text-xs">{formatTime(visitor.created_at)}</span>
                </div>
              ))}
              {visitors.length === 0 && (
                <p className="text-muted-foreground text-sm text-center py-4">No visitors yet</p>
              )}
            </div>
          </Card>

          {/* Recent WhatsApp Clicks */}
          <Card className="p-6 bg-card border-border/50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-foreground">WhatsApp Clicks</h2>
              <MessageCircle className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {whatsappClicks.slice(0, 10).map((click) => (
                <div key={click.id} className="flex items-center justify-between text-sm py-2 border-b border-border/30 last:border-0">
                  <div>
                    <p className="text-green-600 font-medium">{click.button_location}</p>
                    <p className="text-xs text-muted-foreground">{click.page_path}</p>
                  </div>
                  <span className="text-muted-foreground text-xs">{formatTime(click.created_at)}</span>
                </div>
              ))}
              {whatsappClicks.length === 0 && (
                <p className="text-muted-foreground text-sm text-center py-4">No clicks yet</p>
              )}
            </div>
          </Card>
        </div>

        {/* Contact Queries */}
        <Card className="p-6 bg-card border-border/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-semibold text-foreground">Contact Form Queries</h2>
              <p className="text-sm text-muted-foreground">{contactQueries.length} total submissions</p>
            </div>
            <FileText className="w-5 h-5 text-muted-foreground" />
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Contact</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Project</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Level</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Deadline</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Time</th>
                </tr>
              </thead>
              <tbody>
                {contactQueries.map((query) => (
                  <tr key={query.id} className="border-b border-border/30 last:border-0 hover:bg-muted/30">
                    <td className="py-3 px-4">
                      <p className="text-sm font-medium text-foreground">{query.name}</p>
                      <p className="text-xs text-muted-foreground">{query.field_of_study}</p>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-sm text-foreground">
                        <Mail className="w-3 h-3" />
                        {query.email}
                      </div>
                      {query.phone && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <Phone className="w-3 h-3" />
                          {query.phone}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 text-sm text-foreground">{query.project_type}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{query.education_level}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{query.deadline || "-"}</td>
                    <td className="py-3 px-4 text-xs text-muted-foreground">{formatTime(query.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {contactQueries.length === 0 && (
              <p className="text-muted-foreground text-sm text-center py-8">No contact queries yet</p>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
};

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem("adminLoggedIn") === "true";
  });

  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  return <AdminDashboard onLogout={() => setIsLoggedIn(false)} />;
};

export default Admin;

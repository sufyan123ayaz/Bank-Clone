import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  History, 
  Settings,
  Shield,
  HelpCircle
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Transfer", href: "/transfer", icon: ArrowLeftRight },
  { name: "History", href: "/history", icon: History },
  { name: "Security", href: "/security", icon: Shield },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="hidden w-64 flex-shrink-0 border-r bg-card lg:block">
      <nav className="flex h-full flex-col gap-2 p-4">
        <div className="flex-1 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )
              }
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </NavLink>
          ))}
        </div>

        <div className="border-t pt-4">
          <div className="rounded-lg bg-accent p-4">
            <div className="flex items-center gap-3">
              <HelpCircle className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-card-foreground">Need Help?</p>
                <p className="text-xs text-muted-foreground">Contact support 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
}

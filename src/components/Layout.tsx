import { Link, Outlet, useLocation } from 'react-router-dom';
import { Activity, BarChart2, Compass, Home, Search, GitCompare } from 'lucide-react';
import { cn } from '../utils/cn';

export default function Layout() {
  const location = useLocation();

  const navItems = [
    { name: 'Trending', path: '/', icon: Home },
    { name: 'Directory', path: '/directory', icon: Search },
    { name: 'Landscape Map', path: '/landscape', icon: Compass },
    { name: 'Compare', path: '/compare', icon: GitCompare },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                IndiaPulse
              </span>
            </div>
            
            <div className="hidden md:block">
              <div className="flex items-center space-x-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        isActive 
                          ? "bg-white/10 text-white" 
                          : "text-slate-300 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <Outlet />
      </main>
    </div>
  );
}

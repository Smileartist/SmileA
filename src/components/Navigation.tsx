import { Home, Search, Bell, User, BookOpen, TrendingUp, Heart, Palette, MessageCircle, Settings as SettingsIcon } from "lucide-react";
import { Button } from "./ui/button";
import logo from "figma:asset/f15460e64ff6dd326797f0cc15f4e18e934e3112.png";

interface NavigationProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function Navigation({ activeView, onViewChange }: NavigationProps) {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "search", label: "Search", icon: Search },
    { id: "trending", label: "Trending", icon: TrendingUp },
    { id: "library", label: "Library", icon: BookOpen },
    { id: "buddy", label: "Talking Buddy", icon: Heart },
  ];

  return (
    <nav 
      className="hidden md:flex fixed left-0 top-0 h-screen w-64 border-r backdrop-blur-md p-6 flex-col shadow-lg overflow-y-auto"
      style={{
        borderColor: 'var(--theme-primary)' + '33',
        backgroundColor: 'var(--theme-card-bg)',
        opacity: 0.95,
      }}
    >
      <div className="mb-8">
        <img 
          src={logo} 
          alt="Smile Artist - writes the poetry he cannot live" 
          className="w-full object-contain"
        />
      </div>

      <div className="flex-1 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all shadow-md"
              style={{
                background: activeView === item.id 
                  ? `linear-gradient(to right, var(--theme-primary), var(--theme-secondary))`
                  : 'transparent',
                color: activeView === item.id ? 'white' : 'var(--theme-text)',
              }}
              onMouseEnter={(e) => {
                if (activeView !== item.id) {
                  e.currentTarget.style.backgroundColor = 'var(--theme-accent)';
                  e.currentTarget.style.color = 'var(--theme-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeView !== item.id) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--theme-text)';
                }
              }}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="space-y-2 pt-6 border-t" style={{ borderColor: 'var(--theme-primary)' + '33' }}>
        <button 
          onClick={() => onViewChange("customize")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
            activeView === "customize"
              ? "text-white shadow-md"
              : "hover:text-white"
          }`}
          style={{
            backgroundColor: activeView === "customize" ? 'var(--theme-primary)' : 'transparent',
            color: activeView === "customize" ? 'white' : 'var(--theme-text)',
          }}
          onMouseEnter={(e) => {
            if (activeView !== "customize") {
              e.currentTarget.style.backgroundColor = 'var(--theme-accent)';
              e.currentTarget.style.color = 'var(--theme-primary)';
            }
          }}
          onMouseLeave={(e) => {
            if (activeView !== "customize") {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--theme-text)';
            }
          }}
        >
          <Palette className="w-5 h-5" />
          <span>Customize Theme</span>
        </button>
        <button 
          onClick={() => onViewChange("notifications")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
          style={{ color: 'var(--theme-text)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--theme-accent)';
            e.currentTarget.style.color = 'var(--theme-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'var(--theme-text)';
          }}
        >
          <Bell className="w-5 h-5" />
          <span>Notifications</span>
        </button>
        <button 
          onClick={() => onViewChange("profile")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
          style={{ color: 'var(--theme-text)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--theme-accent)';
            e.currentTarget.style.color = 'var(--theme-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'var(--theme-text)';
          }}
        >
          <User className="w-5 h-5" />
          <span>Profile</span>
        </button>
        <button 
          onClick={() => onViewChange("chats")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
          style={{ color: 'var(--theme-text)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--theme-accent)';
            e.currentTarget.style.color = 'var(--theme-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'var(--theme-text)';
          }}
        >
          <MessageCircle className="w-5 h-5" />
          <span>My Chats</span>
        </button>
        <button 
          onClick={() => onViewChange("settings")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
          style={{ color: 'var(--theme-text)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--theme-accent)';
            e.currentTarget.style.color = 'var(--theme-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'var(--theme-text)';
          }}
        >
          <SettingsIcon className="w-5 h-5" />
          <span>Settings</span>
        </button>
      </div>

      <Button 
        className="w-full mt-4 mb-2 text-white shadow-md rounded-xl"
        style={{
          background: `linear-gradient(to right, var(--theme-primary), var(--theme-secondary))`,
        }}
        onClick={() => onViewChange("write")}
      >
        Write
      </Button>
    </nav>
  );
}
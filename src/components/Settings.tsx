import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useTheme } from "../utils/ThemeContext";
import {
  User,
  Lock,
  Bell,
  Eye,
  EyeOff,
  Moon,
  Sun,
  Wifi,
  Database,
  Download,
  Trash2,
  Shield,
  UserX,
  LogOut,
  ChevronRight,
  Globe,
  Smartphone,
} from "lucide-react";

interface SettingsProps {
  onLogout: () => void;
  username: string;
}

export function Settings({ onLogout, username }: SettingsProps) {
  const { theme, updateTheme, resetTheme } = useTheme();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Account Privacy Settings
  const [profileVisibility, setProfileVisibility] = useState(
    localStorage.getItem("privacy_profileVisibility") || "public"
  );
  const [showEmail, setShowEmail] = useState(
    localStorage.getItem("privacy_showEmail") === "true"
  );
  const [allowMessages, setAllowMessages] = useState(
    localStorage.getItem("privacy_allowMessages") !== "false"
  );
  const [showActivity, setShowActivity] = useState(
    localStorage.getItem("privacy_showActivity") !== "false"
  );

  // App Settings
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("app_darkMode") === "true"
  );
  const [notifications, setNotifications] = useState(
    localStorage.getItem("app_notifications") !== "false"
  );
  const [autoDownload, setAutoDownload] = useState(
    localStorage.getItem("app_autoDownload") === "true"
  );
  const [dataUsage, setDataUsage] = useState(
    localStorage.getItem("app_dataUsage") || "normal"
  );
  const [language, setLanguage] = useState(
    localStorage.getItem("app_language") || "english"
  );

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem("privacy_profileVisibility", profileVisibility);
    localStorage.setItem("privacy_showEmail", showEmail.toString());
    localStorage.setItem("privacy_allowMessages", allowMessages.toString());
    localStorage.setItem("privacy_showActivity", showActivity.toString());
  }, [profileVisibility, showEmail, allowMessages, showActivity]);

  useEffect(() => {
    localStorage.setItem("app_notifications", notifications.toString());
    localStorage.setItem("app_autoDownload", autoDownload.toString());
    localStorage.setItem("app_dataUsage", dataUsage);
    localStorage.setItem("app_language", language);
  }, [notifications, autoDownload, dataUsage, language]);

  // Handle dark mode separately to avoid infinite loop
  useEffect(() => {
    localStorage.setItem("app_darkMode", darkMode.toString());

    // Apply or remove dark class from document root
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      // Also update theme context for custom colors
      updateTheme({
        backgroundColor: "#1a1515",
        textColor: "#f5e8e0",
        accentColor: "#3d2f2f",
        chatOtherMessageBg: "#2d2424",
      });
    } else {
      root.classList.remove('dark');
      // Restore light theme colors while keeping other customizations
      updateTheme({
        backgroundColor: "#fef9f5",
        textColor: "#2d2424",
        accentColor: "#fce4da",
        chatOtherMessageBg: "#ffffff",
      });
    }
  }, [darkMode]);

  const handleClearData = () => {
    if (confirm("Are you sure you want to clear all app data? This action cannot be undone.")) {
      // Clear all data except user credentials
      const user = localStorage.getItem("smileArtist_user");
      localStorage.clear();
      if (user) localStorage.setItem("smileArtist_user", user);
      alert("App data cleared successfully!");
    }
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      localStorage.clear();
      onLogout();
    }
  };

  const SettingSection = ({ title, icon: Icon, children }: any) => (
    <Card 
      className="mb-4 backdrop-blur-sm border-2 rounded-2xl overflow-hidden"
      style={{
        backgroundColor: darkMode ? 'rgba(45, 36, 36, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        borderColor: darkMode ? 'rgba(212, 117, 111, 0.3)' : 'rgba(212, 117, 111, 0.2)',
      }}
    >
      <div 
        className="p-4 border-b"
        style={{
          backgroundColor: darkMode ? 'rgba(61, 47, 47, 0.3)' : 'rgba(252, 228, 218, 0.3)',
          borderColor: darkMode ? 'rgba(212, 117, 111, 0.2)' : 'rgba(212, 117, 111, 0.1)',
        }}
      >
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5" style={{ color: '#d4756f' }} />
          <h3 style={{ color: darkMode ? '#f5e8e0' : '#2d2424' }}>{title}</h3>
        </div>
      </div>
      <div className="p-4 space-y-4">{children}</div>
    </Card>
  );

  const SettingRow = ({ label, description, children }: any) => (
    <div className="flex items-center justify-between py-2">
      <div className="flex-1">
        <p className="text-sm" style={{ color: darkMode ? '#f5e8e0' : '#2d2424' }}>{label}</p>
        {description && (
          <p className="text-xs mt-0.5" style={{ color: darkMode ? '#c9a28f' : '#8a7c74' }}>{description}</p>
        )}
      </div>
      <div>{children}</div>
    </div>
  );

  const Toggle = ({ checked, onChange }: any) => (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-12 h-6 rounded-full transition-colors ${
        checked ? "bg-[#d4756f]" : "bg-[#e0d5ce]"
      }`}
    >
      <div
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
          checked ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto pb-8">
      <div className="mb-6">
        <h2 className="mb-2" style={{ color: darkMode ? '#f5e8e0' : '#2d2424' }}>Settings</h2>
        <p className="text-sm md:text-base" style={{ color: darkMode ? '#c9a28f' : '#8a7c74' }}>
          Manage your account, privacy, and app preferences
        </p>
      </div>

      {/* Account Info */}
      <SettingSection title="Account" icon={User}>
        <div className="flex items-center gap-4 py-2">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#d4756f] to-[#c9a28f] flex items-center justify-center text-white text-xl">
            {username.charAt(0).toUpperCase()}
          </div>
          <div>
            <p style={{ color: darkMode ? '#f5e8e0' : '#2d2424' }}>{username}</p>
            <p className="text-xs" style={{ color: darkMode ? '#c9a28f' : '#8a7c74' }}>Smile Artist Member</p>
          </div>
        </div>
      </SettingSection>

      {/* Privacy Settings */}
      <SettingSection title="Privacy & Security" icon={Shield}>
        <SettingRow
          label="Profile Visibility"
          description="Who can see your profile"
        >
          <select
            value={profileVisibility}
            onChange={(e) => setProfileVisibility(e.target.value)}
            className="px-3 py-1.5 border rounded-lg text-sm focus:outline-none"
            style={{
              backgroundColor: darkMode ? '#2d2424' : 'white',
              color: darkMode ? '#f5e8e0' : '#2d2424',
              borderColor: darkMode ? 'rgba(212, 117, 111, 0.3)' : 'rgba(212, 117, 111, 0.2)',
            }}
          >
            <option value="public">Public</option>
            <option value="friends">Friends Only</option>
            <option value="private">Private</option>
          </select>
        </SettingRow>

        <SettingRow
          label="Show Email"
          description="Display email on your profile"
        >
          <Toggle checked={showEmail} onChange={setShowEmail} />
        </SettingRow>

        <SettingRow
          label="Allow Messages"
          description="Let others send you messages"
        >
          <Toggle checked={allowMessages} onChange={setAllowMessages} />
        </SettingRow>

        <SettingRow
          label="Show Activity"
          description="Display your activity status"
        >
          <Toggle checked={showActivity} onChange={setShowActivity} />
        </SettingRow>
      </SettingSection>

      {/* Notifications */}
      <SettingSection title="Notifications" icon={Bell}>
        <SettingRow
          label="Push Notifications"
          description="Receive notifications for new activity"
        >
          <Toggle checked={notifications} onChange={setNotifications} />
        </SettingRow>
      </SettingSection>

      {/* Appearance */}
      <SettingSection title="Appearance" icon={darkMode ? Moon : Sun}>
        <SettingRow
          label="Dark Mode"
          description="Use dark theme for the app"
        >
          <Toggle checked={darkMode} onChange={setDarkMode} />
        </SettingRow>
      </SettingSection>

      {/* Data & Storage */}
      <SettingSection title="Data & Storage" icon={Database}>
        <SettingRow
          label="Data Usage"
          description="Control how much data the app uses"
        >
          <select
            value={dataUsage}
            onChange={(e) => setDataUsage(e.target.value)}
            className="px-3 py-1.5 border rounded-lg text-sm focus:outline-none"
            style={{
              backgroundColor: darkMode ? '#2d2424' : 'white',
              color: darkMode ? '#f5e8e0' : '#2d2424',
              borderColor: darkMode ? 'rgba(212, 117, 111, 0.3)' : 'rgba(212, 117, 111, 0.2)',
            }}
          >
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High Quality</option>
          </select>
        </SettingRow>

        <SettingRow
          label="Auto-Download Media"
          description="Automatically download images and files"
        >
          <Toggle checked={autoDownload} onChange={setAutoDownload} />
        </SettingRow>

        <div className="pt-2 border-t border-[#d4756f]/10">
          <Button
            onClick={handleClearData}
            variant="outline"
            className="w-full justify-start text-[#d4756f] border-[#d4756f]/20 hover:bg-[#fce4da]/30 rounded-xl"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear App Data
          </Button>
        </div>
      </SettingSection>

      {/* Language */}
      <SettingSection title="Language & Region" icon={Globe}>
        <SettingRow label="App Language" description="Choose your preferred language">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-3 py-1.5 border rounded-lg text-sm focus:outline-none"
            style={{
              backgroundColor: darkMode ? '#2d2424' : 'white',
              color: darkMode ? '#f5e8e0' : '#2d2424',
              borderColor: darkMode ? 'rgba(212, 117, 111, 0.3)' : 'rgba(212, 117, 111, 0.2)',
            }}
          >
            <option value="english">English</option>
            <option value="spanish">Español</option>
            <option value="french">Français</option>
            <option value="german">Deutsch</option>
            <option value="hindi">हिन्दी</option>
          </select>
        </SettingRow>
      </SettingSection>

      {/* Account Actions */}
      <SettingSection title="Account Actions" icon={Lock}>
        <Button
          onClick={onLogout}
          variant="outline"
          className="w-full justify-start rounded-xl mb-2"
          style={{
            color: darkMode ? '#f5e8e0' : '#2d2424',
            borderColor: darkMode ? 'rgba(212, 117, 111, 0.3)' : 'rgba(212, 117, 111, 0.2)',
            backgroundColor: 'transparent',
          }}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>

        <Button
          onClick={handleDeleteAccount}
          variant="outline"
          className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 rounded-xl"
        >
          <UserX className="w-4 h-4 mr-2" />
          Delete Account
        </Button>
      </SettingSection>

      {/* App Info */}
      <Card 
        className="mt-6 p-4 backdrop-blur-sm border-2 rounded-2xl text-center"
        style={{
          backgroundColor: darkMode ? 'rgba(45, 36, 36, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          borderColor: darkMode ? 'rgba(212, 117, 111, 0.3)' : 'rgba(212, 117, 111, 0.2)',
        }}
      >
        <p className="text-xs" style={{ color: darkMode ? '#c9a28f' : '#8a7c74' }}>Smile Artist v1.0.0</p>
        <p className="text-xs mt-1" style={{ color: darkMode ? '#c9a28f' : '#8a7c74' }}>
          A safe space for poetry and connections
        </p>
      </Card>
    </div>
  );
}
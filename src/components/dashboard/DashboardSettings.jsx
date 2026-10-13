import React, { useState } from 'react';
import { useDashboard } from '../../context/useDashboard';
import { useTheme } from '../../context/useTheme';
import { Settings, Download, Upload, RefreshCw, LogOut, ShieldCheck, FileSpreadsheet, Sun, Moon } from 'lucide-react';
import { saveDashboardData } from '../../services/dashboardStorage';

export const DashboardSettings = () => {
  const { theme, setTheme } = useTheme();
  const {
    auth,
    settings,
    logout,
    showToast,
    handleExportData,
    handleImportData,
    handleResetData,
    updateItem,
  } = useDashboard();

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handlePasswordChange = (e) => {
    e.preventDefault();
    const currentSettings = settings || {};
    const expected = currentSettings.passwordHash;

    if (!expected || passwordData.currentPassword !== expected) {
      showToast('Current password incorrect', 'error');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      showToast('New password must be at least 6 characters', 'error');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showToast('New passwords do not match', 'error');
      return;
    }

    // Save updated password in settings
    updateItem('settings', currentSettings.id || 'settings', {
      ...currentSettings,
      passwordHash: passwordData.newPassword,
    });

    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    showToast('Dashboard password changed successfully!');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        handleImportData(json);
      } catch {
        showToast('Invalid JSON backup file format', 'error');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Top Title */}
      <div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-100 light:text-slate-900 tracking-tight flex items-center gap-2">
          <Settings className="w-7 h-7 text-indigo-400 light:text-indigo-600" />
          <span>Dashboard Settings & Appearance</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 light:text-slate-600 mt-1">
          Manage day/night visual mode, local storage persistence, security password, and JSON backups.
        </p>
      </div>

      {/* User Info & Avatar Upload Card */}
      <div className="p-6 rounded-3xl bg-slate-900/90 light:bg-white border border-slate-800 light:border-slate-200 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <label className="relative group cursor-pointer shrink-0" title="Click to Upload New Profile Avatar Picture">
            {auth?.user?.avatar ? (
              <img
                src={auth.user.avatar}
                alt={auth?.user?.name || 'User'}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500 shadow-lg group-hover:opacity-80 transition-opacity"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white font-mono font-extrabold text-2xl flex items-center justify-center shadow-lg group-hover:opacity-80 transition-opacity">
                {auth?.user?.name ? auth.user.name.split(' ').map(n=>n[0]).join('').slice(0, 2).toUpperCase() : 'AU'}
              </div>
            )}
            <div className="absolute inset-0 rounded-2xl bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-[10px] font-mono font-bold">
              Upload
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (evt) => {
                  const base64 = evt.target.result;
                  saveDashboardData('auth', {
                    ...auth,
                    user: { ...auth.user, avatar: base64 },
                  });
                  showToast('Profile picture updated successfully!');
                  setTimeout(() => window.location.reload(), 400);
                };
                reader.readAsDataURL(file);
              }}
              className="hidden"
            />
          </label>

          <div>
            <h3 className="font-heading font-extrabold text-lg text-slate-100 light:text-slate-900">
              {auth?.user?.name || 'Name not recorded'}
            </h3>
            <p className="text-xs font-mono text-cyan-400 light:text-indigo-600 font-semibold mb-1">
              {auth?.user?.role || 'Role not recorded'}
            </p>
            <p className="text-[11px] text-slate-400 font-mono">
              {auth?.user?.email || 'Email not recorded'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-mono font-bold shadow-md cursor-pointer transition-all flex items-center gap-2">
            <Upload className="w-4 h-4" />
            <span>Upload Photo</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (evt) => {
                  const base64 = evt.target.result;
                  saveDashboardData('auth', {
                    ...auth,
                    user: { ...auth.user, avatar: base64 },
                  });
                  showToast('Profile picture updated!');
                  setTimeout(() => window.location.reload(), 400);
                };
                reader.readAsDataURL(file);
              }}
              className="hidden"
            />
          </label>

          <button
            onClick={logout}
            className="px-4 py-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30 text-xs font-mono font-semibold flex items-center gap-2 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Lock Dashboard</span>
          </button>
        </div>
      </div>

      {/* Theme & Appearance (Day / Night Mode) Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 light:bg-white border border-slate-800 light:border-slate-200 shadow-xl space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="font-heading font-extrabold text-lg text-slate-100 light:text-slate-900 flex items-center gap-2">
              {theme === 'dark' ? (
                <Moon className="w-5 h-5 text-indigo-400 light:text-indigo-600" />
              ) : (
                <Sun className="w-5 h-5 text-amber-400 light:text-amber-500" />
              )}
              <span>Dashboard Theme & Appearance</span>
            </h2>
            <p className="text-xs text-slate-400 light:text-slate-600 mt-1">
              Switch between Day (Light) and Night (Dark) visual themes for the dashboard workspace.
            </p>
          </div>

          <div className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-800 light:bg-slate-100 text-slate-300 light:text-slate-700 border border-slate-700 light:border-slate-300">
            Active: <span className="capitalize text-cyan-400 light:text-indigo-600">{theme} Mode</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <button
            type="button"
            onClick={() => setTheme('dark')}
            className={`p-4 rounded-2xl border flex items-center gap-3 transition-all cursor-pointer ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-indigo-900/80 to-slate-900 border-indigo-500 text-white shadow-lg ring-2 ring-indigo-500/30'
                : 'bg-slate-950/60 light:bg-slate-50 border-slate-800 light:border-slate-200 text-slate-400 light:text-slate-600 hover:border-slate-600'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
              <Moon className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="font-heading font-bold text-sm text-slate-100 light:text-slate-900">Night (Dark) Mode</div>
              <div className="text-[11px] text-slate-400 light:text-slate-500">Sleek, dark workspace aesthetic</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setTheme('light')}
            className={`p-4 rounded-2xl border flex items-center gap-3 transition-all cursor-pointer ${
              theme === 'light'
                ? 'bg-gradient-to-r from-amber-500/10 to-indigo-50/80 light:bg-slate-100 border-amber-500 text-slate-900 shadow-lg ring-2 ring-amber-500/30'
                : 'bg-slate-950/60 light:bg-slate-50 border-slate-800 light:border-slate-200 text-slate-400 light:text-slate-600 hover:border-slate-600'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0">
              <Sun className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="font-heading font-bold text-sm text-slate-100 light:text-slate-900">Day (Light) Mode</div>
              <div className="text-[11px] text-slate-400 light:text-slate-500">Clean, high-contrast light aesthetic</div>
            </div>
          </button>
        </div>
      </div>

      {/* Export & Import JSON Data */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 light:bg-white border border-slate-800 light:border-slate-200 shadow-xl space-y-6">
        <h2 className="font-heading font-extrabold text-lg text-slate-100 light:text-slate-900 flex items-center gap-2">
          <FileSpreadsheet className="w-5 h-5 text-cyan-400 light:text-indigo-600" />
          <span>Data Portability & Backup</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Export JSON */}
          <div className="p-5 rounded-2xl bg-slate-950/80 light:bg-slate-50 border border-slate-800 light:border-slate-200 space-y-3">
            <h4 className="font-heading font-bold text-sm text-slate-100 light:text-slate-900">Export All Data</h4>
            <p className="text-xs text-slate-400 light:text-slate-600 leading-relaxed">
              Download your complete certificates, notes, courses, skills, and goals as a JSON backup file.
            </p>
            <button
              onClick={handleExportData}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-medium text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Export Backup JSON</span>
            </button>
          </div>

          {/* Import JSON */}
          <div className="p-5 rounded-2xl bg-slate-950/80 light:bg-slate-50 border border-slate-800 light:border-slate-200 space-y-3">
            <h4 className="font-heading font-bold text-sm text-slate-100 light:text-slate-900">Import Data File</h4>
            <p className="text-xs text-slate-400 light:text-slate-600 leading-relaxed">
              Restore your dashboard state from a previously exported JSON backup file.
            </p>
            <label className="w-full py-2.5 rounded-xl bg-slate-800/80 light:bg-slate-200 text-slate-200 light:text-slate-800 hover:text-white font-medium text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors">
              <Upload className="w-4 h-4" />
              <span>Choose JSON Backup File</span>
              <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>
        </div>
      </div>

      {/* Security Password Change */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 light:bg-white border border-slate-800 light:border-slate-200 shadow-xl space-y-6">
        <h2 className="font-heading font-extrabold text-lg text-slate-100 light:text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-amber-400 light:text-indigo-600" />
          <span>Update Access Password</span>
        </h2>

        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md text-xs font-sans">
          <div>
            <label className="block text-slate-300 light:text-slate-700 font-mono font-semibold mb-1">Current Password</label>
            <input
              type="password"
              required
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              placeholder="Enter your current password"
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 light:bg-slate-50 text-slate-100 light:text-slate-900 border border-slate-800 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-slate-300 light:text-slate-700 font-mono font-semibold mb-1">New Security Password</label>
            <input
              type="password"
              required
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              placeholder="Min 6 characters"
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 light:bg-slate-50 text-slate-100 light:text-slate-900 border border-slate-800 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-slate-300 light:text-slate-700 font-mono font-semibold mb-1">Confirm New Password</label>
            <input
              type="password"
              required
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              placeholder="Confirm password"
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 light:bg-slate-50 text-slate-100 light:text-slate-900 border border-slate-800 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-medium shadow-md cursor-pointer"
          >
            Update Security Password
          </button>
        </form>
      </div>

      {/* Clear Local Data Danger Zone */}
      <div className="p-6 rounded-3xl bg-rose-500/10 border border-rose-500/30 shadow-xl flex items-center justify-between">
        <div>
          <h3 className="font-heading font-extrabold text-base text-rose-400 light:text-rose-600">
             Clear Local Data
          </h3>
          <p className="text-xs text-slate-400 light:text-slate-600 mt-1">
             Remove all locally stored dashboard items. No sample data will be recreated.
          </p>
        </div>

        <button
          onClick={handleResetData}
          className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
           <span>Clear Dashboard Data</span>
        </button>
      </div>
    </div>
  );
};

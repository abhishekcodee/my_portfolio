// LocalStorage keys
const STORAGE_KEYS = {
  AUTH: 'abhishek_dashboard_auth',
  USERS: 'abhishek_dashboard_users',
  CERTIFICATES: 'abhishek_dashboard_certificates',
  COURSES: 'abhishek_dashboard_courses',
  NOTES: 'abhishek_dashboard_notes',
  SKILLS: 'abhishek_dashboard_skills',
  GOALS: 'abhishek_dashboard_goals',
  PROJECTS: 'abhishek_dashboard_projects',
  RESOURCES: 'abhishek_dashboard_resources',
  ACTIVITIES: 'abhishek_dashboard_activities',
  STREAK: 'abhishek_dashboard_streak',
  SETTINGS: 'abhishek_dashboard_settings',
};

const DATA_VERSION_KEY = 'abhishek_dashboard_data_version';
const EMPTY_DATA_VERSION = 'empty-dashboard-v1';

export const OWNER_EMAIL = 'abhishek@portfolio.dev';

const EMPTY_AUTH = {
  isAuthenticated: false,
  user: null,
  rememberMe: false,
};

// The dashboard has no remote source for learning data. Start empty and only
// show values that the owner explicitly adds or that a live integration returns.
const EMPTY_DASHBOARD_DATA = {
  auth: EMPTY_AUTH,
  certificates: [],
  courses: [],
  notes: [],
  skills: [],
  goals: [],
  projects: [],
  resources: [],
  activities: [],
  streak: {
    currentStreak: 0,
    longestStreak: 0,
    totalDays: 0,
    totalHours: 0,
    weeklyHours: 0,
  },
  settings: {
    passwordHash: '',
    theme: 'dark',
    notificationsEnabled: true,
    autoBackup: true,
  },
};

const ENTITY_KEYS = Object.keys(EMPTY_DASHBOARD_DATA).filter((key) => key !== 'auth');

// Helper: Get user-scoped storage key
const getScopedKey = (key, userEmail) => {
  const isOwner = !userEmail || userEmail === OWNER_EMAIL || userEmail.toLowerCase().includes('abhishek');
  const baseKey = STORAGE_KEYS[key.toUpperCase()] || key;
  if (key.toUpperCase() === 'AUTH' || key.toUpperCase() === 'USERS') return baseKey;
  return isOwner ? baseKey : `${baseKey}_${userEmail.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
};

// Get current logged-in user email
const getCurrentUserEmail = () => {
  try {
    const authData = localStorage.getItem(STORAGE_KEYS.AUTH);
    if (authData) {
      const parsed = JSON.parse(authData);
      return parsed?.user?.email || OWNER_EMAIL;
    }
  } catch {}
  return OWNER_EMAIL;
};

const writeEmptyOwnerData = () => {
  ENTITY_KEYS.forEach((key) => {
    localStorage.setItem(getScopedKey(key, OWNER_EMAIL), JSON.stringify(EMPTY_DASHBOARD_DATA[key]));
  });
};

// Initialize LocalStorage. Existing sample data is deliberately cleared once
// so it cannot continue to appear from a previous version of the application.
export const initDashboardStorage = () => {
  try {
    const currentEmail = getCurrentUserEmail();
    const isOwner = currentEmail === OWNER_EMAIL || currentEmail.toLowerCase().includes('abhishek');

    if (isOwner) {
      if (localStorage.getItem(DATA_VERSION_KEY) !== EMPTY_DATA_VERSION) {
        writeEmptyOwnerData();
        // Older versions stored streak data under this unscoped key.
        localStorage.removeItem('streak');
        localStorage.setItem(DATA_VERSION_KEY, EMPTY_DATA_VERSION);
      } else {
        ENTITY_KEYS.forEach((key) => {
          const storageKey = getScopedKey(key, OWNER_EMAIL);
          if (!localStorage.getItem(storageKey)) {
            localStorage.setItem(storageKey, JSON.stringify(EMPTY_DASHBOARD_DATA[key]));
          }
        });
      }

      if (!localStorage.getItem(STORAGE_KEYS.AUTH)) {
        localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(EMPTY_AUTH));
      }
    }
  } catch {
    console.error('Error initializing dashboard storage.');
  }
};

// Get data for key (scoped per user)
export const getDashboardData = (key) => {
  try {
    const currentEmail = getCurrentUserEmail();
    const storageKey = getScopedKey(key, currentEmail);
    const data = localStorage.getItem(storageKey);

    if (data) {
      const parsed = JSON.parse(data);
      if (key.toLowerCase() === 'auth') return parsed;
      return parsed;
    }

    if (key.toLowerCase() === 'auth') return EMPTY_AUTH;
    return EMPTY_DASHBOARD_DATA[key] ?? [];
  } catch (err) {
    console.error(`Error reading ${key} from storage:`, err);
    return key.toLowerCase() === 'auth' ? EMPTY_AUTH : EMPTY_DASHBOARD_DATA[key] ?? [];
  }
};

// Save data for key (scoped per user)
export const saveDashboardData = (key, data) => {
  try {
    const currentEmail = getCurrentUserEmail();
    const storageKey = getScopedKey(key, currentEmail);
    localStorage.setItem(storageKey, JSON.stringify(data));
  } catch (err) {
    console.error(`Error saving ${key} to storage:`, err);
  }
};

// Add item to array entity
export const addDashboardItem = (key, item) => {
  const list = getDashboardData(key) || [];
  const newItem = { id: `${key.slice(0, 4)}-${Date.now()}`, ...item };
  const updatedList = [newItem, ...list];
  saveDashboardData(key, updatedList);
  addActivityLog(`Added ${key.slice(0, -1)}`, item.title || item.name || 'New Item');
  return newItem;
};

// Update item
export const updateDashboardItem = (key, id, updatedFields) => {
  const list = getDashboardData(key) || [];
  if (!Array.isArray(list)) {
    const updatedObject = { ...list, ...updatedFields };
    saveDashboardData(key, updatedObject);
    return updatedObject;
  }
  const updatedList = list.map((item) => (item.id === id ? { ...item, ...updatedFields } : item));
  saveDashboardData(key, updatedList);
  const target = updatedList.find((item) => item.id === id);
  if (target) addActivityLog(`Updated ${key.slice(0, -1)}`, target.title || target.name || 'Item');
  return updatedList;
};

// Delete item
export const deleteDashboardItem = (key, id) => {
  const list = getDashboardData(key) || [];
  const target = list.find((item) => item.id === id);
  const updatedList = list.filter((item) => item.id !== id);
  saveDashboardData(key, updatedList);
  if (target) addActivityLog(`Deleted ${key.slice(0, -1)}`, target.title || target.name || 'Item');
  return updatedList;
};

// Add activity log
export const addActivityLog = (action, title) => {
  const activities = getDashboardData('activities') || [];
  const now = new Date();
  const timestamp = `${now.toISOString().split('T')[0]} ${now.toTimeString().slice(0, 5)}`;
  const newLog = {
    id: `act-${Date.now()}`,
    action,
    title,
    timestamp,
    icon: 'Activity',
  };
  saveDashboardData('activities', [newLog, ...activities.slice(0, 49)]);
};

// OTP delivery remains a separate authentication concern, not dashboard data.
export const sendEmailOTP = async (email) => {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const otpData = {
    code,
    expiresAt: Date.now() + 5 * 60 * 1000,
  };
  localStorage.setItem(`otp_${email.toLowerCase()}`, JSON.stringify(otpData));

  try {
    await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: 'service_portfolio_otp',
        template_id: 'template_otp_verify',
        user_id: 'public_key_demo',
        template_params: { to_email: email, otp_code: code },
      }),
    });
  } catch {}

  return { success: true, code };
};

export const verifyEmailOTP = (email, enteredOtp) => {
  try {
    const savedObj = localStorage.getItem(`otp_${email.toLowerCase()}`);
    if (!savedObj) return { success: false, error: 'OTP expired or not sent. Request a new OTP code.' };
    const { code, expiresAt } = JSON.parse(savedObj);
    if (Date.now() > expiresAt) return { success: false, error: 'OTP code has expired. Request a new OTP.' };
    if (code !== enteredOtp.trim()) return { success: false, error: 'Incorrect 6-digit OTP code.' };

    localStorage.removeItem(`otp_${email.toLowerCase()}`);
    return { success: true };
  } catch {
    return { success: false, error: 'Failed to verify OTP' };
  }
};

// Export JSON
export const exportDashboardJSON = () => {
  const exportObject = {};
  Object.keys(STORAGE_KEYS).forEach((key) => {
    exportObject[key.toLowerCase()] = getDashboardData(key.toLowerCase());
  });
  return JSON.stringify(exportObject, null, 2);
};

// Import JSON
export const importDashboardJSON = (jsonObject) => {
  try {
    Object.keys(jsonObject).forEach((key) => {
      saveDashboardData(key.toLowerCase(), jsonObject[key]);
    });
    return true;
  } catch (err) {
    console.error('Failed to import dashboard JSON:', err);
    return false;
  }
};

// Reset to an empty dashboard, never to sample data.
export const resetDashboardToDefault = () => {
  writeEmptyOwnerData();
  localStorage.setItem(DATA_VERSION_KEY, EMPTY_DATA_VERSION);
};

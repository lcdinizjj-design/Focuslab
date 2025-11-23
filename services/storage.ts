export const StorageService = {
  save: (key: string, data: any) => {
    try {
      localStorage.setItem(`focuslab_${key}`, JSON.stringify(data));
    } catch (e) {
      console.error("Storage Save Error", e);
    }
  },
  get: (key: string, fallback: any) => {
    try {
      const item = localStorage.getItem(`focuslab_${key}`);
      return item ? JSON.parse(item) : fallback;
    } catch (e) {
      return fallback;
    }
  },
  clear: () => {
    localStorage.clear();
  },
  // Auth Simulation
  getUsersDB: (): any[] => {
    try {
      const item = localStorage.getItem('focuslab_users_db');
      return item ? JSON.parse(item) : [];
    } catch {
      return [];
    }
  },
  registerUserToDB: (userData: any) => {
    const users = StorageService.getUsersDB();
    users.push(userData);
    localStorage.setItem('focuslab_users_db', JSON.stringify(users));
  },
  checkEmailExists: (email: string): boolean => {
    const users = StorageService.getUsersDB();
    return users.some((u: any) => u.email === email);
  }
};
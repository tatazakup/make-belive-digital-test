export const LocalStorageUtil = {
  setItem: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting item in localStorage:", error);
    }
  },

  getItem: <T>(key: string): T | null => {
    try {
      const storedItem = localStorage.getItem(key);
      return storedItem ? (JSON.parse(storedItem) as T) : null;
    } catch (error) {
      console.error("Error getting item from localStorage:", error);
      return null;
    }
  },

  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing item from localStorage:", error);
    }
  },

  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  },
};

// // Example usage:
// LocalStorageUtil.setItem("user", { name: "John", age: 30 });
// const user = LocalStorageUtil.getItem<{ name: string; age: number }>("user");
// console.log(user);

// // Remove the "user" item from localStorage
// LocalStorageUtil.removeItem("user");

// // Clear all items from localStorage
// LocalStorageUtil.clear();

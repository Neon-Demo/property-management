/**
 * Utility functions for working with localStorage for offline support
 */

// Type for items that can be stored
export type StorableItem = {
  id: string;
  [key: string]: any;
};

/**
 * Save an item to localStorage
 */
export function saveItem<T extends StorableItem>(key: string, item: T): void {
  try {
    const existingItems = getItems<T>(key);
    const itemIndex = existingItems.findIndex((i) => i.id === item.id);
    
    if (itemIndex >= 0) {
      // Update existing item
      existingItems[itemIndex] = item;
    } else {
      // Add new item
      existingItems.push(item);
    }
    
    localStorage.setItem(key, JSON.stringify(existingItems));
  } catch (error) {
    console.error(`Error saving item to localStorage: ${error}`);
  }
}

/**
 * Get all items from localStorage
 */
export function getItems<T>(key: string): T[] {
  try {
    const items = localStorage.getItem(key);
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.error(`Error getting items from localStorage: ${error}`);
    return [];
  }
}

/**
 * Get a single item by ID from localStorage
 */
export function getItemById<T extends StorableItem>(key: string, id: string): T | null {
  try {
    const items = getItems<T>(key);
    return items.find((item) => item.id === id) || null;
  } catch (error) {
    console.error(`Error getting item from localStorage: ${error}`);
    return null;
  }
}

/**
 * Remove an item from localStorage
 */
export function removeItem(key: string, id: string): void {
  try {
    const items = getItems(key);
    const filteredItems = items.filter((item) => item.id !== id);
    localStorage.setItem(key, JSON.stringify(filteredItems));
  } catch (error) {
    console.error(`Error removing item from localStorage: ${error}`);
  }
}

/**
 * Clear all items for a specific key
 */
export function clearItems(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error clearing items from localStorage: ${error}`);
  }
}

/**
 * Check if localStorage is available
 */
export function isStorageAvailable(): boolean {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Store the timestamp of last sync
 */
export function setLastSyncTime(key: string, timestamp = Date.now()): void {
  try {
    localStorage.setItem(`${key}_last_sync`, timestamp.toString());
  } catch (error) {
    console.error(`Error setting last sync time: ${error}`);
  }
}

/**
 * Get the timestamp of last sync
 */
export function getLastSyncTime(key: string): number | null {
  try {
    const timestamp = localStorage.getItem(`${key}_last_sync`);
    return timestamp ? parseInt(timestamp, 10) : null;
  } catch (error) {
    console.error(`Error getting last sync time: ${error}`);
    return null;
  }
}
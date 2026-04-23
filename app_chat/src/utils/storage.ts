/**
 * Utility for persisting state to localStorage
 */

export const storage = {
    /**
     * Saves data to localStorage
     */
    save: <T>(key: string, data: T): void => {
        try {
            const serializedData = JSON.stringify(data);
            localStorage.setItem(key, serializedData);
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    },

    /**
     * Loads data from localStorage
     */
    load: <T>(key: string): T | null => {
        try {
            const serializedData = localStorage.getItem(key);
            if (serializedData === null) {
                return null;
            }
            return JSON.parse(serializedData) as T;
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            // If data is corrupted, clear the entry
            localStorage.removeItem(key);
            return null;
        }
    },

    /**
     * Removes data from localStorage
     */
    remove: (key: string): void => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing from localStorage:', error);
        }
    }
};

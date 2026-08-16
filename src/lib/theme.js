import { useSyncExternalStore } from 'react';

// PERFORMANCE: A tiny external store for the light/dark section theme.
// Only the components that actually change colors (Header, SocialProof)
// subscribe to it, so crossing a dark section no longer re-renders the
// entire page tree mid-scroll.
const listeners = new Set();
let currentTheme = 'light';

export const themeStore = {
    get: () => currentTheme,
    set(next) {
        if (next === currentTheme) return;
        currentTheme = next;
        if (typeof document !== 'undefined') {
            // Drives pure-CSS consumers (e.g. the fixed background layer)
            // without any React work at all.
            document.documentElement.dataset.theme = next;
        }
        listeners.forEach((listener) => listener());
    },
    subscribe(listener) {
        listeners.add(listener);
        return () => listeners.delete(listener);
    },
};

const getServerSnapshot = () => 'light';

export function useTheme() {
    return useSyncExternalStore(themeStore.subscribe, themeStore.get, getServerSnapshot);
}

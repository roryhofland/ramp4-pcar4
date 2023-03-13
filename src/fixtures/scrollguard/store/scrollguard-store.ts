import { defineStore } from 'pinia';
import type { ScrollguardState } from './scrollguard-state';

export const useScrollguardStore = defineStore('scrollguard', {
    state: (): ScrollguardState => ({ enabled: false }),
    actions: {
        setEnabled(value: boolean) {
            this.enabled = value;
        }
    }
});

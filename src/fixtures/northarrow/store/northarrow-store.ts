import { defineStore } from 'pinia';
import type { NortharrowState } from './northarrow-state';

export const useNortharrowStore = defineStore('northarrow', {
    state: (): NortharrowState => ({
        arrowIcon: '',
        poleIcon: ''
    })
});

import { defineStore } from 'pinia';
import type { MetadataState } from './metadata-state';

export const useMetadataStore = defineStore('metadata', {
    state: (): MetadataState => ({
        status: '',
        response: ''
    })
});

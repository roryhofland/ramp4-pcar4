import { defineStore } from 'pinia';
import type { OverviewmapState } from './overviewmap-state';

export const useOverviewmapStore = defineStore('overview-map', {
    state: (): OverviewmapState => ({
        mapConfig: undefined,
        basemaps: {},
        startMinimized: true,
        expandFactor: 1.5,
        borderColour: '#FF0000',
        borderWidth: 1,
        areaColour: '#000000',
        areaOpacity: 0.25
    }),
    actions: {
        updateIntialBasemap(basemapId: string) {
            this.mapConfig.initialBasemapId = basemapId;
        }
    }
});

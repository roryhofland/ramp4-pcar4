import { defineStore } from 'pinia';
import { LayerType } from '@/geo/api';
import { WizardStep, type WizardState } from './wizard-state';

export const useWizardStore = defineStore('wizard', {
    state: (): WizardState => ({
        layerSource: null,
        url: '',
        typeSelection: '',
        fileData: null,
        layerInfo: {
            config: {
                id: 'Placeholder',
                layerType: LayerType.UNKNOWN,
                url: ''
            },
            configOptions: []
        },
        step: WizardStep.UPLOAD
    }),
    actions: {
        goToStep(step: WizardStep) {
            switch (this.step) {
                case WizardStep.UPLOAD:
                    if (step === WizardStep.UPLOAD) {
                        this.url = '';
                    } else if (step === WizardStep.FORMAT) {
                        // go to next step
                        this.step = WizardStep.FORMAT;
                    }
                    break;
                case WizardStep.FORMAT:
                    if (step === WizardStep.UPLOAD) {
                        // go to previous step
                        if (this.fileData) {
                            // only reset url if a file was uploaded
                            this.url = '';
                            this.fileData = null;
                        }
                        this.typeSelection = '';
                        this.step = WizardStep.UPLOAD;
                    } else if (step === WizardStep.CONFIGURE) {
                        // go to next step
                        this.step = WizardStep.CONFIGURE;
                    }
                    break;
                case WizardStep.CONFIGURE:
                    if (step === WizardStep.UPLOAD) {
                        // reset everything
                        this.url = '';
                        this.typeSelection = '';
                        this.fileData = null;
                        this.layerInfo = {
                            config: null,
                            configOptions: []
                        };
                        this.step = WizardStep.UPLOAD;
                    } else if (step === WizardStep.FORMAT) {
                        // go to previous step
                        this.layerInfo = {
                            config: null,
                            configOptions: []
                        };
                        this.step = WizardStep.FORMAT;
                    }
                    break;
            }
        }
    }
});

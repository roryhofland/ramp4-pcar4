import { createInstance, geo } from '@/main';

window.debugInstance = null;

let config = {
    startingFixtures: [
        'mapnav',
        'legend',
        'appbar',
        'details',
        'grid',
        'wizard',
        'export',
        'basemap',
        'layer-reorder',
        'hilight'
    ],
    configs: {
        en: {
            map: {
                extentSets: [
                    {
                        id: 'EXT_NRCAN_Lambert_3978',
                        default: {
                            xmax: 3549492,
                            xmin: -2681457,
                            ymax: 3482193,
                            ymin: -883440,
                            spatialReference: {
                                wkid: 3978
                            }
                        }
                    }
                ],
                lodSets: [
                    {
                        id: 'LOD_NRCAN_Lambert_3978',
                        lods: geo.defaultLODs(geo.defaultTileSchemas()[0])
                    }
                ],
                tileSchemas: [
                    {
                        id: 'EXT_NRCAN_Lambert_3978#LOD_NRCAN_Lambert_3978',
                        name: 'Lambert Maps',
                        extentSetId: 'EXT_NRCAN_Lambert_3978',
                        lodSetId: 'LOD_NRCAN_Lambert_3978',
                        thumbnailTileUrls: [
                            '/tile/8/285/268',
                            '/tile/8/285/269'
                        ],
                        hasNorthPole: true
                    }
                ],
                basemaps: [
                    {
                        id: 'baseNrCan',
                        name: 'Canada Base Map - Transportation (CBMT)',
                        description:
                            'The Canada Base Map - Transportation (CBMT) web mapping services of the Earth Sciences Sector at Natural Resources Canada, are intended primarily for online mapping application users and developers.',
                        altText: 'The Canada Base Map - Transportation (CBMT)',
                        layers: [
                            {
                                id: 'CBMT',
                                layerType: 'esri-tile',
                                url: 'https://maps-cartes.services.geo.ca/server2_serveur2/rest/services/BaseMaps/CBMT3978/MapServer'
                            }
                        ],
                        tileSchemaId:
                            'EXT_NRCAN_Lambert_3978#LOD_NRCAN_Lambert_3978'
                    },
                    {
                        id: 'baseSimple',
                        name: 'Canada Base Map - Simple',
                        description: 'Canada Base Map - Simple',
                        altText: 'Canada base map - Simple',
                        layers: [
                            {
                                id: 'SMR',
                                layerType: 'esri-tile',
                                url: 'https://maps-cartes.services.geo.ca/server2_serveur2/rest/services/BaseMaps/Simple/MapServer'
                            }
                        ],
                        tileSchemaId:
                            'EXT_NRCAN_Lambert_3978#LOD_NRCAN_Lambert_3978'
                    },
                    {
                        id: 'baseCBME_CBCE_HS_RO_3978',
                        name: 'Canada Base Map - Elevation (CBME)',
                        description:
                            'The Canada Base Map - Elevation (CBME) web mapping services of the Earth Sciences Sector at Natural Resources Canada, is intended primarily for online mapping application users and developers.',
                        altText: 'Canada Base Map - Elevation (CBME)',
                        layers: [
                            {
                                id: 'CBME_CBCE_HS_RO_3978',
                                layerType: 'esri-tile',
                                url: 'https://maps-cartes.services.geo.ca/server2_serveur2/rest/services/BaseMaps/CBME_CBCE_HS_RO_3978/MapServer'
                            }
                        ],
                        tileSchemaId:
                            'EXT_NRCAN_Lambert_3978#LOD_NRCAN_Lambert_3978'
                    },
                    {
                        id: 'baseCBMT_CBCT_GEOM_3978',
                        name: 'Canada Base Map - Transportation (CBMT)',
                        description:
                            ' The Canada Base Map - Transportation (CBMT) web mapping services of the Earth Sciences Sector at Natural Resources Canada, are intended primarily for online mapping application users and developers.',
                        altText: 'Canada Base Map - Transportation (CBMT)',
                        layers: [
                            {
                                id: 'CBMT_CBCT_GEOM_3978',
                                layerType: 'esri-tile',
                                url: 'https://maps-cartes.services.geo.ca/server2_serveur2/rest/services/BaseMaps/CBMT_CBCT_GEOM_3978/MapServer'
                            }
                        ],
                        tileSchemaId:
                            'EXT_NRCAN_Lambert_3978#LOD_NRCAN_Lambert_3978'
                    }
                ],
                initialBasemapId: 'baseNrCan'
            },
            layers: [
                {
                    name: 'Daily maximum temperature',
                    state: {
                        opacity: 0.85,
                        visibility: true,
                        identify: true,
                        hovertips: true
                    },
                    id: 'DCS_tmax_ANN_rcp45_2081_en',
                    url: 'https://geo.weather.gc.ca/geomet-climate?SERVICE=WMS&VERSION=1.3.0',
                    layerType: 'ogc-wms',
                    featureInfoMimeType: 'application/json',
                    sublayers: [
                        {
                            id: 'DCS.TX.RCP45.YEAR.2081-2100_PCTL50'
                        }
                    ],
                    fixtures: {
                        details: {
                            template: 'CCCS-Template'
                        }
                    }
                }
            ],
            fixtures: {
                legend: {
                    root: {
                        children: [
                            {
                                layerId: 'DCS_tmax_ANN_rcp45_2081_en'
                            }
                        ]
                    }
                },
                appbar: {
                    items: ['legend', 'basemap']
                },
                mapnav: { items: ['fullscreen', 'home'] },
                export: {
                    title: {
                        value: 'CCCS WMS Sample'
                    }
                },
                details: {
                    panelWidth: {
                        default: 350,
                        'details-items': 400
                    }
                }
            },
            panels: { open: [{ id: 'legend', pin: true }] },
            system: { animate: true }
        }
    }
};

let options = {
    loadDefaultFixtures: false,
    loadDefaultEvents: true
};

const rInstance = createInstance(
    document.getElementById('app'),
    config,
    options
);

rInstance.$element.component('CCCS-Template', {
    props: ['identifyData'],
    data() {
        return {
            result: {},
            parsed: false,
            errord: false,
            watchers: []
        };
    },
    template: `
    <div v-if="this.parsed && !this.errord" style="width: 100%;">
        <div class="short-form" style="border-top: 1px dotted rgb(156 163 175); margin-left: -8px; margin-right: -8px; text-align: center; padding: 10px; background-color: #fafafa; font-size: 1.3em; line-height: 1.2em;">
            <p style="margin-bottom: 11.5px;"><span style="border-bottom: 2px #e9e9e9 solid;">{{this.result.tt.details[0]}}</span></p>
            <p style="font-size: 3em; color: #335075; font-weight: 700; line-height: 1em; margin-bottom: 11.5px;">
                {{ this.result.value
                }}{{this.result.tt.measurementUnit[this.result.variable]}}
            </p>
            <p style="margin-bottom: 11.5px;"><span>{{this.result.tt.details[1]}}</span></p>
            <p class="supporting-value" style="color: #335075; font-weight: 700; margin-bottom: 11.5px;">
                {{this.result.tt.timeSlider[this.result.timeSlice]}}
            </p>
            <p style="margin-bottom: 11.5px;"><span>{{this.result.tt.details[2]}}</span></p>
            <p class="supporting-value" style="color: #335075; font-weight: 700; margin-bottom: 11.5px;">
                {{ this.result.latlong[1].toFixed(6) }}, {{
                this.result.latlong[0].toFixed(6) }}
            </p>
        </div>
        <div class="long-form" style="border-top: 1px dotted rgb(156 163 175); margin-left: -8px; margin-right: -8px; padding: 10px;">
            <p class="details-row" style="display: flex; font-size: 1em; margin-bottom: 11.5px;">
                <span class="details-label" style="flex: 1;">{{this.result.tt.timePeriod.label}}:</span
                ><span class="details-value" style="font-weight: 700;"
                >{{this.result.tt.timePeriod[this.result.timePeriod]}}</span
                >
            </p>
            <p class="details-row" style="display: flex; font-size: 1em; margin-bottom: 11.5px;">
                <span class="details-label" style="flex: 1;">{{this.result.tt.variable.label}}:</span
                ><span class="details-value" style="font-weight: 700;"
                >{{this.result.tt.variable[this.result.variable]}}</span
                >
            </p>
            <p class="details-row" style="display: flex; font-size: 1em; margin-bottom: 11.5px;">
                <span class="details-label" style="flex: 1;">{{this.result.tt.rcp.label}}:</span
                ><span class="details-value" style="font-weight: 700;">{{this.result.tt.rcp[this.result.rcp]}}</span>
            </p>
        </div>
        <div class="long-form" style="border-top: 1px dotted rgb(156 163 175); margin-left: -8px; margin-right: -8px; padding: 10px;">
            <p style="margin-bottom: 11.5px;">{{this.result.tt.baseline}}</p>
            <a class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" :href="this.result.tt.learnMore.link" target="_blank" rel="noopener noreferrer"
                >{{ this.result.tt.learnMore.default }}</a
            >
        </div>
    </div>
    <div v-else-if="this.errord" style="width: 100%;">
        <p>{{ this.$iApi.language === 'en' ? "An error occurred when parsing the data." : "Une erreur s'est produite lors de l'analyse des données" }}</p>
    </div>
    `,
    created() {
        // watch for language switch
        // not sure why, but vue only reacts when you make lang a computed property
        // watching $iApi.language won't work
        this.watchers.push(
            this.$watch('lang', () => {
                this.result.tt = this.getTranslations();
            })
        );

        this.watchers.push(
            this.$watch('identifyData', () => {
                this.parseData();
            })
        );

        this.parseData();
    },
    beforeUnmount() {
        this.watchers.forEach(unwatch => unwatch());
    },
    computed: {
        lang() {
            return this.$iApi.language;
        }
    },
    methods: {
        async parseData() {
            if (
                !this.identifyData.data.data.features ||
                this.identifyData.data.data.features.length === 0
            ) {
                this.errord = true;
                this.parsed = true;
                return;
            }
            this.parsed = false;
            this.errord = false;
            this.result = {};
            // Hardcoding these for now since we only have one dataset.
            // Would need to grab correct URL parameters if we added more.
            this.result.variable = 'tmax';
            this.result.timeSlice = 3;
            this.result.timePeriod = 'annual';
            this.result.rcp = 'rcp45';

            const tempVal =
                this.identifyData.data.data.features[0].properties.value;
            const parsedVal = parseFloat(tempVal).toFixed(1);
            if (!isNaN(parsedVal)) {
                this.result.value = (parsedVal >= 0 ? '+' : '') + parsedVal;
            } else {
                this.result.value = tempVal;
            }
            this.result.latlong = await this.$iApi.geo.proj.projectGeoJson(
                JSON.parse(
                    JSON.stringify(
                        this.identifyData.data.data.features[0].geometry
                    )
                ),
                3978,
                4326
            );
            this.result.latlong = this.result.latlong.coordinates;
            this.result.tt = this.getTranslations();
            this.parsed = true;
        },
        getTranslations() {
            const TRANSLATIONS = {
                en: {
                    latlong: 'Latitude, longitude',
                    timePeriod: {
                        label: 'Time of year',
                        annual: 'Annual',
                        spring: 'Spring',
                        summer: 'Summer',
                        fall: 'Autumn',
                        winter: 'Winter'
                    },
                    variable: {
                        label: 'Variable',
                        tmean: 'Mean temperature',
                        tmin: 'Daily minimum temperature',
                        tmax: 'Daily maximum temperature',
                        precip: 'Total precipitation'
                    },
                    measurementUnit: {
                        precip: '%',
                        tmean: '°C',
                        tmin: '°C',
                        tmax: '°C'
                    },
                    timeSlider: [
                        '2021-2040',
                        '2041-2060',
                        '2061-2080',
                        '2081-2100'
                    ],
                    rcp: {
                        label: 'Emission scenario',
                        rcp85: 'High',
                        rcp45: 'Moderate',
                        rcp26: 'Low'
                    },
                    learnMore: {
                        default:
                            'Learn more about the Statistically downscaled climate data dataset.',
                        link: 'https://www.canada.ca/en/environment-climate-change/services/climate-change/canadian-centre-climate-services/display-download/technical-documentation-downscaled-climate-scenarios.html'
                    },
                    details: ['Projected change of', 'by', 'at'],
                    baseline:
                        'The projected change is relative to the 1986-2005 average.'
                },

                fr: {
                    latlong: 'Latitude, longitude',
                    timePeriod: {
                        label: "Temps de l'année",
                        annual: 'Annuel',
                        spring: 'Printemps',
                        summer: 'Été',
                        fall: 'Automne',
                        winter: 'Hiver'
                    },
                    variable: {
                        label: 'Variable',
                        tmean: 'Température moyenne',
                        tmin: 'Température minimale quotidienne',
                        tmax: 'Température maximale quotidienne',
                        precip: 'Précipitations totales'
                    },
                    measurementUnit: {
                        precip: '%',
                        tmean: '°C',
                        tmin: '°C',
                        tmax: '°C'
                    },
                    timeSlider: [
                        '2021-2040',
                        '2041-2060',
                        '2061-2080',
                        '2081-2100'
                    ],
                    rcp: {
                        label: "Scénarios d'émissions",
                        rcp85: 'Élevées',
                        rcp45: 'Modérées',
                        rcp26: 'Faibles'
                    },
                    learnMore: {
                        default:
                            'En savoir plus sur l’ensemble de données Scénarios climatiques mis à l’échelle de manière statistique.',
                        link: 'https://www.canada.ca/fr/environnement-changement-climatique/services/changements-climatiques/centre-canadien-services-climatiques/afficher-telecharger/documentation-technique-scenarios-climatiques-echelle-reduite.html'
                    },
                    details: ['Changement projeté de', 'par', 'à'],
                    baseline:
                        'Les changements projetés sont relatives à la moyenne de 1986-2005.'
                }
            };
            return TRANSLATIONS[this.$iApi.language];
        }
    }
});

window.debugInstance = rInstance;

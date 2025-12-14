/**
 * ZAFIRI Marine Atlas - Main JavaScript
 * Zanzibar Fisheries and Marine Resources Research Institute
 * Interactive Marine Geoportal
 */

(function() {
    'use strict';

    // ============================================
    // Configuration & Constants
    // ============================================
    const CONFIG = {
        map: {
            center: ol.proj.fromLonLat([39.3, -5.9]),
            zoom: 9,
            minZoom: 7,
            maxZoom: 18
        },
        views: {
            unguja: { center: ol.proj.fromLonLat([39.22, -6.13]), zoom: 10 },
            pemba: { center: ol.proj.fromLonLat([39.75, -5.05]), zoom: 10 },
            all: { center: ol.proj.fromLonLat([39.3, -5.9]), zoom: 9 }
        },
        colors: {
            // Islands - OUTLINE ONLY (no fill)
            islandStroke: '#2c3e50',
            islandStrokeWidth: 2.5,
            // MPA
            mpa: 'rgba(26, 95, 122, 0.4)',
            mpaStroke: '#1a5f7a',
            // Fishing zones
            artisanal: 'rgba(52, 152, 219, 0.35)',
            artisanalStroke: '#3498db',
            deepSea: 'rgba(155, 89, 182, 0.3)',
            deepSeaStroke: '#9b59b6',
            // Ecosystems
            coral: 'rgba(231, 76, 60, 0.5)',
            coralStroke: '#e74c3c',
            mangrove: 'rgba(39, 174, 96, 0.6)',
            mangroveStroke: '#27ae60',
            seagrass: 'rgba(46, 204, 113, 0.4)',
            seagrassStroke: '#2ecc71'
        }
    };

    // ============================================
    // Global State
    // ============================================
    let map = null;
    let layers = {};
    let baseLayers = {};
    let popup = null;
    let currentLang = 'en';
    let currentBaseLayer = 'ocean';

    // ============================================
    // Layer Styles
    // ============================================
    const styles = {
        // Island borders ONLY - no fill, just outline
        island: new ol.style.Style({
            fill: null, // No fill - transparent
            stroke: new ol.style.Stroke({
                color: CONFIG.colors.islandStroke,
                width: CONFIG.colors.islandStrokeWidth,
                lineCap: 'round',
                lineJoin: 'round'
            })
        }),
        // Island with label
        islandWithLabel: function(feature) {
            return [
                new ol.style.Style({
                    fill: null,
                    stroke: new ol.style.Stroke({
                        color: CONFIG.colors.islandStroke,
                        width: CONFIG.colors.islandStrokeWidth,
                        lineCap: 'round',
                        lineJoin: 'round'
                    })
                }),
                new ol.style.Style({
                    text: new ol.style.Text({
                        text: feature.get('name') || '',
                        font: 'bold 14px Inter, sans-serif',
                        fill: new ol.style.Fill({ color: '#2c3e50' }),
                        stroke: new ol.style.Stroke({ color: '#ffffff', width: 3 }),
                        offsetY: 0
                    })
                })
            ];
        },
        mpa: new ol.style.Style({
            fill: new ol.style.Fill({ color: CONFIG.colors.mpa }),
            stroke: new ol.style.Stroke({ color: CONFIG.colors.mpaStroke, width: 2, lineDash: [5, 5] })
        }),
        artisanal: new ol.style.Style({
            fill: new ol.style.Fill({ color: CONFIG.colors.artisanal }),
            stroke: new ol.style.Stroke({ color: CONFIG.colors.artisanalStroke, width: 1.5 })
        }),
        deepSea: new ol.style.Style({
            fill: new ol.style.Fill({ color: CONFIG.colors.deepSea }),
            stroke: new ol.style.Stroke({ color: CONFIG.colors.deepSeaStroke, width: 2, lineDash: [10, 5] })
        }),
        coral: function(feature) {
            const health = feature.get('health_status');
            let color = CONFIG.colors.coral;
            if (health === 'Excellent') color = 'rgba(39, 174, 96, 0.6)';
            else if (health === 'Good') color = 'rgba(241, 196, 15, 0.5)';
            else if (health === 'Moderate') color = 'rgba(230, 126, 34, 0.5)';
            return new ol.style.Style({
                fill: new ol.style.Fill({ color: color }),
                stroke: new ol.style.Stroke({ color: CONFIG.colors.coralStroke, width: 2 })
            });
        },
        mangrove: new ol.style.Style({
            fill: new ol.style.Fill({ color: CONFIG.colors.mangrove }),
            stroke: new ol.style.Stroke({ color: CONFIG.colors.mangroveStroke, width: 1.5 })
        }),
        seagrass: new ol.style.Style({
            fill: new ol.style.Fill({ color: CONFIG.colors.seagrass }),
            stroke: new ol.style.Stroke({ color: CONFIG.colors.seagrassStroke, width: 1 })
        })
    };

    // ============================================
    // Utility Functions
    // ============================================
    function geoJsonToFeatures(geoJson) {
        return new ol.format.GeoJSON().readFeatures(geoJson, {
            featureProjection: 'EPSG:3857'
        });
    }

    function createVectorLayer(features, style, zIndex = 1) {
        return new ol.layer.Vector({
            source: new ol.source.Vector({ features: features }),
            style: style,
            zIndex: zIndex
        });
    }

    // ============================================
    // Map Initialization
    // ============================================
    function initMap() {
        // Base Layers Collection
        baseLayers = {
            ocean: new ol.layer.Tile({
                source: new ol.source.XYZ({
                    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}',
                    attributions: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri'
                }),
                visible: true,
                zIndex: 0,
                properties: { name: 'ocean', title: 'Ocean Basemap' }
            }),
            satellite: new ol.layer.Tile({
                source: new ol.source.XYZ({
                    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                    attributions: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                }),
                visible: false,
                zIndex: 0,
                properties: { name: 'satellite', title: 'Satellite Imagery' }
            }),
            osm: new ol.layer.Tile({
                source: new ol.source.OSM(),
                visible: false,
                zIndex: 0,
                properties: { name: 'osm', title: 'OpenStreetMap' }
            }),
            terrain: new ol.layer.Tile({
                source: new ol.source.XYZ({
                    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}',
                    attributions: 'Tiles &copy; Esri &mdash; Source: USGS, Esri, TANA, DeLorme, and NPS'
                }),
                visible: false,
                zIndex: 0,
                properties: { name: 'terrain', title: 'Terrain' }
            }),
            dark: new ol.layer.Tile({
                source: new ol.source.XYZ({
                    url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
                    attributions: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
                }),
                visible: false,
                zIndex: 0,
                properties: { name: 'dark', title: 'Dark Mode' }
            })
        };

        // Create the map with all base layers
        map = new ol.Map({
            target: 'marine-atlas-map',
            layers: Object.values(baseLayers),
            view: new ol.View({
                center: CONFIG.map.center,
                zoom: CONFIG.map.zoom,
                minZoom: CONFIG.map.minZoom,
                maxZoom: CONFIG.map.maxZoom
            }),
            controls: []
        });

        // Initialize data layers
        initDataLayers();

        // Initialize SST heatmap
        initSSTLayer();

        // Initialize bathymetry layer
        initBathymetryLayer();

        // Setup interactions
        setupMapInteractions();

        // Setup base layer switcher
        setupBaseLayerSwitcher();

        // Hide loading overlay
        setTimeout(() => {
            document.getElementById('loadingOverlay').classList.add('hidden');
        }, 1500);
    }

    // ============================================
    // Base Layer Switcher
    // ============================================
    function setupBaseLayerSwitcher() {
        const switcher = document.getElementById('baseLayerSwitcher');
        if (!switcher) return;

        switcher.querySelectorAll('.base-layer-option').forEach(option => {
            option.addEventListener('click', function() {
                const layerName = this.dataset.layer;
                switchBaseLayer(layerName);

                // Update active state
                switcher.querySelectorAll('.base-layer-option').forEach(opt => {
                    opt.classList.remove('active');
                });
                this.classList.add('active');
            });
        });
    }

    function switchBaseLayer(layerName) {
        // Hide all base layers
        Object.keys(baseLayers).forEach(key => {
            baseLayers[key].setVisible(false);
        });

        // Show selected base layer
        if (baseLayers[layerName]) {
            baseLayers[layerName].setVisible(true);
            currentBaseLayer = layerName;
        }
    }

    // ============================================
    // Data Layers Initialization
    // ============================================
    function initDataLayers() {
        // Islands Layer - OUTLINE ONLY with labels
        const islandFeatures = [
            geoJsonToFeatures(ZanzibarGeoData.unguja)[0],
            geoJsonToFeatures(ZanzibarGeoData.pemba)[0]
        ];
        layers.islands = new ol.layer.Vector({
            source: new ol.source.Vector({ features: islandFeatures }),
            style: styles.islandWithLabel,
            zIndex: 10
        });
        map.addLayer(layers.islands);

        // Marine Protected Areas
        const mpaFeatures = geoJsonToFeatures(ZanzibarGeoData.mpa);
        layers.mpa = createVectorLayer(mpaFeatures, styles.mpa, 5);
        map.addLayer(layers.mpa);

        // Artisanal Zones
        const artisanalFeatures = geoJsonToFeatures(ZanzibarGeoData.artisanalZones);
        layers['artisanal-zones'] = createVectorLayer(artisanalFeatures, styles.artisanal, 4);
        map.addLayer(layers['artisanal-zones']);

        // Deep Sea Potential
        const deepSeaFeatures = geoJsonToFeatures(ZanzibarGeoData.deepSeaPotential);
        layers['deep-sea-potential'] = createVectorLayer(deepSeaFeatures, styles.deepSea, 3);
        map.addLayer(layers['deep-sea-potential']);

        // Coral Reefs
        const coralFeatures = geoJsonToFeatures(ZanzibarGeoData.coralReefs);
        layers['coral-reefs'] = createVectorLayer(coralFeatures, styles.coral, 6);
        map.addLayer(layers['coral-reefs']);

        // Mangroves
        const mangroveFeatures = geoJsonToFeatures(ZanzibarGeoData.mangroves);
        layers.mangroves = createVectorLayer(mangroveFeatures, styles.mangrove, 7);
        map.addLayer(layers.mangroves);

        // Seagrass
        const seagrassFeatures = geoJsonToFeatures(ZanzibarGeoData.seagrass);
        layers.seagrass = createVectorLayer(seagrassFeatures, styles.seagrass, 2);
        layers.seagrass.setVisible(false);
        map.addLayer(layers.seagrass);
    }

    // ============================================
    // SST Heatmap Layer
    // ============================================
    function initSSTLayer() {
        const sstFeatures = ZanzibarGeoData.sstData.features.map(f => {
            const feature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat(f.geometry.coordinates)),
                weight: f.properties.weight,
                temp: f.properties.temp
            });
            return feature;
        });

        layers.sst = new ol.layer.Heatmap({
            source: new ol.source.Vector({ features: sstFeatures }),
            blur: 30,
            radius: 40,
            weight: function(feature) {
                return feature.get('weight');
            },
            gradient: ['#3498db', '#2ecc71', '#f1c40f', '#e67e22', '#e74c3c'],
            opacity: 0.7,
            zIndex: 1
        });

        map.addLayer(layers.sst);
    }

    // ============================================
    // Bathymetry Layer (Simulated)
    // ============================================
    function initBathymetryLayer() {
        // Create depth contours as vector layer
        const depthContours = {
            type: "FeatureCollection",
            features: [
                {
                    type: "Feature",
                    properties: { depth: 50 },
                    geometry: {
                        type: "LineString",
                        coordinates: [
                            [38.9, -5.5], [39.0, -5.8], [39.0, -6.2], [39.1, -6.5],
                            [39.3, -6.6], [39.5, -6.5], [39.6, -6.2], [39.5, -5.8]
                        ]
                    }
                },
                {
                    type: "Feature",
                    properties: { depth: 200 },
                    geometry: {
                        type: "LineString",
                        coordinates: [
                            [38.7, -5.3], [38.8, -5.7], [38.8, -6.3], [39.0, -6.7],
                            [39.4, -6.8], [39.7, -6.5], [39.8, -6.0], [39.7, -5.5]
                        ]
                    }
                },
                {
                    type: "Feature",
                    properties: { depth: 500 },
                    geometry: {
                        type: "LineString",
                        coordinates: [
                            [38.5, -5.0], [38.6, -5.5], [38.6, -6.5], [38.9, -7.0],
                            [39.5, -7.0], [39.9, -6.5], [40.0, -5.8], [39.8, -5.0]
                        ]
                    }
                }
            ]
        };

        const depthStyle = function(feature) {
            const depth = feature.get('depth');
            let color = 'rgba(52, 73, 94, 0.3)';
            let width = 1;
            if (depth === 200) { color = 'rgba(41, 128, 185, 0.4)'; width = 1.5; }
            if (depth === 500) { color = 'rgba(44, 62, 80, 0.5)'; width = 2; }
            return new ol.style.Style({
                stroke: new ol.style.Stroke({ color: color, width: width, lineDash: [4, 4] })
            });
        };

        const depthFeatures = geoJsonToFeatures(depthContours);
        layers.bathymetry = createVectorLayer(depthFeatures, depthStyle, 0);
        map.addLayer(layers.bathymetry);
    }

    // ============================================
    // Map Interactions
    // ============================================
    function setupMapInteractions() {
        // Popup overlay
        const popupElement = document.createElement('div');
        popupElement.className = 'ol-popup';
        popup = new ol.Overlay({
            element: popupElement,
            positioning: 'bottom-center',
            stopEvent: false,
            offset: [0, -10]
        });
        map.addOverlay(popup);

        // Click interaction
        map.on('click', function(evt) {
            const feature = map.forEachFeatureAtPixel(evt.pixel, function(feature) {
                return feature;
            });

            if (feature) {
                const props = feature.getProperties();
                showPopup(evt.coordinate, props);
            } else {
                popup.setPosition(undefined);
            }
        });

        // Pointer cursor on hover
        map.on('pointermove', function(evt) {
            const pixel = map.getEventPixel(evt.originalEvent);
            const hit = map.hasFeatureAtPixel(pixel);
            map.getTargetElement().style.cursor = hit ? 'pointer' : '';
        });
    }

    // ============================================
    // Popup Display
    // ============================================
    function showPopup(coordinate, props) {
        let content = '<div class="feature-popup">';
        content += '<div class="popup-header"><h5>' + (props.name || 'Feature') + '</h5></div>';
        content += '<div class="popup-body">';

        // Build popup content based on feature type
        if (props.type === 'mpa') {
            content += createPopupRow('Status', props.status);
            content += createPopupRow('Established', props.established);
            content += createPopupRow('Area', props.area_km2 + ' km²');
            if (props.description) {
                content += '<p style="font-size:11px;color:#666;margin-top:8px;">' + props.description + '</p>';
            }
        } else if (props.type === 'artisanal') {
            content += createPopupRow('Fishers', props.fishers?.toLocaleString());
            content += createPopupRow('Vessels', props.vessels);
            if (props.main_catch) {
                content += createPopupRow('Main Catch', props.main_catch.join(', '));
            }
        } else if (props.type === 'deep_sea') {
            content += createPopupRow('Depth Range', props.depth_range);
            content += createPopupRow('Status', props.status);
            if (props.potential_species) {
                content += createPopupRow('Species', props.potential_species.join(', '));
            }
        } else if (props.health_status) {
            // Coral reef
            content += createPopupRow('Health', props.health_status);
            content += createPopupRow('Coral Cover', props.coral_cover + '%');
            content += createPopupRow('Biodiversity', props.biodiversity_index + '/10');
        } else if (props.area_ha) {
            // Mangrove/Seagrass
            content += createPopupRow('Area', props.area_ha?.toLocaleString() + ' ha');
            content += createPopupRow('Status', props.status);
            if (props.species) {
                content += createPopupRow('Species', props.species.join(', '));
            }
            if (props.dominant_species) {
                content += createPopupRow('Dominant', props.dominant_species);
            }
        } else if (props.type === 'island') {
            content += createPopupRow('Area', props.area_km2?.toLocaleString() + ' km²');
            content += createPopupRow('Population', props.population?.toLocaleString());
        }

        content += '</div></div>';

        popup.getElement().innerHTML = content;
        popup.setPosition(coordinate);
    }

    function createPopupRow(label, value) {
        if (!value) return '';
        return '<div class="popup-row"><span class="popup-label">' + label + '</span><span class="popup-value">' + value + '</span></div>';
    }

    // ============================================
    // Layer Controls
    // ============================================
    function setupLayerControls() {
        // Layer toggles
        document.querySelectorAll('.toggle-switch input').forEach(toggle => {
            toggle.addEventListener('change', function() {
                const layerId = this.dataset.layer;
                const layer = layers[layerId];
                if (layer) {
                    layer.setVisible(this.checked);
                }
            });
        });

        // Opacity slider
        const sstOpacitySlider = document.getElementById('sstOpacity');
        if (sstOpacitySlider) {
            sstOpacitySlider.addEventListener('input', function() {
                const opacity = this.value / 100;
                if (layers.sst) {
                    layers.sst.setOpacity(opacity);
                }
                document.getElementById('sstOpacityValue').textContent = this.value;
            });
        }

        // Layer group collapse/expand
        document.querySelectorAll('.layer-group-header').forEach(header => {
            header.addEventListener('click', function() {
                this.parentElement.classList.toggle('collapsed');
            });
        });
    }

    // ============================================
    // Island Navigation
    // ============================================
    function setupIslandNav() {
        document.querySelectorAll('.island-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const island = this.dataset.island;
                const viewConfig = CONFIG.views[island];

                // Update active state
                document.querySelectorAll('.island-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                // Animate to view
                map.getView().animate({
                    center: viewConfig.center,
                    zoom: viewConfig.zoom,
                    duration: 1000
                });
            });
        });
    }

    // ============================================
    // Map Controls
    // ============================================
    function setupMapControls() {
        // Zoom in
        document.getElementById('zoomIn')?.addEventListener('click', function() {
            const view = map.getView();
            view.animate({ zoom: view.getZoom() + 1, duration: 250 });
        });

        // Zoom out
        document.getElementById('zoomOut')?.addEventListener('click', function() {
            const view = map.getView();
            view.animate({ zoom: view.getZoom() - 1, duration: 250 });
        });

        // Reset view
        document.getElementById('resetView')?.addEventListener('click', function() {
            map.getView().animate({
                center: CONFIG.map.center,
                zoom: CONFIG.map.zoom,
                duration: 500
            });
            document.querySelectorAll('.island-btn').forEach(b => b.classList.remove('active'));
            document.querySelector('.island-btn[data-island="all"]')?.classList.add('active');
        });

        // Fullscreen
        document.getElementById('fullscreen')?.addEventListener('click', function() {
            const mapElement = document.querySelector('.atlas-container');
            if (!document.fullscreenElement) {
                mapElement.requestFullscreen().catch(err => {
                    console.log('Fullscreen error:', err);
                });
                this.querySelector('i').classList.replace('fa-expand', 'fa-compress');
            } else {
                document.exitFullscreen();
                this.querySelector('i').classList.replace('fa-compress', 'fa-expand');
            }
        });
    }

    // ============================================
    // Search Functionality
    // ============================================
    function setupSearch() {
        const searchInput = document.getElementById('searchInput');
        if (!searchInput) return;

        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.toLowerCase().trim();

            if (query.length < 2) return;

            searchTimeout = setTimeout(() => {
                const results = searchLocations(query);
                if (results.length > 0) {
                    // Navigate to first result
                    const result = results[0];
                    map.getView().animate({
                        center: ol.proj.fromLonLat(result.coordinates),
                        zoom: 13,
                        duration: 1000
                    });
                }
            }, 500);
        });
    }

    function searchLocations(query) {
        return ZanzibarGeoData.locations.filter(loc =>
            loc.name.toLowerCase().includes(query) ||
            loc.name_sw.toLowerCase().includes(query)
        );
    }

    // ============================================
    // Language Toggle
    // ============================================
    function setupLanguageToggle() {
        const langToggle = document.getElementById('langToggle');
        if (!langToggle) return;

        langToggle.querySelectorAll('.lang-option').forEach(option => {
            option.addEventListener('click', function() {
                const lang = this.dataset.lang;
                currentLang = lang;

                // Update active state
                langToggle.querySelectorAll('.lang-option').forEach(o => o.classList.remove('active'));
                this.classList.add('active');

                // Update UI text (simplified - would need full i18n implementation)
                updateUILanguage(lang);
            });
        });
    }

    function updateUILanguage(lang) {
        const translations = {
            en: {
                layers: 'Layers',
                fisheries: 'Fisheries',
                ecosystems: 'Ecosystems',
                oceanography: 'Oceanography',
                searchPlaceholder: 'Search locations, species...',
                analyticsDashboard: 'Analytics Dashboard',
                mpaTitle: 'Marine Protected Areas (Unguja)',
                currentSST: 'Current Avg. SST:'
            },
            sw: {
                layers: 'Tabaka',
                fisheries: 'Uvuvi',
                ecosystems: 'Mazingira',
                oceanography: 'Oceanografia',
                searchPlaceholder: 'Tafuta maeneo, spishi...',
                analyticsDashboard: 'Dashibodi ya Uchambuzi',
                mpaTitle: 'Maeneo ya Hifadhi ya Bahari (Unguja)',
                currentSST: 'SST ya Wastani:'
            }
        };

        const t = translations[lang];

        // Update placeholder
        const searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.placeholder = t.searchPlaceholder;

        // Would update other UI elements here
    }

    // ============================================
    // Dashboard Toggle
    // ============================================
    function setupDashboard() {
        const toggleBtn = document.getElementById('analyticsToggle');
        const body = document.getElementById('analyticsBody');

        if (toggleBtn && body) {
            toggleBtn.addEventListener('click', function() {
                body.style.display = body.style.display === 'none' ? 'block' : 'none';
                const icon = this.querySelector('i');
                icon.classList.toggle('fa-chevron-up');
                icon.classList.toggle('fa-chevron-down');
            });
        }

        // Simulate live SST updates
        setInterval(() => {
            const sstElement = document.getElementById('sstValue');
            if (sstElement) {
                const baseTemp = 28.5;
                const variation = (Math.random() - 0.5) * 0.4;
                sstElement.textContent = (baseTemp + variation).toFixed(1);
            }
        }, 5000);
    }

    // ============================================
    // Initialize Application
    // ============================================
    function init() {
        initMap();
        setupLayerControls();
        setupIslandNav();
        setupMapControls();
        setupSearch();
        setupLanguageToggle();
        setupDashboard();

        console.log('ZAFIRI Marine Atlas initialized successfully');
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

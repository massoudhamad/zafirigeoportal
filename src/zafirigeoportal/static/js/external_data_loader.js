/**
 * ZAFIRI Marine Atlas - External Data Loader
 * Load datasets from external GeoNode APIs and other OGC services
 */

(function() {
    'use strict';

    // ============================================
    // External Data Loader Module
    // ============================================
    const ExternalDataLoader = {

        // Store loaded layers
        loadedLayers: {},

        // Default style for vector layers
        defaultStyle: null,

        /**
         * Initialize the loader (call after map is ready)
         */
        init: function() {
            this.defaultStyle = new ol.style.Style({
                fill: new ol.style.Fill({ color: 'rgba(23, 162, 184, 0.3)' }),
                stroke: new ol.style.Stroke({ color: '#17a2b8', width: 2 }),
                image: new ol.style.Circle({
                    radius: 6,
                    fill: new ol.style.Fill({ color: '#17a2b8' }),
                    stroke: new ol.style.Stroke({ color: '#fff', width: 2 })
                })
            });
            console.log('External Data Loader initialized');
        },

        /**
         * Load datasets list from a GeoNode API
         * @param {string} apiUrl - The GeoNode API URL (e.g., 'https://geodata.utu.fi/api/v2/datasets')
         * @param {object} options - Optional filters { page, page_size, search }
         * @returns {Promise} - Resolves with datasets array
         */
        fetchDatasets: function(apiUrl, options = {}) {
            let url = apiUrl;
            const params = new URLSearchParams();

            if (options.page) params.append('page', options.page);
            if (options.page_size) params.append('page_size', options.page_size);
            if (options.search) params.append('search', options.search);

            const queryString = params.toString();
            if (queryString) url += '?' + queryString;

            return fetch(url)
                .then(response => {
                    if (!response.ok) throw new Error('Failed to fetch datasets');
                    return response.json();
                })
                .then(data => {
                    console.log('Loaded ' + (data.datasets?.length || 0) + ' datasets from ' + apiUrl);
                    return {
                        datasets: data.datasets || [],
                        total: data.total || 0,
                        page: data.page || 1,
                        pageSize: data.page_size || 10
                    };
                });
        },

        /**
         * Add a WMS layer from an external GeoNode/GeoServer
         * @param {ol.Map} map - The OpenLayers map instance
         * @param {object} options - Layer options
         */
        addWMSLayer: function(map, options) {
            const {
                url,
                layerName,
                title,
                visible = true,
                opacity = 0.7,
                zIndex = 8
            } = options;

            const layer = new ol.layer.Tile({
                source: new ol.source.TileWMS({
                    url: url,
                    params: {
                        'LAYERS': layerName,
                        'TILED': true,
                        'FORMAT': 'image/png',
                        'TRANSPARENT': true
                    },
                    serverType: 'geoserver',
                    crossOrigin: 'anonymous'
                }),
                visible: visible,
                opacity: opacity,
                zIndex: zIndex,
                properties: {
                    title: title || layerName,
                    layerName: layerName,
                    type: 'external-wms',
                    source: 'external'
                }
            });

            map.addLayer(layer);
            this.loadedLayers[layerName] = layer;
            console.log('Added WMS layer:', title || layerName);
            return layer;
        },

        /**
         * Add a WFS layer (vector) from an external GeoNode/GeoServer
         * @param {ol.Map} map - The OpenLayers map instance
         * @param {object} options - Layer options
         */
        addWFSLayer: function(map, options) {
            const {
                url,
                layerName,
                title,
                style,
                visible = true,
                zIndex = 8
            } = options;

            const vectorSource = new ol.source.Vector({
                format: new ol.format.GeoJSON(),
                url: function(extent) {
                    return url + '?' +
                        'service=WFS&' +
                        'version=1.1.0&' +
                        'request=GetFeature&' +
                        'typename=' + layerName + '&' +
                        'outputFormat=application/json&' +
                        'srsname=EPSG:3857&' +
                        'bbox=' + extent.join(',') + ',EPSG:3857';
                },
                strategy: ol.loadingstrategy.bbox
            });

            const layer = new ol.layer.Vector({
                source: vectorSource,
                style: style || this.defaultStyle,
                visible: visible,
                zIndex: zIndex,
                properties: {
                    title: title || layerName,
                    layerName: layerName,
                    type: 'external-wfs',
                    source: 'external'
                }
            });

            map.addLayer(layer);
            this.loadedLayers[layerName] = layer;
            console.log('Added WFS layer:', title || layerName);
            return layer;
        },

        /**
         * Add a GeoJSON layer from URL
         * @param {ol.Map} map - The OpenLayers map instance
         * @param {string} url - GeoJSON URL
         * @param {object} options - Layer options
         */
        addGeoJSONLayer: function(map, url, options = {}) {
            const {
                id,
                title,
                style,
                visible = true,
                zIndex = 8,
                zoomTo = false
            } = options;

            return fetch(url)
                .then(response => response.json())
                .then(geojson => {
                    const features = new ol.format.GeoJSON().readFeatures(geojson, {
                        featureProjection: 'EPSG:3857'
                    });

                    const layer = new ol.layer.Vector({
                        source: new ol.source.Vector({ features: features }),
                        style: style || this.defaultStyle,
                        visible: visible,
                        zIndex: zIndex,
                        properties: {
                            title: title || 'GeoJSON Layer',
                            type: 'geojson',
                            source: 'external'
                        }
                    });

                    map.addLayer(layer);

                    if (id) {
                        this.loadedLayers[id] = layer;
                    }

                    console.log('Added GeoJSON layer:', title || id);

                    if (zoomTo && features.length > 0) {
                        const extent = layer.getSource().getExtent();
                        map.getView().fit(extent, {
                            padding: [50, 50, 50, 50],
                            duration: 1000
                        });
                    }

                    return layer;
                });
        },

        /**
         * Load a dataset from GeoNode API by adding it as WMS
         * @param {ol.Map} map - The OpenLayers map instance
         * @param {object} dataset - Dataset object from GeoNode API
         * @param {object} options - Additional options
         */
        loadGeoNodeDataset: function(map, dataset, options = {}) {
            // Extract WMS URL from dataset
            const wmsLink = dataset.links?.find(link =>
                link.link_type === 'OGC:WMS' || link.name === 'OGC WMS Service'
            );

            if (!wmsLink) {
                console.warn('No WMS link found for dataset:', dataset.title);
                return null;
            }

            // Parse the WMS URL to get base URL
            const wmsUrl = wmsLink.url.split('?')[0];
            const layerName = dataset.alternate || dataset.name;

            return this.addWMSLayer(map, {
                url: wmsUrl,
                layerName: layerName,
                title: dataset.title,
                visible: options.visible !== false,
                opacity: options.opacity || 0.7,
                zIndex: options.zIndex || 8
            });
        },

        /**
         * Remove a layer by its name/id
         * @param {ol.Map} map - The OpenLayers map instance
         * @param {string} layerId - Layer identifier
         */
        removeLayer: function(map, layerId) {
            const layer = this.loadedLayers[layerId];
            if (layer) {
                map.removeLayer(layer);
                delete this.loadedLayers[layerId];
                console.log('Removed layer:', layerId);
                return true;
            }
            return false;
        },

        /**
         * Toggle layer visibility
         * @param {string} layerId - Layer identifier
         */
        toggleLayer: function(layerId) {
            const layer = this.loadedLayers[layerId];
            if (layer) {
                layer.setVisible(!layer.getVisible());
                return layer.getVisible();
            }
            return null;
        },

        /**
         * Set layer opacity
         * @param {string} layerId - Layer identifier
         * @param {number} opacity - Opacity value (0-1)
         */
        setLayerOpacity: function(layerId, opacity) {
            const layer = this.loadedLayers[layerId];
            if (layer) {
                layer.setOpacity(opacity);
            }
        },

        /**
         * Get all loaded external layers
         */
        getLoadedLayers: function() {
            return this.loadedLayers;
        },

        /**
         * Create a custom style
         * @param {object} options - Style options
         */
        createStyle: function(options = {}) {
            const {
                fillColor = 'rgba(23, 162, 184, 0.3)',
                strokeColor = '#17a2b8',
                strokeWidth = 2,
                pointRadius = 6,
                pointFillColor,
                pointStrokeColor = '#fff'
            } = options;

            return new ol.style.Style({
                fill: new ol.style.Fill({ color: fillColor }),
                stroke: new ol.style.Stroke({ color: strokeColor, width: strokeWidth }),
                image: new ol.style.Circle({
                    radius: pointRadius,
                    fill: new ol.style.Fill({ color: pointFillColor || strokeColor }),
                    stroke: new ol.style.Stroke({ color: pointStrokeColor, width: 2 })
                })
            });
        }
    };

    // ============================================
    // Example Usage Functions
    // ============================================

    /**
     * Example: Load data from University of Turku GeoNode
     */
    ExternalDataLoader.loadUTUData = function(map) {
        const UTU_API = 'https://geodata.utu.fi/api/v2/datasets';
        const UTU_WMS = 'https://geodata.utu.fi/geoserver/ows';

        // Example: Add a specific WMS layer
        // this.addWMSLayer(map, {
        //     url: UTU_WMS,
        //     layerName: 'geonode:your_layer_name',
        //     title: 'Layer Title',
        //     visible: true,
        //     opacity: 0.7
        // });

        // Or fetch and display available datasets
        return this.fetchDatasets(UTU_API, { page_size: 20 });
    };

    /**
     * Example: Load data from any GeoNode instance
     */
    ExternalDataLoader.loadFromGeoNode = function(map, geonodeUrl, layerName, options = {}) {
        const wmsUrl = geonodeUrl + '/geoserver/ows';

        return this.addWMSLayer(map, {
            url: wmsUrl,
            layerName: layerName,
            title: options.title || layerName,
            visible: options.visible !== false,
            opacity: options.opacity || 0.7,
            zIndex: options.zIndex || 8
        });
    };

    // Expose to global scope
    window.ExternalDataLoader = ExternalDataLoader;

    console.log('External Data Loader module loaded');

})();

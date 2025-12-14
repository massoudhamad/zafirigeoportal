/**
 * ZAFIRI Marine Atlas - Zanzibar GeoData
 * Static GeoJSON data for Zanzibar marine features
 * Zanzibar Fisheries and Marine Resources Research Institute
 */

const ZanzibarGeoData = {
    // Map configuration
    config: {
        center: [39.3, -5.9], // Longitude, Latitude
        zoom: 9,
        minZoom: 7,
        maxZoom: 18,
        bounds: {
            unguja: { center: [39.22, -6.13], zoom: 10 },
            pemba: { center: [39.75, -5.05], zoom: 10 },
            all: { center: [39.3, -5.9], zoom: 9 }
        }
    },

    // Unguja Island Outline
    unguja: {
        type: "Feature",
        properties: {
            name: "Unguja",
            name_sw: "Unguja",
            type: "island",
            area_km2: 1666,
            population: 896721
        },
        geometry: {
            type: "Polygon",
            coordinates: [[
                [39.1867, -5.7167],
                [39.2333, -5.7333],
                [39.2833, -5.7500],
                [39.3167, -5.7833],
                [39.3500, -5.8333],
                [39.3667, -5.8833],
                [39.3833, -5.9500],
                [39.4000, -6.0167],
                [39.4167, -6.1000],
                [39.4333, -6.1667],
                [39.4500, -6.2500],
                [39.4667, -6.3333],
                [39.4833, -6.4167],
                [39.4667, -6.4500],
                [39.4333, -6.4667],
                [39.3833, -6.4667],
                [39.3333, -6.4500],
                [39.2833, -6.4167],
                [39.2333, -6.3667],
                [39.1833, -6.3167],
                [39.1500, -6.2667],
                [39.1333, -6.2000],
                [39.1167, -6.1333],
                [39.1000, -6.0667],
                [39.0833, -6.0000],
                [39.0833, -5.9333],
                [39.1000, -5.8667],
                [39.1167, -5.8167],
                [39.1333, -5.7667],
                [39.1500, -5.7333],
                [39.1867, -5.7167]
            ]]
        }
    },

    // Pemba Island Outline
    pemba: {
        type: "Feature",
        properties: {
            name: "Pemba",
            name_sw: "Pemba",
            type: "island",
            area_km2: 988,
            population: 406808
        },
        geometry: {
            type: "Polygon",
            coordinates: [[
                [39.6833, -4.8667],
                [39.7333, -4.8833],
                [39.7667, -4.9167],
                [39.8000, -4.9667],
                [39.8167, -5.0167],
                [39.8333, -5.0833],
                [39.8500, -5.1500],
                [39.8667, -5.2167],
                [39.8667, -5.2833],
                [39.8500, -5.3333],
                [39.8167, -5.3667],
                [39.7667, -5.3833],
                [39.7167, -5.3833],
                [39.6667, -5.3667],
                [39.6333, -5.3333],
                [39.6167, -5.2833],
                [39.6000, -5.2167],
                [39.5833, -5.1500],
                [39.5833, -5.0833],
                [39.6000, -5.0167],
                [39.6167, -4.9667],
                [39.6333, -4.9167],
                [39.6500, -4.8833],
                [39.6833, -4.8667]
            ]]
        }
    },

    // Marine Protected Areas
    mpa: {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                properties: {
                    name: "Menai Bay Conservation Area",
                    name_sw: "Eneo la Hifadhi la Menai Bay",
                    type: "mpa",
                    status: "Active",
                    established: 1997,
                    area_km2: 470,
                    description: "Largest marine protected area in Zanzibar, important for dolphin tourism and artisanal fishing"
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [[
                        [39.25, -6.20],
                        [39.35, -6.20],
                        [39.40, -6.30],
                        [39.45, -6.40],
                        [39.40, -6.48],
                        [39.30, -6.48],
                        [39.20, -6.40],
                        [39.15, -6.30],
                        [39.20, -6.22],
                        [39.25, -6.20]
                    ]]
                }
            },
            {
                type: "Feature",
                properties: {
                    name: "Mnemba Island Marine Conservation Area",
                    name_sw: "Eneo la Hifadhi la Bahari la Mnemba",
                    type: "mpa",
                    status: "Active",
                    established: 2002,
                    area_km2: 52,
                    description: "Premier diving and snorkeling destination with pristine coral reefs"
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [[
                        [39.35, -5.78],
                        [39.42, -5.78],
                        [39.45, -5.82],
                        [39.45, -5.88],
                        [39.42, -5.92],
                        [39.35, -5.92],
                        [39.32, -5.88],
                        [39.32, -5.82],
                        [39.35, -5.78]
                    ]]
                }
            },
            {
                type: "Feature",
                properties: {
                    name: "Chumbe Island Coral Park",
                    name_sw: "Hifadhi ya Matumbawe ya Kisiwa cha Chumbe",
                    type: "mpa",
                    status: "Active",
                    established: 1994,
                    area_km2: 0.33,
                    description: "Award-winning private nature reserve with exceptional coral reef ecosystem"
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [[
                        [39.165, -6.265],
                        [39.185, -6.265],
                        [39.195, -6.275],
                        [39.195, -6.295],
                        [39.185, -6.305],
                        [39.165, -6.305],
                        [39.155, -6.295],
                        [39.155, -6.275],
                        [39.165, -6.265]
                    ]]
                }
            },
            {
                type: "Feature",
                properties: {
                    name: "Pemba Channel Conservation Area",
                    name_sw: "Eneo la Hifadhi la Pemba Channel",
                    type: "mpa",
                    status: "Active",
                    established: 2005,
                    area_km2: 380,
                    description: "Deep-water conservation area between Pemba and mainland Tanzania"
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [[
                        [39.50, -4.95],
                        [39.58, -4.95],
                        [39.60, -5.10],
                        [39.60, -5.30],
                        [39.55, -5.40],
                        [39.45, -5.40],
                        [39.40, -5.30],
                        [39.40, -5.10],
                        [39.45, -4.98],
                        [39.50, -4.95]
                    ]]
                }
            },
            {
                type: "Feature",
                properties: {
                    name: "Misali Island Marine Conservation Area",
                    name_sw: "Eneo la Hifadhi la Bahari la Misali",
                    type: "mpa",
                    status: "Active",
                    established: 1998,
                    area_km2: 21.6,
                    description: "Important nesting site for hawksbill and green turtles"
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [[
                        [39.60, -5.20],
                        [39.66, -5.20],
                        [39.70, -5.24],
                        [39.70, -5.30],
                        [39.66, -5.34],
                        [39.60, -5.34],
                        [39.56, -5.30],
                        [39.56, -5.24],
                        [39.60, -5.20]
                    ]]
                }
            }
        ]
    },

    // Artisanal Fishing Zones
    artisanalZones: {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                properties: {
                    name: "Stone Town Fishing Zone",
                    type: "artisanal",
                    fishers: 2500,
                    main_catch: ["Octopus", "Reef fish", "Lobster"],
                    vessels: 450
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [[
                        [39.10, -6.08],
                        [39.20, -6.08],
                        [39.22, -6.20],
                        [39.18, -6.30],
                        [39.08, -6.25],
                        [39.05, -6.15],
                        [39.10, -6.08]
                    ]]
                }
            },
            {
                type: "Feature",
                properties: {
                    name: "Nungwi Fishing Zone",
                    type: "artisanal",
                    fishers: 1800,
                    main_catch: ["Tuna", "Kingfish", "Snapper"],
                    vessels: 320
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [[
                        [39.25, -5.68],
                        [39.35, -5.68],
                        [39.38, -5.78],
                        [39.30, -5.85],
                        [39.20, -5.80],
                        [39.18, -5.72],
                        [39.25, -5.68]
                    ]]
                }
            },
            {
                type: "Feature",
                properties: {
                    name: "Chwaka Bay Fishing Zone",
                    type: "artisanal",
                    fishers: 3200,
                    main_catch: ["Sea cucumber", "Octopus", "Crab"],
                    vessels: 580
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [[
                        [39.40, -6.08],
                        [39.50, -6.05],
                        [39.52, -6.15],
                        [39.48, -6.25],
                        [39.38, -6.22],
                        [39.36, -6.12],
                        [39.40, -6.08]
                    ]]
                }
            },
            {
                type: "Feature",
                properties: {
                    name: "Wete Fishing Zone",
                    type: "artisanal",
                    fishers: 1500,
                    main_catch: ["Tuna", "Marlin", "Reef fish"],
                    vessels: 280
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [[
                        [39.68, -4.92],
                        [39.78, -4.92],
                        [39.82, -5.02],
                        [39.78, -5.12],
                        [39.68, -5.10],
                        [39.64, -5.00],
                        [39.68, -4.92]
                    ]]
                }
            }
        ]
    },

    // Deep Sea Potential Areas
    deepSeaPotential: {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                properties: {
                    name: "Unguja Deep Water Zone",
                    type: "deep_sea",
                    depth_range: "200-1000m",
                    potential_species: ["Deep-water snapper", "Grouper", "Swordfish"],
                    status: "Under exploration"
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [[
                        [39.50, -5.80],
                        [39.70, -5.80],
                        [39.75, -6.10],
                        [39.70, -6.40],
                        [39.50, -6.40],
                        [39.45, -6.10],
                        [39.50, -5.80]
                    ]]
                }
            },
            {
                type: "Feature",
                properties: {
                    name: "Pemba Deep Channel Zone",
                    type: "deep_sea",
                    depth_range: "500-2000m",
                    potential_species: ["Tuna", "Swordfish", "Deep-sea sharks"],
                    status: "High potential"
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [[
                        [39.30, -4.80],
                        [39.55, -4.80],
                        [39.55, -5.50],
                        [39.30, -5.50],
                        [39.30, -4.80]
                    ]]
                }
            }
        ]
    },

    // Coral Reef Areas
    coralReefs: {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                properties: {
                    name: "Mnemba Atoll Reef",
                    health_status: "Good",
                    coral_cover: 45,
                    biodiversity_index: 8.5,
                    threats: ["Tourism pressure", "Climate change"]
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [[
                        [39.36, -5.80],
                        [39.40, -5.80],
                        [39.42, -5.84],
                        [39.40, -5.88],
                        [39.36, -5.88],
                        [39.34, -5.84],
                        [39.36, -5.80]
                    ]]
                }
            },
            {
                type: "Feature",
                properties: {
                    name: "Chumbe Reef System",
                    health_status: "Excellent",
                    coral_cover: 65,
                    biodiversity_index: 9.2,
                    threats: ["Minimal - Protected"]
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [[
                        [39.16, -6.27],
                        [39.19, -6.27],
                        [39.20, -6.29],
                        [39.19, -6.31],
                        [39.16, -6.31],
                        [39.15, -6.29],
                        [39.16, -6.27]
                    ]]
                }
            },
            {
                type: "Feature",
                properties: {
                    name: "Tumbatu Island Reef",
                    health_status: "Moderate",
                    coral_cover: 35,
                    biodiversity_index: 7.2,
                    threats: ["Sedimentation", "Overfishing"]
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [[
                        [39.10, -5.82],
                        [39.15, -5.82],
                        [39.16, -5.86],
                        [39.14, -5.90],
                        [39.09, -5.89],
                        [39.08, -5.85],
                        [39.10, -5.82]
                    ]]
                }
            },
            {
                type: "Feature",
                properties: {
                    name: "Pemba Western Reef Complex",
                    health_status: "Good",
                    coral_cover: 50,
                    biodiversity_index: 8.8,
                    threats: ["Climate change", "Crown-of-thorns starfish"]
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [[
                        [39.58, -5.00],
                        [39.62, -5.00],
                        [39.64, -5.15],
                        [39.62, -5.30],
                        [39.58, -5.30],
                        [39.56, -5.15],
                        [39.58, -5.00]
                    ]]
                }
            },
            {
                type: "Feature",
                properties: {
                    name: "Stone Town Fringing Reef",
                    health_status: "Poor",
                    coral_cover: 20,
                    biodiversity_index: 5.5,
                    threats: ["Pollution", "Sedimentation", "Anchor damage"]
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [[
                        [39.16, -6.14],
                        [39.20, -6.14],
                        [39.21, -6.18],
                        [39.19, -6.22],
                        [39.15, -6.21],
                        [39.14, -6.17],
                        [39.16, -6.14]
                    ]]
                }
            }
        ]
    },

    // Mangrove Areas
    mangroves: {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                properties: {
                    name: "Chwaka Bay Mangroves",
                    area_ha: 3000,
                    species: ["Rhizophora mucronata", "Avicennia marina", "Sonneratia alba"],
                    status: "Protected",
                    carbon_storage: "High"
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [[
                        [39.42, -6.10],
                        [39.48, -6.08],
                        [39.50, -6.12],
                        [39.48, -6.18],
                        [39.42, -6.18],
                        [39.40, -6.14],
                        [39.42, -6.10]
                    ]]
                }
            },
            {
                type: "Feature",
                properties: {
                    name: "Menai Bay Mangroves",
                    area_ha: 2500,
                    species: ["Rhizophora mucronata", "Ceriops tagal", "Bruguiera gymnorrhiza"],
                    status: "Conservation Area",
                    carbon_storage: "High"
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [[
                        [39.28, -6.30],
                        [39.35, -6.28],
                        [39.38, -6.35],
                        [39.35, -6.42],
                        [39.28, -6.42],
                        [39.25, -6.36],
                        [39.28, -6.30]
                    ]]
                }
            },
            {
                type: "Feature",
                properties: {
                    name: "Jozani Mangrove Forest",
                    area_ha: 1800,
                    species: ["Heritiera littoralis", "Xylocarpus granatum", "Avicennia marina"],
                    status: "National Park",
                    carbon_storage: "Very High"
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [[
                        [39.40, -6.25],
                        [39.45, -6.24],
                        [39.46, -6.28],
                        [39.44, -6.32],
                        [39.39, -6.31],
                        [39.38, -6.27],
                        [39.40, -6.25]
                    ]]
                }
            },
            {
                type: "Feature",
                properties: {
                    name: "Pemba Ngezi Mangroves",
                    area_ha: 1200,
                    species: ["Rhizophora mucronata", "Sonneratia alba"],
                    status: "Forest Reserve",
                    carbon_storage: "High"
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [[
                        [39.68, -4.90],
                        [39.73, -4.88],
                        [39.75, -4.92],
                        [39.73, -4.98],
                        [39.68, -4.98],
                        [39.66, -4.94],
                        [39.68, -4.90]
                    ]]
                }
            }
        ]
    },

    // Seagrass Beds
    seagrass: {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                properties: {
                    name: "Chwaka Bay Seagrass Meadows",
                    area_ha: 4500,
                    dominant_species: "Thalassia hemprichii",
                    status: "Dense",
                    ecosystem_service: "Dugong habitat, carbon sequestration"
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [[
                        [39.38, -6.05],
                        [39.50, -6.02],
                        [39.52, -6.10],
                        [39.50, -6.20],
                        [39.40, -6.22],
                        [39.35, -6.15],
                        [39.38, -6.05]
                    ]]
                }
            },
            {
                type: "Feature",
                properties: {
                    name: "Menai Bay Seagrass",
                    area_ha: 3200,
                    dominant_species: "Cymodocea serrulata",
                    status: "Moderate",
                    ecosystem_service: "Sea turtle feeding ground"
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [[
                        [39.22, -6.25],
                        [39.32, -6.23],
                        [39.35, -6.32],
                        [39.30, -6.42],
                        [39.20, -6.40],
                        [39.18, -6.32],
                        [39.22, -6.25]
                    ]]
                }
            },
            {
                type: "Feature",
                properties: {
                    name: "Nungwi Seagrass",
                    area_ha: 800,
                    dominant_species: "Thalassodendron ciliatum",
                    status: "Sparse",
                    ecosystem_service: "Fish nursery"
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [[
                        [39.28, -5.70],
                        [39.34, -5.70],
                        [39.35, -5.75],
                        [39.32, -5.80],
                        [39.26, -5.78],
                        [39.26, -5.73],
                        [39.28, -5.70]
                    ]]
                }
            }
        ]
    },

    // Sea Surface Temperature Heatmap Points
    sstData: {
        type: "FeatureCollection",
        features: [
            { type: "Feature", properties: { temp: 29.2, weight: 0.9 }, geometry: { type: "Point", coordinates: [39.50, -5.70] }},
            { type: "Feature", properties: { temp: 28.8, weight: 0.85 }, geometry: { type: "Point", coordinates: [39.55, -5.80] }},
            { type: "Feature", properties: { temp: 29.5, weight: 0.95 }, geometry: { type: "Point", coordinates: [39.45, -5.90] }},
            { type: "Feature", properties: { temp: 28.5, weight: 0.8 }, geometry: { type: "Point", coordinates: [39.35, -6.00] }},
            { type: "Feature", properties: { temp: 28.2, weight: 0.75 }, geometry: { type: "Point", coordinates: [39.25, -6.10] }},
            { type: "Feature", properties: { temp: 27.8, weight: 0.7 }, geometry: { type: "Point", coordinates: [39.15, -6.20] }},
            { type: "Feature", properties: { temp: 28.0, weight: 0.72 }, geometry: { type: "Point", coordinates: [39.20, -6.30] }},
            { type: "Feature", properties: { temp: 28.3, weight: 0.78 }, geometry: { type: "Point", coordinates: [39.30, -6.40] }},
            { type: "Feature", properties: { temp: 29.0, weight: 0.88 }, geometry: { type: "Point", coordinates: [39.70, -5.00] }},
            { type: "Feature", properties: { temp: 29.3, weight: 0.92 }, geometry: { type: "Point", coordinates: [39.75, -5.10] }},
            { type: "Feature", properties: { temp: 28.7, weight: 0.82 }, geometry: { type: "Point", coordinates: [39.65, -5.20] }},
            { type: "Feature", properties: { temp: 28.4, weight: 0.77 }, geometry: { type: "Point", coordinates: [39.60, -5.30] }},
            { type: "Feature", properties: { temp: 29.8, weight: 1.0 }, geometry: { type: "Point", coordinates: [39.80, -4.95] }},
            { type: "Feature", properties: { temp: 29.1, weight: 0.89 }, geometry: { type: "Point", coordinates: [39.40, -5.75] }},
            { type: "Feature", properties: { temp: 27.5, weight: 0.65 }, geometry: { type: "Point", coordinates: [39.10, -6.00] }},
            { type: "Feature", properties: { temp: 28.9, weight: 0.86 }, geometry: { type: "Point", coordinates: [39.48, -6.15] }}
        ]
    },

    // Key locations for search functionality
    locations: [
        { name: "Stone Town", name_sw: "Mji Mkongwe", coordinates: [39.1880, -6.1622], type: "city" },
        { name: "Nungwi", name_sw: "Nungwi", coordinates: [39.2983, -5.7264], type: "village" },
        { name: "Paje", name_sw: "Paje", coordinates: [39.5333, -6.2667], type: "village" },
        { name: "Jambiani", name_sw: "Jambiani", coordinates: [39.5500, -6.3167], type: "village" },
        { name: "Kendwa", name_sw: "Kendwa", coordinates: [39.2333, -5.7833], type: "village" },
        { name: "Matemwe", name_sw: "Matemwe", coordinates: [39.3500, -5.8333], type: "village" },
        { name: "Kizimkazi", name_sw: "Kizimkazi", coordinates: [39.4500, -6.4333], type: "village" },
        { name: "Chake Chake", name_sw: "Chake Chake", coordinates: [39.7667, -5.2333], type: "city" },
        { name: "Wete", name_sw: "Wete", coordinates: [39.7333, -5.0500], type: "town" },
        { name: "Mkoani", name_sw: "Mkoani", coordinates: [39.6500, -5.3333], type: "town" },
        { name: "Mnemba Island", name_sw: "Kisiwa cha Mnemba", coordinates: [39.3833, -5.8167], type: "island" },
        { name: "Chumbe Island", name_sw: "Kisiwa cha Chumbe", coordinates: [39.1750, -6.2833], type: "island" },
        { name: "Tumbatu Island", name_sw: "Kisiwa cha Tumbatu", coordinates: [39.1167, -5.8500], type: "island" },
        { name: "Misali Island", name_sw: "Kisiwa cha Misali", coordinates: [39.6333, -5.2667], type: "island" },
        { name: "Changuu Island", name_sw: "Kisiwa cha Changuu", coordinates: [39.1667, -6.1167], type: "island" }
    ],

    // Marine species catalog
    species: [
        { name: "Green Turtle", scientific: "Chelonia mydas", status: "Endangered", habitat: "Seagrass beds" },
        { name: "Hawksbill Turtle", scientific: "Eretmochelys imbricata", status: "Critically Endangered", habitat: "Coral reefs" },
        { name: "Indo-Pacific Bottlenose Dolphin", scientific: "Tursiops aduncus", status: "Near Threatened", habitat: "Coastal waters" },
        { name: "Humpback Whale", scientific: "Megaptera novaeangliae", status: "Least Concern", habitat: "Deep water - seasonal" },
        { name: "Whale Shark", scientific: "Rhincodon typus", status: "Endangered", habitat: "Pelagic" },
        { name: "Dugong", scientific: "Dugong dugon", status: "Vulnerable", habitat: "Seagrass meadows" },
        { name: "Giant Grouper", scientific: "Epinephelus lanceolatus", status: "Vulnerable", habitat: "Coral reefs" },
        { name: "Napoleon Wrasse", scientific: "Cheilinus undulatus", status: "Endangered", habitat: "Coral reefs" },
        { name: "Yellowfin Tuna", scientific: "Thunnus albacares", status: "Near Threatened", habitat: "Pelagic" },
        { name: "Octopus", scientific: "Octopus cyanea", status: "Least Concern", habitat: "Reef flats" }
    ],

    // Statistics data
    statistics: {
        totalMpaArea: 923.93, // km²
        coralReefCoverage: 850, // km²
        mangroveArea: 8500, // ha
        seagrassArea: 8500, // ha
        registeredFishers: 38000,
        fishingVessels: 8500,
        annualCatch: 35000, // tonnes
        fisheryGDP: 4.8 // percent
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ZanzibarGeoData;
}

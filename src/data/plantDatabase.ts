
export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  type: 'tree' | 'shrub' | 'perennial' | 'annual' | 'grass';
  droughtTolerance: number; // 1-10 scale
  temperatureRange: {
    min: number; // Celsius
    max: number;
  };
  soilTypes: string[];
  humidityRange: {
    min: number; // percentage
    max: number;
  };
  rainfallRange: {
    min: number; // mm per year
    max: number;
  };
  nativeRegions: string[];
  description: string;
  benefits: string[];
  image: string;
}

export const plantDatabase: Plant[] = [
  {
    id: '1',
    name: 'Desert Marigold',
    scientificName: 'Baileya multiradiata',
    type: 'perennial',
    droughtTolerance: 9,
    temperatureRange: { min: 5, max: 45 },
    soilTypes: ['sandy', 'rocky', 'clay'],
    humidityRange: { min: 10, max: 60 },
    rainfallRange: { min: 100, max: 500 },
    nativeRegions: ['Southwest US', 'Northern Mexico'],
    description: 'Bright yellow flowers bloom year-round in warm climates',
    benefits: ['Pollinator friendly', 'Low maintenance', 'Erosion control'],
    image: '🌼'
  },
  {
    id: '2',
    name: 'Blue Grama Grass',
    scientificName: 'Bouteloua gracilis',
    type: 'grass',
    droughtTolerance: 8,
    temperatureRange: { min: -20, max: 40 },
    soilTypes: ['sandy', 'loamy', 'clay'],
    humidityRange: { min: 20, max: 70 },
    rainfallRange: { min: 200, max: 800 },
    nativeRegions: ['Great Plains', 'Southwest US'],
    description: 'Hardy native grass with distinctive seed heads',
    benefits: ['Wildlife habitat', 'Soil stabilization', 'Livestock forage'],
    image: '🌾'
  },
  {
    id: '3',
    name: 'Palo Verde',
    scientificName: 'Parkinsonia florida',
    type: 'tree',
    droughtTolerance: 10,
    temperatureRange: { min: 0, max: 50 },
    soilTypes: ['sandy', 'rocky', 'caliche'],
    humidityRange: { min: 5, max: 50 },
    rainfallRange: { min: 75, max: 400 },
    nativeRegions: ['Sonoran Desert', 'Arizona', 'California'],
    description: 'State tree of Arizona with green bark and yellow flowers',
    benefits: ['Shade provider', 'Nitrogen fixation', 'Wildlife food'],
    image: '🌳'
  },
  {
    id: '4',
    name: 'Lavender',
    scientificName: 'Lavandula angustifolia',
    type: 'shrub',
    droughtTolerance: 8,
    temperatureRange: { min: -15, max: 35 },
    soilTypes: ['sandy', 'loamy', 'rocky'],
    humidityRange: { min: 30, max: 60 },
    rainfallRange: { min: 300, max: 700 },
    nativeRegions: ['Mediterranean', 'Western US adapted'],
    description: 'Aromatic purple flowers with medicinal properties',
    benefits: ['Pollinator magnet', 'Aromatic', 'Medicinal uses'],
    image: '💜'
  },
  {
    id: '5',
    name: 'Brittlebush',
    scientificName: 'Encelia farinosa',
    type: 'shrub',
    droughtTolerance: 9,
    temperatureRange: { min: 5, max: 45 },
    soilTypes: ['sandy', 'rocky', 'gravelly'],
    humidityRange: { min: 10, max: 50 },
    rainfallRange: { min: 100, max: 400 },
    nativeRegions: ['Sonoran Desert', 'Mojave Desert'],
    description: 'Silver-green foliage with bright yellow daisy flowers',
    benefits: ['Long blooming period', 'Wildlife food', 'Erosion control'],
    image: '🌻'
  },
  {
    id: '6',
    name: 'Texas Sage',
    scientificName: 'Leucophyllum frutescens',
    type: 'shrub',
    droughtTolerance: 9,
    temperatureRange: { min: -5, max: 45 },
    soilTypes: ['sandy', 'rocky', 'caliche'],
    humidityRange: { min: 15, max: 55 },
    rainfallRange: { min: 150, max: 500 },
    nativeRegions: ['Texas', 'New Mexico', 'Northern Mexico'],
    description: 'Silver foliage with tubular purple flowers after rain',
    benefits: ['Drought indicator', 'Low maintenance', 'Colorful blooms'],
    image: '🌺'
  },
  {
    id: '7',
    name: 'Agave',
    scientificName: 'Agave americana',
    type: 'perennial',
    droughtTolerance: 10,
    temperatureRange: { min: -5, max: 50 },
    soilTypes: ['sandy', 'rocky', 'well-draining'],
    humidityRange: { min: 5, max: 40 },
    rainfallRange: { min: 50, max: 300 },
    nativeRegions: ['Mexico', 'Southwest US'],
    description: 'Large succulent with dramatic architectural form',
    benefits: ['Architectural interest', 'Extremely drought tolerant', 'Wildlife habitat'],
    image: '🌵'
  },
  {
    id: '8',
    name: 'Feather Reed Grass',
    scientificName: 'Calamagrostis acutiflora',
    type: 'grass',
    droughtTolerance: 7,
    temperatureRange: { min: -25, max: 35 },
    soilTypes: ['clay', 'loamy', 'sandy'],
    humidityRange: { min: 40, max: 80 },
    rainfallRange: { min: 400, max: 1000 },
    nativeRegions: ['Northern Europe', 'Adapted to North America'],
    description: 'Tall ornamental grass with feathery plumes',
    benefits: ['Four-season interest', 'Wind resistant', 'Low maintenance'],
    image: '🌾'
  }
];

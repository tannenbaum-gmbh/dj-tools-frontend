export interface Equipment {
  id: string;
  name: string;
  category: 'Controller' | 'Speaker' | 'Turntable' | 'Mixer' | 'Lighting' | 'Monitor' | 'Accessory';
  dimensions: {
    width: number;  // cm
    height: number; // cm
    depth: number;  // cm
  };
  weight: number; // kg
  emoji: string;
}

export const EQUIPMENT_ITEMS: Equipment[] = [
  // Controllers
  {
    id: 'controller-pioneer-ddj-1000',
    name: 'Pioneer DDJ-1000',
    category: 'Controller',
    dimensions: { width: 71.4, height: 10.7, depth: 48.4 },
    weight: 9.6,
    emoji: '🎛️'
  },
  {
    id: 'controller-ddj-400',
    name: 'Pioneer DDJ-400',
    category: 'Controller',
    dimensions: { width: 48.7, height: 5.8, depth: 27.2 },
    weight: 2.1,
    emoji: '🎛️'
  },
  {
    id: 'controller-traktor-s4',
    name: 'Traktor Kontrol S4',
    category: 'Controller',
    dimensions: { width: 56.0, height: 8.5, depth: 35.0 },
    weight: 5.3,
    emoji: '🎛️'
  },

  // Turntables
  {
    id: 'turntable-technics-1200',
    name: 'Technics SL-1200',
    category: 'Turntable',
    dimensions: { width: 45.3, height: 16.9, depth: 35.3 },
    weight: 11.5,
    emoji: '💿'
  },
  {
    id: 'turntable-audio-technica-lp120',
    name: 'Audio-Technica AT-LP120',
    category: 'Turntable',
    dimensions: { width: 45.0, height: 15.7, depth: 35.2 },
    weight: 10.2,
    emoji: '💿'
  },

  // Mixers
  {
    id: 'mixer-pioneer-djm-900',
    name: 'Pioneer DJM-900NXS2',
    category: 'Mixer',
    dimensions: { width: 42.0, height: 10.9, depth: 41.9 },
    weight: 8.0,
    emoji: '🔊'
  },
  {
    id: 'mixer-allen-heath-xone92',
    name: 'Allen & Heath Xone:92',
    category: 'Mixer',
    dimensions: { width: 42.0, height: 11.0, depth: 35.3 },
    weight: 7.5,
    emoji: '🔊'
  },

  // Speakers
  {
    id: 'speaker-jbl-eon615',
    name: 'JBL EON615',
    category: 'Speaker',
    dimensions: { width: 44.6, height: 68.3, depth: 38.1 },
    weight: 19.5,
    emoji: '🔈'
  },
  {
    id: 'speaker-qsc-k12',
    name: 'QSC K12.2',
    category: 'Speaker',
    dimensions: { width: 37.3, height: 60.7, depth: 35.1 },
    weight: 16.3,
    emoji: '🔈'
  },
  {
    id: 'speaker-mackie-srm450',
    name: 'Mackie SRM450',
    category: 'Speaker',
    dimensions: { width: 35.6, height: 58.4, depth: 33.0 },
    weight: 14.5,
    emoji: '🔈'
  },

  // Monitors
  {
    id: 'monitor-krk-rokit5',
    name: 'KRK Rokit 5',
    category: 'Monitor',
    dimensions: { width: 18.4, height: 28.5, depth: 21.3 },
    weight: 5.2,
    emoji: '🎧'
  },
  {
    id: 'monitor-yamaha-hs5',
    name: 'Yamaha HS5',
    category: 'Monitor',
    dimensions: { width: 17.0, height: 28.5, depth: 22.2 },
    weight: 5.3,
    emoji: '🎧'
  },

  // Lighting
  {
    id: 'lighting-par-led',
    name: 'LED PAR Light',
    category: 'Lighting',
    dimensions: { width: 25.0, height: 30.0, depth: 25.0 },
    weight: 2.8,
    emoji: '💡'
  },
  {
    id: 'lighting-moving-head',
    name: 'Moving Head Light',
    category: 'Lighting',
    dimensions: { width: 30.0, height: 45.0, depth: 30.0 },
    weight: 8.5,
    emoji: '💡'
  },

  // Accessories
  {
    id: 'accessory-laptop',
    name: 'Laptop (15")',
    category: 'Accessory',
    dimensions: { width: 36.0, height: 2.5, depth: 25.0 },
    weight: 2.2,
    emoji: '💻'
  },
  {
    id: 'accessory-case-large',
    name: 'Flight Case (Large)',
    category: 'Accessory',
    dimensions: { width: 80.0, height: 50.0, depth: 50.0 },
    weight: 15.0,
    emoji: '🧳'
  },
  {
    id: 'accessory-case-medium',
    name: 'Flight Case (Medium)',
    category: 'Accessory',
    dimensions: { width: 60.0, height: 40.0, depth: 40.0 },
    weight: 10.0,
    emoji: '🧳'
  },
  {
    id: 'accessory-cables',
    name: 'Cable Bag',
    category: 'Accessory',
    dimensions: { width: 40.0, height: 15.0, depth: 30.0 },
    weight: 3.5,
    emoji: '🔌'
  },
  {
    id: 'accessory-mic-stand',
    name: 'Microphone Stand',
    category: 'Accessory',
    dimensions: { width: 10.0, height: 100.0, depth: 10.0 },
    weight: 2.5,
    emoji: '🎤'
  },
];

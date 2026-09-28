// Photo briefs: the shots we want from Jake before launch.
// Each <PhotoSlot brief="..."> on the site pulls its direction from here, and
// /photo-shot-list/ renders the full list to hand to the photographer.
// Turn the on-page notes off for launch with `site.showPhotoNotes = false`.

export type PhotoBrief = {
  title: string;
  shot: string; // what we're after
  notes: string[]; // styling / composition direction
  orientation: 'Vertical 4:5' | 'Horizontal 3:2' | 'Square 1:1' | 'Vertical 2:3';
  usedOn: string[];
};

export const photoBriefs = {
  'chef-portrait': {
    title: 'Chef Jacob portrait',
    shot: 'A current, confident portrait of Jacob, waist-up, looking toward the camera.',
    notes: [
      'Chef whites or a crisp apron, sleeves rolled',
      'Warm natural window light, kitchen softly out of focus behind him',
      'A relaxed, approachable expression. Hosts are inviting him into their home.',
      'Leave some breathing room above his head for cropping',
    ],
    orientation: 'Vertical 4:5',
    usedOn: ['About: bio', 'Homepage: meet the chef'],
  },
  family: {
    title: 'The Ritenour family',
    shot: 'An updated family photo: the people behind the business.',
    notes: [
      'Candid and warm, e.g. around a table, in the kitchen, or outdoors',
      'Natural color, nothing too posed',
      'Horizontal framing with space on one side for text',
    ],
    orientation: 'Horizontal 3:2',
    usedOn: ['About: family section'],
  },
  'team-service': {
    title: 'BabyBlue serving guests',
    shot: 'Jacob or staff serving a course at a real event, with guests enjoying the moment.',
    notes: [
      'Focus on the server and the plate, guests laughing in soft focus',
      'Show the setting: a beautiful table, glassware, candles',
      'Any event type works: dinner party, wedding, corporate',
    ],
    orientation: 'Horizontal 3:2',
    usedOn: ['About: mission'],
  },
  'chef-hands': {
    title: 'Hands at work',
    shot: 'A close-up detail of Jacob’s hands finishing a plate: garnishing, saucing or slicing.',
    notes: [
      'Tight crop, shallow depth of field',
      'A signature dish if possible (sushi, scallops, filet)',
      'Clean, uncluttered background',
    ],
    orientation: 'Square 1:1',
    usedOn: ['About: mission'],
  },
} satisfies Record<string, PhotoBrief>;

export type PhotoBriefKey = keyof typeof photoBriefs;

export const photoSpecs = [
  'Minimum 2400px on the long edge, JPG or high-quality export',
  'Natural, true-to-life color; no heavy filters',
  'Real BabyBlue food, events and people only (no stock)',
  'Signed model releases for any guests who are recognizable',
];

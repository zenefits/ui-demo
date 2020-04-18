// NOTE: delete this file for a real app
// this is just to provide a little interactivity in the Example app

export type ObjectType = {
  id: string;
  name: string;
  created: string;
  origin: ObjectOrigin[];
  size?: ObjectSize;
  category?: ObjectCategory;
};

enum ObjectOrigin {
  Africa = 'Africa',
  Asia = 'Asia',
  Australia = 'Australia',
  Europe = 'Europe',
  'North America' = 'North America',
  'South America' = 'South America',
}
export const objectOriginOptions = Object.keys(ObjectOrigin);

enum ObjectSize {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
}
export const objectSizeOptions = Object.keys(ObjectSize);

export type ObjectCategory = '' | 'Navigation' | 'Textiles' | 'Food' | 'Education' | 'Transportation';

const objectData: ObjectType[] = [
  {
    id: '111',
    name: 'Compass',
    origin: [ObjectOrigin.Asia, ObjectOrigin.Europe],
    created: '10',
    size: ObjectSize.Small,
    category: 'Navigation',
  },
  {
    id: '222',
    name: 'Fireworks',
    origin: [ObjectOrigin.Asia],
    created: '960',
    size: ObjectSize.Medium,
  },
  {
    id: '333',
    name: 'Sewing Machine',
    origin: [ObjectOrigin.Europe],
    created: '1790',
    size: ObjectSize.Large,
    category: 'Textiles',
  },
  {
    id: '444',
    name: 'Peanut Butter',
    origin: [ObjectOrigin['North America']],
    created: '1848',
    size: ObjectSize.Small,
    category: 'Food',
  },
  {
    id: '555',
    name: 'Atomic Clock',
    origin: [ObjectOrigin['North America']],
    created: '1948',
    size: ObjectSize.Medium,
    category: 'Navigation',
  },
];

export function getMockedObjects(): ObjectType[] {
  return objectData;
}

export function getMockedObject(objectId: string): ObjectType {
  return objectData.find(object => object.id === objectId);
}

export function createMockedObject(object: ObjectType): void {
  objectData.unshift(object);
}

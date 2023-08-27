type Spec = [string, string];

export type SpecsObject = {
  [key: string]: [string, string] | SpecsObject
};

type ValueObject = {
  [key: string]: string | number | ValueObject
};

export const SPECS: SpecsObject = {
  network: {
    radios: {
      na: {
        maxPower: ['Max. Power', 'W'],
        maxSpeedMegabitsPerSecond: ['Speed', 'Mbps']
      },
    },
    numberOfPorts: ['Number of Ports', ''],
  },
};

export function getSpec(specs: ValueObject, dict = SPECS): Spec[] {
  const result: Spec[] = [];

  for (const spec in specs) {
    if (Array.isArray(dict[spec])) {
      result.push([dict[spec][0] as string, specs[spec] as string + dict[spec][1]]);
    }

    if (typeof dict[spec] === 'object') {
      result.push(...getSpec(specs[spec] as ValueObject, dict[spec] as SpecsObject));
    }
  }

  return result;
}

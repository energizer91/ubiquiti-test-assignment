// width, height
type ImageResolution = [number, number];

export type FilterLine = {
  id: string;
  name: string;
};

export type Icon = {
  /** used for image urls */
  id: string;
  /**
   * ordered list of available image sizes (width and height)
   * - images should be square
   * - notice that a lot of devices have a more limited set of sizes than others
   */
  resolutions: ImageResolution[];
};

export interface Item {
  /** primary key */
  id: string;
  /** what you use for Filters */
  line: FilterLine;
  /** multiple lookup keys as used by various systems and their versions */
  shortnames: string[];
  product: {
    /** human-readable name */
    name: string;
  };
  icon: Icon;
  unifi?: {
    adoptability: string;
    network?: {
      radios?: {
        na?: {
          gain: number;
          maxPower: number;
          maxSpeedMegabitsPerSecond: number;
        };
        ng?: {
          gain: number;
          maxPower: number;
          maxSpeedMegabitsPerSecond: number;
        };
      };
      numberOfPorts?: number;
      ethernetMaxSpeedMegabitsPerSecond?: number;
    };
  };
}

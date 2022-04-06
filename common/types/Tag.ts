export enum TagTypes {
  DIFFICULTY = "DIFFICULTY",
  FEELING = "FEELING",
  ARTIST = "ARTIST",
  SMART = "SMART",
  KIND = "KIND",
}

export interface Tag<T extends TagTypes = TagTypes> {
  type?: T;
  text: string;
}

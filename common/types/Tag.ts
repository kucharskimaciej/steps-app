export enum TagTypes {
  DIFFICULTY = "DIFFICULTY",
  DANCE = "DANCE",
  ARTIST = "ARTIST",
  SMART = "SMART"
}

export interface Tag<T extends TagTypes = TagTypes> {
  type?: T;
  text: string;
}

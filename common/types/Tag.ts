export enum TagTypes {
  DIFFICULTY = "DIFFICULTY",
  DANCE = "DANCE",
  ARTIST = "ARTIST"
}

export interface Tag<T extends TagTypes = TagTypes> {
  type?: T;
  text: string;
}

export type ArtistTag = Tag<typeof TagTypes.ARTIST>;
export type DanceTag = Tag<typeof TagTypes.DANCE>;

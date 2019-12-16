export enum TagTypes {
  DIFFICULTY = "DIFFICULTY",
  DANCE = "DANCE"
}

export interface Tag {
  type?: TagTypes;
  text: string;
}

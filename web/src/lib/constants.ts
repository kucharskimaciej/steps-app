import { Tag, TagTypes } from "../../../types/Tag";

function makeTags(type: TagTypes, ...tags: string[]): Tag[] {
    return tags.map((text) => ({ type, text }));
}

export const DANCE_TAGS = makeTags(TagTypes.DANCE, "Semba", "Kizomba", );

import { TagTypes } from "../../../types/Tag";
function makeTags(type, ...tags) {
    return tags.map((text) => ({ type, text }));
}
export const DANCE_TAGS = makeTags(TagTypes.DANCE, "Semba", "Kizomba");
//# sourceMappingURL=constants.js.map
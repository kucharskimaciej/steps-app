import { RawStep, Step, TagCategories } from "../../common/types/Step";
import { Tag, TagTypes } from "../../common/types/Tag";
import { FEELINGS, STEP_DIFFICULTIES, KINDS } from "../../common/constants";

export function convertToStep(
  raw: RawStep,
  variationsByKey?: Record<string, RawStep[]> | null
): Step {
  const {
    identifier,
    id,
    tags = [],
    feeling = [],
    difficulty,
    owner_uid,
    created_at,
    name,
    videos,
    artists = [],
    notes,
    smart_tags,
    variationKey,
    practice_records,
    view_records,
    kind
  } = raw;

  const artistTags: Tag<TagTypes.ARTIST>[] = artists.map(artist => ({
    type: TagTypes.ARTIST,
    text: artist
  }));

  const feelingTags: Tag<TagTypes.FEELING>[] = feeling.map(f => ({
    type: TagTypes.FEELING,
    text: FEELINGS[f]
  }));

  const kindTag: Tag<TagTypes.KIND> = {
    type: TagTypes.KIND,
    text: KINDS[kind]
  };

  const difficultyTag: Tag<TagTypes.DIFFICULTY> = {
    type: TagTypes.DIFFICULTY,
    text: STEP_DIFFICULTIES[difficulty]
  };

  const metaTags: Tag[] = [
    kindTag,
    ...feelingTags,
    ...artistTags,
    difficultyTag
  ];

  const contentTags: Tag[] = [
    ...tags.map(tag => ({
      text: tag
    })),
    ...(smart_tags || []).map(tag => ({
      type: TagTypes.SMART,
      text: tag
    }))
  ];

  const tagCategories: TagCategories = {
    artist: artistTags,
    feeling: feelingTags,
    difficulty: [difficultyTag],
    content: contentTags,
    meta: metaTags,
    kind: [kindTag],
    all: [...metaTags, ...contentTags]
  };

  const variations =
    variationsByKey && variationsByKey[variationKey] && variationKey
      ? variationsByKey[variationKey]
          .filter(ref => ref.id !== raw.id)
          .map(rawStep => convertToStep(rawStep))
      : [];

  return {
    identifier,
    id,
    tags: tagCategories,
    videos,
    name,
    notes,
    created_at,
    owner_uid,
    variations,
    variationKey,
    practice_records,
    view_records
  };
}

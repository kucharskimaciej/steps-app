import {
  RawStep,
  Step,
  StepRef,
  TagCategories
} from "../../../common/types/Step";
import { Tag, TagTypes } from "../../../common/types/Tag";
import { DANCES, STEP_DIFFICULTIES, KINDS } from "../../../common/constants";

export function convertToStepRef({
  name,
  id,
  identifier
}: Step | RawStep): StepRef {
  return { name, id, identifier };
}

export function convertToStep(
  variationsByKey: Record<string, RawStep[]> | null,
  raw: RawStep
): Step {
  const {
    identifier,
    id,
    tags,
    dance,
    difficulty,
    owner_uid,
    created_at,
    name,
    videos,
    artists,
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

  const danceTags: Tag<TagTypes.DANCE>[] = dance.map(d => ({
    type: TagTypes.DANCE,
    text: DANCES[d]
  }));

  const kindTag: Tag<TagTypes.KIND> = {
    type: TagTypes.KIND,
    text: KINDS[kind]
  };

  const difficultyTag: Tag<TagTypes.DIFFICULTY> = {
    type: TagTypes.DIFFICULTY,
    text: STEP_DIFFICULTIES[difficulty]
  };

  const metaTags: Tag[] = [kindTag, ...danceTags, ...artistTags, difficultyTag];

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
    dance: danceTags,
    difficulty: [difficultyTag],
    content: contentTags,
    meta: metaTags,
    kind: [kindTag],
    all: [...metaTags, ...contentTags]
  };

  const variations =
    variationsByKey && variationsByKey[variationKey] && variationKey
      ? variationsByKey[variationKey]
          .map(convertToStepRef)
          .filter(ref => ref.id !== raw.id)
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

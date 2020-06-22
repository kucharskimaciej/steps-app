import { RawStep, Step, StepRef } from "../../../common/types/Step";
import { Tag, TagTypes } from "../../../common/types/Tag";
import { DANCES, STEP_DIFFICULTIES } from "../../../common/constants";

export function convertToStepRef({
  name,
  id,
  identifier
}: Step | RawStep): StepRef {
  return { name, id, identifier };
}

export function convertToStep(
  variationsByKey: Record<string, RawStep[]>,
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
    variationKey
  } = raw;

  const generatedTags: Tag[] = [
    ...tags.map(tag => ({
      text: tag
    })),
    ...(smart_tags || []).map(tag => ({
      type: TagTypes.SMART,
      text: tag
    })),
    ...dance.map(d => ({
      type: TagTypes.DANCE,
      text: DANCES[d]
    })),
    {
      type: TagTypes.DIFFICULTY,
      text: STEP_DIFFICULTIES[difficulty]
    },
    ...artists.map(artist => ({
      type: TagTypes.ARTIST,
      text: artist
    }))
  ];

  const variations = variationKey
    ? variationsByKey[variationKey]
        .map(convertToStepRef)
        .filter(ref => ref.id !== raw.id)
    : [];

  return {
    identifier,
    id,
    tags: generatedTags,
    videos,
    name,
    notes,
    created_at,
    owner_uid,
    variations,
    variationKey
  };
}

import z from "zod";
import { Container } from "typedi";
import { StepDuplicateLocator } from "@/lib/duplicateLocator.interface";
import { StepsDuplicateLocatorToken } from "@/lib/tokens";
import { StepDTO, StepKind } from "../../../../common/types/Step";

const VideoObjectValidator = z.object({
  hash: z.string().nonempty(),
  url: z.string().nonempty(),
  snapshot_url: z.string().optional(),
  thumbnail_url: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});

export function useStepValidator(step?: StepDTO) {
  const duplicateLocator = Container.get<StepDuplicateLocator>(
    StepsDuplicateLocatorToken
  );

  return z.object({
    name: z.string().nonempty(),
    difficulty: z.number(),
    kind: StepKind,
    feeling: z.array(z.string().nonempty()).min(1),
    tags: z.array(z.string().nonempty()),
    smart_tags: z.array(z.string().nonempty()).optional(),
    artists: z.array(z.string().nonempty()).optional(),
    removed_smart_tags: z.array(z.string().nonempty()).optional(),
    notes: z.string().optional(),
    videos: z
      .array(
        VideoObjectValidator.refine(
          (video) => !duplicateLocator.isDuplicate(video, step?.id),
          {
            message: "Duplicate video found",
            params: {
              duplicate: true,
            },
          }
        )
      )
      .min(1),
  });
}

import { StepDTO, Step } from "../../common/types/Step";
import { ROUTES } from "@/router/routes";
import { Router } from "vue-router";

export function ShortLinkFilter(step: StepDTO | Step, $router: Router): string {
  const { fullPath } = $router.resolve({
    name: ROUTES.PUBLIC_STEP,
    params: { stepId: step.id },
  });
  return `${window.location.origin}${fullPath}`;
}

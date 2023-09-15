import { FormContext } from "vee-validate";
import { StepFormData } from "@/features/CreateEditStep/StepForm/types";
import { ref } from "vue";
import { difference, head, uniq } from "lodash";
import { Container } from "typedi";
import { SmartTags } from "../../../../common/lib/smartTags/smartTags.service";

export function useSmartTags(form: FormContext<StepFormData>) {
  const smartTags = Container.get(SmartTags);
  const previous = ref(form.values.smart_tags);

  function updateSmartTags() {
    const currentSmartTags = difference(
      smartTags.getSmartTags(form.values.name),
      form.values.removed_smart_tags
    );

    previous.value = currentSmartTags;

    form.setValues({
      ...form.values,
      smart_tags: currentSmartTags,
    });
  }

  function handleSmartTagRemoved(newValue: string[]) {
    const removedTag = head(difference(previous.value, newValue));

    if (removedTag) {
      form.setValues({
        ...form.values,
        removed_smart_tags: uniq([
          ...form.values.removed_smart_tags,
          removedTag,
        ]),
      });
    }
  }

  return {
    updateSmartTags,
    handleSmartTagRemoved,
  };
}

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
import FormGroup from "@/components/Forms/FormGroup.vue";
import SimpleInput from "@/components/Forms/SimpleInput.vue";
import PureButton from "@/components/PureButton/PureButton.vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";
import { Focusable } from "@/components/Forms/types";
import { last } from "lodash";

const StringArray = defineComponent({
  components: { FormGroup, SimpleInput, PureButton, PureIcon },
  props: {
    modelValue: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  emits: ["update:modelValue"],
  setup(props, ctx) {
    const items = ref<Focusable[]>([]);

    watch(
      () => props.modelValue.length,
      () => lastInput()?.focus()
    );

    async function addElement() {
      ctx.emit("update:modelValue", [...props.modelValue, ""]);
    }

    function lastInput(): Focusable | undefined {
      return last(items.value);
    }

    function removeAt(index: number) {
      ctx.emit(
        "update:modelValue",
        props.modelValue.filter((_, i) => i !== index)
      );
    }

    function updateAt(index: number, newValue: string) {
      ctx.emit(
        "update:modelValue",
        props.modelValue.map((el, i) => (index === i ? newValue : el))
      );
    }

    return {
      addElement,
      removeAt,
      updateAt,
    };
  },
});

export default StringArray;
</script>

<template>
  <div>
    <FormGroup v-for="(_, index) in modelValue" :key="index">
      <SimpleInput
        ref="items"
        :model-value="modelValue[index]"
        @update:modelValue="updateAt(index, $event)"
      >
        <template #after>
          <PureButton
            size="small"
            kind="secondary"
            @click.prevent="removeAt(index)"
          >
            <PureIcon type="remove" />
          </PureButton>
        </template>
      </SimpleInput>
    </FormGroup>
    <PureButton kind="primary" size="small" @click.prevent="addElement">
      + Add another
    </PureButton>
  </div>
</template>

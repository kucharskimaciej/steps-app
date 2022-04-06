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
    value: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  setup(props, ctx) {
    const items = ref<Focusable[]>([]);

    watch(
      () => props.value.length,
      () => lastInput()?.focus()
    );

    async function addElement() {
      ctx.emit("input", [...props.value, ""]);
    }

    function lastInput(): Focusable | undefined {
      return last(items.value);
    }

    function removeAt(index: number) {
      ctx.emit(
        "input",
        props.value.filter((_, i) => i !== index)
      );
    }

    return {
      addElement,
      removeAt,
    };
  },
});

export default StringArray;
</script>

<template>
  <div>
    <FormGroup v-for="(_, index) in value" :key="index">
      <SimpleInput ref="items" v-model.trim="value[index]">
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

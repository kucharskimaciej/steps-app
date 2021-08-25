<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { last } from "lodash";
import FormGroup from "@/components/Forms/FormGroup.vue";
import SimpleInput from "@/components/Forms/SimpleInput.vue";
import PureButton from "@/components/PureButton/PureButton.vue";
import { Focusable } from "@/components/Forms/types";
import PureIcon from "@/components/PureIcon/PureIcon.vue";

@Component({
  components: { FormGroup, SimpleInput, PureButton, PureIcon }
})
export default class StringArray extends Vue {
  @Prop({ default: () => [] }) private value!: string[];

  async addElement() {
    this.value.push("");
    await this.$nextTick();
    this.lastInput()?.focus();
  }

  lastInput(): Focusable | undefined {
    return last((this.$refs.items as unknown) as Focusable[]);
  }

  removeAt(index: number) {
    this.value.splice(index, 1);
  }
}
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

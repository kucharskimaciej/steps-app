<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Validation } from "vuelidate";
import { last } from "lodash";
import FormGroup from "@/components/Forms/FormGroup.vue";
import Input from "@/components/Forms/Input.vue";
import PureButton from "@/components/PureButton/PureButton.vue";
import { Focusable } from "@/components/Forms/types";
import PureIcon from "@/components/PureIcon/PureIcon.vue";

export interface ArrayModel extends Validation {
  $each: Validation;
}

@Component({
  components: { FormGroup, Input, PureButton, PureIcon }
})
export default class StringArray extends Vue {
  @Prop({ default: () => [] }) private value!: string[];
  //@Prop() private model!: ArrayModel;

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
      <Input ref="items" v-model.trim="value[index]">
        <template #after>
          <PureButton
            feel="ghost"
            size="small"
            kind="danger"
            @click.prevent="removeAt(index)"
          >
            <PureIcon type="remove"></PureIcon>
          </PureButton>
        </template>
      </Input>
    </FormGroup>
    <PureButton feel="ghost" size="small" @click.prevent="addElement"
      >+ Add another</PureButton
    >
  </div>
</template>

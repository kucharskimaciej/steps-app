<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Step } from "../../../../common/types/Step";
import PureButton from "@/components/PureButton/PureButton.vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";
import Badge from "@/components/Badge/Badge.vue";
import RecordPracticeWidget from "@/components/RecordPracticeWidget/RecordPracticeWidget.vue";
import OptionsPopup from "@/features/Feed/OptionsPopup.vue";
import PopupMenuItem from "@/components/PopupMenu/PopupMenuItem.vue";
import ProvideStepVariations from "@/components/Providers/ProvideStepVariations.vue";
import ProvideInlineEdit from "@/features/CreateEditStep/ProvideInlineEdit.vue";

const StepActions = defineComponent({
  components: {
    PureButton,
    PureIcon,
    Badge,
    RecordPracticeWidget,
    OptionsPopup,
    PopupMenuItem,
    ProvideStepVariations,
    ProvideInlineEdit,
  },
  props: {
    step: Object as PropType<Step>,
  },
});

export default StepActions;
</script>

<template>
  <ProvideStepVariations :step-id="step.id">
    <template
      #default="{ hasVariations, variationsCount, openVariationsModal }"
    >
      <section class="px-4 -mx-2 flex">
        <span class="w-full mr-auto">
          <PureButton
            v-if="hasVariations"
            size="small"
            kind="ghost"
            class="mr-auto"
            @click="openVariationsModal"
          >
            <PureIcon type="collections" class="text-xl mr-1" />
            <Badge>{{ variationsCount }}</Badge>
          </PureButton>
        </span>

        <span class="flex-shrink-0 text-center"> &nbsp; </span>

        <span class="w-full ml-auto flex justify-end">
          <RecordPracticeWidget :step-id="step.id">
            <template #not_practiced="{ practice }">
              <PureButton size="small" kind="ghost" @click="practice()">
                <PureIcon type="playlist_play" class="text-xl mr-1" />
                <span v-if="$match('desktop')">Practice</span>
              </PureButton>
            </template>

            <template #practiced="{ practice }">
              <PureButton size="small" kind="ghost" @click="practice()">
                <PureIcon type="playlist_add_check" class="text-xl" />
              </PureButton>
            </template>
          </RecordPracticeWidget>

          <ProvideInlineEdit :step-id="step.id">
            <template #default="{ edit }">
              <OptionsPopup :step="step">
                <template #toggle="{ open }">
                  <PureButton size="small" kind="ghost" @click="open">
                    <PureIcon type="more_vert" class="text-xl" />
                  </PureButton>
                </template>

                <template #customOptions>
                  <PopupMenuItem
                    v-if="hasVariations"
                    @click="variationsOpen = true"
                  >
                    Show variations
                  </PopupMenuItem>

                  <PopupMenuItem @click="edit"> Edit </PopupMenuItem>
                </template>
              </OptionsPopup>
            </template>
          </ProvideInlineEdit>
        </span>
      </section>
    </template>
  </ProvideStepVariations>
</template>

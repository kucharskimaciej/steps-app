<script lang="ts">
import { Component } from "vue-property-decorator";
import { VueWithStore } from "@/lib/vueWithStore";
import { Inject } from "vue-typedi";
import { FeedService } from "@/views/Feed/feed.service";
import Feed from "@/components/Feed/Feed.vue";
import Container from "@/components/Layout/Container.vue";

@Component({
  components: {
    Container,
    Feed
  }
})
export default class FeedView extends VueWithStore {
  @Inject() private readonly feedService!: FeedService;

  get steps() {
    return this.feedService.getStepsForFeed();
  }
}
</script>

<template>
  <Container class="py-5">
    <Feed :steps="steps" />
  </Container>
</template>

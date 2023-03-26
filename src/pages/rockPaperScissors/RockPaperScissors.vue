<template>
  <q-page class="rock-paper-scissor-page">
    <intro
      v-if="isIntro"
      @enterGame="
        (val) => {
          userName = val;
          isIntro = false;
        }
      "
    />

    <game-card v-else :userName="userName" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, type Ref } from 'vue';
import Intro from 'src/components/rockPaperScissors/Intro.vue';
import GameCard from 'src/components/rockPaperScissors/GameCard.vue';

export default defineComponent({
  name: 'RockPaperScissors',
  components: { Intro, GameCard },
  setup() {
    const isIntro = ref(true);
    const userName = ref('');

    return {
      isIntro,
      userName,
    };
  },
});
</script>

<style lang="scss">
.rock-paper-scissor-page {
  padding: 20px;
  .q-card {
    width: fit-content;
    min-width: 660px;
    margin: 0 auto;
    border-radius: 20px;
    .intro-section {
      padding: 40px 60px;
      .title {
        font-size: 24px;
        font-weight: 700;
      }
    }
  }
}
</style>

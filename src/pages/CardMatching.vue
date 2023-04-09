<template>
  <q-page class="card-matching flex flex-center">
    <q-card>
      <q-card-section class="cards-section">
        <div
          v-for="(td, i) in cards"
          :key="i"
          class="flex flex-center text-subtitle1 text-black cursor-pointer q-ma-xs"
          :class="{
            'cursor-pointer bg-grey-3': !td.pass,
            'bg-blue-1': td.pass,
          }"
          style="width: 80px; height: 80px; border-radius: 8px; font-size: 32px"
          @click="onClickCard(i)"
        >
          <div v-if="td.active">
            {{ td.label }}
          </div>
        </div>
      </q-card-section>

      <q-card-section
        v-if="isClear"
        class="absolute-center light-dimmed full-width full-height opacity flex column flex-center"
      >
        <div style="z-index: 1">
          <div class="text-bold" style="font-size: 32px">Clear!</div>
          <q-btn
            label="다시하기"
            unelevated
            :ripple="false"
            color="black"
            rounded
            class="q-mt-md"
            style="padding: 0 20px"
            @click="onReset"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, type Ref } from 'vue';

type options = {
  label: string;
  pass: boolean;
  active: boolean;
};
const animalOptions = ['🐶', '🐝', '🐭', '🐰', '🦊', '🐯', '🐸', '🐵'];

export default defineComponent({
  name: 'CardMatching',
  setup() {
    const cards: Ref<options[]> = ref([]);
    const isClear = ref(false);
    function checkMatching(label: string) {
      const arr = cards.value.filter((v) => v.active && !v.pass);
      if (arr.every((v) => v.label === label)) {
        arr.forEach((el) => {
          el.pass = true;
        });
        // 다 맞췄을 때,
        if (!cards.value.filter((x) => !x.pass).length) {
          isClear.value = true;
        }
      } else {
        arr.forEach((el) => {
          el.active = false;
        });
      }
    }

    function onClickCard(idx: number) {
      if (!cards.value[idx].pass) {
        // TODO : 진행중 disable
        cards.value[idx].active = true;

        setTimeout(() => {
          if (cards.value.filter((v) => v.active && !v.pass).length === 2) {
            checkMatching(cards.value[idx].label);
          }
        }, 500);
      }
    }

    function settingCards() {
      const arr = [...animalOptions, ...animalOptions];
      cards.value = arr
        .sort(() => Math.random() - 0.5)
        .map((v) => ({
          label: v,
          pass: false,
          active: false,
        }));
    }

    function onReset() {
      settingCards();
      isClear.value = false;
    }

    (function init() {
      settingCards();
    })();

    return {
      cards,
      isClear,
      onClickCard,
      onReset,
    };
  },
});
</script>

<style lang="scss">
.card-matching {
  .q-card {
    .cards-section {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
</style>

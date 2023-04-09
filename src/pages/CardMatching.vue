<template>
  <q-page class="card-matching">
    <q-card>
      <q-card-section>
        <div v-for="(tr, i) in cards" :key="i" class="flex no-wrap">
          <div
            v-for="(td, j) in tr"
            :key="j"
            class="flex flex-center text-subtitle1 text-black cursor-pointer q-ma-xs"
            :class="{
              'cursor-pointer bg-grey-3': !td.pass,
              'bg-blue-1': td.pass,
            }"
            style="
              width: 80px;
              height: 80px;
              border-radius: 8px;
              font-size: 32px;
            "
            @click="onClickCard(i, j)"
          >
            {{ td.label }}
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, type Ref } from 'vue';

type options = {
  label: string;
  value: string;
  pass: boolean;
  active: boolean;
};

const animalOptions = [
  { label: '🐶', value: 'dog', pass: false, active: false },
  { label: '🐝', value: 'bee', pass: false, active: false },
  { label: '🐭', value: 'mouse', pass: false, active: false },
  { label: '🐰', value: 'rabbit', pass: false, active: false },
  { label: '🦊', value: 'fox', pass: false, active: false },
  { label: '🐯', value: 'tiger', pass: false, active: false },
  { label: '🐸', value: 'flog', pass: false, active: false },
  { label: '🐵', value: 'monkey', pass: false, active: false },
];

export default defineComponent({
  name: 'CardMatching',
  setup() {
    const cards: Ref<options[][]> = ref([]);
    const firstClick = ref(true);
    const firstSelected = ref('');
    const secondSelected = ref('');

    function checkMatching() {
      if (firstSelected.value === secondSelected.value) {
        cards.value.forEach((el) => {
          const arr = el.filter((v) => v.value === firstSelected.value);
          arr.forEach((x) => {
            x.pass = true;
          });
        });
      }

      firstSelected.value = '';
      secondSelected.value = '';
    }

    function onClickCard(i: number, j: number) {
      if (!cards.value[i][j].pass) {
        cards.value[i][j].active = true;

        if (firstClick.value) {
          firstSelected.value = cards.value[i][j].value;
        } else {
          secondSelected.value = cards.value[i][j].value;
        }

        if (!firstClick.value) {
          checkMatching();
        }
        firstClick.value = !firstClick.value;
      }
    }

    (function init() {
      const arr = [...animalOptions, ...animalOptions];
      const randomArr = arr.sort(() => Math.random() - 0.5);
      for (let i = 0; i < randomArr.length; i += 4) {
        cards.value.push(randomArr.slice(i, i + 4));
      }
    })();

    return {
      cards,
      onClickCard,
      firstClick,
    };
  },
});
</script>

<style lang="scss">
.card-matching {
}
</style>

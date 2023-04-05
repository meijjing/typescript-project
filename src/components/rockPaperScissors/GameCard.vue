<template>
  <q-card flat bordered class="rock-paper-scissors-game-card">
    <q-card-section class="q-pa-none flex no-wrap items-center">
      <div class="computer full-width text-center">
        <div class="score column q-py-md">
          <b class="q-mb-sm">Computer</b>
          {{ score.computer }}
        </div>
      </div>

      <b class="text-center" style="width: 260px">VS</b>

      <div class="user full-width text-center">
        <div class="score column q-py-md">
          <b class="q-mb-sm">{{ userName }}</b>
          {{ score.user }}
        </div>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section class="q-pa-none flex no-wrap items-center">
      <div class="computer full-width text-center">
        <q-avatar size="200px" font-size="80px" color="amber-1">
          {{ selectedValue.computer?.label }}
        </q-avatar>
      </div>

      <b class="text-center" style="width: 260px; font-size: 20px">
        {{ gameResult }}
      </b>

      <div class="user full-width text-center">
        <q-avatar size="200px" font-size="80px" color="amber-1">
          {{ selectedValue.user?.label }}
        </q-avatar>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section class="flex column flex-center q-py-lg">
      <b>신중하게~ 선택해주세요!</b>
      <div class="q-gutter-md q-mt-md">
        <q-btn
          v-for="button in selectOptions"
          :key="button.value"
          :label="button.label"
          unelevated
          :ripple="false"
          round
          size="32px"
          color="light-blue-1"
          style="font-size: 40px"
          @click="onClickItem(button)"
        />
      </div>
      <q-btn
        rounded
        unelevated
        :ripple="false"
        color="amber-9"
        size="18px"
        label="다시하기"
        class="q-mt-xl"
        style="width: 200px"
        @click="onReset"
      />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref, type Ref } from 'vue';

interface btnValue {
  label: string;
  value: string;
}
interface selected {
  computer: btnValue | null;
  user: btnValue | null;
}
const selectOptions = [
  { label: '✊', value: 'rock' },
  { label: '✋', value: 'paper' },
  { label: '✌️', value: 'scissors' },
];

export default defineComponent({
  name: 'RockPaperScissorsGameCard',
  props: {
    userName: {
      type: String,
      default: '',
    },
  },
  setup() {
    const selectedValue: Ref<selected> = ref({
      computer: null,
      user: null,
    });

    const score = ref({
      computer: 0,
      user: 0,
    });

    const gameResult = ref('');

    const exportComputerSelected = () => {
      const idx = Math.floor(Math.random() * 3);
      return selectOptions[idx];
    };

    // request animation

    function onClickItem(btnVal: btnValue) {
      selectedValue.value.user = btnVal;
      selectedValue.value.computer = exportComputerSelected();

      const computerValue = selectedValue.value.computer.value;
      switch (btnVal.value) {
        case 'rock':
          if (computerValue === 'paper') {
            score.value.computer++;
            gameResult.value = '졌다';
          } else if (computerValue === 'scissors') {
            score.value.user++;
            gameResult.value = '이겼다';
          } else {
            gameResult.value = '비겼다';
          }
          break;
        case 'paper':
          if (computerValue === 'scissors') {
            score.value.computer++;
            gameResult.value = '졌다';
          } else if (computerValue === 'rock') {
            score.value.user++;
            gameResult.value = '이겼다';
          } else {
            gameResult.value = '비겼다';
          }
          break;
        case 'scissors':
          if (computerValue === 'rock') {
            score.value.computer++;
            gameResult.value = '졌다';
          } else if (computerValue === 'paper') {
            score.value.user++;
            gameResult.value = '이겼다';
          } else {
            gameResult.value = '비겼다';
          }
          break;
        default:
          break;
      }
    }

    function onReset() {
      score.value = {
        computer: 0,
        user: 0,
      };
      selectedValue.value = {
        computer: null,
        user: null,
      };
    }

    return {
      selectOptions,

      selectedValue,
      score,
      gameResult,
      onClickItem,
      onReset,
    };
  },
});
</script>

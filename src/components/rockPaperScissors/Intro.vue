<template>
  <q-card flat bordered class="rock-paper-scissors-intro-card">
    <q-card-section class="intro-section">
      <div class="title text-center">안내면 진다<br />가위바위보!</div>
      <q-form @submit="enterGame" class="flex column flex-center">
        <q-input
          outlined
          rounded
          autofocus
          v-model="userName"
          class="full-width q-mt-lg"
          placeholder="유저이름을 입력하세요."
          :rules="[(val) => !!val || '유저이름을 입력하세요.']"
        />
        <q-btn
          rounded
          unelevated
          :ripple="false"
          color="amber-9"
          size="18px"
          label="입장하기"
          type="submit"
          class="q-mt-md"
          style="width: 200px"
        />
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'RockPaperScissorsIntro',
  emits: ['enterGame'],
  setup(_, { emit }) {
    const userName = ref('');
    function enterGame() {
      emit('enterGame', userName.value);
    }

    return {
      userName,
      enterGame,
    };
  },
});
</script>

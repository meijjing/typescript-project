<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" class="winner-dialog">
    <q-card class="fle column flex-center">
      <q-card-section class="flex column flex-center text-center">
        <b class="text-h5 q-mb-lg">GAME OVER</b>
        <span>
          <b class="text-h6">{{ userName }}</b>
          님
        </span>
        좀 더 분발하세요!
      </q-card-section>
      <q-card-section>
        <q-btn
          unelevated
          :ripple="false"
          outline
          color="secondary"
          label="메인으로"
          @click="onDialogCancel"
        />
        <q-btn
          unelevated
          :ripple="false"
          color="black"
          label="다시하기"
          class="q-ml-sm"
          @click="onDialogOK"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { useDialogPluginComponent } from 'quasar';

export default {
  name: 'GameoverDialog',
  props: {
    userName: {
      type: String,
      default: '',
    },
  },
  setup() {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();
    return {
      dialogRef,
      onDialogHide,
      onDialogOK,
      onDialogCancel,
    };
  },
};
</script>

<style lang="scss">
.winner-dialog {
  .q-card {
    padding: 40px 30px;
    width: 100%;
    max-width: 400px;
    border-radius: 16px;
  }
}
</style>

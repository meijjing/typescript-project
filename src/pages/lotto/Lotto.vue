<template>
  <q-page class="lotto-page q-pa-md">
    <q-form
      lotto-form
      class="q-mx-auto flex column flex-center q-gutter-sm"
      @submit="onSubmit"
    >
      <lotto-form
        v-for="(form, idx) in lottoFormData"
        :key="idx"
        v-model="form.value"
        :title="form.label"
      />

      <q-btn
        label="submit"
        unelevated
        :ripple="false"
        rounded
        color="amber-9"
        size="18px"
        style="width: 200px"
        type="submit"
      />
    </q-form>
  </q-page>
</template>

<script lang="ts">
import LottoForm from 'src/components/lotto/LottoForm.vue';
import LottoResultDialog from 'src/components/lotto/LottoResultDialog.vue';
import { defineComponent, ref, type Ref } from 'vue';
import { Dialog, Notify } from 'quasar';

export default defineComponent({
  name: 'Lotto',
  components: { LottoForm },
  setup() {
    interface lottoForm {
      label: string;
      value: number[];
    }

    let winningNum: number[] = [];
    let bonusNum = 0;
    const lottoFormData: Ref<lottoForm[]> = ref([
      { label: 'A', value: [] },
      { label: 'B', value: [] },
      { label: 'C', value: [] },
      { label: 'D', value: [] },
      { label: 'E', value: [] },
    ]);

    function getRandomNum(min: number, max: number) {
      const result = Math.floor(Math.random() * (max - min + 1)) + min;
      return result;
    }
    function setStartNum() {
      winningNum = [];
      for (let i = 0; i < 6; i++) {
        const num = getRandomNum(1, 45);
        if (!winningNum.includes(num)) {
          winningNum.push(num);
        } else {
          i--;
        }
      }

      for (let i = 0; i < 1; i++) {
        const num = getRandomNum(1, 45);
        if (!winningNum.includes(num)) {
          bonusNum = num;
        } else {
          i--;
        }
      }

      console.log('winningNum : ', winningNum);
      console.log('bonusNum : ', bonusNum);
    }

    function onSubmit() {
      const noChecked = lottoFormData.value.filter((v) => v.value.length !== 6);
      if (noChecked.length) {
        Notify.create({
          message: '6자리 숫자를 모두 선택해주세요.',
          color: 'negative',
        });
        return;
      }

      Dialog.create({
        component: LottoResultDialog,
        componentProps: {
          winningNum: winningNum,
          bonusNum: bonusNum,
          data: lottoFormData.value,
        },
      }).onOk(() => {
        setStartNum();
        lottoFormData.value = [
          { label: 'A', value: [] },
          { label: 'B', value: [] },
          { label: 'C', value: [] },
          { label: 'D', value: [] },
          { label: 'E', value: [] },
        ];
      });
    }

    (function init() {
      setStartNum();
    })();

    return {
      lottoFormData,
      onSubmit,
    };
  },
});
</script>

<style lang="scss">
.lotto-page {
  .q-form {
    width: fit-content;
  }
}
</style>

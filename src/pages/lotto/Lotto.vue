<template>
  <q-page class="lotto-page flex justify-center">
    <q-card flat lotto-card>
      <q-card-section class="flex q-gutter-sm">
        <lotto-form
          v-for="(value, key) in lottoFormData"
          :key="key"
          v-model="value.value"
          :title="value.label"
        />
      </q-card-section>

      <q-card-actions class="flex flex-center">
        <q-btn
          label="submit"
          :ripple="false"
          rounded
          color="black"
          size="18px"
          style="width: 200px"
          @click="onSubmit"
        />
      </q-card-actions>
    </q-card>
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

    function onSubmit() {
      const noChecked = lottoFormData.value.filter((v) => v.value.length !== 6);
      if (noChecked.length) {
        console.log('no : ', noChecked);
        Notify.create({
          message: '숫자를 모두 선택해주세요.',
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
      });
    }

    function getRandomNum(min: number, max: number) {
      const result = Math.floor(Math.random() * (max - min + 1)) + min;
      return result;
    }

    (function init() {
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
  > .q-card {
    > .q-card__section {
    }
  }
}
</style>

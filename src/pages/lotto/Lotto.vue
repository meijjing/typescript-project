<template>
  <q-page class="lotto-page q-pa-md">
    <q-card flat bordered class="flex no-wrap">
      <q-card-section class="q-pa-none">
        <lotto-form :activeForm="activeForm" />
      </q-card-section>

      <q-separator vertical />

      <q-card-section class="full-width q-pa-none">
        <div class="q-pa-md text-bold">선택번호 확인</div>
        <q-separator />
        <q-list>
          <q-item
            v-for="(form, idx) in lottoFormData"
            :key="idx"
            clickable
            :active="activeForm === form"
            active-class="active-item"
            class="flex no-wrap"
            @click="activeForm = form"
          >
            <q-item-section side class="text-bold">
              {{ form.label }}
            </q-item-section>
            <q-item-section>
              <q-item-label class="flex row no-wrap q-gutter-sm">
                <div
                  v-for="num in 7"
                  :key="num"
                  class="num bg-grey-2 flex flex-center"
                >
                  {{ form.value[num - 1] }}
                </div>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <q-separator />
        <div align="right" class="q-py-sm q-px-md">
          <q-btn
            label="구매하기"
            unelevated
            :ripple="false"
            rounded
            color="amber-9"
            size="14px"
            style="width: 100px"
            @click="onSubmit"
          />
        </div>
      </q-card-section>
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
      value: number[] | null[];
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
    const activeForm: Ref<lottoForm> = ref(lottoFormData.value[0]);

    function getRandomNum(min: number, max: number) {
      const result = Math.floor(Math.random() * (max - min + 1)) + min;
      return result;
    }
    function setStartNum() {
      winningNum = [];

      while (winningNum.length < 7) {
        const num = getRandomNum(1, 45);
        if (!winningNum.includes(num)) {
          winningNum.push(num);
        }
      }

      while (bonusNum === 0) {
        const num = getRandomNum(1, 45);
        if (!winningNum.includes(num)) {
          bonusNum = num;
        }
      }
    }

    function onSubmit() {
      const noChecked = lottoFormData.value.filter((v) => v.value.length !== 7);
      if (noChecked.length) {
        Notify.create({
          message: '7자리 숫자를 모두 선택해주세요.',
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
        activeForm.value = lottoFormData.value[0];
      });
    }

    (function init() {
      setStartNum();
    })();

    return {
      activeForm,
      lottoFormData,
      onSubmit,
    };
  },
});
</script>

<style lang="scss">
.lotto-page {
  .q-card {
    width: fit-content;
    border-radius: 20px;
    overflow: hidden;
    margin: 0 auto;
    .q-card__section {
      .q-list {
        .q-item {
          .q-item__section {
            .num {
              width: 40px;
              height: 40px;
              background: $grey-2;
              border-radius: 20px;
            }
          }
          &.active-item {
            background: $deep-purple-1;
            .q-item__section--side {
              color: $primary;
            }
          }
        }
      }
    }
  }
}
</style>

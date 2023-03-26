<template>
  <div class="lotto-form-card">
    <div class="flex no-wrap">
      <div class="q-py-md flex flex-center bg-grey-2" style="width: 50px">
        {{ model.label }}
      </div>
      <q-separator vertical />
      <div class="flex items-center q-px-md">1,000원</div>
    </div>
    <q-separator />
    <div class="checkbox-section q-pa-md">
      <q-checkbox
        v-for="i in 45"
        :key="i"
        v-model="model.value"
        :val="i"
        :label="String(i)"
        dense
        @update:model-value="updateCheckbox"
      />
    </div>
    <div class="q-pa-md" align="right">
      <q-btn
        color="grey-5"
        outline
        rounded
        dense
        unelevated
        :ripple="false"
        label="초기화"
        @click="onClickReset"
      />
      <q-btn
        color="grey-5"
        outline
        rounded
        dense
        unelevated
        :ripple="false"
        label="자동선택"
        :disable="isAuto"
        class="q-ml-sm"
        :class="{ 'auto-button': isAuto }"
        @click="onClickAuto"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref, PropType } from 'vue';
import { Notify } from 'quasar';

interface lottoForm {
  label: string;
  value: number[] | null[];
}

export default defineComponent({
  name: 'LottoForm',
  props: {
    activeForm: {
      type: Object as PropType<lottoForm>,
      default: () => ({
        label: 'A',
        value: [],
      }),
    },
  },
  setup(props, { emit }) {
    const model = ref(props.activeForm);
    const isAuto = ref(false);

    watch(
      () => props.activeForm,
      (newVal) => {
        console.log('watch');
        isAuto.value = false;

        model.value = newVal;
      }
    );

    function updateCheckbox() {
      if (model.value.value.length > 7) {
        model.value.value.pop();
        Notify.create({
          message: '7개 까지 선택가능합니다.',
          color: 'negative',
        });
      }
      emit('update:model-value', model.value);
    }

    function getRandomNum(min: number, max: number) {
      const result = Math.floor(Math.random() * (max - min + 1)) + min;
      return result;
    }

    function onClickAuto() {
      isAuto.value = true;
      const autoNum: number[] = [];
      while (autoNum.length < 7) {
        const num = getRandomNum(1, 45);
        if (!autoNum.includes(num)) {
          autoNum.push(num);
        }
      }
      model.value.value = autoNum;
    }

    function onClickReset() {
      model.value.value = [];
      isAuto.value = false;
    }

    return {
      model,
      isAuto,
      updateCheckbox,
      onClickAuto,
      onClickReset,
    };
  },
});
</script>

<style lang="scss">
.lotto-form-card {
  width: fit-content;
  .checkbox-section {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }
  .q-checkbox {
    width: fit-content;
    margin: 4px 2px;
    min-width: 36px;
    border: 1px solid $grey-5;
    border-radius: 10px;
    .q-checkbox__inner {
      display: none;
    }
    .q-checkbox__label {
      padding: 0;
      width: 100%;
      text-align: center;
      color: $grey-6;
    }
    &[aria-checked='true'] {
      background: $deep-purple-1 !important;
      border: 1px solid $deep-purple-7 !important;
      .q-checkbox__label {
        color: $deep-purple-9;
        font-weight: 500;
      }
    }
  }
  .q-btn {
    padding: 0 12px;
    .q-btn__content {
      .block {
        color: $grey-6;
      }
    }
  }
}
</style>

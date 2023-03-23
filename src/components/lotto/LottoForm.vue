<template>
  <q-card flat bordered class="lotto-form-card row">
    <q-card-section
      class="full-height flex flex-center text-subtitle1 text-bold bg-grey-11"
    >
      {{ title }}
    </q-card-section>
    <q-separator vertical />
    <q-card-section class="checkbox-section">
      <q-checkbox
        v-for="i in 45"
        :key="i"
        v-model="model"
        :val="String(i)"
        :label="String(i)"
        dense
        @update:model-value="updateCheckbox"
      />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue';
import { Notify } from 'quasar';

export default defineComponent({
  name: 'LottoForm',
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const model = ref(props.modelValue);

    watch(
      () => props.modelValue,
      (newVal) => {
        model.value = newVal;
      }
    );

    function updateCheckbox() {
      if (model.value.length > 6) {
        model.value.pop();
        Notify.create({
          message: '6개 까지 선택가능합니다.',
          color: 'negative',
        });
      }
      emit('update:model-value', model.value);
    }

    return {
      model,
      updateCheckbox,
    };
  },
});
</script>

<style lang="scss">
.lotto-form-card {
  width: fit-content;
  height: 125px;
  .checkbox-section {
    width: 633px;
    .q-checkbox {
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
  }
}
</style>

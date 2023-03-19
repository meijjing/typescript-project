<template>
  <q-card flat bordered class="lotto-form-card flex no-wrap items-center">
    <q-card-section
      class="full-height flex flex-center text-subtitle1 text-bold bg-grey-11"
    >
      {{ title }}
    </q-card-section>
    <q-separator />
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

    watch(props.modelValue, (newVal) => {
      model.value = newVal;
    });

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
  .checkbox-section {
    .q-checkbox {
      margin: 4px 0px;
      min-width: 50px;
    }
  }
}
</style>

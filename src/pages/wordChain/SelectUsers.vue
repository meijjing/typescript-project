<template>
  <q-page class="select-users-page">
    <q-card>
      <q-card-section class="word-section flex flex-center">
        <q-form
          class="flex column flex-center"
          @submit="
            $router.push({
              name: '끝말잇기',
              params: { userCount: selectedValue?.value },
            })
          "
        >
          <b>함께 게임할 인원 수를 선택해주세요.</b>
          <q-select
            :options="userOptions"
            v-model="selectedValue"
            label="인원 수 선택"
            class="full-width q-mt-xl"
            :rules="[(val) => !!val || '인원수를 선택해주세요.']"
          />
          <q-btn
            unelevated
            :ripple="false"
            color="black"
            label="입장"
            type="submit"
            class="full-width q-mt-md"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { ref, type Ref } from 'vue';

export default {
  name: 'SelectUsers',
  setup() {
    interface userOpts {
      label: string;
      value: number;
    }

    const userOptions: Ref<userOpts[]> = ref([]);
    const selectedValue: Ref<userOpts | null> = ref(null);

    (function init() {
      userOptions.value = Array.from({ length: 5 }, (_, i: number) => ({
        label: `${i + 2}명`,
        value: i + 2,
      }));
    })();

    return {
      userOptions,
      selectedValue,
    };
  },
};
</script>

<style lang="scss" scoped>
.select-users-page {
  padding: 20px;
  .q-card {
    max-width: 600px;
    margin: 0 auto;
    padding: 80px 30px;
    .input-section {
      margin-top: 80px;
    }
  }
}
</style>

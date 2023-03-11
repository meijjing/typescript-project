<template>
  <q-page class="word-chain-page">
    <q-card>
      <q-card-section>
        <q-list class="q-gutter-sm">
          <q-item
            v-for="user in Number($route.params.userCount)"
            :key="user"
            :active="activeUser === user"
            active-class="active-item"
          >
            <q-item-section side>
              <q-avatar size="32px" color="grey-4">{{ user }}</q-avatar>
            </q-item-section>
            <q-item-section> user{{ user }} </q-item-section>
            <q-item-section side> timer </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-section class="word-section flex flex-center">
        <b class="text-h3">{{ word }}</b>
      </q-card-section>
      <q-card-section class="input-section flex flex-center">
        <q-input
          outlined
          rounded
          autofocus
          v-model="inputValue"
          @keypress.enter="onSubmit"
        >
          <template #append>
            <q-btn
              rounded
              unelevated
              :ripple="false"
              color="black"
              label="입력"
              @click="onSubmit"
            />
          </template>
        </q-input>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { ref, Ref } from 'vue';
import { useRoute } from 'vue-router';
import { Dialog } from 'quasar';
import GameoverDialog from 'src/components/wordChain/GameoverDialog.vue';

export default {
  name: 'SelectUsers',
  setup() {
    const route = useRoute();
    const activeUser: Ref<number> = ref(1);
    const word: Ref<string> = ref('바보');
    const inputValue: Ref<string> = ref('');

    function onSubmit() {
      const lastWord = word.value.slice(-1);
      const firstWord = inputValue.value.charAt(0);

      if (lastWord.toLowerCase() === firstWord.toLowerCase()) {
        word.value = inputValue.value;
        if (activeUser.value + 1 > Number(route.params.userCount)) {
          activeUser.value = 1;
        } else {
          activeUser.value++;
        }
        inputValue.value = '';
      } else {
        Dialog.create({
          component: GameoverDialog,
          componentProps: {
            userName: `user${activeUser.value}`,
          },
        });
      }
    }

    return {
      activeUser,
      word,
      inputValue,
      onSubmit,
    };
  },
};
</script>

<style lang="scss">
.word-chain-page {
  padding: 20px;
  .q-card {
    max-width: 600px;
    margin: 0 auto;
    padding: 40px 30px 40px;
    .q-list {
      .q-item {
        border: 1px solid $grey-3;
        border-radius: 8px;
        &.active-item {
          border: 1px solid $primary !important;
          .q-item__section {
            color: $primary;
            font-weight: 700;
            .q-avatar {
              background: $deep-purple-1 !important;
            }
          }
        }
      }
    }
    .word-section {
      padding: 40px 0;
    }
    .input-section {
    }
  }
}
</style>

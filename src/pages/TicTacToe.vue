<template>
  <q-page class="tic-tac-toe-page flex column flex-center">
    <q-select :options="gameTypeOptions" v-model="gameType" class="q-mb-md" />
    <q-card>
      <q-card-section>
        <q-list class="flex no-wrap justify-between">
          <q-item
            v-for="(score, user) in userScore"
            :key="user"
            :active="activeUser === user"
            :active-class="user === 'O' ? 'text-indigo-7' : 'text-pink-6'"
            class="text-center full-width q-mr-md"
            style="border-radius: 12px"
          >
            <q-item-section class="items-center">
              <q-icon
                :name="user === 'O' ? 'panorama_fish_eye' : 'close'"
                :size="user === 'O' ? '30px' : '34px'"
                :color="
                  activeUser === user && user === 'O'
                    ? 'indigo-7'
                    : activeUser === user && user === 'X'
                    ? 'pink-6'
                    : 'grey-5'
                "
                class="q-mb-sm"
              />
              <div style="font-size: 16px">
                {{ score }}
              </div>
            </q-item-section>
          </q-item>

          <b class="absolute-center text-grey-6" style="font-size: 18px">:</b>
        </q-list>
      </q-card-section>
      <q-card-section
        v-if="winner"
        class="flex column flex-center q-ma-md bg-grey-2 cursor-pointer"
        style="width: 256px; height: 256px; border-radius: 16px"
        @click="resetGame"
      >
        <q-icon
          :name="winner === 'O' ? 'panorama_fish_eye' : 'close'"
          :size="winner === 'O' ? '140px' : '170px'"
          :color="winner === 'O' ? 'indigo-7' : 'pink-6'"
        />
        <b style="font-size: 24px">승리</b>
      </q-card-section>
      <q-card-section v-else class="q-col-gutter-sm">
        <div
          v-for="(tr, i) in gameArr"
          :key="i"
          class="flex no-wrap q-gutter-sm"
        >
          <div
            v-for="(td, j) in tr"
            :key="j"
            class="flex flex-center text-subtitle1 text-black"
            :class="{
              'cursor-pointer bg-grey-3': !td,
              'bg-indigo-1': td === 'O',
              'bg-pink-1': td === 'X',
            }"
            style="width: 80px; height: 80px; border-radius: 8px"
            @click="onClickPad(i, j)"
          >
            <q-icon
              v-if="td"
              :name="td === 'O' ? 'panorama_fish_eye' : 'close'"
              :size="td === 'O' ? '40px' : '46px'"
              :color="td === 'O' ? 'indigo-7' : 'pink-6'"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-btn
      label="게임 다시 시작하기"
      unelevated
      :ripple="false"
      color="black"
      rounded
      class="q-mt-md"
      style="padding: 0 20px"
      @click="reStartGame"
    />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, type Ref } from 'vue';

const gameTypeOptions = [
  { label: '컴퓨터와 대결하기', value: 'computer' },
  { label: '친구와 대결하기', value: 'friend' },
];

export default defineComponent({
  name: 'TicTacToe',
  setup() {
    // type userScoreType = {
    //   [key: string]: number;
    // };
    const gameType = ref(gameTypeOptions[0]);

    const userScore = ref({
      O: 0,
      X: 0,
    });
    const activeUser: Ref<'O' | 'X'> = ref('O');
    const winner: Ref<string | null> = ref(null);

    const gameArr = ref([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);

    function checkVictory() {
      // 가로, 세로
      for (let i = 0; i < 3; i++) {
        let 가로 = [];
        let 세로 = [];
        for (let j = 0; j < 3; j++) {
          가로.push(gameArr.value[i][j]);
          세로.push(gameArr.value[j][i]);
        }
        if (
          가로.filter((v) => v === activeUser.value).length === 3 ||
          세로.filter((v) => v === activeUser.value).length === 3
        ) {
          return activeUser.value;
        }
      }

      // 대각선
      if (
        [gameArr.value[0][0], gameArr.value[1][1], gameArr.value[2][2]].filter(
          (v) => v === activeUser.value
        ).length === 3 ||
        [gameArr.value[0][2], gameArr.value[1][1], gameArr.value[2][0]].filter(
          (v) => v === activeUser.value
        ).length === 3
      ) {
        return activeUser.value;
      }
    }

    function computerSelect() {
      console.log('computerSelect');

      const randomNum = Math.floor(Math.random() * 3);
      let selected = gameArr.value[randomNum][randomNum];
      console.log('selected : ', selected);
      if (!selected) {
        selected = 'X';
        activeUser.value = 'O';
        return true;
      }
      return false;
    }

    function onClickPad(i: number, j: number) {
      if (!gameArr.value[i][j]) {
        // 해당 위치에 값이 없을 때,
        gameArr.value[i][j] = activeUser.value;

        if (!checkVictory()) {
          activeUser.value = activeUser.value === 'O' ? 'X' : 'O';

          // TODO : 컴퓨터와의 대결
          if (gameType.value.value === 'computer') {
            console.log('computer : ', computerSelect());
            if (!computerSelect()) {
              computerSelect();
            }
          }
          return;
        }

        // TODO 무승부

        // 승리자!
        userScore.value[activeUser.value]++;
        winner.value = activeUser.value;
      }
    }

    function resetGame() {
      activeUser.value = 'O';
      winner.value = null;
      gameArr.value = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ];
    }

    function reStartGame() {
      resetGame();
      userScore.value = {
        O: 0,
        X: 0,
      };
    }

    return {
      gameTypeOptions,

      gameType,
      userScore,
      activeUser,
      winner,
      gameArr,

      onClickPad,
      resetGame,
      reStartGame,
    };
  },
});
</script>

<style lang="scss">
.tic-tac-toe-page {
  .q-card {
    width: 288px;
    height: 402px;
    border-radius: 12px;
  }
}
</style>

<template>
  <q-dialog class="lotto-result-dialog" ref="dialogRef" @hide="onDialogHide">
    <q-card>
      <q-card-section
        class="q-py-sm bg-black text-white text-bold text-subtitle1 text-center"
      >
        당첨 결과
      </q-card-section>

      <q-card-section class="q-px-xl q-py-lg">
        <div class="flex no-wrap items-center">
          <b class="q-mr-sm">당첨번호</b>
          <div class="flex no-wrap items-center">
            <div
              v-for="(num, idx) of winningNum"
              :key="idx"
              class="num flex flex-center"
            >
              {{ num }}
            </div>
            <span class="q-mx-sm">+</span>
            <div class="num flex flex-center">{{ bonusNum }}</div>
          </div>
        </div>

        <q-markup-table flat bordered separator="cell" class="q-mt-lg">
          <tbody>
            <tr v-for="(item, idx) of data" :key="idx">
              <td class="text-bold bg-grey-2 text-center">
                {{ getRank(item.value) }}
              </td>
              <td>
                <div class="flex no-wrap items-center">
                  <div
                    v-for="num in item.value"
                    :key="num"
                    class="checked-num flex flex-center"
                    :class="{
                      'win-num':
                        winningNum.includes(Number(num)) ||
                        bonusNum === Number(num),
                      'not-win-num':
                        bonusNum === Number(num) &&
                        getRank(item.value) !== '2등',
                    }"
                  >
                    {{ num }}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card-section>

      <q-card-actions align="center" class="q-pb-lg">
        <q-btn
          unelevated
          color="black"
          :ripple="false"
          rounded
          label="OK"
          size="16px"
          style="width: 200px"
          @click="onDialogOK"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useDialogPluginComponent } from 'quasar';

export default defineComponent({
  name: 'LottoResultDialog',
  props: {
    winningNum: {
      type: Array,
      default: () => [],
    },
    bonusNum: {
      type: Number,
      default: 0,
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();

    function getRank(val: number[]) {
      const correct = val.filter((v) => props.winningNum.includes(Number(v)));
      console.log('correct : ', correct);

      switch (correct.length) {
        case 6:
          return '1등';
          break;
        case 5:
          if (correct.includes(props.bonusNum)) {
            return '2등';
          } else {
            return '3등';
          }
          break;
        case 4:
          return '4등';

          break;
        case 3:
          return '5등';

          break;
        default:
          return '낙첨';
          break;
      }
    }

    return {
      dialogRef,
      onDialogHide,
      onDialogOK,
      onDialogCancel,
      getRank,
    };
  },
});
</script>

<style lang="scss">
.lotto-result-dialog {
  .q-card {
    border-radius: 16px;
    .q-card__section {
      .num {
        width: 40px;
        height: 40px;
        background: $indigo-2;
        border-radius: 50px;
        margin: 0 2px;
      }
    }
    .q-markup-table {
      border-radius: 16px;
      .q-table {
        tbody {
          tr {
            td {
              .checked-num {
                width: 36px;
                height: 36px;
                border-radius: 50px;
                margin: 0 2px;
                color: $grey-7;
              }
              .win-num {
                background: $deep-purple-7;
                color: white;
              }
              .not-win-num {
                background: white !important;
                color: $grey-7;
              }
            }
          }
        }
      }
    }
  }
}
</style>

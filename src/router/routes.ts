import { RouteRecordRaw } from 'vue-router';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      {
        path: 'word-chain',
        children: [
          {
            name: '유저선택',
            path: '',
            component: () => import('pages/wordChain/SelectUsers.vue'),
          },
          {
            name: '끝말잇기',
            path: ':userCount',
            component: () => import('pages/wordChain/WordChain.vue'),
          },
        ],
      },
      {
        name: '로또',
        path: 'lotto',
        component: () => import('pages/lotto/Lotto.vue'),
      },
      {
        name: '가위바위보',
        path: '/rock-paper-scissors',
        component: () =>
          import('pages/rockPaperScissors/RockPaperScissors.vue'),
      },
      {
        name: '틱택토',
        path: '/tic-tac-toe',
        component: () => import('pages/TicTacToe.vue'),
      },
      {
        name: '카드 짝 맞추기',
        path: '/card-matching',
        component: () => import('pages/CardMatching.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;

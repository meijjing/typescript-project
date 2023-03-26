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
        path: 'lotto',
        redirect: '',
        children: [
          {
            name: '로또',
            path: '',
            component: () => import('pages/lotto/Lotto.vue'),
          },
        ],
      },
      {
        path: '/rock-paper-scissors',
        redirect: '',
        children: [
          {
            name: '가위바위보',
            path: '',
            component: () =>
              import('pages/rockPaperScissors/RockPaperScissors.vue'),
          },
        ],
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

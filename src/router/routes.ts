import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      {
        path: 'word-chain',
        redirect: '',
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

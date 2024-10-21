// socialRoutes.js
import SocialAnalysisPage from '../views/SocialAnalysisPage.vue';

export default [
  {
    path: '/social',
    name: 'SocialAnalysis',
    component: SocialAnalysisPage,
  },
  {
    path: '/social/keyword',
    name: 'KeyWord',
    component: () => import('../components/social/KeyWord.vue'),
  },
  {
    path: '/social/np-ratio/all',
    name: 'NpratioAll',
    component: () => import('../components/social/NpratioAll.vue'),
  },
  {
    path: '/social/np-ratio/car',
    name: 'NpratioCar',
    component: () => import('../components/social/NpratioCar.vue'),
  },
  {
    path: '/social/np-ratio/journal',
    name: 'NpratioJournal',
    component: () => import('../components/social/NpratioJournal.vue'),
  },
  {
    path: '/social/count/journal',
    name: 'CountJournal',
    component: () => import('../components/social/CountJournal.vue'),
  },
];


import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/components/index';
import createParty from '@/components/board/createParty';
import detailParty from '@/components/board/detailParty';

Vue.use(Router);

const NotFound = { template: '<div>Not Found</div>'}

export default new Router ({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
    },
    {
      path: '/party/create',
      name: 'createParty',
      component: createParty,
    },
    {
      path: '/party/detail',
      name: 'detailParty',
      component: detailParty,
    },
    { 
      path: '*', 
      name : 'errorPage',
      component: NotFound,
    },
  ],
});
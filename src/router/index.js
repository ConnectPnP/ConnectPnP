import Vue from 'vue';
import Router from 'vue-router';
import main from '@/components/index';
import createParty from '@/components/board/createParty';
import detailParty from '@/components/board/detailParty';
import partyList from '@/components/list/list';

Vue.use(Router);

const NotFound = { template: '<div>Not Found</div>'}

export default new Router ({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: main,
    },
    {
      path: '/party/create',
      name: 'createParty',
      component: createParty,
    },
    {
      path: '/party/detail', // id parameter 필요
      name: 'detailParty',
      component: detailParty,
    },
    {
      path: '/party/list', 
      name: 'partyList',
      component: partyList,
    },
    { 
      path: '*', 
      name : 'errorPage',
      component: NotFound,
    },
  ],
});
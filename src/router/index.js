import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/components/home';
import createParty from '@/components/board/createParty';

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
      path: '*', 
      name : 'errorPage',
      component: NotFound,
    },
  ],
});
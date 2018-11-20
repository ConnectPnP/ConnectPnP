import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/index'
import createParty from '@/components/board/createParty'
import detailParty from '@/components/board/detailParty'
import partyList from '@/components/list/list'
import myPage from '@/components/myPage/myPage'

Vue.use(Router)

export default new Router ({
  routes: [
    {
      path: '/',
      name: 'main',
      component: main
    },
    {
      path: '/party/create',
      name: 'createParty',
      component: createParty
    },
    {
      path: '/party/detail', // id parameter 필요
      name: 'detailParty',
      component: detailParty
    },
    {
      path: '/party/list', 
      name: 'partyList',
      component: partyList
    },
    {
      path: '/myPage', 
      name: 'myPage',
      component: myPage
    },
    { 
      path: '*',
      redirect: '/'
    }
  ]
})
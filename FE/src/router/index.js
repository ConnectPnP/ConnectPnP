import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/index'
import createParty from '@/components/board/createParty'
import detailParty from '@/components/board/detailParty'
import editParty from '@/components/board/editParty'
import partyList from '@/components/list/list'
import myPage from '@/components/myPage/myPage'
import signUp from '@/components/signUp'
import admin from '@/components/admin'
const pageAuth= require('./pageAuth');

Vue.use(Router);
var thisVue = new Vue;

//관리자로 등록된 유저만 들어갈 수 있도록 만듬.
const adminRequireAuth = async (to, from, next) => {
  //현재 로그인 중인 유저의 아이디 값으로 정보를 받아옴.
    var userID= thisVue.$session.get('userID');
    var userData = await thisVue.$http.get('http://localhost:3000/user/details/'+userID);
    if (pageAuth.AdminPage(userData)) {
        return next();
    } else {
      alert("죄송합니다. 관리자 권한이 없습니다.");
      next('/')
    }
/*
    next({
        path: '/admin',
        query: { redirect: to.fullPath }
    })
*/
};

export default new Router ({
  mode : 'history',
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
      path: '/party/detail/:id', // id parameter 필요
      name: 'detailParty',
      component: detailParty
    },
    {
      path: '/party/edit', // id parameter 필요
      name: 'editParty',
      component: editParty
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
      path: '/signUp', 
      name: 'signUp',
      component: signUp
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin,
      beforeEnter:adminRequireAuth

    },
    { 
      path: '*',
      redirect: '/'
    }
  ]
})
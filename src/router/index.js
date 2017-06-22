import Vue from 'vue'
import Router from 'vue-router'
import LogIn from '@/components/LogIn'
import CreateMeeting from '@/components/CreateMeeting'
import MainPage from '@/components/MainPage'
import Meeting from '@/components/Meeting'
import InviteUser from '@/components/InviteUser'
import Notifications from '@/components/Notifications'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LogIn',
      component: LogIn
    },
  	{
      path: '/MainPage',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/CreateMeeting',
      name: 'CreateMeeting',
      component: CreateMeeting
    },
    {
      path: '/Meeting',
      name: 'Meeting',
      component: Meeting
    },
    {
      path: '/InviteUser',
      name: 'InviteUser',
      component: InviteUser
    },
    {
      path: '/Notifications',
      name: 'Notifications',
      component: Notifications
    }
  ]
})

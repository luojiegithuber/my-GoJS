import Vue from 'vue'
import Router from 'vue-router'
import DiagramContainer from '@/components/DiagramContainer'
import BloodHome from '@/components/BloodHome'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/DiagramContainer',
      name: 'DiagramContainer',
      component: DiagramContainer
    },
    {
      path: '/',
      name: 'BloodHome',
      component: BloodHome
    },
    
  ]
})

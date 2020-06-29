import Vue from 'vue'
import Router from 'vue-router'
import DiagramContainer from '@/components/DiagramContainer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DiagramContainer',
      component: DiagramContainer
    }
  ]
})

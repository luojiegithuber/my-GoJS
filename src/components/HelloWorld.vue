<template>
  <div id="demo">
      <demo-one></demo-one>
  </div>
</template>

<script>

import go from 'gojs'
import DemoOne from './DemoOne'
import DemoTwo from './DemoTwo'

export default {
  name: 'HelloWorld',
  components:{
    DemoOne,
    DemoTwo
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

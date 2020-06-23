<template>
  <div id="demo1">
      
  </div>
</template>

<script>

import go from 'gojs'

export default {
  name: 'demo1',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style scoped lang='scss'>
$error-color:red;

@mixin box-border($border-color: #000) {
  border: 1px solid $border-color;
}

@mixin big-box {
  width: 1000px;
  height: 800px;
}

#demo1{
  @include box-border;
  @include big-box;
}

</style>

<template>
  <div id="demo">
    <blood-search-box></blood-search-box>
    <div class="diagram-container">
      <diagram-operate></diagram-operate>
      <blood-sidebar>信息侧边栏</blood-sidebar>
    </div>
  </div>
</template>

<script>

import go from 'gojs';
import DemoOne from './DemoOne';
import DemoTwo from './DemoTwo';
import DemoThree from './DemoThree';
import BloodSearchBox from './BloodSearchBox';
import ToolBar from './ToolBar';
import DiagramOperate from './DiagramOperate';
//import InfoSidebar from './InfoSidebar';
import BloodSidebar from './BloodSidebar';

export default {
  name: 'HelloWorld',
  components:{
    DemoOne,
    DemoTwo,
    DemoThree,
    BloodSearchBox,
    ToolBar,
    DiagramOperate,
    BloodSidebar,
  },
  data () {
    return {

    }
  },
  mounted(){
    
  },
  methods:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
@import '../assets/css/common.scss';

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

.diagram-container{
  //@include box-border;
  @include percentage-fill(100%,95%);

  display: flex;
  padding: 5px;
}

#demo{
  @include percentage-fill;
}
</style>

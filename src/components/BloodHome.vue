<template>
  <div id="blood-home">
    <div class="blood-home-symbol">
        <img class="title-icon" src="../assets/icons/血缘.png"/>
        <span style="color:#00C1DE;font-size:2em;font-weight:bold;">&nbsp;血缘查询</span>
    </div>
    <div style="display:flex;align-items:center">
      <blood-search-box></blood-search-box>
      <a-button type="primary" style="margin-left:10px;background-color:#00C1DE;border-color:#00C1DE;">增加</a-button>
    </div>
  </div>
</template>

<script>

import BloodSearchBox from './BloodSearchBox';


export default {
  name: 'BloodHome',
  components:{

    BloodSearchBox,

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

<style scoped lang='scss'>
@import '../assets/css/common.scss';

#blood-home{
    @include percentage-fill;
    background-color: aquamarine;
    @include background-img-set('../assets/imgs/universe.jpg');

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.title-icon{
    @include title-icon;
}

.blood-home-symbol{
    @include align-by-axis;
}

</style>

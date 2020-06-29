<template>
  <div id="blood-search-box">
      <search-select></search-select>

      <a-input 
      placeholder="输入hive/关系型数据库/GP/KYLIN/HBASE表名精准搜索" 
      :value="content"
      style="width:500px"
      />

      <a-button 
      type="primary" 
      icon="search" 
      style="background-color:#00C1DE;border-color:#00C1DE;">
        搜索
      </a-button>
  </div>
</template>

<script>

import go from 'gojs';
import SearchSelect from './SearchSelect';


export default {
  name: 'BloodSearchBox',
  components:{
      SearchSelect,
  },
  data () {
    return {
        content:'',
    }
  },
  mounted(){
    
  },
  methods:{

  }
}
</script>

<style scoped>

#blood-search-box{
    display: flex;
    justify-content:center;
}

</style>

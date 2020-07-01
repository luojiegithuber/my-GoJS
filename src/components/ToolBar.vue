<template>
  <div class="toolbar-justify">
      <a-checkbox-group @change="onCheckBoxChange">
        <a-checkbox value="A">
          过滤临时表
        </a-checkbox>

        <a-checkbox value="B">
          过滤视图
        </a-checkbox>

        <a-checkbox value="C">
          我负责的
        </a-checkbox>

        <a-checkbox value="D">
          查看应用
        </a-checkbox>

        <a-checkbox value="E">
          查看首层
        </a-checkbox>
      </a-checkbox-group>
      <div class="diagram-icons-list">
          <a-icon type="fullscreen" @click="canvasFullScreen" />
          <a-icon type="redo" />
          <a-icon type="download" @click="canvasDownload" />
          <a-icon type="plus-square" @click="testGetNewData"/>
          <a-icon type="minus-square" />
          <a-icon type="question-circle" />
      </div>
  </div>
</template>
<script>
export default {
  methods: {
    onCheckBoxChange(checkedValues) {
      console.log('checked = ', checkedValues);
    },

    canvasFullScreen(){
        this.$parent.canvasFullScreen();
    },

    canvasDownload(){
        this.$parent.canvasDownload();
    },

    testGetNewData(){
        this.$parent.testGetNewData();
    },
  },
};
</script>

<style scoped lang='scss'>
@import '../assets/css/common.scss';

.diagram-icons-list i{
    color:#00C1DE;
    @include icon-operate;
}

.toolbar-justify{
    //@include box-border;
    display: flex;
    justify-content: space-between;
    background-color: #fff;

    padding: 5px;
}
</style>
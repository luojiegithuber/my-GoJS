<template>
  <div id="demo">
    <blood-search-box></blood-search-box>
    <tool-bar></tool-bar>
    <button @click="canvasFullScreen">全屏放大</button>
    <button @click="canvasDownload">下载图片</button>
    <button @click="testGetNewData">请求数据并更新</button>
    <demo-three ref="demo3"></demo-three>
  </div>
</template>

<script>

import go from 'gojs';
import DemoOne from './DemoOne';
import DemoTwo from './DemoTwo';
import DemoThree from './DemoThree';
import BloodSearchBox from './BloodSearchBox';
import ToolBar from './ToolBar';

export default {
  name: 'HelloWorld',
  components:{
    DemoOne,
    DemoTwo,
    DemoThree,
    BloodSearchBox,
    ToolBar
  },
  data () {
    return {
      fullscreen:false, //当前是否全屏
      myDiagram:null, //从子节点获得图表实例
    }
  },
  mounted(){
    
  },
  methods:{
    //测试，请求新的节点数据 18 19
    testGetNewData(){
      this.$refs.demo3.getNewData();
    },

    //全屏放大
    canvasFullScreen(){
      console.log("点击放大按钮");
      this.launchFullScreen();
    },

    //进入全屏1
    viewFullScreen(show) {
      if (show === undefined) show = !isFullScreen();
      if (show) {
        if (document.body.requestFullscreen) document.body.requestFullscreen();
        else if (document.body.webkitRequestFullScreen) document.body.webkitRequestFullScreen();
        else if (document.body.mozRequestFullScreen) document.body.mozRequestFullScreen();
        else if (document.body.msRequestFullscreen) document.body.msRequestFullscreen();
      } else {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
      }
    },

    isFullScreen() {
      return !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
    },
    
    //进入全屏2
    screen(){
      // let element = document.documentElement;//设置后就是我们平时的整个页面全屏效果
      let element = document.getElementById('demo3');//设置后就是   id==con_lf_top_div 的容器全屏
        if (this.fullscreen) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        } else {
          if (element.requestFullscreen) {
            element.requestFullscreen();
          } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
          } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
          } else if (element.msRequestFullscreen) {
            // IE11
            element.msRequestFullscreen();
          }
        }
        this.fullscreen = !this.fullscreen;

    },
    
    //进入全屏3
    launchFullScreen() {
      let element = document.getElementById('demo3');

      if(element.requestFullscreen) {
        element.requestFullscreen();
      } else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if(element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if(element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    },
    
    //下载图表
    canvasDownload(){
      this.makeBlob();
    },

    myCallback(blob) {
      var url = window.URL.createObjectURL(blob);
      var filename = "myBlobFile.png";

      var a = document.createElement("a");
      a.style = "display: none";
      a.href = url;
      a.download = filename;

      // IE 11
      if (window.navigator.msSaveBlob !== undefined) {
        window.navigator.msSaveBlob(blob, filename);
        return;
      }

      document.body.appendChild(a);
      requestAnimationFrame(function() {
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      });
    },

    makeBlob() {
      this.myDiagram = this.$refs.demo3.myDiagram;
      var blob = this.myDiagram.makeImageData({ 
        //background: "white", 
        returnType: "blob",
        callback: this.myCallback
      });
    }

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


</style>

<template>
  <div id="demo1">
    123
  </div>
</template>

<script>

import go from 'gojs';
import {DoubleTreeLayout} from '@/gojs/DoubleTreeLayout.js'
const GO = go.GraphObject.make; //定义模版

export default {
  name: 'demo1',
  data () {
    return {
      diagramData:[] //后台的数据
    }
  },
  mounted(){
    //gojs中可以直接取到id名（如‘demo1’）vue中不可以，所以用refs来取dom
    console.log(DoubleTreeLayout)
    let myDiagram = 
    GO(go.Diagram, this.$el, 
      {
        "initialContentAlignment": go.Spot.Center,//图表居中显示
        "isEnabled":true,                         //是否可以拖拽
        "undoManager.isEnabled": true,            // 打开Ctrl-Z撤销和Ctrl-Y重做功能
        layout: GO(DoubleTreeLayout,{
           directionFunction: function(n) { 
             return n.data && n.data.dir !== "left";
            }
        })
      }
    );
    // define all of the gradient brushes
    var graygrad = GO(go.Brush, "Linear", { 0: "#F5F5F5", 1: "#F1F1F1" });
    var bluegrad = GO(go.Brush, "Linear", { 0: "#CDDAF0", 1: "#91ADDD" });
    var yellowgrad = GO(go.Brush, "Linear", { 0: "#FEC901", 1: "#FEA200" });
    var lavgrad = GO(go.Brush, "Linear", { 0: "#EF9EFA", 1: "#A570AD" });

    var alignmentLeft = go.Spot.Left;
    var alignmentRight = go.Spot.Right;
    var alignmentFocusLeft = go.Spot.Left;
    var alignmentFocusRight = go.Spot.Right;
    
    var handleOK = function(v) { return "I say: " + v; };
    //********定义节点模板*******
    myDiagram.nodeTemplate = GO(
      go.Node, "Spot",//第二个参数是Panel的类型**

      //Node参数配置
      { 
        isShadowed: false,// 是否投影
        locationSpot: go.Spot.Center,// Node.location 定位的基准点设置在每个节点的中心处
      }, 

      // 定义节点的外部形状
      GO(go.Shape, "Rectangle", // 形状为圆角矩形
        { fill: graygrad, stroke: "#D8D8D8"},
        new go.Binding("fill", "color")),

      GO(go.Panel,"Auto",
        // 定义节点的文本
        GO(go.TextBlock,
          { margin: 10,height:40, font: "bold 15px Helvetica, bold Arial, sans-serif" },
          //把TextBlock.text 绑在 Node.data.key上
          new go.Binding("text", "key"/*,function(v) { return "I say: " + v; }*/)
        ),  

        //new go.Binding("itemArray", "reasonsList"),// 汉字说明
        
      ),

      GO("TreeExpanderButton",
        //{ click:this.clickTreeExpanderButton},
        { alignment: go.Spot.Right, alignmentFocus: go.Spot.Left },
        new go.Binding("alignment", "dir",function(v){
          return v=="right"?alignmentRight:alignmentLeft
        }),
        new go.Binding("alignmentFocus", "dir",function(v){
          return v=="right"?alignmentFocusLeft:alignmentFocusRight
        }),
        { visible: true },
        // { width: 50,
        //   "ButtonIcon.stroke": "balck",
        //   "ButtonBorder.fill": "#CCFFFF",
        //   "ButtonBorder.stroke": "transparent",
        //   "_buttonFillOver": "pink",
        //   "_buttonStrokeOver": "black"
        // },
        //GO(go.TextBlock, "5"),
      )

    );
    

    // 连接线样式
    myDiagram.linkTemplate = GO(
      go.Link,
      { routing: go.Link.Orthogonal, corner: 5 },
      GO(go.Shape, { strokeWidth: 1, stroke: "#555" })
    );

    var myModel = GO(go.TreeModel);
    // 在model的数据中, 每个节点数据的值都是由一个JS对象来表示:
    myModel.nodeDataArray = [
        { key: "Root", color: lavgrad },
        { key: "1", parent: "Root", dir: "left", color: bluegrad },
        { key: "2", parent: "Root", dir: "left" },
        { key: "3", parent: "Root", dir: "left" },
        { key: "4", parent: "Root", dir: "left", color: bluegrad ,
          alignment:alignmentLeft,},
        { key: "5", parent: "4" },
        { key: "6", parent: "4" },
        { key: "7", parent: "Root" , dir: "left"},
        { key: "8", parent: "Root", dir: "right", color: yellowgrad },
        { key: "9", parent: "8", color: yellowgrad, loveid:"123" },
        { key: "10", parent: "9" },
        { key: "11", parent: "9" },
        { key: "12", parent: "9" },
        { key: "13", parent: "8", group:"HIVE"},
        { key: "14", parent: "8", group:"HIVE"},
        { key: "15", parent: "Root", dir: "right", color: yellowgrad },
        { key: "16", parent: "15" },
        { key: "17", parent: "15" },
        { key: "18", parent: "1" },
        { key: "HIVE", parent: "8", isGroup: true }
      ];
    myDiagram.model = myModel;

    //监听节点扩展事件
    myDiagram.addDiagramListener("TreeExpanded",
      function(e,obj) {
        // Some code I can't figure out that gets me node_key
        console.log(e.subject.first().jb);
    });

  },

  methods:{

    clickTreeExpanderButton(e,obj) {
        console.log(e);
        console.log(obj);
        console.log(this);
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

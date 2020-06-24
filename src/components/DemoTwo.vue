<template>
  <div id="demo2">
    456
  </div>
</template>

<script>

import go from 'gojs';
import {DoubleTreeLayout} from '@/gojs/DoubleTreeLayout.js'
const GO = go.GraphObject.make; //定义模版

export default {
  name: 'demo2',
  data () {
    return {
      diagramData:[], //后台的数据
      myDiagram:null, //我的图表
    }
  },
  mounted(){
    //gojs中可以直接取到id名（如‘demo1’）vue中不可以，所以用refs来取dom

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

    var graygrad = GO(go.Brush, "Linear", { 0: "#F5F5F5", 1: "#F1F1F1" });
    var bluegrad = GO(go.Brush, "Linear", { 0: "#CDDAF0", 1: "#91ADDD" });
    var yellowgrad = GO(go.Brush, "Linear", { 0: "#FEC901", 1: "#FEA200" });
    var lavgrad = GO(go.Brush, "Linear", { 0: "#EF9EFA", 1: "#A570AD" });

    //********定义节点模板*******
    myDiagram.nodeTemplate = GO(
      go.Node, "horizontal",//第二个参数是Panel的类型（横向排列）//horizontal

      //Node参数配置
      { 
        isShadowed: false,// 是否投影
        locationSpot: go.Spot.Center,// Node.location 定位的基准点设置在每个节点的中心处
      }, 

      // 定义节点的外部形状
      GO(go.Shape, "RoundedRectangle", // 形状为圆角矩形
        { fill: graygrad, stroke: "#D8D8D8"},
        new go.Binding("fill", "color")),

      // 定义节点的文本
      GO(go.TextBlock,
        { margin: 10,height:40, font: "bold 15px Helvetica, bold Arial, sans-serif" },
        //把TextBlock.text 绑在 Node.data.key上
        new go.Binding("text", "key")),

      GO(go.Panel,
        { defaultAlignment: go.Spot.TopLeft, //位置
          margin:10,
        },
        new go.Binding("itemArray", "reasonsList")// 汉字说明
      )
    );


    // 连接线样式
    myDiagram.linkTemplate = GO(
      go.Link,
      { routing: go.Link.Orthogonal, corner: 5 },
      GO(go.Shape, { strokeWidth: 1, stroke: "#555" })
    );

    this.myDiagram=myDiagram;


    
    this.init();
    
  },
  methods:{

      //init方法需要在加在图表前的事件中调用
      //从服务器请求JSON格式的文本数据
    init(){
        // define all of the gradient brushes
        var graygrad = GO(go.Brush, "Linear", { 0: "#F5F5F5", 1: "#F1F1F1" });
        var bluegrad = GO(go.Brush, "Linear", { 0: "#CDDAF0", 1: "#91ADDD" });
        var yellowgrad = GO(go.Brush, "Linear", { 0: "#FEC901", 1: "#FEA200" });
        var lavgrad = GO(go.Brush, "Linear", { 0: "#EF9EFA", 1: "#A570AD" });

        this.diagramData=[
            // these node data are indented but not nested according to the depth in the tree
            { key: "Root", color: lavgrad },
            { key: "Left1", parent: "Root", dir: "left", color: bluegrad },
                { key: "leaf1", parent: "Left1" },
                { key: "leaf2", parent: "Left1" },
                { key: "Left2", parent: "Left1", color: bluegrad },
                { key: "leaf3", parent: "Left2" },
                { key: "leaf4", parent: "Left2" },
            { key: "Right1", parent: "Root", dir: "right", color: yellowgrad },
                { key: "Right2", parent: "Right1", color: yellowgrad },
                { key: "leaf5", parent: "Right2" },
                { key: "leaf6", parent: "Right2" },
                { key: "leaf7", parent: "Right2" },
                { key: "leaf8", parent: "Right1" },
                { key: "leaf9", parent: "Right1" }
        ];

        //为双树创建模型
        
        this.myDiagram.model = new go.TreeModel(this.diagramData)//把数据放图图表中去
        this.doubleTreeLayout(this.myDiagram);

      },

    doubleTreeLayout(diagram){
        //根据方向，将节点和连接分成两组      
        var leftParts = new go.Set(go.Part);
        var rightParts = new go.Set(go.Part);
        this.separatePartsByLayout(diagram, leftParts, rightParts);

        //但是ROOT节点将在两个集合中
        //创建并执行两个TreeLayout，每个方向一个
        //在不移动ROOT节点的情况下，在节点和链接的不同子集上

        var layout1 =
            GO(go.TreeLayout,
            { 
              angle: 180,// 距离root的左侧距离
              arrangement: go.TreeLayout.ArrangementFixedRoots,// 布置单独的树，必选
              setsPortSpot: false 
            });

        var layout2 =
            GO(go.TreeLayout,
            { 
              angle: 0,// 距离root的右侧距离
              arrangement: go.TreeLayout.ArrangementFixedRoots,
              setsPortSpot: false 
            });

        layout1.doLayout(leftParts);
        layout2.doLayout(rightParts);

        diagram.commitTransaction("Double Tree Layout");

      },
   
    separatePartsByLayout(diagram, leftParts, rightParts) {
        var root = diagram.findNodeForKey("Root"); // 获取中心点

        if (root === null) return;

        // ROOT节点由两个子树共享
        leftParts.add(root);
        rightParts.add(root);

        // 查看ROOT节点的所有直接子节点
        root.findTreeChildrenNodes().each(function(child) {
            // 这个节点在哪个方向延长
            var dir = child.data.dir;
            var coll = (dir === "left") ? leftParts : rightParts;
            // 从此子节点开始添加整个子树
            coll.addAll(child.findTreeParts());
            // 还添加了从ROOT节点到该子节点的链接
            coll.add(child.findTreeParentLink());
        });
  }

  }
}
</script>

<style scoped lang='scss'>
$error-color:red;

@mixin box-border($border-color: rgb(34, 37, 206)) {
  border: 1px solid $border-color;
}

@mixin big-box {
  width: 1000px;
  height: 800px;
}

#demo2{
  @include box-border;
  @include big-box;
}

</style>

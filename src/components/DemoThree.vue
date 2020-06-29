<template>
  <div id="demo3">
    demo3
  </div>
</template>

<script>

import go from 'gojs';
import {DoubleTreeLayout} from '@/gojs/DoubleTreeLayout.js';

const GO = go.GraphObject.make; //定义模版

export default {
  name: 'demo3',
  data () {
    return {
      myDiagram:null,
      modelData:[], //节点数据
      modelLinks:[], //连线数据
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
        "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom, //启用视图放大缩小
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
    
    //********定义节点模板*******
    myDiagram.nodeTemplate = GO(
      go.Node, "Spot",//第二个参数是Panel的类型**

      //Node参数配置
      { 
        isShadowed: false,// 是否投影
        locationSpot: go.Spot.Center,// Node.location 定位的基准点设置在每个节点的中心处
        scale:0.8,    //初始视图大小比例
        //width:150,
        //height:80,
      }, 

      // 定义节点的外部形状
      GO(go.Shape, "Rectangle", // 形状为矩形
        { fill: graygrad, stroke: "#D8D8D8",desiredSize: new go.Size(160, 50)},
        new go.Binding("fill", "color")),

      GO(go.Panel,"Auto",
        // 定义节点的文本
        GO(go.TextBlock,
          { margin: 10,height:40, font: "bold 15px Helvetica, bold Arial, sans-serif" },
          //把TextBlock.text 绑在 Node.data.key上
          new go.Binding("text", "key")
        ),
        
        //new go.Binding("itemArray", "reasonsList"),// 汉字说明
        
      ),

      GO("Button",{ 
          margin: 2,
          alignment: go.Spot.Right, 
          alignmentFocus: go.Spot.Left,
        },

        new go.Binding("alignment", "dir",function(v){
          return v=="right"?alignmentRight:alignmentLeft
        }),

        new go.Binding("alignmentFocus", "dir",function(v){
          return v=="right"?alignmentFocusLeft:alignmentFocusRight
        }),

        { visible: true },
        new go.Binding("visible", "isExpand",function(v){ return !v; }),

        GO(go.TextBlock, "5+"),
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
      { routing: go.Link.Orthogonal, corner: 5 ,visible:true},
      new go.Binding("visible", "visible"),
      GO(go.Shape, {
         strokeWidth: 1, stroke: "#333" },
         new go.Binding("stroke", "color"),   
      ),
      
    );

    //Gruop样式
    myDiagram.groupTemplate = GO(go.Group, "Auto",
    { layout: GO(go.GridLayout, { wrappingColumn: 1 }) },
      GO(go.Shape, "Rectangle",
        { fill: "#00C1DE" }),
      GO(go.Panel, "Vertical",
        
        { margin: 5,
          defaultAlignment: go.Spot.Left },
        GO(go.Panel, "Horizontal",
          GO("SubGraphExpanderButton",
            { margin: new go.Margin(0, 3, 5, 0) }),
          GO(go.TextBlock, 
          {stroke:"white"},
          new go.Binding("text", "key",function(v) { return v + '表'; }))
        ),
        GO(go.Placeholder)
      )
    );

    //数据和连线Model
    // 在model的数据中, 每个节点数据的值都是由一个JS对象来表示:
    var model = [
        { key: "Root", color: lavgrad },
        { key: "1", parent: "Root", dir: "left", color: bluegrad },
        { key: "2", parent: "Root", dir: "left" },
        { key: "3", parent: "Root", dir: "left" },
        { key: "4", parent: "Root", dir: "left", color: bluegrad ,
          alignment:alignmentLeft,},
        { key: "5", parent: "4" },
        { key: "6", parent: "4" },
        { key: "7", parent: "Root" , dir: "left"},
        { key: "8", parent: "Root",  group:"GP",dir: "right",},
        { key: "15", parent: "Root",  group:"GP", dir: "right"},
        { key: "9", parent: "Root", group:"HIVE", dir:"right"},
        { key: "10", parent: "9", group:"HIVE2-1",dir:"right" },
        { key: "11", parent: "9", group:"HIVE2-1",dir:"right" },
        { key: "12", parent: "9", group:"HIVE2-2" },
        { key: "13", parent: "Root", group:"HIVE"},
        { key: "14", parent: "Root", group:"HIVE"},
        { key: "16", parent: "13" , group:"HIVE2-3"},
        { key: "17", parent: "13" , group:"HIVE2-3"},
        //{ key: "18", parent: "15" , group:"GP2-1"},
        //{ key: "19", parent: "15" , group:"GP2-1"},
        { key: "GP", parent: "Root", isGroup: true, parentGroup:"" },
        //{ key: "GP2-1", parent: "15", isGroup: true, parentGroup:"GP" },
        { key: "HIVE", parent: "Root", isGroup: true, parentGroup:""},
        { key: "HIVE2-1", parent: "9",  isGroup: true, parentGroup:"HIVE" },
        { key: "HIVE2-2", parent: "9",  isGroup: true, parentGroup:"HIVE" },
        { key: "HIVE2-3", parent: "13",  isGroup: true, parentGroup:"HIVE" },
      ];



    this.modelData = model;//Vue存储
    this.modelLinks = this.dataToLinks(this.modelData)//Vue存储

    var myModel = new go.GraphLinksModel(this.modelData, this.modelLinks);
    myDiagram.model = myModel;

    this.myDiagram = myDiagram;//Vue存储
    
    
    //———————————【事件监听】——————————————
    //监听节点扩展事件
    myDiagram.addDiagramListener("TreeExpanded",
      function(e,obj) {
        // Some code I can't figure out that gets me node_key
        console.log(e.subject.first().jb);
    });

    //监听节点选择事件
    myDiagram.addDiagramListener("ObjectSingleClicked", function(e) {
            console.log(e.subject.part.data);
        });
    
    document.addEventListener('fullscreenchange',function(){
      if(document.fullscreenElement){
        //进入全屏
      }else{
        //退出全屏
      }
    },false);
    
  },//【mounted】



  methods:{


    clickTreeExpanderButton(e,obj) {

    },

    //获取新的数据
    getNewData(id,dir){
      
      /*异步请求？*/ 

      let newData = [
        { key: "18", parent: "15" , group:"GP2-1"},
        { key: "19", parent: "15" , group:"GP2-1"},
        { key: "GP2-1", parent: "15", isGroup: true, parentGroup:"GP" }
      ];

      let newLinks = this.dataToLinks(newData)//根据新数据生成新的links      

      //更新model
      this.modelData.push(...newData);
      this.modelLinks.push(...newLinks);

      //更新
      this.updateDiagramAll();
    },

    //将model数据转化成link
    dataToLinks(modelData){

      let links = [];
      
      for (let i = 0; i < modelData.length; i++) {
        let data = modelData[i];
        
        //之后这里要改成isGroup的判断
        //需求的可见线
        if (!data.group){
          links.push({ from: data.parent, to: data.key, visible:true });
        }
        
        //不可见的线，用于树的血脉形成
        if (data.group){
          links.push({ from: data.parent, to: data.key, visible:false });
        }

        //组和组连接起来，挂入布局树上
        if (data.parentGroup){
          links.push({ from: data.parentGroup, to: data.key, visible:true, color:"rgba(125,0,125,1)"});
        }

      };//for  
      
      return links;
    },

    //model变化后更新图表(局部)——————————暂时未使用
    updateDiagram(updatedNodeKey){
      var nodekeys = [updatedNodeKey];  //可以批量改变
      this.myDiagram.startTransaction();

      for (var i = 0; i < nodekeys.length; i++) {
        var node = this.myDiagram.findNodeForKey(nodekeys[i]);
        if (node === null) continue;
        node.updateRelationshipsFromData();

        node.updateTargetBindings();

      }

      this.myDiagram.commitTransaction("update");  
    },

    //model变化后更新图表(全局)
    updateDiagramAll(){
      this.myDiagram.startTransaction();
      this.myDiagram.updateAllRelationshipsFromData();
      this.myDiagram.updateAllTargetBindings();
      this.myDiagram.commitTransaction("update");
    },     
    }
  }
</script>

<style scoped lang='scss'>
@import '../assets/css/common.scss';

#demo3{
  @include box-border;
  @include big-box;
}

</style>

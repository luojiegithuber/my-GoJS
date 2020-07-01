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
      treeStructure:[],//树结构映射
    }
  },
  beforeCreate(){

    //兄弟组件传值
    //监听抽屉的滑动，以免滑梯滑动之后canvas的面积不会被改变
    this.bus.$on("toDiagramForArea",msg=>{

      let time = setInterval(()=>{
        this.myDiagram.requestUpdate();
      },10)
      setTimeout(()=>{
        clearInterval(time);
      },1000)

    })

    
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
        selectionAdorned: false,//去掉丑陋的蓝色选择框
        isShadowed: false,// 是否投影
        locationSpot: go.Spot.Center,// Node.location 定位的基准点设置在每个节点的中心处
        scale:0.8,    //初始视图大小比例
        //width:150,
        //height:80,
      }, 

      // 定义节点的外部形状
      GO(go.Shape, "Rectangle", // 形状为矩形
        { fill: "white", stroke: "#696969",desiredSize: new go.Size(200, 50)},
        new go.Binding("fill", "color"),
        new go.Binding("stroke", "status",function(v){
          return v==1?"#696969":"red";
        }),

        //根据选择动态改变节点的框颜色
        new go.Binding("stroke", "isSelected", function(sel,s) {
          if (sel) return "#00C1DE";
          else if(s.Jj.jb.status!='0') return "#696969";
          else return "red";
        }).ofObject("")
        
        ),

      GO(go.Panel,"Auto",
        // 定义节点的文本
        GO(go.TextBlock,
          { margin: 10,height:40,stroke:"#696969", font: "bold 15px Helvetica, bold Arial, sans-serif" },
          //把TextBlock.text 绑在 Node.data.key上
          new go.Binding("text", "key"),
          new go.Binding("stroke", "status",function(v){
            return v==1?"#696969":"red";
          }),

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

        {

          "ButtonBorder.fill": "white",
          "ButtonBorder.stroke": "#00C1DE",
        },

        GO(go.TextBlock, "5+",{stroke:"#00C1DE"}),
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
        { 
          height:20,
          width:20,
          "ButtonIcon.stroke": "#00C1DE",
          "ButtonBorder.fill": "white",
          "ButtonBorder.stroke": "#00C1DE",
        },
        //GO(go.TextBlock, "5"),
      ),

      {
        contextMenu:     // define a context menu for each node
          GO("ContextMenu",  // that has one button
            GO("ContextMenuButton",
              GO(go.TextBlock, "查看血缘"),
              { click: ()=>{console.log("1")} }),
            GO("ContextMenuButton",
              GO(go.TextBlock, "查看元数据"),
              { click: ()=>{console.log("2")} }),
            GO("ContextMenuButton",
              GO(go.TextBlock, "查看表名"),
              { click: ()=>{console.log("3")} }),
            // more ContextMenuButtons would go here
          )  // end Adornment
      }

    );
    

    // 连接线样式
    myDiagram.linkTemplate = GO(
      go.Link,
      { routing: go.Link.Orthogonal, corner: 5 ,visible:true},
      new go.Binding("visible", "visible"),
      GO(go.Shape, {
         strokeWidth: 1, stroke: "#A9A9A9" },
         new go.Binding("stroke", "color"),   
      ),
      GO(go.Shape,   // the arrowhead
        { fromArrow: "Backward", fill: "#A9A9A9",stroke:"#A9A9A9" },
        new go.Binding("stroke", "color"), 
        new go.Binding("fill", "color"),

        //决定箭头方向
        {visible:true},
        new go.Binding("visible", "dir",function(v){
          return v=="left"? true : false
        }),
      ),
      GO(go.Shape,   // the arrowhead
        { toArrow: "Standard", fill: "#A9A9A9",stroke:"#A9A9A9" },
        new go.Binding("stroke", "color"), 
        new go.Binding("fill", "color"),

        //决定箭头方向
        {visible:true},
        new go.Binding("visible", "dir",function(v){
          return v=="left"? false : true
        }),
      ),
      
    );

    //Gruop样式
    myDiagram.groupTemplate = GO(go.Group, "Auto",
    { layout: GO(go.GridLayout, { 
          wrappingColumn: 1,
        }) },
      GO(go.Shape, "Rectangle",
        { fill: "white",stroke:"#00C1DE" }),

      GO(go.Panel, "Vertical",
        { margin: 0,
          defaultAlignment: go.Spot.Left, },
        GO(go.Panel, "Horizontal",
         { background: "#00C1DE",width:200},

          GO("SubGraphExpanderButton",
          { margin: 5},
          { alignment: go.Spot.Right, alignmentFocus: go.Spot.Right}
          ),

          GO(go.TextBlock, 
          { margin: 5, stroke: "white", font: "bold 13px sans-serif" },
          new go.Binding("text", "key",function(v) { return v + '表'; })),
          
        ),
        GO(go.Placeholder, { padding: 5, alignment: go.Spot.TopLeft })
      )
    );



    //数据和连线Model
    // 在model的数据中, 每个节点数据的值都是由一个JS对象来表示:
    var model = [
        { key: "Root", color: "#00C1DE",stroke:"white" },
        { key: "1", parent: "Root", dir: "left",group:"应用" },
        { key: "2", parent: "Root", dir: "left" ,group:"应用"},
        { key: "3", parent: "Root", dir: "left" ,group:"应用"},
        { key: "4", parent: "Root", dir: "left",group:"应用",status:0},
        { key: "5", parent: "4" ,dir:"left",group:"应用2"},
        { key: "6", parent: "4" ,dir:"left",group:"应用2"},
        { key: "7", parent: "Root" , dir: "left",group:"应用"},
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
        { key: "GP", parent: "Root", isGroup: true, parentGroup:"", dir:"right" },
        //{ key: "GP2-1", parent: "15", isGroup: true, parentGroup:"GP" },
        { key: "HIVE", parent: "Root", isGroup: true, parentGroup:"", dir:"right" },
        { key: "HIVE2-1", parent: "9",  isGroup: true, parentGroup:"HIVE", dir:"right"  },
        { key: "HIVE2-2", parent: "9",  isGroup: true, parentGroup:"HIVE", dir:"right"  },
        { key: "HIVE2-3", parent: "13",  isGroup: true, parentGroup:"HIVE", dir:"right"  },
        { key: "应用", parent: "Root",  isGroup: true, parentGroup:"",dir:"left" },
        { key: "应用2", parent: "4",  isGroup: true, parentGroup:"应用",dir:"left",status:0 },
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
        //需求的可见线,有个dir属性
        if (!data.group){
          links.push({ from: data.parent, to: data.key, visible:true, dir:data.dir });
        }
        
        //不可见的线，用于树的血脉形成
        if (data.group){
          links.push({ from: data.parent, to: data.key, visible:false });
        }

        //组和组连接起来，挂入布局树上
        if (data.parentGroup){
          links.push({ from: data.parentGroup, to: data.key, visible:true, color:"rgba(125,0,125,0)"});
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
  //@include box-border;
  // @include big-box;
  flex-grow:1;
  background-color: #fff;
}

</style>

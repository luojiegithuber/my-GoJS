<template>
  <div class="blood-drawer">
    <button onclick="extend">伸展</button>
    <button onclick="shrink">收缩</button>	
  </div>
</template>
<script>
export default {
  methods: {
      extend(){

      },
      
      shrink(){

      },
  },
};
</script>

<style scoped lang='scss'>
@import '../assets/css/common.scss';

.blood-drawer{
    @include box-border;
    background-color: #fff;
    width:25%;
    // -webkit-animation: mymove 5s infinite; /* Chrome, Safari, Opera */
    // animation: mymove 5s infinite;
}

/* Chrome, Safari, Opera */
@-webkit-keyframes mymove {
    0% {width: 200px;}
    50% {width: 500px;}
    100% {width: 200px;}
}

/* Standard syntax */
@keyframes mymove {
    0% {width: 200px;}
    50% {width: 500px;}
    100% {width: 200px;}
}

</style>
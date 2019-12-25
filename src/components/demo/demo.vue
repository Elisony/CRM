<template>
  <div class="box">
    <div @click="boxshow" style="display: flex;
    align-items: center;">
      <h3 style="width:113px;text-align: center;">今日总数据：</h3>
    </div>
    <div class="tit" v-for="(item,index) in value" :key="index">
      <div class="tow">
        <p>{{item.title}}</p>
        <div class="numbe">
          <countTo class="num" :startVal="startVal" :endVal="item.num" :duration="3000" autoplay></countTo>
          <span class="num" v-show="index==0||index==5?false:true">/</span>
          <countTo
            class="num"
            v-show="index==0||index==5?false:true"
            :startVal="startVal"
            :endVal="item.num"
            :duration="3000"
            autoplay
          ></countTo>
        </div>
        
      </div>
    </div>
  </div>
</template>
<script>
import countTo from "vue-count-to";
	export default {
      components: {countTo},
      name: 'main_header',
      data(){
        return {
            startVal:0,
            boxshow:false     
      }
    },
      props:{
          value:{
            type: Array
      }
     },
     methods:{
        emit(){
const newValue = this.boxshow
this.$emit('onClick', newValue)
}
     }
    }
</script>

<style>
.box {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}
.box .tit {
  width: 150px;
  height: 85px;
  border-radius: 4px;
  background: #f0f0f0;
  box-shadow: 10px 10px 5px #888888;
}
.box .tit .tow {
  width: 100%;
  text-align: center;
}
</style>
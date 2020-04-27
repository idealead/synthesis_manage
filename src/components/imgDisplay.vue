<!--
 * @Descripttion: 
 * @version: 
 * @Author: xiaoka
 * @Date: 2020-04-14 17:10:32
 * @LastEditors: xiaoka
 * @LastEditTime: 2020-04-16 16:54:29
 -->

<template>
  <div class="imgMes">
    <div class="topbanner">
      <span>提交</span>
      <span>加载更多</span>
    </div>
    <div class="centerbox">
      <div class="allin">
        <!-- <waterfall :col='col' :width="itemWidth" :gutterWidth="gutterWidth"  :data="data"  @loadmore="loadmore"  @scroll="scroll"  >
          <template >
            <div class="imgboxlist" v-for="(item,index) in data" :key="index"
            >
              <div class="imgbox">
                <img :src="item" alt="" />
              </div>
            </div>
          </template>
        </waterfall> -->
        <waterfall :col='col' :width="itemWidth" :gutterWidth="gutterWidth"  :data="data"  @loadmore="loadmore"   >
        <template >
          <div class="cell-item imgboxlist" v-for="(item,index) in data" :key="index">
            <div class="item-body">
                <div class="item-footer">
                    <img class="avatar" :src='item'>
                </div>
            </div>
          </div>
        </template>
      </waterfall>
        <!-- <waterfall :col='col'   :data="data"     >
          <template>
            <img v-if="item.img" :lazy-src="item.img" alt="load error"  />
          </template>
        </waterfall> -->
        <!-- <div class="imgboxlist" v-for="(item,index) in imgarr" :key="index"
        :style="{top:item.top+'px',left:item.left+'px',width:waterfallImgWidth+'px',height:item.height}">
          <div class="imgbox">
            <img :src="item" alt="" />
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "imgDisplay",
  data() {
    return {
      data:[
        require('../assets/1.png'),
        require('../assets/2.png'),
        require('../assets/3.png'),
        require('../assets/4.png'),
        require('../assets/2.png'),
        require('../assets/3.png'),
        require('../assets/1.png'),
        require('../assets/4.png'),
        require('../assets/3.png')
      ],
      col:5,
    };
  },
  created() {
      
  },
  props: {},
  components: {},
  computed: {
    itemWidth(){  
          return (document.documentElement.clientWidth) 
    },
    gutterWidth(){
          return (document.documentElement.clientWidth)
    }
  },
  mounted() {
  },
  methods: {
    scroll(scrollData){
                console.log(scrollData)
            },
    switchCol(col){
          this.col = col
          console.log(this.col)
    },
    loadmore(){
          this.data = this.data.concat(this.data)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.topbanner {
  width: 100%;
  height: 80px;
  position: fixed;
  top: 0;
  left: 0;
  border-bottom: 1px solid #e0e0e0;
}
.topbanner > span {
  font-size: 20px;
  float: right;
  width: 100px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  border: 1px solid red;
}
.topbanner span:last-child {
  float: left;
}
.centerbox {
  margin-top: 80px;
}
.allin {
  width: 1500px;
  margin: 0 auto;
  height: 100px;
}
.imgboxlist {
  position: absolute;
}
.imgboxlist .imgbox {
  width: 100%;
  height: 100%;
}
.imgboxlist .imgbox img {
  width: 100%;
  height: 100%;
}
</style>

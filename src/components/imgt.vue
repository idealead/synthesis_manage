<!--
 * @Descripttion: 
 * @version: 
 * @Author: xiaoka
 * @Date: 2020-04-16 16:59:58
 * @LastEditors: xiaoka
 * @LastEditTime: 2020-04-27 16:34:44
 -->

<template>
  <div class="container-water-fall">
    <!-- <a-layout-header :style="{ background: '#fff', padding: 0, position: 'fixed', top: '0', left: '200px', right: '0',zIndex:'999'}">
      <a-button type="primary" style="height:100%;float:right" @click="sendresult()">提交</a-button>
    </a-layout-header> -->
    <!-- <a-button type="primary" style="position:fixed;top:0;right:0;height:70px;float:right" @click="sendresult()">提交</a-button> -->
    <!-- <div class="btn-group">
      <button @click="loadmore">LoadMore</button>
      <button @click="switchCol(5)">5column(列)</button>
      <button @click="switchCol(8)">8column(列)</button>
      <button @click="switchCol(10)">10column(列)</button>
      <button @click="reset">reset(重置)</button>
      <a
        style="color:red;"
        href="https://github.com/Rise-Devin/vue-waterfall2/blob/master/README.md"
        target="_blank"
      >GITHUB</a>
      <b style="color:blue">滚动至底部可触发loadmore</b>
    </div> -->
    <!-- <a-layout-header :style="{ background: '#fff', padding: 0, position: 'fixed', right: '0'}">
          <a-button type="primary" style="height:100%;float:right">提交</a-button>
      </a-layout-header> -->
    <div class="centerbox">
      <!-- <div class="allin"> -->
        <div class="example" v-if="firstloading==true">
          <a-spin size="large"/>
        </div>
        <a-empty v-if="imgnew.length==0"/>
        <waterfall class="waterfall" :col="col" :data="imgnew" v-else>
          <template>
            <!-- <a-form :layout="formLayout"> -->
              <!-- <a-form-item> -->
                <div class="cell-item" ref="cellItem" id="cell-item"  v-for="(item, index) in imgnew" :key="index" :data-id="item.id">
                  <img v-if="item.path" :src="item.path" alt="加载错误" />
                  <div class="item-body">
                    <div class="item-desc">
                      <!-- @change="onChange(item.id,$event)" -->
                      <a-radio-group id="radioGroup" class="radioGroup" :name="'radioGroup'+index"  v-model="item.key">
                        <a-radio :value="2" ref="radioGroup">通过</a-radio>
                        <a-radio :value="3" ref="radioGroup">不通过</a-radio>
                      </a-radio-group>
                      <!-- <div class="desc-l">
                        通过：
                        <input type="radio" :name="'check' + index" value="好看" />
                      </div>

                      <div class="desc-r">
                        不通过：<input
                          type="radio"
                          :name="'check' + index"
                          value="不好看"
                        />
                      </div> -->
                      <br />
                    </div>
                    <!-- <div class="item-footer">
                      <div
                        v-if="item.avatar"
                        class="avatar"
                        :style="{backgroundImage : `url(${item.avatar})` }"
                      ></div>
                      <div class="name">{{item.user}}</div>
                      <div class="like" :class="item.liked?'active':''">
                        <i></i>
                        <div class="like-total">{{item.like}}</div>
                      </div>
                    </div> -->
                  </div>
                </div>
              <!-- </a-form-item> -->
              <!-- <a-form-item> -->
                <!-- <a-button type="primary"> -->
                  <!-- Submit -->
                <!-- </a-button> -->
              <!-- </a-form-item> -->
            <!-- </a-form> -->
          </template>
        </waterfall>
        <!-- <a-button type="primary" style="position:fixed;z-index:99999;top:0;right:0;height:50px;float:right" @click="sendresult()">提交</a-button> -->
        <!-- <a-button type="primary" loading>
          Loading
        </a-button> -->
        
      <!-- </div> -->
    </div>
    <div class="addloading" v-if="imgnew.length!==0">
      <a-button type="primary" v-if="loading===false" @click="loadmore">生成更多</a-button>
      <a-button type="primary" :loading="loading" v-else>
        Loading
      </a-button>
    </div>
    <!-- <a-spin class="addloading" :indicator="indicator" /> -->
    <!-- <a-button type="primary" class="addmore" @click="loadmore" v-if="imgnew.length!==0">生成更多</a-button> -->
    <!-- <loading :show="loading" /> -->
  </div>
</template>

<script>
/*
  注意:
  1.itemWidth需要与gutterWidth一起使用才会生效，否则会进行自适应宽度
  2.使用了waterfall的组件不允许使用scoped,否则样式会有问题
*/
import axios from 'axios'
axios.defaults.withCredentials = true;
// import loading from "./loading";
export default {
  name: "imgt",
  props: {
    title: String
  },
  components: {
    // loading
  },
  data() {
    return {
      imgnew:[],
      data: [],
      col: 5,
      firstloading: true,
      loading: false,
      gitHubData: {},
      originData: [
        {
          img:
            "https://image.watsons.com.cn//upload/8a316140.png?w=377&h=451&x-oss-process=image/resize,w_1080",
          avatar:
            "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
          title: "最近浴室新宠，日系神仙好物了解一下～",
          user: "www",
          like: "953"
        },
        {
          img:
            "https://image.watsons.com.cn//upload/083767f0.JPG?w=828&h=620&x-oss-process=image/resize,w_1080",
          avatar:
            "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
          title: "150元搞定全套护肤品，这些护肤好物必须交出来！",
          user: "迷人的小妖精迷人的小妖精",
          like: "952"
        },
        {
          img:
            "https://image.watsons.com.cn//upload/02a4f38d.jpg?w=1067&h=1067&x-oss-process=image/resize,w_1080",
          avatar:
            "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
          title: "最近浴室新宠，日系神仙好物了解一下～",
          user: "迷人的小妖精迷人的小妖精",
          like: "953"
        },
        {
          img:
            "https://image.watsons.com.cn//upload/589585c1.jpeg?x-oss-process=image/resize,w_1080",
          avatar:
            "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
          title: "150元搞定全套护肤品，这些护肤好物必须交出来！",
          user: "迷人的小妖精迷人的小妖精",
          like: "953"
        },
        {
          img:
            "https://image.watsons.com.cn//upload/d862d932.jpg?w=1080&h=1440&x-oss-process=image/resize,w_1080",
          avatar:
            "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
          title: "最近浴室新宠，日系神仙好物了解一下～",
          user: "迷人的小妖精迷人的小妖精",
          like: "953"
        },
        {
          img:
            "https://image.watsons.com.cn//upload/eb4fb58f.jpg?w=1080&h=1080&x-oss-process=image/resize,w_1080",
          avatar:
            "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
          title: "150元搞定全套护肤品，这些护肤好物必须交出来！",
          user: "迷人的小妖精迷人的小妖精",
          like: "953"
        },
        {
          img:
            "https://image.watsons.com.cn//upload/71d19462.jpg?x-oss-process=image/resize,w_1080",
          avatar:
            "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
          title:
            "贵妇级好用的水乳有哪些呢？千万不要去乱尝试贵妇级好用的水乳有哪些呢？",
          user: "迷人的小妖精迷人的小妖精",
          like: "953"
        },
        {
          img:
            "https://image.watsons.com.cn//upload/415f984f.jpeg?w=828&h=1104&x-oss-process=image/resize,w_1080",
          avatar:
            "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
          title: "千万不要去乱尝试贵妇级好用的水乳有哪些呢？千万不要去乱尝试",
          user: "迷人的小妖精迷人的小妖精",
          like: "953"
        },
        {
          img:
            "https://image.watsons.com.cn//upload/5c3e51e4.jpg?w=720&h=960&x-oss-process=image/resize,w_1080",
          avatar:
            "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
          title: "夏天用这款姨妈巾，让你体验真正的清爽",
          user: "迷人的小妖精迷人的小妖精",
          like: "953"
        },
        {
          img:
            "https://image.watsons.com.cn//upload/92761043.JPG?w=1000&h=999&x-oss-process=image/resize,w_1080",
          avatar:
            "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
          title: "最近浴室新宠，日系神仙好物了解一下～",
          user: "迷人的小妖精迷人的小妖精123",
          like: "953"
        },
        {
          img:
            "https://image.watsons.com.cn//upload/da61c0f5.jpg?w=959&h=958&x-oss-process=image/resize,w_1080",
          avatar:
            "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
          title: "千万不要去乱尝试贵妇级好用的水乳有哪些呢？千万不要去乱尝试",
          user: "迷人的小妖精迷人的小妖精",
          like: "953"
        },
        {
          img:
            "https://image.watsons.com.cn//upload/fcd68df4.jpg?w=1080&h=1080&x-oss-process=image/resize,w_1080",
          avatar:
            "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
          title: "最近浴室新宠，日系神仙好物了解一下～",
          user: "迷人的小妖精迷人的小妖精",
          like: "953"
        },
        {
          img:
            "https://image.watsons.com.cn//upload/bef41e67.JPG?w=712&h=534&x-oss-process=image/resize,w_1080",
          avatar:
            "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
          title: "夏天用这款姨妈巾，让你体验真正的清爽",
          user: "迷人的小妖精迷人的小妖精",
          like: "953"
        },
        {
          img:
            "https://image.watsons.com.cn//upload/25ab20fe.JPG?w=1000&h=1200&x-oss-process=image/resize,w_1080",
          avatar:
            "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
          title: "150元搞定全套护肤品，这些护肤好物必须交出来！",
          user: "迷人的小妖精迷人的小妖精123",
          like: "953"
        },
        {
          img:
            "https://ci.xiaohongshu.com/eb971d00-05ab-5b2a-ba03-52d8f544c42b?imageView2/2/w/400/q/50/format/jpg",
          avatar:
            "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
          title: "最近浴室新宠，日系神仙好物了解一下～",
          user: "迷人的小妖精迷人的小妖精",
          like: "953"
        },
        {
          img:
            "https://image.watsons.com.cn//upload/4a3c1788.jpg?w=823&h=1000&x-oss-process=image/resize,w_1080",
          avatar:
            "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
          title: "夏天用这款姨妈巾，让你体验真正的清爽",
          user: "迷人的小妖精迷人的小妖精",
          like: "953"
        },
        {
          img:
            "https://image.watsons.com.cn//upload/0a89e6b7.jpg?w=1080&h=1920&x-oss-process=image/resize,w_1080",
          avatar:
            "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
          title: "千万不要去乱尝试贵妇级好用的水乳有哪些呢？千万不要去乱尝试",
          user: "迷人的小妖精迷人的小妖精",
          like: "953"
        },
        {
          img:
            "https://image.watsons.com.cn//upload/99253111.jpg?w=1080&h=1920&x-oss-process=image/resize,w_1080",
          avatar:
            "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
          title: "150元搞定全套护肤品，这些护肤好物必须交出来！",
          user: "迷人的小妖精迷人的小妖精123",
          like: "953"
        },
        {
          img:
            "https://image.watsons.com.cn//upload/13afe9a7.jpg?x-oss-process=image/resize,w_1080",
          avatar:
            "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
          title:
            "贵妇级好用的水乳有哪些呢？千万不要去乱尝试贵妇级好用的水乳有哪些呢？千万不要去乱尝试贵妇级好用的水乳有哪些呢？千万不要去乱尝试",
          user: "迷人的小妖精迷人的小妖精",
          like: "953"
        },
        {
          img:
            "https://image.watsons.com.cn//upload/98c7c4c3.jpg?w=1210&h=1210&x-oss-process=image/resize,w_1080",
          avatar:
            "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
          title: "150元搞定全套护肤品，这些护肤好物必须交出来！",
          user: "迷人的小妖精迷人的小妖精",
          like: "953"
        },
        {
          img:
            "https://image.watsons.com.cn//upload/54c5d7b4.jpg?w=828&h=991&x-oss-process=image/resize,w_1080",
          avatar:
            "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
          title: "150元搞定全套护肤品，这些护肤好物必须交出来！",
          user: "迷人的小妖精迷人的小妖精",
          like: "953"
        },
        {
          img:
            "https://image.watsons.com.cn//upload/71d19462.jpg?x-oss-process=image/resize,w_1080",
          avatar:
            "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
          title: "夏天用这款姨妈巾，让你体验真正的清爽",
          user: "迷人的小妖精迷人的小妖精123",
          like: "953"
        },
        {
          img:
            "https://image.watsons.com.cn//upload/642cb83c.jpeg?w=1080&h=1080&x-oss-process=image/resize,w_1080",
          avatar:
            "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
          title: "150元搞定全套护肤品，这些护肤好物必须交出来！",
          user: "迷人的小妖精迷人的小妖精",
          like: "953"
        },
        {
          img:
            "https://image.watsons.com.cn//upload/31e42833.jpg?w=750&h=750&x-oss-process=image/resize,w_1080",
          avatar:
            "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
          title: "150元搞定全套护肤品，这些护肤好物必须交出来！",
          user: "迷人的小妖精迷人的小妖精",
          like: "953"
        },
        {
          img:
            "https://image.watsons.com.cn//upload/92761043.JPG?w=1000&h=999&x-oss-process=image/resize,w_1080",
          avatar:
            "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
          title: "夏天用这款姨妈巾，让你体验真正的清爽",
          user: "迷人的小妖精迷人的小妖精",
          like: "953"
        },
        {
          img:
            "https://image.watsons.com.cn//upload/60cc9b8e.jpg?w=991&h=744&x-oss-process=image/resize,w_1080",
          avatar:
            "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
          title: "150元搞定全套护肤品，这些护肤好物必须交出来！",
          user: "迷人的小妖精迷人的小妖精123",
          like: "953"
        },
        {
          img:
            "https://image.watsons.com.cn//upload/b709ed72.jpg?w=552&h=414&x-oss-process=image/resize,w_1080",
          avatar:
            "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
          title: "最近浴室新宠，日系神仙好物了解一下～",
          user: "迷人的小妖精迷人的小妖精",
          like: "953"
        },
        {
          img:
            "https://image.watsons.com.cn//upload/137b50b0.jpg?x-oss-process=image/resize,w_1080",
          avatar:
            "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
          title: "夏天用这款姨妈巾，让你体验真正的清爽",
          user: "迷人的小妖精迷人的小妖精",
          like: "952"
        },
        {
          img:
            "https://image.watsons.com.cn//upload/31e42833.jpg?w=750&h=750&x-oss-process=image/resize,w_1080",
          avatar:
            "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
          title: "最近浴室新宠，日系神仙好物了解一下～",
          user: "迷人的小妖精迷人的小妖精",
          like: "953"
        }
      ],
      page:1,
      pageSize: 20,
      indicator: <a-icon type="loading" style="font-size: 24px" spin />,
      value: 3,
      sendArry:[],
      index:[],
      models: [],
      warnMessage:'',
      childValue:[]
    };
  },
  computed: {
    itemWidth() {
      return 133 * 0.5 * (document.documentElement.clientWidth / 375);
    },
    gutterWidth() {
      return 10 * 0.5 * (document.documentElement.clientWidth / 375);
    }
  },
  methods: {
    a() {
      var _this = this
      _this.firstloading = true
      axios
      .get('//139.129.206.239:7001/api/v1/compose/templates', {
        params: {
          page: _this.page,
          pageSize: 20
        }
      })
      .then(res => {
        _this.loading = false
        _this.firstloading = false
        let arr = res.data.data.templates
        _this.childValue.passNum = res.data.data.passNum
        _this.childValue.auditNum = res.data.data.auditNum
        _this.childValue.total = res.data.data.total
        console.log(_this.childValue)
        // arr.sort(function(){
        //    return Math.random()-0.5;
        // });

        for(let i = 0;i < arr.length; i++){
          let item = arr[i]
          item.key = 1
          _this.imgnew.push(item)
          
          this.$emit('childByValue', this.childValue)
          // _this.imgnew.push(arr[i])
          console.log(_this.models)
          // _this.sendArry.push({id:arr[i].id,status:1})
        }
        if(_this.imgnew.length==0){
          _this.warnMessage = '暂无数据'
          _this.openNotificationWithIcon('warning')
        }
        console.log(_this.imgnew)
      })
      .catch(err => {
        _this.firstloading = false
        console.log(err)
      })
    },
    // onChange(id,event){
    //   const b = this.$refs.cellItem.defaultValue
    //   console.log(b)
    //   const _this = this
    //   const value = event.target.value
    //   const name = event.target.name
    //   const index = name.charAt(name.length-1)
    //   console.log(_this.sendArry)
    //   for(let i = 0;i < _this.imgnew.length; i++){
    //     console.log(index)
    //     console.log(i)
    //     console.log(_this.imgnew[i].id)
    //     console.log(id)
    //     if(_this.imgnew[i].id==id){
    //       console.log(i)
    //       console.log(_this.imgnew[i])
    //       _this.imgnew[i].status = value
    //       _this.index.push(i)
    //     }
    //   }
    //   // if(this.sendArry.length==0){
    //   //   this.sendArry.push({id:id,status:value})
    //   // }else{
    //   //   this.sendArry.push({id:id,status:value})
    //   //   if(this.sendArry[index].id==id){
    //       // this.sendArry[index].status = value
    //   //   }else{
    //   //     this.sendArry.push({id:id,status:value})
    //   //   }
    //   // }
      
    //   console.log(this.sendArry)
    // },
    sendresult(){
      var _this = this
      for(let i = 0;i < _this.imgnew.length; i++){
        if(_this.imgnew[i].key!=1){
          _this.sendArry.push({id:_this.imgnew[i].id,status:_this.imgnew[i].key})
        }
      }
      axios
      .post('//139.129.206.239:7001/api/v1/compose/templates/doFilter', {
        templates:_this.sendArry
      })
      .then(res => {
        console.log(res.data.code)
        if(res.data.code==200){
          _this.warnMessage = '提交成功'
          _this.openNotificationWithIcon('success')
          _this.imgnew = []
          console.log(res)
          _this.a()
        }else{
          _this.warnMessage = '提交失败'
          _this.openNotificationWithIcon('error')
        }
      })
      .catch(err => {
        // _this.warnMessage = '提交失败'
        // _this.openNotificationWithIcon('error')
        console.log(err)
      })
    },
    openNotificationWithIcon(type) {
      const _this = this
      this.$notification[type]({
        message: _this.warnMessage,
        placement:'bottomRight'
      });
    },
    reset() {
      this.data = [];
    },

    switchCol(col) {
      this.col = col;
    },

    loadmore() {
      var _this = this
      this.loading = true;
      setTimeout(() => {
        _this.page+=1
        _this.a()
        this.data = this.data.concat(this.originData, this.originData);
        // this.loading = false;
      }, 1000);
    }
  },
  created(){
    this.a()
    console.log(this.models)
  },
  mounted() {
    console.log(this.imgnew)
    // this.a()
    this.data = this.originData;
  }
};
</script>
<style lang="less" scoped>
* {
  margin: 0;
}
.example {
  text-align: center;
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 30px 50px;
  margin: 20px 0;
}
.popsend{
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  z-index: 999;
}
.popsendin{
  width: 500px;
  height: 300px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background-color: white;
}
.addmore{
  width: 150px;
  text-align: center;
  font-size: 20px;
  color: white;
  margin: 50px auto;
  background-color: #1ABC9C;
  border-radius: 50px;
  padding: 5px 0;
  cursor: pointer;
}
.container-water-fall {
  // padding: 0 28px;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  h4 {
    padding-top: 56px;
    padding-bottom: 28px;
    font-family: PingFangSC-Medium;
    font-size: 36px;
    color: #000000;
    letter-spacing: 1px;
    text-align: justify;
  }
  // button {
  //   background-color: #ff0;
  //   color: #24292e;
  //   border: 1px solid rgba(27, 31, 35, 0.2);
  //   border-radius: 0.25em;
  //   width: 100px;
  //   line-height: 26px;
  //   font-size: 13px;
  //   margin: 4px 0;
  //   margin-right: 4px;
  //   cursor: pointer;
  //   outline: none;
  //   &.blue-light {
  //     background: #27fbc2;
  //   }
  // }
  // button:hover {
  //   background-image: linear-gradient(-180deg, #fafbfc, #ccc 90%);
  // }

  .cell-item {
    width: 100%;
    // margin-bottom: 18px;
    background: #ffffff;
    border: 2px solid #f0f0f0;
    border-radius: 12px 12px 12px 12px;
    overflow: hidden;
    box-sizing: border-box;
    transition: all 0.5s;
    -webkit-transition: all 0.5s;
    img {
      // border-radius: 12px 12px 0 0;
      width: 100%;
      height: auto;
      display: block;
    }
    .item-body {
      // border: 1px solid #F0F0F0;
      padding: 12px;
      .item-desc {
        font-size: 15px;
        color: #333333;
        line-height: 15px;
        font-weight: bold;
        text-align: center;
      }
      .item-desc > div {
        margin: 0 20px;
        // margin: 0 auto;
        // float: left;
        // vertical-align: middle;
      }
      .item-desc > div > input {
        // margin: 0 10px;
        // vertical-align: middle;
      }
      .item-footer {
        margin-top: 22px;
        position: relative;
        display: flex;
        align-items: center;
        .avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-repeat: no-repeat;
          background-size: contain;
        }
        .name {
          max-width: 150px;
          margin-left: 10px;
          font-size: 14px;
          color: #999999;
        }
        .like {
          position: absolute;
          right: 0;
          display: flex;
          align-items: center;
          &.active {
            i {
            }
            .like-total {
              color: #ff4479;
            }
          }
          i {
            width: 28px;
            display: block;
          }
          .like-total {
            margin-left: 10px;
            font-size: 12px;
            color: #999999;
          }
        }
      }
    }
  }
}
.githubdata {
  float: right;
  margin-right: 90px;
  img {
    width: 14px;
    // height: 16px;
  }
}
.addloading{
  // width: 100%;
  margin: 50px auto;
}
.topbanner {
  width: 100%;
  height: 80px;
  position: fixed;
  top: 0;
  left: 0;
  border-bottom: 1px solid #e0e0e0;
  background-color: white;
  z-index: 999;
}
.topbanner > span {
  font-size: 20px;
  float: right;
  width: 100px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  // border: 1px solid red;
  cursor: pointer;
  background-color: #1ABC9C;
  color: white;
}
// .topbanner span:last-child {
//   float: left;
// }
.centerbox {
  // padding-top: 100px;
}
.allin {
  width: 1500px;
  margin: 0 auto;
  height: auto;
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

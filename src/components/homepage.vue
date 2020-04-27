<!--
 * @Descripttion: 
 * @version: 
 * @Author: xiaoka
 * @Date: 2020-04-21 16:24:53
 * @LastEditors: xiaoka
 * @LastEditTime: 2020-04-27 09:36:21
 -->

<template>
  <a-layout id="components-layout-demo-custom-trigger" style="height:100%">
    <a-layout-sider :trigger="null" collapsible v-model="collapsed">
      <div class="logo" />
      <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']">
        <a-menu-item key="1">
          <a-icon type="user" />
          <span>图像合成</span>
        </a-menu-item>
        <!-- <a-menu-item key="2">
          <a-icon type="video-camera" />
          <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="upload" />
          <span>nav 3</span>
        </a-menu-item> -->
      </a-menu>
    </a-layout-sider>
    <a-layout ref="main">
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon style="float:left"
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
        <div class="dataStat">
            <ul>
                <li>图像生成：<span>{{name.total}}</span></li>
                <li>|</li>
                <li>已审核：<span>{{name.auditNum}}</span></li>
                <li>|</li>
                <li>已通过：<span>{{name.passNum}}</span></li>
                <li>|</li>
                <li>审核率：<span>{{name.shlv}}%</span></li>
                <li>|</li>
                <li>通过率：<span>{{name.pslv}}%</span></li>
            </ul>
        </div>
        <a-button type="primary" style="height:100%;float:right" @click="sendclick">提交</a-button>
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' ,overflow:'hidden',overflowY:'scroll'}"
      >
        <imgt ref="imgt" v-on:childByValue="childByValue"> 
        </imgt>
        <!-- <a-button type="primary" style="position:fixed;top:0;right:0;float:right" @click="sendresult()">提交</a-button> -->

      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import axios from 'axios'
import imgt from "./imgt.vue";

axios.defaults.withCredentials = true;

export default {
    
    data() {
        return {
            collapsed: false,
            name:''
        };
    },
    components: {
        // imgDisplay,
        imgt,
    },
    methods:{
        dataStat(){

        },
       sendclick(){
           this.$refs.imgt.sendresult()
       },
       childByValue: function (childValue) {
            // childValue就是子组件传过来的值
            this.name = childValue
            const numps = this.name.passNum
            const numsh = this.name.auditNum
            const alltotal = this.name.total
            const pslv =  (Math.round(numps / numsh * 10000) / 100.00);
            const shlv =  (Math.round(numsh / alltotal * 10000) / 100.00);
            this.name.pslv = pslv
            this.name.shlv = shlv
            console.log(shlv)
            console.log(pslv)
        }
    },
    mounted () {

    },
}
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.dataStat{
    float: left;
}
.dataStat ul li{
    float: left;
    list-style: none;
    margin: 0 10px;
    font-weight: bold;
}
</style>

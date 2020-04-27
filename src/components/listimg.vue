<!--
 * @Descripttion: 
 * @version: 
 * @Author: xiaoka
 * @Date: 2020-04-21 16:01:27
 * @LastEditors: xiaoka
 * @LastEditTime: 2020-04-22 14:41:50
 -->

<template>

  <a-table :columns="columns" :dataSource="imgnew">
    <a class="a" slot="name" slot-scope="text,record">{{ record.id }}</a>
    <span class="b" slot="customTitle">序号</span>
    <span columnWidth="100px" class="imgpath" slot="imgpath" slot-scope="text,record"><img :src="record.path" alt=""></span>
    <!-- <span class="c" slot="tags" slot-scope="tags">
      <a-tag class="ab"
        v-for="tag in tags"
        :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
        :key="tag"
      >
        {{ tag.toUpperCase() }}
      </a-tag>
    </span> -->
    <span slot="action" slot-scope="text, record">
      <a>Invite 一 {{ record.name }}</a>
      <a-divider type="vertical" />
      <a>Delete</a>
      <a-divider type="vertical" />
      <a class="ant-dropdown-link"> More actions <a-icon type="down" /> </a>
    </span>
    <anloading></anloading>
    
  </a-table>
  

</template>
<script>
import axios from 'axios'
import anloading from './anloading.vue'
axios.defaults.withCredentials = true;


const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'name' },
  },
//   {
//     title: '缩略图',
//     dataIndex: 'path',
//     key: 'path',
//   },
  {
    title: '缩略图',
    dataIndex: 'imgpath',
    key: 'imgpath',
    scopedSlots: { customRender: 'imgpath' },
    width: '40%'
  },
//   {
//     title: '标签',
//     key: 'tags',
//     dataIndex: 'tags',
//     scopedSlots: { customRender: 'tags' },
//   },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
];

// const data = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     tags: ['nice', 'developer'],
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//     tags: ['loser'],
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sidney No. 1 Lake Park',
//     tags: ['cool', 'teacher'],
//   },
// ];

export default {
    
    data() {
        return {
            imgnew:[],
            page:1,
            columns,
            loading: true
        };
    },
    components: {
        // imgDisplay,
        // imgt,
        anloading
    },
    methods:{
        tranAjax() {
            var _this = this
            axios
            .get('//139.129.206.239:7001/api/v1/compose/templates', {
                params: {
                page: _this.page,
                pageSize: 50
                }
            })
            .then(res => {
                _this.loading = false
                let arr = res.data.data.templates
                arr.sort(function(){
                return Math.random()-0.5;
                });
                for(let i = 0;i < arr.length; i++){
                _this.imgnew.push(arr[i])
                }
                console.log(_this.imgnew)
            })
            .catch(err => {
                console.log(err)
            })
        },
    },
    mounted(){
        this.tranAjax()
    }
}
</script>
<style scoped>
.example {
  text-align: center;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 30px 50px;
  margin: 20px 0;
}
.imgpath{
    width: 100px;
    height: 100px;
}
.imgpath img{
    width: 100%;
}
</style>

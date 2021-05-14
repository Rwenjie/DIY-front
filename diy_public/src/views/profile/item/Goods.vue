<template>
  <v-card>
    <v-toolbar class="elevation-0">
      <v-btn small color="primary" @click="addGoods">新增商品</v-btn>
      <v-spacer/>
      <v-flex xs4>
        状态：
        <v-btn-toggle mandatory v-model.lazy="filter.status">
          <v-btn text>
            全部
          </v-btn>
          <v-btn text :value=1>
            上架
          </v-btn>
          <v-btn text :value=3>
            下架
          </v-btn>
          <v-btn text :value=2>
            待审核
          </v-btn>
        </v-btn-toggle>
      </v-flex>
      <v-flex xs3>
        <v-text-field
          label="搜索"
          single-line
          hide-details
          append-icon="mdi-map-marker"
          v-model="filter.search"
        >
        </v-text-field>
      </v-flex>
    </v-toolbar>
    <v-divider/>
    <v-data-table
      :headers="headers"
      :items="goodsList"
      :options.sync="pagination"
      :server-items-length="totalGoods"
      :loading="loading"
      class="elevation-1">
      <template v-slot:item.status="{ item }">
        <v-chip
                :color="getColor(item.status)" dark>
          <span v-if="item.status == 1">在 售</span>
          <span v-if="item.status == 2">待审核</span>
          <span v-if="item.status == 3">下 架</span>
        </v-chip>
      </template>
      <template v-slot:item.options="{ item }">
        <v-btn icon @click="editGoods(item)">
          <i class="el-icon-edit"/>
        </v-btn>

        <v-btn icon @click="itemChangeStatus(item, -1)">
          <i class="el-icon-delete"/>
        </v-btn>

        <v-btn icon color="green" v-if="item.status===1" @click="itemChangeStatus(item, 3)">下架</v-btn>
        <v-btn icon color="red" v-else-if="item.status===3" @click="itemChangeStatus(item, 1)">上架</v-btn>
        <v-btn icon v-else></v-btn>

      </template>

    </v-data-table>
    <!--弹出的对话框-->
    <v-dialog max-width="800" v-model="show" persistent scrollable>
      <v-card>
        <!--对话框的标题-->
        <v-toolbar dense dark color="primary">
          <v-toolbar-title>{{isEdit ? '修改' : '新增'}}商品</v-toolbar-title>
          <v-spacer/>
          <!--关闭窗口的按钮-->
          <v-btn icon @click="closeWindow">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <!--对话框的内容，表单-->
        <v-card-text class="px-3" style="height: 600px">
          <goods-form :oldGoods="oldGoods" :step="step" @close="closeWindow" :is-edit="isEdit" ref="goodsForm"/>
        </v-card-text>
        <!--底部按钮，用来操作步骤线-->
        <v-card-actions class="elevation-10">
          <v-flex class="xs3 mx-auto">
            <v-btn @click="previous" color="primary" :disabled="step === 1">上一步</v-btn>
            <v-btn @click="next" color="primary" :disabled="step === 4">下一步</v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
  // 导入自定义的表单组件
  import GoodsForm from './GoodsForm'
  import {goodsChangeStatus, selectGoodsByUser} from "../../../network/item";

  export default {
    name: "goods",
    data() {
      return {
        filter: {
          saleable: true, // 上架还是下架
          search: '', // 搜索过滤字段
        },
        totalGoods: 0, // 总条数
        goodsList: [], // 当前页品牌数据
        loading: true, // 是否在加载中
        pagination: {}, // 分页信息
        headers: [
          {text: 'id', align: 'center', sortable: false, value: 'id'},
          {text: '标题', align: 'center', sortable: false, value: 'title'},
          {text: '关联文章', align: 'center', sortable: false, value: 'article.label'},
          {text: '状态', align: 'center', value: 'status', sortable: true,},
          {text: '操作', align: 'center', value: 'options', sortable: false}
        ],
        show: false,// 控制对话框的显示
        oldGoods: {}, // 即将被编辑的商品信息
        isEdit: false, // 是否是编辑
        step: 1, // 子组件中的步骤线索引，默认为1
      }
    },
    mounted() { // 渲染后执行
      // 查询数据
      this.getDataFromServer();
    },
    watch: {
      pagination: { // 监视pagination属性的变化
        deep: true, // deep为true，会监视pagination的属性及属性中的对象属性变化
        handler() {
          // 变化后的回调函数，这里我们再次调用getDataFromServer即可
          this.getDataFromServer();
        }
      },
      filter: {// 监视搜索字段
        handler() {
          this.getDataFromServer();
        },
        deep: true
      }
    },
    methods: {
      getDataFromServer() { // 从服务的加载数的方法。

        selectGoodsByUser().then(res => {
          console.log(res);
          this.goodsList = res.data;
          const goods = res.data;
/*          goods.forEach( (item)=> {
            console.log(item);
            const goods = {
              title: item.title, // 标题
              subTitle: item.subTitle, //商品卖点
              articleId: item.article.id,
              packingList: item.packingList,//包装清单
              description: item.description,//商品描述
              afterService: item.afterService,//售后服务
              payMethod: JSON.parse(item.payMethod),
              images: JSON.parse(item.images),
              skus: item.skus
            };
            this.goodsList.push(goods)
          });*/
          /*this.goodsList = res.data.items;
          this.totalGoods = resp.data.total;*/
          this.totalGoods = res.data.total
          // 完成赋值后，把加载状态赋值为false
          this.loading = false;
        })
        // 发起请求
/*        this.$http.get("/item/spu/page", {
          params: {
            key: this.filter.search, // 搜索条件
            saleable: this.filter.saleable === 0 ? null : this.filter.saleable, // 上下架
            page: this.pagination.page,// 当前页
            rows: this.pagination.rowsPerPage,// 每页大小
          }
        }).then(resp => { // 这里使用箭头函数
          this.goodsList = resp.data.items;
          this.totalGoods = resp.data.total;
          // 完成赋值后，把加载状态赋值为false
          this.loading = false;
        })*/
      },
      addGoods() {
        // 修改标记
        this.isEdit = false;
        // 控制弹窗可见：
        this.show = true;
        // 把oldBrand变为null
        this.oldGoods = {};
      },
      async editGoods(oldGoods) {
        // 发起请求，查询商品详情和skus
        /*oldGoods.spuDetail = await this.$http.loadData("/item/spu/detail/" + oldGoods.id);
        oldGoods.skus = await this.$http.loadData("/item/sku/list?id=" + oldGoods.id);*/
        // 修改标记
        this.isEdit = true;
        // 控制弹窗可见：
        this.show = true;
        // 获取要编辑的goods
        this.oldGoods = oldGoods;
      },

      //改变商品的发布状态
      itemChangeStatus(goods, status) {
        let index = this.goodsList.indexOf(goods);
        this.goodsList[index].status = status;
        if (status===-1){
          this.goodsList.splice(index, 1);
        }
        goodsChangeStatus(goods.id, status).then( res => {
          console.log(res);
        })
      },
      closeWindow() {
        console.log(1)
        // 重新加载数据
        //this.getDataFromServer();
        // 关闭窗口
        this.show = false;
        // 将步骤调整到1
        this.step = 1;
      },
      previous(){
        if(this.step > 1){
          this.step--
        }
      },
      next(){
        if(this.step < 4 && this.$refs.goodsForm.$refs.basic.validate()){
          this.step++
        }
      },
      getColor(status) {
        if (status === 1) return 'red';
        else if (status === 2) return 'orange';
        else return 'green'
      }
    },
    components: {
      GoodsForm
    }
  }
</script>

<style scoped>

</style>

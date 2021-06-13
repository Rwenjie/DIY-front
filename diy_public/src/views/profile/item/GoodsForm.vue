<template>
  <v-stepper v-model="step" >
    <v-stepper-header>
      <v-stepper-step :complete="step > 1" step="1">基本信息</v-stepper-step>
      <v-divider/>
      <v-stepper-step :complete="step > 2" step="2">商品描述</v-stepper-step>
      <v-divider/>
      <v-stepper-step :complete="step > 3" step="3">规格参数</v-stepper-step>
      <v-divider/>
      <v-stepper-step step="4">SKU属性</v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
      <!--1、基本信息-->
      <v-stepper-content step="1">
        <v-flex class="xs10 mx-auto">
          <v-form v-model="valid" ref="basic">
            <v-row style="margin-top: 15px">
              <v-col cols="6">
                <!--:hint="`${goods.article.id}, ${goods.article.label}`"-->
                <v-select
                        v-model="goods.article"

                        :items="articles"
                        item-text="label"
                        item-value="id"
                        label="关联文章"
                        return-object
                        chips
                ></v-select>
              </v-col>
              <v-col cols="6">
                <!--:hint="`${goods.payMethod.id}, ${goods.payMethod.label}`"-->
                <v-select
                        v-model="goods.payMethod"
                        :items="payMethods"
                        attach
                        chips
                        item-text="label"
                        item-value="id"
                        label="pay"
                        multiple
                ></v-select>
              </v-col>
              <v-col>
                <div style="text-align: left;margin-bottom: 15px">
                  <span>发货地址</span>
                  <area-select v-model="fromAddr" value="toAddr" type="code" :data="$pcaa" :level="2"></area-select>
                </div>

              </v-col>
            </v-row>
            <v-text-field label="商品标题" v-model="goods.title" :maxlength="25" required :rules="[v => !!v || '商品标题不能为空']" />
          </v-form>
        </v-flex>
      </v-stepper-content>
      <!--2、商品描述-->
      <v-stepper-content step="2">
        <div style="text-align:left">
          <div>
            <h4><p>上传图片</p></h4>
            <p>请选择能够更好展示您的DIY的图片。第一张图片为主图，将显示是商品列表页面，这是顾客第一眼看到的图片。最多可以上传7张图片，请谨慎选择！！</p>
            <el-upload
                    action="/api/file/import"
                    list-type="picture-card"
                    :limit = 7
                    multiple
                    :headers="myHeaders"
                    :file-list="imgList"
                    :on-success="imageUploadSuccess"
                    :before-remove="beforeRemove"
                    :on-remove="imageHandleRemove">
              <i class="el-icon-plus"></i>
<!--              <template #default>-->
<!--                <i class="el-icon-plus"></i>-->
<!--              </template>-->
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            <v-divider></v-divider>
          </div>
          <h4><p>视频上传</p></h4>
          <el-upload
                  class="upload-demo"
                  action="/api/file/import"
                  :on-remove="videoHandleRemove"
                  :before-remove="beforeRemove"
                  multiple
                  :headers="myHeaders"
                  :limit="1"
                  :on-success="videoUploadSuccess"
                  :on-exceed="handleExceed"
                  :file-list="videoList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传一个视频文件</div>
          </el-upload>
          <v-divider></v-divider>
          <h4><p>文字描述</p></h4>
         <!-- <v-editor v-model="goods.description" upload-url="/upload/image"/>-->
        </div>

      </v-stepper-content>
     <!-- 3、规格参数-->
      <v-stepper-content step="3">
        <p style="text-align:left">列出您提供的所有规格。买家将按在这里的顺序看到它们。</p>
        <sku-select v-model="stepSpec" :spec="goods.spec"></sku-select>
      </v-stepper-content>
      <!--4、SKU属性-->
      <v-stepper-content step="4">
        <v-simple-table>
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left" v-for="(item, id) in stepSpec" :key="id">{{item.label}}</th>
              <th class="text-left">标题</th>
              <th class="text-left">价格</th>
              <th class="text-left">数量</th>
            </tr>
            </thead>
            <tbody>
            <!--显示数据-->
            <tr v-for="(sku, id) in goods.skus" :key="id">
              <td v-for="(spec, oId) in stepSpec" :key="oId">{{spec.option[sku.indexes[oId]].alt}}</td>
              <td>{{sku.title}}</td>
              <td>{{sku.price}}</td>
              <td>{{sku.stock}}</td>
              <td>
                <v-btn @click="deleteSku(id)">删除</v-btn>
              </td>
            </tr>
            <!--添加数据-->
            <tr>
              <td v-for="(item, id) in stepSpec" :key="id">
                <v-select v-model="inputSku.options[id]"
                          :hint="`${item.option[0].alt}, ${item.option[0].id}`"
                        :items="item.option"
                        item-text="alt"
                        item-value="id"
                        :label="item.label"
                        persistent-hint
                        return-object
                ></v-select>
              </td>
              <td>
                <v-text-field v-model="inputSku.title"></v-text-field>
              </td>
              <td>
                <v-text-field v-model="inputSku.price"></v-text-field>
              </td>
              <td>
                <v-text-field v-model="inputSku.stock"></v-text-field>
              </td>
              <td>
                <v-btn @click="addSkus">确定</v-btn>
              </td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-btn @click="submit">提交
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>

import * as Message from "element-ui";
import {submitGoods} from "../../../network/item";
import {publicGoodArticle} from "../../../network/article";
import SkuSelect from "./SkuSelect";
import Vue from 'vue'

export default {

  name: "goodsForm",
  components: {
    SkuSelect
  },
  props: {
    oldGoods: {
      type: Object,
      default() {
        return null;
      }
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    step: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      fromAddr: [], //发货地址
      valid:false,
      dialogVisible: false,
      dialogImageUrl: "",
      myHeaders: { Authorization: window.sessionStorage.getItem('tokenStr') },
      goods: {
        title: "",
        skus: [],
        images: [],
        video: "",

      },
      stepSpec: {},
      articles: [], //文章列表
      payMethods: [
        {id: 1, label: "支付宝"},
        {id: 2, label: "微信支付"},
        {id: 3, label: "银联"},
      ],
      imgList: [],
      videoList: [],
      inputSku: {
        image: "", //链接图片
        indexes: [],
        price: 0,
        stock: 0,
        ownSpec: "",
        title: "",
        options: []
      }
    };
  },
  methods: {
    submit() {
      this.goods.skus.forEach( (sku) => {
        /*if (sku.indexes.length > 0) {
          let index = sku.indexes[0];
          for (let i=1; i<sku.indexes.length; i++) {
            index += '_';
            index += sku.indexes[i];
          }
          sku.indexes = index;
        }
        sku.indexes = JSON.stringify(sku.indexes);*/
        delete sku.options;
      });
      this.stepSpec.forEach( (spec) => {
        spec.option.disabled = true;
      });

      const goods = {
        title: this.goods.title, // 标题
        article: this.goods.article,
        description: this.goods.description,//商品描述
        payMethod: JSON.stringify(this.goods.payMethod),
        images: this.goods.images,
        skus: this.goods.skus,
        fromAddr: this.fromAddr[2],
        video: this.goods.video,
        spec: JSON.stringify(this.stepSpec),
      };
      console.log("goods");
      console.log(goods);
      submitGoods(goods).then( res => {
        console.log(res);
      })
    },
    handleExceed(files, fileList) {
      this.$message.warning('只能上传一个视频');
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    imageHandleRemove(file) {
      this.splice(this.goods.images.indexOf(file.name));
      //这里应该做后台删除
      console.log(this.goods);
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    imageUploadSuccess(res, file) {
      const image = {name: file.name, url: res.data};
      this.goods.images.push(image.url);
      //this.$bus.$emit("imageUrls", this.imageUrl);
      //将照片信息保存到Vuex
     /* this.$store.dispatch("addImages", {
        images: this.imageUrl
      });*/
      console.log(this.goods);
    },
    videoUploadSuccess(res, file) {
      this.goods.video = res.data;
    },
    videoHandleRemove() {

    },

    addSkus() {
      console.log(this.inputSku);
      //拼接indexes
   /*   if (this.inputSku.options.length > 0) {
        this.inputSku.indexes = this.inputSku.options[0].id;
        for (let i=1; i<this.inputSku.options.length; i++) {
          this.inputSku.indexes += '_';
          this.inputSku.indexes += this.inputSku.options[i].id;
        }
      }*/
      this.inputSku.options.forEach( (op) => {
        this.inputSku.indexes.push(op.id);
      });
      //拼接ownSpec
      let ownSpec = "{";
      for(let i = 0; i < this.stepSpec.length; i++) {
        console.log("i" + i);
        console.log(this.inputSku.options);
        ownSpec += '\"'+this.stepSpec[i].label+'\" : ';
        ownSpec += '\"'+this.inputSku.options[i].alt+'\",';
      }
      ownSpec += "}";
      this.inputSku.ownSpec = ownSpec;

      this.goods.skus.push(JSON.parse(JSON.stringify(this.inputSku)));

      //初始化参数
      this.inputSku.ownSpec = "";
      this.inputSku.indexes = [];
      this.inputSku.price = "";
      this.inputSku.options = [];
      this.inputSku.title = "";
      this.inputSku.stock = "";
    },
    deleteSku(id) {
      this.goods.skus.splice(id, 1);
    },
    loadOldGoodsInfo() {
      if (this.isEdit) {
        this.goods = this.oldGoods;
        this.goods.payMethod = JSON.parse(this.oldGoods.payMethod);
        //图片
        this.oldGoods.images.forEach( (img) => {
          const image = {
            url: img,
            name: "",
          };
          console.log(image);
          this.imgList.push(image);
        });
        //视频
        const video = {
          url: this.goods.video,
          name: "视频"
        };
        this.videoList.push(video);
        //spec
        this.goods.spec = JSON.parse(this.oldGoods.spec);
        console.log(this.oldGoods);
      } else {
        this.goods = {};
        this.stepSpec = {};
      }
    },
    loadInfo() {
      publicGoodArticle().then( res => {
        res.data.forEach( (a) => {
          const ar = {
            id: a.id,
            label: a.title
          };
          console.log(ar);
          this.articles.push(ar);
        });
        console.log("res");
        console.log(res);
      })
    }

  },
  mounted() {
    this.loadInfo();
  },


  watch: {
    oldGoods: {
      deep: true,
      handler() {
        this.loadOldGoodsInfo();
      }
    },
    inputSku: {
      deep: true,
      handler(){
        let title = "";
        this.inputSku.options.forEach( (op) => {
          title += op.alt;
          title += " ";
        });
        this.inputSku.title = title;
      }
    }

  },
  computed: {

  }

};
</script>

<style scoped>
</style>

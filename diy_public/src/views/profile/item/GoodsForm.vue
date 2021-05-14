<template>
  <v-stepper v-model="step">
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
                <v-select
                        v-model="goods.article"
                        :hint="`${goods.article.id}, ${goods.article.title}`"
                        :items="articles"
                        item-text="title"
                        item-value="id"
                        label="关联文章"
                        return-object
                        chips
                ></v-select>
              </v-col>
              <v-col cols="6">
                <v-select
                        v-model="goods.payMethod"
                        :hint="`${goods.payMethod.id}, ${goods.payMethod.label}`"
                        :items="payMethods"
                        attach
                        chips
                        item-text="label"
                        item-value="id"
                        label="pay"
                        multiple
                ></v-select>
              </v-col>
            </v-row>
            <v-text-field label="商品标题" v-model="goods.title" :maxlength="25" required :rules="[v => !!v || '商品标题不能为空']" />
            <v-text-field label="商品卖点" v-model="goods.subTitle" :maxlength="25"/>
            <v-text-field label="包装清单" v-model="goods.packingList" :maxlength="1000" multi-line :rows="3"/>
            <v-text-field label="售后服务" v-model="goods.afterService" :maxlength="1000" multi-line :rows="3"/>
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
                    :headers="myHeaders"
                    :file-list="goods.images"
                    multiple
                    :on-success="uploadSuccess"
                    :on-error="uploadError"
                    :before-remove="beforeRemove"
                    :on-remove="handleRemove">
              <template #default>
                <i class="el-icon-plus"></i>
              </template>
            </el-upload>
            <v-divider></v-divider>
          </div>
          <h4><p>文字描述</p></h4>
          <v-editor v-model="goods.description" upload-url="/upload/image"/>
        </div>

      </v-stepper-content>
     <!-- 3、规格参数-->
      <v-stepper-content step="3">
        <p style="text-align:left">列出您提供的所有规格。买家将按在这里的顺序看到它们。</p>
        <div>
          <el-row v-for="(variation, Id) in variations" :key="Id">
            <el-col :span="12">
                <span v-show=variation.show>{{variation.name}}</span>
                <span v-show=variation.show><el-button size="small" type="text" @click="rename(Id)">改名</el-button></span>
                <span v-show=!variation.show>
                                <el-input v-model="variation.name"
                                          @change="renameVariation(Id)"
                                          size="small" >
                                    <template #append>
                                        <el-button @click="renameVariation(Id)">修改</el-button>
                                    </template>
                                </el-input>
                            </span>
                <span><el-button size="small" type="text" @click="variationDelete(Id)">删除</el-button></span>
              <ul style="list-style: none; font-size: smaller">
                <li><el-checkbox v-model="variation.price">你每个{{variation.name}}的价格都不同</el-checkbox></li>
                <li><el-checkbox v-model="variation.number">你每个{{variation.name}}的库存都不同</el-checkbox></li>
                <li><el-checkbox v-model="variation.sku">你每个{{variation.name}}的SKU都不同</el-checkbox></li>
              </ul>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="2"></el-col>
                <el-col :span="20">
                  <el-input v-model.trim="options[Id]"
                            placeholder="命名属性"
                            @change="addOption(Id)"
                            size="small" >
                    <template #append>
                      <el-button @click="addOption(Id)">添 加</el-button>
                    </template>
                  </el-input>
                  <div style="margin-top: 5px"></div>

                  <ul style="list-style: none;">
                    <li v-for="(option, oId) in variation.options" :key="oId">
                      <el-button size="small">{{option}}</el-button>
                      <el-button size="small" icon="el-icon-delete" @click="deleteOption(Id, oId)"></el-button>
                    </li>
                  </ul>

                </el-col>
                <el-col :span="2"></el-col>
              </el-row>

            </el-col>
          </el-row>
        </div>
        <div>

          <el-row>
            <el-col :span="12">
              <v-input :messages="['添加一个规格']"></v-input>

                <v-text-field
                        v-model.trim="variationName"
                        @click:append="addVariation">
                  <v-btn slot="append"
                         color="primary"
                         small
                         @click="addVariation">
                    添 加</v-btn>
                  <v-icon >mdi-minus</v-icon>
                </v-text-field>
            </el-col>
          </el-row>
        </div>
      </v-stepper-content>
      <!--4、SKU属性-->
      <v-stepper-content step="4">
        <v-simple-table>
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left" v-for="(item, id) in variations" :key="id">{{item.name}}</th>
              <th class="text-left">标题</th>
              <th class="text-left">绑定图片</th>
              <th class="text-left">价格</th>
              <th class="text-left">数量</th>
            </tr>
            </thead>
            <tbody>
            <!--显示数据-->
            <tr v-for="(sku, id) in goods.skus" :key="id">
              <td v-for="(option, oId) in sku.options" :key="oId">{{ option }}</td>
              <td>{{sku.title}}</td>
              <td>{{sku.image}}</td>
              <td>{{sku.price}}</td>
              <td>{{sku.stock}}</td>
              <td>
                <v-btn @click="deleteSku(id)">删除</v-btn>
              </td>
            </tr>
            <!--添加数据-->
            <tr>
              <td v-for="(item, id) in variations" :key="id">
                <v-select
                        v-model="inputSku.options[id]"
                        :items="item.options"></v-select>
              </td>
              <td>
                <v-text-field v-model="inputSku.title"></v-text-field>
              </td>
              <td>
                <v-select
                        v-model="inputSku.image">
                </v-select>
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

export default {

  name: "goodsForm",
  props: {
    oldGoods: {
      type: Object
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
      valid:false,
      myHeaders: { Authorization: window.sessionStorage.getItem('tokenStr') },
      goods: {
        title: "", // 标题
        subTitle: "", //商品卖点
        article: {
          id: 1, title: "第一篇"
        },//文章编号
        packingList: "",//包装清单
        description: "",//商品描述
        afterService: "",//售后服务
        payMethod: [
          { id: 1, label: "支付宝"},
          {id: 2, label: "微信支付"},
        ], //支付方式
        skus: [    //商品规格属性

        ],
        images: [],
      },
      articles: [
        {id: 1, title: "第一篇"},
        {id: 2, title: "第二篇"},
        {id: 3, title: "第三篇"},
        {id: 4, title: "第四篇"},
      ], //文章列表
      payMethods: [
        {id: 1, label: "支付宝"},
        {id: 2, label: "微信支付"},
        {id: 3, label: "银联"},
      ],
      variationName: "dfgh",
      show: [],
      variations:[],
      options: [],
      inputSku: {
        image: "", //链接图片
        indexes: "",
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

      const goods = {
        title: this.goods.title, // 标题
        subTitle: this.goods.subTitle, //商品卖点
        article: this.goods.article,
        packingList: this.goods.packingList,//包装清单
        description: this.goods.description,//商品描述
        afterService: this.goods.afterService,//售后服务
        payMethod: JSON.stringify(this.goods.payMethod),
        images: JSON.stringify(this.goods.images),
        skus: this.goods.skus
      };
      const skus = {

      };
      console.log(goods);
      console.log(this.goods.skus);

      submitGoods(goods).then( res => {
        console.log(res);
      })
    },
    handleRemove(file) {
      this.splice(this.goods.images.indexOf(file.name));
      //这里应该做后台删除
      console.log(this.goods);
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    uploadSuccess(res, file) {
      const image = {name: file.name, url: res.data}
      this.goods.images.push(image.url);
      //this.$bus.$emit("imageUrls", this.imageUrl);
      //将照片信息保存到Vuex
     /* this.$store.dispatch("addImages", {
        images: this.imageUrl
      });*/
      console.log(this.goods);
    },
    uploadError(err, file, fileList) {
      Message.success("上传成功")
    },
    addVariation() {
      if (this.variationName == "") {
        return;
      }
      const variation = {
        name: this.variationName,
        options: [],
        price: false,
        number: false,
        sku: false,
        show: true
      };
      this.variations.push(variation);
      this.show.push(false)
      this.variationName = "";
    },
    variationDelete(id) {
      this.variations.splice(id, 1);
    },
    rename(id) {
      this.variations[id].show = false;
      this.variations[id].name = "";
    },
    renameVariation(id){
      this.variations[id].show = true;
    },
    //添加属性
    addOption(id) {
      if (this.variations[id].options.indexOf(this.options[id])==-1){
        this.variations[id].options.push(this.options[id]);
      }
      this.options[id] = "";
    },
    //删除属性
    deleteOption(Id, oId){
      this.variations[Id].options.splice(oId, 1);
    },
    addSkus() {
      const input = {
        image: "", //链接图片
        indexes: "",
        price: 0,
        stock: 0,
        ownSpec: "",
        title: "",
        options: []
      };
      let ownSpec = '{';
      for (let i=0; i<this.options.length; i++) {
        ownSpec = ownSpec + " \"" + this.variations[i].name + "\":\"" +this.options[i] + "\"";
        if (i+1<this.options.length){
          ownSpec = ownSpec + ',';
        }
      }
      ownSpec = ownSpec + '}';
      this.inputSku.ownSpec = ownSpec;

      let indexes = "";
      const options = this.inputSku.options;
      for (let i=0; i<options.length; i++) {
        const option = options[i]
        let index = this.variations[i].options.indexOf(option);
        indexes = indexes + index +"";
        if (i+1<options.length){
          indexes = indexes + '_';
        }
      }
      this.inputSku.indexes = indexes;
      if (indexes=="") {
        this.inputSku = input;
        return;
      }
      this.goods.skus.push(this.inputSku);
      this.inputSku = input;
      console.log("skus=>"+this.goods.skus);
    },
    deleteSku(id) {
      this.goods.skus.splice(id, 1);
    }

  },
  watch: {
    oldGoods: {
      deep: true,
      handler(val) {
        if (!this.isEdit) {
          Object.assign(this.goods, {
            categories: null, // 商品分类信息
            brandId: 0, // 品牌id信息
            title: "", // 标题
            subTitle: "", // 子标题
            spuDetail: {
              packingList: "", // 包装列表
              afterService: "", // 售后服务
              description: "" // 商品描述
            }
          });
          this.specs = [];
          this.specialSpecs = [];
        } else {
          this.goods = Object.deepCopy(val);

          // 先得到分类名称
          const names = val.cname.split("/");
          // 组织商品分类数据
          this.goods.categories = [
            { id: val.cid1, name: names[0] },
            { id: val.cid2, name: names[1] },
            { id: val.cid3, name: names[2] }
          ];

          // 将skus处理成map
          const skuMap = new Map();
          this.goods.skus.forEach(s => {
            skuMap.set(s.indexes, s);
          });
          this.goods.skus = skuMap;
        }
      }
    },

  },
  computed: {

  }

};
</script>

<style scoped>
</style>

<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/5/23
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/23
 -->

<template>
    <div id="sku-select" style="text-align: left">
        <el-upload
                class="avatar-uploader"
                :headers="myHeaders"
                :action="uploadAction"
                :file-list="richImg"
                :show-file-list="false"
                :on-success="uploadSuccess"
                :on-error="uploadError">
        </el-upload>

        <div>
            <el-row v-for="(item, Id) in spec" :key="Id">
                <el-col :span="12">
                    <span v-show="show[Id]">{{item.label}}</span>
                    <span v-show="show[Id]"><el-button size="small" type="text" @click="rename(Id)">改名</el-button></span>
                    <span v-show="!show[Id]">
                                <el-input v-model="item.label"
                                          @change="renameVariation(Id)"
                                          size="small" >
                                    <template #append>
                                        <el-button @click="renameVariation(Id)">修改</el-button>
                                    </template>
                                </el-input>
                            </span>
                    <span><el-button size="small" type="text" @click="variationDelete(Id)">删除</el-button></span>
                    <ul style="list-style: none; font-size: smaller">
                       <!-- <li><el-checkbox v-model="variation.price">你每个{{variation.name}}的价格都不同</el-checkbox></li>
                        <li><el-checkbox v-model="variation.number">你每个{{variation.name}}的库存都不同</el-checkbox></li>
                        <li><el-checkbox v-model="variation.sku">你每个{{variation.name}}的SKU都不同</el-checkbox></li>-->
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
                                <li v-for="(op, oId) in item.option" :key="oId">
                                    <el-button size="small">{{op.alt}}</el-button>
                                    <v-icon @click="addImage(id, oId)" color="darken-2">mdi-image-plus</v-icon>
                                    <v-icon color="darken-2">mdi-delete-forever</v-icon>

                                    <el-button size="small" icon="el-icon-delete" @click="deleteOption(Id, oId)"></el-button>
                                </li>
                            </ul>

                        </el-col>
                        <el-col :span="2"></el-col>
                    </el-row>

                </el-col>
            </el-row>
        </div>
       <!-- <div>
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
        </div>-->
    </div>
</template>

<script>
    export default {
        name: "SkuSelect",
        model: {
            prop: 'spec',
            event: 'pitch-on'
        },
        props: {
            spec: {
                type: Array,
                default(){
                    return []
                }
            }
        },
        data() {
            return {
                //图片上传
                myHeaders: { Authorization: window.sessionStorage.getItem('tokenStr') },
                uploadAction: "/api/file/import",
                variationName: "dfgh",
                variations:[],
                options: [],
                show: [],
                uploadOid: '',
                uploadIid: '',
            }
        },
        methods: {
            addImage(id, oId) {
                document.querySelector('.avatar-uploader input').click();
                this.uploadOid = oid;
                this.uploadIid = id;
            },
            uploadSuccess(res) {
                const

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
                this.show[id] = false;
                //this.variations[id].name = "";
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
        },
        mounted() {
            this.spec.forEach( (s) => {
                this.show.push(true);
            })
        }

    }
</script>

<style scoped>

</style>
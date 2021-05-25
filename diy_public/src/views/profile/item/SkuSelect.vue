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
                :show-file-list="false"
                :on-success="uploadSuccess">
        </el-upload>
        <div>
            <el-row>
                <el-col :span="12">
                    <v-input :messages="['添加一个规格']"></v-input>
                    <v-text-field
                            v-model="newSpecName"
                            @click:append="addSpec">
                        <v-btn slot="append"
                               color="primary"
                               small
                               @click="addSpec">
                            添 加</v-btn>
                        <v-icon >mdi-minus</v-icon>
                    </v-text-field>
                </el-col>
            </el-row>
        </div>
        <div>
            <div v-for="(item, sid) in specification" :key="item.sid">
                <div>
                    <div style="width: 150px;float: left">
                        <el-input v-model="item.label"
                                  size="small" >
                        </el-input>
                    </div>
                    <el-button  style="margin-left: 10px" size="small" @click="deleteSpec(sid)">删除</el-button>
                    <el-checkbox style="margin-left: 15px" v-model="item.isImage">绑定图片</el-checkbox>
                </div>

                <div  style="margin-top: 10px">
                    <div>
                        <div style="width: 150px;float: left">
                            <el-input v-model="item.input"
                                      placeholder="命名属性"
                                      size="small" >
                            </el-input>
                        </div>
                        <el-button style="margin-left: 10px" size="small" @click="addOption(sid)">添 加</el-button>
                    </div>

                    <div style="margin-top: 5px">

                        <v-simple-table dense>
                            <template v-slot:default>
                                <thead>
                                <tr>
                                    <th>编号</th><th>属性值</th><th>图片</th><th>操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(op, oid) in item.option"
                                    :key="op.id">
                                    <td>{{ op.id }}</td>
                                    <td>{{ op.alt}}</td>
                                    <td v-if=!item.isImage>
                                        无
                                    </td>
                                    <td v-else>
                                        <el-tooltip class="item" effect="dark" content="点击上传图片" placement="top">
                                            <v-btn icon  @click="uploadImg(sid, oid)">
                                                <i class="el-icon-upload2"/>
                                            </v-btn>
                                        </el-tooltip>
                                        <img :src="op.src" style="width: 35px; height: 35px; margin: 0 5px"/>
                                    </td>
                                    <td>
                                        <v-btn icon  @click="deleteOption(sid, oid)">
                                            <i class="el-icon-delete"/>
                                        </v-btn>
                                    </td>
                                </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </div>
                </div>
                <el-divider></el-divider>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SkuSelect",
        model: {
            prop: 'lastSpec',
            event: 'change-on'
        },
        props: {
            spec: {
                type: Array,
                default(){
                    return []
                }
            },
            lastSpec: {
                type: Array,
                default(){
                    return this.spec;
                }
            }
        },
        data() {
            return {
                //图片上传
                myHeaders: { Authorization: window.sessionStorage.getItem('tokenStr') },
                uploadAction: "/api/file/import",
                newSpecName: "",
                variations:[],
                options: [],
                show: [],
                imageShow: [],
                uploadOid: '',
                uploadSid: '',
                specification: JSON.parse(JSON.stringify(this.spec)),
            }
        },
        methods: {
            addSpec() {
                if (this.newSpecName.trim()=="") {
                    this.newSpecName = ""
                    alert("输入不能为空");
                    return;
                }
                const spec = {
                    VariablePricing:true,
                    isImage:false,
                    label: this.newSpecName,
                    option:[],
                };
                this.specification.push(spec);
                this.newSpecName = "";
            },
            deleteSpec(id) {
                this.specification.splice(id, 1);

                for (let i=0; i<this.specification.length; i++) {
                    this.specification[i].sid = i
                }
            },
            addOption(sid) {
                if (this.specification[sid].input.trim()==="") {
                    this.specification[sid].input = "";
                    alert("输入不能为空");
                    return;
                }
                this.specification[sid].option.forEach( (op) => {
                    if (op.alt === this.specification[sid].input) {
                        alert("属性重复")
                        return;
                    }
                });
                const op = {
                    alt: this.specification[sid].input,
                    arc: "",
                    disabled: false,
                    id: this.specification[sid].option.length,
                    sId: sid,
                };
                this.specification[sid].option.push(op)
                this.specification[sid].input = "";

            },
            deleteOption(sid, oid){
                this.specification[sid].option.splice(oid, 1);
                let i = 0;
                this.specification[sid].option.forEach( (op) => {
                    op.id = i++;
                })

            },
            uploadImg(sid, oid) {
                document.querySelector('.avatar-uploader input').click();
                this.uploadOid = oid;
                this.uploadSid = sid;
            },
            uploadSuccess(res) {
                const data =  res.data;
                console.log(res);
                this.specification[this.uploadSid].option[this.uploadOid].src = res.data;
                alert("上传成功");
            },

        },
        mounted() {
            this.specification.forEach( (spec) => {
                spec.option.forEach( (op) => {
                    op.disabled = false;
                })
            });
            this.$emit("change-on", this.specification);

        },
        watch: {
            specification: {
                deep: true,
                handler() {
                    this.$emit("change-on", this.specification);
                }
            }
        }

    }
</script>

<style scoped>

</style>
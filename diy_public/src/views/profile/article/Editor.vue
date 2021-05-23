<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/5/5
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/5
 -->

<template>
    <div id="r-editor">
        <div style="text-align:right; padding-bottom: 5px;" >
            <el-button @click="dialogVisible=true">
                发布文章
            </el-button>
        </div>
        <el-dialog
                :visible.sync="dialogVisible"
                width="50%"
                :center=false>
            <template #title>
                <h3>发布文章</h3>
            </template>
            <div style="text-align: left">
                <el-form ref="form" label-width="100px">
                    <el-form-item label="文章题目">
                        <el-input v-model="article.title" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <el-form-item label="摘要">
                        <el-input
                                type="textarea"
                                maxlength="200"
                                :autosize="{ minRows: 3, maxRows: 5}"
                                placeholder="请简单的介绍一下的你DIY，吸引更多的人浏览你的文章"
                                v-model="article.brief">
                        </el-input>

                    </el-form-item>
                    <el-form-item label="首页图片">
                        请选择最能展示你作品的图片，该图片将在首页展示，请谨慎选择。
                        <el-upload
                                action="/api/file/import"
                                list-type="picture-card"
                                :headers="myHeaders"
                                :limit="1"
                                :file-list="article.image"
                                :disabled="imgDisable"
                                :on-success="imageUploadSuccess"
                                :on-exceed="imageExceed"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="imageDialogVisible">
                            <img width="100%" :src="article.image" alt="">
                        </el-dialog>
                    </el-form-item>
                    <el-form-item label="文章分类">
                        <el-cascader
                                v-model="categoryId"
                                placeholder="可搜素"
                                :options="categories"
                                :props="{ checkStrictly: true }"
                                clearable
                                filterable></el-cascader>
                    </el-form-item>
                    <el-form-item label="其他分类">
                        <el-select
                            v-model="subCategory"
                            multiple
                            filterable
                            allow-create
                            default-first-option
                            placeholder="文章还涉及的分类">
                        <el-option
                                v-for="item in subCateOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    </el-form-item>
                    <el-form-item label="文章标签">
                        <el-select
                            v-model="tags"
                            multiple
                            filterable
                            allow-create
                            default-first-option
                            placeholder="请选择文章标签">
                            <el-option
                                v-for="item in tagsOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>

                <el-button type="primary" @click="submitArticle">确 定</el-button>
            </span>
        </el-dialog>

        <r-editor v-model="article.text">
        </r-editor>
      <!--  <v-editor>

        </v-editor>-->
    </div>
</template>

<script>
    import {submitArticle} from "../../../network/article";
    import {getAllCate, getAllTags, getCategories} from "../../../network/common";
    import {getTreeData} from "../../../utils/utils";
    import {mapGetters} from "vuex";

    export default {
        name: "Editor",
        computed:{
            ...mapGetters({
                categories: 'categories'
            })
        },
        data() {
            return {
                imgDisable: false,
                myHeaders: { Authorization: window.sessionStorage.getItem('tokenStr') },
                article: {
                    title: "",
                    text: "",
                    categoryId: "",
                    subCategory: "",
                    image: "",
                    tags: "",
                    brief: "",
                },
                tags: [],
                subCategory: [],
                imageDialogVisible: false,
                dialogImageUrl: "",
                dialogVisible: false,
                subCateOption: [],
                tagsOption: [],
                categoryId: [],

            }
        },
        methods: {
            handleRemove(file, fileList) {
                this.article.image = "";
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.imageDialogVisible = true;
            },
            imageUploadSuccess(response, file, fileList){
                this.article.image = response.data;
            },
            imageExceed() {
                this.imgDisable = true;
                alert("只能上一张图片,请慎重考虑")
            },
            submitArticle() {

                this.article.tags = "";
                this.tags.forEach( (tag) => {
                    this.article.tags += (tag+',')
                });
                this.article.subCategory = "",
                this.subCategory.forEach( (cat) => {
                    this.article.subCategory += (cat+',')
                });
                this.article.categoryId = this.categoryId[0];
                submitArticle(this.article).then( res => {
                   /*this.article = {};*/
                });
                this.dialogVisible = false;
            },
            loadCategory() {
                getAllCate().then( res => {
                    res.data.forEach( (category) => {
                        const option = {
                            value: category.id,
                            label: category.name
                        };
                        this.subCateOption.push(option);
                    })
                });
                getCategories().then( res => {
                    console.log("category==>");
                    console.log(res);
                    this.category = getTreeData(res.data);
                })
            },
            loadTags() {
                getAllTags().then( res => {
                    res.data.forEach( (tag) => {
                        const option = {
                            value: tag.id,
                            label: tag.label
                        };
                        this.tagsOption.push(option);
                    })
                })
            }
        },
        mounted() {
            this.loadCategory();
            this.loadTags();
        }
    }
</script>

<style scoped>

</style>
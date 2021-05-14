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
                width="30%"
                :center=false
                :before-close="handleClose">
            <template #title>
                <h3>发布文章</h3>
            </template>
            <div>
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="文章标签">
                    <el-select
                            v-model="value"
                            multiple
                            filterable
                            allow-create
                            default-first-option
                            placeholder="请选择文章标签">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>


                </el-form-item>
                    <el-form-item label="分类">
                        <el-cascader
                                placeholder="试试搜索：指南"
                                :options="category"
                                :props="{ checkStrictly: true }"
                                clearable
                                filterable></el-cascader>
                    </el-form-item>
                    <el-form-item label="文章类型">
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                                    v-for="item in types"
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

                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <!--<r-editor>

        </r-editor>-->
        <v-editor>

        </v-editor>
    </div>
</template>

<script>
    export default {
        name: "Editor",
        data() {
            return {
                dialogVisible: false,
                options: [{
                    value: 'HTML',
                    label: 'HTML'
                }, {
                    value: 'CSS',
                    label: 'CSS'
                }, {
                    value: 'JavaScript',
                    label: 'JavaScript'
                }],
                value: [],
                types: [{
                    value: '原创',
                    label: '原创'
                }, {
                    value: '转载',
                    label: '转载'
                }, {
                    value: '翻译',
                    label: '翻译'
                }],
                category:  [{
                    value: 'zhinan',
                    label: '指南',
                    children: [{
                        value: 'shejiyuanze',
                        label: '设计原则',
                        children: [{
                            value: 'yizhi',
                            label: '一致'
                        }, {
                            value: 'fankui',
                            label: '反馈'
                        }, {
                            value: 'xiaolv',
                            label: '效率'
                        }, {
                            value: 'kekong',
                            label: '可控'
                        }]
                    }],
                }]
            }
        }
    }
</script>

<style scoped>

</style>
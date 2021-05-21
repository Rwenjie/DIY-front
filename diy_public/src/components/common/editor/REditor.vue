<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/5/5
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/5
 -->

<template>
    <div id="r-editor">
        <el-upload
                class="avatar-uploader"
                :headers="myHeaders"
                :action="uploadAction"
                :file-list="richImg"
                :show-file-list="false"
                :on-success="uploadSuccess"
                :on-error="uploadError">
        </el-upload>

        <el-upload
                class="video-uploader"
                :headers="myHeaders"
                :action="uploadAction"
                :file-list="richImg"
                :show-file-list="false"
                :on-success="videoUploadSuccess"
                :on-error="videoUploadError">
        </el-upload>

        <quill-editor
                v-model="introduce"
                ref="myQuillEditor"
                style="height:500px;"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)"
                @change="onEditorChange($event)">

        </quill-editor>
    </div>
</template>

<script>
    import { quillEditor } from "vue-quill-editor";

    const toolbarOptions = [
        //可以自定义富文本有哪些功能
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['link', 'image', 'video'],
        ['clean']
    ];
    export default {
        name: "Editor",
        components: {
            quillEditor
        },
        model: {
            prop: 'props',
            event: 'pitch-on'
        },
        props: {
            introduce: {
                type: String,
                default() {
                    return ""
                }
            }
        },
        data() {
            return {

                // html中引用的富文本
                editorOption: {
                    placeholder: '',
                    theme: 'snow',
                    modules: {
                        toolbar: {
                            //toolbarOptions是富文本展示的功能
                            container: toolbarOptions,
                            // 监听图片上传点击事件
                            handlers: {
                                'image': function (value) {
                                    this.whatUpload = "image";
                                    if (value) {
                                        // upload点击上传事件
                                        document.querySelector('.avatar-uploader input').click()
                                    } else {
                                        this.quill.format('image', false)
                                    }
                                },
                                'video': function (value) {
                                    this.whatUpload = "simpleVideo";
                                    if (value) {
                                        // upload点击上传事件
                                        document.querySelector('.video-uploader input').click()
                                    } else {
                                        this.quill.format('video', false)
                                    }
                                }
                            }
                        }
                    }
                },
                // 请求头
                myHeaders: { Authorization: window.sessionStorage.getItem('tokenStr') },
                uploadAction: "/api/file/import", // 图片上传的接口地址,引用方式各有不同
                richImg: [], // 图片列表
                whatUpload: "",

            }
        },
        methods: {
            onEditorBlur() {}, // 失去焦点事件
            onEditorFocus() {}, // 获得焦点事件
            onEditorChange() {}, // 内容改变事件
            onEditorReady() {

            },
            imgClick() {
                alert("image");
            },
            uploadSuccess(res) {
                console.log(res, 'res');
                var dt = {}
                dt.url = res.data;
                console.log("dt===>");
                console.log(dt);
                let quill = this.$refs.myQuillEditor.quill;
                console.log(quill);
                // 如果上传成功
                if (res.code === 200 && dt.url !== null) {
                    // 获取光标所在位置
                    let length = quill.getSelection().index;
                    // 插入图片  dt.url为服务器返回的图片地址
                    console.log(dt.url);
                    quill.insertEmbed(length, "image", dt.url)
                    // 调整光标到最后
                    quill.setSelection(length + 1)
                } else {
                    this.$message.error('图片插入失败')
                }
                // loading加载隐藏
                this.quillUpdateImg = false
            },
            // 上传失败钩子函数
            uploadError() {},
            // 上传前钩子函数
            videoUploadSuccess(res) {
                console.log(res, 'res');
                var dt = {}
                dt.url = res.data;
                console.log("dt===>");
                console.log(dt);
                let quill = this.$refs.myQuillEditor.quill;
                console.log(quill);
                // 如果上传成功
                if (res.code === 200 && dt.url !== null) {
                    // 获取光标所在位置
                    let length = quill.getSelection().index;
                    // 插入图片  dt.url为服务器返回的图片地址
                    console.log(dt.url);
                    quill.insertEmbed(length, 'video', dt.url);
                    // 调整光标到最后
                    quill.setSelection(length + 1)
                } else {
                    this.$message.error('图片插入失败')
                }
                // loading加载隐藏
                this.quillUpdateImg = false
            },
            videoUploadError() {

            }

        },
        mounted(){

        },
        watch: {
            introduce: {
                deep: true,
                handler() {
                    this.$emit('pitch-on', this.introduce)
                }
            }
        }
    }
</script>

<style scoped>

</style>
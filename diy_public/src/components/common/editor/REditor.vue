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

        <el-button v-show="false" class="video-upload-btn" @click="videoUpload">

        </el-button>

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
        <div style="text-align: left">
            <el-dialog
                    title="插入视频"
                    :visible.sync="videoVisible"
                    width="40%">
                <el-form ref="form"  label-width="100px">
                    <el-form-item label="视频URL：">
                        <div>
                            <el-col :span="20">
                                <el-input v-model="videoUrl"></el-input>
                            </el-col>
                            <el-col :span="4">
                                <el-button type="primary" @click="iframeUpload">确 定</el-button>
                            </el-col>

                        </div>

                        <span>目前只支持支持腾讯视频、哔哩哔哩视频、优酷视频、已上传视频</span>
                    </el-form-item>
                    <el-form-item label="直接上传：">
                        <el-button @click="videoToUpload"> 点击上传</el-button>
                        <!--<el-upload
                                :headers="myHeaders"
                                :action="uploadAction"
                                :file-list="richImg"
                                class="video-uploader"
                                :on-success="videoUploadSuccess"
                                :on-error="videoUploadError">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        </el-upload>-->
                        <el-upload
                                class="video-uploader"
                                :headers="myHeaders"
                                :action="uploadAction"
                                :file-list="richImg"
                                :on-success="uploadSuccess"
                                :on-error="videoUploadError">
                        </el-upload>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="videoVisible = false">取 消</el-button>

            </span>
            </el-dialog>
        </div>
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
                                        /*this.videoVisible = true;
                                        this.videoUpload();*/
                                        document.querySelector('.video-upload-btn').click()
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
                videoVisible: false,
                videoUrl: "",
                uploadMethod: 0, //是上传视频

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

                console.log(this.uploadMethod);
                var dt = {};
                let quill = this.$refs.myQuillEditor.quill;
                console.log(quill);
                let length = quill.getSelection().index;

               /* if (res==undefined) {
                    if (this.uploadMethod === 2) {
                        quill.insertEmbed(length, "video", this.videoUrl);
                    }
                    //如果上传成功
                } else */
               if (res.code === 200 && res.data !== null) {
                    console.log(this.uploadMethod);
                    dt.url = res.data;
                    // 获取光标所在位置
                    console.log(dt.url);
                    /*if (this.isVideo) {
                        quill.insertEmbed(length, "video", dt.url)
                    } else {
                        quill.insertEmbed(length, "image", dt.url)
                    }*/
                    // 插入图片/视频  dt.url为服务器返回的图片地址
                    if (this.uploadMethod === 0) {
                        quill.insertEmbed(length, "image", dt.url)
                    } else  {
                        quill.insertEmbed(length, "video", dt.url);
                        this.videoVisible = false;
                    } /*else if (this.uploadMethod === 2) {
                        quill.insertEmbed(length, "video", this.videoUrl);
                    }*/
                    // 调整光标到最后
                    quill.setSelection(length + 1)
                } else {
                    this.$message.error('图片插入失败')
                }
                // loading加载隐藏
                this.uploadMethod = 0;
                this.quillUpdateImg = false
            },
            // 上传失败钩子函数
            uploadError() {},
            // 上传前钩子函数
           /* videoUploadSuccess(res) {
                this.videoVisible = false;
                console.log(res, 'res');
                var dt = {};
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
                    quill.insertEmbed(length, "video", dt.url)
                    // 调整光标到最后
                    quill.setSelection(length + 1)
                } else {
                    this.$message.error('图片插入失败')
                }
                // loading加载隐藏
                this.quillUpdateImg = false
            },*/
            videoUploadError() {

            },
            videoUpload() {
                this.videoVisible = true;
                this.isVideo = true;
            },
            videoToUpload() {
                document.querySelector('.video-uploader input').click();
                this.uploadMethod = 1;
            },
            //iframe嵌入代码
            iframeUpload() {
                this.uploadMethod = 2;
                this.uploadSuccess({
                    code: 200,
                    data: this.videoUrl
                });
                this.videoUrl = "";
                this.videoVisible = false;
               /* let quill = this.$refs.myQuillEditor.quill;
                // 获取光标所在位置
                console.log(quill);
                let length = quill.getSelection().index;
                //插入视频代码
                quill.insertText(length, this.videoUrl);
                // 调整光标到最后
                quill.setSelection(length + 1)*/

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
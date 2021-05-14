<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/5/5
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/5
 -->

<template>
    <div id="r-editor">
        <quill-editor
                v-model="content"
                ref="myQuillEditor"
                :options="quillOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @change="onEditorChange($event)"
        />
    </div>
</template>

<script>
    import { quillEditor } from "vue-quill-editor";
    import quillConfig from "./quill-config"
    export default {
        name: "Editor",
        components: {
            quillEditor
        },
        data () {
            return {
                quillOption: quillConfig
            }
        },
        methods: {
            onEditorBlur() {}, // 失去焦点事件
            onEditorFocus() {}, // 获得焦点事件
            onEditorChange() {}, // 内容改变事件
        }
    }
</script>

<style scoped>

</style>
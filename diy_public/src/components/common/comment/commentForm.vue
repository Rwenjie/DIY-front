<template>
  <!--评论表单-->
  <Form ref="commentForm" :model="commentForm" :rules="commentFormRule">
    <FormItem prop="content" style="margin-bottom: 10px!important;">
      <Input v-model="commentForm.content" type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。"></Input>
    </FormItem>
    <FormItem>
      <Button style="float: right" type="primary" @click="handleReviewer('commentForm')">发表评论</Button>
    </FormItem>
  </Form>
</template>

<script>
    import {insComment} from "../../../network/comment";

    export default {
      props: ["articleId"],
      data(){
          return{
            commentForm: {
              content: ''
            },
            commentFormRule:{
              content: [
                { required: true, message: '请输入评论内容!', trigger: 'blur' },
                { type: 'string', max: 200, message: '评论字数不超过200字!', trigger: 'change' }
              ]
            }
          }
      },
      methods:{
        // 发布评论
        handleReviewer (name) {
          let that = this;
          that.$refs[name].validate((valid) => {
            if (valid) {
            /*  if (!Cookies.get([USER_TOKEN])) {
                that.$Message.warning('您还未登录,暂时无法评论!');
                return
              }
              const cookies = Cookies.get([USER_TOKEN]);
              that.$axios.setHeader(USER_TOKEN, cookies);*/
              insComment({
                                  content:that.$refs[name].model.content,
                                  articleId:that.articleId
              }).then((res) => {
                  if (res.code === 200){
                    that.$Message.success("评论发表成功!");
                    that.handleReset(name);
                    that.$emit('fulshReviewer',1); // 页面刷新
                    return
                  }
                  that.$Message.error('评论发表失败!');
                })
            } else {
              that.$Message.error('请确认是否符合填写规则!');
            }
          })
        },
        handleReset (name) {
          this.$refs[name].resetFields();
        }
      }
    }
</script>

<style scoped>

</style>

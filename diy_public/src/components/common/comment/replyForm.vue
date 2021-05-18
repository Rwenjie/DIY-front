<template>
  <!--评论表单-->
  <Form ref="replyForm" :model="replyForm" :rules="replyFormRule">
    <Row :gutter="16" type="flex" justify="space-around">
      <Col :md="21">
        <FormItem prop="content" style="margin-bottom: 10px!important;">
          <Input v-model="replyForm.content" type="textarea" :autosize="{minRows: 3,maxRows: 3}" :placeholder="tips"></Input>
        </FormItem>
      </Col>
      <Col :md="3">
        <FormItem>
          <Button class="reply-btn" type="primary" @click="handleReply('replyForm')">发表评论</Button>
        </FormItem>
      </Col>
    </Row>
  </Form>
</template>

<script>
  import Cookies from 'js-cookie';
  import {USER_TOKEN} from '../../utils/constant';
  export default {
    props: ["articleId","parentId","tips"],
    data(){
      return{
        replyForm: {
          content: '',
        },
        replyFormRule:{
          content: [
            { required: true, message: '请输入评论内容!', trigger: 'blur' },
            { type: 'string', max: 200, message: '评论字数不超过200字!', trigger: 'change' }
          ]
        }
      }
    },
    methods:{
      // 发布评论
      handleReply (name) {
        let that = this;
        that.$refs[name].validate((valid) => {
          if (valid) {
            if (!Cookies.get([USER_TOKEN])) {
              that.$Message.warning('您还未登录,暂时无法评论!');
              return
            }
            const cookies = Cookies.get([USER_TOKEN]);
            that.$axios.setHeader(USER_TOKEN, cookies);
            that.$axios.post(`/comment/insComment`,{content:that.$refs[name].model.content,articleId:that.articleId,parentId:that.parentId})
              .then(({data: {code,msg,data}}) => {
                if (code === 200){
                  that.$Message.success("评论发表成功!");
                  that.handleReset(name);
                  //that.$emit('fulshReviewer',1); // 页面刷新
                  return
                }
                that.$Message.error('评论发表失败!');
              }).catch(()=>that.$Message.error('axios fail!'))
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

<style lang="scss" scoped>
  .reply-btn{
    width: 100%;
    height: 70px;
    padding: 4px 15px;
    font-size: 14px;
    color: #fff;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
    background-color: #2d8cf0;
    border: 1px solid #2d8cf0;
    transition: .1s;
    user-select: none;
    outline: none;
  }
</style>

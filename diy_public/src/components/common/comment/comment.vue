<template>
  <div class="comment"  style="text-align: left">
    <!--评论表单-->
    <!--传递id到下层，并传递页面刷新函数-->
    <b-comment-form :articleId="articleId" @fulshReviewer="getReviewer"/>
    <!--评论区-->
    <div>
      <!--父评论-->
      <div class="reviewer-box" v-for="item in reviewer.rows" :key="item.id">
        <Row :gutter="20" type="flex" justify="start">
          <Col :xs="4" :sm="3" :md="2" class="bl-text-center">
            <img class="user-image" width="48" height="48" v-if="item.reviewerUser.avatar"
                 :src="item.reviewerUser.avatar"/>
            <img class="user-image" width="48" height="48" v-else src="assets/images/avatar.jpg"/>
          </Col>
          <Col :xs="20" :sm="21" :md="22">
            <p>
              <span class="nickName" v-text="item.reviewerUser.username"></span>
              <small class="time">
                <Time :time="item.commentTime"/>
              </small>
            </p>
            <p class="comment-content" v-html="item.content"></p>
            <Row class="info" :gutter="20" type="flex" justify="start">
              <Col :md="3" class="bl-cursor">
                <span @click="replyClick(item.id,item.reviewerUser.nickName)"><Icon type="ios-chatboxes-outline"
                                                                                    size="14"/>&nbsp;&nbsp;回复</span>
              </Col>
              <!--<Col :md="3" class="bl-cursor">-->
                <!--<Icon type="ios-call-outline" size="14"/>&nbsp;&nbsp;举报-->
              <!--</Col>-->
            </Row>
            <!--加入元素-->
            <b-reply-form ref="replyForm" v-if="item.id  === activeId" :articleId="articleId" :parentId="item.id"
                          @fulshReviewer="getReviewer" :tips="tips"/>
          </Col>
        </Row>
        <!--子评论-->
        <div class="reply-box" v-if="replyItem.id" v-for="(replyItem,index) in reply.rows[item.id]" :key="replyItem.id">
          <!--默认显示5条子评论-->
          <Row v-if="index < reply.showCounts || item.id  === reply.activeReplyId" :gutter="20" type="flex"
               justify="start">
            <Col :xs="2" :sm="2" :md="1" offset="2">
              <img class="user-image" width="24" height="24" v-if="replyItem.reviewerUser.avatar"
                   :src="replyItem.reviewerUser.avatar"/>
              <img class="user-image" width="24" height="24" v-else src="assets/images/default_avatar.png"/>
            </Col>
            <Col :xs="20" :sm="20" :md="21">
              <span class="nickName" v-text="replyItem.reviewerUser.username"></span> &nbsp;&nbsp;回复 &nbsp;&nbsp;
              <span class="arguedName">@{{replyItem.replyUser.username}}</span> <strong>:</strong>
              <span v-html="replyItem.content"></span>
              <Row class="info" :gutter="20" type="flex" justify="start" style="background-color: white">
                <Col :md="3" class="bl-cursor">
                  <span @click="replyClick(replyItem.id,replyItem.reviewerUser.username)"><Icon
                    type="ios-chatboxes-outline" size="14"/>&nbsp;&nbsp;回复</span>
                </Col>
                <!--<Col :md="3" class="bl-cursor">-->
                  <!--<Icon type="ios-call-outline" size="14"/>&nbsp;&nbsp;举报-->
                <!--</Col>-->
                <Col :md="5" class="bl-cursor">
                  <Time :time="replyItem.commentTime"/>
                </Col>
              </Row>
              <!--加入元素-->
              <b-reply-form ref="replyForm" v-if="replyItem.id  === activeId" :articleId="articleId"
                            @fulshReviewer="getReviewer" :parentId="replyItem.id" :tips="tips"/>
            </Col>
          </Row>
        </div>
        <div class="showBtn bl-cursor bl-text-indent"
             v-if="reply.rows[item.id].length > reply.showCounts && item.id !== reply.activeReplyId">
          共{{reply.rows[item.id].length}}条回复, <span style="color: #2db7f5" @click="replyShowAll(item.id)">点击查看</span>
        </div>
        <Divider/>
      </div>
      <!--父评论分页组件-->
      <b-page class="bl-text-center" v-if="reviewerPageFlag" ref="reviewerPage" :page="reviewer.page"
              :pageSize="reviewer.pageSize" :total="reviewer.total" @getData="getReviewerPage"/>
    </div>
    <br/>
  </div>
</template>

<script>
  import bPage from './page';
  import bCommentForm from './commentForm';
  import bReplyForm from './replyForm';
  import {selCommentReviewer} from "../../../network/comment";
  export default {
    data() {
      return {
        articleId: this.$route.params.articleId,
        activeId: '', // 激活
        tips: '', // 子评论提示内容
        reviewer: {
          page: 1,
          pageSize: 8,
          total: 0,
          rows: ''
        },
        reply: {
          rows: '',// 子评论总的数据内容
          activeReplyId: '', // 显示当前id下所有子评论
          showCounts: 3 // 默认显示5条子评论
        },
        reviewerPageFlag: true, // 父评论分页是否显示
      }
    },
    components: {
      bPage,
      bCommentForm,
      bReplyForm
    },
    mounted() {
      this.articleId = this.$route.params.articleId;
      this.getReviewer(this.page);
    },
    methods: {
      // 获取首条评论
      async getReviewer(page) {
        let that = this;
        // 设置当前页面分页不会触发滑动
        if (that.articleId !== undefined) {
          console.log(that.activeId);
          selCommentReviewer(
                  {articleId: this.articleId,
                    page: page,
                    pageSize: this.pageSize
                  }
          ).then( res => {
            console.log(res);
            if (res.code == 200 ) {
              const reply = res.data.data.reply;
              const reviewer = res.data.data.reviewer;
              that.reviewer.page = reviewer.page;
              that.reviewer.pageSize = reviewer.pageSize;
              that.reviewer.total = reviewer.total;
              that.reviewerPageFlag = reviewer.rows.length > 0; // 若无评论则隐藏评论分页按钮
              that.reviewer.rows = reviewer.rows;
              that.reply.rows = reply; // 子评论
            }

          });
        }
        this.activeId = '';
      },
      // 父评论分页获取下页内容
      getReviewerPage(page) {
        this.$refs.reviewerPage.scrollFlag = false
        this.getReviewer(page)
      },
      // 回复聊天框显示
      replyClick(id, replyName) {
        this.activeId = id; // 激活当前评论的id
        this.tips = `@  ${replyName} :`; //绑定当前评论提示信息
      },
      // 子评论全部显示
      replyShowAll(id) { // 获取当前点击父评论id
        this.reply.activeReplyId = id; // 显示全部子评论信息
      },
    },
  }
</script>

<style lang="scss" scoped>
  .bl-text-area {
    border-radius: 5px;
    border: 1px solid #00b5e5;
  }

  .user-image {
    border-radius: 50%;
  }

  .reviewer-box {
    padding-bottom: 10px;
    .nickName, .arguedName {
      font-size: 14px;
      font-weight: 700;
      line-height: 18px;
      &:hover {
        color: #2db7f5;
        cursor: pointer;
      }
    }
    .arguedName {
      color: #2db7f5;
    }
    .time {
      color: #BDBDBD;
      margin-left: 8px;
      font-weight: normal;
    }
    .comment-content {
      line-height: 20px;
      padding: 6px 0;
      font-size: 14px;
      text-shadow: none;
      overflow: hidden;
      word-wrap: break-word;
      word-break: break-word;
    }
    .info {
      color: #99a2aa;
      line-height: 26px;
      font-size: 12px;
      background-color: white;
      a {
        color: #99a2aa;
      }
    }
    .ivu-divider-horizontal {
      margin: 12px 0;
    }
    .reply-box {
      margin-top: 10px;
      .info {
        padding: 5px;
      }
    }
  }

  /*加载更多*/
  .showBtn {
    font-size: 10px;
  }
</style>

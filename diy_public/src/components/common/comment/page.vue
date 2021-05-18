<template>
  <div class="bl-page">
    <Page :current="page" :total="total" :page-size="pageSize" size="small" @on-change="getPageData" show-elevator/>
  </div>
</template>

<script>
  export default {
    props: ["page", "total", "pageSize"],
    data() {
      return {
        scrollFlag: true, // 分页结束后是否滑动回到顶部 默认开启
      }
    },
    methods: {
      getPageData(page) {
        // 获取点击的页面
        let that = this
        that.$emit('getData', page)
        if (that.scrollFlag) {
          // 定时器 （处理页面滚动）
          let currentPosition = document.documentElement.scrollTop || document.body.scrollTop
          that.timeid = setInterval(() => {
            if (currentPosition > 0) {
              // 定时器
              window.scrollTo(0, currentPosition -= 70)
            } else {
              window.scrollTo(0, 0)
              clearInterval(that.timeid)
            }
          }, 20)
        }
      }
    }
  }
</script>

<style lang="scss">
  .bl-page {
    width: inherit;
    padding: 20px 0;
  }

  .ivu-page.mini {
    font-size: 14px;
    .ivu-page-next, .ivu-page-prev {
      background-color: transparent;
    }
    .ivu-page-item {
      background-color: transparent;
    }
    .ivu-page-options-elevator input {
      background: transparent;
    }
  }
</style>

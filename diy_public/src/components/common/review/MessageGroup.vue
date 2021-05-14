<template>
  <div class="message-group">
    <ul>
      <li v-for="(item,index) in dataList" :key="index">
        <message-item :data="item"></message-item>
      </li>
    </ul>
  </div>
</template>
<script>
  import MessageItem from "./MessageItem";
export default {
  name: "MessageGroup",
  components: {
    MessageItem
  },
  props: {
    dataList: {
      type: Array,
      default: []
    }
  }
};
</script>

<style>
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>

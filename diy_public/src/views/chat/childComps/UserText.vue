<template>
  <div id="uesrtext">
    <textarea placeholder="按 Ctrl + Enter 发送" v-model="content" v-on:keyup="addMessage"></textarea>
  </div>
</template>

<script>
  import {mapGetters, mapState} from 'vuex'

export default {
  name: 'UserText',
  data () {
    return {
      content:''
    }
  },
  computed: {
    ...mapGetters({
      currentSession: "currentSession"
    })
  },
  methods: {
  	  addMessage (e) {
  		  if (e.ctrlKey && e.keyCode ===13 && this.content.length) {

              let msgObj = new Object();
              msgObj.to = this.currentSession.username;
              msgObj.content = this.content;
              console.log(msgObj);
              this.$store.state.chat.stomp.send('/ws/chat', {}, JSON.stringify(msgObj));
              this.$store.commit('addMessage', msgObj);
              this.content='';
  		}
  	}
  }
}
</script>

<style lang="scss" scoped>
#uesrtext {
	position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 30%;
  border-top: solid 1px #DDD;
  > textarea {
  	padding: 10px;
  	width: 100%;
  	height: 100%;
  	border: none;
  	outline: none;
  }
}
</style>

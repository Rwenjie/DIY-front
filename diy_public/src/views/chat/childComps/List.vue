<template>
  <div id="list" style="text-align: left">
  	<ul style="padding-left: 0">
  		<li v-for="item in chatFriends"
					:class="{ active: currentSession ? item.username === currentSession.username : false}"
					v-on:click="changeCurrentSession(item)"><!--   :class="[item.id === currentSessionId ? 'active':'']" -->
  			<img class="avatar" :src="item.avatar" :alt="item.username">
		<!--	{{isDot.isDot.keys(user.username + '#' + item.username)}}
  			<el-badge :is-dot="true" class="item">

			</el-badge>-->
			<p class="name">{{item.username}}</p>
  		</li>
  	</ul>
  </div>
</template>

<script>
	import {mapState, mapGetters} from 'vuex'

	export default {
		name: 'List',
		data () {
			return {

			}
		},
		computed: {
			...mapState([
					'isDot'
			]),
			...mapGetters({
				sessions: "sessions",
				chatFriends: "chatFriends",
				currentSession: "currentSession",
				user: "currentUser"
			})
		},
		methods:{
				changeCurrentSession:function (currentSession) {
					this.$store.commit('changeCurrentSession', currentSession)
			}
		}
}
</script>

<style lang="scss" scoped>
#list {
	li {
		padding: 15px 15px 5px 15px;
		border-bottom: 1px solid #292C33;
		cursor: pointer;
		&:hover {
			background-color: rgba(255, 255, 255, 0.03);
		}
	}
  li.active {/*注意这个是.不是冒号:*/
			background-color: rgba(255, 255, 255, 0.1);
	}
	.avatar {
		border-radius: 2px;
		width: 30px;
		height: 30px;
		vertical-align: middle;
	}
	.name {
		display: inline-block;
		margin-left: 15px;
		margin-right: 5px;
		margin-top: 0;
		margin-bottom: 0;
		padding-top: 2px;

	}
}
</style>

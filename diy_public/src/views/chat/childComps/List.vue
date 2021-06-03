<template>
  <div id="list" style="text-align: left">
  	<ul style="padding-left: 0">
  		<li v-for="item in sessions"
					:class="{ active: currentSession ? item.username === currentSession.username : false}"
					v-on:click="changeCurrentSession(item)"><!--   :class="[item.id === currentSessionId ? 'active':'']" -->
  			<img class="avatar" :src="item.user.img" :alt="item.user.name">
  			<p class="name">{{item.user.name}}</p>
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
			...mapGetters({
				sessions: "sessions",
				currentSession: "currentSession"
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
		padding: 0px 15px;
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
	}
}
</style>

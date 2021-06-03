<template>
  <div class="main-tab-bar">
    <el-row :gutter="40">
      <el-col :span="4">
        <div class="logo" @click="clickToPage('/home')">
          <img src="https://rwenjie-blog.oss-cn-hangzhou.aliyuncs.com/diy-shop/diy_logo.jpg">
        </div>
      </el-col>
      <el-col :span="20">
        <div class="nav-right">
          <el-row :gutter="20">
            <!--搜索框-->
            <el-col :span="12">
              <el-input v-model="input" placeholder="请输入内容" class="search-input sec-tex">
                <template #append>
                  <el-button class="search-btn">
                    <i class="el-icon-search"></i>
                  </el-button>
                </template>
              </el-input>
            </el-col>
            <el-col :span="4"></el-col>
            <el-col :span="8">
              <!--登录后的导航-->
              <div class="login-navigate navigate" v-show="loginState">
                <el-tooltip class="item" effect="dark" placement="bottom">
                  <template #content>
                    <span class="tooltip-text">收藏</span>
                  </template>
                  <el-button>
                    <i class="el-icon-star-off"></i>
                  </el-button>
                </el-tooltip>
                <el-tooltip class="item sec-tex" effect="dark" placement="bottom">
                  <template #content>
                    <span class="tooltip-text">通知</span>
                  </template>
                  <el-button icon="">
                    <i class="el-icon-bell" @click="friendChatVisible"></i>
                  </el-button>
                </el-tooltip>
                <el-tooltip class="item sec-tex" effect="dark" content="购物车" placement="bottom">
                  <template #content>
                    <span class="tooltip-text">购物车</span>
                  </template>
                  <el-button @click="clickToPage('/cart')">
                    <i class="el-icon-shopping-cart-1"></i>
                  </el-button>
                </el-tooltip>
                <el-popover
                        placement="top-start"
                        width="50"
                        trigger="hover">
                  <el-button class="sign-in-btn" @click="logout">
                    sign out <v-icon>mdi-logout-variant</v-icon>
                  </el-button>
                  <div class="block"
                       style="margin: 8px 15px"
                       slot="reference"
                       @click="clickToPage('/profile')">
                    <el-avatar :size="35" :src="userInfo.avatar"></el-avatar>
                  </div>
                <!--  <el-button  >

                  </el-button>-->
                </el-popover>
               <!-- <el-tooltip class="item sec-tex" effect="dark" content="个人中心" placement="bottom">
                  <template #content>
                    <span class="tooltip-text"></span>
                  </template>
                  <el-button @click="clickToPage('/profile')">
                    <div class="block">
                      <el-avatar :size="20" :src="profile.profileUrl"></el-avatar>
                    </div>
                  </el-button>
                </el-tooltip>-->

              </div>
              <!--未登录时的导航-->
              <div class="not-login-navigate navigate" v-show="!loginState">
                <el-button class="sign-in-btn" @click="logVisible">
                  登录
                </el-button>
                <el-button class="sign-in-btn" @click="registerVisible">
                  注册
                </el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>

    <friend-chat v-model="ChatVisible"> </friend-chat>
    <login v-on:ForgetPwd="forgetPwd" v-on:LoginSuccess="afterLogin" ref="login"/>
    <register ref="register"/>
    <forget ref="forget"/>
  </div>
</template>
<script>

  import Login from "components/common/account/Login";
  import Register from "components/common/account/Register";
  import Forget from "components/common/account/Forget";
  import FriendChat from "../../../views/chat/FriendChat";
  import {logout} from "../../../network/account";
  import {mapGetters, mapState} from 'vuex';

  let newVar = {
    name: "MainTabBar",
    components: {
      Login,
      Register,
      Forget,
      FriendChat
    },

    computed: {
      ...mapGetters([
          'userInfo'
      ]),
      loginState() {
        return this.$store.state.loginState;
      }
    },
    data(){
      return {
        input: '',
        lo:this.$store.state.loginState,
        profileBar: {
          img: '',
          describe: '跳转'
        },
        ChatVisible: false
      }
    },
    methods: {
      logVisible() {
        console.log(this.$refs.login.visible);
        this.$refs.login.visible = true;

      },
      registerVisible() {
        this.$refs.register.visible = true;
      },
      friendChatVisible() {
        this.ChatVisible = true;
      },
      forgetPwd() {
        this.$refs.login.visible = false;
        this.$refs.forget.visible = true;
      },
      afterLogin() {
        console.log("MainTabBar=>loginSuccess");
        this.loginSuccess = true;
      },
      handleEdit(index, row) {
        console.log(index, row);
      },

      clickToPage(path) {
        if (this.$route.path==path) {
          return;
        }
        this.$router.push(path);
      },
      logout() {
        logout().then( res => {
          console.log(res);
          if (res.code == 200) {
            window.sessionStorage.clear();
            this.clickToPage("/home");
            window.location.reload()
          }
        })
      }
    },
    created() {
      //category
      this.$store.dispatch("loadCategories");
      //
    },
    mounted() {
      //连接WebSocket
    }
  };
  export default newVar
</script>

<style scoped>
  .el-col {
    min-height: 1px
  }
  .logo img {
    height: 50px;
  }

  .nav-right {
    margin-top: 8px;
  }

  /deep/ .search-input input {
    height: 35px;
    border-radius: 33px 0 0 33px;
    font-size: 15px;
  }

  .search-btn {
    border-radius: 33px;
  }

  .navigate button {
    height: 35px;
    border-radius: 33px;
    font-weight: 700;
    border: #ffffff;
  }

  .not-login-navigate {
    display: flex;
    justify-content: center;

  }

  .login-navigate {
    display: flex;
    justify-content: flex-end;
  }

  [class*="el-icon-"], [class^=el-icon-] {
    font-weight: 600;
    font-size: large;
  }
  .tooltip-text {
    font-size: 15px;
  }

  .profile-btn {
    width: 100%;
    padding: 0;
    margin: 0;
  }
</style>

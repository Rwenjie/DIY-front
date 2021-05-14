<template>
  <div class="main-tab-bar">
    <el-row :gutter="40">
      <el-col :span="4">
        <div class="logo">
          <img src="https://rwenjie-blog.oss-cn-hangzhou.aliyuncs.com/div/logo/diylogo.png" alt="">
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
                    <i class="el-icon-bell"></i>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                </el-tooltip>
<!--                <el-popover
                        placement="bottom-end"
                        :width="200"
                        trigger="hover">
                  <template #reference>
                    <el-button @click="clickToPage('/profile')">
                      <div class="block">
                        <el-avatar :size="20" :src="profile.profileUrl"></el-avatar>
                      </div>
                    </el-button>
                  </template>
                  <div style="padding: 0;margin: 0">
                    <el-button class="profile-btn" @click="clickToProfile">个人中心</el-button>
                    <el-button class="profile-btn" style="margin-left:0">我的作品</el-button>
                    <el-button class="profile-btn"  style="margin-left:0"  @click="clickToStore">我的商品</el-button>
                  </div>
                </el-popover>-->
                <el-tooltip class="item sec-tex" effect="dark" content="个人中心" placement="bottom">
                  <template #content>
                    <span class="tooltip-text">个人中心</span>
                  </template>
                  <el-button @click="clickToPage('/profile')">
                    <div class="block">
                      <el-avatar :size="20" :src="profile.profileUrl"></el-avatar>
                    </div>
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
              </div>

              <!--未登录时的导航-->
              <div class="not-login-navigate navigate" v-show="!loginState">
                <el-button class="sign-in-btn" @click="logVisible">
                  Sign in
                </el-button>
                <el-button class="sign-in-btn" @click="registerVisible">
                  Register
                </el-button>

                <el-tooltip class="item" effect="dark" content="购物车" placement="bottom">
                  <el-button>
                    <i class="el-icon-shopping-cart-1"></i>
                  </el-button>
                </el-tooltip>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <login v-on:ForgetPwd="forgetPwd" v-on:LoginSuccess="afterLogin" ref="login"/>
    <register ref="register"/>
    <forget ref="forget"/>
  </div>
</template>
<script>

  import Login from "components/common/account/Login";
  import Register from "components/common/account/Register";
  import Forget from "components/common/account/Forget";

  let newVar = {
    name: "MainTabBar",
    components: {
      Login,
      Register,
      Forget
    },
    computed: {
      profile() {
        return this.$store.state.profile;
      },
      loginState() {
        return this.$store.state.loginState;
      }
    },
    data(){
      return {
        input: '',
        profileBar: {
          img: '',
          describe: '跳转'
        },
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
    },
/*    beforeMount() {
      console.log("MainTabBar被挂载");
    },
    beforeUpdate() {
      console.log("MainTabBar被挂载beforeUpdate");
    },
    updated() {
      console.log("MainTabBar被挂载Update");
    }*/
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

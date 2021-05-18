<template>
  <v-app>
    <el-row>
      <!--<el-col :span="1">
        <span>
          left
        </span>
      </el-col>-->
      <el-col :span="24" id="main">
        <el-container>
          <el-header style="height: 52px;">
            <main-tab-bar style=""/>
          </el-header>
          <el-main style="padding: 20px  0 0 0">
            <router-view/>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-col>
 <!--     <el-col :span="1" > </el-col>-->
    </el-row>

  </v-app>
</template>
<script>
  import MainTabBar from "components/content/mainTabBar/MainTabBar";
  import CategoryNav from "./components/content/categoryNav/CategoryNav";

  export default {
    name: 'App',
    components: {
      MainTabBar
    }
  }
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

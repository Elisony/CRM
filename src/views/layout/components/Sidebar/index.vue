<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <!-- 这里可以改变菜单栏的背景颜色 -->
    
    <el-menu
      mode="vertical"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#17273b"
      text-color="#D0860D"
      active-text-color="#fff"
      style="font-weight: bold;"
    >
    <img src="../../../../assets/404_images/logo000.png" style="width:100%;height:60px">
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  created(){
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
  }
  }
}
</script>

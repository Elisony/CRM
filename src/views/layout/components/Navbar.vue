<template>
  <!-- 头部！！！ -->

  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>

    <breadcrumb class="breadcrumb-container"></breadcrumb>

    <div class="right-menu">
      <!-- <img class="imgNz" src="../../../assets/404_images/alert.png" @click.stop="remind" /> -->

      <el-popover placement="bottom" width="400" trigger="hover" @show="showPoPo">
        <div
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          class="divBoxOne"
        >
          <div
            v-for="(item,index) in ppp"
            :key="index"
            v-show="ppp.length!=0"
            class="divBox"
            @click="ClickToRoute(item)"
            ref="divBox"
          >
            <h4 style="margin:0;padding:0; line-height:35px">{{index+1}}.</h4>
            <div style="width:40px;margin-left:8px">
              <img class="imgNz" src="../../../assets/404_images/alert.png" />
            </div>
            <div>
              <p>{{item.create_time}}</p>
              <p>{{item.message_content}}</p>
            </div>
          </div>

          <p v-show="ppp.length==0" style="text-align: center;color:red">暂无未读消息</p>
        </div>
        <el-button type="danger" round @click="ClickOnekey" v-show="ppp.length!=0">一键标记已读</el-button>
        <el-pagination
          :current-page="currentPage"
          :page-size="pagesize"
          :total="totalCount"
          layout="total"
          style="text-align: center"
        ></el-pagination>
        <el-button
          slot="reference"
          v-if="this.$store.state.storer.count==0"
          class="buttonwOne"
        >暂无未读消息</el-button>
        <el-button slot="reference" v-else class="buttonw">
          <i class="el-icon-s-comment imgWrap"></i>未读消息
        </el-button>
      </el-popover>

      <!--<error-log class="errLog-container right-menu-item"></error-log>-->

      <el-tooltip effect="dark" :content="$t('navbar.screenfull')" placement="bottom">
        <screenfull class="screenfull right-menu-item"></screenfull>
      </el-tooltip>

      <!-- <lang-select class="international right-menu-item"></lang-select> -->

      <el-tooltip effect="dark" :content="$t('navbar.theme')" placement="bottom">
        <!-- <theme-picker class="theme-switch right-menu-item"></theme-picker> -->
      </el-tooltip>

      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <img
            class="user-avatar"
            src="../../../assets/404_images/hrLogo.png"
            v-if="userType==2||userType==1||userType==9"
          />

          <img
            class="user-avatar"
            src="../../../assets/404_images/salesLogo.png"
            v-if="userType==3||userType==7"
          />

          <img
            class="user-avatar"
            src="../../../assets/404_images/glhrLogo.png"
            v-if="userType==4||userType==6"
          />

          <img class="user-avatar" src="../../../assets/404_images/glhrLogo.png" v-if="userType==5" />

          <i class="el-icon-caret-bottom"></i>

          <strong style="color:red;font-size:15px;margin-left:10px">{{hrName}}</strong>
        </div>

        <el-dropdown-menu slot="dropdown">
          <router-link to="/dashboard">
            <el-dropdown-item>{{$t('navbar.dashboard')}}</el-dropdown-item>
          </router-link>

          <el-dropdown-item divided>
            <span @click.stop="logout" style="display:block;">{{$t('navbar.logOut')}}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
//  import ErrorLog from '@/components/ErrorLog'
import Screenfull from "@/components/Screenfull";
// import LangSelect from '@/components/LangSelect'
// import ThemePicker from '@/components/ThemePicker'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    //      ErrorLog,
    Screenfull
    // LangSelect,
    // ThemePicker
  },
  computed: {
    ...mapGetters(["sidebar", "name", "avatar"])
  },
  data() {
    return {
      userInfo: {},
      userType: "",
      loading: false,
      hrName: "",
      session_key:"",
      currentPage: 1,
      pagesize: 5,
      totalCount: 0,

      
      arryId: [],
      count: 0,
      ppp: []
    };
  },
  created() {
    this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    this.hrName = this.userInfo.data.data.real_name;
    this.userType = this.userInfo.data.data.user_type;

    this.session_key=this.userInfo.data.data.session_key;
    if (!this.userInfo) {
      this.$router.push({ name: "Login" });
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("toggleSideBar");
    },
    // 移入未读消息
    showPoPo() {
      let option = new URLSearchParams();
      
      option.append("page", 0);
       option.append("session_key",this.session_key)
      this.$http({
        method: "post",
        url: "hr24/unread_message_list/",
        data: option
      }).then(res => {
        this.loading = false;
        this.ppp = res.data.data.message_list;
        this.totalCount = res.data.data.message_count;

        this.$store.commit("deleShow", this.totalCount);
        let arry = [];
        this.ppp.forEach(item => {
          arry.push(item.id);
        });
        this.arryId = arry;
      });
    },
    // 点击未读消息的某一条
    ClickToRoute(item) {
      
      if (item.message_type == 1) {
        let arr = [];
        arr.push(item.id);

        this.arryId = arr;
        this.Onekey(this.arryId);
        this.$router.push({ name: "contractImport" });
      } else if (item.message_type == 2) {
        let arr = [];
        arr.push(item.id);
        this.arryId = arr;
        this.Onekey(this.arryId);
        this.$router.push({ name: "myClient" });
      } else if (item.message_type == 3) {
        let arr = [];
        arr.push(item.id);
        this.arryId = arr;
        this.Onekey(this.arryId);
        this.$router.push({ name: "problem" });
      }
    },
    ClickOnekey() {
      
      this.Onekey(this.arryId);
      this.$store.commit("deleShow", 0);
    },
    // 点击一键清空
    Onekey(arryId) {
      let option = new URLSearchParams();
      
      option.append("message_id", JSON.stringify(arryId));
       option.append("session_key",this.session_key)
      this.$http({
        method: "post",
        url: "hr24/mark_unread_message/",
        data: option
      }).then(res => {
        if (res.data.status == 1) {
          this.$message({
            showClose: true,
            message: "成功清除未读消息",
            type: "success"
          });
          this.list();
        }
      });
    },
    // 未读消息列表
    list() {
      let option = new URLSearchParams();
      
      option.append("page", 0);
       option.append("session_key",this.session_key)
      this.$http({
        method: "post",
        url: "hr24/unread_message_list/",
        data: option
      }).then(res => {
        this.loading = false;
        this.ppp = res.data.data.message_list;
        this.totalCount = res.data.data.message_count;
        this.$store.commit("deleShow", res.data.data.message_count);
        let arry = [];
        this.ppp.forEach(item => {
          arry.push(item.id);
        });
       
      });
    },
    logout() {
      sessionStorage.removeItem("userInfo");
      sessionStorage.removeItem("messes");
      this.WebSocket.close();
      this.$router.push({ name: "Login" });
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size;
    },
    handleCurrentChange: function(currentPage) {},
    prevClick() {},
    nextClick() {}
  },
  mounted() {
    let option = new URLSearchParams();
  
    option.append("page", 0);
     option.append("session_key",this.session_key)
    this.$http({
      method: "post",
      url: "hr24/unread_message_list/",
      data: option
    }).then(res => {
      this.loading = false;
      this.ppp = res.data.data.message_list;
      this.totalCount = res.data.data.message_count;
      this.$store.commit("deleShow", res.data.data.message_count);

      let arry = [];
      this.ppp.forEach(item => {
        arry.push(item.id);
      });
    });
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container {
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    display: flex;
    align-items: center;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international {
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 3px;
        position: relative;
        display: flex;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}

.imgNz {
  cursor: pointer;
  overflow: hidden;
}
.divBox {
  display: flex;
  margin-bottom: 20px;
  cursor: pointer;
}
.divBoxOne {
  max-height: 280px;
  overflow: auto;
}
p {
  margin: 0;
}
.buttonw {
  position: relative;
  border: 0;
  color: red;
}
.buttonwOne {
  border: 0;
}
.buttonw /deep/ span {
  font-size: 17px;
}
.imgWrap {
  font-size: 16px;
  position: absolute;
  top: -1px;
  right: 10px;
}
</style>

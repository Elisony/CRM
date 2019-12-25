<template>
  <div>
    <div class="china" @keydown="touchstart">
      <img
        src="../../assets/404_images/logoImg.png"
        alt
        style="margin-left: 50px;
    margin-top: 50px;
    width: 184px;
    height: 90px;"
      />
    </div>
    <transition name="el-zoom-in-center">
      <div class="login-container" v-show="show0">
        <el-form
          class="login-form"
          autocomplete="on"
          :model="loginForm"
          :rules="loginRules"
          ref="loginForm"
          label-position="left"
        >
          <h3 class="title">24猎后台管理系统</h3>
          <el-form-item prop="username">
            <span class="svg-container svg-container_login">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              type="text"
              v-model="loginForm.username"
              auto-complete="off"
              placeholder="请输入帐号"
            ></el-input>
            <!--<el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="username" />-->
          </el-form-item>

          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password"></svg-icon>
            </span>
            <!--<el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"-->
            <!--placeholder="password"></el-input>-->
            <el-input
              :type="pwdType"
              v-model="loginForm.password"
              auto-complete="off"
              placeholder="请输入密码"
            ></el-input>
            <span class="show-pwd" @click.stop="showPwd">
              <svg-icon icon-class="eye" />
            </span>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              style="width:100%;"
              :loading="loading"
              @click.native.prevent="handleLogin"
            >登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </transition>
  </div>
</template>

<script>
import { isvalidUsername } from "@/utils/validate";
import { getToken, setToken, removeToken } from "@/utils/auth";
import Cookies from "js-cookie";
export default {
  name: "login",
  data() {
    return {
      code: "",
      show0: false,
      type: "password",
      loginForm: {
        username: "",
        password: "",
        checkcode: ""
      },
      loginRules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      loading: false,
      pwdType: "password"
    };
  },
  created() {
    this.getCode();
    if (sessionStorage.getItem("userInfo")) {
      sessionStorage.removeItem("userInfo");
    }
  },
  methods: {
    touchstart(e) {
      console.log(e.keyCode, e, "这是键盘");
    },
    getCode() {
      this.$store.dispatch("getCode", {}).then(v => {
        this.code =
          "data:image/png;base64," +
          btoa(
            new Uint8Array(v).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
      });
    },
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          let formData = new URLSearchParams();
          formData.append("username", this.loginForm.username);
          formData.append("password", this.loginForm.password);
          console.log(this.$http,"这是请求接口")
          this.$http({
            method: "post",
            xhrFields:{withCredentials:true},
            crossDomain: true,
            url: "hr24/hr_login/",
            data: formData
          })
            .then(
              data => {
                if (data.data.status == 1) {
                  sessionStorage.setItem("userInfo", JSON.stringify(data));
                  Cookies.set("session_key", data.data.data.session_key);
                  let hrName = data.data.data.real_name;
                  this.$router.push({ name: "dashboard" });
                  this.$message({
                    message: hrName + ",欢迎来到24猎",
                    type: "success"
                  });
                  this.loading = false;
                } else if (data.data.status == -2) {
                  this.$message({
                    message: data.data.data,
                    type: "error"
                  });
                  this.loading = false;
                } else if (data.data.status == -1) {
                  this.$message({
                    message: data.data.data,
                    type: "error"
                  });
                  this.loading = false;
                } else {
                  this.$message({
                    message: data.data.data,
                    type: "error"
                  });
                  this.loading = false;
                }
              },
            )
            .catch(err => {
              console.log(err, "失败了bbb");
              this.loading = false;
            });
        } else {
          this.loading = false;
          return false;
        }
      });
    }
  },
  mounted() {
    document.addEventListener("keydown", e => {
      if (e.keyCode == 13) {
        this.handleLogin();
      }
      if (e.keyCode == 187) {
        this.show0 = true;
      }
    });
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss">
$bg: #2d3a4b;
$light_gray: #eee;
.code {
  height: 55px;
}
.code input {
  outline: none;
  border: 1px solid #454545;
  width: 50%;
  height: 52px;
  font: 14px/52px "微软雅黑";
  padding: 0 12px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.1);
  float: left;
}
.code img {
  cursor: pointer;
  float: right;
  width: 43%;
  height: 50px;
}
::-webkit-input-placeholder {
  /* WebKit browsers */
  color: rgb(192, 196, 204);
  font-size: 14px;
}
::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: rgb(192, 196, 204);
  font-size: 14px;
}
:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: rgb(192, 196, 204);
  font-size: 14px;
}
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped type="text/scss">
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.china {
  width: 100%;
  position: fixed;
  height: 100%;
  background-image: url("../../assets/404_images/70LOGO.png");
  background-size: 100% 100%;
}
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  background-image: url("../../assets/404_images/logding.jpg");
  background-size: 100% 100%;
  .login-form {
    position: absolute;
    right: 0;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>

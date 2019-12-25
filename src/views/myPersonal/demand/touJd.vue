<template>
  <div>
    <div v-if="show1" class="show1">
      <div class="transition-box tranBox">
        <h3 style="text-align: center">请选择需要查看的投递渠道</h3>
        <transition name="el-zoom-in-bottom" v-if="show2">
          <div class="but">
            <el-button
              type="primary"
              ref="jdBth"
              size="medium"
              v-for="(item,index) in jdNum"
              @click="bthJd(index,$event)"
              :key="index"
              :loading="ciyLoad"
            >{{item}}</el-button>
          </div>
        </transition>
        <transition name="el-zoom-in-bottom" v-else>
          <div class="bixx">
            <div class="title">
              <h5>
                当前简历来源:
                <span class="citySpan" @click="clickCity">{{cityOne}}</span>
                <span style="color:#97a8be;">&nbsp;(点击可切换招聘渠道)</span>
              </h5>
            </div>
            <el-button
              type="primary"
              ref="cityBth"
              size="medium"
              v-for="(item,index) in cityNum"
              @click="bthCity(index,$event)"
              :key="index"
            >{{item.city}}</el-button>
          </div>
        </transition>
      </div>
    </div>
    <div class="show0" v-else>
      <el-button class="reset" @click="back">重置筛选条件</el-button>
      <el-table :data="jdData" style="width:100%; cursor: pointer;" ref="table">
        <el-table-column prop="source_update" label="简历更新时间" align="center"></el-table-column>
        <el-table-column label="简历链接" align="center">
          <template slot-scope="scope">
            <button
              style="background:#ff871c;outline:none;border: 1px solid #DCDFE6;height: 26px;border-radius: 4px;color:#fff;padding:0;width: 60px;"
            >
              <a :href="scope.row.resume_url" target="_Blank">查看简历</a>
            </button>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <select @change="changeProduct(scope,scope.$index)" class="seleAll">
              <option value="0">审核中</option>
              <option value="2">审核成功</option>
              <option value="1">审核失败</option>
              <option value="3">暂未接通</option>
            </select>
          </template>
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template slot-scope="scope">
            <div class="nameClick" @click="name(scope.$index,scope,$event)">
              <div id="div2">{{scope.row.user_name}}</div>
              <i class="el-icon-edit el-input__icon" style="line-height: 24px;"></i>
            </div>
            <input
              class="nameIpnut"
              type="text"
              @blur="inputName(scope,scope.$index)"
              @keyup.enter="inputName(scope,scope.$index)"
              v-model="nameVuaul"
              autofocus="autofocus"
            />
          </template>
        </el-table-column>
        <el-table-column label="联系方式" align="center">
          <template slot-scope="scope">
            <input
              class="phone1"
              type="text"
              maxlength="11"
              :value="scope.row.user_phone==0?``:scope.row.user_phone"
              style="border: 1px solid grey;outline:none;height:20px;font-size:12px;border-radius:5px;width:100%"
              @blur="iphon($event,scope,scope.$index)"
            />
          </template>
        </el-table-column>
        <el-table-column label="期望区域" align="center">
          <template slot-scope="scope">
            <div class="qiwang" @click="qiwang(scope,scope.$index)">
              <div id="div1">{{scope.row.place_content}}</div>
              <i class="el-icon-edit el-input__icon" style="line-height: 24px;"></i>
            </div>
            <div class="qiwang1">
              <input type="text" v-model="placeVaule" maxlength="2" /> 市
              <input type="text" v-model="placeVaule2" @blur="qiwang1(scope,scope.$index)" />区
            </div>
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center">
          <template slot-scope="scope">
            <div
              class="test_box"
              contenteditable="true"
              @focus="qingkong(scope.$index,$event)"
              @blur="qingkong1(scope,scope.$index,$event)"
            ></div>
          </template>
        </el-table-column>
        <el-table-column label="简历来源" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.source_net}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              :plain="true"
              @click="open3(scope,scope.$index)"
              style="font-size:10px;padding:10px"
              :disabled="isDisable"
            >保存</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        layout="total, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { open } from "fs";

export default {
  data() {
    return {
      currentPage: 1, //初始页
      pagesize: 50, //    每页的数据
      totalCount: 0,
      show1: true,
      show2: true,
      cityOne: "",
      cityTow: "",
      nameCl: true,
      jdData: "",
      ciyLoad:false,
      iphona: "",
      qiwangOpen: true,
      testText: "",
      nameVuaul: "",
    
      placeVaule: "",
      placeVaule2: "",
      seleNume: "3",
      seleText: "该求职者暂未接通",
      jdNum: [],
      resume_status: "",
      cityNum: [],
      isDisable: false,
      remarks: "",
      userInfo:"",
      session_key:""
    };
  },
  methods: {
    //   选择招聘来源
    bthJd(index, el) {
      this.show2 = false;
      this.ciyLoad=true;
      this.cityOne = this.$refs.jdBth[index].$el.innerText;
      this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      this.areaId = this.userInfo.data.data.area_id;
      let option = new URLSearchParams();
      option.append("area_id", this.areaId);
      option.append("session_key",this.session_key)
      //   获取所有城市数据
      this.$http({
        method: "post",
        url: "hr24/show_all_cities/",
        data: option
      })
        .then(res => {
          let dataJd = JSON.parse(res.data.data);
          this.cityNum = dataJd;
          this.ciyLoad=false;
        })
        .catch(err => {
          console.log(err, "城市数据报错");
        });
    },
    // 返回招聘来源
    clickCity() {
      this.show2 = true;
    },
    // 选择城市
    bthCity(index) {
      this.cityTow = this.$refs.cityBth[index].$el.innerText;
      let option = new URLSearchParams();
      option.append("source_net", this.cityOne);
      option.append("city", this.cityTow);
      option.append("session_key",this.session_key)
      option.append("page", 0);
      option.append("session_key",this.session_key)
      this.$http({
        method: "post",
        url: "hr24/show_received_resume/",
        data: option
      })
        .then(res => {
          this.show1 = false;
          if (res.data.data != "[]") {
            let dataJd = JSON.parse(res.data.data);
            this.jdData = dataJd;
            this.totalCount = dataJd[0].count;
           
          } else {
            this.jdData = [];
          }
        })
        .catch(err => {
          console.log(err, "渠道数据报错");
        });
    },
    // 返回重新筛选
    back() {
      this.show1 = true;
    },
    // 选择状态
    changeProduct(scope, index) {
      let sele = document.querySelectorAll(".seleAll");
      let seleOption = sele[index].querySelectorAll("option");
      let testBox = document.querySelectorAll(".test_box");
      scope.row.resume_status = sele[index].value;
      
      for (let i = 0; i < testBox.length; i++) {
        if (event.target.value == this.seleNume && index == i) {
          testBox[i].innerHTML = this.seleText;
        }
      }
    },
    // 修改姓名
    name(index, scope, e) {
      let nameClick = document.querySelectorAll(".nameClick");
      let nameIpnut = document.querySelectorAll(".nameIpnut");
      this.nameVuaul = scope.row.user_name;
      nameIpnut.forEach((item, i) => {
        if (i == index) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
          nameClick[i].style.display = "block";
        }
      });
      nameClick[index].style.display = "none";
    },
    inputName(scope, index) {
      let nameClick = document.querySelectorAll(".nameClick");
      let nameIpnut = document.querySelectorAll(".nameIpnut");
      scope.row.user_name = this.nameVuaul;
      nameClick[index].style.display = "block";
      nameIpnut[index].style.display = "none";
    },
    // 修改期望区域
    qiwang(scope, index) {
      let qiwang = document.querySelectorAll(".qiwang");
      let qiwang1 = document.querySelectorAll(".qiwang1");
      qiwang1.forEach((item, i) => {
        if (i == index) {
          item.style.display = "block";
          this.placeVaule = "";
          this.placeVaule2 = "";
          qiwang[index].style.display = "none";
        } else {
          item.style.display = "none";
          qiwang[i].style.display = "block";
        }
      });
    },
    qiwang1(scope, index) {
      let qiwang = document.querySelectorAll(".qiwang");

      let qiwang1 = document.querySelectorAll(".qiwang1");
      if (this.placeVaule == "" && this.placeVaule2 == "") {
        qiwang1[index].style.display = "none";
        qiwang[index].style.display = "block";
      } else {
        scope.row.place_content =
          this.placeVaule + "市" + this.placeVaule2 + "区";
        qiwang1[index].style.display = "none";
        qiwang[index].style.display = "block";
      }
    },
    // 修改备注
    qingkong(index, e) {
      if (e.target.innerText == "该求职者暂未接通") {
        e.target.innerText == "";
      }
    },
    qingkong1(scope, index, e) {
      let num = e.target.innerText.length - 30;
      this.remarks = e.target.innerText;
      if (e.target.innerText.length > 30) {
        this.$message({
          showClose: true,
          message: "字数请少于40字，目前已超出" + num + "字",
          type: "warning"
        });
      }
      
    },
    // 修改电话
    iphon(e, scope, index) {
      //手机号码正则
      let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      if (myreg.test(e.target.value)) {
        scope.row.user_phone = e.target.value;
      } else {
        scope.row.user_phone = "";
        this.$message({
          showClose: true,
          message: "联系方式格式错误",
          type: "warning"
        });
      }
    },
    // 点击保存
    open3(scope, index) {
      let test_box = document.querySelectorAll(".test_box");
      scope.row.remarks = test_box[index].innerHTML;
      let option = new URLSearchParams();
      option.append("user_name", scope.row.user_name);
      option.append("user_phone", scope.row.user_phone);
      option.append("resume_status", scope.row.resume_status);
      option.append("remarks", scope.row.remarks);
      option.append("place_content", scope.row.place_content);
      option.append("source_resume_id", scope.row.source_resume_id);

      option.append("city", this.cityTow);
      option.append("session_key",this.session_key)

      if (
        scope.row.user_name != "" &&
        scope.row.user_phone != 0 &&
        scope.row.user_phone != "" &&
        scope.row.resume_status == 2 &&
        scope.row.remarks != "无" &&
        scope.row.remarks != ""
      ) {
        this.$http({
          method: "post",
          url: "hr24/update_received_resume/",
          data: option
        })
          .then(res => {
            
            let sele = document.querySelectorAll(".seleAll");
            let seleOption = sele[index].querySelectorAll("option");
            seleOption[0].selected = true;
            test_box[index].innerHTML = "";
            this.$message({
              showClose: true,
              message: "简历更新成功",
              type: "success"
            });
            let option = new URLSearchParams();
            option.append("source_net", this.cityOne);
            option.append("city", this.cityTow);
            option.append("session_key",this.session_key)
            option.append("page", 0);
            this.$http({
              method: "post",
              url: "hr24/show_received_resume/",
              data: option
            })
              .then(res => {
                let dataJd = JSON.parse(res.data.data);
                this.jdData = dataJd;
               
              })
              .catch(err => {
                console.log(err, "渠道数据报错");
              });
          })
          .catch(err => {
            
            this.$message({
              showClose: true,
              message: "最新需求更新失败",
              type: "warning"
            });
          });
      } else if (
        scope.row.remarks == "该求职者暂未接通" &&
        scope.row.resume_status == 3
      ) {
        this.$http({
          method: "post",
          url: "hr24/update_received_resume/",
          data: option
        })
          .then(res => {
            let sele = document.querySelectorAll(".seleAll");
            let seleOption = sele[index].querySelectorAll("option");
            seleOption[0].selected = true;
            test_box[index].innerHTML = "";
            this.$message({
              showClose: true,
              message: "简历更新成功",
              type: "success"
            });
            let option = new URLSearchParams();
            option.append("source_net", this.cityOne);
            option.append("session_key",this.session_key)
            option.append("city", this.cityTow);
            option.append("page", 0);
            this.$http({
              method: "post",
              url: "hr24/show_received_resume/",
              data: option
            })
              .then(res => {
                let dataJd = JSON.parse(res.data.data);
                this.jdData = dataJd;
                
              })
              .catch(err => {
                console.log(err, "暂未接通再次请求失败");
              });
          })
          .catch(err => {
            
            this.$message({
              showClose: true,
              message: "暂未接通更新失败",
              type: "warning"
            });
          });
      } else if (
        scope.row.resume_status == 1 &&
        scope.row.remarks != "该求职者暂未接通" &&
        scope.row.remarks != "" &&
        scope.row.remarks != "无"
      ) {
        this.$http({
          method: "post",
          url: "hr24/update_received_resume/",
          data: option
        })
          .then(res => {
            let sele = document.querySelectorAll(".seleAll");
            let seleOption = sele[index].querySelectorAll("option");
            seleOption[0].selected = true;
            test_box[index].innerHTML = "";
            this.$message({
              showClose: true,
              message: "简历更新成功",
              type: "success"
            });
            let option = new URLSearchParams();
            option.append("source_net", this.cityOne);
            option.append("city", this.cityTow);
            option.append("page", 0);
            option.append("session_key",this.session_key)
            this.$http({
              method: "post",
              url: "hr24/show_received_resume/",
              data: option
            })
              .then(res => {
                let dataJd = JSON.parse(res.data.data);
                this.jdData = dataJd;
               
              })
              .catch(err => {
                console.log(err, "审核失败再次请求失败");
              });
          })
          .catch(err => {
            
            this.$message({
              showClose: true,
              message: "审核失败更新失败",
              type: "warning"
            });
          });
      } else if (scope.row.resume_status == 0) {
        this.$message({
          showClose: true,
          message: "请修改审核状态",
          type: "warning"
        });
      } else {
        this.$message({
          showClose: true,
          message: "请检查填写完整",
          type: "warning"
        });
      }
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(val) {
      this.pagesize = val;

      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1;
    },

    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      let option = new URLSearchParams();
      option.append("source_net", this.cityOne);
      option.append("city", this.cityTow);
      option.append("page", currentPage - 1);
      option.append("session_key",this.session_key)
      this.$http({
        method: "post",
        url: "hr24/show_resume_list/",
        data: option
      }).then(res => {
        
        let dataJd = JSON.parse(res.data.data);
        this.jdData = dataJd;
        let num = Number(dataJd[0].count);
        this.totalCount = num;
      });
    }
  },
  mounted() {
    //   获取所有渠道数据
    this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    this.areaId = this.userInfo.data.data.area_id;

    let uerId = this.userInfo.data.data.user_type;
this.session_key=this.userInfo.data.data.session_key;
      this.$http({
        method: "post",
        url: "hr24/show_all_source_net/"
      })
        .then(res => {
          let dataJd = JSON.parse(res.data.data);
          this.jdNum = dataJd;
          // 获取账号ID
        })
        .catch(err => {
          console.log(err, "渠道数据报错");
        });
  }
};
</script>


<style scoped>
.is-scrolling-none .el-table__body {
  min-width: 100%;
}
show0 {
  cursor: pointer;
}
.tranBox {
  width: 800px;
  margin: 0 auto;
}
.show1 .el-button {
  margin: 20px 0 20px 45px;
  height: 35px;
  padding: 0;
  width: 100px;
}
.title {
  display: flex;
  justify-content: space-between;
}
.citySpan {
  cursor: pointer;
  font-style: italic;
  font-size: 15px;
  color: red;
}
.but {
  display: flex;
  justify-content: space-around;
}
#div2 {
  display: inline-block;
}
.nameIpnut {
  display: none;

  width: 100%;
  font-size: 10px;
}
.qiwang1 {
  display: none;
}
.qiwang1 input {
  width: 40px;
}
#div1 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 73px;
  height: 15px;
  line-height: 15px;
  display: inline-block;
}
.test_box {
  min-height: 20px;
  max-height: 50px;
  outline: 0;
  border: 1px solid gray;
  font-size: 10px;
  word-wrap: break-word;
  overflow-x: hidden;
  overflow-y: auto;
  _overflow-y: visible;
  line-height: 15px;
  border-radius: 5px;
  text-align: left;
}
</style>


<template>
  <!-- 这里是暂未接通页面 -->
  <div v-if="showHome">
    <el-collapse-transition style="transition: height 5s ease-out">
      <div class="dive" v-show="show">
        <div class="title">
          <h5 style="width:220px;cursor: pointer;" @click="clickCity">
            当前城市:
            <span class="citySpan">{{cityOne}}</span>
            <span style="color:red;">&nbsp;(点击可切换城市)</span>
          </h5>
          <h5 style="color:red">
            当日暂未接通量:
            <strong>{{totalCount}}</strong>
          </h5>
        </div>
        <div class="block" style="margin-top: 10px;">
          <span class="demonstration">筛选日期:</span>
          <el-date-picker
            v-model="value2"
            align="right"
            type="date"
            format="yyyy-MM-dd  "
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            :picker-options="pickerOptions"
            @change="timeOne"
          ></el-date-picker>
        </div>
        <el-table style="width: 100%" :data="jdData">
          <el-table-column label="需求时间" align="center" type="input">
            <template slot-scope="scope">
              <span>{{scope.row.post_time}}</span>
            </template>
          </el-table-column>
          <el-table-column label="简历链接" align="center" type="input">
            <template slot-scope="scope">
              <button
                style="background:#ff871c;outline:none;border: 1px solid #DCDFE6;height: 26px;border-radius: 4px;color:#fff;padding:0;width: 60px;"
              >
                <a :href="scope.row.resume_url" target="_Blank" @click="jdTitle(scope)">查看简历</a>
              </button>
            </template>
          </el-table-column>-->
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <select @change="changeProduct($event,scope.$index)" class="seleAll">
                <option value="3">暂未接通</option>
                <option value="2">审核成功</option>
                <option value="1">审核失败</option>
              </select>
            </template>
          </el-table-column>
          <el-table-column label="姓名" align="center" type="input">
            <template slot-scope="scope">
              <div class="nameClick" @click="name(scope.$index,scope,$event)">
                <div id="div2">{{scope.row.user_name}}</div>
                <i class="el-icon-edit el-input__icon" style="line-height: 24px;"></i>
              </div>
              <input
                class="nameIpnut"
                @blur="inputName(scope,scope.$index)"
                @keyup.enter="inputName(scope,scope.$index)"
                type="text"
                v-model="nameVuaul"
                autofocus="autofocus"
              />
            </template>
          </el-table-column>
          <el-table-column label="联系方式" align="center" type="input">
            <template slot-scope="scope">
              <input
                class="phone1"
                type="text"
                maxlength="11"
                :model="scope.row.user_phone==0?``:scope.row.user_phone"
                style="border: 1px solid gray;outline:none;height:20px;font-size:12px;border-radius:5px;width:100%"
              />
            </template>
          </el-table-column>
          <el-table-column label="期望区域" align="center" type="input">
            <template slot-scope="scope">
              <div class="qiwang" @click="qiwang(scope,scope.$index)">
                <div id="div1">{{scope.row.place_content}}</div>
                <i class="el-icon-edit el-input__icon" style="line-height: 24px;"></i>
              </div>
              <div class="qiwang1">
                <input type="text" maxlength="2" v-model="placeVaule" /> 市
                <input type="text" v-model="placeVaule2" @blur="qiwang1(scope,scope.$index)" />区
              </div>
            </template>
          </el-table-column>
          <el-table-column label="备注" align="center" type="input">
            <template slot-scope="scope">
              <div
                class="test_box"
                contenteditable="true"
                @focus="qingkong(scope.$index)"
                @blur="qingkong1(scope.$index)"
              >该求职者暂未接通</div>
            </template>
          </el-table-column>
          <el-table-column label="审核人员" align="center" type="input">
            <template slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content" v-for="(item,index) in jdHen" :key="index">
                  <span>审核时间：{{item.create_time}}</span>
                  <br />
                  <span>审核人员：{{item.hr_name}}</span>
                  <br />
                  <span>审核备注：{{item.remarks}}</span>
                </div>
                <span
                  @mousemove="jdHenji(scope,scope.$index)"
                >{{scope.row.username==null?"无":scope.row.username}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                :plain="true"
                @click="open3(scope,scope.$index)"
                style="font-size:10px;padding:10px"
                class="buttonIs"
              >保存</el-button>
              <!-- :disabled="scope.$index==0?!isDisable:isDisable" -->
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pagesize"
          @prev-click="prevClick"
          @next-click="nextClick"
          layout="total, prev, pager, next, jumper"
          :total="totalCount"
        ></el-pagination>
      </div>
    </el-collapse-transition>
    <el-collapse-transition>
      <div v-show="show1" class="show1">
        <div class="transition-box tranBox" v-loading="loadddd" element-loading-text="拼命加载中">
          <h3 style="text-align: center">请选择需要查看的城市</h3>
          <el-button
            type="primary"
            class="cityBth"
            @click="bthCity(index)"
            size="medium"
            v-for="(item,index) in cityNum"
            :loading="load"
            :key="index"
          >{{item.city}}</el-button>
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>
<script src="https://cdn.staticfile.org/axios/0.18.0/axios.min.js"></script>
<script>
export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      currentPage: 1, //初始页
      pagesize: 50, //    每页的数据
      totalCount: 1,
      value1: false,
      loadddd: false,
      show: false,
      showHome: true,
      show1: true,
      isDisable: true,
      load: false,
      jdHen: [],
      areaId: "",
      userInfo: "",
      jdData: [],
      cityOne: "",
      cityNum: [],
      jdData1: [],
      placeVaule: "",
      placeVaule2: "",
      resume_status: "3",
      inputVisible: false,
      inputValue: "",
      nameVuaul: "",
      value2: "",
      inputValue: "",
      number1: "",
      number2: "",
      session_key:""
    };
  },
  methods: {
    // 筛选城市显示数据
    bthCity(index) {
      let cityBth = document.querySelectorAll(".cityBth");
      this.cityOne = cityBth[index].innerText;
      this.load = true;
      let option = new URLSearchParams();
      option.append("user_city", cityBth[index].innerText);
      option.append("remarks", "该求职者暂未接通");
      option.append("page", 0);
      option.append("session_key",this.session_key)
      var that = this;
      
      that
        .$http({
          method: "post",
          url: "hr24/show_resume_list/",
          data: option
        })
        .then(res => {
          let dataJd = JSON.parse(res.data.data);
          
          that.show = true;
          that.show1 = false;
          that.jdData = dataJd;
         
          that.jdData2 = dataJd;
          if (dataJd.length > 0) {
            let num = Number(dataJd[0].total);
            that.totalCount = num;
          } else {
            that.totalCount = dataJd.length;
          }
        });
    },
    prevClick() {
      let option = new URLSearchParams();
      option.append("user_city", this.cityOne);
      option.append("remarks", "该求职者暂未接通");
      option.append("page", this.currentPage - 2);
       option.append("session_key",this.session_key)
      this.$http({
        method: "post",
        url: "hr24/show_resume_list/",
        data: option
      })
        .then(res => {
          let dataJd = JSON.parse(res.data.data);
          this.jdData = dataJd;
          this.$nextTick(() => {
            document.documentElement.scrollTop = 0;
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    nextClick() {
      let option = new URLSearchParams();
      option.append("user_city", this.cityOne);
      option.append("remarks", "该求职者暂未接通");
      option.append("page", this.currentPage);
       option.append("session_key",this.session_key)
      this.$http({
        method: "post",
        url: "hr24/show_resume_list/",
        data: option
      })
        .then(res => {
          let dataJd = JSON.parse(res.data.data);
          this.jdData = dataJd;
          this.$nextTick(() => {
            document.documentElement.scrollTop = 0;
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 点击简历链接
    jdTitle(scope) {
      let option = new URLSearchParams();
      option.append("source_resume_id", scope.row.source_resume_id);

      option.append("user_city", this.cityOne);
        option.append("session_key",this.session_key)
      this.$http({
        method: "post",
        url: "hr24/count_unanswered_resume/",
        data: option
      })
        .then(res => {
          console.log(res, "计算数量");
        })
        .catch(err => {
          console.log(err, "计数失败");
        });
    },
    // 返回重新筛选城市
    clickCity() {
      this.show = false;
      this.show1 = true;
      this.load = false;
      this.value2=""
    },
    // 每页显示的条数
    // handleSizeChange(val) {
    //   // 改变每页显示的条数
    //   this.pagesize = val;
    // },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val;
      let option = new URLSearchParams();
      option.append("user_city", this.cityOne);
      option.append("remarks", "该求职者暂未接通");
      option.append("page", val - 1);
        option.append("session_key",this.session_key)
      this.$http({
        method: "post",
        url: "hr24/show_resume_list/",
        data: option
      })
        .then(res => {
          let dataJd = JSON.parse(res.data.data);
          this.jdData = dataJd;
          this.$nextTick(() => {
            document.documentElement.scrollTop = 0;
          });
        })
        .catch(err => {
          console.log(err);
        });
      // this.jdData1 = this.jdData.slice(
      //   (this.currentPage - 1) * this.pagesize,
      //   this.currentPage * this.pagesize
      // );
    },
    timeOne() {
      if (this.value2 == null) {
        let option = new URLSearchParams();
        option.append("user_city", this.cityOne);
        option.append("remarks", "该求职者暂未接通");
        option.append("page", 0);
          option.append("session_key",this.session_key)
        this.$http({
          method: "post",
          url: "hr24/show_resume_list/",
          data: option
        })
          .then(res => {
            let dataJd = JSON.parse(res.data.data);
            this.jdData = dataJd;
            this.totalCount = this.jdData.length;
           
            this.$nextTick(() => {
              document.documentElement.scrollTop = 0;
            });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        let option = new URLSearchParams();
        option.append("user_city", this.cityOne);
        option.append("remarks", "该求职者暂未接通");
        option.append("page", 0);
        option.append("day", this.value2);
          option.append("session_key",this.session_key)
        this.$http({
          method: "post",
          url: "hr24/show_resume_list/",
          data: option
        })
          .then(res => {
            let dataJd = JSON.parse(res.data.data);
            this.jdData = dataJd;
             console.log(this.jdData )
            this.totalCount = this.jdData.length;
            this.$nextTick(() => {
              document.documentElement.scrollTop = 0;
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    },

    // 修改姓名
    name(index, scope, e) {
      let nameClick = document.querySelectorAll(".nameClick");
      let nameIpnut = document.querySelectorAll(".nameIpnut");
      let nu = this.pagesize * (this.currentPage - 1) + index;
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
    //获取下拉菜单选中状态
    changeProduct(event, index) {
      //显示该求职者暂未接通
      let sele = document.querySelectorAll(".seleAll");
      this.resume_status = sele[index].value;
    },
    // 获得焦点清空备注
    qingkong(index) {
      let testBox = document.querySelectorAll(".test_box");
      if (testBox[index].innerHTML == "该求职者暂未接通") {
        testBox[index].innerHTML = "";
      }
    },
    qingkong1(index) {
      let testBox = document.querySelectorAll(".test_box");
      let num = testBox[index].innerHTML.length - 30;
      if (testBox[index].innerHTML.length > 30) {
        this.$message({
          showClose: true,
          message: "字数请少于30字，目前已超出" + num + "字",
          type: "warning"
        });
      }
    },
    jdHenji(scope, index) {
      let option = new URLSearchParams();
      option.append("source_resume_id", scope.row.source_resume_id);
      option.append("remarks", "该求职者暂未接通");
        option.append("session_key",this.session_key)
      this.$http({
        method: "post",
        url: "hr24/show_unanswered_record/",
        data: option
      }).then(res => {
        let dataJd = JSON.parse(res.data.data);
        this.jdHen = dataJd;
      });
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
    // 点击保存
    open3(scope, index) {
      let table__row = document.querySelectorAll(".el-table__row");
      let table = table__row[index].querySelectorAll("input");
      let div1 = document.querySelectorAll("#div1");
      // //期望区域
      // let place_content = div1[index].innerHTML;
      //手机号码
      let phone1 = document.querySelectorAll(".phone1");
      let phone = phone1[index].value;

      // //姓名
      // let nameClick = document.querySelectorAll(".nameClick");
      // let qiDiv = nameClick[index].querySelector("#div2");
      // let user_name = qiDiv.innerHTML;
      //备注
      let test_box = document.querySelectorAll(".test_box");
      let remarks = test_box[index].innerHTML;

      //手机号码正则
      let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      let option = new URLSearchParams();
      option.append("place_content", scope.row.place_content);
      option.append("phone", phone);

      option.append("user_name", scope.row.user_name);
      option.append("resume_status", this.resume_status);
      option.append("remarks", remarks);
        option.append("session_key",this.session_key)
      //简历ID
      option.append("source_resume_id", this.jdData[index].source_resume_id);

      if (
        this.resume_status == "" ||
        scope.row.place_content == "" ||
        scope.row.user_name == "" ||
        remarks == ""
      ) {
        this.$message({
          showClose: true,
          message: "警告，请填写完整",
          type: "warning"
        });
      } else if (!/^[\u4e00-\u9fa5]+$/gi.test(scope.row.user_name)) {
        this.$message({
          showClose: true,
          message: "名字只能输入汉字",
          type: "warning"
        });
      } else if (myreg.test(phone) == false && this.resume_status == 2) {
        this.$message({
          showClose: true,
          message: "联系方式格式错误",
          type: "warning"
        });
      } else if (
        this.resume_status == 2 &&
        scope.row.place_content != "" &&
        phone != "" &&
        scope.row.user_name != "" &&
        remarks != ""
      ) {
        if (remarks == "该求职者暂未接通") {
          this.$message({
            showClose: true,
            message: "请修改备注",
            type: "warning"
          });
        } else if (remarks.length > 30) {
          this.$message({
            showClose: true,
            message: "备注长度超出30，请修改后保存",
            type: "warning"
          });
        } else {
          // 审核成功
          if (remarks == "该求职者暂未接通") {
            table__row[index].style.display = "none";
            this.isDisable = false;
            this.$message({
              showClose: true,
              message: "请修改备注",
              type: "warning"
            });
          }
          this.$http({
            method: "post",
            url: "hr24/update_unanswered_resume/",
            data: option
          }).then(res => {
            if (res.data.status == 1) {
              let sele = document.querySelectorAll(".seleAll");
              let seleOption = sele[index].querySelectorAll("option");
              seleOption[0].selected = true;
              phone1[index].value = "";
              test_box[index].innerHTML = "该求职者暂未接通";
              let option = new URLSearchParams();
              option.append("user_city", this.cityOne);
              option.append("remarks", "该求职者暂未接通");
              option.append("page", this.currentPage - 1);
                option.append("session_key",this.session_key)
              if (this.value2 != "") {
                option.append("day", this.value2);
              }
              var that = this;
              that
                .$http({
                  method: "post",
                  url: "hr24/show_resume_list/",
                  data: option
                })
                .then(res => {
                  let dataJd = JSON.parse(res.data.data);
                  that.jdData = dataJd;

                  that.totalCount = dataJd.length;
                });
              this.$message({
                showClose: true,
                message: "该简历更新成功",
                type: "success"
              });
              this.placeVaule = "";
              this.placeVaule2 = "";
            } else {
              this.$message({
                showClose: true,
                message: "保存失败",
                type: "warning"
              });
            }
          });
        }
      } else if (
        this.resume_status == 1 &&
        scope.row.place_content != "" &&
        scope.row.user_name != "" &&
        remarks != ""
      ) {
        // 审核失败
        if (remarks == "该求职者暂未接通") {
          // table__row[index].style.display = "none";
          this.isDisable = false;
          this.$message({
            showClose: true,
            message: "请修改备注",
            type: "warning"
          });
        } else {
          this.$http({
            method: "post",
            url: "hr24/update_unanswered_resume/",
            data: option
          }).then(res => {
            if (res.data.status == 1) {
              let sele = document.querySelectorAll(".seleAll");
              let seleOption = sele[index].querySelectorAll("option");
              seleOption[0].selected = true;
              phone1[index].value = "";
              test_box[index].innerHTML = "该求职者暂未接通";
              let option = new URLSearchParams();
              option.append("user_city", this.cityOne);
              option.append("remarks", "该求职者暂未接通");
              option.append("page", this.currentPage - 1);
                option.append("session_key",this.session_key)
              if (this.value2 != "") {
                option.append("day", this.value2);
              }
              var that = this;
              that
                .$http({
                  method: "post",
                  url: "hr24/show_resume_list/",
                  data: option
                })
                .then(res => {
                  let dataJd = JSON.parse(res.data.data);
                  that.jdData = dataJd;

                  that.totalCount = dataJd.length;
                });
              this.$message({
                showClose: true,
                message: "该简历更新成功",
                type: "success"
              });
              this.placeVaule = "";
              this.placeVaule2 = "";
            } else {
              this.$message({
                showClose: true,
                message: "出错了",
                type: "warning"
              });
            }
          });
        }
      } else if (
        this.resume_status == 3 &&
        scope.row.place_content != "" &&
        scope.row.user_name != "" &&
        remarks == "该求职者暂未接通"
      ) {
        // 暂未接通
        this.$http({
          method: "post",
          url: "hr24/update_unanswered_resume/",
          data: option
        }).then(res => {
          if (res.data.status == 1) {
            let sele = document.querySelectorAll(".seleAll");
            let seleOption = sele[index].querySelectorAll("option");
            seleOption[0].selected = true;
            phone1[index].value = "";
            // qiDiv.innerHTML = that.jdData[index].user_name;
            test_box[index].innerHTML = "该求职者暂未接通";
            let option = new URLSearchParams();
            option.append("user_city", this.cityOne);
            option.append("remarks", "该求职者暂未接通");
              option.append("session_key",this.session_key)
            if (this.value2 != "") {
              option.append("day", this.value2);
            }
            option.append("page", this.currentPage - 1);
            var that = this;
            that
              .$http({
                method: "post",
                url: "hr24/show_resume_list/",
                data: option
              })
              .then(res => {
                let dataJd = JSON.parse(res.data.data);
                that.jdData = dataJd;
                that.totalCount = dataJd.length;
              });
            this.$message({
              showClose: true,
              message: "该简历更新成功",
              type: "success"
            });
            this.placeVaule = "";
            this.placeVaule2 = "";
          } else {
            this.$message({
              showClose: true,
              message: "出错了",
              type: "warning"
            });
          }
        });
      } else {
        this.$message({
          showClose: true,
          message: "请修改简历状态",
          type: "warning"
        });
      }
    }
  },
  // 请求数据
  mounted: function() {
    // 获取所有城市列表
    this.loadddd = true;
    this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    this.areaId = this.userInfo.data.data.area_id;
    let uerId = this.userInfo.data.data.user_type;
    this.session_key=this.userInfo.data.data.session_key;
    this.showHome = true;
    let option = new URLSearchParams();
    option.append("area_id", this.areaId);
      option.append("session_key",this.session_key)
    this.$http({
      method: "post",
      url: "hr24/all_cities/",
      data: option
    }).then(res => {
      console.log(res)
      let dataJd = res.data.data;
      this.cityNum = dataJd;
      this.loadddd = false;
      // 获取账号ID
      if (this.userInfo == null) {
        this.$router.push({ name: "Login" });
      }
    });
  }
};
</script>
<style scoped>
.citySpan {
  font-style: italic;
  font-size: 15px;
}
input::-webkit-input-placeholder {
  /* placeholder颜色  */
  color: #aab2bd;
  /* placeholder字体大小  */
  font-size: 12px;
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
.el-input__suffix {
  right: 90px;
}
.el-date-editor {
  margin-left: 5px;
  height: 40px;
  width: 140px;
}
.el-date-editor input {
  font-size: 12px;
  height: 30px;
  width: 106px;
}
.el-input--suffix .el-input__inner {
  padding-right: 0;
}
.el-date-editor i {
  line-height: 30px;
}
.is-scrolling-none .el-table__body {
  min-width: 100%;
}
.el-table__header {
  min-width: 100%;
  table-layout: inherit;
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
  height: 18px;
  display: inline-block;
}
#div2 {
  display: inline-block;
}
.test_box {
  min-height: 20px;
  max-height: 150px;
  outline: 0;
  border: 1px solid gray;
  font-size: 10px;
  word-wrap: break-word;
  overflow-x: hidden;
  overflow-y: auto;
  _overflow-y: visible;
  line-height: 15px;
  border-radius: 5px;
}
.el-table__row {
  font-size: 10px;
}
.has-gutter {
  font-size: 10px;
}
.nameIpnut {
  display: none;
  width: 100%;
  font-size: 10px;
}
.el-textarea .el-textarea__inner {
  height: 30px;
  margin: 0;
}
.title {
  display: flex;
  justify-content: space-between;
}
h5 {
  margin: 0;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
  width: 100%;
  display: none;
}
.input-new-tag {
  width: 100%;
  /* vertical-align: bottom; */
}
.number input {
  width: 50px;
  height: 20px;
  margin: 10px;
}
</style>


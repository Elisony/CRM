<template>
  <!-- 这里是最新需求页面 -->
  <div>
    <el-collapse-transition style="transition: height 5s ease-out">
      <div class="dive" v-show="show">
        <div class="title">
          <h5 style="width:220px;cursor: pointer;" @click="clickCity">
            当前城市:
            <span class="citySpan">{{cityOne}}</span>
            <span style="color:red;">&nbsp;(点击可切换城市)</span>
          </h5>
          <h5 style="color:red">
            未审核最新需求量:
            <strong>{{totalCount}}</strong>
          </h5>
        </div>
        <div class="number" style="margin-top: 10px;">
          <span>序号:</span>
          <input
            style=" -moz-appearance: textfield;"
            type="text"
            min="1"
            v-model="number1"
            @change="inputchang"
          />
          <span>至</span>
          <input type="text" min="1" v-model="number2" @change="inputchang" />
          <button class="butth" @click="btn" style="padding: 0;
    font-size: 12px;">确定</button>
          <button
            class="butth"
            @click="bth11"
            style="padding: 0;margin-left:10px;
    font-size: 12px;"
          >刷新</button>
        </div>
        <el-table :data="jdData" fit>
          <el-table-column label="序号" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.count}}</span>
            </template>
          </el-table-column>
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
                <a :href="scope.row.resume_url" target="_Blank">查看简历</a>
              </button>
            </template>
          </el-table-column>
          <el-table-column label="简历详情" align="center" type="input">
            <template slot-scope="scope">
              <button
                style="background:#ff871c;outline:none;border: 1px solid #DCDFE6;height: 26px;border-radius: 4px;color:#fff;padding:0;width: 60px;cursor: pointer;"
                @click="seeJdd(scope.row)"
              >查看详情</button>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <select @change="changeProduct($event,scope.$index)" class="seleAll">
                <option value="0">审核中</option>
                <option value="2">审核成功</option>
                <option value="1">审核失败</option>
                <option value="3">暂未接通</option>
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
                ref="nameckl"
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
                style="border: 1px solid grey;outline:none;height:20px;font-size:12px;border-radius:5px;width:100%"
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
                <input type="text" v-model="placeVaule" maxlength="2" /> 市
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
              ></div>
            </template>
          </el-table-column>

          <el-table-column label="用户" align="center" type="input">
            <template slot-scope="scope">
              <span>{{scope.row.username}}</span>
            </template>
          </el-table-column>
          <el-table-column label="耗时" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.time}}分钟</span>
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
    </el-collapse-transition>
    <el-collapse-transition>
      <div v-show="show1" class="show1">
        <div class="transition-box tranBox" v-loading="loadddd" element-loading-text="拼命加载中">
          <h3 style="text-align: center">请选择需要查看的城市</h3>
          <div v-for="(item,index) in cityNum" :key="index" @click="bthCity(index)" class="cityBix">
            <el-badge :value="item.count" class="item" :max="99" v-if="item.count!=0">
              <el-button type="primary" class="cityBth" size="medium">{{item.city}}</el-button>
            </el-badge>
            <el-button v-else type="primary" class="cityBth" size="medium">{{item.city}}</el-button>
          </div>
        </div>
      </div>
    </el-collapse-transition>
    <el-dialog title="简历详情" :visible.sync="dialogTableVisible" top="1vh">
      <el-table :data="seeJd" style="width: 100%" :show-header="headTit">
        <el-table-column align="center">
          <template slot-scope="scope">
            <img
              class="imgJd"
              :src="scope.row.pic_url==``&&scope.row.sex==`男`?`http://pic.xiami.net/images/avatar_new/1931/56867b2830e86_96590874_1451653928.jpg@1e_1c_0i_1o_100Q_200w.jpg`:scope.row.pic_url==``&&scope.row.sex==`女`?`http://pic.xiami.net/images/avatar_new/1034/5c8e5317ce915_51741042_1552831255.jpg@1e_1c_0i_1o_100Q_200w.jpg`:scope.row.pic_url"
            />
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <h2>{{scope.row.user_name}}</h2>
            <p>
              <img
                src="//img07.51jobcdn.com/imehire/ehire2007/defaultnew/image/resumedetails/y1.png"
                style="vertical-align: middle;"
              />正在找工作
            </p>
            <p>
              <img
                src="//img07.51jobcdn.com/imehire/ehire2007/defaultnew/image/resumedetails/y2.png"
                style="vertical-align: middle;"
              />
              {{scope.row.user_phone=="0"?"**********":scope.row.user_phone}}
            </p>
            <p>
              <img
                src="//img07.51jobcdn.com/imehire/ehire2007/defaultnew/image/resumedetails/y4.png"
                style="vertical-align: middle;"
              />
              <span>&nbsp;{{scope.row.sex}}</span>&nbsp;|&nbsp;
              <span>{{scope.row.age}}岁</span>&nbsp;|&nbsp;
              <span class="spanTex">&nbsp;{{scope.row.edu_background}}</span>
              &nbsp;|&nbsp;
              <span>工作经验：&nbsp;{{scope.row.exp}}</span>
            </p>
          </template>
        </el-table-column>
      </el-table>
      <el-table :data="seeJd" style="width: 100%" :show-header="headTit">
        <el-table-column>
          <template slot-scope="scope">
            <h3>求职意向</h3>
            <ul class="qiuJd">
              <li>
                <span>期望薪资：{{scope.row.expected_salary=="0"?`保密`:scope.row.expected_salary}}</span>
              </li>
              <li>
                <span>期望地点：{{scope.row.place_content}}</span>
              </li>
              <li>
                <span>期望职位：{{scope.row.position_content}}</span>
              </li>
              <li>
                <span>自我评价：{{scope.row.self_evaluation==""?`无`:scope.row.self_evaluation}}</span>
              </li>
            </ul>
          </template>
        </el-table-column>
      </el-table>
      <el-table :data="seeJd" style="width: 100%" :show-header="headTit" v-if="expShow">
        <el-table-column>
          <template slot-scope="scope">
            <h3>工作经验</h3>
            <ul class="qiuJd" v-for="(item,index) in scope.row.work_exp" :key="index">
              <li>
                <h3 style="margin-bottom: 0;">{{item.company_name}}</h3>
              </li>
              <li>
                <span>工作时间：{{item.work_time}}</span>
              </li>
              <li>
                <span>薪资水平：{{item.work_salary}}</span>
              </li>
              <li>
                <span>在职职位：{{item.work_position}}</span>
              </li>
              <li>
                <span>工作内容：{{item.work_content==""?`保密`:item.work_content}}</span>
              </li>
            </ul>
          </template>
        </el-table-column>
      </el-table>
      <el-table :data="seeJd" style="width: 100%" :show-header="headTit" v-if="shcoolShow">
        <el-table-column>
          <template slot-scope="scope">
            <h3>教育经历</h3>
            <ul class="qiuJd">
              <li>
                <h3>{{scope.row.graduate_school}}</h3>
              </li>
              <li>
                <span>专业：{{scope.row.major==null?`保密`:scope.row.major}}</span>
              </li>
              <li>
                <span>学历：{{scope.row.edu_background}}</span>
              </li>
              <li>
                <span>毕业时间：{{scope.row.graduate_time=="None"?`保密`:scope.row.graduate_time}}</span>
              </li>
            </ul>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script src="https://cdn.staticfile.org/axios/0.18.0/axios.min.js"></script>
<script>
import { truncate } from "fs";
export default {
  data() {
    return {
      currentPage: 1, //初始页
      pagesize: 50, //    每页的数据
      totalCount: 0,
      value1: false,
      userInfo: [],
      show: false,
      show1: true,
      isDisable: false,
      dialogTableVisible: false,
      tiemNum: [],
      seeJd: [],
      headTit: true,
      expShow: false,
      shcoolShow: false,
      // 总数据
      jdData: [],
      jdData1: [],
      cityNum: [],
      cityOne: "",
  
      areaId: "",
      jdData2: [],
      placeVaule: "",
      placeVaule2: "",
      resume_status: "",
      inputVisible: false,
      inputValue: "",
      nameVuaul: "",
      inputValue: "",
      number1: "",
      number2: "",
      seleNume: "3",
      seleText: "该求职者暂未接通",
      setInt: "",
      loadddd: false,
      session_key:""
    };
  },
  methods: {
    // 筛选城市显示数据
    bthCity(index) {
      let cityBth = document.querySelectorAll(".cityBth");
      this.cityOne = cityBth[index].innerText;
      let option = new URLSearchParams();
      option.append("user_city", cityBth[index].innerText);
      option.append("remarks", "无");
      option.append("page", 0);
      option.append("session_key",this.session_key)
      
      this.$http({
        method: "post",
        url: "hr24/show_resume_list/",
        data: option
      }).then(res => {
        console.log(res)
        let dataJd = JSON.parse(res.data.data);
        this.show = true;
        this.show1 = false;
        this.jdData = dataJd;

        this.jdData2 = dataJd;
        if (dataJd.length > 0) {
          let num = Number(dataJd[0].total);
          this.totalCount = num;
        } else {
          this.totalCount = dataJd.length;
        }
        // 获取账号ID
        this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

      });
      // 操作用时
      this.setInt = setInterval(() => {
        this.jdData.forEach((item, index) => {
          var t1 = Date.parse(new Date());
          var t2 = Date.parse(new Date(item.post_time.replace(/-/g, "/")));
          let tiemn = parseInt((t1 - t2) / 1000 / 60);
          this.$set(this.jdData[index], "time", tiemn);
        });
      }, 1000);
    },
    // 返回重新筛选城市
    clickCity() {
      this.show = false;
      this.show1 = true;
      this.loadddd = true;
      let option = new URLSearchParams();
      option.append("area_id", this.areaId);
      option.append("session_key",this.session_key)
      this.$http({
        method: "post",
        url: "hr24/show_all_cities/",
        data: option
      }).then(res => {
        let dataJd = JSON.parse(res.data.data);
        this.cityNum = dataJd;
        this.loadddd = false;
        // 获取账号ID
        if (this.userInfo == null) {
          this.$router.push({ name: "Login" });
        }
      });
    },
    //获取下拉菜单选中状态
    changeProduct(event, index) {
      //显示该求职者暂未接通
      let sele = document.querySelectorAll(".seleAll");
      let seleOption = sele[index].querySelectorAll("option");
      let testBox = document.querySelectorAll(".test_box");
      this.resume_status = sele[index].value;

      for (let i = 0; i < testBox.length; i++) {
        if (event.target.value == this.seleNume && index == i) {
          testBox[i].innerHTML = this.seleText;
        }
      }
    },
    inputchang() {
      this.dataFormat;
    },
    // 获得焦点
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
          message: "字数请少于40字，目前已超出" + num + "字",
          type: "warning"
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
    // 点击保存至审核管理
    open3(scope, index) {
      this.isDisable = true;
      let table__row = document.querySelectorAll(".el-table__row");
      let table = table__row[index].querySelectorAll("input");
      let div1 = document.querySelectorAll("#div1");
      let seleAll = document.querySelectorAll(".seleAll");
      // //期望区域

      //手机号码
      let phone1 = document.querySelectorAll(".phone1");
      let phone = phone1[index].value;
      // //姓名

      //备注
      let test_box = document.querySelectorAll(".test_box");
      let remarks = test_box[index].innerHTML;
      let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      let option = new URLSearchParams();

      option.append("place_content", scope.row.place_content);
      option.append("phone", phone);

      option.append("user_name", scope.row.user_name);
      option.append("resume_status", this.resume_status);
      option.append("remarks", remarks);
option.append("session_key",this.session_key)
      option.append("operate_time", this.jdData[index].time);
      //简历ID
      option.append("source_resume_id", this.jdData[index].source_resume_id);
      //简历ID

      if (
        this.resume_status == "" ||
        scope.row.place_content == "" ||
        scope.row.user_name == "" ||
        remarks == ""
      ) {
        this.isDisable = false;
        this.$message({
          showClose: true,
          message: "警告，请填写完整",
          type: "warning"
        });
      } else if (!/^[\u4e00-\u9fa5]+$/gi.test(scope.row.user_name)) {
        this.isDisable = false;
        this.$message({
          showClose: true,
          message: "名字只能输入汉字",
          type: "warning"
        });
      } else if (
        myreg.test(phone) == false &&
        this.resume_status != 3 &&
        this.resume_status == 2
      ) {
        this.isDisable = false;

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
          this.isDisable = false;
          this.$message({
            showClose: true,
            message: "请修改备注",
            type: "warning"
          });
        } else if (remarks.length > 30) {
          this.isDisable = false;
          this.$message({
            showClose: true,
            message: "备注长度超出30，请修改后保存",
            type: "warning"
          });
        } else {

          // 审核成功
          this.$http({
            method: "post",
            url: "hr24/update_new_resume/ ",
            data: option
          }).then(res => {
            if (res.data.status == 1) {
              this.isDisable = false;
              let sele = document.querySelectorAll(".seleAll");
              let seleOption = sele[index].querySelectorAll("option");
              seleOption[0].selected = true;
              test_box[index].innerHTML = "";
              phone1[index].value = "";

              let option = new URLSearchParams();
              option.append("user_city", this.cityOne);
              option.append("remarks", "无");
              option.append("page", this.currentPage - 1);
              option.append("session_key",this.session_key)
              let that = this;
              that
                .$http({
                  method: "post",
                  url: "hr24/show_resume_list/",
                  data: option
                })
                .then(res => {
                  let dataJd = JSON.parse(res.data.data);
                  if (this.number1 == "" || this.number2 == "") {
                    this.jdData = dataJd;
                    this.totalCount = this.jdData.length;
                  } else {
                    this.jdData = dataJd.filter(
                      item =>
                        parseInt(item.count) >= this.number1 &&
                        parseInt(item.count) <= this.number2
                    );
                    this.totalCount = this.jdData.length;
                  }
                });
              this.$message({
                showClose: true,
                message:
                  "该简历更新成功,本条简历用时:" +
                  this.jdData[index].time +
                  "分钟",
                type: "success"
              });
            } else {
              this.isDisable = false;
              this.$message({
                showClose: true,
                message: "该简历更新失败",
                type: "success"
              });
              this.placeVaule = "";
              this.placeVaule2 = "";
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
          table__row[index].style.display = "none";
          this.isDisable = false;
          this.$message({
            showClose: true,
            message: "请修改备注",
            type: "warning"
          });
        } else {
          this.$http({
            method: "post",
            url: "hr24/update_new_resume/ ",
            data: option
          }).then(res => {
            if (res.data.status == 1) {
              this.isDisable = false;
              let sele = document.querySelectorAll(".seleAll");
              let seleOption = sele[index].querySelectorAll("option");
              seleOption[0].selected = true;
              phone1[index].value = "";
              test_box[index].innerHTML = "";
              let option = new URLSearchParams();
              option.append("user_city", this.cityOne);
              option.append("remarks", "无");
                option.append("session_key",this.session_key)
              option.append("page", this.currentPage - 1);
              let that = this;
              that
                .$http({
                  method: "post",
                  url: "hr24/show_resume_list/",
                  data: option
                })
                .then(res => {
                  let dataJd = JSON.parse(res.data.data);
                  if (this.number1 == "" || this.number2 == "") {
                    this.jdData = dataJd;
                    this.totalCount = this.jdData.length;
                  } else {
                    this.jdData = dataJd.filter(
                      item =>
                        parseInt(item.count) >= this.number1 &&
                        parseInt(item.count) <= this.number2
                    );
                    this.totalCount = this.jdData.length;
                  }
                });
              this.$message({
                showClose: true,
                message:
                  "该简历更新成功,本条简历用时:" +
                  this.jdData[index].time +
                  "分钟",
                type: "success"
              });
            } else {
              this.$message({
                showClose: true,
                message: "该简历更新失败",
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
          url: "hr24/update_new_resume/ ",
          data: option
        }).then(res => {
          if (res.data.status == 1) {
            let sele = document.querySelectorAll(".seleAll");
            let seleOption = sele[index].querySelectorAll("option");
            seleOption[0].selected = true;
            test_box[index].innerHTML = "";
            this.placeVaule = "";
            this.placeVaule2 = "";
            this.isDisable = false;
            let option = new URLSearchParams();
            option.append("user_city", this.cityOne);
            option.append("remarks", "无");
            option.append("page", this.currentPage - 1);
              option.append("session_key",this.session_key)
            var that = this;
            that
              .$http({
                method: "post",
                url: "hr24/show_resume_list/",
                data: option
              })
              .then(res => {
                let sele = document.querySelectorAll(".seleAll");
                let seleOption = sele[index].querySelectorAll("option");
                seleOption[0].selected = true;
                test_box[index].innerHTML = "";
                let dataJd = JSON.parse(res.data.data);
                if (this.number1 == "" || this.number2 == "") {
                  this.jdData = dataJd;
                  this.totalCount = this.jdData.length;
                } else {
                  this.jdData = dataJd.filter(
                    item =>
                      parseInt(item.count) >= this.number1 &&
                      parseInt(item.count) <= this.number2
                  );
                  this.totalCount = this.jdData.length;
                }
              });
            this.$message({
              showClose: true,
              message:
                "该简历更新成功,本条简历用时:" +
                this.jdData[index].time +
                "分钟",
              type: "success"
            });
          } else {
            this.isDisable = false;
            this.$message({
              showClose: true,
              message: "该简历更新失败",
              type: "warning"
            });
          }
        });
      } else {
        this.isDisable = false;
        this.$message({
          showClose: true,
          message: "请修改简历状态",
          type: "warning"
        });
      }
    },
    // 筛选序列号w
    btn() {
      let option = new URLSearchParams();
      option.append("user_city", this.cityOne);
      option.append("remarks", "无");
      option.append("page", this.currentPage - 1);
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
          if (this.number1 == "" || this.number2 == "") {
            this.jdData = dataJd;
            this.totalCount = this.jdData.length;
          } else {
            this.jdData = dataJd.filter(
              item =>
                parseInt(item.count) >= this.number1 &&
                parseInt(item.count) <= this.number2
            );
            this.totalCount = this.jdData.length;
          }
        });
    },
    // 刷新
    bth11() {
      window.location.reload();
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
      option.append("user_city", this.cityOne);
      option.append("remarks", "无");
      option.append("page", currentPage - 1);
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
          that.jdData = dataJd;
          let num = Number(dataJd[0].total);
          that.totalCount = num;

          // 获取账号ID
          that.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

        });
    },
    // 查看简历详情
    seeJdd(row) {
      let option = new URLSearchParams();
      option.append("source_resume_id", row.source_resume_id);
  option.append("session_key",this.session_key)
      this.$http({
        method: "post",
        url: "hr24/show_resume_info/",
        data: option
      }).then(res => {
        let dataJd = JSON.parse(res.data.data);
        this.seeJd = dataJd;
        this.dialogTableVisible = true;
        if (this.seeJd[0].work_exp.length == 0) {
          this.expShow = false;
        } else {
          this.expShow = true;
        }
        if (this.seeJd[0].graduate_school == "") {
          this.shcoolShow = false;
        } else {
          this.shcoolShow = true;
        }
      });
    }
  },
  // 退出页面清空定时器
  beforeDestroy() {
    clearInterval(this.setInt);
  },
  // 请求数据
  mounted: function() {
    // 获取所有城市列表
    this.loadddd = true;
    this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    this.areaId = this.userInfo.data.data.area_id;
 
    let uerId = this.userInfo.data.data.user_type;
    this.session_key=this.userInfo.data.data.session_key;
    let option = new URLSearchParams();
    option.append("area_id", this.areaId);
      option.append("session_key",this.session_key)
    this.$http({
      method: "post",
      url: "hr24/show_all_cities/",
      data: option
    }).then(res => {
      let dataJd = JSON.parse(res.data.data);
      this.loadddd = false;
      this.cityNum = dataJd;
      // 获取账号ID
      if (this.userInfo == null) {
        this.$router.push({ name: "Login" });
      }
    });
  }
};
</script>
<style scoped>
ul {
  list-style: none;
}
.cityBix {
  width: 150px;
  display: inline-block;
  text-align: center;
  margin-top: 30px;
}
p {
  margin: 0;
}
.citySpan {
  
  font-style: italic;
  font-size: 15px;
  color: rgb(70, 11, 29);
}
.tags-view-container {
  display: none;
}
.tranBox {
  width: 800px;
  margin: 0 auto;
}
.show1 .el-button {
  height: 35px;
  padding: 0;
  width: 100px;
}
span {
  font-size: 12px;
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
  height: 12px;
  line-height: 12px;
  display: inline-block;
}
#div2 {
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
.butth {
  width: 45px;
  height: 20px;
  margin: 0;
  padding: 0;
  border: 1px solid transparent;
  outline: none;
  cursor: pointer;
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
  margin: 5px;
}
.imgJd {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
</style>


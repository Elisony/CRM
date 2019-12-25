<template>
  <!-- 这里是HR的审核管理页面 -->
  <div>
    <el-collapse-transition style="transition: height 5s ease-out">
      <div class="dive" v-show="show">
        <div class="transition-box">
          <el-button class="reset" @click="back">返回上一级</el-button>
          <div class="filit">
            <el-select v-model="valueHr" multiple placeholder="请选择HR名字">
              <el-option v-for="item in hrName" :key="item.value" :value="item.value"></el-option>
            </el-select>
            <el-select v-model="valueJd" multiple placeholder="请选择简历状态">
              <el-option
                v-for="item in jdFilit"
                :key="item.numBa"
                :label="item.value"
                :value="item.numBa"
              ></el-option>
            </el-select>
            <el-select v-model="valueGo" multiple placeholder="请选择简历来源">
              <el-option v-for="item in goFilit" :key="item" :value="item"></el-option>
            </el-select>
            <el-button type="success" @click="bthFiltl">确定筛选</el-button>
          </div>
          <el-table
            ref="multipleTable"
            :data="jdData"
            style="width:100%"
            v-loading.fullscreen.lock="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
          >
            <el-table-column
              prop="hr_modify_date"
              label="审核日期"
              sortable
              align="center"
              column-key="date"
              width="100"
            ></el-table-column>
            <el-table-column label="简历详情" align="center" type="input">
              <template slot-scope="scope">
                <button
                  style="background:#ff871c;outline:none;border: 1px solid #DCDFE6;height: 26px;border-radius: 4px;color:#fff;padding:0;width: 60px;cursor: pointer;"
                  @click="seeJdd(scope.row)"
                >查看详情</button>
              </template>
            </el-table-column>
            <el-table-column prop="user_name" label="姓名" align="center"></el-table-column>
            <el-table-column prop="age" label="年龄" align="center"></el-table-column>
            <el-table-column label="手机号码" align="center">
              <template slot-scope="scope">
                <span class="spanText">{{scope.row.user_phone==""?"暂无号码":scope.row.user_phone}}</span>
              </template>
            </el-table-column>
            <el-table-column label="期望区域" align="center">
              <template slot-scope="scope">
                <span class="spanText">{{scope.row.place_content}}</span>
              </template>
            </el-table-column>

            <el-table-column label="备注" align="center">
              <template slot-scope="scope">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="scope.row.remarks"
                  placement="top-start"
                >
                  <el-button class="spanText">{{scope.row.remarks}}</el-button>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="审核用时" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.operate_time">{{scope.row.operate_time}}分</span>
                <span v-else>无</span>
              </template>
            </el-table-column>
            <el-table-column prop="source_net" label="简历来源" align="center"></el-table-column>
            <el-table-column prop="hr_name" label="审核人员" align="center"></el-table-column>
            <el-table-column prop="resume_status" label="简历状态" align="center">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.resume_status === '审核成功' ? '' : 'danger'"
                  disable-transitions
                >{{scope.row.resume_status}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  :plain="true"
                  @click="dialogTableVisible(scope.$index)"
                  style="font-size:10px;padding:10px"
                >修改</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog
            title="简历详情"
            :visible.sync="dialogTable"
            close-on-press-escape
            center
            lock-scroll
            custom-class="diao"
            top="1vh"
          >
            <el-form
              ref="form"
              :model="jdDataNow11"
              label-width="80px"
              style="width:260px;margin: 0 auto;"
            >
              <el-form-item label="姓名">
                <el-input
                  v-model="jdDataNow11.user_name"
                  @keyup="this.value=this.value.replace(/[^\u4e00-\u9fa5]/g,'')"
                ></el-input>
              </el-form-item>
              <el-form-item label="年龄">
                <el-input v-model="jdDataNow11.age"></el-input>
              </el-form-item>
              <el-form-item label="联系方式">
                <el-input maxlength="11" v-model="jdDataNow11.user_phone"></el-input>
              </el-form-item>
              <el-form-item label="期望区域">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="jdDataNow11.place_content"
                  placement="top-start"
                >
                  <el-input v-model="jdDataNow11.place_content"></el-input>
                </el-tooltip>

                <span class="spanTex">* 修改格式为:xx市xx区</span>
              </el-form-item>
              <el-form-item label="备注">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="jdDataNow11.remarks"
                  placement="top-start"
                >
                  <el-input class="testBox" clearable v-model="jdDataNow11.remarks"></el-input>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="审核人员">
                <el-input :disabled="true" v-model="jdDataNow11.hr_name"></el-input>
              </el-form-item>
              <el-form-item label="审核状态">
                <el-radio-group v-model="radio2" @change="openTit">
                  <el-radio :label="2">审核成功</el-radio>
                  <el-radio :label="1">审核失败</el-radio>
                  <el-radio :label="3">暂未接通</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-button type="primary" @click="dialo">立即修改</el-button>
            </el-form>
          </el-dialog>
        </div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          @prev-click="prevClick"
          @next-click="nextClick"
          :current-page="currentPage"
          :page-size="pagesize"
          :total="totalCount"
          layout="total, prev, pager, next, jumper"
          style="text-align: center"
        ></el-pagination>
      </div>
    </el-collapse-transition>
    <el-collapse-transition>
      <div v-show="show1" class="show2">
        <div class="transition-box">
          <h3 style="text-align: center">请选择需要查看的数据</h3>
          <div class="demo-input-suffix">
            姓名：
            <el-input placeholder="请输入姓名" prefix-icon="el-icon-search" v-model="str" size="mini"></el-input>
          </div>
          <div class="demo-input-suffix">
            年龄：
            <el-input placeholder="请输入年龄" size="mini" v-model="str1" prefix-icon="el-icon-search"></el-input>
          </div>
          <div class="demo-input-suffix">
            城市：
            <el-input placeholder="请输入城市" size="mini" v-model="str3" prefix-icon="el-icon-search"></el-input>
          </div>
          <el-button type="success" @click="bth" :loading="DScreening">确定</el-button>
        </div>
      </div>
    </el-collapse-transition>
    <el-dialog title="简历详情" :visible.sync="dialogTab" top="1vh">
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
              {{scope.row.user_phone=="0"||scope.row.user_phone==""?"无":scope.row.user_phone}}
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
        <el-table-column align="center">
          <template slot-scope="scope">
            <a :href="scope.row.resume_url" target="_Blank" class="CheckResume">查看简历</a>
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

<script>
export default {
  data() {
    return {
      dialogTable: false,
      dialogTab: false,
      show: false,
      loading: false,
      show1: true,
      DScreening: false,
    
      areaId: "",
      userInfo: "",
      aaa: "",
      bbb: "",
      ccc: "",
      hrName: [],
      jdFilit: [
        {
          value: "审核成功",
          numBa: "2"
        },
        {
          value: "审核失败",
          numBa: "1"
        },
        {
          value: "暂未接通",
          numBa: "3"
        }
      ],
      goFilit: [],
      valueHr: [],
      valueJd: [],
      valueGo: [],
      radio2: "",
      seeJd: [],
      headTit: true,
      expShow: false,
      shcoolShow: false,
      resumeStatus: "",
      currentPage: 1, //初始页
      pagesize: 50, //    每页的数据
      totalCount: 1,
      jdData: [],
      jdDataNow11: [],
      str: "",
      str1: "",
      str2: "",
      session_key:"",
      str3: "",
      seleNume: "3",
      seleText: "该求职者暂未接通"
    };
  },
  methods: {
    dialogTableVisible(index) {
      this.jdDataNow11 = this.jdData[index];
      this.dialogTable = true;
      if (this.jdDataNow11.resume_status == "审核成功") {
        this.radio2 = 2;
      } else if (this.jdDataNow11.resume_status == "审核失败") {
        this.radio2 = 1;
      } else {
        this.radio2 = 3;
      }
    },
    openTit() {
      console.log(this.radio2);
    },
    dialo() {
      let testBox = document.querySelector(".testBox");
      let option = new URLSearchParams();
      option.append("place_content", this.jdDataNow11.place_content);
      option.append("phone", this.jdDataNow11.user_phone);
      
      option.append("age", this.jdDataNow11.age);
      option.append("user_name", this.jdDataNow11.user_name);
      option.append("resume_status", this.radio2);
      option.append("remarks", this.jdDataNow11.remarks);
      option.append("source_resume_id", this.jdDataNow11.source_resume_id);
      option.append("session_key",this.session_key)
      let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;

      if (!/^[\u4e00-\u9fa5]+$/gi.test(this.jdDataNow11.user_name)) {
        this.$message({
          showClose: true,
          message: "名字只能输入汉字",
          type: "warning"
        });
      } else if (
        myreg.test(this.jdDataNow11.user_phone == false) &&
        this.radio2 == 2
      ) {
        this.$message({
          showClose: true,
          message: "联系方式格式错误",
          type: "warning"
        });
      } else if (!this.jdDataNow11.remarks) {
        this.$message({
          showClose: true,
          message: "请输入备注",
          type: "warning"
        });
      } else if (
        this.jdDataNow11.remarks == "该求职者暂未接通" &&
        this.radio2 != 3
      ) {
        this.$message({
          showClose: true,
          message: "请修改备注",
          type: "warning"
        });
      } else if (
        this.jdDataNow11.age == "" ||
        this.jdDataNow11.user_name == "" ||
        this.jdDataNow11.hr_name == ""
      ) {
        this.$message({
          showClose: true,
          message: "请检查，并填写完整",
          type: "success"
        });
      } else {
        this.$http({
          method: "post",
          url: "hr24/update_reviewed_resume/",
          data: option
        }).then(res => {
          if (res.data.status == 1) {
            this.dialogTable = false;
            let option = new URLSearchParams();
            option.append("age", this.str1);
            option.append("name", this.str);
            option.append("city", this.str3);
            option.append("page", this.currentPage - 1);
            option.append("area_id", this.areaId);
            option.append("session_key",this.session_key)
            this.$http({
              method: "post",
              url: "hr24/show_all_reviewed/",
              data: option
            })
              .then(res => {
                let dataJd = JSON.parse(res.data.data);
                this.jdData = dataJd;
              })
              .catch(err => {
                console.log(err);
              });
            this.$message({
              showClose: true,
              message: "修改成功",
              type: "success"
            });
          } else {
            this.$message({
              showClose: true,
              message: "保存失败",
              type: "warning"
            });
          }
        });
      }
    },

    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size;
    },
    // 输入数字翻页
    handleCurrentChange: function(currentPage) {
      this.loading = true;
      if (
        this.valueHr.length != 0 ||
        this.valueJd.length != 0 ||
        this.valueGo.length != 0
      ) {
        let option = new URLSearchParams();
        option.append("hr_name", this.valueHr);
        option.append("city", this.str3);
        option.append("source_net", this.valueGo);
        option.append("resume_status", this.valueJd);
        option.append("page", 0);
        option.append("session_key",this.session_key)
        this.$http({
          method: "post",
          url: "hr24/show_resume_by_conditions/",
          data: option
        })
          .then(res => {
            if (res.data.status == 1) {
              let dataJd = JSON.parse(res.data.data);
              this.jdData = dataJd;
              this.totalCount = this.jdData[0].count;
              this.loading = false;
            } else if (res.data == "") {
              this.loading = false;
              this.$message({
                showClose: true,
                message: "未查询到此条件",
                type: "warning"
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.currentPage = currentPage;
        let option = new URLSearchParams();
        option.append("age", this.str1);
        option.append("name", this.str);
        option.append("city", this.str3);
        option.append("page", currentPage - 1);
        option.append("area_id", this.areaId);
        option.append("session_key",this.session_key)
        this.$http({
          method: "post",
          url: "hr24/show_all_reviewed/",
          data: option
        })
          .then(res => {
            let dataJd = JSON.parse(res.data.data);
            this.jdData = dataJd;

            this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
           
            this.loading = false;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    resetDateFilter() {
      this.$refs.multipleTable.clearFilter("date");
    },
    back() {
      this.show = false;
      this.show1 = true;
    },
    prevClick() {
      this.loading = true;
      if (
        this.valueHr.length != 0 ||
        this.valueJd.length != 0 ||
        this.valueGo.length != 0
      ) {
        let option = new URLSearchParams();
        option.append("hr_name", this.valueHr);
        option.append("city", this.str3);
        option.append("source_net", this.valueGo);
        option.append("resume_status", this.valueJd);
        option.append("page", 0);
        option.append("session_key",this.session_key)
        this.$http({
          method: "post",
          url: "hr24/show_resume_by_conditions/",
          data: option
        })
          .then(res => {
            if (res.data.status == 1) {
              let dataJd = JSON.parse(res.data.data);
              this.jdData = dataJd;
              this.totalCount = this.jdData[0].count;
              this.loading = false;
            } else if (res.data == "") {
              this.loading = false;
              this.$message({
                showClose: true,
                message: "未查询到此条件",
                type: "warning"
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        let option = new URLSearchParams();
        option.append("age", this.str1);
        option.append("name", this.str);
        option.append("city", this.str3);
        option.append("page", this.currentPage - 2);
        option.append("area_id", this.areaId);
        option.append("session_key",this.session_key)
        this.$http({
          method: "post",
          url: "hr24/show_all_reviewed/",
          data: option
        })
          .then(res => {
            let dataJd = JSON.parse(res.data.data);
            this.jdData = dataJd;
            this.loading = false;
            this.$nextTick(() => {
              document.documentElement.scrollTop = 0;
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    nextClick() {
      this.loading = true;

      if (
        this.valueHr.length != 0 ||
        this.valueJd.length != 0 ||
        this.valueGo.length != 0
      ) {
        let option = new URLSearchParams();
        option.append("hr_name", this.valueHr);
        option.append("city", this.str3);
        option.append("source_net", this.valueGo);
        option.append("resume_status", this.valueJd);
        option.append("page", this.currentPage);
        option.append("session_key",this.session_key)
        this.$http({
          method: "post",
          url: "hr24/show_resume_by_conditions/",
          data: option
        })
          .then(res => {
            if (res.data.status == 1) {
              let dataJd = JSON.parse(res.data.data);
              this.jdData = dataJd;
              this.totalCount = this.jdData[0].count;
              this.loading = false;
            } else if (res.data == "") {
              this.loading = false;
              this.$message({
                showClose: true,
                message: "未查询到此条件",
                type: "warning"
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        let option = new URLSearchParams();
        option.append("age", this.str1);
        option.append("name", this.str);
        option.append("city", this.str3);
        option.append("page", this.currentPage);
        option.append("area_id", this.areaId);
        option.append("session_key",this.session_key)
        this.$http({
          method: "post",
          url: "hr24/show_all_reviewed/",
          data: option
        })
          .then(res => {
            let dataJd = JSON.parse(res.data.data);
            this.jdData = dataJd;
            this.loading = false;
            this.$nextTick(() => {
              document.documentElement.scrollTop = 0;
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    clearFilter() {
      this.$refs.multipleTable.clearFilter();
    },

    // 筛选页面切换
    bth() {
      this.DScreening = true;
      let option = new URLSearchParams();
      option.append("age", this.str1);
      option.append("name", this.str);
      option.append("city", this.str3);
      option.append("page", 0);
      option.append("area_id", this.areaId);
      option.append("session_key",this.session_key)
      this.$http({
        method: "post",
        url: "hr24/show_all_reviewed/",
        data: option
      })
        .then(res => {
          let dataJd = JSON.parse(res.data.data);
          this.jdData = dataJd;
          this.DScreening = false;
          this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
   
          if (this.str1 == "" && this.str == "" && this.str3 == "") {
            this.jdData.forEach(item => {
              this.totalCount = item.count;
            });
          } else {
            if (this.jdData.length == 0) {
              this.$message({
                showClose: true,
                message: "未能查询到满足此条件的信息,请改变查询条件重新查询",
                type: "warning"
              });
            }

            this.totalCount = this.jdData[0].count;
          }
          this.show = true;
          this.show1 = false;
          // 这是简历来源
          this.$http({
            method: "post",
            url: "hr24/show_all_source_net/"
          }).then(res => {
            let dataJd = JSON.parse(res.data.data);
            this.goFilit = dataJd;
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    bthFiltl() {
      this.loading = true;
      
      let option = new URLSearchParams();
      option.append("hr_name", this.valueHr);
      option.append("city", this.str3);
      option.append("source_net", this.valueGo);
      option.append("resume_status", this.valueJd);
      option.append("page", 0);
      option.append("session_key",this.session_key)
      this.$http({
        method: "post",
        url: "hr24/show_resume_by_conditions/",
        data: option
      })
        .then(res => {
          if (res.data.status == 1 && res.data.data != "[]") {
            let dataJd = JSON.parse(res.data.data);
            this.jdData = dataJd;
            this.totalCount = this.jdData[0].count;
            this.loading = false;
          } else if (res.data.data == "[]") {
            this.loading = false;
            this.$message({
              showClose: true,
              message: "未查询到此条件",
              type: "warning"
            });
          }
        })
        .catch(err => {
          console.log(err);
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
        console.log(dataJd);
        this.dialogTab = true;
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
  // 请求数据
  mounted: function() {
    this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    this.areaId = this.userInfo.data.data.area_id;

    let uerId = this.userInfo.data.data.user_type;
this.session_key=this.userInfo.data.data.session_key;
    let option = new URLSearchParams();
    option.append("area_id", this.areaId);
    option.append("session_key",this.session_key)
    this.$http({
      method: "post",
      url: "hr24/show_hr_name/",
      data: option
    }).then(res => {
      let dataJd = JSON.parse(res.data.data);
      this.hrName = dataJd;
    });
    // 获取账号ID
    if (this.userInfo == null) {
      this.$router.push({ name: "Login" });
    }
  }
};
</script>
<style scoped>
ul {
  list-style: none;
}
.filit {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-evenly;
  margin: 10px 0;
}
.diao {
  margin-top: 0;
}
.el-form-item__content .spanTex {
  line-height: 12px;
  color: red;
}
.spanText {
  width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: keep-all;
  border: 0;
}
.el-table__header {
  min-width: 100%;
  table-layout: inherit;
}
.is-scrolling-none .el-table__body {
  min-width: 100%;
}
.dive .cell {
  text-align: center;
  font-size: 12px;
}
.show2 .el-input {
  margin-top: 10px;
  width: 120px;
}
.show2 .demo-input-suffix {
  text-align: center;
}
.show2 .el-button {
  margin-left: 48%;
  margin-top: 10px;
  height: 25px;
  padding: 0;
  width: 100px;
}
.show2 .el-input__inner {
  padding-right: 0;
}
.el-input__suffix {
  right: 0;
}
.imgJd {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
.CheckResume {
  width: 80px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  color: #fff;
  font-weight: blod;
  font-weight: bold;
  background: #ff8f00;
  margin: 0 auto;
}
</style>

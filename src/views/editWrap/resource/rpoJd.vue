<template>
  <div class="boxJd" v-if="showHome">
    <!-- 筛选简历 -->
    <div v-show="jdShow" class="show2">
      <div class="transition-box">
        <h3 style="text-align: center">请选择需要查看的简历类型</h3>
        <h5 style="color:red;text-align: center">*不输入内容则默认选择不限</h5>
        <div class="demo-input-suffix">
          城市：
          <el-input placeholder="请输入城市" size="mini" v-model="str1" prefix-icon="el-icon-search"></el-input>
        </div>
        <div class="demo-input-suffix">
          职位：
          <el-input placeholder="请输入职位" size="mini" v-model="str2" prefix-icon="el-icon-search"></el-input>
        </div>
        <div class="demo-input-suffix">
          年龄：
          <el-input placeholder="请输入年龄" size="mini" v-model="str3" prefix-icon="el-icon-search"></el-input>
          <span>~</span>
          <el-input placeholder="请输入年龄" size="mini" v-model="str4" prefix-icon="el-icon-search"></el-input>
        </div>
        <div class="demo-input-suffix">
          性别：
          <el-radio-group v-model="radio1" size="mini">
            <el-radio-button label="男"></el-radio-button>
            <el-radio-button label="女"></el-radio-button>
            <el-radio-button label="不限"></el-radio-button>
          </el-radio-group>
        </div>
        <div class="demo-input-suffix">
          学历：
          <el-radio-group v-model="radio2" size="mini">
            <el-radio-button label="初中以上"></el-radio-button>
            <el-radio-button label="高中以上"></el-radio-button>
            <el-radio-button label="大专以上"></el-radio-button>
            <el-radio-button label="本科以上"></el-radio-button>
            <el-radio-button label="不限"></el-radio-button>
          </el-radio-group>
        </div>
        <div class="demo-input-suffix">
          项目：
          <el-select
            v-model="value"
            clearable
            placeholder="请选择项目"
            size="mini"
            style="width:130px"
            @change="changeValue1($event,value)"
          >
            <el-option
              v-for="(item,index) in options"
              :key="index"
              :label="item.project_name"
              :value="item.project_name"
            ></el-option>
          </el-select>
        </div>
        <el-button type="success" @click="screen">确定</el-button>
      </div>
    </div>
    <!-- 简历详情 -->
    <div class="jiliJd" v-show="shoppJd">
      <div class="title">
        <h4 @click="backHome">
          当前选择的项目是：
          {{value}}
          <span style="color:red">（点击可切换项目及筛选条件）</span>
        </h4>
        <div class="iconSup" @click="shopName">
          <svg-icon icon-class="shoppingcart2"></svg-icon>
          <span class="iconNumber">{{shopNumCount}}</span>
        </div>
      </div>
      <div class="buttHand">
        <el-button type="danger" round @click="Refresh">点我刷新</el-button>
        <div style="width:35%">
          <el-input
            v-model="inputName"
            placeholder="请输入名字或简历ID进行筛选"
            style="width:60%;margin-right:15px"
          ></el-input>
          <el-button type="success" round @click="ImportName" :loading="inputTrue">筛选姓名</el-button>
        </div>
        <div style="width:35%" v-show="agentId==2">
          <el-input v-model="inputUrl" placeholder="请输入58链接来导入" style="width:60%;margin-right:15px"></el-input>
          <el-button type="success" round @click="ImportUrl">导入简历</el-button>
        </div>
      </div>
      <el-dialog title="导入简历详情" :visible.sync="ImportJd" width="30%" center>
        <div class="Importstyle">
          <h4>姓名：{{messageJd.name}}</h4>
          <h4>简历ID：{{messageJd.resume_md5}}</h4>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="ImportJd = false">取 消</el-button>
          <el-button type="primary" @click="ImportJd = false">确定</el-button>
        </span>
      </el-dialog>
      <el-table :data="shopDate" fit @selection-change="selectionJdChange" ref="seleJd">
        <el-table-column type="selection" width="45" align="center"></el-table-column>
        <el-table-column label="姓名" align="center" type="input">
          <template slot-scope="scope">
            <span>{{scope.row.user_name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="性别" align="center" type="input">
          <template slot-scope="scope">
            <span>{{scope.row.sex}}</span>
          </template>
        </el-table-column>
        <el-table-column label="学历" align="center" type="input">
          <template slot-scope="scope">
            <span>{{scope.row.edu_background}}</span>
          </template>
        </el-table-column>
        <el-table-column label="年龄" align="center" type="input">
          <template slot-scope="scope">
            <span>{{scope.row.age}}</span>
          </template>
        </el-table-column>
        <el-table-column label="区域" align="center" type="input">
          <template slot-scope="scope">
            <span
              style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
            >{{scope.row.place_content}}</span>
          </template>
        </el-table-column>
        <el-table-column label="职位" align="center" type="input" show-overflow-tooltip>
          <template slot-scope="scope">
            <span
              style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
            >{{scope.row.position_content}}</span>
          </template>
        </el-table-column>
        <el-table-column label="简历链接" align="center" type="input" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button round type="success">
              <a :href="scope.row.resume_url" target="_blank">简历链接</a>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="查看详情" align="center" type="input">
          <template slot-scope="scope">
            <el-button round type="info" @click="seeTitle(scope,scope.$index)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button @click="pushShop">一键加入购物车({{jdNum}})</el-button>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        @prev-click="prevClick"
        @next-click="nextClick"
        layout="total, prev, pager, next, jumper"
        :total="totalCount"
        style="text-align: center"
      ></el-pagination>
      <!-- 查看简历详情 -->
      <el-dialog title="简历详情" :visible.sync="dialogTableVisible">
        <el-table :data="showPublic" style="width: 100%" :show-header="headTit" v-loading="loading">
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
                />**********
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
              <el-button type="success" @click="joinShop(scope)">加入购物车</el-button>
              <h4>剩余下载点数：{{currentPoint}}点</h4>
            </template>
          </el-table-column>
        </el-table>
        <el-table :data="showPublic" style="width: 100%" :show-header="headTit" v-loading="loading">
          <el-table-column>
            <template slot-scope="scope">
              <h3>求职意向</h3>
              <ul class="qiuJd">
                <li>
                  <span>期望薪资：{{scope.row.expected_salary=="0"?"面议":scope.row.expected_salary}}</span>
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
        <el-table
          :data="showPublic"
          style="width: 100%"
          :show-header="headTit"
          v-if="expShow"
          v-loading="loading"
        >
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
                  <span>工作内容：{{item.work_content}}</span>
                </li>
              </ul>
            </template>
          </el-table-column>
        </el-table>
        <el-table
          :data="showPublic"
          style="width: 100%"
          :show-header="headTit"
          v-if="shcoolShow"
          v-loading="loading"
        >
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
    <!-- 购物车 -->
    <div class="shoping" v-show="shoppJd1">
      <el-button @click="backJd1">返回继续选择简历</el-button>
      <el-table
        ref="multipleTable"
        :data="tableData1"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column prop="user_name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="sex" label="性别" align="center"></el-table-column>
        <el-table-column prop="age" label="年龄" align="center"></el-table-column>
        <el-table-column prop="edu_background" label="学历" align="center"></el-table-column>
        <el-table-column prop="place_content" label="期望区域" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="position_content" label="期望职位" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="danger" @click="deleteJd(scope)" align="center">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="numJd">
        <el-button @click="toggleSelection()">取消选择</el-button>
        <el-button style=" float: right;" @click="settIement">结算&nbsp;({{numVul}})</el-button>
        <span style="float: right;line-height:40px;">合计：{{numVul*6}}点</span>
      </div>
      <el-pagination
        @current-change="handShopChange"
        :current-page="currShop"
        :page-size="pageShop"
        @prev-click="prevShop"
        @next-click="nextShop"
        layout="total, prev, pager, next, jumper"
        :total="totalShop"
        style="text-align: center"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ImportJd: false,
      currentPage: 1, //初始页
      currShop: 1,
      pagesize: 50, //    每页的数据
      pageShop: 50,
      totalCount: 1,
      totalShop: 0,
      showHome: true,
      jdShow: true,
      dialogTableVisible: false,
      shopDate: [],
      headTit: false,
      inputUrl: "",
      currentPoint: 0,
      loading: false,
      str1: "",
      session_key: "",
      str2: "",
      resumeId: "",
      str3: "",
      str4: "",
      inputTrue: false,
      inputName: "",
      userId: "",
      agentId: "",
      radio1: "",
      radio2: "",
      expShow: false,
      shcoolShow: false,
      shopNumCount: 0,
      showPublic: [],
      addShop: [],
      number1: 0,
      jdMoney: 0,
      numVul: 0,
      jdNum: 0,
      shoppJd: false,
      shoppJd1: false,
      options: [],
      rpoId: 0,
      value: "",
      multipleSelection: [],
      tableData1: [],
      messageJd: {}
    };
  },
  methods: {
    // 点击购物车进入
    shopName() {
      this.shoppJd = false;
      this.shoppJd1 = true;
      let option = new URLSearchParams();
      option.append("rpo_name", this.value);
      option.append("page", 0);
      option.append("session_key", this.session_key);
      this.$http({
        method: "post",
        url: "hr24/show_cart_resume/",
        data: option
      }).then(res => {
        let dataJd = JSON.parse(res.data.data);
        this.tableData1 = dataJd;

        if (this.tableData1 != "") {
          this.totalShop = dataJd[dataJd.length - 1].count;
        }
      });
    },
    // 点击返回简历列表
    backJd1() {
      this.shoppJd = true;
      this.shoppJd1 = false;
    },
    // 点击删除
    deleteJd(scope) {
      let option = new URLSearchParams();

      option.append("rpo_name", this.value);
      option.append("source_resume_id", scope.row.source_resume_id);
      option.append("session_key", this.session_key);
      this.$http({
        method: "post",
        url: "hr24/remove_cart_resume/",
        data: option
      }).then(res => {
        if (res.data.status == 1) {
          let option = new URLSearchParams();
          option.append("rpo_name", this.value);
          option.append("page", this.currShop - 1);
          option.append("session_key", this.session_key);
          this.$http({
            method: "post",
            url: "hr24/show_cart_resume/",
            data: option
          }).then(res => {
            let dataJd = JSON.parse(res.data.data);
            this.tableData1 = dataJd;
            if (dataJd != "") {
              this.totalShop = dataJd[0].count;
            }
          });
          this.$message({
            showClose: true,
            message: "删除简历成功",
            type: "success"
          });
        }
      });
    },
    // 点击取消选择
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 点击简历详情选中这一行
    selectionJdChange(val) {
      this.addShop = val;
      this.jdNum = val.length;
    },
    // 点击加入购物车
    joinShop(scope) {
      let option = new URLSearchParams();
      option.append("source_resume_id", this.resumeId);

      option.append("rpo_name", this.value);
      option.append("session_key", this.session_key);
      this.$http({
        method: "post",
        url: "hr24/add_resume_to_cart/",
        data: option
      }).then(res => {
        if (res.data.status == 1) {
          let option = new URLSearchParams();
          option.append("age", this.str3);
          option.append("age1", this.str4);
          option.append("sex", this.radio1);
          option.append("edu", this.radio2);
          option.append("place_content", this.str1);
          option.append("position_content", this.str2);
          option.append("page", 0);
          option.append("rpo_name", this.value);
          option.append("resume_name", this.inputName);
          option.append("session_key", this.session_key);
          this.$http({
            method: "post",
            url: "hr24/show_public_resume/",
            data: option
          })
            .then(res => {
              if (res.data.data != "[]") {
                this.dialogTableVisible = false;
                this.shoppJd = true;
                this.jdShow = false;
                let dataJd = res.data.data;
                this.shopDate = dataJd;

                this.totalCount = dataJd[0].count;
                this.shopNumCount = dataJd[0].resume_count;
              } else {
                this.$message({
                  showClose: true,
                  message: "暂无数据，请重新筛选",
                  type: "error"
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
          // this.$store.commit("addShow", num);
          this.$refs.seleJd.clearSelection();
          this.$message({
            showClose: true,
            message: "成功加入购物车",
            type: "success"
          });
          this.jdNum = 0;
        } else if (res.data.status == -1) {
          this.$message({
            showClose: true,
            message: res.data.data + "请刷新页面重试",
            type: "error"
          });
        }
      });
    },
    // 一键加入购物车
    pushShop() {
      let num = this.jdNum;
      let sourceId = [];
      if (num != 0) {
        this.addShop.forEach(item => {
          sourceId.push(item.source_resume_id);
        });

        let option = new URLSearchParams();
        option.append("source_resume_id", sourceId);

        option.append("rpo_name", this.value);
        option.append("session_key", this.session_key);
        this.$http({
          method: "post",
          url: "hr24/add_resume_to_cart/",
          data: option
        }).then(res => {
          if (res.data.status == 1) {
            let option = new URLSearchParams();
            option.append("age", this.str3);
            option.append("age1", this.str4);
            option.append("sex", this.radio1);
            option.append("edu", this.radio2);
            option.append("place_content", this.str1);
            option.append("position_content", this.str2);
            option.append("page", 0);
            option.append("rpo_name", this.value);
            option.append("resume_name", this.inputName);
            option.append("session_key", this.session_key);
            this.$http({
              method: "post",
              url: "hr24/show_public_resume/",
              data: option
            })
              .then(res => {
                if (res.data.data != "[]") {
                  this.shoppJd = true;
                  this.jdShow = false;
                  let dataJd = res.data.data;
                  this.shopDate = dataJd;
                  this.totalCount = dataJd[0].count;
                  this.shopNumCount = dataJd[0].resume_count;
                } else {
                  this.$message({
                    showClose: true,
                    message: "暂无数据，请重新筛选",
                    type: "error"
                  });
                }
              })
              .catch(err => {
                console.log(err);
              });
            // this.$store.commit("addShow", num);
            this.$refs.seleJd.clearSelection();
            this.$message({
              showClose: true,
              message: "成功加入购物车",
              type: "success"
            });
            this.jdNum = 0;
          } else if (res.data.status == -1) {
            this.$message({
              showClose: true,
              message: res.data.data + "请刷新页面重试",
              type: "error"
            });
          }
        });
      } else {
        this.$message({
          showClose: true,
          message: "暂未勾选简历，请勾选后再加入购物车",
          type: "error"
        });
      }
    },
    // 点击购物车选框获取到点击的这一行的数据
    handleSelectionChange(val) {
      if (val != "") {
        this.multipleSelection = val;
      }
      this.numVul = val.length;
    },

    // 结算
    settIement() {
      if (this.numVul == 0) {
        this.$message({
          type: "info",
          message: "请至少选择一条简历购买！！！"
        });
      } else {
        this.$confirm(
          `本次共购买` +
            this.numVul +
            `份简历,总计扣除` +
            this.numVul * 6 +
            `点，是否继续支付?`,
          "购买简历",
          {
            cancelButtonText: "取消 购买",
            confirmButtonText: "确定购买",
            iconClass: "el-icon-success",
            center: true
          }
        )
          .then(res => {
            let sourceResumeId = [];
            this.multipleSelection.forEach(item => {
              sourceResumeId.push(item.source_resume_id);
            });

            let option = new URLSearchParams();

            option.append("source_resume_id", sourceResumeId);
            option.append("rpo_id", this.rpoId);
            option.append("rpo_name", this.value);
            option.append("total_point", this.numVul * 6);
            option.append("session_key", this.session_key);
            this.$http({
              method: "post",
              url: "hr24/deduct_point/",
              data: option
            })
              .then(res => {
                if (res.data.status == 1) {
                  this.numVul = 0;
                  this.$refs.multipleTable.clearSelection();
                  let option = new URLSearchParams();
                  option.append("rpo_name", this.value);
                  option.append("page", 0);
                  option.append("session_key", this.session_key);
                  this.$http({
                    method: "post",
                    url: "hr24/show_cart_resume/",
                    data: option
                  }).then(res => {
                    let dataJd = JSON.parse(res.data.data);
                    this.tableData1 = dataJd;
                    this.totalShop = dataJd.length;
                    this.shopNumCount = dataJd.length;
                  });
                  this.$message({
                    type: "success",
                    message: "恭喜你购买成功,可前往RPO项目管理中查看!"
                  });
                } else {
                  this.$message({
                    type: "error",
                    message: res.data.data
                  });
                }
              })
              .catch(err => {
                this.$message({
                  type: "error",
                  message: "购买失败，请刷新重新购买!"
                });
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消购买"
            });
          });
      }
    },
    // 刷新页面
    Refresh() {
      this.inputUrl="";
      this.ImportName="";
      console.log(this.inputUrl,this.ImportName)
      let option = new URLSearchParams();
      option.append("age", this.str3);
      option.append("age1", this.str4);
      option.append("sex", this.radio1);
      option.append("edu", this.radio2);
      option.append("place_content", this.str1);
      option.append("position_content", this.str2);
      option.append("page", 0);
      option.append("rpo_name", this.value);
      option.append("resume_name", this.inputName);
      option.append("session_key", this.session_key);
      this.$http({
        method: "post",
        url: "hr24/show_public_resume/",
        data: option
      })
        .then(res => {
          this.shoppJd = true;
          this.jdShow = false;
          let dataJd = res.data.data;
          this.shopDate = dataJd;
          this.totalCount = dataJd[0].count;
          this.shopNumCount = dataJd[0].resume_count;
          this.$message({
            showClose: true,
            message: "刷新成功",
            type: "success"
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 点击确定
    screen() {
      if (this.value != "") {
        let option = new URLSearchParams();
        option.append("age", this.str3);
        option.append("age1", this.str4);
        option.append("sex", this.radio1);
        option.append("edu", this.radio2);
        option.append("place_content", this.str1);
        option.append("position_content", this.str2);
        option.append("page", 0);
        option.append("rpo_name", this.value);
        option.append("resume_name", this.inputName);
        option.append("session_key", this.session_key);
        this.$http({
          method: "post",
          url: "hr24/show_public_resume/",
          data: option
        })
          .then(res => {
            if (res.data.data != "[]") {
              this.shoppJd = true;
              this.jdShow = false;
              console.log(res);
              let dataJd = res.data.data;
              this.shopDate = dataJd;
              this.totalCount = dataJd[0].count;
              this.shopNumCount = dataJd[0].resume_count;
            } else {
              this.$message({
                showClose: true,
                message: "暂无数据，请重新筛选",
                type: "error"
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$message({
          showClose: true,
          message: "请选择你的项目",
          type: "error"
        });
      }
    },
    dataList(currentP) {
      let option = new URLSearchParams();
      option.append("age", this.str3);
      option.append("age1", this.str4);
      option.append("sex", this.radio1);
      option.append("edu", this.radio2);
      option.append("place_content", this.str1);
      option.append("position_content", this.str2);
      option.append("page", currentP);
      option.append("rpo_name", this.value);
      option.append("resume_name", this.inputName);
      option.append("session_key", this.session_key);
      console.log(this.inputName);
      this.$http({
        method: "post",
        url: "hr24/show_public_resume/",
        data: option
      })
        .then(res => {
          this.inputTrue = false;
          if (res.data.data != "[]" && res.data.status == 1) {
            this.shoppJd = true;
            this.jdShow = false;
            let dataJd = res.data.data;
            this.shopDate = dataJd;
            this.totalCount = dataJd[0].count;
            this.inputName=""
          } else if (res.data.status == -2) {
            console.log(res);
            this.$message({
              showClose: true,
              message: res.data.data,
              type: "error"
            });
          } else {
            this.$message({
              showClose: true,
              message: "出错了，请检查",
              type: "error"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 点击显示第几页
    handleCurrentChange(currentPage) {
      this.dataList(currentPage);
    },
    // 点击上一页
    prevClick(currentPage) {
      this.dataList(currentPage - 1);
    },
    // 点击下一页
    nextClick(currentPage) {
      this.dataList(currentPage - 1);
    },
    // 购物页数变化时
    handShopChange(currShop) {
      let option = new URLSearchParams();
      option.append("rpo_name", this.value);
      option.append("page", currShop - 1);
      option.append("session_key", this.session_key);
      this.$http({
        method: "post",
        url: "hr24/show_cart_resume/",
        data: option
      }).then(res => {
        let dataJd = JSON.parse(res.data.data);
        this.tableData1 = dataJd;
        if (this.tableData1 != "") {
          this.totalShop = dataJd[dataJd.length - 1].count;
        }
      });
    },
    // 购物车上一页
    prevShop() {
      let option = new URLSearchParams();
      option.append("rpo_name", this.value);
      option.append("page", this.currShop - 1);
      option.append("session_key", this.session_key);
      this.$http({
        method: "post",
        url: "hr24/show_cart_resume/",
        data: option
      }).then(res => {
        let dataJd = JSON.parse(res.data.data);
        this.tableData1 = dataJd;
        this.totalShop = dataJd[dataJd.length - 1].count;
      });
    },
    // 购物车下一页
    nextShop() {
      let option = new URLSearchParams();
      option.append("rpo_name", this.value);
      option.append("page", this.currShop);
      option.append("session_key", this.session_key);
      this.$http({
        method: "post",
        url: "hr24/show_cart_resume/",
        data: option
      }).then(res => {
        let dataJd = JSON.parse(res.data.data);
        this.tableData1 = dataJd;
        if (this.tableData1 != "") {
          this.totalShop = dataJd[dataJd.length - 1].count;
        }
      });
    },
    backHome() {
      this.jdShow = true;
      this.shoppJd = false;
    },
    // 点击查看详情
    seeTitle(scope, index) {
      this.dialogTableVisible = true;
      this.resumeId = scope.row.source_resume_id;
      this.loading = true;
      let option = new URLSearchParams();
      option.append("source_resume_id", scope.row.source_resume_id);
      option.append("session_key", this.session_key);
      this.$http({
        method: "post",
        url: "hr24/show_public_resume_detail/",
        data: option
      }).then(res => {
        if (res.data.status == 1) {
          this.loading = false;
          let dataJd = JSON.parse(res.data.data);
          this.showPublic = dataJd;

          if (this.showPublic[0].work_exp.length == 0) {
            this.expShow = false;
          } else {
            this.expShow = true;
          }
          if (this.showPublic[0].graduate_school == "") {
            this.shcoolShow = false;
          } else {
            this.shcoolShow = true;
          }
          // 获取用户剩余点数
          let option = new URLSearchParams();
          option.append("session_key", this.session_key);
          this.$http({
            method: "post",
            url: "hr24/show_remnant_point/",
            data: option
          })
            .then(res => {
              if (res.data.status == 1) {
                this.currentPoint = res.data.data;
              } else {
                this.$message({
                  showClose: true,
                  message: "剩余点数更新失败，请刷新重试",
                  type: "error"
                });
              }
            })
            .catch(err => {
              console.log(err, "加载点数失败");
            });
        }
      });
    },
    changeValue1(event, val) {
      this.options.forEach(item => {
        if (item.project_name == event) {
          this.rpoId = item.id;
        }
      });
    },
    // 导入58链接
    ImportUrl() {
      
      if (this.inputUrl == "") {
        this.$message({
          showClose: true,
          message: "简历链接不能为空！！！",
          type: "error"
        });
      } else {
        let option = new URLSearchParams();
        option.append("resume_url", this.inputUrl);
        option.append("session_key", this.session_key);
        this.$http({
          method: "post",
          url: "hr24/rpo_create_resume/",
          data: option
        })
          .then(res => {
            if (res.data.status == 1) {
              this.messageJd = res.data.message;
              this.ImportJd = true;
              this.inputUrl = "";
              let option = new URLSearchParams();
              option.append("age", this.str3);
              option.append("age1", this.str4);
              option.append("sex", this.radio1);
              option.append("edu", this.radio2);
              option.append("place_content", this.str1);
              option.append("position_content", this.str2);
              option.append("page", 0);
              option.append("rpo_name", this.value);
              option.append("session_key", this.session_key);
              option.append("resume_name", this.inputName);
              this.$http({
                method: "post",
                url: "hr24/show_public_resume/",
                data: option
              })
                .then(res => {
                  if (res.data.data != "[]") {
                    this.shoppJd = true;
                    this.jdShow = false;
                    let dataJd = res.data.data;
                    this.shopDate = dataJd;
                    this.totalCount = dataJd[0].count;
                    this.shopNumCount = dataJd[0].resume_count;
                    
                  } else {
                    this.$message({
                      showClose: true,
                      message: "暂无数据，请重新筛选",
                      type: "error"
                    });
                  }
                })
                .catch(err => {
                  this.$message({
                    showClose: true,
                    message: "网络异常，请刷新重试！",
                    type: "error"
                  });
                  console.log(err);
                });
            } else if (res.data.status == -1) {
              this.$message({
                showClose: true,
                message: "导入简历失败，简历库中已存在这份简历了",
                type: "error"
              });
              this.messageJd = res.data.message;
              this.ImportJd = true;
            }else if(res.data.status == -3){
                this.$message({
                showClose: true,
                message: "网络错误，请重新点击导入简历",
                type: "error"
              });
            }
          })
          .catch(err => {
            this.$message({
              showClose: true,
              message: "网络异常，请刷新重试！",
              type: "error"
            });
          });
      }
    },
    // 筛选姓名
    ImportName() {
      this.inputTrue = true;
      console.log(typeof this.inputName);
      this.dataList(0);
    }
  },
  mounted() {
    // 获取用户ID
    let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

    this.agentId = userInfo.data.data.agent_id;
    this.session_key = userInfo.data.data.session_key;
    let uerId = userInfo.data.data.user_type;

    let formData = new URLSearchParams();
    formData.append("agent_id", this.agentId);
    formData.append("session_key", this.session_key);

    // 展示公海简历筛选项目名称
    this.$http({
      method: "post",
      url: "hr24/show_project_name/",
      data: formData
    }).then(res => {
      let dataJd = JSON.parse(res.data.data);
      dataJd.forEach(item => {
        if (item.is_used == 0) {
          this.options.push(item);
        }
      });
    });
  }
};
</script>
<style scoped>
h4 {
  cursor: pointer;
}
.show2 .el-input {
  width: 130px;
}
.demo-input-suffix {
  margin-top: 20px;
  margin-left: 43%;
}
.show2 .el-button {
  margin-left: 45%;
  margin-top: 20px;
  height: 25px;
  padding: 0;
  width: 130px;
}
.show2 .el-input__inner {
  padding-right: 0;
}
.el-input__suffix {
  right: 0;
}
.title {
  display: flex;
  justify-content: space-between;
}
.title .svg-icon {
  width: 3em;
  height: 2.5em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.iconSup {
  margin-top: 10px;
  margin-right: 35px;
  position: relative;
  cursor: pointer;
}
.iconSup .iconNumber {
  display: inline-block;
  width: 25px;
  height: 25px;
  background: red;
  color: #fff;
  border-radius: 17px;
  font-size: 14px;
  line-height: 25px;
  text-align: center;
  position: absolute;
  top: -8px;
  right: -11px;
}
.jdHead {
  width: 100%;
  display: flex;
  height: 154px;
}
.headLeft {
  width: 120px;
  margin-right: 20px;
}
.imgJd {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
.qiuJd {
  list-style: none;
}
.buttHand {
  display: flex;
  justify-content: space-between;
}
.Importstyle {
  width: 50%;
  margin: 0 auto;
}
</style>

<template>
  <div class="boxUser" v-if="saleShow">
    <h4>
      <img src="../../assets/404_images/gonghai.png" style="margin-right: 10px;" />
      客户公海
    </h4>
    <div class="buttonGh">
      <el-button
        type="success"
        round
        icon="el-icon-search"
        style="margin-left: 10px;"
        @click="seahShow1"
      >点击展开筛选</el-button>
      <el-button type="danger" round @click="addMyUers">添加至我的客户（{{userNum}}）</el-button>
      <el-button type="warning" round @click="addWork">添加至基础工作中（{{userNum}}）</el-button>
    </div>
    <div class="seah" v-if="seahShow">
      <div>
        <span>客户类型：</span>
        <el-radio-group v-model="radio1" size="medium" @change="radioGrou">
          <el-radio-button label="不限"></el-radio-button>
          <el-radio-button label="A类客户"></el-radio-button>
          <el-radio-button label="B类客户"></el-radio-button>
          <el-radio-button label="C类客户"></el-radio-button>
          <el-radio-button label="D未标记"></el-radio-button>
        </el-radio-group>
      </div>
      <div>
        <span>客户来源：</span>
        <el-radio-group v-model="radio2" size="medium" @change="radioGrou">
          <el-radio-button label="不限"></el-radio-button>
          <el-radio-button label="企查查"></el-radio-button>
          <el-radio-button label="天眼查"></el-radio-button>
          <el-radio-button label="BOSS直聘"></el-radio-button>
          <el-radio-button label="其他"></el-radio-button>
        </el-radio-group>
      </div>
      <div>
        <span>客户状态：</span>
        <el-radio-group v-model="radio3" size="medium" @change="radioGrou">
          <el-radio-button label="不限"></el-radio-button>
          <el-radio-button label="0-暂未联系"></el-radio-button>
          <el-radio-button label="1-电话"></el-radio-button>
          <el-radio-button label="2-微信"></el-radio-button>
          <el-radio-button label="3-拜访"></el-radio-button>
          <el-radio-button label="4-需求"></el-radio-button>
          <el-radio-button label="5-报价"></el-radio-button>
        </el-radio-group>
      </div>
      <div>
        <span>客户行业：</span>
        <el-radio-group v-model="radio4" size="medium" @change="radioGrou">
          <el-radio-button label="不限"></el-radio-button>
          <el-radio-button label="房产"></el-radio-button>
          <el-radio-button label="保险"></el-radio-button>
          <el-radio-button label="教育"></el-radio-button>
        </el-radio-group>
      </div>
      <div>
        <span>创建时间：</span>
        <el-radio-group v-model="radio5" size="medium" @change="radioGrou">
          <el-radio-button label="不限"></el-radio-button>
          <el-radio-button label="昨天"></el-radio-button>
          <el-radio-button label="今天"></el-radio-button>
          <el-radio-button label="最近一周"></el-radio-button>
          <el-radio-button label="自定义"></el-radio-button>
        </el-radio-group>
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="margin:0;position: absolute;margin-left:10px"
          @change="dataChang"
          v-if="dataShow"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </div>
      <div v-if="user_type==5||user_type==7">
        <span>成交类型：</span>
        <el-radio-group v-model="radio6" size="medium" @change="radioGrou">
          <el-radio-button label="不限"></el-radio-button>
          <el-radio-button label="1">已成交</el-radio-button>
          <el-radio-button label="0">未成交</el-radio-button>
        </el-radio-group>
      </div>
      <div>
        <el-input v-model="radio7" placeholder="关键字搜索，请输入相关关键字" style="width:300px"></el-input>
        <el-button @click="sureSou">确定搜索</el-button>
        <span style="color:red">（只能搜索公司名称丶客户姓名丶客户联系方式及最近跟进人）</span>
      </div>
    </div>

    <el-table
      :data="tableData"
      border
      style="width: 100%;cursor:pointer"
      highlight-current-row
      @row-click="handleChange"
      @selection-change="handleSelectionChange"
      v-loading="loadingTelt"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="company_city" label="所属城市" align="center"></el-table-column>
      <el-table-column prop="company_name" label="所属公司" align="center"></el-table-column>
      <el-table-column prop="contacts_title" label="公司职位" align="center"></el-table-column>
      <el-table-column prop="contacts" label="客户姓名" align="center"></el-table-column>
      <el-table-column prop="contacts_phone" label="联系方式" align="center"></el-table-column>
      <el-table-column prop="create_time" label="创建时间" align="center"></el-table-column>
      <el-table-column prop="source_from" label="客户来源" align="center"></el-table-column>
      <el-table-column prop="company_industry" label="客户行业" align="center"></el-table-column>
      <el-table-column prop="follow_product" label="沟通套餐" align="center"></el-table-column>
      <el-table-column prop="customer_status" label="客户状态" align="center"></el-table-column>
      <el-table-column prop="last_follow_content" label="沟通备注" align="center">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="light"
            :content="scope.row.last_follow_content"
            placement="top"
          >
            <span class="lastFoww">{{scope.row.last_follow_content}}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="customer_class" label="客户类型" align="center"></el-table-column>

      <el-table-column label="最近跟进时间" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.last_follow_time==null?`无`:scope.row.last_follow_time}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="follow_person" label="最近跟进人" align="center"></el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      @prev-click="prevClick"
      @next-click="nextClick"
      :current-page="currentPage"
      :page-size="50"
      background
      :total="totalNmb"
      layout="total, prev, pager, next"
      style="text-align: center;margin-top:10px"
    ></el-pagination>
    <el-dialog title="客户详情" :visible.sync="centerDialogVisible" width="46%" center>
      <el-form label-position="left" inline class="demo-table-expand formBottom" :model="userXq">
        <el-form-item label="所属公司：">
          <span>{{userXq.company_name}}</span>
        </el-form-item>
        <el-form-item label="所属城市：">
          <span>{{userXq.company_city}}</span>
        </el-form-item>
        <el-form-item label="公司地址：">
          <el-tooltip class="item" effect="dark" :content="userXq.company_address">
            <span>{{userXq.company_address}}</span>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="公司职位：">
          <span>{{userXq.contacts_title}}</span>
        </el-form-item>
        <el-form-item label="客户姓名：">
          <span>{{userXq.contacts}}</span>
        </el-form-item>
        <el-form-item label="联系电话：">
          <span>{{userXq.contacts_phone}}</span>
        </el-form-item>
        <el-form-item label="联系邮箱：">
          <span>{{userXq.company_email}}</span>
        </el-form-item>
        <el-form-item label="联系QQ：">
          <span>{{userXq.qq_id==null?`无`:userXq.qq_id}}</span>
        </el-form-item>
        <el-form-item label="联系微信：">
          <span>{{userXq.wx_id==null?`无`:userXq.wx_id}}</span>
        </el-form-item>
        <el-form-item label="客户行业：">
          <span>{{userXq.company_industry}}</span>
        </el-form-item>
        <el-form-item label="客户来源：">
          <span>{{userXq.source_from}}</span>
        </el-form-item>
        <el-form-item label="沟通套餐：">
          <span>{{userXq.follow_product}}</span>
        </el-form-item>
        <el-form-item label="客户状态：">
          <span>{{userXq.customer_status}}</span>
        </el-form-item>
        <el-form-item label="客户类别：">
          <span>{{userXq.customer_class}}</span>
        </el-form-item>
        <el-form-item label="最近跟进时间：">
          <span>{{userXq.last_follow_time==null?`无`:userXq.last_follow_time}}</span>
        </el-form-item>
        <el-form-item label="最近跟进人：">
          <span>{{userXq.follow_person}}</span>
        </el-form-item>
        <el-form-item label="释放时间：">
          <span>{{userXq.to_public_time}}</span>
        </el-form-item>
         <el-form-item label="沟通备注：">
           <el-tooltip
            class="item"
            effect="light"
            :content="userXq.last_follow_content"
            placement="top"
          >
            <span class="lastFoww">{{userXq.last_follow_content}}</span>
          </el-tooltip>
        </el-form-item>
      </el-form>
      <div class="Follow">
        <h3>跟进记录</h3>
        <p v-if="FollowUp" style="text-align:center">暂无跟进记录</p>
        <div
          class="fullowP"
          style="background:#FAFAFA;margin-top:10px"
          v-else
          v-for="(item,index) in this.followRecord"
          :key="index"
        >
          <div class="timeClass">
            <span style="color:#22A4FF;margin-left:15px">{{item.create_time}}</span>
            <span>工单类型：{{item.follow_class}}</span>
          </div>
          <p>跟进人姓名：{{item.sale_person__user_name}}</p>
          <p>跟进状态：{{item.follow_status}}</p>
          <p>跟进类别：{{item.follow_customer_class}}</p>
          <p>跟进内容：{{item.follow_content}}</p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer"></span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userNum: 0,
      totalNmb: 0,
      loadingTelt: true,
      seahShow: false,
      dataShow: false,
      saleShow: true,
      user_type: "",
      value1: "",
      currentPage: 1,
      radio1: "不限",
      radio2: "不限",
      radio3: "不限",
      radio4: "不限",
      radio5: "不限",
      radio6: "不限",
      radio7: "",
      userXq: {},
      FollowXq: [],
      followRecord: [],
      radio55: [],
      FollowUp: false,
      agent_id: "",
      user_id: "",
      centerDialogVisible: false,
      tableData: [],
      userId: [],
      session_key: ""
    };
  },
  methods: {
    // 添加到我的客户
    addMyUers() {
      if (this.userNum != 0) {
        let option = new URLSearchParams();

        option.append("customer_id", this.userId);
        option.append("session_key", this.session_key);
        this.$http({
          method: "post",
          url: "hr24/add_customer_to_sale/",
          data: option
        }).then(res => {
          if (res.data.status == 1) {
            this.dataUser(
              0,
              this.radio1,
              this.radio2,
              this.radio3,
              this.radio4,
              this.radio5,
              this.radio6
            );
            this.$message({
              showClose: true,
              message: "已成功添加到我的客户",
              type: "success"
            });
          }
        });
      } else {
        this.$message({
          showClose: true,
          message: "请至少选择一项添加",
          type: "error"
        });
      }
    },
    //查看详情
    handleChange(val) {
      let option = new URLSearchParams();
      option.append("agent_id", this.agent_id);
      option.append("customer_id", val.id);

      option.append("session_key", this.session_key);
      this.$http({
        method: "post",
        url: "hr24/public_customer_info/",
        data: option
      })
        .then(res => {
          if (res.data.status == 1) {
            let dataJd = res.data.data;
            this.userXq = dataJd.customer_info[0];

            this.centerDialogVisible = true;
            if (dataJd.follow_record.length == 0) {
              this.FollowUp = true;
            } else {
              this.FollowXq = dataJd.follow_record[0];
              this.followRecord = res.data.data.follow_record;
            }
          } else {
            this.$message({
              showClose: true,
              message: res.data.data,
              type: "error"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 选择客户
    handleSelectionChange(val) {
      this.userNum = val.length;
      let id = [];
      val.forEach(item => {
        id.push(item.id);
        this.userId = id;
      });
    },
    // 获取筛选条件
    radioGrou() {
      let date = new Date();
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let d1 = d;
      if (this.radio5 == "昨天") {
        d = d - 1;
        d1 = d;
      } else if (this.radio5 == "最近一周") {
        d1 = d - 7;
      }
      let time1 = y + "-" + m + "-" + d;
      let time2 = y + "-" + m + "-" + d1;
      let timeNOw = [];
      timeNOw[0] = time2;
      timeNOw[1] = time1;
      if (this.radio5 != "不限") {
        this.radio55 = timeNOw;
      } else {
        this.radio55 = this.radio5;
      }
      if (this.radio5 == "自定义") {
        this.dataShow = true;
      } else {
        this.dataShow = false;
        this.value1 = "";
      }

      if (this.radio5 != "自定义") {
        this.dataUser(
          0,
          this.radio1,
          this.radio2,
          this.radio3,
          this.radio4,
          this.radio55,
          this.radio6
        );
      }
    },
    // 日期改变的时候
    dataChang() {
      this.dataUser(
        0,
        this.radio1,
        this.radio2,
        this.radio3,
        this.radio4,
        this.value1,
        this.radio6
      );
    },
    // 请求数据
    dataUser(page, radio1, radio2, radio3, radio4, radio5, radio6) {
      let option = new URLSearchParams();
      option.append("agent_id", this.agent_id);
      option.append("page", page);
      option.append("customer_class", radio1);
      option.append("source_from", radio2);
      option.append("customer_status", radio3);
      option.append("company_industry", radio4);
      option.append("create_time__range", radio5);
      option.append("is_deal", radio6);

      option.append("search_keyword", this.radio7 == "" ? `不限` : this.radio7);
      option.append("session_key", this.session_key);
      this.$http({
        method: "post",
        url: "hr24/public_customer_poll/",
        data: option
      })
        .then(res => {
          this.loadingTelt = false;
          this.tableData = res.data.data.customer_list;
          this.totalNmb = res.data.data.customer_count;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 搜索关键词

    sureSou() {
      this.dataUser(
        0,
        this.radio1,
        this.radio2,
        this.radio3,
        this.radio4,
        this.radio55 && this.radio5 != `自定义` ? this.radio5 : this.value1,
        this.radio6
      );
    },
    // 页码改变时
    handleCurrentChange(currentPage) {
      this.dataUser(
        currentPage - 1,
        this.radio1,
        this.radio2,
        this.radio3,
        this.radio4,
        this.radio55 && this.radio5 != `自定义` ? this.radio5 : this.value1,
        this.radio6
      );
      this.currentPage = currentPage;
    },
    // 上一页
    prevClick(val) {
      this.dataUser(
        val - 1,
        this.radio1,
        this.radio2,
        this.radio3,
        this.radio4,
        this.radio55 && this.radio5 != `自定义` ? this.radio5 : this.value1,
        this.radio6
      );
    },
    // 下一页
    nextClick(val) {
      this.dataUser(
        val - 1,
        this.radio1,
        this.radio2,
        this.radio3,
        this.radio4,
        this.radio55 && this.radio5 != `自定义` ? this.radio5 : this.value1,
        this.radio6
      );
    },
    // 点开筛选
    seahShow1() {
      if (this.seahShow) {
        this.seahShow = false;
      } else {
        this.seahShow = true;
      }
    },
    // 添加到基础工作中
    addWork() {
      let option = new URLSearchParams();
      option.append("customer_id", this.userId);

      option.append("session_key", this.session_key);
      this.$http({
        method: "post",
        url: "hr24/public_customer_to_sale_base_work/",
        data: option
      }).then(res => {
        if (res.data.status == 1) {
          this.dataUser(
            0,
            this.radio1,
            this.radio2,
            this.radio3,
            this.radio4,
            this.radio5,
            this.radio6
          );
          this.$message({
            showClose: true,
            message: "已成功添加至基础工作中",
            type: "success"
          });
        }
      });
    }
  },
  mounted() {
    let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    this.agent_id = userInfo.data.data.agent_id;

    this.user_type = userInfo.data.data.user_type;
    this.session_key = userInfo.data.data.session_key;
    let option = new URLSearchParams();
    option.append("agent_id", this.agent_id);
    option.append("page", 0);
    option.append("is_deal", 0);

    option.append("search_keyword", "不限");
    option.append("session_key", this.session_key);
    this.$http({
      method: "post",
      url: "hr24/public_customer_poll/",
      data: option
    }).then(res => {
      this.loadingTelt = false;
      this.tableData = res.data.data.customer_list;

      this.totalNmb = res.data.data.customer_count;
    });
  }
};
</script>
<style scoped>
.boxUser {
  position: relative;
  overflow: hidden;
}
h4 {
  margin-top: 0;
  margin-left: 15px;
  display: flex;
  align-items: center;
}
.formBottom {
  border-bottom: 1px dashed #c6e4f1;
}
.seah div {
  margin-bottom: 15px;
  /* display: none; */
}
.el-date-editor /deep/.el-range-separator {
  width: 8%;
  line-height: 34px;
}
.el-form-item /deep/.el-form-item__content {
  width: 300px;
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.timeClass {
  margin-left: 30px;
  padding-top: 10px;
  font-size: 14px;
  width: 50%;
  text-align: center;
  display: flex;
  justify-content: space-between;
}
.timeClass span {
  font-size: 17px;
}
.fullowP p {
  margin-left: 65px;
}
.buttonGh {
  margin-bottom: 15px;
}
.lastFoww {
  width: 100px;
  overflow: hidden; /*超出部分隐藏*/
  text-overflow: ellipsis; /* 超出部分显示省略号 */
  white-space: nowrap; /*规定段落中的文本不进行换行 */
}
</style>
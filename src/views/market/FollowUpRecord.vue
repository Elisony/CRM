<template>
  <div v-if="saleShow">
    <h4>
      <img src="../../assets/404_images/genji.png" style="margin-right: 10px;" />跟进记录
    </h4>
    <div class="seah">
      <div style=" width: 60%">
        <span>客户经理：</span>
        <el-radio-group
          v-model="radio"
          size="medium"
          v-for="(item,index) in saleNamer"
          :key="index"
          @change="radioChange(item)"
        >
          <el-radio-button :label="item.user_name"></el-radio-button>
        </el-radio-group>
      </div>
      <div>
        <span>客户类型：</span>
        <el-radio-group v-model="radio1" size="medium" @change="radioGrou">
          <el-radio-button label="不限"></el-radio-button>
          <el-radio-button label="A-高意向"></el-radio-button>
          <el-radio-button label="B-中意向"></el-radio-button>
          <el-radio-button label="C-低意向"></el-radio-button>
          <el-radio-button label="D-暂无意向"></el-radio-button>
        </el-radio-group>
      </div>
      <div>
        <span>客户状态：</span>
        <el-radio-group v-model="radio2" size="medium" @change="radioGrou">
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
        <span>跟进时间：</span>
        <el-radio-group v-model="radio3" size="medium" @change="radioGrou">
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
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      v-loading="loadingTelt"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-table-column prop="create_time" label="跟单时间" align="center"></el-table-column>
      <el-table-column prop="customer__company_name" label="跟单公司" align="center"></el-table-column>
      <el-table-column prop="customer__contacts" label="客户姓名" align="center"></el-table-column>
      <el-table-column prop="follow_customer_class" label="客户意向" align="center"></el-table-column>
      <el-table-column prop="follow_status" label="客户状态" align="center"></el-table-column>
      <el-table-column prop="follow_content" label="跟单记录" align="center"></el-table-column>
      <el-table-column prop="next_follow_time" label="下次跟单时间" align="center"></el-table-column>
      <el-table-column prop="sale_person__user_name" label="跟单人员" align="center"></el-table-column>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      totalNmb: 0,
      saleNamer: [],
      currentPage: 0,
      loadingTelt: true,
      session_key:"",
      radio: "不限",
      radio1: "不限",
      radio2: "不限",
      radio3: "不限",
      value1: "",
      dataShow: false,
      saleShow: true,
      user_id: "",
      scId: 0
    };
  },
  methods: {
    // 请求数据
    followUp(page, followCustomer, followStatus, saleName, timeNow) {
      
      let option = new URLSearchParams();
    
      option.append("page", page);
      option.append("follow_customer_class", followCustomer);
      option.append("follow_status", followStatus);
      option.append("sale_person__user_name", saleName);
      option.append("create_time__range", timeNow);
      option.append("sale_person_id",this.scId);
       option.append("session_key",this.session_key)

      this.$http({
        method: "post",
        url: "hr24/follow_record_list/",
        data: option
      })
        .then(res => {
          if (res.data.status == 1) {
            this.loadingTelt = false;
            this.tableData = res.data.data.record_list;
            this.totalNmb = res.data.data.record_count;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 页码发生变化时
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.followUp(
        currentPage,
        this.radio1,
        this.radio2,
        this.radio,
        this.radio3
      );
    },
    // 上一页
    prevClick() {
      this.followUp(
        this.currentPage,
        this.radio1,
        this.radio2,
        this.radio,
        this.radio3
      );
    },
    // 下一页
    nextClick() {
      this.followUp(
        this.currentPage,
        this.radio1,
        this.radio2,
        this.radio,
        this.radio3
      );
    },
    radioChange(item) {
      this.scId = item.id;
      this.radio = item.user_name;
      this.followUp(
        this.currentPage,
        this.radio1,
        this.radio2,
        this.radio,
        this.radio3
      );
    },
    // 获取筛选条件
    radioGrou() {
      // 名字id
      let date = new Date();
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let d1 = d;
      if (this.radio3 == "昨天") {
        d = d - 1;
        d1 = d;
        let time2 = y + "-" + m + "-" + d1;
        let time1 = y + "-" + m + "-" + d;
        let timeNOw = [];
        timeNOw[0] = time2;
        timeNOw[1] = time1;
        this.followUp(
          this.currentPage,
          this.radio1,
          this.radio2,
          this.radio,
          timeNOw
        );
      } else if (this.radio3 == "最近一周") {
        d1 = d - 7;
        let time1 = y + "-" + m + "-" + d;
        let time2 = y + "-" + m + "-" + d1;
        let timeNOw = [];
        timeNOw[0] = time2;
        timeNOw[1] = time1;
     
        this.followUp(
          this.currentPage,
          this.radio1,
          this.radio2,
          this.radio,
          timeNOw
        );
      } else if (this.radio3 == "今天") {
        let d1 = d + 1;
        let time1 = y + "-" + m + "-" + d;
        let time2 = y + "-" + m + "-" + d1;
        let timeNOw = [];
        timeNOw[0] = time2;
        timeNOw[1] = time1;
        
        this.followUp(
          this.currentPage,
          this.radio1,
          this.radio2,
          this.radio,
          timeNOw
        );
      }

      // 时间区间

      if (this.radio3 == "自定义") {
        this.dataShow = true;
      } else {
        this.dataShow = false;
        this.value1 = "";
      }
      if (this.radio3 == "不限") {

        this.followUp(
          this.currentPage,
          this.radio1,
          this.radio2,
          this.radio,
          this.radio3
        );
      }
    },
    // 自定义日期
    dataChang() {
      this.followUp(
        this.currentPage,
        this.radio1,
        this.radio2,
        this.radio,
        this.value1
      );
    }
  },
  mounted() {
    let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    let user_type = userInfo.data.data.user_type;
    this.session_key=userInfo.data.data.session_key;
    let option = new URLSearchParams();
   
     option.append("session_key",this.session_key)
    this.$http({
      method: "post",
      url: "hr24/return_sale_person_list/",
      data: option
    }).then(res => {
      this.saleNamer = res.data.data.sale_person_list;
    });
    this.followUp(0,"不限", "不限", "不限", "不限");
  }
};
</script>

<style scoped>
h4 {
  margin-top: 0;
  margin-left: 15px;
  display: flex;
  align-items: center;
}
.seah div {
  margin-bottom: 15px;
  /* display: none; */
}
</style>
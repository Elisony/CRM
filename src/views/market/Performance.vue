<template>
  <div v-if="saleShow">
    <h4>
      <img src="../../assets/404_images/sale.png" style="margin-right: 10px;" />累积业绩
    </h4>
    <div class="sale_day">
      <div class="sale_month_sum">
        <h3>本月总成交：{{monthData==undefined?`0`:monthData.deal_count}}</h3>
        <h3>本月总业绩：{{monthData==undefined?`0`:monthData.deal_money}}</h3>
      </div>
      <div class="sale_day_sum">
        <h3>今日总成交：{{dayData.deal_count==``?`0`:dayData.deal_count}}</h3>
        <h3>今日总业绩：{{dayData.deal_money==``?`0`:dayData.deal_money}}</h3>
      </div>
    </div>
    <div class="seah">
      <el-date-picker
        v-model="value1"
        type="date"
        placeholder="选择日期"
        value-format="yyyy-MM-dd"
        @change="timeChang"
      ></el-date-picker>
    </div>
    <div class="seah" v-if="user_type==5||user_type==7" style="width:56%;margin:10px 0">
      <el-radio-group
        v-model="radio"
        size="medium"
        v-for="(item,index) in saleNamer"
        :key="index"
        @change="radioGrou(item.id)"
      >
        <el-radio-button :label="item.user_name"></el-radio-button>
      </el-radio-group>
    </div>
    <h3 style="text-align:center">历史成交记录</h3>
    <el-table :data="datList" border style="width: 100%;cursor: pointer;" @row-click="dataClick">
      <el-table-column prop="update_time" label="成交时间" align="center"></el-table-column>
      <el-table-column prop="customer__company_name" label="成交公司" align="center"></el-table-column>
      <el-table-column prop="customer__contacts" label="成交客户" align="center"></el-table-column>
      <el-table-column prop="customer__source_from" label="客户来源" align="center"></el-table-column>
      <el-table-column prop="deal_money" label="成交价格" align="center"></el-table-column>
      <el-table-column prop="sale_person__user_name" label="销售人员" align="center"></el-table-column>
    </el-table>
    <el-dialog title="客户详情" :visible.sync="CustomerDetails" width="46%" center class="diao" top="0">
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
          <span>{{userXq.company_email==null||userXq.company_email==``?`无`:userXq.company_email}}</span>
        </el-form-item>
        <el-form-item label="联系QQ：">
          <span>{{userXq.qq_id==null||userXq.qq_id==``?`无`:userXq.qq_id}}</span>
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
        <el-form-item label="跟进备注：">
          <span>{{userXq.last_follow_content}}</span>
        </el-form-item>
      </el-form>
      <p class="fullow">跟进记录</p>
      <div class="fullowP" v-for="(item,index) in followRecord" :key="index">
        <div class="timeClass">
          <span style="color:#22A4FF;">{{item.create_time}}</span>
          <span>工单类型：{{item.follow_class}}</span>
          <span style="color:red">下次跟进时间：{{item.next_follow_time}}</span>
        </div>
        <div class="timeP">
          <p>跟进人姓名：{{item.sale_person__user_name}}</p>
          <p>跟进状态：{{item.follow_status}}</p>
          <p>跟进类别：{{item.follow_customer_class}}</p>
          <p>跟进内容：{{item.follow_content}}</p>
        </div>
      </div>
      <el-pagination
        @current-change="handleCurrentChange1"
        :current-page="currentPage1"
        :page-size="3"
        background
        :total="conut1"
        layout="total, prev, pager, next"
        style="text-align: center;margin-top:10px"
      ></el-pagination>
    </el-dialog>
    <el-pagination
      @current-change="handleCurrentChange"
      @prev-click="prevClick"
      @next-click="nextClick"
      :current-page="currentPage"
      :page-size="50"
      background
      :total="conut"
      layout="total, prev, pager, next"
      style="text-align: center;margin-top:10px"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      saleShow: true,
      value1: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value2: "",
      session_key: "",
      monthData: {},
      dayData: {},
      datList: [],
      conut: 0,
      conut1:0,
      currentPage: 1,
      currentPage1:1,
      radio: "不限",
      saleNamer: [],
      saleId: "",
      user_type: "",
      CustomerDetails: false,
      userXq: {},
      followRecord: [],
      customerId:""
    };
  },
  methods: {
    achievement(dataTime, saleId,page) {
      let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

      let option = new URLSearchParams();
      console.log(page)
      option.append("date", dataTime);
      option.append("sale_person_id", saleId);
      option.append("session_key", this.session_key);
       option.append("page",page);
      this.$http({
        method: "post",
        url: "hr24/sale_person_performance/",
        data: option
      })
        .then(res => {
          console.log(res)
          if (res.data.status == 1) {
            this.monthData = res.data.data.sale_month_sum[0];
            this.dayData = res.data.data.sale_day_sum[0];
            this.datList = res.data.data.sale_deal_list;
            this.conut = res.data.data.sale_deal_list_count;
          }
        })
        .catch(err => {});
    },
    // 翻页改变
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    handleCurrentChange1(currentPage){
      this.dale_cutsimer(this.customerId,currentPage-1);
    },
    // 上一页
    prevClick() {
      console.log(this.currentPage);
    },
    // 下一页
    nextClick() {
      console.log(this.currentPage);
    },
    // 筛选
    radioGrou(id) {
      this.saleId = id;
      console.log(id, this.value1);
      this.achievement(this.value1,id,0);
    },
    // 时间筛选
    timeChang() {
      if(this.value1==null){
        this.value1=this.value2
      }
      console.log(this.value1)
      this.achievement(this.value1==null?this.value2:this.value1, this.saleId == "" ? "不限" : this.saleId,0);
    },
    // 客户详情
    dale_cutsimer(customer_id,page){
      console.log(page)
       let option = new URLSearchParams();
      option.append("customer_id",customer_id);
      option.append("session_key", this.session_key);
       option.append("page",page);
      this.$http({
        method: "post",
        url: "hr24/deal_customer_info/",
        data: option
      }).then(res => {
        if (res.data.status == 1) {
          console.log(res)
          this.CustomerDetails = true;
          this.userXq = res.data.data.customer_info[0];
          console.log(res.data.data.customer_info);
          this.followRecord = res.data.data.follow_record;
          this.conut1=res.data.data.follow_record_count
        } else {
          this.$message({
            showClose: true,
            message: res.data.data,
            type: "error"
          });
        }
      });
    },
    // 点击某一行客户详情
    dataClick(row) {
      console.log(row);
      this.customerId=row.customer_id
     this.dale_cutsimer(row.customer_id,0)
    },
    
  },
  mounted() {
    let date = new Date();
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? "0" + m : m;
    let d = date.getDate();
    d = d < 10 ? "0" + d : d;
    let time1 = y + "-" + m + "-" + d;
    this.value1 = time1;
    this.value2=time1
    let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    this.user_type = userInfo.data.data.user_type;
    this.session_key = userInfo.data.data.session_key;

    this.achievement(time1, this.radio,0);
    if (this.user_type == 7 || this.user_type == 5) {
      let option = new URLSearchParams();
      option.append("session_key", this.session_key);
      this.$http({
        method: "post",
        url: "hr24/return_sale_person_list/",
        data: option
      }).then(res => {
        this.saleNamer = res.data.data.sale_person_list;
      });
    }
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
.el-date-editor /deep/.el-range-separator {
  width: 7%;
}
.sale_day {
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.sale_day h3 {
  text-align: center;
  color: azure;
}
.sale_day h5 {
  text-align: center;
  color: azure;
}
.sale_month_sum,
.sale_day_sum {
  width: 15%;
  height: 100px;
}
.sale_month_sum {
  background: #fb5a58;
  border-radius: 10px;
}
.sale_day_sum {
  background: #f89a1e;
  border-radius: 10px;
}
.fullow {
  font-size: 18px;
  text-align: center;
  margin-bottom: 10px;
}
.fullowP {
  width: 100%;
  background: #fafafa;
  margin-top: 15px;
}
</style>
<template>
  <div v-if="saleShow">
    <div v-show="show" class="show1">
      <div class="transition-box tranBox" v-loading="loadddd" element-loading-text="拼命加载中">
        <h3 style="text-align: center">请选择需要查看合同的城市</h3>
        <div
          v-for="(item,index) in bthCity"
          :key="index"
          @click="bthCityOne(index)"
          class="cityBix"
        >
          <el-badge :value="item.count" class="item" :max="99" v-if="item.count!=0">
            <el-button type="primary" class="cityBth" size="medium" :loading="loading">{{item.name}}</el-button>
          </el-badge>
          <el-button v-else type="primary" class="cityBth" size="medium" :loading="loading">{{item.name}}</el-button>
        </div>
      </div>
    </div>
    <div v-show="show1">
      <h4>
        <img src="../../assets/404_images/hehuoren.png" style="margin-right: 10px;" />合同管理
      </h4>
      <el-button type="info" @click="returnCity">
        <i class="el-icon-refresh-left"></i>返回重新选择城市
      </el-button>
      <div style="margin:15px 0">
        <el-button type="danger" @click="confirmContractNo" round :disabled="contYes">未确认合同</el-button>
        <el-button type="success" @click="confirmContractYes" round :disabled="contNo">已确认合同</el-button>
      </div>
      <el-table
        :data="contData"
        border
        style="width: 100%;cursor:pointer"
        highlight-current-row
        @row-click="handClick"
        class="formBottom"
      >
        <el-table-column prop="create_time" label="创建时间" align="center"></el-table-column>
        <el-table-column prop="customer__company_name" label="公司名称" align="center"></el-table-column>
        <el-table-column prop="customer__contacts" label="客户姓名" align="center"></el-table-column>
        <el-table-column prop="opened_account" label="开通帐号" align="center"></el-table-column>
        <el-table-column prop="deal_product" label="合同套餐" align="center"></el-table-column>
        <el-table-column prop="money_back" label="回款金额" align="center"></el-table-column>
        <el-table-column prop="contract_content" label="合同备注" align="center"></el-table-column>
        <el-table-column prop="is_renew" label="客户类型" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.is_renew==0?`新用户`:`续费用户`}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sale_person__user_name" label="提单人员" align="center"></el-table-column>
        <el-table-column prop="sale_person__agent__agent_city" label="提单城市" align="center"></el-table-column>
        <el-table-column label="确认时间" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.is_money_back==0?`未确认合同`:scope.row.update_time}}</span>
          </template>
        </el-table-column>
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
      <el-dialog title="合同详情" :visible.sync="centerDialogVisible" width="40%" center top="5vh">
        <el-form label-position="left" inline class="demo-table-expand" :model="contractData">
          <el-form-item label="创建时间：" prop="deal_product">
            <span>{{contractData.create_time}}</span>
          </el-form-item>
          <el-form-item label="公司名称：" prop="money_back">
            <span>{{contractData.customer__company_name}}</span>
          </el-form-item>
          <el-form-item label="客户姓名：" prop="opened_account">
            <span>{{contractData.customer__contacts}}</span>
          </el-form-item>
          <el-form-item label="开通帐号：" prop="contract_content">
            <span>{{contractData.opened_account}}</span>
          </el-form-item>
          <el-form-item label="合同套餐：" prop="deal_product">
            <span>{{contractData.deal_product}}</span>
          </el-form-item>
          <el-form-item label="回款金额：" prop="money_back">
            <span>{{contractData.money_back}}</span>
          </el-form-item>
          <el-form-item label="合同备注：" prop="opened_account">
            <span>{{contractData.contract_content}}</span>
          </el-form-item>
          <el-form-item label="客户类型：" prop="contract_content">
            <span>{{contractData.is_renew==0?`新用户`:`续费用户`}}</span>
          </el-form-item>
          <el-form-item label="提单人员：" prop="opened_account">
            <span>{{contractData.sale_person__user_name}}</span>
          </el-form-item>
          <el-form-item label="提单城市：" prop="contract_content">
            <span>{{contractData.sale_person__agent__agent_city}}</span>
          </el-form-item>
          <el-form-item label="确认时间：" prop="contract_content">
            <span>{{contractData.is_money_back==0?`未确认合同`:contractData.update_time}}</span>
          </el-form-item>
        </el-form>
        <h3>合同图片：</h3>
        <viewer :images="this.contractData.contract_img_url">
          <img
            v-for="src in this.contractData.contract_img_url"
            :src="src"
            :key="src"
            width="150"
            height="150px"
          />
        </viewer>
        <h3>回款图片：</h3>
        <viewer :images="this.contractData.money_back_img_url" class="view">
          <img
            v-for="src in this.contractData.money_back_img_url"
            :src="src"
            :key="src"
            width="150"
            height="150px"
          />
        </viewer>
        <span slot="footer" class="dialog-footer" v-if="!contNo">
          <el-button type="primary" @click="confirmSure">确认合同</el-button>
          <el-button type="danger" @click="refuse">拒绝合同</el-button>
        </span>
        <el-dialog width="30%" title="拒绝理由" :visible.sync="innerVisible" append-to-body>
          <el-input type="textarea" :rows="2" placeholder="请必须输入拒绝理由" v-model="textarea"></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="refuseData">拒绝合同并提交拒绝理由</el-button>
          </span>
        </el-dialog>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contData: [],
      bthCity: [],
      currentPage: 1,
      totalNmb: 1,
      textarea: "",
      centerDialogVisible: false,
      innerVisible: false,
      contractData: {},
      dealId: 0,
      contNo: false,
      contYes: true,
      loading: false,
      user_id: "",
      show: true,
      saleShow: true,
      show1: false,
      loadddd: false,
      city: ""
    };
  },
  methods: {
    // 点击城市
    bthCityOne(index) {
      this.loading = true;
      this.confirmData(0, 0, this.bthCity[index].name);
      this.city = this.bthCity[index].name;
    },
    returnCity() {
      this.show = true;
      this.show1 = false;
      let option = new URLSearchParams();
     
       option.append("session_key",this.session_key)
      this.$http({
        method: "post",
        url: "hr24/to_be_processed_deal/",
        data: option
      }).then(res => {
        this.bthCity = res.data.data.count;
        if (res.data.status == -3) {
          this.$message({
            showClose: true,
            message: res.data.data,
            type: "error"
          });
        }
      });
    },
    handClick(row) {
      this.dealId = row.id;
      let option = new URLSearchParams();
     
      option.append("deal_id", row.id);
       option.append("session_key",this.session_key)
      this.$http({
        method: "post",
        url: "hr24/get_deal_info/",
        data: option
      }).then(res => {
        this.contractData = res.data.data.deal_info[0];
        this.centerDialogVisible = true;
      });
    },
    // 确认合同
    confirm(number, checkRemarks) {
      let option = new URLSearchParams();
      
      option.append("deal_id", this.dealId);
      option.append("is_success", number);
       option.append("session_key",this.session_key)
      option.append("check_remarks", checkRemarks);
      this.$http({
        method: "post",
        url: "hr24/check_deal/",
        data: option
      }).then(res => {
        if (res.data.status == 1) {
          
          this.$message({
            showClose: true,
            message: res.data.data,
            type: "success"
          });
          this.confirmData(0, this.currentPage - 1, this.city);
          this.textarea = "";
          this.innerVisible = false;
          this.centerDialogVisible = false;
        } else if (res.data.status == -3) {
          this.$message({
            showClose: true,
            message: res.data.data,
            type: "error"
          });
        }
      });
    },
    // 确认合同
    confirmSure() {
      this.confirm(1);
    },
    confirmData(isDeal, page, filters) {
      let option = new URLSearchParams();
      
      option.append("is_deal", isDeal);
      option.append("page", page);
      option.append("filters", filters);
       option.append("session_key",this.session_key)
      this.$http({
        method: "post",
        url: "hr24/get_deal_list/",
        data: option
      }).then(res => {
        this.loading = false;
        this.contData = res.data.data.deal_list;
        this.totalNmb = res.data.data.deal_count;
        this.show = false;
        this.show1 = true;
      });
    },
    // 已确认合同
    confirmContractYes() {
      this.confirmData(1, this.currentPage - 1, this.city);
      this.contYes = false;
      this.contNo = true;
    },
    // 未确认合同
    confirmContractNo() {
      this.confirmData(0, this.currentPage - 1, this.city);
      this.contYes = true;
      this.contNo = false;
    },
    // 页码发生变化时
    handleCurrentChange(currentPage) {
      this.confirmData(0, currentPage, this.bthCity[index].name);
    },
    prevClick() {
      this.confirmData(0, this.currentPage - 1, this.bthCity[index].name);
    },
    nextClick() {
      this.confirmData(0, this.currentPage, this.bthCity[index].name);
    },
    // 拒绝合同
    refuse() {
      this.innerVisible = true;
    },
    // 提交拒绝理由
    refuseData() {
      if (this.textarea == "") {
        this.$message({
          showClose: true,
          message: "必须填写拒绝理由否则不予提交！！！",
          type: "error"
        });
      } else {
        this.confirm(0, this.textarea);
      }
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
      url: "hr24/to_be_processed_deal/",
      data: option
    }).then(res => {
      this.bthCity = res.data.data.count;
      if (res.data.status == -3) {
        this.$message({
          showClose: true,
          message: res.data.data,
          type: "error"
        });
      }
    });
  },
  watch:{
    "$store.state.storer.count":function(){
      this.confirmData(0, this.currentPage - 1, this.city);
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
.show1 .el-button {
  height: 35px;
  padding: 0;
  width: 100px;
}
.cityBix {
  width: 150px;
  display: inline-block;
  text-align: center;
  margin-top: 30px;
}
.tranBox {
  width: 800px;
  margin: 0 auto;
}
.view {
  position: relative;
}
</style>
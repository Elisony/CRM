<template>
  <div v-if="saleShow">
    <div class="teble">
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        :rules="rules"
        ref="ruleForm"
      >
        <el-form-item label="公司名称" prop="company_name">
          <el-input v-model="formInline.company_name" placeholder="公司名称"></el-input>
        </el-form-item>
        <el-form-item label="客户姓名" prop="contacts">
          <el-input v-model="formInline.contacts" placeholder="客户姓名"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="contacts_phone">
          <el-input v-model="formInline.contacts_phone" placeholder="联系方式"></el-input>
        </el-form-item>
        <el-form-item label="公司职位" prop="contacts_title">
          <el-input v-model="formInline.contacts_title" placeholder="公司职位"></el-input>
        </el-form-item>
        <el-form-item label="所属行业" prop="company_industry">
          <el-input v-model="formInline.company_industry" placeholder="所属行业"></el-input>
        </el-form-item>
        <el-form-item label="客户来源" prop="source_from">
          <el-input v-model="formInline.source_from" placeholder="客户来源"></el-input>
        </el-form-item>
        <el-form-item label="沟通状态" prop="customer_status">
          <el-select
            v-model="formInline.customer_status"
            placeholder="请选择沟通状态"
            style="width: 185px;"
          >
            <el-option label="已接通" value="已接通"></el-option>
            <el-option label="未接通" value="未接通"></el-option>
            <el-option label="已挂断" value="已挂断"></el-option>
            <el-option label="不考虑" value="不考虑"></el-option>
            <el-option label="号码无效" value="号码无效"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户类别" prop="customer_class" style="margin-right: 20px">
          <el-select
            v-model="formInline.customer_class"
            placeholder="请选择客户类别"
            style="width: 185px;"
          >
            <el-option label="A类客户" value="A类客户"></el-option>
            <el-option label="B类客户" value="B类客户"></el-option>
            <el-option label="C类客户" value="C类客户"></el-option>
            <el-option label="D未标记" value="D未标记"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="沟通备注">
          <el-input v-model="connectRemarks" placeholder="沟通备注必填"></el-input>
        </el-form-item>
        <el-form-item label="公司地址" style="margin-right: 20px;margin-left:10px">
          <el-input v-model="formInline.company_address" placeholder="公司地址"></el-input>
        </el-form-item>

        <el-form-item label="联系微信">
          <el-input v-model="formInline.wx_id" placeholder="联系微信"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="addUser">
      <el-button type="success" @click="onSubmit('ruleForm')">新增客户</el-button>
    </div>
    <div style="display: flex;justify-content:space-between;">
      <div v-if="user_type==5||user_type==7" v-loading="loading" class="radioGroup">
        <span>筛选销售人员：</span>
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
      <div style="height:40px; line-height: 40px">
        <strong>{{radio=="不限"?`全部`:radio}}总计通话量:</strong>
        <span style="color:red;">&nbsp;&nbsp;{{salePersonConut}}</span>
      </div>
      <el-button @click="addCustomer" type="warning" round style="height:40px">添加至我的客户（{{addName}}）</el-button>
    </div>
    <el-date-picker
    v-if="user_type==5||user_type==7"
      @change="SxTime"
      value-format="yyyy-MM-dd"
      v-model="valueTime"
      type="date"
      placeholder="选择日期"
      style="display:block;margin-top:10px"
    ></el-date-picker>
    <el-radio-group v-model="radioPhone" @change="state" style="margin:10px 0;">
      <el-radio-button label="不限"></el-radio-button>
      <el-radio-button label="未拨打"></el-radio-button>
      <el-radio-button label="已接通"></el-radio-button>
      <el-radio-button label="未接通"></el-radio-button>
      <el-radio-button label="已挂断"></el-radio-button>
      <el-radio-button label="不考虑"></el-radio-button>
      <el-radio-button label="无效号码"></el-radio-button>
    </el-radio-group>

    <el-table
      :data="tableData"
      border
      style="width: 100%;cursor: pointer;"
      @row-click="handClick"
      @selection-change="handleSelectionChange"
      v-loading="loadingTable"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="company_name" label="公司名称" align="center"></el-table-column>
      <el-table-column prop="company_address" label="公司地址" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.company_address==""?`暂无地址`:scope.row.company_address}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="contacts" label="客户姓名" align="center"></el-table-column>
      <el-table-column prop="contacts_phone" label="联系方式" align="center"></el-table-column>
      <el-table-column prop="wx_id" label="联系微信" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.wx_id==null?`暂无微信`:scope.row.wx_id}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="contacts_title" label="公司职位" align="center"></el-table-column>
      <el-table-column prop="company_industry" label="所属行业" align="center"></el-table-column>
      <el-table-column prop="source_from" label="客户来源" align="center"></el-table-column>
      <el-table-column prop="customer_class" label="客户类别" align="center"></el-table-column>

      <el-table-column prop="connect_count" label="沟通次数" align="center"></el-table-column>
      <el-table-column label="沟通状态" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.connect_status==0" type="success">已接通</el-tag>
          <el-tag v-if="scope.row.connect_status==1" type="info">未接通</el-tag>
          <el-tag v-if="scope.row.connect_status==2" type="warning">已挂断</el-tag>
          <el-tag v-if="scope.row.connect_status==3">不考虑</el-tag>
          <el-tag v-if="scope.row.connect_status==4">无效号码</el-tag>
          <el-tag type="danger" v-if="scope.row.connect_status==-1">未拨打</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="sale_person__user_name" label="销售经理" align="center"></el-table-column>
      <el-table-column label="沟通备注" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.customer__last_follow_content==""?`暂无备注`:scope.row.customer__last_follow_content}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="connect_remarks" label="是否添加" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.is_add==0" type="success">未添加</el-tag>
          <el-tag v-else type="danger">已添加</el-tag>
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
    <div>
      <el-dialog title="确定客户" :visible.sync="addSh" width="46%" center>
        <el-form
          :inline="true"
          :model="oldFormInline"
          class="demo-form-inline"
          :rules="ruless"
          ref="ruleFormS"
        >
          <el-form-item label="公司名称" prop="company_name">
            <el-input v-model="oldFormInline.company_name" placeholder="公司名称"></el-input>
          </el-form-item>
          <el-form-item label="客户姓名" prop="contacts">
            <el-input v-model="oldFormInline.contacts" placeholder="客户姓名"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="contacts_phone">
            <el-input v-model="oldFormInline.contacts_phone" placeholder="联系方式"></el-input>
          </el-form-item>
          <el-form-item label="公司职位" prop="contacts_title">
            <el-input v-model="oldFormInline.contacts_title" placeholder="公司职位"></el-input>
          </el-form-item>
          <el-form-item label="所属行业" prop="company_industry">
            <el-input v-model="oldFormInline.company_industry" placeholder="所属行业"></el-input>
          </el-form-item>
          <el-form-item label="客户来源" prop="source_from">
            <el-input v-model="oldFormInline.source_from" placeholder="客户来源"></el-input>
          </el-form-item>
          <el-form-item label="沟通备注" prop="connect_remarks">
            <el-input v-model="oldFormInline.connect_remarks" placeholder="沟通备注"></el-input>
          </el-form-item>
          <el-form-item label="沟通状态" prop="customer_status">
            <el-select v-model="oldFormInline.customer_status" placeholder="请选择沟通状态">
              <el-option label="已接通" value="已接通"></el-option>
              <el-option label="未接通" value="未接通"></el-option>
              <el-option label="已挂断" value="已挂断"></el-option>
              <el-option label="不考虑" value="不考虑"></el-option>
              <el-option label="无效号码" value="无效号码"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="公司地址" style="margin-left:10px">
            <el-input v-model="oldFormInline.company_address" placeholder="公司地址"></el-input>
          </el-form-item>
          <el-form-item label="联系微信" style="margin-left:10px">
            <el-input v-model="oldFormInline.wx_id" placeholder="联系微信"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="success" @click="confirmAdd('ruleFormS')" style="margin-left: 45%;">确认沟通</el-button>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { createHash } from "crypto";
export default {
  data() {
    return {
      currentPage: 1,
      totalNmb: 0,
      user_type: "",
      addName: 0,
      radioPhone: "不限",
      id: "不限",
      
      customerId: [],
      saleNamer: [],
      formInline: {},
      oldFormInline: {},
      loading: true,
      loadingTable: true,
      customer_id: "",
      saleShow: true,
      valueTime: "",
      timeNow: "",
      salePersonConut: 0,
      idd: "",
      addSh: false,
      session_key: "",
      sbwId: [],
      connectRemarks: "",
      radio: "不限",
      sbw_id: "",
      tableData: [],
      rules: {
        company_name: [
          { required: true, message: "请输入公司名称", trigger: "blur" },
          {
            min: 3,
            max: 125,
            message: "长度在 3 到 125 个字符",
            trigger: "blur"
          }
        ],
        contacts: [
          { required: true, message: "请输入客户姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        contacts_phone: [
          { required: true, message: "请输入公司名称", trigger: "blur" },
          { min: 11, max: 11, message: "长度在11个字符", trigger: "blur" }
        ],
        contacts_title: [
          { required: true, message: "请输入公司职位", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" }
        ],
        company_industry: [
          { required: true, message: "请输入公司行业", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        source_from: [
          { required: true, message: "请输入客户来源", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        customer_status: [
          { required: true, message: "请选择沟通状态", trigger: "blur" }
        ],
        customer_class: [
          { required: true, message: "请选择沟通状态", trigger: "blur" }
        ]
      },
      ruless: {
        company_name: [
          { required: true, message: "请输入公司名称", trigger: "blur" },
          {
            min: 3,
            max: 125,
            message: "长度在 3 到 125 个字符",
            trigger: "blur"
          }
        ],
        contacts: [
          { required: true, message: "请输入客户姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        contacts_phone: [
          { required: true, message: "请输入公司名称", trigger: "blur" },
          { min: 11, max: 12, message: "长度在11个字符", trigger: "blur" }
        ],
        contacts_title: [
          { required: true, message: "请输入公司职位", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" }
        ],
        company_industry: [
          { required: true, message: "请输入公司行业", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        source_from: [
          { required: true, message: "请输入客户来源", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        customer_status: [
          { required: true, message: "请选择沟通状态", trigger: "blur" }
        ],
        connect_remarks: [
          { required: true, message: "请选择沟通备注", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 提交表单
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.connectRemarks == "") {
            this.$message({
              showClose: true,
              message: "沟通备注不能为空",
              type: "error"
            });
          } else {
            let option = new URLSearchParams();
            
            option.append("customer_data", JSON.stringify(this.formInline));
            option.append("call_status", this.formInline.customer_status);
            option.append("connect_remarks", this.connectRemarks);
            option.append("session_key", this.session_key);
            this.$http({
              method: "post",
              url: "hr24/create_new_sale_base_work/",
              data: option
            })
              .then(res => {
                this.formInline = {};
                this.connectRemarks = "";
                if (res.data.status == 1) {
                  this.listData(undefined, this.currentPage - 1);
                  this.$message({
                    showClose: true,
                    message: "新增用户成功！",
                    type: "success"
                  });
                } else if (res.data.status == -3) {
                  this.$message({
                    showClose: true,
                    message: res.data.data,
                    type: "error"
                  });
                } else {
                  this.$message({
                    showClose: true,
                    message: res.data.data,
                    type: "error"
                  });
                }
              })
              .catch(err => {});
          }
        } else {
          this.$message({
            showClose: true,
            message: "*项必填，请检查完善！！！",
            type: "error"
          });
          return false;
        }
      });
    },
    // 点击表格某一行
    handClick(row) {
      this.addSh = true;
      this.oldFormInline = row;
      this.customer_id = row.customer_id;
      this.sbw_id = row.id;
    },
    // 确认沟通
    confirmAdd(formNames) {
      this.$refs[formNames].validate(valid => {
        if (valid) {
          let option = new URLSearchParams();
         
          option.append("customer_data", JSON.stringify(this.oldFormInline));
          option.append("customer_id", this.customer_id);
          option.append("call_status", this.oldFormInline.customer_status);
          option.append("sbw_id", this.sbw_id);
          option.append("connect_remarks", this.oldFormInline.connect_remarks);
          option.append("session_key", this.session_key);
          this.$http({
            method: "post",
            url: "hr24/update_old_sale_base_work/",
            data: option
          })
            .then(res => {
              if (res.data.status == 1) {
                this.addSh = false;
                this.listData(
                  this.id == "" ? "不限" : this.id,
                  this.currentPage - 1
                );

                this.$message({
                  showClose: true,
                  message: "确认沟通成功！",
                  type: "success"
                });
                this.formInline = {};
              } else if (res.data.status == -5) {
                this.$message({
                  showClose: true,
                  message: "请选择沟通状态后再确认！",
                  type: "error"
                });
              } else {
                this.$message({
                  showClose: true,
                  message: "确认沟通用户失败，请刷新重试！",
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
            message: "*项必填，请检查完善！！！",
            type: "error"
          });
          return false;
        }
      });
    },
    // 翻页
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.listData(this.id == "" ? "不限" : this.id, this.currentPage - 1);
    },
    // 上一页
    prevClick() {
      this.listData(this.id == "" ? "不限" : this.id, this.currentPage - 2);
    },
    // 下一页
    nextClick() {
      this.listData(this.id == "" ? "不限" : this.id, this.currentPage);
    },
    // 请求列表数据
    listData(id, page) {
      let option = new URLSearchParams();
    
      option.append("sale_id", id);
      option.append("page", page);
      option.append("call_status", this.radioPhone);
      option.append("session_key", this.session_key);
      option.append("date", this.timeNow);
      this.$http({
        method: "post",
        url: "hr24/sale_base_work_list/",
        data: option
      })
        .then(res => {
          if (res.data.status == 1) {
            this.loadingTable = false;
            this.tableData = res.data.data.base_work_info_list;
            this.totalNmb = res.data.data.base_work_costomer_count;
            this.salePersonConut = res.data.data.sale_person_phone_count;
          } else {
            this.$message({
              showClose: true,
              message: "获取信息失败，请刷新重试！",
              type: "error"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 筛选
    radioGrou(id) {
      this.id = id;
      this.listData(id, 0);
    },
    // 沟通状态筛选
    state() {
      this.listData(this.id, 0);
    },
    // 筛选日期
    SxTime() {
      this.timeNow = this.valueTime;
      this.listData(this.id == "" ? "不限" : this.id, 0);
    },
    // 选择表格
    handleSelectionChange(val) {
      this.addName = val.length;
      let id = [];
      let sqwId = [];
      val.forEach(item => {
        id.push(item.customer_id);
        sqwId.push(item.id);
      });
      this.customerId = id;
      this.sbwId = sqwId;
    },
    // 添加到我的客户
    addCustomer() {
      if (this.customerId.length != 0) {
        let option = new URLSearchParams();
       
        option.append("customer_id", this.customerId);
        option.append("sbw_id", this.sbwId);
        option.append("session_key", this.session_key);
        this.$http({
          method: "post",
          url: "hr24/sale_base_work_customer_to_sale_customer/",
          data: option
        })
          .then(res => {
            if (res.data.status == 1) {
              this.listData(undefined, this.currentPage - 1);
              this.$message({
                showClose: true,
                message: "添加至我的客户成功",
                type: "success"
              });
            } else {
              this.$message({
                showClose: true,
                message: "添加至我的客户失败，请重新添加！",
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
          message: "请至少选择一项添加至我的客户",
          type: "error"
        });
      }
    }
  },
  mounted() {
    let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    this.user_type = userInfo.data.data.user_type;
   
    this.session_key = userInfo.data.data.session_key;
    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? "0" + m : m;
    var d = date.getDate();
    d = d < 10 ? "0" + d : d;
    this.timeNow = y + "-" + m + "-" + d;
    let option = new URLSearchParams();
    
    option.append("session_key", this.session_key);
    this.$http({
      method: "post",
      url: "hr24/return_customer_dict/",
      data: option
    })
      .then(res => {
        if (res.data.status == 1) {
          this.formInline = res.data.data;

          this.oldFormInline = res.data.data;
        } else {
          this.$message({
            showClose: true,
            message: "获取信息失败，请刷新重试！",
            type: "error"
          });
        }
      })
      .catch(err => {});
    this.listData(undefined, 0);
    this.$http({
      method: "post",
      url: "hr24/return_sale_person_list/",
      data: option
    }).then(res => {
      this.loading = false;
      this.saleNamer = res.data.data.sale_person_list;
    });
  }
};
</script>

<style scoped>
.teble {
  width: 50%;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
}
.addUser {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
.radioGroup {
  width: 1008px;
}
/deep/.el-input__inner{
  padding-right: 17px
}
</style>
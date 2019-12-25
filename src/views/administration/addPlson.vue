<template>
  <div>
    <div v-if="userType==5||userType==9">
      <h3>新增人员</h3>
      <div class="inp">
        <el-input placeholder="请设置登陆帐号" v-model="addAccounts.user_account"></el-input>
        <el-input placeholder="请设置登陆密码" v-model="addAccounts.user_password" show-password></el-input>
        <el-input placeholder="请输入姓名" v-model="addAccounts.user_name"></el-input>
        <el-select v-model="Jd" placeholder="请选择职位">
          <el-option v-for="(item,index) in jdDetails" :key="index" :label="item" :value="item"></el-option>
        </el-select>
        <el-button style="margin:15px 0" type="warning" round @click="SureAdd">确定新增</el-button>
      </div>
      <el-dialog title="确认创建信息" :visible.sync="centerDialogVisible" width="30%" center>
        <div class="addJd">
          <h5>
            新增人员：
            <span>{{addAccounts.user_name}}</span>
          </h5>
          <h5>
            登陆帐号：
            <span>{{addAccounts.user_account}}</span>
          </h5>
          <h5>
            登陆密码：
            <span>{{addAccounts.user_password}}</span>
          </h5>
          <h5>
            职位：
            <span>{{Jd}}</span>
          </h5>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="SureAddVisible">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="修改信息" :visible.sync="modifyFormVisible" width="22%">
        <el-form :model="form">
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.user_name"></el-input>
          </el-form-item>
          <el-form-item label="帐号" :label-width="formLabelWidth">
            <el-input v-model="form.user_account"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="password" placeholder="请输入需要修改的密码"></el-input>
          </el-form-item>
          <el-form-item label="职位" :label-width="formLabelWidth">
            <el-select v-model="ModifyJd" placeholder="请选择需要修改的职位">
              <el-option v-for="(item,index) in jdDetails" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="modifyFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="sureModify">确定修改</el-button>
        </div>
      </el-dialog>
      <div class="screen">
        <el-input v-model="userName" placeholder="请输入姓名(只能筛选姓名)"></el-input>
        <el-button type="success" round style="margin-left:10px" @click="sureModifyTop">确定筛选</el-button>
      </div>
      <el-table :data="AccountInfo" border style="width: 100%">
        <el-table-column prop="create_time" label="创建日期" align="center"></el-table-column>
        <el-table-column prop="user_account" label="帐号" align="center"></el-table-column>
        <el-table-column prop="user_name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="user_type" label="职位" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="modify(scope.$index,scope.row)">修改信息</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      addAccounts: {},
      userName: "",
      centerDialogVisible: false,
      modifyFormVisible: false,
      session_key:"",
      password: "",
      jdDetails: [],
      AccountInfo: [],
      Jd: "",
      ModifyJd: "",
      userType: "",
      
      form: {},
      formLabelWidth: "120px"
    };
  },
  methods: {
    // 确定新增
    SureAdd() {
      if (
        this.Jd == "" ||
        this.addAccounts.user_account == "" ||
        this.addAccounts.user_password == "" ||
        this.addAccounts.user_name == ""
      ) {
        this.$message({
          showClose: true,
          message: "信息请填写完整！",
          type: "error"
        });
      } else {
        this.centerDialogVisible = true;
      }
    },
    // 点击确定
    SureAddVisible() {
      let addData = new URLSearchParams();
    
      addData.append("user_class", this.Jd);
      addData.append("user_data", JSON.stringify(this.addAccounts));
      addData.append("search_keyword", this.userName);
      addData.append("session_key",this.session_key)
      this.$http({
        method: "post",
        url: "hr24/create_crm_user/",
        data: addData
      })
        .then(res => {
          if (res.data.status == 1) {
            this.addAccounts = {};
            this.Jd = "";
            this.centerDialogVisible = false;
            this.listDate(addData);
            this.$message({
              showClose: true,
              message: res.data.data,
              type: "success"
            });
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
    // 列表接口
    listDate(addData) {
      this.$http({
        method: "post",
        url: "hr24/user_list/",
        data: addData
      })
        .then(res => {
          if (res.data.status == 1) {
            this.AccountInfo = res.data.data.user_list;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 修改信息
    modify(index, row) {
      this.modifyFormVisible = true;
      this.form = row;
    },
    // 确定修改
    sureModify() {
      if (
        this.password == "" ||
        this.ModifyJd == "" ||
        this.form.user_name == "" ||
        this.form.user_account == ""
      ) {
        this.$message({
          showClose: true,
          message: "修改信息未填写完整，请检查！",
          type: "error"
        });
      } else {
        let addData = new URLSearchParams();
       
        addData.append("user_class", this.ModifyJd);
        addData.append("account", this.form.user_account);
        addData.append("password", this.password);
        addData.append("user_name", this.form.user_name);
        addData.append("cu_id", this.form.id);
        addData.append("session_key",this.session_key)
        this.$http({
          method: "post",
          url: "hr24/change_crm_user_password/",
          data: addData
        })
          .then(res => {
            if (res.data.status == 1) {
              this.listDate(addData);
              this.modifyFormVisible = false;
              this.password = "";
              this.form = {};
              this.$message({
                showClose: true,
                message: res.data.data,
                type: "success"
              });
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
      }
    },
    // 删除
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该帐号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          let addData = new URLSearchParams();
         
          addData.append("deleted_user_id", row.id);
          addData.append("session_key",this.session_key)
          this.$http({
            method: "post",
            url: "hr24/deleted_user/",
            data: addData
          })
            .then(res => {
              if (res.data.status == 1) {
                this.listDate(addData);
                this.$message({
                  showClose: true,
                  message: res.data.data,
                  type: "success"
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 确定筛选
    sureModifyTop() {
      let addData = new URLSearchParams();
      
      addData.append("search_keyword", this.userName);
      addData.append("session_key",this.session_key)
      this.$http({
        method: "post",
        url: "hr24/user_list/",
        data: addData
      })
        .then(res => {
          if (res.data.status == 1) {
            this.AccountInfo = res.data.data.user_list;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    let userId = JSON.parse(sessionStorage.getItem("userInfo")).data.data;
   
    this.userType = userId.user_type;
    this.session_key=userId.session_key
      let addData = new URLSearchParams();
 
      addData.append("search_keyword", this.userName);
      addData.append("session_key",this.session_key)
      this.$http({
        method: "post",
        url: "hr24/return_user_class/",
        data: addData
      })
        .then(res => {
          if (res.data.status == 1) {
            this.jdDetails = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
      this.$http({
        method: "post",
        url: "hr24/return_user_info/",
        data: addData
      })
        .then(res => {
          if (res.data.status == 1) {
            this.addAccounts = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
      this.$http({
        method: "post",
        url: "hr24/user_list/",
        data: addData
      })
        .then(res => {
          if (res.data.status == 1) {
            this.AccountInfo = res.data.data.user_list;
          }
        })
        .catch(err => {
          console.log(err);
        });
  }
};
</script>

<style scoped>
.el-input {
  width: 200px;
}
h3 {
  text-align: center;
}
.inp {
  width: 50%;
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
  flex-wrap: wrap;
}
.addJd h5 {
  margin-left: 30%;
}
.addJd span {
  font: 15px/30px "微软雅黑";
  color: red;
}
.screen {
  display: flex;
  margin-bottom: 10px;
}
</style>
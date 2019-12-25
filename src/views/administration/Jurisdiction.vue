<template>
  <div>
    <div class="screen">
      <el-input v-model="userName" placeholder="请输入姓名(只能筛选姓名)"></el-input>
      <el-button type="success" round @click="sureModify">确定筛选</el-button>
    </div>
    <el-table :data="PermissionList" border style="width: 100%">
      <el-table-column prop="create_time" label="创建日期" align="center"></el-table-column>
      <el-table-column prop="user_account" label="帐号" align="center"></el-table-column>
      <el-table-column prop="user_name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="user_type" label="职位" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="modify(scope.row)">修改权限</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改权限" :visible.sync="modifyFormVisible" width="25%">
      <!-- 默认选中的节点 default-checked-keys-->
      <!-- 默认展开所有 default-expand-all-->
      <h3 style="color:red">*不可操作项为该用户默认权限，不可手动修改！！！如需修改请联系系统管理员！！！</h3>
      <el-tree
        :data="dataList"
        show-checkbox
        node-key="permission_id"
        @check="tree"
        ref="tree1"
        :check-strictly="checkStrictly"
        :props="defaultProps"
        :default-expand-all="defaultAll"
        :default-checked-keys="dataId"
      ></el-tree>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modifyFormVisible: false,
      checkStrictly: true,
      userName: "",
      defaultAll: true,
      session_key:"",
      dataId: [],
      dataList: [],
      defaultProps: {
        children: "children",
        label: "permission_name"
      },
      PermissionList: [],
      
      userType: "",
      uid:""
    };
  },
  methods: {
    //   修改
    modify(id) {
      this.modifyFormVisible = true;
    
      this.uid=id.id
      let addData = new URLSearchParams();
      
      addData.append("uid", id.id);
      addData.append("session_key",this.session_key)
      this.$http({
        method: "post",
        url: "hr24/get_user_permission_list/",
        data: addData
      })
        .then(res => {
          if (res.data.status == 1) {
            this.dataList = res.data.data.user_role_permission;
            this.dataId = res.data.data.other_permission;
           
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 确定筛选
    sureModify() {
      let addData = new URLSearchParams();
      
      addData.append("search_keyword",this.userName);
      addData.append("session_key",this.session_key)
      this.$http({
        method: "post",
        url: "hr24/user_list/",
        data: addData
      })
        .then(res => {
          if (res.data.status == 1) {
            this.PermissionList = res.data.data.user_list;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    tree(checkedKeys) {
      // 获取到当前选中多少节点
      // let getChecked=this.$refs.tree1.getCheckedNodes(false,false)
      let checkId = checkedKeys.permission_id;
      let addData = new URLSearchParams();
      
      addData.append("permission_id",checkId);
      addData.append("uid",this.uid);
      addData.append("session_key",this.session_key)

      this.$http({
        method: "post",
        url: "hr24/update_user_permission/",
        data: addData
      })
        .then(res => {
          if (res.data.status == 1) {
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
    
    }
  },
  mounted() {
    let userId = JSON.parse(sessionStorage.getItem("userInfo")).data.data;
    
    this.userType = userId.user_type;
     this.session_key = userId.session_key;
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
          this.PermissionList = res.data.data.user_list;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
.screen {
  display: flex;
  margin-bottom: 10px;
}
.el-input {
  width: 15%;
  margin-right: 10px;
}
</style>
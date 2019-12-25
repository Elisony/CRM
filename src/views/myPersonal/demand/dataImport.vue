<template>
  <div>
    <div class="box">
      <el-input v-model="input" placeholder="请输入58简历链接" style="width:30%;margin-right:15px"></el-input>
      <el-button @click="importJd" type="danger" round>导入简历</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%; cursor: pointer;">
      <el-table-column prop="source_update" label="简历更新日期" align="center"></el-table-column>
      <el-table-column label="简历链接" align="center">
        <template slot-scope="scope">
          <button
            style="background:#ff871c;outline:none;border: 1px solid #DCDFE6;height: 26px;border-radius: 4px;color:#fff;padding:0;width: 60px;"
          >
            <a :href="scope.row.resume_url" target="_Blank">查看简历</a>
          </button>
        </template>
      </el-table-column>
      <el-table-column prop="user_name" label="用户名" align="center"></el-table-column>
      <el-table-column prop="place_content" label="期望地点" align="center"></el-table-column>
      <el-table-column label="手机号" align="center">
        <template slot-scope="scope">
          <el-input minlength="11" v-model="scope.row.user_phone" placeholder="请输入手机号码"></el-input>
        </template>
      </el-table-column>

      <el-table-column label="备注" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.hrpostresumeremarks__remarks" placeholder="请输入备注"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="hrpostresumeremarks__user__user_name" label="数据录入人" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="ToUpdate(scope.row)" type="success" round>更新简历</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      @prev-click="prevClick"
      @next-click="nextClick"
      :current-page="currentPage"
      :page-size="pagesize"
      :total="count"
      layout="total, prev, pager, next"
      style="text-align: center"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      tableData: [],
  
      currentPage: 1,
      pagesize: 50,
      count: 0,
      session_key: ""
    };
  },
  methods: {
    //   更新简历
    ToUpdate(scope) {
      console.log(scope.user_phone.length)
      if (scope.user_phone.length == 11) {
        let option = new URLSearchParams();

        option.append("resume_id", scope.id);
        option.append("user_phone", scope.user_phone);
        option.append("remarks", scope.hrpostresumeremarks__remarks);
        option.append("session_key", this.session_key);
        this.$http({
          method: "post",
          url: "hr24/hr_create_resume_update_phone/",
          data: option
        }).then(res => {
          if (res.data.status == 1) {
            this.list(0);
            this.$message({
              showClose: true,
              message: res.data.data,
              type: "success"
            });
          }
        });
      } else {
        this.$message({
          showClose: true,
          message:"手机号码应在11位，当前输入"+scope.user_phone.length+"位",
          type: "error"
        });
      }
    },
    // 导入简历
    importJd() {
      let option = new URLSearchParams();
      option.append("resume_url", this.input);
      option.append("session_key", this.session_key);
      this.$http({
        method: "post",
        url: "hr24/hr_create_resume/",
        data: option
      }).then(res => {
        if (res.data.status == 1) {
          this.input = "";
          this.list(0);
          this.$message({
            showClose: true,
            message: res.data.data,
            type: "success"
          });
        } else if (res.data.status == -1) {
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
      });
    },
    // 简历列表
    list(page) {
      let option = new URLSearchParams();
  
      option.append("page", page);
      option.append("session_key", this.session_key);
      this.$http({
        method: "post",
        url: "hr24/hr_create_resume_list/",
        data: option
      }).then(res => {
        this.tableData = res.data.data.resume_list;
        this.count = res.data.data.resume_count;
      });
    },
    handleCurrentChange: function(currentPage) {},
    prevClick() {},
    nextClick() {}
  },
  mounted() {
    let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

    this.session_key = userInfo.data.data.session_key;
    this.list(0);
  }
};
</script>

<style scoped>
.box {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.iconImg {
  padding-left: 10px;
}
</style>
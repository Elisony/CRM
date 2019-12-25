<template>
  <div>
    <h3>问题反馈</h3>
    <div v-if="agentId!=2">
    <div class="demonstration">
      <h4>问题类别：</h4>
      <el-cascader
        v-model="value"
        :options="options"
        @change="handleChange"
        style="width:30%"
        :show-all-levels="false"
        :checkStrictly="checkS"
      ></el-cascader>
    </div>
    <div class="demonstration">
      <h4>问题描述：</h4>
      <el-input
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 8}"
        maxlength="255"
        placeholder="请输入具体的问题描述"
        v-model="textarea"
        style="width:30%"
      ></el-input>
    </div>
    <div class="demons">
      <el-button type="danger" round @click="confirmer">确认提交</el-button>
    </div>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="create_time" label="提交时间" align="center"></el-table-column>
      <el-table-column prop="create_user__user_name" label="提交人员" align="center"></el-table-column>
      <el-table-column prop="problem_type_content" label="问题类型" align="center"></el-table-column>
      <el-table-column prop="problem_content" label="问题描述" align="center"></el-table-column>
      <el-table-column label="反馈情况" align="center">
        <template slot-scope="scope">
          <span class="fontSiez">{{scope.row.feedback_content}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" align="center" v-if="agentId==2&&userType==5">
        <template slot-scope="scope">
          <el-button type="warning" round @click="ReplyTo(scope.row)" v-if="scope.row.feedback_content==`尚未回复`">回复此问题</el-button>
           <el-button type="danger" disabled round v-else>已回复</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total, prev, pager, next"
      :total="total"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pagesize"
      @prev-click="prevClick"
      @next-click="nextClick"
      style="margin-top:15px;text-align:center"
    ></el-pagination>
    <el-dialog title="回复问题" :visible.sync="centerDialogVisible" width="30%" center>
      <el-input type="textarea" :rows="2" placeholder="请输入问题解决方案" v-model="Message"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="ReplyMessage">确定回复</el-button>
        <el-button @click="centerDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: [],
      centerDialogVisible: false,
      valueId: "",
      checkS: true,
      currentPage: 0,
      showWord: true,
      pagesize: 50,
      total: 0,
      ida: false,

      problemId: "",
      textarea: "",
      Message: "",
      options: [],
      tableData: [],
      agentId: "",
      userType: "",
      session_key:""
    };
  },
  methods: {
    handleChange() {
      // 问题ID
      this.valueId = this.value[this.value.length - 1];
    },
    // 确认提交
    confirmer() {
      if (this.textarea == "" || this.valueId == "") {
        this.$message({
          showClose: true,
          message: "请选择问题类别或填写问题描述",
          type: "error"
        });
      } else {
        let option = new URLSearchParams();

        option.append("problem_type", this.valueId);
        option.append("problem_content", this.textarea);
        option.append("session_key",this.session_key)
        // 问题类别
        this.$http({
          method: "post",
          url: "hr24/create_problem/",
          data: option
        }).then(res => {
          if (res.data.status == 1) {
            this.value = [];
            this.valueId = "";
            this.textarea = "";
            this.ProblemList(0);
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
        });
      }
    },
    // 点击回复问题
    ReplyTo(item) {
    
      this.problemId = item.id;
      this.centerDialogVisible = true;
    },
    // 确认回复问题
    ReplyMessage() {
      let option = new URLSearchParams();

      option.append("problem_id", this.problemId);
      option.append("feedback_content", this.Message);
      option.append("session_key",this.session_key)
      this.$http({
        method: "post",
        url: "hr24/create_feedback/",
        data: option
      }).then(res => {
        if (res.data.status == 1) {
          this.centerDialogVisible = false;
          this.Message = "";
          this.ProblemList(0);
          this.$message({
            showClose: true,
            message: res.data.data,
            type: "success"
          });
        }
        
      });
    },
    // 问题列表
    ProblemList(pageI) {
      let option = new URLSearchParams();
      option.append("page", pageI);
      option.append("session_key",this.session_key)
      this.$http({
        method: "post",
        url: "hr24/problem_feedback_list/",
        data: option
      }).then(res => {
        this.tableData = res.data.data.problem_list;
        this.total = res.data.data.problem_list_count;
       
      });
    },
    // 翻页改变
    handleCurrentChange(currentPage) {
      console.log(currentPage);
    },
    prevClick() {},
    nextClick() {}
  },
  mounted() {
    let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

    this.agentId = userInfo.data.data.agent_id;
    this.userType = userInfo.data.data.user_type;
    this.session_key=userInfo.data.data.session_key;
    let option = new URLSearchParams();

    option.append("page", 0);
    option.append("session_key",this.session_key)
    // 问题类别
    this.$http({
      method: "post",
      url: "hr24/problem_type_list/",
      data: option
    }).then(res => {
      this.options = res.data.data.problem_type_dict;
    });
    // 问题列表
    this.ProblemList(0);
  },
    watch: {
    "$store.state.storer.count": function() {
      this.ProblemList(0);
    }
  }
};
</script>

<style scoped>
@import url("https://unpkg.com/element-ui@2.4.1/lib/theme-chalk/index.css");
h3 {
  text-align: center;
}
.demonstration {
  display: flex;
  align-items: center;
  margin-left: 38%;
}
.demons {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 20px;
}
.fontSiez{
  color: red;
  font-weight: bold;
}
</style>
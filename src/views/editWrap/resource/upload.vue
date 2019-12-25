<template>
  <div v-if="showHome">
    <div class="uploadOne">
      <el-upload
        class="upload-demo"
        drag
        action="hr24/upload_many_files/"
        :before-upload="beforeUpload"
        :on-success="onSuccess"
        :data="uploaDate"
        :current-page="currentPage"
        ref="upload"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <!-- <div class="el-upload__tip" slot="tip">只能上传.xls文件</div> -->
      </el-upload>
    </div>
    <div class="uploadOne">
      <el-table :data="todayData" style="width: 100%">
        <el-table-column prop="total_file" label="总上传文件数" align="center"></el-table-column>
        <el-table-column prop="valid_count" label="总上传有效简历数" align="center"></el-table-column>
        <el-table-column prop="last_time" label="最近上传时间" align="center"></el-table-column>
        <el-table-column prop="upload_name" label="最近上传人员" align="center"></el-table-column>
      </el-table>
    </div>
    <div class="uploadOne">
      <el-table :data="Daily" style="width: 100%">
        <el-table-column prop="name" label="文件名" align="center"></el-table-column>
        <el-table-column label="上传有效简历数" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.valid_amount==null?`0`:scope.row.valid_amount}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="上传时间" align="center"></el-table-column>
        <el-table-column prop="upload_name" label="上传人员" align="center"></el-table-column>
      </el-table>
    </div>
    <el-pagination
      :page-size="10"
      @prev-click="prevClick"
      @next-click="nextClick"
      @current-change="handleCurrentChange"
      layout="total, prev, pager, next"
      :total="totalCont"
      style=" text-align: center;"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fileList: [],
      totalCont: 0,
      showHome:true,
      currentPage: 1,
      session_key:"",
      uploaDate: {
        file: "",
        session_key: "",
        page: 0
      },
      todayData: [],
      Daily: []
    };
  },
  methods: {
    // 上传文件前
    beforeUpload(file) {
      this.uploaDate.page = 0;
      this.uploaDate.session_key = this.session_key;
     
    },
    // 渲染文件数据
    uploadHttp(page) {
      let option = new URLSearchParams();
      option.append("page", page);
       option.append("session_key",this.session_key)
      this.$http({
        method: "post",
        url: "hr24/show_data/",
        data: option
      }).then(res => {
       
        let dataJd = res.data.data[0];
        this.todayData = dataJd.total_data;
        this.Daily = dataJd.day_data;
        this.totalCont = this.todayData[0].total_file;
      });
    },
    // 上传文件成功
    onSuccess(response, file, fileList) {
      if (response.status == 1) {
        let dataJd = response.data[0];
        this.todayData = dataJd.total_data;
        this.Daily = dataJd.day_data;
        this.totalCont = this.todayData[0].total_file;
        this.$notify({
          title: "上传文件",
          message: file.name + "已成功上传",
          type: "success"
        });
        this.$refs.upload.clearFiles();
      } else {
        this.$notify({
          title: "上传文件",
          message: file.name + "上传失败",
          type: "error"
        });
        this.$refs.upload.clearFiles();
      }
    },
    //翻页发生变化
    handleCurrentChange(currentPage) {
      
      this.currentPage = currentPage;
      this.uploadHttp(currentPage - 1);
    },
    // 点击上一页
    prevClick() {
     
      this.uploadHttp(this.currentPage - 2);
    },
    // 点击下一页
    nextClick() {
    
      this.uploadHttp(this.currentPage);
    }
  },
  mounted() {
    let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    let uerId = userInfo.data.data.area_id;
    let hhId = userInfo.data.data.user_type;
    this.session_key= userInfo.data.data.session_key;
    if (uerId == 1 || hhId == 5) {
      let option = new URLSearchParams();
  
      option.append("page", 0);
       option.append("session_key",this.session_key)
      this.$http({
        method: "post",
        url: "hr24/show_data/",
        data: option
      }).then(res => {
       
        let dataJd = res.data.data[0];
        this.todayData = dataJd.total_data;
        this.Daily = dataJd.day_data;
        this.totalCont = this.todayData[0].total_file;
      });
    } else {
      this.showHome = false;
      this.$message({
        showClose: true,
        message: "该页面暂无权限，正在返回首页！",
        type: "error"
      });
      setTimeout(() => {
        this.$router.push({ name: "dashboard" });
      }, 1000);
    }
  }
};
</script>
<style scoped>
.uploa {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
body .wrap {
  padding: 0;
}
.uploadOne {
  display: flex;
  justify-content: center;
  box-shadow: 0 0 10px #ccc;
  margin-bottom: 30px;
}
</style>

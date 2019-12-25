<template>
<div>
  <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange"
    >
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="审核日期"
      width="120">
      <template slot-scope="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="求职地点"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="gangwei"
      label="意向岗位"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="xueli"
      label="学历"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="money"
      label="期望薪资"
      show-overflow-tooltip>
    </el-table-column>
  </el-table>
  <el-pagination background layout="prev, pager, next" :total="600"></el-pagination>
  <el-button type="success" class="elButton" round @click="get">获取联系方式</el-button>
</div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区',
          gangwei:"销售",
          xueli:"本科",
          money:"5000"
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区',
          gangwei:"销售",
          xueli:"本科",
          money:"5000"
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区',
          gangwei:"销售",
          xueli:"本科",
          money:"5000"
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区',
          gangwei:"销售",
          xueli:"本科",
          money:"5000"
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区',
          gangwei:"销售",
          xueli:"本科",
          money:"5000"
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区',
          gangwei:"销售",
          xueli:"本科",
          money:"5000"
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区',
          gangwei:"销售",
          xueli:"本科",
          money:"5000"
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区',
          gangwei:"销售",
          xueli:"本科",
          money:"5000"
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区',
          gangwei:"销售",
          xueli:"本科",
          money:"5000"
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区',
          gangwei:"销售",
          xueli:"本科",
          money:"5000"
        }
        ],
        multipleSelection: []
      }
    },

    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        console.log(val)
        this.multipleSelection = val;
      },
      get(){
        if(this.multipleSelection==""){
          this.$message({
            showClose: true,
            message: "请选择你中意的候选人",
            type: "warning"
          });
        }else{
          this.$message({
            showClose: true,
            message: "恭喜你，获取成功",
            type: "success"
          });
        }
      }
    }
  }
</script>
<style>
.elButton{
      position: fixed;
    bottom: 22px;
    right: 22px;
}
</style>

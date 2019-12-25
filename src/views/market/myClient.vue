<template>
  <div v-if="saleShow">
    <h4>
      <img src="../../assets/404_images/all.png" style="margin-right: 10px;" />全部客户
    </h4>
    <div class="addJd">
      <div style="margin-bottom:15px">
        <el-button type="primary" round @click="addTime" autofocus plain>
          添加时间
          <i class="el-icon-bottom"></i>
        </el-button>
        <el-button type="primary" round @click="followTiem" plain>
          跟进时间
          <i class="el-icon-bottom"></i>
        </el-button>
        <el-button type="primary" round @click="customerType" plain>
          客户类型
          <i class="el-icon-info"></i>
        </el-button>
      </div>
      <el-switch
        style="display: block"
        v-model="value2"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-text="提交客户"
        inactive-text="全部客户"
        @change="switchV"
      ></el-switch>
      <div style="margin-bottom:15px">
        <el-button type="warning" round @click="addUser">新增客户</el-button>
        <el-button type="danger" round @click="release">释放用户（{{userNum}}）</el-button>
      </div>
    </div>
    <div
      v-if="user_type==5||user_type==7"
      v-loading="loadingSale"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      style="width:61%;margin-bottom:15px"
    >
      <span>筛选销售人员：</span>
      <el-radio-group
        v-model="radioSa"
        size="medium"
        v-for="(item,index) in saleNamer"
        :key="index"
        @change="radioGrou(item.id)"
      >
        <el-radio-button :label="item.user_name"></el-radio-button>
      </el-radio-group>
    </div>
    <el-dialog title="新增用户" :visible.sync="addUse" width="46%" center :before-close="addUseClose">
      <div class="modify">
        <el-button
          type="danger"
          icon="el-icon-check"
          round
          @click="userClick('ruleFormS',`ruleForm`)"
        >保存</el-button>
      </div>
      <el-form
        label-position="left"
        inline
        class="demo-table-expand formBottom"
        :model="addUserDate"
        :rules="ruless"
        ref="ruleFormS"
      >
        <el-form-item label="所属公司：" prop="company_name">
          <el-input v-model="addUserDate.company_name" placeholder="请输入所属公司"></el-input>
        </el-form-item>
        <el-form-item label="所属城市：" prop="company_city">
          <el-input v-model="addUserDate.company_city" placeholder="请输入所属城市:XX市"></el-input>
        </el-form-item>
        <el-form-item label="公司地址：">
          <el-input v-model="addUserDate.company_address" placeholder="请输入公司地址"></el-input>
        </el-form-item>
        <el-form-item label="公司职位：" prop="contacts_title">
          <el-input v-model="addUserDate.contacts_title" placeholder="请输入公司职位"></el-input>
        </el-form-item>
        <el-form-item label="客户姓名：" prop="contacts">
          <el-input v-model="addUserDate.contacts" placeholder="请输入客户姓名"></el-input>
        </el-form-item>
        <el-form-item label="联系电话：" prop="contacts_phone">
          <el-input v-model="addUserDate.contacts_phone" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="联系邮箱：">
          <el-input v-model="addUserDate.company_email" placeholder="请输入联系邮箱"></el-input>
        </el-form-item>
        <el-form-item label="联系-QQ：">
          <el-input v-model="addUserDate.qq_id" placeholder="请输入联系QQ"></el-input>
        </el-form-item>
        <el-form-item label="联系微信：">
          <el-input v-model="addUserDate.wx_id" placeholder="请输入联系微信"></el-input>
        </el-form-item>
        <el-form-item label="客户行业：" prop="company_industry">
          <el-input v-model="addUserDate.company_industry" placeholder="请输入客户行业"></el-input>
        </el-form-item>
        <el-form-item label="客户来源：" prop="source_from">
          <el-input v-model="addUserDate.source_from" placeholder="请输入客户来源"></el-input>
        </el-form-item>
        <el-form-item label="客户状态：" prop="customer_status">
          <el-select v-model="addUserDate.customer_status" placeholder="请选择客户状态">
            <el-option v-for="(item,index) in options" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户类别：" prop="customer_class">
          <el-select v-model="addUserDate.customer_class" placeholder="请选择客户类别">
            <el-option v-for="(item,index) in options1" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <p class="fullow">跟进记录</p>
      <el-form
        label-position="left"
        inline
        class="demo-table-expand"
        :model="addFull"
        :rules="rulessOne"
        ref="ruleForm"
      >
        <el-form-item label="沟通套餐：" prop="follow_product">
          <el-input v-model="addFull.follow_product" placeholder="请输入沟通套餐"></el-input>
        </el-form-item>
        <el-form-item label="跟单方式：" prop="follow_class">
          <el-input v-model="addFull.follow_class" placeholder="请输入跟单方式"></el-input>
        </el-form-item>
        <el-form-item label="跟单内容：" prop="follow_content">
          <el-input v-model="addFull.follow_content" placeholder="请输入跟单内容"></el-input>
        </el-form-item>
        <el-form-item label="跟单类型：" prop="follow_customer_class">
          <el-select v-model="addFull.follow_customer_class" placeholder="请选择跟单类别">
            <el-option v-for="(item,index) in options1" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户状态：" prop="follow_status">
          <el-select v-model="addFull.follow_status" placeholder="请选择客户状态">
            <el-option v-for="(item,index) in options" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下次跟进时间：" prop="next_follow_time">
          <div style="width:190px">
            <el-date-picker
              v-model="addFull.next_follow_time"
              type="date"
              placeholder="请选择下次跟进日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-table
      :data="tableData"
      border
      style="width: 100%;cursor:pointer"
      highlight-current-row
      @row-click="handClick"
      @selection-change="handleSelectionChange"
      class="formBottom"
      v-loading="loadingTelt"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="合同状态" align="center">
        <template slot-scope="scope">
          <el-button type="info" v-if="scope.row.customer__is_post==1">未提交</el-button>
          <el-button type="danger" v-else-if="scope.row.is_money_back==-1">审核失败</el-button>
          <el-button type="warning" v-else-if="scope.row.customer__is_post==2">待审核</el-button>
          <el-button type="success" v-else-if="scope.row.customer__is_post==3">审核成功</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="customer_id__company_name" label="所属公司" align="center"></el-table-column>
      <el-table-column prop="customer_id__contacts" label="客户姓名" align="center"></el-table-column>
      <el-table-column prop="customer_id__contacts_phone" label="联系方式" align="center"></el-table-column>
      <el-table-column prop="create_time" label="添加时间" align="center"></el-table-column>
      <el-table-column prop="customer__source_from" label="客户来源" align="center"></el-table-column>
      <el-table-column prop="customer__company_industry" label="客户行业" align="center"></el-table-column>
      <el-table-column prop="customer_id__customer_class" label="客户意向" align="center"></el-table-column>
      <el-table-column prop="customer_id__follow_product" label="销售套餐" align="center"></el-table-column>
      <el-table-column prop="customer_id__customer_status" label="客户状态" align="center"></el-table-column>
      <el-table-column prop="customer__renew_count" label="成交次数" align="center"></el-table-column>
      <el-table-column prop="update_time" label="最近工单时间" align="center"></el-table-column>
      <el-table-column label="最近成交时间" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.customer__last_deal_time==null?`无`:scope.row.customer__last_deal_time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="跟单次数" align="center" prop="follow_count"></el-table-column>
      <el-table-column label="下次跟进时间" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.next_follow_time==null?`无`:scope.row.next_follow_time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="销售经理" align="center" prop="sale_person__user_name"></el-table-column>
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
    <el-dialog
      title="客户详情"
      :visible.sync="centerDialogVisible"
      width="46%"
      center
      class="diao"
      top="0"
      :before-close="handleClose"
    >
      <el-steps :active="isPostNumber" finish-status="success" simple style="margin-bottom: 20px">
        <el-step title="提交合同"></el-step>
        <el-step title="正在审核"></el-step>
        <el-step title="审核成功"></el-step>
      </el-steps>
      <el-button type="primary" round @click="contractClick" :disabled="isPost">成交</el-button>
      <el-button type="danger" round @click="renewClick" :disabled="isPost">续费</el-button>
      <el-button type="primary" round @click="modifyClickT" v-if="is_money_back==-1">修改合同并提交</el-button>
      <p
        v-if="is_money_back==-1"
        style="color:red;font-size: 15px;"
      >合同拒绝理由：{{this.deal_check_remarks==""?`暂无理由`:this.deal_check_remarks}}</p>
      <div class="modify">
        <el-button type="success" icon="el-icon-edit" round v-if="modif" @click="modifyClick">修改</el-button>
        <el-button type="danger" icon="el-icon-check" round v-else @click="PreservaClick">保存</el-button>
      </div>
      <el-form label-position="left" inline class="demo-table-expand formBottom" :model="userXq">
        <el-form-item label="所属公司：">
          <span v-if="Preserva">{{userXq.company_name}}</span>
          <el-input v-else v-model="userXq.company_name" placeholder="请输入修改内容"></el-input>
        </el-form-item>
        <el-form-item label="所属城市：">
          <span v-if="Preserva">{{userXq.company_city}}</span>
          <el-input v-else v-model="userXq.company_city" placeholder="请输入修改内容"></el-input>
        </el-form-item>
        <el-form-item label="公司地址：">
          <el-tooltip class="item" effect="dark" :content="userXq.company_address">
            <span v-if="Preserva">{{userXq.company_address}}</span>
            <el-input v-else v-model="userXq.company_address" placeholder="请输入修改内容"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="公司职位：">
          <span v-if="Preserva">{{userXq.contacts_title}}</span>
          <el-input v-else v-model="userXq.contacts_title" placeholder="请输入修改内容"></el-input>
        </el-form-item>
        <el-form-item label="客户姓名：">
          <span v-if="Preserva">{{userXq.contacts}}</span>
          <el-input v-else v-model="userXq.contacts" placeholder="请输入修改内容"></el-input>
        </el-form-item>
        <el-form-item label="联系电话：">
          <span v-if="Preserva">{{userXq.contacts_phone}}</span>
          <el-input v-else v-model="userXq.contacts_phone" placeholder="请输入修改内容"></el-input>
        </el-form-item>
        <el-form-item label="联系邮箱：">
          <span v-if="Preserva">{{userXq.company_email}}</span>
          <el-input v-else v-model="userXq.company_email" placeholder="请输入修改内容"></el-input>
        </el-form-item>
        <el-form-item label="联系QQ：">
          <span v-if="Preserva">{{userXq.qq_id==null?`无`:userXq.qq_id}}</span>
          <el-input v-else v-model="userXq.qq_id" placeholder="请输入修改内容"></el-input>
        </el-form-item>
        <el-form-item label="联系微信：">
          <span v-if="Preserva">{{userXq.wx_id==null?`无`:userXq.wx_id}}</span>
          <el-input v-else v-model="userXq.wx_id" placeholder="请输入修改内容"></el-input>
        </el-form-item>
        <el-form-item label="客户行业：">
          <span v-if="Preserva">{{userXq.company_industry}}</span>
          <el-input v-else v-model="userXq.company_industry" placeholder="请输入修改内容"></el-input>
        </el-form-item>
        <el-form-item label="客户来源：">
          <span>{{userXq.source_from}}</span>
        </el-form-item>
        <el-form-item label="沟通套餐：">
          <span v-if="Preserva">{{userXq.follow_product}}</span>
          <el-input v-else v-model="userXq.follow_product" placeholder="请输入修改内容"></el-input>
        </el-form-item>
        <el-form-item label="客户状态：">
          <span v-if="Preserva">{{userXq.customer_status}}</span>
          <el-select v-else v-model="userXq.customer_status" placeholder="请选择">
            <el-option v-for="(item,index) in options" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户类别：">
          <span v-if="Preserva">{{userXq.customer_class}}</span>
          <el-select v-else v-model="userXq.customer_class" placeholder="请选择">
            <el-option v-for="(item,index) in options1" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="跟进备注：">
          <span>{{userXq.last_follow_content}}</span>
        </el-form-item>
      </el-form>
      <p class="fullow">跟进记录</p>
      <div class="modify">
        <el-button type="success" icon="el-icon-circle-plus-outline" round @click="addFullow">添加记录</el-button>
      </div>
      <div
        class="fullowP"
        v-show="followShow"
        v-for="(item,index) in this.followRecord"
        :key="index"
      >
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
      <h3 v-show="followShow1" style="text-align:center">暂无跟进记录，可点击添加记录</h3>
      <el-dialog width="35%" title="添加跟进记录" :visible.sync="fullowDia" append-to-body>
        <el-form
          label-position="left"
          inline
          class="demo-table-expand"
          :model="addFull"
          :rules="rulessFullow"
          ref="ruleFullow"
        >
          <el-form-item label="跟单方式：" prop="follow_class">
            <el-input v-model="addFull.follow_class" placeholder="请输入跟单方式"></el-input>
          </el-form-item>
          <el-form-item label="客户状态：" prop="follow_status">
            <el-select v-model="addFull.follow_status" placeholder="请选择客户状态">
              <el-option v-for="(item,index) in options" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户类型：" prop="follow_customer_class">
            <el-select v-model="addFull.follow_customer_class" placeholder="请选择跟单类别">
              <el-option v-for="(item,index) in options1" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="下次跟进：" prop="next_follow_time">
            <div style="width:190px" class="inputBox">
              <el-date-picker
                v-model="addFull.next_follow_time"
                type="date"
                placeholder="请选择下次跟进日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="跟单内容：" prop="follow_content" style="width:100%" class="boxForm">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 8}"
              placeholder="请输入跟单内容"
              v-model="addFull.follow_content"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="suecss">
          <el-button type="success" round @click="fullowClick(`ruleFullow`)">保存</el-button>
          <el-button type="danger" round @click="fullowCancel">取消</el-button>
        </div>
      </el-dialog>
      <el-dialog width="35%" title="确认合同信息" :visible.sync="contract" append-to-body>
        <el-form
          label-position="left"
          inline
          class="demo-table-expand"
          :model="contractData"
          :rules="rules"
          ref="ruleForm"
        >
          <el-form-item label="合同套餐：" prop="deal_product">
            <el-input v-model="contractData.deal_product" placeholder="请输入合同套餐"></el-input>
          </el-form-item>
          <el-form-item label="回款金额：" prop="money_back">
            <el-input v-model="contractData.money_back" placeholder="请输入回款金额"></el-input>
          </el-form-item>
          <el-form-item label="开通账号：" prop="opened_account">
            <el-input v-model="contractData.opened_account" placeholder="请输入开通账号"></el-input>
          </el-form-item>
          <el-form-item label="合同备注：" prop="contract_content">
            <el-input v-model="contractData.contract_content" placeholder="请输入合同备注"></el-input>
          </el-form-item>
        </el-form>
        <!-- 开发模式URL/api/hr24/ -->
        <el-upload
          action="/hr24/upload_img_file/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :before-upload="beforeUpload"
          :on-success="handSuccess"
          :before-remove="handleRemove"
          :data="uploaDate"
          :file-list="fileList"
          :show-file-list="showFile"
          accept="image/jpg, image/jpeg, image/png"
        >
          <el-button size="small" type="primary">点击上传合同图片</el-button>
        </el-upload>
        <h5 style="color:red">*图片格式只支持jpg/jpeg/png格式</h5>
        <!-- 生产模式URL/hr24-->
        <el-upload
          action="/hr24/upload_img_file/"
          list-type="picture-card"
          :on-preview="handlePicture"
          :on-remove="moneyRemove"
          :before-upload="beforeUpload1"
          :show-file-list="showFile1"
          :file-list="fileList1"
          :on-success="handSuccess1"
          :data="uploaDate1"
          accept="image/jpg, image/jpeg, image/png"
        >
          <el-button size="small" type="primary">点击上传回款图片</el-button>
        </el-upload>

        <el-dialog :visible.sync="dialogVisible" append-to-body>
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
        <el-dialog :visible.sync="dialogVisible1" append-to-body>
          <img width="100%" :src="dialogImageUrl1" alt />
        </el-dialog>
        <div class="suecss">
          <el-button type="success" round @click="contractUrlClick(`ruleForm`)">确定提交</el-button>
          <el-button type="danger" round @click="Cancellation">取消</el-button>
        </div>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import { fips } from "crypto";
import { POINT_CONVERSION_COMPRESSED } from "constants";
export default {
  data() {
    return {
      dialog: false,
      loadingSale: true,
      drawer: false,
      addUse: false,
      saleShow: true,
      user_type: "",
      currentPage: 1,
      totalNmb: 0,
      value2: false,
      dialogImageUrl: "",
      dialogImageUrl1: "",
      dialogVisible: false,
      dialogVisible1: false,
      isPost: false,
      is_money_back: "",
      deal_check_remarks: "",
      value1: "",
      contract: false,
      showFile: true,
      showFile1: true,
      centerDialogVisible: false,
      innerDrawer: false,
      Preserva: true,
      modif: true,
      loadingTelt: true,
      isPostNumber: 0,
      followShow: true,
      followShow1: false,
      shifang: false,
      user_id: "",
      fullowDia: false,
      radioSale: "",
      addUserDate: {},
      addFull: {},
      agentId: 0,
      options: ["0-暂未联系", "1-电话", "2-微信", "3-拜访", "4-需求", "5-报价"],
      options1: ["A类客户", "B类客户", "C类客户", "D未标记"],
      radioSa: "不限",
      usereId: [],
      userNum: 0,
      ueseDetails: "",
      userName: "",
      currentdate: "",
      tableData: [],
      followRecord: [],
      saleNamer: [],
      userXq: {},
      customerId: "",
      contractData: {},
      buttonNumber: 0,
      saleId: "",
      dealId: "",
      session_key: "",
      fileList: [{ name: ``, url: `` }],
      fileList1: [{ name: ``, url: `` }],
      rules: {
        deal_product: [
          { required: true, message: "请输入合同套餐", trigger: "blur" },
          {
            min: 4,
            max: 100,
            message: "长度在 4 到 100 个字符",
            trigger: "blur"
          }
        ],
        money_back: [
          { required: true, message: "请输入回款金额", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符",
            trigger: "blur"
          }
        ],
        opened_account: [
          {
            required: true,
            message: "请输入开通账号，必须为手机号",
            trigger: "blur"
          },
          {
            min: 11,
            max: 11,
            message: "手机号码长度应为11位，请检查！",
            trigger: "blur"
          }
        ],
        contract_content: [
          {
            required: true,
            message: "请输入合同备注，如没有请填写无备注",
            trigger: "blur"
          },
          { min: 1, max: 100, message: "如没有请填写无备注", trigger: "blur" }
        ]
      },
      rulessOne: {
        follow_product: [
          { required: true, message: "请输入沟通套餐", trigger: "blur" },
          {
            min: 4,
            max: 100,
            message: "长度在 4 到 100 个字符",
            trigger: "blur"
          }
        ],
        next_follow_time: [
          { required: true, message: "请输入选择下次跟进时间", trigger: "blur" }
        ],
        follow_class: [
          {
            required: true,
            message: "请输入跟单方式",
            trigger: "blur"
          },
          {
            min: 2,
            max: 11,
            message: "长度在 4 到 11 个字符",
            trigger: "blur"
          }
        ],
        follow_content: [
          {
            required: true,
            message: "请输入沟通内容",
            trigger: "blur"
          },
          { min: 1, max: 200, message: "如没有请填写无备注", trigger: "blur" }
        ],
        follow_status: [
          { required: true, message: "请输入客户状态", trigger: "blur" }
        ],
        follow_customer_class: [
          { required: true, message: "请选择跟单类型", trigger: "blur" }
        ]
      },
      ruless: {
        company_name: [
          { required: true, message: "请输入公司名称", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ],
        contacts: [
          { required: true, message: "请输入客户姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        contacts_phone: [
          { required: true, message: "请输入联系方式", trigger: "blur" },
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
        company_city: [
          { required: true, message: "请输入城市", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" }
        ],
        customer_class: [
          { required: true, message: "请选择客户类别", trigger: "blur" }
        ]
      },
      rulessFullow: {
        follow_product: [
          { required: true, message: "请输入沟通套餐", trigger: "blur" },
          {
            min: 3,
            max: 100,
            message: "长度在 4 到 100 个字符",
            trigger: "blur"
          }
        ],
        follow_class: [
          { required: true, message: "请输入跟单方式", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符",
            trigger: "blur"
          }
        ],
        follow_content: [
          {
            required: true,
            message: "请输入跟单内容",
            trigger: "blur"
          },
          {
            min: 2,
            max: 200,
            message: "长度在 2 到 100 个字符！",
            trigger: "blur"
          }
        ],
        follow_customer_class: [
          {
            required: true,
            message: "请输入跟单类型",
            trigger: "blur"
          },
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符",
            trigger: "blur"
          }
        ],
        follow_status: [
          {
            required: true,
            message: "请输入客户状态",
            trigger: "blur"
          }
        ],
        next_follow_time: [
          {
            required: true,
            message: "请选择下次跟进时间",
            trigger: "blur"
          }
        ]
      },
      uploaDate1: {
        customer_id: "",
        user_id: "",
        img_class: "合同",
        session_key:""
      },
      uploaDate: {
        customer_id: "",
        user_id: "",
        img_class: "汇款",
        session_key:""
      },
      contractUrl: [],
      moneyUrl: []
    };
  },
  methods: {
    // 选择框
    handleSelectionChange(val) {
      this.userNum = val.length;
      let id = [];
      val.forEach(item => {
        id.push(item.customer_id);
        this.usereId = id;
      });
    },
    // 释放用户
    release() {
      if (this.userNum) {
        let option = new URLSearchParams();

        option.append("customer_id", this.usereId);
        option.append("session_key", this.session_key);
        this.$http({
          method: "post",
          url: "hr24/customer_release/",
          data: option
        }).then(res => {
          if (res.data.status == 1) {
            this.shifang = true;
            this.$message({
              showClose: true,
              message: "客户已成功释放到公海",
              type: "success"
            });
            this.uesrData(0, 0, 0, this.radioSale == "" ? `0` : this.radioSale);
          }
        });
      } else {
        this.$message({
          showClose: true,
          message: "请至少选择一项释放",
          type: "error"
        });
      }
    },
    // 添加时间
    addTime() {
      this.uesrData(0, 0, 0, this.radioSale == "" ? `0` : this.radioSale);
    },
    // 跟进时间
    followTiem() {
      this.uesrData(1, 0, 0, this.radioSale == "" ? `0` : this.radioSale);
    },
    // 客户类型
    customerType() {
      this.uesrData(2, 0, 0, this.radioSale == "" ? `0` : this.radioSale);
    },
    // 点击修改
    modifyClick() {
      this.Preserva = false;
      this.modif = false;
    },
    // 点击保存
    PreservaClick() {
      this.Preserva = true;
      this.modif = true;
      let option = new URLSearchParams();

      option.append("change_data", JSON.stringify(this.userXq));
      option.append("customer_id", this.customerId);
      option.append("session_key", this.session_key);
      this.$http({
        method: "post",
        url: "hr24/change_customer_info/",
        data: option
      }).then(res => {
        if (res.data.status == 1) {
          this.uesrData(0, 0, 0, this.radioSale == "" ? `0` : this.radioSale);
          this.$message({
            showClose: true,
            message: res.data.data,
            type: "success"
          });
        } else {
          this.$message({
            showClose: true,
            message: "修改信息失败，请刷新重试！",
            type: "error"
          });
        }
      });
    },
    // 新增用户
    addUser() {
      this.addUse = true;
      let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      this.userName = userInfo.data.data.real_name;
      let option = new URLSearchParams();

      option.append("session_key", this.session_key);
      this.$http({
        method: "post",
        url: "hr24/return_customer_dict/",
        data: option
      })
        .then(res => {
          this.addUserDate = res.data.data;
        })
        .catch(err => {});
      let date = new Date();
      let seperator1 = "-";
      let seperator2 = ":";
      let month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      let strDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      this.currentdate =
        date.getFullYear() +
        seperator1 +
        month +
        seperator1 +
        strDate +
        " " +
        date.getHours() +
        seperator2 +
        date.getMinutes() +
        seperator2 +
        date.getSeconds();
    },
    // 保存新增用户
    userClick(formName, formNames) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$refs[formNames].validate(valid => {
            if (valid) {
              let option = new URLSearchParams();

              option.append("customer_data", JSON.stringify(this.addUserDate));
              option.append("follow_record_data", JSON.stringify(this.addFull));
              option.append("session_key", this.session_key);
              this.$http({
                method: "post",
                url: "hr24/create_customer_info/",
                data: option
              })
                .then(res => {
                  if (res.data.status == 1) {
                    this.addUse = false;
                    this.addFull = {};
                    this.$message({
                      showClose: true,
                      message: "新增客户成功",
                      type: "success"
                    });
                    this.uesrData(
                      0,
                      0,
                      0,
                      this.radioSale == "" ? `0` : this.radioSale
                    );
                  } else if (res.data.status == -2) {
                    this.$message({
                      showClose: true,
                      message: res.data.data,
                      type: "error"
                    });
                  } else if (res.data.status == -3) {
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
            } else {
              this.$message({
                showClose: true,
                message: "*项为必填项，请检查重新提交！",
                type: "error"
              });
            }
          });
        } else {
          this.$message({
            showClose: true,
            message: "*项为必填项，请检查重新提交！",
            type: "error"
          });
        }
      });
    },
    Preservation() {
      this.dialog = false;
    },
    // 客户详情关闭时的回调
    handleClose(done) {
      this.Preserva = true;
      this.modif = true;
      done();
    },
    // 新增用户关闭时的回调
    addUseClose(done) {
      this.$confirm("确认放弃新增客户？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 点击某一行
    handClick(row) {
      this.saleId = row.id;
      this.dealId = row.deal_id;
      this.centerDialogVisible = true;
      this.customerId = row.customer_id;
      this.is_money_back = row.is_money_back;
      let option = new URLSearchParams();

      option.append("agent_id", this.agentId);
      option.append("customer_id", row.customer_id);
      option.append("session_key", this.session_key);
      this.$http({
        method: "post",
        url: "hr24/sale_customer_info/",
        data: option
      }).then(res => {
        if (res.data.status == -2) {
          this.$message({
            showClose: true,
            message: "网络请求错误，刷新重试！",
            type: "error"
          });
        } else {
          this.userXq = res.data.data.customer_info[0];
          this.deal_check_remarks = res.data.data.deal_check_remarks;
          this.followRecord = res.data.data.follow_record;
          this.isPostNumber = res.data.data.customer_info[0].is_post;
          if (res.data.data.customer_info[0].is_post != 1) {
            this.isPost = true;
          } else {
            this.isPost = false;
          }
          if (this.followRecord.length != 0) {
            this.followShow = true;
            this.followShow1 = false;
          } else {
            this.followShow = false;
            this.followShow1 = true;
          }
        }
      });
    },
    // 添加跟进记录
    addFullow() {
      this.fullowDia = true;
      let option = new URLSearchParams();

      option.append("session_key", this.session_key);
      this.$http({
        method: "post",
        url: "hr24/return_record_dict/",
        data: option
      })
        .then(res => {
          this.addFull = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 保存跟单记录
    fullowClick(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let option = new URLSearchParams();

          option.append("customer_id", this.customerId);
          option.append("follow_data", JSON.stringify(this.addFull));
          option.append("session_key", this.session_key);
          this.$http({
            method: "post",
            url: "hr24/add_follow_record/",
            data: option
          })
            .then(res => {
              if (res.data.status == 1) {
                this.fullowDia = false;
                let option = new URLSearchParams();

                option.append("agent_id", this.agentId);
                option.append("customer_id", this.customerId);
                option.append("session_key", this.session_key);
                this.$http({
                  method: "post",
                  url: "hr24/sale_customer_info/",
                  data: option
                }).then(res => {
                  this.uesrData(
                    0,
                    0,
                    0,
                    this.radioSale == "" ? `0` : this.radioSale
                  );
                  this.$message({
                    showClose: true,
                    message: "保存跟单记录成功",
                    type: "success"
                  });
                  if (res.data.status == -2) {
                    this.$message({
                      showClose: true,
                      message: "网络请求错误，刷新重试！",
                      type: "error"
                    });
                  } else {
                    this.userXq = res.data.data.customer_info[0];
                    this.followRecord = res.data.data.follow_record;
                    if (this.followRecord.length != 0) {
                      this.followShow = true;
                      this.followShow1 = false;
                    } else {
                      this.followShow = false;
                      this.followShow1 = true;
                    }
                  }
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
        } else {
          this.$message({
            showClose: true,
            message: "请检查跟进记录是否填写完整",
            type: "error"
          });
        }
      });
    },
    // 取消保存跟进记录
    fullowCancel(done) {
      this.$confirm("确认放弃保存跟单记录？")
        .then(_ => {
          this.fullowDia = false;
        })
        .catch(_ => {});
    },
    // 取消提交合同
    Cancellation() {
      this.$confirm("确认放弃提交合同吗？")
        .then(_ => {
          this.contract = false;
        })
        .catch(_ => {});
    },
    // 点击按钮数据
    buttonClick() {
      this.contract = true;
      let option = new URLSearchParams();

      option.append("session_key", this.session_key);
      this.$http({
        method: "post",
        url: "hr24/return_sale_deal_dict/",
        data: option
      })
        .then(res => {
          if (res.data.status == 1) {
            this.contractData = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 提交合同
    contractClick() {
      this.fileList = [];
      this.fileList1 = [];
      this.buttonClick();
      this.buttonNumber = 0;
    },
    // 点击修改合同
    modifyClickT() {
      this.contract = true;
      let option = new URLSearchParams();

      option.append("deal_id", this.dealId);
      option.append("session_key", this.session_key);
      this.$http({
        method: "post",
        url: "hr24/return_sale_deal_info/",
        data: option
      }).then(res => {
        if (res.data.status == 1) {
          this.contractData = res.data.data.deal_info[0];
          this.fileList = this.contractData.contract_img_url;
          this.fileList1 = this.contractData.money_back_img_url;
        }
      });
    },

    // 续费合同
    renewClick() {
      this.buttonClick();
      this.buttonNumber = 1;
    },
    // 上传图片前
    beforeUpload(file) {
      this.uploaDate.customer_id = this.customerId;
      this.uploaDate.user_id = 1;
      this.uploaDate.session_key=this.session_key
    },
    beforeUpload1(file) {
      this.uploaDate1.customer_id = this.customerId;
      this.uploaDate1.user_id = 1;
      this.uploaDate1.session_key=this.session_key
    },
    // 删除合同图片
    handleRemove(file, fileList) {
      this.fileList = fileList;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handSuccess(response, fileList) {
      if (response.status == -2) {
        this.$message({
          showClose: true,
          message: "上传文件类型错误！",
          type: "error"
        });
      } else if (response.status == -1) {
        this.$message({
          showClose: true,
          message: "'图片保存失败！请刷新重试",
          type: "error"
        });
      } else if (response.status == -3) {
        this.contractUrl.push(response.data);
        this.$message({
          showClose: true,
          message: "这张图片已经上传过啦！",
          type: "error"
        });
      }else if(response.status == -10){
         this.$message({
          showClose: true,
          message: "用户未登录！",
          type: "error"
        });
      } else {
        this.contractUrl.push(response.data);
      }
    },
    handSuccess1(response) {
      if (response.status == -2) {
        this.$message({
          showClose: true,
          message: "上传文件类型错误！",
          type: "error"
        });
      } else if (response.status == -1) {
        this.$message({
          showClose: true,
          message: "图片保存失败！请刷新重试",
          type: "error"
        });
      }else if(response.status == -3){
         this.moneyUrl.push(response.data);
          this.$message({
          showClose: true,
          message: "这张图片已经上传过啦！",
          type: "error"
        });
      } else if(response.status == -10){
         this.$message({
          showClose: true,
          message: "用户未登录！",
          type: "error"
        });
      } else {
        this.moneyUrl.push(response.data);
      }
    },
    handlePicture(file) {
      this.dialogImageUrl1 = file.url;
      this.dialogVisible1 = true;
    },
    moneyRemove(file, fileList) {
      this.fileList1 = fileList;
    },
    // 提交合同按钮
    buttonData(urlDaa) {
      if (this.contractUrl.length == 0 || this.moneyUrl.length == 0) {
        this.$message({
          showClose: true,
          message: "你还没有上传合同/回款图片，请检查！",
          type: "error"
        });
      } else {
        this.contractData.contract_img_url = this.contractUrl;
        this.contractData.money_back_img_url = this.moneyUrl;
        let option = new URLSearchParams();

        option.append("customer_id", this.customerId);
        option.append("sc_id", this.saleId);
        option.append("deal_data", JSON.stringify(this.contractData));
        option.append("session_key", this.session_key);
        this.$http({
          method: "post",
          url: urlDaa,
          data: option
        })
          .then(res => {
            if (res.data.status == 1) {
              this.contract = false;
              (this.showFile = false),
                (this.showFile1 = false),
                this.uesrData(
                  0,
                  0,
                  0,
                  this.radioSale == "" ? `0` : this.radioSale
                );
              this.$message({
                showClose: true,
                message: "合同提交成功，请等待审核！",
                type: "success"
              });
              this.isPost = true;
              this.isPostNumber = 2;
            } else if (res.data.status == -3) {
              this.contract = false;
              (this.showFile = false),
                (this.showFile1 = false),
                this.$message({
                  showClose: true,
                  message: "该合同已提交过，请勿重复提交！",
                  type: "error"
                });
            } else {
              this.$message({
                showClose: true,
                message: res.data.data,
                type: "erro"
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 点击提交合同
    contractUrlClick(formName) {
      this.contractData.contract_img_url = [];
      this.contractData.money_back_img_url = [];
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.is_money_back == -1) {
            this.contractUrl.forEach((item, index) => {
              this.contractData.contract_img_url[index] = item;
            });
            this.fileList.forEach(item => {
              this.contractData.contract_img_url.push(item.url);
            });
            this.moneyUrl.forEach((item, index) => {
              this.contractData.money_back_img_url[index] = item;
            });
            this.fileList1.forEach(item => {
              this.contractData.money_back_img_url.push(item.url);
            });

            let option = new URLSearchParams();
            option.append("customer_id", this.customerId);
            option.append("deal_id", this.dealId);
            option.append("sc_id", this.saleId);
            option.append("deal_data", JSON.stringify(this.contractData));
            option.append("session_key", this.session_key);
            this.$http({
              method: "post",
              url: "hr24/post_change_deal/",
              data: option
            }).then(res => {
              if (res.data.status == 1) {
                this.uesrData(
                  0,
                  1,
                  0,
                  this.radioSale == "" ? `0` : this.radioSale
                );
                this.$message({
                  showClose: true,
                  message: res.data.data,
                  type: "success"
                });
                this.contract = false;
                this.centerDialogVisible = false;
              } else {
                this.$message({
                  showClose: true,
                  message: res.data.data,
                  type: "error"
                });
              }
            });
          } else {
            if (this.buttonNumber == 0) {
              this.buttonData("hr24/post_deal/");
            } else if (this.buttonNumber == 1) {
              this.buttonData("hr24/renew_post_deal/");
            }
          }
        } else {
          this.$message({
            showClose: true,
            message: "合同信息填写有误，请检查重写！",
            type: "error"
          });
          return false;
        }
      });
    },
    // 请求数据
    uesrData(byKey, isDeal, page, id) {
      let option = new URLSearchParams();

      option.append("order_by_key", byKey);
      option.append("is_deal", isDeal);
      option.append("page", page);
      option.append("sale_id", id);
      option.append("session_key", this.session_key);
      this.$http({
        method: "post",
        url: "hr24/sale_customer_list/",
        data: option
      }).then(res => {
        if (res.data.status == -2) {
          this.loadingTelt = false;
          this.tableData = res.data.data.customer_list;
          this.totalNmb = 0;
          if (!this.shifang) {
            this.$message({
              showClose: true,
              message: res.data.data,
              type: "error"
            });
          }
        } else if (res.data.status == 1) {
          this.loadingTelt = false;
          this.tableData = res.data.data.customer_list;
          this.totalNmb = res.data.data.customer_count;
        }
      });
    },
    // 开关
    switchV() {
      if (this.value2) {
        this.uesrData(0, 1, 0, this.radioSale == "" ? `0` : this.radioSale);
      } else {
        this.uesrData(0, 0, 0, this.radioSale == "" ? `0` : this.radioSale);
      }
    },
    // 翻页改变
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.uesrData(
        0,
        0,
        currentPage - 1,
        this.radioSale == "" ? `0` : this.radioSale
      );
    },
    // 上一页
    prevClick() {
      this.uesrData(
        0,
        0,
        this.currentPage - 2,
        this.radioSale == "" ? `0` : this.radioSale
      );
    },
    // 下一页
    nextClick() {
      this.uesrData(
        0,
        0,
        this.currentPage,
        this.radioSale == "" ? `0` : this.radioSale
      );
    },
    // 筛选销售人员
    radioGrou(id) {
      this.radioSale = id;

      this.uesrData(0, 0, this.currentPage - 1, id);
    }
  },
  mounted() {
    let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    this.user_type = userInfo.data.data.user_type;

    this.agentId = userInfo.data.data.agent_id;
    this.session_key = userInfo.data.data.session_key;
    let option = new URLSearchParams();

    option.append("order_by_key", 0);
    option.append("sale_id", this.radioSa);
    option.append("session_key", this.session_key);
    this.$http({
      method: "post",
      url: "hr24/sale_customer_list/",
      data: option
    }).then(res => {
      if (res.data.status == -2) {
        this.loadingTelt = false;
        this.$message({
          showClose: true,
          message: res.data.data,
          type: "error"
        });
      } else if (res.data.status == 1) {
        this.loadingTelt = false;
        this.tableData = res.data.data.customer_list;
        this.totalNmb = res.data.data.customer_count;
      }
    });
    this.$http({
      method: "post",
      url: "hr24/return_sale_person_list/",
      data: option
    }).then(res => {
      this.loadingSale = false;
      this.saleNamer = res.data.data.sale_person_list;
    });
  },
  watch: {
    "$store.state.storer.count": function() {
      let option = new URLSearchParams();

      option.append("order_by_key", 0);
      option.append("sale_id", this.radioSa);
      option.append("session_key", this.session_key);
      this.$http({
        method: "post",
        url: "hr24/sale_customer_list/",
        data: option
      }).then(res => {
        if (res.data.status == -2) {
          this.loadingTelt = false;
          s;
          this.$message({
            showClose: true,
            message: res.data.data,
            type: "error"
          });
        } else if (res.data.status == 1) {
          this.loadingTelt = false;
          this.tableData = res.data.data.customer_list;
          this.totalNmb = res.data.data.customer_count;
        }
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
.addJd {
  display: flex;
  justify-content: space-between;
}
#el-el-drawer__title {
  font-size: 18px;
}
.demo-drawer__footer {
  display: flex;
  justify-content: center;
}
.useJd {
  width: 100%;
  display: flex;
  height: 100%;
}
.left {
  width: 49%;
  height: 100%;
  background: red;
}
.rigth {
  width: 49%;
  height: 100%;
  background: yellow;
}
.drwwer /deep/.el-drawer__header span {
  font-size: 18px;
  font-weight: bold;
}
.modify {
  text-align: right;
}
.el-form-item {
  margin-bottom: 20px;
}
.fullow {
  font-size: 18px;
  text-align: center;
  margin-bottom: 10px;
}
.suecss {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}
.timeClass {
  margin-left: 30px;
  padding-top: 10px;
  font-size: 14px;

  display: flex;
  justify-content: space-between;
}
.timeP {
  margin-left: 30px;
}
.timeClass span {
  font-size: 17px;
  display: inline-block;
  width: 220px;
}
.fullowP {
  width: 100%;
  background: #fafafa;
  margin-top: 15px;
}

.formBottom {
  border-bottom: 1px dashed #c6e4f1;
}
.inputBox /deep/.el-input--suffix .el-input__inner {
  width: 85%;
}
/deep/.el-input--suffix .el-input__inner {
  padding-right: 16px;
}
.boxForm /deep/.el-form-item__content {
  width: 80%;
}
</style>

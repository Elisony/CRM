<template>
  <!-- 这里是RPO管理 -->
  <div v-if="showHome">
    <!-- 新建项目 -->
    <div v-show="show" class="boxRpo">
      <div class="iconRpo" @click="iconClick">
        <span>+</span>
      </div>
      <h3>新建项目</h3>
    </div>
    <!-- 创建项目信息 -->
    <div class="boxPush" v-show="show1">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="form.name" style="width: 150px;"></el-input>
        </el-form-item>
        <el-form-item label="项目期限" required>
          <el-col :span="7">
            <el-form-item prop="date1">
              <el-date-picker
                type="date"
                placeholder="选择开始日期"
                v-model="form.date1"
                style="width: 150px;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="3">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-date-picker
                type="date"
                placeholder="选择结束日期"
                v-model="form.date2"
                style="width: 150px;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="需求人数" style="width: 400px;">
          <el-input v-model.number="form.person" style="width: 150px;margin-right:10px"></el-input>
          <span style="color:red">&nbsp;*如不限人数，就无需填写</span>
        </el-form-item>
        <el-form-item label="需求年龄">
          <el-input v-model.number="form.age" style="width: 75px;"></el-input>
          <span class="line">~</span>
          <el-input v-model="form.age1" style="width: 75px;margin-right:10px"></el-input>
          <span style="color:red">*如不限年龄，就无需填写</span>
        </el-form-item>
        <el-form-item label="需求职位" prop="jd">
          <el-input v-model="form.jd" style="width: 150px;"></el-input>
        </el-form-item>
        <el-form-item label="需求性别" prop="resource">
          <el-radio-group v-model="form.resource">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
            <el-radio label="不限"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="需求学历" prop="type">
          <el-radio-group v-model="form.type">
            <el-radio label="初中以上" name="type"></el-radio>
            <el-radio label="高中以上" name="type"></el-radio>
            <el-radio label="大专以上" name="type"></el-radio>
            <el-radio label="本科以上" name="type"></el-radio>
            <el-radio label="不限" name="type"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="对接人" prop="Docker">
          <el-input v-model="form.Docker" style="width: 150px;"></el-input>
        </el-form-item>
        <el-form-item label="对接电话" prop="dialUp">
          <el-input v-model="form.dialUp" style="width: 150px;" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-input v-model="form.city" style="width: 150px;"></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="personCh">
          <el-input v-model="form.personCh" style="width: 150px;"></el-input>
        </el-form-item>
        <el-form-item label="结算标准" prop="biaozhun">
          <el-input type="textarea" autosize v-model="form.biaozhun" style="width: 150px;"></el-input>
        </el-form-item>

        <el-form-item label="结算价格" prop="mouch">
          <el-input autosize v-model="form.mouch" style="width: 150px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 项目展示 -->
    <div v-show="show2">
      <div class="baojiaqi">
        <el-button type="primary" @click="baojiaDialogVisible=true">报价器</el-button>
        <el-button @click="zhanshiAll">展示全部项目</el-button>
        <el-button @click="under">当前进行中：{{underwayAmount}}</el-button>
        <el-button @click="finish">当前已完成：{{finishAmount}}</el-button>
        <el-button @click="overAunt">当前已中止：{{overAmount}}</el-button>
      </div>
      <div class="boxShow" v-loading="loading" element-loading-text="玩命加载中">
        <!-- 点击项目进入 -->
        <div
          v-for="(item,index) in titJD"
          :key="index"
          :class="[`boxShowOne`,item.is_used==0?`boxOne`:item.is_used==1?`boxTwo`:`boxThree`]"
          @click="boxShowClick(item,index)"
        >
          <h3>{{item.project_name}}</h3>
        </div>
        <i
          @click="pushIcon"
          class="el-icon-circle-plus-outline"
          style="font-size:65px;color:#3fb2e8"
        ></i>
      </div>
      <el-dialog
        title="价格预估"
        :visible.sync="baojiaDialogVisible"
        width="70%"
        center
        @close="closeDialog"
      >
        <h3>企业吸引力</h3>
        <div class="cascaderList">
          <el-cascader
            :placeholder="enterpriseAttraction[index].label"
            v-for="(item,index) in enterpriseAttraction"
            :key="index"
            :options="item.children"
            @change="cascaderChang(item.type,$event,index)"
            clearable="clearable"
          ></el-cascader>
        </div>
        <h3>岗位要求</h3>
        <div class="cascaderList">
          <el-cascader
            :placeholder="JobRequirements[index].label"
            v-for="(item,index) in JobRequirements"
            :key="index"
            :options="item.children"
            @change="cascaderChangOne(item.type,$event,index)"
            clearable="clearable"
          ></el-cascader>
        </div>
        <h3>薪酬福利</h3>
        <div class="cascaderList">
          <el-cascader
            :placeholder="payRequirements[index].label"
            v-for="(item,index) in payRequirements"
            clearable="clearable"
            :key="index"
            :options="item.children"
            @change="cascaderChangTow(item.type,$event,index)"
          ></el-cascader>
        </div>
        <h3>工作时间</h3>
        <div class="cascaderList">
          <el-cascader
            :placeholder="WorkingHours[index].label"
            clearable="clearable"
            v-for="(item,index) in WorkingHours"
            :key="index"
            :options="item.children"
            @change="cascaderChangThree(item.type,$event,index)"
          ></el-cascader>
        </div>
        <h3>招聘流程</h3>
        <div class="cascaderList">
          <el-cascader
            :placeholder="RecruitmentProcess[index].label"
            clearable="clearable"
            v-for="(item,index) in RecruitmentProcess"
            :key="index"
            :options="item.children"
            @change="cascaderChangFour(item.type,$event,index)"
          ></el-cascader>
        </div>
        <h3>入职流程</h3>
        <div class="cascaderList">
          <el-cascader
            :placeholder="InitiationProcess[index].label"
            clearable="clearable"
            v-for="(item,index) in InitiationProcess"
            :key="index"
            :options="item.children"
            @change="cascaderChangFive(item.type,$event,index)"
          ></el-cascader>
        </div>
        <div style="display: flex;
    justify-content: center;
    margin-top: 25px;">
          <el-button type="primary" @click="baojiaClick" style="margin-right:15px">获取报价</el-button>
          <h2>预估价格为：{{price}}元</h2>
        </div>
      </el-dialog>
    </div>
    <!-- 简历详情 -->
    <div class="jdShow" v-show="show3">
      <el-dialog title="提示" :visible.sync="ronterJd" width="30%" center>
        <span style="color:red;font-size:18px">你还没给该项目添加简历，请点击确定前往公海添加简历！</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="ronterJd = false">取 消</el-button>
          <el-button type="primary" @click="sureJd">确 定</el-button>
        </span>
      </el-dialog>
      <h4 style="cursor: pointer;width:300px" @click="backJd">
        当前选择的项目：
        <span>{{titleJd}}</span>
        <span style="color:red">（点击可切换项目）</span>
      </h4>
      <div style="margin-bottom:10px">
        <el-button type="success" @click="jdDetails">项目信息</el-button>
        <el-button type="info" @click="addedJd">新增简历</el-button>
      </div>
      <el-dialog title="新增简历" :visible.sync="addedJdShow" width="50%" center>
        <el-form
          :model="addedJddata"
          label-width="80px"
          style="display:flex;justify-content: space-between;flex-wrap:wrap;"
        >
          <el-form-item label="用户名">
            <el-input v-model="addedJddata.user_name" style="width: 200px;" placeholder="请输入用户姓名"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input
              v-model="addedJddata.user_phone"
              @keyup="this.addedJddata.user_phone=this.addedJddata.user_phone.replace(/[^0-9-]+/,'')"
              placeholder="请输入正确的手机号码"
              style="width: 200px;"
            ></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="addedJddata.age" placeholder="请输入求职者年龄"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="addedJddata.sex" placeholder="请选择性别">
              <el-option
                v-for="item in sexList"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学历">
            <el-select v-model="addedJddata.edu_background" placeholder="请选择学历">
              <el-option
                v-for="item in eduList"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工作经验">
            <el-input v-model="addedJddata.exp" placeholder="请输入工作经验"></el-input>
          </el-form-item>
          <el-form-item label="期望地点">
            <el-select
              v-model="addplaceData"
              filterable
              remote
              reserve-keyword
              placeholder="请输入期望地点关键词"
              :remote-method="remoteMethod"
              :loading="Addloading"
            >
              <el-option
                v-for="(item,index) in addPlace"
                :key="index"
                :label="item.label"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="期望职位">
            <el-select
              v-model="addpositionData"
              filterable
              remote
              reserve-keyword
              placeholder="请输入期望职位关键词"
              :remote-method="remotePosition"
              :loading="AddloadingTow"
            >
              <el-option
                v-for="(item,index) in addPosition"
                :key="index"
                :label="item.label"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="期望薪资">
            <el-input v-model="addedJddata.expected_salary" placeholder="请输入期望薪资"></el-input>
          </el-form-item>
          <el-form-item label="来源网站">
            <el-input v-model="addedJddata.source_net" style="width: 200px;" placeholder="请输入来源网站"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="danger" style="margin-left:40%" @click="AddJd">确定新增</el-button>
        <span style="color:red">（*以上全为必填项！！！）</span>
      </el-dialog>
      <el-dialog title="项目详情" :visible.sync="centerDialogVisible" width="50%" center>
        <el-form
          ref="form"
          :model="jdtt"
          label-width="80px"
          style="display:flex;justify-content: space-between;flex-wrap:wrap;"
        >
          <el-form-item label="项目名称">
            <el-input
              v-model="jdtt.project_name"
              @keyup="this.value=this.value.replace(/[^\u4e00-\u9fa5]/g,'')"
            ></el-input>
          </el-form-item>
          <el-form-item label="项目期限" style="width:280px">
            <el-input v-model="jdtt.deadline"></el-input>
          </el-form-item>
          <el-form-item label="负责人">
            <el-input v-model="jdtt.director"></el-input>
          </el-form-item>
          <el-form-item label="对接人">
            <el-input v-model="jdtt.dock_man"></el-input>
          </el-form-item>
          <el-form-item label="对接电话">
            <el-input v-model="jdtt.dock_man_phone"></el-input>
          </el-form-item>
          <el-form-item label="城市">
            <el-input v-model="jdtt.city"></el-input>
          </el-form-item>
          <el-form-item label="人数">
            <el-input v-model="jdtt.number"></el-input>
          </el-form-item>
          <el-form-item label="职位">
            <el-input v-model="jdtt.position"></el-input>
          </el-form-item>
          <el-form-item label="学历">
            <el-input v-model="jdtt.edu"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="jdtt.sex"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="jdtt.age"></el-input>
          </el-form-item>
          <el-form-item label="结算价格">
            <el-input v-model="jdtt.price"></el-input>
          </el-form-item>
          <el-form-item label="结算标准">
            <el-input v-model="jdtt.standard"></el-input>
          </el-form-item>
          <el-form-item label="项目状态">
            <el-select
              v-model="projectVlaue"
              :placeholder="jdtt.is_used==0?`项目正在进行中`:jdtt.is_used==1?`项目已完成`:`项目已结束`"
              @change="projectChange"
            >
              <el-option
                v-for="item in project"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-button type="danger" style="margin-left:40%" @click="Determine">确定修改</el-button>
        <span style="color:red">（*请按照以上格式修改）</span>
      </el-dialog>
      <div class="screen">
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="选择日期"
          @change="timeChang"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
        <el-select v-model="value" clearable placeholder="请选择跟进人" @change="renChang">
          <el-option v-for="item in followUp" :key="item" :value="item"></el-option>
        </el-select>
        <el-input
          placeholder="请输入求职者名字"
          prefix-icon="el-icon-search"
          class="inputName"
          v-model="input1"
          @blur="nameChang"
        ></el-input>
        <el-select v-model="valueZt" clearable placeholder="请选择跟进状态" @change="ZtChang">
          <el-option
            v-for="item in optionsState"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <el-table
        :data="tableData"
        fit
        class="rpoXm"
        v-loading.fullscreen.lock="loadJd"
        element-loading-text="正在玩命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <el-table-column label="需求时间" align="center" type="input">
          <template slot-scope="scope">
            <span>{{scope.row.post_time}}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" align="center" type="input">
          <template slot-scope="scope">
            <div class="xiuName" @click="xiuName(scope.$index)">
              <span>{{scope.row.user_name}}</span>
              <i class="el-icon-edit el-input__icon" style="line-height: 24px;"></i>
            </div>
            <el-input
              autofocus
              class="nameInput"
              size="mini"
              v-model="scope.row.user_name"
              @blur="nameBlur(scope.$index)"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="性别" align="center" type="input">
          <template slot-scope="scope">
            <div class="xiuName1" @click="xiuSex(scope.$index)">
              <span>{{scope.row.sex}}</span>
              <i class="el-icon-edit el-input__icon" style="line-height: 24px;"></i>
            </div>
            <el-input
              autofocus
              class="nameInput1"
              size="mini"
              maxlength="1"
              v-model="scope.row.sex"
              @blur="sexBlur(scope.$index)"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="区域" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="xiuName2" @click="xiuPl(scope.$index)">
              <span>{{scope.row.place_content}}</span>
              <i class="el-icon-edit el-input__icon" style="line-height: 24px;"></i>
            </div>
            <el-input
              class="nameInput2"
              size="mini"
              v-model="scope.row.place_content"
              @blur="plBlur(scope.$index)"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="职位" align="center" type="input" show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="xiuName3" @click="xiuZw(scope.$index)">
              <span>{{scope.row.position_content}}</span>
              <i class="el-icon-edit el-input__icon" style="line-height: 24px;"></i>
            </div>
            <el-input
              class="nameInput3"
              size="mini"
              v-model="scope.row.position_content"
              @blur="zwBlur(scope.$index)"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="学历" align="center" type="input">
          <template slot-scope="scope">
            <div class="xiuName4" @click="xiuEdu(scope.$index)">
              <span>{{scope.row.edu_background}}</span>
              <i class="el-icon-edit el-input__icon" style="line-height: 24px;"></i>
            </div>
            <el-input
              class="nameInput4"
              size="mini"
              v-model="scope.row.edu_background"
              @blur="eduBlur(scope.$index)"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="年龄" align="center" type="input">
          <template slot-scope="scope">
            <div class="xiuName5" @click="xiuAge(scope.$index)">
              <span>{{scope.row.age}}</span>
              <i class="el-icon-edit el-input__icon" style="line-height: 24px;"></i>
            </div>
            <el-input
              class="nameInput5"
              size="mini"
              v-model="scope.row.age"
              maxlength="2"
              pattern="[0-9]"
              @blur="ageBlur(scope.$index)"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="联系方式" align="center" width="125" type="input">
          <template slot-scope="scope">
            <div class="xiuName6" @click="xiuPhon(scope.$index)">
              <span>{{scope.row.user_phone}}</span>
              <i class="el-icon-edit el-input__icon" style="line-height: 24px;"></i>
            </div>
            <input
              class="nameInput6"
              size="mini"
              v-model="scope.row.user_phone"
              @blur="phonBlur(scope.$index)"
              maxlength="11"
            />
          </template>
        </el-table-column>
        <el-table-column label="跟进状态" align="center" type="input">
          <template slot-scope="scope">
            <select
              @change="changeProduct($event,scope.$index)"
              class="seleAll"
              v-model="scope.row.follow_status"
            >
              <option value="1">未邀约</option>
              <option value="2">已邀约</option>
              <option value="3">未面试</option>
              <option value="4">已面试</option>
              <option value="5">已试岗</option>
              <option value="6">未入职</option>
              <option value="7">已入职</option>
            </select>
          </template>
        </el-table-column>
        <el-table-column label="跟进人" align="center" type="input">
          <template slot-scope="scope">
            <div class="xiuName7" @click="xiuFollow(scope.$index)">
              <span>{{scope.row.follow_man}}</span>
              <i class="el-icon-edit el-input__icon" style="line-height: 24px;"></i>
            </div>
            <el-input
              class="nameInput7"
              size="mini"
              v-model="scope.row.follow_man"
              @blur="followMan(scope.$index)"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="跟进记录" align="center" show-overflow-tooltip type="input">
          <template slot-scope="scope">
            <div class="xiuName8" @click="xiuRecord(scope.$index)">
              <span>{{scope.row.follow_record}}</span>
              <i class="el-icon-edit el-input__icon" style="line-height: 24px;"></i>
            </div>
            <el-input
              class="nameInput8"
              size="mini"
              v-model="scope.row.follow_record"
              @blur="followRecord(scope.$index)"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="查看详情" align="center" type="input">
          <template slot-scope="scope">
            <el-button
              round
              type="info"
              style="width:70px;padding:12px 0"
              @click="seeDtails(scope.row,scope.$index)"
              :loading="seeDt"
            >查看详情</el-button>
          </template>
        </el-table-column>
        <el-table-column label="释放简历" align="center" type="input">
          <template slot-scope="scope">
            <el-button
              type="danger"
              round
              style="width:70px;padding:12px 0"
              @click="release(scope.row)"
            >释放简历</el-button>
          </template>
        </el-table-column>
        <el-table-column label="保存简历" align="center" type="input">
          <template slot-scope="scope">
            <el-button
              round
              type="success"
              style="width:70px;padding:12px 0"
              @click="successJd(scope.row,scope.$index)"
            >保存简历</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        @prev-click="prevClick"
        @next-click="nextClick"
        layout="total, prev, pager, next, jumper"
        :total="totalCount"
        style="text-align:center;margin-top: 15px;"
      ></el-pagination>
      <el-dialog title="简历详情" :visible.sync="dialogTableVisible" top="1vh">
        <el-table :data="seeJd" style="width: 100%" :show-header="headTit">
          <el-table-column align="center">
            <template slot-scope="scope">
              <img
                class="imgJd"
                :src="scope.row.pic_url==``&&scope.row.sex==`男`?`http://pic.xiami.net/images/avatar_new/1931/56867b2830e86_96590874_1451653928.jpg@1e_1c_0i_1o_100Q_200w.jpg`:scope.row.pic_url==``&&scope.row.sex==`女`?`http://pic.xiami.net/images/avatar_new/1034/5c8e5317ce915_51741042_1552831255.jpg@1e_1c_0i_1o_100Q_200w.jpg`:scope.row.pic_url"
              />
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <h2>{{scope.row.user_name}}</h2>
              <p>
                <img
                  src="//img07.51jobcdn.com/imehire/ehire2007/defaultnew/image/resumedetails/y1.png"
                  style="vertical-align: middle;"
                />正在找工作
              </p>
              <p>
                <img
                  src="//img07.51jobcdn.com/imehire/ehire2007/defaultnew/image/resumedetails/y2.png"
                  style="vertical-align: middle;"
                />
                {{scope.row.user_phone=="0"?"无":scope.row.user_phone}}
              </p>
              <p style="cursor: pointer;" @click="wxClcik(scope.row)" v-if="wxShow">
                <img src="../../../assets/404_images/wx.png" style="vertical-align: middle;" />
                {{scope.row.wx_id==null||scope.row.wx_id==``?`暂无微信，点击可添加`:scope.row.wx_id}}
                <i
                  class="el-icon-edit el-input__icon"
                  style="line-height: 24px;"
                ></i>
                <br />
                <span style="color:red">（修改微信时，按回车键或移除输入框可保存微信）</span>
              </p>
              <input
                v-else
                class="wxInput"
                placeholder="请输入微信号，输入完毕回车保存"
                v-model="scope.row.wx_id"
                @keydown="wxInp($event,scope.row)"
                @blur="wxBlur(scope.row)"
              />
              <p>
                <img
                  src="//img07.51jobcdn.com/imehire/ehire2007/defaultnew/image/resumedetails/y4.png"
                  style="vertical-align: middle;"
                />

                <span>&nbsp;{{scope.row.sex}}</span>&nbsp;|&nbsp;
                <span>{{scope.row.age}}岁</span>&nbsp;|&nbsp;
                <span class="spanTex">&nbsp;{{scope.row.edu_background}}</span>
                &nbsp;|&nbsp;
                <span>工作经验：&nbsp;{{scope.row.exp}}</span>
              </p>
            </template>
          </el-table-column>
          <el-table-column align="center">
            <template slot-scope="scope">
              <el-button>
                <a :href="scope.row.resume_url" target="_blank">简历链接</a>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-table :data="seeJd" style="width: 100%" :show-header="headTit">
          <el-table-column>
            <template slot-scope="scope">
              <h3>求职意向</h3>
              <ul class="qiuJd">
                <li>
                  <span>期望薪资：{{scope.row.expected_salary=="0"?`保密`:scope.row.expected_salary}}</span>
                </li>
                <li>
                  <span>期望地点：{{scope.row.place_content}}</span>
                </li>
                <li>
                  <span>期望职位：{{scope.row.position_content}}</span>
                </li>
                <li>
                  <span>自我评价：{{scope.row.self_evaluation==""?`无`:scope.row.self_evaluation}}</span>
                </li>
              </ul>
            </template>
          </el-table-column>
        </el-table>
        <el-table :data="seeJd" style="width: 100%" :show-header="headTit" v-if="expShow">
          <el-table-column>
            <template slot-scope="scope">
              <h3>工作经验</h3>
              <ul class="qiuJd" v-for="(item,index) in scope.row.work_exp" :key="index">
                <li>
                  <h3 style="margin-bottom: 0;">{{item.company_name}}</h3>
                </li>
                <li>
                  <span>工作时间：{{item.work_time}}</span>
                </li>
                <li>
                  <span>薪资水平：{{item.work_salary}}</span>
                </li>
                <li>
                  <span>在职职位：{{item.work_position}}</span>
                </li>
                <li>
                  <span>工作内容：{{item.work_content==""?`保密`:item.work_content}}</span>
                </li>
              </ul>
            </template>
          </el-table-column>
        </el-table>
        <el-table :data="seeJd" style="width: 100%" :show-header="headTit" v-if="shcoolShow">
          <el-table-column>
            <template slot-scope="scope">
              <h3>教育经历</h3>
              <ul class="qiuJd">
                <li>
                  <h3>{{scope.row.graduate_school}}</h3>
                </li>
                <li>
                  <span>专业：{{scope.row.major==null?`保密`:scope.row.major}}</span>
                </li>
                <li>
                  <span>学历：{{scope.row.edu_background}}</span>
                </li>
                <li>
                  <span>毕业时间：{{scope.row.graduate_time=="None"?`保密`:scope.row.graduate_time}}</span>
                </li>
              </ul>
            </template>
          </el-table-column>
        </el-table>
        <el-table :data="seeJd" style="width: 100%" :show-header="headTit" v-if="genjinShow">
          <el-table-column>
            <template slot-scope="scope">
              <h3>跟进记录</h3>
              <ul class="qiuJd" v-for="(ite,inde) in scope.row.content" :key="inde">
                <li>
                  <h3 style="margin-bottom: 0;">{{ite.project_name}}</h3>
                </li>
                <li>
                  <span>跟进时间：{{ite.create_time}}</span>
                </li>
                <li>
                  <span>跟进人：{{ite.cuser__real_name}}</span>
                </li>
                <li>
                  <span>跟进内容：{{ite.content}}</span>
                </li>
              </ul>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { fips } from "crypto";
export default {
  inject: [`reload`],
  data() {
    return {
      currentPage: 1, //初始页
      pagesize: 50, //    每页的数据
      totalCount: 0,
      show: false,
      show1: false,
      show2: false,
      wxShow: true,
      wxId: "",
      show3: false,
      session_key: "",
      expShow: false,
      shcoolShow: false,
      genjinShow: false,
      centerDialogVisible: false,
      baojiaDialogVisible: false,
      dialogTableVisible: false,
      addedJdShow: false,
      addedJddata: {},
      eduList: [],
      sexList: [],
      addplaceData: [],
      addpositionData: [],
      addPosition: [],
      addPlace: [],
      addList: [],
      addPositionList: [],
      Addloading: false,
      AddloadingTow: false,
      ronterJd: false,
      headTit: false,
      seeJd: [],
      baojiaValue: [],
      number1: 0,
      number2: 0,
      number3: 0,
      number4: 0,
      number5: 0,
      number6: 0,
      valueZt: "",
      optionsState: [
        {
          value: "1",
          label: "未邀约"
        },
        {
          value: "2",
          label: "已邀约"
        },
        {
          value: "3",
          label: "未面试"
        },
        {
          value: "4",
          label: "已面试"
        },
        {
          value: "5",
          label: "已试岗"
        },
        {
          value: "6",
          label: "未入职"
        },
        {
          value: "7",
          label: "已入职"
        }
      ],
      checkList: [],
      checkList1: [],
      checkList2: [],
      checkList3: [],
      checkList4: [],
      checkList5: [],
      price: 0,
      props1: { multiple: true },
      clearable: true,
      enterpriseAttraction: [
        {
          type: 0,
          value: "jiaotongzhuangtai",
          label: "交通状况",
          children: [
            {
              type: 0,
              value: "5",
              label: "地铁沿线可到达"
            },
            {
              type: 0,
              value: "3",
              label: "下地铁后需换乘公交"
            },
            {
              type: 0,
              value: "5.05",
              label: "提供班车"
            },
            {
              type: 0,
              value: "2",
              label: "无轨道交通"
            }
          ]
        },
        {
          type: 1,
          value: "qiyezhimingdu",
          label: "企业知名度及是否有网站",
          children: [
            {
              type: 1,
              value: "3",
              label: "有网站"
            },
            {
              type: 1,
              value: "1",
              label: "无网站"
            },
            {
              type: 1,
              value: "1.01",
              label: "知名度较弱"
            }
          ]
        },
        {
          type: 2,
          value: "suoshuhanye",
          label: "所属行业",
          children: [
            {
              type: 2,
              value: "2.01",
              label: "电子商务、互联网"
            },
            {
              type: 2,
              value: "2",
              label: "快消、耐销、连锁、零售、商超、银行"
            },
            {
              type: 2,
              value: "1.01",
              label: "it、电子、制造业、电信运营"
            },
            {
              type: 2,
              value: "0.01",
              label: "金融、保险"
            },
            {
              type: 2,
              value: "0.02",
              label: "房地产、收藏品"
            },
            {
              type: 2,
              value: "0.03",
              label: "保健品、寿险、地产门店、教育培训"
            },
            {
              type: 2,
              value: "1",
              label: "其他行业"
            }
          ]
        },
        {
          type: 3,
          value: "gangwei",
          label: "岗位用工编制",
          children: [
            {
              type: 3,
              value: "0",
              label: "20人以下HC"
            },
            {
              type: 3,
              value: "1",
              label: "20-50人HC"
            },
            {
              type: 3,
              value: "3.01",
              label: "50-100人HC"
            },
            {
              type: 3,
              value: "3.02",
              label: "100-500人HC"
            },
            {
              type: 3,
              value: "3.03",
              label: "500人以上HC"
            }
          ]
        },
        {
          type: 4,
          value: "jibenxinzi",
          label: "基本薪资与同行业岗位比较",
          children: [
            {
              type: 4,

              value: "4",
              label: "比同行业高20%以上"
            },
            {
              type: 4,

              value: "2",
              label: "与同行业持平"
            },
            {
              type: 4,

              value: "1",
              label: "低于同行业"
            }
          ]
        },
        {
          type: 5,
          value: "jinsheng",
          label: "晋升周期及空间",
          children: [
            {
              type: 5,
              value: "4",
              label: "平均3个月一次晋升"
            },
            {
              type: 5,
              value: "3",
              label: "平均6个月一次晋升"
            },
            {
              type: 5,
              value: "1.01",
              label: "平均1年一次晋升"
            },
            {
              type: 5,
              value: "1",
              label: "无明确考评晋升周期"
            }
          ]
        }
      ],
      JobRequirements: [
        {
          type: 0,
          value: "gangweiliexing",
          label: "岗位类型",
          children: [
            {
              type: 0,
              value: "4",
              label: "无销售性质客服"
            },
            {
              type: 0,
              value: "3",
              label: "电话销售"
            },
            {
              type: 0,
              value: "2.02",
              label: "面对面销售"
            },
            {
              type: 0,
              value: "2",
              label: "电销加面销"
            },
            {
              type: 0,
              value: "3.01",
              label: "接听销售"
            },
            {
              type: 0,
              value: "3.02",
              label: "店员"
            },
            {
              type: 0,
              value: "3.03",
              label: "文员助理"
            }
          ]
        },
        {
          type: 1,
          value: "xueli",
          label: "学历（硬性要求）",
          children: [
            {
              type: 1,
              value: "5",
              label: "高中及中专以下"
            },
            {
              type: 1,
              value: "4",
              label: "高中及中专以上"
            },
            {
              type: 1,
              value: "2",
              label: "大专及以上"
            },
            {
              type: 1,
              value: "1",
              label: "本科及本科以上"
            }
          ]
        },
        {
          type: 2,
          value: "gongzuojingyan",
          label: "工作经验（硬性要求）",
          children: [
            {
              type: 2,
              value: "5",
              label: "无工作经验要求"
            },
            {
              type: 2,
              value: "4",
              label: "有1年工作经验"
            },
            {
              type: 2,
              value: "2",
              label: "有1年同岗位工作经验"
            },
            {
              type: 2,
              value: "1",
              label: "有1年同行业并同岗位工作经验"
            }
          ]
        },
        {
          type: 3,
          value: "yuyanyaoqiu",
          label: "语言要求",
          children: [
            {
              type: 3,
              value: "2.02",
              label: "无语言要求"
            },
            {
              type: 3,
              value: "2",
              label: "普通话标准"
            },
            {
              type: 3,
              value: "1.01",
              label: "英语要求"
            },
            {
              type: 3,
              value: "1",
              label: "粤语要求"
            },
            {
              type: 3,
              value: "0",
              label: "小语种要求"
            }
          ]
        }
      ],
      payRequirements: [
        {
          type: 0,
          value: "WUZEREN",
          label: "无责任薪资",
          children: [
            {
              type: 0,
              value: "2",
              label: "1500元以下"
            },
            {
              type: 0,
              value: "4",
              label: "1500-2000元"
            },
            {
              type: 0,
              value: "6",
              label: "2000-2500元"
            },
            {
              type: 0,
              value: "8",
              label: "2500-3000元"
            },
            {
              type: 0,
              value: "10",
              label: "3000-3500元"
            },
            {
              type: 0,
              value: "12.02",
              label: "3500-4000元"
            },
            {
              type: 0,
              value: "12.01",
              label: "4000-4500元"
            },
            {
              type: 0,
              value: "12.03",
              label: "4500-5000元"
            },
            {
              type: 0,
              value: "12",
              label: "5000元以上"
            }
          ]
        },
        {
          type: 1,
          value: "shiyongqi",
          label: "试用期无责任薪资",
          children: [
            {
              type: 1,
              value: "0.6",
              label: "试用期按照天数给与补贴"
            },
            {
              type: 1,
              value: "0.8",
              label: "试用期薪资为80%"
            },
            {
              type: 1,
              value: "1.01",
              label: "试用期薪资与转正一致"
            },
            {
              type: 1,
              value: "1",
              label: "试用期比转正后薪资高"
            }
          ]
        },
        {
          type: 2,
          value: "pingjunjixiao",
          label: "平均绩效薪资及提成",
          children: [
            {
              type: 2,
              value: "5",
              label: "500元以下"
            },
            {
              type: 2,
              value: "4",
              label: "500-1000元"
            },
            {
              type: 2,
              value: "2",
              label: "1001-2000元"
            },
            {
              type: 2,
              value: "1.01",
              label: "2001-3000元"
            },
            {
              type: 2,
              value: "1.03",
              label: "3001-4000元"
            },
            {
              type: 2,
              value: "1",
              label: "4001元以上"
            }
          ]
        },
        {
          type: 3,
          value: "shitang",
          label: "食堂（或餐补）及住宿",
          children: [
            {
              type: 3,
              value: "5",
              label: "提供住宿，无餐补"
            },
            {
              type: 3,
              value: "3",
              label: "不提供住宿，提供餐补"
            },
            {
              type: 3,
              value: "2",
              label: "不提供住宿，且无餐补"
            },
            {
              type: 3,
              value: "4",
              label: "不提供住宿，但有住宿补贴，有餐补"
            }
          ]
        },
        {
          type: 4,
          value: "wuuxianyij",
          label: "五险一金",
          children: [
            {
              type: 4,
              value: "5",
              label: "入职当月缴纳"
            },
            {
              type: 4,
              value: "4",
              label: "试用期过后缴纳"
            },
            {
              type: 4,
              value: "3",
              label: "只有五险，没有公积金"
            },
            {
              type: 4,
              value: "1",
              label: "没有五险一金"
            }
          ]
        }
      ],
      WorkingHours: [
        {
          type: 0,
          value: "gongzuoshijian",
          label: "工作时间及方式",
          children: [
            {
              type: 0,
              value: "8",
              label: "做五休二，9：00-18:00，双休"
            },
            {
              type: 0,
              value: "6",
              label: "做五休二，9：00-18:00，调休"
            },
            {
              type: 0,
              value: "5",
              label: "做五休二，8小时翻班，无夜班，无交通，困难班次"
            },
            {
              type: 0,
              value: "4.02",
              label: "做五休二，8小时翻班，有夜班，有交通，困难班次"
            },
            {
              type: 0,
              value: "4",
              label: "做一休一或做二休二，12小时工作制"
            },
            {
              type: 0,
              value: "2",
              label: "月度174小时工作制"
            }
          ]
        },
        {
          type: 1,
          value: "jiabangongzi",
          label: "加班工资",
          children: [
            {
              type: 1,
              value: "4",
              label: "有加班工资"
            },
            {
              type: 1,
              value: "2",
              label: "无加班工资"
            }
          ]
        },
        {
          type: 2,
          value: "yebanbutie",
          label: "夜班补贴",
          children: [
            {
              type: 2,
              value: "3",
              label: "提供夜班补贴"
            },
            {
              type: 2,
              value: "0",
              label: "不提供夜班补贴"
            }
          ]
        }
      ],
      RecruitmentProcess: [
        {
          type: 0,
          value: "mianshiliucheng",
          label: "面试流程",
          children: [
            {
              type: 0,
              value: "8",
              label: "当天面试，当天Offer，面试官可来现场面试"
            },
            {
              type: 0,
              value: "4",
              label: "当天面试，隔天复试"
            },
            {
              type: 0,
              value: "2.02",
              label: "当天面试，隔天另有多轮复试"
            },
            {
              type: 0,
              value: "2",
              label: "本公司初筛后，面试官面试"
            }
          ]
        },
        {
          type: 1,
          value: "mianshilierong",
          label: "面试内容",
          children: [
            {
              type: 1,
              value: "7",
              label: "仅沟通面试"
            },
            {
              type: 1,
              value: "4.01",
              label: "有笔试环节"
            },
            {
              type: 1,
              value: "4",
              label: "有心理测试环节"
            },
            {
              type: 1,
              value: "2",
              label: "有打字测试环节"
            }
          ]
        },
        {
          type: 2,
          value: "mianshizhudao",
          label: "面试部门",
          children: [
            {
              type: 2,
              value: "1",
              label: "业务部门"
            },
            {
              type: 2,
              value: "0",
              label: "HR部门"
            }
          ]
        },
        {
          type: 3,
          value: "offer",
          label: "Offer率预计",
          children: [
            {
              type: 3,
              value: "0.5",
              label: "Offer率30%以下"
            },
            {
              type: 3,
              value: "0.8",
              label: "Offer率30%-50%"
            },
            {
              type: 3,
              value: "1",
              label: "Offer率50%-80%"
            },
            {
              type: 3,
              value: "0.6",
              label: "从未使用过供应商也未自主招聘过"
            }
          ]
        }
      ],
      InitiationProcess: [
        {
          type: 0,
          value: "ruzhizhouqi",
          label: "入职周期",
          children: [
            {
              type: 0,
              value: "4",
              label: "随时可入职"
            },
            {
              type: 0,
              value: "3",
              label: "每周一次固定入职时间"
            },
            {
              type: 0,
              value: "2.01",
              label: "无固定入职周期"
            },
            {
              type: 0,
              value: "2",
              label: "根据招聘人数协商入职时间"
            }
          ]
        },
        {
          type: 1,
          value: "RUZHIZILIAO",
          label: "入职需提供资料",
          children: [
            {
              type: 1,
              value: "4",
              label: "正常资料提供（身份证，学历证书）"
            },
            {
              type: 1,
              value: "1",
              label: "特殊资料提供"
            }
          ]
        },
        {
          type: 2,
          value: "ruzhifankui",
          label: "入职反馈节点",
          children: [
            {
              type: 2,
              value: "7",
              label: "入职当天"
            },
            {
              type: 2,
              value: "5",
              label: "1-3天质保"
            },
            {
              type: 2,
              value: "3",
              label: "4-10天质保"
            },
            {
              type: 2,
              value: "1.01",
              label: "30天以上质保"
            },
            {
              type: 2,
              value: "1.02",
              label: "45天以上质保"
            },
            {
              type: 2,
              value: "1",
              label: "90天以上质保"
            }
          ]
        }
      ],
      loading: false,
      loadJd: false,
      value1: "",
      value2: "",
      hrId: "",
      agentId: "",
      seeDt: false,
      numberVaule: 2,
      resumeStatus: 1,
      // 进行中的数量
      underwayAmount: 0,
      // 已完成数量
      finishAmount: 0,
      // 已结束数量
      overAmount: 0,
      stateXm: 1,
      titleJd: "",
      titleId: "",
      value: "",
      input1: "",
      form: {
        name: "",
        age: "",
        mouch: "",
        age1: "",
        Docker: "",
        city: "",
        dialUp: "",
        biaozhun: "",
        jd: "",
        personCh: "",
        person: "",
        region: "",
        date1: "",

        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      tableData: [],
      genjin: [
        {
          value: "0",
          label: "未邀约"
        },
        {
          value: "1",
          label: "已邀约"
        },
        {
          value: "2",
          label: "未面试"
        },
        {
          value: "3",
          label: "已面试"
        },
        {
          value: "4",
          label: "已到岗"
        },
        {
          value: "5",
          label: "未入职"
        },
        {
          value: "6",
          label: "已入职"
        }
      ],
      followUp: [],
      titJD: [],

      rules: {
        name: [
          { required: true, message: "请输入项目名称", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ],
        Docker: [
          { required: true, message: "请填写对接人", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        personCh: [
          { required: true, message: "请填写负责人", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        city: [{ required: true, message: "请填写对接城市", trigger: "blur" }],
        dialUp: [
          { required: true, message: "请填写对接人电话", trigger: "blur" },
          { min: 11, max: 11, message: "长度在11个字符", trigger: "blur" }
        ],
        resource: [
          { required: true, message: "请选择性别", trigger: "change" }
        ],
        biaozhun: [
          { required: true, message: "请填写留言标准", trigger: "blur" },
          { min: 2, max: 150, message: "长度在2~150个字符", trigger: "blur" }
        ],
        type: [{ required: true, message: "请选择学历", trigger: "change" }],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择开始日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择结束日期",
            trigger: "change"
          }
        ],
        jd: [{ required: true, message: "请填写需求职位", trigger: "blur" }]
      },
      jdtt: [],
      project: [
        {
          value: "0",
          label: "项目正在进行中"
        },
        {
          value: "1",
          label: "项目已完成"
        },
        {
          value: "2",
          label: "项目已中止"
        }
      ],
      projectVlaue: "",
      showHome: true
    };
  },
  methods: {
    // 点击新建项目
    iconClick() {
      this.show = false;
      this.show1 = true;
    },
    // 点击立即创建
    submitForm(form) {
      // 获取年龄区间
      let num = this.form.age + "~" + this.form.age1;
      // 获取期限区间
      var date = new Date(this.form.date1);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var date1 = new Date(this.form.date2);
      var yy = date1.getFullYear();
      var mm = date1.getMonth() + 1;
      mm = mm < 10 ? "0" + mm : mm;
      var dd = date1.getDate();
      dd = dd < 10 ? "0" + dd : dd;
      let time1 = y + "-" + m + "-" + d;
      let time2 = yy + "-" + mm + "-" + dd;
      let time3 = time1 + "~" + time2;

      let formData = new URLSearchParams();
      //  项目名
      formData.append("project_name", this.form.name);
      //  期限
      formData.append("deadline", time3);
      // 负责人
      formData.append("director", this.form.personCh);
      // 城市
      formData.append("city", this.form.city);
      // 学历
      formData.append("edu", this.form.type);
      // 人数
      formData.append("number", this.form.person);
      //  职位
      formData.append("position", this.form.jd);
      // 性别
      formData.append("sex", this.form.resource);
      // 年龄
      if (this.form.age == "" && this.form.age1 == "") {
        formData.append("age", "");
      } else {
        formData.append("age", num);
      }
      // 对接人
      formData.append("dock_man", this.form.Docker);
      // 对接人电话
      formData.append("dock_man_phone", this.form.dialUp);
      // 结算标准
      formData.append("standard", this.form.biaozhun);
      // 结算价格
      formData.append("price", this.form.mouch);
      formData.append("agent_id", this.agentId);

      formData.append("session_key", this.session_key);
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$refs[form].resetFields();
          this.$http({
            method: "post",
            url: "hr24/create_project/",
            data: formData
          })
            .then(res => {
              this.show1 = false;
              this.show2 = true;
              let formData = new URLSearchParams();
              formData.append("agent_id", this.agentId);
              formData.append("session_key", this.session_key);
              if (res.data.status != -1) {
                this.$http({
                  method: "post",
                  url: "hr24/show_project_name/",
                  data: formData
                })
                  .then(res => {
                    let dataJd = JSON.parse(res.data.data);
                    if (res.data != -1) {
                      this.show = false;
                      this.show1 = false;
                      this.show2 = true;
                      this.titJD = dataJd;
                      this.$message({
                        showClose: true,
                        message: "项目创建成功！",
                        type: "success"
                      });
                    } else {
                      console.log("参数不对");
                    }
                  })
                  .catch(err => {
                    this.$message({
                      showClose: true,
                      message: "网络异常，请刷新重试！",
                      type: "error"
                    });
                  });
              } else {
                this.$message({
                  showClose: true,
                  message: "网络异常，请刷新重试！",
                  type: "error"
                });
              }
            })
            .catch(err => {
              this.$message({
                showClose: true,
                message: "网络异常，请刷新重试！",
                type: "error"
              });
            });
        } else {
          console.log("error submit!!");
          this.$message({
            showClose: true,
            message: "信息未填写完整，请检查！！！",
            type: "error"
          });
          return false;
        }
      });
    },
    // 点击取消
    cancel() {
      if (this.titJD.length == 0) {
        this.show = true;
        this.show1 = false;
      } else {
        this.show1 = false;
        this.show2 = true;
      }
    },
    pushIcon() {
      this.show2 = false;
      this.show1 = true;
    },
    // 修改姓名
    xiuName(index) {
      let xiuName = document.querySelectorAll(".xiuName");
      let nameInput = document.querySelectorAll(".nameInput");
      xiuName[index].style.display = "none";
      nameInput[index].style.display = "block";
    },
    nameBlur(index) {
      let xiuName = document.querySelectorAll(".xiuName");
      let nameInput = document.querySelectorAll(".nameInput");
      xiuName[index].style.display = "block";
      nameInput[index].style.display = "none";
    },
    // 修改性别
    xiuSex(index) {
      let xiuName1 = document.querySelectorAll(".xiuName1");
      let nameInput1 = document.querySelectorAll(".nameInput1");
      xiuName1[index].style.display = "none";
      nameInput1[index].style.display = "block";
    },
    sexBlur(index) {
      let xiuName1 = document.querySelectorAll(".xiuName1");
      let nameInput1 = document.querySelectorAll(".nameInput1");
      xiuName1[index].style.display = "block";
      nameInput1[index].style.display = "none";
    },
    // 修改区域
    xiuPl(index) {
      let xiuName1 = document.querySelectorAll(".xiuName2");
      let nameInput1 = document.querySelectorAll(".nameInput2");
      xiuName1[index].style.display = "none";
      nameInput1[index].style.display = "block";
    },
    plBlur(index) {
      let xiuName1 = document.querySelectorAll(".xiuName2");
      let nameInput1 = document.querySelectorAll(".nameInput2");
      xiuName1[index].style.display = "block";
      nameInput1[index].style.display = "none";
    },
    // 修改电话
    xiuPhon(index) {
      let xiuName1 = document.querySelectorAll(".xiuName6");
      let nameInput1 = document.querySelectorAll(".nameInput6");
      xiuName1[index].style.display = "none";
      nameInput1[index].style.display = "block";
    },
    phonBlur(index) {
      let xiuName1 = document.querySelectorAll(".xiuName6");
      let nameInput1 = document.querySelectorAll(".nameInput6");
      xiuName1[index].style.display = "block";
      nameInput1[index].style.display = "none";
    },
    // 修改职位
    xiuZw(index) {
      let xiuName1 = document.querySelectorAll(".xiuName3");
      let nameInput1 = document.querySelectorAll(".nameInput3");
      xiuName1[index].style.display = "none";
      nameInput1[index].style.display = "block";
    },
    zwBlur(index) {
      let xiuName1 = document.querySelectorAll(".xiuName3");
      let nameInput1 = document.querySelectorAll(".nameInput3");
      xiuName1[index].style.display = "block";
      nameInput1[index].style.display = "none";
    },
    // 修改学历
    xiuEdu(index) {
      let xiuName1 = document.querySelectorAll(".xiuName4");
      let nameInput1 = document.querySelectorAll(".nameInput4");
      xiuName1[index].style.display = "none";
      nameInput1[index].style.display = "block";
    },
    eduBlur(index) {
      let xiuName1 = document.querySelectorAll(".xiuName4");
      let nameInput1 = document.querySelectorAll(".nameInput4");
      xiuName1[index].style.display = "block";
      nameInput1[index].style.display = "none";
    },
    // 修改年龄
    xiuAge(index) {
      let xiuName1 = document.querySelectorAll(".xiuName5");
      let nameInput1 = document.querySelectorAll(".nameInput5");
      xiuName1[index].style.display = "none";
      nameInput1[index].style.display = "block";
    },
    ageBlur(index) {
      let xiuName1 = document.querySelectorAll(".xiuName5");
      let nameInput1 = document.querySelectorAll(".nameInput5");
      xiuName1[index].style.display = "block";
      nameInput1[index].style.display = "none";
    },
    // 修改跟进人
    xiuFollow(index) {
      let xiuName1 = document.querySelectorAll(".xiuName7");
      let nameInput1 = document.querySelectorAll(".nameInput7");
      xiuName1[index].style.display = "none";
      nameInput1[index].style.display = "block";
    },
    followMan(index) {
      let xiuName1 = document.querySelectorAll(".xiuName7");
      let nameInput1 = document.querySelectorAll(".nameInput7");
      xiuName1[index].style.display = "block";
      nameInput1[index].style.display = "none";
    },
    // 修改跟进记录
    xiuRecord(index) {
      let xiuName1 = document.querySelectorAll(".xiuName8");
      let nameInput1 = document.querySelectorAll(".nameInput8");
      xiuName1[index].style.display = "none";
      nameInput1[index].style.display = "block";
    },
    followRecord(index) {
      let xiuName1 = document.querySelectorAll(".xiuName8");
      let nameInput1 = document.querySelectorAll(".nameInput8");
      xiuName1[index].style.display = "block";
      nameInput1[index].style.display = "none";
    },
    // 点击项目进入简历详情
    boxShowClick(item, index) {
      this.titleJd = item.project_name;
      this.titleId = item.id;
      this.loading = true;

      // 简历详情
      let formData = new URLSearchParams();
      formData.append("page", 0);
      formData.append("rpo_id", this.titleId);
      formData.append("session_key", this.session_key);
      this.$http({
        method: "post",
        url: "hr24/show_rpo_resume_list/",
        data: formData
      })
        .then(res => {
          this.loading = false;
          this.show2 = false;
          this.show3 = true;
          let dataJd = JSON.parse(res.data.data);

          this.tableData = dataJd;
          if (this.tableData == "") {
            this.ronterJd = true;
          }
          this.totalCount = dataJd[0].count;
        })
        .catch(err => {
          console.log(err, "简历详情请求错误");
        });
      // 跟进人展示
      let foolData = new URLSearchParams();
      foolData.append("rpo_id", this.titleId);
      foolData.append("session_key", this.session_key);
      this.$http({
        method: "post",
        url: "hr24/show_all_follow_man/",
        data: foolData
      })
        .then(res => {
          let dataJd = JSON.parse(res.data.data);
          this.followUp = dataJd;
        })
        .catch(err => {
          console.log(err, "跟进人请求错误");
        });
    },
    // 项目无数据点击跳转公海
    sureJd() {
      this.$router.push({ name: "rpoJd" });
    },
    // 点击返回选择项目
    backJd() {
      this.show2 = true;
      this.show3 = false;
      let formData = new URLSearchParams();
      formData.append("agent_id", this.agentId);
      formData.append("session_key", this.session_key);
      this.$http({
        method: "post",
        url: "hr24/show_project_name/",
        data: formData
      })
        .then(res => {
          let dataJd = JSON.parse(res.data.data);
          if (dataJd.length != 0) {
            this.show = false;
            this.show1 = false;
            this.show2 = true;
            this.titJD = dataJd;
          } else {
            this.show = true;
            this.show1 = false;
            this.show2 = false;
          }
        })
        .catch(err => {
          console.log(err, "进入页面报错拉");
          this.$message({
            showClose: true,
            message: "网络异常，请刷新重试！",
            type: "error"
          });
        });
    },
    // 点击展示项目详情
    jdDetails() {
      let formData = new URLSearchParams();
      formData.append("rpo_id", this.titleId);
      formData.append("session_key", this.session_key);
      this.$http({
        method: "post",
        url: "hr24/show_project_info/",
        data: formData
      }).then(res => {
        let dataJd = JSON.parse(res.data.data);
        if (res.data.status == 1) {
          this.jdtt = dataJd[0];

          this.centerDialogVisible = true;
        } else {
          this.$message({
            showClose: true,
            message: "网络错误，请刷新一下",
            type: "error"
          });
        }
      });
    },
    // 显示第几页
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      let formData = new URLSearchParams();
      formData.append("page", currentPage - 1);
      formData.append("session_key", this.session_key);
      formData.append("rpo_id", this.titleId);
      this.$http({
        method: "post",
        url: "hr24/show_rpo_resume_list/",
        data: formData
      })
        .then(res => {
          let dataJd = JSON.parse(res.data.data);
          this.tableData = dataJd;
          this.totalCount = dataJd[0].count;
        })
        .catch(err => {
          console.log(err, "简历详情请求错误");
        });
    },
    // 上一页
    prevClick() {
      let formData = new URLSearchParams();
      formData.append("page", this.currentPage - 2);
      formData.append("rpo_id", this.titleId);
      formData.append("session_key", this.session_key);
      this.$http({
        method: "post",
        url: "hr24/show_rpo_resume_list/",
        data: formData
      })
        .then(res => {
          let dataJd = JSON.parse(res.data.data);
          this.tableData = dataJd;
          this.totalCount = dataJd[0].count;
        })
        .catch(err => {
          console.log(err, "简历详情请求错误");
        });
    },
    // 下一页
    nextClick() {
      let formData = new URLSearchParams();
      formData.append("page", this.currentPage);
      formData.append("rpo_id", this.titleId);
      formData.append("session_key", this.session_key);
      this.$http({
        method: "post",
        url: "hr24/show_rpo_resume_list/",
        data: formData
      })
        .then(res => {
          let dataJd = JSON.parse(res.data.data);
          this.tableData = dataJd;
          this.totalCount = dataJd[0].count;
        })
        .catch(err => {
          console.log(err, "简历详情请求错误");
        });
    },
    // 项目状态修改
    projectChange() {
      this.jdtt.is_used = this.projectVlaue;
    },
    // 确定修改项目信息
    Determine() {
      let proData = new URLSearchParams();
      //   项目id
      proData.append("rpo_id", this.jdtt.rpo_id);
      // 项目名
      proData.append("project_name", this.jdtt.project_name);
      //  负责人
      proData.append("director", this.jdtt.director);
      // 项目期限
      proData.append("deadline", this.jdtt.deadline);
      //  城市
      proData.append("city", this.jdtt.city);
      // 人数
      proData.append("number", this.jdtt.number);
      //  职位
      proData.append("position", this.jdtt.position);
      // 学历
      proData.append("edu", this.jdtt.edu);
      //  性别
      proData.append("sex", this.jdtt.sex);
      // 年龄
      proData.append("age", this.jdtt.age);
      //  结算价格
      proData.append("price", this.jdtt.price);
      // 结算标准
      proData.append("standard", this.jdtt.standard);
      // 对接人
      proData.append("dock_man", this.jdtt.dock_man);
      //  对接人联系方式
      proData.append("dock_man_phone", this.jdtt.dock_man_phone);
      //  项目状态
      proData.append("is_used", this.jdtt.is_used);
      proData.append("session_key", this.session_key);
      this.$http({
        method: "post",
        url: "hr24/update_project_info/",
        data: proData
      })
        .then(res => {
          this.centerDialogVisible = false;
          this.titleJd = this.jdtt.project_name;

          this.$message({
            showClose: true,
            message: "修改项目成功！",
            type: "success"
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    stat(num) {
      let xmData = new URLSearchParams();
      //   项目id
      xmData.append("status", num);
      xmData.append("agent_id", this.agentId);
      xmData.append("session_key", this.session_key);
      this.$http({
        method: "post",
        url: "hr24/show_project_by_status/",
        data: xmData
      })
        .then(res => {
          let dataJd = JSON.parse(res.data.data);
          this.titJD = dataJd;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 点击筛选项目
    under() {
      // 点击项目进行中
      this.stat(0);
    },
    finish() {
      // 点击项目已完成
      this.stat(1);
    },
    overAunt() {
      // 点击项目已结束
      this.stat(2);
    },
    // 展示全部项目
    zhanshiAll() {
      let formData = new URLSearchParams();
      formData.append("session_key", this.session_key);
      formData.append("agent_id", this.agentId);
      this.$http({
        method: "post",
        url: "hr24/show_project_name/",
        data: formData
      })
        .then(res => {
          let dataJd = JSON.parse(res.data.data);

          this.titJD = dataJd;
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: "网络异常，请刷新重试！",
            type: "error"
          });
        });
    },
    // 邀约状态
    changeProduct(even, index) {
      let sele = document.querySelectorAll(".seleAll");
      let seleOption = sele[index].querySelectorAll("option");
      this.resumeStatus = sele[index].value;
    },
    // 保存简历
    successJd(row, index) {
      let option = new URLSearchParams();
      option.append("source_resume_id", row.source_resume_id);
      option.append("user_name", row.user_name);
      option.append("sex", row.sex);
      option.append("place_content", row.place_content);
      option.append("edu_background", row.edu_background);
      option.append("age", row.age);
      option.append("user_phone", row.user_phone);
      option.append("position_content", row.position_content);
      option.append("rpo_id", this.titleId);
      option.append("content", row.follow_record);
      option.append("status", row.follow_status);

      option.append("session_key", this.session_key);
      this.$http({
        method: "post",
        url: "hr24/record_info/",
        data: option
      }).then(res => {
        if (res.data.status == 1) {
          this.$message({
            showClose: true,
            message: "简历保存成功",
            type: "success"
          });
        } else {
          this.$message({
            showClose: true,
            message: "简历保存失败，请重试！",
            type: "error"
          });
        }
      });
    },
    // 点击查看简历详情
    seeDtails(row, index) {
      this.seeDt = true;
      let option = new URLSearchParams();
      this.wxId = row.source_resume_id;
      option.append("source_resume_id", row.source_resume_id);
      option.append("session_key", this.session_key);
      this.$http({
        method: "post",
        url: "hr24/show_resume_record_detail/",
        data: option
      }).then(res => {
        let dataJd = JSON.parse(res.data.data);
        this.dialogTableVisible = true;
        this.seeJd = dataJd;
        this.seeDt = false;
        if (this.seeJd[0].work_exp.length == 0) {
          this.expShow = false;
        } else {
          this.expShow = true;
        }
        if (this.seeJd[0].graduate_school == "") {
          this.shcoolShow = false;
        } else {
          this.shcoolShow = true;
        }
        if (this.seeJd[0].content.length == 0) {
          this.genjinShow = false;
        } else {
          this.genjinShow = true;
        }
      });
    },
    // 释放简历
    release(row) {
      let option = new URLSearchParams();
      option.append("source_resume_id", row.source_resume_id);
      option.append("session_key", this.session_key);
      this.$http({
        method: "post",
        url: "hr24/release_resume/",
        data: option
      }).then(res => {
        if (res.data.status == 1) {
          let formData = new URLSearchParams();
          formData.append("page", 0);
          formData.append("rpo_id", this.titleId);
          formData.append("session_key", this.session_key);
          this.$http({
            method: "post",
            url: "hr24/show_rpo_resume_list/",
            data: formData
          })
            .then(res => {
              let dataJd = JSON.parse(res.data.data);
              this.tableData = dataJd;
              this.$message({
                showClose: true,
                message: "释放简历成功",
                type: "success"
              });
            })
            .catch(err => {
              console.log(err, "简历详情请求错误");
            });
        }
      });
    },
    // 条件筛选
    screenJd() {
      let formData = new URLSearchParams();
      formData.append("page", this.currentPage - 1);
      formData.append("rpo_id", this.titleId);
      formData.append("date", this.value1 == null ? "" : this.value1);
      formData.append("user_name", this.input1);
      formData.append("follow_man", this.value);
      formData.append("session_key", this.session_key);
      formData.append("follow_status", this.valueZt);
      this.$http({
        method: "post",
        url: "hr24/show_rpo_resume_by_conditions/",
        data: formData
      }).then(res => {
        this.loadJd = false;
        let dataJd = res.data.data;
        if (dataJd == "") {
          this.$message({
            showClose: true,
            message: "当前条件下暂无数据",
            type: "error"
          });
        } else {
          this.tableData = dataJd;
          this.totalCount = dataJd[0].count;
        }
      });
    },
    //日期筛选
    timeChang() {
      this.loadJd = true;
      this.screenJd();
    },
    // 跟进人筛选
    renChang() {
      this.loadJd = true;
      this.screenJd();
    },
    // 状态筛选
    ZtChang() {
      console.log(this.valueZt);
      this.loadJd = true;
      this.screenJd();
    },
    // 帅选求职者姓名
    nameChang() {
      this.loadJd = true;
      this.screenJd();
    },
    // 数组求和
    sum(arr) {
      var len = arr.length;
      if (len == 0) {
        return 0;
      } else if (len == 1) {
        return arr[0];
      } else {
        return Number(arr[0]) + Number(this.sum(arr.slice(1)));
      }
    },

    // 企业吸引力
    cascaderChang(type, e, index) {
      console.log(e);
      this.checkList[index] = e[0];
      let num;
      var result = this.checkList.filter(function(value, index) {
        return value;
      }, this.checkList);
      num = Number(this.sum(result));
      this.number1 = num;
    },
    // 岗位
    cascaderChangOne(type, e, index) {
      this.checkList1[index] = e[0];
      let num;
      var result = this.checkList1.filter(function(value, index) {
        return value;
      }, this.checkList1);
      num = Number(this.sum(result));
      this.number2 = num;
    },
    // 薪资福利
    cascaderChangTow(type, e, index) {
      this.checkList2[index] = e[0];
      let num;
      var result = this.checkList2.filter(function(value, index) {
        return value;
      }, this.checkList2);
      num = Number(this.sum(result));
      this.number3 = num;
    },
    // 工作时间
    cascaderChangThree(type, e, index) {
      this.checkList3[index] = e[0];
      let num;
      var result = this.checkList3.filter(function(value, index) {
        return value;
      }, this.checkList3);
      num = Number(this.sum(result));
      this.number4 = num;
    },
    //招聘流程
    cascaderChangFour(type, e, index) {
      this.checkList4[index] = e[0];
      let num;
      var result = this.checkList4.filter(function(value, index) {
        return value;
      }, this.checkList4);
      num = Number(this.sum(result));
      this.number5 = num;
    },
    //入职流程
    cascaderChangFive(type, e, index) {
      this.checkList5[index] = e[0];
      let num;
      var result = this.checkList5.filter(function(value, index) {
        return value;
      }, this.checkList5);
      num = Number(this.sum(result));
      this.number6 = num;
    },

    // // 获取报价
    baojiaClick() {
      let numm =
        this.number1 +
        this.number2 +
        this.number3 +
        this.number4 +
        this.number5 +
        this.number6;
      if (numm >= 90 && numm <= 100) {
        this.price = parseInt((1 / numm) * 100 * 800);
        this.$message({
          showClose: true,
          message: "已达到最低标准，预估价格为" + this.price + "元",
          type: "success"
        });
      } else if (numm >= 70 && numm <= 89) {
        this.price = parseInt((1 / numm) * 100 * 1000);
        this.$message({
          showClose: true,
          message: "已达到最低标准，预估价格为" + this.price + "元",
          type: "success"
        });
      } else if (numm >= 60 && numm <= 69) {
        this.price = parseInt((1 / numm) * 100 * 1200);
        this.$message({
          showClose: true,
          message: "已达到最低标准，预估价格为" + this.price + "元",
          type: "success"
        });
      } else {
        this.price = numm;
        this.$message({
          showClose: true,
          message: "暂不符合要求",
          type: "error"
        });
      }
    },
    // 点击关闭报价
    closeDialog() {
      this.price = 0;
      this.reload();
    },
    // 修改微信
    wxClcik() {
      this.wxShow = false;
    },
    wxData(scouId, wxId) {
      let formData = new URLSearchParams();
      formData.append("source_resume_id", scouId);
      formData.append("wechat", wxId);

      formData.append("rpo_id", this.titleId);
      formData.append("session_key", this.session_key);

      this.$http({
        method: "post",
        url: "hr24/update_wechat/",
        data: formData
      }).then(res => {
        if (res.data.status == 1) {
          this.$message({
            showClose: true,
            message: res.data.data,
            type: "success"
          });
        }
      });
    },
    wxInp(e, row) {
      if (e.keyCode == 13) {
        this.wxShow = true;
        this.wxData(this.wxId, row.wx_id);
      }
    },
    wxBlur(row) {
      this.wxShow = true;
      this.wxData(this.wxId, row.wx_id);
    },
    // 新增简历
    addedJd() {
      this.addedJdShow = true;
      let option = new URLSearchParams();
      option.append("session_key", this.session_key);
      this.$http({
        method: "post",
        url: "hr24/return_rpo_resume_dict/",
        data: option
      }).then(res => {
        if (res.data.status == 1) {
          this.addedJddata = res.data.data.resume_info;
          var states = res.data.data.place_list;
          var state = res.data.data.position_list;
          this.eduList = res.data.data.edu_list;
          this.sexList = res.data.data.sex_list;
          console.log(res);
        } else {
          this.$message({
            showClose: true,
            message: "网络异常，请刷新重试！",
            type: "error"
          });
        }
        this.addList = states.map(item => {
          return { value: item.id, label: item.name };
        });
        this.addPositionList = state.map(item => {
          return { value: item.id, label: item.name };
        });
      });
    },
    // 远程搜索期望城市
    remoteMethod(query) {
      if (query !== "") {
        this.Addloading = true;
        setTimeout(() => {
          this.Addloading = false;
          this.addPlace = this.addList.filter(item => {
            return item.label.indexOf(query) > -1;
          });
        }, 200);
      } else {
        this.addPlace = [];
      }
    },
    // 远程搜索期望职位
    remotePosition(query) {
      if (query !== "") {
        this.AddloadingTow = true;
        setTimeout(() => {
          this.AddloadingTow = false;
          this.addPosition = this.addPositionList.filter(item => {
            return item.label.indexOf(query) > -1;
          });
        }, 200);
      } else {
        this.addPosition = [];
      }
    },
    // 确定新增简历
    AddJd() {
      this.addedJddata.place_content = this.addplaceData.label;
      this.addedJddata.place_id = this.addplaceData.value;
      this.addedJddata.position_id = this.addpositionData.value;
      this.addedJddata.position_content = this.addpositionData.label;
      let show = true;
      for (var key in this.addedJddata) {
        if (!this.addedJddata[key]) {
          show = false;
        }
      }
      if (show) {
        let option = new URLSearchParams();
        option.append("resume_data", JSON.stringify(this.addedJddata));
        option.append("session_key", this.session_key);
        option.append("rpo_project_id", this.titleId);
        this.$http({
          method: "post",
          url: "hr24/create_project_resume/",
          data: option
        }).then(res => {
          if (res.data.status == 1) {
            this.addedJdShow = false;
            this.addplaceData={};
            this.addpositionData={};
            let formData = new URLSearchParams();
            formData.append("page", 0);
            formData.append("rpo_id", this.titleId);
            formData.append("session_key", this.session_key);
            this.$http({
              method: "post",
              url: "hr24/show_rpo_resume_list/",
              data: formData
            })
              .then(res => {
                this.loading = false;
                let dataJd = JSON.parse(res.data.data);
                this.tableData = dataJd;
                if (this.tableData == "") {
                  this.ronterJd = true;
                }
                this.totalCount = dataJd[0].count;
              })
              .catch(err => {
                console.log(err, "简历详情请求错误");
              });
            this.$message({
              showClose: true,
              message: res.data.data,
              type: "success"
            });
          } else {
            this.$message({
              showClose: true,
              message: "网络异常，请刷新重试！",
              type: "error"
            });
          }
        });
      } else {
        this.$message({
          showClose: true,
          message: "请检查是否填写完整！！！",
          type: "error"
        });
      }
    }
  },
  // 请求数据
  mounted: function() {
    // 进入页面展示项目名称\
    let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

    this.agentId = userInfo.data.data.agent_id;
    let uerId = userInfo.data.data.user_type;
    this.session_key = userInfo.data.data.session_key;
    let option = new URLSearchParams();
    option.append("agent_id", this.agentId);
    option.append("session_key", this.session_key);
    this.$http({
      method: "post",
      url: "hr24/show_project_name/",
      data: option
    })
      .then(res => {
        let dataJd = JSON.parse(res.data.data);
        if (dataJd.length != 0) {
          this.show = false;
          this.show1 = false;
          this.show2 = true;
          this.titJD = dataJd;
          this.underwayAmount = this.titJD[0].underway_amount;
          this.finishAmount = this.titJD[0].finish_amount;
          this.overAmount = this.titJD[0].over_amount;
        } else {
          this.show = true;
          this.show1 = false;
          this.show2 = false;
        }
      })
      .catch(err => {
        this.$message({
          showClose: true,
          message: "网络异常，请刷新重试！",
          type: "error"
        });
      });
  }
};
</script>
<style scoped>
/* 报价器样式暂时注释掉，如报价器样式乱了再释放 */
@import url("https://unpkg.com/element-ui@2.4.1/lib/theme-chalk/index.css");
.gerenxinxi {
  display: flex;
  justify-content: space-around;
}
.gerenxinxi span {
  font: bold 12px/20px "微软雅黑";
}
.baojiaqi {
  display: flex;
  justify-content: space-evenly;
}
.el-input__inner {
  height: 26px;
  padding: 0;
}
.xiuName {
  cursor: pointer;
}
.nameInput,
.nameInput1,
.nameInput2,
.nameInput3,
.nameInput4,
.nameInput5,
.nameInput6,
.nameInput7,
.nameInput8 {
  width: 100%;
  display: none;
}

.screen {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-evenly;
}
.screen .inputName {
  width: 200px;
}
.jdShow {
  width: 100%;
}
.boxPush {
  display: flex;
  justify-content: center;
}
.boxRpo {
  height: 300px;
  text-align: center;
}
.line {
  text-align: center;
  font: 25px/40px "微软雅黑";
}
.iconRpo {
  width: 150px;
  height: 150px;
  display: inline-block;
  position: relative;
  border-radius: 50%;
  top: 20%;
  margin-top: 40px;
  animation: bs linear 2s 1.5s infinite;
  box-shadow: inset -1px 1px 4px 2px rosybrown, inset 1px -1px 4px 2px gold;
  transition: all 1s;
  cursor: pointer;
}
.iconRpo span {
  font: bold 100px/130px "微软雅黑";
}
@keyframes bs {
  0% {
    box-shadow: inset -1px 1px 10px 2px red, inset 1px -1px 3px 2px yellow,
      0 0 0px 0 #b2ff1a;
  }

  50% {
    box-shadow: inset -1px 1px 17px 2px yellowgreen,
      inset 1px -1px 3px 2px royalblue, 0 0 20px 0 #1affff;
  }

  100% {
    box-shadow: inset -1px 1px 19px 2px hotpink,
      inset 1px -1px 3px 2px hsl(76, 89%, 46%), 0 0 0px 0 #b2ff1a;
  }
}
.boxShow {
  display: flex;
  align-items: center;
  /* height: 300px; */
  flex-wrap: wrap;
}
.boxShowOne {
  width: 300px;
  height: 130px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(57, 122, 165);
  margin-right: 20px;
  margin-top: 15px;
  cursor: pointer;
}
.boxOne {
  background: url("../../../assets/404_images/jingxingzhong.png") no-repeat
    222px -1px;
  background-color: #d5d5d5;
  background-size: 80px;
}
.boxTwo {
  background: url("../../../assets/404_images/yiwancheng.png") no-repeat 222px -1px;
  background-size: 80px;
  background-color: #d5d5d5;
}
.boxThree {
  background: url("../../../assets/404_images/yijiesu.png") no-repeat 222px -1px;
  background-size: 80px;
  background-color: #d5d5d5;
}
.boxShowOne:hover {
  color: #ffff;
}
.boxShowOne h3 {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.qiuJd {
  list-style: none;
}
.imgJd {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
.wxInput {
  width: 220px;
  height: 30px;
}
.cascaderList {
  display: flex;
}
.cascaderList /deep/.el-cascader {
  margin-left: 15px;
}
</style>


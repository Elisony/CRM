<template>
  <div>
    <div class="boxHr" v-show="show00"></div>
    <div v-show="show11">
      <div class="hr">
        <div class="time">
          <span>数据更新时间为：</span>
          <el-date-picker v-model="timeNow" type="date" format="yyyy-MM-dd" @change="timeN"></el-date-picker>
        </div>
        <div v-show="hrDatt">
          <h2 style="magrin:0">HR数据：</h2>
          <div class="box">
            <div @click="todayData" style="display: flex;
    align-items: center;">
              <h3 style="width:113px;text-align: center;cursor: pointer;">
                今日总数据：
                <span v-if="agentId==2" style="color:red">(点击切换城市数据)</span>
              </h3>
            </div>
            <div class="tit">
              <p>总需求</p>
              <div class="numbe">
                <countTo
                  class="num"
                  :startVal="startVal"
                  :endVal="allData"
                  :duration="3000"
                  autoplay
                ></countTo>
              </div>
            </div>
            <div class="tit" v-for="(item,index) in titleNoe" :key="index">
              <p>{{item.title}}</p>
              <div class="numbe">
                <countTo
                  class="num"
                  :startVal="startVal"
                  :endVal="item.num"
                  :duration="3000"
                  autoplay
                ></countTo>
                <span
                  class="num"
                  v-show="index==0||index==1||index==2||index==5||index==7?false:true"
                >/</span>
                <span
                  class="num"
                  v-show="index==0||index==1||index==2||index==5||index==7?false:true"
                >{{item.num1}}</span>
                <span
                  class="num"
                  v-show="index==0||index==1||index==2||index==5||index==7?false:true"
                >%</span>
                <span class="num" v-show="index==6?true:false">/</span>
                <countTo
                  class="num"
                  :startVal="startVal"
                  :endVal="item.num2"
                  v-show="index==6?true:false"
                  :duration="3000"
                  autoplay
                ></countTo>
              </div>
            </div>
          </div>
          <!-- 城市每日总数据 -->
          <transition name="draw">
            <div class="boxNow" v-show="boxshow">
              <div class="box" v-for="(ite,index) in citys" :key="index">
                <div style="display: flex;align-items: center;">
                  <h3 style="width:113px;text-align: center;">{{ite.city}}</h3>
                </div>
                <div class="tit">
                  <p>总需求</p>
                  <div class="numbe">
                    <countTo
                      class="num"
                      :startVal="startVal"
                      :endVal="ite.resume_count"
                      :duration="3000"
                      autoplay
                    ></countTo>
                  </div>
                </div>
                <div class="tit">
                  <p>尊享简历需求量</p>
                  <div class="numbe">
                    <countTo
                      class="num"
                      :startVal="startVal"
                      :endVal="ite.vip_resume_count"
                      :duration="3000"
                      autoplay
                    ></countTo>
                  </div>
                </div>
                <div class="tit">
                  <p>尊享简历审核量</p>
                  <div class="numbe">
                    <countTo
                      class="num"
                      :startVal="startVal"
                      :endVal="ite.user_vip_resume_count"
                      :duration="3000"
                      autoplay
                    ></countTo>
                  </div>
                </div>
                <div class="tit">
                  <p>需要审核量</p>
                  <div class="numbe">
                    <countTo
                      class="num"
                      :startVal="startVal"
                      :endVal="ite.reviewed_count"
                      :duration="3000"
                      autoplay
                    ></countTo>
                  </div>
                </div>
                <div class="tit">
                  <p>成功量</p>
                  <div class="numbe">
                    <countTo
                      class="num"
                      :startVal="startVal"
                      :endVal="ite.success_count"
                      :duration="3000"
                      autoplay
                    ></countTo>
                    <span class="num">/</span>
                    <countTo
                      class="num"
                      :startVal="startVal"
                      :endVal="parseFloat(ite.success_percent)"
                      :duration="3000"
                      autoplay
                    ></countTo>
                    <span class="num">%</span>
                  </div>
                </div>
                <div class="tit">
                  <p>未接通量</p>
                  <div class="numbe">
                    <countTo
                      class="num"
                      :startVal="startVal"
                      :endVal="ite.unanswered_count"
                      :duration="3000"
                      autoplay
                    ></countTo>
                    <span class="num">/</span>
                    <countTo
                      class="num"
                      :startVal="startVal"
                      :endVal="parseFloat(ite.unanswered_percent)"
                      :duration="3000"
                      autoplay
                    ></countTo>
                    <span class="num">%</span>
                  </div>
                </div>
                <div class="tit">
                  <p>未接通次数</p>
                  <div class="numbe">
                    <countTo
                      class="num"
                      :startVal="startVal"
                      :endVal="ite.unanswered_amount"
                      :duration="3000"
                      autoplay
                    ></countTo>
                  </div>
                </div>
                <div class="tit">
                  <p>失败/失败率/下架量</p>
                  <div class="numbe">
                    <countTo
                      class="num"
                      :startVal="startVal"
                      :endVal="ite.fail_count"
                      :duration="3000"
                      autoplay
                    ></countTo>
                    <span class="num">/</span>
                    <countTo
                      class="num"
                      :startVal="startVal"
                      :endVal="parseFloat(ite.fail_percent)"
                      :duration="3000"
                      autoplay
                    ></countTo>
                    <span class="num">%</span>
                    <span class="num">/</span>
                    <countTo
                      class="num"
                      :startVal="startVal"
                      :endVal="ite.invalid_count"
                      :duration="3000"
                      autoplay
                    ></countTo>
                  </div>
                </div>
                <div class="tit">
                  <p>申诉量</p>
                  <div class="numbe">
                    <countTo
                      class="num"
                      :startVal="startVal"
                      :endVal="ite.appeal_count"
                      :duration="3000"
                      autoplay
                    ></countTo>
                  </div>
                </div>
              </div>
            </div>
          </transition>
          <div ref="main" class="dashboard"></div>
          <div class="zong">
            <p class="zongNone" @click="monthDataClick">
              月度总数据
              <span style="color:red" v-if="agentId==2">(点击可切换城市数据)</span>
            </p>
            <div class="nowtit box" style="width:100%;height:85px">
              <div class="tit" v-for="(item,index) in titleTow" :key="index">
                <p>{{item.title}}</p>
                <countTo
                  class="num"
                  :startVal="startVal"
                  :endVal="item.numm"
                  :duration="3000"
                  autoplay
                ></countTo>
                <span class="num" v-show="index==3?true:false">%</span>
              </div>
            </div>
          </div>
          <div class="zong zongCity" v-show="monthClick">
            <div
              class="nowtit box"
              style="width:100%;height:85px"
              v-for="(item,ine) in monthVaule"
              :key="ine"
            >
              <p class="zongNone">{{item.city}}</p>
              <div class="tit">
                <p>总需求</p>
                <countTo
                  class="num"
                  :startVal="startVal"
                  :endVal="item.resume_count"
                  :duration="3000"
                  autoplay
                ></countTo>
              </div>
              <div class="tit">
                <p>尊享简历需求量</p>
                <countTo
                  class="num"
                  :startVal="startVal"
                  :endVal="item.vip_resume_count"
                  :duration="3000"
                  autoplay
                ></countTo>
              </div>
              <div class="tit">
                <p>审核量</p>
                <countTo
                  class="num"
                  :startVal="startVal"
                  :endVal="item.reviewed_count"
                  :duration="3000"
                  autoplay
                ></countTo>
              </div>
              <div class="tit">
                <p>成功率</p>
                <countTo
                  class="num"
                  :startVal="startVal"
                  :endVal="parseFloat(item.success_percent)"
                  :duration="3000"
                  autoplay
                ></countTo>
                <span class="num">%</span>
              </div>
            </div>
          </div>
          <p class="zongNone" v-if="agentId==2">HR审核数据</p>
          <el-button
            @click="hrClickData"
            :loading="hrClick"
            type="primary"
            round
            v-if="agentId==2"
          >点击展开HR个人数据</el-button>
          <el-table
            :data="dataHr"
            :span-method="objectSpanMethod"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            border
            style="width: 100%; margin-top: 20px;text-align:center"
            v-show="teleHr"
          >
            <el-table-column align="center" prop="hr_name" label="姓名" width="180"></el-table-column>
            <el-table-column align="center" prop="new_data" label="审核类型"></el-table-column>
            <el-table-column align="center" prop="reviewed_count" label="审核量"></el-table-column>
            <el-table-column align="center" prop="success_count" label="成功量"></el-table-column>
            <el-table-column align="center" prop="success_percent" label="成功率"></el-table-column>
            <el-table-column align="center" prop="success_percent_total" label="总成功率">
              <template slot-scope="scope">
                <el-tooltip placement="top">
                  <div slot="content">
                    <span>审核成功：{{resumeHr.success_count}}</span>
                    <br />
                    <span>审核失败：{{resumeHr.fail_count}}</span>
                    <br />
                    <span>暂未接通：{{resumeHr.unanswered}}</span>
                    <br />
                    <span>总审核量{{resumeHr.sum}}</span>
                  </div>
                  <span @mousemove="ceshi(scope)">{{scope.row.success_percent_total}}</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="fail_count" label="失败量"></el-table-column>
            <el-table-column align="center" prop="fail_percent" label="失败率"></el-table-column>
            <el-table-column align="center" prop="unanswered_count" label="暂未接通量"></el-table-column>
            <el-table-column align="center" prop="unanswered_percent" label="暂未接通率"></el-table-column>
          </el-table>
          <el-button
            @click="dianji"
            type="primary"
            :loading="hrMonthClick"
            round
            v-if="agentId==2"
          >点击可展示HR月度数据</el-button>
          <div ref="main2" class="dashboard1"></div>
          <el-button
            round
            @click="zhaoping"
            :loading="qdMonthClick"
            type="primary"
            v-if="agentId==2"
          >点击展开招聘渠道数据</el-button>
          <div v-show="zhaop">
            <p class="zongNone">招聘渠道数据</p>
            <div v-for="(item,index) in quData" :key="index">
              <div class="zhaopi box">
                <div style="display: flex;
    align-items: center;width:113px;cursor: pointer;">
                  <h4 style="width:113px;text-align: center;" @click="onde(index,item.source_net)">
                    {{item.source_net}}
                    <br />
                    <span style="color:red">(点击切换城市数据)</span>
                  </h4>
                </div>
                <div class="tit">
                  <p>总需求</p>
                  <div class="numbe">
                    <countTo
                      class="num"
                      :startVal="startVal"
                      :endVal="item.new_count"
                      :duration="3000"
                      autoplay
                    ></countTo>
                  </div>
                </div>
                <div class="tit">
                  <p>审核量</p>
                  <div class="numbe">
                    <countTo
                      class="num"
                      :startVal="startVal"
                      :endVal="item.reviewed_count"
                      :duration="3000"
                      autoplay
                    ></countTo>
                  </div>
                </div>
                <div class="tit">
                  <p>成功量</p>
                  <div class="numbe">
                    <countTo
                      class="num"
                      :startVal="startVal"
                      :endVal="item.success_count"
                      :duration="3000"
                      autoplay
                    ></countTo>
                    <span class="num">/</span>
                    <countTo
                      class="num"
                      :startVal="startVal"
                      :endVal="parseFloat(item.success_percent)"
                      :duration="3000"
                      autoplay
                    ></countTo>
                    <span class="num">%</span>
                  </div>
                </div>
                <div class="tit">
                  <p>失败量</p>
                  <div class="numbe">
                    <countTo
                      class="num"
                      :startVal="startVal"
                      :endVal="item.fail_count"
                      :duration="3000"
                      autoplay
                    ></countTo>
                    <span class="num">/</span>
                    <countTo
                      class="num"
                      :startVal="startVal"
                      :endVal="parseFloat(item.fail_percent)"
                      :duration="3000"
                      autoplay
                    ></countTo>
                    <span class="num">%</span>
                  </div>
                </div>
                <div class="tit">
                  <p>暂未接通量</p>
                  <div class="numbe">
                    <countTo
                      class="num"
                      :startVal="startVal"
                      :endVal="item.unanswered_count"
                      :duration="3000"
                      autoplay
                    ></countTo>
                    <span class="num">/</span>
                    <countTo
                      class="num"
                      :startVal="startVal"
                      :endVal="parseFloat(item.unanswered_percent)"
                      :duration="3000"
                      autoplay
                    ></countTo>
                    <span class="num">%</span>
                  </div>
                </div>
              </div>
              <div class="ceshi box" v-show="cityShow">
                <div
                  v-for="(item,ind) in index==0?wubaCity:index==1?qichengCity:index==2?zhilianCity:index==3?wubaTd:index==4?qiantouCity:ershilie"
                  :key="ind"
                >
                  <div class="zhaopi wuba box">
                    <div style="display: flex;
    align-items: center;width:113px">
                      <h4 style="width:113px;text-align: center;color:red">{{item.city}}</h4>
                    </div>
                    <div class="tit">
                      <p>总需求</p>
                      <div class="numbe">
                        <countTo
                          class="num"
                          :startVal="startVal"
                          :endVal="parseFloat(item.new_count)"
                          :duration="3000"
                          autoplay
                        ></countTo>
                      </div>
                    </div>
                    <div class="tit">
                      <p>审核量</p>
                      <div class="numbe">
                        <countTo
                          class="num"
                          :startVal="startVal"
                          :endVal="parseFloat(item.reviewed_count)"
                          :duration="3000"
                          autoplay
                        ></countTo>
                      </div>
                    </div>
                    <div class="tit">
                      <p>成功量</p>
                      <div class="numbe">
                        <countTo
                          class="num"
                          :startVal="startVal"
                          :endVal="parseFloat(item.success_count)"
                          :duration="3000"
                          autoplay
                        ></countTo>
                        <span class="num">/</span>
                        <countTo
                          class="num"
                          :startVal="startVal"
                          :endVal="parseFloat(item.success_percent)"
                          :duration="3000"
                          autoplay
                        ></countTo>
                        <span class="num">%</span>
                      </div>
                    </div>
                    <div class="tit">
                      <p>失败量</p>
                      <div class="numbe">
                        <countTo
                          class="num"
                          :startVal="startVal"
                          :endVal="parseFloat(item.fail_count)"
                          :duration="3000"
                          autoplay
                        ></countTo>
                        <span class="num">/</span>
                        <countTo
                          class="num"
                          :startVal="startVal"
                          :endVal="parseFloat(item.fail_percent)"
                          :duration="3000"
                          autoplay
                        ></countTo>
                        <span class="num">%</span>
                      </div>
                    </div>
                    <div class="tit">
                      <p>暂未接通量</p>
                      <div class="numbe">
                        <countTo
                          class="num"
                          :startVal="startVal"
                          :endVal="parseFloat(item.unanswered_count)"
                          :duration="3000"
                          autoplay
                        ></countTo>
                        <span class="num">/</span>
                        <countTo
                          class="num"
                          :startVal="startVal"
                          :endVal="parseFloat(item.unanswered_percent)"
                          :duration="3000"
                          autoplay
                        ></countTo>
                        <span class="num">%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="RpoData" style="border-top: 5px dashed #88ccff;margin-top:20px">
        <h2>RPO数据：</h2>
        <div v-for="(rpoD,index) in rpoDate" :key="index">
          <div class="box">
            <h3 style="width: 120px">{{rpoD.project_name}}</h3>
            <div class="tit">
              <p>简历下载量</p>
              <div class="numbe">
                <countTo
                  class="num"
                  :startVal="startVal"
                  :endVal="rpoD.download_amount"
                  :duration="3000"
                  autoplay
                ></countTo>
              </div>
            </div>
            <div class="tit">
              <p>电话沟通量</p>
              <div class="numbe">
                <countTo
                  class="num"
                  :startVal="startVal"
                  :endVal="rpoD.communicate_amount"
                  :duration="3000"
                  autoplay
                ></countTo>
              </div>
            </div>
            <div class="tit">
              <p>添加微信量</p>
              <div class="numbe">
                <countTo
                  class="num"
                  :startVal="startVal"
                  :endVal="rpoD.wechat_amount"
                  :duration="3000"
                  autoplay
                ></countTo>
              </div>
            </div>
            <div class="tit">
              <p>邀约面试人数</p>
              <div class="numbe">
                <countTo
                  class="num"
                  :startVal="startVal"
                  :endVal="rpoD.invited_amount"
                  :duration="3000"
                  autoplay
                ></countTo>
              </div>
            </div>
            <div class="tit">
              <p>到面人数</p>
              <div class="numbe">
                <countTo
                  class="num"
                  :startVal="startVal"
                  :endVal="rpoD.interviewed_amount"
                  :duration="3000"
                  autoplay
                ></countTo>
              </div>
            </div>
            <div class="tit">
              <p>试岗人数</p>
              <div class="numbe">
                <countTo
                  class="num"
                  :startVal="startVal"
                  :endVal="rpoD.onduty_amount"
                  :duration="3000"
                  autoplay
                ></countTo>
              </div>
            </div>
            <div class="tit">
              <p>已入职</p>
              <div class="numbe">
                <countTo
                  class="num"
                  :startVal="startVal"
                  :endVal="rpoD.success_amount"
                  :duration="3000"
                  autoplay
                ></countTo>
              </div>
            </div>
          </div>
        </div>
        <div ref="main3" class="dashboard"></div>
        <el-button  type="primary" round @click="RpoToday($event)">RPO人员当日数据</el-button>
        <el-button type="primary" round @click="RpoMonth($event)">RPO人员当月数据</el-button>
        <el-button type="primary" round @click="xmMonth">RPO项目当月数据</el-button>
        <div v-show="RpoLoding">
          <p style="text-align:center">{{pVaule}}</p>
          <el-table :data="tableDataNOW" border style="width: 100%;margin-top:15px">
            
            <el-table-column prop="cuser__user_name" label="姓名"  align="center"></el-table-column>
             <el-table-column prop="download_amount" label="下载简历量"  align="center"></el-table-column>
            <el-table-column prop="wechat_amount" label="添加微信量"  align="center"></el-table-column>
            <el-table-column prop="invited_amount" label="邀约量"  align="center"></el-table-column>
            <el-table-column prop="interviewed_amount" label="到面量"  align="center"></el-table-column>
            <el-table-column prop="onduty_amount" label="试岗人数"  align="center"></el-table-column>
            <el-table-column prop="success_amount" label="入职人数"  align="center"></el-table-column>
          </el-table>
        </div>
        <div v-show="RpoLodingTow">
          <div v-for="(rpoD,index) in RpoMonData" :key="index">
            <div class="box">
              <h3 style="width: 120px">{{rpoD.project_name}}</h3>
              <div class="tit">
                <p>简历下载量</p>
                <div class="numbe">
                  <countTo
                    class="num"
                    :startVal="startVal"
                    :endVal="rpoD.download_amount"
                    :duration="3000"
                    autoplay
                  ></countTo>
                </div>
              </div>
              <div class="tit">
                <p>电话沟通量</p>
                <div class="numbe">
                  <countTo
                    class="num"
                    :startVal="startVal"
                    :endVal="rpoD.communicate_amount"
                    :duration="3000"
                    autoplay
                  ></countTo>
                </div>
              </div>
              <div class="tit">
                <p>添加微信量</p>
                <div class="numbe">
                  <countTo
                    class="num"
                    :startVal="startVal"
                    :endVal="rpoD.wechat_amount"
                    :duration="3000"
                    autoplay
                  ></countTo>
                </div>
              </div>
              <div class="tit">
                <p>邀约面试人数</p>
                <div class="numbe">
                  <countTo
                    class="num"
                    :startVal="startVal"
                    :endVal="rpoD.invited_amount"
                    :duration="3000"
                    autoplay
                  ></countTo>
                </div>
              </div>
              <div class="tit">
                <p>到面人数</p>
                <div class="numbe">
                  <countTo
                    class="num"
                    :startVal="startVal"
                    :endVal="rpoD.interviewed_amount"
                    :duration="3000"
                    autoplay
                  ></countTo>
                </div>
              </div>
              <div class="tit">
                <p>试岗人数</p>
                <div class="numbe">
                  <countTo
                    class="num"
                    :startVal="startVal"
                    :endVal="rpoD.onduty_amount"
                    :duration="3000"
                    autoplay
                  ></countTo>
                </div>
              </div>
              <div class="tit">
                <p>已入职</p>
                <div class="numbe">
                  <countTo
                    class="num"
                    :startVal="startVal"
                    :endVal="rpoD.success_amount"
                    :duration="3000"
                    autoplay
                  ></countTo>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="saleData" style="border-top: 5px dashed #88ccff;margin-top:20px">
        <h2>销售数据：</h2>
        <div class="saleBody">
          <p class="zongNone">销售本月总数据</p>
          <div
            class="box saleBox"
            v-for="(item,index) in sale"
            :key="index"
            v-show="sale.length!=0"
          >
            <div class="tit">
              <p>本月总单数</p>
              <div class="numbe">
                <countTo
                  class="num"
                  :startVal="startVal"
                  :endVal="item.deal_count"
                  :duration="3000"
                  autoplay
                ></countTo>
              </div>
            </div>
            <div class="tit">
              <p>本月总回款</p>
              <div class="numbe">
                <countTo
                  class="num"
                  :startVal="startVal"
                  :endVal="item.deal_money"
                  :duration="3000"
                  autoplay
                ></countTo>
              </div>
            </div>
          </div>
          <h4 v-show="sale.length==0" style="color:red">暂无记录</h4>

          <p class="zongNone" v-if="agentId==2">销售城市月数据</p>
          <div
            v-for="(saleC,index) in saleCity"
            :key="index+1"
            v-show="saleCity.length!=0&&agentId==2"
          >
            <div class="box">
              <div class="tit">
                <p>{{saleC.name}}本月总单数</p>
                <div class="numbe">
                  <countTo
                    class="num"
                    :startVal="startVal"
                    :endVal="saleC.deal_count"
                    :duration="3000"
                    autoplay
                  ></countTo>
                </div>
              </div>
              <div class="tit">
                <p>{{saleC.name}}本月总回款</p>
                <div class="numbe">
                  <countTo
                    class="num"
                    :startVal="startVal"
                    :endVal="saleC.deal_money"
                    :duration="3000"
                    autoplay
                  ></countTo>
                </div>
              </div>
            </div>
          </div>

          <h4 v-show="saleCity.length==0&&agentId==2" style="color:red">暂无记录</h4>
        </div>
        <div class="saleBody">
          <p class="zongNone">销售今日数据</p>
          <div
            class="box saleBox"
            v-show="saleToday.length !=0"
            v-for="(item,index) in saleToday"
            :key="index+2"
          >
            <div class="tit">
              <p>今日总单数</p>
              <div class="numbe">
                <countTo
                  class="num"
                  :startVal="startVal"
                  :endVal="item.deal_count"
                  :duration="3000"
                  autoplay
                ></countTo>
              </div>
            </div>
            <div class="tit">
              <p>今日总回款</p>
              <div class="numbe">
                <countTo
                  class="num"
                  :startVal="startVal"
                  :endVal="item.deal_money"
                  :duration="3000"
                  autoplay
                ></countTo>
              </div>
            </div>
          </div>
          <h4 v-show="saleToday.length==0" style="color:red">暂无记录</h4>
          <p class="zongNone" v-if="agentId==2">销售城市今日数据</p>
          <div
            v-show="saleCityToday.length !=0&&agentId==2"
            v-for="(item,index) in saleCityToday"
            :key="index+3"
          >
            <div class="box">
              <div class="tit">
                <p>{{item.name}}今日总单数</p>
                <div class="numbe">
                  <countTo
                    class="num"
                    :startVal="startVal"
                    :endVal="item.deal_count"
                    :duration="3000"
                    autoplay
                  ></countTo>
                </div>
              </div>
              <div class="tit">
                <p>{{item.name}}今日总回款</p>
                <div class="numbe">
                  <countTo
                    class="num"
                    :startVal="startVal"
                    :endVal="item.deal_money"
                    :duration="3000"
                    autoplay
                  ></countTo>
                </div>
              </div>
            </div>
          </div>
          <h4 v-show="saleCityToday.length ==0&&agentId==2" style="color:red">暂无记录</h4>
        </div>
        <div class="saleBody">
          <p class="zongNone">销售积累总客户</p>
          <div
            class="box saleBox"
            v-for="(ittem,index) in saleIntention"
            :key="index"
            v-show="saleIntention.length!=0"
          >
            <h3>{{ittem.name}}</h3>
            <div class="tit">
              <p>A类客户</p>
              <div class="numbe">
                <countTo
                  class="num"
                  :startVal="startVal"
                  :endVal="ittem.A_count"
                  :duration="3000"
                  autoplay
                ></countTo>
              </div>
            </div>
            <div class="tit">
              <p>B类客户</p>
              <div class="numbe">
                <countTo
                  class="num"
                  :startVal="startVal"
                  :endVal="ittem.B_count"
                  :duration="3000"
                  autoplay
                ></countTo>
              </div>
            </div>
            <div class="tit">
              <p>C类客户</p>
              <div class="numbe">
                <countTo
                  class="num"
                  :startVal="startVal"
                  :endVal="ittem.C_count"
                  :duration="3000"
                  autoplay
                ></countTo>
              </div>
            </div>
          </div>
          <h4 v-show="saleIntention.length==0" style="color:red">暂无记录</h4>
        </div>
        <div class="saleBody">
          <p class="zongNone">销售今日新增客户</p>
          <div
            class="box saleBox"
            v-for="(ittem,index) in saleIntenToday"
            :key="index+4"
            v-show="saleIntenToday.length!=0"
          >
            <h3>{{ittem.name}}</h3>
            <div class="tit">
              <p>A类客户</p>
              <div class="numbe">
                <countTo
                  class="num"
                  :startVal="startVal"
                  :endVal="ittem.A_count"
                  :duration="3000"
                  autoplay
                ></countTo>
              </div>
            </div>
            <div class="tit">
              <p>B类客户</p>
              <div class="numbe">
                <countTo
                  class="num"
                  :startVal="startVal"
                  :endVal="ittem.B_count"
                  :duration="3000"
                  autoplay
                ></countTo>
              </div>
            </div>
            <div class="tit">
              <p>C类客户</p>
              <div class="numbe">
                <countTo
                  class="num"
                  :startVal="startVal"
                  :endVal="ittem.C_count"
                  :duration="3000"
                  autoplay
                ></countTo>
              </div>
            </div>
          </div>
          <h4 v-show="saleIntenToday.length==0" style="color:red">暂无记录</h4>
        </div>
        <p class="zongNone">销售客户总状态</p>
        <div class="box saleBox" v-for="(ittem,index) in saleOperation" :key="index+5">
          <h3>{{ittem.name}}</h3>
          <div class="tit">
            <p>1-电话</p>
            <div class="numbe">
              <countTo
                class="num"
                :startVal="startVal"
                :endVal="ittem.count_1"
                :duration="3000"
                autoplay
              ></countTo>
            </div>
          </div>
          <div class="tit">
            <p>2-微信</p>
            <div class="numbe">
              <countTo
                class="num"
                :startVal="startVal"
                :endVal="ittem.count_2"
                :duration="3000"
                autoplay
              ></countTo>
            </div>
          </div>
          <div class="tit">
            <p>3-拜访</p>
            <div class="numbe">
              <countTo
                class="num"
                :startVal="startVal"
                :endVal="ittem.count_3"
                :duration="3000"
                autoplay
              ></countTo>
            </div>
          </div>
          <div class="tit">
            <p>4-需求</p>
            <div class="numbe">
              <countTo
                class="num"
                :startVal="startVal"
                :endVal="ittem.count_4"
                :duration="3000"
                autoplay
              ></countTo>
            </div>
          </div>
          <div class="tit">
            <p>5-报价</p>
            <div class="numbe">
              <countTo
                class="num"
                :startVal="startVal"
                :endVal="ittem.count_5"
                :duration="3000"
                autoplay
              ></countTo>
            </div>
          </div>
        </div>
        <p class="zongNone">销售客户今日状态</p>
        <div class="box saleBox" v-for="(ittem,index) in saleOperatToday" :key="index+index">
          <h3>{{ittem.name}}</h3>
          <div class="tit">
            <p>1-电话</p>
            <div class="numbe">
              <countTo
                class="num"
                :startVal="startVal"
                :endVal="ittem.count_1"
                :duration="3000"
                autoplay
              ></countTo>
            </div>
          </div>
          <div class="tit">
            <p>2-微信</p>
            <div class="numbe">
              <countTo
                class="num"
                :startVal="startVal"
                :endVal="ittem.count_2"
                :duration="3000"
                autoplay
              ></countTo>
            </div>
          </div>
          <div class="tit">
            <p>3-拜访</p>
            <div class="numbe">
              <countTo
                class="num"
                :startVal="startVal"
                :endVal="ittem.count_3"
                :duration="3000"
                autoplay
              ></countTo>
            </div>
          </div>
          <div class="tit">
            <p>4-需求</p>
            <div class="numbe">
              <countTo
                class="num"
                :startVal="startVal"
                :endVal="ittem.count_4"
                :duration="3000"
                autoplay
              ></countTo>
            </div>
          </div>
          <div class="tit">
            <p>5-报价</p>
            <div class="numbe">
              <countTo
                class="num"
                :startVal="startVal"
                :endVal="ittem.count_5"
                :duration="3000"
                autoplay
              ></countTo>
            </div>
          </div>
        </div>
        <div class="saleJb">
          <el-button
            class="zongNone"
            round
            v-for="(item,index) in cityD"
            :key="index"
            @click="saleCil(index)"
          >{{item}}</el-button>
        </div>
        <div class="saleCityshow" v-show="cityShow">
          <el-button
            v-for="(item,index) in cityName"
            :key="index"
            @click="cityClickk(index)"
          >{{item.name}}</el-button>
        </div>
        <P>当前选择的是:{{xzName==""?"未选择简报":xzName}}--{{citNme==""?"未选择城市":citNme}}</P>
        <el-table :data="todaySale" border style="width:100%" v-if="tableShow">
          <el-table-column prop="person_name" label="销售人员" align="center"></el-table-column>
          <el-table-column prop="city_name" label="地区" align="center"></el-table-column>
          <el-table-column prop="A_count" label="A类客户" align="center"></el-table-column>
          <el-table-column prop="B_count" label="B类客户" align="center"></el-table-column>
          <el-table-column prop="C_count" label="C类客户" align="center"></el-table-column>
        </el-table>
        <el-table :data="todaySale" border style="width:100%" v-else>
          <el-table-column prop="person_name" label="销售人员" align="center"></el-table-column>
          <el-table-column prop="city_name" label="地区" align="center"></el-table-column>
          <el-table-column prop="count_1" label="1-电话" align="center"></el-table-column>
          <el-table-column prop="count_2" label="2-微信" align="center"></el-table-column>
          <el-table-column prop="count_3" label="3-拜访" align="center"></el-table-column>
          <el-table-column prop="count_4" label="4-需求" align="center"></el-table-column>
          <el-table-column prop="count_5" label="5-报价" align="center"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import countTo from "vue-count-to";
import mainHeader from "../../components/demo/demo";
import { userInfo } from "os";
export default {
  components: { countTo, mainHeader },
  data() {
    return {
      jdData: [],
      city: [],
      userType: "",
      tableDataNOW: [],
      RpoLoding: false,
      RpoLodingTow: false,
      pVaule: "",
      RpoMonData:[],
      wubaCity: [],
      cityShow: false,
      hrMonthClick: false,
      qdMonthClick: false,
      qichengCity: [],
      zhilianCity: [],
      qiantouCity: [],
      wubaTd: [],
      tableShow: true,
      todaySale: [],
      citNme: "",
      ershilie: [],
      sale: [],
      hrClick: false,
      teleHr: false,

      cityD: [
        "销售人员本月客户状态简报",
        "销售人员今日客户状态简报",
        "销售人员本月新增简报",
        "销售人员今日新增简报"
      ],
      saleCity: [],
      saleToday: [],
      saleCityToday: [],
      saleIntention: [],
      saleOperation: [],
      saleIntenToday: [],
      saleOperatToday: [],
      hrDatt: true,
      saleData: true,
      loadingHr: true,
      RpoData: true,
      citys: [],
      timeNow: "",
      rpoDate: [],
      showw: false,
      hrMonth: [],
      hrName: [],
      resumeHr: [],
      resumeNum: 0,
      cityName: [],
      loading: false,
      quData: [],
      nameId: ["成功量", "失败量", "暂未接通量"],
      date: new Date(),
      boxshow: false,
      monthClick: false,
      cityShow: false,
      show00: false,
      show11: true,
      zhaop: false,
      xzName: "",
      indexNuber: 0,
      agentId: "",
      dataHr: [],
      // 今日总需求
      allData: 0,
      session_key: "",
      startVal: 0,
      // 每日总数据
      titleNoe: [
        {
          title: "尊享简历需求量",
          num: 0
        },
        {
          title: "尊享简历审核量",
          num: 0
        },
        {
          title: "需要审核量",
          num: 0
        },
        {
          title: "成功量",
          num: 0,
          num1: 0
        },
        {
          title: "未接通量",
          num: 0,
          num1: 0
        },
        {
          title: "未接通次数",
          num: 0
        },
        {
          title: "失败/失败率/下架量",
          num: 0,
          num1: 0,
          num2: 0
        },
        {
          title: "申诉量",
          num: 0
        }
      ],
      titleTow: [
        {
          title: "总需求",
          numm: 0
        },
        {
          title: "尊享简历需求量",
          numm: 0
        },
        {
          title: "审核量",
          numm: 0
        },

        {
          title: "成功率",
          numm: 0
        }
      ],
      monthVaule: [],
      // 当月总数据
      option: {
        title: {
          text: `当月数据汇总：`
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["需求量", "审核量", "审核率", "成功量", "成功率"]
        },
        // 下载图标
        // toolbox: {
        //   feature: {
        //     saveAsImage: {}
        //   }
        // },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,

            data: [
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10",
              "11",
              "12",
              "13",
              "14",
              "15",
              "16",
              "17",
              "18",
              "19",
              "20",
              "21",
              "22",
              "23",
              "24",
              "25",
              "26",
              "27",
              "28",
              "29",
              "30",
              "31"
            ] // x轴数据
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: []
      },
      // HR月度数据
      option2: {
        title: {
          text: "HR月度数据"
        },

        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ["成功率", "失败率", "暂未接通率"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: ["孙文静", "祖玛", "赵楠"]
        },
        yAxis: {
          type: "value"
        }
      },
      // rpo当月总数据
      option3: {
        title: {
          text: `RPO当月数据：`
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: [
            "简历下载量",
            "电话沟通量",
            "添加微信量",
            "邀约面试人数",
            "到面人数",
            "到岗人数"
          ]
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,

            data: [
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10",
              "11",
              "12",
              "13",
              "14",
              "15",
              "16",
              "17",
              "18",
              "19",
              "20",
              "21",
              "22",
              "23",
              "24",
              "25",
              "26",
              "27",
              "28",
              "29",
              "30",
              "31"
            ] // x轴数据
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: []
      }
    };
  },
  methods: {
    ceshi(scope) {
      this.resumeHr = scope.row.resume_hr_data;
    },
    timeN() {
      let timeNow = this.timeNow;
      this.boxshow = false;
      this.monthClick = false;
      var date = new Date(this.timeNow);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      this.timeNow = y + "-" + m + "-" + d;
      this.RequestData(timeNow, this.agentId);
    },
    // 显示HR当月数据
    dianji() {
      this.$refs.main2.style.display = "block";
      let myechart2 = this.$echarts.init(this.$refs.main2);
      this.hrMonthClick = true;
      myechart2.setOption(this.option2, true);
      var date = new Date(this.timeNow);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      this.timeNow = y + "-" + m + "-" + d;
      let xmData = new URLSearchParams();
      //   项目id
      xmData.append("date", this.timeNow);
      xmData.append("agent_id", this.agentId);
      xmData.append("session_key", this.session_key);
      myechart2.showLoading();
      // HR当月总数据
      this.$http({
        method: "post",
        url: "hr24/hr_month_data/",
        data: xmData
      }).then(res => {
        this.hrMonthClick = false;
        let dataJd = JSON.parse(res.data.data);
        let suce = [];
        let fail = [];
        let zanwei = [];
        let hrName = [];
        let reviewed_count = [];
        this.hrMonth = dataJd;
        this.hrMonth.forEach(item => {
          suce.push(parseFloat(item.success_percent));
          fail.push(parseFloat(item.fail_percent));
          zanwei.push(parseFloat(item.unanswered_percent));
          hrName.push(item.hr_name);
          reviewed_count.push(item.reviewed_count);
        });
        myechart2.hideLoading();
        myechart2.setOption({
          xAxis: {
            type: "category",
            data: hrName
          },
          series: [
            {
              name: "成功率",
              type: "bar",
              stack: "总量",
              barWidth: 55,
              label: {
                normal: {
                  show: true,
                  position: "insideRight"
                }
              },
              data: suce
            },

            {
              name: "失败率",
              type: "bar",
              stack: "总量",
              label: {
                normal: {
                  show: true,
                  position: "insideRight"
                }
              },
              data: fail
            },
            {
              name: "暂未接通率",
              type: "bar",
              stack: "总量",
              label: {
                normal: {
                  show: true,
                  position: "insideRight"
                }
              },
              data: zanwei
            }
          ]
        });
      });
    },
    // 表格合并
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
      if (columnIndex === 5) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    // 城市每日总数据
    todayData() {
      if (this.agentId == 2) {
        const loading = this.$loading({
          lock: true,
          text: "正在拼命加载中",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
          target: document.querySelector(".boxNow")
        });
        this.boxshow = !this.boxshow;
        let xmData = new URLSearchParams();
        //   项目id
        xmData.append("date", this.timeNow);
        xmData.append("session_key", this.session_key);
        xmData.append("agent_id", this.agentId);
        xmData.append("session_key", this.session_key);
        this.$http({
          method: "post",
          url: "hr24/show_day_city_data/",
          data: xmData
        }).then(res => {
          loading.close();
          let dataJd = JSON.parse(res.data.data);
          this.citys = dataJd;
        });
      }
    },
    // 城市月度总数据
    monthDataClick() {
      if (this.agentId == 2) {
        const loading0 = this.$loading({
          lock: true,
          text: "正在拼命加载中",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
          target: document.querySelector(".zongCity")
        });
        this.monthClick = !this.monthClick;
        let xmData = new URLSearchParams();
        //   项目id
        xmData.append("date", this.timeNow);
        xmData.append("agent_id", this.agentId);
        xmData.append("session_key", this.session_key);
        this.$http({
          method: "post",
          url: "hr24/show_city_month_total_data/",
          data: xmData
        }).then(res => {
          loading0.close();
          let dataJd = JSON.parse(res.data.data);
          this.monthVaule = dataJd;
        });
      }
    },

    // 渠道城市数据展示
    onde(index, data) {
      let cele = document.querySelectorAll(".ceshi");
      let xmData = new URLSearchParams();
      //   项目id
      xmData.append("date", this.timeNow);
      xmData.append("agent_id", this.agentId);
      xmData.append("source", data);
      xmData.append("session_key", this.session_key);
      this.$http({
        method: "post",
        url: "hr24/month_city_source_data/",
        data: xmData
      }).then(res => {
        let dataJd = JSON.parse(res.data.data);
        dataJd.forEach(item => {
          if (item.source_net == "58同城") {
            this.wubaCity.push(item);
          } else if (item.source_net == "前程无忧") {
            this.qichengCity.push(item);
          } else if (item.source_net == "智联") {
            this.zhilianCity.push(item);
          } else if (item.source_net == "前程无忧投递") {
            this.qiantouCity.push(item);
          } else if (item.source_net == "58同城投递") {
            this.wubaTd.push(item);
          } else if (item.source_net == "24猎") {
            this.ershilie.push(item);
          }
        });
      });
      if (cele[index].style.display == "block") {
        cele[index].style.display = "none";
      } else {
        cele[index].style.display = "block";
      }
    },
    RequestData(timeNow, agentId) {
      // 图表
      let myechart = this.$echarts.init(this.$refs.main); //初始化一个echarts
      myechart.setOption(this.option, true); //setOption 用this.option中的数据开始作图

      // 时间
      var date = new Date(timeNow);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      timeNow = y + "-" + m + "-" + d;
      let xmData = new URLSearchParams();
      //   项目id
      xmData.append("date", timeNow);
      xmData.append("agent_id", agentId);

      xmData.append("session_key", this.session_key);
      // 每日总数据
      if (this.userType == 2 || this.userType == 5) {
        this.$http({
          method: "post",
          url: "hr24/show_day_data/",
          data: xmData
        }).then(res => {
          let dataJd = JSON.parse(res.data.data);
          this.titleNoe[0].num = dataJd[5].vip_resume_count;
          this.titleNoe[1].num = dataJd[6].user_vip_resume_count;
          this.titleNoe[2].num = dataJd[0].reviewed_count;
          this.titleNoe[3].num = dataJd[1].success_count;
          this.titleNoe[3].num1 = parseFloat(dataJd[1].success_percent);
          this.titleNoe[4].num = dataJd[3].unanswered_count;
          this.titleNoe[4].num1 = parseFloat(dataJd[3].unanswered_percent);
          this.titleNoe[5].num = dataJd[2].unanswered_amount;
          this.titleNoe[6].num = dataJd[2].fail_count;
          this.titleNoe[6].num1 = parseFloat(dataJd[2].fail_percent);
          this.titleNoe[6].num2 = dataJd[2].invalid_count;
          this.titleNoe[7].num = dataJd[4].appeal_count;
        });
        // 今日总需要
        this.$http({
          method: "post",
          url: "hr24/day_resume_count/",
          data: xmData
        }).then(res => {
          let dataJd = JSON.parse(res.data.data);
          this.allData = dataJd;
        });
        // 月度总数据
        this.$http({
          method: "post",
          url: "hr24/show_month_total_data/",
          data: xmData
        })
          .then(res => {
            let dataJd = JSON.parse(res.data.data);

            this.titleTow[0].numm = dataJd[0].resume_count;
            this.titleTow[2].numm = dataJd[0].reviewed_count;
            this.titleTow[1].numm = dataJd[0].vip_resume_count;
            this.titleTow[3].numm = parseFloat(dataJd[0].success_percent);
          })
          .catch(err => {
            console.log(err, "月度总数据报错");
          });
        myechart.showLoading();
        // 当月总数据
        this.$http({
          method: "post",
          url: "hr24/show_month_data/",
          data: xmData
        }).then(res => {
          let dataJd = JSON.parse(res.data.data);
          // 审核量
          let reviewed = [];
          // 审核率
          let reviewedPercent = [];
          // 成功量
          let success = [];
          // 成功率
          let successPercent = [];
          let monthData = [];
          for (let i = 0; i < dataJd.length; i++) {
            monthData.push(dataJd[i].resume_count);
            reviewed.push(dataJd[i].reviewed_count);
            reviewedPercent.push(dataJd[i].reviewed_percent);
            success.push(dataJd[i].success_count);
            successPercent.push(dataJd[i].success_percent);
          }

          myechart.hideLoading();
          myechart.setOption({
            //加载数据图表
            series: [
              {
                // 根据名字对应到相应的系列
                name: "需求量",
                type: "line",
                stack: "总量",
                areaStyle: {},
                data: monthData
              },
              {
                // 根据名字对应到相应的系列
                name: "审核量",
                type: "line",
                areaStyle: { normal: {} },
                data: reviewed
              },
              {
                // 根据名字对应到相应的系列
                name: "审核率",
                type: "line",
                stack: "总量",
                areaStyle: { normal: {} },
                data: reviewedPercent
              },
              {
                // 根据名字对应到相应的系列
                name: "成功量",
                type: "line",
                stack: "总量",
                areaStyle: {},
                data: success
              },
              {
                // 根据名字对应到相应的系列
                name: "成功率",
                type: "line",
                stack: "总量",
                areaStyle: {},
                data: successPercent
              }
            ]
          });
        });
      }
      if (this.userType == 5 || this.userType == 6) {
        // rpo当月数据
        let myechart3 = this.$echarts.init(this.$refs.main3); //初始化一个echarts
        myechart3.setOption(this.option3, true); //setOption 用this.option中的数据开始作图
        myechart3.showLoading();
        this.$http({
          method: "post",
          url: "hr24/show_rpo_month_day_data/",
          data: xmData
        }).then(res => {
          myechart3.hideLoading();
          let dataJd = JSON.parse(res.data.data);
          let downloadAmount = [];
          let communicationAmout = [];
          let wechatAmout = [];
          let invitedAmount = [];
          let interviewedAmount = [];
          let ondutyAmount = [];
          dataJd.forEach(item => {
            downloadAmount.push(item.download_amount);
            communicationAmout.push(item.communicate_amount);
            wechatAmout.push(item.wechat_amout);
            invitedAmount.push(item.invited_amount);
            interviewedAmount.push(item.interviewed_amount);
            ondutyAmount.push(item.onduty_amount);
          });

          myechart3.setOption({
            //加载数据图表
            series: [
              {
                // 根据名字对应到相应的系列
                name: "简历下载量",
                type: "line",
                stack: "总量",
                areaStyle: {},
                data: downloadAmount
              },
              {
                // 根据名字对应到相应的系列
                name: "电话沟通量",
                type: "line",
                areaStyle: {},
                data: communicationAmout
              },
              {
                // 根据名字对应到相应的系列
                name: "添加微信量",
                type: "line",
                stack: "总量",
                areaStyle: {},
                data: wechatAmout
              },
              {
                // 根据名字对应到相应的系列
                name: "邀约面试人数",
                type: "line",
                stack: "总量",
                areaStyle: {},
                data: invitedAmount
              },
              {
                // 根据名字对应到相应的系列
                name: "到面人数",
                type: "line",
                stack: "总量",
                areaStyle: {},
                data: interviewedAmount
              },
              {
                // 根据名字对应到相应的系列
                name: "到岗人数",
                type: "line",
                stack: "总量",
                areaStyle: {},
                data: ondutyAmount
              }
            ]
          });
        });

        // rpo数据
        this.$http({
          method: "post",
          url: "hr24/show_rpo_day_data/",
          data: xmData
        }).then(res => {
          let dataJd = JSON.parse(res.data.data);
          this.rpoDate = dataJd;
        });
        // 获取账号ID
        this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        // that.hrId = that.userInfo.data.data.id;
        if (this.userInfo == null) {
          this.$router.push({ name: "Login" });
        }
      }

      // 销售总数据
      if (this.userType == 7 || this.userType == 5) {
        this.$http({
          method: "post",
          url: "hr24/show_sale_money_count_data/",
          data: xmData
        }).then(res => {
          let dataJd = res.data.data;
          this.sale = dataJd.sale_money_data_sum;
          this.saleCity = dataJd.sale_money_city_data_sum;
          this.saleCityToday = dataJd.sale_money_city_day_data_day;
          this.saleToday = dataJd.sale_money_day_data_sum;
        });
        this.$http({
          method: "post",
          url: "hr24/show_sale_month_data/",
          data: xmData
        }).then(res => {
          let dataJd = res.data.data;
          this.saleIntention = dataJd.sale_customer_class_data_sum;

          this.saleOperation = dataJd.sale_customer_status_data_sum;
          this.saleIntenToday = dataJd.sale_customer_class_data_day;
          this.saleOperatToday = dataJd.sale_customer_status_data_day;
        });
      }
    },
    // 点击招聘渠道数据
    zhaoping() {
      this.qdMonthClick = true;
      let xmData = new URLSearchParams();
      //   项目id
      xmData.append("date", this.timeNow);
      xmData.append("agent_id", this.agentId);

      // 渠道月度数据
      this.$http({
        method: "post",
        url: "hr24/month_source_data/",
        data: xmData
      }).then(res => {
        let dataJd = JSON.parse(res.data.data);
        this.quData = dataJd;
        this.qdMonthClick = false;
        this.zhaop = true;
      });
    },
    // 点击销售简报
    saleCil(index) {
      this.xzName = this.cityD[index];
      this.indexNuber = index;
      let xmData = new URLSearchParams();

      xmData.append("session_key", this.session_key);
      this.$http({
        method: "post",
        url: "hr24/show_sale_all_city/",
        data: xmData
      }).then(res => {
        this.cityName = res.data.data.name;
        this.cityShow = true;
        this.citNme = "";
        let xmData = new URLSearchParams();

        xmData.append("date", this.timeNow);
        xmData.append("city", this.citNme);
        xmData.append("session_key", this.session_key);
        this.$http({
          method: "post",
          url: "hr24/show_sale_person_data/",
          data: xmData
        }).then(res => {
          if (this.indexNuber == 0) {
            this.tableShow = true;
            this.todaySale = res.data.data.sale_person_customer_class_data_sum;
          } else if (this.indexNuber == 1) {
            this.tableShow = true;
            this.todaySale = res.data.data.sale_person_customer_class_data_day;
          } else if (this.indexNuber == 2) {
            this.tableShow = false;
            this.todaySale = res.data.data.sale_person_customer_status_data_sum;
          } else {
            this.tableShow = false;
            this.todaySale = res.data.data.sale_person_customer_status_data_day;
          }
        });
      });
    },
    // 点击选择城市
    cityClickk(index) {
      this.citNme = this.cityName[index].name;
      let xmData = new URLSearchParams();

      xmData.append("date", this.timeNow);
      xmData.append("city", this.citNme);
      xmData.append("session_key", this.session_key);
      this.$http({
        method: "post",
        url: "hr24/show_sale_person_data/",
        data: xmData
      }).then(res => {
        if (this.indexNuber == 0) {
          this.tableShow = true;
          this.todaySale = res.data.data.sale_person_customer_class_data_sum;
        } else if (this.indexNuber == 1) {
          this.tableShow = true;
          this.todaySale = res.data.data.sale_person_customer_class_data_day;
        } else if (this.indexNuber == 2) {
          this.tableShow = false;
          this.todaySale = res.data.data.sale_person_customer_status_data_sum;
        } else {
          this.tableShow = false;
          this.todaySale = res.data.data.sale_person_customer_status_data_day;
        }
      });
    },
    // 点击展开hr个人数据
    hrClickData() {
      this.hrClick = true;
      // HR个人数据
      let xmData = new URLSearchParams();
      //   项目id
      xmData.append("date", this.timeNow);
      xmData.append("agent_id", this.agentId);

      xmData.append("session_key", this.session_key);
      this.$http({
        method: "post",
        url: "hr24/hr_day_data_new/",
        data: xmData
      }).then(res => {
        this.hrClick = false;
        this.teleHr = true;
        let dataJd = JSON.parse(res.data.data);
        this.dataHr = dataJd;
      });
    },
    // Rpo数据
    Rpo(RpoUrl) {
      let xmData = new URLSearchParams();
      xmData.append("date", this.timeNow);
      xmData.append("session_key", this.session_key);
      this.$http({
        method: "post",
        url: RpoUrl,
        data: xmData
      }).then(res => {
        this.RpoLoding = true;
        console.log(res);
        if (res.data.status == 1) {
          this.tableDataNOW = res.data.data.rpo_person_data;
        } else {
          this.$message({
            showClose: true,
            message: "网络错误,请刷新重试",
            type: "warning"
          });
        }
      });
    },
    // rpo人员今日数据
    RpoToday(e) {
      this.pVaule = e.target.innerText;
      this.RpoLodingTow = false;
      this.Rpo("hr24/rpo_person_day_data/");
    },
    // 当月数据
    RpoMonth(e) {
      this.pVaule = e.target.innerText;
       this.RpoLodingTow = false;
      this.Rpo("hr24/rpo_person_month_data/");
    },
    xmMonth() {
      this.RpoLoding = false;
      let xmData = new URLSearchParams();
      xmData.append("date", this.timeNow);
      xmData.append("session_key", this.session_key);
      this.$http({
        method: "post",
        url: "hr24/rpo_month_data/",
        data: xmData
      }).then(res => {
        this.RpoLodingTow = true;
        if (res.data.status == 1) {
          this.RpoMonData=res.data.data
        } else {
          this.$message({
            showClose: true,
            message: "网络错误,请刷新重试",
            type: "warning"
          });
        }
      });
    }
  },
  mounted: function() {
    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? "0" + m : m;
    var d = date.getDate();
    d = d < 10 ? "0" + d : d;
    this.timeNow = y + "-" + m + "-" + d;
    let timeNow = this.timeNow;
    let userId = JSON.parse(sessionStorage.getItem("userInfo")).data.data;

    this.session_key = userId.session_key;
    this.agentId = userId.agent_id;

    this.userType = userId.user_type;

    if (
      userId.user_type == 2 ||
      userId.user_type == 6 ||
      userId.user_type == 7 ||
      userId.user_type == 5
    ) {
      this.RequestData(timeNow, this.agentId);

      this.show00 = false;
      this.show11 = true;
      if (userId.user_type == 2) {
        this.RpoData = false;
        this.saleData = false;
      } else if (userId.user_type == 6) {
        this.hrDatt = false;
        this.saleData = false;
      } else if (userId.user_type == 7) {
        this.hrDatt = false;
        this.RpoData = false;
      }
    } else {
      this.show00 = true;
      this.show11 = false;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.boxHr {
  width: 100%;
  height: 600px;
  background-image: url("../../assets/404_images/shouye.jpg");
  background-size: 100% 100%;
}
.ceshi {
  // background:red;
  width: 100%;
  height: auto;
}
.time {
  width: 100%;
  text-align: right;
}

.boxNow {
  width: 100%;
  height: auto;
}
.box1 {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.box {
  margin-top: 20px;
  margin-bottom: 20px;
  // display: flex;
  // justify-content: flex-start;
}
.box .tit {
  width: 125px;
  height: 75px;
  font-size: 12px;
  border-radius: 4px;
  background: #f0f0f0;
  box-shadow: 10px 10px 5px #888888;
  margin-right: 10px;
  text-align: center;
}
.box .tit .tow {
  width: 100%;
  text-align: center;
}
.numbe {
  margin: 15px 0 0 0;
}
.num {
  font-size: 12px;
  font-weight: bold;
}
.dashboard {
  background: #f0f0f0;
  width: 100%;
  height: 300px;
  margin: 20px 0 20px 0;
}
.dashboard1 {
  background: #f0f0f0;
  width: 100%;
  height: 300px;
  margin: 20px 0 20px 0;
  display: none;
}
.zongNone {
  font: bold 18px/20px "微软雅黑";
  cursor: pointer;
}
.nowtit {
  width: 100%;
  height: 85px;
  display: flex;

  justify-content: space-around;
}
.towtit {
  width: 200px;
  height: 100%;
  text-align: center;
  background: #f0f0f0;
}
.box11 {
  height: 200px;
  width: 200px;
}
.draw-enter-active,
.draw-leave-active {
  transition: all 1s ease;
}
.draw-enter,
.draw-leave-to {
  height: 0;
}
.zhaopi {
  margin-left: 18px;
  display: flex;
  justify-content: space-between;
}
.wuba .tit {
  width: 100px;
  height: 80px;
}
.wuba {
  justify-content: center;
}
.saleBody {
  width: 50%;
  display: inline-block;
}
.saleJb {
  display: flex;
  justify-content: space-around;
}
.saleCityshow {
  display: flex;
  justify-content: space-around;
  height: 60px;
  width: 60%;
  margin: 30px auto;
  flex-wrap: wrap;
}
</style>

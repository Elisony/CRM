(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3e00cd2a"],{3389:function(e,t,a){"use strict";var n=a("8f5b"),s=a.n(n);s.a},"3e8f":function(e,t){},"3efd":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e.show1?a("div",{staticClass:"show1"},[a("div",{staticClass:"transition-box tranBox"},[a("h3",{staticStyle:{"text-align":"center"}},[e._v("请选择需要查看的投递渠道")]),e.show2?a("transition",{attrs:{name:"el-zoom-in-bottom"}},[a("div",{staticClass:"but"},e._l(e.jdNum,function(t,n){return a("el-button",{key:n,ref:"jdBth",refInFor:!0,attrs:{type:"primary",size:"medium",loading:e.ciyLoad},on:{click:function(t){return e.bthJd(n,t)}}},[e._v(e._s(t))])}),1)]):a("transition",{attrs:{name:"el-zoom-in-bottom"}},[a("div",{staticClass:"bixx"},[a("div",{staticClass:"title"},[a("h5",[e._v("\n              当前简历来源:\n              "),a("span",{staticClass:"citySpan",on:{click:e.clickCity}},[e._v(e._s(e.cityOne))]),a("span",{staticStyle:{color:"#97a8be"}},[e._v(" (点击可切换招聘渠道)")])])]),e._l(e.cityNum,function(t,n){return a("el-button",{key:n,ref:"cityBth",refInFor:!0,attrs:{type:"primary",size:"medium"},on:{click:function(t){return e.bthCity(n,t)}}},[e._v(e._s(t.city))])})],2)])],1)]):a("div",{staticClass:"show0"},[a("el-button",{staticClass:"reset",on:{click:e.back}},[e._v("重置筛选条件")]),a("el-table",{ref:"table",staticStyle:{width:"100%",cursor:"pointer"},attrs:{data:e.jdData}},[a("el-table-column",{attrs:{prop:"source_update",label:"简历更新时间",align:"center"}}),a("el-table-column",{attrs:{label:"简历链接",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("button",{staticStyle:{background:"#ff871c",outline:"none",border:"1px solid #DCDFE6",height:"26px","border-radius":"4px",color:"#fff",padding:"0",width:"60px"}},[a("a",{attrs:{href:t.row.resume_url,target:"_Blank"}},[e._v("查看简历")])])]}}])}),a("el-table-column",{attrs:{label:"状态",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("select",{staticClass:"seleAll",on:{change:function(a){return e.changeProduct(t,t.$index)}}},[a("option",{attrs:{value:"0"}},[e._v("审核中")]),a("option",{attrs:{value:"2"}},[e._v("审核成功")]),a("option",{attrs:{value:"1"}},[e._v("审核失败")]),a("option",{attrs:{value:"3"}},[e._v("暂未接通")])])]}}])}),a("el-table-column",{attrs:{label:"姓名",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"nameClick",on:{click:function(a){return e.name(t.$index,t,a)}}},[a("div",{attrs:{id:"div2"}},[e._v(e._s(t.row.user_name))]),a("i",{staticClass:"el-icon-edit el-input__icon",staticStyle:{"line-height":"24px"}})]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.nameVuaul,expression:"nameVuaul"}],staticClass:"nameIpnut",attrs:{type:"text",autofocus:"autofocus"},domProps:{value:e.nameVuaul},on:{blur:function(a){return e.inputName(t,t.$index)},keyup:function(a){return!a.type.indexOf("key")&&e._k(a.keyCode,"enter",13,a.key,"Enter")?null:e.inputName(t,t.$index)},input:function(t){t.target.composing||(e.nameVuaul=t.target.value)}}})]}}])}),a("el-table-column",{attrs:{label:"联系方式",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("input",{staticClass:"phone1",staticStyle:{border:"1px solid grey",outline:"none",height:"20px","font-size":"12px","border-radius":"5px",width:"100%"},attrs:{type:"text",maxlength:"11"},domProps:{value:0==t.row.user_phone?"":t.row.user_phone},on:{blur:function(a){return e.iphon(a,t,t.$index)}}})]}}])}),a("el-table-column",{attrs:{label:"期望区域",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"qiwang",on:{click:function(a){return e.qiwang(t,t.$index)}}},[a("div",{attrs:{id:"div1"}},[e._v(e._s(t.row.place_content))]),a("i",{staticClass:"el-icon-edit el-input__icon",staticStyle:{"line-height":"24px"}})]),a("div",{staticClass:"qiwang1"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.placeVaule,expression:"placeVaule"}],attrs:{type:"text",maxlength:"2"},domProps:{value:e.placeVaule},on:{input:function(t){t.target.composing||(e.placeVaule=t.target.value)}}}),e._v(" 市\n            "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.placeVaule2,expression:"placeVaule2"}],attrs:{type:"text"},domProps:{value:e.placeVaule2},on:{blur:function(a){return e.qiwang1(t,t.$index)},input:function(t){t.target.composing||(e.placeVaule2=t.target.value)}}}),e._v("区\n          ")])]}}])}),a("el-table-column",{attrs:{label:"备注",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"test_box",attrs:{contenteditable:"true"},on:{focus:function(a){return e.qingkong(t.$index,a)},blur:function(a){return e.qingkong1(t,t.$index,a)}}})]}}])}),a("el-table-column",{attrs:{label:"简历来源",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.source_net))])]}}])}),a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{staticStyle:{"font-size":"10px",padding:"10px"},attrs:{plain:!0,disabled:e.isDisable},on:{click:function(a){return e.open3(t,t.$index)}}},[e._v("保存")])]}}])})],1),a("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pagesize,layout:"total, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)])},s=[],o=(a("c5f6"),a("3e8f"),{data:function(){return{currentPage:1,pagesize:50,totalCount:0,show1:!0,show2:!0,cityOne:"",cityTow:"",nameCl:!0,jdData:"",ciyLoad:!1,iphona:"",qiwangOpen:!0,testText:"",nameVuaul:"",placeVaule:"",placeVaule2:"",seleNume:"3",seleText:"该求职者暂未接通",jdNum:[],resume_status:"",cityNum:[],isDisable:!1,remarks:"",userInfo:"",session_key:""}},methods:{bthJd:function(e,t){var a=this;this.show2=!1,this.ciyLoad=!0,this.cityOne=this.$refs.jdBth[e].$el.innerText,this.userInfo=JSON.parse(sessionStorage.getItem("userInfo")),this.areaId=this.userInfo.data.data.area_id;var n=new URLSearchParams;n.append("area_id",this.areaId),n.append("session_key",this.session_key),this.$http({method:"post",url:"hr24/show_all_cities/",data:n}).then(function(e){var t=JSON.parse(e.data.data);a.cityNum=t,a.ciyLoad=!1}).catch(function(e){console.log(e,"城市数据报错")})},clickCity:function(){this.show2=!0},bthCity:function(e){var t=this;this.cityTow=this.$refs.cityBth[e].$el.innerText;var a=new URLSearchParams;a.append("source_net",this.cityOne),a.append("city",this.cityTow),a.append("session_key",this.session_key),a.append("page",0),a.append("session_key",this.session_key),this.$http({method:"post",url:"hr24/show_received_resume/",data:a}).then(function(e){if(t.show1=!1,"[]"!=e.data.data){var a=JSON.parse(e.data.data);t.jdData=a,t.totalCount=a[0].count}else t.jdData=[]}).catch(function(e){console.log(e,"渠道数据报错")})},back:function(){this.show1=!0},changeProduct:function(e,t){var a=document.querySelectorAll(".seleAll"),n=(a[t].querySelectorAll("option"),document.querySelectorAll(".test_box"));e.row.resume_status=a[t].value;for(var s=0;s<n.length;s++)event.target.value==this.seleNume&&t==s&&(n[s].innerHTML=this.seleText)},name:function(e,t,a){var n=document.querySelectorAll(".nameClick"),s=document.querySelectorAll(".nameIpnut");this.nameVuaul=t.row.user_name,s.forEach(function(t,a){a==e?t.style.display="block":(t.style.display="none",n[a].style.display="block")}),n[e].style.display="none"},inputName:function(e,t){var a=document.querySelectorAll(".nameClick"),n=document.querySelectorAll(".nameIpnut");e.row.user_name=this.nameVuaul,a[t].style.display="block",n[t].style.display="none"},qiwang:function(e,t){var a=this,n=document.querySelectorAll(".qiwang"),s=document.querySelectorAll(".qiwang1");s.forEach(function(e,s){s==t?(e.style.display="block",a.placeVaule="",a.placeVaule2="",n[t].style.display="none"):(e.style.display="none",n[s].style.display="block")})},qiwang1:function(e,t){var a=document.querySelectorAll(".qiwang"),n=document.querySelectorAll(".qiwang1");""==this.placeVaule&&""==this.placeVaule2?(n[t].style.display="none",a[t].style.display="block"):(e.row.place_content=this.placeVaule+"市"+this.placeVaule2+"区",n[t].style.display="none",a[t].style.display="block")},qingkong:function(e,t){"该求职者暂未接通"==t.target.innerText&&t.target.innerText},qingkong1:function(e,t,a){var n=a.target.innerText.length-30;this.remarks=a.target.innerText,a.target.innerText.length>30&&this.$message({showClose:!0,message:"字数请少于40字，目前已超出"+n+"字",type:"warning"})},iphon:function(e,t,a){var n=/^[1][3,4,5,6,7,8,9][0-9]{9}$/;n.test(e.target.value)?t.row.user_phone=e.target.value:(t.row.user_phone="",this.$message({showClose:!0,message:"联系方式格式错误",type:"warning"}))},open3:function(e,t){var a=this,n=document.querySelectorAll(".test_box");e.row.remarks=n[t].innerHTML;var s=new URLSearchParams;s.append("user_name",e.row.user_name),s.append("user_phone",e.row.user_phone),s.append("resume_status",e.row.resume_status),s.append("remarks",e.row.remarks),s.append("place_content",e.row.place_content),s.append("source_resume_id",e.row.source_resume_id),s.append("city",this.cityTow),s.append("session_key",this.session_key),""!=e.row.user_name&&0!=e.row.user_phone&&""!=e.row.user_phone&&2==e.row.resume_status&&"无"!=e.row.remarks&&""!=e.row.remarks?this.$http({method:"post",url:"hr24/update_received_resume/",data:s}).then(function(e){var s=document.querySelectorAll(".seleAll"),o=s[t].querySelectorAll("option");o[0].selected=!0,n[t].innerHTML="",a.$message({showClose:!0,message:"简历更新成功",type:"success"});var r=new URLSearchParams;r.append("source_net",a.cityOne),r.append("city",a.cityTow),r.append("session_key",a.session_key),r.append("page",0),a.$http({method:"post",url:"hr24/show_received_resume/",data:r}).then(function(e){var t=JSON.parse(e.data.data);a.jdData=t}).catch(function(e){console.log(e,"渠道数据报错")})}).catch(function(e){a.$message({showClose:!0,message:"最新需求更新失败",type:"warning"})}):"该求职者暂未接通"==e.row.remarks&&3==e.row.resume_status?this.$http({method:"post",url:"hr24/update_received_resume/",data:s}).then(function(e){var s=document.querySelectorAll(".seleAll"),o=s[t].querySelectorAll("option");o[0].selected=!0,n[t].innerHTML="",a.$message({showClose:!0,message:"简历更新成功",type:"success"});var r=new URLSearchParams;r.append("source_net",a.cityOne),r.append("session_key",a.session_key),r.append("city",a.cityTow),r.append("page",0),a.$http({method:"post",url:"hr24/show_received_resume/",data:r}).then(function(e){var t=JSON.parse(e.data.data);a.jdData=t}).catch(function(e){console.log(e,"暂未接通再次请求失败")})}).catch(function(e){a.$message({showClose:!0,message:"暂未接通更新失败",type:"warning"})}):1==e.row.resume_status&&"该求职者暂未接通"!=e.row.remarks&&""!=e.row.remarks&&"无"!=e.row.remarks?this.$http({method:"post",url:"hr24/update_received_resume/",data:s}).then(function(e){var s=document.querySelectorAll(".seleAll"),o=s[t].querySelectorAll("option");o[0].selected=!0,n[t].innerHTML="",a.$message({showClose:!0,message:"简历更新成功",type:"success"});var r=new URLSearchParams;r.append("source_net",a.cityOne),r.append("city",a.cityTow),r.append("page",0),r.append("session_key",a.session_key),a.$http({method:"post",url:"hr24/show_received_resume/",data:r}).then(function(e){var t=JSON.parse(e.data.data);a.jdData=t}).catch(function(e){console.log(e,"审核失败再次请求失败")})}).catch(function(e){a.$message({showClose:!0,message:"审核失败更新失败",type:"warning"})}):0==e.row.resume_status?this.$message({showClose:!0,message:"请修改审核状态",type:"warning"}):this.$message({showClose:!0,message:"请检查填写完整",type:"warning"})},handleSizeChange:function(e){this.pagesize=e,this.currentPage=1},handleCurrentChange:function(e){var t=this;this.currentPage=e;var a=new URLSearchParams;a.append("source_net",this.cityOne),a.append("city",this.cityTow),a.append("page",e-1),a.append("session_key",this.session_key),this.$http({method:"post",url:"hr24/show_resume_list/",data:a}).then(function(e){var a=JSON.parse(e.data.data);t.jdData=a;var n=Number(a[0].count);t.totalCount=n})}},mounted:function(){var e=this;this.userInfo=JSON.parse(sessionStorage.getItem("userInfo")),this.areaId=this.userInfo.data.data.area_id;this.userInfo.data.data.user_type;this.session_key=this.userInfo.data.data.session_key,this.$http({method:"post",url:"hr24/show_all_source_net/"}).then(function(t){var a=JSON.parse(t.data.data);e.jdNum=a}).catch(function(e){console.log(e,"渠道数据报错")})}}),r=o,i=(a("3389"),a("2877")),l=Object(i["a"])(r,n,s,!1,null,"61ea07e2",null);t["default"]=l.exports},"8f5b":function(e,t,a){}}]);
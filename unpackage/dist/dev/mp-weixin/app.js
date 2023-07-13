"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/login/login.js";
  "./pages/index/index.js";
  "./pages/register/register.js";
  "./pages/meeting_list/meeting_list.js";
  "./pages/document/document.js";
  "./pages/contacts/contacts.js";
  "./pages/mine/mine.js";
  "./pages/checkin/checkin.js";
  "./pages/checkin_result/checkin_result.js";
  "./pages/my_checkin/my_checkin.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "W:/workspace/web/oa-wx-web/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  let baseUrl = "http://192.168.31.149:8080";
  app.config.globalProperties.url = {
    register: baseUrl + "/user/register",
    login: baseUrl + "/user/login",
    checkin: baseUrl + "/checkin/check",
    createFaceModel: baseUrl + "/checkin/check/createModel",
    validCanCheckin: baseUrl + "/checkin/checkCheckin",
    searchTodayCheckin: baseUrl + "/checkin/searchThisWeekUserCheckin",
    getUserInfo: baseUrl + "/user/getUserInfo",
    searchMonthCheckin: baseUrl + "/checkin/getUserMonthCheckin"
  };
  app.config.globalProperties.ajax = (url, method, data, fun) => {
    common_vendor.index.request({
      url,
      method,
      header: {
        //从storage中获取token,没有则为空字符串
        token: common_vendor.index.getStorageSync("token")
      },
      data,
      //定义成功访问后回调函数
      success: (resp) => {
        if (resp.statusCode == 401) {
          common_vendor.index.redirectTo({
            url: "pages/login/login"
          });
        } else if (resp.statusCode == 200 && resp.data.code == 200) {
          let data2 = resp.data;
          if (data2.hasOwnProperty("token")) {
            console.log(resp.data);
            let token = data2.token;
            common_vendor.index.setStorageSync("token", token);
          }
          fun(resp);
        } else {
          console.log(resp.data);
          common_vendor.index.showToast({
            icon: "none",
            title: resp.data.msg == null ? "注册失败" : resp.data.msg
          });
        }
      }
    });
  };
  app.config.globalProperties.checkPermission = (perms) => {
    let permission = common_vendor.index.getStorageSync("permission");
    let result = false;
    for (let one of perms) {
      if (permission.indexOf(one) != -1) {
        result = true;
        break;
      }
    }
    return result;
  };
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;

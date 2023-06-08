"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/login/login.js";
  "./pages/register/register.js";
  "./pages/demo/demo.js";
  "./pages/index/index.js";
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
require("./vue-devtools/hook.js");
require("./vue-devtools/backend.js");
function createApp() {
  const app = common_vendor.createSSRApp(App);
  let baseUrl = "http://localhost:8080";
  app.config.globalProperties.url = {
    register: baseUrl + "/user/register"
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
          common_vendor.index.showToast({
            icon: "none",
            title: resp.data
          });
        }
      }
    });
  };
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;

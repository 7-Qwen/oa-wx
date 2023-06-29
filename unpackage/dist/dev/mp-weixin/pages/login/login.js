"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  methods: {
    toRegister: function() {
      common_vendor.index.navigateTo({
        url: "/pages/register/register"
      });
    },
    login: function() {
      let that = this;
      common_vendor.index.login({
        provider: "weixin",
        //如果执行成功
        success(resp) {
          let code = resp.code;
          that.ajax(
            that.url.login,
            "POST",
            {
              "code": code
            },
            //如果请求成功则执行后续函数
            (resp2) => {
              let permission = resp2.data.permission;
              common_vendor.index.setStorageSync("permission", permission);
              common_vendor.index.switchTab({
                url: "../index/index"
              });
            }
          );
        },
        //如果执行失败弹出异常
        fail: (e) => {
          console.log(e);
          common_vendor.index.showToast({
            icon: "none",
            title: "执行异常"
          });
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.login()),
    b: common_vendor.o(($event) => $options.toRegister())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "W:/workspace/web/oa-wx-web/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);

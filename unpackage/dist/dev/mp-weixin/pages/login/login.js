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
      common_vendor.index.login({
        provider: "weixin",
        success: function(resp) {
          let code = resp.code;
          console.log(code);
          common_vendor.index.getUserInfo({
            provider: "weixin",
            success: function(resp2) {
              let nickName = resp2.userInfo.nickName;
              let avatarUrl = resp2.userInfo.avatarUrl;
              console.log(nickName);
              console.log(avatarUrl);
            }
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "W:/workspace/web/oa-wx/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);

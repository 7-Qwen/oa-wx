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

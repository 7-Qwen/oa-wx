"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      registerCode: null
    };
  },
  methods: {}
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.registerCode,
    b: common_vendor.o(($event) => $data.registerCode = $event.detail.value),
    c: common_vendor.o(($event) => _ctx.register())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "W:/workspace/web/oa-wx/pages/register/register.vue"]]);
wx.createPage(MiniProgramPage);

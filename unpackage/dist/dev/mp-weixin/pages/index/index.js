"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      unreadRows: 0
    };
  },
  methods: {
    toPage: function(name, url) {
      common_vendor.index.navigateTo({
        url
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.unreadRows),
    b: common_vendor.o(($event) => $options.toPage("在线签到", "../checkin/checkin"))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "W:/workspace/web/oa-wx-web/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);

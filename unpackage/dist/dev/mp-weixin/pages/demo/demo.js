"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      username: "Dodo",
      tel: [13145512341, 24125123412],
      age: 15,
      address: ""
    };
  },
  methods: {
    signUp: function() {
      common_vendor.index.showToast({
        title: "点击了报名按钮"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.username),
    b: common_vendor.f($data.tel, (one, k0, i0) => {
      return {
        a: common_vendor.t(one)
      };
    }),
    c: $data.age < 18
  }, $data.age < 18 ? {
    d: common_vendor.o((...args) => $options.signUp && $options.signUp(...args))
  } : {}, {
    e: $data.address,
    f: common_vendor.o(($event) => $data.address = $event.detail.value),
    g: common_vendor.t($data.address)
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "W:/workspace/web/oa-wx/pages/demo/demo.vue"]]);
wx.createPage(MiniProgramPage);

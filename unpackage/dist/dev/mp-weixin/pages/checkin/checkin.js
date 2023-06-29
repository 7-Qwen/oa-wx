"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      canCheckin: true,
      photoPath: "",
      btnText: "拍照",
      showCamera: true,
      showImage: false
    };
  },
  methods: {
    clickBtn: function() {
      let that = this;
      if (that.btnText == "拍照") {
        let ctx = common_vendor.wx$1.createCameraContext();
        ctx.takePhoto({
          quality: "high",
          success: function(resp) {
            that.photoPath = resp.tempImagePath;
            that.showCamera = false;
            that.showImage = true;
            that.btnText = "签到";
          }
        });
      }
    },
    afresh: function() {
      this.showCamera = true;
      this.showImage = false;
      this.btnText = "拍照";
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.showCamera
  }, $data.showCamera ? {
    b: common_vendor.o((...args) => _ctx.Error && _ctx.Error(...args))
  } : {}, {
    c: $data.showImage
  }, $data.showImage ? {
    d: $data.photoPath
  } : {}, {
    e: common_vendor.t($data.btnText),
    f: common_vendor.o((...args) => $options.clickBtn && $options.clickBtn(...args)),
    g: !$data.canCheckin,
    h: common_vendor.o((...args) => $options.afresh && $options.afresh(...args)),
    i: !$data.canCheckin
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "W:/workspace/web/oa-wx-web/pages/checkin/checkin.vue"]]);
wx.createPage(MiniProgramPage);

"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      unreadRows: 0,
      timer: null,
      lastRows: 0
    };
  },
  methods: {
    toPage: function(name, url) {
      common_vendor.index.navigateTo({
        url
      });
    }
  },
  onLoad: function() {
    let that = this;
    common_vendor.index.$on("showMessage", () => {
      that.$refs.popupMsg.open();
    });
  },
  onUnload() {
    common_vendor.index.$off("showMessage");
  },
  onShow() {
    let that = this;
    that.timer = setInterval(function() {
      that.ajax(that.url.refreshMessage, "GET", null, (resp) => {
        console.log(resp);
        that.unreadRows = resp.data.unRead;
        that.lastRows = resp.data.lastRows;
        if (that.lastRows > 0) {
          common_vendor.index.$emit("showMessage");
        }
      });
    }, 5 * 1e3);
  },
  onHide: function() {
    clearInterval(this.timer);
  }
};
if (!Array) {
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_popup_message2 + _easycom_uni_popup2)();
}
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_popup_message + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      type: "success",
      message: "接收到" + $data.lastRows + "条消息",
      duration: 2e3
    }),
    b: common_vendor.sr("popupMsg", "fb23bd6a-0"),
    c: common_vendor.p({
      type: "top"
    }),
    d: common_vendor.t($data.unreadRows),
    e: common_vendor.o(($event) => $options.toPage("消息提醒", "/pages/message_list/message_list")),
    f: common_vendor.o(($event) => $options.toPage("在线签到", "../checkin/checkin"))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "W:/workspace/web/oa-wx-web/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);

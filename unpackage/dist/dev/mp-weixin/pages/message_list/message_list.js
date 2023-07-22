"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      page: 1,
      size: 20,
      list: [{
        id: "",
        refId: "",
        senderName: "",
        senderPhoto: "",
        msg: "",
        readFlag: false,
        sendTime: ""
      }],
      isLastPage: false
    };
  },
  methods: {},
  onShow() {
    let that = this;
    that.page = 1;
    that.isLastPage = false;
    common_vendor.index.pageScrollTo({
      scrollTop: "0"
    });
    that.loadMessageList(this);
  },
  onReachBottom() {
    if (this.isLastPage) {
      return;
    }
    console.log(this.page);
    this.page = this.page + 1;
    this.loadMessageList(this);
  }
};
if (!Array) {
  const _easycom_uni_list_chat2 = common_vendor.resolveComponent("uni-list-chat");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_list_chat2 + _easycom_uni_list2)();
}
const _easycom_uni_list_chat = () => "../../uni_modules/uni-list/components/uni-list-chat/uni-list-chat.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_list_chat + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.list, (one, k0, i0) => {
      return {
        a: common_vendor.t(one.sendTime),
        b: one.id,
        c: "d346d836-1-" + i0 + ",d346d836-0",
        d: common_vendor.p({
          title: one.senderName,
          avatar: one.senderPhoto,
          note: one.msg,
          badgePositon: "left",
          badgeText: one.readFlag ? "" : "dot",
          link: "navigateTo",
          to: "../message/message?id=" + one.id + "&readFlag=" + one.readFlag + "&refId=" + one.refId
        })
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "W:/workspace/web/oa-wx-web/pages/message_list/message_list.vue"]]);
wx.createPage(MiniProgramPage);

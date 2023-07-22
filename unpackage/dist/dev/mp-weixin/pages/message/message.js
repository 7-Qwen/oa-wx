"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      id: null,
      readFlag: null,
      refId: null,
      sendTime: "",
      msg: ""
    };
  },
  onShow() {
    let that = this;
    common_vendor.index.setNavigationBarTitle({
      title: "系统通知"
    });
    that.ajax(that.url.searchMessageById, "POST", {
      "id": that.id
    }, (resp) => {
      let result = resp.data.result;
      that.sendTime = result.sendTime;
      that.msg = result.msg;
    });
  },
  onLoad(options) {
    let that = this;
    that.id = options.id;
    that.readFlag = options.readFlag == "true" ? true : false;
    that.refId = options.refId;
    if (!that.readFlag) {
      that.ajax(that.url.updateReadFlag, "POST", {
        "id": that.refId
      }, (resp) => {
        console.log("更新成已读状态");
      });
    }
  },
  methods: {
    deleteMsg: function() {
      let that = this;
      common_vendor.index.showModal({
        title: "提示信息",
        content: "是否要删除这条信息?",
        success: (resp) => {
          if (resp.confirm) {
            that.ajax(that.url.deleteMessageById, "POST", {
              "id": that.refId
            }, (resp2) => {
              common_vendor.index.showToast({
                icon: "success",
                title: "删除成功",
                complete: function() {
                  setTimeout(function() {
                    common_vendor.index.navigateBack({
                      delta: 1
                    });
                  }, 1e3);
                }
              });
            });
          }
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.sendTime),
    b: common_vendor.o((...args) => $options.deleteMsg && $options.deleteMsg(...args)),
    c: common_vendor.t($data.msg)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "W:/workspace/web/oa-wx-web/pages/message/message.vue"]]);
wx.createPage(MiniProgramPage);

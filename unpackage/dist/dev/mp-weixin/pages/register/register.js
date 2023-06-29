"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      registerCode: null
    };
  },
  methods: {
    //定义注册方法
    register: function() {
      let that = this;
      if (that.registerCode == null || that.registerCode.length == 0) {
        common_vendor.index.showToast({
          title: "邀请码不能为空",
          icon: "none"
        });
        return;
      } else if (/^[0-9]{6}$/.test(that.registerCode) == false) {
        common_vendor.index.showToast({
          title: "邀请码必须为6位数字",
          icon: "none"
        });
        return;
      }
      common_vendor.index.login({
        provider: "weixin",
        success: function(resp) {
          let code = resp.code;
          common_vendor.index.getUserInfo({
            provider: "weixin",
            success: (resp2) => {
              let nickName = resp2.userInfo.nickName;
              let avatarUrl = resp2.userInfo.avatarUrl;
              let data = {
                code,
                nickName,
                photo: avatarUrl,
                registerCode: that.registerCode
              };
              that.ajax(that.url.register, "POST", data, function(resp3) {
                let permisson = resp3.data.permisson;
                console.log(permisson);
                common_vendor.index.setStorageSync("permisson", permisson);
                common_vendor.index.showToast({
                  icon: "none",
                  title: "注册成功,即将前往主页"
                });
                common_vendor.index.switchTab({
                  url: "../index/index"
                });
              });
            }
          });
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.registerCode,
    b: common_vendor.o(($event) => $data.registerCode = $event.detail.value),
    c: common_vendor.o(($event) => $options.register())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "W:/workspace/web/oa-wx-web/pages/register/register.vue"]]);
wx.createPage(MiniProgramPage);

"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      name: "",
      deptName: "",
      photo: ""
    };
  },
  methods: {},
  onShow() {
    let that = this;
    that.ajax(that.url.getUserInfo, "GET", null, function(resp) {
      let result = resp.data.result;
      that.name = result.name;
      that.deptName = result.deptName;
      that.photo = result.photo;
    });
  }
};
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.photo,
    b: common_vendor.t($data.name),
    c: common_vendor.t($data.deptName),
    d: common_vendor.p({
      title: "个人资料",
      link: true,
      to: ""
    }),
    e: common_vendor.p({
      title: "我的考勤",
      link: true,
      to: "/pages/my_checkin/my_checkin"
    }),
    f: common_vendor.p({
      title: "罚款记录",
      link: true,
      to: ""
    }),
    g: _ctx.checkPermission(["ROOT", "EMPLOYEE:SELECT"]),
    h: common_vendor.p({
      title: "员工管理",
      link: true,
      to: ""
    }),
    i: _ctx.checkPermission(["ROOT", "DEPT:SELECT"]),
    j: common_vendor.p({
      title: "部门管理",
      link: true,
      to: ""
    }),
    k: _ctx.checkPermission(["ROOT", "ROLE:SELECT"]),
    l: common_vendor.p({
      title: "权限管理",
      link: true,
      to: ""
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "W:/workspace/web/oa-wx-web/pages/mine/mine.vue"]]);
wx.createPage(MiniProgramPage);

"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      name: "",
      photo: "",
      deptName: "",
      address: "",
      status: "",
      risk: "",
      checkinTime: "",
      date: "",
      attendanceTime: "",
      closingTime: "",
      checkinDays: null,
      weekCheckin: []
    };
  },
  methods: {},
  onShow() {
    let that = this;
    that.ajax(that.url.searchTodayCheckin, "GET", null, function(resp) {
      let result = resp.data.result;
      that.name = result.name;
      that.photo = result.photo;
      that.deptName = result.deptName;
      that.address = result.address;
      that.status = result.status;
      that.risk = result.risk;
      that.checkinTime = result.checkinTime;
      that.date = result.date;
      that.attendanceTime = result.attendanceTime;
      that.closingTime = result.closingTime;
      that.checkinDays = result.checkinDays;
      that.weekCheckin = result.weekCheckin;
    });
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.photo,
    b: common_vendor.t($data.name),
    c: common_vendor.t($data.deptName == null ? "无" : $data.deptName),
    d: common_vendor.t($data.date),
    e: common_vendor.t($data.attendanceTime),
    f: common_vendor.t($data.checkinTime),
    g: $data.status == "正常"
  }, $data.status == "正常" ? {
    h: common_vendor.t($data.status)
  } : {}, {
    i: $data.status == "迟到"
  }, $data.status == "迟到" ? {
    j: common_vendor.t($data.status)
  } : {}, {
    k: common_vendor.t($data.address),
    l: $data.risk == "低风险"
  }, $data.risk == "低风险" ? {
    m: common_vendor.t($data.risk)
  } : {}, {
    n: $data.risk == "中风险"
  }, $data.risk == "中风险" ? {
    o: common_vendor.t($data.risk)
  } : {}, {
    p: $data.risk == "高风险"
  }, $data.risk == "高风险" ? {
    q: common_vendor.t($data.risk)
  } : {}, {
    r: common_vendor.t($data.closingTime),
    s: common_vendor.t($data.checkinDays),
    t: common_vendor.f($data.weekCheckin, (one, k0, i0) => {
      return common_vendor.e({
        a: one.type != "节假日"
      }, one.type != "节假日" ? {} : {}, {
        b: one.type == "节假日"
      }, one.type == "节假日" ? {} : {}, {
        c: common_vendor.t(one.day),
        d: one.status == "正常"
      }, one.status == "正常" ? {} : {}, {
        e: one.status == "迟到"
      }, one.status == "迟到" ? {} : {}, {
        f: one.status == "缺勤"
      }, one.status == "缺勤" ? {} : {}, {
        g: one
      });
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "W:/workspace/web/oa-wx-web/pages/checkin_result/checkin_result.vue"]]);
wx.createPage(MiniProgramPage);

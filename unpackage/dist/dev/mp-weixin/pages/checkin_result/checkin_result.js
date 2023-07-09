"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      name: "无名氏",
      photo: "URL",
      deptName: "管理部",
      address: "辽宁省大连市",
      status: "正常",
      risk: "低风险",
      checkinTime: "08:25",
      date: "2023年07月09日",
      attendanceTime: "08:30",
      closingTime: "21:30",
      checkinDays: 201,
      weekCheckin: [
        {
          type: "工作日",
          day: "周一",
          status: "缺勤"
        },
        {
          type: "工作日",
          day: "周二",
          status: "迟到"
        },
        {
          type: "工作日",
          day: "周三",
          status: "正常"
        },
        {
          type: "工作日",
          day: "周四",
          status: "正常"
        },
        {
          type: "工作日",
          day: "周五",
          status: "正常"
        },
        {
          type: "休息日",
          day: "周六",
          status: ""
        },
        {
          type: "休息日",
          day: "周天",
          status: ""
        }
      ]
    };
  },
  methods: {}
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

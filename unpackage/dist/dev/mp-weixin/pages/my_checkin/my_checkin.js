"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      selected: [{
        date: "2023-07-14",
        info: "",
        color: ""
      }],
      sum_1: 0,
      sum_2: 0,
      sum_3: 0
    };
  },
  onShow: function() {
    let that = this;
    let now = /* @__PURE__ */ new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    that.searchCheckin(that, year, month);
  },
  methods: {
    searchCheckin: function(ref, year, month) {
      let that = ref;
      that.sum_1 = 0;
      that.sum_2 = 0;
      that.sum_3 = 0;
      that.selected.length = 0;
      that.ajax(that.url.searchMonthCheckin, "POST", {
        year,
        month
      }, function(resp) {
        for (const one of resp.data.monthCheckin) {
          if (one.status != null && one.status != "") {
            let color = "";
            if (one.status == "正常") {
              color = "green";
            } else if (one.status == "迟到") {
              color = "orange";
            } else if (one.status == "缺勤") {
              color = "red";
            }
            that.selected.push({
              date: one.date,
              info: one.status,
              color
            });
          }
        }
        that.sum_1 = resp.data.sum_1;
        that.sum_2 = resp.data.sum_2;
        that.sum_3 = resp.data.sum_3;
      });
    },
    changeMonth: function(e) {
      let that = this;
      let month = e.month;
      let year = e.year;
      that.searchCheckin(that, year, month);
    }
  }
};
if (!Array) {
  const _easycom_uni_calendar2 = common_vendor.resolveComponent("uni-calendar");
  _easycom_uni_calendar2();
}
const _easycom_uni_calendar = () => "../../uni_modules/uni-calendar/components/uni-calendar/uni-calendar.js";
if (!Math) {
  _easycom_uni_calendar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.sum_1 + $data.sum_2),
    b: common_vendor.t($data.sum_1),
    c: common_vendor.t($data.sum_2),
    d: common_vendor.t($data.sum_3),
    e: common_vendor.sr("calendar", "710f82a5-0"),
    f: common_vendor.o($options.changeMonth),
    g: common_vendor.o($options.changeMonth),
    h: common_vendor.p({
      selected: $data.selected,
      insert: true
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "W:/workspace/web/oa-wx-web/pages/my_checkin/my_checkin.vue"]]);
wx.createPage(MiniProgramPage);

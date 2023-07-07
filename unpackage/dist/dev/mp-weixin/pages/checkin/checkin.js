"use strict";
const common_vendor = require("../../common/vendor.js");
const lib_qqmapWxJssdk = require("../../lib/qqmap-wx-jssdk.js");
var qqmapsdk;
const _sfc_main = {
  data() {
    return {
      canCheckin: true,
      photoPath: "",
      btnText: "拍照",
      showCamera: true,
      showImage: false,
      address: "",
      country: "",
      province: "",
      city: "",
      district: ""
    };
  },
  onLoad: function() {
    qqmapsdk = new lib_qqmapWxJssdk.QQMapWX({
      key: "D2ZBZ-WPMCT-VAIXM-VE6FP-FC753-TYB7O"
    });
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
      } else {
        common_vendor.index.showLoading({
          title: "签到中请稍后"
        });
        common_vendor.index.getLocation({
          type: "wgs84",
          success: function(resp) {
            let latitude = resp.latitude;
            let longitude = resp.longitude;
            qqmapsdk.reverseGeocoder({
              location: {
                latitude,
                longitude
              },
              success: function(res) {
                let address = res.result.address;
                let addressComponent = res.result.address_component;
                let country = addressComponent.nation;
                let province = addressComponent.province;
                let city = addressComponent.city;
                let district = addressComponent.district;
                common_vendor.index.uploadFile({
                  url: that.url.checkin,
                  filePath: that.photoPath,
                  name: "photo",
                  header: {
                    token: common_vendor.index.getStorageSync("token")
                  },
                  formData: {
                    address,
                    country,
                    province,
                    city,
                    district
                  },
                  success: function(resp2) {
                    let check = JSON.parse(resp2.data).msg;
                    if (resp2.statusCode == 500 && check == "用户未建模") {
                      common_vendor.index.hideLoading();
                      common_vendor.index.showModal({
                        title: "提示信息",
                        content: "系统中不存在你的人脸识别模型,是否使用当前照片作为人脸识别模型?",
                        success: function(res2) {
                          if (res2.confirm) {
                            common_vendor.index.uploadFile({
                              url: that.url.createFaceModel,
                              filePath: that.photoPath,
                              name: "photo",
                              header: {
                                "token": common_vendor.index.getStorageSync(
                                  "token"
                                )
                              },
                              success: function(resp3) {
                                console.log(resp3);
                                if (resp3.statusCode == 500) {
                                  common_vendor.index.showToast({
                                    title: JSON.parse(resp3.data).msg,
                                    icon: "none"
                                  });
                                } else if (resp3.statusCode == 200) {
                                  common_vendor.index.showToast({
                                    title: "人脸建模成功",
                                    icon: "none"
                                  });
                                }
                              }
                            });
                          }
                        }
                      });
                    } else if (resp2.statusCode == 200) {
                      let data = JSON.parse(resp2.data);
                      let code = data.code;
                      data.msg;
                      if (code == 200) {
                        common_vendor.index.hideLoading();
                        common_vendor.index.showToast({
                          title: "签到成功",
                          complete: function() {
                          }
                        });
                      }
                    } else if (resp2.statusCode == 500) {
                      common_vendor.index.showToast({
                        title: JSON.parse(resp2.data).msg,
                        icon: "none"
                      });
                    }
                  }
                });
              }
            });
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

<template>
	<view>
		<camera device-position="front" flash="off" class="camera" @error="Error" v-if="showCamera"></camera>
		<image mode="widthFix" class="image" :src="photoPath" v-if="showImage"></image>
		<view class="operate-container">
			<button type="primary" class="btn" @tap="clickBtn" :disabled="!canCheckin">{{btnText}}</button>
			<button type="warn" class="btn" @tap="afresh" :disabled="!canCheckin">重拍</button>
		</view>
		<view class="notice-container">
			<text class="notice">注意事项</text>
			<text class="desc">拍照签到的时候，必须要拍摄自己的正面照片，侧面照片会导致无法识别。另外，拍照的时候不要戴墨镜或者帽子，避免影响拍照签到的准确度。</text>
		</view>
	</view>
</template>

<script>
	import {
		provide
	} from "vue";
	import QQMapWX from '../../lib/qqmap-wx-jssdk.js'
	var qqmapsdk;
	export default {
		data() {
			return {
				canCheckin: true,
				photoPath: '',
				btnText: '拍照',
				showCamera: true,
				showImage: false,
				address: '',
				country: '',
				province: '',
				city: '',
				district: '',
			}
		},
		onLoad: function() {
			qqmapsdk = new QQMapWX({
				key: 'D2ZBZ-WPMCT-VAIXM-VE6FP-FC753-TYB7O'
			})
		},
		methods: {
			clickBtn: function() {
				let that = this;
				if (that.btnText == '拍照') {
					let ctx = wx.createCameraContext();
					ctx.takePhoto({
						quality: 'high',
						success: function(resp) {
							that.photoPath = resp.tempImagePath;
							that.showCamera = false;
							that.showImage = true;
							that.btnText = '签到';
						}
					});
				} else {
					// todo 点击签到功能
					uni.showLoading({
						title: '签到中请稍后'
					});
					uni.getLocation({
						type: 'wgs84',
						success: function(resp) {
							let latitude = resp.latitude;
							let longitude = resp.longitude;
							qqmapsdk.reverseGeocoder({
								location: {
									latitude: latitude,
									longitude: longitude
								},
								success: function(res) {
									let address = res.result.address;
									let addressComponent = res.result.address_component;
									let country = addressComponent.nation;
									let province = addressComponent.province;
									let city = addressComponent.city;
									let district = addressComponent.district;
									uni.uploadFile({
										url: that.url.checkin,
										filePath: that.photoPath,
										name: "photo",
										header: {
											token: uni.getStorageSync('token')
										},
										formData: {
											address: address,
											country: country,
											province: province,
											city: city,
											district: district,
										},
										success: function(resp) {
											let check =  JSON.parse(resp.data).msg
											if (resp.statusCode == 500 && check == '用户未建模') {
												uni.hideLoading()
												uni.showModal({
													title: '提示信息',
													content: '系统中不存在你的人脸识别模型,是否使用当前照片作为人脸识别模型?',
													success: function(res) {
														if (res.confirm) {
															//当用户点击了确定按钮则开始上传照片
															uni.uploadFile({
																url: that.url.createFaceModel,
																filePath: that.photoPath,
																name: 'photo',
																header: {
																	'token': uni.getStorageSync(
																		'token')
																},
																success: function(resp) {
																	console.log(resp)
																	if (resp.statusCode == 500) {
																		uni.showToast({
																			title: JSON.parse(resp.data).msg,
																			icon: 'none'
																		});
																	} else if (resp.statusCode ==
																		200) {
																		uni.showToast({
																			title: '人脸建模成功',
																			icon: 'none'
																		})
																	}
																}
									
															})
														}
													}
												});
											} else if (resp.statusCode == 200) {
												let data = JSON.parse(resp.data);
												let code = data.code;
												let msg = data.msg;
												if (code == 200) {
													uni.hideLoading();
													//签到成功
													uni.showToast({
														title: '签到成功',
														complete: function() {
															//跳转到结果统计页面
															uni.navigateTo({
																url:'../checkin_result/checkin_result'
															})
														}
													});
												}
											} else if (resp.statusCode == 500) {
												uni.showToast({
													title: JSON.parse(resp.data).msg,
													icon: 'none'
												});
											}
										}
									});
								}
							});
						},
					});
				}
			},
			afresh: function() {
				this.showCamera = true;
				this.showImage = false;
				this.btnText = '拍照';
			}
		}
	}
</script>

<style lang="less">
	@import url('checkin.less');
</style>
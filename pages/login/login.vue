<template>
	<view>
		<image src="../../static/logo-1.png" mode="widthFix" class="logo"></image>
		<view class="logo-title">OA在线办公系统</view>
		<view class="logo-subtitle">Ver 1.0.0</view>
		<button class="login-btn" open-type="getUserInfo" @tap="login()">登陆系统</button>
		<view class="register-container">
			没有账号?
			<text class="register" @tap="toRegister()">立即注册</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		methods: {
			toRegister: function() {
				uni.navigateTo({
					url: '/pages/register/register'
				});
			},
			login: function(){
				let that = this
				uni.login({
					provider: "weixin",
					//如果执行成功
					success(resp) {
						//获取code
						let code = resp.code;
						that.ajax(
							that.url.login,
							"POST", {
								"code": code
							},
							//如果请求成功则执行后续函数
							(resp) => {
								let permission = resp.data.permission;
								uni.setStorageSync('permission',permission);
								//todo 跳转到index页面
								uni.switchTab({
									url:'../index/index'
								})
							})

					},
					//如果执行失败弹出异常
					fail: (e) => {
						console.log(e);
						uni.showToast({
							icon: "none",
							title: "执行异常"
						})
					}
				})
			}
		}
	};
</script>

<style lang="less">
	@import url('login.less');
</style>
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
			login:function(){
				uni.login({
					provider:'weixin',
					success:function(resp){
						let code = resp.code;
						console.log(code);
						//获取用户信息
						uni.getUserInfo({
							provider:'weixin',
							success:function(resp){
								let nickName = resp.userInfo.nickName;
								let avatarUrl = resp.userInfo.avatarUrl;
								console.log(nickName)
								console.log(avatarUrl)
							}
						});
					}
				});
			}
		}
	};
</script>

<style lang="less">
	@import url('login.less');
</style>
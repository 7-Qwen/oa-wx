<template>
	<view>
		<image src="../../static/logo-2.png" mode="widthFix" class="logo"></image>
		<view class="register-container">
			<input placeholder="请输入你的激活码" class="register-code" maxlength="6" v-model="registerCode">
			<view class="register-desc">管理员创建员工证账号之后，你可以从你的个人邮箱中获得注册邀请码</view>
			<button class="register-btn" open-type="getUserInfo" @tap="register()">执行注册</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				registerCode: null
			};
		},
		methods: {
			//定义注册方法
			register: function() {
				let that = this
				//将当前的vue全局对象保存下来供后续调用
				//校验注册码
				if (that.registerCode == null || that.registerCode.length == 0) {
					uni.showToast({
						title: "邀请码不能为空",
						icon: 'none'
					});
					return;
				} else if (/^[0-9]{6}$/.test(that.registerCode) == false) {
					uni.showToast({
						title: "邀请码必须为6位数字",
						icon: 'none'
					});
					return;
				};
				//声明获取微信相关的临时授权码和其他信息
				uni.login({
					provider: 'weixin',
					success: function(resp) {
						// let code = resp.code;
						let code = resp.code+"123";
						//获取用户信息
						uni.getUserInfo({
							provider: 'weixin',
							success: (resp) => {
								let nickName = resp.userInfo.nickName;
								let avatarUrl = resp.userInfo.avatarUrl;
								// console.log(nickName)
								// console.log(avatarUrl)
								//定义全局数据变量
								let data = {
									code: code,
									nickName: nickName,
									photo: avatarUrl,
									registerCode: that.registerCode
								};
								//调用全局ajax完成请求
								that.ajax(that.url.register, 'POST', data, function(resp) {
									let permisson = resp.data.permisson;
									console.log(permisson);
									uni.setStorageSync("permisson", permisson);
									uni.showToast({
										icon: 'none',
										title: "注册成功,即将前往主页"
									})
									//todo跳转到index页面
								})
							},
						});
					}
				});
			}
		}
	}
</script>

<style lang="less">
	@import url('register.less');
</style>
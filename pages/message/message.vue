<template>
	<view class="message">
		<view class="header">
			<view class="desc">{{sendTime}}</view>
			<view class="opt" @tap="deleteMsg">删除</view>
		</view>
		<view class="content">{{msg}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: null,
				readFlag: null,
				refId: null,
				sendTime: '',
				msg: ''
			}
		},
		onShow() {
			let that = this;
			uni.setNavigationBarTitle({
				title: "系统通知"
			});
			that.ajax(that.url.searchMessageById, "POST", {
				"id": that.id
			}, (resp) => {
				let result = resp.data.result;
				that.sendTime = result.sendTime;
				that.msg = result.msg;
			})
		},
		onLoad(options) {
			let that = this;
			that.id = options.id;
			that.readFlag = options.readFlag == 'true' ? true : false;
			that.refId = options.refId;
			if (!that.readFlag) {
				that.ajax(that.url.updateReadFlag, "POST", {
					"id": that.refId
				}, (resp) => {
					console.log('更新成已读状态')
				});
			}
		},
		methods: {
			deleteMsg: function() {
				let that = this;
				uni.showModal({
					title: "提示信息",
					content: "是否要删除这条信息?",
					success: (resp) => {
						if (resp.confirm) {
							that.ajax(that.url.deleteMessageById, "POST", {
								"id": that.refId
							}, (resp) => {
								uni.showToast({
									icon: "success",
									title: "删除成功",
									complete: function() {
										setTimeout(function() {
											uni.navigateBack({
												delta: 1
											});
										}, 1000)
									}
								})
							})
						}
					}
				})
			},
		}
	}
</script>

<style lang="less">
	@import url('message.less');
</style>
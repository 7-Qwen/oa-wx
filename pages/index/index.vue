<template>
	<view class="page">
		<swiper circular="true" duration="1000" interval="8000" class="swiper">
			<swiper-item>
				<image mode="widthFix"
					src="https://storage-static-1311477017.cos.ap-beijing.myqcloud.com/oa-wx-web%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90/banner/swiper-1.jpg">
				</image>
			</swiper-item>
			<swiper-item>
				<image mode="widthFix"
					src="https://storage-static-1311477017.cos.ap-beijing.myqcloud.com/oa-wx-web%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90/banner/swiper-2.jpg">
				</image>
			</swiper-item>
			<swiper-item>
				<image mode="widthFix"
					src="https://storage-static-1311477017.cos.ap-beijing.myqcloud.com/oa-wx-web%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90/banner/swiper-3.jpg">
				</image>
			</swiper-item>
			<swiper-item>
				<image mode="widthFix"
					src="https://storage-static-1311477017.cos.ap-beijing.myqcloud.com/oa-wx-web%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90/banner/swiper-4.jpg">
				</image>
			</swiper-item>
			<swiper-item>
				<image mode="widthFix"
					src="https://storage-static-1311477017.cos.ap-beijing.myqcloud.com/oa-wx-web%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90/banner/swiper-5.jpg">
				</image>
			</swiper-item>
		</swiper>
	</view>
	<uni-popup ref="popupMsg" type="top">
		<uni-popup-message type="success" :message="'接收到'+lastRows+'条消息'" :duration="2000"></uni-popup-message>
	</uni-popup>
	<view class="notify-container" @tap="toPage('消息提醒','/pages/message_list/message_list')">
		<view class="notify-title">
			<image src="../../static/icon-1.png" mode="widthFix" class="notify-icon"></image>
			消息提醒
		</view>
		<view class="notify-content">你有{{unreadRows}}条未读消息</view>
		<image src="../../static/icon-2.png" mode="widthFix" class="more-icon"></image>
	</view>
	<view class="nav-container">
		<view class="nav-row">
			<view class="nav">
				<image src='../../static/nav-1.png' mode="widthFix" class="icon"
					@tap="toPage('在线签到','../checkin/checkin')"></image>
				<text class="name">在线签到</text>
			</view>
			<view class="nav">
				<image src='../../static/nav-2.png' mode="widthFix" class="icon"></image>
				<text class="name">员工健康</text>
			</view>
			<view class="nav">
				<image src='../../static/nav-3.png' mode="widthFix" class="icon"></image>
				<text class="name">在线请假</text>
			</view>
			<view class="nav">
				<image src='../../static/nav-4.png' mode="widthFix" class="icon"></image>
				<text class="name">公务出差</text>
			</view>
		</view>
		<view class="nav-row">
			<view class="nav">
				<image src='../../static/nav-5.png' mode="widthFix" class="icon"></image>
				<text class="name">员工日报</text>
			</view>
			<view class="nav">
				<image src='../../static/nav-6.png' mode="widthFix" class="icon"></image>
				<text class="name">我的加班</text>
			</view>
			<view class="nav">
				<image src='../../static/nav-7.png' mode="widthFix" class="icon"></image>
				<text class="name">付款申请</text>
			</view>
			<view class="nav">
				<image src='../../static/nav-8.png' mode="widthFix" class="icon"></image>
				<text class="name">费用报销</text>
			</view>
		</view>
		<view class="nav-row">
			<view class="nav">
				<image src='../../static/nav-9.png' mode="widthFix" class="icon"></image>
				<text class="name">公告通知</text>
			</view>
			<view class="nav">
				<image src='../../static/nav-10.png' mode="widthFix" class="icon"></image>
				<text class="name">在线审批</text>
			</view>
			<view class="nav">
				<image src='../../static/nav-11.png' mode="widthFix" class="icon"></image>
				<text class="name">物品领用</text>
			</view>
			<view class="nav">
				<image src='../../static/nav-12.png' mode="widthFix" class="icon"></image>
				<text class="name">采购申请</text>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				unreadRows: 0,
				timer: null,
				lastRows: 0,
			}
		},
		methods: {
			toPage: function(name, url) {
				//todo 验证用户权限
				uni.navigateTo({
					url: url
				})
			}
		},
		onLoad: function() {
			//监听时间
			let that = this;
			uni.$on('showMessage', () => {
				that.$refs.popupMsg.open();
			});
		},
		onUnload() {
			//移除监听事件
			uni.$off('showMessage');
		},
		onShow() {
			let that = this;
			that.timer = setInterval(function() {
				that.ajax(that.url.refreshMessage, 'GET', null, (resp) => {
					console.log(resp)
					that.unreadRows = resp.data.unRead;
					that.lastRows = resp.data.lastRows;
					if (that.lastRows > 0) {
						uni.$emit('showMessage');
					}
				});
			}, 5 * 1000);
		},
		onHide:function(){
			clearInterval(this.timer)
		}
}
</script>

<style lang="less">
	// 引入首页的样式文件
	@import url('index.less');
</style>
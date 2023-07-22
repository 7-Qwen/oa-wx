<template>
	<view>
		<uni-list>
			<uni-list-chat v-for="one in list" :title="one.senderName" :avatar="one.senderPhoto" :note="one.msg"
				badgePositon="left"  :badgeText="one.readFlag?'':'dot'" :key="one.id" link="navigateTo"
				:to="'../message/message?id='+one.id+'&readFlag='+one.readFlag+'&refId='+one.refId">
				<view class="chat-custom-right">
					<text class="chat-custom-text">{{one.sendTime}}</text>
				</view>
			</uni-list-chat>
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				size: 20,
				list: [{
					id: "",
					refId: "",
					senderName: "",
					senderPhoto: "",
					msg: "",
					readFlag: false,
					sendTime: "",
				}],
				isLastPage: false,

			};
		},
		methods: {

		},
		onShow() {
			let that = this;
			that.page = 1;
			that.isLastPage = false;
			uni.pageScrollTo({
				scrollTop: '0'
			});
			that.loadMessageList(this)
		},
		onReachBottom() {
			if (this.isLastPage) {
				return;
			}
			console.log(this.page)
			this.page = this.page + 1;
			this.loadMessageList(this)
		}
	}
</script>

<style lang="less">
	@import url("message_list.less");
</style>
<template>
	<view>
		<view>{{username}}</view>
		<view v-for="one in tel">{{one}}</view>
		<view v-if="age < 18">
			<button @tap="signUp">我要报名</button>
		</view>
		<view>
			<input type="text" v-model="address" placeholder="请输入地址" />
		</view>
		<view>输入的内容为:{{address}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: "Dodo",
				tel: [13145512341, 24125123412],
				age: 15,
				address: ""
			};
		},
		methods: {
			signUp: function() {
				uni.showToast({
					title: "点击了报名按钮"
				})
			}
		}
	}
</script>

<style>
</style>
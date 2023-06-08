import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	//定义全局url
	let baseUrl = "http://localhost:8080"
	app.config.globalProperties.url = {
		register: baseUrl + "/user/register"
	};
	//定义全局ajax
	app.config.globalProperties.ajax = (url, method, data, fun) => {
		uni.request({
			url: url,
			method: method,
			header: {
				//从storage中获取token,没有则为空字符串
				token: uni.getStorageSync('token')
			},
			data: data,
			//定义成功访问后回调函数
			success: (resp) => {
				//如果http返回状态码为401说明访问或者权限失败,重定向到登录页面
				if (resp.statusCode == 401) {
					uni.redirectTo({
						url: "pages/login/login"
					})
					//如果http状态码和返回体状态码都为200则完成后续动作
				} else if (resp.statusCode == 200 && resp.data.code == 200) {
					let data = resp.data
					//返回参数中如果含有token则保存到storage中
					if (data.hasOwnProperty("token")) {
						console.log(resp.data)
						let token = data.token
						uni.setStorageSync("token", token)
					}
					//执行后续回调函数
					fun(resp)
				} else {
					//其他返回值都回弹出相应的面包屑
					uni.showToast({
						icon: 'none',
						title: resp.data
					})
				}
			}
		})
	};
	return {
		app
	}
}
// #endif
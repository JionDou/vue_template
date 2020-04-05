import axios from 'axios'
import qs from 'qs'
import Cookies from 'js-cookie'
import { Loading } from 'element-ui';

let cancel, promiseArr = {};
axios.interceptors.request.use(
	config => {
		// 发起请求时，取消掉当前正在进行的相同请求
		if (promiseArr[config.url]) {
			promiseArr[config.url]('操作取消')
			promiseArr[config.url] = cancel
		} else {
			promiseArr[config.url] = cancel
		}
		return config;
	},
	error => Promise.reject(error)
);

axios.interceptors.response.use(
	response => response,
	error => Promise.resolve(error.response)
);

function checkStatus(response) {
	// 如果http状态码正常，则直接返回数据
	if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
		// 未登录则跳转登录页面，并携带当前页面的路径
		// 在登录成功后返回当前页面，这一步需要在登录页操作。
		if (response.data.code == 401) {
			// 跳转登录
			router.replace({
				path: '/login',
				query: {
					redirect: router.currentRoute.fullPath
				}
			})
		}
		return response.data;
		// 如果不需要除了data之外的数据，可以直接 return response.data
	}
	// 异常状态下，把错误信息返回去
	return {
		status: -404,
		msg: '网络异常'
	};
}

function checkCode(res) {
	// 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
	if (res.status === -404) {
		console.log(res.msg);
	}
	return res;
}

export default {
	post(url, data) {
		// 发起请求时，避免用户多次进行请求，以透明遮罩阻止
		let loadingInstance = Loading.service({ customClass: 'http-loading' });
		loadingInstance;
		data = qs.stringify(data);
		return axios({
			method: 'post',
			baseURL: location.origin,
			url,
			data: data,
			timeout: 10000,
			headers: {}
		}).then(response => checkStatus(response)).then((res) => {
			loadingInstance.close();
			return checkCode(res);
		}).catch(error => {
			loadingInstance.close();
			return checkCode(error);
		});
	},
	get(url, params) {
		return axios({
			method: 'get',
			baseURL: location.origin,
			url,
			params, // get 请求时带的参数
			timeout: 10000,
			headers: {}
		}).then(response => checkStatus(response)).then((res) => {
			loadingInstance.close();
			return checkCode(res);
		}).catch(error => {
			loadingInstance.close();
			return checkCode(error);
		});
	}
};
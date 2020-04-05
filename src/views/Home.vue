<style scoped>
	
</style>

<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png" />
		<p @click="clickPost">post请求获取数据</p>
		<p v-for="(item, index) in list" :key="index">{{item.title}}</p>
	</div>
</template>

<script>

export default {
	name: "Home",
	data() {
		return {
			list: {}
		}
	},
	methods: {
		clickPost: function() {
			this.http.post(this.api.contentList, {
				moduleAlias: 'wzxqyyc',
				number: 1
			}).then(response => {
				let data = response.data;
				this.list = data;
			})
		}
	}
};
</script>

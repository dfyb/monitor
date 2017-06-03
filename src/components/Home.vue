<style type="text/css">
	.menuInfo{
		/**background-color:#222d32;**/
		color:#b8c7ce;
	}
	.content{
        
    }
</style>
<template>
	<div>
		<v-header></v-header>
		<el-row type="flex">
			<el-col :span="4">
				<v-menu></v-menu>
			</el-col>
			<el-col :span="20">
				<el-row class="content">
					<router-view></router-view>
				</el-row>
				<v-footer></v-footer>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	import header from 'components/Header.vue'
	import footer from 'components/Footer.vue'
	import menu from 'components/Menu.vue'
	import content from 'components/Content.vue'

	export default {
		computed: {
			user(){
				 //因为在main.js中已经全局注册了store，所以这里直接用this.$直接使用。
				return this.$store.state.user
			}
		},
		components: {
			"v-header": header,
			"v-footer": footer,
			"v-menu": menu,
			"v-content": content
		}
	}
</script>
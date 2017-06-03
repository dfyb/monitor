<style scoped>
  .login {
    margin-top: 16px;
  }

  .login-form {
    border: 1px solid #eaeefb;
    border-radius: 4px;
    transition: .2s;
    padding: 16px;
  }
</style>
<template>
	<div class="login" id="app">
		<el-row>
			<el-col :span="8">&nbsp;</el-col>
			<el-col :span="8" class="login-form">
				<el-form>
					<el-form-item label="登录ID">
						<el-input v-model="name"></el-input>
					</el-form-item>
					<el-form-item label="密码">
						<el-input type="password" v-model="pwd" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="isLogin()">登录</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				name:'',
				pwd:'',
				error:''
			}
		},
		computed: {
			user() {
				return this.$store.state.user
			}
		},
		methods:{
			isLogin:function() {
				this.$http.get('http://localhost:8080/api/users?username='+this.name+'&password='+this.pwd).then((response) => { 
					//这里在isLogin方法中先判断一下后台返回的是否为空值，如果不是然后提交后台返回的值。
					//注意这里是个难点，Vuex与Vue-Resource结合使用。 
					if(response.body != null & response.body.userName.length > 0){ 
						this.$store.commit('isLogin',response.body.userName,response.body.userType);
						this.name='';
						this.pwd= '';
						this.$router.push({ path: 'home' }) ;
					}else{
						alert('请输入正确的用户名和密码！！！');
						this.name=''
						this.pwd= ''
					}
					
				}).then((error)=> this.error = error)
			}
		}
	}
</script>
<style>
	
</style>
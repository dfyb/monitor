<style>
	.logoInfo{
		background-color:#367fa9;
        color:#FFFFFF;
	}
    .headerInfo{
		background-color:#3c8dbc;
	}
</style>
<template>
    <div>
        <el-row type="flex">
			<el-col :span="4" class="logoInfo"> 
				<h2>Lenovo BMCP</h2>
			</el-col>
			<el-col :span="20" class="headerInfo">
				<el-row style="padding-top:15px;">
					<el-col :span="1" :offset="18">
						<h4><i class="el-icon-message"><span>4</span></i></h4>
					</el-col>
					<el-col :span="1">
						<h4><i class="el-icon-warning"><span>10</span></i></h4>
					</el-col>
					<el-col :span="3" :offset="1">
						<h4>
							<el-dropdown @command="handleCommand">
								<span class="el-dropdown-link">
									admin<i class="el-icon-caret-bottom el-icon--right"></i>
								</span>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item command="a">上次登录</el-dropdown-item>
									<el-dropdown-item command="b">账户管理</el-dropdown-item>
									<el-dropdown-item command="c">退出</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</h4>
					</el-col>
				</el-row>
			</el-col>
		</el-row>
    </div>
</template>
<script>
    export default {
		methods: {
			handleCommand(command) {
				this.$message('click on item ' + command);
			}
		}
	}
</script>
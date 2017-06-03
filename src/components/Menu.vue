<style type="text/css">
	.menuInfo{
		/**background-color:#222d32;**/
        background-color:#324157;
		color:#b8c7ce;
		height:700px;
	}
    .sunMenu{
        position: relative;
        display: block;
        width: 100%;
        padding:0px 0px 0px 0px;
    }

     .nav-main {
        list-style: none;
    }

    .nav-main li:hover {
        background-color: rgba(217, 222, 228, 0.5);
        color: #387AB7;
    }

    .nav-main a.router-link-active, .nav-main a.router-link-active:hover {
        color: #387AB7 !important;
        /**background-color: #387AB7;**/
    }

    .nav-main li {
        padding-left:0px;
    }

    .nav-main a {
        color: #FFFFFF;
        text-decoration:none;
    }
    .nav-main li{
        padding:0px 0px 0px 0px;
    }
	
</style>
<template>
    <div>
        <el-row>
            <el-col class="menuInfo">
                <el-menu default-active="1" class="el-menu-vertical-demo nav-main" 
                @open="handleOpen" @close="handleClose" theme="dark">
                    <el-menu-item index="1" >
                        <router-link to="/home/machines" class="sunMenu" style="padding-left:0px;"><i class="el-icon-share"></i>物理主机</router-link>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <router-link to="/home/project" class="sunMenu"><i class="el-icon-upload"></i>云项目</router-link>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <router-link to="/home/image" class="sunMenu"><i class="el-icon-picture"></i>镜像</router-link>
                    </el-menu-item>
                    <el-submenu index="4">
                        <template slot="title"><i class="el-icon-star-on"></i>基础设施</template>
                        <el-menu-item index="4-1">
                            <router-link to="/home/manage" class="sunMenu"><i class="el-icon-information"></i>裸机-管理模块</router-link>
                        </el-menu-item>
                        <el-menu-item index="4-2">
                            <router-link to="/home/switch" class="sunMenu"><i class="el-icon-information"></i>网络交换机</router-link>
                        </el-menu-item>
                        <!--<el-menu-item index="4-3">扩展硬件</el-menu-item>-->
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title"><i class="el-icon-date"></i>审核</template>
                        <el-menu-item index="5-1">
                            <router-link to="/home/approve" class="sunMenu"><i class="el-icon-information"></i>审核</router-link>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
        computed: {
			isAdmin(){
				 //因为在main.js中已经全局注册了store，所以这里直接用this.$直接使用。
				return this.$store.state.user == "super"
			}
		},
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>
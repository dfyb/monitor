<style lang="css">
    .selectedChart{
      width: 100px;
      height: 100px;
      border: 2px solid #FF0000;
    }
    .notSelectedChart{
      width: 100px;
      height: 100px;
      border: 1px solid #C3C3C3;
    }
</style>
<template>
    <el-row>
        <el-row type="flex" class="Machine">
            <el-col :span="8" :offset="1">
                <h3>物理主机</h3>
            </el-col>
            <el-col :span="4" :offset="12">
                <el-breadcrumb separator="/" style="padding-top:30px;">
                    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>物理主机</el-breadcrumb-item>
                    <el-breadcrumb-item>详情</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-row type="flex">
            <el-col :span="18">
                <el-tabs type="border-card">
                    <el-tab-pane label="监控" style="padding-left:20px;">
                        <v-monitor></v-monitor>
                    </el-tab-pane>
                    <el-tab-pane label="IMM事件">
                        <v-immevent></v-immevent>
                    </el-tab-pane>
                    <el-tab-pane label="操作日志">
                        <v-log></v-log>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
            <el-col :span="6" style="padding-left:5px;">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span style="font-size:18px;font-weight:bold;">属性</span>
                    </div>
                    <el-row type="flex">
                        <el-col>ID:</el-col>
                        <el-col>12</el-col>
                    </el-row>
                    <el-row type="flex">
                        <el-col>名称:</el-col>
                        <el-col>IMM2-0894ef050bed</el-col>
                    </el-row>
                    <el-row type="flex">
                        <el-col>电源:</el-col>
                        <el-col><el-tag type="success">on</el-tag></el-col>
                    </el-row>
                    <el-row type="flex">
                        <el-col>状态:</el-col>
                        <el-col><el-tag type="success">ok</el-tag></el-col>
                    </el-row>
                    <el-row type="flex">
                        <el-col>订购时间:</el-col>
                        <el-col>2016-02-23 07:08:09</el-col>
                    </el-row>
                </el-card>
                <el-card class="box-card" style="margin-top:10px;">
                    <div slot="header" class="clearfix">
                        <span style="font-size:18px;font-weight:bold;">配置</span>
                    </div>
                    <el-row type="flex">
                        <el-col>CPU:</el-col>
                        <el-col>16核</el-col>
                    </el-row>
                    <el-row type="flex">
                        <el-col>内存:</el-col>
                        <el-col>2GB</el-col>
                    </el-row>
                    <el-row type="flex">
                        <el-col>硬盘:</el-col>
                        <el-col>80GB</el-col>
                    </el-row>
                    <el-row type="flex">
                        <el-col>网络:</el-col>
                        <el-col>VALN1</el-col>
                    </el-row>
                    <el-row type="flex">
                        <el-col>部署:</el-col>
                        <el-col>已部署</el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
    </el-row>
</template>
<script>
    import machine_detail_monitor from './Machine_detail_monitor'
    import machine_detail_immevent from './Machine_detail_immevent'
    import machine_detail_log from './Machine_detail_log'
    export default {
        data: function(){
            return {
                configData: [{

                }]
            }
        },
        components: {
            "VMonitor": machine_detail_monitor,
            "VImmevent": machine_detail_immevent,
            "VLog": machine_detail_log
        }
    }
</script>
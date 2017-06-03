<style lang="css">
    .Machine{
        border-bottom:1px solid #d2d6de;
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
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-row style="padding-top:10px;" type="flex">
            <el-col :offset="1" :span="5">
                <el-button-group>
                    <el-button icon="caret-right" title="开启" @click="openVirMachine()"></el-button>
                    <el-button icon="close" title="关闭" @click="closeVirMachine()"></el-button>
                    <el-button icon="setting" title="重置"></el-button>
                </el-button-group>
                <el-button icon="share" title="部署"></el-button>
                <el-button icon="upload" title="回收"></el-button>
            </el-col>
            <el-col :span="2">
                <el-select v-model="projectValue" placeholder="所有项目">
                    <el-option
                    v-for="item in projectOptions"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="2">
                <el-select v-model="displayValue" placeholder="显示全部">
                    <el-option
                    v-for="item in displayOptions"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <el-row type="flex" style="padding-top:20px;">
            <el-col :span="3" :offset="18">
                <p>{{ username }}</p>
                <el-input
                placeholder="搜索"
                icon="search"
                v-model="searchKey"
                :on-icon-click="handleIconClick">
                </el-input>
            </el-col>
        </el-row>
        <el-row type="flex" style="padding-top:5px;text-align: center;">
            <el-col :offset="1" :span="22">
            <el-table
                :data="tableData"
                stripe
                border
                style="width: 100%;"
                @select="handleSelectionChange">
                <el-table-column
                    type="selection"
                    width="50px">
                </el-table-column>
                <el-table-column
                    prop="server_id"
                    label="ID"
                    width="60px"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="server_name"
                    label="名称"
                    width="200px"
                    align="center">
                    <template scope="scope">
                        <router-link to="/home/machinedetail">{{scope.row.server_name}}</router-link>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="status_power"
                    label="电源"
                    width="100px"
                    align="center">
                    <template scope="scope">
                        <el-tag 
                            :type="scope.row.status_power === 'on' ? 'success' : 'danger'"
                            style="font-weight:bold;">
                            {{scope.row.status_power}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="cpu_cores"
                    label="配置"
                    width="200px"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="deploy"
                    label="部署"
                    width="127px"
                    align="center">
                    <template scope="scope">
                        <p v-show="scope.row.deploy === '未部署'">
                            <i class="el-icon-circle-cross"></i>{{scope.row.deploy}}
                        </p>
                        <p v-show="scope.row.deploy === '已部署'">
                            <i class="el-icon-circle-check"></i>{{scope.row.deploy}}
                        </p>
                        <p v-show="scope.row.deploy === '正在部署'">
                            <i class="el-icon-loading"></i> {{scope.row.deploy}}
                        </p>

                    </template>
                </el-table-column>
                <el-table-column
                    prop="status_subscripted"
                    label="状态"
                    width="100px"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="load"
                    label="负载"
                    width="70px"
                    align="center">
                    <template scope="scope">
                        <p style="color:#FF0000;">{{scope.row.load}}%</p>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="ip_address"
                    label="控制入口"
                    width="200px"
                    align="center">
                    <template scope="scope">
                        <a href="scope.row.ip_address">{{scope.row.ip_address}}</a>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="status_subscripted"
                    label="订阅情况"
                    width="100px"
                    align="center">
                </el-table-column>
            </el-table>
            </el-col>
        </el-row>
        <el-row type="flex" >
            <el-col :offset="12">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 25, 50, 100]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
                </el-pagination>
            </el-col>
        </el-row>
    </el-row>
</template>
<script>
    import machieservice from '../../webservice/machineservice'
    export default {
        data: function () {
            return {
                displayOptions: [
                    {
                        value: 'display1',
                        label: '显示全部'
                    }, {
                        value: 'display2',
                        label: '仅开机'
                    }, {
                        value: 'display3',
                        label: '仅关机'
                    }, {
                        value: 'display4',
                        label: '仅有预警'
                    }, {
                        value: 'display5',
                        label: '仅高负载'
                    }, {
                        value: 'display6',
                        label: '仅低负载'
                    }
                ],
                displayValue: 'display1',
                projectOptions: [
                    {
                        value: 'project1',
                        label: '所有项目'
                    }, {
                        value: 'project2',
                        label: '卫星数据下载'
                    }
                ],
                projectValue: 'project1',
                searchKey: '',
                tableData: [],
                pageSize: 10,
                currentPage: 4,
                multipleSelection: ""
            }
            
        },
        computed: {
            username(){
                return this.$store.state.user
            } 
        },
        created: function () {
            this.getMachineListData();
        },
        methods: {
            handleIconClick(ev) {
                console.log(ev);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                console.log(`当前页: ${val}`);
            },
            handleSelectionChange(val) {
                console.log("select:"+val);
                this.multipleSelection = val[0].server_id;
            },
            getMachineListData() {
                var _this = this;
                let _interval_id = setInterval(function(){
                     machieservice.getMachineServer(_this.tableData);
                },5000);
            },
            openVirMachine() {
                if(this.multipleSelection == null || this.multipleSelection.length == 0)
                    this.$message('请选择一台操作的物理主机！');
                machieservice.openMachineFunc(this.multipleSelection)
            },
            closeVirMachine() {
                if(this.multipleSelection == null || this.multipleSelection.length == 0)
                    this.$message('请选择一台操作的物理主机！');
                machieservice.closeMachineFunc(this.multipleSelection)
            }
        }
	}
</script>
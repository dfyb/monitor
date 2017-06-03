<style lang="">
    
</style>
<template>
    <el-row type="flex">
        <el-col :span="24">
            <el-table
                :data="immeventCurData"
                stripe
                style="width: 100%;">
                <el-table-column
                    prop="selection"
                    label="等级"
                    width="200px"
                    align="center">
                    <template scope="scope">
                        <el-tag :type="scope.row.severity === 'Warning' ? 'danger' :'success'">
                            {{scope.row.severity}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="eventmsg"
                    label="事件消息"
                    width="550px"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="date_time"
                    label="时间"
                    width="200px"
                    align="center">
                </el-table-column>
            </el-table>
            <el-row type="flex" >
            <el-col :offset="8">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 25, 50, 100]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="100">
                </el-pagination>
            </el-col>
        </el-row>
        </el-col>
    </el-row>
</template>
<script>
    import machineDetailService from '../../webservice/machine_detail_service'
    export default {
        data: function(){
            return {
                immeventTotalData: [],
                immeventCurData: [],
                currentPage: 1,
                pageSize: 10
            }
        },
        mounted: function(){
            this.getimm_event_list()
            this.handleSizeChange(8);
        },
        methods: {
            getimm_event_list: function(){
                machineDetailService.imm_event_list(this.immeventCurData,this.currentPage,this.pageSize)
            },
            handleSizeChange: function(val) {
                machineDetailService.imm_event_list(this.immeventCurData,this.currentPage,val)
                this.pageSize = val;
                this.currentPage = 1;
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange: function(val) {
                machineDetailService.imm_event_list(this.immeventCurData,val,this.pageSize)
                this.currentPage = val;
                console.log(`当前页: ${val}`);
            }
        }
    }
</script>
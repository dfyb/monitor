<style lang="">
    
</style>
<template>
    <div>
        <el-row style="padding-top:10px;">
            <el-col :span="2" :offset="15"><h4>时间区间</h4></el-col>
            <el-col :span="4">
                <el-select v-model="selectedTimeValue" placeholder="请选择">
                    <el-option
                    v-for="item in timeOptions"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <el-row type="flex">
            <el-col :span="3" :offset="1">
                <div id="cpuChartThumbnail" title="CPU" class="selectedChart" @click="changeChart"></div>
            </el-col>
            <el-col :span="3">
                <div id="memoryChartThumbnail" title="内存" class="notSelectedChart" @click="changeChart"></div>
            </el-col>
            <el-col :span="3">
                <div id="diskChartThumbnail" title="硬盘" class="notSelectedChart" @click="changeChart"></div>
            </el-col>
            <el-col :span="3">
                <div id="temperatureChartThumbnail" title="温度" class="notSelectedChart" @click="changeChart"></div>
            </el-col>
            <el-col :span="3">
                <div id="consumeChartThumbnail" title="能耗" class="notSelectedChart" @click="changeChart"></div>
            </el-col>
            <el-col :span="3">
                <div id="networkChartThumbnail" title="网络" class="notSelectedChart" @click="changeChart"></div>
            </el-col>
            <el-col :span="3">
                <div id="occupancyChartThumbnail" title="占用" class="notSelectedChart" @click="changeChart"></div>
            </el-col>
        </el-row>
        <el-row style="margin-top:5px;">
            <el-col :offset="1">
                <div id="bigEchartSingle" style="width:803px;height: 500px;border: 1px solid #C3C3C3;"></div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import machineDetailService from '../../webservice/machine_detail_service'
    export default {
        data: function(){
            return {
                timeOptions: [
                    {
                        label: "1小时",
                        value: "1h"
                    },{
                        label: "12小时",
                        value: "12h"
                    },{
                        label: "一天",
                        value: "1d"
                    },{
                        label: "三天",
                        value: "3d"
                    },{
                        label: "七天",
                        value: "7d"
                    }
                ],
                selectedTimeValue: "1h"
            }
        },
        mounted: function(){
            this.initChartData();
            this.setFirstImage();
        },
        methods: {
            changeChart(e) {
                machineDetailService.changeChart(e.target)
            },
            initChartData() {
                machineDetailService.initChartData(100)
            },
            setFirstImage() {
                machineDetailService.changeChart(document.getElementById("cpuChartThumbnail"))
            }
        }
    }
</script>
var echarts = require('echarts');

var date = [];
var data = [];
function getNowValue(){
    var now = new Date();
    var _date = [now.getHours().toString().length==1?"0"+now.getHours():now.getHours(), 
    now.getMinutes().toString().length==1?"0"+now.getMinutes():now.getMinutes(), 
    now.getSeconds().toString().length==1?"0"+now.getSeconds():now.getSeconds()].join(':');
    return _date;
}

function addData(shift) {
    date.push(getNowValue());
    var _value = parseInt(Math.random() * 100);
    if(_value < 50)
        _value = _value + data[data.length - 1];
    if(_value >85)
        _value = 85;
    data.push(_value);
    if (shift) {
        date.shift();
        data.shift();
    }
}

function addHttpData(fields){
    // $.get("http://10.240.212.168:5000/api", function(_d){
    //     var _value =JSON.parse(_d)[fields];
    //     if(_value == null)
    //         _value = 0;
    //     data.push(_value);
    //     if(data.length>50){
    //         data.shift();
    //         date.shift();
    //     }
    // });
}

function initChartData(len){
    for (var i = 1; i < len; i++) {
        addData();
    }
}

function setChartOption(myChart, title){
    var _myChart = myChart;
    var _title = title;
    var _yAxis = {};
    if(title == "CPU"){
        _yAxis = {
            boundaryGap: [0, '80%'],
            type: 'value',
            axisLabel : {
                formatter: '{value} %'
            },
            splitNumber:10,
            max: 100
        }
    }else if(title == "内存"){
        _yAxis = {
            boundaryGap: [0, '80%'],
            type: 'value',
            axisLabel : {
                formatter: '{value} GB'
            },
            splitNumber:10,
            max: 256
        }
    }else{
        _yAxis = {
            boundaryGap: [0, '80%'],
            type: 'value'
        };
    }
    _myChart.setOption({
        title: {
            show: false,
            text: _title
        },
        color:["#008000"],
        tooltip: {
            trigger: 'axis',
            axisPointer : {
                type : 'shadow'
            }
        },
        legend: {
            data:[_title]
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: date
        },
        yAxis: _yAxis,
        series: [
            {
                name:_title,
                type:'line',
                smooth:true,
                symbol: 'none',
                stack: 'a',
                areaStyle: {
                    normal: {}
                },
                data: data
            }
        ]
    });
}

function setPieChartOption(myChart, title){
    var _myChart = myChart;
    var _title = title;
    _myChart.setOption({
        title: {
            show: false,
            text: _title
        },
        tooltip: {
            trigger: 'axis',
            axisPointer : {
                type : 'shadow'
            }
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data:['项目1','项目2','项目3']
        },
        xAxis: {
            show:false,
            type: 'category',
            boundaryGap: false,
            data: date
        },
        yAxis: {
            show:false,
            boundaryGap: [0, '50%'],
            type: 'value'
        },
        series: [
            {
                name: '占用',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:400, name:'项目1'},
                    {value:335, name:'项目2'},
                    {value:310, name:'项目3'}
                ]
            }
        ]
    });
}

var lastId = "";
var lastEle = "";
function changeChart(ele){
    var _title = ele.title;
    var _bigChart = echarts.init(document.getElementById("bigEchartSingle"));

    if(lastEle)
        $(lastEle).removeClass("selectedChart").addClass("notSelectedChart");
    $(ele).removeClass("notSelectedChart").addClass("selectedChart");

    window.clearInterval(lastId);
    var _id = ele.id;
    data = [];
    date = [];
    if(_id == "occupancyChartThumbnail"){
        lastId = setInterval(function () {
            addData(true);
            setPieChartOption(_bigChart, _title);
        }, 1000);
    }else if(_id == "cpuChartThumbnail"){
        lastId = setInterval(function () {
            date.push(getNowValue());
            addHttpData("cpu");
            setChartOption(_bigChart, _title);
        }, 1000);
    }else if(_id == "memoryChartThumbnail"){
        lastId = setInterval(function () { 
            date.push(getNowValue());
            addHttpData("memory");
            setChartOption(_bigChart, _title);
        }, 1000);
    }else{
        initChartData(100);
        lastId = setInterval(function () {
            addData(true);
            setChartOption(_bigChart, _title);
        }, 1000);
    }

    lastEle = ele;
}

function imm_event_list(immeventTotalData,curPage,pageSize){
    $.get("http://10.240.198.57:3343/api/server/3/imm_event",function(data){
        immeventTotalData.length = 0;
        var num = 0;
        for (var key in data) {
            var severity = data[key]['Severity'];
            var eventmsg  = data[key]['EventMsg'];
            var date_time = data[key]['DateTime'];
            var bg_color = 'bg-green';
            num ++ ;
            if( num < curPage * pageSize && num > (curPage - 1) * pageSize ){
                immeventTotalData.push({
                    severity: severity,
                    eventmsg: eventmsg,
                    date_time: date_time
                })
            }
            if(immeventTotalData.length == pageSize)
                break;
        }
    });
}



export default {
    changeChart: changeChart,
    initChartData: initChartData,
    imm_event_list: imm_event_list
}

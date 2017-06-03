import store from '../vuex/store'

let _tableDataList = [];
function getMachieDataListService (_tableData){
    _tableDataList.length = 0;
    $.get("http://10.240.198.57:3343/api/xclarity/list",function(data){
        if(data['data'].length == 0){
            return;
        }else{
            // let userType = store.state.userType;
            let userType =2;
            // console.log('UserType:');
            // console.log(userType);
            let request_server_list_url = "";
            if(userType == 2){
                request_server_list_url = "http://10.240.198.57:3343/api/server/list";
            }else{
                request_server_list_url = "http://10.240.198.57:3343/api/user/serverlist?username=bmcuser";
            }
            
            $.get(request_server_list_url, function(data){
                // console.log(data);
                _tableData.length = 0;
                for (var key in data['data']) {
                    var server_id = data['data'][key]['id'];
                    var server_name = data['data'][key]['imm_host_name'];
                    var status_power = data['data'][key]['status_power'];
                    var load = parseInt(Math.random()*100);
                    var badge = 'bg-green';
                    if(status_power!="on") {badge = 'bg-red';load = 0}
                    var cpu_cores = data['data'][key]['cpu_cores'];
                    var cpu_frequency = data['data'][key]['cpu_frequency'];
                    var mem_capacity = data['data'][key]['mem_capacity'];
                    var status_deploy = data['data'][key]['status_deploy'];
                    var status_subscripted = data['data'][key]['status_subscripted'];
                    var deploy = '未部署';
                    var fa_style = 'fa-ban';
                    if(status_deploy == "deploying") {deploy = '正在部署'; fa_style='fa-refresh fa-spin';}
                    if(status_deploy == "success") {deploy = '已部署';fa_style = 'fa-check';}
                    var imm_ip = data['data'][key]['imm_ip'];
                    var ip_address = data['data'][key]['ip_address'];
                    // server_href = '/static/bare-machine.html?server_id=' + server_id;
                    
                    let _obj = {
                        "server_id": server_id,
                        "server_name": server_name,
                        "status_power": status_power,
                        "load": load,
                        "cpu_cores": cpu_cores + "核 " + cpu_frequency + "HZ " + mem_capacity + "GB",
                        "cpu_frequency": cpu_frequency,
                        "mem_capacity": mem_capacity,
                        "deploy": deploy,
                        "status_subscripted": status_subscripted,
                        "imm_ip": imm_ip,
                        "ip_address": ip_address
                    }
                    _tableData.push(_obj);
                }
            });
        }
    });
}

function openMachineFunc(multiSelection){
    var server_id = multiSelection;
    console.log(server_id);
    $.ajax({
        type: "PUT",
        url: "http://10.240.198.57:3343/api/server/"+ server_id +"/power",
        contentType: "application/json",
        data: '{"action": "on"}',
        success: function (response) {
            console.log('ok');
            location.reload();
        }
    });
}

function closeMachineFunc(multiSelection){
    var server_id = multiSelection;
    console.log(server_id);
    $.ajax({type: "PUT",
        url: "http://10.240.198.57:3343/api/server/"+ server_id +"/power",
        contentType: "application/json",
        data: '{"action": "off"}',
        success: function (response) {
            console.log('ok');
            location.reload();
        }
    });
}

export default {
  getMachineServer: getMachieDataListService,
  closeMachineFunc: closeMachineFunc,
  openMachineFunc: openMachineFunc
}

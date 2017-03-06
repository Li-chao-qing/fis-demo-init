# fis-demo-init
init

echarts x轴原来... hover 显示全部
// // 资产组件排行
// // 基于准备好的dom，初始化echarts实例

// 指定图表的配置项和数据

var myChart = echarts.init(document.getElementById('module_cont'));

var option = {

    backgroundColor: "rgba(63, 189, 189, .1)",
    title: {
        x: 'center',
        y: 0,
        text: '资产组件排行 ( TOP10 )',
        textStyle: {
            color: "#05ffff",
            fontSize: 16,

        },
        top: 15
            // textAlign: "center"
    },
    tooltip: {
        formatter: '{b}<br/>' + '数量 : {c}',
        // formatter: function() {
        //     return ['1', '2']
        // },
        padding: [8, 12, 8, 12],
        backgroundColor: 'rgba(6,6,6,0.5)',
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
            shadowStyle: {
                color: 'rgba(255,255,255,0.1)'
                    // 
            }
        }
    },
    // legend: {
    //     data: ['销量']
    // },
    grid: {
        left: '5%',
        right: '5%',
        top: '25%',
        bottom: '5%',
        containLabel: true,
        // x: 10,
        // x2: 100,
        // y2: 150,
    },

    xAxis: {
        axisTick: {
            show: false
        },
        nameTextStyle: {
            color: 'red'
        },
        // data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子", "裤子", "高跟鞋", "袜子", "雪纺衫"],
        axisLabel: {
            interval: 0, //横轴信息全部显示  
            // rotate: 30, //-30度角倾斜显示  
            textStyle: {
                color: '#576363',
                // fontSize:14
            },


        },
        axisLine: {
            lineStyle: {
                color: '#576363'
            }
        },

    },
    yAxis: {
        name: '个',
        nameLocation: "end",
        nameGap: 5,
        nameTextStyle: {
            color: '#576363'
        },
        axisLabel: {
            textStyle: {
                color: '#576363'
            }
        },
        axisLine: {
            lineStyle: {
                color: '#576363'
            }
        },
        splitLine: {
            show: false
        }
        // boundaryGap: ['-20%', '-20%']
    },
    series: [{
        // xAxisIndex: 10,
        label: {
            normal: {
                show: true,
                position: "top",
                offset: [0, -3],
                textStyle: {
                    color: "#05ffff",
                }
            }
        },
        itemStyle: {
            normal: {
                borderColor: "#05ffff",
                // borderWidth: [1, 1, 1, 0],
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(5,255,255,0.2)' // 0% 处的颜色
                }, {
                    offset: 1,
                    color: 'rgba(5,255,255,0)' // 100% 处的颜色
                }], false)
            }
        },
        name: '销量',
        type: 'bar',
        // barGap: '5%',
        barWidth: "48%",
        // data: [5, 20, 36, 10, 10, 20, 34, 67, 89, 200]
    }]
};
var data = {
    "instance_id": "d08b7fb24463877e1830b3bb3e7b7303",
    "size": 10,
    "start_time": 1451577601

}
$.ajax({
    // url: 'api/v1/screen/assets/assetscomponent',
    url: '/api/user',
    type: 'post',
    dataType: 'json',
    data: data,


}).done(function(data) {
    relateFn(data.data.chart)
    console.log(data)
})

function relateFn(data) {
    // var arr = []
    // for (var i = 0; i < data.labels.length; i++) {
    //     arr.push(xLength(data.labels[i]))
    // }
    // option.xAxis.data = arr
    option.xAxis.data = data.labels;
    option.series[0].data = data.count;
    option.xAxis.axisLabel.formatter = function(value, index) {
        // 格式化成月/日，只在第一个刻度显示年份
        // var date = new Date(value);
        // var texts = [(date.getMonth() + 1), date.getDate()];
        // if (index === 0) {
        //     texts.unshift(date.getYear());
        // }
        // return texts.join('/');
        return xLength(data.labels[index])
    }
    myChart.setOption(option);

}

function xLength(v) {
    var vtime = Math.ceil(v.length / 9)
    var str = ''
    if (vtime === 1) {
        return v
    }
    str += v.slice(0, 9) + '...'
    return str
}
// 使用刚指定的配置项和数据显示图表。


// window.onresize = function() {

//     myChart.resize()
// }
$(window).resize(function() {

    myChart.resize()
})

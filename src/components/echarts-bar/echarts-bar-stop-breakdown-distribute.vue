<template>
  <div class="ebsbd-box">
    <div id="stop-or-breakdown-echarts"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
        stopOrBreakEcharts:null
    };
  },
  mounted() {
    this.BarEDStopOrBreakdown();
  },
  methods: {
    // 停止 or 故障设备分布 柱状图
    BarEDStopOrBreakdown() {
      let chartDom = document.getElementById("stop-or-breakdown-echarts");
      let myChart = echarts.init(chartDom);
      this.store.state.echartsObj = {
        ...this.store.state.echartsObj,
        stopOrBreakEcharts: myChart,
      };
      let colorArr = [
        { name: "征收", color: "#2BC191", type: 1 },
        { name: "征地", color: "#FDC741", type: 2 },
        { name: "其他", color: "#0060FF", type: 3 },
      ];

      let data = [
        { type: 1, name: "清水溪", value: 3780 },
        { type: 1, name: "双井", value: 350 },
        { type: 2, name: "复元社", value: 327 },
        { type: 3, name: "自主搬迁", value: 260 },
        { type: 2, name: "井双新城", value: 180 },
        { type: 2, name: "夏大湾社", value: 141 },
        { type: 1, name: "特岗二号", value: 74 },
        { type: 1, name: "特岗二号2", value: 74 },
        { type: 1, name: "特岗二号3", value: 74 },
        { type: 1, name: "特岗二号4", value: 1174 },
      ];
      let titleData = [];
      let valueData = [];
      data.forEach((item) => {
        let valueObj = colorArr.find((cit) => {
          return cit.type == item.type;
        });
        if (!valueObj) {
          return;
        }
        valueData.push({
          value: item.value,
          itemStyle: {
            // color: valueObj.color,
          },
        });
        titleData.push(item.name);
      });
      // 降序
      valueData.sort((a, b) => {
        return a.value - b.value;
      });
      titleData.reverse();

      let option = {
        title: {
          text: "停止/故障设备分布",
          top: "2%",
          textStyle: {
            color: "#4DF3F6",
            // fontWeight: "normal"
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          top: "2%",
          right: "0%",
          icon: "circle", //圆形
          textStyle: {
            // fontWeight: 'bold',
            color: "#fff",
            fontSize: 12,
          },
        },
        grid: {
          left: "3%",
          right: "10%",
          bottom: "3%",
        //   top: "10%",
          containLabel: true,
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              //轴线
              show: true,
              lineStyle: {
                color: "#ccc",
              },
              // symbol:['none','path://M5,20 L5,5 L8,8 L5,2 L2,8 L5,5 L5.3,6 L5.3,20'],
              symbol: [
                "none",
                "path://M5,20 L5,5 L8,5 L5,2 L2,5 L5,5 L5.3,6 L5.3,20",
              ],
              symbolOffset: -1,
              symbolSize: [35, 38],
            },
            splitLine: {
              //网格线
              show: true,
              lineStyle: {
                // color: '#333'
                color: "#1B4E8D",
              },
            },
            axisLabel: {
              show: true,
              textStyle: {
                // fontWeight: 'bold',
                color: "#ddd",
                fontSize: 12,
              },
            },
          },
        ],
        xAxis: [
          {
            type: "category",
            axisLine: {
              //轴线
              show: true,
              lineStyle: {
                color: "#ccc",
              },
              // symbol:['none','path://M5,20 L5,5 L8,8 L5,2 L2,8 L5,5 L5.3,6 L5.3,20'],
              symbol: [
                "none",
                "path://M5,20 L5,5 L8,5 L5,2 L2,5 L5,5 L5.3,6 L5.3,20",
              ],
              symbolOffset: -1,
              symbolSize: [35, 35],
            },
            // data: ['单间配套', '一室一厅', '两室一厅', '两室两厅', '三室一厅', '三室两厅', '四室一厅', '四室两厅'],
            data: titleData,
            axisLabel: {
              show: true,
              rotate: 30, //倾斜的程度
              textStyle: {
                // fontWeight: 'bold',
                color: "#ddd",
                fontSize: 10,
              },
            },
          },
        ],
        dataZoom: {
          show: false, // 为true 滚动条出现
          // realtime: true,
          start: 100 - (7 / data.length) * 100, // 表示默认展示20%～80%这一段。
          end: 100,
          type: "inside",
          xAxisIndex: [0],
          filterMode: "filter",
        },
        series: [
          {
            barWidth: 10,
            name: '停止',
            type: "bar",
            // stack: "Ad",
            color: "#0C64FE",
            emphasis: {
              focus: "series",
            },
            // data: [
            //     120,
            //     // 132,
            //     {
            //         value: 200,
            //         itemStyle: {
            //             color: '#a90000',
            //         }
            //     },
            //     101,
            //     134,
            //     900,
            //     230,
            //     210,
            //     210
            // ],
            data: valueData,
          },
          {
            barWidth: 10,
            name: '故障',
            type: "bar",
            color: "#EA6C0C",
            // stack: "Ad",
            emphasis: {
              focus: "series",
            },
            // data: [
            //     120,
            //     // 132,
            //     {
            //         value: 200,
            //         itemStyle: {
            //             color: '#a90000',
            //         }
            //     },
            //     101,
            //     134,
            //     900,
            //     230,
            //     210,
            //     210
            // ],
            data: valueData,
          },
        ],
      };

      myChart.setOption(option);
      myChart.on("click", function (params) {
        console.log(params, "click-----myChart");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.ebsbd-box {
  width: 100%;
  height: 100%;
  #stop-or-breakdown-echarts {
    width: 100%;
    height: 100%;
  }
}
</style>
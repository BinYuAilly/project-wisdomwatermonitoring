<template>
  <div class="distribute-run-box">
    <div class="tab-shift-block">
      <span
        class="distribute-run-btn"
        :class="selectedIndex == 1 ? 'selected' : ''"
        @click="
          () => {
            shiftEvent(1);
          }
        "
        >设备分布</span
      >
      <span
        class="distribute-run-btn"
        :class="selectedIndex == 2 ? 'selected' : ''"
        @click="
          () => {
            shiftEvent(2);
          }
        "
        >设备运行数据</span
      >
    </div>
    <div class="echarts-show-box">
      <div id="distribute-echarts" v-show="selectedIndex == 1"></div>
      <div id="run-data-echarts" v-show="selectedIndex == 2"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import axios from "axios";
export default {
  data() {
    return {
      selectedIndex: 1,
      distributeRun: null, //设备分布
      runDataEcharts: null, //设备运行数据
    };
  },
  mounted() {
    this.BarEquipmentDistribution();
    this.EquipmentRunData();
  },
  methods: {
    // 设备分布 柱状图
    BarEquipmentDistribution() {
      let chartDom = document.getElementById("distribute-echarts");
      let myChart = echarts.init(chartDom);
      this.store.state.echartsObj = {
        ...this.store.state.echartsObj,
        distributeRun: myChart,
      };
      this.distributeRun = myChart;
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
            color: "#fff",
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
          // text: "设备分布",
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
          top: "10%",
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
            barWidth: 20,
            // name: '已安置',
            type: "bar",
            stack: "Ad",
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
    // 设备运行数据
    EquipmentRunData() {
      // return

      let chartDom = document.getElementById("run-data-echarts");
      let myChart = echarts.init(chartDom);
      this.store.state.echartsObj = {
        ...this.store.state.echartsObj,
        runDataEcharts: myChart,
      };
      this.runDataEcharts = myChart;
      let runData = [150, 156, 160, 170, 162, 160, 230];
      let xData = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      let runPointData = [];
      let coords = [];
      for (let i = 0; i < xData.length; i++) {
        coords.push([xData[i], runData[i]]);
      }
      runPointData.push({ coords });
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        // 标题
        legend: {
          top: "2%",
          right: "0%",
          // left: "30%",
          icon: "circle", //圆形
          textStyle: {
            // fontWeight: 'bold',
            color: "#fff",
            fontSize: 12,
          },
          data: [
            {
              name: "运行时间",
              icon: "circle",
            },
            {
              name: "研究次数",
              icon: "pin",
            },
          ],
        },
        grid: {
          left: "4%",
          right: "4%",
          bottom: "2%",
          top: "18%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisLine: {
            //轴线
            show: true,
            lineStyle: {
              // color: "#ccc",
              color: "#1B4E8D",
            },
          },
          axisLabel: {
            show: true,
            rotate: 30, //倾斜的程度
            textStyle: {
              // fontWeight: 'bold',
              color: "#ddd",
              fontSize: 10,
            },
          },
          data: xData,
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              //轴线
              show: true,
              lineStyle: {
                // color: "#ccc",
                color: "#1B4E8D",
              },
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
              formatter: "{value}(H)",
              show: true,
              textStyle: {
                // fontWeight: 'bold',
                color: "#ddd",
                fontSize: 12,
              },
            },
          },
          {
            type: "value",
            axisLine: {
              //轴线
              show: true,
              lineStyle: {
                // color: "#ccc",
                color: "#1B4E8D",
              },
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
              // formatter: "{value}(次)",
              formatter(params) {
                console.log(params, "params-----------");
                return `${params}(次)`;
              },
              show: true,
              textStyle: {
                // fontWeight: 'bold',
                color: "#ddd",
                fontSize: 12,
              },
            },
          },
        ],
        series: [
          {
            type: "line",
            name: "运行时间",
            tooltip: {
              formatter(params) {
                return 111;
              },
            },
            smooth: 0.6, //光滑折线
            symbol: "none", //节点 设置
            color: "#B021EE",
            areaStyle: {
              // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              //   {
              //     offset: 0,
              //     color: "rgba(58,77,233,0.8)",
              //   },
              //   {
              //     offset: 1,
              //     color: "rgba(58,77,233,0.3)",
              //   },
              // ]),
            },
            // data: [150, 230, 224, 218, 135, 147, 230],
            data: runData,
          },
          {
            type: "lines",
            name: "光滑点",
            coordinateSystem: "cartesian2d",
            symbolSize: 30,
            color: "#B021EE",
            polyline: true,
            effect: {
              show: true,
              trailLength: 0,
              symbol: "circle",
              period: 10, //光点滑动速度
              symbolSize: 15,
              animation: false,
              // symbol: ''
            },
            lineStyle: {
              normal: {
                width: 0,
                opacity: 0.6,
                curveness: 0.2,
              },
            },
            data: runPointData,// 为x 和 y 轴的坐标数组
          },
          {
            type: "line",
            name: "研究次数",
            yAxisIndex: 1,
            tooltip: {
              // formatter(params) {
              //   return 111;
              // },
            },
            smooth: 0.6, //光滑折线
            symbol: "none", //节点 设置
            color: "#33E8EB",
            areaStyle: {
              // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              //   {
              //     offset: 0,
              //     color: "rgba(58,77,233,0.8)",
              //   },
              //   {
              //     offset: 1,
              //     color: "rgba(58,77,233,0.3)",
              //   },
              // ]),
            },
            data: [239, 239, 239, 239, 239, 239, 239],
          },
        ],
      };
      myChart.setOption(option);
      myChart.on("click", function (params) {
        console.log(params, "click-----myChart");
      });
    },
    shiftEvent(ind) {
      this.selectedIndex = ind;
      // 避免echarts 没完全铺满
      setTimeout(() => {
        if (ind == 2) {
          this.runDataEcharts.resize();
        } else if (ind == 1) {
          this.distributeRun.resize();
        }
        console.log(ind, "setTimeout--------");
      }, 0);
      console.log(ind, "ind--------");
    },
  },
};
</script>

<style lang="scss" scoped>
.distribute-run-box {
  width: 100%;
  height: 100%;
  // display: flex;
  // flex-direction: column;
  .tab-shift-block {
    width: 100%;
    height: 10%;
    margin-left: 3px;
    .distribute-run-btn {
      margin-right: 3px;
      display: inline-block;
      font-size: 16px;
      color: #fff;
      font-weight: bold;
      padding: 0 2px;
      cursor: pointer;
    }
    .distribute-run-btn.selected {
      color: #4df3f6;
      font-size: 18px;
      padding-bottom: 3px;
      border-bottom: 1px solid #4df3f6;
    }
  }

  .echarts-show-box {
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
    #distribute-echarts {
      width: 100%;
      height: 50%;
      height: 100%;
    }
    #run-data-echarts {
      width: 100%;
      height: 50%;
      height: 100%;
    }
  }
}
</style>
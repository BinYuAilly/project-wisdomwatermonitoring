<template>
  <div class="BOD-analyse-box">
    <div id="BOD-analyse-echarts"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      BODAnalyseEcharts: null,
    };
  },
  mounted() {
    this.BODDataAnalyse();
  },
  methods: {
    BODDataAnalyse() {
      let chartDom = document.getElementById("BOD-analyse-echarts");
      let myChart = echarts.init(chartDom);
      this.store.state.echartsObj = {
        ...this.store.state.echartsObj,
        BODAnalyseEcharts: myChart,
      };
      let option = {
        title: {
          text: "全国水样BOD数据分析图",
          top: "2%",
          textStyle: {
            color: "#4DF3F6",
            // fontWeight: "normal"
          },
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          icon: "circle", //圆形
          top: "18%",
          textStyle: {
            // fontWeight: 'bold',
            color: "#fff",
            fontSize: 12,
          },

          data: ["生活饮水", "河流", "工业", "地面", "污水"],
        },
        grid: {
          top: "28%",
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        // toolbox: {
        //   feature: {
        //     saveAsImage: {},
        //   },
        // },
        xAxis: {
          type: "category",
          boundaryGap: false,
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
            // rotate: 30, //倾斜的程度
            textStyle: {
              // fontWeight: 'bold',
              color: "#ddd",
              fontSize: 12,
            },
          },
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter(params){
                return `${params}(mg/L)`
            },
            show: true,
            // rotate: 30, //倾斜的程度
            textStyle: {
              // fontWeight: 'bold',
              color: "#ddd",
              fontSize: 12,
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
        },
        series: [
          {
            smooth: 0.6, //光滑折线
            symbol: "none", //节点 设置
            name: "生活饮水",
            type: "line",
            stack: "Total",
            color: "#4A7DD8",
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            smooth: 0.6, //光滑折线
            symbol: "none", //节点 设置
            name: "河流",
            type: "line",
            stack: "Total",
            color: "#ED7C30",
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            smooth: 0.6, //光滑折线
            symbol: "none", //节点 设置
            name: "工业",
            type: "line",
            stack: "Total",
            color: "#80FF80",
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            smooth: 0.6, //光滑折线
            symbol: "none", //节点 设置
            name: "地面",
            type: "line",
            stack: "Total",
            color: "#FF8096",
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            smooth: 0.6, //光滑折线
            symbol: "none", //节点 设置
            name: "污水",
            type: "line",
            stack: "Total",
            color: "#800080",
            data: [820, 932, 901, 934, 1290, 1330, 1320],
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
.BOD-analyse-box {
  width: 100%;
  height: 100%;
  #BOD-analyse-echarts {
    width: 100%;
    height: 100%;
  }
}
</style>
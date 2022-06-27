<template>
  <div class="runtime-box">
    <div id="runtime-echarts"></div>
    <div class="runtime-data-show">
      <table>
        <tbody>
          <tr>
            <td>BOD-Q</td>
            <td>39台</td>
          </tr>
          <tr>
            <td>LL-IP</td>
            <td>39台</td>
          </tr>
          <tr>
            <td>LL-IS</td>
            <td>39台</td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td>停机设备</td>
            <td>39台</td>
          </tr>
          <tr>
            <td>故障设备</td>
            <td>39台</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import moment from '@/assets/js/moment.js'
export default {
  data() {
    return {
      oldHtml: "",
      today: 0,
    };
  },
  mounted() {
    this.PieChart();
    this.today = moment().format('YYYY年MM月DD日');
    console.log(this.today)
  },
  methods: {
    // 设备运行 饼状图
    PieChart() {
      let data = [
        { value: 0, name: "运行" },
        { value: 40, name: "停机" },
        { value: 40, name: "故障" },
      ];

      let legendData = [
        { value: 0, name: "运行" },
        { value: 40, name: "停机" },
        { value: 40, name: "故障" },
      ];
      // data.forEach((item) => {
      //   let legendStyle = {
      //     ...item,
      //   };
      //   legendData.push(legendStyle);
      // });
      let chartDom = document.getElementById("runtime-echarts");
      let myChart = echarts.init(chartDom);
      this.store.state.echartsObj = {
        ...this.store.state.echartsObj,
        runtime: myChart,
      };
      console.log(this.store.state.echartsArr);
      let option = {
        title: {
          text: "设备运行",
          top: "2%",
          textStyle: {
            color: "#4DF3F6",
            // fontWeight: "normal"
          },
        },
        tooltip: {
          // trigger: 'item'
        },
        color: ["#1AF5B8", "#DA00FF", "#F8D70F"],
        // 坐标轴指示器
        axisPointer: {},
        // 标题设置
        legend: {
          orient: "horizontal", //horizontal vertical
          bottom: "4%",
          left: "2%",
          itemWidth: 10,
          itemHeight: 10,
          icon: "circle", //圆形
          show: true,
          textStyle: {
            color: "#fff",
            fontSize: 12,
          },
          // data: legendData,
        },
        series: [
          {
            name: "设备运行",
            type: "pie",
            radius: ["25%", "50%"],
            // left: "-35%",
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              // borderWidth: 2
            },
            tooltip: {
              formatter(params) {
                console.log(params, "params-------");
                let { value, name } = params.data;
                return `${name} ${value}台`;
                // return "0";
              },
            },
            label: {
              color: "#fff",
              show: true,
              // 指引线
              position: "outside", //outside inside
              formatter(params) {
                let total = 0;
                // console.log(params, "pie------")
                data.forEach((item) => {
                  total += item.value;
                });
                let dat = data.find((item) => {
                  return item.name == params.data.name;
                });
                let p = (dat.value / total) * 100;
                // console.log(dat, "dat----")
                return `${dat.name} ${p.toFixed(0)}%`;
              },
            },
            // 取消 默认放大效果
            hoverAnimation: false,
            // silent:true,//取消了silent
            // 鼠标移入 效果
            emphasis: {
              // label: {
              //   show: true,
              //   fontSize: "12",
              //   // fontWeight: "bold",
              //   // color: "#0468BD",
              // },
              itemStyle: {},
            },
            labelLine: {
              show: true,
            },

            data: data,
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
$border-color1: #144A8A;
.runtime-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  #runtime-echarts {
    // width: 100%;
    height: 100%;
    width: 65%;
  }
  .runtime-data-show {
    height: 100%;
    width: 30%;
    padding: 0 2%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    // 表格
    table {
      border-spacing: 0px;
      color: #fff;
      width: 100%;
    }
    table td {
      border-bottom: 1px solid $border-color1;
      border-left: 1px solid $border-color1;
      padding: 5px 4px;
    }
    // table thead {
    //   background: rgba(255, 255, 255, 0.5);
    // }
    // table thead tr {
    //   &:first-child td {
    //     border-top: 1px solid #fff;
    //   }
    //   td:last-child {
    //     border-right: 1px solid #fff;
    //   }
    // }
    table tbody tr {
      &:first-child td{
        border-top: 1px solid $border-color1;
      }
      td {
        width: 18% !important;
      }
      td:first-child {
        width: 28% !important;
      }
      td:last-child {
        border-right: 1px solid $border-color1;
      }
    }
  }
}
</style>
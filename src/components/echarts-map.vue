<template>
  <div class="map-box">
    <div id="map"></div>
    <div class="total-table">
      <table>
        <thead>
          <tr>
            <td colspan="5">水样研究次数</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>生活饮水</td>
            <td>河流</td>
            <td>工业</td>
            <td>地面</td>
            <td>污水</td>
          </tr>
          <tr>
            <td><div class="water-number">621355</div></td>
            <td><div class="water-number">62132</div></td>
            <td><div class="water-number">62131</div></td>
            <td><div class="water-number">62132</div></td>
            <td><div class="water-number">62133</div></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import chinaData from "echarts/map/json/china.json"; //重点，从4.9版本中拿到
import mapBg from "@/assets/image/home/map.png";
// import axios from "axios";
export default {
  props: {
    msg: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      oldHtml: "",
    };
  },
  mounted() {
    let that = this;
    // echarts 自适应
    window.addEventListener("resize", function () {
      let { echartsObj } = that.store.state;
      for (let echartItem in echartsObj) {
        echartsObj[echartItem].resize();
      }
    });
    // window.onresize = function(){
    //   for( let echartItem in  that.store.state.echartsObj){
    //     echartItem.resize();
    //   }
    // }
    // console.log('this.props------',this.$props.msg)
    this.mapEcharts();
    // return
  },
  methods: {
    // 获取 元素尺寸大小
    getElemSize(elem) {
      let getData = document.querySelector(elem);
      // console.log(getData.clientHeight, getData.clientWidth, "getData-------")
      return { height: getData.clientHeight, width: getData.clientWidth };
    },
    mapEcharts() {
      let { width: mapWidth, height: mapHeight } = this.getElemSize("#map");
      let widthO = 960;
      let heightO = 543;
      // console.log(mapWidth, mapHeight);
      let fontSize = 14;
      // china 城市
      let city = [
        "重庆",
        "四川",
        "黑龙江",
        "吉林",
        "辽宁",
        "北京",
        "天津",
        "河北",
        "山西",
        "内蒙古",
        "河南",
        "湖北",
        "湖南",
        "山东",
        "江苏",
        "安徽",
        "上海",
        "浙江",
        "江西",
        "福建",
        "台湾",
        "广东",
        "广西",
        "海南",
        "香港",
        "澳门",
        "陕西",
        "甘肃",
        "宁夏",
        "青海",
        "新疆",
        "贵州",
        "云南",
        "西藏",
        "南海诸岛",
      ];
      let cityData = [];
      city.forEach((item) => {
        let obj = {
          name: item,
          value: 0,
          itemStyle: {
            color: `rgb(${225 * Math.random()}, ${225 * Math.random()}, ${
              225 * Math.random()
            })`,
          },
        };
        cityData.push(obj);
      });
      // 点的位置
      let pointsArr = [
        { x: 280, y: 150, size: 50, name: "新疆" },
        { x: 350, y: 180, size: 40, name: "内蒙古" },
      ];
      // 散热点数据
      let pointsData = [];
      // 坐标定位数据
      let pinData = [];
      // 设置点的颜色
      pointsArr.forEach((item, index) => {
        let { x, y, size } = item;
        let obj = {
          // value: [x * (mapWidth / 672), y * (mapHeight / 468), size],
          value: [x * (mapWidth / widthO), y * (mapHeight / heightO), size],
          itemStyle: {
            // color: "red",
          },
          // icon: "../assets/image/home/map.png",
        };
        pointsData.push(obj);

        let obj1 = {
          // value: [x * (mapWidth / 672), y * (mapHeight / 468), index + 1],
          value: [
            x * (mapWidth / widthO),
            y * (mapHeight / heightO),
            index + 1,
          ],
          // value: [x * (mapWidth / 672), y * (mapHeight / 468)],
          itemStyle: {
            color: "#10D7A3",
            color: "#46A82D",
          },
        };
        pinData.push(obj1);
      });
      // console.log(pointsData, "pointsData------");
      let chartDom = document.getElementById("map");
      let myChart = echarts.init(chartDom);
      this.store.state.echartsObj = {
        ...this.store.state.echartsObj,
        map: myChart,
      };
      // console.log(this.store.state.echartsObj)
      let option = {
        title: {
          // text: "Population Density of Hong Kong （2011）",
          // subtext: "Data from Wikipedia",
          // sublink:
          //   "http://zh.wikipedia.org/wiki/%E9%A6%99%E6%B8%AF%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83#cite_note-12",
        },
        tooltip: {},
        // grid: {
        //   left: "30%",
        //   right: "10%",
        //   bottom: "3%",
        //   top: "10%",
        //   containLabel: true,
        // },
        visualMap: {
          show: false,
          min: 0,
          max: 50000,
          // text: ["High", "Low"],
          realtime: false,
          calculable: true,
          inRange: {
            // color: ["lightskyblue", "yellow", "orangered"],
            // color: [
            //   "#C25F8F",
            //   "#37a2da",
            //   "#32c5e9",
            //   "#67e0e3",
            //   "#9fe6b8",
            //   "#ffdb5c",
            //   "#ff9f7f",
            //   "#fb7293",
            //   "#032182",
            // ],
          },
        },
        // 热点 配置
        geo: {
          tooltip: {
            show: true,
          },
          map: "iceland_svg",
          roam: true,
        },
        series: [
          // 地图
          {
            // name: "香港18区人口密度",
            name: "水样研究次数",
            // left: "28%",
            type: "map",
            // map: "china",
            mapType: "china",
            label: {
              show: true,
            },
            zoom: 1.2,
            tooltip: {
              formatter(params) {
                // console.log(params, "params---------")
                if (params.data) {
                  let { name, value } = params.data;
                  return `${name}---(${value})`;
                } else {
                  return `${params.name}`;
                }
              },
            },

            itemStyle: {
              normal: {
                // borderColor: "#0AAEB0", // 图形的描边颜色 #0AAEB0
                borderColor: "#01BFB9", // 图形的描边颜色 #0AAEB0
                borderWidth: 1, // 描边线宽。
                // borderType: "solid", // 柱条的描边类型。
                borderType: "dashed", // 柱条的描边类型。
                areaColor: "#233F53", // 图形的颜色 #233F53
                // shadowBlur: 15, // 图形阴影的模糊大小。
                shadowBlur: 1, // 图形阴影的模糊大小。
                // shadowColor: "#233F53", // 阴影色 #233F53
                shadowColor: "#233F53", // 阴影色 #233F53
                shadowOffsetX: 1, // X轴阴影
                shadowOffsetY: 1, // Y轴阴影
                label: {
                  show: true, // 显示区域名称
                  textStyle: {
                    color: "#fff",
                    fontSize: fontSize,
                  },
                },
              },
              // 鼠标移入时
              emphasis: {
                borderColor: "#2378f7", // 图形的描边颜色 #2378f7
                borderWidth: "1",
                label: {
                  show: true,
                  textStyle: {
                    color: "#fff",
                    fontSize: fontSize + 2,
                  },
                },
              },
              effect: {
                show: true,
                shadowBlur: 10,
                loop: true,
              },
            },
            data: cityData,
            // data: [
            //   { name: "重庆", value: 20057.34 },
            //   { name: "四川", value: 20057.34 },
            //   { name: "黑龙江", value: 15477.48 },
            //   { name: "吉林", value: 31686.1 },
            //   { name: "辽宁", value: 6992.6 },
            //   { name: "北京", value: 44045.49 },
            //   { name: "天津", value: 40689.64 },
            //   { name: "河北", value: 37659.78 },
            //   { name: "山西", value: 45180.97 },
            //   { name: "内蒙古", value: 55204.26 },
            //   { name: "河南", value: 21900.9 },
            //   { name: "湖北", value: 4918.26 },
            //   { name: "湖南", value: 5881.84 },
            //   { name: "山东", value: 4178.01 },
            //   { name: "江苏", value: 2227.92 },
            //   { name: "安徽", value: 2180.98 },
            //   { name: "上海", value: 9172.94 },
            //   { name: "浙江", value: 3368 },
            //   { name: "江西", value: 806.98 },
            //   { name: "福建", value: 806.98 },
            //   { name: "台湾", value: 806.98 },
            //   { name: "广东", value: 806.98 },
            //   { name: "广西", value: 806.98 },
            //   { name: "海南", value: 806.98 },
            //   { name: "香港", value: 806.98 },
            //   { name: "澳门", value: 806.98 },
            //   { name: "陕西", value: 806.98 },
            //   { name: "甘肃", value: 806.98 },
            //   { name: "宁夏", value: 806.98 },
            //   { name: "青海", value: 806.98 },
            //   { name: "新疆", value: 806.98 },
            //   { name: "贵州", value: 806.98 },
            //   { name: "云南", value: 806.98 },
            //   { name: "西藏", value: 806.98 },
            //   // { name: "te", value: 806.98 },
            //   { name: "南海诸岛", value: 806.98 },
            // ],
            // 自定义名称映射
            // nameMap: {
            //   "Central and Western": "中西区",
            //   Eastern: "东区",
            //   Islands: "离岛",
            //   "Kowloon City": "九龙城",
            //   "Kwai Tsing": "葵青",
            //   "Kwun Tong": "观塘",
            //   North: "北区",
            //   "Sai Kung": "西贡",
            //   "Sha Tin": "沙田",
            //   "Sham Shui Po": "深水埗",
            //   Southern: "南区",
            //   "Tai Po": "大埔",
            //   "Tsuen Wan": "荃湾",
            //   "Tuen Mun": "屯门",
            //   "Wan Chai": "湾仔",
            //   "Wong Tai Sin": "黄大仙",
            //   "Yau Tsim Mong": "油尖旺",
            //   "Yuen Long": "元朗",
            // },
          },
          // 区域散点图
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            geoIndex: 0,
            symbolSize: function (params) {
              return (params[2] / 100) * 10 + 5;
            },
            //  symbolOffset: [0, '-50%'],
            // 涟漪特效相关配置
            rippleEffect: {
              color: "red",
            },
            tooltip: {
              formatter(params) {
                return "";
              },
            },
            itemStyle: {
              // color: "#b02a02",
              // color: "#ff0000",
              color: "red",
            },
            encode: {
              tooltip: 2,
            },
            // type: "effectScatter",
            // coordinateSystem: "geo",
            // symbolSize: 8,
            // rippleEffect: {
            //   //坐标点动画
            //   period: 3,
            //   scale: 5,
            //   brushType: "fill",
            // },
            // label: {
            //   normal: {
            //     show: true,
            //     position: "right",
            //     formatter: "{b}",
            //     color: "#09316c",
            //     fontWeight: "bold",
            //     fontSize: 12,
            //   },
            // },
            data: pointsData,
            // data: [
            //   // [0,0, 100],
            //   {
            //     value: [130 * (mapWidth / 672), 150 * (mapHeight / 468), 100],
            //     itemStyle: {
            //       color: "red",
            //     },
            //   },
            //   // [770.3415644319939, 757.9672194986475, 30],
            //   // [1180.0329284196291, 743.6141808346214, 80],
            //   // [894.03790632245, 1188.1985153835008, 61],
            //   // [1372.98925630313, 477.3839988649537, 70],
            //   // [1378.62251255796, 935.6708486282843, 81],
            // ],
          },
          // 定位点
          {
            name: "Top 5",
            type: "scatter",
            coordinateSystem: "geo",
            symbol: "pin",
            symbolSize: [50, 50],
            tooltip: {
              formatter(params) {
                // console.log(params, "top----params");
                return "";
              },
            },
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: "#fff",
                  fontSize: 12,
                },
                formatter(value) {
                  // console.log(value, "params------");
                  return value.data.value[2];
                },
              },
            },
            data: pinData,
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke",
            },
            hoverAnimation: true,
            zlevel: 1,
          },
        ],
        // media: [
        //   {
        //     query: {
        //       // minWidth: 200,
        //       // minHeight: 300,
        //       minAspectRatio: 1.3,
        //     },
        //   },
        // ],
      };
      // myChart.showLoading();
      // myChart.hideLoading();
      echarts.registerMap("china", chinaData);
      // console.log(chinaData, "chinaData0----");
      myChart.setOption(option);
      myChart.on("click", function (params) {
        console.log(params, "click-----myChart");
      });
    },
  },
  unmounted() {
    // console.log("unmounted----1");
  },
};
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 100%;
}
.map-box {
  width: 100%;
  height: 100%;
  padding-top: 25px;
  background-image: url(../assets/image/home/map.png);
  background-size: 100% 100%;
  position: relative;
}
.total-table {
  position: absolute;
  left: 1%;
  bottom: 2%;
  width: 38%;
  // 表格
  table {
    border-spacing: 0px;
    color: #fff;
    width: 100%;
  }
  table td {
    border-bottom: 1px solid #fff;
    border-left: 1px solid #fff;
    padding: 5px 4px;
  }
  table thead {
    background: rgba(255, 255, 255, 0.5);
  }
  table thead tr {
    &:first-child td {
      border-top: 1px solid #fff;
    }
    td:last-child {
      border-right: 1px solid #fff;
    }
  }
  table tbody tr {
    td {
      width: 18% !important;
    }
    td:first-child {
      width: 28% !important;
    }
    td:last-child {
      border-right: 1px solid #fff;
    }
  }
}
// @media (max-width: 900px) and (min-width: 375px){
//   .total-table{
//     top: 1%;
//     position: relative;
//     width: 98% !important;
//   }
// }
</style>
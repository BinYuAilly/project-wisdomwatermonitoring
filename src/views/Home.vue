<template>
  <div class="home-body">
    <div class="title-box"></div>
    <div id="all-echarts">
      <div id="left-echarts">
        <div class="left-top-echarts">
          <runtime-echarts></runtime-echarts>
        </div>
        <div class="left-center-echarts">
          <echarts-bar-distribute-run></echarts-bar-distribute-run>
        </div>
        <div class="left-bottom-echarts">
          <EchartsBarSBD></EchartsBarSBD>
        </div>
      </div>
      <div id="center-echarts">
        <div class="echarts-map">
          <Map :msg="[0,1,2,3]"></Map>
        </div>
        <div class="center-bottom-echarts">
          <EchartslineBA></EchartslineBA>
        </div>
      </div>
      <div id="right-echarts">
        <div class="right-top-echarts"></div>
        <div class="right-center-echarts"></div>
        <div class="right-bottom-echarts"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Map from "@/components/echarts-map.vue";
import RuntimeEcharts from "@/components/echarts-pie-runtime.vue"
import EchartsBarDistributeRun from "@/components/echarts-bar/echarts-bar-distribute-run.vue"
// 停止/故障设备分布
import EchartsBarSBD from "@/components/echarts-bar/echarts-bar-stop-breakdown-distribute.vue"
import EchartslineBA from "@/components/echarts-line/echarts-line-BOD-analyse.vue"

export default {
  components: {
    Map,
    RuntimeEcharts,
    EchartsBarDistributeRun,
    EchartsBarSBD,
    EchartslineBA
  },
};
</script>

<style lang="scss" scoped>
.home-body {
  width: 100vw;
  height: 100vh;
  min-width: 1800px;
  min-height: 900px;
  background-image: url(../assets/image/home/bodyBg.png);
  background-size: 100% 100%;
}
.title-box{
  height: 10vh;
  min-height: 90px;
}
#all-echarts {
  display: flex;
  justify-content: space-between;
  height: 90vh;
  height: 90%;
  #left-echarts {
    width: 25vw;
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: column;
    // align-items: center;
    justify-content: space-between;
    .left-top-echarts {
      height: 29%;
      width: 100%;
      background-image: url(../assets/image/home/left_top_bg.png);
      background-size: 100% 100%;
    }
    .left-center-echarts {
      height: 40%;
      width: 100%;
      background-image: url(../assets/image/home/left_center_bg.png);
      background-size: 100% 100%;
    }
    .left-bottom-echarts {
      height: 29%;
      width: 100%;
      background-image: url(../assets/image/home/left_bottom_bg.png);
      background-size: 100% 100%;
    }
  }
  #center-echarts {
    width: 49vw;
    width: 49%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .echarts-map {
      width: 100%;
      height: 58%;
      min-width: 375px;
      min-height: 300px;
    }
    .center-bottom-echarts {
      width: 100%;
      height: 38%;
      background-image: url(../assets/image/home/center_bottom_bg.png);
      background-size: 100% 100%;
    }
  }
  #right-echarts {
    width: 25vw;
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: column;
    // align-items: center;
    justify-content: space-between;
    .right-top-echarts {
      height: 29%;
      width: 100%;
      background-image: url(../assets/image/home/right_top_bg.png);
      background-size: 100% 100%;
    }
    .right-center-echarts {
      height: 40%;
      width: 100%;
      background-image: url(../assets/image/home/right_center_bg.png);
      background-size: 100% 100%;
    }
    .right-bottom-echarts {
      height: 29%;
      width: 100%;
      background-image: url(../assets/image/home/right_bottom_bg.png);
      background-size: 100% 100%;
    }
  }
}
</style>
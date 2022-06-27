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
        <div class="left-bottom-echarts"></div>
      </div>
      <div id="center-echarts">
        <div class="echarts-map">
          <Map></Map>
        </div>
        <div class="center-bottom-echarts"></div>
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
export default {
  components: {
    Map,
    RuntimeEcharts,
    EchartsBarDistributeRun
  },
};
</script>

<style lang="scss" scoped>
.home-body {
  width: 100vw;
  height: 100vh;
  background-image: url(../assets/image/home/bodyBg.png);
  background-size: 100% 100%;
}
.title-box{
  height: 10vh;
}
#all-echarts {
  display: flex;
  justify-content: space-between;
  height: 90vh;
  #left-echarts {
    width: 25vw;
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
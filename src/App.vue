<template>
  <div id="app">
    <!-- <button @click="fun()">click</button> -->
    <app-header v-on:slideCarousel="slideComp($event)" v-on:slideHam="slideHamMenu($event)"></app-header>
    <div class="ham-container">
      <app-menu v-on:slideHam2="personalToggle($event)" v-on:slideHam="slideHamMenu($event)"></app-menu>
    </div>
    <app-personal
      v-show="personalShow"
      v-on:slideHam2="personalToggle($event)"
      v-on:slideHam="slideHamMenu($event)"
    ></app-personal>
    <div
      class="carousel-container"
      v-touch:swipe.left="swipeContainerLeft"
      v-touch:swipe.right="swipeContainerRight"
    >
      <app-list :storedData="storedData"></app-list>
      <app-analysis :blankInfo="blankInfo" :storedData="storedData"></app-analysis>
      <app-chart :ranChart="ranChart" :blankInfo="blankInfo" :storedData="storedData"></app-chart>
      <app-stats></app-stats>
      <transition name="blackout-transition">
        <div v-show="show" class="blackout" v-on:click="slideHamMenu()"></div>
      </transition>
    </div>
  </div>
</template>


<script>
import Header from "./Header.vue";
import List from "./List.vue";
import Chart from "./Chart.vue";
import Analysis from "./Analysis.vue";
import Stats from "./Stats.vue";
import Menu from "./Menu.vue";
import Personal from "./Personal.vue";

export default {
  name: "app",
  components: {
    "app-header": Header,
    "app-list": List,
    "app-chart": Chart,
    "app-analysis": Analysis,
    "app-stats": Stats,
    "app-menu": Menu,
    "app-personal": Personal
  },
  data() {
    return {
      currentWeight: 0,
      currentWaist: 0,
      show: false,
      personalShow: false,
      currentSlide: 0,
      ranChart: false,
      blankInfo: "brak danych 🤷‍♂️",
      storedData: null
    };
  },
  methods: {
    fun() {
      alert(this.noData);
    },
    updateApp(arg) {
      alert(arg);
    },
    slideComp(arg) {
      const carousel = document.querySelector(".carousel-container");
      const appWidth = document.querySelector("#app").getBoundingClientRect()
        .width;
      setTimeout(() => {
        carousel.style.transform = "translateX(-" + arg * appWidth + "px)";
      }, 0);
      this.currentSlide = arg;
      this.updateChartComp(arg);
    },
    updateChartComp(indexOfComp) {
      if (indexOfComp === 2) {
        if (this.storedData) {
          this.ranChart = true;
        }
      }
    },
    slideHamMenu() {
      this.show = !this.show;
      const hamMenu = document.querySelector(".ham-container");
      if (this.show) {
        hamMenu.style.transform = "translateX(100%)";
        hamMenu.style.boxShadow = "0px 3px 16px 2px rgba(0, 0, 0, 0.2)";
      } else {
        hamMenu.style.transform = "translateX(-50px)";
        hamMenu.style.boxShadow = "none";
      }
    },
    personalToggle() {
      this.personalShow = !this.personalShow;
      console.log("hehe");
    },
    swipeContainerLeft() {
      if (this.currentSlide < 3) {
        this.slideComp(this.currentSlide + 1);
      }
    },
    swipeContainerRight() {
      if (this.currentSlide > 0) {
        this.slideComp(this.currentSlide - 1);
      }
    }
  },
  computed: {
    dataArr() {
      return this.$store.state.dataArr;
    },
    personalInfo() {
      return this.$store.state.personalInfo;
    },
    noData() {
      return this.$store.getters.noData;
    }
  },
  watch: {
    noData() {
      this.storedData = !this.noData;
    }
  },
  created() {
    this.storedData = !this.noData;
  }
};
</script>



<style>
* {
  padding: 0;
  margin: 0;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
body {
  background: rgba(0, 0, 0, 0.8);
}

#app {
  max-width: 450px;
  margin: 0px auto;
  font-family: "Roboto", serif;
  position: relative;
  color: #05161c;
  overflow: hidden;
  height: 100vh;
}

.ham-container {
  background: #fff;
  width: 75%;
  height: 100%;
  position: absolute;
  z-index: 10;
  top: 0;
  left: -75%;
  transition: transform 0.2s ease-out;
  overflow: hidden;
}

.ham-container-2 {
  width: 200%;
  display: flex;
  transition: transform 0.225s;
}

.carousel-container {
  /* margin-top: 96px; */
  display: flex;
  width: 400%;
  background: white;
  height: calc(100vh - 96px);
  transition: transform 0.225s;
}

.blackout {
  position: absolute;
  top: -96px;
  width: 100%;
  height: 150%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 4;
}

.no-data-info {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.input-box-transition-enter {
  opacity: 0;
}

.input-box-transition-enter-active {
  transition: opacity 0.18s;
}

.input-box-transition-leave {
  opacity: 1;
}

.input-box-transition-leave-active {
  transition: opacity 0.18s;
  opacity: 0;
}

.blackout-transition-enter {
  opacity: 0;
}

.blackout-transition-enter-active {
  transition: opacity 0.18s;
}

.blackout-transition-leave {
  opacity: 1;
}

.blackout-transition-leave-active {
  transition: opacity 0.18s;
  opacity: 0;
}

@media (min-width: 1500px) {
  #app {
    width: 420px;
    margin: 50px auto;
  }

  .carousel-container {
    height: calc(82vh);
  }
}

@media (min-width: 600px) and (max-width: 1499px) {
  #app {
    width: 360px;
    margin: 14px auto;
  }

  .carousel-container {
    height: calc(95vh - 96px);
  }
}
</style>

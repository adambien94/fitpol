<template>
  <div id="app">
    <app-header v-on:slideCarousel="slideComp($event)" v-on:slideHam="slideHamMenu($event)"></app-header>
    <div class="ham-container">
      <app-menu v-on:slideHam2="personalToggle($event)" v-on:slideHam="slideHamMenu($event)"></app-menu>
    </div>
    <transition name="personal-transition">
      <app-personal
        v-show="personalShow"
        v-on:slideHam2="personalToggle($event)"
        v-on:slideHam="slideHamMenu($event)"
      ></app-personal>
    </transition>
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
    slideComp(indexOfComp) {
      const carousel = document.querySelector(".carousel-container");
      // const appWidth = document.querySelector("#app").getBoundingClientRect()
      //   .width;
      carousel.style.transform = "translateX(-" + indexOfComp * 25 + "%)";
      this.currentSlide = indexOfComp;
      this.updateChartComp(indexOfComp);
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
        hamMenu.style.transform = "translateX(0)";
        hamMenu.style.boxShadow = "0px 3px 16px 2px rgba(0, 0, 0, 0.2)";
      } else {
        hamMenu.style.transform = "translateX(-100%)";
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
  height: 100vh;
  background: linear-gradient(#fff, rgba(0, 0, 0, 0.175));
  position: relative;
  font-family: "Nunito", sans-serif;
}

#app {
  max-width: 450px;
  margin: 0px auto;
  /* font-family: "Roboto", serif; */
  position: relative;
  color: #05161c;
  overflow: hidden;
  height: 100vh;
}

button,
input {
  font-family: "Nunito", sans-serif;
}

.ham-container {
  background: #fff;
  width: 75%;
  height: 100%;
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  transform: translateX(-100%);
  transition: transform 0.2s ease-out;
  overflow: hidden;
}

.ham-container-2 {
  width: 200%;
  display: flex;
  transition: transform 0.225s;
}

.carousel-container {
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
  height: calc(100% + 96px);
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

@keyframes bounce2 {
  0% {
    transform: translate(0) scaleY(0.975);
    opacity: 0;
  }
  100% {
    transform: translate(0) scaleY(1);
    opacity: 1;
  }
}

.personal-transition-enter-active {
  animation: bounce2 0.15s ease-out;
}

.personal-transition-leave-active {
  opacity: 0;
  transition: opacity 0.15s;
}

@media (min-width: 600px) {
  body {
    height: 800px;
    min-height: 100vh;
  }

  body:before,
  body:after {
    content: "";
    position: absolute;
    width: 340px;
    height: 680px;
    left: 50%;
    top: 0;
    transform: translate(-50%, 28px);
  }

  body:after {
    background: linear-gradient(#f2f3f4, #fff);
    z-index: -50;
    border-radius: 50px;
    transform: translate(-50%, 30px) scale(0.95);
  }

  body:before {
    background: url("./img/IphoneX.png");
    background-size: cover;
    z-index: -49;
  }

  #app {
    width: 364px;
    height: 730px;
    margin: 0px auto;
    transform: scale(0.8);
  }

  .carousel-container {
    height: calc(100% - 96px);
  }

  .input-box__form {
    position: relative;
    width: calc(100% + 17px);
    top: 0;
    bottom: 0;
    left: 0;
    right: -17px;
  }
}
</style>

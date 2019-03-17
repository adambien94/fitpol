<template>
  <div id="app">
    <app-header v-on:slideCarousel="slideComp($event)" v-on:slideHam="slideHamMenu($event)"></app-header>
    <div class="ham-container">
      <div class="ham-container-2">
        <app-menu
          v-on:slideHam2="slideHamMenuContainer($event)"
          v-on:slideHam="slideHamMenu($event)"
        ></app-menu>
        <app-personal
          v-on:slideHam2="slideHamMenuContainer($event)"
          v-on:slideHam="slideHamMenu($event)"
        ></app-personal>
      </div>
    </div>
    <div
      class="carousel-container"
      v-touch:swipe.left="swipeContainerLeft"
      v-touch:swipe.right="swipeContainerRight"
    >
      <app-list></app-list>
      <app-anal></app-anal>
      <app-chart></app-chart>
      <app-stats></app-stats>
      <transition name="v">
        <div v-if="show" class="blackout" v-on:click="slideHamMenu()"></div>
      </transition>
    </div>
    <!-- <router-view v-bind:dataArr="dataArr"></router-view> -->
  </div>
</template>



<script>
import Header from "./Header.vue";
import List from "./List.vue";
import Chart from "./Chart.vue";
import Anal from "./Anal.vue";
import Stats from "./Stats.vue";
import Menu from "./Menu.vue";
import Personal from "./Personal.vue";

export default {
  name: "app",
  components: {
    "app-header": Header,
    "app-list": List,
    "app-chart": Chart,
    "app-anal": Anal,
    "app-stats": Stats,
    "app-menu": Menu,
    "app-personal": Personal
  },
  data() {
    return {
      currentWeight: 0,
      currentWaist: 0,
      show: false,
      show2: false,
      currentSlide: 0
    };
  },
  methods: {
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
    },
    slideHamMenu() {
      this.show = !this.show;
      const hamMenu = document.querySelector(".ham-container");
      if (this.show) {
        setTimeout(() => {
          hamMenu.style.left = "0";
          hamMenu.style.boxShadow = "0px 3px 16px 2px rgba(0, 0, 0, 0.2)";
        }, 0);
      } else {
        setTimeout(() => {
          hamMenu.style.left = "-80%";
          hamMenu.style.boxShadow = "none";
        }, 0);
      }
    },
    slideHamMenuContainer() {
      this.show2 = !this.show2;
      const hamMenu2 = document.querySelector(".ham-container-2");
      if (this.show2) {
        setTimeout(() => {
          hamMenu2.style.transform = "translateX(-50%)";
        }, 0);
      } else {
        setTimeout(() => {
          hamMenu2.style.transform = "translateX(0)";
        }, 0);
      }
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
    }
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

#app {
  max-width: 500px;
  margin: 0px auto;
  font-family: "Arial", sans-serif;
  position: relative;
  color: #05161c;
  overflow: hidden;
}

.ham-container {
  z-index: 25;
  background: #fff;
  width: 80%;
  height: 100%;
  position: absolute;
  z-index: 10;
  top: 0;
  left: -80%;
  transition: 0.225s;
  overflow: hidden;
}

.ham-container-2 {
  width: 200%;
  display: flex;
  transition: 0.225s;
}

.carousel-container {
  margin-top: 96px;
  display: flex;
  width: 400%;
  background: white;
  height: calc(100vh - 96px);
  transition: 0.225s;
}

.blackout {
  position: absolute;
  top: -200px;
  width: 100%;
  height: 150%;
  transition: 0.2s;
  background: rgba(0, 0, 0, 0.4);
  z-index: 4;
}

.v-enter {
  opacity: 0;
}

.v-enter-active {
  transition: opacity 0.14s;
}

.v-leave {
  opacity: 1;
}

.v-leave-active {
  transition: opacity 0.2s;
  opacity: 0;
}
</style>

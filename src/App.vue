<template>
  <div id="app">
    <app-header v-on:slideCarousel="slideComp($event)" v-on:slideHam="slideHamMenu($event)"></app-header>
    <div class="ham-container">
      <app-menu v-bind:dataArr="dataArr"></app-menu>
    </div>
    <div class="carousel-container">
      <app-list></app-list>
      <app-anal></app-anal>
      <app-chart></app-chart>
      <app-stats></app-stats>
      <transition name="v">
        <div v-if="show" class="blackout" v-on:click="slideHamMenu"></div>
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
    "app-menu": Menu
  },
  data() {
    return {
      currentWeight: 0,
      currentWaist: 0,
      show: false
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
      setTimeout(function() {
        carousel.style.transform = "translateX(-" + arg * appWidth + "px)";
      }, 75);
    },
    slideHamMenu() {
      this.show = !this.show;
      const hamMenu = document.querySelector(".ham-container");
      // var test = document.querySelector(".blackout"); // czemu błąd??
      // test.style.background = "rgb(0,0,0,0.3)";
      if (this.show === true) {
        setTimeout(function() {
          hamMenu.style.left = "0";
        }, 75);
      } else {
        setTimeout(function() {
          hamMenu.style.left = "-80%";
        }, 75);
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
  transition: 0.2s;
}

.carousel-container {
  margin-top: 104px;
  display: flex;
  width: 400%;
  background: white;
  height: calc(100vh - 104px);
  transition: 0.2s;
  /* overflow: hidden; */
}

.blackout {
  position: absolute;
  background: red;
  top: -200px;
  width: 100%;
  height: 150%;
  transition: 0.2s;
  background: rgb(0, 0, 0, 0.3);
  z-index: 4;
}
.v-enter {
  background: rgb(0, 0, 0, 0);
}

.v-enter-active {
  transition: background-color 0.1s;
}

.v-leave {
  background: rgb(0, 0, 0, 0);
}

.v-leave-active {
  background: none;
  transition: background-color 0.15s;
}
</style>

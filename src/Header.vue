<template>
  <header class="main-nav">
    <nav class="menu">
      <div class="top-nav">
        <div class="top-nav__ham" v-on:click="slideHam"></div>
        <span class="top-nav__title">FitpolApp</span>
        <div class="top-nav__search"></div>
        <div class="top-nav__options" @click="optionShow = !optionShow"></div>
      </div>
      <ul class="bottom-nav">
        <li
          v-for="option in options"
          class="bottom-nav__item"
          v-on:click="slideCarousel(options.indexOf(option))"
        >
          <a href="#" class="bottom-nav__link">{{option}}</a>
        </li>
      </ul>
      <div class="active-border"></div>
    </nav>
    <transition name="option-window-transition">
      <div class="option-window" v-show="optionShow">
        <ul class="option-window__list">
          <li class="option-window__item" @click="resetData()">Reset</li>
          <li class="option-window__item" @click="defaultData()">Przykładowe dane</li>
          <li class="option-window__item">Info</li>
          <li class="option-window__item">Wyloguj</li>
          <li class="option-window__item">Usuń konto</li>
        </ul>
      </div>
    </transition>
    <div class="transparent-cover" v-show="optionShow" @click="optionShow = !optionShow"></div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      options: ["notes", "info", "wykres", "menu"],
      optionShow: false
    };
  },
  methods: {
    slideCarousel(indexOfOption) {
      const activeBorder = document.querySelector(".active-border");
      activeBorder.style.transform = "translateX(" + indexOfOption * 100 + "%)";
      this.$emit("slideCarousel", indexOfOption);
    },
    slideHam() {
      this.$emit("slideHam");
    },
    resetData() {
      this.$store.commit("resetData");
      this.$store.commit("resetInfo");
      this.$store.commit("resetMeals");
      location.reload();
    },
    defaultData() {
      this.$store.commit("defaultData");
      this.$store.commit("resetInfo");
      location.reload();
    }
  }
};
</script>



<style scoped>
.main-nav {
  width: 100%;
  z-index: 0;
  width: 100%;
  background: #ededed;
}

.menu {
  position: relative;
}

.top-nav {
  padding: 10px 15px 6px 15px;
  background: #ededed;
  color: black;
  display: flex;
}

.top-nav__title {
  font-size: 22px;
  font-weight: bold;
  line-height: 32px;
  margin-left: 15px;
  font-weight: 500;
  width: 100%;
  letter-spacing: 1px;
}

.top-nav__ham,
.top-nav__search,
.top-nav__options {
  width: 28px;
  height: 28px;
  cursor: pointer;
  flex-shrink: 0;
  padding-top: 2px;
}

.top-nav__ham {
  background: url("./img/baseline_menu_black_24dp.png");
  background-size: cover;
}

.top-nav__search {
  background: url("./img/baseline_search_black_24dp.png");
  background-size: cover;
  opacity: 0.4;
}

.top-nav__options {
  background: url("./img/baseline_more_vert_black_24dp.png");
  background-size: cover;
  margin-left: 10px;
}

.bottom-nav {
  display: flex;
  background: #ededed;
}

.bottom-nav__item {
  font-size: 17px;
  list-style: none;
  flex: 1;
  text-align: center;
}

.bottom-nav__link {
  text-decoration: none;
  font-weight: 500;
  color: black;
  text-transform: capitalize;
  display: inline-block;
  line-height: 48px;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  transition: 0.2s;
}

.active-border {
  position: absolute;
  height: 48px;
  width: 25%;
  background: rgba(0, 0, 0, 0.1);
  bottom: 0px;
  transition: transform 0.225s;
}

.option-window {
  position: absolute;
  z-index: 50;
  width: 230px;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 0px 4px 0px rgba(0, 0, 0, 0.2);
  top: 10px;
  right: 10px;
}

.option-window__list {
  padding: 14px;
  display: inline-block;
}

.option-window__item {
  font-size: 16px;
  padding: 10px 0;
  list-style: none;
  width: auto;
}

.option-window__item:nth-child(3),
.option-window__item:nth-child(4),
.option-window__item:nth-child(5) {
  opacity: 0.4;
}

.transparent-cover {
  position: absolute;
  z-index: 40;
  width: 100%;
  height: 120%;
  top: -20%;
  background: transparent;
}

@keyframes bounce {
  0% {
    transform: translate(55px, -75px) scale(0.7, 0.3);
    opacity: 0;
  }
  100% {
    transform: translate(0) scale(1, 1);
    opacity: 1;
  }
}

.option-window-transition-enter-active {
  animation: bounce 0.2s;
}

.option-window-transition-leave-active {
  transition: transform 0.2s, opacity 0.2s;
  transform: translate(57px, -37px) scale(0.5);
  opacity: 0;
}
</style>

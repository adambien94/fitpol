<template>
  <header class="main-nav">
    <nav class="menu">
      <div class="top-nav">
        <div class="top-nav__ham" v-on:click="slideHam"></div>
        <span class="top-nav__title">WeightWar</span>
        <div class="top-nav__search"></div>
        <div class="top-nav__options"></div>
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
  </header>
</template>

<script>
export default {
  data() {
    return {
      options: ["notes", "info", "wykres", "menu"]
    };
  },
  methods: {
    slideCarousel(indexOfOption) {
      const activeBorder = document.querySelector(".active-border");
      setTimeout(function() {
        activeBorder.style.transform =
          "translateX(" +
          indexOfOption * activeBorder.getBoundingClientRect().width +
          "px)";
      }, 75);
      this.$emit("slideCarousel", indexOfOption); // $event, $emit - wywołanie funkcji w innym komponencie ("testFun"-nazwa funckji, "asdasd" - drugi parametr jako argument tej funckji)
    },
    slideHam() {
      this.$emit("slideHam");
    }
  }
};
</script>



<style scoped>
.main-nav {
  position: fixed;
  z-index: 0;
  width: 100%;
}
.menu {
  position: relative;
}

.top-nav {
  padding: 12px 15px 8px 15px;
  background: #ededed;
  color: black;
  display: flex;
}

.top-nav__title {
  font-size: 24px;
  font-weight: bold;
  line-height: 32px;
  margin-left: 15px;
  width: 100%;
}

.top-nav__ham,
.top-nav__search,
.top-nav__options {
  background: gray;
  width: 32px;
  height: 32px;
  cursor: pointer;
  flex-shrink: 0;
}

.top-nav__ham {
  background: url("./img/baseline_menu_black_24dp.png");
  background-size: cover;
}

.top-nav__search {
  background: url("./img/baseline_more_vert_black_24dp.png");
  background-size: cover;
}

.top-nav__options {
  background: url("./img/baseline_search_black_24dp.png");
  background-size: cover;
  margin-left: 10px;
}

.bottom-nav {
  display: flex;
  background: #ededed;
}

.bottom-nav__item {
  font-size: 18px;
  list-style: none;
  flex: 1;
  text-align: center;
}

.bottom-nav__link {
  text-decoration: none;
  font-weight: bold;
  color: black;
  text-transform: capitalize;
  display: inline-block;
  line-height: 52px;
  width: 100%;
  box-sizing: border-box;
  position: relative;
}

.bottom-nav__link:focus {
  color: #000;
}

.active-border {
  position: absolute;
  height: 50px;
  width: 25%;
  background: rgb(0, 0, 0, 0.1);
  z-index: 8;
  bottom: 0px;
  transition: 0.2s;
}
</style>

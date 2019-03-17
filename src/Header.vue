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
      setTimeout(() => {
        activeBorder.style.transform =
          "translateX(" +
          indexOfOption * activeBorder.getBoundingClientRect().width +
          "px)";
      }, 0);
      this.$emit("slideCarousel", indexOfOption);
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
  max-width: 500px;
  width: 100%;
  /* box-shadow: 0px 4px 8px rgb(0, 0, 0, 0.2); */
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
  width: 100%;
}

.top-nav__ham,
.top-nav__search,
.top-nav__options {
  background: gray;
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
  font-weight: bold;
  color: black;
  text-transform: capitalize;
  display: inline-block;
  line-height: 48px;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  transition: 0.2s;
}

.bottom-nav__link:focus {
  color: black;
}

.active-border {
  position: absolute;
  height: 48px;
  width: 25%;
  background: rgba(0, 0, 0, 0.1);
  z-index: 8;
  bottom: 0px;
  transition: 0.225s;
}
</style>

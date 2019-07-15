<template>
  <div id="menu" v-touch:swipe.left="slideHam">
    <ul class="menu__list">
      <li class="menu__item">
        <img src="./img/settings.png" class="menu__item__img" />
        <a href="#" class="menu__link">Ustawienia</a>
      </li>
      <li class="menu__item">
        <img src="./img/sharp_accessibility_black_24dp.png" class="menu__item__img" />
        <a href="#" class="menu__link" v-on:click="slideHam2">Personalizuj</a>
      </li>
      <li class="menu__item">
        <img src="./img/sharp_fitness_center_black_18dp.png" class="menu__item__img" />
        <a href="#" class="menu__link">Cel</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["dataArr"],
  data() {
    return {
      goal: null,
      height: null,
      sex: "",
      age: null
    };
  },
  methods: {
    slideHam2() {
      this.$emit("slideHam2");
      const yolo = document.getElementById("heh");
    },
    slideHam() {
      console.log("hehe");
      this.$emit("slideHam");
    }
  }
};
</script>

<style scoped>
#menu {
  /* background: #fff; */
  width: 100%;
  height: 100%;
  z-index: 10;
  top: 0;
  left: 0;
}

.menu__list {
  width: 100%;
  background: #ededed;
  padding: 25px 0 25px 0;
}

.menu__item {
  list-style: none;
  padding: 15px 15px;
}

.menu__item__img {
  width: 20px;
  position: relative;
  padding-right: 5px;
  top: 2px;
}

.menu__link {
  font-size: 19px;
  font-weight: 500;
  color: #000;
  text-decoration: none;
}

.reset-btn {
  display: block;
  margin: 25px 15px;
  background: transparent;
  font-weight: bold;
  font-size: 12px;
  color: gray;
  border: none;
}

.menu__item:nth-child(1),
.menu__item:nth-child(3) {
  color: red;
  opacity: 0.4;
}
</style>

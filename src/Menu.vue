<template>
  <div id="menu">
    <ul class="menu__list">
      <li class="menu__item">
        <img src="./img/baseline_search_black_24dp.png" class="menu__item__img">
        <a href="#" class="menu__link">Ustawienia</a>
      </li>
      <li class="menu__item">
        <img src="./img/sharp_accessibility_black_24dp.png" class="menu__item__img">
        <a href="#" class="menu__link">Personalizuj</a>
      </li>
      <li class="menu__item">
        <img src="./img/sharp_fitness_center_black_18dp.png" class="menu__item__img">
        <a href="#" class="menu__link">Cel</a>
      </li>
      <li class="menu__item">
        <img src="./img/sharp_fitness_center_black_18dp.png" class="menu__item__img">
        <a href="#" class="menu__link">Witka stary</a>
      </li>
    </ul>
    <h2 class="personal__title">Personal Info</h2>
    <input class="personal__input" type="text" name id v-model="age" placeholder="wiek">
    <input class="personal__input" type="text" name id v-model="height" placeholder="wzrost">
    <input class="personal__input" type="text" name id v-model="sex" placeholder="płeć M/K">
    
    <button v-on:click="setData" class="personal__set-btn">Ustaw</button>
    <button v-on:click="resetData" class="reset-btn">reset</button>
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
    storeAge() {
      if (isNaN(this.age)) {
        alert("błędne dane");
      } else if (this.age === null) {
        console.log("hahaha");
      } else {
        this.$store.commit("storeAge", this.age);
      }
    },
    storeHeight() {
      if (isNaN(this.height)) {
        alert("błędne dane");
      } else if (this.age === null) {
        console.log("hahaha");
      } else {
        this.$store.commit("storeHeight", this.height);
      }
    },
    storeSex() {
      if (!isNaN(this.sex)) {
        alert("błędne danee");
      } else if (this.sex === null) {
        console.log("hahaha");
      } else {
        this.$store.commit("storeSex", this.sex);
      }
    },
    setData() {
      this.storeAge();
      this.storeHeight();
      this.storeSex();
      localStorage.setItem("mojeInfo", JSON.stringify(this.personalInfo));
    },
    resetData() {
      this.$store.commit("resetData");
      console.log(this.dataArr);
    },
    updateInfo() {
      this.$store.commit("updateInfo");
    }
  },
  computed: {
    personalInfo() {
      return this.$store.state.personalInfo;
    }
  },
  created() {
    this.updateInfo();
  }
};
</script>

<style scoped>
#menu {
  background: #fff;
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
  top: 4px;
}

.menu__link {
  font-size: 18px;
  font-weight: bold;
  color: #000;
  text-decoration: none;
}

.personal__input {
  width: calc(70% - 38px);
  border: 1px solid rgb(0, 0, 0, 0.2);
  font-size: 18px;
  line-height: 36px;
  border-radius: 2px;
  text-align: left;
  margin: 15px 15px 0px 15px;
  padding-left: 5px;
}

.personal__set-btn {
  background: #388697;
  color: white;
  text-transform: capitalize;
  width: calc(70% - 30px);
  height: 40px;
  margin: 3px;
  border: none;
  outline: none;
  border-radius: 2px;
  font-size: 18px;
  font-weight: bold;
  margin: 15px;
}

.personal__title {
  font-size: 24px;
  font-weight: bold;
  color: #000;
  margin: 15px 15px 0px 15px;
  border-bottom: 1px solid rgb(0, 0, 0, 0.05);
  padding-bottom: 15px;
}

.reset-btn {
  display: block;
  margin: 25px 15px;
  background: transparent;
  font-weight: bold;
  font-size: 14px;
  color: gray;
  border: none;
}
</style>

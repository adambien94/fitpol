<template>
  <div id="menu">
    <ul class="week-list">
      <li
        class="day"
        v-bind:class="{'day--opened': index === activeDay}"
        v-for="(day, index) in days"
        v-on:click="showDayMenu(index)"
      >
        <span class="day__label">{{day}}</span>
        <span class="day__dots">...</span>
        <ul class="day__meals" v-on:click="showInput(index)">
          <li class="meals__item" v-for="meal in meals[index]">- {{meal}}</li>
        </ul>
      </li>
    </ul>

    <div v-if="show" class="input-box">
      <h2 class="input-box__title">Menu ({{days[dayIndex]}})</h2>
      <form id="my-form">
        <div class="input-box__item" v-for="(mealInput, mealInputsIndex) in mealInputs">
          <input
            class="input-box__input"
            type="text"
            v-model="mealInputs[mealInputsIndex]"
            :placeholder="'posiłek ' + (mealInputsIndex + 1)"
          >
        </div>
      </form>
      <div class="input-box__buttons">
        <button class="input-box__btn" v-on:click="inputShowToggle">anuluj</button>
        <button class="input-box__btn" v-on:click="addMeals">ok</button>
      </div>
    </div>
    <transition name="v">
      <div v-if="show" class="blackout"></div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      closed: true,
      show: false,
      days: [
        "Poniedziałek",
        "Wtorek",
        "Środa",
        "Czwartek",
        "Piątek",
        "Sobota",
        "Niedziela"
      ],
      activeDay: 0,
      dayIndex: 0,
      mealInputs: ["", "", "", ""]
    };
  },
  methods: {
    showDayMenu(dayIndex) {
      this.activeDay = dayIndex;
    },
    inputShowToggle() {
      this.show = !this.show;
    },
    storeDayIndex(dayIndex) {
      this.dayIndex = dayIndex;
    },
    updateMealInput(dayIndex) {
      for (let i = 0; i < this.mealInputs.length; i++) {
        if (this.meals[this.dayIndex][i] === "") {
          this.mealInputs[i] = "";
        } else {
          this.mealInputs[i] = this.meals[this.dayIndex][i];
        }
      }
    },
    showInput(dayIndex) {
      this.inputShowToggle();
      this.storeDayIndex(dayIndex);
      this.updateMealInput(dayIndex);
    },
    addMeals() {
      for (let i = 0; i < this.mealInputs.length; i++) {
        if (this.mealInputs[i] !== "") {
          this.meals[this.dayIndex][i] = this.mealInputs[i];
        } else {
          this.meals[this.dayIndex][i] = "";
        }
      }
      this.inputShowToggle();
      localStorage.setItem("mojeMenu", JSON.stringify(this.meals));
    },
    updateMeals1() {
      this.$store.commit("updateMeals");
    }
  },
  computed: {
    dataArr() {
      return this.$store.state.dataArr;
    },
    meals() {
      return this.$store.state.meals;
    }
  },
  created() {
    // this.createMeals();
    this.updateMeals1();
    let date = new Date();
    let day = date.getDay();
    if (day > 0) {
      this.activeDay = day - 1;
    } else {
      this.activeDay = 6;
    }
  }
};
</script>

<style scoped>
* {
  line-height: 20px;
}

#menu {
  flex: 1;
  position: relative;
}

.week-list {
  height: 100%;
  overflow-y: scroll;
  z-index: 1;
}

.day {
  padding: 12px 0;
  border-bottom: 1px solid rgb(0, 0, 0, 0.05);
  list-style: none;
  transition: 0.2s;
  height: 40px;
  overflow: hidden;
}

.day__label {
  display: block;
  font-size: 16px;
  padding-left: 15px;
  font-weight: bold;
}

.day__dots {
  display: inline-block;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  font-size: 18px;
  transition: 0.1s;
}

.day--opened {
  height: 180px;
  /* background: #fffbe5; */
}

.day--opened .day__dots {
  color: transparent;
}

.day--opened .day__label {
  color: #000;
}

.day__meals {
  margin: 15px 30px;
  transition: 0.2s;
  position: relative;
  top: 0;
}

.day--opened .day__meals {
  margin-top: 0px;
  top: -6px;
}

.meals__item {
  list-style: none;
  font-size: 16px;
  text-align: left;
  padding: 6px 0;
}

.blackout {
  position: absolute;
  background: red;
  top: 0;
  width: 100%;
  height: 150%;
  transition: 0.2s;
  transform: translateY(-20%);
  background: rgb(0, 0, 0, 0.3);
  z-index: 4;
}

.input-box {
  width: 85%;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  box-shadow: 0px 6px 20px rgb(0, 0, 0, 0.3);
  z-index: 5;
  border-radius: 3px;
  overflow: hidden;
}

.input-box__title {
  color: black;
  font-size: 24px;
  font-weight: bold;
  line-height: 30px;
  padding: 14px;
  border-bottom: 1px solid rgb(0, 0, 0, 0.05);
  /* background: #ededed; */
}

.input-box form {
  background: #fff;
  padding: 24px 0 14px 0;
}

.input-box__item {
  margin-bottom: 12px;
  font-weight: bold;
}

.input-box__input {
  width: calc(100% - 50px);
  margin: 0 auto;
  border: 1px solid rgb(0, 0, 0, 0.2);
  font-size: 18px;
  line-height: 36px;
  border-radius: 2px;
  text-align: left;
  padding: 0 10px;
  margin: 0px 150px 0 15px;
  color: gray;
}

.input-box__input:focus {
  color: black;
}

.input-box__label {
  font-size: 20px;
  line-height: 36px;
  padding-left: 25px;
}

.input-box__buttons {
  display: flex;
  background: #ededed;
  padding: 3px;
}

.input-box__btn {
  background: #388697;
  color: white;
  text-transform: capitalize;
  width: 100%;
  height: 40px;
  margin: 3px;
  border: none;
  outline: none;
  border-radius: 2px;
  font-size: 18px;
  font-weight: bold;
}
</style>


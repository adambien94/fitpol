<template>
  <div id="menu">
    <div class="scroll-container">
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
            <div class="scroll-container">
              <li class="meals__item" v-for="meal in meals[index]">- {{meal}}</li>
            </div>
          </ul>
        </li>
      </ul>
    </div>

    <transition name="input-box-transition">
      <div v-show="show" class="input-box">
        <h2 class="input-box__title">Menu - {{days[dayIndex]}}</h2>
        <span></span>
        <form id="my-form" class="input-box__form">
          <div class="input-box__item" v-for="(mealInput, mealInputsIndex) in meals[dayIndex]">
            <input
              class="input-box__input"
              type="text"
              v-model="mealInputs[mealInputsIndex]"
              :placeholder="'posiłek ' + (mealInputsIndex + 1)"
              @focus="mealEdit = true; setMealEditIndex(mealInputsIndex)"
              @blur="mealEdit = false"
            />
          </div>
        </form>
        <div class="input-box__meal-nav">
          <button class="input-box__delete-meal" @click="deleteMeal()">-🗑️</button>
          <button class="input-box__add-meal" @click="addMeal(dayIndex)">+🍲</button>
        </div>
        <div class="input-box__buttons">
          <button class="input-box__btn" v-on:click="inputShowToggle">anuluj</button>
          <button class="input-box__btn" v-on:click="addMenu(dayIndex); inputShowToggle()">ok</button>
        </div>
      </div>
    </transition>

    <transition name="blackout-transition">
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
        "poniedziałek",
        "wtorek",
        "środa",
        "czwartek",
        "piątek",
        "sobota",
        "niedziela"
      ],
      activeDay: 0,
      dayIndex: 0,
      mealInputs: [],
      mealEdit: false,
      mealEditIndex: null
    };
  },
  methods: {
    setMealEditIndex(mealInputsIndex) {
      this.mealEditIndex = mealInputsIndex;
    },
    addMeal(dayIndex) {
      this.meals[dayIndex].push("");
      this.mealInputs = [];
      for (let meal of this.meals) {
        this.mealInputs.push("");
      }
      this.formScroll();
    },
    deleteMeal() {
      this.meals[this.dayIndex].splice(this.mealEditIndex, 1);
      this.updateMealInput(this.dayIndex);
      this.addMenu(this.dayIndex);
    },
    disableDeleteMeal() {
      const deleteBtn = document.querySelector(".input-box__delete-meal");
      if (this.meals[this.dayIndex].length === 1) {
        deleteBtn.disabled = true;
      } else {
        deleteBtn.disabled = false;
      }
    },
    formScroll() {
      const form = document.querySelector(".input-box__form");
      form.scrollTop = form.getBoundingClientRect().height;
    },
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
      for (let i = 0; i < this.meals[dayIndex].length; i++) {
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
    addMenu(dayIndex) {
      for (let i = 0; i < this.meals[dayIndex].length; i++) {
        if (this.mealInputs[i] !== "") {
          this.meals[this.dayIndex][i] = this.mealInputs[i];
        } else {
          this.meals[this.dayIndex][i] = "";
        }
      }
      localStorage.setItem("mojeMenu", JSON.stringify(this.meals));
    },
    updateMeals1() {
      this.$store.commit("updateMeals");
      console.log(this.meals);
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
  watch: {
    mealEdit() {
      const mealNav = document.querySelector(".input-box__meal-nav");
      if (this.mealEdit) {
        setTimeout(() => {
          mealNav.style.transform = "translateX(0)";
        }, 100);
      } else {
        setTimeout(() => {
          mealNav.style.transform = "translateX(-50%)";
        }, 100);
      }
      this.disableDeleteMeal();
    }
  },
  created() {
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
  background: #fff;
}

.scroll-container {
  overflow-y: scroll;
  width: 100%;
  height: 100%;
}

.day {
  overflow: hidden;
  padding: 14px 0;
  transition: height 0.2s;
  border-bottom: 1px solid rgba(0, 0, 0, 0.03);
  list-style: none;
  height: 40px;
}

.day__label {
  display: block;
  font-size: 15px;
  padding-left: 15px;
  font-weight: 500;
  text-transform: capitalize;
}

.day__dots {
  display: inline-block;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  font-size: 15px;
  transition: 0.2s;
}

.day--opened {
  height: 165px;
}

.day--opened .day__dots {
  color: transparent;
}

.day__meals {
  margin: 15px 0px 5px 30px;
  transition: 0.2s;
  position: relative;
  top: 0;
  height: 138px;
}

.day--opened .day__meals {
  margin-top: 0px;
  top: -6px;
}

.meals__item {
  list-style: none;
  font-size: 15px;
  text-align: left;
  padding: 5px 0;
}

.input-box {
  width: 80%;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -70%);
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.3);
  z-index: 5;
  border-radius: 3px;
  overflow: hidden;
}

.input-box__title {
  color: black;
  font-size: 22px;
  font-weight: bold;
  line-height: 28px;
  padding: 14px;
}

.input-box__form {
  padding: 24px 0 0px 0;
  height: 200px;
  scroll-behavior: smooth;
  overflow-y: scroll;
}

.input-box__item {
  margin-bottom: 12px;
  font-weight: bold;
}

.input-box__input {
  width: calc(100% - 50px);
  border: none;
  border-bottom: 1px solid rgb(0, 0, 0, 0.1);
  font-size: 17px;
  line-height: 36px;
  padding: 0 10px;
  border-radius: 2px;
  margin-left: 15px;
  color: rgba(0, 0, 0, 0.6);
}

.input-box__input:focus {
  color: black;
}

.input-box__meal-nav {
  margin: 10px 0 16px 0;
  display: flex;
  justify-content: space-around;
  width: 200%;
  transform: translateX(-50%);
  transition: transform 0.35s ease-out;
}

.input-box__delete-meal,
.input-box__add-meal {
  display: inline-block;
  border: none;
  color: black;
  height: 42px;
  padding: 0 4px;
  border-radius: 2px;
  background: transparent;
  font-weight: bold;
  outline: none;
  text-align: center;
  font-size: 24px;
  line-height: 24px;
  transition: 0.1s;
  border: 1px solid transparent;
}

.input-box__add-meal:active {
  border: 1px solid #388697;
}

.input-box__delete-meal:active {
  border: 1px solid #d81159;
}

.input-box__delete-meal:disabled,
.input-box__add-meal:disabled {
  opacity: 0.3;
}

.input-box__label {
  font-size: 15px;
  line-height: 36px;
  padding-left: 20px;
}

.input-box__buttons {
  display: flex;
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

@media (min-width: 500px) {
  .scroll-container {
    position: absolute;
    width: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: -17px;
  }
}
</style>


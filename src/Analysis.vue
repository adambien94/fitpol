<template>
  <div id="analysis">
    <div class="scroll-container">
      <span class="no-data-info" v-if="!storedData">{{blankInfo}}</span>
      <div class="container" v-if="storedData">
        <div class="info">
          <div class="info__item">
            <span class="info__label">Wiek</span>
            <span class="info__span">{{age}}</span>
          </div>
          <div class="info__item">
            <span class="info__label">Wzrost</span>
            <span class="info__span">{{height}}</span>
          </div>
          <div class="info__item">
            <span class="info__label">Waga</span>
            <span class="info__span">{{lastWeight}}</span>
          </div>
          <div class="info__item">
            <span class="info__label">Płeć</span>
            <span class="info__span">{{sex}}</span>
          </div>
        </div>

        <div class="calculator">
          <div class="calculator__item">
            <span class="calculator__label">BMI (wskaźnik masy ciała)</span>
            <span class="calculator__span">
              {{bmi}}
              <span class="gray-span">{{status}}</span>
              <span class="emot-span">{{statusEmot}}</span>
            </span>
          </div>
          <div class="calculator__item">
            <span class="calculator__label">BMR (podst. przemiana materii)</span>
            <span class="calculator__span">
              {{bmr}}
              <span class="gray-span">kcal</span>
            </span>
          </div>
          <div class="calculator__item">
            <span class="calculator__label">CPM (dzienne zapotrzebowanie kaloryczne)</span>
            <span class="calculator__span">
              {{cpm}}
              <span class="gray-span">kcal</span>
            </span>
          </div>
          <div class="calculator__item">
            <span class="calculator__label">Zapotrzebowanie na przybranie wagi</span>
            <span class="calculator__span">
              {{(cpm * 1) + 250}}
              <span class="gray-span">kcal</span>
            </span>
          </div>
          <div class="calculator__item">
            <span class="calculator__label">Zapotrzebowanie na utratę wagi</span>
            <span class="calculator__span">
              {{(cpm * 1) - 200}}
              <span class="gray-span">kcal</span>
            </span>
          </div>
          <div class="calculator__item">
            <span class="calculator__label">Lorem ipsum (coś tu będzie)</span>
            <span class="calculator__span">
              3021
              <span class="gray-span">wynik</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["blankInfo", "storedData"],
  data() {
    return {
      weight: 0,
      waist: 0,
      norma: ""
    };
  },
  methods: {
    updateInfo() {
      this.$store.commit("updateInfo");
    }
  },
  computed: {
    dataArr() {
      return this.$store.state.dataArr;
    },
    age() {
      return this.$store.state.personalInfo.age;
    },
    height() {
      return this.$store.state.personalInfo.height;
    },
    heightM() {
      return this.height / 100;
    },
    sex() {
      return this.$store.state.personalInfo.sex;
    },
    activity() {
      return this.$store.state.personalInfo.activity;
    },
    lastData() {
      return this.$store.state.dataArr[this.$store.state.dataArr.length - 1];
    },
    lastWeight() {
      return this.$store.getters.lastWeight;
    },
    lastWaist() {
      return this.$store.getters.lastWaist;
    },
    bmi() {
      let myBmi = this.lastWeight / (this.heightM * this.heightM);
      return parseFloat(myBmi).toFixed(2);
    },
    bmr() {
      let myBmr =
        66 + 13.7 * this.lastWeight + 5 * this.heightM * 100 - 6.76 * this.age;
      return parseFloat(myBmr).toFixed(0);
    },
    cpm() {
      let myCpm = this.bmr * this.activity;
      return myCpm.toFixed(0);
    },
    status() {
      if (this.bmi < 20) {
        return "niedowaga";
      } else if (this.bmi > 20 && this.bmi < 24.9) {
        return "prawidłowa waga";
      } else if (this.bmi > 24.9 && this.bmi < 29.9) {
        return "nadwaga";
      } else if (this.bmi > 29.9) {
        return "otyłość";
      }
    },
    statusEmot() {
      if (this.bmi < 20) {
        return "😐";
      } else if (this.bmi > 20 && this.bmi < 24.9) {
        return "😋";
      } else if (this.bmi > 24.9 && this.bmi < 29.9) {
        return "😐";
      } else if (this.bmi > 29.9) {
        return "😡";
      }
    }
  },
  created() {
    this.updateInfo();
  }
};
</script>

<style scoped>
* {
  line-height: 23px;
  font-size: 15px;
}

#analysis {
  flex: 1;
  z-index: 2;
  background: #fff;
  position: relative;
  overflow: hidden;
}
.info {
  display: flex;
}

.info__item {
  width: 100%;
  padding: 12px 0;
  border-bottom: 1px solid rgb(0, 0, 0, 0.03);
}

.info__label {
  font-weight: 400;
}

.info__label,
.info__span {
  display: block;
  text-align: center;
  color: #000;
}

.info__span {
  color: black;
  text-transform: uppercase;
}

.calculator__item {
  padding: 12px 0;
}

.calculator__label,
.calculator__span {
  display: block;
  padding-left: 15px;
}

.calculator__label {
  font-weight: 600;
  line-height: 28px;
}

.calculator__span {
  color: #d81159;
  font-size: 19px;
  padding-top: 0px;
  font-weight: 400;
}

.gray-span {
  color: black;
  font-weight: 400;
  font-size: 15px;
  color: #000;
}

.emot-span {
  font-size: 16px;
}

.scroll-container {
  overflow-y: scroll;
  width: 100%;
  height: 100%;
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

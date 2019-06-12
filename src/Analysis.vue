<template>
  <div id="analysis">
    <div class="info">
      <div class="info__item">
        <span class="info__label">Wzrost</span>
        <span class="info__span">{{height}}</span>
      </div>
      <div class="info__item">
        <span class="info__label">Waga</span>
        <span class="info__span">{{lastWeight}}</span>
      </div>
      <div class="info__item">
        <span class="info__label">Wiek</span>
        <span class="info__span">{{age}}</span>
      </div>
      <div class="info__item">
        <span class="info__label">Płeć</span>
        <span class="info__span">{{sex}}</span>
      </div>
    </div>

    <div class="calculator">
      <div class="calculator__item">
        <span class="calculator__label">BMI (wskaźnik masy ciała):</span>
        <span class="calculator__span">
          {{bmi}}
          <span class="gray-span">{{status}}</span>
          <span class="emot-span">{{statusEmot}}</span>
        </span>
      </div>
      <div class="calculator__item">
        <span class="calculator__label">BMR (podst. przemiana materii):</span>
        <span class="calculator__span">
          {{bmr}}
          <span class="gray-span">kcal</span>
        </span>
      </div>
      <div class="calculator__item">
        <span class="calculator__label">Test (na procent)</span>
        <span class="calculator__span">87%</span>
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
</template>

<script>
export default {
  data() {
    return {
      weight: 0,
      waist: 0,
      norma: ""
    };
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
  font-weight: bold;
}

.info__label,
.info__span {
  display: block;
  text-align: center;
  color: rgb(0, 0, 0, 1);
}

.info__span {
  color: black;
  text-transform: uppercase;
}

.calculator__item {
  padding: 12px 0;
  border-bottom: 1px solid rgb(0, 0, 0, 0.03);
}

.calculator__label,
.calculator__span {
  display: block;
  padding-left: 15px;
  font-weight: bold;
}

.calculator__label {
}

.calculator__span {
  color: #d81159;
  padding-top: 0px;
  font-weight: bold;
}

.gray-span {
  color: black;
  font-weight: 400;
}

.emot-span {
  font-size: 16px;
}
</style>

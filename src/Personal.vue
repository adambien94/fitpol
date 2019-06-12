<template>
  <div id="personal" v-touch:swipe.left="slideHam" v-touch:swipe.right="slideHam2">
    <div class="grey">
      <div class="back-arrow" v-on:click="slideHam2"></div>
    </div>
    <div class="input-box">
      <!-- <h2 class="input-box__title">Waga</h2> -->
      <form id="my-form">
        <div class="input-box__item">
          <label class="input-box__label" for>Wiek:</label>
          <input class="input-box__input" type="text" placeholder="-" v-model="age">
        </div>
        <div class="input-box__item">
          <label class="input-box__label" for>Wzrost:</label>
          <input class="input-box__input" type="number" placeholder="[cm]" v-model="height">
        </div>

        <div class="input-box__item">
          <label class="input-box__label" for>Płeć:</label>
          <input class="input-box__input" type="text" placeholder="M/K" v-model="sex">
        </div>
        <div class="clearfix"></div>
      </form>
      <button v-on:click="setData(); slideHam2()" class="personal__set-btn">Ustaw</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
    updateInfo() {
      this.$store.commit("updateInfo");
    },
    slideHam2() {
      this.$emit("slideHam2");
    },
    slideHam() {
      console.log("hehe");
      this.$emit("slideHam");
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
#personal {
  background: #fff;
  height: 100vh;
  width: 100%;
  z-index: 555;
  position: absolute;
}

.input-box {
  width: 100%;
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
  border-bottom: 1px solid rgb(0, 0, 0, 0.03);
}

.input-box form {
  padding: 20px 30px;
}

.input-box__item {
  margin-bottom: 12px;
  font-weight: bold;
}

.input-box__input {
  float: right;
  width: 155px;
  border: 1px solid rgb(0, 0, 0, 0.2);
  font-size: 17px;
  line-height: 36px;
  border-radius: 2px;
  text-align: center;
  color: black;
}

.input-box__select {
  float: right;
  border: 1px solid rgb(0, 0, 0, 0.2);
  font-size: 22px;
  height: 48px;
  display: block;
  line-height: 22px;
  border-radius: 2px;
}

.input-box__label {
  font-size: 20px;
  line-height: 36px;
}

.personal__set-btn {
  background: #388697;
  color: white;
  text-transform: capitalize;
  width: 157px;
  height: 40px;
  border: none;
  outline: none;
  border-radius: 2px;
  font-size: 18px;
  font-weight: bold;
  float: right;
  margin: 0 30px;
}

.clearfix {
  clear: both;
}

.grey {
  background: #ededed;
  height: 50px;
  margin-bottom: 10px;
}

.back-arrow {
  background: url("./img/keyboard-left-arrow-button.png");
  background-size: cover;
  height: 20px;
  width: 18px;
  margin: 0 15px;
  position: relative;
  top: 15px;
}
</style>


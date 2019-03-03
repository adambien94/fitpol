<template>
  <div id="list">
    <div class="label-bar">
      <span class="label-bar__label date">📆</span>
      <span class="label-bar__label weight">✏️kg</span>
      <span class="label-bar__label emot">😄</span>
      <span class="label-bar__label note">✏️cm</span>
    </div>

    <ul class="data">
      <li v-for="data in dataArr.slice().reverse()" class="data__item" v-on:click="editData(data)">
        <span class="data__item__col date">{{data.date}}</span>
        <span class="data__item__col weight">{{data.weight}}</span>
        <span class="data__item__col emot">{{data.emot}}</span>
        <span class="data__item__col note">{{data.note}}</span>
      </li>
    </ul>
    <div v-if="show" class="input-box">
      <h2 class="input-box__title">Waga</h2>

      <form id="my-form">
        <div class="input-box__item">
          <label class="input-box__label" for>Data:</label>
          <input class="input-box__input" type="text" :placeholder="currentDate" v-model="date">
        </div>
        <div class="input-box__item">
          <label class="input-box__label" for>Waga:</label>
          <input class="input-box__input" type="text" placeholder="-" v-model="weight">
        </div>

        <div class="input-box__item">
          <label class="input-box__label" for>Pas:</label>
          <input class="input-box__input" type="text" placeholder="-" v-model="note">
        </div>
        <div class="input-box__item">
          <select name class="input-box__select" v-model="emot">
            <option value="😊" selected>😊</option>
            <option value="😡">😡</option>
          </select>
        </div>

        <div class="clearfix"></div>
      </form>
      <div class="input-box__buttons">
        <button class="input-box__btn" v-on:click="showToggle(); clearData()">anuluj</button>
        <button class="input-box__btn" v-on:click="addData()">ok</button>
      </div>
    </div>

    <transition name="v">
      <div v-if="show" class="blackout"></div>
    </transition>
    <div v-on:click="show = !show" class="input-btn">
      <img src="./img/sharp_create_white_24dp.png" alt>
    </div>
  </div>
</template>



<script>
export default {
  data() {
    return {
      currentDate: "",
      show: false,
      date: "",
      weight: "",
      emot: "",
      note: "",
      index: null,
      storageData: null
    };
  },
  methods: {
    showToggle() {
      this.show = !this.show;
    },
    addData() {
      if (this.date === "") {
        this.date = this.currentDate;
      }
      if (this.weight === "" || isNaN(this.weight)) {
        this.weight = "-";
      } else {
        this.weight = parseFloat(this.weight).toFixed(1);
      }
      if (this.emot === "") {
        this.emot = "-";
      }
      if (this.note === "" || isNaN(this.note)) {
        this.note = "-";
      } else {
        this.note = parseFloat(this.note).toFixed(1);
      }
      if (this.index === this.dataArr.length) {
        this.dataArr.push({
          date: this.date,
          weight: this.weight,
          emot: this.emot,
          note: this.note
        });
        this.index = this.dataArr.length;
        this.listAnimation();
      } else {
        this.dataArr[this.index].date = this.date;
        this.dataArr[this.index].weight = this.weight;
        this.dataArr[this.index].emot = this.emot;
        this.dataArr[this.index].note = this.note;
      }
      this.show = !this.show;
      this.index = this.dataArr.length;
      this.clearData();
      document.getElementById("my-form").reset();
      // LOCAL STORAGE test
      localStorage.setItem("mojeDane", JSON.stringify(this.dataArr));
    },
    editData(data) {
      this.index = this.dataArr.indexOf(data);
      if (data.weight === "-") {
        this.weight = "";
      } else {
        this.weight = data.weight;
      }
      if (data.note === "-") {
        this.note = "";
      } else {
        this.note = data.note;
      }
      this.date = data.date;
      this.emot = data.emot;
      this.show = true;
    },
    clearData() {
      this.date = "";
      this.weight = "";
      this.emot = "";
      this.note = "";
    },
    listAnimation() {
      let list = document.querySelector(".data");
      let listItemHeight = document
        .querySelector(".data__item")
        .getBoundingClientRect().height;
      list.style.transition = "0";
      list.style.transform = "translateY(-" + listItemHeight + "px)";
      setTimeout(function() {
        list.style.transition = "0.2s";
        list.style.transform = "translateY(0px)";
      }, 10);
    },
    labelShadow() {
      const dataList = document.querySelector(".data");
      const labelBar = document.querySelector(".label-bar");
      dataList.addEventListener("scroll", function() {
        if (dataList.scrollTop > 0) {
          labelBar.style.borderBottom = "0px";
        } else {
          labelBar.style.borderBottom = "1px solid rgb(0,0,0,0.05";
        }
      });
    },
    updateData() {
      this.$store.commit("updateData");
    }
  },
  computed: {
    dataArr() {
      return this.$store.state.dataArr;
    },
    myIndex() {
      return this.$store.state.dataArr.length;
    }
  },
  created() {
    this.updateData();
    this.index = this.myIndex;
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear() - 2000;
    if (day <= 9) {
      day = "0" + day;
    }
    if (month <= 9) {
      month = "0" + month;
    }
    let fullDate = day + "-" + month + "-" + year;
    this.currentDate = fullDate;
  },
  mounted() {
    this.labelShadow();
  }
  // updated() {
  //   this.updateData();
  // }
};
</script>



<style scoped>
#list {
  flex: 1;
  height: 100vh;
  position: relative;
  height: 100%;
}

.label-bar,
.data__item {
  position: relative;
  display: flex;
  line-height: 38px;
  text-align: center;
  background: #fff;
  z-index: 2;
  color: black;
}

.label-bar {
  border-bottom: 1px solid rgb(0, 0, 0, 0.05);
  z-index: 2;
  height: 50px;
  line-height: 50px;
}

.data__item {
  font-size: 16px;
  font-weight: bold;
  line-height: 50px;
  border-bottom: 1px solid rgb(0, 0, 0, 0.05);
  cursor: pointer;
}

.label-bar__label {
  font-size: 16px;
  font-weight: bold;
  color: black;
  /* border-right: 1px solid rgb(0, 0, 0, 0.05); */
}

.data__item .emot {
  font-size: 18px;
}

.data {
  height: calc(100vh - 240px);
  overflow-y: scroll;
  z-index: 1;
}

.emot {
  width: 50px;
  flex-shrink: 0;
}

.note,
.weight,
.date {
  width: 100%;
}

.data__item .date {
  font-weight: bold;
}

.data__item .note {
  font-weight: bold;
}

.data__item .weight {
  font-weight: bold;
  color: #d81159;
  /* color: #000; */
}

.input-btn {
  position: absolute;
  left: 50%;
  bottom: 18px;
  transform: translateX(-50%);
  z-index: 3;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #388697;
  background-size: cover;
  text-align: center;
  line-height: 55px;
  font-weight: 400;
  color: #fff;
  cursor: pointer;
  box-shadow: 0px 3px 16px 2px rgb(0, 0, 0, 0.2);
}

.input-btn img {
  width: 55%;
  position: relative;
  top: 12px;
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
  width: 300px;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -70%);
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
}

.input-box form {
  padding: 24px 24px 24px 24px;
  background: #fff;
}

.input-box__item {
  margin-bottom: 12px;
  font-weight: bold;
}

.input-box__input {
  float: right;
  width: 140px;
  border: 1px solid rgb(0, 0, 0, 0.2);
  font-size: 18px;
  line-height: 36px;
  border-radius: 2px;
  text-align: center;
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

.clearfix {
  clear: both;
}
</style>
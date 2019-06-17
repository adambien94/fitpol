import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    dataArr: [
      {
        date: "19-04-04",
        weight: 89.0,
        emot: "😡",
        note: 92.4
      },
      {
        date: "19-03-12",
        weight: 88.7,
        emot: "😊",
        note: 91.4
      },
      {
        date: "19-04-04",
        weight: 88.3,
        emot: "😊",
        note: 88.5
      },
      {
        date: "19-04-04",
        weight: 88.1,
        emot: "😡",
        note: 87.9
      },
      {
        date: "19-03-12",
        weight: "-",
        emot: "😊",
        note: 87.7
      },
      {
        date: "19-04-04",
        weight: 86.9,
        emot: "😊",
        note: 87.6
      },
      {
        date: "19-03-12",
        weight: 86.5,
        emot: "😊",
        note: 85.9
      },
      {
        date: "19-04-04",
        weight: 86.5,
        emot: "😊",
        note: 85.1
      },
      {
        date: "19-03-12",
        weight: 88.7,
        emot: "😊",
        note: 91.4
      },
      {
        date: "19-04-04",
        weight: 88.3,
        emot: "😊",
        note: 88.5
      },
      {
        date: "19-04-04",
        weight: 88.1,
        emot: "😡",
        note: 87.9
      },
      {
        date: "19-03-12",
        weight: "-",
        emot: "😊",
        note: 87.7
      },
      {
        date: "19-04-04",
        weight: 86.9,
        emot: "😊",
        note: 87.6
      },
      {
        date: "19-03-12",
        weight: 86.5,
        emot: "😊",
        note: 85.9
      },
      {
        date: "19-04-04",
        weight: 86.5,
        emot: "😊",
        note: 85.1
      }
    ],
    dataArrDefault: [
      {
        date: "19-24-04",
        weight: 89.2,
        emot: "😊",
        note: 96.3
      },
      {
        date: "19-03-12",
        weight: 89.1,
        emot: "😊",
        note: 94.2
      },
      {
        date: "19-04-04",
        weight: 89.0,
        emot: "😡",
        note: 92.4
      },
      {
        date: "19-03-12",
        weight: 88.7,
        emot: "😊",
        note: 91.4
      },
      {
        date: "19-04-04",
        weight: 88.3,
        emot: "😊",
        note: 88.5
      },
      {
        date: "19-04-04",
        weight: 88.1,
        emot: "😡",
        note: 87.9
      },
      {
        date: "19-03-12",
        weight: "-",
        emot: "😊",
        note: 87.7
      },
      {
        date: "19-04-04",
        weight: 86.9,
        emot: "😊",
        note: 87.6
      },
      {
        date: "19-03-12",
        weight: 86.5,
        emot: "😊",
        note: 85.9
      },
      {
        date: "19-04-04",
        weight: "-",
        emot: "😊",
        note: "-"
      },
      {
        date: "19-04-04",
        weight: 86.2,
        emot: "😡",
        note: "-"
      },
      {
        date: "19-03-12",
        weight: "-",
        emot: "😊",
        note: "-"
      },
      {
        date: "19-04-04",
        weight: 84.5,
        emot: "😊",
        note: 85.6
      },
      {
        date: "19-03-12",
        weight: 83.1,
        emot: "😊",
        note: 84.9
      },
      {
        date: "19-04-04",
        weight: 82.9,
        emot: "😊",
        note: 84.5
      }
    ],
    personalInfo: {
      age: 23,
      height: 183,
      sex: "M",
      activity: 2
    },
    meals: [
      ["", "", "", ""],
      ["", "", "", ""],
      ["", "", "", ""],
      ["", "", "", ""],
      ["", "", "", ""],
      ["", "", "", ""],
      ["", "", "", ""]
    ]
  },

  getters: {
    lastWeight: state => {
      for (let i = state.dataArr.length - 1; i >= 0; i--) {
        if (state.dataArr[i].weight !== "-") {
          var lastWeight = state.dataArr[i].weight;
          break;
        }
      }
      return lastWeight;
    },
    lastWaist: state => {
      for (let i = state.dataArr.length - 1; i >= 0; i--) {
        if (state.dataArr[i].note !== "-") {
          var lastWaist = state.dataArr[i].note;
          break;
        }
      }
      return lastWaist;
    }
  },
  mutations: {
    testFun: state => {
      state.dataArr.push({ date: "24-04", weight: 11, emot: "hehe", note: 11 });
    },
    storeAge: (state, age) => {
      state.personalInfo.age = age;
    },
    storeHeight: (state, height) => {
      state.personalInfo.height = height;
    },
    storeSex: (state, sex) => {
      state.personalInfo.sex = sex;
    },
    storeActivity: (state, activity) => {
      state.personalInfo.activity = activity;
    },
    updateData: state => {
      state.dataArr =
        JSON.parse(localStorage.getItem("mojeDane")) || state.dataArr;
    },
    resetData: state => {
      state.dataArr = state.dataArrDefault || state.dataArr;
      console.log(state.dataArr);
      console.log(state.dataArrDefault);
      localStorage.setItem("mojeDane", JSON.stringify(state.dataArr));
    },
    updateInfo: state => {
      state.personalInfo =
        JSON.parse(localStorage.getItem("mojeInfo")) || state.personalInfo;
    },
    updateMeals: state => {
      state.meals = JSON.parse(localStorage.getItem("mojeMenu")) || state.meals;
    }
  }
});

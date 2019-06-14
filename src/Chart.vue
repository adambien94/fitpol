<template>
  <div id="chart">
    <div class="scroll-container">
      <!-- wykres waga -->
      <div class="chart-container">
        <span class="chart-label">Waga</span>
        <span class="chart-info">({{parseFloat(lostWeight).toFixed(1)}}kg)</span>
        <span class="chart-day">Dzień {{testWeight.length}}</span>
        <canvas id="my-chart-1"></canvas>
      </div>
      <!-- wykres pas -->
      <div class="chart-container">
        <span class="chart-label">Pas</span>
        <span class="chart-info">({{parseFloat(lostWaist).toFixed(1)}}cm)</span>
        <canvas id="my-chart-3"></canvas>
      </div>
      <!-- pasek status -->
      <div class="score-container">
        <span class="chart-label">Dajesz z siebie</span>
        <span class="chart-info">{{parseFloat(testScore).toFixed(0)}}%</span>
        <span class="chart-emot">{{testScoreEmot}}</span>
        <ul class="score-bar">
          <li v-for="emot in testEmots" v-bind:class="emot"></li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: ["ranChart"],
  data() {
    return {
      weight: [],
      goal: 75,
      weightGoal: [],
      waist: [],
      period: 20,
      days: [],
      test: [10, 9, 8, 7, 3, 2],
      emots: [],
      emot1: 0,
      emot2: 0,
      score: 0
    };
  },
  methods: {
    updateCharts() {
      let myChart = document.getElementById("my-chart-1").getContext("2d");
      Chart.defaults.global.defaultFontSize = 10;
      Chart.defaults.global.defaultFontColor = "black";

      var testChart = new Chart(myChart, {
        type: "line", // bar, horizontalBar, line, pie, doughnut, radar, polarArea
        data: {
          labels: this.days,
          datasets: [
            {
              label: "",
              data: this.testWeight,
              fill: false,
              tension: 0.1,
              pointBorderWidth: 0,
              pointBackgroundColor: "#D81159",
              pointHoverBorderColor: "#D81159",
              pointRadius: 0,
              borderColor: ["#D81159"],
              borderWidth: 2
            },
            {
              data: this.weightGoal,
              pointRadius: 0,
              borderWidth: 1,
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          elements: {
            line: {
              tension: 0
            }
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  // beginAtZero: true
                }
              }
            ]
          }
        }
      });

      let myChart3 = document.getElementById("my-chart-3").getContext("2d");

      var testChart3 = new Chart(myChart3, {
        type: "line",
        data: {
          labels: this.days,
          datasets: [
            {
              label: "",
              data: this.testWaist,
              fill: false,
              tension: 0.1,
              pointBorderWidth: 0,
              pointRadius: 0,
              borderColor: ["black"],
              borderWidth: 2
            },
            {
              data: [80],
              pointRadius: 0
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          elements: {
            line: {
              tension: 0
            }
          },
          scales: {
            yAxes: [
              {
                ticks: {}
              }
            ]
          }
        }
      });
    },

    updateDays() {
      for (let i = 0; i < this.period; i++) {
        this.weightGoal.push(this.goal);
        this.days.push(i + 1);
      }
    }
    // updateScore() {
    //   this.score = 100 / ((this.emot1 + this.emot2) / this.emot1);
    //   if (this.score >= 70) {
    //     this.scoreEmot = "😋";
    //   } else if (this.score < 70 && this.score >= 40) {
    //     this.scoreEmot = "😐";
    //   } else {
    //     this.scoreEmot = "🤬";
    //   }
    // }
  },
  computed: {
    dataArr() {
      return this.$store.state.dataArr;
    },
    age() {
      return this.$store.state.personalInfo.age;
    },
    lastWeight() {
      return this.$store.getters.lastWeight;
    },
    lastWaist() {
      return this.$store.getters.lastWaist;
    },
    lostWeight() {
      return this.lastWeight - this.$store.state.dataArr[0].weight;
    },
    lostWaist() {
      return this.lastWaist - this.$store.state.dataArr[0].note;
    },
    testWeight() {
      let myWeight = [];
      for (let i = 0; i < this.$store.state.dataArr.length; i++) {
        if (this.dataArr[i].weight === "-") {
          myWeight.push(myWeight[i - 1]); // WYMYŚŁ COŚ TUTAJ !!!!!!!!!!!!!!!!!!!
        } else {
          myWeight.push(this.$store.state.dataArr[i].weight);
        }
      }
      return myWeight;
    },
    testWaist() {
      let myWaist = [];
      for (let i = 0; i < this.$store.state.dataArr.length; i++) {
        if (this.dataArr[i].note === "-") {
          myWaist.push(myWaist[i - 1]);
        } else {
          myWaist.push(this.$store.state.dataArr[i].note);
        }
      }
      return myWaist;
    },
    testEmots() {
      var myEmots = [];
      for (let i = 0; i < this.$store.state.dataArr.length; i++) {
        if (this.$store.state.dataArr[i].emot === "😊") {
          myEmots.push("happy");
        } else if (this.$store.state.dataArr[i].emot === "😡") {
          myEmots.push("sad");
        }
      }
      return myEmots;
    },
    testEmot1() {
      let myEmot1 = 0;
      for (let i = 0; i < this.$store.state.dataArr.length; i++) {
        if (this.$store.state.dataArr[i].emot === "😊") {
          myEmot1++;
        }
      }
      return myEmot1;
    },
    testEmot2() {
      let myEmot2 = 0;
      for (let i = 0; i < this.$store.state.dataArr.length; i++) {
        if (this.$store.state.dataArr[i].emot === "😡") {
          myEmot2++;
        }
      }
      return myEmot2;
    },
    testScore() {
      return 100 / ((this.testEmot1 + this.testEmot2) / this.testEmot1);
    },
    testScoreEmot() {
      if (this.testScore >= 85) {
        return "😝🔥💪";
      } else if (this.testScore < 85 && this.testScore >= 70) {
        return "😋";
      } else if (this.testScore < 70 && this.testScore >= 40) {
        return "😐";
      } else {
        return "🤬";
      }
    }
  },
  watch: {
    ranChart() {
      this.updateCharts();
    }
  },
  mounted() {
    this.updateDays();
    // this.updateCharts();
  },
  updated() {
    this.updateCharts();
  }
};
</script>



<style scoped>
#chart {
  flex: 1;
  position: relative;
  height: 100%;
}

.scroll-container {
  overflow-y: scroll;
  position: absolute;
  z-index: 0;
  width: 100%;
  overflow-y: scroll;
}

.score-container,
.chart-container {
  position: relative;
  width: 98%;
  margin: 0 auto;
  padding: 7px 0 0px 0;
}

.chart-container {
  border-bottom: 1px solid rgb(0, 0, 0, 0.03);
}

.chart-label {
  font-size: 15px;
  font-weight: bold;
  color: black;
  padding: 0px 0px 0px 15px;
  line-height: 34px;
}

.chart-info {
  font-weight: 400;
  color: #000;
  font-size: 15px;
}

.chart-day {
  font-size: 15px;
  margin-top: 4px;
  font-weight: bold;
  float: right;
  padding-top: 5px;
  padding-right: 15px;
}

.score-bar {
  margin: 5px;
}

.score-bar .happy,
.score-bar .sad {
  width: 2px;
  height: 45px;
  margin-left: 1px;
  padding: 0;
  list-style: none;
  display: inline-block;
}

.score-bar .happy {
  background: #388697;
}

.score-bar .sad {
  background: #d81159;
}

.chart-emot {
  font-size: 16px;
}

@media (min-width: 500px) {
  .scroll-container {
    width: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: -17px;
  }
}
</style>

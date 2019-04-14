// import Test from "./Test.vue";
// import Header from "./Header.vue";
import List from "./List.vue";
import Chart from "./Chart.vue";
import Analysis from "./Analysis.vue";
import Personal from "./Personal.vue";

export default [
  // {
  //   path: "/l",
  //   component: Header
  // }
  {
    path: "/personal",
    component: Personal,
    props: true
  },
  {
    path: "/chart",
    component: Chart,
    props: true
  },
  {
    path: "/analysis",
    component: Analysis,
    props: true
  }
  // {
  //   path: "/test",
  //   component: Test
  // }
];

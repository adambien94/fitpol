// import Test from "./Test.vue";
// import Header from "./Header.vue";
import List from "./List.vue";
import Chart from "./Chart.vue";
import Anal from "./Anal.vue";
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
    path: "/anal",
    component: Anal,
    props: true
  }
  // {
  //   path: "/test",
  //   component: Test
  // }
];

import Vue from 'vue'
import VueRouter from "vue-router";
import Overview from '../components/Overview'

Vue.use(VueRouter);

const routes = [
    {path: '/', name: "home", component: Overview}
];

export default new VueRouter({routes})

import Vue from 'vue'
import VueRouter from "vue-router";
// import Overview from '../components/Overview'
import Budget from "../components/Budget";
import Reports from "../components/Reports";
import CreateAccounts from "../components/CreateAccounts";

Vue.use(VueRouter);

const routes = [
    {path: '/', name: "overview", component: CreateAccounts},
    {path: '/budget', name: "budget", component: Budget},
    {path: '/reports', name: "reports", component: Reports}
];

export default new VueRouter({routes})

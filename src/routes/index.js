import Vue from 'vue'
import VueRouter from "vue-router";
import Overview from '../components/Overview'
import Budget from "../components/Budget";
import Reports from "../components/Reports";
import Accounts from "../components/Accounts";
import Categories from "../components/Categories";
import Payees from "../components/Payees";
import Transactions from "../components/Transactions";

Vue.use(VueRouter);

const routes = [
    {path: '/', name: "overview", component: Overview},
    {path: '/budget', name: "budget", component: Budget},
    {path: '/reports', name: "reports", component: Reports},
    {path: '/accounts', name: "accounts", component: Accounts},
    {path: '/categories', name: "categories", component: Categories},
    {path: '/payees', name: "payees", component: Payees},
    {path: '/transactions', name: "transactions", component: Transactions},
];

export default new VueRouter({routes})

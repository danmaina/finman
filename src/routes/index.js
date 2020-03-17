import Vue from 'vue'
import VueRouter from "vue-router";
import Overview from '../components/Overview'
import Budget from "../components/Budget";
import Reports from "../components/Reports";
import CreateAccounts from "../components/Forms/CreateAccounts";
import CreateCategories from "../components/Forms/CreateCategories";
import CreatePayees from "../components/Forms/CreatePayees";
import CreateTransactions from "../components/Forms/CreateTransactions";

Vue.use(VueRouter);

const routes = [
    {path: '/', name: "overview", component: Overview},
    {path: '/budget', name: "budget", component: Budget},
    {path: '/reports', name: "reports", component: Reports},
    {path: '/accounts/create', name: "create_account", component: CreateAccounts},
    {path: '/categories/create', name: "create_category", component: CreateCategories},
    {path: '/payees/create', name: "create_payee", component: CreatePayees},
    {path: '/transactions/create', name: "create_transactions", component: CreateTransactions},
];

export default new VueRouter({routes})

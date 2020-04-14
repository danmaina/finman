import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        accounts: [],
        categories: [],
        currencies: [],
        payees: [],
        transactions: [],
    },

    getters: {
        getAccounts: state => {
            return state.accounts;
        },
        getCategories: state => {
            return state.categories;
        },
        getCurrencies: state => {
            return state.currencies
        },
        getPayees: state => {
            return state.payees;
        },
        getTransactions: state => {
            return state.transactions;
        }
    },

    mutations: {
        setAccounts: (state, payload) => {
            state.accounts = payload;
        },
        setCategories: (state, payload) => {
            state.categories = payload;
        },
        setCurrencies: (state, payload) => {
            state.categories = payload;
        },
        setPayees: (state, payload) => {
            state.payees = payload;
        },
        setTransactions: (state, payload) => {
            state.payees = payload;
        }
    }
});

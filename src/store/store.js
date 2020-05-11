import Vuex from 'vuex';
import Vue from 'vue';
import model from "../database/model";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        accounts: model.accounts(),
        categories: model.categories(),
        currencies: model.currencies(),
        payees: model.payees(),
        transactions: model.transactions(0, 10),
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
        },

        getCurrencyNames: state => {
            let currencies = [];

            state.currencies.forEach((currency) => {
                currencies.push(currency.currency_name)
            });

            return currencies
        },

        getCurrencyIdByName: (state) => (name) => {
            let currencyId = 1;
            state.currencies.forEach((currency) => {
                if (currency.currency_name === name) {
                    currencyId = currency.currency_id;
                }
            });

            return currencyId;
        }
    },

    mutations: {
        createAccount: (state, payload) => {
            model.createAccount(payload.account_name, payload.amount, payload.currency_id);
            state.accounts = model.accounts();
        },
        updateAccount: (state, payload) => {
            model.updateAccountById(payload.account_name, payload.amount, payload.currency_id, payload.account_id);
            state.accounts = model.accounts();
        },
        setAccounts: (state, payload) => {
            state.accounts = payload;
        },
        deleteAccountById: (state, payload) => {
            // Delete account in DB
            model.deleteAccountById(payload.account_id);
            
            state.accounts = state.accounts.filter(account => {
                return account.account_id !== payload.account_id;
            });

        },
        setCategories: (state, payload) => {
            state.categories = payload;
        },
        setCurrencies: (state, payload) => {
            state.currencies = payload;
        },
        setPayees: (state, payload) => {
            state.payees = payload;
        },
        setTransactions: (state, payload) => {
            state.payees = payload;
        }
    }
});

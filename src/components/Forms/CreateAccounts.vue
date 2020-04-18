<template>
    <v-container fluid>
        <h1>Create New Account</h1>
        <hr>
        <v-form>
            <v-text-field dark dense outlined :label="account.placeholders.accountNamePlaceHolder" required
                          v-model="account.accountName"/>
            <v-select dark dense outlined :label="account.placeholders.accountCurrencyPlaceHolder" required
                      :items="account.currencies" v-model="account.accountCurrency"/>
            <v-text-field dark dense outlined :label="account.placeholders.accountBalancePlaceholder" type="number"
                          required v-model="account.accountBalance"/>
            <v-btn dark right small class="v-btn v-btn--flat cyan" @click="createNewAccount">Create</v-btn>
        </v-form>
    </v-container>
</template>

<script>
    import model from "../../database/model";

    export default {
        name: "CreateAccounts",
        mounted() {
            this.account.currencies = this.$store.getters.getCurrencyNames;
            console.log("Retrieved currencies: ", this.account.currencies);
        },
        data: () => ({
            account: {
                accountName: '',
                accountBalance: 0,
                currencies: [],
                accountCurrency: null,
                placeholders: {
                    accountNamePlaceHolder: "Account Name",
                    accountCurrencyPlaceHolder: "Account Currency",
                    accountBalancePlaceholder: "Initial Balance",
                }
            }
        }),
        methods: {
            createNewAccount() {
                console.log("Account Details: ", this.account);
                let currencyId = this.$store.getters.getCurrencyIdByName(this.account.accountCurrency);
                console.log("Retrieved CurrencyId: ", currencyId);
                model.createAccount(this.account.accountName, this.account.accountBalance, currencyId);
                this.$store.commit('setAccounts', model.accounts());
            },
        },
    }
</script>

<style scoped>
    hr {
        margin-bottom: 30px;
        width: 50vh;
    }

</style>

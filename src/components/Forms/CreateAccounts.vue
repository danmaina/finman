<template>
    <v-container fluid>
        <h1>Create New Account</h1>
        <hr>
        <v-form>
            <v-text-field dark dense outlined :label="account.placeholders.accountNamePlaceHolder" required
                          :value="account.accountName"/>
            <v-select dark dense outlined :label="account.placeholders.accountCurrencyPlaceHolder" required
                      :items="account.accountCurrencies" v-model="account.accountCurrency"/>
            <v-text-field dark dense outlined :label="account.placeholders.accountBalancePlaceholder" type="number"
                          required :value="account.accountBalance"/>
            <v-btn dark right small class="v-btn v-btn--flat cyan" @click="createNewAccount">Create</v-btn>
        </v-form>
    </v-container>
</template>

<script>
    import model from "../../database/model";

    export default {
        name: "CreateAccounts",
        mounted() {
            this.account.accountCurrencies = model.currencies();
            console.log("Retrieved currencies: ", this.account.accountCurrencies);
        },
        data: () => ({
            account: {
                accountName: '',
                accountBalance: 0,
                accountCurrencies: [],
                accountCurrency: {},
                placeholders: {
                    accountNamePlaceHolder: "Account Name",
                    accountCurrencyPlaceHolder: "Account Currency",
                    accountBalancePlaceholder: "Initial Balance",
                }
            }
        }),
        methods: {
            createNewAccount() {
                console.log("Account Details: ", this.account)
                let res = model.createAccount(this.account.accountName, this.account.accountBalance, this.account.accountCurrency.currency_id)

                console.log("Rows Affected: ", res)
            }
        }
    }
</script>

<style scoped>
    hr {
        margin-bottom: 30px;
        width: 50vh;
    }

</style>

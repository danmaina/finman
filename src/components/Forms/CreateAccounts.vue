<template>
    <v-container fluid>
        <h1>Create New Account</h1>
        <hr>
        <v-form>
            <v-text-field dark dense outlined :label="account.placeholders.accountNamePlaceHolder" required
                          :value="account.accountName"/>
            <v-select dark dense outlined :label="account.placeholders.accountCurrencyPlaceHolder" required
                      :items="account.accountCurrencies" :value="account.accountCurrency"/>
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
        created() {
            this.account.accountCurrencies = model.currencies()
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
                model.createAccount(this.account.accountName, this.account.accountBalance, this.account.accountCurrency.currency_id)
                console.log("Created New Account")
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

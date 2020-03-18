<template>
    <v-container fluid>
        <v-form>
            <v-text-field dark dense outlined :label="account.placeholders.accountNamePlaceHolder" required
                          :value="account.accountName"/>
            <v-select dark dense outlined :label="account.placeholders.accountCurrencyPlaceHolder" required
                      :items="account.accountCurrencies" :value="account.accountCurrency"/>
            <v-text-field dark dense outlined :label="account.placeholders.accountBalancePlaceholder" type="number"
                          required :value="account.accountBalance"/>
            <v-btn dark right small class="v-btn v-btn--flat cyan">Create</v-btn>
        </v-form>
    </v-container>
</template>

<script>
    export default {
        name: "CreateAccounts",
        data: () => ({
            account: {
                accountName: '',
                accountBalance: 0,
                accountCurrencies: ["USD"], //TODO: Fetch currencies from currency table
                accountCurrency: {},
                placeholders: {
                    accountNamePlaceHolder: "Account Name",
                    accountCurrencyPlaceHolder: "Account Currency",
                    accountBalancePlaceholder: "Initial Balance",
                }
            }
        }),
        methods: {}
    }
</script>

<style scoped>

</style>

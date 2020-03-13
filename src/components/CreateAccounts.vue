<template>
    <v-form>
        <v-text-field dark dense outlined :label="account.placeholders.accountNamePlaceHolder" required
                      :value="account.accountName"/>
        <v-select dark dense outlined :label="account.placeholders.accountCurrencyPlaceHolder" required
                  :value="account.accountCurrency"/>
        <v-text-field dark dense outlined type="number" required :value="account.accountBalance"/>
        <v-btn dark small class="v-btn v-btn--flat v-btn--right">Create</v-btn>
    </v-form>
</template>

<script>
    export default {
        name: "CreateAccounts",
        data: () => ({
            account: {
                accountName: '',
                accountBalance: 0,
                accountCurrency: ["USD"], //TODO: Fetch currencies from currency table
                placeholders: {
                    accountNamePlaceHolder: "Account Name",
                    accountCurrencyPlaceHolder: "Account Currency",
                    accountBalancePlaceholder: "Initial Balance"
                }
            }
        })
    }
</script>

<style scoped>

</style>

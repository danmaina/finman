<template>
    <v-dialog
            v-model="createAccountDialog"
            dark
            max-width="400"
            @close="closedTrue">
        <v-card>
            <v-card-title>
                Create A New Account
            </v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field dark dense outlined :label="placeholders.accountName" required
                                  v-model="createdAccount.account_name"/>
                    <v-select dark dense outlined :label="placeholders.accountCurrency" required
                              :items="currencies" v-model="createdAccount.currency_name"/>
                    <v-text-field dark dense outlined :label="placeholders.accountBalance" type="number"
                                  required v-model="createdAccount.amount"/>
                    <v-btn dark right small class="v-btn v-btn--flat cyan--text"
                           @click="createAccount">
                        Create
                    </v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "CreateAccount",
        data: () => ({
            placeholders: {
                accountName: "Account Name",
                accountCurrency: "Account Currency",
                accountBalance: "Account Balance",
            },
            createdAccount: {}
        }),
        props:['createAccountDialog', 'currencies'],
        methods: {
            closedTrue() {
                this.$emit('closed', false);
            },
            createAccount() {
                console.log("Created Account: ", this.createdAccount);
                this.editedAccount.currency_id = this.$store.getters.getCurrencyIdByName(this.editedAccount.currency_name);
                this.$store.commit("createAccount", this.createdAccount);
                this.createdAccount = {};
                this.accounts = this.$store.getters.getAccounts;
                this.dialog = false;
            },
        }
    }
</script>

<style scoped>

</style>
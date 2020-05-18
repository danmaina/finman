<template>
    <v-dialog
            v-model="editAccountDialog"
            dark
            max-width="400"
            @close="setDialogToFalse">
        <v-card>
            <v-card-title>
                Modify Account
            </v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field dark dense outlined :label="placeholders.accountName" required
                                  v-model="editedAccount.account_name" :value="editedAccount.account_name"/>
                    <v-select dark dense outlined :label="placeholders.accountCurrency" required
                              :items="currencies" v-model="editedAccount.currency_name"
                              :value="editedAccount.currency_name"/>
                    <v-text-field dark dense outlined :label="placeholders.accountBalance" type="number"
                                  required v-model="editedAccount.amount" :value="editedAccount.amount"/>
                    <v-btn dark right small class="v-btn v-btn--flat orange--text"
                           @click="editAccount">
                        Edit
                    </v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "EditAccount",
        data: () => ({
            placeholders: {
                accountName: "Account Name",
                accountCurrency: "Account Currency",
                accountBalance: "Account Balance",
            },
        }),
        props: ['editAccountDialog', 'editedAccount', 'currencies'],
        methods: {
            setDialogToFalse() {
              this.editAccountDialog = false;
            },
            editAccount() {
                if (this.selectedAccount !== null) {
                    console.log("Selected Account = ", this.selectedAccount)
                    this.selectedAccount.currency_id = this.$store.getters.getCurrencyIdByName(this.selectedAccount.currency_name);
                    this.$store.commit("updateAccount", this.editedAccount);
                    this.accounts = this.$store.getters.getAccounts
                    this.dialog = false;
                } else {
                    console.log("No Account Selected")
                }
            },
        }
    }
</script>

<style scoped>

</style>
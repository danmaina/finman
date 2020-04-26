<template>
    <v-container fluid>
        <v-row class="col-4">
            <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search Accounts"
                    single-line
                    hide-details
            ></v-text-field>
        </v-row>
        <v-flex class="xs12 sm12 lg12 md12">
            <v-data-table
                    dark
                    :headers="table.headers"
                    :items="accounts"
                    item-key="account_id"
                    :sort-by="['account_id', 'account_name', 'amount', 'iso_code']"
                    :sort-desc="[false, false, true, false]"
                    :search="search"
                    multi-sort
                    @click:row="selectAccount"
                    single-select
            >
            </v-data-table>
        </v-flex>

        <v-row>
            <v-card class="mt-5 ml-3">
                <v-card-title dark="true" class="text-center">
                    Total Balance
                </v-card-title>
                <!--                TODO: Change Text color according to money in the accounts-->
                <v-card-text class="text-center display-2 font-weight-bold green--text">
                    {{ totalAccountsSum }}
                </v-card-text>
            </v-card>
        </v-row>

        <v-app-bar absolute dark dense bottom>
            <!--            Create Account-->
            <v-btn small text dark justify="center" class="ml-4 v-btn--flat">
                <v-icon title="New Account" @click.stop="createAccountDialog = true">{{appBarIcons.create}}</v-icon>
            </v-btn>
            <v-dialog
                    v-model="createAccountDialog"
                    dark
                    max-width="400">
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
            <!--            Edit Account-->
            <v-btn small dark text color="orange" justify="center" class="ml-4 v-btn--flat">
                <v-icon title="Update Record"
                        @click.stop="validateEditAccount">
                    {{appBarIcons.edit}}
                </v-icon>
            </v-btn>
            <v-dialog
                    v-model="editAccountDialog"
                    dark
                    max-width="400">
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
            <!--            Delete Account-->
            <v-btn small dark text color="red" class=" ml-4 v-btn--flat">
                <v-icon title="Delete Record" @click.stop="validateDeleteAccount">
                    {{appBarIcons.delete}}
                </v-icon>
            </v-btn>
            <v-dialog
                    v-model="deleteAccountDialog"
                    max-width="290"
                    dark
            >
                <v-card>
                    <v-card-title>Sure?</v-card-title>
                    <v-card-text>
                        Are you sure you want to delete this account?
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                                dark
                                small
                                class="primary v-btn--flat"
                                text
                                @click="deleteAccountDialog = false"
                        >No
                        </v-btn>
                        <v-btn
                                dark
                                small
                                text
                                color="red"
                                @click="deleteAccount"
                        >Yes
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-app-bar>
    </v-container>
</template>

<script>
    export default {
        name: "Accounts",
        created() {
            this.accounts = this.$store.getters.getAccounts;
            this.currencies = this.$store.getters.getCurrencyNames;
        },
        data: () => ({
            appBarIcons: {
                create: 'mdi-bank-plus',
                edit: 'mdi-pencil-outline',
                delete: 'mdi-delete-outline',
            },
            currencies: [],
            createdAccount: {},
            editedAccount: {},
            search: '',
            accounts: [],
            placeholders: {
                accountName: "Account Name",
                accountCurrency: "Account Currency",
                accountBalance: "Account Balance",
            },
            table: {
                headers: [
                    {text: 'Id', value: 'account_id'},
                    {text: 'Account Name', value: 'account_name'},
                    {text: 'Currency Name', value: 'currency_name', sortable: false},
                    {text: 'ISO Code', value: 'iso_code'},
                    {text: 'Balance', value: 'amount'},
                ]
            },
            selectedAccount: null,

            createAccountDialog: false,
            deleteAccountDialog: false,
            editAccountDialog: false,
        }),
        methods: {
            createAccount() {
                console.log("Created Account: ", this.createdAccount);
                this.editedAccount.currency_id = this.$store.getters.getCurrencyIdByName(this.editedAccount.currency_name);
                this.$store.commit("createAccount", this.createdAccount);
                this.createdAccount = {};
                this.accounts = this.$store.getters.getAccounts;
                this.createAccountDialog = false;
            },
            editAccount() {
                // TODO: Use a v-dialog to modify the account and update vuex and the database
                if (this.selectedAccount !== null) {
                    console.log("Selected Account = ", this.selectedAccount)
                    this.selectedAccount.currency_id = this.$store.getters.getCurrencyIdByName(this.selectedAccount.currency_name);
                    this.$store.commit("updateAccount", this.editedAccount);
                    this.accounts = this.$store.getters.getAccounts
                    this.editAccountDialog = false;
                } else {
                    console.log("No Account Selected")
                }
            },
            deleteAccount() {
                this.deleteAccountDialog = false;
                if (this.selectedAccount !== null) {
                    console.log("Selected Account = ", this.selectedAccount);
                    this.$store.commit("deleteAccountById", this.selectedAccount);
                    this.accounts = this.$store.getters.getAccounts;
                } else {
                    console.log("No Account Selected")
                    // TODO: Show dialog with No account Selected Error
                }
            },
            validateEditAccount() {
                if (this.selectedAccount !== null) {
                    this.editedAccount = this.selectedAccount;
                    this.editAccountDialog = true;
                }
            },
            validateDeleteAccount() {
                if (this.selectedAccount !== null) {
                    this.deleteAccountDialog = true;
                }
            },
            selectAccount(item, row) {
                row.select(true);
                this.selectedAccount = item
                console.log(item)
            }
        },
        computed: {
            totalAccountsSum() {

                let totalAccountSum = 0

                this.accounts.forEach(account => {
                    // TODO: Add currencyConversions to calculation
                    totalAccountSum += account.amount;
                })

                return totalAccountSum;
            }
        }
    }
</script>

<style scoped>
</style>

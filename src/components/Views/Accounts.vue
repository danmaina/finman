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
        <v-flex class="xs12 sm12 lg12 md12 ">
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

        <v-app-bar absolute dark text dense bottom>
            <v-btn small dark justify="center" class="ml-4 v-btn--flat">
                <v-icon title="New Account" @click="navigateToCreateAccount">{{appBarIcons.create}}</v-icon>
            </v-btn>
            <v-btn small dark text color="orange" justify="center" class="ml-4 v-btn--flat">
                <v-icon title="Update Record" @click="navigateToEditAccount">{{appBarIcons.edit}}</v-icon>
            </v-btn>
            <v-dialog>

            </v-dialog>
            <v-btn small dark text color="red" class=" ml-4 v-btn--flat">
                <v-icon title="Delete Record" @click.stop="deleteAccountDialog = true">{{appBarIcons.delete}}</v-icon>
            </v-btn>
            <v-dialog
                v-model="deleteAccountDialog"
                max-width="290"
                dark
            >
                <v-card>
                    <v-card-title>Sure</v-card-title>
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
                        >No</v-btn>
                        <v-btn
                                dark
                                small
                                text
                                color="red"
                                @click="deleteAccount"
                        >Yes</v-btn>
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
        },
        data: () => ({
            appBarIcons: {
                create: 'mdi-bank-plus',
                edit: 'mdi-pencil-outline',
                delete: 'mdi-delete-outline',
            },
            search: '',
            accounts: [],
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
            deleteAccountDialog: false,
        }),
        methods: {
            navigateToCreateAccount() {
                // TODO: Possible convert to dialog
                this.$router.push({name: 'create_account'})
            },
            navigateToEditAccount() {
                // TODO: Use a v-dialog to modify the account and update vuex and the database
                if (this.selectedAccount !== null) {
                    console.log("Selected Account = ", this.selectedAccount)
                } else {
                    console.log("No Account Selected")
                }
            },
            deleteAccount() {
                this.deleteAccountDialog = false;
                // TODO: use a v-dialog to confirm delete the account and delete if the user accepts or leave as is if the user refuses
                if (this.selectedAccount !== null) {
                    console.log("Selected Account = ", this.selectedAccount)
                } else {
                    console.log("No Account Selected")
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

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
                <v-icon title="New Account" @closed="createAccountDialogToFalse" @click.stop="createAccountDialog = true">{{appBarIcons.create}}</v-icon>
            </v-btn>
            <create-account :create-account-dialog="createAccountDialog" :currencies="currencies" @closed="createAccountDialogToFalse"></create-account>

            <!--            Edit Account-->
            <v-btn small dark text color="orange" justify="center" class="ml-4 v-btn--flat">
                <v-icon title="Update Record"
                        @click.stop="validateEditAccount">
                    {{appBarIcons.edit}}
                </v-icon>
            </v-btn>
            <edit-account :edit-account-dialog="editAccountDialog" :edited-account="editedAccount" :currencies="currencies"></edit-account>

            <!--            Delete Account-->
            <v-btn small dark text color="red" class=" ml-4 v-btn--flat">
                <v-icon title="Delete Record" @click.stop="validateDeleteAccount">
                    {{appBarIcons.delete}}
                </v-icon>
            </v-btn>
            <confirm-delete :delete-account-dialog="deleteAccountDialog" :selected-account="this.selectedAccount"></confirm-delete>
        </v-app-bar>
    </v-container>
</template>

<script>
    import CreateAccount from "./Dialogs/Accounts/CreateAccount";
    import EditAccount from "./Dialogs/Accounts/EditAccount";
    import ConfirmDelete from "./Dialogs/Accounts/DeleteAccount";
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
            editedAccount: {},
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

            createAccountDialog: false,
            editAccountDialog: false,
            deleteAccountDialog: false,
        }),
        methods: {
            createAccountDialogToFalse(value) {
              this.createAccountDialog = value;
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
        },
        components: {
            CreateAccount,
            ConfirmDelete,
            EditAccount
        }
    }
</script>

<style scoped>
</style>

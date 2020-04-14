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
                    dense
            />
        </v-flex>
        <v-app-bar absolute dark dense bottom>
            <v-btn small dark justify="center" class="primary ml-4 v-btn--flat">
                <v-icon title="New Account" @click="navigateToCreateAccount">{{appBarIcons.create}}</v-icon>
            </v-btn>
            <v-btn small dark color="orange" justify="center" class="ml-4 v-btn--flat">
                <v-icon title="Update Record">{{appBarIcons.edit}}</v-icon>
            </v-btn>
            <v-btn small dark color="red" class=" ml-4 v-btn--flat">
                <v-icon title="Delete Record">{{appBarIcons.delete}}</v-icon>
            </v-btn>
        </v-app-bar>
    </v-container>
</template>

<script>
    import models from "../../database/model";

    export default {
        name: "Accounts",
        mounted() {
            this.accounts = models.accounts();

            console.log("Retrieved Accounts: ", this.accounts);
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
            }
        }),
        methods: {
            navigateToCreateAccount() {
                this.$router.push({name: 'create_account'})
            },
            navigateToEditAccount() {

            },
            navigateToDeleteAccount() {

            }
        }
    }
</script>

<style scoped>

</style>

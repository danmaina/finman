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
                    v-model="accounts"
            >

            </v-data-table>
        </v-flex>
    </v-container>
</template>

<script>
    import models from "../../database/model";

    export default {
        name: "Accounts",
        created() {
            this.accounts = models.accounts();

            console.log("Retrieved Accounts: ", this.accounts);
        },
        data: () => ({
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
        })
    }
</script>

<style scoped>

</style>

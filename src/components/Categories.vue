<template>
    <v-container fluid>
        <v-row class="col-4">
            <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search Categories"
                    single-line
                    hide-details
            ></v-text-field>
        </v-row>
        <v-flex class="xs12 sm12 lg12 md12 ">
<!--            TODO: Switch this to treeview-->
            <v-data-table
                    dark
                    :headers="table.headers"
                    :items="categories"
                    item-key="category_id"
                    :sort-by="['category_id', 'category_name', 'category_type']"
                    :search="search"
                    multi-sort
                    @click:row="selectCategory"
                    single-select
            >
            </v-data-table>
        </v-flex>
    </v-container>
</template>

<script>
    export default {
        name: "Categories",
        created() {
            this.categories = this.$store.getters.getCategories;
        },
        data: () => ({
            categories: [],
            search: '',
            table: {
                headers: [
                    {text: 'Id', value: 'category_id'},
                    {text: 'Category Name', value: 'category_name'},
                    {text: 'Category Type', value: 'category_type', sortable: false}
                ]
            },
            selectedCategory: {}
        }),
        methods: {
            selectCategory(item, row) {
                row.select(true);
                this.selectedCategory = item
                console.log("Selected Row", item)
            }
        }
    }
</script>

<style scoped>

</style>

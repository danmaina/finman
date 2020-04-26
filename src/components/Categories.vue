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
        <v-flex class="xs12 sm12 lg12 md12">
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
        <v-app-bar absolute dark dense bottom>
            <!--            Create Category-->
            <v-btn small dark text justify="center" class="ml-4 v-btn--flat">
                <v-icon title="New Category">{{appBarIcons.create}}</v-icon>
            </v-btn>

            <!--            Edit Category-->
            <v-btn small dark text color="orange" justify="center" class="ml-4 v-btn--flat">
                <v-icon title="Update Category name">
                    {{appBarIcons.edit}}
                </v-icon>
            </v-btn>

            <!--            Delete Category-->
            <v-btn small dark text color="red" class=" ml-4 v-btn--flat">
                <v-icon title="Delete Category">
                    {{appBarIcons.delete}}
                </v-icon>
            </v-btn>
        </v-app-bar>
    </v-container>
</template>

<script>
    export default {
        name: "Categories",
        created() {
            this.categories = this.$store.getters.getCategories;
        },
        data: () => ({
            appBarIcons: {
                create: 'mdi-briefcase-plus',
                edit: 'mdi-pencil-outline',
                delete: 'mdi-delete-outline',
            },
            table: {
                headers: [
                    {text: 'Id', value: 'category_id'},
                    {text: 'Category Name', value: 'category_name'},
                    {text: 'Category Type', value: 'currency_type'}
                ]
            },
            categories: [],
            search: '',
            selectedCategory: []
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

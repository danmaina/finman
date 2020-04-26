<template>
    <v-app>
        <v-navigation-drawer
                v-model="drawer"
                :color="color"
                :expand-on-hover="expandOnHover"
                :mini-variant="miniVariant"
                :right="right"
                fixed
                permanent
                dark
                app
        >
            <v-list
                    dense
                    nav
                    class="py-0"
            >
                <v-divider></v-divider>

                <v-list-item
                        v-for="item in menus"
                        :key="item.title"
                        link
                        :to="item.route"
                >
                    <v-list-item-icon :title="item.title">
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-content>
            <v-container
                    fluid
            >
                <router-view/>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import model from "./database/model";

    export default {
        created() {
            this.$vuetify.theme.dark = true;

            this.$store.commit('setAccounts', model.accounts());
            this.$store.commit('setCategories', model.categories());
            this.$store.commit('setCurrencies', model.currencies());
            this.$store.commit('setPayees', model.payees());
            this.$store.commit('setTransactions', model.transactions(0, 10));
        },
        name: 'App',
        data: () => ({
            drawer: true,
            menus: [
                {title: 'Overview', icon: 'mdi-view-dashboard', route: '/'},
                {title: 'Accounts', icon: 'mdi-bank', route: '/accounts'},
                {title: 'Transactions', icon: 'mdi-cash', route: '/transactions'},
                {title: 'Categories', icon: 'mdi-briefcase', route: '/categories'},
                {title: 'Payees', icon: 'mdi-account', route: '/payees'},
                {title: 'Budget', icon: 'mdi-align-vertical-bottom', route: '/budget'},
                {title: 'Reports', icon: 'mdi-trending-up', route: '/reports'},
            ],
            color: 'dark',
            colors: [
                'primary',
                'black',
                'success',
                'red',
                'teal',
            ],
            right: false,
            miniVariant: true,
            expandOnHover: false,
            background: false,
        }),
    };
</script>

<style>
    .dark {
        background-color: #333333;
        color: white;
        height: 100vh;
        width: 100%;
        overflow-x: hidden;
        overflow-y: hidden;
    }
</style>

<template>
    <v-container class="dark">
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
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-container fluid class="col-10">
                <router-view/>
        </v-container>
    </v-container>
</template>

<script>
    export default {
        name: 'App',
        data: () => ({
            drawer: true,
            menus: [
                {title: 'Overview', icon: 'mdi-view-dashboard', route: '/'},
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
            expandOnHover: true,
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

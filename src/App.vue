<template>
    <v-container>
        <v-navigation-drawer
                v-model="drawer"
                :color="color"
                :expand-on-hover="expandOnHover"
                :mini-variant="miniVariant"
                :right="right"
                fixed
                permanent
                dark
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
            <v-row>
                <router-view/>
            </v-row>
        </v-container>
    </v-container>
</template>

<script>

    export default {
        name: 'App',
        data: () => ({
            drawer: true,
            menus: [
                {title: 'Overview', icon: 'mdi-view-dashboard'},
                {title: 'Budget', icon: 'mdi-align-vertical-bottom'},
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

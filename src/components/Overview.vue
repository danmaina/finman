<template>
      <v-container fluid>
            <v-row align="top" justify="left">
                  <h1>Simple content</h1>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aperiam culpa deleniti doloribus ea
                        earum eligendi error est et fuga ipsa iste maiores, minus nemo nisi perspiciatis quibusdam sed
                        voluptatum.</p>
            </v-row>
            <v-row justify="center">
                  <v-app-bar absolute dense dark bottom="true">
                        <v-btn small dark justify="center" class="primary ml-4 v-btn--flat">
                              <v-icon title="New Transaction">{{appBarIcons.newTransaction}}</v-icon>
                        </v-btn>
                        <v-btn small dark class="primary ml-4 v-btn--flat">
                              <v-icon title="New Account">{{appBarIcons.newAccount}}</v-icon>
                        </v-btn>
                        <v-btn small dark class="primary ml-4 v-btn--flat">
                              <v-icon title="New Category">{{appBarIcons.newCategory}}</v-icon>
                        </v-btn>
                        <v-btn small dark class="primary ml-4 v-btn--flat">
                              <v-icon title="New Payee">{{appBarIcons.newPayee}}</v-icon>
                        </v-btn>
                  </v-app-bar>
            </v-row>
      </v-container>
</template>

<script>
      export default {
            name: 'home',

            data: () => ({
                  appBarIcons: {
                        newTransaction: 'mdi-cash-multiple',
                        newAccount: 'mdi-bank-plus',
                        newCategory: 'mdi-briefcase-plus',
                        newPayee: 'mdi-briefcase-account',
                  }
            }),
      }
</script>

<style scoped>
      .contents-center {
            margin: 0 auto;
      }
</style>

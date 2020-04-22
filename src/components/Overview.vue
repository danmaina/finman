<template>
      <v-container fluid>
            <v-row>
                  <h1>Simple content</h1>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aperiam culpa deleniti doloribus ea
                        earum eligendi error est et fuga ipsa iste maiores, minus nemo nisi perspiciatis quibusdam sed
                        voluptatum.</p>
            </v-row>
            <v-row justify="center">
                  <v-app-bar absolute dense dark bottom>
                        <v-btn small text dark justify="center" class="ml-4 v-btn--flat"
                               @click="navigateToNewTransaction">
                              <v-icon title="New Transaction">{{appBarIcons.newTransaction}}</v-icon>
                        </v-btn>
                        <v-btn small text dark class="ml-4 v-btn--flat" @click="navigateToNewAccount">
                              <v-icon title="New Account">{{appBarIcons.newAccount}}</v-icon>
                        </v-btn>
                        <v-btn small text dark class="ml-4 v-btn--flat" @click="navigateToNewCategory">
                              <v-icon title="New Category">{{appBarIcons.newCategory}}</v-icon>
                        </v-btn>
                        <v-btn small text dark class="ml-4 v-btn--flat" @click="navigateToNewPayee">
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
                        newTransaction: 'mdi-cash-plus',
                        newAccount: 'mdi-bank-plus',
                        newCategory: 'mdi-briefcase-plus',
                        newPayee: 'mdi-account-multiple-plus',
                  }
            }),
            methods: {
                  navigateToNewAccount() {
                        this.$router.push({name: 'create_account'})
                  },
                  navigateToNewTransaction() {
                        this.$router.push({name: "create_transaction"})
                  },
                  navigateToNewCategory() {
                        this.$router.push({name: "create_category"})
                  },
                  navigateToNewPayee() {
                        this.$router.push({name: "create_payee"})
                  }
            }
      }
</script>

<style scoped>
      .contents-center {
            margin: 0 auto;
      }
</style>

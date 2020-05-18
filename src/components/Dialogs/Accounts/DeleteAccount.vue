<template>
    <v-dialog
            v-model="deleteAccountDialog"
            max-width="290"
            dark
            @close="setDialogToFalse"
    >
        <v-card>
            <v-card-title>Sure?</v-card-title>
            <v-card-text>
                Are you sure you want to delete this account?
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                        dark
                        small
                        class="primary v-btn--flat"
                        text
                        @click="setDialogToFalse"
                >No
                </v-btn>
                <v-btn
                        dark
                        small
                        text
                        color="red"
                        @click="deleteAccount"
                >Yes
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "ConfirmDelete",
        props: ['deleteAccountDialog', 'selectedAccount'],
        methods: {
            setDialogToFalse() {
                this.deleteAccountDialog = false;
            },
            deleteAccount() {
                if (this.selectedAccount !== null) {
                    console.log("Selected Account = ", this.selectedAccount);
                    this.$store.commit("deleteAccountById", this.selectedAccount);
                } else {
                    console.log("No Account Selected")
                }

                this.dialog = false;
            }
        }
    }
</script>

<style scoped>

</style>
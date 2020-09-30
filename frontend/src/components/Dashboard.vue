<template>
    <main>
        <ConnectedHeader/>
        <b-jumbotron id="dashboard">
        
            <template v-slot:header>Welcome!</template>

            

            <b-tabs content-class="mt-3">
                <b-tab title="List-contacts"><ContactsList/></b-tab>
                <b-tab title="Add-contact"><AddContactForm/></b-tab>               
            </b-tabs>  


            <b-button variant="danger" @click="deleteAccount">Delete account</b-button>
            <p v-if="status === 'failure'">Something went wrong, please try again</p>       
            

        </b-jumbotron> 
    </main>
      
</template>

<script>
import ContactsList from "./ContactsList"
import AddContactForm from "./AddContactForm"
import ConnectedHeader from "./ConnectedHeader"

export default {
    name: "Dashboard",
    components: {
        ConnectedHeader,
        ContactsList,
        AddContactForm
    },
    data: function() {
        return{
            status: null
        }
    },
    methods: {
        deleteAccount: async function() {
            try {
                await this.axios.delete('http://localhost:8080/deleteAllContacts/' + this.$store.state.id, {headers: {token: this.$store.state.token}})
                await this.axios.delete('http://localhost:8080/delete/' + this.$store.state.id, {headers: {token: this.$store.state.token}})
                this.$router.push("/")
            } catch (err) {
                this.status = 'failure'
                console.log(err);
            }
        }
    }
}
</script>

<style scoped>
    #dashboard {
        text-align: center;
    }
</style>
<template>
    <main>
        <ConnectedHeader/>
        <b-jumbotron id="dashboard">
        
            <template v-slot:header>Welcome!</template>

            

            <b-tabs content-class="mt-3">
                <b-tab title="List-contacts"><ContactsList/></b-tab>
                <b-tab title="Add-contact"><AddContactForm/></b-tab>               
            </b-tabs> 

            

            <!-- <b-form> -->
                <!-- <p id="error" v-if="status === 'error'">Error: authentication failed</p>
                <p id="incomplete" v-else-if="status === 'incomplete'">Information incomplete</p> -->
                <!-- <b-form-group label="Email:" label-for="inputEmail"> -->
                    <!-- <b-form-input id="inputEmail" v-model="email" required placeholder="Enter your email"></b-form-input> -->
                <!-- </b-form-group> -->
                <!-- <b-form-group label="Password:" label-for="inputPassword">
                    <b-form-input id="inputPassword" v-model="password" required placeholder="Enter your password"></b-form-input>
                </b-form-group> -->

                <!-- <b-button variant="danger" @click="deleteAccount">Delete Account</b-button>    -->
            <!-- </b-form> -->
            

        </b-jumbotron> 
    </main>
      
</template>

<script>
import ContactsList from "./ContactsList"
import AddContactForm from "./AddContactForm"
import ConnectedHeader from "./ConnectedHeader"

export default {
    name: "Dashboard",
    // data: function() {
    //     return {
    //         email: null
    //     }
    // },
    components: {
        ConnectedHeader,
        ContactsList,
        AddContactForm
    },
    methods: {
        
        // deleteAccount: function() {
        //     this.axios.delete("http://localhost:8080/delete", {});
        // }
    }
}
</script>

<style scoped>
    #dashboard {
        text-align: center;
    }
</style>
<template>
    <main>
        <ConnectedHeader/>
        <b-jumbotron id="dashboard">
        
            <template v-slot:header>Dashboard</template>

            <template v-slot:lead>
            Just an ugly dashboard :(
            </template>

            <hr class="my-4">  

            

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
import ConnectedHeader from "./ConnectedHeader"
export default {
    name: "Dashboard",
    // data: function() {
    //     return {
    //         email: null
    //     }
    // },
    components: {
        ConnectedHeader
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
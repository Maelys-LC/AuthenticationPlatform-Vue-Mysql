<template>
     <b-jumbotron id="dashboard">
        <template v-slot:header>Dashboard</template>

        <template v-slot:lead>
        Just an ugly dashboard :(
        </template>

        <hr class="my-4">  

        <b-button variant="danger" @click="signOut">Sign-Out</b-button>   

    </b-jumbotron>   
</template>

<script>
export default {
    name: "Dashboard",
    methods: {
        signOut: function() {
            this.$store.dispatch("DELETE_TOKEN")

            this.$router.push("/")
        }
    }
}
</script>

<style scoped>
    #dashboard {
        text-align: center;
    }
</style>
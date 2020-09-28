<template>
  
  <b-navbar toggleable type="dark" variant="dark">
    <b-navbar-brand href="#">Dashboard</b-navbar-brand>
    <b-navbar-brand>{{name}}</b-navbar-brand>
    <b-button variant="danger" @click="signOut">Sign-Out</b-button>    
  </b-navbar>

</template>

<script>
export default {
    name: "ConnectedHeader",
    computed : {
        name: function() {
            return this.$store.state.name
        }
    },
    methods: {
        signOut: function() {
            this.$store.dispatch("DELETE_TOKEN")

            this.$router.push("/")
        }
    }
}
</script>

<style>

</style>
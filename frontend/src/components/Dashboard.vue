<template>
     <b-jumbotron id="dashboard">
        <template v-slot:header>Dashboard</template>

        <template v-slot:lead>
        Just an ugly dashboard :(
        </template>

        <hr class="my-4">     

    </b-jumbotron>   
</template>

<script>
export default {
    name: "Dashboard"
}
</script>

<style scoped>
    #dashboard {
        text-align: center;
    }
</style>
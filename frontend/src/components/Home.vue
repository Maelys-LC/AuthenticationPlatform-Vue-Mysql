<template>
    <b-jumbotron id="home">
        <template v-slot:header>Connexion Interface</template>

        <template v-slot:lead>
        Use this formulary to sign-up or sign-in in our application!
        </template>

        <hr class="my-4">

        <FormHandler/>

    </b-jumbotron>    
</template>

<script>
import FormHandler from './FormHandler.vue'

export default {
    name: "Home",
    components: {
        FormHandler
    }
}
</script>

<style scoped>
    #home {
        text-align: center;
    }
</style>
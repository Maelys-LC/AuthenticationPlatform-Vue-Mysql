<template>
    <b-tabs content-class="mt-3">
        <b-tab title="Sign-Up"><SignUpForm/></b-tab>
        <b-tab title="Sign-In"><SignInForm/></b-tab>               
    </b-tabs> 
</template>

<script>
import SignUpForm from './SignUpForm.vue'
import SignInForm from './SignInForm.vue'

export default {
    name: "FormHandler",
    components: {
        SignUpForm,
        SignInForm
    }
}
</script>
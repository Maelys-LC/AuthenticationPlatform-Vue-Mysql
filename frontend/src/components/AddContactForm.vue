<template>
    <b-form>
        <p id="success" v-if="status === 'success'">Registration successfull</p>
        <p id="failure" v-else-if="status === 'failure'">Registration failed, please try again</p>

        <b-form-group labem="Name:" label-for="inputName">
            <b-form-input id="inputName" v-model="name" placeholder="Enter the name of your contact" :class="!$v.name.minLength ? 'inputError':''"></b-form-input>
        </b-form-group>
        <div class="required" v-if="!$v.name.required">Field is required</div>
        <div class="error" v-if="!$v.name.minLength">Name must have at least {{$v.name.$params.minLength.min}} letters.</div>
        
        <b-form-group label="Email:" label-for="inputMail">
            <b-form-input id="inputMail" v-model="email" placeholder="Enter the email of your contact" :class="!$v.email.email ? 'inputError':''"></b-form-input>
        </b-form-group>
        <div class="required" v-if="!$v.email.required">Field is required</div>
        <div class="error" v-if="!$v.email.email">Invalid email</div>

        

        <br><br>

        <b-button variant="success" @click="add">Add</b-button>
    </b-form>
    
</template>

<script>
import { required, minLength, email} from 'vuelidate/lib/validators'

export default {
    name: "AddContactForm",
    data: function() {
        return {
            name: null,
            email: null,
            status: null
        }
    },
    validations: {
        name: {
            required,
            minLength: minLength(3)
        },
        email: {
            required,
            email
        }
    }, 
    methods: {
        add:  async function(){
            if (this.name && this.email) {
                this.$v.$touch()

                if(this.$v.$invalid){
                    this.status= 'failure'
                } else {
                    try {
                        let contact = {
                            name: this.name,
                            email: this.email,
                            user_affiliate: this.$store.state.id
                        }
                        await this.axios.post('http://localhost:8080/add-new-contact', contact, {headers: {token: this.$store.state.token}})
                        
                        this.status = "success"
                        
                        this.$store.dispatch("new_contact", contact)


                        
                    } catch (err) {
                        this.status = "failure"
                        console.log(err);
                    }
                }
            }
            this.name = ""
            this.email = ""
        }
    }
}
</script>

<style>

</style>
<template>
    <div id="form">
        <b-form>
            <p id="error" v-if="status === 'error'">Error: authentication failed</p>
            <!-- <p id="incomplete" v-else-if="status === 'incomplete'">Information incomplete</p> -->
            <b-form-group label="Email:" label-for="inputMail">
                <b-form-input id="inputMail" v-model="email" required placeholder="Enter your email" :class="!$v.email.email ? 'inputError':''"></b-form-input>
            </b-form-group>
            <div class="required" v-if="!$v.email.required">Field is required</div>
            <div class="error" v-if="!$v.email.email">Invalid email</div>

            <br><br>
            <b-form-group label="Password:" label-for="inputPwd">
                <b-form-input id="inputPwd" type="password" v-model="password" required placeholder="Enter your password" :class="!$v.password.minLength ? 'inputError':''"></b-form-input>
            </b-form-group>
             <div class="required" v-if="!$v.password.required">Field is required</div>
            <div class="error" v-if="!$v.password.minLength">Password must have at least {{$v.password.$params.minLength.min}} characters.</div>

            <br><br>

            <b-button variant="success" @click="signIn">Sign-In</b-button>
        </b-form>
    </div>     
</template>

<script>
import { required, minLength, email} from 'vuelidate/lib/validators'
// import jwt_decode from "jwt-decode";
import jwt from 'jsonwebtoken'


export default {
    name: "SignInForm",
    data: function() {
        return {
            email: "",
            password: "",
            status: ""               
        }
    },
    validations: {
        email: {
            required,
            email
        },
        password: {
            required,
            minLength: minLength(8)
        }
    },  
    methods: {
        signIn: async function() {
            if(this.email && this.password) {
                this.$v.$touch()

                if (this.$v.$invalid) {
                    this.status= 'error'
                } else {
                    try {
                        let result = await this.axios.post('http://localhost:8080/sign-in', {
                            email: this.email,
                            password: this.password
                        })
                        

                        if (result.data.auth) {
                            let token = result.data.token
                            let decoded = jwt.verify(token, 'limeisbestdriver')                   
                            
                            this.$store.dispatch("ADD_TOKEN", token)
                            this.$store.dispatch("CONNECT_USER", decoded)
                        
                            let contacts = await this.axios.get("http://localhost:8080/get-contacts/" + this.$store.state.id, {headers: {token: this.$store.state.token}})
                        
                            this.$store.dispatch("add_contacts", contacts.data)
                            this.$router.push("/dashboard")

                        }

                    } catch {
                        this.status = "error"
                    }                
                } 
            } 
            this.email = ""
            this.password = ""
        }
    }
}
</script>

<style scoped>
    #form {
        text-align: left;
    }
    #error, #incomplete {       
        color: red;
    }
    .required {
        font-style: italic;
        color: gray;
    }
    .error {
        color: red;
    }
    .inputError {
        border: 2px solid red;
    }
</style>
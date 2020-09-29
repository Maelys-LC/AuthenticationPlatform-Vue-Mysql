<template>
    <b-form id="form">
        <p id="success" v-if="status === 'success'">Registration successfull</p>
        <p id="failure" v-else-if="status === 'failure'">Registration failed, please try again</p>
        <!-- <p id="incomplete" v-else-if="status === 'incomplete'">Information incomplete</p> -->
        <p id="exists" v-else-if="status === 'exists'">E-mail already registered</p>
        <p id="exists" v-else-if="status === 'name exists'">Name already taken</p>
        <br> <br>

        <b-form-group label="Name:" label-for="inputName">
            <b-form-input id="inputName" v-model="name" required placeholder="Enter your name" :class="!$v.name.minLength ? 'inputError':''">></b-form-input>
        </b-form-group>
        <div class="required" v-if="!$v.name.required">Field is required</div>
        <div class="error" v-if="!$v.name.minLength">Name must have at least {{$v.name.$params.minLength.min}} letters.</div>
       
        <br><br>
        <b-form-group label="Email:" label-for="inputEmail">
            <b-form-input id="inputEmail" v-model="email" required placeholder="Enter your email" :class="!$v.email.email ? 'inputError':''"></b-form-input>
        </b-form-group>
        <div class="required" v-if="!$v.email.required">Field is required</div>
        <div class="error" v-if="!$v.email.email">Invalid email</div>

        <br><br>
        <b-form-group label="Password:" label-for="inputPassword">
            <b-form-input id="inputPassword" type="password" v-model="password" required placeholder="Enter your password" :class="!$v.password.minLength ? 'inputError':''"></b-form-input>
        </b-form-group>
        <div class="required" v-if="!$v.password.required">Field is required</div>
        <div class="error" v-if="!$v.password.minLength">Password must have at least {{$v.password.$params.minLength.min}} characters.</div>

        <br><br>
        <b-button variant="success" @click="signUp">Sign-Up</b-button>
    </b-form>
</template>

<script>
import { required, minLength, email} from 'vuelidate/lib/validators'
import jwt_decode from "jwt-decode";

export default {
    name: "SignUpForm",
    data: function() {
        return {
            name: "",
            email: "",
            password: "",
            status: ""              
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
        },
        password: {
            required,
            minLength: minLength(8)
        }
    },    
    methods: {
        signUp: async function() {
            if(this.name && this.email && this.password) {

                this.$v.$touch()
                if (this.$v.$invalid) {
                    this.status= 'failure'
                } else {
                    try {
                        let result = await this.axios.post('http://localhost:8080/sign-up', {
                            name: this.name,
                            email: this.email,
                            password: this.password
                        })

                        if (result.data.auth) {
                            this.status = "success"
                            let token = result.data.token
                            let decoded = jwt_decode(token)  
                                                
                            this.$store.dispatch("ADD_TOKEN", token)
                            this.$store.dispatch("CONNECT_USER", decoded) 
                            this.$router.push("/dashboard")  
                        } else if (result.data === "Exists") {
                            this.status = "exists"
                        } else if (result.data === "Name exists") {
                            this.status = "name exists"
                        }

                        
                                            
                        
                    } catch (err) {
                        this.status = "failure" 
                        console.log(err);                   
                    }               
                }  
            }
            this.name = ""
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
    #success {
        color: green;
    }
    #failure, #incomplete, #exists {
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
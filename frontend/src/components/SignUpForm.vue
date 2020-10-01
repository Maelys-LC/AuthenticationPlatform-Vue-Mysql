<template>
    <b-form id="form">
        <p id="success" v-if="status === 'success'">Registration successfull</p>
        <p id="failure" v-else-if="status === 'failure'">Registration failed, please try again</p>
        
        <p id="exists" v-else-if="status === 'exists'">E-mail already registered</p>
        <p id="exists" v-else-if="status === 'name exists'">Name already taken</p>
        <br> <br>

        <b-form-group label="Name:" label-for="inputName">
            <b-form-input id="inputName" v-model="name" required placeholder="Enter your name" @input="$v.name.$touch()" :class="{ inputError: $v.name.$error == true }"></b-form-input>
        </b-form-group>
        <div v-if="$v.name.$dirty">
            <p class="error" v-if="!$v.name.required">Field is required</p>
            <p class="error" v-if="!$v.name.minLength">Name must have at least {{$v.name.$params.minLength.min}} letters.</p>
        </div>
        
       
        <br><br>
        <b-form-group label="Email:" label-for="inputEmail">
            <b-form-input id="inputEmail" v-model="email" required placeholder="Enter your email" @input="$v.email.$touch()" :class="{ inputError: $v.email.$error == true }"></b-form-input>
        </b-form-group>
        <div v-if="$v.email.$dirty">
            <p class="error" v-if="!$v.email.required">Field is required</p>
            <p class="error" v-if="!$v.email.email">Invalid email</p>
        </div>
       

        <br><br>
        <b-form-group label="Password:" label-for="inputPassword">
            <b-form-input id="inputPassword" type="password" v-model="password" required placeholder="Enter your password" @input="$v.password.$touch()" :class="{ inputError: $v.password.$error == true }"></b-form-input>
        </b-form-group>
        <div v-if="$v.password.$dirty">
            <p class="error" v-if="!$v.password.required">Field is required</p>
            <p class="error" v-if="!$v.password.minLength">Password must have at least {{$v.password.$params.minLength.min}} characters.</p>
        </div>
        

        <br><br>

        <b-form-group label="Password Check:" label-for="inputPasswordCheck">
            <b-form-input id="inputPasswordCheck" type="password" v-model="passwordcheck" required placeholder="Enter your password again" @input="$v.passwordcheck.$touch()" :class="{ inputError: $v.passwordcheck.$error == true, inputSuccess: $v.passwordcheck.$dirty && !$v.passwordcheck.$error }"></b-form-input>
        </b-form-group>
        <div v-if="$v.passwordcheck.$dirty">
            <p class="error" v-if="!$v.password.required">Field is required</p>
            <p class="error" v-if="!$v.passwordcheck.sameAsPassword">Password must be the same</p>
        </div>
        

        <br><br>
        <b-button variant="success" @click="signUp">Sign-Up</b-button>
    </b-form>
</template>

<script>
import { required, minLength, email, sameAs} from 'vuelidate/lib/validators'
import jwt from 'jsonwebtoken'

export default {
    name: "SignUpForm",
    data: function() {
        return {
            name: "",
            email: "",
            password: "",
            passwordcheck: "",
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
        },
        passwordcheck: {
            required,
            minLength: minLength(8),
            sameAsPassword: sameAs("password")
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
                            let decoded = jwt.verify(token, 'limeisbestdriver') 
                                                
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
            this.resetDatas()                
        },
        resetDatas() {      
            this.name = "";
            this.email = "";
            this.password = "";
            this.passwordcheck = "";
            this.$v.$reset();
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
    #failure, #exists {
        color: red;
    }   
    .error {
        color: red;
    }
    .inputError {
        border: 2px solid red !important;
    }
    .inputSuccess {
        border: 2px solid green !important;
    }
    
</style>
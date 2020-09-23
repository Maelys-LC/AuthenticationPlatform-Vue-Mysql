<template>
    <b-form id="form">
        <p id="success" v-if="status === 'success'">Registration successfull</p>
        <p id="failure" v-else-if="status === 'failure'">Registration failed, please try again</p>
        <p id="incomplete" v-else-if="status === 'incomplete'">Information incomplete</p>
        <p id="exists" v-else-if="status === 'exists'">E-mail already registered</p>
        <br> <br>
        <b-form-group label="Name:" label-for="inputName">
            <b-form-input id="inputName" v-model="name" required placeholder="Enter your name"></b-form-input>
        </b-form-group>
        <b-form-group label="Email:" label-for="inputEmail">
            <b-form-input id="inputEmail" v-model="email" required placeholder="Enter your email"></b-form-input>
        </b-form-group>
        <b-form-group label="Password:" label-for="inputPassword">
            <b-form-input id="inputPassword" v-model="password" required placeholder="Enter your password"></b-form-input>
        </b-form-group>

        <b-button variant="success" @click="signUp">Sign-Up</b-button>
    </b-form>
</template>

<script>
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
    methods: {
        signUp: async function() {
            if(this.name && this.email && this.password) {

                try {
                    let result = await this.axios.post('http://localhost:8080/sign-up', {
                        name: this.name,
                        email: this.email,
                        password: this.password
                    })

                    this.$store.dispatch("ADD_TOKEN", result.data.token)
                
                    if (result.data.auth) {
                        this.status = "success"
                    } else if (result.data === "Exists") {
                        this.status = "exists"
                    }
                } catch (err) {
                    this.status = "failure"                    
                }               
            } else {
                this.status = "incomplete"
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
</style>
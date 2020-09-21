<template>
    <b-form id="form">
        <p id="success">Registration successfull</p>
        <p id="failure">Registration failed, please try again</p>
        <p id="incomplete">Information incomplete</p>
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
            password: ""                
        }
    },
    methods: {
        signUp: async function() {
            if(this.name && this.email && this.password) {
                let result = await this.axios.post('http://localhost:8080/sign-up', {
                    name: this.name,
                    email: this.email,
                    password: this.password
                })
               
                if (result.data === "Success") {
                    document.getElementById("success").style.display = "inline"
                    document.getElementById("failure").style.display = "none"
                    document.getElementById("incomplete").style.display = "none"
                } else if (result.data === "Failure") {
                    document.getElementById("failure").style.display = "inline"
                    document.getElementById("success").style.display = "none"
                    document.getElementById("incomplete").style.display = "none"
                }
            } else {
                document.getElementById("incomplete").style.display = "inline"
                document.getElementById("success").style.display = "none"
                document.getElementById("failure").style.display = "none"
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
        display: none;
        color: green;
    }
    #failure {
        display: none;
        color: red;
    }
    #incomplete {
        display: none;
        color: red;
    }
</style>
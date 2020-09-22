<template>
    <div id="form">
        <b-form>
            <p id="error">Error: authentication failed</p>
            <b-form-group label="Email:" label-for="inputEmail">
                <b-form-input id="inputEmail" v-model="email" required placeholder="Enter your email"></b-form-input>
            </b-form-group>
            <b-form-group label="Password:" label-for="inputPassword">
                <b-form-input id="inputPassword" v-model="password" required placeholder="Enter your password"></b-form-input>
            </b-form-group>

            <b-button variant="success" @click="signIn">Sign-In</b-button>
        </b-form>
    </div>     
</template>

<script>
export default {
    name: "SignInForm",
    data: function() {
        return {
            email: "",
            password: ""                
        }
    },
    methods: {
        signIn: async function() {
            if(this.email && this.password) {

                try {
                    let result = await this.axios.post('http://localhost:8080/sign-in', {
                        email: this.email,
                        password: this.password
                    })

                    this.$store.dispatch("ADD_TOKEN", result.data.token)

                    if (result.data.auth) {
                        document.getElementById("error").style.display = "none"
                        this.$router.push("/dashboard")
                    }

                } catch {
                    document.getElementById("error").style.display = "inline"
                }               
                
            } else {
                document.getElementById("error").style.display = "inline"
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
    #error {
        display: none;
        color: red;
    }
</style>
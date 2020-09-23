<template>
    <div id="form">
        <b-form>
            <p id="error" v-if="status === 'error'">Error: authentication failed</p>
            <p id="incomplete" v-else-if="status === 'incomplete'">Information incomplete</p>
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
            password: "",
            status: ""               
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
                        this.$router.push("/dashboard")
                    }

                } catch {
                    this.status = "error"
                }               
                
            } else {
                this.status = "incomplete"
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
</style>
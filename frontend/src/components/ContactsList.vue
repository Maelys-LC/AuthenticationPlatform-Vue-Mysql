<template>
  <div>
    <p v-if="status === 'failure'">Something went wrong, please try again</p>
    <div v-for="element in list" :key="element.name" class="contact">
      <p>Name: {{element.name}}</p>
      <p>Email: {{element.email}}</p>
      <img src="../assets/cross.png" alt="delete icon" @click="deleteContact(element.name, element.email, element.user_affiliate)">
    </div>
    <b-button variant="danger" @click="deleteAllContacts">Delete all contacts</b-button>
  </div>
</template>

<script>
export default {
    name: "ContactsList",
    data: function() {
      return {
        list: null,
        status: null
      }
    },
    beforeMount() {
      this.getContacts()
    },
    methods: {
      getContacts: function() {
        this.list = this.$store.state.contacts
      },
      deleteContact: async function(name, email, user_affiliate) {
        let contact = {
          name: name,
          email: email,
          user_affiliate: user_affiliate
        }
        try {
          await this.axios.post('http://localhost:8080/deleteSingleContact', contact, {headers: {token: this.$store.state.token}})
          await this.$store.dispatch("deleteSingleContact", contact)
          this.getContacts()
        } catch (err) {
          this.status = 'failure'
          console.log(err);
        }        
      },
      deleteAllContacts: async function() {
        try {
          await this.axios.delete('http://localhost:8080/deleteAllContacts/' + this.$store.state.id, {headers: {token: this.$store.state.token}})
          await this.$store.dispatch("deleteAllContacts")
          this.getContacts()
        } catch (err) {
          this.status = "failure"
          console.log(err);
        }
        
      }
    }
}

</script>

<style scoped>

  .contact {
    display: flex;
    margin: auto;
    width: 50%;
    justify-content: space-between;
    align-items: center;
    border: 2px solid black;
    margin-bottom: 30px;
    padding: 10px;
  }
  p {
    width: 50%;
    text-align: center;
    margin: 0;
  }
  img {
    cursor: pointer;
    width: 3%;
  }

</style>
<template>
  <div>
    <div v-for="element in list" :key="element.name" class="contact">
      <p>Name: {{element.name}}</p>
      <p>Email: {{element.email}}</p>
    </div>
  </div>
</template>

<script>
export default {
    name: "ContactsList",
    data: function() {
      return {
        list:null
      }
    },
    beforeMount() {
      this.getContacts()
    },
    methods: {
      getContacts: function() {
        this.list = this.$store.state.contacts
      }
    }
}
</script>

<style>

  .contact {
    display: flex;
    margin: auto;
    width: 50%;
    justify-content: space-between;
    align-items: center;
    border: 2px solid black;
  }
  p {
    width: 50%;
    text-align: center;
  }

</style>
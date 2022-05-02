<template>
  <div>
    <input type="text" class="border-b-2" v-model="username" />
    <input type="password" class="border-b-2" v-model="password" />
    <button @click="signin()">signin</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: null,
      password: null,
    }
  },
  methods: {
    async signin() {
      const payload = {
        username: this.username,
        password: this.password,
      }
      try {
        const res = await this.$axios.post('/auth/login', payload)
        this.$store.dispatch('setUser', {
          token: res.data.token,
          ...res.data.user,
        })
        this.$router.push({ path: '/tasks' })
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>

<style></style>

<template>
  <div v-if="task" class="flex flex-col p-4 md:p-16 md:w-6/12">
    <button @click="backHome()" class="flex text-lg">
      <Icon name="arrow-left" class="pb-4 mt-1" />
    </button>
    <textarea
      class="text-5xl font-bold flex items-center py-2 focus:border-none focus:outline-none resize-none"
      cols="30"
      rows="1"
      @input="updateTask"
      v-model="task.title"
    ></textarea>
    <div class="flex items-center justify-between pt-3">
      <span class="bg-gray-200 px-2 flex items-center rounded">
        Date Created
        <Icon name="clock" class="mt-1 pl-1" />
      </span>

      <span class="rounded px-2 w-max text-gray-500">April 17, 2022</span>
    </div>
    <div class="flex items-center justify-between pt-3">
      <button class="bg-gray-200 px-2 flex items-center rounded">
        Status
        <Icon name="arrow-down" class="mt-1 pl-1" />
      </button>

      <span
        class="rounded px-2 w-max mr-2"
        :class="[task.bgColor, task.textColor]"
        >{{ task.status }}</span
      >
    </div>
    <hr class="my-4" />
    <span class="text-lg text-gray-500">Description</span>
    <textarea
      cols="30"
      rows="10"
      class="focus:border-none focus:outline-none mt-3"
      v-model="task.description"
      @input="updateTask"
    >
    </textarea>
  </div>
  <div v-else>
    <Loader />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('getTaskById', this.$route.params.id)
  },
  computed: {
    task() {
      return { ...this.$store.getters.task }
    },
  },
  destroyed() {
    this.$store.dispatch('getTaskById', null)
  },

  methods: {
    updateTask() {
      let payload = {
        id: this.$route.params.id,
        data: this.task,
      }
      this.$store.dispatch('updateTask', payload)
    },
    backHome() {
      this.$router.push('/')
    },
  },
}
</script>

<style></style>

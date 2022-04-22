<template>
  <div class="p-4 md:px-12 md:py-16">
    <Header />
    <div v-if="tasks" class="flex overflow-x-auto items-top">
      <TaskColumn
        class="pt-10 pr-6"
        v-for="taskList in tasks" 
        :key="taskList.t_id"
        :status="taskList.status"
        :data="taskList.list"
        :colors="[taskList.bgColor, taskList.textColor]"
      />
    </div>
    <div v-else>
      <Loader />
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  created() {
    if (!this.$store.getters.tasks) {
      this.$store.dispatch('getTasks')
    }
  },
  computed: {
    tasks() {
      return this.$store.getters.tasks
    },
    uniqueStatusData() {
      return this.$store.getters.uniqueStatus
    },
  },
}
</script>

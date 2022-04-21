<template>
  <div class="p-4 md:p-16">
    <Header />
    <div v-if="tasks" class="flex overflow-x-auto">
      <TaskColumn
        class="pt-10 pr-6"
        v-for="statusData in uniqueStatusData"
        :key="statusData.id"
        :status="statusData"
        :data="tasks"
      />
    </div>
    <div v-else>
     <Loader/>
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

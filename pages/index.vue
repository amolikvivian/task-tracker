<template>
  <div class="p-4 md:px-12 md:py-16">
    <Header />
    <div class="flex items-center py-5">
      <button @click="toggleNewStatus()" class="flex flex items-center w-2/12">
        <Icon name="plus-circle" /> <span class="p-2">Add New Status</span>
      </button>
      <div v-if="showNewStatusLabel" class="flex items-center">
        <input
          type="text"
          v-model="newStatusLabel"
          placeholder="New Status Name"
          class="focus:outline-none text-md border-l-2 border-gray-600 pl-2"
        />
        <button @click="saveNewStatus()" title="Save">
          <Icon name="check" />
        </button>
        <button @click="cancelNewStatus()" class="pl-2" title="Cancel">
          <Icon name="cross" />
        </button>
      </div>
    </div>
    <div v-if="tasks" class="flex overflow-x-auto pt-6">
      <TaskColumn
        class="px-4 py-2"
        v-for="taskList in tasks"
        :key="taskList.t_id"
        :status="
          (status = { status_id: taskList.t_id, label: taskList.status })
        "
        :class="taskList.t_id == dropzone ? 'bg-gray-100' : ''"
        :data="taskList.list"
        :colors="[taskList.bgColor, taskList.textColor]"
        @moved="moved"
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
  data() {
    return {
      showNewStatusLabel: false,
      newStatusLabel: null,
      dropzone: null,
    }
  },
  created() {
    if (!this.$store.getters.tasks) {
      this.$store.dispatch('getTasks')
    }
  },

  computed: {
    tasks() {
      return this.$store.getters.tasks
    },
  },
  methods: {
    toggleNewStatus() {
      this.showNewStatusLabel = true
    },
    saveNewStatus() {
      if (this.newStatusLabel == null || this.newStatusLabel == '') {
        this.$store.dispatch('newStatus', 'New Status')
      } else {
        this.$store.dispatch('newStatus', this.newStatusLabel)
      }
      this.showNewStatusLabel = false
      this.newStatusLabel = null
    },
    cancelNewStatus() {
      this.showNewStatusLabel = false
      this.newStatusLabel = null
    },
    moved(val) {
      this.dropzone = val
    },
  },
}
</script>

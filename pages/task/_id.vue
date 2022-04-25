<template>
  <div v-if="task" class="flex flex-col p-4 md:p-16 md:w-6/12">
    <button @click="backHome()" class="flex text-lg">
      <Icon name="arrow-left" class="pb-4 mt-1" />
    </button>
    <textarea
      class="text-4xl font-bold flex items-center py-2 focus:border-none focus:outline-none resize-none"
      cols="30"
      rows="1"
      @input="updateTask"
      v-model="task.title"
    ></textarea>
    <div class="flex items-center justify-between pt-3 text-sm">
      <span class="bg-gray-200 px-2 flex items-center rounded">
        Date Created
        <Icon name="clock" class="mt-1 pl-1" />
      </span>
      <span class="rounded px-2 w-max text-gray-600">April 17, 2022</span>
    </div>
    <div
      class="flex items-center justify-between pt-3 text-sm cursor-pointer"
      @click="changeStatus()"
    >
      <span class="bg-gray-200 px-2 flex items-center rounded"> Status </span>
      <span
        class="rounded px-2 w-max mr-2"
        :class="[statusList[currentIndex].bgColor, statusList[currentIndex].textColor]"
        >{{ statusList[currentIndex].status }}</span
      >
    </div>
    <div class="flex items-center pt-5 text-sm">
      <button
        @click="deleteTask()"
        class="text-red-400 px-1 font-medium flex items-center rounded"
      >
        Delete Task
      </button>
      <div v-if="showDeleteOptions" class="flex items-center">
        <button @click="confirmDelete()" class="pl-2" title="Confirm">
          <Icon name="check" />
        </button>
        <button @click="cancelDelete()" class="px-2" title="Cancel">
          <Icon name="cross" />
        </button>
      </div>
    </div>
    <hr class="my-4" />
    <span class="text-md text-gray-600">Description</span>
    <textarea
      cols="30"
      rows="10"
      class="focus:border-none focus:outline-none mt-3"
      v-model="task.description"
      @input="updateTask"
      placeholder="Add description here"
    >
    </textarea>
  </div>
  <div v-else>
    <Loader />
  </div>
</template>

<script>
export default {
  data() {
    return {
      task: null,
      currentIndex: 0,
      showDeleteOptions: false,
    }
  },
  mounted() {
    this.$store.dispatch('getTaskById', this.$route.params.id)
  },
  watch: {
    '$store.state.task': function () {
      this.task = { ...this.$store.getters.task }
      this.getCurrentIndex()
    },
  },
  computed: {
    statusList() {
      return this.$store.getters.statusList
    },
  },
  destroyed() {
    this.$store.dispatch('getTaskById', null)
  },
  methods: {
    updateTask() {
      let payload = {
        id: this.$route.params.id,
        ...this.task,
      }
      this.$store.dispatch('updateTask', payload)
    },
    backHome() {
      this.$router.push('/')
    },

    deleteTask() {
      this.showDeleteOptions = true
    },
    confirmDelete() {
      let payload = {
        id: this.task.id,
        status_id: this.task.status_id,
      }
      this.$store.dispatch('deleteTask', payload)
      this.$router.push('/')
      this.showDeleteOptions = false
    },
    cancelDelete() {
      this.showDeleteOptions = false
    },
    getCurrentIndex() {
      let temp = this.$store.getters.tasks
        .map((task) => {
          return task.t_id == this.task.status_id
        })
        .findIndex((ele) => {
          return ele === true
        })

        this.currentIndex = temp
    },
    changeStatus() {
      let old_tid = this.currentIndex
      this.currentIndex++
      if (this.currentIndex > this.statusList.length - 1) this.currentIndex = 0

      let payload = {
        ...this.task,
        old_tid: old_tid,
        new_tid: this.currentIndex,
      }

      this.$store.dispatch('updateStatus', payload)
    },
  },
}
</script>

<style></style>

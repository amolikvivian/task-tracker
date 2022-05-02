<template>
  <div>
    <div
      class="flex items-center justify-between mb-4 w-80"
      @mouseenter="showActions = true"
      @mouseleave="showActions = false"
    >
      <div class="flex items-center justify-around text-sm">
        <span class="rounded px-2 ml-1" :class="[colors[0], colors[1]]"
          >{{ status.label }}
        </span>
        <span class="text-gray-400 px-3 font-normal">{{ count }}</span>
      </div>
      <div class="flex" v-if="showActions">
        <button
          title="Delete Status"
          class="details-btn hover:bg-gray-200 flex items-center justify-center px-1 rounded"
          @click="deleteStatus()"
        >
          <Icon name="delete" />
        </button>
        <button
          title="Add New Task"
          class="details-btn hover:bg-gray-200 flex items-center justify-center px-1 rounded"
          @click="addTask()"
        >
          <Icon name="plus" />
        </button>
      </div>
    </div>
    <draggable
      v-model="tasks"
      group="tasks"
      @start="drag = true"
      :ghostClass="colors[0]"
      animation="400"
      :data-box="this.status.status_id"
    >
      <div v-for="(task, i) in tasks" :key="i">
        <TaskCard
          class="mt-2"
          :taskData="task"
          :data-id="task.t_id"
          @deleteTask="deleteTask(task)"
          @viewTask="toTaskPage(task.t_id)"
        />
      </div>
    </draggable>
    <button class="px-2 py-3 text-gray-400" @click="addTask()">
      <span class="text-xl">+</span> New
    </button>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import draggable from 'vuedraggable'
export default {
  props: ['status', 'colors'],
  components: {
    draggable,
  },
  data() {
    return {
      showActions: false,
      tasks: [],
      count: 0,
    }
  },
  mounted() {
    this.getTasksByStatus(this.status.status_id)
  },
  watch: {
    tasks() {
      let payload = {
        list: this.tasks,
        status_id: this.status.status_id,
      }
      this.$store.dispatch('updateTaskList', payload)
      this.count = this.tasks.length
    },
  },
  methods: {
    async getTasksByStatus(status_id) {
      if (status_id) {
        try {
          this.$axios.setToken(this.$store.state.user.token, 'Bearer')
          const res = await this.$axios.get('/task-status', {
            params: {
              status_id,
            },
          })
          this.tasks = res.data.data
        } catch (e) {
          console.log(e)
        }
      }
    },
    addTask() {
      let payload = {
        t_id: uuidv4(),
        status_id: this.status.status_id,
        title: 'New Task',
        desc: '',
      }
      this.tasks.push(payload)
    },
    deleteTask(data) {
      this.tasks = this.tasks.filter((task) => task.t_id != data.t_id)
    },
    deleteStatus() {
      console.log('Deleting Status')
    },
    toTaskPage(id) {
      this.$store.commit('SET_CURRENT_STATUS_ID', this.status.status_id)
      this.$router.push({ path: '/task/' + id })
    },
  },
}
</script>

<style></style>

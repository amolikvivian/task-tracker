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
          class="details-btn hover:bg-gray-200 flex items-center justify-center px-1 rounded"
        >
          <Icon name="dots" />
        </button>
        <button
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
      @end="drag = false"
      :ghostClass="colors[0]"
      animation="400"
      :data-box="this.status.status_id"
    >
      <div v-for="(task, i) in tasks" :key="i" :data-id="task.id">
        <TaskCard
          class="mt-2"
          :taskData="task"
          @deleteTask="deleteTask(task.id)"
          @viewTask="toTaskPage(task.id)"
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
  props: ['status', 'data', 'colors'],
  components: {
    draggable,
  },
  data() {
    return {
      showActions: false,
      tasks: [],
    }
  },
  mounted() {
    this.getTasks()
  },

  computed: {
    count() {
      return this.tasks.length
    },
  },
  methods: {
    getTasks() {
      this.tasks = this.data
    },
    addTask() {
      let payload = {
          id: uuidv4(),
          status_id: this.status.status_id,
          title: 'New Task',
          description: '',
        }
        this.$store.dispatch('addTask', payload)
    },

    deleteTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id)
      let payload = {
        id: id,
        status_id: this.status.status_id,
      }
      this.$store.dispatch('deleteTask', payload)
    },
    moveItem(e) {
      let payload = {}
      let movedTask = e.draggedContext.element
      payload = {
        ...movedTask,
        status_id: Number(e.from.attributes['data-box']['value']),
        new_tid: Number(e.to.attributes['data-box']['value']),
      }
      this.$store.dispatch('updateStatus', payload)
    },
    toTaskPage(id) {
      this.$router.push({ path: '/task/' + id })
    },
  },
}
</script>

<style></style>

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
      @end="endDrag"
      :ghostClass="colors[0]"
      animation="400"
      :move="watchMove"
      :data-box="this.status.status_id"
    >
      <div v-for="(task, i) in tasks" :key="i">
        <TaskCard
          class="mt-2"
          :taskData="task"
          :data-id="task.id"
          @deleteTask="deleteTask(task)"
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
  watch: {
    tasks() {
      let payload = {
        list: this.tasks,
        t_id: this.status.status_id,
      }
      this.$store.dispatch('updateTaskList', payload)
    },
  },
  computed: {
    count() {
      return this.tasks.length
    },
    isDropzone() {
      return this.dropzone == this.status.status_id
    },
  },
  methods: {
    getTasks() {
      this.tasks = this.data
    },
    addTask(data) {
      if (data) {
        this.$store.dispatch('addTask', data)
      } else {
        let payload = {
          id: uuidv4(),
          status_id: this.status.status_id,
          title: 'New Task',
          description: '',
        }
        this.$store.dispatch('addTask', payload)
      }
    },
    setTask(t) {
      // this.$store.dispatch('setMoveTask', t)
    },
    deleteTask(data) {
      this.tasks = this.tasks.filter((task) => task.id != data.id)
      let payload = {
        id: data.id,
        status_id: data.status_id,
      }
      this.$store.dispatch('deleteTask', payload)
    },
    deleteStatus() {
      this.$store.dispatch('deleteStatus', this.status.status_id)
    },
    toTaskPage(id) {
      this.$router.push({ path: '/task/' + id })
    },
    watchMove(e) {
      this.$emit('moved', e.to.getAttribute('data-box'))
    },
    endDrag() {
      this.$emit('moved', null)
    },
  },
}
</script>

<style></style>

<template>
  <div
    class="p-3 border border-gray-300 rounded w-80 shadow-md flex items-center justify-between"
    @mouseenter="showOptions = true"
    @mouseleave="showOptions = false"
  >
    <span>{{ taskData.title }}</span>
    <div class="flex">
      <button
        v-if="showOptions"
        class="details-btn flex items-center justify-center px-2"
        @click="deleteTask()"
      >
        <Icon name="delete" />
      </button>
      <button
        v-if="showOptions"
        class="details-btn flex items-center justify-center px-2"
        @click="viewTask()"
      >
        <Icon name="eye" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['taskData'],
  data() {
    return {
      showOptions: false,
    }
  },
  methods: {
    viewTask() {
      this.$emit('viewTask')
    },
    deleteTask() {
      this.$emit('deleteTask')
    },
  },
}
</script>

<style></style>

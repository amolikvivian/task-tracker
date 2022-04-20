<template>
  <div>
    <div
      class="flex items-center justify-between mb-4"
      @mouseenter="showActions = true"
      @mouseleave="showActions = false"
    >
      <span class="rounded px-2 ml-1">To Do</span>
      <div class="flex" v-if="showActions">
        <button
          class="details-btn hover:bg-gray-200 flex items-center justify-center px-1 rounded"
        >
          <Icon name="dots" />
        </button>
        <button
          class="details-btn hover:bg-gray-200 flex items-center justify-center px-1 rounded"
        >
          <Icon name="plus" />
        </button>
      </div>
    </div>
    <TaskCard class="mt-2" />
    <button class="px-2 py-3 text-gray-400">
      <span class="text-xl">+</span> New
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showActions: false,
    }
  },
}
</script>

<style></style>

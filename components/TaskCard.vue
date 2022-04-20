<template>
  <div
    class="p-3 border border-gray-300 rounded w-80 shadow-md flex items-center justify-between"
    @mouseenter="showOptions = true"
    @mouseleave="showOptions = false"
  >
    <span>Task 1</span>
    <button
      v-if="showOptions"
      class="details-btn border border-gray-300 flex items-center justify-center px-2 rounded shadow-md"
    >
      <Icon name="dots" />
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showOptions: false,
    }
  },
}
</script>

<style></style>

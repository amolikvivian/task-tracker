<template>
  <div class="flex flex-col">
    <span class="text-4xl font-bold flex items-center">
      <Icon name="tick" />
      Task List</span
    >
    <span class="pt-2">Use this template to track your personal tasks.</span>
    <span class="pt-1">
      Click
      <button class="bg-gray-200 px-1 py-1 text-sm text-red-600 rounded">
        + New
      </button>
      to create a new task directly on this board.</span
    >
    <span class="pt-1">
      Click on the
      <span class="bg-gray-200 px-1 py-1 text-sm text-green-600 rounded"
        >status</span
      >
      in the task page to switch between options.</span
    >
  </div>
</template>

<script>
export default {
  name: 'NuxtTutorial',
}
</script>

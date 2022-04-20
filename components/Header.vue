<template>
  <div class="flex flex-col">
    <span class="text-4xl font-bold flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-10 w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M5 13l4 4L19 7"
        />
      </svg>
      Task List</span
    >
    <span class="pt-2">Use this template to track your personal tasks.</span>
    <span class="pt-1">
      Click
      <button class="bg-gray-200 px-2 py-1 text-sm text-red-600 rounded">
        + New
      </button>
      to create a new task directly on this board.</span
    >
    <span class="pt-1">
      Click an existing task to add additional context or subtasks.</span
    >
  </div>
</template>

<script>
export default {
  name: 'NuxtTutorial',
}
</script>

<template>
  <div class="preloader">
    <div class="loader"></div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.preloader {
  top: 50%;
  left: 50%;
  position: absolute;
}
.loader {
  border: 2px solid #e7e7e7;
  border-top: 2px solid #2b2b2b;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

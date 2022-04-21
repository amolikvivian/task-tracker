<template>
  <div class="preloader">
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.preloader{
	top: 50%;
	left: 50%;
	position: absolute;
}

.circle{
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background: rgb(46, 46, 46);
	animation: 2s spin linear infinite;
}

.circle:nth-child(2){
	animation-delay: .2s;
}
.circle:nth-child(3){
	animation-delay: .4s;
}


@keyframes spin{
	0%{
		transform-origin: 300% 50%;
		transform: rotate(0deg);
	}

	50%{
		transform-origin: 300% 50%;
		transform: rotate(360deg);
	}

	50.1%{
		transform-origin: -300% 50%;
		transform: rotate(360deg);
	}

	100%{
		transform-origin:-300% 50%;
		transform: rotate(0deg);
	}
}
</style>

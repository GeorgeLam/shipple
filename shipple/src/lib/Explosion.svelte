<script>
  import { fly, fade } from "svelte/transition";

  let visible = true;
  let boom = new Audio("src/assets/explosion.wav");

  boom.play();
  setTimeout(() => {
    visible = false;
  }, 800);
</script>

{#if visible}
  <div in:fly out:fade id="sprite-container">
    <div id="sprite-image" />
  </div>
{/if}

<style>
  #sprite-container {
    position: absolute;
    top: 0;
    left: 0;
  }
  #sprite-image {
    margin: 20px auto;
    height: 50px;
    width: 45px;
    background: url("/src/assets/explosion-4.png") 0px 0px;
    background-repeat: no-repeat;
    background-size: 550px 50px;
    animation: play 0.8s steps(8) infinite;
    z-index: 2;
  }
  @keyframes play {
    100% {
      background-position: -1472px;
    }
  }
</style>

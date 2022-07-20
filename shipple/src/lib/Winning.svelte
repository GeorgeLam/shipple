<script>
  import { stateReducer } from "./stores.js";
  import JSConfetti from "js-confetti";

  const jsConfetti = new JSConfetti();
  let state;

  const unsubscribe = stateReducer.subscribe((value) => {
    state = value;
  });

  if (state.isWinner) {
    jsConfetti.addConfetti({
      emojis: ["💦", "🏴‍☠️", "💥", "🚢", "💫", "🍆"],
    });
  }
</script>

<div>
  {#if state.isWinner}
    <h2 class="winning">YOU WIN!</h2>
  {:else}
    <h2 class="loser">You lose, sucker</h2>
  {/if}
</div>

<style>
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  .winning {
    padding: 20px;
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 3s ease infinite;
  }
  .loser {
    padding: 20px;
    background-color: grey;
  }
</style>

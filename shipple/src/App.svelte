<script>
  import Grid from './lib/Grid.svelte'
  import Divider from './lib/Divider.svelte'
</script>

<main>
  <h1>Shipple</h1>

  <div class="container">
    <Grid />
    <Divider />
    <Grid /> 
  </div>
</main>

<style>
  .container{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>

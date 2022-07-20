<div id="sprite-container">
  <div id="sprite-image" />
</div>

<style>
  #sprite-image {
    margin: 20px auto;
    height: 50px;
    width: 45px;
    background: url("/src/assets/explosion-4.png") 0px 0px;
    background-repeat: no-repeat;
    background-size: 550px 50px;
    animation: play 0.8s steps(8) infinite;
  }
  @keyframes play {
    100% {
      background-position: -1472px;
    }
  }
</style>

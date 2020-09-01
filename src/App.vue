<template>
  <div id="app">
    <router-view/>
    <footer class="page-footer main-pallet">
        <div class="container">
          <div class="row"></div>
        </div>
        <div class="footer-copyright">
          <div class="container">
          © 2019 Rico Correspondentes
          </div>
        </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.main-pallet{
  background-color: rgb(49,47,84);
}

.main-pallet-btn:hover{
  color: black;
  background-color: #FFF;
}

</style>

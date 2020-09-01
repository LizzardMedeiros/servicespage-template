<template>
    <nav class="nav-extended" :class="variant">
      <div class="nav-wrapper container">
        <div class="left-align">
          <a href="/" class="brand-logo valign-wrapper">
            <img src="@/assets/logo.png"/>
          </a>
        </div>
        <ul id="nav-mobile" class="right hide-on-small-only">
          <slot name="med-and-up"/>
        </ul>
      </div>
      <div class="nav-content hide-on-med-and-up show-on-small">
        <ul class="tabs tabs-transparent">
          <slot name="small"/>
        </ul>
      </div>
    </nav>
</template>

<script>
export default {
  name: 'NavbarMain',
  props:['variant'],
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  nav{
    z-index: 1000;
  }
  nav .brand-logo img{
    width: 128px;
    vertical-align: middle;
  }
</style>

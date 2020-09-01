<template>
  <div :id="unique" class="modal card" :style="'max-width:'+maxwidth">
    <div class="card-content">
      <span class="card-title left-align">{{header}}</span>
      <span class="card-close modal-close"><i class="small material-icons">cancel</i></span>
    </div>
    <div class="card-action">
      <p><slot name="content"/></p>
    </div>
    <div class="card-action right-align">
      <slot name="footer"/>
    </div>
  </div>
</template>

<script>
export default {
  props:['unique', 'header', 'maxwidth'],
  name: 'Modal',
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .card-close{
    position: absolute;
    top: 25px;
    right: 25px;
  }
</style>
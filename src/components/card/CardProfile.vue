<template>
  <div class="col m12">
    <div class="card grey lighten-5 left-align">
      <div class="container">
        <span class="card-title">{{title}} <label>{{subtitle}}</label></span>
      </div>
      <div class="card-content row valign-wrapper">
        <div v-if="picture" class="col s3">
          <img :src="picture" alt="" class="circle responsive-img"> <!-- notice the "circle" class -->
        </div>
        <div class="col">
          <span class="black-text left" style="width:100%">
            <slot/>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardProfile',
  props:[
    'picture', 'title', 'subtitle'
  ],
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

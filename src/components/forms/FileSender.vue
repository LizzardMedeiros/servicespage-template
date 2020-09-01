<template>
  <div class="row">
      <div class="input-field col s12">
          <div class="file-field input-field">
              <div class="btn main-pallet main-pallet-btn">
                  <span><i class="fas fa-paperclip left"></i>{{title}}</span>
                  <input @change="saveImage" type="file">
              </div>
              <div class="file-path-wrapper">
                  <input class="file-path validate" type="text">
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import Server from '@/components/helpers/Server';

export default {
  name: 'FileSender',
  components:{},
  props:['title','amount'],
  methods:{
    saveImage(e){
      Server.preloadFile(e);
    },
    uploadImage(){
      var data = {
        'access_token': localStorage.access_token,
        'amount': this.amount,
        'receipt' : Server.file
      }
      Server.send('payment', data);
    }
  },
  data(){
    return{
      image: null
    }
  }
}
</script>

<style>
</style>

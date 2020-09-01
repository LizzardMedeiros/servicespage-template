<template>
  <section id="banner">
    <div class="row search-container">
      <div class="wrap">
        <div class="left-align white-text">
          <h6>ENCONTRE UM CORRESPONDENTE</h6>
        </div>
         <div class="search">
            <input type="text" class="browser-default search-term" placeholder="Pesquise um correspondente por Região" v-model="loc"></input>
            <a
            :disabled="loc == '' || loc == null"
            @click="search"
            class="btn waves-effect waves-light searchButton"
            :href='"/#/?loc="+loc+"&page=0"'>
              <i class="material-icons large">search</i>
            </a>
         </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: 'BannerMain',
  components: {
  },
  methods:{
    search(){
      location.reload();
      document.getElementById('search-results').scrollIntoView();
    }
  },
  data () {
    return {
      loc: null
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   #banner{
    background-image: url("http://murrayduncanlaw.com/images/slider/brighton-dui-attorney.jpg");
    background-repeat: no-repeat;
    background-attachment: fixed;
    height: calc(65vh - 10px);
   }
   #banner .search-container{
    position: absolute;
    width: 100%;
    top: 45vh;
   }

   #banner h6{
    font-weight: 500;
   }

  .search {
    width: 100%;
    position: relative
  }

  .search-term {
    float: left;
    width: 100%;
    border: 1px solid rgb(49,47,84);
    padding: 5px;
    height: 48px;
    border-radius: 5px;
    outline: none;
    color: #9DBFAF;
  }

  .search-term:focus{
    color: rgb(49,47,84);
  }

  .searchButton {
    position: absolute;
    right: -50px;
    width: 48px;
    height: 48px;
    padding-top: 5px;
    border: 1px solid rgb(49,47,84);
    background: rgb(49,47,84);
    text-align: center;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    font-size: 20px;
  }

  /*Resize the wrap to see the search bar change!*/
  .wrap{
    width: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-55%, -50%);
  }

  @media (max-width: 600px){
     .wrap{
      width: 70%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-60%, -50%);
    }   
  }
</style>
<template>
  <div id="home" class="navbar-fixed">
    <navbar-main variant="main-pallet">
      <div slot="med-and-up">
        <li><a class="grey-text" href="#cards">Correspondentes</a></li>
        <li><a class="grey-text" href="#messages">Contato</a></li>
        <li v-if="!logged">
          <router-link class="orange-text text-lighten-1" to="/login">
            <i class="fas fa-sign-in-alt"></i>
          </router-link>
        </li>
        <li v-else>
          <a class="dropdown-trigger valign-wrapper" href="#" data-target="menu">
            <img :src="profile_pic" class="circle responsive-img" style="width: 48px; height: 48px;"/>
            <i class="material-icons right"></i>
          </a>
        </li>
      </div>
      <div slot="small" class="row">
        <li class="tab">
          <a class="grey-text" href="#messages">Contato</a>
        </li>
        <li v-if="!logged" class="tab">
          <router-link class="orange-text" to="/login">
            <i class="fas fa-sign-in-alt tiny"></i>
          </router-link>
        </li>
        <span v-else>
          <li class="tab">
            <a class="grey-text" @click="logout">
              SAIR
            </a>          
          </li>
          <li class="tab right">
            <router-link class="orange-text" to="/dashboard">
              <i class="fas fa-bars"></i>
            </router-link>          
          </li>
        </span>
      </div>
    </navbar-main>

    <ul id="menu" class="dropdown-content">
      <li>
        <router-link to="/dashboard" style="color: #312f54;">
          <i class="material-icons left">person</i>Minha Conta
        </router-link>
      </li>
      <li class="divider"></li>
      <li>
        <a @click="logout" style="color: #312f54;">
          <i class="material-icons left">exit_to_app</i>Sair
        </a>
      </li>
    </ul>

    <banner-main/>
    <section-cards :logged="logged"/>
    <section-results v-if="$route.query.loc"/>
    <section-messages/>

  </div>
</template>

<script>
import axios from "axios"
import Server from "@/components/helpers/Server"
import NavbarMain from "@/components/navbar/NavbarMain"
import BannerMain from "@/components/banner/BannerMain"
import SectionCards from "@/components/sections/SectionCards"
import SectionResults from "@/components/sections/SectionResults"
import SectionMessages from "@/components/sections/SectionMessages"

export default {
  name: 'Home',
  components: {
    NavbarMain, BannerMain, SectionCards, SectionResults, SectionMessages
  },
  created: function(){
    this.access_token = localStorage.access_token;
    if(this.access_token){
      Server.get('getuser',{access_token: this.access_token})
      .then((res) => {
        this.logged = res.user != null;
        this.profile_pic = 'https://ricocorrespondentes.com/tempt/img/profile/'+res.user.profpic;
      })
      .then(() => {
        var elems = document.querySelectorAll('.dropdown-trigger');
        var instances = M.Dropdown.init(elems, {'constrainWidth': false});
      })
    }
  },
  methods:{
    logout(){
      localStorage.removeItem("access_token");
      this.access_token = null;
      location.reload()
    }
  },
  data () {
    return {
      access_token: null,
      logged:false,
      profile_pic: "https://materializecss.com/images/yuna.jpg"
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
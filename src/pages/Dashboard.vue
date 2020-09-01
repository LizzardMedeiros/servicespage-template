<template>
  <div id="dashboard">

    <navbar-main variant="main-pallet">
      <li v-if="access_token" slot="med-and-up">
        <span class="valign-wrapper sidenav-trigger" href="#" data-target="slide-out">
          <img :src="profile.picture" class="circle responsive-img" style="width: 48px; height: 48px;"/>
        </span>
      </li>
      <li v-if="access_token" slot="small" class="right-align">
        <span class="valign-wrapper sidenav-trigger" href="#" data-target="slide-out">
          <i class="fas fa-bars"></i>
        </span>        
      </li>
    </navbar-main>

    <ul id="slide-out" class="sidenav collapsible">
      <li>
        <div class="user-view">
          <div class="background">
            <img src="http://murrayduncanlaw.com/images/slider/brighton-dui-attorney.jpg" style="height:100%"/>
          </div>
          <img class="circle" :src="profile.picture"/>
          <span class="white-text name">{{profile.name}}</span>
          <span class="white-text email">{{profile.email}}</span>
          <span>
            <a @click="changeSection('profile')" class="btn-floating btn halfway-fab waves-effect waves-light main-pallet main-pallet-btn">
              <i class="material-icons">edit</i>
            </a>
          </span>
        </div>
      </li>

      <li>
        <div class="collapsible-header" @click="changeSection('timeline')">
          <i class="fas fa-envelope"></i> Mensagens
        </div>
      </li>

      <li class="white">
        <div class="collapsible-header"><i class="material-icons">add_location</i>Nova Região</div>
        <div class="collapsible-body container">

          <h6 class="blue-text text-darken-4">Crédito: R${{parseFloat(profile.balance).toFixed(2)}}</h6>

          <select class="browser-default" v-model="regions.selected_state" @change="selectRegion()">
            <option value="" disabled selected>UF</option>
            <option v-for="state in regions.state_list" :key="state.short">{{state.short}}</option>
          </select>

          <a v-if="regions.selected_state && profile.level == 0" :href="regions.county_link" target="_blank">Procurar Comarcas</a>
          <div v-if="regions.selected_state && profile.level > 2" class="input-field col s12">
            <input id="county" type="text" v-model="regions.county_link"/>
            <label for="county" class="active">Link Comarca</label>
          </div>

          <select v-if="regions.selected_state" class="browser-default" v-model="regions.selected_city" @change="selectCity()">
            <option value="" disabled selected>Comarca</option>
            <option v-for="city in regions.city_list" :key="city.id" :value="city.id">
              {{city.city}}
            </option>
            <option value="-1">-- Adicionar Nova --</option>
          </select>

          <span v-if="regions.selected_city == -1">
            <input v-model="regions.new_city" placeholder="Nome da Cidade" type="text" class="validate"/>
          </span>

          <div v-if="regions.selected_city && profile.level >= 2" class="input-field col s12">
            <input id="c_price" type="text" v-model="regions.selected_price"/>
            <label for="c_price" class="active">Valor (R$)</label>
          </div>

          <span v-if="regions.selected_city && profile.level < 2" class="blue-text text-darken-4">Valor: R${{parseFloat(regions.selected_price).toFixed(2)}}</span>
          <div class="row">
            <div class="col s8">
              <a v-if="regions.new_city || regions.selected_city" class="waves-effect waves-light btn main-pallet main-pallet-btn" @click="buyRegion()">
                Comprar
              </a>
            </div>
            <div class="col s4">
              <a v-if="profile.level > 2 && (regions.new_city || regions.selected_city)" class="btn waves-effect waves-light btn-compact green" @click="addRegion()">
                <i class="material-icons">save</i>
              </a>
            </div>
          </div>

        </div>
      </li>
      <li>
        <div class="collapsible-header">
          <i class="material-icons">location_on</i>Minhas Regiões
        </div>
        <div class="collapsible-body">
          <p v-for="region in my_regions" :key="region.id" class="left-align container">
            <small>{{region.city}}/{{region.state_shorten}}</small>
              <a @click="changeSection('region', region)" href="#" class="right"><i class="fas fa-ellipsis-v"></i></a>
          </p>
        </div>
      </li>
      <li>
        <div class="collapsible-header">
          <i class="material-icons">phone</i>Meus Contatos
        </div>
        <div class="collapsible-body">
          <p v-for="(contact, index) in my_contacts" :key="index" class="left-align container">
            <small>{{contact[0]}} - {{contact[1]}}</small>
            <a href="#" @click="changeSection(section, contact, index)" data-target="edittel" class="modal-trigger right"><i class="fas fa-ellipsis-v"></i></a>
          </p>
          <p class="container">
            <a href="#" @click="changeSection(section)" data-target="edittel" class="modal-trigger waves-effect waves-light btn-small main-pallet main-pallet-btn"><i class="material-icons left">add</i>Adicionar</a>
          </p>
        </div>
      </li>
      <li>
        <div class="collapsible-header" @click="changeSection('credits')">
          <i class="material-icons">payment</i>Comprar Créditos
        </div>
        <div class="collapsible-body"></div>
      </li>
      <li><div class="divider"></div></li>
      <li v-if="profile.level > 2">
        <div class="collapsible-header" @click="changeSection('admin')">
          <i class="fas fa-cogs"></i> Administração
        </div>
      </li>
      <li><div class="divider"></div></li>
      <li>
        <div class="collapsible-header deep-purple lighten-5" @click="logout">
          <i class="material-icons">eject</i> Sair
        </div>
      </li>
    </ul>

    <div class="row content container">
      <div class="col m2 s12">
        <img :src="profile.picture" class="circle responsive-img" style="width: 100%; height:auto;"/> 
      </div>

      <timeline v-if="section == 'timeline'"/>
      <section-profile v-if="section == 'profile'" :data="profile" size="10"/>
      <section-region v-if="section == 'region'" :region="selected_item"/>
      <section-credits v-if="section == 'credits'" :region="selected_item"/>
      <section-admin v-if="section == 'admin'"/>
    </div>

    <modal unique="edittel" header="Contato">
      <div class="row" slot="content">
        <div class="input-field col s2">
            <input id="op" type="text" class="validate active" v-model="selected_item[0]">
            <label for="op" class="active">Operadora</label>
        </div>
        <div class="input-field col s4">
            <the-mask id="number" v-model="selected_item[1]" :mask="['(##) ####-####', '(##) #####-####']"  />
            <label for="number" class="active">Número</label>
        </div>
        <div class="switch input-field col s3">
          <label>
            <input type="checkbox" class="filled-in" checked="checked" />
            <span>Whatsapp</span>
          </label>
        </div>
        <div class="switch input-field col s3">
          <label>
            <input type="checkbox" class="filled-in" checked="checked" />
            <span>Telegram</span>
          </label>
        </div>
      </div>
      <div class="switch input-field" slot="footer">
        <a class="btn grey lighten-3 grey-text text-darken-2" href="#" @click="deleteContact(selected_item.index)">Delete</a>
        <a class="btn main-pallet main-pallet-btn" href="#" @click="updateContacts(selected_item)">Salvar</a>
      </div>
    </modal>

  </div>
</template>

<script>
import axios from "axios"
import Server from "@/components/helpers/Server"
import NavbarMain from "@/components/navbar/NavbarMain"
import Modal from "@/components/modal/Modal"
import CardProfile from "@/components/card/CardProfile"
import Timeline from "@/components/timeline/Timeline"
import SectionProfile from "@/components/sections/SectionProfile"
import SectionRegion from "@/components/sections/SectionRegion"
import SectionCredits from "@/components/sections/SectionCredits"
import SectionAdmin from "@/components/sections/SectionAdmin"

import { watch } from 'fs';

export default {
  name: 'Dashboard',
  components: {
    NavbarMain,
    Modal,
    CardProfile,
    Timeline,
    SectionProfile,
    SectionRegion,
    SectionCredits,
    SectionAdmin
  },
  created: function(){
    this.access_token = localStorage.access_token;
    if(this.access_token){
      axios.post('https://ricocorrespondentes.com/tempt/index.php/api/getuser',{
              access_token: this.access_token
            })
            .then((res) =>{
              var usr = res.data.user;
              this.profile = usr;
              this.profile.picture = 'https://ricocorrespondentes.com/tempt/img/profile/'+usr.profpic;
              this.my_regions = usr.regions;
              this.my_contacts = usr.contact_list;

              this.my_payments.payments = usr.payments;
              usr.payments.forEach(payment => {
                if(payment.status == 0) this.my_payments.opened++;
                this.my_payments.total += payment.amount;
              });
            });
      axios.get('https://ricocorrespondentes.com/tempt/index.php/api/getstatelist')
            .then((res) => {
              this.regions.state_list = res.data;
            })
    }else{
      this.$router.push('/');
    }
  },
  mounted: function(){
    $('.modal').modal();
    $(".dropdown-trigger").dropdown();
    $('.collapsible').collapsible();
    $('select').formSelect();
    $('.sidenav').sidenav();
  },
  methods:{
    changeSection(section, item=[], index=-1){

      if(item){
        this.selected_item = item;
        if(index >= 0) this.selected_item.index = index;
      }
      else this.selected_item = [];
      this.section = section;
    },
    selectRegion(){
      this.regions.state_list.forEach(s => {
        if(s.short === this.regions.selected_state){
          this.regions.county_link = s.county_link;
        }
      });
    },
    selectCity(){
      this.regions.city_list.forEach(c => {
        if(c.id === this.regions.selected_city){
          this.regions.selected_price = c.price;
        }
      });
    },
    deleteContact(index){
      if(index > -1){
        this.my_contacts.splice(index,1);
        axios.post('https://ricocorrespondentes.com/tempt/index.php/api/updatebasicuser',{
          "access_token": this.access_token,
          "contact_list": this.my_contacts
        });
      }
    },
    updateContacts(i){
      var index = this.selected_item.index;
      delete this.selected_item.index;
      if(index >= 0) this.my_contacts[index] = this.selected_item;
      else if(index == -1 || !index) this.my_contacts.push(this.selected_item);
      var dt = {access_token: this.access_token, contact_list: this.my_contacts};
      Server.send('updatebasicuser', dt, 'Sucesso ao atualizar seus contatos!');
      console.log(dt);
    },
    addContact(){

    },
    buyRegion(){
      var dt = {
        'token': this.access_token,
        'action': 'buy',
        'region_id': this.regions.selected_city,
        'newregion': {'state':this.regions.selected_state, 'city':this.regions.new_city}
      }
      Server.send('region', dt, "Região adiquirida com sucesso!");    
    },
    addRegion(){
      var dt = {
        "token": this.access_token,
        "action": 'add',
        "region": {
          'state_shorten': this.regions.selected_state,
          'city': this.regions.new_city,
          'price': parseFloat(this.regions.selected_price).toFixed(2),
          'county_link': this.regions.county_link
        }
      };
      if(this.regions.selected_city != -1){
        dt.action = 'update';
        dt.region.region_id = this.regions.selected_city;
      }
      Server.send('region', dt, "Região salva com sucesso!", true);    
    },
    logout(){
      localStorage.removeItem("access_token");
      this.access_token = null;
      location.reload()
    }
  },
  data () {
    return {
      access_token: null,
      section: 'timeline',
      profile:{},
      my_contacts:[],
      my_regions:[],
      my_payments:{
        'payments':[],
        'opened':0,
        'total':0
      },
      regions:{
        state_list:[],
        selected_state:"",
        county_link: "#",
        selected_city:"",
        selected_price:"",
        new_city:"",
        city_list:[]
      },
      selected_item:[]
    }
  },
  watch:{
    'regions.selected_state':function(){
      this.regions.city_list = [];
      this.regions.selected_city = "";
      if(this.regions.selected_state.length > 0){
        axios.post('https://ricocorrespondentes.com/tempt/index.php/api/getregionsbystate',{
          'state': this.regions.selected_state
        })
        .then((res) => {
          if(res.data.result){
            this.regions.city_list = res.data.result;
          }
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content{
    padding-top: 15px;
  }
</style>
<template>
  <section id="search-results" class="grey lighten-4">
    <div class="row container">

      <div v-for="(correspondent, index) in correspondents" :key="index" class="col s12 m4">
        <div class="card" style="height: 256px;">
          <div class="card-header card-panel main-pallet">
            <h6 class="card-title white-text">{{correspondent.name.split(" ")[0]}}</h6>
          </div>
          <div class="valign-wrapper card-stacked row">

            <div class="profile-img col m4 s12">
              <img :src="'https://ricocorrespondentes.com/tempt/img/profile/'+correspondent.profpic" alt="" class="circle responsive-img"/>
            </div>

            <div class="card-content col m8 s12">
              <p class="left-align">{{correspondent.curriculum.substring(0,96)+"..."}}</p>
              <a class="btn-floating activator halfway-fab waves-effect waves-light main-pallet main-pallet-btn"><i class="material-icons">add</i></a>
            </div>

          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">
              <img :src="'https://ricocorrespondentes.com/tempt/img/profile/'+correspondent.profpic" alt="" class="circle responsive-img left" style="width: 48px; height: 48px; vertical-align: middle;"/>
              <i class="material-icons right">close</i>
            </span>
            <p>
              <i v-for="(rate, ind) in calcRate(correspondent.ratting)" :key="ind" class="material-icons">{{rate}}</i>
            </p>
            <hr/>
            <div class="row">
              <div class="col s12">
                <ul>
                  <li class="left">
                    <i v-if="correspondent.has_certificated" class="fas fa-check green-text"></i>
                    <i v-else class="fas fa-times red-text"></i> Certificação Digital
                  </li><br>
                  <li class="left"><i class="fas fa-envelope-square"></i> {{correspondent.email}}</li><br>
                  <li v-for="(tel, i_tel) in correspondent.tel_list" :key="i_tel" class="left">
                    <i class="fas fa-phone-square"></i> {{tel[0]}} - {{tel[1]}} <br>
                  </li>
                </ul>
              </div>
            </div>
            <div class="row">
              <div class="col s12">
                <a class="waves-effect waves-light btn btn-compact main-pallet main-pallet-btn" @click="selectCorrespondent(correspondent)"><i class="fas fa-info"></i></a>
                <a class="waves-effect waves-light btn btn-compact main-pallet main-pallet-btn" @click="writeMessage(correspondent.id)"><i class="far fa-envelope"></i></a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <ul v-if="correspondents" class="pagination">
      <li v-if="page > 0" class="waves-effect">
        <a href="#">
          <i class="material-icons">chevron_left</i>
        </a>
      </li>
      <li v-if="page == 0" class="waves-effect disabled">
        <a href="#">
          <i class="material-icons">chevron_left</i>
        </a>
      </li>
      <li v-for="(page, index) in c_size" :key="index" class="active">
        <router-link class="main-pallet main-pallet-btn" v-if="(index%12 == 0)" :to="'/?loc='+loc+'&page='+parseInt(index)">{{index+1}}</router-link>
      </li>
      <li class="waves-effect disabled"><a href="#"><i class="material-icons">chevron_right</i></a></li>
    </ul>

    <modal unique="m_details" header="Detalhes">
      <div slot="content" class="row">
        <div class="card-panel grey lighten-5 z-depth-1">
          <div class="row valign-wrapper">
            <div class="col m2 s12">
              <img :src="'https://ricocorrespondentes.com/tempt/img/profile/'+selected.profpic" alt="" class="circle responsive-img"> <!-- notice the "circle" class -->
            </div>
            <div class="col m10 s12 left-align">
              <span class="black-text">
                <ul>
                  <li><h5>{{selected.name}}</h5></li>
                  <li>{{selected.curriculum}}</li>
                </ul>
              </span>
            </div>
          </div>
        </div>
        <div class="card-panel grey lighten-5 z-depth-1">
          <div class="row valign-wrapper">
            <div class="col s12 left-align">
              <span class="black-text">
                <ul>
                  <li><h5><i class="fas fa-star"></i> Avaliações</h5></li>
                  <li v-for="(evaluation, index) in selected.ratting" :key="index">
                    <i v-if="evaluation[0]" class="fas fa-thumbs-up"></i>
                    <i v-else class="fas fa-thumbs-down"></i>
                    "{{evaluation[1]}}"
                  </li>
                </ul>
              </span>
            </div>
          </div>
        </div>
      </div>
    </modal>

    <modal unique="m_message" header="Enviar Mensagem">
      <div slot="content" class="row">
          <h5 class="left-align">Envie diretamente suas dúvidas ou menssagens para este correspondente</h5>
          <div class="row">
            <div class="input-field col s12 m6">
              <input id="message_nome" type="text" data-length="10" v-model="message.name"/>
              <label for="message_nome">Seu Nome</label>
            </div>
            <div class="input-field col s12 m6">
              <input id="message_email" type="email" data-length="10" v-model="message.email"/>
              <label for="message_email">Seu E-Mail</label>
            </div>
          </div>

          <div class="row">
            <div class="input-field col s12">
              <textarea id="message_content" class="materialize-textarea" v-model="message.message"></textarea>
              <label for="message_content">Mensagem</label>
            </div>
          </div>
      </div>
      <div slot="footer">
        <a class="waves-effect waves-light btn main-pallet main-pallet-btn" @click="sendMessage"><i class="left far fa-envelope"></i> Enviar</a>
      </div>
    </modal>

  </section>
</template>

<script>
import axios from "axios";
import Modal from "@/components/modal/Modal";
import Server from "@/components/helpers/Server.js"

export default {
  name: 'SectionResults',
  components:{Modal},
  created: function(){
    this.loc = this.$route.query.loc;
    this.page = this.$route.query.page;
    if(this.loc) axios.get("https://ricocorrespondentes.com/tempt/index.php/api/searchcorrespondentbyloc?l="+this.loc+"&page="+this.page)
      .then((res) => {
        if(!res.correspondents){
          this.correspondents = res.data.result;
          this.c_size = res.data.size;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  },
  mounted: function(){
    $('.modal').modal();
    document.getElementById('search-results').scrollIntoView();
  },
  methods:{
    selectCorrespondent(c){
      this.selected = c;
      $('#m_details').modal('open');
    },
    writeMessage(to){
      this.message.to = to;
      $('#m_message').modal('open');
    },
    sendMessage(){
      Server.send('sendmessage', this.message);
    },
    calcRate(rates){
      var output = ['','','','',''];
      var positives = 0;
      var negatives = 0;
      for(var i in rates){
        if(rates[i][0]) positives++;
        else negatives++;
      }
      var total = positives+negatives;
      var rate = (total > 0) ? Math.round((positives/total)*10) : 0;
      if(rate) for(var i in output){
        var r = (parseInt(i)+1)*2;
        if(rate > r) output[i] = "star";
        else if(rate >= r-1) output[i] = "star_half";
        else output[i] = "star_border"
      }
      return output;
    }
  },
  data(){
    return{
      selected: [],
      message:{
        to:0,
        name:"",
        email:"",
        message:""
      },
      loc:"",
      page:0,
      correspondents: null,
      c_size: 0
    }
  }
}
</script>

<style>
  #search-results{
    padding: 20px 0; 
  }
  #search-results .profile-img img{
    width: 64px;
    height: 64px;
    margin-left: 15px;
    vertical-align: middle;
  } 
</style>

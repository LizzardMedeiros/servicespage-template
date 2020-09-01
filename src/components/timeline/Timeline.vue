<template>
  <section style="min-height: 100vh;">
    <div class="col m10 s12">
      <div class="col s12 left-align">
        <h4>Mensagens</h4> <h5>Veja o que há de novo!</h5>
      </div>
      <card-profile v-if="messages.length > 0">

        <div class="card-panel z-depth-1" v-for="(message, index) in messages" :key="index" :class="{'indigo lighten-5': message.sender_id == 0}">

          <a class="btn-floating btn-small waves-effect waves-light red right"
             v-bind:class="{'grey' : message.is_favorite == false}"
             @click="favorite(index)">
            <i class="fas fa-heart"></i>
          </a>

          <div class="row hide-on-med-and-up">
            <a v-if="message.receiver_id != 0" class="btn-floating btn-small waves-effect waves-light  right main-pallet main-pallet-btn modal-trigger" href="#response" @click="setSelectedMes(index)" style="margin-left:15px; margin-right:15px">
              <i class="material-icons left">border_color</i>Responder
            </a>

            <a class="btn-floating btn-small waves-effect waves-light red right" href="#" @click="remove(index)">
              <i class="material-icons">delete</i>
            </a>
          </div>

          <div class="row valign-wrapper">
            <div class="col m2 hide-on-small-only center-align">
              <img :src="'https://ricocorrespondentes.com/tempt/img/profile/'+message.sender_pic" alt="" class="circle responsive-img">
              <label class="text-center">{{message.body.sender}}</label>
            </div>
            <div class="col m10 s12 left-align">
              <div class="card-title">{{message.body.title}}</div>
              <div class="black-text">{{message.body.content}}</div>
              <div class="card-action">
                <a v-if="message.receiver_id != 0" class="btn waves-effect waves-light main-pallet main-pallet-btn modal-trigger hide-on-small-only" href="#response" @click="setSelectedMes(index)">
                  <i class="material-icons left">border_color</i>Responder
                </a>
                <a class="btn waves-effect waves-light red btn-compact hide-on-small-only" href="#" @click="remove(index)">
                  <i class="material-icons">delete</i>
                </a>
              </div>
            </div>
          </div>

        </div>

      </card-profile>
      <div v-else class="card">
        <div class="card-content">
          <span class="card-title">Timeline</span>
          <h5 class="grey-text">Uau! Sua timeline está limpinha!</h5>
        </div>
      </div>
    </div>
    <!-- Modal Structure -->
    <modal unique="response" header="Responder">
      <span slot="content">
          <div class="row">
            <div class="col s12">
              <div class="left-align"><h6>Mensagem:</h6></div>
              <div class="left-align">"{{selected_message.message}}"</div>
            </div>
            <form class="col s12">
              <div class="row">
                <div class="input-field col s12">
                  <textarea id="text_response" class="materialize-textarea" v-model="selected_message.response"></textarea>
                  <label for="text_response">Resposta</label>
                </div>
              </div>
            </form>
          </div>
      </span>
      <a slot="footer" href="#!" @click="sendResponse" class="modal-close btn waves-effect waves-light main-pallet main-pallet-btn">Enviar</a>
    </modal>
  </section>
</template>

<script>
import axios from "axios"
import CardProfile from "@/components/card/CardProfile"
import Modal from "@/components/modal/Modal"

export default {
    name: 'Timeline',
    components: {
      CardProfile, Modal
    },
    methods:{
      setSelectedMes(index){
        this.selected_message.index = index;
        this.selected_message.message = this.messages[index].body.content;
      },
      favorite(index){
        var new_status = (this.messages[index].is_favorite == false)
        axios.post('https://ricocorrespondentes.com/tempt/index.php/api/usermessages?action=favorite',{
            access_token: localStorage.access_token,
            id: this.messages[index].id,
            status: new_status
        })
        .then((res) => {
            var r = res.data.result;
            if(r == 200) this.messages[index].is_favorite = new_status;
            else{
              if(r == 404) M.toast({
                html: 'Erro ao encontrar mensagem, tente novamente mais tarde.',
                classes: 'red'
              });
              if(r == 401) M.toast({
                html: 'Mensagem inválida, não pertence ao usuário.',
                classes: 'red'
              });
            }
        });
      },
      remove(index){
        axios.post('https://ricocorrespondentes.com/tempt/index.php/api/usermessages?action=delete',{
            access_token: localStorage.access_token,
            id: this.messages[index].id
        })
        .then((res) => {
            var r = res.data.result;
            if(r == 200) location.reload();
            else{
              if(r == 404) M.toast({
                html: 'Erro ao encontrar mensagem, tente novamente mais tarde.',
                classes: 'red'
              });
            }
        }); 
      },
      sendResponse(){
        axios.post('https://ricocorrespondentes.com/tempt/index.php/api/sendmessage',{
            token: localStorage.access_token,
            to: this.selected_message.to,
            message: this.selected_message.response
        })
        .then((res) => {
            if(res.data.result)
              M.toast({
                html: 'Mensagem enviada com sucesso!',
                classes: 'green'
              });
        });
      }
    },
    created: function(){
        axios.post('https://ricocorrespondentes.com/tempt/index.php/api/usermessages?action=get',{
            access_token: localStorage.access_token
        })
        .then((res) => {
            if(res.data.result) this.messages = res.data.result;
        });
    },
    mounted: function(){
      $('.modal').modal();
    },
    data (){
        return{
          messages: [],
          selected_message: {
            index:0,
            message:"",
            response:"",
            to:0
          }
        }
    }
}
</script>

<style>

</style>

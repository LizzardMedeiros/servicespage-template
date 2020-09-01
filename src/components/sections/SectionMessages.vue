<template>
  <section id="messages" class="grey lighten-4">
    <div class="row container">
      <div class="col s12">
        <hr/>
        <div class="card">
          <div class="card-content">
            <span class="card-title">Enviar Mensagem</span>

          <div class="row">
            <div class="input-field col s12 m6">
              <input id="message_nome" type="text" data-length="10" v-model="m_nome"/>
              <label for="message_nome">Nome</label>
            </div>
            <div class="input-field col s12 m6">
              <input id="message_email" type="email" data-length="10" v-model="m_email"/>
              <label for="message_email">E-Mail</label>
            </div>
          </div>

          <div class="row">
            <div class="input-field col s12">
              <textarea id="message_content" class="materialize-textarea" v-model="m_message"></textarea>
              <label for="message_content">Mensagem</label>
            </div>
          </div>

          </div>
          <div class="card-action">
            <div class="row">
              <div class="input-field col s12 m8">
                <div class="left-align">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, expedita, saepe, vero rerum deleniti beatae veniam harum neque nemo praesentium cum alias asperiores commodi.</div>
              </div>
              <div class="input-field col s12 m4">
                <button class="waves-effect waves-light btn-large main-pallet main-pallet-btn" @click="sendMessage">
                  <i class="material-icons left">cloud</i>Enviar
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script>

import axios from 'axios' 

export default {
  name: 'SectionMessages',
  methods:{
    sendMessage(){
      axios.post("https://ricocorrespondentes.com/tempt/index.php/api/sendmessage",{
        'token': localStorage.access_token,
        'name': this.m_nome,
        'email': this.m_email,
        'message': this.m_message
      })
      .then(res => {
        if(res.data.result){
           M.toast({
            html: '<i class="material-icons">check</i> Mensagem Enviada com Sucesso!',
            classes: 'green'
          });
        }else{
          if(res.data.name) M.toast({
            html: '<i class="material-icons">clear</i> '+res.data.name,
            classes: 'red'
          });
          if(res.data.email) M.toast({
            html: '<i class="material-icons">clear</i> '+res.data.email,
            classes: 'red'
          });
          if(res.data.message) M.toast({
            html: '<i class="material-icons">clear</i> '+res.data.message,
            classes: 'red'
          });
        }
      });
    }
  },
  data () {
     return {
       m_nome: "",
       m_email: "",
       m_message: ""
     }
  }
}
</script>

<style>
  #Messages {
  }
</style>

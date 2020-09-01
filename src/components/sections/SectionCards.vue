<template>
  <section id="cards" class="grey lighten-4">
    <div class="row container">

      <div class="col m4 s12">
        <div class="card">
          <div class="card-header card-panel main-pallet">
            <span class="card-title white-text">Seja um correspondente</span>
            <a class="btn-floating halfway-fab waves-effect waves-light main-pallet main-pallet-btn activator"><i class="material-icons">add</i></a>
          </div>
          <div class="card-content">
            <p>Aproveite agora a oportunidade de crescer na cerreira como correspondente. preencha seu cadastro agora!</p>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">
              <i class="material-icons right">close</i>
            </span>
            <p class="left-align">O que é um correspondente? Correspondente é um especialista na área de direito que por vezes é advogado, o qual  é contratado para diligências inerentes à carreira jurídica, tais como cópias de processos, realizações de audiências, despachos, etc. </p>
          </div>
        </div>
      </div>

      <div class="col m4 s12">
        <div class="card">
          <div class="card-header card-panel main-pallet">
            <span class="card-title white-text">Tire suas dúvidas</span>
            <a class="disabled btn-floating halfway-fab waves-effect waves-light main-pallet main-pallet-btn"><i class="material-icons">add</i></a>
          </div>
          <div class="card-content">
            <p>Na Rico Correspondentes você encontra um advogado da sua região para consultar sobre a sua causa.</p>
          </div>
        </div>
      </div>

      <div class="col m4 s12">
        <div class="card">
          <div class="card-header card-panel main-pallet">
            <span class="card-title white-text">Seja um colaborador</span>
            <a class="disabled btn-floating halfway-fab waves-effect waves-light main-pallet main-pallet-btn"><i class="material-icons">add</i></a>
          </div>
          <div class="card-content">
            <p>Você pode contribuir com a Rico Correspondentes através de artigos Jurídicos ou se tornando um patrocinador!</p>
          </div>
        </div>
      </div>

    </div>
    <div class="row container" v-if="!logged">
      <div class="col m6 s12">
        <div class="card">
          <div class="card-header card-panel main-pallet">
            <span class="card-title white-text">Quero me cadastrar</span>
          </div>
          <div class="card-content">
            <p>Cadastre agora e tenha acesso total à nossa plataforma. Seja um correspondente ou cliente.</p>
          </div>
          <div class="card-action">
            <router-link class="waves-effect waves-light btn main-pallet main-pallet-btn" to="/register"><i class="material-icons left">lock_open</i>Cadastrar
            </router-link>
          </div>
          <div class="modal-footer deep-purple lighten-5">
            <a class="modal-trigger" href="#terms">Termos & condições</a>
          </div>
        </div>
      </div>
      <div class="col m6 s12">
        <div class="card">
          <div class="card-header card-panel main-pallet">
            <span class="card-title white-text">Já sou cadastrado</span>
          </div>
          <div class="card-content">
            <p>Acesse agora o seu painel de controle, administre a sua conta e tenha acesso às suas mensagens.</p>
          </div>
          <div class="card-action">
            <router-link class="waves-effect waves-light btn main-pallet main-pallet-btn" to="/login">
              <i class="material-icons left">done</i>Entrar
            </router-link>
          </div>
          <div class="modal-footer deep-purple lighten-5">
            <a>Recuperar Senha</a>
          </div>
        </div>
      </div>
    </div>

    <modalTerms/>

  </section>
</template>

<script>
import Modal from "@/components/modal/Modal"
import ModalTerms from "@/components/modal/ModalTerms"

export default {
  name: 'SectionTerms',
  props: {'logged': false},
  components:{
    Modal, ModalTerms
  },
  mounted: function(){
    $('.modal').modal();
  },
  data () {
    return {
      access_token: localStorage.access_token
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #cards{
    padding: 20px 0; 
  }
  .modal-footer{
    padding: 15px 0;
  }
</style>

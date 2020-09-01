<template>
  <modal unique="login" header="Entrar" maxwidth="512px">
    <div slot="content" class="row">
      <form class="col m12">
        <div class="row">
          <div class="input-field col m12">
            <input id="email" type="email" class="validate" v-model="email"/>
            <label for="email">Email</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col m12">
            <input id="password" type="password" class="validate" v-model="password"/>
            <label for="password">Senha</label>
          </div>
        </div>
      </form>
    </div>
    <button slot="footer" class="btn main-pallet main-pallet-btn modal-close" @click="login">
      Entrar
    </button>
  </modal>
</template>

<script>
import Modal from "@/components/modal/Modal"
import axios from "axios";
export default {
  name: 'ModalLogin',
  components:{Modal},
  methods:{
    login(){
      axios.post('https://ricocorrespondentes.com/tempt/index.php/api/login',{
        email: this.email,
        password: this.password
      })
      .then((res) => {
        console.log(res);
        if(res.status == 200){
          if(res.data.login) M.toast({html: res.data.login});
          if(res.data.email) M.toast({html: res.data.email});
          if(res.data.password) M.toast({html: res.data.password});
          if(res.data.access_token){
            localStorage.access_token = res.data.access_token;
            location.reload();
          }
        }
      });
    }
  },
  data(){
    return{
      email: "",
      password: ""
    }
  }
}
</script>

<style>
</style>

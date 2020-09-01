<template>
  <section id="login" class="main-pallet">

    <div class="row">
        <div class="col s12 logo">
            <img src="@/assets/logo.png"/>
        </div>
    </div>

    <div class="row content">
            <div class="card col s12">
                <div class="card-content">
                    <span class="card-title">Login</span>
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="email" type="email" class="validate" v-model="email"/>
                            <label for="email">Email</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="password" type="password" class="validate" v-model="password"/>
                            <label for="password">Senha</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <button class="btn main-pallet main-pallet-btn" @click="login">Entrar</button>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  </section>
</template>

<script>
import axios from "axios"

export default {
  name: 'Login',
  components: {},
  created: function(){
    this.access_token = localStorage.access_token;
    var success = this.$route.query.s;
    switch(success){
      case 200:
        M.toast({html: 'Sua conta foi validada com sucesso!', classes: 'green'});
        break;
      case 201:
        M.toast({html: 'Usuário já cadastrado!', classes: 'orange'});
        break;
      case 400:
        M.toast({html: 'Informação ausente.', classes: 'red'});
        break;
      case 404:
        M.toast({html: 'Registro não encotrado.', classes: 'red'});
        break;
      case 500:
        M.toast({html: 'Erro no servidor.', classes: 'red'});
        break;
    }
  },
  mounted: function(){
    $(".dropdown-trigger").dropdown();
  },
  methods:{
    login(){
      axios.post('https://ricocorrespondentes.com/tempt/index.php/api/login',{
        email: this.email,
        password: this.password
      })
      .then((res) => {
        if(res.status == 200){
          if(res.data.login) M.toast({html: res.data.login, classes: 'red'});
          if(res.data.email) M.toast({html: res.data.email, classes: 'red'});
          if(res.data.password) M.toast({html: res.data.password, classes: 'red'});
          if(res.data.access_token){
            localStorage.access_token = res.data.access_token;
            this.$router.push('/'); 
          }
        }
      });
    }
  },
  data () {
    return {
        email: "",
        password: ""
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #login{
        min-width: 100vw;
        min-height: 100vh;
        width: auto;
        height: auto;
        margin-bottom: -30px;
    }

    #login .logo img{
        width: 196px;
        padding-top:32px;
    }

    #login .content{
        position: absolute;
        margin:0;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
    }
    #login .card{
        width: 80vw;
    }
    @media (min-width: 600px) {
        #login .logo img{
            width: 256px;
            padding-top:32px;
        }
        #login .card{
            width: 30vw;
        }
    }
</style>
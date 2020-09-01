<template>
  <section id="register" class="main-pallet">
    <div class="row">
        <div class="col s12 logo">
            <img src="@/assets/logo.png"/>
        </div>
    </div>
    <div class="row content">
            <div class="card col s12">
                <div class="card-content">
                    <span class="card-title">Registrar</span>
                    
                    <div class="row">
                        <div class="input-field col m6 s12">
                            <input id="name" type="text" class="validate" v-model="register.name">
                            <label for="name">Nome Completo</label>
                        </div>
                        <div class="input-field col m6 s12">
                            <input id="email" type="email" class="validate" v-model="register.email">
                            <label for="email">Email</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col m4 s6">
                            <input id="rg" type="number" class="validate" v-model="register.rg">
                            <label for="rg">Identidade</label>
                        </div>
                        <div class="input-field col m4 s6">
                            <input id="cpf" type="number" class="validate" v-model="register.cpf">
                            <label for="cpf">CPF</label>
                        </div>
                        <div class="input-field col m4 s12">
                            <select id="gender" v-model="register.gender">
                            <option value="m">Masculino</option>
                            <option value="f">Feminino</option>
                            </select>
                            <label for="gender">Gênero</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col m6 s12">
                            <input id="password" type="password" class="validate" v-model="register.password">
                            <label for="password">Senha</label>
                        </div>
                        <div class="input-field col m6 s12">
                            <input id="cpassword" type="password" class="validate" v-model="register.cpassword">
                            <label for="cpassword">Confirmar Senha</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col m12 s12">
                            <input id="address" type="text" class="validate" v-model="register.address">
                            <label for="address">Endereço</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col m6 s12">
                            <input id="city" type="text" class="validate" v-model="register.city">
                            <label for="city">Cidade</label>
                        </div>
                        <div class="input-field col m3 s6">
                            <select id="state" class="browser-default" v-model="register.state">
                                <option v-for="state in state_list" :key="state.short">{{state.short}}</option>
                            </select>
                        </div>
                        <div class="input-field col m3 s6">
                            <input id="postal" type="text" class="validate" v-model="register.postal">
                            <label for="portal">CEP</label>
                        </div>
                    </div>
                    <div class="row">
                        <label class="col s12 m3 offset-m3">
                            <input type="checkbox" class="filled-in" v-model="register.is_correspondent"/>
                            <span>Correspondente</span>
                        </label>
                        <label v-if="register.is_correspondent" class="col s12 m3">
                            <input type="checkbox" class="filled-in" v-model="register.has_certificated"/>
                            <span>Certificação Digital</span>
                        </label>
                    </div>
                    <div class="row">
                        <label>
                            <input id="indeterminate-checkbox" type="checkbox" v-model="register.terms"/>
                            <span class="black-text">Concordo com os </span>
                        </label>
                        <a class="modal-trigger" href="#terms">Termos & condições</a>
                        <div v-if="register.terms" class="input-field">
                            <button class="btn main-pallet main-pallet-btn" @click="test">Cadastrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <modalTerms/>
  </section>
</template>

<script>
import axios from "axios"
import Modal from "@/components/modal/Modal"
import ModalTerms from "@/components/modal/ModalTerms"

export default {
  name: 'Register',
  components: {Modal, ModalTerms},
  created: function(){
      axios.get('https://ricocorrespondentes.com/tempt/index.php/api/getstatelist')
      .then((res) => {
          if(res.data){
              this.state_list = res.data;
          }
      })
  },
  mounted: function(){
    $('select').formSelect();
    $('.modal').modal();
    $(".dropdown-trigger").dropdown();
  },
  methods:{
    reg(){
        let verified = true;
        for(var field in this.register){
            if(this.register[field] == null) verified = false;
        }
        if(!verified) M.toast({
            html: "Você precisa preencher todos os campos.",
            classes: 'red'
        });
        else{
            axios.post(
                'https://ricocorrespondentes.com/tempt/index.php/api/registeruser',
                this.register
            )
            .then((res) => {
                if(res.data.result){
                    M.toast({
                        html: "<p>Cadastro feito com sucesso!</p><p><label>Confirme seu cadastro pelo e-mail fornecido.</label></p>",
                        classes: 'green'
                    });                
                }
            });
        }
    },
    test(){
        M.toast({
            html: "Cadastro feito com sucesso!<br/>Confirme seu cadastro pelo e-mail fornecido.",
            displayLength: 5000,
            classes: 'green'
        }); 
    }
  },
  data () {
    return {
        register:{
            name: null,
            email: null,
            password: null,
            cpassword: null,
            rg: null,
            cpf: null,
            gender: null,
            address: null,
            city: null,
            postal: null,
            state: null,
            is_correspondent: false,
            has_certificate: false,
            terms: null
        },   
        state_list:[]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #register{
        min-width: 100vw;
        min-height: 100vh;
        width: auto;
        height: auto;
        margin-bottom: -30px;
    }
    #register .logo img{
        width: 128px;
        margin-top:32px;
    }
    #register .content{
        position: relative;
        left:50%;
        transform: translate(-40%, 0);
    }
    #register .card{
        width: 80vw;
    }
    @media (min-width: 600px) {
        #register{
            min-width: 100vw;
            min-height: calc(100vh + 220px);

        }
        #register .logo img{
            width: 256px;
        }
        #register .content{
            position: absolute;
            margin:0;
            top: calc(50% + 180px);
            left:50%;
            transform: translate(-50%, -50%);
        }
        #register .card{
            width: 60vw;
        }
    }
</style>
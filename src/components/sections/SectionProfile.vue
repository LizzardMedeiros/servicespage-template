<template>
  <section id="profile">
    <div :class="'col m'+size || 10+' s12'">
        <span class="left-align"><h6>Informações Pessoais</h6></span>
        <div class="row">
            <div class="input-field col m6 s12">
                <input id="first_name" type="text" class="validate" v-model="data.name">
                <label for="first_name" class="active">Nome</label>
            </div>
            <div class="input-field col m6 s12">
                <input id="email" type="email" class="validate" v-model="data.email">
                <label for="email" class="active">E-Mail</label>
            </div>
        </div>
        <div class="row">
            <div class="file-field input-field col m6 s12">
              <div class="btn main-pallet main-pallet-btn">
                <span>Imagem Perfil</span>
                <input type="file" @change="setProfileImage">
              </div>
              <div class="file-path-wrapper">
                <input class="file-path validate" type="text">
              </div>
            </div>
            <div class="input-field col m3 s12">
                <input :disabled="!master" id="cpf" type="text" class="validate" v-model="data.cpf">
                <label for="cpf" class="active">CPF</label>
            </div>
            <div class="input-field col m3 s12">
                <input :disabled="!master" id="rg" type="text" class="validate" v-model="data.rg">
                <label for="rg" class="active">RG</label>
            </div>
        </div>
        <span class="left-align"><h6>Endereço</h6></span>
        <div class="row">
            <div class="input-field col s12">
                <input id="log" type="text" class="validate" v-model="data.address.street">
                <label for="log" class="active">Logradouro</label>
            </div>
        </div>
        <div class="row">
            <div class="input-field col m4 s8">
                <input id="city" type="text" class="validate" v-model="data.address.city">
                <label for="city" class="active">Cidade</label>
            </div>
            <div class="input-field col m4 s4">
                <input id="state" type="text" class="validate" v-model="data.address.state_shorten">
                <label for="state" class="active">Estado</label>
            </div>
            <div class="input-field col m4 s6">
                <input id="cep" type="text" class="validate" v-model="data.address.postal_code">
                <label for="cep" class="active">CEP</label>
            </div>
        </div>

        <span class="left-align"><h6>Informações da Conta</h6></span>
        <div class="row">
            <div class="input-field col s6 m3">
                <input id="npassword" type="password" class="validate">
                <label for="npassword">Redefinir Senha</label>
            </div>
            <div class="input-field col s6 m3">
                <input id="cpassword" type="password" class="validate">
                <label for="cpassword">Confirmar Senha</label>
            </div>
            <div class="input-field col s6 m3">
                <label>
                    <input type="checkbox" class="filled-in" v-model="correspondent"/>
                    <span>Correspondente</span>
                </label>
            </div>
            <div class="input-field col s6 m3">
                <label>
                    <input type="checkbox" class="filled-in" v-model="certificate"/>
                    <span>Certificação Digital</span>
                </label>
            </div>
        </div>
        <span class="left-align"><h6>Informações Profissionais</h6></span>
        <div class="row">
            <div class="input-field col s12">
                <textarea id="description" class="materialize-textarea" v-model="data.curriculum"></textarea>
                <label for="description">Curriculum</label>
                <span class="helper-text left-align" data-error="wrong" data-success="right">Resuma as suas experiências e aptidões relevantes caso seja correspondente.</span>
            </div>
        </div>
        <div class="row">
            <div class="input-field col s12 right-align">
                <a class="modal-trigger waves-effect waves-light btn main-pallet main-pallet-btn" data-target="modal_confirm"><i class="material-icons left">cloud</i>Salvar</a>
            </div>
        </div>
    </div>
    <modal unique="modal_confirm" header="Confirmação">
        <div class="row" slot="content">
            <p>Digite a sua senha para confirmar as alterações cadastrais</p>
            <div class="input-field col m6 s12">
                <input v-model="data.password" id="password" type="password" class="validate">
                <label for="password">Senha</label>
            </div>
            <div class="input-field col m6 s12">
                <input v-model="data.cpassword" id="c_password" type="password" class="validate">
                <label for="c_password">Confirmar Senha</label>
            </div>
        </div>
        <div class="row" slot="footer">
            <a @click="checkPass" class="waves-effect waves-light btn main-pallet main-pallet-btn">
                <i class="material-icons left ">cloud</i>Confirmar
            </a>
        </div>
    </modal>
  </section>
</template>

<script>
    import axios from 'axios'
    import Modal from '@/components/modal/Modal'
    import Server from '@/components/helpers/Server'
    export default {
        name: 'SectionProfile',
        components:{Modal},
        props:['size', 'data', 'master'],
        methods:{
            setProfileImage(e){
                Server.preloadFile(e);
            },
            checkPass(){
                this.data.is_correspondent = this.correspondent;
                this.data.has_certificate = this.certificate;
                this.data.access_token = localStorage.access_token;
                if(Server.file) this.data.pic = Server.file;
                axios.post('https://ricocorrespondentes.com/tempt/index.php/api/updatebasicuser',
                this.data
                )
                .then((res) => {
                    if(res.data.result == 200){
                        M.toast({
                            html: 'Alterações feitas com sucesso!',
                            classes: 'green'
                        });
                    }else if(res.data.token){
                        M.toast({
                            html: res.data.token,
                            classes: 'red'
                        });                   
                    }else if(res.data.password){
                        M.toast({
                            html: res.data.password,
                            classes: 'red'
                        });                         
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            }
        },
        mounted: function(){
            $('.modal').modal();
            M.textareaAutoResize($('#description'));
            Server.file = null;
        },
        data(){
            return{
                npassword: "",
                cpassword: "",
                correspondent: (this.data.is_correspondent == true) ? true : null,
                certificate: (this.data.has_certificate == true) ? true : null
            }
        }
    }
</script>

<style>
</style>

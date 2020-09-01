<template>
  <section id="region">
    <div class="card col m10 s12">
        <div class="card-content row">
            <div class="card-header">
                <h5 class="left-align">Região</h5>
            </div>
            <div class="card-content">
                <div class="input-field col m4 s12">
                    <input disabled id="city" type="text" class="validate" v-model="region.city">
                    <label for="city" class="active">Cidade</label>
                </div>
                <div class="input-field col m4 s12">
                    <input disabled id="state" type="text" class="validate" v-model="region.state">
                    <label for="state" class="active">Estado</label>
                </div>
                <div class="input-field col m4 s12">
                    <input disabled type="text"
                        :class="{
                                    'red-text': region.deadline <= Date.now()/1000,
                                    'green-text': region.deadline > Date.now()/1000
                                }"
                        :value="getAsDate(region.deadline)"
                    />
                    <label for="state" class="active">Validade</label>
                </div>
            </div>
            <div class="card-action right-align">
                <a v-if="region.deadline <= Date.now()/1000" class="waves-effect waves-light btn modal-trigger green" href="#modal_renew"><i class="fas fa-check-double left"></i>Renovar</a>
                <a class="waves-effect waves-light btn modal-trigger btn-compact red" href="#modal_remove"><i class="far fa-trash-alt"></i></a>
            </div>
        </div>

    </div>
    <modal unique="modal_renew" header="Confirmação">
        <div class="row" slot="content">
            <h5>Digite a sua senha para confirmar a renovação</h5>
            <div class="input-field col m6 s12">
                <input v-model="password" id="password" type="password" class="validate">
                <label for="password">Senha</label>
            </div>
            <div class="input-field col m6 s12">
                <input v-model="cpassword" id="c_password" type="password" class="validate">
                <label for="c_password">Confirmar Senha</label>
            </div>
        </div>
        <div class="row" slot="footer">
            <a @click="renew" class="waves-effect waves-light btn">
                <i class="material-icons left">cloud</i>Confirmar
            </a>
        </div>
    </modal>
    <modal unique="modal_remove" header="Confirmação">
        <div class="row" slot="content">
            <h5>Digite a sua senha para confirmar a exclusão:</h5>
            <div class="input-field col m6 s12">
                <input v-model="password" id="rpassword" type="password" class="validate">
                <label for="rpassword">Senha</label>
            </div>
            <div class="input-field col m6 s12">
                <input v-model="cpassword" id="c_rpassword" type="password" class="validate">
                <label for="c_rpassword">Confirmar Senha</label>
            </div>
            <h6 class="left-align">Os seus créditos serão devolvidos proporcionalmente.</h6>
        </div>
        <div class="row" slot="footer">
            <a @click="remove" class="waves-effect waves-light btn red">
                <i class="fas fa-check left"></i>Confirmar
            </a>
        </div>
    </modal>
  </section>
</template>

<script>
    import Server from '@/components/helpers/Server'
    import Modal from '@/components/modal/Modal'
    export default {
        name: 'SectionRegion',
        components:{Modal},
        props:['region'],
        methods:{
            renew(){
                var data = {
                    token: localStorage.access_token,
                    action: 'renew',
                    id: this.region.id
                };
                Server.checkPass(this.password, this.cpassword, localStorage.access_token)
                .then((res) => {
                    console.log(res);
                    if(res) Server.send('region', data, 'Comarca renovada com sucesso!', true);
                    else M.toast({html: 'Senha não confere!', classes:'red'});
                });
            },
            remove(){
                var data = {
                    token: localStorage.access_token,
                    action: 'remove',
                    id: this.region.id
                };
                Server.checkPass(this.password, this.cpassword, localStorage.access_token)
                .then((res) => {
                    console.log(res);
                    if(res) Server.send('region', data, 'Comarca removida com sucesso!', true);
                    else M.toast({html: 'Senha não confere!', classes:'red'});
                });
            },
            getAsDate(timestamp){
                var a = new Date(timestamp * 1000);
                var months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dec'];
                var year = a.getFullYear();
                var month = months[a.getMonth()];
                var date = a.getDate();
                var time = date + ' ' + month + ' ' + year;
                return time;
            }
        },
        mounted: function(){
            $('.modal').modal();
        },
        data(){
            return{
                password: null,
                cpassword: null
            }
        }
    }
</script>

<style>
</style>

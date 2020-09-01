<template>
  <modal unique="register" header="Cadastrar" maxwidth="512px">
    <div slot="content" class="row">
      <form class="col m12">
        <div class="row">
          <div class="input-field col m12">
            <input id="name" type="text" class="validate">
            <label for="name">Nome Completo</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col m12">
            <input id="remail" type="email" class="validate">
            <label for="remail">Email</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col m4">
            <input id="rg" type="number" class="validate">
            <label for="rg">Identidade</label>
          </div>
          <div class="input-field col m4">
            <input id="cpf" type="number" class="validate">
            <label for="cpf">CPF</label>
          </div>
          <div class="input-field col m4">
            <select id="gender">
              <option value="m">Masculino</option>
              <option value="f">Feminino</option>
            </select>
            <label for="gender">Gênero</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col m6">
            <input id="rpassword" type="password" class="validate">
            <label for="rpassword">Password</label>
          </div>
          <div class="input-field col m6">
            <input id="cpassword" type="password" class="validate">
            <label for="cpassword">Confirmar Senha</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col m12">
            <input id="address" type="text" class="validate">
            <label for="address">Endereço</label>
          </div>
          <div class="input-field col m6">
            <input id="city" type="text" class="validate">
            <label for="city">Cidade</label>
          </div>
          <div class="input-field col m3">
            <select id="state">
              <option value="Acre;AC">AC</option>
              <option value="Alagoas;AL">AL</option>
              <option value="Amapa;AP">AP</option>
              <option value="Amazonas;AM">AM</option>
              <option value="Bahia;BA">BA</option>
              <option value="Ceara;CE">CE</option>
              <option value="Espirito Santo;ES">ES</option>
              <option value="Goias;GO">GO</option>
              <option value="Maranhao;MA">MA</option>
              <option value="Minas Gerais;MG">MG</option>
              <option value="Mato Grosso do Sul;MS">MS</option>
              <option value="Mato Grosso;MT">MT</option>
              <option value="Parana;PA">PA</option>
              <option value="Paraiba;PB">PB</option>
              <option value="Pernanbuco;PE">PE</option>
              <option value="Piaui;PI">PI</option>
              <option value="Parana;PR">PR</option>
              <option value="Rio de Janeiro;RJ">RJ</option>
              <option value="Rio Grande do Norte;RN">RN</option>
              <option value="Rio Grande do Sul;RS">RS</option>
              <option value="Rondonia;RO">RO</option>
              <option value="Roraima;RR">RR</option>
              <option value="Santa Catarina;SC">SC</option>
              <option value="Sergipe;SE">SE</option>
              <option value="Sao Paulo;SP" selected>SP</option>
              <option value="Tocantins;TO">TO</option>
            </select>
            <label for="state">Estado</label>
          </div>
          <div class="input-field col m3">
            <input id="postal" type="text" class="validate">
            <label for="portal">CEP</label>
          </div>
        </div>
      </form>
    </div>
    <a slot="footer" class="btn main-pallet main-pallet-btn" @click="register">Cadastrar</a>
  </modal>
</template>

<script>
import axios from "axios"
import Modal from "@/components/modal/Modal"
export default {
  name: 'ModalRegister',
  components:{Modal},
  mounted: function(){
    $('select').formSelect();
  },
  methods:{
    register(){

    }
  },
  data(){
    return{
    }
  }
}
</script>

<style>
</style>

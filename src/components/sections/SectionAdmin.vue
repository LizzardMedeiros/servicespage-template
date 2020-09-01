<template>
  <div class="col m10 s12">

    <div class="col s12 left-align">
      <h4>Administração</h4> <h5>Gerencie seus clientes.</h5>
    </div>

    <datatable
      title="Clientes"
      locale="br"
      :columns="client.cols"
      :rows="client.rows"
      :clickable="false"
      :exactSearch="true"
      class="responsive-table"
      >
        <th slot="thead-tr">
          Ações
        </th>
        <template slot="tbody-tr" slot-scope="props">
          <td>
            <button class="btn main-pallet main-pallet-btn darken-2 waves-effect waves-light compact-btn"
                @click="selectItem(props.row)">
              Editar
            </button>
          </td>
        </template>
    </datatable>

    <div v-if="client.selected.length != 0" class="col s12 card">
      <a class="btn-floating btn-small waves-effect waves-light main-pallet main-pallet-btn right" style="margin-top:10px;" @click="clearClientSelection">
        <i class="fas fa-times"></i>
      </a>
      <h5>Detalhes do cliente</h5>
      <section-profile size="12" key="adm" :data="client.selected" :master="true"></section-profile>
    </div>
    
    <datatable
      title="Pagamentos"
      locale="br"
      :columns="payments.cols"
      :rows="payments.rows"
      class="responsive-table"
      >

      <th slot="thead-tr">
        Ações
      </th>
      <template slot="tbody-tr" slot-scope="props">
        <td>
          <button class="btn btn-compact green waves-effect waves-light"
              @click="setPayment(props.row.id, 1)">
            <i class="fas fa-check"></i>
          </button>
          <button class="btn btn-compact red waves-effect waves-light"
              @click="setPayment(props.row.id, -1)">
            <i class="fas fa-times"></i>
          </button>
          <button class="btn btn-compact main-pallet main-pallet-btn darken-2 waves-effect waves-light" @click="showReceipt(props.row.receipt)">
            <i class="fas fa-paperclip"></i>
          </button>
        </td>
      </template>

    </datatable>

    <modal unique="show_r" header="Comprovante">
      <div slot="content" class="row">
        <div class="col s12">
          <img :src="'https://ricocorrespondentes.com/tempt/img/comps/'+receipt"/>
        </div>
      </div>
    </modal>

  </div>
</template>

<script>
import DataTable from 'vue-materialize-datatable';
import axios from 'axios';
import SectionProfile from '@/components/sections/SectionProfile';
import Modal from '@/components/modal/Modal'
import Server from "@/components/helpers/Server.js"

export default {
  name: 'SectionAdmin',
  components:{
    "datatable": DataTable,
    SectionProfile,
    Modal
  },
  props:[],
  methods:{
    selectItem(e){
      this.client.selected = e;
      this.client.selected.active = true;
    },
    clearClientSelection(){
      this.client.selected = [];
      this.client.selected.active = false;
    },
    showReceipt(r){
      this.receipt = r;
      $('#show_r').modal('open');
    },
    setPayment(id, status){
      var data = {
        'access_token': localStorage.access_token,
        'action': 'setstatus',
        'status': status,
        'id': id 
      };
      Server.send('payment', data);    
    }
  },
  created: function(){
    Server.get('getusers', {access_token: localStorage.access_token})
    .then((res) => {
      if(res.errors.length == 0) this.client.rows = res.result;
    });
    Server.get('getpayments', {access_token: localStorage.access_token})
    .then((res) => {
      if(res.errors.length == 0){
        res.result.forEach((payment) => {
          payment.amount = "R$"+parseFloat(payment.amount).toFixed(2);
          switch(payment.status){
            case "1":
              payment.status = '<span class="green-text"><i class="fas fa-check"></i> Aprovado</span>';
              break;
            case "-1":
              payment.status = '<span class="red-text"><i class="fas fa-times"></i> Reprovado</span>';
              break;
            default:
              payment.status = '<span class="orange-text"><i class="fas fa-hourglass-start"></i> Pendente</span>';
              break;
          }
          this.payments.rows.push(payment);
        })
      }
    });
  },
  mounted: function(){
    $('.modal').modal();
  },
  data () {
    return {
      receipt:'',
      client:{
        cols:[
          {label:'id', field:'id', numeric:false, html:false},
          {label:'Email', field:'email', numeric:false, html:false},
          {label:'CPF', field:'cpf', numeric:false, html:true},
          {label:'Créditos', field:'balance', numeric:false, html:true},
          {label:'Criação', field:'created', numeric:false, html:false}
        ],
        rows:[],
        selected:[]
      },
      payments:{
        cols:[
          {label:'id', field:'id', numeric:false, html:false},
          {label:'Cliente', field:'user_id', numeric:false, html:false},
          {label:'Valor', field:'amount', numeric:false, html:true},
          {label:'Status', field:'status', numeric:false, html:true},
          {label:'Abertura', field:'created', numeric:false, html:false},
        ],
        rows:[]
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

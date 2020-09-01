<template>
  <section>
    <div class="col m10 s12">
      <div class="row">
        <div class="col s12 left-align">
          <h4>Créditos</h4> <h5>Adicione créditos à sua conta</h5>
        </div>
        <p>Transfira os valores desejados para a conta abaixo e anexe o comprovante para agilizar o processo</p>

        <div class="card row">
          <div class="col m6 s12">
            <ul class="left-align">
              <li><h5>Caixa Economica Federal</h5></li>
              <li>Ag - 1034</li>
              <li>Op - 013</li>
              <li>Poupança - 00029535-3</li>
              <li>Titular - Karla Caroline P. Stinghel</li>
              <li>CPF - Karla Caroline P. Stinghel</li>
            </ul>
          </div>
          <div class="col m6 s12">
            <div class="input-field" style="margin-top: 64px;">
              <input placeholder="ex. 150,00" id="valor" type="number" min="0.1" step="0.01" class="validate" v-model="value">
              <label for="value" class="active">Valor (R$)</label>
              <file-sender title="Comprovante" ref="filesender" :amount="value"/>
            </div>
          </div>
          <div class="col m12 s12" style="padding-bottom: 15px;">
            <a class="waves-effect waves-light btn green" @click="uploadFile">
              <i class="fas fa-check left"></i>Confirmar Envio
            </a>
          </div>
        </div>

        <div class="row">
          <div class="col s12">
            <datatable
              title="Histórico de Pagamentos"
              locale="br"
              :columns="historic.cols"
              :rows="historic.rows"
              :clickable="false"
              class="responsive-table"
              >
              <th slot="thead-tr">
                Comprovante
              </th>
              <template slot="tbody-tr" slot-scope="props">
                <td>
                  <button class="btn btn-compact main-pallet main-pallet-btn darken-2 waves-effect waves-light" @click="show(props.row.receipt)">
                    <i class="fas fa-search"></i>
                  </button>
                </td>
              </template>
            </datatable>
          </div>
        </div>
      </div>      
    </div>
    <modal unique="show" header="Comprovante">
      <div slot="content" class="row">
        <div class="col s12">
          <img :src="'https://ricocorrespondentes.com/tempt/img/comps/'+receipt_img"/>
        </div>
      </div>
    </modal>
  </section>
</template>

<script>
import DataTable from 'vue-materialize-datatable';
import FileSender from '@/components/forms/FileSender';
import Server from '@/components/helpers/Server';
import Modal from '@/components/modal/Modal';

export default {
  name: 'BuyCredits',
  components:{
    "datatable": DataTable,
    FileSender,
    Modal
  },
  methods:{
    uploadFile(){
     this.$refs.filesender.uploadImage();
    },
    show(e){
      this.receipt_img = e;
      $('#show').modal('open');
    }
  },
  created: function(){
    Server.get('getuser', {'access_token': localStorage.access_token})
    .then((res) => {
      if(res.user){
        res.user.payments.forEach((payment) => {
          payment.amount = 'R$'+payment.amount;
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
            this.historic.rows.push(payment);
        });
      }
    });
  },
  mounted: function(){
    $('.modal').modal();
  },
  data () {
    return {
      user:{},
      value:0,
      receipt_img: "",
      historic:{
        cols:[
          {label:'id', field:'id', numeric:false, html:false},
          {label:'Valor', field:'amount', numeric:false, html:false},
          {label:'Status', field:'status', numeric:false, html:true},
          {label:'Data', field:'created', numeric:false, html:false}
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

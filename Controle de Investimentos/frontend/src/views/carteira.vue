<template>
  <div class="ativos">
    <h1>Carteira</h1>
    <hr/>

    <b-button v-b-modal.adicionarAtivos>
        <font-awesome-icon icon="plus"/><span> Comprar</span>
    </b-button>
    <b-table striped hover :items="ativos" :fields="fields">

      <template slot="cell(actionAdd)" slot-scope="{ item }">
        <b-button v-on:click="beforeComprarAtivo(item)">
          <font-awesome-icon icon="plus-square"/>
        </b-button>
      </template>

      <template slot="cell(actionSell)" slot-scope="{ item }">
        <b-button v-on:click="beforeVenderAtivo(item)">Vender
        </b-button>
      </template>
    </b-table>

    <b-modal id="adicionarAtivos" 
      title="Comprar Ativo"
      ok-title="Comprar"
      cancel-title="Cancelar"
      @show="beforeAdicionarAtivo"
      @ok="adicionarAtivo"
      >
      <FormCarteira v-model="ativoAtual"/>
    </b-modal>
    <b-modal id="comprarAtivos" 
      :title="'Comprar mais do ativo - ' + ativoAtual.codigo"
      ok-title="Comprar"
      cancel-title="Cancelar"
      @ok="comprarAtivos"
      >
      <FormCarteira v-model="ativoAtual"/>
    </b-modal>
    <b-modal id="venderAtivos" 
      :title="'Vender ativo - ' + ativoAtual.codigo"
      ok-title="Vender"
      cancel-title="Cancelar"
      @ok="venderAtivos"
      >
      <FormCarteira v-model="ativoAtual"/>
    </b-modal>
  </div>
</template>
<script>

import FormCarteira from '../components/formCarteira'
import axios from 'axios';

export default {
  components: {FormCarteira},
  data: () => {
    return {
      ativoAtual:{
        codigo: "",
        quantidade: "",
        preco: "",
        precoAnterior:"",
        quantidadeAnterior:"",
        compraVenda: "",
        isNew: true
      },
      ativos: [],
      fields: [
        {
          key: "codigo",
          label: "Código"
        },
        {
          key: "quantidade",
          label: "Quantidade"
        },
        {
          key: "preco",
          label: "Preço Médio"
        },
        {
          key: "actionAdd",
          label: ""
        },
        {
          key: "actionSell",
          label: ""
        }
     ]
    }  
  },
  methods: {

    async excluirAtivo(ativo) {
      try {
        await axios.delete(`http://localhost:3000/ativos/${ativo.codigo}`);
        await this.carregaCarteira();
      } catch(err) {
        alert('erro ao excluir ativo');
      }
    },

    beforeVenderAtivo(ativo) {

      this.ativoAtual = {
        codigo:ativo.codigo,
        quantidade:"",
        preco:"",
        precoAnterior: ativo.preco,
        quantidadeAnterior: ativo.quantidade,
        isNew:false
      };
      this.$root.$emit('bv::show::modal','venderAtivos');
      
    },

    beforeComprarAtivo(ativo) {

      this.ativoAtual = {
        codigo:ativo.codigo,
        quantidade:"",
        preco:"",
        precoAnterior: ativo.preco,
        quantidadeAnterior: ativo.quantidade,
        isNew:false
      };
      this.$root.$emit('bv::show::modal','comprarAtivos');
      
    },

    async comprarAtivos() {
     let payload = {
        quantidade: this.ativoAtual.quantidade,
        preco: this.ativoAtual.preco,
        precoAnterior: this.ativoAtual.precoAnterior,
        quantidadeAnterior: this.ativoAtual.quantidadeAnterior,
        compraVenda: "C"
      };

      try {
        await axios.put(`http://localhost:3000/carteira/${this.ativoAtual.codigo}`, payload);
        await this.carregaCarteira();
      } catch(err) {
        alert('erro ao comprar ativo');
      }
    },

    async venderAtivos() {
     let payload = {
        quantidade: this.ativoAtual.quantidade,
        preco: this.ativoAtual.preco,
        precoAnterior: this.ativoAtual.precoAnterior,
        quantidadeAnterior: this.ativoAtual.quantidadeAnterior,
        compraVenda: "V"
      };

      try {
        await axios.put(`http://localhost:3000/carteira/${this.ativoAtual.codigo}`, payload);
        await this.carregaCarteira();
      } catch(err) {
        alert('erro ao vender ativo');
      }
    },

    async carregaCarteira() {
      this.ativos.splice(0, this.ativos.length);
      let dados = await axios.get('http://localhost:3000/carteira/');
      this.ativos.push(...dados.data);
    },

    beforeAdicionarAtivo() {
      this.ativoAtual.codigo = '';
      this.ativoAtual.quantidade = '';
      this.ativoAtual.preco = '';
      this.ativoAtual.isNew = true;
    },

    async adicionarAtivo() {
      let payload = {
        codigo: this.ativoAtual.codigo,
        quantidade: this.ativoAtual.quantidade,
        preco: this.ativoAtual.preco
      };

      try {
        await axios.post('http://localhost:3000/carteira/', payload);
        await this.carregaCarteira();
      } catch(err) {
        alert('erro ao comprar ativo');
      }
    },
  },
  async mounted() {
    await this.carregaCarteira();
  }
}
</script>

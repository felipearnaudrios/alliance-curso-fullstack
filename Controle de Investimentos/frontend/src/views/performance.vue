<template>
  <div class="performances">
    <h1>Ativos</h1>
    <hr/>
    <b-table striped hover :items="performances" :fields="fields">
    </b-table>
  </div>
</template>
<script>

import axios from 'axios';

export default {
  data: () => {
    return {
      performance:{
        codigo: "",
        quantidade: "",
        lucroPrejuizo: ""
      },
      performances:[],
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
          key: "lucroPrejuizo",
          label: "Lucro/Prejuizo"
        },
     ]
    }  
  },
  methods: {
    async carregaPerformance() {
      this.performances.splice(0, this.performances.length);
      let dados = await axios.get('http://localhost:3000/performance/');
      this.performances.push(...dados.data);
    },
  },
  async mounted() {
    await this.carregaPerformance();
  }
}
</script>

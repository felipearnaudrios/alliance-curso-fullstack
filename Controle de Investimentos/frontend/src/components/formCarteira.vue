<template>
    <b-form>
        <b-form-group
            id="input-codigo"
            label="Codigo"
            label-for="txtCodigo"
            description="Informe o código do ativo"
            :disabled="!content.isNew"
            >
            <b-form-input
                id="txtCodigo"
                v-model="content.codigo"
                type="text"
                required
                placeholder="código do ativo"
                :disabled="!content.isNew"
                @input="handleInput"
                />
        </b-form-group>
        <b-form-group
            id="input-quantiade"
            label="Quantidade"
            label-for="txtQuantidade"
            description="Informe a quantidade dos ativos">
            <b-form-input
                id="txtQunatidade"
                v-model="content.quantidade"
                type="text"
                required
                placeholder="Quantidade"
                @input="handleInput"/>
        </b-form-group>
        <b-form-group
            id="input-preco"
            label="Preço"
            label-for="txtPreco"
            description="Informe o preço unitario do ativo">
            <b-form-input
                id="txtPreco"
                v-model="content.preco"
                type="text"
                required
                placeholder="Preço"
                @input="handleInput"/>
        </b-form-group>
    </b-form>
</template>

<script>

export default {
    props: ['value'],
    data () {
        return {
            content: {
                codigo: this.value.codigo,
                preco: this.value.preco,
                quantidade: this.value.quantidade,
                isNew: this.value.isNew,
                precoAnterior: this.value.precoAnterior,
                quantidadeAnterior: this.value.quantidadeAnterior,
            }
        }
    },
    methods: {
        handleInput () {
            let retorno = {
                codigo: this.content.codigo,
                preco: this.content.preco,
                quantidade: this.content.quantidade,
                precoAnterior: this.content.precoAnterior,
                quantidadeAnterior: this.content.quantidadeAnterior,
                isNew: this.content.isNew
            };
            this.$emit("input",retorno);     
        }
    }    
}
</script>
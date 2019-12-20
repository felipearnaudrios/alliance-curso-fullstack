create table ATIVOS (
    CODIGO          character(6)[] not null,
    DESCRICAO       character(60)[] not null,
    primary key (CODIGO)
);

create table CARTEIRA (
    CODIGO_ATIVO    character(6)[] not null,
    QUANTIDADE      numeric(10) not null,
    PRECO_MEDIO     numeric(12, 4) not null,
    primary key (CODIGO_ATIVO),
    constraint FK_CARTEIRA_ATIVO foreign key (CODIGO_ATIVO) references ATIVOS(CODIGO)
);

create table OPERACOES (
    ID              numeric(10) not null,    /* Utilize a sequencia SEQ_OPERACOES_ID para gerar as chaves desta tabela (auto incremento) */
    CODIGO_ATIVO    character(6)[] not null,/* O papel (ativo) que foi transacionado */
    TIPO            char(1) not null,       /* Utilize 'V' para venda e 'C' para compra */
    DATA            timestamp default NOW() not null, /* Infome a data da operação */
    PRECO           numeric(12,2) not null, /* Informe o preço por ação da operação */
    QUANTIDADE      numeric(10) not null,   /* Quantidade que foi vendida ou comprada */
    LUCRO_PREJUIZO  numeric(12,2) null,     /* Lucro ou Prejuízo da operação. Só preencher quando for uma operação do tipo VENDA (TIPO = 'V'), caso contrário gravar NULL */
    primary key (ID),
    constraint FK_OPERACAO_ATIVO foreign key (CODIGO_ATIVO) references ATIVOS(CODIGO)
)

create sequence SEQ_OPERACOES_ID
    start 1
    increment 1;
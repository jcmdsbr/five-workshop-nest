# Primeiros passos :sunglasses:

## Croar módulo de Conta Bancária :heavy_check_mark:

```sh
nest g module accounts
nest g controller accounts
```

- Vamos criar nossa classe Account que irá representar nossa conta bancária
- Depois vamos criar nosso contrato que irá representar as transações do nosso sistema
- Uma vez criado, agora iremos definir nossas classes responsáveis por Crédito e Débito
- Agora vamos voltar para nossa conta bancária e definir alguns comportamentos
  - Método Open é um factory method que irá representar a abertura de uma nova conta
  - Deposit será o nosso método que representará o comportamento de deposito
  - Credit será o nosso método que representará o comportamento de Crédito
  - Precisamos de um método para retornar o saldo atual da conta para fins de cálculo
- Vamos definir nossos casos de uso agora com eles vamos descrever os comportamentos e regras da nossa aplicação

```sh
nest g service accounts/useCases/closeAccount
nest g service accounts/useCases/deposit
nest g service accounts/useCases/withdraw
nest g service accounts/useCases/getCurrentBalance
```

- Vamos criar nosso repositório e seu contrato
- Depois vamos configurar o DI dele

```ts
@Module({
  controllers: [AccountsController],
  providers: [
    CloseAccountService,
    DepositService,
    GetCurrentBalanceService,
    WithdrawService,
    { provide: 'IAccountRepository', useClass: AccountRepositry },
  ],
})
export class AccountsModule {}
```

## Criar módulo de Clientes :exclamation:

```sh
nest g module customers
nest g controller customers
```

- Vamos instalar o validador de CPF :heavy_check_mark:

```sh
npm i cpf-cnpj-validato
```

- Vamos trabalhar com eventos instalando :heavy_check_mark:

```sh
npm i --save @nestjs/event-emitter
```

- Configuração do modulo de Cliente :heavy_check_mark:

```ts
@Module({
  controllers: [CustomersController],
  providers: [
    Logger,
    RegisterNewCustomerService,
    CustomerRegisteredEventHandler,
    { provide: 'IAccountRepository', useClass: AccountRepositry },
    { provide: 'ICustomerRepository', useClass: CustomerRepository },
  ],
})
export class CustomersModule {}

```

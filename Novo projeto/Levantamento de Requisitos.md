h### Entrevista
##### Quem serão os usuários?
Cliente: Temos dois perfis principais:
- **Clientes finais** → Pessoas que compram nossos cursos e assinaturas. 
- **Equipe interna** → Time financeiro e time de risco/fraude.

1.1) Como é feito o cadastro desse cliente? Quando o pedido é registrado os dados são coletados para registro do cliente ou terá um dashboard dedicado para ele se cadastrar?
Hoje temos um site próprio. O fluxo ideal seria:
1. Cliente se cadastra no nosso site (nome, e-mail, senha). 
2. Conta é criada.
3. Depois ele pode comprar.

Ou seja:
- O cadastro **não deve ser feito no momento do pedido**.
- Queremos um **sistema de autenticação separado**.
- O pedido só pode ser feito por usuário autenticado.

Não queremos dashboard para cliente se cadastrar manualmente.  
Isso deve acontecer via API integrada ao nosso site.

1.2) Então existe uma condição para que o cliente realize um pedido que seria ele estar logado no sistema via API?


1) Quem vai utilizar o sistema?
Cliente: Depende da parte do sistema:
- A **API de pedidos e pagamento** será usada pelos clientes (indiretamente, via nosso site).
- O **painel administrativo** será usado apenas pelo time interno:
    - Analistas de fraude
    - Financeiro
    - Supervisores

1) A aplicação deve apenas ser capaz de receber pedidos e aplicar logica antifraude?
Cliente: Não. Ela deve:
- Receber pedidos 
- Registrar pagamentos
- Aplicar lógica antifraude
- Atualizar status do pedido
- Registrar histórico
- Permitir análise manual quando necessário
- Disponibilizar dashboard administrativo

No futuro queremos evoluir para:
- Relatórios
- Métricas de fraude
- Alertas automáticos

3.1) O que seria esse pagamento? Como ele é feito?
Nós usamos um gateway de pagamento externo (ex: Stripe, Pagar.me, Mercado Pago).
O fluxo seria:
1. Cliente cria pedido.
2. Nosso sistema envia requisição ao gateway.
3. Gateway responde com status inicial.   
4. Após confirmação do pagamento, iniciamos antifraude.

Importante:
- O sistema antifraude não substitui o gateway.
- Ele é uma camada adicional nossa.

Não queremos armazenar dados de cartão.  
Apenas o token retornado pelo gateway.

3.2) O que seria essa analise manual?
Quando o score ficar entre 50 e 79:
- Pedido vai para status `UNDER_REVIEW`.
- Um analista acessa o painel administrativo.
- Ele verá:
    - Dados do usuário
    - Histórico de compras
    - Score detalhado
    - Regras acionadas
    - IP
    - Data e hora

Ele então pode:
- Aprovar manualmente
- Rejeitar manualmente

Essa decisão precisa ser registrada com:
- ID do analista
- Data
- Justificativa

2) A aplicação será acessada apenas para fins de monitoramento de pessoal responsável, não sendo disponivel para clientes?
Cliente: O painel administrativo: **sim, apenas equipe interna.** Já o cliente:
- Vai interagir via nosso site
- Vai poder consultar o status do pedido 
- Mas não terá acesso ao dashboard antifraude

2) Quais são os estados possíveis que um pedido pode apresentar?
Cliente: Hoje pensamos em:
- `CREATED` → Pedido criado
- `PAYMENT_PENDING` → Aguardando confirmação do gateway
- `UNDER_REVIEW` → Em análise antifraude
- `APPROVED`
- `REJECTED`
- `CANCELLED`
- `REFUNDED`

Talvez possamos evoluir isso depois.

3) Como funciona as regras da logica antifraude? 
Cliente: Ainda não temos algo super sofisticado. Queremos começar simples.

**Valor muito alto** - Hoje nossa média de compra é R$ 197.  Consideramos alto risco: *Compras acima de R$ 1.000*

**Período analisado** - Mais de 3 compras em menos de 10 minutos → suspeito

**Histórico de rejeições** - Se o usuário tivger 2 ou mais pagamentos rejeitados nos últimos 30 dias → alto risco

**Contas no mesmo IP** - Mais de 5 contas criadas no mesmo IP em 24h → suspeito

4) A restrição vai ser aplicada como a média de tudo o que foi analisado ou por condições satisfeitas em cada topico?

Cliente: Queremos um **sistema de score**. Cada regra gera pontos de risco. Exemplo:
- Valor alto → +40 pontos 
- Muitas compras → +30 pontos
- Histórico negativo → +50 pontos
- IP suspeito → +60 pontos

Se o score total for:
- < 50 → Aprova automático
- Entre 50 e 79 → Revisão manual
- ≥ 80 → Rejeita automático

5) Quem é responsável por aprovar ou rejeitar? Como funciona isso? Não é o sistema que automaticamente trava?
Cliente: Queremos modelo híbrido.

**Baixo risco**→ Sistema aprova automaticamente.
**Risco médio** → Vai para painel de revisão.  

*Um analista decide aprovar ou rejeitar.*

**Alto risco**→ Sistema rejeita automaticamente.

Mas queremos que o supervisor possa reverter uma decisão.

Também queremos:
- Log detalhado de qual regra foi acionada
- Justificativa da decisão
- Histórico completo do pedido

5.1) Qual o tempo para reversão manual?
Boa pergunta. Precisamos de duas coisas:

**Reversão de decisão automática**. Se o sistema rejeitou automaticamente:
- Supervisor pode reverter em até 24h.
**Tempo máximo de revisão**
Pedidos em `UNDER_REVIEW`: Devem ser analisados em até 2 horas.

Se não forem analisados:
- O sistema deve notificar o time.
- Podemos decidir depois se:
    - Cancela automaticamente
    - Ou mantém aguardando       

Ainda estamos abertos a sugestão técnica aqui.
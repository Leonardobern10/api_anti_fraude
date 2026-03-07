# Qual arquitetura utilizada e porque?

A arquitetura escolhida foi MONÓLITO MODULAR ORIENTADO A SERVIÇOS. Nela nós teremos os módulos da aplicação independetes entre si, em nivel logico, consultando um único banco de dados. As interações serão capturadas por uma UI aplicando o padrão REST através do protocolo HTTP e direcionadas para um GATEWAY sendo esse responsável pelo roteamento e direcionamento das requisições aos serviços correspondentes.

Vantagens:
- Manutenção: Os módulos podem evoluir ou ser substituídos com impacto reduzido
no restante do sistema, desde que respeitem os contratos de comunicação.
- Baixo acomplamento: A separação em módulos independentes reduz a dependência entre eles, fazendo com que na inoperância de um a aplicação continue operando.
- Escalabilidade: Fácil transição para uma Arquitetura de Microserviços ou Orientada a Eventos.

# Porque utilizar mensagerias?

As mensagerias permitem que os módulos independentes da aplicação (e, futuramente, os microserviços) se comuniquem sem necessariamente se conhecer (baixo acoplamento), apenas através de mensagens publicadas em filas que esperam até ser consumidas por seus respectivos serviços consumidores.

A escolha contempla também a resposta à eventos que possam ocorrer, como uma confirmação de pagamento, permitindo que uma mensagem seja entregue a mais de um modulo e que tal modulo possa responder conforme sua atribuição: uma atualização do status do pedido, notificações ao usuário, etc.
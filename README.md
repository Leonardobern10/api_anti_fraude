# API ANTI FRAUDE
O projeto visa garantir segurança no pagamento de pedidos recebidos, evitando que as aprovações automáticos estejam sujeitas a **fraudes, chagebacks, compras suspeitas com cartõs roubados e que usuários criem múltiplas contas para explorar promoçoes**.
O Sistema desenvolvido é capaz de gerenciar os pedidos recebidos e aplicar uma camada de análise antifraude antes de liberar definitivamente o acesso ao produto.

## Funcionalidades
Para atender às expectativas de sua correta aplicação, o sistema deve prover:

1️⃣ Cadastro e autenticação de usuários
- Cadastro com e-mail e senha
- Login seguro
- Recuperação de senha
- Controle básico de permissões

2️⃣ Gestão de pedidos
Quando um usuário compra:
- Um pedido deve ser criado
- O status inicial deve ser “Pendente”
- O sistema deve registrar valor, data e usuário

3️⃣ Processamento de pagamento
Após o pagamento ser iniciado:
- O sistema deve enviar os dados para uma análise antifraude
- A análise não precisa ser instantânea, pode levar alguns segundos
- O cliente deve conseguir acompanhar o status

4️⃣ Antifraude
Queremos regras como:
- Valor muito alto → maior risco
- Muitas compras em curto período → risco
- Histórico de rejeições → risco
- Múltiplas contas no mesmo IP → risco

Se for considerado suspeito: Pedido deve ser recusado

Se estiver ok: Pedido aprovado e acesso liberado

## 5️⃣ Histórico e rastreabilidade
Precisamos:
- Saber quando o pedido foi criado
- Quando foi enviado para análise
- Qual foi o score de risco
- Quem aprovou ou rejeitou
- Logs detalhados

Isso é importante para auditoria.

## 6️⃣ Dashboard administrativo
Queremos um painel simples onde possamos:
- Ver todos os pedidos
- Filtrar por status
- Ver score antifraude
- Ver histórico do usuário
- Buscar por e-mail

# 🔐 Segurança
É fundamental que:
- Dados sensíveis não fiquem expostos 
- A autenticação seja segura
- Tenhamos registro de tentativas suspeitas
- A aplicação suporte crescimento futuro

# 📈 Escalabilidade
Nosso volume atual é pequeno, mas queremos:
- Estrutura preparada para crescer
- Processamento assíncrono se necessário
- Separação entre API principal e antifraude

## Entendendo as partes interessadas
- **Clientes finais** → Pessoas que compram nossos cursos e assinaturas. 
- **Equipe interna** → Time financeiro e time de risco/fraude.

O cadastro de um cliente deve ser feito de modo antecipado, via API. Um pedido só pode ser feito
por um usuário autenticado.

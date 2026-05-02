O que aconteceu no seu caso está diretamente ligado à política de segurança dos navegadores modernos para requisições entre origens diferentes (“cross-origin”).

Mesmo que seu frontend e backend estejam ambos em localhost, eles ainda são considerados origens diferentes porque a porta faz parte da origem. Então:

http://localhost:5173

e

http://localhost:3000

não pertencem à mesma origem.

Quando você fez o login sem:

withCredentials: true

o navegador permitiu que a requisição fosse enviada normalmente. O backend autenticou o usuário corretamente, gerou o JWT e respondeu com sucesso. Por isso você recebia:

{ "message": "Login successful" }

Mas existe um detalhe muito importante: o navegador não trata cookies cross-origin da mesma forma que trata respostas normais.

O backend enviava algo equivalente a:

Set-Cookie: token=eyJhb...

Só que o browser viu aquela resposta vindo de outra origem e pensou:

“Essa aplicação não declarou explicitamente que quer trabalhar com credenciais cross-origin.”

Então ele simplesmente ignorou o Set-Cookie.

A requisição funcionava.
A autenticação funcionava.
A resposta chegava.
Mas o cookie era descartado silenciosamente.

Por isso você entrou num estado curioso:

O login parecia funcionar, mas nenhuma rota autenticada conseguia encontrar o token depois.

Quando o frontend chamava:

GET /orders/statistics

o navegador enviava a request sem cookies, porque nenhum havia sido salvo anteriormente.

Então no backend acontecia isto:

req.cookies

virava:

{}

E:

req.cookies.token

ficava undefined.

O middleware então tentava validar um token inexistente, o que gerava o erro interno.

O withCredentials: true resolve isso porque ele muda o comportamento de segurança do navegador. Ele diz explicitamente:

“Essa requisição pode trocar credenciais com outra origem.”

“Credenciais” aqui inclui:

cookies
authorization headers
certificados TLS de cliente

Quando você adicionou:

withCredentials: true

o navegador passou a aceitar o Set-Cookie vindo do backend e armazenou o token corretamente.

Depois disso, nas próximas requisições, o próprio navegador passou a anexar automaticamente:

Cookie: token=...

Então o backend finalmente conseguiu ler:

req.cookies.token

e a autenticação passou a funcionar normalmente.

O motivo disso funcionar no Postman é que o Postman não segue as mesmas regras rígidas de segurança dos navegadores. Ele não possui a política de isolamento entre origens que existe no browser. Então ele aceita cookies livremente sem exigir esse tipo de declaração explícita.

Essa separação existe para impedir vários tipos de ataques, principalmente relacionados a:

roubo de sessão
CSRF
vazamento de autenticação entre sites
requisições invisíveis feitas por páginas maliciosas

Por isso os navegadores exigem que tanto o frontend quanto o backend concordem explicitamente em compartilhar credenciais.

Seu backend já estava correto:

credentials: true

no CORS.

Mas faltava o frontend também declarar isso através do Axios.

O que eu entendia era que, quando eu faço uma requisição com withcredentials: true eu estou enviando já as credenciais na primeira ação, ou seja, na minha cabeça eu teria que enviar as credenciais para efetuar login, o que seria redundantes.

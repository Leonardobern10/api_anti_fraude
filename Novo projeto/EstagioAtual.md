1️⃣ Cadastro e autenticação de usuários
- Cadastro com e-mail e senha
- Login seguro
- Recuperação de senha
- Controle básico de permissões

1. API REST
2. Rotas que abordem:
    a. Criação
    b. Login
    c. Desconexão
    d. Recuperação de senha
3. Métodos / rota
    a. POST /register
        - 201 CREATED: User created with sucessfull.
        - 400 BAD REQUEST: Info send is invalid.
        - 400 BAD REQUEST: This email always is registered.
    b. POST /login
        - 200 OK: User logged with sucessfull
        - 400 BAD REQUEST: Info send is invalid.
        - 404 NOT FOUND: User not found.
    c. GET /authState
        - 200 OK: This user is logger / unlogged.
        - 400 BAD REQUEST: Info send is invalid.
        - 404 NOT FOUND: User not found. 
        - 403 FORBIDDEN: User not authorized for this operation.
    d. GET /logout
        - 200 OK: User was unlogged with successful.
        - 400 BAD REQUEST: Info send invalid.
        - 404 NOT FOUND: User not found.
        - 403 FORBIDDEDN: User not found for this operation.

    e. POST /resetPassword
    f. PUT /
    g. DELETE /
# **Projeto Fullstack Labenu - Backend**

## Stack
Este é um projeto de Back-end Web desenvolvido em Node.js, utilizando Typescript e banco de dados MySQL. A API está hospedada no Heroku.

## Sobre
O projeto se trata de um site de compartilhamento de imagens, nos moldes do Flickr. O usuário pode se registrar ou logar numa conta previamente criada. Estando logado, ele pode definir uma foto de perfil e adicionar imagens à sua galeria. Também pode clicar numa imagem  de sua galeria para vê-la em destaque junto com outras informações.

A comunicação do front com o back-end é feita através de requisições do Axios para a API, que conta com múltiplos endpoints. O id de cada usuário é gerado automaticamente via uuid, as senhas são criptografadas com bcryptjs e é gerado um token de acesso pelo jsonwebtoken. O projeto segue o padrão MVC.

## Instruções para rodar
Acessar o site https://flickenu.surge.sh/ e criar um novo usuário.

## Link para parte Frontend do projeto
https://github.com/glhermepaiva/Frontend-Projeto_Fullstack

## Contato
Guilherme Paiva
https://www.linkedin.com/in/glhrmpaiva

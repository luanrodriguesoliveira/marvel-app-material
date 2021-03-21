# Marvel App

## Projeto feito com NextJs :fa-heart:

![](https://i.ibb.co/34M84VF/image.png)

Url de acesso:

> marvel-app-material.vercel.app

Para iniciar o projeto em modo desenvolvimento: `yarn run dev`
As chaves da API foram colocadas em .env na raiz, como descrito em .env.example

#### Páginas

- / => Página principal
- /personagem/id => Página do personagem
- /quadrinho/id => Página do quadrinho
- /search => Página de busca

#### Busca

- /search?query=**busca**

A busca retorna personagens com nomes parecidos. (Deve ser em inglês)

#### Observações

- Alguns personagens não possuem thumbs na api. Fiquei em dúvida se eu limitava a somente personagens mais famosos, porém resolvi deixar o site mostrando todos.
- Poucos também possuem descrição.

#### Utilização

Basta clicar em um personagem para saber mais informações sobre ele. Os quadrinhos no qual ele apareceu são mostrados embaixo e também são clicáveis, caso se queira saber mais informações. Cada quadrinho mostra também os personagens que estiveram nele.

#### Melhorias possíveis

- Alguns componentes genéricos poderiam ser criados, como um componente content com infos e cards related abaixo. Assim daria pra usar a mesma estrutura para quadrinhos e personagens, por exemplo.
- Opções de filtragem dos personagens
- Página quadrinhos
- Página eventos
- Cache para não precisar consultar sempre a API
- E mais (O ceú é o limite)

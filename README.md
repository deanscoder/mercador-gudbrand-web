# Mercador Gudbrand Web Client
![Status](https://img.shields.io/badge/status-em%20desenvolvimento-blue)

![Website](https://img.shields.io/website?down_message=off&label=demo%20on%20vercel&style=for-the-badge&up_message=on&url=https%3A%2F%2Fgudbrand.vercel.app) ![Twitter Follow](https://img.shields.io/twitter/follow/servosalt?label=Follow%20me%20on%20twitter&style=for-the-badge)
## Client next.js e-commerce híbrido (NoSQL, SQL) multilojas com gate de pagamento mercado pago e backend Wordpress.
O projeto foi iniciado quando comecei a aprende React.js e Next.js em 2020, devido problemas pessoais precisei para-lo por 6 meses e retornei agora. Este client consome [API do WooCommerce](https://woocommerce.github.io/woocommerce-rest-api-docs/) instalado em um **"backend" CMS** como o [Wordpress](https://br.wordpress.org/download/) *─ atualmente em sua Versão 6.0 ─* em paralelo a um banco de dados MongoDB para features extras.

## Tabela de conteúdos

<!--ts-->
  * [Status do Projeto](#funcional-e-em-desenvolvimento)
  * [Ver Demo](#demonstração)
  * [Objetivos](#objetivos)
    * [Para o projeto](#para-o-projeto)
    * [Pessoais](#pessoais)
  * [Notas](#notas)

## Funcional e em Desenvolvimento
****

### Destaques

- [x] Criar conta de usuário
- [x] Editar dados de usuário
- [x] Pesquisar produtos por nome
- [x] Pesquisar produtos por categoria ou tag
- [x] Verificação de email através de código
- [x] Carrinho de compras dinâmico (separado por lojas para atribuir o custo dos fretes originários de diferentes locais)
- [x] Consulta de frete único na página de produto
- [x] Consulta de frete total relacionado as dimensões e peso de todos os produtos do carrinho de cada loja.
- [x] Suporte de Logística
  - [x] Tabela pessoal em JSON com taxas para entregas locais onde o cliente e a loja estão na mesma localidade (cidade). Ex: Motoboy
  - [x] Pesquisar soluções de transportadoras através da API do Melhor Envio.
- [x] Tema Dual; Light and Dark adaptativo a preferência do sistema. 
- [x] Compras funcionais.
- [x] API do Telegram avisando contas novas e pagamentos recebidos (Pedido: Processando)
- [ ] Criar uma UI mais amigável e bonita
- [ ] Criar um painel para administração de produtos, contas, livro-caixa, suporte
- [ ] Configurar o i18n para outros idiomas
- [ ] Otimizar o Search



### Demonstração
[View Demo | Ver Demo](https://gudbrand.vercel.app/)

# Objetivos
### Para o Projeto
Ser um poderoso e-commerce com bastante velocidade e minimalismo. Foi meu primeiro projeto e tenho orgulho de seu desenvolvimento, mesmo que imaturo. Que sirva de inspiração ou de tira-dúvidas para posterioridade.

### Pessoais
Além do amadurecimento profissional desejo de alguma maneira ajudar as pessoas com suas necessidades, eu sou hebreu e quero contribuir com minha comunidade. 

Eu sei que é uma longa jornada e atualmente minhas habilidades são pequenas, mas o dom que H'shem me emprestou foi a grande capacidade de aprender.


# NOTAS
Pode parecer confuso a integração de tanta coisa, como por exemplo o uso de dois bancos de dados, SQL e o NoSQL, esse projeto eu iniciei sem conhecimentos e com muita sede, tudo que via a minha disposição implementei para ter uma experiência real de suas utilidades, e digo que houveram até mais coisas que já foram retiradas, *risos*. 

Planejo futuramente migrar a plataforma para um único banco de dados SQL, além de separar as funções da pasta `/src/api` que faz parte do backend para um servidor próprio em node.js e express (provavelmente). 

Deixarei de usar o WooCommerce e seu parceiro Wordpress quando tiver tempo para criar um painel minimamente decente para gerir conteudo.

Pastas `/public` e `/config` não foram anexadas por motivos de segurança.

## O Demo
Está feito upload no GitLab, pois o uso a mais tempo e também possuo funções CI/CD para sincronizar os 2 bancos de dados, uma vez por dia.

## Por que o código está tão verboso
Bom, eu comecei escrevendo-o em inglês, com camelCase entre outras firulas, mas como meu código não foi premeditado e muitas coisas irão serem modificadas eu resolvi escreve-las por extenso e snake_case, assim como projetos de ASSEMBLY e C++.

## Copyright
O projeto é de natureza academica, para fins de estudo e demonstração de abstração, ou seja, imagens, [produtos, logos, marcas, slides e etc], conteúdos midiáticos do web-site ou de terceiros, nomenclaturas, não podem serem reutilizadas pois são patenteadas por mim ou por seus responsáveis aos quais me cederam e medidas legais serão tomadas caso não respeitado esses limítes.

Usem o código como quiserem, copiando, modificando, tomando por inspiração todo ou fração dele, se o melhorarem em algo não esqueçam de mim, também desejo aprender mais

Compartilhem suas ideias comigo [andrade@gudbrand.com.br](mailto://andrade@gudbrand.com.br)!
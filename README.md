# Novo site institucional da MCSA

Site estático e responsivo feito em HTML, CSS e JavaScript. Toda a navegação editorial permanece no novo site: os artigos abrem em uma janela interna, o método tem etapas expansíveis e os filtros organizam os conteúdos. O contato usa o telefone público da MCSA; a área de carreiras permite copiar o e-mail de recrutamento.

A versão atual traz duas composições ilustrativas geradas a partir dos retratos públicos da equipe: Marcelo Candiotto com Carolina Sant’Ana na página inicial e Marcelo com Rodrigo Valle na seção Sobre. Também inclui animação do título, revelação das seções, números animados, barra de progresso e respostas discretas dos cartões e botões ao ponteiro. O movimento respeita a preferência do sistema por animações reduzidas. A referência de ritmo e interação foi o repositório da VeriSeal: https://github.com/guilhermerezende-hub/-VeriSeal.

O destaque principal usa a frase “Seu crédito em foco / Negócios em movimento”. A faixa animada apresenta os nomes de empresas informados pelo cliente: Movida, Localiza, Itaú, Direcional Engenharia, VIC Engenharia, Cyrela, Tenda, Emcamp, DivBank, Tabelionato e LCM.

## Como executar

Abra o `index.html` no navegador. Para testar com um servidor HTTP, execute `npx serve .` na raiz do projeto e abra o endereço exibido no terminal.

## Organização do projeto

- `index.html` contém a página principal.
- `assets/css/` reúne os estilos do site e das animações.
- `assets/js/` reúne os scripts de interação e animação.
- `assets/images/` agrupa as imagens em `marca/`, `institucional/`, `equipe/` e `reconhecimentos/`.
- [docs/PROMPTS.md](docs/PROMPTS.md) registra os prompts das composições ilustrativas.

## Fontes do conteúdo e das imagens

- Site institucional: https://mcsarc.com.br/
- Sobre a MCSA e sócios: https://mcsarc.com.br/sobre-nos/
- Reconhecimentos: https://mcsarc.com.br/reconhecimentos/
- Temas dos artigos: https://mcsarc.com.br/blog/
- Contato: https://mcsarc.com.br/contato/
- E-mail de recrutamento publicado pela equipe: https://br.linkedin.com/company/mcsa-rc

As informações foram consultadas em 16/11/2026. As imagens da pasta `assets/images/` foram obtidas do site institucional, com exceção de `marcelo-carolina.png` e `marcelo-rodrigo-valle.png`, criadas a partir dos retratos públicos e identificadas na página como composições ilustrativas. Todos os arquivos são servidos localmente pelo novo site. A página inicial da MCSA informa mais de 19 anos de experiência; a página “Sobre nós” ainda mostra 17 anos. Esta versão usa o dado da página inicial.

O site não contém um formulário de envio porque não foi fornecido um destino de mensagens nem uma integração de atendimento. Os botões de contato levam à seção local e ao número 0800 divulgado pela MCSA.

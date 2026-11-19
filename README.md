# Novo site institucional da MCSA

Site estático e responsivo feito em HTML, CSS e JavaScript. Os artigos abrem em uma janela interna e podem ser filtrados por assunto. A seção de método permite percorrer as quatro etapas pela rolagem ou pelos atalhos numerados. O contato usa o telefone público da MCSA e a área de carreiras permite copiar o e-mail de recrutamento.

A abertura mostra Marcelo Candiotto com Carolina Sant’Ana, e a seção Sobre mostra Marcelo com Rodrigo Valle. As duas imagens são composições ilustrativas geradas a partir dos retratos públicos da equipe. Na seção de método, uma linha dourada acompanha a leitura. O site respeita a preferência do sistema por movimento reduzido, e a faixa de empresas tem um botão de pausa. As interações foram inspiradas no [site da VeriSeal](https://github.com/guilhermerezende-hub/-VeriSeal).

O destaque principal usa a frase “Seu crédito em foco / Negócios em movimento”. A faixa animada apresenta os nomes de empresas informados pelo cliente: Movida, Localiza, Itaú, Direcional Engenharia, VIC Engenharia, Cyrela, Tenda, Emcamp, DivBank, Tabelionato e LCM.

## Como executar

Abra o `index.html` no navegador. Para testar com um servidor HTTP, execute `npx serve .` na raiz do projeto e abra o endereço exibido no terminal.

## Organização do projeto

- `index.html` contém a página principal.
- `assets/css/` reúne os estilos do site e das animações.
- `assets/fonts/` contém a fonte Manrope e sua licença.
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

O site não contém um formulário de envio porque não foi fornecido um destino de mensagens nem uma integração de atendimento. Os botões de contato levam à seção local e ao telefone +55 31 9160-4000.

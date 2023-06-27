# Module `Presentation`

## GitHub usage

Nossa equipe organizou em conjunto com o professor o uso de Projects do
GitHub para organização de tarefas das equipes, e usamos esta funcionalidade
durante todo o semestre. Também fizemos o uso de PRs, especialmente para a
implementação do Vite no projeto.

## Description

O módulo de Presentation é responsável por apresentar o resultado da
visualização que o usuário construiu no módulo de Workflow.

Inicialmente, o módulo será responsável por providenciar templates de
visualizações sob os quais o usuário poderá exibir gráficos, controles,
filtros, entre outros componentes, contribuindo para a criação da visualização
desejada.

Por fim, através de um conjunto de informações recebidos do componente de
Workflow, o módulo irá instanciar todos os componentes necessários para
representar o estado desejado, os inserirá na tela no local e tamanho desejados
e, por fim, fará as devidas conexões e configurações conforme especificado
previamente pelo usuário, de maneira a prover uma experiência dinâmica.

## Team

- `Daniel Credico Coimbra` (RA: 155077)
- `Fernanda Garcia Da Lavra` (RA: 171345)
- `Leandro Hélio Ferreira da Silva` (RA: 121092)
- `Matheus Otávio Rodrigues` (RA: 222318)
- `Miguel Teixeira Buzato` (RA: 185598)

## Message Types

**`Request`**

```json
{
  "message": "requestTemplate"
}
```

**`Template`**

```json
{
  "template": "<string>",
  "description": "<string>",
  "regions": [
    {
      "id": "<string>",
      "size": "<string>" // small, medium, large or xlarge
    }
  ]
}
```

**`JSONHTMLDescription`**

```json
{
  [
    {
      "tag": "<string>",
      "region": "<string>", // region id of the template
      "params": [{
        "param": "<string>",
        "value": "<string>"
      }],
      "children": <self>[]
    }
  ]
}
```

## Components

### Component `template-lister`

Retornará quando solicitado a lista com os templates disponíveis na aplicação para a criação do Workflow.

#### Input Notices

| notice                 | action                                                | message type |
| ---------------------- | ----------------------------------------------------- | ------------ |
| `requestTemplatesList` | Faz o pedido para a listagem de templates disponíveis | `Request`    |

#### Output Notices

| notice                  | source                                                                                 | message type                                          |
| ----------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `responseTemplatesList` | Irá retornar os templates disponíveis uma vez que receber a notice "request templates" | JSON array com cada elemento sendo do tipo `Template` |

### Component `application`

O componente controla vários aspectos importantes, como alternar o tema entre `dark` e `light` utilizando o theme-switcher, e as abas para alternar entre os fluxos de workflow e apresentação.
Este componente não recebe e nem envia informações no barramento.

### Component `builder`

O componente receberá as informações do tópico `workflow/grafo` no barramento de mensagens acerca do template escolhido pelo usuário e dos componentes que serão instanciados em tal template.
Então, construirá um JSON articulando as tags e os parâmetros que serão utilizadas na apresentação HTML dos componentes.

#### Input Notices

| notice             | action                                                                     | message type                                |
| ------------------ | -------------------------------------------------------------------------- | ------------------------------------------- |
| `getWorkflowGraph` | Emitido uma vez que o workflow estiver construída e pronta para utilização | Tipo de dado definido pelo time de Workflow |

#### Output Notices

| notice         | action                                                               | message type          |
| -------------- | -------------------------------------------------------------------- | --------------------- |
| `sendJSONHTML` | Emitido assim que o JSON de tags e parâmetros de HTML estiver pronto | `JSONHTMLDescription` |

### Component `presenter`

O componente receberá um JSON especificando o HTML, com o qual instanciará todos os componentes necessários para representar a visualização desejada pelo usuário,
os inserirá na tela no local e tamanho desejados e, por fim, fará as devidas conexões e configurações conforme especificado previamente no Workflow.

#### Input Notices

| notice        | action                                                                         | message type          |
| ------------- | ------------------------------------------------------------------------------ | --------------------- |
| `getJSONHTML` | Emitido uma vez que a visualização estiver construída e pronta para utilização | `JSONHTMLDescription` |

## Narratives

- O componente **template-lister** recebe via barramento no tópico `presentation/templates/requisicao` uma requisição dos templates disponíveis por parte dos componentes de Workflow.
  - Ao receber esta mensagem, será respondida uma outra mensagem em `presentation/templates/listagem` com um objeto JSON contendo informações sobre todos os templates. Os templates estarão definidos em um arquivo específico para este fim, estático, com uma quantidade finita e definida de templates possíveis.
- Os componentes do time de Workflow montam a estrutura de interconexão entre os componentes definidos pelo usuário, enviando uma mensagem no tópico `workflow/grafo` com um JSON informando as relações entre os componentes escolhidos e os seus parâmetros.
- O componente **builder** então recebe os dados (incluindo o layout) pelo tópico `workflow/grafo`, com um message type chamado `WorkflowState` (a ser definido pelo grupo de Workflow) contendo a lista de componentes (nós) e suas relações (arestas), e a partir disso constroi um JSON articulando as tags e os parâmetros que serão utilizadas na apresentação HTML dos componentes. Após a construção deste JSON (do tipo `JSONHTMLDescription`), o mesmo será enviado para o tópico `presentation/html/representacaoJSON`
- O componente **presenter** recebe o JSON do componente **Builder** pelo tópico `presentation/html/representacaoJSON` e faz a instanciação dos componentes recebidos com os devidos parâmetros, fazendo as devidas conexões previamente estabelecidas, e faz a inserção do layout para a visualização do usuário na tela.
  - Caso algum componente exija dados adicionais que não são necessários no processo de Workflow (não é esperado), assinaremos tópicos específicos no BUS, definidos pelas equipes de cada componente, para obtenção dessas informações. Os tópicos podem seguir o padrão `<componente\>/\<subcomponente\>/presentation` como sugestão.
- Os Componentes **templates** recebem regions, estas regions são então apresentadas na tela de acordo com a posição na qual foram instanciadas.
  Eles não se utilizam do barramneto e recebem os Htmls dos componentes criados pelos outros grupos. Hoje, enquanto os componentes dos outros grupos ainda não foram implementados, foram criados stubs, estes tem cores e podem ou náo ter conexões entre outros, caso exista tal conexão, as cores de um componente clicado e os conectados a ele mudam.
- O componente **application** é a casca de toda a aplicação. Ele controla o tema entre `dark` e `light` utilizando o **theme-switcher**, e também o controle de abas para alternar entre os fluxos de workflow e apresentação.

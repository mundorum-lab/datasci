# Module `Presentation`

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

Todos os membros do time participaram de duas reuniões para definição da
estrutura das mensagens e dos componentes de nosso módulo, o que inlcui
interfaces de I/O e a narrativa de operação do sistema.

- `Daniel Credico Coimbra`
  - Elaboração dos message types;
  - Redação do componente Fornecedor_de_Templates;
  - Participação na elaboração da narrativa;
  - Elaboração da formatação inicial do markdown;
  - Elaboração conjunta do message type JSON2HTML;
  - Elaboração do message type Request;
  - Elaboração do componente Construtor, com alteração correspondente no componente Apresentador.

- `Fernanda Garcia Da Lavra`
  - Responsável pela organização de tarefas, intercomunicação com os demais
    grupos e codificação;
  - Responsável pela estilização dos componentes;
  - Participação na elaboração inicial da narrativa;
  - Elaboração conjunta do message type JSON2HTML;
  - Reescrita da narrativa refletindo novos componentes.

- `Leandro Hélio Ferreira da Silva`
  - Desenvolvimento da interface de apresentação gŕafica;
  - Auxílio na elaboração das referências em JavaScript;
  - Participação na elaboração inicial dos demais elementos;
  - Elaboração do código do componente Painel_Workflow;
  - Versão inicial dos códigos JS dos componentes Fornecedor, Construtor, e Apresentador.
  - Adicionou message type para os componentes Importador e Apresentador

- `Matheus Otávio Rodrigues`
  - Colaboração com a documentação dos componentes incluindo sua definição,
    forma de comunicação, Narrativas e especificação;
  - Responsável pela programação dos componentes de Apresentação,
    desenvolvimento da interface visual destes componentes e intercomunicação dos
    componentes recebidos por outras equipes;
  - Refatoração das versões iniciais dos códigos JS dos componentes;
  - Elaboração conjunta do message type JSON2HTML.


- `Miguel Teixeira Buzato`
  - Referência em HTML, CSS e JavaScript;
  - Responsável pela estilização dos componentes;
  - Codificação dos templates;
  - Criação do branch e upload de arquivos;
  - Criação do primeiro ambiente de teste ("HTML playground");
  - Versão inicial do código JS do componente Fornecedor.

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
  "regions": [{
    "id": "<string>",
    "size": "<string>" // small, medium or large
  }]
}
```

**`JsonHTMLDescription`**

```json
{
  [
    {
      "component_path": "<string>",
      "tag": "<string>",
      "region": "<string>", // region id of the template
      "params": [{
        "param": "<string>",
        "value": "<string>"
      }],
      "children": [{
        "tag": "<string>",
        "params": [{
          "param": "<string>",
          "value": "<string>"
        }]
      }]
    }
  ]
}
```

## Components

### Component `Fornecedor`

Retornará quando solicitado a lista com os templates disponíveis na aplicação para a criação do Workflow.

#### Input Notices

| notice                 | action                                                | message type |
| ---------------------- | ----------------------------------------------------- | ------------ |
| `requestTemplatesList` | Faz o pedido para a listagem de templates disponíveis | Request      |

#### Output Notices

| notice               | source                                                                                 | message type                                          |
| -------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `responseTemplatesList` | Irá retornar os templates disponíveis uma vez que receber a notice "request templates" | JSON array com cada elemento sendo do tipo `Template` |

### Component `Construtor`

O componente receberá as informações do tópico `workflow/grafo` no barramento de mensagens acerca do template escolhido pelo usuário e dos componentes que serão instanciados em tal template. Então, construirá um JSON articulando as tags e os parâmetros que serão utilizadas na apresentação HTML dos componentes.

#### Input Notices

| notice                | action                                                                         | message type |
| --------------------- | ------------------------------------------------------------------------------ | ------------ |
| `getWorkflowGraph`      | Emitido uma vez que o workflow estiver construída e pronta para utilização     | Tipo de dado definido pelo time de Workflow             |

#### Output Notices

| notice                | action                                                                         | message type |
| --------------------- | ------------------------------------------------------------------------------ | ------------ |
| `sendJsonHTML` | Emitido assim que o JSON de tags e parâmetros de HTML estiver pronto           | Objeto `JsonHTMLDescription`             |


### Component `Importador`

O componente receberá um JSON especificando o HTML, com o qual importará os componentes necessários na página HTML.

#### Input Notices

| notice                | action                                                                         | message type |
| --------------------- | ------------------------------------------------------------------------------ | ------------ |
| `getJsonHTML` | Emitido uma vez que a visualização estiver construída e pronta para utilização | JsonHTMLDescription             |


### Component `Apresentador`

O componente receberá um JSON especificando o HTML, com o qual instanciará todos os componentes necessários para representar a visualização desejada pelo usuário, os inserirá na tela no local e tamanho desejados e, por fim, fará as devidas conexões e configurações conforme especificado previamente no Workflow.

#### Input Notices

| notice                | action                                                                         | message type |
| --------------------- | ------------------------------------------------------------------------------ | ------------ |
| `getJsonHTML` | Emitido uma vez que a visualização estiver construída e pronta para utilização | JsonHTMLDescription             |


## Components Narratives

### Setup

```html
<fornecedor-oid
subscribe="apresentacao/templates/requisicao~requestTemplatesList"
publish="responseTemplatesList~apresentacao/templates/listagem"
>
</fornecedor-oid>

<construtor-oid
subscribe="workflow/grafo~getWorkflowGraph"
publish="sendJsonHTML~apresentacao/html/representacaoJson"
>
</construtor-oid>

<importador-oid
subscribe="apresentacao/html/representacaoJson~getJsonHTML"
>
</importador-oid>

<apresentador-oid
subscribe="apresentacao/html/apresentacaoJson~getJsonHTML"
>
</apresentador-oid>
```

### Narrative

- O componente **Fornecedor** recebe via barramento no tópico
 `apresentacao/templates/requisicao` uma requisição dos templates disponíveis por
  parte dos componentes de Workflow.
  - Ao receber esta mensagem, será respondida uma outra mensagem em `apresentacao/templates/listagem` com um objeto JSON contendo informações sobre todos os templates. Os
    templates estarão definidos em um arquivo específico para este fim, estático,
    com uma quantidade finita e definida de templates possíveis.
- Os componentes do time de Workflow montam a estrutura de interconexão entre
  os componentes definidos pelo usuário, enviando uma mensagem no tópico
  `workflow/grafo` com um JSON informando as relações entre os componentes
  escolhidos e os seus parâmetros.
- O componente **Construtor** então recebe os dados (incluindo o layout) pelo
  tópico `workflow/grafo` e constroi um JSON articulando as tags e os parâmetros que serão utilizadas na apresentação HTML dos componentes. Após a construção deste JSON (do tipo `JsonHTMLDescription`), o mesmo será enviado para o tópico `apresentacao/html/representacaoJson`
- O componente **Importador** recebe o JSON do componente **Construtor** pelo tópico `apresentacao/html/representacaoJson` e faz a importação dos componentes na página HTML (inserção dos scripts type=module na página HTML).
- O componente **Apresentador** recebe o JSON do componente **Construtor** pelo tópico `apresentacao/html/representacaoJson` e faz a instanciação dos componentes recebidos com os devidos parâmetros, fazendo as devidas conexões previamente estabelecidas, e faz a inserção do layout para a visualização do usuário na tela.
  - Caso algum componente exija dados adicionais que não são necessários no
    processo de Workflow (não é esperado), assinaremos tópicos específicos no
    BUS, definidos pelas equipes de cada componente, para obtenção dessas
    informações. Os tópicos podem seguir o padrão `<componente\>/\<subcomponente\>/apresentacao` como sugestão.

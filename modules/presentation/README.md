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
  - Elaboração da formatação markdown.

- `Fernanda Garcia Da Lavra`

  - Responsável pela organização de tarefas, intercomunicação com os demais
    grupos e codificação;
  - Responsável pela estilização dos componentes;
  - Participaçao na elaboração da narrativa.

- `Leandro Hélio Ferreira da Silva`

  - Desenvolvimento da interface de apresentação gŕafica;
  - Auxílio na elaboração das referências em JavaScript;
  - Participação na elaboração dos demais elementos.

- `Matheus Otávio Rodrigues`

  - Colaboração com a documentação dos componentes incluindo sua definição,
    forma de comunicação, Narrativas e especificação;
  - Responsável pela programação dos componentes de Apresentação,
    desenvolvimento da interface visual destes componentes e intercomunicação dos
    componentes recebidos por outras equipes.

- `Miguel Teixeira Buzato`
  - Referência em HTML, CSS e JavaScript;
  - Responsável pela estilização dos componentes;
  - Codificação dos templates;
  - Criação do branch e upload de arquivos.

## Message Types

**`Template`**

```json
{
  template: <string>
  regions: [{
    id: <string>
    size: <string> // Small, Medium or Large
  }]
}
```

## Components

### Component `Fornecedor_De_Templates`

Retornará quando solicitado a lista com os templates disponíveis na aplicação para a criação do Workflow.

#### Input Notices

| notice              | action                                                | message type |
| ------------------- | ----------------------------------------------------- | ------------ |
| `request_templates` | Faz o pedido para a listagem de templates disponíveis |

#### Output Notices

| notice               | source                                                                                 | message type                                          |
| -------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `templates_response` | Irá retornar os templates disponíveis uma vez que receber a notice "request templates" | JSON array com cada elemento sendo do tipo `Template` |

### Component `Apresentador`

O componente irá instanciar todos os componentes necessários para representar a visualização desejada pelo usuário, os inserirá na tela no local e tamanho desejados e, por fim, fará as devidas conexões e configurações conforme especificado previamente no Workflow.

#### Properties

| property         | role                                                                                                         |
| ---------------- | ------------------------------------------------------------------------------------------------------------ |
| `workflow_graph` | Contém os dados do grafo construído na etapa de Workflow e que serão utilizados para criação da visualização |
| `template`       | Define o template a ser utilizado pela visualização                                                          |

#### Input Notices

| notice                | action                                                                         | message type |
| --------------------- | ------------------------------------------------------------------------------ | ------------ |
| `visualization_ready` | Emitido uma vez que a visualização estiver construída e pronta para utilização |

## Components Narratives

### Setup

```html
<Fornecedor_De_Templates
  subscribe="”workflow:request_templates"
  publish="templates_response:workflow"
>
</Fornecedor_De_Templates>

<Apresentador
  attribute="workflow_graph"
  attribute="template"
  subscribe="”workflow:visualize"
  publish="visualization_ready:workflow"
>
</Apresentador>
```

### Narrative

- O componente Fornecedor de Template recebe via barramento no tópico
  apresentacao/templates/listagem uma requisição dos templates disponíveis por
  parte dos componentes de Workflow.
  - Ao receber esta mensagem, será respondida uma outra mensagem no mesmo
    tópico com um objeto JSON contendo informações sobre todos os templates. Os
    templates estarão definidos em um arquivo específico para este fim, estático,
    com uma quantidade finita e definida de templates possíveis.
- Os componentes do time de Workflow montam a estrutura de interconexão entre
  os componentes definidos pelo usuário, enviando uma mensagem no tópico
  workflow/grafo com um JSON informando as relações entre os componentes
  escolhidos e os seus parâmetros.
- O componente Apresentador então recebe os dados (incluindo o layout) pelo
  tópico workflow/grafo e faz a instanciação dos componentes recebidos com os
  devidos parâmetros no layout para a visualização do usuário.
  - Caso algum componente exija dados adicionais que não são necessários no
    processo de Workflow (não é esperado), assinaremos tópicos específicos no
    BUS, definidos pelas equipes de cada componente, para obtenção dessas
    informações. Os tópicos podem seguir o padrão
    \<componente\>/\<subcomponente\>/apresentacao como sugestão.

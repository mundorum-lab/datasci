# Dynamic Rendering

Como já descrito no `README` do módulo, cada componente pode apresentar uma gama de parâmetros de configuração. Por isso, ao criar a *UI* do nó os campos de configuração devem ser renderizados dinâmicamente. Neste exemplo, é demonstrada a renderização dos campos de 3 tipos de nós distintos que foram declarados no arquivo `nodeExample.json` e expostos para o component `component-provider-oid` pelo arquivo `manifest.js`. Agora, considere o seguinte

```html
<component-provider-oid id="provider"></component-provider-oid>
<div class="flex items-center justify-center w-full gap-4">
    <world-space-node type="data:database" id="a" name="Lorem Ipsum" connect="itf:component-provider#provider"></world-space-node>
    <world-space-node type="transform:filter" id="b" name="Ipsum Lorem" connect="itf:component-provider#provider"></world-space-node>
    <world-space-node type="lorem:ipsum" id="b" name="Dolor Sit" connect="itf:component-provider#provider"></world-space-node>
</div>
```

O component `component-provider-oid` provê aos nós as informações necessárias sobre seus campos de entrada, por meio da interface `itf:component-provider`, para que estes possam realizar sua renderização. Vale ainda notar que devido a natureza assincrona do javascript é possível que os nós tentem gerar sua *UI* antes do provedor de informações estar pronto. Sendo assim, os nós entram em modo de carregamento esperam até que o provedor esteja pronto para que possam, de fato, renderização sua *UI*.


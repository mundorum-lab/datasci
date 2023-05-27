import { css, html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class FileReaderOid extends OidUI {
  _onDragover (event) {
    if (this.pre)
      this._presentation.innerHTML = this.pre
    event.preventDefault()
  }

  async _onDrop (event) {
    event.preventDefault()
    if (this.post)
      this._presentation.innerHTML = this.post

    let file = null
    if (event.dataTransfer.items) {
      for (let item of event.dataTransfer.items) {
        if (item.kind === 'file')
          file = item.getAsFile()
      }
    } else
      file = event.dataTransfer.files[0]

    const file_extension = file.name.split('.').pop();
    const file_name = file.name.split('.')[0];
    console.log("file extension", file_extension)
    if(file_extension === 'json'){
      var text = await file.text();
      var jsonData = JSON.parse(text);
      console.log(jsonData);

      // Abre ou cria o banco de dados
    const request = indexedDB.open('MundorunDatabase', 3);

    // Manipula o evento de upgrade needed da abertura do banco de dados
    request.onupgradeneeded = function (event) {
      const db = event.target.result;

      // Verifica se o objeto de armazenamento já existe
      if (!db.objectStoreNames.contains(`Mundorun_${file_name}`)) {
        // Cria o objeto de armazenamento
        const store = db.createObjectStore(`Mundorun_${file_name}`, { keyPath: 'id', autoIncrement: true });
        console.log(`Mundorun_${file_name} criado com sucesso.`);
      }
    };

    // Manipula o evento de sucesso da abertura do banco de dados
    request.onsuccess = function (event) {
      const db = event.target.result;

      // Verifica se o objeto de armazenamento existe
      if (db.objectStoreNames.contains(`Mundorun_${file_name}`)) {
        // Cria ou acessa o objeto de armazenamento (tabela)
        const transaction = db.transaction(`Mundorun_${file_name}`, 'readwrite');
        const store = transaction.objectStore(`Mundorun_${file_name}`);

        // Adiciona o objeto jsonData ao objeto de armazenamento
        const addRequest = store.add(jsonData);

        // Manipula o evento de sucesso da adição
        addRequest.onsuccess = function (event) {
          console.log('Dados adicionados com sucesso ao IndexedDB.');
        };

        // Manipula o evento de erro da adição
        addRequest.onerror = function (event) {
          console.error('Erro ao adicionar dados ao IndexedDB:', event.target.error);
        };
      } else {
        console.error(`PObjeto de armazenamento Mundorun_${file_name} não encontrado no banco de dados.`);
      }
    };

    // Manipula o evento de erro da abertura do banco de dados
    request.onerror = function(event) {
      console.error('Erro ao abrir o banco de dados:', event.target.error);
    };


    }
    else if(file_extension === 'csv'){
      console.log("Guarda csv no banco");
    } 

    if(this.sep!==''){
      console.log("Tem separador");
    }
    const content = await file.text()
    this._notify('loaded', {value: content})
    this._invoke('itf:transfer', 'send', {value: file_name})
  }
}

Oid.component(
{
  id: 'oid:file',
  element: 'filereader-oid',
  properties: {
    label: { default: 'Drop Zone' },
    pre:   { default: 'Drop your file here' },
    post:  { default: 'File loaded' },
    sep: { default: ''}
  },
  implementation: FileReaderOid,
  styles: css`
  #oid-prs {
    border: 5px solid;
  }`,
  template: html`
  <div id="oid-prs" @dragover @drop>{{this.label}}</div>`
})
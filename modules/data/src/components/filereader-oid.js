import { css, html, Oid, OidUI } from '/lib/oidlib-dev.js';

export class FileReaderOid extends OidUI {
  _onDragover(event) {
    if (this.pre)
      this._presentation.innerHTML = this.pre;
    event.preventDefault();
  }

  async _onDrop(event) {
    event.preventDefault();
    if (this.post)
      this._presentation.innerHTML = this.post;

    let file = null;
    if (event.dataTransfer.items) {
      for (let item of event.dataTransfer.items) {
        if (item.kind === 'file')
          file = item.getAsFile();
      }
    } else
      file = event.dataTransfer.files[0];

    const file_extension = file.name.split('.').pop();
    const file_name = file.name.split('.')[0];
    console.log("file extension", file_extension);

    const dbName = "DatabaseMundorun";
    const objectStoreName = `${file_name}mundorundataStore`;
    const text = await file.text();
    let dataArray = [];

    if (file_extension === 'json') {
      const jsonData = JSON.parse(text);
      console.log(jsonData);
      dataArray = jsonData;
    }
    else if (file_extension === 'csv') {
      console.log("Guarda csv no banco");
      let sep = this.sep === '' ? ',' : this.sep;

      const lines = text.split(/\r?\n/);
      const keys = lines[0].split(sep); // Obtém as chaves do cabeçalho

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(sep);
        const obj = {};
      
        for (let j = 0; j < keys.length; j++) {
          obj[keys[j]] = values[j];
          if (!isNaN(values[j])) {
            obj[keys[j]] = parseInt(values[j]);
          }
        }
      
        dataArray.push(obj);
      }
    } 

    console.log("data:", dataArray);

    // Verifica a compatibilidade do navegador com o IndexedDB
    if (!window.indexedDB) {
      console.log("Seu navegador não suporta o IndexedDB.");
    } else {
      // Abre (ou cria) o banco de dados
      const request = window.indexedDB.open(dbName, 1);

      request.onerror = function(event) {
        console.log("Erro ao abrir o banco de dados:", event.target.errorCode);
      };

      request.onupgradeneeded = function(event) {
        const db = event.target.result;

        // Cria a object store (loja de objetos) no banco de dados
        const objectStore = db.createObjectStore(objectStoreName, { keyPath: "id", autoIncrement: true });

        // Cria um índice para cada chave dos objetos
        for (const key in dataArray[0]) {
          objectStore.createIndex(key, key, { unique: false });
        }
      };

      request.onsuccess = function(event) {
        const db = event.target.result;

        // Inicia uma transação de leitura/gravação na object store
        const transaction = db.transaction([objectStoreName], "readwrite");
        const objectStore = transaction.objectStore(objectStoreName);

        // Adiciona cada objeto individualmente na object store
        dataArray.forEach(function(data) {
          const addObjectRequest = objectStore.add(data);

          addObjectRequest.onsuccess = function(event) {
            console.log("Objeto adicionado ao banco de dados com sucesso.");
          };

          addObjectRequest.onerror = function(event) {
            console.log("Erro ao adicionar o objeto ao banco de dados:", event.target.error);
          };
        });

        // Encerra a transação ao concluir
        transaction.oncomplete = function() {
          db.close();
        };
      };
    }


    const content = await file.text();
    this._notify('loaded', { value: content });
    this._invoke('itf:transfer', 'send', { value: file_name });
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
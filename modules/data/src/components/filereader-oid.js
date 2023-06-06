import { css, html, Oid, OidUI } from '/lib/oidlib-dev.js';

export class FileReaderOid extends OidUI {
  handleSeparator(topic, message) {
    this.sep = message.value;
  }

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
  
    const dbName = "DatabaseMundorum";
    const objectStoreName = `${file_name.replace(/[^a-zA-Z0-9-_]/g, "")}_MundorumDS`;
    const text = await file.text();
    console.log(text)
    let dataArray = [];
  
    if (file_extension === 'json') {
      const jsonData = JSON.parse(text);
      console.log(jsonData);
      dataArray = jsonData;
    } else if (file_extension === 'csv') {
      let sep = this.sep === '' ? ',' : this.sep;
      let lines = text.split(/\r?\n/);
      lines = lines.filter(elemento => elemento !== '')
      const keys = lines[0].split(sep); // Obtém as chaves do cabeçalho
      for (let i = 0; i< keys.length; i++) {
        keys[i] = keys[i].replace(/[^a-zA-Z0-9-_]/g, "");
      }
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(sep);
        const obj = {};
        for (let j = 0; j < keys.length; j++) {
          obj[keys[j]] = values[j];
          if (!isNaN(values[j])) {
            obj[keys[j]] = parseFloat(values[j]);
          }
        }
        console.log(obj)
  
        dataArray.push(obj);
      }
    } else {
      console.error("File Extension not found - Please use .json or .csv");
      return -1;
    }
  
    console.log("data:", dataArray);
  
    // Verifica a compatibilidade do navegador com o IndexedDB
    if (!window.indexedDB) {
      console.log("Seu navegador não suporta o IndexedDB.");
    } else {
      const request = window.indexedDB.open(dbName);

      request.onerror = function (event) {
        console.log("Erro ao abrir o banco de dados:", event.target.errorCode);
      };

      request.onupgradeneeded = function (event) {
        const db = event.target.result;

        // Cria a object store (loja de objetos) no banco de dados
        let objectStore = db.createObjectStore(objectStoreName, { keyPath: "id", autoIncrement: true });

        // Cria um índice para cada chave dos objetos
        for (const key in dataArray[0]) {
          objectStore.createIndex(key.replace(/[^a-zA-Z0-9-_]/g, ""), key.replace(/[^a-zA-Z0-9-_]/g, ""), { unique: false });
        }
      };

      request.onsuccess = function (event) {
        const db = event.target.result;

        if (!db.objectStoreNames.contains(objectStoreName)) {
          const version = db.version + 1;
          db.close();

          const secondRequest = window.indexedDB.open(dbName, version);

          secondRequest.onupgradeneeded = function (event) {
            const newDb = event.target.result;
            const newObjectStore = newDb.createObjectStore(objectStoreName, { keyPath: "id", autoIncrement: true });
          
            for (const key of Object.keys(dataArray[0])) {
              console.log(key)
              newObjectStore.createIndex(key.replace(/[^a-zA-Z0-9-_]/g, ""), key.replace(/[^a-zA-Z0-9-_]/g, ""), { unique: false });
            }
          };
          
          secondRequest.onsuccess = function (event) {
            const newDb = event.target.result;
            const transaction = newDb.transaction([objectStoreName], "readwrite");
            const objectStore = transaction.objectStore(objectStoreName);
          
            transaction.oncomplete = function () {
              const readTransaction = newDb.transaction([objectStoreName], "readwrite");
              const readObjectStore = readTransaction.objectStore(objectStoreName);
          
              dataArray.forEach(function (data) {
                const addObjectRequest = readObjectStore.add(data);
          
                addObjectRequest.onsuccess = function (event) {
                  console.log("Objeto adicionado ao banco de dados com sucesso.");
                };
          
                addObjectRequest.onerror = function (event) {
                  console.log("Erro ao adicionar o objeto ao banco de dados:", event.target.error);
                };
              });
          
              readTransaction.oncomplete = function () {
                newDb.close();
              };
            };
          };          
        } else {
          const transaction = db.transaction([objectStoreName], "readwrite");
          let objectStore = transaction.objectStore(objectStoreName);

          dataArray.forEach(function (data) {
            const addObjectRequest = objectStore.add(data);

            addObjectRequest.onsuccess = function (event) {
              console.log("Objeto adicionado ao banco de dados com sucesso.");
            };

            addObjectRequest.onerror = function (event) {
              console.log("Erro ao adicionar o objeto ao banco de dados:", event.target.error);
            };
          });

          transaction.oncomplete = function () {
            db.close();
          };
        }
      };
    }
    const content = {'database':dbName, 'table': objectStoreName, 'file_name': file.name, 'file_extension': file_extension};
    this._notify('loaded', { value: JSON.stringify(content) });
  }
  
}

Oid.component(
{
  id: 'oid:file',
  element: 'filereader-oid',
  properties: {
    label: { default: 'Arraste o arquivo aqui.' },
    pre:   { default: 'Solte o arquivo aqui.' },
    post:  { default: 'Arquivo Gravado.' },
    sep: { default: ''}
  },
  implementation: FileReaderOid,
  receive: ['separator'],
  stylesheet: ['/style.css'],
  styles: css`
  #oid-prs { /* */ }`,
  template: html`
  <div id="oid-prs" class="h-10 w-full flex items-center justify-center border rounded-md border-border box-border" @dragover @drop>
    <span class="text-center text-sm text-primary">
      {{this.label}}
    </span>
  </div>`
})
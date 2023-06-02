import { html, Oid, OidUI } from "/lib/oidlib-dev.js";

export class FileInputOid extends OidUI {
  handleLoad_file(topic, message) {
    const jsonData = JSON.parse(message.value);
    const dbName = jsonData.database;
    const objectStoreName = jsonData.table;
    let columns = null;
    let list_data = null;
    const self = this;

    const request = window.indexedDB.open(dbName);

    request.onerror = function (event) {
      console.log("Erro ao abrir o banco de dados:", event.target.errorCode);
    };

    request.onsuccess = function(event) {
      const db = event.target.result;
      const transaction = db.transaction([objectStoreName], "readonly");
      const objectStore = transaction.objectStore(objectStoreName);
      const requestGetAll = objectStore.getAll();

      requestGetAll.onsuccess = function(event) {
        const data = event.target.result;

        list_data = [];
        data.forEach(function(item) {
          list_data.push(Object.values(item))
        });
        columns = Object.keys(data[0])

        self._notify("output", {
          value: JSON.stringify({ columns: columns, data: list_data }),
        });
      };

      requestGetAll.onerror = function(event) {
        console.log("Erro ao acessar o banco:", event.target.error);
      };

      transaction.oncomplete = function() {
        db.close();
      };
    }
  }
}

Oid.component({
  id: "ex:fileinput",
  element: "fileinput-oid",
  properties: {
    id: { default: "1" },
    sep: { default: ";" },
  },
  receive: ["load_file"],
  implementation: FileInputOid,
});
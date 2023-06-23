import { html, Oid, OidUI } from "/lib/oidlib-dev.js";

export class FileInputOid extends OidUI {
  handleLoad_file(topic, message) {
    console.log(message)
    const jsonData = JSON.parse(message.value);
    const dbName = jsonData.database;
    const objectStoreName = jsonData.table;
    let columns = null;
    let list_data = null;
    const self = this;

    const request = window.indexedDB.open(dbName);

    request.onerror = function (event) {
      self._notify('output_raw', {error: event.target.errorCode});
    };

    request.onsuccess = function(event) {
      const db = event.target.result;
      const transaction = db.transaction([objectStoreName], "readonly");
      const objectStore = transaction.objectStore(objectStoreName);
      const requestGetAll = objectStore.getAll();

      requestGetAll.onsuccess = function(event) {
        let data = event.target.result;
        
        data = data.map(item => {
          const { id, ...rest } = item;
          return rest;
        });
        

        list_data = [];
        data.forEach(function(item) {
          list_data.push(Object.values(item))
        });
        columns = Object.keys(data[0])
        self._notify('output_raw', {"id": jsonData.identifier, columns: columns, data: list_data})
      };

      requestGetAll.onerror = function(event) {
        self._notify('output_raw', {error: event.target.error});
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
    id: { default: "1" }
  },
  receive: ["load_file"],
  implementation: FileInputOid,
});
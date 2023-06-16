import { html, Oid, OidUI } from "/lib/oidlib-dev.js";

export class ListTablesOid extends OidUI {
  handleList(topic, message) {
    const dbName = 'DatabaseMundorum';
    const request = indexedDB.open(dbName);

    request.onsuccess = function(event) {
      const db = event.target.result;
      const objectStoreNames = db.objectStoreNames;    
      const tableNames = Array.from(objectStoreNames);
      const transaction = db.transaction(tableNames, 'readwrite');
    
      transaction.onerror = function(event) {
        console.error('Erro ao limpar as tabelas:', event.target.error);
      };
    
      tableNames.forEach(function(tableName) {
        const objectStore = transaction.objectStore(tableName);
        objectStore.clear();
      });
    
      transaction.oncomplete = function(event) {
        console.log('Todas as tabelas foram limpas com sucesso!');
      };
    };
    
    request.onerror = function(event) {
      console.error('Erro ao abrir a base de dados:', event.target.error);
    };

  }
}

Oid.component({
  id: "ex:listtables",
  element: "listtables-oid",
  properties: {
    id: { default: "1" }
  },
  receive: ["list"],
  implementation: ListTablesOid,
});
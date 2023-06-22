import { html, Oid, OidUI } from "/lib/oidlib-dev.js";

export class ListTablesOid extends OidUI {
  handleList(topic, message) {
    const dbName = 'DatabaseMundorum';
    const request = indexedDB.open(dbName);
    const self = this;
    
    request.onerror = function(event) {
      self._notify('output_tables', {error: event.target.error});
    };
    
    request.onsuccess = function(event) {
      const db = event.target.result;
      const objectStoreNames = db.objectStoreNames;    
      const tableNames = Array.from(objectStoreNames);
      console.log(tableNames);
      self._notify('output_tables', {value: tableNames});
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
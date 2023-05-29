import { html, Oid, OidUI } from "/lib/oidlib-dev.js";

export class FileInputOid extends OidUI {
  handleLoad_file(topic, message) {
    var request = indexedDB.open("MundorunDatabase");
    console.log("Database Name:", message.value.database);

    request.onsuccess = function (event) {
      const db = event.target.result;

      const transaction = db.transaction([message.value], "readonly");
      const store = transaction.objectStore(message.value);
      const getAllRequest = store.getAll();

      getAllRequest.onsuccess = function (event) {
        const records = event.target.result;
        records.forEach(function (record) {
          console.log(record);
        });
      };
    };

    const lines = message.value.split(/\r?\n/); //Only windows separates with both
    const columns = lines[0].split(this.sep);
    const list_data = [];
    console.log("sep:", this.sep);
    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(this.sep);
      list_data.push(row);
    }

    console.log(columns);
    console.log(list_data);

    this._notify("output", {
      value: JSON.stringify({ columns: columns, data: list_data }),
    }); // Processed file goes here
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
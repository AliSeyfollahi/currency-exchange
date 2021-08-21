import config from "../../config";

class indexedDB {
  constructor() {
    this.open();
  }

  open() {
    let request = window.indexedDB.open(config.CONVERSION_HISTORY_DB_NAME, 1);
    request.onupgradeneeded = (event) => {
      var db = event.target.result;
      try {
        db.createObjectStore(this.constructor.objectStoreName, {
          keyPath: "date",
        });
      } catch (e) {}
    };

    return request;
  }
}

export default class ConversionHistoryStorage extends indexedDB {
  static objectStoreName = "conversionHistory";

  create(conversion) {
    conversion.date = Date.now();
    this.open().onsuccess = (event) => {
      const db = event.target.result;

      let transaction = db.transaction(
        [ConversionHistoryStorage.objectStoreName],
        "readwrite"
      );

      // Do something when all the data is added to the database.
      transaction.oncomplete = function () {
        console.log("Conversion added!");
      };

      transaction.onerror = function (event) {
        console.error("Conversion didn't add!", event);
      };

      let objectStore = transaction.objectStore(
        ConversionHistoryStorage.objectStoreName
      );
      return objectStore.add(conversion);
    };
  }

  read() {
    return new Promise((resolve, reject) => {
      this.open().onsuccess = async (event) => {
        const db = event.target.result;
        const transaction = db.transaction([
          ConversionHistoryStorage.objectStoreName,
        ]);
        var objectStore = transaction.objectStore(
          ConversionHistoryStorage.objectStoreName
        );
        objectStore.getAll().onsuccess = (request) => {
          resolve(request.target.result);
        };
      };
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      this.open().onsuccess = async (event) => {
        const db = event.target.result;
        const request = db.transaction([ConversionHistoryStorage.objectStoreName], "readwrite")
          .objectStore(ConversionHistoryStorage.objectStoreName)
          .delete(id);
        request.onsuccess = function (event) {
          resolve(id);
        };
      };
    });
  }
}

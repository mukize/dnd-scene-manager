/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "y26zvw2sxkx4mno",
    "created": "2023-11-09 22:39:27.491Z",
    "updated": "2023-11-09 22:39:27.491Z",
    "name": "scenes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "n7r2gthu",
        "name": "title",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("y26zvw2sxkx4mno");

  return dao.deleteCollection(collection);
})

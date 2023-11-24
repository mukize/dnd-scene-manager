/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y26zvw2sxkx4mno")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "c5dp0iwx",
    "name": "backgroundSize",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y26zvw2sxkx4mno")

  // remove
  collection.schema.removeField("c5dp0iwx")

  return dao.saveCollection(collection)
})

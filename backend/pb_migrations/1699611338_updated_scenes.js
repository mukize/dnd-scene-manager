/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y26zvw2sxkx4mno")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ncsrhmrc",
    "name": "background",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": [],
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y26zvw2sxkx4mno")

  // remove
  collection.schema.removeField("ncsrhmrc")

  return dao.saveCollection(collection)
})

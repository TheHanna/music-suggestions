# A simple API for storing bands and genres

Ingests JSON, outputs JSON.

## Endpoints

### Genres

#### GET

##### /api/genres
List all genres

##### /api/genres/:id
Get a single genre by ID

##### /api/genres/name/:name
Search for genres by full or partial name

#### POST

##### /api/genres
Add a genre.

```json
{
  "name": "thrash"
}
```

#### PUT

##### /api/genres/:id
Update a genre.

```json
{
  "name": "death"
}
```

#### DELETE

##### /api/genres/:id
Delete a genre. _Note_: deletion does not remove the genre from the database, it simply marks it as deleted.

### Bands

#### GET

##### /api/bands
List all bands

##### /api/bands/:id
Get a single band by ID

##### /api/bands/name/:name (TODO)
Search for bands by full or partial name

##### /api/bands/genre/:genre (TODO)
Search for bands by genre ID

#### POST

##### /api/bands
Add a band. The `genres` key should always be an array of genre ID's.

```json
{
  "name": "Black Sabbath",
  "genres": [1, 2]
}
```

#### PUT

##### /api/bands/:id
Update a band. Currently, to add a genre, you must include all current genres and any new ones in the array. This will be fixed in future versions.

```json
{
  "name": "Heaven and Hell",
  "genres": [1, 2, 3]
}
```

#### DELETE

##### /api/bands/:id
Delete a band. _Note_: deletion does not remove the band from the database, it simply marks it as deleted.
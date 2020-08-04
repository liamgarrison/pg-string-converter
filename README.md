# pg string converter

Convert a postgres string to database credentials and back again.

Sometimes we have postgres database connection strings but we want to use tools like `pgdump` `psql` which require the string be split into parts.

## Installation

Add to package.json dependencies manually:

`"pg-string-converter": "github:liamgarrison/pg-string-converter.git"`

## Usage

Convert string to parts:

```

const {stringToParts} = require('pg-string-converter');

const parts = stringToParts('postgres://test:supersecret@db:5432/db-test');

=> {
  host: 'db',
  port: '5432',
  database: 'db-test',
  user: 'test',
  password: 'supersecret'
}

```

Convert parts to string:

```

const {partsToString} = require('pg-string-converter');

const parts = partsToString({
  host: 'db',
  port: '5432',
  database: 'db-test',
  user: 'test',
  password: 'supersecret'
});

=> 'postgres://test:supersecret@db:5432/db-test'

```

## Running tests

`yarn install`

`yarn test`
const {stringToParts, partsToString} = require('./index.js');

describe('string to parts', () => {
  test('should throw error if no string provided', () => {
    expect(() => stringToParts()).toThrow(new Error('Please provide a database string'))
  })

  test('should convert a postgres string successfully', () => {
    expect(stringToParts('postgres://test:supersecret@db:5432/db-test'))
    .toStrictEqual({
      host: 'db',
      port: '5432',
      database: 'db-test',
      user: 'test',
      password: 'supersecret'
    })
  })

  test('should convert a string with weird characters', () => {
    expect(stringToParts('postgres://test-db:INdrTuCQYfrL9iSzhcMk@test-db.anababb4u4ii41.eu-west-2.rds.mysite.com:5432/api-db'))
    .toStrictEqual({
      host: 'test-db.anababb4u4ii41.eu-west-2.rds.mysite.com',
      port: '5432',
      database: 'api-db',
      user: 'test-db',
      password: 'INdrTuCQYfrL9iSzhcMk'
    })
  })
})

describe('parts to string', () => {
  test('should throw error if no object provided', () => {
    expect(() => partsToString()).toThrow(new Error('Please provide a parts object'))
  })

  test('should throw if no database', () => {
    expect(() => {
      partsToString({
        host: 'db',
        port: '5432',
        user: 'test',
        password: 'supersecret'
      })
    })
    .toThrow(new Error('Please provide a database'))
  })

  test('should throw if no user', () => {
    expect(() => {
      partsToString({
        host: 'db',
        port: '5432',
        database: 'db-test',
        password: 'supersecret'
      })
    })
    .toThrow(new Error('Please provide a user'))
  })

  test('should throw if no password', () => {
    expect(() => {
      partsToString({
        host: 'db',
        port: '5432',
        database: 'db-test',
        user: 'test',
      })
    })
    .toThrow(new Error('Please provide a password'))
  })

  test('should throw if no port', () => {
    expect(() => {
      partsToString({
        host: 'db',
        database: 'db-test',
        user: 'test',
        password: 'supersecret'
      })
    })
    .toThrow(new Error('Please provide a port'))
  })

  test('should throw if no host', () => {
    expect(() => {
      partsToString({
        port: '5432',
        database: 'db-test',
        user: 'test',
        password: 'supersecret'
      })
    })
    .toThrow(new Error('Please provide a host'))
  })

  test('should convert parts to string', () => {
    expect(
      partsToString({
        host: 'db',
        port: '5432',
        database: 'db-test',
        user: 'test',
        password: 'supersecret'
      })
    )
    .toBe('postgres://test:supersecret@db:5432/db-test');
  })
})
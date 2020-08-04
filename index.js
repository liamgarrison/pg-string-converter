function stringToParts (pgString) {

  if (!pgString){
    throw new Error('Please provide a database string')
  }

  const match = pgString.match(/postgres:\/\/(?<user>[^:]*):(?<password>[^@]*)@(?<host>[^:]*):(?<port>[^/]*)\/(?<database>.*)$/);
  return {
    ...match.groups
  }
}

function partsToString (parts) {

  if (!parts) {
    throw new Error('Please provide a parts object')
  }

  if (!parts.database){
    throw new Error('Please provide a database')
  }

  if (!parts.port){
    throw new Error('Please provide a port')
  }

  if (!parts.user){
    throw new Error('Please provide a user')
  }

  if (!parts.password){
    throw new Error('Please provide a password')
  }

  if (!parts.host){
    throw new Error('Please provide a host')
  }

  return `postgres://${parts.user}:${parts.password}@${parts.host}:${parts.port}/${parts.database}`
}

module.exports = {
  stringToParts,
  partsToString
}
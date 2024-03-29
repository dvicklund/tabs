import knex from 'knex'
// import * as config from '../../.config.js'

const config = {
  client: 'postgresql',
  connection: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
}

const db = knex(config)


const tabs = {
  get: async function(slug) {
    console.log('Getting tab...')
    return await db('tabs').increment('views', 1).where({'slug': slug}).returning('*')
  },

  getRecent: async function() {
    console.log('Getting recent tabs...')
    return await db.select('id','title','artist','datecreated').from('tabs').orderBy('datecreated', 'desc').limit(10)
  },

  getPopular: async function() {
    console.log('Getting popular tabs...')
    return await db.select('id','title','artist','views','type','slug').from('tabs').orderBy('views').limit(40)
  },

  submitNew: async function(newTab) {
    console.log('Inserting new tab...')
    return await db('tabs').insert(newTab)
  }
}

export default tabs;

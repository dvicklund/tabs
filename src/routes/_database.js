import knex from 'knex'
import * as config from '../.config.js'

console.log(process.env.DATABASE)

const db = knex(config.default.postgres || process.env.DATABASE)

const tabs = {
  get: async function(slug) {
    console.log('Pulling tab...')
    return await db.select().from('tabs').where({'slug': slug})
  },

  getRecent: async function() {
    console.log('Pulling recent tabs...')
    return await db.select().from('tabs').orderBy('datecreated').limit(10)
  },

  submitNew: async function(newTab) {
    console.log('Inserting new tab...')
    return await db('tabs').insert(newTab)
  }
}

export default tabs;

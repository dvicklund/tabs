import knex from 'knex'
import * as config from '../../.config.js'

const db = knex(config.default.postgres)

const tabs = {
  get: async function(slug) {
    console.log('Getting tab...')
    return await db('tabs').increment('views', 1).where({'slug': slug}).returning('*')
  },

  getRecent: async function() {
    console.log('Getting recent tabs...')
    return await db.select().from('tabs').orderBy('datecreated').limit(10)
  },

  getPopular: async function() {
    console.log('Getting popular tabs...')
    return await db.select().from('tabs').orderBy('views').limit(40)
  },

  submitNew: async function(newTab) {
    console.log('Inserting new tab...')
    return await db('tabs').insert(newTab)
  }
}

export default tabs;

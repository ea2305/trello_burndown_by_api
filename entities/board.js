/**
 * Board Entity
 * @author Elihu A. Cruz
 * @version 0.0.1
 */

const Task = require('../entities/task')
const User = require('../entities/user')
const auth = require('../setup/auth')

class Board {
  /**
   * Set default
   */
  constructor (id = 0, name = '', desc = '', dateLastActivity = '0000-00-00') {
    this.apiKey = auth.apiKey
    this.token = auth.token
    this.id = id
    this.name = name
    this.desc = desc
    this.dateLastActivity = dateLastActivity
  }

  /**
   * Fetch list from database
   */
  fetchLists () {
    // fetch list
  }

  /**
   * Fetch all cards
   */
  fetchAllCards () {
    // get cards
  }

  /**
   * Get List
   * @param {String} name
   */
  getList (name) {
    // name user
  }
}

module.exports = Board
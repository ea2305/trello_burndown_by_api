'use strict'

/**
 * Trello micro SDK
 * Make request and parse into Entities
 * @author Elihu A. Cruz
 * @version 0.1.3
 */

// const setup = require('../setup/test.json')
const axios = require('axios')
const Board = require('../entities/board')
const auth = require('../setup/auth')

class Trello {
  /**
   * Contructor
   * @param {String} apiKey
   * @param {String} token
   */
  constructor (organization = '') {
    this.organization = organization
  }

  /**
   * Set Trello Api key
   * @param {String} apiKey
   */
  setApiKey (apiKey) {
    this.apiKey = apiKey
  }

  /**
   * Set Trello token
   * @param {String} token
   */
  setApiKey (token) {
    this.token = token
  }

  /**
   * Name organization
   * @param {String} organization
   */
  setOrganization (organization) {
    this.organization = organization
  }

  /**
   * Get boards by organization name 'team'
   * @returns {Array}
   */
  async getBoards () {
    if (this.organization === '') return []
    try {
      const URL = `https://api.trello.com/1/organizations/${this.organization}/boards`
      const params = { token: auth.token, key: auth.apiKey }
      let response = await axios.get(URL, { params })
      if (response.status === 200) {
        return response.data.map(board => {
          return new Board(board.id, board.name, board.desc, board.dateLastActivity)
        }) 
      }
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = Trello
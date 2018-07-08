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
    this.boards = []
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
        this.boards = await Promise.all(response.data.map(async board => {
          let currBoard = new Board(board.id, board.name, board.desc, board.dateLastActivity)
          await currBoard.fill()
          return currBoard
        }))
        return this.boards
      }
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Sprints report
   * @returns {Array}
   */
  async sprintReport () {
    let report = []
    for (let index = 0; index < this.boards.length; index++) {
      const board = this.boards[index]
      const name = board.name.toUpperCase()
      if (name.includes('SPRINT')) {
        let curr =  await board.resume()
        let res = {}
        res[name] = curr
        report.push(res)
      }
    }
    return report
  }

  /**
   * Sprints report
   * @returns {Array}
   */
  async sprintReportByUser () {
    let report = []
    for (let index = 0; index < this.boards.length; index++) {
      const board = this.boards[index]
      const name = board.name.toUpperCase()
      if (name.includes('SPRINT')) {
        let curr =  await board.resumeByUser()
        let res = {}
        res[name] = curr
        report.push(res)
      }
    }
    return report
  }
}

module.exports = Trello
/**
 * Board Entity
 * @author Elihu A. Cruz
 * @version 0.0.1
 */

// libs
const axios = require('axios')

// Models & setup
const List = require('../entities/list')
const Task = require('../entities/task')
const User = require('../entities/user')
const auth = require('../setup/auth')

class Board {
  /**
   * Set default
   */
  constructor (id = 0, name = '', desc = '', dateLastActivity = '0000-00-00') {
    this.id = id
    this.name = name
    this.desc = desc
    this.dateLastActivity = dateLastActivity
    this.lists = []
    this.users = []
    this.allCards = []
    this.totalEPoints = 0
  }

  /**
   * Fill Board info
   */
  async fill () {
    // List
    await this.getLists()
    // Cards
    await this.getAllCards()

    await this.getUsers()
  }

  /**
   * Fetch list from database
   * @returns {Array}
   */
  async getLists () {
    // fetch list
    try {
      const URL = `https://api.trello.com/1/boards/${this.id}/lists`
      const params = { token: auth.token, key: auth.apiKey }

      let response = await axios.get(URL, { params })
      if (response.status === 200) {
        this.lists = response.data.map(list => {
          return new List(list.id, list.name)
        }) 
        return this.lists
      }
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Fetch all cards
   * @returns {Array}
   */
  async getAllCards () {
    // get cards
    // restart count E Points
    this.totalEPoints = 0
    // fetch list
    try {
      const URL = `https://api.trello.com/1/boards/${this.id}/cards`
      const params = { token: auth.token, key: auth.apiKey }

      let response = await axios.get(URL, { params })
      if (response.status === 200) {
        this.allCards = response.data.map(task => {
          let currTask = new Task(task.name, task.dateLastActivity)
          // parse fields
          currTask.parseTask()
          this.totalEPoints += currTask.estimationPoints
          return currTask
        }) 
        return this.allCards
      }
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Get users
   * @returns {Array}
   */
  async getUsers () {
    // users
    try {
      const URL = `https://api.trello.com/1/boards/${this.id}/members`
      const params = { token: auth.token, key: auth.apiKey }

      let response = await axios.get(URL, { params })
      if (response.status === 200) {
        this.users = response.data.map(user => {
          return new User(user.id, user.fullName)
        }) 
        return this.users
      }
    } catch (error) {
      console.log(error)
    }
  }

  async boardBurnDownData () {
    if (this.allCards.length <= 0) {
      await this.getAllCards()
    }

    let finalPoint = this.lists.filter(list => list.name.toUpperCase() === 'DONE')
    
    if (finalPoint.length !== 0) {
      let last = finalPoint.pop()
      let grouped = await last.getTasksGroupedBy()
      
      let burndown = []
      let pointsBurn = this.totalEPoints
      // get burndown points
      for (const keyDate in grouped) {
        if (grouped.hasOwnProperty(keyDate)) {
          const group = grouped[keyDate]
          var column = {};
          pointsBurn -= this.sum(group, 'estimationPoints')
          column[keyDate] = pointsBurn
          burndown.push(column)
        }
      }
      return burndown 
    } else {
      return []
    }
  }

  /**
   * Get sum of value inside object
   * @param {Array} arr
   * @param {String} prop
   */
  sum (arr = [], prop = '') {
    let total = 0
    for (let i = 0, _len = arr.length; i < _len; i++) {
        total += arr[i][prop]
    }
    return total
  }
}

module.exports = Board
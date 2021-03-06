/**
 * List functions
 * @author Elihu A. Cruz
 * @version 0.0.2
 */

 // libs
const axios = require('axios')

const Task = require('../src/task')
const User = require('../src/user')
const auth = {
  apiKey: process.env.TRELLO_KEY,
  token: process.env.TRELLO_TOKEN,
}

class List {
  /**
   * Initialize
   * @param {String} id
   * @param {String} name
   */
  constructor (id = '', name = '') {
    this.id = id
    this.name = name
    this.tasks = []
  }

  /**
   * Get task ~ cards
   * @returns {Array}
   */
  async getTasks () {
    // users
    try {
      const URL = `https://api.trello.com/1/lists/${this.id}/cards`
      const params = { token: auth.token, key: auth.apiKey }

      let response = await axios.get(URL, { params })
      if (response.status === 200) {
        this.tasks = response.data.map(task => {
          let currTask = new Task(task.name, task.dateLastActivity, task.idMembers.pop())
          currTask.parseTask()
          return currTask
        }) 
        return this.tasks.slice()
      }
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * GroupBy key
   * @param {String} key
   * @returns {Array}
   */
  async getTasksGroupedBy (key = 'updated_at') {
    if (this.tasks.length <= 0) {
      await this.getTasks()
    }
    return this.tasks.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x)
      return rv
    }, {})
  }
}

module.exports = List

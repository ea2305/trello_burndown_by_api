class User {
  /**
   * Initialize
   * @param {String} id
   * @param {String} fullName
   */
  constructor (id = '', fullName = '') {
    this.id = id
    this.fullName = fullName
  }
}

module.exports = User
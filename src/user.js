/**
 * @author Elihu A. Cruz
 * @version 0.1.1
 */
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
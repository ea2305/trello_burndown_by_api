/**
 * Current task user from card
 * @author Elihu A. Cruz
 * @version 0.1.2
 */

class Task {
  /**
   * Base structure
   * @param {String} title
   * @param {String} history
   * @param {Number} estimationPoints
   * @param {Number} realPoints
   */
  constructor (raw = '', updated_at = '', title = '',history = 'none', estimationPoints = 0, realPoints = 0) {
    this.raw = raw
    this.updated_at = updated_at
    this.title = title
    this.history = history
    this.estimationPoints = estimationPoints
    this.realPoints = realPoints
  }

  /**
   * Get data from card and transforme that information into:
   * title, history, estimationPoints, realPoints
   * @param {String} raw
   */
  setRawData (raw) {
    // parse data from request
    this.raw = raw
  }

  /**
   * Service tag validation
   */
  validation () {
    const regx = /\<[a-zA-Z]*\>\([-+]?[0-9]*\.?[0-9]*\)[\sa-zA-Z0-9]+\[[-+]?[0-9]*\.?[0-9]*\]|\([-+]?[0-9]*\.?[0-9]*\)[\sa-zA-Z0-9]+/g
    return (regx.exec(this.raw) != null)
  }

  /** 
   * Get elements and separe into 4 requiered elements
   * @returns {String}
   * @returns {Null}
   */
  parseTask () {
    // Validation 
    if (!this.validation())
      return false

    // Get history
    this.history = this.getHistory()
    // Get title
    this.title = this.getTitle()
    // Get estimation points
    this.estimationPoints = this.getEstimationPoints()
    // Get realTime points
    this.realPoints = this.getRealPoints()

    return true
  }

  /**
   * Get title from raw
   * @param {String} title
   * @returns {String}
   */
  getTitle (raw = this.raw) {
    let text = raw
    // Patterns
    let patternMatchToDelete = [
      /\([-+]?[0-9]*\.?[0-9]*\)/g, // Estimation Parser
      /\[[-+]?[0-9]*\.?[0-9]*\]/g, // Tiempo real
      /\<[-+]?[a-zA-Z]*\>/g, // History
    ]
    return this.cleaner(text, patternMatchToDelete)
  }

  /**
   * Clean text format
   * @param {String} text
   * @param {String} regxs
   */
  cleaner (text, regxs) {
    let buff = text
    regxs.forEach(regx => { buff = buff.replace(regx, '') })
    return buff
  }

  /**
   * Extract estimation from trello card title
   * @param {String} title : Card title with score from scrum for trello plugin
   */
  getEstimationPoints (title = this.raw) {
    const regex = /\([-+]?[0-9]*\.?[0-9]*\)/g
    let vaule = this.inBox(title, regex)
    return parseFloat(vaule)
  }

  /**
   * Extract Point from title card description
   * Card title with score from scrum for trello plugin
   * @param {String} title
   * @returns {Number}
   */
  getRealPoints (title = this.raw) {
    const regex =  /\[[-+]?[0-9]*\.?[0-9]*\]/g
    let vaule = this.inBox(title, regex)
    return parseFloat(vaule)
  }

  /**
   * Extract History from title card description
   * @param {String} title
   * @returns {Number}
   */
  getHistory (title = this.raw) {
    const regex =  /\<[a-zA-Z0-9]*\>/g
    return this.inBox(title, regex)
  }

  /**
   * Get Numeric value inside elements
   * @param {String} text
   * @param {RegExp} regex
   */
  inBox (text, regex) {
    let matches
    let value = ''
    // find matchs
    while ((matches = regex.exec(text)) !== null) {
      if (matches.index === regex.lastIndex)
        regex.lastIndex++
      value = matches[0].substring(1,matches[0].length - 1)
    }
    return (value) ? value : 0
  }
}

module.exports = Task
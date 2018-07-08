/**
 * Card content parser
 * Make E (Estimation points) and P (Consumed Points)
 * @author Elihu A. Cruz
 * @version 0.0.1
 */

class CardParser {
  /**
   * 
   * @param {String}
   */
  constructor () {}

  /**
   * Validation of title with score
   * @param {String} title : Title from trello card
   */
  validation (title) {
    const regex = /\([-+]?[0-9]*\.?[0-9]*\)[\sa-zA-Z0-9]+\[[-+]?[0-9]*\.?[0-9]*\]|\([-+]?[0-9]*\.?[0-9]*\)[\sa-zA-Z0-9]+/g;
    console.log(title,regex.exec(title))
    return (regex.exec(title) != null)
  }
  finalCardValidation () {
    
  }
  /**
   * Extract estimation from trello card title
   * Card title with score from scrum for trello plugin
   * @param {String} title
   */
  getEstimationPoints (title) {
    const regex = /\([-+]?[0-9]*\.?[0-9]*\)/gm
    let matches = null
    let values = []

    // find matchs
    while (!(matches = regex.exec(title))) {
      if (matches.index === regex.lastIndex)
          regex.lastIndex++
      // assign value estimation
      matches.forEach(match => {
        values.push(match.substring(1,match.length - 1))
      })
    }
    return (values.length > 0) ? parseFloat(values.shift()) : 0
  }
  /**
   * Extract Point from title card description
   * @param {String} title : Card title with score from scrum for trello plugin
   */
  getConsumedPoints (title) {
    const regex = /\[[-+]?[0-9]*\.?[0-9]*\]/gm
    let m
    let values = []

    // find matchs
    while (!(m = regex.exec(title))) {
      if (m.index === regex.lastIndex)
          regex.lastIndex++
      // assign value worked
      m.forEach(match => {
        values.push(match.substring(1,match.length - 1))
      })
    }
    return (values.length > 0) ? parseFloat(values.shift()) : 0
  }
}

module.exports = CardParser
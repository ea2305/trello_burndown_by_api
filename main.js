// Get data
  // setup elements
    // *> boards
  // make request
  // get data and store
// Parse into entities
  // Boards * 
  // Tasks * 
  // Users * (is user subscribed in your team?)
// Make Burndown data

const Trello = require('./libs/trello.js')
const CardParser = require('./libs/cardParser.js')
const Task = require('./entities/task.js')
const Board = require('./entities/board.js')


let parser = new CardParser()
let trello = new Trello('switchtecnologias')

let task = new Task()
let board = new Board(12, 'ok', 'ok desc')

task.setRawData('<pepe>()hola[2313]')

async function a () {
  let boards = await trello.getBoards()
  console.log(boards, 'Hola')
}

a()

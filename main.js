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

async function test () {
  let boards = await trello.getBoards()
  // console.log(boards, 'Hola')

  await boards[2].fill()
  let res = await boards[2].boardBurnDownData()
  console.log(res)
}

test()
/**
 * let task = new Task('<HOLA> pepepe (.5)[.5]')
task.parseTask()
console.log(task)
 */
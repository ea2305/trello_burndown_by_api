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

let trello = new Trello('switchtecnologias')

async function test () {
  let boards = await trello.getBoards()
  // console.log(boards, 'Hola')
  // let res = await boards[2].boardBurnDownData()
  //let res = await boards[2].resumeByUser()
  // console.log(await trello.sprintReport())
  console.log(await trello.sprintReportByUser())
}

test()
// Requires trello config
const Trello = require('./main.js')

// initialize
let trello = new Trello('switchtecnologias')

async function test () {
  let boards = await trello.getBoards()
  // console.log(boards, 'Hola')
  // let res = await boards[2].boardBurnDownData()
  //let res = await boards[2].resumeByUser()
  console.log(await trello.sprintReport())
  // console.log(await trello.sprintReportByUser())
  // console.log(await trello.getUserTeam())
}

test()
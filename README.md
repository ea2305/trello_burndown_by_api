# Simple Trello API parser

Get info about your team and boards using some KeyWorks
Trello list structure

```js
let titleOption = '<H> .* (E)[R]'
// or
let titleOption2 = '<H>(E) .* [R]'
```
Where:

* E: Estimation time of task
* R: Real used time of taks
* H: history

### Setup

In order to use Trello API, you will need to generate some credentials. you can get those [here]("https://developers.trello.com/v1.0/reference#api-key-tokens")

After that, you need to pass the API KEY and API TOKEN as a Node enviroment variable
example: 

```bash
ENV TRELLO_KEY=**** TRELLO_TOKEN=**** node myCode.js
```

### Example

We only fetch data, and return as a list.
Use it as you want ;)

```js
// Requires trello config
const Trello = require('./main.js')

// initialize
let trello = new Trello('NameTeam')

async function test () {
  let boards = await trello.getBoards()
  // console.log(boards, 'Hola')
  // get full trello report of sprints
  console.log(await trello.sprintReport())
  // the same :) but!, by user
  console.log(await trello.sprintReportByUser())
}

test()
```

### LICENSE

MIT
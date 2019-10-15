var dungeons = [
  {
    name: "The Praetorium",
    tomestones: 10,
    lvl: 50,
    type: "msq",
    limit: 120,
    average: 60
  },
  {
    name: "Castrum Meridianum",
    tomestones: 7,
    lvl: 50,
    type: "msq",
    limit: 120,
    average: 32
  },
  {
    name: "The Borderland Ruins(Secure)",
    tomestones: 5,
    lvl: 30,
    type: "pvp",
    limit: 20,
    average: 10
  },
  {
    name: "Seal Rock (Seize)",
    tomestones: 5,
    lvl: 30,
    type: "pvp",
    limit: 20,
    average: 10
  },
  {
    name: "The Fields of Glory (Shatter)",
    tomestones: 5,
    lvl: 30,
    type: "pvp",
    limit: 20,
    average: 10
  },
  {
    name: "Hidden Gorge",
    tomestones: 5,
    lvl: 30,
    type: "pvp",
    limit: 20,
    average: 10
  },
  {
    name: "The Labyrinth of The Ancients",
    tomestones: 3,
    lvl: 50,
    type: "raid",
    limit: 120,
    average: 16
  },
  {
    name: "Syrcus Tower",
    tomestones: 3,
    lvl: 50,
    type: "raid",
    limit: 120,
    average: 30
  },
  {
    name: "The World of Darkness",
    tomestones: 3,
    lvl: 50,
    type: "raid",
    limit: 120,
    average: 30
  },
  {
    name: "The Tam-Tara Deepcroft",
    tomestones: 3,
    lvl: 16,
    type: "dungeon",
    limit: 90,
    average: 30
  },
  {
    name: "Copperbell Mines",
    tomestones: 3,
    lvl: 17,
    type: "dungeon",
    limit: 90,
    average: 30
  },
  {
    name: "The Thousand Maws of Toto-Rak",
    tomestones: 3,
    lvl: 24,
    type: "dungeon",
    limit: 90,
    average: 30
  },
  {
    name: "The Sunken Temple of Qarn",
    tomestones: 3,
    lvl: 35,
    type: "dungeon",
    limit: 90,
    average: 30
  },
  {
    name: "The Stone Vigil",
    tomestones: 3,
    lvl: 41,
    type: "dungeon",
    limit: 90,
    average: 30
  }

]
var userDungeons, level = 80


$(document).ready(function () {
  initialize()
  $('#playerLvl').on('change', function () {
    let level = this.value
    if (level) {
      userDungeons = dungeonsByLevel(level)
      updateDungeons()
    }
  })

  $('#playerTomestones,#targetTomestones').on('change', function () {
    let playerTomestones = $('#playerTomestones').val()
    let targetTomestones = $('#targetTomestones').val()

    if (playerTomestones && targetTomestones) {
      let remainingTomestones = Math.max(0, targetTomestones - playerTomestones)
      $('#remainingTomestones').html(remainingTomestones)
      let options = dungeonsByLevel(level)
      // while (remainingTomestones >= 0) {
      //   let result = userDungeons.find((item) => {
      //     return remainingTomestones / item.tomestones
      //   })
      // }
      updateDungeons()
    }
  })
})

function initialize(){
  updateTomesPerMinute()
  updateDungeons()
}

function updateDungeons(){
  $('#dungeons').html('')
  userDungeons.forEach((dungeon) => {
    $('#dungeons').append(`<div class="dungeon-container ${dungeon.type}"> ${dungeon.name} ( lvl ${dungeon.lvl}) - ${dungeon.tomestones} tomestones</div>`)
  })
}

function updateTomesPerMinute() {
  dungeons.forEach((dungeon) =>
    dungeon.rate = dungeon.tomestones / dungeon.average
  )
  dungeons.sort((a, b) => b.rate - a.rate)
  userDungeons = dungeons
}


function dungeonsByLevel(level) {
  return dungeons.filter(x => x.lvl <= level)
}

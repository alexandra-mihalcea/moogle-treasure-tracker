let dungeonUrl = 'https://eu.finalfantasyxiv.com/lodestone/playguide/db/duty/'
let dungeons = [
  {
    name: "The Praetorium",
    id: "2407dbd0cae",
    tomestones: 10,
    lvl: 50,
    type: "msq",
    limit: 120,
    average: 60
  },
  {
    name: "Castrum Meridianum",
    id: "59c2b3b84fa",
    tomestones: 7,
    lvl: 50,
    type: "msq",
    limit: 120,
    average: 32
  },
  {
    name: "The Borderland Ruins (Secure)",
    id: "1da1eaae718",
    tomestones: 5,
    lvl: 30,
    type: "pvp",
    limit: 20,
    average: 10
  },
  {
    name: "Seal Rock (Seize)",
    id: "8667fa946eb",
    tomestones: 5,
    lvl: 30,
    type: "pvp",
    limit: 20,
    average: 10
  },
  {
    name: "The Fields of Glory (Shatter)",
    id: "0c83c5e8c0b",
    tomestones: 5,
    lvl: 30,
    type: "pvp",
    limit: 20,
    average: 10
  },
  {
    name: "Hidden Gorge",
    id: "784c6d6aaed",
    tomestones: 5,
    lvl: 30,
    type: "pvp",
    limit: 20,
    average: 10
  },
  {
    name: "The Labyrinth of The Ancients",
    id: "d9f4e986d0e",
    tomestones: 3,
    lvl: 50,
    type: "raid",
    limit: 120,
    average: 16
  },
  {
    name: "Syrcus Tower",
    id: "47eb1d018b6",
    tomestones: 3,
    lvl: 50,
    type: "raid",
    limit: 120,
    average: 30
  },
  {
    name: "The World of Darkness",
    id: "7f0a3551ab6",
    tomestones: 3,
    lvl: 50,
    type: "raid",
    limit: 120,
    average: 30
  },
  {
    name: "The Tam-Tara Deepcroft",
    id: "29e71c3b0a0",
    tomestones: 3,
    lvl: 16,
    type: "dungeon",
    limit: 90,
    average: 30
  },
  {
    name: "Copperbell Mines",
    id: "619923ac984",
    tomestones: 3,
    lvl: 17,
    type: "dungeon",
    limit: 90,
    average: 30
  },
  {
    name: "The Thousand Maws of Toto-Rak",
    id: "cf7612fa294",
    tomestones: 3,
    lvl: 24,
    type: "dungeon",
    limit: 90,
    average: 30
  },
  {
    name: "The Sunken Temple of Qarn",
    id: "b7a48152df9",
    tomestones: 3,
    lvl: 35,
    type: "dungeon",
    limit: 90,
    average: 30
  },
  {
    name: "The Stone Vigil",
    id: "b6491e1b508",
    tomestones: 3,
    lvl: 41,
    type: "dungeon",
    limit: 90,
    average: 30
  }

]
let userDungeons, level = 80
let levelFilterTimeout = null;



$(document).ready(function () {
  initialize()
  $('#playerLvl').on('keyup', function () {
    clearTimeout(levelFilterTimeout);
    let level = $('#playerLvl').val()
    if (level) {
      levelFilterTimeout = setTimeout(function () {
      updateDungeons()
      }, 500);
    }
  })

  $('#playerTomestones,#targetTomestones').on('keyup', function () {
    let playerTomestones = $('#playerTomestones').val()
    let targetTomestones = $('#targetTomestones').val()

    if (playerTomestones && targetTomestones) {
      let remainingTomestones = Math.max(0, targetTomestones - playerTomestones)
      $('#remainingTomestones').val(remainingTomestones)
    }
  })

  $('#dungeonToggle,#msqToggle,#raidToggle, #pvpToggle').on('click', function () {
    toggleButtonState(this)
  })
})

function initialize() {
  updateTomesPerMinute()
  initializeDungeons()
}

function initializeDungeons() {
  $('#dungeons').html('')
  userDungeons.forEach((dungeon) => {
    $('#dungeons').append(`
                          <div id="${dungeon.id}" class="dungeon-container flipInX animated"> 
                          <a class="dungeon-title ${dungeon.type}" href="${dungeonUrl + dungeon.id}" target="_blank">${dungeon.name}</a> 
                          <div class="dungeon-stats">
                          <span class="dungeon-stat">${dungeon.rate} t/hr </span>
                          <span class="dungeon-stat">${dungeon.average} min </span>
                          <span class="dungeon-stat">${dungeon.limit} min </span>
                          <span class="dungeon-stat">lvl ${dungeon.lvl}</span>
                          <span class="dungeon-stat">l${dungeon.tomestones} tomestones</span>
                          </div>
                          
                          </div>`)
  })
}

function updateTomesPerMinute() {
  dungeons.forEach((dungeon) =>
    dungeon.rate = +(dungeon.tomestones / dungeon.average).toFixed(2)
  )
  dungeons.sort((a, b) => b.rate - a.rate)
  userDungeons = dungeons
}


function updateDungeons() {
  let visibleDungeons = filterDungeons()
  let hiddenDungeons = dungeons.filter(function (x) {
    return visibleDungeons.indexOf(x.id) <= -1
  }).map(function (x) {
    return x.id
  })

  if(visibleDungeons.length > 0){
    toggleDungeonDiv(`#${visibleDungeons.join(',#')}`, true)
  }
  if(hiddenDungeons.length > 0) {
    toggleDungeonDiv(`#${hiddenDungeons.join(',#')}`, false)
  }
}

function filterDungeons() {
  let temp = dungeons

  if ($('#playerLvl').val() != '') {
    temp = temp.filter(function (x) {
      return x.lvl <= $('#playerLvl').val()
    })
  }
  let enabledList = []
  $('#buttonsToggle input.enabled').each(function (index, item) {
    enabledList.push($(item).attr('toggle-item'))
  })
  temp = temp.filter(function (x) {
    return enabledList.indexOf(x.type) > -1
  })

  return temp.map(function (x) {
    return x.id
  })
}

const transitionDuration = 700

function toggleButtonState(button) {
  if ($(button).hasClass('enabled')) {
    $(button).removeClass('enabled')
  } else {
    $(button).addClass('enabled')
  }
  updateDungeons()
}

function toggleDungeonDiv(affected = '', enabled = true) {
  if (enabled) {
    $(`${affected}`).removeClass('flipOutX').delay(transitionDuration).queue(function () {
      $(this).slideDown().dequeue()
    })
  } else {
    $(`${affected}`).addClass('flipOutX').delay(transitionDuration).queue(function () {
      $(this).slideUp().dequeue()
    })
  }
}

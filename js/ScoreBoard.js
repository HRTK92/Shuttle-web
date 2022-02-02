var deuce = false
var score_sheet = [
  {
    scoreA: false,
    scoreB: false,
  },
]
function score(e) {
  var scoreA = Number(document.getElementById('scoreA').textContent)
  var scoreB = Number(document.getElementById('scoreB').textContent)

  if (e.indexOf('_') !== -1) {
    result = e.split('_')
    var score = Number(document.getElementById(`score${result[0]}`).textContent)
    var total_score = scoreA + scoreB

    if (result[1] == 'plus') {
      document.getElementById(`score${result[0]}`).innerText = score + 1
      if (result[0] === 'A') {
        scoreA++
        var addData = {
          scoreA: true,
          scoreB: false,
        }
      } else if (result[0] === 'B') {
        scoreB++
        var addData = {
          scoreA: false,
          scoreB: true,
        }
      }
      var score_n = Number(
        document.getElementById(`score${result[0]}`).textContent
      )
      var set_n = Number(
        document.getElementById(`game_set_${result[0]}`).textContent
      )

      score_sheet.push(addData)
      set_saab(result[0])

      if (
        scoreA == $('#max_score').val() - 1 &&
        scoreB == $('#max_score').val() - 1 &&
        $('#deuce').prop('checked')
      ) {
        deuce = true
      }
      if (deuce) {
        if (scoreA - scoreB == 2 || scoreA - scoreB == -2) {
          $('#control, #control, .score, .score').hide()
          $('#scoreA').text('0')
          $('#scoreB').text('0')
          $('#difference').text('点差:0')
          $('#game_set_' + result[0]).text(set_n + 1)
          set_color()
          set_saab()
          $('#control, #control, .score, .score').show('slow')
          deuce = false
        }
      } else if (score_n >= $('#max_score').val()) {
        $('#control, #control, .score, .score').hide()
        $('#scoreA').text('0')
        $('#scoreB').text('0')
        $('#difference').text('点差:0')
        $('#game_set_' + result[0]).text(set_n + 1)
        set_color()
        set_saab()
        $('#control, #control, .score, .score').show('slow')
      }
    } else if (result[1] == 'minus') {
      if (score > 0) {
        document.getElementById(`score${result[0]}`).innerText = score - 1
      }
    }
  }
  set_color()
  set_difference()
}
function set_color() {
  var scoreA = Number(document.getElementById('scoreA').textContent)
  var scoreB = Number(document.getElementById('scoreB').textContent)
  if (scoreA > scoreB) {
    if ($('#color').prop('checked')) {
      $('#scoreA').css('color', 'red')
      $('#scoreB').css('color', 'blue')
    }
  } else if (scoreA < scoreB) {
    if ($('#color').prop('checked')) {
      $('#scoreB').css('color', 'red')
      $('#scoreA').css('color', 'blue')
    }
  } else if (scoreA === scoreB) {
    if ($('#color').prop('checked')) {
      $('#scoreA').css('color', 'blue')
      $('#scoreB').css('color', 'blue')
    }
  }
}
function set_difference() {
  var scoreA = Number(document.getElementById('scoreA').textContent)
  var scoreB = Number(document.getElementById('scoreB').textContent)
  if (scoreA > scoreB) {
    $('#difference').text(`点差:${scoreA - scoreB}`)
  } else if (scoreA < scoreB) {
    $('#difference').text(`点差:${scoreB - scoreA}`)
  } else if (scoreA === scoreB) {
    $('#difference').text('点差:0')
  }
}
function set_saab(A_or_B = null) {
  if (A_or_B === null) {
    $('.saab').remove()
    return
  }

  if ($('#saab').prop('checked')) {
    $('.saab').remove()
    $('#score-box_' + A_or_B).append("<p class='saab'>🏸</p>")
  }
}

$('#reset').on('click', function () {
  $('#scoreA, #scoreB, #game_set_A, #game_set_B').text(0)
  $('.saab').remove()
})
$('#switch').on('click', function () {
  var scoreA = Number(document.getElementById('scoreA').textContent)
  var scoreB = Number(document.getElementById('scoreB').textContent)
  //スコア
  $('#scoreA').text(scoreB)
  $('#scoreB').text(scoreA)
  //セット数
  var gsA = $('#game_set_A').text()
  var gsB = $('#game_set_B').text()
  $('#game_set_A').text(gsB)
  $('#game_set_B').text(gsA)
})
$('input[type=range]').on('input', function () {
  $('#max_score_display').text($('#max_score').val())
})
$('#color').change(function () {
  if (this.checked) {
    set_color()
  } else {
    $('#scoreA').css('color', '#FFF')
    $('#scoreB').css('color', '#FFF')
  }
})
$('#game_set').change(function () {
  if (this.checked) {
    $('#game_set_A, #game_set_B').show('slow')
  } else {
    $('#game_set_A, #game_set_B').hide('slow')
  }
})
$('#saab').change(function () {
  if (this.checked) {
  } else {
    $('.saab').remove()
  }
})
$('#score_sheet_btn').on('click', function () {})
$('#full_screen').on('click', function () {
  var ele = document.documentElement
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    ele.requestFullscreen()
  }
})

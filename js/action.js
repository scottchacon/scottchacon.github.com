jQuery.githubUser = function(username, callback) {
  jQuery.getJSON("http://github.com/api/v1/json/" + username + "?callback=?", callback);
}

function showHome() {
  $('#break').show()
  $('.non_home_box').hide('scale')
  $('.home_box').show('scale')
}

function showTalks() {
  $('#break').hide()
  $('#info_box').show()
  $("#info_box").load("talks.html", null, function() {
    window.location.hash = 'talks'
  });
}

function showScribbles() {
  $('#break').hide()
  $('#info_box').show()
  $("#info_box").load("scribbles.html", null, function() {
    window.location.hash = 'scribbles'
  });
}

function showAbout() {
  $('#break').hide()
  $('#info_box').show()
  $("#info_box").load("about.html", null, function() {
    window.location.hash = 'about'    
    $("a#menu_talks").click(function(event){
      hideAll()
      showTalks()
    })
  });
}

function showCode() {
  $('#break').hide()
  $('#info_box').show()
  $("#info_box").load("code.html", null, function() {
      $.githubUser('schacon', function(data) {
        $('#github-projects').text('')
        var repos = data.user.repositories;
        repos.sort(function(a,b) {
          return b.watchers - a.watchers;
        });

        $(repos).each(function() {
          if((!this.fork) && (!this.private)) {
          $('#github-projects').append("\
    <div class='repo'>\
      <h3><a href='" + this.url + "'>" + this.name + "</a></h3>\
      <span class='desc'>"+this.description+"</span>\
      <span class='watchers'>" + this.watchers + " </span>\
      <span class='forks'>" + this.forks + "</span>\
    </div>");
          }
        });
      });
      window.location.hash = 'code'  
  });
}

function hideAll() {
  $('.non_home_box').hide()
  $('.home_box').hide()
}

$(document).ready(function(){
  if(window.location.hash != "") {
    page = window.location.hash
    if(page == '#talks') {
      hideAll()
      showTalks()
    }
    if(page == '#code') {
      hideAll()
      showCode()      
    }
    if(page == '#about') {
      hideAll()
      showAbout()      
    }
    if(page == '#scribbles') {
      hideAll()
      showScribbles()      
    }
  }

  $("a#menu_home").click(function(event){
    showHome()
  })

  $("a#menu_talks").click(function(event){
    hideAll()
    showTalks()
  })

  $("a#menu_code").click(function(event){
    hideAll()
    showCode()
  })

  $("a#menu_about").click(function(event){
    hideAll()
    showAbout()
  })

  $("a#menu_scribbles").click(function(event){
    hideAll()
    showScribbles()
  })

})
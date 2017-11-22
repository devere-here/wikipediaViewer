var autoComplete = false;
var visibleSearch = false;
$("input[type=search]").hide();
$("input[value=Submit]").hide();
$("input[value=Random]").hide();

function loadEntries(searchItem){
  
  var url = "https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&formatversion=2&search=" + searchItem + "&format=json&callback=?";
    
  $.getJSON(url, function(data){
      
    var newContent = "";
    for(var i = 0; i < 5; i++){
      newContent += '<div class="pagePreview">';
      newContent += '<a href="' + data[3][i] + '">';
      newContent += '<h2>"'+ data[1][i] +'"</h2>';
      newContent += '</a>';
      newContent += '<p>"'+ data[2][i] + '"</p>';
      newContent += '</div>';
       
    }
        
    $("#pageList").html(newContent);
  
  })
             
};

function entryAnimation(newContent){
  
  $("#pageList").hide();
  $("#pageList").html(newContent);
  $("#pageList").fadeIn(1000);
  
}

$("input[type=checkbox]").on("change", function(){
  
  if(autoComplete == false){
    $("#acMessage").text("AutoComplete is on");
    autoComplete = true;
  }else{
    $("#acMessage").text("AutoComplete is off");
    $(".pagePreview").fadeOut(1000);
    autoComplete = false;
    
  }
  
})


$(".glyphicon").on("click", function(){
  if(visibleSearch == false){
    $(this).animate({
      left: "-12%"
    }, 1000, function(){
      visibleSearch = true;
      $("input[type=search]").fadeIn(1000);
      $("input[value=Submit]").fadeIn(1000);
      $("input[value=Random]").fadeIn(1000);
      $(this).css("left", "0%");
    }
    );

  }else{
    
    visibleSearch = false;
    $(".glyphicon").fadeOut(1000);
    $("input[type=search]").fadeOut(1000);
    $("input[value=Submit]").fadeOut(1000);
    $("input[value=Random]").fadeOut(1000);
    $(".pagePreview").fadeOut(1000);
    
    setTimeout(function(){
      $(".glyphicon").fadeIn(1000);
    },1500);
  }
          
  
})

$("document").ready(function(){
  
  $("input").on("keyup", function(e){
    
    var searchItem = $("input[type=search]").val();
    
    if(autoComplete == true){
      
      loadEntries(searchItem);

    }else if(e.which == 13){
      
      var newContent = loadEntries(searchItem);    
      entryAnimation(newContent);
      
    }   
  });
  
  
  $("input[value=Submit]").click(function(e){
    
    e.preventDefault();    
    var searchItem = $("input[type=search]").val();
    
    var newContent = loadEntries(searchItem);
    entryAnimation(newContent);
    
  });
  
  
  $("input[value=Random]").click(function(e){
      
    e.preventDefault();
    var randomURL = "https://en.wikipedia.org/wiki/Special:Random";
    window.location.assign(randomURL);
      
  })

    
});
$(function(){
    var flipCard = $(".flip-card");
    var trigger = flipCard.find("button");
    var cardFilter = $("#card-controls input[type=checkbox]");
    var panel = $('.slds-panel');
    var count = $("#count > span");
    var panelFilter = $("#filter-button");

    // ------------------
    // Functions      
    // ------------------

    // Swapping aria state
    function isPressed(val){
      if( $(val).attr("aria-pressed") == "false" ){
        $(val).attr("aria-pressed" , "true");
      }else{
        $(val).attr("aria-pressed" , "false");  
      }
    }
    // Closing the Panel
    function closePanel(){
      panel.removeClass("show");
      setTimeout(function(){
        panel.removeClass('slds-is-open')
      },150)
    };
    // Opening the Panel
    function openPanel(){
      panel.addClass("slds-is-open");
      setTimeout(function(){
        panel.addClass('show')
      },1)
    }

    $.fn.randomize = function(selector){
      (selector ? this.find(selector) : this).parent().each(function(){
          $(this).children(selector).sort(function(){
              return Math.random() - 0.5;
          }).detach().appendTo(this);
      });
      return this;
    };

    // Count how many cards there are
    count.text(flipCard.length);

    // For Card flip action, and associated class swaps
    trigger.on("click" , function(){
      $(this).toggleClass("rotateArr").parent().toggleClass("flipped");
      $(this).addClass("click");
      return false;
    });

    // For Card flip transitions after the transition finishes
    trigger.on('transitionend', function(e) {
      $(this).removeClass('click');
      $(this).toggleClass("slds-button_icon-border-inverse slds-button_icon-border")
      $(this).addClass('go_back');
      return false;
      e.preventDefault();
    });
    
    //Card filtering checkboxes
    cardFilter.on("click" , function(){
      var hash = $(this).attr("aria-cat");
      $("."+hash).slideToggle(200);
      console.log($("."+hash));
    });
    
    // Flip All cards stateful button
    $("#flip-all").on("click" , function(){
      trigger.click();
      $(this).toggleClass("slds-is-pressed");
      // For aria attr swap
      isPressed(this);
    });

    // Filters menu toggle, which opens panel
    panelFilter.on("click" , function(e){
      $(this).toggleClass("slds-is-pressed");
      isPressed(this);
      if(panel.hasClass("show")){
        closePanel();
      }else{
        openPanel();
      }
      e.preventDefault();
    });
    
    // Close panel "X" Button
    $(".slds-panel__close").on("click" , function(){
      closePanel();
      $("#filter-button").removeClass("slds-is-pressed");
    });
    $('#randomize').on("click" , function(){
      flipCard.randomize();
    });
  });
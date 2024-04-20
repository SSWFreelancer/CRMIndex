document.addEventListener('DOMContentLoaded', function(event) {
  var headerBurger = document.querySelector('.header__burger');
  var menu = document.querySelector('.menu');
  var body = document.querySelector('body');
	document.querySelector('.header__burger').addEventListener('click', function(event) {
	    headerBurger.classList.toggle('active');
	    menu.classList.toggle('active');
	    body.classList.toggle('lock');
	});



		setTimeout(function() {
		  document.querySelector('.pickup').classList.add('open');
		}, 500);

  const selects = document.querySelectorAll("select");
  if(selects){
	  selects.forEach(function (select) {
	    NiceSelect.bind(select);
	  });  	
  }

	var search = document.querySelector('.header__search');
	var headerSearch = document.querySelector('.search');
	if(search && headerSearch){
		search.addEventListener('click', function(event) {
			event.preventDefault();
			headerBurger.classList.remove('active');
			menu.classList.remove('active');
			body.classList.remove('lock');
			headerSearch.classList.toggle('active');
		});
		document.addEventListener('click', function(event) {
		  if (!search.contains(event.target) && !headerSearch.contains(event.target)) {
				headerSearch.classList.remove('active');
		  }	  
		});
	}


	function slideToggle(element) {
	  var target = element.style;
	  target.transition = 'all 0.3s ease-in-out';
	  if (target.maxHeight) {
	    target.maxHeight = null;
	    element.classList.remove('active');
	  } else {
	    target.maxHeight = element.scrollHeight + 'px';
	    element.classList.add('active');
	  }
	}

  const popupButton = document.querySelectorAll("[data-topopup]");
  if(popupButton){
	  popupButton.forEach(function (popupButton) {
	    popupButton.addEventListener("click", function (event) {
	    	
	    	event.preventDefault();
	      const dataPopup = this.getAttribute("data-topopup");
	      const dataClassPopup = document.querySelector(`${dataPopup}`);
	      if (dataClassPopup !== null) {
	        dataClassPopup.classList.add("open");
	        body.classList.add('popuplock');	
	      }
	    });
	  });  	
  }
	var popupClose = document.querySelectorAll('.popup__close');
	if(popupClose){
		popupClose.forEach(function(popupClose) {
		    popupClose.addEventListener('click', function(event) {
		    		var body = document.querySelector('body');
		    		body.classList.remove('popuplock');	
		    		popupClose.closest('.popup').classList.remove('open');

		    });
		});		
	}
	var pickupClose = document.querySelectorAll('.pickup__close');
	if(pickupClose){
		pickupClose.forEach(function(pickupClose) {
		    pickupClose.addEventListener('click', function(event) {
	    		var pickupBody = pickupClose.closest('.pickup');
	    		if(pickupBody){
	    			pickupBody.classList.remove('open');
	    		}
		    });
		});		
	}
	var crmDescrMore = document.querySelectorAll('.crm-descr__more');
	if(crmDescrMore){
		crmDescrMore.forEach(function(crmDescrMore) {
		    crmDescrMore.addEventListener('click', function(event) {
	    		if(crmDescrMore.previousElementSibling){
	    			crmDescrMore.classList.toggle('open');
	    			crmDescrMore.previousElementSibling.classList.toggle('open');
	    		}
		    });
		});		
	}
	var crmPopupBar = document.querySelector('.crmpopup__bar span');
	var crmPopupPersentage = document.querySelector('.crmpopup__info>p>b')
	var crmPopupNext = document.querySelectorAll('.crmpopup__next');
	if (crmPopupNext) {
	    crmPopupNext.forEach(function (crmPopupNext) {
	        crmPopupNext.addEventListener('click', function (event) {
	            var crmActiveWrapper = crmPopupNext.closest('.crmpopup__bottom').previousElementSibling.querySelector('.crmpopup__wrapper.active');
	            var crmWrappersPersentage = crmPopupNext.closest('.crmpopup__bottom').previousElementSibling.querySelectorAll('.crmpopup__wrapper').length;
							var inputs = crmActiveWrapper.querySelectorAll('input');
							var isAtLeastOneFieldFilled = false;
							inputs.forEach(function(input) {
							    var inputType = input.type.toLowerCase();
							    if (inputType === 'radio' || inputType === 'checkbox') {
							        if (input.checked) {
							            isAtLeastOneFieldFilled = true;
							        }
							    } else if (inputType === 'text') {
							        if (input.value.trim() !== '') {
							            isAtLeastOneFieldFilled = true;
							        }
							    }
							});	            
	            if (crmActiveWrapper && crmActiveWrapper.nextElementSibling && isAtLeastOneFieldFilled) {
	                crmActiveWrapper.classList.toggle('active');
	                crmActiveWrapper.nextElementSibling.classList.add('active');
	                var activeIndex = Array.from(crmActiveWrapper.parentElement.children).indexOf(crmActiveWrapper.nextElementSibling);
	                var progressBarPercentage = Math.round(activeIndex / crmWrappersPersentage * 100);
	                if(crmPopupBar){
	                	crmPopupBar.style.width = progressBarPercentage + '%';
	                }
	                if(crmPopupPersentage){
	                	crmPopupPersentage.innerHTML = progressBarPercentage + '%';
	                }
	            }
	            else if(!crmActiveWrapper.nextElementSibling && isAtLeastOneFieldFilled){
				    		if(document.querySelector('#getresult')){
			            setTimeout(function(){
			            	document.querySelector('#getresult').classList.add('open');
			            },300);
				    		}
				    		if(crmPopupNext.closest('.popup').querySelector('form')){
				    			crmPopupNext.closest('.popup').querySelector('form').reset();
				    		}
	            	crmPopupNext.closest('.popup').classList.remove('open');
	            	crmActiveWrapper.classList.remove('active');
	            	crmPopupNext.closest('.crmpopup__bottom').previousElementSibling.querySelector('.crmpopup__wrapper:first-child').classList.add('active');
                if(crmPopupBar){
                	crmPopupBar.style.width = 0 + '%';
                }
                if(crmPopupPersentage){
                	crmPopupPersentage.innerHTML = 0 + '%';
                }				    		
	            }else if(!isAtLeastOneFieldFilled){
						    inputs.forEach(function(input) {
						        var inputType = input.type.toLowerCase();
						        if ((inputType === 'radio' || inputType === 'checkbox') && !input.checked) {
						            input.classList.add('error');
						            setTimeout(function(){
						            	input.classList.remove('error');
						            },500);
						        } else if (inputType === 'text' && input.value.trim() === '') {
						            input.classList.add('error');
						            setTimeout(function(){
						            	input.classList.remove('error');
						            },500);
						        }
						    });
	            }
	        });
	    });
	}
	var crmPopupPrev = document.querySelectorAll('.crmpopup__prev');
	if (crmPopupPrev) {
	    crmPopupPrev.forEach(function (crmPopupPrev) {
	        crmPopupPrev.addEventListener('click', function (event) {
	            var crmActiveWrapper = crmPopupPrev.closest('.crmpopup__bottom').previousElementSibling.querySelector('.crmpopup__wrapper.active');
	            var crmWrappersPersentage = crmPopupPrev.closest('.crmpopup__bottom').previousElementSibling.querySelectorAll('.crmpopup__wrapper').length;
	            if (crmActiveWrapper && crmActiveWrapper.previousElementSibling) {
	                crmActiveWrapper.classList.toggle('active');
	                crmActiveWrapper.previousElementSibling.classList.add('active');
	                var activeIndex = Array.from(crmActiveWrapper.parentElement.children).indexOf(crmActiveWrapper.previousElementSibling);
	                var progressBarPercentage = Math.round(activeIndex / crmWrappersPersentage * 100);
	                if(crmPopupBar){
	                	crmPopupBar.style.width = progressBarPercentage + '%';
	                }
	                if(crmPopupPersentage){
	                	crmPopupPersentage.innerHTML = progressBarPercentage + '%';
	                }	                
	            }
	        });
	    });
	}

  function setCookie(name, value, days) {
      var expires = "";
      if (days) {
          var date = new Date();
          date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
          expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + value + expires + "; path=/; SameSite=Lax";
  }
  function getCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) === ' ') c = c.substring(1, c.length);
          if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
  }
  function showPopup() {
      var popup = document.getElementById("crmpopup");
      var lastShowTime = parseInt(getCookie("lastShowTime")) || 0;
      var currentTime = new Date().getTime();
      var daysUntilNextPopup = Math.ceil((7 * 24 * 60 * 60 * 1000 - (currentTime - lastShowTime)) / (24 * 60 * 60 * 1000));
      if (currentTime - lastShowTime >= 7 * 24 * 60 * 60 * 1000) {
          popup.classList.add("open");
          setCookie("lastShowTime", currentTime.toString(), 365); // Хранится год
      }
  }
  setTimeout(showPopup, 1000 * 180);
});


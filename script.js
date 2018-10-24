
var the_page = 0;

var isScrolling;
all_devices.addEventListener("scroll",scroll_btns_hide, false)

function scroll_btns_hide() {
	scroll_down_arr.style.display = "none";
	window.clearTimeout( isScrolling );
	isScrolling = setTimeout(function() {
		//console.log( 'Scrolling has stopped.' );
		scroll_down_arr.style.display = "block";
		}, 500);
}

function load_devices_v() {
	for (var i = 0; i < devices.length; i++) {
		var clone = document.importNode(dev_tmpl.content, true);

		pic = clone.querySelector(".pic");
		nam = clone.querySelector(".nam");
		status1 = clone.querySelector(".status");

		pic.classList.add(devices[i]["pic"]);
		nam.textContent = devices[i]["name"];
		status1.textContent = devices[i]["status"];
		
		all_devices.appendChild(clone);
	}
}


function nextpage() {
	pages = Math.trunc(scenarios.length/9);
	the_prev_page = the_page;
	if (the_page < pages) {		
		the_page++;
	} 
	else if (the_page >= pages) {
		the_page = 0;
	}

	checkdisabled(pages, the_prev_page);
}
function prevpage() {

	pages = Math.trunc(scenarios.length/9);
	the_prev_page = the_page;
	if (the_page > 0) {
		the_page--;
	} 
	else if (the_page == 0) {
		the_page = pages;
	}
	
	checkdisabled(pages, the_prev_page);
}

function checkdisabled(p,pp) {

	if (the_page == 0){
		fav_s_arr_l.disabled = true;
		fav_s_arr_l.src = "assets/icon_arrow_left@1x.png";
		fav_s_arr_r.disabled = false;
		fav_s_arr_r.src = "assets/icon_arrow-black_left.svg";
	}
	else if (the_page == p) {
		fav_s_arr_l.disabled = false;
		fav_s_arr_l.src = "assets/icon_arrow-black_left.svg";
		fav_s_arr_r.disabled = true;
		fav_s_arr_r.src = "assets/icon_arrow_left@1x.png";
	}
	else {
		fav_s_arr_l.disabled = false;
		fav_s_arr_l.src = "assets/icon_arrow-black_left.svg";
		fav_s_arr_r.disabled = false;
		fav_s_arr_r.src = "assets/icon_arrow-black_left.svg";
	}

	scards = fav_scenarios.querySelectorAll(".scenario_card");
	new_cards = []
	old_cards = []
	for (var i = 0; i < scenarios.length; i++) {

		if (Math.trunc(i/9)==pp) {
			old_cards.push(scards[i]);
			scards[i].classList.remove("out_r");
			scards[i].classList.remove("in_r");
			setTimeout(function(a){	
				a.classList.add("out_r");},20,scards[i]);			
			}
		else if (Math.trunc(i/9)==the_page) {
			new_cards.push(scards[i]);
		} 
	
	}
	/*console.log("p now " + the_page);
	console.log("pp now " + the_prev_page);
	console.log("prevpage " + old_cards);
	console.log("newpage " + new_cards);*/
	setTimeout(function(a, b) {
				for (var i1 = 0; i1 < a.length; i1++) {
					//take animations and display from old cards
					a[i1].classList.remove("out_r");
					a[i1].classList.remove("in_r");
					a[i1].style.display = "none";
				}
				for (var i1 = 0; i1 < b.length; i1++) {
					//
					b[i1].style.display = "flex";
					
					b[i1].classList.remove("in_r");
					b[i1].classList.add("in_r");
					
				}
		}, 160, old_cards, new_cards);
}

function load_scenarios() {
//!on scenario load, decide which buttons enabled
//!on page change, decide which buttons enabled
//!on load decide how many pages, and current one, store in variable
//!on load set display to each
//?on btn clicks change display?
//animation???
//watch a vidoe on animation

	for (var i = 0; i < scenarios.length; i++) {
		var clone = document.importNode(sc_tmpl.content, true);

		pic = clone.querySelector(".pic");
		nam = clone.querySelector(".nam");
		statustmp = clone.querySelector(".status");
		
		pic.classList.add(scenarios[i]["pic"]);
		nam.textContent = scenarios[i]["descr"];
		if (scenarios[i]["status"]!=undefined) {
			statustmp.textContent = scenarios[i]["status"];

		}
		
		fav_s_arr_l.disabled = true;
		if (scenarios.length<10) {
			fav_s_arr_r.disabled = true;
			fav_s_arr_r.src = "assets/icon_arrow_left@1x.png";
		}
		if (i>8) {//first index is 0
			clone.querySelector(".scenario_card").display = "none";
		}
		
		fav_scenarios.appendChild(clone);
	}
}

Scroll = (
    function(){
          var x,y;
         function hndlr(){
            window.scrollTo(x,y);
            //return;
          }  
          return {

               disable : function(x1,y1){
                    x = x1;
                    y = y1;
                   if(window.addEventListener){
                       window.addEventListener("scroll",hndlr);
                   } 
                   else{
                        window.attachEvent("onscroll", hndlr);
                   }     
                   hndlr()

               },
               enable: function(){
                      if(window.removeEventListener){
                         window.removeEventListener("scroll",hndlr);
                      }
                      else{
                        window.detachEvent("onscroll", hndlr);
                      }
               } 

          }
    })();


function modal_show(e) {
	modal.style.display = "flex";
	Scroll.disable(window.scrollX,window.scrollY);
	main.classList.add("blurred");
	//main.classList.add("notouch");
	document.body.classList.add("notouch");
	if (e.target.querySelector(".nam")){
		md = e.target;
	} else {
		md = e.target.parentElement;
	}
	modal_device.textContent = md.querySelector(".nam").textContent;
	modal_status.textContent = md.querySelector(".status").textContent;
	if (md.querySelector(".pic").classList.contains("pic_s_on")){	
		modal_pic.classList = ["modal_pic modal_pic_s_on"];
	} else
	if (md.querySelector(".pic").classList.contains("pic_s_off")){	
		modal_pic.classList = ["modal_pic modal_pic_s_off"];
	} else
	if (md.querySelector(".pic").classList.contains("pic_t_off")){	
		modal_pic.classList = ["modal_pic modal_pic_t_off"];
	} else
	if (md.querySelector(".pic").classList.contains("pic_t_on")){	
		modal_pic.classList = ["modal_pic modal_pic_t_on"];
	}
	modal_value.textContent = md.querySelector(".value").value;
}

function load_devices_h() {
	for (var i = 0; i < devices.length; i++) {
		var clone = document.importNode(dev_tmpl.content, true);

		pic = clone.querySelector(".pic");
		nam = clone.querySelector(".nam");
		status2 = clone.querySelector(".status");
		mode = clone.querySelector(".mode");
		value = clone.querySelector(".value");

		pic.classList.add(devices[i]["pic"]);
		nam.textContent = devices[i]["name"];
		status2.textContent = devices[i]["status"];
		mode.value = devices[i]["modal"];
		value.value = devices[i]["value"];
		clone.querySelector(".dev_card").classList.add("nobottom");

		if (devices[i]["modal"]){
			clone.querySelector(".dev_card").addEventListener("click", modal_show);
		}

		fav_devices.appendChild(clone);
		

		//add listeners to ones with attr

		
		
	}
}


function scroll_r(){
	fav_devices.scrollBy({top:0, left: 200, behavior:'smooth'});
	scroll_index = (fav_devices.scrollLeft + 200) / (fav_devices.scrollWidth-fav_devices.clientWidth);
	if (scroll_index >= 0.99) {
		fav_arr_r.disabled = true;
		fav_arr_r.src = "assets/icon_arrow_left@1x.png";
	}
	fav_arr_l.disabled = false;
	fav_arr_l.src = "assets/icon_arrow-black_left.svg";
}
function scroll_l(){
	fav_devices.scrollBy({top:0, left: -200, behavior:'smooth'});
	scroll_index = (fav_devices.scrollLeft - 200) / (fav_devices.scrollWidth-fav_devices.clientWidth);
	if (scroll_index <= 0.01) {
		fav_arr_l.disabled = true;
		fav_arr_l.src = "assets/icon_arrow_left@1x.png";
	}
	fav_arr_r.disabled = false;
	fav_arr_r.src = "assets/icon_arrow-black_left.svg";

}
//modal
function afterModal() {
	modal.style.display = "none";
	main.classList.remove("blurred");
	document.body.classList.remove("notouch");
	Scroll.enable();
}
modal_apply.addEventListener("click", function(){alert("Не применено!")});
modal_close.addEventListener("click", function(){afterModal()});
modal.addEventListener("click", function(){if (event.target == modal){afterModal();}});

fav_s_arr_r.addEventListener("click", nextpage);
fav_s_arr_l.addEventListener("click", prevpage);
fav_arr_r.addEventListener("click", scroll_r);
fav_arr_l.addEventListener("click", scroll_l);



load_devices_v();
load_scenarios();
load_devices_h();






var modal_current = "";
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
	hamburger_cb.checked = false;
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
	slider_mode = md.querySelector(".mode").value;
	
	

	//get the index from data correspondent to the current card
	//to use it in valueApply
	if (md.querySelector(".dev_card_inner_wrapper")){
		modal_current = md.id.slice(-1);
	} else {
		modal_current = md.parentElement.id.slice(-1);
	}
	knobo.value = devices[modal_current].value;
	bulb_range.value = devices[modal_current].value;
	temp_range.value = devices[modal_current].value;

	if ((slider_mode!="bulb_slide_container") && (window.innerWidth>450)) {
		modal_value.style.display = "block";
		(devices[modal_current].value>0) ? modal_value.textContent = "+" + devices[modal_current].value : modal_value.textContent = devices[modal_current].value;
	} else {
		modal_value.style.display = "none";
	}


	document.getElementById(slider_mode).style.display = "flex";
	ftext.update(0,knobo.value);
	
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

		clone.querySelector(".dev_card").id = "dev" + i;
		if (devices[i]["modal"]){
			clone.querySelector(".dev_card").addEventListener("click", modal_show);
		}

		fav_devices.appendChild(clone);
		

		
	}
}


function scroll_r(){
	fav_devices.scrollBy({top:0, left: 500, behavior:'smooth'});
	scroll_index = (fav_devices.scrollLeft + 500) / (fav_devices.scrollWidth-fav_devices.clientWidth);
	if (scroll_index >= 0.99) {
		fav_arr_r.disabled = true;
		fav_arr_r.src = "assets/icon_arrow_left@1x.png";
	}
	fav_arr_l.disabled = false;
	fav_arr_l.src = "assets/icon_arrow-black_left.svg";
}
function scroll_l(){
	fav_devices.scrollBy({top:0, left: -500, behavior:'smooth'});
	scroll_index = (fav_devices.scrollLeft - 500) / (fav_devices.scrollWidth-fav_devices.clientWidth);
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
	floor_slide_container.style.display = "none";
	bulb_slide_container.style.display = "none";
	temp_slide_container.style.display = "none";
	modal_current = "";

}
function modalApply(){
	if (devices[modal_current].modal == "floor_slide_container"){
		devices[modal_current].value = knobo.value;
	} else if (devices[modal_current].modal == "bulb_slide_container"){
		devices[modal_current].value = bulb_range.value;
	} else if (devices[modal_current].modal == "temp_slide_container"){
		devices[modal_current].value = temp_range.value;
	}
	afterModal();
}

function fav_group_change(e) {
	//alert(e.target.id)
	filter = e.target.id;
	filter = filter.substring(7);
	for (var i = 0; i < devices.length; i++) {
		if ((devices[i].tags.includes(filter)) || (filter =="all")) {
			document.getElementById("dev" + i).style.display = "block";
		} else {
			document.getElementById("dev" + i).style.display = "none";
		}	
	}
	fav_dev_top_menu_btn.value = e.target.value + "    ";
	
	if (window.innerWidth<451){
		fav_dev_top_menu_btn.style.backgroundImage = "url('assets/icon_filter_dropdown.svg')";
		fav_dev_groups.style.display="none";
	}
}


filter_all.addEventListener("click", fav_group_change);
filter_kitchen.addEventListener("click", fav_group_change);
filter_hall.addEventListener("click", fav_group_change);
filter_bulb.addEventListener("click", fav_group_change);
filter_cam.addEventListener("click", fav_group_change);

modal_apply.addEventListener("click", function(){modalApply()});
modal_close.addEventListener("click", function(){afterModal()});
modal.addEventListener("click", function (e){if (e.target == modal){afterModal();}});

fav_s_arr_r.addEventListener("click", nextpage);
fav_s_arr_l.addEventListener("click", prevpage);
fav_arr_r.addEventListener("click", scroll_r);
fav_arr_l.addEventListener("click", scroll_l);


function blurAway() {
	setTimeout(function() {
		hamburger_cb.checked = false;
		}, 50);
	
}
hamburger_cb.addEventListener("blur", blurAway);


function modal_temp_radios() {
	if (cold_temp.checked==true) {
		temp_range.value = -5;} 
	else if (warm_temp.checked==true) {
		temp_range.value = 15;}
	else if (hot_temp.checked==true) {
		temp_range.value = 35;}
}
function modal_bulb_radios() {
	if (day_light.checked==true) {
		bulb_range.value = -5;} 
	else if (even_light.checked==true) {
		bulb_range.value = 15;}
	else if (dawn_light.checked==true) {
		bulb_range.value = 35;}
}

function temp_range_auto_radios() {
	switch (temp_range.value) {
		case "-5":
			cold_temp.checked = true;
			break;
		case "15":
			warm_temp.checked = true;
			break
		case "35":
			warm_temp.checked = true;
			break;
		default:
			manual_temp.checked = true;
	}
}
function bulb_range_auto_radios() {
	switch (bulb_range.value) {
		case "-5":
			day_light.checked = true;
			break;
		case "15":
			even_light.checked = true;
			break
		case "35":
			dawn_light.checked = true;
			break;
		default:
			manual_light.checked = true;
	}
}

cold_temp.addEventListener("click", modal_temp_radios);
warm_temp.addEventListener("click", modal_temp_radios);
hot_temp.addEventListener("click", modal_temp_radios);
day_light.addEventListener("click", modal_bulb_radios);
even_light.addEventListener("click", modal_bulb_radios);
dawn_light.addEventListener("click", modal_bulb_radios);

temp_range.addEventListener("change", temp_range_auto_radios);
bulb_range.addEventListener("change", bulb_range_auto_radios);



load_devices_v();
load_scenarios();
load_devices_h();


fav_dev_top_menu_btn.addEventListener("click", favDevDropdown);

function favDevDropdown(e) {

	if (["none", ""].includes(fav_dev_groups.style.display)) {

		fav_dev_groups.style.display="flex";
		fav_dev_top_menu_btn.style.backgroundImage = "url('assets/icon_arrow-black_left.svg')";
	} else {
		fav_dev_top_menu_btn.style.backgroundImage = "url('assets/icon_filter_dropdown.svg')";
		fav_dev_groups.style.display="none";
		
	}
}

//media fav_dev_groups display
function showDevGroups(x) {
    if (x.matches) { // If media query matches
        fav_dev_groups.style.display="flex";
    } else {
        fav_dev_groups.style.display="none";
    }
}
var mqw450 = window.matchMedia("(min-width: 451px)");
showDevGroups(mqw450)
mqw450.addListener(showDevGroups)



var ftext;
var thumbler = function() {};
thumbler.prototype = Object.create(Ui.prototype);
thumbler.prototype.createElement = function() {
    Ui.prototype.createElement.apply(this, arguments);
    this.addComponent(new Ui.Pointer({
        type: 'Triangle',
        pointerWidth: 10,
        pointerHeight: 6,
        offset: 44
    }));
    ftext = new Ui.Text(this.value,10,10);
  	this.addComponent(ftext);

    this.addComponent(new Ui.Arc({
    	arcWidth: 0,
	    outerRadius: 100,innerRadius: 100
  	}));
  	this.merge(this.options, {arcWidth: 0,outerRadius: 100,innerRadius: 100});
  	var arc = new Ui.El.Arc(this.options);
  	arc.setAngle(this.options.anglerange);
  	this.el.node.appendChild(arc.node);
  	
  	
  	
	this.el.node.setAttribute("class", "thumbler");

}
var thu = new thumbler();
var kno = new Knob(document.getElementById('knobo'), thu);
//modal.style.display = "none";
//floor_slide_container.style.display = "none";





/*

all_devices.addEventListener("scroll",scroll_btns_display)

function scroll_btns_display() {
	//Чтобы кнопки прокрутки исчезали в вертикальном списке устройств
	var scrollPercentage = all_devices.scrollTop / (all_devices.scrollHeight-all_devices.clientHeight);	
	if (scrollPercentage==0) {
		scroll_up_arr.style.display = "none";
	} else {
		scroll_up_arr.style.display = "block";
	}
	if (scrollPercentage==1) {
		scroll_down_arr.style.display = "none";
	} else {
		scroll_down_arr.style.display = "block";
	}
}
*/
var isScrolling;
all_devices.addEventListener("scroll",scroll_btns_hide, false)
function scroll_btns_hide() {
	scroll_down_arr.style.display = "none";
	window.clearTimeout( isScrolling );
	isScrolling = setTimeout(function() {
		console.log( 'Scrolling has stopped.' );
		scroll_down_arr.style.display = "block";
		}, 500);
}

function load_devices_v() {
	for (var i = 0; i < devices.length; i++) {
		var clone = document.importNode(dev_tmpl.content, true);

		pic = clone.querySelector(".pic");
		nam = clone.querySelector(".nam");
		status = clone.querySelector(".status");

		pic.classList.add(devices[i]["pic"]);
		nam.textContent = devices[i]["name"];
		status.textContent = devices[i]["status"];

		all_devices.appendChild(clone);
	}
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
		fav_scenarios.appendChild(clone);
	}
}

function load_devices_h() {
	for (var i = 0; i < devices.length; i++) {
		var clone = document.importNode(dev_tmpl.content, true);

		pic = clone.querySelector(".pic");
		nam = clone.querySelector(".nam");
		status = clone.querySelector(".status");

		pic.classList.add(devices[i]["pic"]);
		nam.textContent = devices[i]["name"];
		status.textContent = devices[i]["status"];
		
		clone.querySelector(".dev_card").classList.add("nobottom");

		fav_devices.appendChild(clone);
	}
}

load_devices_v();
load_scenarios();

load_devices_h();



function SWFbox( swfName, swfWidth, swfHeight, swfBackground, swfURL ) {
	// create the div structure
	createSWFbox( swfName, swfWidth, swfHeight, swfBackground, swfURL );
	// position the flash in the middle vertically 
	positionSWFbox( swfName, swfWidth, swfHeight );
	// finally make the swfbox visible
	document.getElementById(swfName).style.display='block';
}

function createSWFbox( swfName, swfWidth, swfHeight, swfBackground, swfURL ) {
	//global swfName, swfWidth, swfHeight, swfBackground;
	
	var pageBody = document.getElementsByTagName("body").item(0);
	var SWFbox = document.createElement("div");
	SWFbox.setAttribute('id',swfName);
	SWFbox.style.display = 'none';
	pageBody.appendChild(SWFbox);
	
	var SWFbox_back = document.createElement("div");
	SWFbox_back.className = 'swfbox-back';
	SWFbox.appendChild(SWFbox_back);
	
	var SWFbox_container = document.createElement("div");
	SWFbox_container.className = 'swfbox-container';
	SWFbox.appendChild(SWFbox_container);

	var SWFbox_content = document.createElement("div");
	SWFbox_content.className = 'swfbox-content';
	SWFbox_container.appendChild(SWFbox_content);
	
	SWFbox_content.innerHTML = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="'+swfWidth+'" height="'+swfHeight+'" id="'+swfName+'-flash" align="middle"><param name="allowScriptAccess" value="sameDomain" /><param name="movie" value="'+swfURL+'" /><param name="quality" value="high" /><param name="bgcolor" value="'+swfBackground+'" /><embed src="'+swfURL+'" quality="high" bgcolor="'+swfBackground+'" width="'+swfWidth+'" height="'+swfHeight+'" name="'+swfName+'-flash" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.adobe.com/go/getflashplayer" /></object>';

	SWFbox.onclick = function() { hideSWFbox(swfName); }
	window.onscroll = function() { window.onscroll = null; hideSWFbox(swfName); }

}

function positionSWFbox( swfName, swfWidth, swfHeight ) {
	// find the browser's window dimensions
	windowDimensions = windowSize();
	pageScrolls = pageScroll();
	// get new positions for the swfbox divs so it appears in the middle vertically 
	positionDivs = new Array (); 
	positionDivs = {'swfbox-back-top' : String( pageScrolls[1] )+'px',
					'swfbox-back-height' : String( windowDimensions[1] )+'px',
					'swfbox-container-top' : String( pageScrolls[1] + (windowDimensions[1]/2) )+'px',
					'swfbox-content-top' : String(-(swfHeight/2))+'px' };
	// apply the new position of each div
	swfboxNodes = document.getElementById(swfName).childNodes;
	for ( var i=0; i<swfboxNodes.length; i++ ) { 
		if ( swfboxNodes[i].className == 'swfbox-container' ) { 
			swfboxNodes[i].style.top = positionDivs['swfbox-container-top'];
			// find the content div inside the container
			for ( var j=0; j<swfboxNodes[i].childNodes.length; j++ ) { 
				if ( swfboxNodes[i].childNodes[j].className == 'swfbox-content' ) { 
					swfboxNodes[i].childNodes[j].style.top = positionDivs['swfbox-content-top'];
				}
			}
		} 
		if ( swfboxNodes[i].className == 'swfbox-back' ) { 
			swfboxNodes[i].style.top = positionDivs['swfbox-back-top'];
			swfboxNodes[i].style.height = positionDivs['swfbox-back-height'];
		} 
	}
}

function hideSWFbox(swfName) {
	// hide the swfbox
	var pageBody = document.getElementsByTagName("body").item(0);
	var SWFbox =document.getElementById(swfName);
	SWFbox.style.display = 'none';
	pageBody.removeChild(SWFbox);
}

function windowSize() {
	var windowWidth = 0, windowHeight = 0;
	if( typeof( window.innerWidth ) == 'number' ) {
		//Non-IE
		windowWidth = window.innerWidth;
		windowHeight = window.innerHeight;
	} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
		//IE 6+ in 'standards compliant mode'
		windowWidth = document.documentElement.clientWidth;
		windowHeight = document.documentElement.clientHeight;
	} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
		//IE 4 compatible
		windowWidth = document.body.clientWidth;
		windowHeight = document.body.clientHeight;
	}
	return [windowWidth, windowHeight];
}

function pageScroll(){
	var xScroll, yScroll;

	if (self.pageYOffset) {
		yScroll = self.pageYOffset;
		xScroll = self.pageXOffset;
	} else if (document.documentElement && document.documentElement.scrollTop){	 // Explorer 6 Strict
		yScroll = document.documentElement.scrollTop;
		xScroll = document.documentElement.scrollLeft;
	} else if (document.body) {// all other Explorers
		yScroll = document.body.scrollTop;
		xScroll = document.body.scrollLeft;	
	}
	return [xScroll,yScroll];
}

function compareScroll( oldYScroll, swfName ){
	pageScrolls = pageScroll();
	if ( pageScrolls[1] != oldYScroll ) {
		hideSWFbox(swfName);
	}
}



function swfboxShow( swfWidth, swfHeight, target ) {
	// find the browser's window dimensions
	windowDimensions = windowSize();
	// position the flash in the middle vertically 
	positionDivs = new Array (); 
	// get new positions for the swfbox divs so it appears in the middle vertically 
	positionDivs = {'swfbox-back-top' : String( document.documentElement.scrollTop )+'px',
					'swfbox-back-height' : String( windowDimensions[1] )+'px',
					'swfbox-container-top' : String( document.documentElement.scrollTop + (windowDimensions[1]/2) )+'px',
					'swfbox-content-top' : String(-(swfHeight/2))+'px' };
	// apply the new position of each div
	swfboxNodes = document.getElementById(target).childNodes;
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
	// finally make the swfbox visible
	document.getElementById(target).style.display='block';
}

function swfboxHide(target) {
	// hide the swfbox
	document.getElementById(target).style.display='none';
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

// load actions for hiding the flash object
function hideActions(target) {
	swfboxNodes = document.getElementById(target).childNodes;
	for ( var i=0; i<swfboxNodes.length; i++ ) { 
		if ( swfboxNodes[i].className == 'swfbox-container' || swfboxNodes[i].className == 'swfbox-back' ) { 
			swfboxNodes[i].onclick = function () { 
										swfboxHide(target); 
										return false; 
									}
		} 
	}
}

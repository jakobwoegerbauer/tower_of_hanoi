$(document).ready(function() {
	window.moveCounter = 0;

	swal({
		title: "Tower of Hanoi",
		text: "How many disks do you want?",
		type: "input",
		showCancelButton: true,
		closeOnConfirm: false,
		animation: "slide-from-top",
		inputPlaceholder: "Write a number"
	}, function(inputValue) {
		var input_number = parseInt(inputValue);
		if (inputValue === false || inputValue === "" || isNaN(input_number)) {
			swal.showInputError("You need to write a number!");
			return false;
		}

		window.pegs = createPegs(
			/*  pegCount = */ 3,
			/* diskCount = */ input_number);
		displayPegs(pegs, 
			/* pegMinWidth = */ 30);

		swal("Good luck!", inputValue + " disks have been generated for you.", "info");
	});

	adjustMoveCounterFontSize();
});

$(window).resize(function() {
	adjustMoveCounterFontSize();
});

function adjustMoveCounterFontSize() {
	var moveCounter = $('#movecounter').parent();
	moveCounter.css({
		'font-size': $('#footer').height() + 'px'
	});
}

function displayPegs(pegs, pegMinWidth) {
	var diskCount = pegs[0][0];
	var pegContainer = $('#pegcontainer');
	pegContainer.html('');
	for (var i = 0; i < pegs.length; i++) {
		pegContainer.append('<div class="peg"></div>');
	}

	var pegWidth = ((96 - 2.7 * (pegs.length - 1)) / pegs.length) + '%';
	$('div.peg').css({
		'width': pegWidth
	});
	
	var pegElements = $('div.peg');
	var firstPegMarginLeft = (pegContainer.width() + $(pegElements[0]).offset().left - $(pegElements[pegElements.length - 1]).offset().left - $(pegElements[pegElements.length - 1]).width())/2;
	$('div.peg:first-child').css({
		'margin-left': firstPegMarginLeft
	});

	for (var i = diskCount - 1; i >= 0; i--) {
		$(pegElements[0]).append('<div class="disk" value="' + pegs[0][i] + '" peg="0"></div>');
	}

	var diskHeight = (100 / diskCount) + '%';
	$('div.disk').css({
		height: diskHeight
	});

	var diskElements = $('div.disk');
	for (var i = 0; i < diskCount; i++) {
		$(diskElements[i]).css({
			width: (pegMinWidth + (100 - pegMinWidth) * ((pegs[0][diskCount - i - 1] - 1) / (diskCount - 1))) + '%'
		});
	}

	$('div.disk').draggable({
		snap: 'div.peg',
		stop: function() {
			var oldPegIndex = parseInt($(this).attr('peg'));
			if ($('div.peg:nth-child(' + (oldPegIndex + 1) + ') div.disk:first-child').attr('value') != $(this).attr('value')) {
				swal('Invalid move!', 'You may only move the topmost disk.', 'error');
			} else {
				var newPegIndex;
				var diskOffsetLeft = $(this).offset().left + $(this).width() / 2;
				for (newPegIndex = pegElements.length - 1; newPegIndex >= 0; newPegIndex--) {
					if ($(pegElements[newPegIndex]).offset().left < diskOffsetLeft) {
						break;
					}
				}

				if (oldPegIndex != newPegIndex) {
					if (moveDisk(pegs[oldPegIndex], pegs[newPegIndex])) {
						var diskHeight = $(this).outerHeight();
						var newPeg = $('div.peg:nth-child(' + (newPegIndex + 1) + ')');
						newPeg.find('div.disk:first-child').css({
							'margin-top': 0
						});
						newPeg.prepend(this);
						$(this).attr({
							peg: newPegIndex
						});

						var oldPeg = $('div.peg:nth-child(' + (oldPegIndex + 1) + ')');
						oldPeg.find('div.disk:first-child').css({
							'margin-top': ((diskCount - oldPeg.find('div.disk').length) * diskHeight) + 'px'
						});
						$(this).css({
							'margin-top': ((diskCount - newPeg.find('div.disk').length) * diskHeight) + 'px'
						});

						moveCounter++;
						$('#movecounter').html(moveCounter);

						if (pegs[0].length == 0 && pegs[1].length == 0) { // finished
							swal("Good job!", "You solved the puzzle in " + moveCounter + " moves.", "success");
						}
					} else {
						swal('Invalid move!', 'A disk may not sit on top of a smaller disk.', 'error');
					}
				}
			}
			$(this).css({
				top: 0,
				left: 0
			});
		}
	});
}
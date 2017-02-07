var pegs = [];

function createPegs(diskCount, pegCount) {
	var pegs = [];
	pegs[0] = [];
	for (; pegCount > 0; pegCount--) {
		pegs[0].push(pegCount);
	}
	for (; diskCount > 1; diskCount--) {
		pegs.push([]);
	}
	return pegs;
}

function canMove(fromPeg, toPeg) {
	return fromPeg.length > 0 && (toPeg.length == 0 || fromPeg[fromPeg.length - 1] < toPeg[toPeg.length - 1]);
}

function moveDisk(fromPeg, toPeg) {
	if (canMove(fromPeg, toPeg)) {
		toPeg.push(fromPeg.splice(fromPeg.length - 1, 1)[0]);
		return true;
	} else {
		return false;
	}
}

function calculateBestNextMove(pegs, diskCount) {
	
}
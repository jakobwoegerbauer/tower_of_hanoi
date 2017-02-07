var pegs = [];
var moves = [];

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

function getTempTower(a, b){
	if(a !== 0 && b !== 0){
		return 0;
	}
	if(a !== 1 && b !== 1){
		return 1;
	}
	return 2;
}

function move(from, to){
	moves.push([from,to]);
}

function solve(from, to, amount){
	if(amount == 1){
		move(from, to);
		return;
	}
	solve(from, getTempTower(from, to), amount-1);
	move(from, to);
	solve(getTempTower(from, to), to, amount-1);
}

function calculateBestSolution(amount){
	solve(0, 2, amount);
}
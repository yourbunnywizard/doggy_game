const animationSelector = document.getElementById('animations');
let playerState = "idle";
animationSelector.addEventListener('change', function(e) {
	playerState = e.target.value;
});

const canvas = document.getElementById('render-view');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const dogSprites = new Image();
dogSprites.src = "./assets/sprites/shadow_dog.png";

const spriteWidth = 575;
const spriteHeight = 523;
let gameFrame = 0;
const staggerFrames = 5;
const spriteAnimations = [];
const animationStates = [
	{ name: 'idle', frames: 7 },
	{ name: 'jump', frames: 7 },
	{ name: 'fall', frames: 7 },
	{ name: 'run', frames: 9 },
	{ name: 'dizzy', frames: 11 },
	{ name: 'sit', frames: 5 },
	{ name: 'roll', frames: 7 },
	{ name: 'bite', frames: 7 },
	{ name: 'ko', frames: 12 },
	{ name: 'getHit', frames: 7 },
];

animationStates.forEach((state, index) => {
	let frames = {
		loc: []
	}
	for(let i = 0; i < state.frames; i++) {
		let positionX = i * spriteWidth;
		let positionY = index * spriteHeight;
		frames.loc.push({x: positionX, y: positionY});
	}
	spriteAnimations[state.name] = frames;
});

function animate() {
	//clear canvas every render
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);


	//calculating sprite coordinates
	let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length;
	let frameX = spriteWidth * position;
	let frameY = spriteAnimations[playerState].loc[position].y;
	
	//drawing sprite
	ctx.drawImage(dogSprites, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
	
	gameFrame++;
	requestAnimationFrame(animate);
}
animate();
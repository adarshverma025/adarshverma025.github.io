// Confetti Animation
class Confetti {
	constructor(canvas) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		this.particles = [];
		this.animationId = null;
		
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		
		window.addEventListener('resize', () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		});
	}
	
	createParticles(x, y, count = 30) {
		for (let i = 0; i < count; i++) {
			const angle = (Math.random() * Math.PI * 2);
			const velocity = 4 + Math.random() * 8;
			
			this.particles.push({
				x: x || window.innerWidth / 2,
				y: y || window.innerHeight / 2,
				vx: Math.cos(angle) * velocity,
				vy: Math.sin(angle) * velocity - 5,
				life: 1,
				size: 5 + Math.random() * 5,
				color: this.getRandomColor(),
				rotation: Math.random() * Math.PI * 2,
				rotationSpeed: (Math.random() - 0.5) * 0.2
			});
		}
	}
	
	getRandomColor() {
		const colors = ['#FF6B6B', '#FFE66D', '#4ECDC4', '#95E1D3', '#F38181', '#AA96DA', '#FCBAD3'];
		return colors[Math.floor(Math.random() * colors.length)];
	}
	
	animate() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		
		this.particles = this.particles.filter(p => p.life > 0);
		
		this.particles.forEach(p => {
			p.x += p.vx;
			p.y += p.vy;
			p.vy += 0.2; // gravity
			p.life -= 0.01;
			p.rotation += p.rotationSpeed;
			
			this.ctx.save();
			this.ctx.globalAlpha = p.life;
			this.ctx.fillStyle = p.color;
			this.ctx.translate(p.x, p.y);
			this.ctx.rotate(p.rotation);
			this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
			this.ctx.restore();
		});
		
		if (this.particles.length > 0) {
			this.animationId = requestAnimationFrame(() => this.animate());
		}
	}
	
	trigger() {
		this.createParticles();
		this.animate();
	}
}

// Fireworks Animation - Realistic fireworks with trails and bursts
class Fireworks {
	constructor(canvas, isBackground = false) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		this.particles = [];
		this.trails = [];
		this.animationId = null;
		this.isBackground = isBackground;
		
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		
		window.addEventListener('resize', () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		});
	}
	
	createExplosion(x, y, options = {}) {
		const particleCount = options.count || 80;
		const colors = ['#FF1744', '#FF5252', '#FF6E40', '#FFB300', '#FFEB3B', '#76FF03', '#00E5FF', '#00B0FF', '#D500F9', '#FF00E5', '#FFD700', '#FF69B4'];
		const burstType = options.type || 'normal'; // 'normal', 'rings', 'popper'
		
		if (burstType === 'rings') {
			// Create ring burst effect
			for (let ring = 0; ring < 3; ring++) {
				for (let i = 0; i < particleCount / 3; i++) {
					const angle = (i / (particleCount / 3)) * Math.PI * 2;
					const velocity = 3 + ring * 2;
					
					this.particles.push({
						x: x,
						y: y,
						vx: Math.cos(angle) * velocity,
						vy: Math.sin(angle) * velocity,
						life: 1,
						maxLife: 1,
						size: 2 + Math.random() * 4,
						color: colors[Math.floor(Math.random() * colors.length)],
						friction: 0.94,
						gravity: 0.12,
						trail: true
					});
				}
			}
		} else if (burstType === 'popper') {
			// Explosive burst with varied speeds
			for (let i = 0; i < particleCount; i++) {
				const angle = (Math.random() * Math.PI * 2);
				const velocity = 4 + Math.random() * 12;
				
				this.particles.push({
					x: x,
					y: y,
					vx: Math.cos(angle) * velocity,
					vy: Math.sin(angle) * velocity - 2,
					life: 1,
					maxLife: 1,
					size: 2 + Math.random() * 5,
					color: colors[Math.floor(Math.random() * colors.length)],
					friction: 0.94,
					gravity: 0.15,
					trail: true,
					sparkle: Math.random() > 0.7
				});
			}
		} else {
			// Standard burst
			for (let i = 0; i < particleCount; i++) {
				const angle = (Math.random() * Math.PI * 2);
				const velocity = 3 + Math.random() * 9;
				
				this.particles.push({
					x: x,
					y: y,
					vx: Math.cos(angle) * velocity,
					vy: Math.sin(angle) * velocity - 2,
					life: 1,
					maxLife: 1,
					size: 2 + Math.random() * 5,
					color: colors[Math.floor(Math.random() * colors.length)],
					friction: 0.94,
					gravity: 0.15,
					trail: Math.random() > 0.6
				});
			}
		}
	}
	
	animate() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		
		// Apply background opacity if needed
		if (this.isBackground) {
			this.ctx.globalAlpha = 0.6;
		}
		
		this.particles = this.particles.filter(p => p.life > 0);
		
		this.particles.forEach(p => {
			p.vx *= p.friction;
			p.vy *= p.friction;
			p.vy += p.gravity;
			p.x += p.vx;
			p.y += p.vy;
			p.life -= 0.004;
			
			this.ctx.save();
			const alphaValue = this.isBackground ? p.life * 0.6 : p.life;
			this.ctx.globalAlpha = alphaValue;
			
			// Draw main particle
			this.ctx.fillStyle = p.color;
			this.ctx.beginPath();
			this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
			this.ctx.fill();
			
			// Add glow effect for sparkle particles
			if (p.sparkle) {
				this.ctx.strokeStyle = p.color;
				this.ctx.lineWidth = 1;
				this.ctx.globalAlpha = alphaValue * 0.5;
				this.ctx.beginPath();
				this.ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
				this.ctx.stroke();
			}
			
			// Draw trail if enabled
			if (p.trail && p.life > 0.7) {
				this.ctx.strokeStyle = p.color;
				this.ctx.lineWidth = p.size * 0.5;
				this.ctx.globalAlpha = alphaValue * 0.3;
				this.ctx.beginPath();
				this.ctx.moveTo(p.x - p.vx * 2, p.y - p.vy * 2);
				this.ctx.lineTo(p.x, p.y);
				this.ctx.stroke();
			}
			
			this.ctx.restore();
		});
		
		if (this.particles.length > 0) {
			this.animationId = requestAnimationFrame(() => this.animate());
		}
	}
	
	trigger(x, y, options = {}) {
		this.createExplosion(x, y, options);
		this.animate();
	}
	
	triggerSequence(x, y, count = 3, delay = 150, type = 'popper') {
		for (let i = 0; i < count; i++) {
			setTimeout(() => {
				const offsetX = x + (Math.random() - 0.5) * 100;
				const offsetY = y + (Math.random() - 0.5) * 100;
				this.trigger(offsetX, offsetY, { type: type, count: 60 });
			}, i * delay);
		}
	}
}

let confetti;
let fireworks;
let backgroundFireworks;

// Initialize when DOM is ready
function initPage() {
	try {
		const canvas = document.getElementById('confetti');
		if (canvas) {
			confetti = new Confetti(canvas);
		}
		
		const fireworksCanvas = document.getElementById('fireworks');
		if (fireworksCanvas) {
			fireworks = new Fireworks(fireworksCanvas, false);
		}
		
		const bgFireworksCanvas = document.getElementById('backgroundFireworks');
		if (bgFireworksCanvas) {
			backgroundFireworks = new Fireworks(bgFireworksCanvas, true);
			// DO NOT start background fireworks automatically - wait for candles to be lit
		}
		
		// Hide loading screen with multiple methods
		const loading = document.querySelector('.loading');
		if (loading) {
			loading.style.display = 'none !important';
			loading.style.visibility = 'hidden';
			loading.style.opacity = '0';
			loading.style.zIndex = '-1';
			loading.remove();
		}
		
		// Show container
		const container = document.querySelector('.container');
		if (container) {
			container.style.display = 'block';
		}
		
		console.log('Page initialized successfully');
	} catch (error) {
		console.error('Error initializing page:', error);
	}
}

function startBackgroundFireworks() {
	if (!backgroundFireworks) return;
	
	// Store interval ID so we can stop it later
	window.backgroundFireworksInterval = setInterval(() => {
		// Top right corner
		const x1 = window.innerWidth - 100 - Math.random() * 200;
		const y1 = 50 + Math.random() * 150;
		backgroundFireworks.trigger(x1, y1, { type: 'rings', count: 40 });
		
		// Top left corner
		const x2 = 100 + Math.random() * 200;
		const y2 = 50 + Math.random() * 150;
		backgroundFireworks.trigger(x2, y2, { type: 'rings', count: 40 });
	}, 2500);
}

function stopBackgroundFireworks() {
	if (window.backgroundFireworksInterval) {
		clearInterval(window.backgroundFireworksInterval);
		window.backgroundFireworksInterval = null;
	}
}

// Use multiple methods to ensure page loads
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initPage);
} else {
	initPage();
}

window.addEventListener('load', initPage);

// Fallback timeout - ensures page loads after 2 seconds max
setTimeout(initPage, 2000);

// Wait for jQuery to be available before setting up handlers
function setupEventHandlers() {
	if (typeof $ === 'undefined') {
		setTimeout(setupEventHandlers, 100);
		return;
	}
	
	var vw;
		$(window).resize(function(){
			 vw = $(window).width()/2;
			$('#b1,#b2,#b3,#b4,#b5,#b6,#b7').stop();
			$('#b11').animate({top:240, left: vw-350},500);
			$('#b22').animate({top:240, left: vw-250},500);
			$('#b33').animate({top:240, left: vw-150},500);
			$('#b44').animate({top:240, left: vw-50},500);
			$('#b55').animate({top:240, left: vw+50},500);
			$('#b66').animate({top:240, left: vw+150},500);
			$('#b77').animate({top:240, left: vw+250},500);
		});

	$('#turn_on').click(function(){
		// Stop background fireworks on turn on screen
		stopBackgroundFireworks();
		
		$('#bulb_yellow').addClass('bulb-glow-yellow');
		$('#bulb_red').addClass('bulb-glow-red');
		$('#bulb_blue').addClass('bulb-glow-blue');
		$('#bulb_green').addClass('bulb-glow-green');
		$('#bulb_pink').addClass('bulb-glow-pink');
		$('#bulb_orange').addClass('bulb-glow-orange');
		$('body').addClass('peach');
		if (confetti) confetti.trigger();
		$(this).fadeOut('slow').delay(5000).promise().done(function(){
			$('#play').fadeIn('slow');
		});
	});
	$('#play').click(function(){
		var audio = $('.song')[0];
        audio.play();
        $('#bulb_yellow').addClass('bulb-glow-yellow-after');
		$('#bulb_red').addClass('bulb-glow-red-after');
		$('#bulb_blue').addClass('bulb-glow-blue-after');
		$('#bulb_green').addClass('bulb-glow-green-after');
		$('#bulb_pink').addClass('bulb-glow-pink-after');
		$('#bulb_orange').addClass('bulb-glow-orange-after');
		$('body').css('backgroud-color','#FFF');
		$('body').addClass('peach-after');
		if (confetti) {
			for (let i = 0; i < 3; i++) {
				setTimeout(() => confetti.trigger(), i * 500);
			}
		}
		$(this).fadeOut('slow').delay(6000).promise().done(function(){
			$('#bannar_coming').fadeIn('slow');
		});
	});

	$('#bannar_coming').click(function(){
		$('.bannar').addClass('bannar-come');
		if (confetti) confetti.trigger();
		$(this).fadeOut('slow').delay(6000).promise().done(function(){
			$('#balloons_flying').fadeIn('slow');
		});
	});

	function loopOne() {
		var randleft = 1000*Math.random();
		var randtop = 500*Math.random();
		$('#b1').animate({left:randleft,bottom:randtop},10000,function(){
			loopOne();
		});
	}
	function loopTwo() {
		var randleft = 1000*Math.random();
		var randtop = 500*Math.random();
		$('#b2').animate({left:randleft,bottom:randtop},10000,function(){
			loopTwo();
		});
	}
	function loopThree() {
		var randleft = 1000*Math.random();
		var randtop = 500*Math.random();
		$('#b3').animate({left:randleft,bottom:randtop},10000,function(){
			loopThree();
		});
	}
	function loopFour() {
		var randleft = 1000*Math.random();
		var randtop = 500*Math.random();
		$('#b4').animate({left:randleft,bottom:randtop},10000,function(){
			loopFour();
		});
	}
	function loopFive() {
		var randleft = 1000*Math.random();
		var randtop = 500*Math.random();
		$('#b5').animate({left:randleft,bottom:randtop},10000,function(){
			loopFive();
		});
	}

	function loopSix() {
		var randleft = 1000*Math.random();
		var randtop = 500*Math.random();
		$('#b6').animate({left:randleft,bottom:randtop},10000,function(){
			loopSix();
		});
	}
	function loopSeven() {
		var randleft = 1000*Math.random();
		var randtop = 500*Math.random();
		$('#b7').animate({left:randleft,bottom:randtop},10000,function(){
			loopSeven();
		});
	}

	$('#balloons_flying').click(function(){
		$('.balloon-border').animate({top:-500},8000);
		$('#b1,#b4,#b5,#b7').addClass('balloons-rotate-behaviour-one');
		$('#b2,#b3,#b6').addClass('balloons-rotate-behaviour-two');
		loopOne();
		loopTwo();
		loopThree();
		loopFour();
		loopFive();
		loopSix();
		loopSeven();
		if (confetti) {
			for (let i = 0; i < 4; i++) {
				setTimeout(() => confetti.trigger(), i * 800);
			}
		}
		$(this).fadeOut('slow').delay(5000).promise().done(function(){
			$('#cake_fadein').fadeIn('slow');
		});
	});	

	$('#cake_fadein').click(function(){
		$('.cake').fadeIn('slow');
		if (fireworks) {
			// Create dramatic popper fireworks around the cake
			for (let i = 0; i < 5; i++) {
				setTimeout(() => {
					const x = window.innerWidth / 2 + (Math.random() - 0.5) * 300;
					const y = window.innerHeight / 2 + (Math.random() - 0.5) * 200;
					if (fireworks) fireworks.trigger(x, y, { type: 'popper', count: 80 });
				}, i * 250);
			}
		}
		$(this).fadeOut('slow').delay(3000).promise().done(function(){
			$('#light_candle').fadeIn('slow');
		});
	});

	$('#light_candle').click(function(){
		$('.fuego').fadeIn('slow');
		if (confetti) confetti.trigger();
		
		// Start background fireworks when candles are lit
		startBackgroundFireworks();
		
		// Trigger dramatic fireworks when candles are lit
		if (fireworks) {
			for (let i = 0; i < 6; i++) {
				setTimeout(() => {
					for (let j = 0; j < 2; j++) {
						const x = window.innerWidth / 2 + (Math.random() - 0.5) * 250;
						const y = window.innerHeight / 2 - 100 + (Math.random() - 0.5) * 100;
						if (fireworks) fireworks.trigger(x, y, { type: 'popper', count: 70 });
					}
				}, i * 250);
			}
		}
		$(this).fadeOut('slow').promise().done(function(){
			$('#wish_message').fadeIn('slow');
		});
	});

		
	$('#wish_message').click(function(){
		 vw = $(window).width()/2;

		$('#b1,#b2,#b3,#b4,#b5,#b6,#b7').stop();
		$('#b1').attr('id','b11');
		$('#b2').attr('id','b22')
		$('#b3').attr('id','b33')
		$('#b4').attr('id','b44')
		$('#b5').attr('id','b55')
		$('#b6').attr('id','b66')
		$('#b7').attr('id','b77')
		$('#b11').animate({top:240, left: vw-350},500);
		$('#b22').animate({top:240, left: vw-250},500);
		$('#b33').animate({top:240, left: vw-150},500);
		$('#b44').animate({top:240, left: vw-50},500);
		$('#b55').animate({top:240, left: vw+50},500);
		$('#b66').animate({top:240, left: vw+150},500);
		$('#b77').animate({top:240, left: vw+250},500);
		$('.balloons').css('opacity','0.9');
		$('.balloons h2').fadeIn(3000);
		if (confetti) confetti.trigger();
		$(this).fadeOut('slow').delay(3000).promise().done(function(){
			$('#story').fadeIn('slow');
		});
	});
	
	$('#story').click(function(){
		$(this).fadeOut('slow');
		$('.cake').fadeOut('fast').promise().done(function(){
			$('.message').fadeIn('slow');
		});
		
		var i = 1;
		var totalMessages = 25; // Total number of <p> tags

		function msgLoop() {
			if (i > totalMessages) {
				// All messages shown, show final animation
				if (confetti) {
					for (let j = 0; j < 5; j++) {
						setTimeout(() => confetti.trigger(), j * 300);
					}
				}
				$('.cake').fadeIn('fast');
				return;
			}
			
			$("p:nth-child("+i+")").fadeIn('slow').delay(2000).promise().done(function(){
				$("p:nth-child("+i+")").fadeOut('slow');
				if (i % 5 === 0 && confetti) {
					confetti.createParticles(window.innerWidth * Math.random(), window.innerHeight * 0.3, 15);
				}
				i++;
				msgLoop();
			});
		}
		
		msgLoop();
		
	});
}

setupEventHandlers();
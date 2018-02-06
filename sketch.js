let w = 900;
let h = 600;
let grad = 20;
let ace = 0.8;
let vel_ini = -6;
let imp = 15;
let recorde = 0;
let passo = 12;
let pont = 0;
let pressed = false;

function setup() {
  	createCanvas(w, h);
	ellipseMode(CENTER);
	rectMode(CENTER);
	b = new Bola();
	r1 = new Ret(grad);
	r2 = new Ret(w-grad);
}

function draw() {
  	background(51);
  	stroke(255);
  	strokeWeight(4);
  	line(w/2,0,w/2,h-1);
	noFill();
	ellipse(w/2,h/2,w/6,w/6);
	textSize(36);
	strokeWeight(0);
	fill(255);
	text(("0"+pont).slice(-2),w/4.5,2*grad);
	if(pont > recorde) {
		recorde = pont;
	}
	textSize(18);
	text("BEST: "+("0"+recorde).slice(-2),w-w/5,2*grad);
	
	b.update();
	
	if(b.x < 0){
		b = new Bola();
		pont = 0;
	} else if(b.x > w-1) {
		b = new Bola();
		pont += 3;
	}
	
	if(b.toca(r1)) {
		if(b.controle) {
			b.vely = b.vely + (b.y - r1.y)/10;
			b.speedLim();
			if(abs(b.velx) < 25) {
				b.velx -= ace;
			}
			b.velx = b.velx * -1;
			b.x += 0.5*b.velx;
			pont += 1;
			b.controle = false;
		} 
	}
	if(b.toca(r2)) {
		if(!b.controle) {
			b.vely = b.vely + (b.y - r2.y)/imp;
			b.speedLim();
			b.velx = b.velx * -1;
			b.x += 0.5*b.velx;
			b.controle = true;
		}
	}
	
	r1.move();
	if(b.velx > 0 && b.x > w/2){
		r2.autoMove(b);	
	}
	r1.show();
	r2.show();
	b.show();
}

function Ret(x) {
	this.x = x;
	this.y = h/2;
	this.w = 8;
	this.h = h/6;
	this.i = 0;
	this.dir = 1;
	
	this.show = function() {
		noStroke();
		fill(255);
		rect(this.x,this.y,this.w,this.h);
	}
	
	this.move = function() {
		if(keyIsDown(UP_ARROW) && this.y - this.h/2 - passo > 0){
			this.y -= passo;
		} else if (keyIsDown(DOWN_ARROW) && this.y + this.h/2 + passo < h-1){
			this.y += passo;
		} else if(pressed) {
			if(mouseY < h/2 && this.y - this.h/2 - passo > 0) {
				this.y -= passo;
			} else if(mouseY > h/2 && this.y + this.h/2 + passo < h-1) {
				this.y += passo;
			}
		}
	}
	
	this.autoMove = function(bola) {
		if(this.i == 2) {
			let temp = this.dir;
			if(bola.y < this.y + this.h/1.85 && bola.y > this.y - this.h/1.85) {
				if(abs(bola.vely) < 4) {
					this.dir = 0;	
				}
			} else if(bola.y > this.y) {
				this.dir = 1;
			} else {
				this.dir = -1;
			}
			if(!(temp != this.dir && temp != 0)){
				this.i = 0;
			}
		}
		if(this.i < 8) {
			if((this.y + this.h/2 + passo < h-1 && this.dir == 1)||(this.y - this.h/2 - passo > 0 && this.dir == -1)) {
				this.y += this.dir*passo;
			}
		} else {
			if(this.i == 10) {
				this.i = 0;
			}
		}
		this.i++;
	}
}

function Bola() {
	this.x = w/2;
	this.y = h/2;
	this.d = 17;
	this.velx = vel_ini;
	this.vely = random(-3,3);
	this.controle = true;
	this.hit = true;
	
	this.show = function() {
		noStroke();
		fill(255);
    	ellipse(this.x, this.y, this.d, this.d);
	}
	
	this.update = function() {
		this.x = this.x + this.velx;
		this.y = this.y + this.vely;
		if(this.y + this.d/2  >= h-1 || this.y - this.d/2 <= 0) {
			if(this.hit){
				this.vely = this.vely * -1;
				this.hit = false;
			} else if(!this.hit) {
				this.hit = true;
				if(this.vely > 0) {
					this.y += 19;
				} else { 
					this.y -= 19;
				}
			}
		} else {
			this.hit = true;
		}
	}
	
	this.toca = function(ret) {
		if(abs(ret.x - this.x) <= (ret.w + this.d)/2 && abs(this.y - ret.y) <= (ret.h + 1.3*this.d)/2) {
			return true;
		} else {
			return false;
		}
	}
	
	this.speedLim = function() {
		let lim = 10;
		if(abs(this.vely) > lim) {
			if(this.vely > 0){
				this.vely = lim;
			} else {
				this.vely = -lim;
			}
		}
	}
}

function touchStarted() {
	pressed = true;
}
	
function touchEnded() {
	pressed = false;
}


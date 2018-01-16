let w = 1000;
let h = 600;
let grad = 20;
let ace = 0.35;
let pot = 0;

function setup() {
    createCanvas(w, h);
	b = new Bola();
	r1 = new Ret(grad);
	r2 = new Ret(w-grad);
}

function draw() {
    background(51);
    stroke(255);
    strokeWeight(3);
    line(w/2,0,w/2,h-1);
	
	textSize(30);
	strokeWeight(1);
	text(("0"+pot).slice(-2),w/5,2*grad);
	
	r1.move();
	r2.move();
	if(b.toca(r1)) {
		if(abs(b.velx) < 16) {
			b.velx -= ace;
		}
		b.velx = b.velx * -1;
		b.x += b.velx;
		pot += 1;
	}
	if(b.toca(r2)) {
		if(abs(b.velx) < 14) {
			b.velx += ace;
		}
		b.velx = b.velx * -1;
		b.x += b.velx;
	}
	b.update();
	r1.show();
	r2.show();
	b.show();
}

function Ret(x) {
	this.x = x;
	this.y = 200;
	this.w = 7;
	this.h = 90;
	this.show = function() {
		rectMode(CENTER);
		noStroke();
		rect(this.x,this.y,this.w,this.h);
		fill(255);
	}
	this.move = function() {
		if(keyIsDown(UP_ARROW) && this.y - this.h/2 > 5){
			this.y -= 10;
		} else if (keyIsDown(DOWN_ARROW) && this.y + this.h/2 < h-5){
			this.y += 10;
		}
	}
}

function Bola() {
	this.x = w/2;
	this.y = h/2;
	this.d = 18;
	this.velx = 5;
	this.vely = random(-3,3);
	
	this.show = function() {
		ellipseMode(CENTER);
		noStroke();
    	ellipse(this.x, this.y, this.d, this.d);
		fill(255);
	}
	this.update = function() {
		this.x = this.x + this.velx;
		this.y = this.y + this.vely;
		if(this.y + this.d/2 > h-1 || this.y - this.d/2 < 0) {
			this.vely = this.vely * -1;
		}
		if(this.x < grad || this.x > w-grad-1) {
			this.x = w/2;
			this.y = h/2;
			this.velx = 3;
			this.vely = random(-3,3);
			pot = 0;
		}
	}
	this.toca = function(ret) {
		if((abs(ret.x - this.x)<=(ret.w + this.d)/2)&&(this.y + this.d/4 >= ret.y - ret.h/2)&&(this.y - this.d/4 <= ret.y + ret.h/2)) {
			return true;
		} else {
			return false;
		}
	}
}


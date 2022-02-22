let DIM;
function setup() {
	DIM = min(windowWidth, windowHeight);
	createCanvas(DIM, DIM);
}

function mouseClicked(){
	background(240,240, 200);
	let h = DIM/2
	pillars(55, DIM/2+h/2, 5, DIM/8, h)
	
}
function pillars(x, y, n, w, h){
		for(let i = 0; i < n; i++){
			pillar(x + i*w*1.6, y, w, h);
		}
}
function pillar(x, y, w, h){
	let brickH = h/20
	let depthH = h/50
	let depthW = w/20
	let currh = y
	fill(255-13)
	rectMode(CORNERS)
	stroke(13, 13, 13);
	strokeWeight(.5);
	let paraParms = {
		"density":0.25,
		"drift" : 0.25, 
		"offset":0.4,
		"padding":0.0
	}
	let columnParms = {
		"density":0.6,
		"drift" : 0.25, 
		"offset":0.05,
		"padding":0.00,
		"skipHoriz" : true
	}
	depthRect(x, currh, w, brickH, depthW, depthH, paraParms);
	//move curr Y heigh up a brick, and up a fraction of the depth
	currh -= brickH + depthH / 4
	//Draw second stacked Rect
	depthRect(x, currh, w*.75, brickH*.75, depthW, depthH/2, paraParms)
	//move y pos and draw columns
	currh -= brickH*.75 + depthH/2/4
	depthRect(x, currh, w*.5, h, depthW, depthH/4, columnParms)
	//move y pos and draw top squares
	currh -= (h -depthH/4)
	depthRect(x, currh, w*.75, brickH*.75, depthW, depthH/2, paraParms)
	currh -= (brickH - depthH )
	depthRect(x, currh, w, brickH, depthW, depthH, paraParms);
	
}

function depthRect(x, y, w, brickH, depthW, depthH, paraParms){
	parallelogram(x-w/2, y,x+w/2,y,  x+w/2, y - brickH,x-w/2,y - brickH, paraParms);
	let d = paraParms.density;
	paraParms.density = 4;
	//top depth of bottom square
	parallelogram(x-w/2, y-brickH,x-w/2-depthW, y-brickH-depthH,x+w/2-depthW, y-brickH-depthH, x+w/2, y-brickH,paraParms);
	//left of bottom square
	parallelogram(x-w/2, y-brickH,x-w/2-depthW, y-brickH-depthH,x-w/2 - depthW, y - depthH,x-w/2, y, paraParms);
	paraParms.density = d;
}
function draw() {

}

function parallelogram(x1, y1, x2, y2, x3, y3, x4, y4, parms){
	//calculate edge distances and angles
	let d1 = dist(x1, y1, x2, y2);
	let d2 = dist(x2, y2, x3, y3);
	let a1 = angleBetweenTwoPoints(x1,y1,x2,y2);
	let a2 = angleBetweenTwoPoints(x2,y2,x3,y3);
	
	//draw lines on parallelogram
	let numLines = round(d1 * parms.density)
	stroke(108, 21, 16);
	for(let i=0; i < numLines;i++){
		randomLine(x1, y1, d1, d2, a1, a2, parms.drift, parms.offset, parms.padding);
		if(!parms.skipHoriz){
			randomLine(x2, y2, d2, d1, a2, a1+PI, parms.drift, parms.offset, parms.padding); 
		}
		
	}
}
function randomLine(x1, y1, d1, d2, a1, a2, drift, offset, padding){
	strokeWeight(random());
	let d = random()* (d1*(1-padding))+d1*padding/2 //include padding in starting pos
	let offseta = offset*d2*random();
	let xa = x1 + cos(a1)*d + cos(a2)*offseta 
	let ya = y1 + sin(a1)*d + sin(a2)*offseta 
	d += random()*drift*d-drift/2*d;
	d = max(d, d1*(padding/2)); d = min(d, d1*(1-padding/2)); //don't drift outside padding
	let offsetb = offset*d2*random();
	let xb = x1+cos(a1)*d+cos(a2)*(d2-offsetb) 
	let yb = y1+sin(a1)*d+sin(a2)*(d2-offsetb)
	line(xa, ya, xb, yb);
}

function parallelLine(x, y, d1, d2, a1 ,a2){
	let d = random()* d1;
	let xa = x + cos(a1)*d;
	let ya = y + sin(a1)*d;
	line(xa, ya, xa + cos(a2)*d2, ya + sin(a2)*d2);
}

function angleBetweenTwoPoints(x1, y1, x2, y2){
	return atan2(y2-y1,x2-x1);
}

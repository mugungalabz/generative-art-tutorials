
function setup() {
	createCanvas(500, 500)
	background(250, 225, 200);
	stroke(108, 21, 16);
	noFill();
	parallelogram(60, 200, 280, 130,440, 300,220, 370, .7);
}

function parallelogram(x1, y1, x2, y2, x3, y3, x4, y4, density){
	//calculate edge distances and angles
	let d1 = dist(x1, y1, x2, y2);
	let d2 = dist(x2, y2, x3, y3);
	let a1 = angleBetweenTwoPoints(x1,y1,x2,y2);
	let a2 = angleBetweenTwoPoints(x2,y2,x3,y3);
	
	//draw lines on parallelogram
	let numLines = round(d1 * density)
	stroke(108, 21, 16);
	for(let i=0; i < numLines;i++){
		randomLine(x1, y1, d1, d2, a1, a2, 0, 0.5, 0.5); 
		randomLine(x2, y2, d2, d1, a2, a1+PI, 1.5, 0.0, 0.5); 
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

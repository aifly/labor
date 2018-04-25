export default class Point{
	constructor(option){
		this.x = option.x ||  Math.random()*option.context.canvas.width;
		this.y = option.y||  Math.random()*option.context.canvas.height;

		this.defaultX = this.x;
		this.defaultY = this.y;
		this.img = option.img;

		this.angle = 0;

		this.maxHeight = (Math.random()*20 + 70);

		this.iNow = 0;

		this.speed = Math.random()*2;
		this.context = option.context;

		this.size = Math.random()*10;

		this.rotate = Math.random()*360 / 180 * Math.PI;
		this.render();

	}

	render(){

		var {context,defaultX,defaultY,img,x,y,size ,maxHeight,rotate} = this;
		context.save();
		context.rotate = rotate;
		context.drawImage(img,x,y,size,size);
		context.restore();

	}
	update(){
		this.render();
	}
}
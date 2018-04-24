export default class Point{
	constructor(option){
		this.x = option.x ||  Math.random()*option.context.canvas.width;
		this.y = option.y||  Math.random()*option.context.canvas.height;
		this.img = option.img;
		this.context = option.context;
		this.render();

	}

	render(){
		var {context,img,x,y } = this;
		context.drawImage(img,x,y,20,20);
	}
	update(){
		this.render();
	}
}
var imgs = {
	play: './assets/images/play.png',
	logo: './assets/images/logo.png',
	title: './assets/images/title.png',
	point: './assets/images/point.png',
	arrow: './assets/images/arrow.png',
	imgBg:'./assets/images/img-bg.png',
	hand1:'./assets/images/hand1.jpg',
	myhand:'./assets/images/myhand.jpg',
	subtitle:'./assets/images/subtitle.png'

}


var handList = [
	{
		url:imgs.hand1,
		name:"农民",
		className: "active transition"
	},
	{
		url:imgs.hand1,
		name:"工人",
		className:'right'
	},{
		url:imgs.hand1,
		name:"厨师",
		className:'right'
	},{
		url:imgs.hand1,
		name:"教师",
		className:'left'
	}
];


var arr = [];
for (var attr in imgs) {
	arr.push(imgs[attr]);
}

	
var musics = {
	music: {
		src: './assets/music/bg.mp3',
		autoplay: false,
		name: 'bg',
		loop: true
	},
	photo:{
		src:'./assets/music/photo.mp3',
		autoplay:false,
		name:"photo",
		loop:false
	}
}
var imgs = {
	play: './assets/images/play.png',
	logo: './assets/images/logo.png',
	title: './assets/images/title.png',
	point: './assets/images/point.png',
	arrow: './assets/images/arrow.png',
	imgBg:'./assets/images/img-bg.png',
	hand1:'./assets/images/hand1.jpg',
	hand2:'./assets/images/hand2.jpg',
	hand3:'./assets/images/hand3.jpg',
	hand4:'./assets/images/hand4.jpg',
	myhand:'./assets/images/myhand.jpg',
	subtitle:'./assets/images/subtitle.png',
	upload:'./assets/images/upload.jpg',
	shareBg:'./assets/images/share-bg.jpg',
	shareImgBg:'./assets/images/share-img-bg.png',
	text:'./assets/images/text.png',
	brage:'./assets/images/brage.png',
	qrcode:'./assets/images/qrcode.png',
	createBg:'./assets/images/createimg-bg.jpg',
	btnBg:'./assets/images/btn-bg.png'

}

var handType = [
	'摸鼠标',
	'洗碗',
	'换尿片',
	'铲屎官',
	'扣金龙抓',
	'搬砖'
]

var handList = [
	{
		url:imgs.hand1,
		name:"农民",
		className: "active transition"
	},
	{
		url:imgs.hand2,
		name:"工人",
		className:'right'
	},{
		url:imgs.hand3,
		name:"厨师",
		className:'right'
	},{
		url:imgs.hand4,
		name:"教师",
		className:'right'
	},{
		url:imgs.upload,
		name:"",
		className:'left',
		type:'upload'
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
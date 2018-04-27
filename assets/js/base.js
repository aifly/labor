var imgs = {
	play: './assets/images/play.png',
	logo: './assets/images/logo.png',
	title: './assets/images/title1.png',
	point: './assets/images/point.png',
	arrow: './assets/images/arrow.png',
	imgBg:'./assets/images/img-bg.png',
	bg:'./assets/images/bg.jpg',
	myhand:'./assets/images/myhand.jpg',
	subtitle:'./assets/images/subtitle1.png',
	upload:'./assets/images/upload.jpg',
	shareBg:'./assets/images/share-bg.jpg',
	shareImgBg:'./assets/images/share-img-bg.png',
	text:'./assets/images/text.png',
	brage:'./assets/images/brage.png',
	hand:'./assets/images/hand.png',
	guangrong:'./assets/images/guangrong1.png',
	qrcode:'./assets/images/qrcode.png',
	//createBg:'./assets/images/createimg-bg.jpg',
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

var handSource = [
	{
		url:'./assets/images/hand2.jpg',
		name:"教师",
		className: "active transition"
	},
	{
		url:'./assets/images/hand5.jpg',
		name:"陶艺大师",
		className:'right'
	},{
		url:'./assets/images/qixiu.jpg',
		name:"铁路检修工人",
		className:'right1'
	},{
		url:'./assets/images/qixiu1.jpg',
		name:"汽修工人",
		className:'right1'
	},{
		url:'./assets/images/nongming.jpg',
		name:"农民",
		className:'right1'
	},{
		url:'./assets/images/hand3.jpg',
		name:"装修工人",
		className:'right1'
	},{
		url:'./assets/images/jianzhu.jpg',
		name:"建筑工人",
		className:'right1'
	},{
		url:'./assets/images/huanwei.jpg',
		name:"环卫工人",
		className:'right1'
	},{
		url:'./assets/images/hand4.jpg',
		name:"煤矿工人",
		className:'right1'
	}
];
var handList = [
	{
		url:imgs.upload,
		name:"",
		className:'left',
		type:'upload'
	}
];
var arr = [];
for(var i = 0;i<4;i++){
	var index = (Math.random()*handSource.length)|0;
	var obj = handSource.splice(index,1)[0];

	if(i===0){
		obj.className = 'active transition';
	}
	else if(i ===1){
		obj.className = 'right';
	}
	else{
		obj.className  =' right1'
	}

	if(i===0){
		handList.unshift(obj);
	}else{
		handList.splice(1,0,obj);
	}

	arr.push(obj.url);

}


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
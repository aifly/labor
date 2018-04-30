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
	upload:'./assets/images/upload2.jpg',
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
	'扫地',
	'搬砖'
]

var handSource = [
	/*{
		url:'./assets/images/hand2.jpg',
		name:"教师",
	},
	{
		url:'./assets/images/hand5.jpg',
		name:"陶艺大师",
	},{
		url:'./assets/images/qixiu.jpg',
		name:"铁路检修工人",
	},{
		url:'./assets/images/qixiu1.jpg',
		name:"汽修工人"
	},{
		url:'./assets/images/nongming.jpg',
		name:"农民"
	},{
		url:'./assets/images/hand3.jpg',
		name:"装修工人"
	},{
		url:'./assets/images/jianzhu.jpg',
		name:"建筑工人"
	},{
		url:'./assets/images/huanwei.jpg',
		name:"环卫工人"
	},{
		url:'./assets/images/hand4.jpg',
		name:"煤矿工人"
	}*/

	{
		url:'./assets/images/1.jpg',
		name:"电工",
		text:'手的主人叫龚云斌，现为湖北咸宁崇阳县金塘供电所所长、党支部书记，自1990年参加工作以来，一直在各农村供电所工作，因为抗击雪灾、洪水，他曾３次晕倒在抢险现场。',
		author:'新华社记者 梁建强摄'
	},{
		url:'./assets/images/2.jpg',
		name:"采茶工人",
		text:'今年50岁的马干干是云南省丽江市华坪县永兴乡的彝族村民，从事采茶工作已有十余年，她通过采茶维持一家人的生计。',
		author:'新华社记者 杨静摄'
	},{
		url:'./assets/images/3.jpg',
		name:"科学家",
		text:'2018年4月28日，湖北省农业科学院粮食作物研究所水稻杂种优势利用研究室李三和博士正在进行水稻花药培养试验。',
		author:'新华社记者 侯文坤摄'
	},{
		url:'./assets/images/4.jpg',
		name:"裁缝",
		text:'2018年4月26日，非遗项目老美华津派旗袍的师傅正运用华贵的手盘金绣，结合丝线绣，为新娘打造最美嫁衣。',
		author:'新华社记者 付光宇摄'
	},{
		url:'./assets/images/5.jpg',
		name:"月嫂",
		text:'2018年4月27日，安徽合肥，一位抱着婴儿的月嫂的手。',
		author:'新华社记者 陈尚营摄'
	},{
		url:'./assets/images/6.jpg',
		name:"建筑工人",
		text:'2018年4月27日，中铁十七局集团青运村项目部工人蔡武成在固定建筑部件。',
		author:'新华社记者 曹阳摄'
	},{
		url:'./assets/images/7.jpg',
		name:"雕花剪纸人",
		text:' 湖北仙桃68岁雕花剪纸传承人马又甫的手，他说：“握刀要正，下刀要顺，开片要严，行刀要匀。”雕花剪纸是民间广泛流传的一种艺术形式。',
		author:'新华社记者 罗鑫摄'
	},{
		url:'./assets/images/8.jpg',
		name:"特警",
		text:'2018年4月26日，山东青岛，正在装填弹夹的特警队员的手。当日，青岛特警举行春季警务集训。',
		author:'新华社记者 李紫恒摄'
	},{
		url:'./assets/images/9.jpg',
		name:"银器制作工人",
		text:'2017年9月13日，云南省职业技能大赛大理赛区手工银器制作选拔赛中，选手李耀华全神贯注雕刻牡丹花。 ',
		author:'新华社记者 丁怡全摄'
	},{
		url:'./assets/images/10.jpg',
		name:"快递员",
		text:' 这是一位快递员的手，这双手既要搬送沉甸甸的大箱子，也要护送很多“破损请拒收”的小盒子。 ',
		author:'新华社记者 许苏培摄'
	},{
		url:'./assets/images/11.jpg',
		name:"电工",
		text:' 这是国家电网山东省东营市供电公司带电作业中心负责人高永强的手，高永强与科研单位合作研发了带电作业可调式降温服，改善了工人的作业条件。 ',
		author:'新华社记者 吴书光摄'
	},{
		url:'./assets/images/12.jpg',
		name:"动车司机",
		text:'薛军，济南铁路局济南机务段动车司机，今年五十岁的他经历了蒸汽机车、内燃机车、电力机车、动车组四个时代，拥有四种类型、六本不同驾驶速度等级的火车驾驶执照，二十九年来安全行车零违章、零事故。',
		author:'新华社记者 王阳摄'
	},{
		url:'./assets/images/13.jpg',
		name:'医生',
		text:'张玲丽是山东省荣成市第三人民医院的一名医生，正手持听诊器准备给患者诊断。',
		author:'新华社记者 王阳摄'
	},{
		url:'./assets/images/14.jpg',
		name:'助产士',
		text:'这是北京妇产医院助产士王晓明的双手，从事助产士工作18年来，王晓明迎接了数千个新生命的到来，她说：“看着新生命的诞生，我觉得特别骄傲。” ',
		author:'新华社记者 侠克 林苗苗摄'
	},{
		url:'./assets/images/15.jpg',
		name:'医生',
		text:'2018年4月28日，李业甫医生正在为患者推拿，从医58年来，他接治患者逾20万人次。',
		author:'新华社记者 鲍晓菁摄'
	},{
		url:'./assets/images/16.jpg',
		name:'医生',
		text:'今年75岁的魏福良医生，从事中医针灸临床工作约50年。',
		author:'新华社记者 姜刚摄'
	},{
		url:'./assets/images/17.jpg',
		name:'飞行员',
		 text:'这是一位机长的手，身为机长，他总是娴熟而冷静，万里高空亦能春风十里，每一次抵达都是新的出发。',
		author:'新华社记者 许茹摄'
	},{
		url:'./assets/images/18-1.jpg',
		name:'茶农',
		text:'峨眉山有机茶茶园的茶农被茶汁染色的双手。',
		author:'新华社记者 江宏景摄'
	},{
		url:'./assets/images/19-1.jpg',
		name:'月饼制作工人',
		text:'安徽省祁门县平里镇贵溪村，一位工人在为古法手工月饼包馅。',
		author:'新华社记者 孟鼎博摄'
	},{
		url:'./assets/images/20-1.jpg',
		name:'点钞员',
		 text:'41岁的黄春梅是中国农业银行云南个旧市支行的职员，已经工作了25年，每天清点百余万的现金，曾四次荣获云南省农行业务技能比赛点钞单项第一。',
		author:'新华社记者 杨静摄'
	},{
		url:'./assets/images/21-1.jpg',
		name:'核雕工人',
		 text:'安徽省宣城市非遗传承人马勇兵在制作核雕。',
		author:'新华社记者 孟鼎博摄'
	},{
		url:'./assets/images/22-1.jpg',
		name:'女建筑工人',
		 text:'这是中铁十七局集团青运村项目部女工人杨小兰的双手，杨小兰今年42岁，四川省广元市朝天区两河口乡人，从事建筑工作13年。',
		author:'新华社记者 曹阳摄'
	},{
		url:'./assets/images/23-1.jpg',
		name:'砚台制作工人',
		 text:'安徽省歙县手艺人温鑫在制作歙砚。',
		author:'新华社记者 孟鼎博摄'
	},{
		url:'./assets/images/24-1.jpg',
		name:'科学家',
		 text:'中国科学技术大学研究人员在测试机器人“佳佳”（左）的手部。',
		author:'新华社记者 孟鼎博摄'
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
for(var i = 0;i<10;i++){
	var index = (Math.random()*handSource.length)|0;
	var obj = handSource.splice(index,1)[0];
	//obj.url = './assets/images/hand2.jpg';
	obj.key = i+'key';
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
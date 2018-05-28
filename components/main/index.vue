<template>
	<transition name='main'>
		<div class="lt-full zmiti-main-main-ui " :class="{'show':show}" ref='page' v-swipeleft='swipeLeft' v-swipeup='swipeLeft' v-swiperight='swipeRight' v-swipedown='swipeRight'>
			<div v-if='currentIndex>-1' class="zmiti-hand-bg" :style="bgStyle">
			</div>
			
			<div class="zmiti-bg-mask lt-full"></div>
			
			<transition-group name='hand'>
				<div v-if='currentIndex>-1' :key='hand.url' v-for='hand in handList' class="lt-full zmiti-hand-page" :class="hand.className">
				
					<div class='zmiti-hand-img' :key='hand.key+1' :style="{background: 'url('+imgs.imgBg+') no-repeat center center',backgroundSize:'cover'}">
						<img @touchstart='imgStart' :src="imgs.imgBg" class="zmiti-img-bg">
						
						<div class="zmiti-hand" :style="{background:'url('+(hand.url)+') no-repeat center center',backgroundSize:backgroundSize}">
							<section class="zmiti-hand-text" v-if='!hand.type'>
								{{hand.text}}
								<section class="">{{hand.author}}</section>
							</section>

							<img @touchstart='imgStart' :src="hand.url" :style="{opacity:(hand.type === 'upload' && uploadImg && uploadState !== 1 )?0:1}" v-if='hand.type !== "insert"' >
							<input  accept="image/*" @change='upload' v-if='hand.type === "upload" && !uploadImg' type="file" class="lt-full" ref='file' name="">
							<div v-if='hand.type === "upload" &&  uploadState === 1' class="lt-full zmiti-upload-status">
								<div class="load-3">
									<div class="k-line2 k-line12-1"></div>
									<div class="k-line2 k-line12-2"></div>
									<div class="k-line2 k-line12-3"></div>
									<div class="k-line2 k-line12-4"></div>
									<div class="k-line2 k-line12-5"></div>
									<div class="k-line2 k-line12-6"></div>
								</div>
								正在上传，请稍候...
							</div>
						</div>

						<div class="zmiti-subtitle" v-if='hand.type !== "upload"'>
							<img @touchstart='imgStart' :src="imgs.subtitle">
						</div>

						<div class="zmiti-img-desc" v-if='hand.type === "upload"'>
							<textarea ref='input' @input='input' v-model='desc' :style="textareaStyle" placeholder="请输入描述(6个字以内)"></textarea>
							的手
						</div>

						<div v-if='hand.type !== "upload"'  class="zmiti-name">
							<img v-if='hand.img' :src="hand.img">
							<span>{{hand.name}}</span>的手</div>

					</div>
				</div>
			</transition-group>

			<div class="zmiti-year" v-if='currentIndex>-1 && handList[currentIndex].type !== "upload"'>
				劳动节快乐
			</div>
			<div v-tap='[entryShare]' class="zmiti-ok" v-if='currentIndex >-1 && handList[currentIndex].type === "upload"'>
				<img :src="imgs.btnBg">
				<span>确定</span>
			</div>


			<div class="zmiti-info" v-if='showInfo'>
				<img :src="imgs.hand">
			</div>

			<Toast :msg='toastMsg'></Toast>
		</div>
	</transition>
</template>

<script>
	import './index.css';
	import {imgs} from '../lib/assets.js';
	import $ from 'jquery';
	
	import Toast from '../toast/toast';
	export default {
		props:['obserable','pv','src','nickname','headimgurl'],
		name:'zmitiindex',
		data(){
			return{
				imgs,
				pointW:0,
				pointH:0,
				showInfo:true,
				showTeam:false,
				bgStyle:{
					background:'url('+imgs.bg+') no-repeat center center',
					backgroundSize:'cover'
				},
				showQrcode:false,
				show:true,
				viewW:window.innerWidth,
				viewH:window.innerHeight,
				handList,
				backgroundSize:'cover',
				currentIndex:0,
				iNow:0,
				desc:'',
				toastMsg:'',
				isLeft:true,
				textareaStyle:{
					background:'transparent',
					height:'100%',
					width:'50%'
				},
				isEntry:false,
				uploadState:0,//还未上传 1 正在上传 2上传完成
				points:[],
				handType:window.handType,
				uploadImg:''//http://h5.zhongguowangshi.com/interface/public/zmiti_ele/other/20180425/c4aab2a0932b8d0d93a34a106654476e.png
				
			}
		},
		components:{
			Toast
		},
		watch:{
			
		},
		
		methods:{

			input(e){
				this.desc = this.desc.substring(0,6);
			},
			entryShare(){//进入share页面

				if(this.isEntry){
					return;
				}
				this.isEntry = true;
				
				this.$refs['input'][0].blur();

				
				setTimeout(()=>{
					if(!this.uploadImg){
						this.toastMsg = '请先上传图片';

						setTimeout(()=>{
							this.toastMsg = '';
						},2000);

						return;
					}
					if(!this.desc){
						this.desc = this.handType[(Math.random()*this.handType.length)|0];
					}

					var index =( Math.random()*4) | 0;
					var {obserable} = this;
					this.show = false;
					
					setTimeout(()=>{


						obserable.trigger({
							type:'fillShare',
							data:{
								handImg:this.handList[index].url,
								uploadImg : this.uploadImg,
								job:this.handList[index].name,
								myhandname:this.desc
							}
						})
					},500);
				},1)

			},

			entry(){
				this.currentIndex = 0;
				this.bgStyle = {
					background:'url('+this.handList[this.currentIndex].url+') no-repeat center center',
					backgroundSize:'cover'
				}
			},
			upload(){

				this.uploadState = 1;
				
				var formData = new FormData();
	  		    var s = this;
			      formData.append('setupfile', this.$refs['file'][0].files[0]);
			      formData.append('uploadtype', 0);
			      formData.append('issavethumb', 1);
			      formData.append('imagename', 'labor');
			      
			     
			    $.ajax({
			        type: "POST",
			        contentType: false,
			        processData: false,
			        url: window.protocol+'//h5.zhongguowangshi.com/interface/public/index.php?s=v2/share/upload_file/',
			       // url: window.protocol+"//api.zmiti.com/v2/share/upload_file",
			        data: formData,
			        error(e){
			        	
			        	//alert('error 服务器错误');
			        	s.toastMsg = '服务器错误';
			        	setTimeout(()=>{
			        		s.toastMsg = '';
			        	},2000)
			          	s.uploadState = 0;
			          	
			        },
			        success(data){
			        	 
				        //console.log(data);
				        //alert('服务器返回正确');
				        s.uploadState = 2;
				        s.backgroundSize = 'contain';

				        //alert('返回正确 getret =>' + data.getret + ' getmsg =>' + data.getmsg);
				        if (data.getret === 0) {
	 						//s.deleteImg(data.getfileurl[0].datainfourl)
	 						s.uploadImg = data.getfileurl[0].datainfourl;
	 						s.handList[s.handList.length-1].url = data.getfileurl[0].datainfourl;
	 						setTimeout(()=>{
	 							s.backgroundSize = 'cover'
	 						},10)

	 						/*s.headimgurl = window.headimgurl||s.imgs.logo;

	 						var url = window.location.href.split('#')[0];

							url = zmitiUtil.changeURLPar(url,'src',s.uploadImg);
							url = zmitiUtil.changeURLPar(url,'myhandname',encodeURI(s.desc));
							url = zmitiUtil.changeURLPar(url,'headimgurl',s.headimgurl);
							window.shareImg = s.uploadImg;
							
							zmitiUtil.wxConfig((window.nickname||"新华社网友") + '展示了他' + s.desc+'的手','劳动最光荣，邀你来展示劳动者的手',url);*/
				        }else{
				        	setTimeout(()=>{
				        		s.detectionError = '';
				        	},2000)
				        }
			        }
			    });
			},
			deleteImg(url){//删除原图

				setTimeout(()=>{
					$.ajax({
						url: window.protocol+'//h5.zhongguowangshi.com/interface/public/index.php?s=v2/share/delete_file/',
						type:'post',
						data:{
							filepath:url
						},
						success(data){
							console.log(data);
						}
					})

				},2000)
			},
			
			 swipeLeft(){
				var s = this;
				if(s.currentIndex<=-1){
					return;
				}
				this.iNow = (s.currentIndex + 1) % s.handList.length;
				this.initLeft();
			},
			swipeRight(){

				var s = this;
				if(s.currentIndex<=-1){
					return;
				}
				this.iNow = s.currentIndex-1;
				if(this.iNow<0){
					this.iNow = this.handList.length - 1;
				}
				this.initRight();
			},


			initLeft: function() {
				var s = this;

				
				
				s.currentIndex = (s.currentIndex + 1) % s.handList.length;
				/*this.bgStyle = {
					background:'url('+this.handList[this.currentIndex].url+') no-repeat center center / cover',
					backgroundSize:'cover'
				}
				console.log(this.bgStyle)*/
				//s.loadMusic(s.handList[s.currentIndex].audio);
				//this.iNow = s.currentIndex;
				var classList = [
					'left1 ',
					'left ',
					'active ',
					'right ',
					'right1 '
				]
				var handList = s.handList,
					currentIndex = s.currentIndex;

				handList.forEach(function(list, i) {
					handList[i].className = classList[4];
					//(handList[currentIndex - 2] || handList[handList.length - 2])['className'] = classList[0];
				})
				classList = [
					'left1 ',
					'left transition1',
					'active transition',
					'right transition1',
					'right1 '
				]

				if(!this.isLeft ){
			 		classList = [
						'left1 ',
						'left transition1',
						'active transition',
						'right ',
						'right1 '
					]	
			 	}
				
				handList.forEach(function(list, i) {
					handList[i].className = classList[4];

					(handList[currentIndex + 1] || handList[0])['className'] = classList[3];
					(handList[currentIndex + 2] || handList[1])['className'] = classList[4];
					(handList[currentIndex - 1] || handList[handList.length - 1])['className'] = classList[1];
					//(handList[currentIndex - 2] || handList[handList.length - 2])['className'] = classList[0];
				})

				handList[currentIndex].className = classList[2];
				this.isLeft = true;
			},
			initRight: function() {

				var s = this;

				s.currentIndex = s.currentIndex - 1;

				if (s.currentIndex < 0) {
					s.currentIndex = s.handList.length - 1;
				}
				
				var handList = s.handList,
					currentIndex = s.currentIndex;

				//console.log(s.currentIndex)

				s.currentIndex = s.currentIndex % handList.length;
				/*this.bgStyle = {
					background:'url('+this.handList[this.currentIndex].url+') no-repeat center center / cover',
					backgroundSize:'cover'
				}*/
				var classList = [
					'left1 ',
					'left transition1',
					'active transition',
					'right transition1',
					'right1 '
				]
				if(this.isLeft ){
			 		classList = [
						'left1 ',
						'left ',
						'active transition',
						'right transition1',
						'right1 '
					]	
			 	}
				handList.forEach(function(list, i) {

					/*if (currentIndex > i) {
						handList[i].className = classList[4]
					} else if (currentIndex < i) {
						handList[i].className = classList[0]
					}*/

					handList[i].className = classList[0];

					(handList[currentIndex + 1] || handList[0])['className'] = classList[3];
					//(handList[currentIndex + 2] || handList[1])['className'] = classList[4];
					(handList[currentIndex - 1] || handList[handList.length - 1])['className'] = classList[1];
					//(handList[currentIndex - 2] || handList[handList.length - 2])['className'] = classList[0];
				})



				handList[currentIndex].className = classList[2];
				this.isLeft = false;
			},
			
			imgStart(e){
				e.preventDefault();
			}
		},
	
		mounted(){
			window.$ = $;
			var u = navigator.userAgent;
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
			window.onresize = ()=>{
				if(!isAndroid){
					return;
				}
				if(window.innerHeight<this.viewH){
					this.textareaStyle = {
						background:'#fff',
						height:'300px',
						width:'100%'
 
					}
				}
				else{
					this.textareaStyle = {
						background:'transparent',
						height:'100%',
						width:'50%'
					}
				}

			}

			
			var {obserable} = this;
			obserable.on('reupload',()=>{
				this.handList[this.handList.length -1].url = this.imgs.upload;
				this.uploadImg = '';
				this.show = true;

			});
			obserable.on('clearFile',()=>{

				 this.$refs['file'].value = ''

			});

			obserable.on('hideInfo',()=>{
				setTimeout(()=>{
					this.showInfo = false;
				},2000)
			})

			

		}
	}
</script>
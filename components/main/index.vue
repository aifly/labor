<template>
	<transition name='main'>
		<div class="lt-full zmiti-main-main-ui " :class="{'show':show}" ref='page' v-swipeleft='swipeLeft' v-swiperight='swipeRight'>
			<div v-if='currentIndex>-1' class="zmiti-hand-bg" :style="bgStyle">
			</div>
			
			<transition name='main'>
				<div v-if='currentIndex === -1' class="zmiti-bg">
					<div    class="lt-full zmiti-bg-mask" :style="{background:'rgba(65,6,7,.5)'}"> </div>
					<div class="zmiti-hand-bg" :style="{background: 'url('+imgs.myhand+') no-repeat center center',backgroundSize:'cover'}">
						
					</div>
					<div class='zmiti-hand-img' v-tap='[entry]' :style="{background: 'url('+imgs.imgBg+') no-repeat center center',backgroundSize:'cover'}">
						<img :src="imgs.imgBg" class="zmiti-img-bg" >
						<canvas ref='canvas' :width='pointW' :height='pointH'></canvas>
						<div class="zmiti-hand">
							<img :src="imgs.myhand" @load='load'>
						</div>

						<div class='zmiti-title'>
							<img :src="imgs.title">
						</div>
						<div class="zmiti-start">开始</div>
					</div>
				</div>
			</transition>
			
			<div v-if='currentIndex>-1' v-for='hand in handList' class="lt-full zmiti-hand-page" :class="hand.className">
				
				<div class='zmiti-hand-img' :style="{background: 'url('+imgs.imgBg+') no-repeat center center',backgroundSize:'cover'}">
					<img :src="imgs.imgBg" class="zmiti-img-bg">
					
					<div class="zmiti-hand" :style="{background:'url('+uploadImg+') no-repeat center center',backgroundSize:backgroundSize}">
						<img :src="hand.url" :style="{opacity:hand.type === 'upload' && uploadImg && uploadState !== 1?0:1}">
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
						<img :src="imgs.subtitle">
					</div>

					<div class="zmiti-img-desc" v-if='hand.type === "upload"'>
						<textarea placeholder="请输入照片描述"></textarea>
					</div>

					<div class="zmiti-name">{{hand.name}}</div>

				</div>
			</div>

			<div class="zmiti-year" v-if='currentIndex>-1 && handList[currentIndex].type !== "upload"'>
				2018
			</div>
			<div class="zmiti-ok" v-if='currentIndex >-1 && handList[currentIndex].type === "upload"'>
				确定
			</div>
		</div>
	</transition>
</template>

<script>
	import './index.css';
	import {imgs} from '../lib/assets.js';
	import $ from 'jquery';
	import Point from './point';
	export default {
		props:['obserable','pv','randomPv','nickname','headimgurl'],
		name:'zmitiindex',
		data(){
			return{
				imgs,
				pointW:0,
				pointH:0,
				showTeam:false,
				bgStyle:{
					background:'url('+imgs.hand1+') no-repeat center center',
					backgroundSize:'cover'
				},
				showQrcode:false,
				show:true,
				viewW:window.innerWidth,
				viewH:window.innerHeight,
				handList,
				backgroundSize:'contain',
				currentIndex:-1,
				iNow:-1,
				isLeft:true,
				uploadState:0,//还未上传 1 正在上传 2上传完成
				points:[],
				uploadImg:''//http://h5.zhongguowangshi.com/interface/public/zmiti_ele/other/20180425/c4aab2a0932b8d0d93a34a106654476e.png
				
			}
		},
		components:{
		},
		
		methods:{

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
			     
			    $.ajax({
			        type: "POST",
			        contentType: false,
			        processData: false,
			        url: window.protocol+'//h5.zhongguowangshi.com/interface/public/index.php?s=v2/share/upload_file/',
			       // url: window.protocol+"//api.zmiti.com/v2/share/upload_file",
			        data: formData,
			        error(e){
			        	
			        	
			        	s.detectionError = '服务器错误';
			          	setTimeout(()=>{
			          		s.detectionError = '';
			          	},2000);

			          	s.uploadState = 0;
			          	
			        },
			        success(data){
			        	 
				        console.log(data);
				        //alert('服务器返回正确');
				        if (data.getret === 0) {
				        	s.uploadState = 2;
	 						//s.deleteImg(data.getfileurl[0].datainfourl)
	 						s.uploadImg = data.getfileurl[0].datainfourl;
	 						s.backgroundSize = 'cover'
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
			load(e){
				this.pointW = e.target.width;
				this.pointH = e.target.height;
				setTimeout(()=>{this.initPoints();},100)
			},
			 swipeLeft(){
				var s = this;
				if(s.currentIndex<=-1){
					return;
				}
				this.isLeftFirst = true;
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
				this.isRightFirst=  true;
				this.initRight();
			},


			initLeft: function() {
				var s = this;

				
				
				s.currentIndex = (s.currentIndex + 1) % s.handList.length;
				this.bgStyle = {
					background:'url('+this.handList[this.currentIndex].url+') no-repeat center center / cover',
					backgroundSize:'cover'
				}
				console.log(this.bgStyle)
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
				this.bgStyle = {
					background:'url('+this.handList[this.currentIndex].url+') no-repeat center center / cover',
					backgroundSize:'cover'
				}
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
			initPoints(){

				var canvas = this.$refs['canvas'];
				var context = canvas.getContext('2d');

				var width = canvas.width,
					height = canvas.height;



				var img = new Image();
				img.onload = ()=>{
					for(var i = 0 ;i<62;i++){
						var p = new Point({
							img,
							context,
						})
						this.points.push(p);
					}
				}
				img.src = imgs.point;

				var animationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame,
					m = Math;

				var render = ()=>{

					context.clearRect(0,0,width,height);

					this.points.map((point,i)=>{
						point.angle += point.speed;
						//point.angle = (point.angle | 0)
						point.angle %= 360;
						point.x += m.sin(point.angle/180*m.PI);

						point.y -= 2;
						if(point.y<0){
							point.y = point.defaultY
						}
						point.update();
					});

					this.currentIndex === -1 && animationFrame(render);
				}
				
				render()


			}
		},
	
		mounted(){
			window.$ =$
			if(this.currentIndex>-1){
				this.bgStyle = {
					background:'url('+this.handList[this.currentIndex].url+') no-repeat center center',
					backgroundSize:'cover'
				}
			}

		}
	}
</script>
<template>
	<transition name='main'>
		<div class="lt-full zmiti-main-main-ui " :class="{'show':show}" ref='page' v-swipeleft='swipeLeft' v-swiperight='swipeRight'>
			<div v-if='currentIndex>-1' class="zmiti-hand-bg" :style="{background: 'url('+handList[currentIndex].url+') no-repeat center center',backgroundSize:'cover'}">
				</div>
			<div v-if='currentIndex === -1'>
				<div    class="lt-full zmiti-bg-mask" :style="{background:'rgba(65,6,7,.5)'}"> </div>
				<div class="zmiti-hand-bg" :style="{background: 'url('+imgs.myhand+') no-repeat center center',backgroundSize:'cover'}">
					
				</div>
				<div class='zmiti-hand-img' :style="{background: 'url('+imgs.imgBg+') no-repeat center center',backgroundSize:'cover'}">
					<img :src="imgs.imgBg" class="zmiti-img-bg">
					<div class="zmiti-hand">
						<img :src="imgs.myhand">
					</div>

					<div class='zmiti-title'>
						<img :src="imgs.title">
					</div>
					<div class="zmiti-start">开始</div>
				</div>
			</div>
			
			<div v-if='currentIndex>-1' v-for='hand in handList' class="lt-full zmiti-hand-page" :class="hand.className">
				
				<div class='zmiti-hand-img' :style="{background: 'url('+imgs.imgBg+') no-repeat center center',backgroundSize:'cover'}">
					<img :src="imgs.imgBg" class="zmiti-img-bg">
					
					<div class="zmiti-hand">
						<img :src="hand.url">
					</div>

					<div class="zmiti-subtitle">
						<img :src="imgs.subtitle">
					</div>

					<div class="zmiti-name">{{hand.name}}</div>

				</div>
			</div>

			<div class="zmiti-year">
				2018
			</div>
		</div>
	</transition>
</template>

<script>
	import './index.css';
	import {imgs} from '../lib/assets.js';
	import $ from 'jquery';

	export default {
		props:['obserable','pv','randomPv','nickname','headimgurl'],
		name:'zmitiindex',
		data(){
			return{
				imgs,
				showTeam:false,
				showQrcode:false,
				show:true,
				viewW:window.innerWidth,
				viewH:window.innerHeight,
				handList,
				currentIndex:-1,
				iNow:-1,
				isLeft:true
				
			}
		},
		components:{
		},
		
		methods:{
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
				console.log(s.currentIndex)
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
		},
	
		mounted(){

		}
	}
</script>
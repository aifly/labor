<template>
	<div v-tap='[entry]'  class="lt-full zmiti-index-main-ui "  :style="{zIndex:zIndex}" :class="{'show':show}">
		
		<transition name='main'>
			<div class="zmiti-bg">
				<div class="zmiti-hand-bg" :style="{background: 'url('+imgs.bg+') no-repeat center bottom',backgroundSize:'cover'}">
					
				</div>
				<div class='zmiti-hand-img'  :style="{background: 'url('+imgs.imgBg+') no-repeat center center',backgroundSize:'cover'}">
					<img @touchstart='imgStart' :src="imgs.imgBg" class="zmiti-img-bg" >
					<canvas ref='canvas' :width='pointW' :height='pointH'></canvas>
					<div class="zmiti-hand">
						<img @touchstart='imgStart' :src="imgs.myhand" @load='load'>
					</div>

					<div class='zmiti-title'>
						<img @touchstart='imgStart' :src="imgs.title">
					</div>
					<div class="zmiti-start" >
						<img :src="imgs.guangrong">
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import './index.css';
	import {imgs} from '../lib/assets.js';
	import zmitiUtil from '../lib/util';
	import $ from 'jquery';
	import Point from './point';
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				imgs,
				pointW:0,
				pointH:0,
				show:true,
				toastMsg:'',
				cloudIndex:0,
				viewW:window.innerWidth,
				viewH:window.innerHeight,
				showMasks:false,
				dots:[],
				points:[],
				zIndex:10,

			}
		},
		components:{
		},
		
		methods:{

			
			imgStart(e){
				e.preventDefault(); 
			},

			entry(){
				
				this.show = false;	
				setTimeout(()=>{
					this.zIndex = -1;
				},500);
				var {obserable} = this;
				obserable.trigger({
					type:'hideInfo'
				})
				clearTimeout(this.t);
			},
			load(e){
				this.pointW = e.target.width;
				this.pointH = e.target.height;
				setTimeout(()=>{this.initPoints();},100)

				
			},
			initPoints(){

				var canvas = this.$refs['canvas'];
				var context = canvas.getContext('2d');

				var width = canvas.width,
					height = canvas.height;



				var img = new Image();
				img.onload = ()=>{
					for(var i = 0 ;i<102;i++){
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
					if(width<=0){
						width = canvas.width,
						height = canvas.height;
					}
					context.clearRect(0,0,width,height);

					this.points.map((point,i)=>{
						point.angle += point.speed;
						//point.angle = (point.angle | 0)
						point.angle %= 360;
						point.x += m.sin(point.angle/180*m.PI);

						point.y -= 2;
						if(point.defaultY  -  point.y  >  point.maxHeight){
							point.y = point.defaultY
						}
						point.update();
					});
					this.zIndex >-1 && animationFrame(render);
				}
				
				render()


			},
		},
		mounted(){


			var {obserable} = this;

			obserable.on('toggleIndex',(data)=>{
				this.show = data.show;
			})


			this.t = setTimeout(()=>{
				this.entry();
			},4000)

		}
	}
</script>
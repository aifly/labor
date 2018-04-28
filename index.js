import Vue from "vue";
import './components/css/index.css';
import Main from './components/main/index';
import Music from './components/music/index';
import Share from './components/share/index';
import Index from './components/index/index';
import Obserable from './components/lib/obserable';
import {
	imgs
} from './components/lib/assets'
import zmitiUtil from './components/lib/util.js'
import $ from 'jquery';
import './components/lib/touch.js'
import vueTap from 'vue-js-tap';
Vue.use(vueTap);

//var VueTouch = im('vue-touch')
/*import VueTouch from 'vue-touch';
Vue.use(VueTouch, {name: 'v-touch'})*/


var obserable = new Obserable();


//Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
	data: {
		obserable,
		rotate: false,
		imgs,
		showMask: false,
		viewH: document.documentElement.clientHeight,
		isShare: false,
		show: false,
		username: '',
		width:0,
		loaded: false,
		nickname: '',
		headimgurl: '',
		playStyle: {

		}
	},
	el: '#app',
	/*<audio ref='audio' src='./assets/music/bg.mp3'  loop></audio>

		<audio src='./assets/music/water.mp3' ref='water'></audio>
		<audio src='./assets/music/photo.mp3' ref='photo'></audio>
		<audio src='./assets/music/bg.mp3' ref='audio'></audio>
		<audio src='./assets/music/tu.mp3' ref='tu' loop></audio>
		<Index  v-if='show && !isShare'  :obserable='obserable'></Index>
	*/
	template: `<div>
		<Music   :obserable='obserable'></Music>
		<Index  v-if='show'  :obserable='obserable'></Index>
		<Main :src='src'  v-if='show'  :obserable='obserable'></Main>
		<Share v-if='show ' :obserable='obserable'></Share>
		<div  v-if='!loaded' :style='{background:"#158ae4"}' class='zmiti-loading lt-full'>
			<div class='zmiti-loading-ui'>
				 <a href="#">
			  		<section class='zmiti-head' :style="{background:'url(./assets/images/logo.png) no-repeat center / cover'}"></section>
			        <div class="line1"></div>
			        <div class="line2"></div>
			        <div class="line3"></div>
					<div class='zmiti-progress'>{{width}}%</div>
			    </a>
			</div>
		</div>
	
	</div>`,
	methods: {
		
		loading: function(arr, fn, fnEnd) {
			var len = arr.length;
			var count = 0;
			var i = 0;

			function loadimg() {
				if (i === len) {
					return;
				}
				var img = new Image();
				img.onload = img.onerror = function() {
					count++;
					if (i < len - 1) {
						i++;
						loadimg();
						fn && fn(i / (len - 1), img.src);
					} else {
						fnEnd && fnEnd(img.src);
					}
				};
				img.src = arr[i];
			}
			loadimg();
		},
	
		updatePv() {
			$.ajax({
				url: window.protocol + '//api.zmiti.com/v2/custom/update_pvnum/',
				type: 'post',
				data: {
					customid: 54
				}
			}).done((data) => {
				if (data.getret === 0) {
					this.pv = data.totalpv;
					this.randomPv = data.randtotalpv;
					zmitiUtil.wxConfig(document.title,window.desc);
				}
			});
		}
	},
	components: {
		
		Music,
		Main,
		Share,
		Index
	},
	mounted() {


		var src = (zmitiUtil.getQueryString('src'));
		var myhandname = decodeURI(zmitiUtil.getQueryString('myhandname'));
		var headimgurl = decodeURI(zmitiUtil.getQueryString('headimgurl'));

		this.myhandname = myhandname;

		this.isShare = src && myhandname && headimgurl;

		this.src = src;

		this.updatePv();

		if(this.isShare){
			arr.push(src);
			//handList[0].className= 'right'
			handList.splice(handList.length-1,0,{
				url:src,
				type:'insert',
				img:headimgurl,
				name:myhandname,
				className: "right1"
			});

			
		}

		this.loading(arr, (s) => {
			this.width = s * 100 | 0;

		}, () => {
			this.show = true;
			this.loaded = true;

		})

		obserable.on('showShare', () => {
			this.showMask = true;
		})

		obserable.on('updatePv', (data) => {
			this.randomPv += data;
			this.pv += data;

		});

		zmitiUtil.getOauthurl()

	}
})
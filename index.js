import Vue from "vue";
import './components/css/index.css';
import Index from './components/index/index';
import Main from './components/main/index';
import Music from './components/music/index';
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
		<Music   :obserable='obserable'></Music>
		<Index  v-if='show && !isShare'  :obserable='obserable'></Index>
	*/
	template: `<div>
		<Main  v-if='show && !isShare'  :obserable='obserable'></Main>
		<input style='position:absolute' @change='upload' type="file" ref='file'/>
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
		upload(){

			this.detectionError = '正在上传，请稍后';

			this.showSmileText = false;
			this.showClipPage = true;
			
			var formData = new FormData();
  		    var s = this;
		      formData.append('setupfile', this.$refs['file'].files[0]);
		      formData.append('uploadtype', 0);
		     
		      $.ajax({
		        type: "POST",
		        contentType: false,
		        processData: false,
		        url: window.protocol+'//h5.zhongguowangshi.com/interface/public/index.php?s=v2/share/upload_file/',
		        data: formData,
		        error(e){
		        	
		        	s.detectionError = '服务器错误';
		          	setTimeout(()=>{
		          		s.detectionError = '';
		          	},2000)
		          	
		        },
		        success(data){
		        	 
			        console.log(data);
			        //alert('服务器返回正确');
			        if (data.getret === 0) {
 						s.deleteImg(data.getfileurl[0].datainfourl)
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
					customid: 51
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
		Index,
		Music,
		Main,
	},
	mounted() {


		var src = (zmitiUtil.getQueryString('src'));
		var num = (zmitiUtil.getQueryString('num'));

		this.isShare = src && !isNaN(num);

		this.src = src;

		this.updatePv();

		if(this.isShare){
			setTimeout(()=>{
				obserable.trigger({
					type:'toggleShare',
					data:{
						show:true,
						createImg:src,
						num
					}
				})
				//
			},1000)
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

		//zmitiUtil.wxConfig(document.title, window.desc);

	}
})
<template>
	<div>
		<el-form ref="messageTextForm" :model="form" label-width="80px">
			<el-form-item label="发送给">
				<el-input placeholder="开发者的微信号" name="to" v-model="form.to"></el-input>
				<i class="glyphicon glyphicon-refresh" @click="handleIconClick('to')"></i>
			</el-form-item>
			<el-form-item label="来自">
				<el-input placeholder="粉丝的OpenID" v-model="form.from"></el-input>
				<i class="glyphicon glyphicon-refresh" @click="handleIconClick('from')"></i>
			</el-form-item>
			<el-form-item label="时间">
				<el-input placeholder="消息创建时间（整型）" v-model="form.createTime"></el-input>
				<i class="glyphicon glyphicon-refresh" @click="handleIconClick('time')"></i>
			</el-form-item>
			<el-form-item label="内容">
				<el-input placeholder="文本消息内容" type="textarea" :rows="5" v-model="form.content"></el-input>
				<i class="glyphicon glyphicon-refresh" @click="handleIconClick('content')"></i>
			</el-form-item>
			<el-form-item label="MsgID">
				<el-input placeholder="消息id，64位整型" v-model="form.msgId"></el-input>
				<i class="glyphicon glyphicon-refresh" @click="handleIconClick('id')"></i>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="preview">预览</el-button>
				<el-button @click="reset">清空</el-button>
			</el-form-item>
		</el-form>
		<div class="preview">
			<pre>
				<code class='xml'>			      
				</code>
			</pre>
		</div>
	</div>
</template>

<script>
	import hljs from 'highlight.js';
	export default {
		data() {
			return {
				form: {
					to: Math.random().toString(36).substring(2),
					from: Math.random().toString(36).substring(2),
					createTime: new Date().getTime().toString(),
					content: '先帝创业未半而中道崩猝',
					msgId: new Date().getTime().toString()
				}
			}
		},
		methods: {
			handleIconClick(type) {
				const LOREM_IPSUM = [
				  '我能吞下玻璃而不伤身体',
				  '学選上件飯要提会線本公唐。施朝保由殺来社機三成事催覧成社周描万。',
				  '以績幕族施僚社政制度則欧。敦全済改員著文知待長底際問。失願選体索止西形乱成物明殺禁入財。低天駅支界韓線銅失仕点秘審職掲揺止確世文。',
				  '望構質決芸転力来息位責囲野吸稿。学長母行山計好課東経多島。新増農覧等属食間買前聞諾初覚指報経。芳即吉天能続紙作民散政広創趣申界食。朝加仏球曜束楽法組楽商罪分色治。法泳目季生整内文供毎判松私無見削都覧優江。項論十地転子闘毎食紙止相。',
				];
				let ran = Math.floor(Math.random() * LOREM_IPSUM.length);
				switch(type) {
					case 'to':
						this.form.to = Math.random().toString(36).substring(2);
						break;
					case 'from': 
						this.form.from = Math.random().toString(36).substring(2);
						break;
					case 'time': 
						this.form.createTime = new Date().getTime().toString();
						break;
					case 'content': 
						this.form.content = LOREM_IPSUM[ran];
						break;
					case 'id':
						this.form.msgId = new Date().getTime().toString();
						break;
					default:
						;
				}
			},
			preview() {
				let xml = `
			      <xml>
			        <ToUserName><![CDATA[${this.form.to}]]></ToUserName>
			        <FromUserName><![CDATA[${this.form.from}]]></FromUserName>
			        <CreateTime>${this.form.createTime}</CreateTime>
			        <MsgType><![CDATA[text]]></MsgType>
			        <Content><![CDATA[${this.form.content}]]></Content>
			        <MsgId>${this.form.msgId}</MsgId>
			      </xml>
			      `;
			    let $code = document.querySelector('.xml');
			    $code.innerHTML = xml;
				hljs.highlightBlock($code);
			},
			reset() {
				this.form = {
					to: '',
					from: '',
					createTime: '',
					content: '',
					msgId: ''
				}
				console.log('reset');
			}
		}
	}
</script>

<style>
	@import 'default.css';
	@font-face {
	  font-family: 'Glyphicons Halflings';
	  src: url('../fonts/glyphicons-halflings-regular.eot');
	  src: url('../fonts/glyphicons-halflings-regular.eot?#iefix') format('embedded-opentype'), url('../fonts/glyphicons-halflings-regular.woff') format('woff'), url('../fonts/glyphicons-halflings-regular.ttf') format('truetype'), url('../fonts/glyphicons-halflings-regular.svg#glyphicons_halflingsregular') format('svg');
	}
	.el-form{
		width: 300px;
		display:inline-block;
	}
	.el-form textarea{
		resize: none;
	}
	.glyphicon{
		font-size: 16px;
		font-family: 'Glyphicons Halflings';
		font-style: normal;
		position: absolute;
		bottom: 0;
		right: 10px;
		color: #bfcbd9;
	}
	.glyphicon-refresh:hover{
		cursor: pointer;
	}
	.glyphicon-refresh:before{
		content: "\e031";
	}
	.preview{
		display: inline-block;
	}
</style>
define([
	'jquery',
	'underscore',
	'easeljs',
	'UbiLabsManager',
	'Task',
	'SoundManager',
	'TaskContainer',
	'GeneralUtils',
	'tween',
	'canvas.js'
	], function($, _, createjs, UbiLabsManager, Task, SoundManager) {

	lib = lib||{};
	images = images||{};
	createjs = createjs||{};

	_.extend(canvasTask.prototype, Task);
	return new canvasTask();

function canvasTask () {

	this.useCanvas = true;
	this.useTicker = true;
	this.library = lib.canvas;
	this.cWidth = 570;
	this.cHeight = 100;
	this.changeToHeight = this.cHeight+5; // 0 - no change

	this.metadataName = "Nettihaku";
	this.metadataDescription = "";
	this.initialText = '';
	this.type = 'fill-in'; // "true-false", "choice", "fill-in", "long-fill-in", "matching", "performance", "sequencing", "likert", "numeric", "other"


	this.score = 0;
	this.maxScore = 0;
	this.pointsPerCorrect = 1;
	this.pointsPerWrong = 0;
	this.progressMeasure = 0;
	this.passedLevel = 0.5;
	this.answers = [];
	this.answersNum = 0; // num of retrieved
	this.sharedAnswers = [];
	this.sharedAnswersNum = 0; // num of retrieved
	this.settings = {};
	this.suspendData = {};
	this.sharedSuspendData = {};
	this.undone = true;
	this.useSettings = false;
	this.numberOfPages = 1; // asetettava
	this.currentPageIndex = 0;
	this.numberOfAnswers = 0; // asetettava
	this.lineHeight = 20;

	this.font = '14px "Arial", "Helvetica", sans-serif';

	var tNum = -1;
	var tasks = this.tasks;
	var sManager;
	var sManifest = [];
	var sPlayer;
	var delayId;
	var er;
	var view = this;
	var locked = true;


	/*var maxTries = 2;
	var tasksNum = 10;
	var allowTypingDirectly = true;
	var fieldRestrict = "0-9 +-"; // jos kentiin voi kirjoittaa
	var reDragable = false; // tarvitaan esim. tavujen järjestämisessä
	var virtualKeyboard = true; // pelkkä painikkeen napsauttaminen luo syötteen oletuskentään
*/

	var sounds;
	var tasks = [];
	var maxTries = 3;
	var questions = ["Haku"
										];

	var tries = [];



	/*	var correctColor = 0xBEE1B7;
	var wrongColor = 0xFFA6A6;
	var normColor = 0xE6E6E6;

*/

	this.initEdit = function ()  {};

	this.initView = function () {

		var o, i, j, mc;

		var er = view.exportRoot;
		log('exportRoot', view.exportRoot);
		//var sPlayer = er.sPlayer;
		//var soundFolder = "dm_laakkeet/";
		var btnOwn = er.btnOwn;
		btnOwn.loop = false;
		var btnShow = er.btnShow;
		btnShow.loop =false;
		var btnSend = er.btnSend;
		btnSend.loop =false;
		/*var btnCheck = er.btnCheck;
		btnCheck.loop = false;
		var btnAgain = er.btnAgain;
		btnAgain.loop = false;*/
		/*var kuva = er.kuva;
		var targetMc = er.targetMc;
		var objMc = er.objMc;
*/
		//var RadioButtonGroup = er.RadioButtonGroup;
		//maxScore = maxTries * questions.length;
		/*var fields = er.fields;
		var cards = er.cards;*/
		//var tasksNum = tasks.length;
		//var maxScore = maxTries * tasks.length;
		var anim = er.anim;
		anim.loop = false;
		var answer = er.answer;
		//var anim2 = er.anim2;

		var fd = document.getElementById('inp');


		  btnSend.addEventListener('click', send);
			btnShow.addEventListener('click', show);
			btnOwn.addEventListener('click', own);
			//btnAgain.addEventListener('click', reStart);

			anim.visible = false;
			for ( var i = 0; i < questions.length; i++ ) {
				this["fd" + i].text = "";
				this["fd" + i].tabIndex = i;
			}
			btnSend.visible = true;
			//btnShow.visible = false;
			btnOwn.visible = false;
			answer.visible = false;


			for ( var i = 0; i < answers.length; i++ ) {
				try {
					this["fd" + i].text = answers[i].learnerResponse;

				} catch (e) {

				}
			}

			// maxScore tulee olla laskettuna tähän mennessä

			// Alustalle menee tämän initin jälkeen ilmoitus ready ja alusta kutsuu gotoPage-functiota


		}
		 function send ()
		{
			for ( var i = 0; i < questions.length; i++ ) {
				uManager.storeAnswer (i, this["fd" + i].text, "neutral", "fill-in", questions[i] );

			}
			uManager.finished("passed");
			anim.visible = true;
			anim.alpha = 0;
			anim.scaleY = 0.5;
			createjs.Tween.get(anim).to ( { alpha:1, scaleY:1, onComplete: function() { createjs.Tween.get(anim).to ( { alpha:0, delay:1 },500 ) } },500 );
			btnSend.visible = false;
			btnShow.visible = true;
			btnOwn.visible = false;


		}
		 function show ()
		{
			for ( var i = 0; i < questions.length; i++ ) {
				this["fd" + i].visible = false;
			}
			answer.visible = true;
			btnSend.visible = false;
			btnShow.visible = false;
			btnOwn.visible = true;

		}
		 function own ()
		{
			for ( var i = 0; i < questions.length; i++ ) {
				this["fd" + i].visible = true;
			}
			answer.visible = false;
			btnSend.visible = false;
			btnShow.visible = true;
			btnOwn.visible = false;

		}
			this.initialize();
	}


		});

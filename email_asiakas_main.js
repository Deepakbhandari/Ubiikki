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
	this.cHeight = 455;
	this.changeToHeight = this.cHeight+5; // 0 - no change

	this.metadataName = "Sähköpostin lähetys";
	this.metadataDescription = "";
	this.initialText = '';
	this.type = 'fill-in'; // "true-false", "choice", "fill-in", "long-fill-in", "matching", "performance", "sequencing", "likert", "numeric", "other"
	this.tasks = [

	];

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

	this.lineHeight = 20;

	this.font = '14px "Arial", "Helvetica", sans-serif';

	var tNum = -1;
	var task;
	var tasks = this.tasks;
	var sManager;
	var sManifest = [];
	var sPlayer;
	var delayId;
	var er;
	var view = this;
	var locked = true;

	var questions = ["Lähettäjä",
										"Vastaanottaja",
										"Aihe",
										"Alkutervehdys",
										"Teksti",
										"Lopputervehdys",
										"Nimi"
		];
	var options = [
			null,
			null,
			["Terve", "Valitus", "Työn tarkistamisesta sopiminen", "Yhteys"],
			["Rakas", "Hei", "Moro", "Hyvä asiakas"],
			null,
			["Moikka", "T:", "Ystävällisin terveisin", "Nähdään"]
		];
		var correct = [
			"",
			"",
			"Työn tarkistamisesta sopiminen",
			"Hyvä asiakas",
			"",
			"Ystävällisin terveisin"
		];
		var comments = [
			[],
			[],
			["Tämä ei kerro ollenkaan viestin sisältöä.", " Tämä on liian tyly asiasisältö.", "Oikein, tämä kertoo hyvin ja asiallisesti viestin sisällön.", "Tämä on harhaanjohtava asia."],
			["Tätä puhuttelua voivat käyttää rakastuneet.", " Tämä on liian tuttavallinen puhuttelu tässä tapauksessa, koska asiakas on reklamoinut virheestä.", "Tämä on liian puhekielinen, osa kokee tämän hyvin vieraaksi puhutteluksi.", "Oikein, tämä on arvostava puhuttelu."],
			[],
			["Tämä on liian tuttavallinen lopputervehdys.", "Tämä on lyhyt ja asiakasviestinnässä vaikuttaa tylyltä.", "Oikein, tämä on asiallinen ja viestii halustasi tehdä yhteistyötä.", "Tämä sopii ystävien kesken sovittuun tapaamiseen, ei asiakastapaamiseen."]
		];




	this.initEdit = function ()  {};

	this.initView = function () {

		var er = exportRoot.view;
		var btnSend = er.btnSend;
		var btnOwn = er.btnOwn;
		var btnShow = er.btnShow;
		var anim = er.anim;
		var comm = er.comm;

		var fd = er.fd;
		var cb = er.cb;
		var h = er.h;


		var dp2 = new DataProvider();
		var dp3 = new DataProvider();
		var dp5 = new DataProvider();

				function email_asiakas ()
				{

					uManager = _uManager;
					gotoPageAuto = _gotoPageAuto;
					readyToInit = _readyToInit;

					numberOfPages = 1; // asetettava
					currentPageIndex = 0;
					numberOfAnswers = 7; // asetettava
					maxScore = 0; // asetettava


					for ( var i = 0; i < options.length; i++ ) {
						if ( options[i] ) {
							for ( var j = 0; j < options[i].length; j++ ) {
								this["dp"+i].addItem( { label:options[i][j], data:options[i][j] } );
							}
						}
					}
				}


			btnSend.addEventListener(MouseEvent.CLICK, send);
			btnShow.addEventListener(MouseEvent.CLICK, show);
			btnOwn.addEventListener(MouseEvent.CLICK, own);
			anim.visible = false;
			for ( var i = 0; i < questions.length; i++ ) {
				if ( i < 2 || i == 4 || i == 6 ) {
					this["fd" + i].text = "";
					this["fd" + i].tabIndex = i;
				} else {
					var cb = this["cb" + i];
					cb.dataProvider = this["dp" + i];

				}
			}
			for ( i = 0; i < questions.length; i++ ) {
				this["h" + i].buttonMode = true;
				this["h" + i].mouseChildren = false;
				this["h" + i].addEventListener(MouseEvent.CLICK, hClick);
			}
			this["cb" + 2].addEventListener(Event.CHANGE, ch2);
			this["cb" + 3].addEventListener(Event.CHANGE, ch3);
			this["cb" + 5].addEventListener(Event.CHANGE, ch5);
			comm.addEventListener(MouseEvent.CLICK, hideComm);
			btnSend.visible = true;
			btnShow.visible = false;
			btnOwn.visible = false;
			answer.visible = false;
			comm.visible = false;
			readyToInit (); // tämän on oltava tässä
		}

		function init ()
		{

			for ( var i = 0; i < answers.length; i++ ) {
				try {
					if ( i < 2 || i == 4 || i == 6 ) {
						this["fd" + i].text = answers[i].learnerResponse;
					} else {
						if ( answers[i].learnerResponse ) {
							var cb = this["cb" + i];
							for ( var j = 0; j < options.length; j++ ) {
								if ( options[j].data == answers[i].learnerResponse ) {
									cb.selectedIndex = j;
									break;
								}
							}
						}
					}
				} catch (e) {

				}
			}

		}
	function send ()
	{
		var all = true;
		for ( var i = 0; i < questions.length; i++ ) {
			if ( i < 2 || i == 4 || i == 6 ) {
				uManager.storeAnswer (i, this["fd" + i].text, "neutral", "fill-in", questions[i] );
			} else {
				var cb = this["cb" + i];
				var str = "";
				if ( this["cb" + i].selectedItem ) str = this["cb" + i].selectedItem.data;
				if ( str == correct[i] ) {
					uManager.storeAnswer (i, str, "correct", "choice", questions[i], [correct[i]] );
				} else {
					all = false;
					uManager.storeAnswer (i, str, "incorrect", "choice", questions[i], [correct[i]] );
				}
			}
		}
		if (all) uManager.finished("passed");
		else uManager.finished("failed");
		anim.visible = true;
		anim.alpha = 0;
		anim.scaleY = 0.5;
		TweenLite.to ( anim, 0.5, { alpha:1, scaleY:1, onComplete: function() { TweenLite.to ( anim, 0.5, { alpha:0, delay:1 } ) } } );
		btnSend.visible = false;
		btnShow.visible = true;
		btnOwn.visible = false;


	}
	function hideComm ()
	{
		comm.visible = false;
	}
	function ch2 ()
	{
		try {
			var str = comments[2][cb2.selectedIndex]
			comm.visible = true;
			comm.text = str;
			comm.x = cb2.x;
			comm.y = cb2.y - comm.height;
		} catch (e) {

		}
	}
	function ch3 ()
	{
		try {
			var str = comments[3][cb3.selectedIndex]
			comm.visible = true;
			comm.text = str;
			comm.x = cb3.x;
			comm.y = cb3.y - comm.height;
		} catch (e) {

		}
	}
	function ch5 ()
	{
		try {
			var str = comments[5][cb5.selectedIndex]
			comm.visible = true;
			comm.text = str;
			comm.x = cb5.x;
			comm.y = cb5.y - comm.height;
		} catch (e) {

		}
	}
	function hClick ()
	{
		var mc = e.target;
		alert(mc.currentFrame)
		if (mc.currentFrame == 1 ) {
			mc.gotoAndStop(1);
			this.setChildIndex(mc, this.numChildren - 1);
		}
		else mc.gotoAndStop(0);
	}
	function show ()
	{
		for ( var i = 0; i < questions.length; i++ ) {
			if ( i < 2 || i == 4 || i == 6 ) {
				//this["fd" + i].visible = false;
			}else this["cb" + i].visible = false;
			this["h" + i].visible = false;
		}
		answer.visible = true;
		btnSend.visible = false;
		btnShow.visible = false;
		btnOwn.visible = true;

	}
	function own ()
	{
		for ( var i = 0; i < questions.length; i++ ) {
			if ( i < 2 || i == 4 || i == 6 ) {
				//this["fd" + i].visible = false;
			}else this["cb" + i].visible = true;
			this["h" + i].visible = true;
		}
		answer.visible = false;
		btnSend.visible = false;
		btnShow.visible = true;
		btnOwn.visible = false;

	}


	}


	this.initialize();


});

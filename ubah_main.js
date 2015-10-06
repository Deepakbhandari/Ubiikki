# Ubiikki
Html/js

define([
	'jquery',
	'underscore',
	'easeljs',
	'UbiLabsManager',
	'Task',
	'SoundManager',
	'TaskContainer',
	'GeneralUtils',
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
	this.cWidth = 581;
	this.cHeight = 400;
	this.changeToHeight = this.cHeight+5; // 0 - no change

	this.metadataName = "Umahin perhe -animaatio";
	this.metadataDescription = "";
	this.initialText = '';
	this.type = 'other'; // "true-false", "choice", "fill-in", "long-fill-in", "matching", "performance", "sequencing", "likert", "numeric", "other”
	this.tasks = [
		/*{
			q: 'Näytä kaikki kartalla',
			a: [0]
		},
		{
			q: 'Yksittäisen lohkon valinta',
			a: [1,2,3,4] // correct answers
		}*/
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



	var steps = [
		{sound:"ali_-_tassa_on_ubahin_perhe"},
		{sound:"ali_-_han_on_aiti"},
		{sound:"ali_-_han_on_isa"},
		{sound:"ali_-_han_on_poika"},
		{sound:"ali_-_han_on_tytto" },

		{sound:"ali_-_ubahin_perheessa_on_kaksi"},
		{sound:"han_on_minun_veli"},
		{sound:"han_on_minun_sisko"},
		{sound:"han_on_minun_vaimo"},
		{sound:"ubah-_han_on_minun_mies"},
		{sound:"ali_-_ubah_odottaa_vau"},
	];
	for (var i = 0; i < steps.length; i++) {
		steps[i].sound = 'sounds/'+steps[i].sound;
		sManifest.push(steps[i].sound);
	};


	this.initEdit = function ()  {};

	this.initView = function () {

	log('exportRoot', view.exportRoot);

	var currentAnim = 0;
	var currentSound = 0;

	var veli_vaal = view.exportRoot.veli_vaal
	var veli = view.exportroot.veli;
	var sisko_vaal = view.exportroot.sisko_vaal ;
	var sisko = view.exportroot.sisko;
	var mies_vaal = view.exportroot.mies_vaal;
	var nainen_vaal = view.exportroot.nainen_vaal;
  	var tx_veli = view.exportroot.tx_veli;
	var tx_sisko = view.exportroot.tx_sisko;
	var tx_tytto = view.exportroot.tx_tytto;
	var tx_poika = view.exportroot.tx_poika;
	var tx_lapsi = view.exportroot.tx_lapsi;
	var tx_lapsi1 = view.exportroot.tx_lapsi1;
	var tx_aiti = view.exportroot.tx_aiti;
	var tx_vaimo = view.exportroot.tx_vaimo;
	var tx_isa = view.exportroot.tx_isa;
	var tx_mies = view.exportroot.tx_mies;
	var tx_vauva = view.exportroot.tx_vauva;
	var bub_veli = view.exportroot.bub_veli;
	var bub_sisko = view.exportroot.bub_sisko;
	var bub_vaimo = view.exportroot.bub_vaimo;
	var bub_mies = view.exportroot.bub_mies;

	var btnAgain = view.exportRoot.btnAgain;

	veli_vaal.style.opacity = 0; // poika vaalea
	veli.style.opacity = 0; // poika tumma
	sisko_vaal.style.opacity = 0; // tyttö vaalea
	sisko.style.opacity = 0; // tyttö tumma
	mies_vaal.style.opacity = 0; // isä vaalea
	nainen_vaal.style.opacity = 0; // äiti vaalea

	tx_veli.style.opacity = 0;
	tx_sisko.style.opacity = 0;
	tx_tytto.style.opacity = 0;
	tx_poika.style.opacity = 0;
	tx_lapsi.style.opacity = 0;
	tx_lapsi1.style.opacity = 0;
	tx_aiti.style.opacity = 0;
	tx_vaimo.style.opacity = 0;
	tx_isa.style.opacity = 0;
	tx_mies.style.opacity = 0;
	tx_vauva.style.opacity = 0;
	bub_veli.style.opacity = 0;
	bub_sisko.style.opacity = 0;
	bub_vaimo.style.opacity = 0;
	bub_mies.style.opacity = 0;

	zoom.gotoAndStop(1);
	btnAgain.visible = false;



	btnAgain.cursor = 'pointer';
	btnAgain.mouseChildren = false;
	btnAgain.on('click', reStart);
	btnAgain.visible = false;
	btnAgain.gotoAndStop(0);
	btnAgain.on('rollover', function(){
		this.gotoAndStop(1);
	}, btnAgain);
	btnAgain.on('rollout', function(){
		this.gotoAndStop(0);
	}, btnAgain);



	sManager = new SoundManager(sManifest, soundsReady, view);

	function soundsReady () {

	}

	function show ()
	{
		createjs.Tween.get().to({ alpha:1 },500 );
	}
	function hide ()
	{
		createjs.Tween.get().to({ alpha:0 },500 );
	}

	function reStart ()
	{
		btnAgain.visible = false;
		veli_vaal.style.opacity = 1; // poika vaalea
		veli.style.opacity = 1; // poika tumma
		sisko_vaal.style.opacity = 1; // tyttö vaalea
		sisko.style.opacity = 1; // tyttö tumma
		mies_vaal.style.opacity = 1; // isä vaalea
		nainen_vaal.style.opacity = 1; // äiti vaalea


	}
	/*function playAnim ()
	{
		if ( currentAnim == 0 ) {
			anim.gotoAndStop(1);
			sManager.playSound( steps[0].sound ).on('complete', sComplete);

			createjs.Ticker.addEventListener("tick", tick);
		}
	}*/

	function init ()
	{
		var startTime = 2;
		var interv = 5;

		setTimeOut(function() { sManager.playSound( "sounds/"  + "ali_-_tassa_on_ubahin_perhe.mp3" ); }, startTime );

		startTime += interv;
		setTimeOut(function() { show(sisko_vaal); show(mies_vaal); },startTime + 0 );
		setTimeOut(function() { show(tx_aiti);  sManager.playSound( "sounds/"   + "ali_-_han_on_aiti.mp3" ); }, startTime + 0.5 );

		startTime += interv;
		setTimeOut(function() { show(nainen_vaal); hide(mies_vaal); show(veli_vaal); hide(tx_aiti);},startTime + 0 );
		setTimeOut(function() { hide(sisko_vaal); show(tx_isa);  sManager.playSound( "sounds/"  + "han_on_isa.mp3" ); },startTime + 0.5 );

		startTime += interv;
		setTimeOut(function() { show(mies_vaal); show(veli); hide(veli_vaal); hide(tx_isa);},startTime + 0 );
		setTimeOut(function() { show(tx_poika);  sManager.playSound( "sounds/"   + "han_on_poika.mp3" ); },startTime + 0.5 );

		startTime += interv;
		setTimeOut(function() { show(sisko); hide(veli); hide(tx_poika);},startTime + 0 );
		setTimeOut(function() { show(tx_tytto);  sManager.playSound( "sounds/"  + "han_on_tytto.mp3" ); },startTime + 0.5 );

		startTime += interv;
		setTimeOut(function() { show(veli); hide(tx_tytto);},startTime + 0 );
		setTimeOut(function() { show(tx_lapsi); show(tx_lapsi1);  sManager.playSound( "sounds/"   + "ali_-_ubahin_perheessa_on_kaksi.mp3" ); },startTime + 0.5 );

		interv += 2;
		startTime += interv;
		setTimeOut(function() { show(tx_veli); show(tx_sisko);  hide(tx_lapsi); hide(tx_lapsi1);},startTime + 0 );
		setTimeOut(function() { show(bub_veli);  sManager.playSound( "sounds/" +  "han_on_minun_veli.mp3" ); },startTime + 0.5 );

		startTime += interv;
		setTimeOut(function() {hide(bub_veli);},startTime + 0 );
		setTimeOut(function() { show(bub_sisko);  sManager.playSound( "sounds/"  + "han_on_minun_sisko.mp3" ); },startTime + 0.5 );

		startTime += interv;
		setTimeOut(function() { hide(tx_veli); hide(tx_sisko); show(veli_vaal); show(sisko_vaal); hide(mies_vaal); hide(nainen_vaal); hide(bub_sisko);},startTime + 0 );
		setTimeOut(function() { show(tx_vaimo); show(bub_vaimo);  sManager.playSound( "sounds/"  + "han_on_minun_vaimo.mp3" ); },startTime + 0.5 );


		startTime += interv;
		setTimeOut(function() { hide(tx_vaimo); hide(bub_vaimo);},startTime + 0 );
		setTimeOut(function() { show(tx_mies); show(bub_mies);  sManager.playSound( "sounds/"  + "ubah-_han_on_minun_mies.mp3" ); },startTime + 0.5 );


		startTime += interv;
		setTimeOut(function() { hide(tx_mies); hide(bub_mies); show(mies_vaal); },startTime + 0 );
		setTimeOut(function() { zoom.gotoAndPlay(2);},startTime + 0.5 );
		setTimeOut(function() { show(tx_vauva);  },startTime + 1 );
		setTimeOut(function() {  sManager.playSound( "sounds/"   + "ali_-_ubah_odottaa_vau.mp3" ); },startTime + 2 );
		setTimeOut(function() { btnAgain.visible = true; uManager.storeScore(0, 1); uManager.finished("passed"); },startTime + 4 );

	}

	function aComplete ()
	{
		createjs.Ticker.removeEventListener("tick", tick);


		btnAgain.visible = true;

		view.finishSimpleTask(); //////////////////////////
	}

	function tick () {

		if ((anim.currentLabel == 'a' + currentAnim && currentAnim < 7) || (anim.currentLabel == 'a7')) {
			anim.stop();
			if (anim.currentLabel == 'a7') aComplete();
		}
	}

	this.stage.update();

}


this.initialize();
}

});

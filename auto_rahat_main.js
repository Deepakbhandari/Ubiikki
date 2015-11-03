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
	this.cHeight = 475;
	this.changeToHeight = this.cHeight+5; // 0 - no change

	this.initialText = '';
	this.type = 'matching'; // "true-false", "choice", "fill-in", "long-fill-in", "matching", "performance", "sequencing", "likert", "numeric", "other"
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

	for (var i = 0; i < steps.length; i++) {
		steps[i].sound = 'sounds/'+steps[i].sound;
		sManifest.push(steps[i].sound);
	};

	this.initEdit = function ()  {};

	this.initView = function () {

		log('exportRoot', view.exportRoot);

		var kassa = view.exportRoot.kassa;
		var vaihtorahat = view.exportRoot.vaihtorahat;
		var maksurahat = view.exportRoot.maksurahat;
		var naama = view.exportRoot.naama;
		var kouru = view.exportRoot.kouru;
		var aTable = view.exportRoot.aTable;

		var btnCheck = view.exportRoot.btnCheck;
		var btnNew = view.exportRoot.btnNew;
		var btnHelp = view.exportRoot.btnHelp;
		var btnReStart = view.exportRoot.btnReStart;

		var qtx = view.exportRoot.qtx;
		var ctx = view.exportRoot.ctx;
		var ptx = view.exportRoot.ptx;
		var atx = view.exportRoot.atx;

		var tNum = -1;
		var lastNum = 5;
		var ohjeTx = "Paljonko annat takaisin? \nSiirrä rahat kouruun.";

		var pisteet = view.exportRoot.pisteet;
		var parhPisteet = view.exportRoot.parhPisteet;
		var parEdistym = view.exportRoot.parEdistym;
		var tries = view.exportRoot.tries;
		var maksuSumma = view.exportRoot.maksuSumma;
		var annettuSumma = view.exportRoot.annettuSumma;
		var oikeaSumma = view.exportRoot.oikeaSumma;
		var annetutRahat = view.exportRoot.annetutRahat;
		var oikeatRahat = view.exportRoot.oikeatRahat;
		var maksuSummat = view.exportRoot.maksuSummat;
		var tasks = view.exportRoot.tasks;
		tasks = [[5, 2.2, "2,20", [0, 0, 0, 0, 0, 0, 1, 0,  1, 1, 1, 0], 2.8],
								[20, 5.0, "5,00", [0, 0, 0, 0, 1, 1, 0, 0,  0, 0, 0, 0], 15.0],
								[20, 7.5, "7,50", [0, 0, 0, 0, 1, 0, 1, 0,  1, 0, 0, 0], 12.5],
								[10, 1.40, "1,40", [0, 0, 0, 0, 0, 1, 1, 1,  1, 0, 1, 0], 8.60],
								[20, 6.1, "6,10", [0, 0, 0, 0, 1, 0, 2, 1,  1, 2, 0, 0], 13.90],

								[50, 3.75, "3,75", [0, 0, 0, 2, 0, 1, 0, 1, 0, 1, 0, 1], 46.25],
								[10, 6.25, "6,25", [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1], 3.75],
								[20, 3.55, "3,55", [0, 0, 0, 0, 1, 1, 0, 1, 0, 2, 0, 1], 16.45]];

								function auto_rahat()
										{
											if (stage){init();}
											else {addEventListener(Event.ENTER_FRAME, init);
										}
									}

										function init()
										{
											removeEventListener(Event.ENTER_FRAME, init);
											kassa = _kassa;
											naama = _naama;
											aTable = _aTable;
											vaihtorahat = _vaihtorahat;
											maksurahat = _maksurahat;
											kouru = _kouru;
											btnCheck = _btnCheck;
											btnNew = _btnNew;
											btnHelp = _btnHelp;
											btnReStart = _btnReStart;
											qtx = _qtx;
											atx = _atx;
											ctx = _ctx;
											ptx = _ptx;

											var kassarahat = ["e200", "e100", "e50", "e20", "e10", "e5", "e2", "e1", "c50", "c20", "c10", "c5"];
											var arvot = [200, 100, 50, 20, 10, 5, 2, 1, 0.50, 0.20, 0.10, 0.05];

											for ( var i = 0; i<kassarahat.length; i++ ) {
												var mc = kassa[kassarahat[i]];
												mc.cursor = "pointer";
												mc.mouseChildren = false;
												mc.addEventListener(MouseEvent.MOUSE_DOWN, kassaMouseDown);
												mc.value = arvot[i];
												mc.id = i;
												if ( i > 5 ) {
													mc = kassa["r" + kassarahat[i]];
													mc.buttonMode = true;
													mc.mouseChildren = false;
													mc.addEventListener(MouseEvent.MOUSE_DOWN, kassaMouseDown);
													mc.value = arvot[i];
													mc.id = i;
													mc.cName = getQualifiedClassName(kassa[kassarahat[i]]);
												}
											}
											btnCheck.addEventListener(MouseEvent.CLICK, calc);
											btnCheck.visible = false;
											btnNew.addEventListener(MouseEvent.CLICK, newTask);
											btnNew.visible = false;
											btnHelp.addEventListener(MouseEvent.CLICK, help);
											btnHelp.visible = false;
											btnReStart.addEventListener(MouseEvent.CLICK, reStart);
											btnReStart.visible = false;
											pisteet = 0;
											ptx.text = "";
											tNum = -1;
											newTask();
											aTable.gotoAndStop("empty");
											dispEvent("MOD_LOADED");

										}
										function loadPrevSession(prevSessionData) {
											if ( prevSessionData.lastPageRahat ) {
												tNum = parseInt(prevSessionData.lastPageRahat);
												parEdistym = tNum;
												if ( prevSessionData.pisteetRahat ) {
													pisteet = Number(prevSessionData.pisteetRahat);
													ptx.text = "PISTEET: " + pisteet;
												}
												if ( prevSessionData.pisteetRahatParhaat ) {

													parhPisteet = Number(prevSessionData.pisteetRahatParhaat);
												}
												newTask();
												dispEvent("SET_DATA", { exercise:"Vaihtorahat", taskNum:parEdistym, points:parhPisteet, maxPoints:5 } );
											}
										}
										function saveSession()
										{
											dispEvent("SAVE_SESSION", { lastPageRahat} );
											dispEvent("SEND_DATA");
										}
										function reStart()
										{
											btnCheck.visible = false;
											btnNew.visible = false;
											btnHelp.visible = false;
											btnReStart.visible = false;
											pisteet = 0;
											ptx.text = "";
											tNum = -1;
											newTask();
											aTable.gotoAndStop("empty");

										}
										private function genTask()
										{

										}

										private function dispEvent(str)
										{
											var ce = new CustomEvent(str);
											ce.data() = dataObj;
											this.dispatchEvent(ce);
										}
										private function newTask (e)
										{

											tNum++;
											var id;
											for ( var i = 0; i < maksuSummat.length; i++ ) {
												if ( maksuSummat[i] == tasks[tNum][0] ) {
													id = i;
													break;
												}
											}
											maksuSumma = tasks[tNum][0];
											maksurahat.gotoAndStop(id);
											oikeaSumma = Math.round((tasks[tNum][0] - tasks[tNum][1])*100)/100;
											oikeatRahat = tasks[tNum][3];

											qtx.text = (tNum+1) + ". Lippu maksaa " + eurStr(tasks[tNum][1]) + " €.";
											atx.text = ohjeTx;
											ctx.text = "";
											emptyTable();
											naama.gotoAndStop(2);
											annettuSumma = 0;
											annetutRahat = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
											btnCheck.visible = false;
											btnNew.visible = false;
											aTable.gotoAndStop("empty");
											locked = false;
											tries[tNum] = 0;
										}
										function emptyTable()
										{
											while ( vaihtorahat.numChildren > 0) {
												var mc = vaihtorahat.getChildAt(0);
												vaihtorahat.removeChild(mc);
											}
										}
										private function calc(e)
										{
											alert(annettuSumma, oikeaSumma)
											if ( Math.round(annettuSumma*100)/100 == oikeaSumma ) {
												alert("oikea summa")
												var samat = true;
												for (var i = 0 ; i < oikeatRahat.length; i++) {
													if ( annetutRahat[i] != oikeatRahat[i] ) {
														samat = false;
														break;
													}
												}
												if ( samat ) {
													ctx.text = "OIKEIN!";
													naama.gotoAndStop(0);
													aTable.gotoAndStop("empty");
												} else {
													ctx.text = "OIKEIN!\nMutta on parempi, jos annat esim. näin:";
													aTable.gotoAndStop(tNum+1);
													naama.gotoAndStop(3);

												}
												if ( tNum >= lastNum-1 ) btnReStart.visible = true;
												else btnNew.visible = true;
												btnCheck.visible = false;
												btnHelp.visible = false;
												if ( tries[tNum] < 2 ) pisteet += 1;
												ptx.text = "PISTEET: " + pisteet;
												if ( pisteet > parhPisteet ) parhPisteet = pisteet;
												if ( tNum > parEdistym ) parEdistym = tNum;
												locked = true;
												dispEvent("SAVE_SESSION", { lastPageRahat:tNum, pisteetRahat:pisteet, pisteetRahatParhaat:parhPisteet } );
												dispEvent("SET_DATA", { exercise:"Vaihtorahat", taskNum:parEdistym, points:parhPisteet, maxPoints:5 } );
												dispEvent("SEND_DATA");
											} else {
												if ( annettuSumma > oikeaSumma ) naama.gotoAndStop(1);
												else naama.gotoAndStop(4);
												ctx.text = "VÄÄRIN, kokeile uudelleen.";
												btnHelp.visible = true;
												aTable.gotoAndStop("empty");
												tries[tNum]++;
											}
										}
										function help(e)
										{
											atx.text = ohjeTx + "\n\nAnna takaisin " +eurStr(oikeaSumma) + " €.";
											btnHelp.visible = false;
											tries[tNum]++;
										}
										function kassaMouseDown(e):void
										{
											if ( locked ) return;
											var mcOrig = e.target;
											//
											var cName = getQualifiedClassName(mcOrig);
											alert(cName);
											if ( cName == "renki" ) cName = mcOrig.cName;
											var ClassReference = getDefinitionByName(cName);
								            var mc = new ClassReference();
											mc.x = mcOrig.x;
											mc.y = mcOrig.y - 10;
											if (mcOrig.value < 5 ) {
												mc.scaleY = mc.scaleX = 0.7;
											} else mc.scaleY = mc.scaleX = 1;
											mc.cursor = "pointer";
											mc.mouseChildren = false;
											mc.value = mcOrig.value;
											mc.id = mcOrig.id;
											vaihtorahat.addChild(mc);
											mc.addEventListener(MouseEvent.MOUSE_DOWN, vaihtoMouseDown);
											mc.addEventListener(MouseEvent.MOUSE_UP, vaihtoMouseUp);
											mc.startDrag(true);
											annettuSumma += mc.value;
											annetutRahat[mc.id] ++;

											mc.parent.setChildIndex(mc, mc.parent.numChildren - 1);
											var color = 0x000000;
											var angle = 45;
											var alpha = 1;
											var blurX = 5;
											var blurY = 5;
											var distance = 5;
											var strength = 0.5;
											var inner = false;
											var knockout = false;
											var quality = 1;
											var dsfilter =  new createjs.DropShadowFilter(distance,
																		angle,
																		color,
																		alpha,
																		blurX,
																		blurY,
																		strength,
																		quality,
																		inner,
																		knockout);
											mc.filters = [dsfilter];
										}
										function vaihtoMouseDown(e)
										{
											var mc = e.target;
											mc.startDrag();
											mc.parent.setChildIndex(mc, mc.parent.numChildren - 1);
										}
										function vaihtoMouseUp(e)
										{
											var mc = e.target;
											mc.stopDrag();
											if ( locked ) return;
											var point = new Point(mc.x, mc.y);
											point = localToGlobal(point);
											if ( kouru.hitTestPoint(point.x, point.y, true) ) {
												btnCheck.visible = true;
											} else {
												annettuSumma -= mc.value;
												annetutRahat[mc.id] --;
												vaihtorahat.removeChild(mc);
											}
											ctx.text = "";

										}
										function eurStr( val, desim) {
											var str = "" + Math.round(val * 100) / 100;
											str = str.replace(".", ",");
											if ( str.lastIndexOf(",") > 0 ) {
												var zeros = desim - (str.length - 1 - str.lastIndexOf(","));
												for ( var i = 0; i<zeros; i++ ) {
													str += "0";
												}
											} else if ( str.lastIndexOf(",") < 0 ) str += ",00";
											return str;
										}

									}

								}



		}

		this.stage.update();

	}


	this.initialize();
}

});

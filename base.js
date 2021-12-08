
$(document).ready(function() {

	if (window.location.search.indexOf('redditspecial=true') > -1) {
		$(".tab45-delimiter").show();
		$(".tab5-link").show();
	}

	items=[];
	items.push({"name":"chicken meat", "owned":0, "showinvt":false}); //0
	items.push({"name":"iron chicken meat", "owned":0, "showinvt":false}); //1
	items.push({"name":"gold chicken meat", "owned":0, "showinvt":false}); //2
	items.push({"name":"diamond chicken meat", "owned":0, "showinvt":false}); //3
	items.push({"name":"emerald chicken meat", "owned":0, "showinvt":false}); //4
	items.push({"name":"hardened chicken meat", "owned":0, "showinvt":false}); //5
	items.push({"name":"hardened iron chicken meat", "owned":0, "showinvt":false}); //6
	items.push({"name":"hardened gold chicken meat", "owned":0, "showinvt":false}); //7
	items.push({"name":"hardened diamond chicken meat", "owned":0, "showinvt":false}); //8
	items.push({"name":"hardened emerald chicken meat", "owned":0, "showinvt":false}); //9
	items.push({"name":"chicken nugget", "owned":0, "showinvt":false}); //10
	items.push({"name":"iron chicken nugget", "owned":0, "showinvt":false}); //11
	items.push({"name":"gold chicken nugget", "owned":0, "showinvt":false}); //12
	items.push({"name":"diamond chicken nugget", "owned":0, "showinvt":false}); //13
	items.push({"name":"emerald chicken nugget", "owned":0, "showinvt":false}); //14
	items.push({"name":"furnace", "owned":0, "showinvt":false}); //15
	items.push({"name":"workbench", "owned":0, "showinvt":false}); //16
	items.push({"name":"scroll", "owned":0, "showinvt":false}); //17
	items.push({"name":"robots", "owned":0, "showinvt":false}); //18
	items.push({"name":"furnace2", "owned":0, "showinvt":false}); //19
	items.push({"name":"portal", "owned":0, "showinvt":false}); //20
	items.push({"name":"furnace3", "owned":0, "showinvt":false}); //21
	items.push({"name":"scroll2", "owned":0, "showinvt":false}); //22
	items.push({"name":"ancient scroll", "owned":0, "showinvt":false}); //23
	items.push({"name":"wheat", "owned":0, "showinvt":false}); //24
	items.push({"name":"medicine", "owned":0, "showinvt":false}); //25
	items.push({"name":"teleportation device", "owned":0, "showinvt":false}); //26
	items.push({"name":"furnace4", "owned":0, "showinvt":false}); //27
	items.push({"name":"compass", "owned":0, "showinvt":false}); //28

	skills=[];
	skills.push({"name":"Speed", "owned":false, "desc":"Killing chickens is two seconds faster now"}); //0
	skills.push({"name":"Cooking", "owned":false, "desc":"Using furnace is two seconds faster now"}); //1
	skills.push({"name":"Mechanics", "owned":false, "desc":"Now you can make a robot to slay chickens automatically"}); //2
	skills.push({"name":"Exploration", "owned":false, "level":0, "desc":"You will explore {km} km instead of 5 km each time you explore further"}); //3
	skills.push({"name":"Armory", "owned":false, "desc":"Now you can make some armors"}); //4
	skills.push({"name":"Statistics", "owned":false, "desc":"Now you can do some statistics job"}); //5
	skills.push({"name":"Teleportation", "owned":false, "desc":"Now you can use the teleportation device"}); //6
	skills.push({"name":"Metabolism", "owned":false, "desc":"Iron chicken nugget heals more hp"}); //7

	chickenspop=10000; //10000
	ironchickenspop=10000; //10000
	goldchickenspop=10000; //10000

	invtnotif=false;
	tradernotif=false;
	beginning=false;
	unlockedskills=false;
	trademap=false;
	tradebetterfurnace=false;
	introducetp=false;
	getscroll=false; //false

	playerhp=100;
	playerhpmax=100;
	usesound=false;
	tool=0; // 0 = fist, 1 = chicken sword, 2 = iron chicken sword, 3 = gold chicken sword
	helmet=0;
	chestplate=0;
	leggings=0;
	boots=0;
	breedinterval=2000; //2000
	tpdevicekm=0; //0
	tpdevicestock=5; //5
	rubysearchstep=0; //0
	redditspecialstep=0;

	/* NO SAVE */
	exploring=false;
	explorechickenverse2=false;
	playerlocation="outside2";
	kmexplored=0;
	enemies=[];
	drops=[];
	dropscd=[];
	battleinvt=[];
	rooms=[];
	newrooms=[];
	healcd=false;
	autosave=true;
	autosavetime=60;
	cavepos="";
	thereisenemy=false;
	pathnotorch=false;
	caverooms=0;
	roomlimit=100;
	bosshealth=400
	chickenstun=0;
	bossbattleiscommencing=false;
	endgame=false;
	rubymeats=1000000000;
	rubynuggets=0;
	bossinterval="";

	autosaveinterval=setInterval(function() {
		autosavetime--;
		if(autosavetime==0) {
			autosavetime=60;
			save("local");
		}
		$("#autosave-cd").html(autosavetime);
	},1000);

	audio=new Audio("chicken.mp3");
	audio2=new Audio("chicken2.mp3");
	audio3=new Audio("chicken3.mp3");
	/* END NO SAVE*/

	if(localStorage.chickensgamesave) {
		save("load");
	}

	if(!invtnotif)$("#mutenotif").animate({"bottom":"-30px"},1000);
	$("#autosave-cd").html(autosavetime);

	breedchickens();
	update();
	setInterval(function() {
		nbrrobots=items[18].owned;

		chickenmeatget=getRandomInt(2*nbrrobots,10*nbrrobots);
		if(chickenspop-chickenmeatget>=0) {
			items[0].owned+=chickenmeatget;
			chickenspop-=chickenmeatget;
		}

		ironchickenmeatget=getRandomInt(1*nbrrobots,6*nbrrobots);
		if(ironchickenspop-ironchickenmeatget>=0) {
			items[1].owned+=ironchickenmeatget;
			ironchickenspop-=ironchickenmeatget;
		}

		goldchickenmeatget=getRandomInt(0*nbrrobots,2*nbrrobots);
		if(goldchickenspop-goldchickenmeatget>=0) {
			items[2].owned+=goldchickenmeatget;
			goldchickenspop-=goldchickenmeatget;
		}

		update();
	},3000);

	$(document).keyup(function(e) {
		if(e.keyCode==77 && !$("#textbased-input").is(':focus')) {
			togglesound();
		}
	});

	$("#textbased-input").keydown(function(e) {
		kc=e.keyCode;
		if(kc==13 && $(this).val()!="") {
			executecmd($(this).val());
			$(this).val("");
		}
		if(kc==37)executecmd("go w");
		if(kc==38)executecmd("go n");
		if(kc==39)executecmd("go e");
		if(kc==40)executecmd("go s");
	});

});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function totitlecase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function repeat(pattern, count) {
    if (count < 1) return '';
    var result = '';
    while (count > 1) {
        if (count & 1) result += pattern;
        count >>= 1, pattern += pattern;
    }
    return result + pattern;
}

function update() {

	$(".chicken-meat-owned").html(items[0].owned);
	$(".iron-chicken-meat-owned").html(items[1].owned);
	$(".gold-chicken-meat-owned").html(items[2].owned);
	$(".diamond-chicken-meat-owned").html(items[3].owned);
	$(".emerald-chicken-meat-owned").html(items[4].owned);
	$(".hardened-chicken-meat-owned").html(items[5].owned);
	$(".hardened-iron-chicken-meat-owned").html(items[6].owned);
	$(".hardened-gold-chicken-meat-owned").html(items[7].owned);
	$(".hardened-diamond-chicken-meat-owned").html(items[8].owned);
	$(".hardened-emerald-chicken-meat-owned").html(items[9].owned);
	$(".chicken-nugget-owned").html(items[10].owned);
	$(".iron-chicken-nugget-owned").html(items[11].owned);
	$(".gold-chicken-nugget-owned").html(items[12].owned);
	$(".diamond-chicken-nugget-owned").html(items[13].owned);
	$(".emerald-chicken-nugget-owned").html(items[14].owned);
	$(".robots-owned").html(items[18].owned);
	$(".wheat-owned").html(items[24].owned);
	$(".tpdevice-owned").html(items[26].owned);
	$(".chickens-pop").html(Math.round(chickenspop).toFixed(0));
	$(".iron-chickens-pop").html(Math.round(ironchickenspop).toFixed(0));
	$(".gold-chickens-pop").html(Math.round(goldchickenspop).toFixed(0));

	for(k=0;k<=14;k++) {
		if(items[k].showinvt || items[k].owned>0) {
			if(k==0 && !beginning)break;
			items[k].showinvt=true;

			if(k==0){$(".chicken-meat").show();}
			if(k==1){$(".iron-chicken-meat").show();}
			if(k==2){$(".gold-chicken-meat").show();}
			if(k==3){$(".diamond-chicken-meat").show();}
			if(k==4){$(".emerald-chicken-meat").show();}
			if(k==5){$(".hardened-chicken-meat").show();}
			if(k==6){$(".hardened-iron-chicken-meat").show();}
			if(k==7){$(".hardened-gold-chicken-meat").show();}
			if(k==8){$(".hardened-diamond-chicken-meat").show();}
			if(k==9){$(".hardened-emerald-chicken-meat").show();}
			if(k==10){$(".chicken-nugget").show();}
			if(k==11){$(".iron-chicken-nugget").show();}
			if(k==12){$(".gold-chicken-nugget").show();}
			if(k==13){$(".diamond-chicken-nugget").show();}
			if(k==14){$(".emerald-chicken-nugget").show();}

			if(k>=0&&k<=4) {
				$(".meats-heading").show();
			}
			else if(k>=5&&k<=9) {
				$(".hardened-meats-heading").show();
			}
			if(k>=10&&k<=14) {
				$(".chicken-nuggets-heading").show();
			}

		}
	}

	if(trademap) {
		$(".trade-portal").show();
		$(".trade-scroll").show();
		$(".trade-furnace2").show();
		$("#til").show();
	}

	if(items[24].showinvt || items[24].owned>0) {
		$(".wheat").show();
		$(".misc-heading").show();
	}

	if(items[26].showinvt || items[26].owned>0) {
		$(".tpdevice").show();
		$(".misc-heading").show();
	}

	$(".skill-exploration").val("Exploration "+parseInt(skills[3].level+1)+" ("+Math.round(Math.pow(10*(skills[3].level+1),0.8))+" gold chicken nuggets)");

	if(items[15].owned==1) {
		$(".trade-furnace").hide();
		$("#furnace").show();
	}
	if(items[16].owned==1) {
		$(".trade-workbench").hide();
		$("#workbench").show();
	}
	if(items[0].owned>=5) {
		if(!beginning)beginning=true;
		items[0].showinvt=true;
	}
	if(items[0].owned>=8) {
		$(".tab01-delimiter").show();
		$(".tab1-link").show();
	}

	if(items[10].owned>0) {
		if(!unlockedskills)unlockedskills=true;
	}

	if(items[2].owned>0) {
		if(!trademap) {
			$(".notifications").html("Trader has something new to trade with you.");
			$(".trade-portal").show();
			$(".trade-scroll").show();
			$(".trade-furnace2").show();
			$("#til").show();
			trademap=true;
		}
	}
	if(items[17].owned==1) {
		$(".trade-scroll").hide();
		if(!skills[2].owned) {
			$(".skill-mechanics").show();
		}
	}
	if(items[19].owned==1) {
		$(".timesten").show();
		$(".trade-furnace2").hide();
	}
	if(items[20].owned==1) {
		$(".trade-portal").hide();
		$(".tab23-delimiter").show();
		$(".tab3-link").show();
	}
	if(items[21].owned==1) {
		$(".timeshundred").show();
		$(".trade-furnace3").hide();
	}
	if(items[22].owned==1) {
		$(".skill-armory").show();
		$(".trade-scroll2").hide();
	}
	if(items[23].owned>=1) {
		$(".skill-statistics").show();
		$(".trade-wheat").show();
		if(items[25].owned==0 && breedinterval==2000) {
			$(".trade-medicine").show();
		}
		else {
			$(".trade-medicine").hide();
		}
	}
	if(items[25].owned==1) {
		$(".use-medicine").show();
	}
	else {
		$(".use-medicine").hide();
	}
	if(items[27].owned==1) {
		$(".timesthousand").show();
		$(".trade-furnace4").hide();
	}

	if(items[1].showinvt) {
		if(tool<2) {
			$(".craft-iron-chicken-sword").show();
		}
		$(".furnace-iron-chicken-nugget").show();
		$(".furnace-hardened-iron-chicken-meat").show();
		$("#furnace-iron-chicken-meat").show();
	}
	if(items[2].showinvt) {
		if(tool<3) {
			$(".craft-gold-chicken-sword").show();
		}
		$(".furnace-gold-chicken-nugget").show();
		$(".furnace-hardened-gold-chicken-meat").show();
		$("#furnace-gold-chicken-meat").show();

		if(skills[3].level>=10) {
			$(".skill-exploration").hide();
		}
		else {
			$(".skill-exploration").show();
		}
	}
	if(items[3].showinvt) {
		if(tool<4) {
			$(".craft-diamond-chicken-sword").show();
		}
		$(".furnace-diamond-chicken-nugget").show();
		$(".furnace-hardened-diamond-chicken-meat").show();
		$("#furnace-diamond-chicken-meat").show();
		$(".trade-tpdevice").show();
	}
	if(items[4].showinvt) {
		if(tool<5) {
			$(".craft-emerald-chicken-sword").show();
		}
		$(".furnace-emerald-chicken-nugget").show();
		$(".furnace-hardened-emerald-chicken-meat").show();
		$("#furnace-emerald-chicken-meat").show();
	}

	if(skills[0].owned) {
		$(".skill-speed").hide();
	}
	if(skills[1].owned) {
		$(".skill-cooking").hide();
	}
	if(skills[2].owned) {
		$(".skill-mechanics").hide();
		$("#robots").show();
	}
	if(skills[4].owned) {
		$(".skill-armory").hide();
		$("#robots").show();
	}
	if(skills[5].owned) {
		$(".skill-statistics").hide();
		$(".tab56-delimiter").show();
		$(".tab6-link").show();
	}

	no=0;
	noskill=false;
	skilllist="";
	for(i=0;i<skills.length;i++) {
		a=skills[i].owned;
		if(a) {
			skilllist=skilllist+"<li>"+skills[i].name;
			if(i==3) {
				skilllist=skilllist+" "+skills[i].level;
			}
			skilllist=skilllist+" ("+skills[i].desc.replace("{km}",5+parseInt(skills[3].level))+")</li>";
		}
		else {
			no++;
			if(no==skills.length) {
				noskill=true;
			}
		}
	}

	if(noskill) {
		$("#skills").html("<ul><li>No skill</li></ul>");
	}
	else {
		$("#skills").html("<ul>"+skilllist+"</ul>");
	}

	if(beginning) {
		if(!exploring)$("#inventory").show();
		if(!exploring)$("#tab").show();
		$(".tab0-link").show();
		$(".tab34-delimiter").show();
		$(".tab4-link").show();
		$(".tab47-delimiter").show();
		$(".tab7-link").show();
	}
	if(unlockedskills) {
		$(".tab12-delimiter").show();
		$(".tab2-link").show();
	}
	if(tradebetterfurnace) {
		if(items[21].owned!=1) {
			$(".trade-furnace3").show();
		}
		if(items[22].owned!=1) {
			$(".trade-scroll2").show();
		}
		$("#dicegame").show();
	}
	if(introducetp) {
		if(skills[6].owned==false) {
			$(".skill-teleportation").show();
		}
		else {
			$(".skill-teleportation").hide();
		}
		if(skills[7].owned==false) {
			$(".skill-metabolism").show();
		}
		else {
			$(".skill-metabolism").hide();
		}
	}

	$(".craft-robot").val("Make a Robot ("+Math.round(Math.pow(10*(items[18].owned+1),1.5))+" iron chicken nuggets)");

	/* ARMOR STUFFS */

	if(skills[4].owned) {

		if(helmet==0) {
			$(".craft-chicken-helmet").show();
			$(".craft-iron-chicken-helmet").hide();
			$(".craft-gold-chicken-helmet").hide();
			$(".craft-diamond-chicken-helmet").hide();
			$(".craft-emerald-chicken-helmet").hide();
		}
		else if(helmet==1) {
			$(".craft-chicken-helmet").hide();
			$(".craft-iron-chicken-helmet").show();
			$(".craft-gold-chicken-helmet").hide();
			$(".craft-diamond-chicken-helmet").hide();
			$(".craft-emerald-chicken-helmet").hide();
		}
		else if(helmet==2) {
			$(".craft-chicken-helmet").hide();
			$(".craft-iron-chicken-helmet").hide();
			$(".craft-gold-chicken-helmet").show();
			$(".craft-diamond-chicken-helmet").hide();
			$(".craft-emerald-chicken-helmet").hide();
		}
		else if(helmet==3) {
			$(".craft-chicken-helmet").hide();
			$(".craft-iron-chicken-helmet").hide();
			$(".craft-gold-chicken-helmet").hide();
			$(".craft-diamond-chicken-helmet").show();
			$(".craft-emerald-chicken-helmet").hide();
		}
		else if(helmet==4) {
			$(".craft-chicken-helmet").hide();
			$(".craft-iron-chicken-helmet").hide();
			$(".craft-gold-chicken-helmet").hide();
			$(".craft-diamond-chicken-helmet").hide();
			$(".craft-emerald-chicken-helmet").show();
		}
		else if(helmet==5) {
			$(".craft-chicken-helmet").hide();
			$(".craft-iron-chicken-helmet").hide();
			$(".craft-gold-chicken-helmet").hide();
			$(".craft-diamond-chicken-helmet").hide();
			$(".craft-emerald-chicken-helmet").hide();
		}

		if(chestplate==0) {
			$(".craft-chicken-chestplate").show();
			$(".craft-iron-chicken-chestplate").hide();
			$(".craft-gold-chicken-chestplate").hide();
			$(".craft-diamond-chicken-chestplate").hide();
			$(".craft-emerald-chicken-chestplate").hide();
		}
		else if(chestplate==1) {
			$(".craft-chicken-chestplate").hide();
			$(".craft-iron-chicken-chestplate").show();
			$(".craft-gold-chicken-chestplate").hide();
			$(".craft-diamond-chicken-chestplate").hide();
			$(".craft-emerald-chicken-chestplate").hide();
		}
		else if(chestplate==2) {
			$(".craft-chicken-chestplate").hide();
			$(".craft-iron-chicken-chestplate").hide();
			$(".craft-gold-chicken-chestplate").show();
			$(".craft-diamond-chicken-chestplate").hide();
			$(".craft-emerald-chicken-chestplate").hide();
		}
		else if(chestplate==3) {
			$(".craft-chicken-chestplate").hide();
			$(".craft-iron-chicken-chestplate").hide();
			$(".craft-gold-chicken-chestplate").hide();
			$(".craft-diamond-chicken-chestplate").show();
			$(".craft-emerald-chicken-chestplate").hide();
		}
		else if(chestplate==4) {
			$(".craft-chicken-chestplate").hide();
			$(".craft-iron-chicken-chestplate").hide();
			$(".craft-gold-chicken-chestplate").hide();
			$(".craft-diamond-chicken-chestplate").hide();
			$(".craft-emerald-chicken-chestplate").show();
		}
		else if(chestplate==5) {
			$(".craft-chicken-chestplate").hide();
			$(".craft-iron-chicken-chestplate").hide();
			$(".craft-gold-chicken-chestplate").hide();
			$(".craft-diamond-chicken-chestplate").hide();
			$(".craft-emerald-chicken-chestplate").hide();
		}

		if(leggings==0) {
			$(".craft-chicken-leggings").show();
			$(".craft-iron-chicken-leggings").hide();
			$(".craft-gold-chicken-leggings").hide();
			$(".craft-diamond-chicken-leggings").hide();
			$(".craft-emerald-chicken-leggings").hide();
		}
		else if(leggings==1) {
			$(".craft-chicken-leggings").hide();
			$(".craft-iron-chicken-leggings").show();
			$(".craft-gold-chicken-leggings").hide();
			$(".craft-diamond-chicken-leggings").hide();
			$(".craft-emerald-chicken-leggings").hide();
		}
		else if(leggings==2) {
			$(".craft-chicken-leggings").hide();
			$(".craft-iron-chicken-leggings").hide();
			$(".craft-gold-chicken-leggings").show();
			$(".craft-diamond-chicken-leggings").hide();
			$(".craft-emerald-chicken-leggings").hide();
		}
		else if(leggings==3) {
			$(".craft-chicken-leggings").hide();
			$(".craft-iron-chicken-leggings").hide();
			$(".craft-gold-chicken-leggings").hide();
			$(".craft-diamond-chicken-leggings").show();
			$(".craft-emerald-chicken-leggings").hide();
		}
		else if(leggings==4) {
			$(".craft-chicken-leggings").hide();
			$(".craft-iron-chicken-leggings").hide();
			$(".craft-gold-chicken-leggings").hide();
			$(".craft-diamond-chicken-leggings").hide();
			$(".craft-emerald-chicken-leggings").show();
		}
		else if(leggings==5) {
			$(".craft-chicken-leggings").hide();
			$(".craft-iron-chicken-leggings").hide();
			$(".craft-gold-chicken-leggings").hide();
			$(".craft-diamond-chicken-leggings").hide();
			$(".craft-emerald-chicken-leggings").hide();
		}

		if(boots==0) {
			$(".craft-chicken-boots").show();
			$(".craft-iron-chicken-boots").hide();
			$(".craft-gold-chicken-boots").hide();
			$(".craft-diamond-chicken-boots").hide();
			$(".craft-emerald-chicken-boots").hide();
		}
		else if(boots==1) {
			$(".craft-chicken-boots").hide();
			$(".craft-iron-chicken-boots").show();
			$(".craft-gold-chicken-boots").hide();
			$(".craft-diamond-chicken-boots").hide();
			$(".craft-emerald-chicken-boots").hide();
		}
		else if(boots==2) {
			$(".craft-chicken-boots").hide();
			$(".craft-iron-chicken-boots").hide();
			$(".craft-gold-chicken-boots").show();
			$(".craft-diamond-chicken-boots").hide();
			$(".craft-emerald-chicken-boots").hide();
		}
		else if(boots==3) {
			$(".craft-chicken-boots").hide();
			$(".craft-iron-chicken-boots").hide();
			$(".craft-gold-chicken-boots").hide();
			$(".craft-diamond-chicken-boots").show();
			$(".craft-emerald-chicken-boots").hide();
		}
		else if(boots==4) {
			$(".craft-chicken-boots").hide();
			$(".craft-iron-chicken-boots").hide();
			$(".craft-gold-chicken-boots").hide();
			$(".craft-diamond-chicken-boots").hide();
			$(".craft-emerald-chicken-boots").show();
		}
		else if(boots==5) {
			$(".craft-chicken-boots").hide();
			$(".craft-iron-chicken-boots").hide();
			$(".craft-gold-chicken-boots").hide();
			$(".craft-diamond-chicken-boots").hide();
			$(".craft-emerald-chicken-boots").hide();
		}

	}
	else {
		$(".craft-chicken-helmet").hide();
		$(".craft-iron-chicken-helmet").hide();
		$(".craft-gold-chicken-helmet").hide();
		$(".craft-diamond-chicken-helmet").hide();
		$(".craft-emerald-chicken-helmet").hide();
		$(".craft-chicken-chestplate").hide();
		$(".craft-iron-chicken-chestplate").hide();
		$(".craft-gold-chicken-chestplate").hide();
		$(".craft-diamond-chicken-chestplate").hide();
		$(".craft-emerald-chicken-chestplate").hide();
		$(".craft-chicken-leggings").hide();
		$(".craft-iron-chicken-leggings").hide();
		$(".craft-gold-chicken-leggings").hide();
		$(".craft-diamond-chicken-leggings").hide();
		$(".craft-emerald-chicken-leggings").hide();
		$(".craft-chicken-boots").hide();
		$(".craft-iron-chicken-boots").hide();
		$(".craft-gold-chicken-boots").hide();
		$(".craft-diamond-chicken-boots").hide();
		$(".craft-emerald-chicken-boots").hide();
	}

	/* END ARMOR STUFFS */

	$("#mini-invt").html("");
	for(q=0;q<battleinvt.length;q++) {
		qwe=$("#mini-invt").html();
		$("#mini-invt").html(qwe+'<tr><td class="invt-item-name">'+totitlecase(items[battleinvt[q].itemid].name)+'</td><td class="invt-item-owned">'+battleinvt[q].owned+'</td></tr>');
	}

	$(".trade-tpdevice input").val("Trade a teleportation device for 2 diamond chicken meats ("+tpdevicestock+" left)");

	if(rubysearchstep>0)document.title="Chickens!: The Quest of the Ruby Chicken Meat";

	if(getscroll) {
		if(tool<=10)$("#craft-chickenators").show();
		if(items[27].owned==0)$(".trade-furnace4").show();
		$("#mutant-chicken").show();
		$(".trade-compass").show();
		if(tool<6)$(".craft-chickenator-onethousand").show();
	}

	if(tool>0) {$(".craft-chicken-sword").hide();}
	if(tool>1) {$(".craft-iron-chicken-sword").hide();}
	if(tool>2) {$(".craft-gold-chicken-sword").hide();}
	if(tool>3) {$(".craft-diamond-chicken-sword").hide();}
	if(tool>4) {$(".craft-emerald-chicken-sword").hide();}
	if(tool>5) {$(".craft-chickenator-onethousand").hide();}
	if(tool>6) {$(".craft-chickenator-twothousand").hide();}
	if(tool>7) {$(".craft-chickenator-fourthousand").hide();}
	if(tool>8) {$(".craft-chickenator-eightthousand").hide();}
	if(tool>9) {$(".craft-chickenator-ninethousand").hide();}
	if(tool>10) {$(".craft-chickenator-ninenineninenine, #craft-chickenators").hide();}

	if(tool==6) {$(".craft-chickenator-twothousand").show();}
	if(tool==7) {$(".craft-chickenator-fourthousand").show();}
	if(tool==8) {$(".craft-chickenator-eightthousand").show();}
	if(tool==9) {$(".craft-chickenator-ninethousand").show();}
	if(tool==10) {$(".craft-chickenator-ninenineninenine").show();}

	if(redditspecialstep==0) {
		rsth="first";
		rsclue="<li>Open this <a href='http://www.reddit.com/r/chickens_incremental' target='_blank'>game's subreddit</a>, but you must <b title='np.reddit.com'>no</b>t <b title='np.reddit.com'>participate</b></li><li>Slay some chickens</li><li>???</li><li>PROFIT (well, ignore the 3rd and the 4th instruction)</li><li>Hover the bolded words for more clue</li>";
	}
	else if(redditspecialstep==1) {
		rsth="second";
		rsclue="<li>A good redditor will read submission text before submitting to reddit<br><br><sup><sup>there is something hidden in the submission text</sup></sup></li>";
	}
	else if(redditspecialstep==2) {
		rsth="third";
		rsclue="<li>Did you know that <a href='http://www.reddit.com/r/chickens_incremental' target='_blank'>game's subreddit</a> has a wiki page? (although the index is empty)</li><li>The wiki has a hidden maze!</li>";
	}
	else if(redditspecialstep==3) {
		rsth="fourth";
		rsclue="<li>Open the wiki page of the second password</li>";
	}
	else if(redditspecialstep==4) {
		rsth="fifth";
		rsclue="<li>Sorry, but there are no challenges anymore :(</li><li><del>However, you can help me by suggesting ideas for the next challenge!</del></li><li><del>There is a chance I might put it in this game!</del></li><li><del>Click <a href='http://www.reddit.com/r/chickens_incremental/wiki/challenges' target='_blank'>here</a> for more info</del></li><li><b>(2021 UPDATE: I have no more plans to update this game, thank you for going through these challenges though!)</b></li>";
	}

	$(".rsth").html(rsth);
	$(".rsclue").html(rsclue);

	if(items[28].owned>=1) {
		$(".trade-compass").hide();
		$("#availablecommands").html("Available commands: go, pos, clear, examine, map, exit");
	}

}

function tab(which) {
	for(i=0;i<=10;i++) {
		$("#tab"+i).hide();
		$(".tab"+i+"-link").removeClass("active");
	}
	$("#tab"+which).show();
	$(".tab"+which+"-link").addClass("active");
}

function cd(countdown,id,val) {
	if(countdown==0) {
		$("#"+id).removeAttr("disabled").val(val);
	}
	else {
		$("#"+id).attr("disabled","disabled");
		$("#"+id).val(val+" ["+countdown+"]");
		setTimeout(function() {
			countdown--;
			cd(countdown,id,val);
		},1000);
	}
}

function cdc(countdown,id,val) {
	if(countdown==0) {
		$("."+id).removeAttr("disabled").val(val);
	}
	else {
		$("."+id).attr("disabled","disabled");
		$("."+id).val(val+" ["+countdown+"]");
		setTimeout(function() {
			countdown--;
			cdc(countdown,id,val);
		},1000);
	}
}

function togglesound() {
	if(usesound){usesound=false;alert('Sound disabled');}
	else{usesound=true;alert('Sound enabled');}
}
function togglecolor() {
	$("body").toggleClass("wob");
}

function slaychicken() {

	if(usesound) {
		whichsound=getRandomInt(1,3);
		if(whichsound==1)audio.play();
		if(whichsound==2)audio2.play();
		if(whichsound==3)audio3.play();
	}

	if($("#mutenotif").html()=="Press <b>M</b> to toggle sound") {
		$("#mutenotif").animate({"bottom":"-82px"},1000);
	}

	if(tool==0) {
		countdown=7;
		get=1;
		items[0].owned+=get;
		chickenspop-=1;
		if(!beginning) {
			$(".notifications").html("You killed a chicken with your fists and you got a piece of chicken meat. (You have "+items[0].owned+")");
		}
		else {
			$(".notifications").html("You killed a chicken with your fists and you got a piece of chicken meat.");
		}
	}
	else if(tool==1) {
		countdown=6;
		normalget=getRandomInt(2,5);
		if(chickenspop-normalget>=0) {
			chickenspop-=normalget;
		}
		else {
			normalget=0;
		}
		ironget=parseInt((Math.random()<0.4)?"0":"1");
		if(ironchickenspop-ironget>=0) {
			ironchickenspop-=ironget;
		}
		else {
			ironget=0;
		}
		total=normalget+ironget;
		$(".notifications").html("You killed "+total+" chicken(s) with a chicken sword and you got "+normalget+" piece(s) of chicken meat and "+ironget+" piece(s) of iron chicken meat.");
		items[0].owned+=normalget;
		items[1].owned+=ironget;
	}
	else if(tool==2) {
		countdown=5;
		normalget=getRandomInt(5,10);
		ironget=getRandomInt(2,5);
		goldget=parseInt((Math.random()<0.4)?"0":"1");
		if(chickenspop-normalget>=0) {
			chickenspop-=normalget;
		}
		else {
			normalget=0;
		}
		if(ironchickenspop-ironget>=0) {
			ironchickenspop-=ironget;
		}
		else {
			ironget=0;
		}
		if(goldchickenspop-goldget>=0) {
			goldchickenspop-=goldget;
		}
		else {
			goldget=0;
		}
		total=normalget+ironget+goldget;
		$(".notifications").html("You killed "+total+" chicken(s) with an iron chicken sword and you got "+normalget+" piece(s) of chicken meat and "+ironget+" piece(s) of iron chicken meat and "+goldget+" piece(s) of gold chicken meat.");
		items[0].owned+=normalget;
		items[1].owned+=ironget;
		items[2].owned+=goldget;
	}
	else if(tool==3) {
		countdown=4;
		normalget=getRandomInt(10,15);
		ironget=getRandomInt(5,10);
		goldget=getRandomInt(2,5);
		if(chickenspop-normalget>=0) {
			chickenspop-=normalget;
		}
		else {
			normalget=0;
		}
		if(ironchickenspop-ironget>=0) {
			ironchickenspop-=ironget;
		}
		else {
			ironget=0;
		}
		if(goldchickenspop-goldget>=0) {
			goldchickenspop-=goldget;
		}
		else {
			goldget=0;
		}
		total=normalget+ironget+goldget;
		$(".notifications").html("You killed "+total+" chicken(s) with a gold chicken sword and you got "+normalget+" piece(s) of chicken meat and "+ironget+" piece(s) of iron chicken meat and "+goldget+" piece(s) of gold chicken meat.");
		items[0].owned+=normalget;
		items[1].owned+=ironget;
		items[2].owned+=goldget;
	}
	else if(tool==4) {
		countdown=3;
		normalget=getRandomInt(15,20);
		ironget=getRandomInt(10,15);
		goldget=getRandomInt(5,10);
		if(chickenspop-normalget>=0) {
			chickenspop-=normalget;
		}
		else {
			normalget=0;
		}
		if(ironchickenspop-ironget>=0) {
			ironchickenspop-=ironget;
		}
		else {
			ironget=0;
		}
		if(goldchickenspop-goldget>=0) {
			goldchickenspop-=goldget;
		}
		else {
			goldget=0;
		}
		total=normalget+ironget+goldget;
		$(".notifications").html("You killed "+total+" chicken(s) with a diamond chicken sword and you got "+normalget+" piece(s) of chicken meat and "+ironget+" piece(s) of iron chicken meat and "+goldget+" piece(s) of gold chicken meat.");
		items[0].owned+=normalget;
		items[1].owned+=ironget;
		items[2].owned+=goldget;
	}
	else if(tool==5) {
		countdown=2;
		normalget=getRandomInt(20,25);
		ironget=getRandomInt(15,20);
		goldget=getRandomInt(10,15);
		if(chickenspop-normalget>=0) {
			chickenspop-=normalget;
		}
		else {
			normalget=0;
		}
		if(ironchickenspop-ironget>=0) {
			ironchickenspop-=ironget;
		}
		else {
			ironget=0;
		}
		if(goldchickenspop-goldget>=0) {
			goldchickenspop-=goldget;
		}
		else {
			goldget=0;
		}
		total=normalget+ironget+goldget;
		$(".notifications").html("You killed "+total+" chicken(s) with an emerald chicken sword and you got "+normalget+" piece(s) of chicken meat and "+ironget+" piece(s) of iron chicken meat and "+goldget+" piece(s) of gold chicken meat.");
		items[0].owned+=normalget;
		items[1].owned+=ironget;
		items[2].owned+=goldget;
	}
	else if(tool==6) {
		countdown=2;
		normalget=getRandomInt(25,30);
		ironget=getRandomInt(20,25);
		goldget=getRandomInt(15,20);

		if(chickenspop-normalget>=0) {chickenspop-=normalget;}else {normalget=0;}if(ironchickenspop-ironget>=0) {ironchickenspop-=ironget;}else {ironget=0;}if(goldchickenspop-goldget>=0) {goldchickenspop-=goldget;}else {goldget=0;}total=normalget+ironget+goldget;

		$(".notifications").html("You killed "+total+" chicken(s) with a Chickenator 1000 and you got "+normalget+" piece(s) of chicken meat and "+ironget+" piece(s) of iron chicken meat and "+goldget+" piece(s) of gold chicken meat.");
		items[0].owned+=normalget;
		items[1].owned+=ironget;
		items[2].owned+=goldget;
	}
	else if(tool==7) {
		countdown=2;
		normalget=getRandomInt(30,35);
		ironget=getRandomInt(25,30);
		goldget=getRandomInt(20,25);

		if(chickenspop-normalget>=0) {chickenspop-=normalget;}else {normalget=0;}if(ironchickenspop-ironget>=0) {ironchickenspop-=ironget;}else {ironget=0;}if(goldchickenspop-goldget>=0) {goldchickenspop-=goldget;}else {goldget=0;}total=normalget+ironget+goldget;

		$(".notifications").html("You killed "+total+" chicken(s) with a Chickenator 2000 and you got "+normalget+" piece(s) of chicken meat and "+ironget+" piece(s) of iron chicken meat and "+goldget+" piece(s) of gold chicken meat.");
		items[0].owned+=normalget;
		items[1].owned+=ironget;
		items[2].owned+=goldget;
	}
	else if(tool==8) {
		countdown=2;
		normalget=getRandomInt(40,45);
		ironget=getRandomInt(35,40);
		goldget=getRandomInt(30,35);

		if(chickenspop-normalget>=0) {chickenspop-=normalget;}else {normalget=0;}if(ironchickenspop-ironget>=0) {ironchickenspop-=ironget;}else {ironget=0;}if(goldchickenspop-goldget>=0) {goldchickenspop-=goldget;}else {goldget=0;}total=normalget+ironget+goldget;

		$(".notifications").html("You killed "+total+" chicken(s) with a Chickenator 4000 and you got "+normalget+" piece(s) of chicken meat and "+ironget+" piece(s) of iron chicken meat and "+goldget+" piece(s) of gold chicken meat.");
		items[0].owned+=normalget;
		items[1].owned+=ironget;
		items[2].owned+=goldget;
	}
	else if(tool==9) {
		countdown=2;
		normalget=getRandomInt(80,85);
		ironget=getRandomInt(55,60);
		goldget=getRandomInt(50,55);

		if(chickenspop-normalget>=0) {chickenspop-=normalget;}else {normalget=0;}if(ironchickenspop-ironget>=0) {ironchickenspop-=ironget;}else {ironget=0;}if(goldchickenspop-goldget>=0) {goldchickenspop-=goldget;}else {goldget=0;}total=normalget+ironget+goldget;

		$(".notifications").html("You killed "+total+" chicken(s) with a Chickenator 8000 and you got "+normalget+" piece(s) of chicken meat and "+ironget+" piece(s) of iron chicken meat and "+goldget+" piece(s) of gold chicken meat.");
		items[0].owned+=normalget;
		items[1].owned+=ironget;
		items[2].owned+=goldget;
	}
	else if(tool==10) {
		countdown=2;
		normalget=getRandomInt(85,90);
		ironget=getRandomInt(60,65);
		goldget=getRandomInt(55,60);

		if(chickenspop-normalget>=0) {chickenspop-=normalget;}else {normalget=0;}if(ironchickenspop-ironget>=0) {ironchickenspop-=ironget;}else {ironget=0;}if(goldchickenspop-goldget>=0) {goldchickenspop-=goldget;}else {goldget=0;}total=normalget+ironget+goldget;

		$(".notifications").html("You killed "+total+" chicken(s) with a Chickenator 9000 and you got "+normalget+" piece(s) of chicken meat and "+ironget+" piece(s) of iron chicken meat and "+goldget+" piece(s) of gold chicken meat.");
		items[0].owned+=normalget;
		items[1].owned+=ironget;
		items[2].owned+=goldget;
	}
	else if(tool==11) {
		countdown=2;
		normalget=getRandomInt(90,95);
		ironget=getRandomInt(65,70);
		goldget=getRandomInt(60,65);

		if(chickenspop-normalget>=0) {chickenspop-=normalget;}else {normalget=0;}if(ironchickenspop-ironget>=0) {ironchickenspop-=ironget;}else {ironget=0;}if(goldchickenspop-goldget>=0) {goldchickenspop-=goldget;}else {goldget=0;}total=normalget+ironget+goldget;

		$(".notifications").html("You killed "+total+" chicken(s) with a Chickenator 9999 and you got "+normalget+" piece(s) of chicken meat and "+ironget+" piece(s) of iron chicken meat and "+goldget+" piece(s) of gold chicken meat.");
		items[0].owned+=normalget;
		items[1].owned+=ironget;
		items[2].owned+=goldget;
	}

	if(items[0].owned==5) {
		if(!invtnotif) {
			$(".notifications").html("Inventory area and tab showed up");
			invtnotif=true;
		}
	}
	if(items[0].owned==8) {
		if(!tradernotif) {
			$(".notifications").html("Trader wants to trade with you");
			tradernotif=true;
		}
	}

	if(skills[0].owned) {
		countdown-=2;
	}
	cd(countdown,"slay-chicken","Slay chicken");

	update();

}

function trade(what) {
	if(what=="furnace") {
		if(items[0].owned>=5) {
			items[0].owned-=5;
			items[15].owned=1;
			$(".notifications").html("Furnace to cook stuff");
		}
	}
	else if(what=="workbench") {
		if(items[0].owned>=5) {
			items[0].owned-=5;
			items[16].owned=1;
			$(".notifications").html("Workbench to craft some items");
		}
	}
	else if(what=="portal") {
		if(items[0].owned>=500) {
			items[0].owned-=500;
			items[20].owned=1;
			$(".notifications").html("<i>\"The door to the adventure has been opened.\"</i>");
		}
	}
	else if(what=="scroll") {
		if(items[2].owned>=20) {
			items[2].owned-=20;
			items[17].owned=1;
			$(".notifications").html("The ancient scroll unlocks mechanic skills");
		}
	}
	else if(what=="furnace2") {
		if(items[0].owned>=200) {
			items[0].owned-=200;
			items[19].owned=1;
			$(".notifications").html("This better furnace allows you to smelt more things at once");
		}
	}
	else if(what=="furnace3") {
		if(items[0].owned>=1000) {
			items[0].owned-=1000;
			items[21].owned=1;
			$(".notifications").html("This much better furnace allows you to smelt 100 items at once");
		}
	}
	else if(what=="furnace4") {
		if(items[3].owned>=10) {
			items[3].owned-=10;
			items[27].owned=1;
			$(".notifications").html("This super furnace allows you to smelt 1000 items at once");
		}
	}
	else if(what=="scroll2") {
		if(items[0].owned>=300) {
			items[0].owned-=300;
			items[22].owned=1;
			$(".notifications").html("This ancient scroll unlocks armory skills");
		}
	}
	else if(what=="wheat") {
		if(items[12].owned>=1) {
			items[12].owned-=1;
			items[24].owned+=1;
			$(".notifications").html("Buying wheat to avoid irony");
			//At first I plan chicken nuggets will be used for breeding :o
		}
	}
	else if(what=="medicine") {
		if(items[24].owned>=30) {
			items[24].owned-=30;
			items[25].owned=1;
			$(".notifications").html("Medicines!");
		}
	}
	else if(what=="tpdevice") {
		if(items[3].owned>=2 && tpdevicestock>0) {
			items[3].owned-=2;
			items[26].owned+=1;
			tpdevicestock--;
			$(".notifications").html("Yay! This awesome stuff is really awesome! :D");
		}
	}
	else if(what=="compass") {
		if(items[14].owned>=100) {
			items[14].owned-=100;
			items[28].owned+=1;
			$(".notifications").html("You unlocked a new command in chickenverse 2.0!");
		}
	}
	update();
}

function breed(what) {
	if(what=="chicken") {
		if(items[24].owned>=1) {
			items[24].owned-=1;
			chickenspop+=10;
		}
	}
	else if(what=="iron chicken") {
		if(items[24].owned>=1) {
			items[24].owned-=1;
			ironchickenspop+=10;
		}
	}
	else if(what=="gold chicken") {
		if(items[24].owned>=1) {
			items[24].owned-=1;
			goldchickenspop+=10;
		}
	}
	else if(what=="medicine") {
		if(items[25].owned>=1) {
			items[25].owned-=1;
			breedinterval=1750;
		}
	}
	if(chickenspop>999999999999) {chickenspop=999999999999;}
	if(ironchickenspop>999999999999) {ironchickenspop=999999999999;}
	if(goldchickenspop>999999999999) {goldchickenspop=999999999999;}
	update();
}

function furnace(what,qty) {
	secs=3;
	if(skills[1].owned){secs=1;}
	if(what=="chicken nugget") {
		if(items[0].owned>=qty) {
			items[0].owned-=qty;
			items[10].owned+=qty;
			$(".notifications").html("Chicken nugget is delicious, yummy!");
			cdc(secs,"furnace-chicken-nugget","1 Chicken Meat -> 1 Chicken Nugget");
			cdc(secs,"furnace-chicken-nugget-ten","x10");
			cdc(secs,"furnace-chicken-nugget-hundred","x100");
			cdc(secs,"furnace-chicken-nugget-thousand","x1000");
		}
	}
	else if(what=="hardened chicken meat") {
		if(items[0].owned>=qty) {
			items[0].owned-=qty;
			items[5].owned+=qty;
			$(".notifications").html("This chicken meat is hardened to make it stronger, yay!");
			cdc(secs,"furnace-hardened-chicken-meat","1 Chicken Meat -> 1 Hardened Chicken Meat");
			cdc(secs,"furnace-hardened-chicken-meat-ten","x10");
			cdc(secs,"furnace-hardened-chicken-meat-hundred","x100");
			cdc(secs,"furnace-hardened-chicken-meat-thousand","x1000");
		}
	}
	else if(what=="iron chicken nugget") {
		if(items[1].owned>=qty) {
			items[1].owned-=qty;
			items[11].owned+=qty;
			$(".notifications").html("Iron chicken nugget is very delicious, yummy!");
			cdc(secs,"furnace-iron-chicken-nugget","1 Iron Chicken Meat -> 1 Iron Chicken Nugget");
			cdc(secs,"furnace-iron-chicken-nugget-ten","x10");
			cdc(secs,"furnace-iron-chicken-nugget-hundred","x100");
			cdc(secs,"furnace-iron-chicken-nugget-thousand","x1000");
		}
	}
	else if(what=="hardened iron chicken meat") {
		if(items[1].owned>=qty) {
			items[1].owned-=qty;
			items[6].owned+=qty;
			$(".notifications").html("This iron chicken meat is hardened to make it stronger, yay!");
			cdc(secs,"furnace-hardened-iron-chicken-meat","1 Iron Chicken Meat -> 1 Hardened Iron Chicken Meat");
			cdc(secs,"furnace-hardened-iron-chicken-meat-ten","x10");
			cdc(secs,"furnace-hardened-iron-chicken-meat-hundred","x100");
			cdc(secs,"furnace-hardened-iron-chicken-meat-thousand","x1000");
		}
	}
	else if(what=="gold chicken nugget") {
		if(items[2].owned>=qty) {
			items[2].owned-=qty;
			items[12].owned+=qty;
			$(".notifications").html("Gold chicken nugget is more delicious than iron chicken nugget, yummy!");
			cdc(secs,"furnace-gold-chicken-nugget","1 Gold Chicken Meat -> 1 Gold Chicken Nugget");
			cdc(secs,"furnace-gold-chicken-nugget-ten","x10");
			cdc(secs,"furnace-gold-chicken-nugget-hundred","x100");
			cdc(secs,"furnace-gold-chicken-nugget-thousand","x1000");
		}
	}
	else if(what=="hardened gold chicken meat") {
		if(items[2].owned>=qty) {
			items[2].owned-=qty;
			items[7].owned+=qty;
			$(".notifications").html("This gold chicken meat is hardened to make it stronger, yay!");
			cdc(secs,"furnace-hardened-gold-chicken-meat","1 Gold Chicken Meat -> 1 Hardened Gold Chicken Meat");
			cdc(secs,"furnace-hardened-gold-chicken-meat-ten","x10");
			cdc(secs,"furnace-hardened-gold-chicken-meat-hundred","x100");
			cdc(secs,"furnace-hardened-gold-chicken-meat-thousand","x1000");
		}
	}
	else if(what=="diamond chicken nugget") {
		if(items[3].owned>=qty) {
			items[3].owned-=qty;
			items[13].owned+=qty;
			$(".notifications").html("Diamond chicken nugget is very very delicious asdfhvryuiery");
			cdc(secs,"furnace-diamond-chicken-nugget","1 Diamond Chicken Meat -> 1 Diamond Chicken Nugget");
			cdc(secs,"furnace-diamond-chicken-nugget-ten","x10");
			cdc(secs,"furnace-diamond-chicken-nugget-hundred","x100");
			cdc(secs,"furnace-diamond-chicken-nugget-thousand","x1000");
		}
	}
	else if(what=="hardened diamond chicken meat") {
		if(items[3].owned>=qty) {
			items[3].owned-=qty;
			items[8].owned+=qty;
			$(".notifications").html("This diamond chicken meat is hardened to make it stronger, yay!");
			cdc(secs,"furnace-hardened-diamond-chicken-meat","1 Diamond Chicken Meat -> 1 Hardened Diamond Chicken Meat");
			cdc(secs,"furnace-hardened-diamond-chicken-meat-ten","x10");
			cdc(secs,"furnace-hardened-diamond-chicken-meat-hundred","x100");
			cdc(secs,"furnace-hardened-diamond-chicken-meat-thousand","x1000");
		}
	}
	else if(what=="emerald chicken nugget") {
		if(items[4].owned>=qty) {
			items[4].owned-=qty;
			items[14].owned+=qty;
			$(".notifications").html("Emerald chicken nugget is super delicious, although I believe emerald chicken nugget is more delicious, though");
			cdc(secs,"furnace-emerald-chicken-nugget","1 Emerald Chicken Meat -> 1 Emerald Chicken Nugget");
			cdc(secs,"furnace-emerald-chicken-nugget-ten","x10");
			cdc(secs,"furnace-emerald-chicken-nugget-hundred","x100");
			cdc(secs,"furnace-emerald-chicken-nugget-thousand","x1000");
		}
	}
	else if(what=="hardened emerald chicken meat") {
		if(items[4].owned>=qty) {
			items[4].owned-=qty;
			items[9].owned+=qty;
			$(".notifications").html("This emerald chicken meat is hardened to make it stronger, yay!");
			cdc(secs,"furnace-hardened-emerald-chicken-meat","1 Emerald Chicken Meat -> 1 Hardened Emerald Chicken Meat");
			cdc(secs,"furnace-hardened-emerald-chicken-meat-ten","x10");
			cdc(secs,"furnace-hardened-emerald-chicken-meat-hundred","x100");
			cdc(secs,"furnace-hardened-emerald-chicken-meat-thousand","x1000");
		}
	}
	update();
}
function craft(what) {
	if(what=="chicken sword") {
		if(items[5].owned>=10) {
			tool=1;
			items[5].owned-=10;
			$(".notifications").html("Chicken sword to kill more chickens faster");
		}
	}
	else if(what=="iron chicken sword") {
		if(items[6].owned>=10) {
			tool=2;
			items[6].owned-=10;
			$(".notifications").html("Iron chicken sword to kill more chickens than chicken sword");
		}
	}
	else if(what=="gold chicken sword") {
		if(items[7].owned>=10) {
			tool=3;
			items[7].owned-=10;
			$(".notifications").html("Gold chicken sword for the win!!!");
		}
	}
	else if(what=="diamond chicken sword") {
		if(items[8].owned>=10) {
			tool=4;
			items[8].owned-=10;
			$(".notifications").html("DIAMOND CHICKEN SWORD!!!");
		}
	}
	else if(what=="emerald chicken sword") {
		if(items[9].owned>=10) {
			tool=5;
			items[9].owned-=10;
			$(".notifications").html("I'm ready for the chickenators! :D");
		}
	}
	else if(what=="robot") {
		if(items[11].owned>=Math.round(Math.pow(10*(items[18].owned+1),1.5))) {
			items[11].owned-=Math.round(Math.pow(10*(items[18].owned+1),1.5));
			items[18].owned++;
			$(".notifications").html("One more robot to slay more chickens");
		}
	}
	else if(what=="robot-destroy") {
		if(items[18].owned>=1) {
			items[18].owned--;
			$(".notifications").html("You have destroyed a robot, too bad you don't get anything");
		}
	}

	else if(what=="chicken helmet") {
		if(items[5].owned>=50) { helmet=1; items[5].owned-=50; $(".notifications").html("You are now equipped with chicken helmet"); }
	}
	else if(what=="chicken chestplate") {
		if(items[5].owned>=100) { chestplate=1; items[5].owned-=100; $(".notifications").html("You are now equipped with chicken chestplate"); }
	}
	else if(what=="chicken leggings") {
		if(items[5].owned>=75) { leggings=1; items[5].owned-=75; $(".notifications").html("You are now equipped with chicken leggings"); }
	}
	else if(what=="chicken boots") {
		if(items[5].owned>=25) { boots=1; items[5].owned-=25; $(".notifications").html("You are now equipped with chicken boots"); }
	}

	else if(what=="iron chicken helmet") {
		if(items[6].owned>=50) { helmet=2; items[6].owned-=50; $(".notifications").html("You are now equipped with iron chicken helmet"); }
	}
	else if(what=="iron chicken chestplate") {
		if(items[6].owned>=100) { chestplate=2; items[6].owned-=100; $(".notifications").html("You are now equipped with iron chicken chestplate"); }
	}
	else if(what=="iron chicken leggings") {
		if(items[6].owned>=75) { leggings=2; items[6].owned-=75; $(".notifications").html("You are now equipped with iron chicken leggings"); }
	}
	else if(what=="iron chicken boots") {
		if(items[6].owned>=25) { boots=2; items[6].owned-=25; $(".notifications").html("You are now equipped with iron chicken boots"); }
	}

	else if(what=="gold chicken helmet") {
		if(items[7].owned>=50) { helmet=3; items[7].owned-=50; $(".notifications").html("You are now equipped with gold chicken helmet"); }
	}
	else if(what=="gold chicken chestplate") {
		if(items[7].owned>=100) { chestplate=3; items[7].owned-=100; $(".notifications").html("You are now equipped with gold chicken chestplate"); }
	}
	else if(what=="gold chicken leggings") {
		if(items[7].owned>=75) { leggings=3; items[7].owned-=75; $(".notifications").html("You are now equipped with gold chicken leggings"); }
	}
	else if(what=="gold chicken boots") {
		if(items[7].owned>=25) { boots=3; items[7].owned-=25; $(".notifications").html("You are now equipped with gold chicken boots"); }
	}

	else if(what=="diamond chicken helmet") {
		if(items[8].owned>=50) { helmet=4; items[8].owned-=50; $(".notifications").html("You are now equipped with diamond chicken helmet"); }
	}
	else if(what=="diamond chicken chestplate") {
		if(items[8].owned>=100) { chestplate=4; items[8].owned-=100; $(".notifications").html("You are now equipped with diamond chicken chestplate"); }
	}
	else if(what=="diamond chicken leggings") {
		if(items[8].owned>=75) { leggings=4; items[8].owned-=75; $(".notifications").html("You are now equipped with diamond chicken leggings"); }
	}
	else if(what=="diamond chicken boots") {
		if(items[8].owned>=25) { boots=4; items[8].owned-=25; $(".notifications").html("You are now equipped with diamond chicken boots"); }
	}

	else if(what=="emerald chicken helmet") {
		if(items[9].owned>=50) { helmet=5; items[9].owned-=50; $(".notifications").html("You are now equipped with emerald chicken helmet"); }
	}
	else if(what=="emerald chicken chestplate") {
		if(items[9].owned>=100) { chestplate=5; items[9].owned-=100; $(".notifications").html("You are now equipped with emerald chicken chestplate"); }
	}
	else if(what=="emerald chicken leggings") {
		if(items[9].owned>=75) { leggings=5; items[9].owned-=75; $(".notifications").html("You are now equipped with emerald chicken leggings"); }
	}
	else if(what=="emerald chicken boots") {
		if(items[9].owned>=25) { boots=5; items[9].owned-=25; $(".notifications").html("You are now equipped with emerald chicken boots"); }
	}

	if(what.split(" ")[0]=="chickenator") {

		version=what.split(" ")[1];
		if(version==1000){thetool=6; times=1; text="Finally a chickenator! :o"}
		if(version==2000){thetool=7; times=1; text="Chickenator 2000 rocks! \\m/"}
		if(version==4000){thetool=8; times=2; text="Woohoo! Chickenator 4000!"}
		if(version==8000){thetool=9; times=4; text="Chickenator 8000 is so amazing O.O"}
		if(version==9000){thetool=10; times=1; text="One more step!"}
		if(version==9999){thetool=11; times=1; text="THE BEST WEAPON EVAR!!!"}

		if(items[9].owned>=times && items[8].owned>=times*10 && items[7].owned>=times*100 && items[6].owned>=times*1000 &&items[5].owned>=times*10000) {
			tool=thetool;
			items[5].owned-=times*10000;
			items[6].owned-=times*1000;
			items[7].owned-=times*100;
			items[8].owned-=times*10;
			items[9].owned-=times*1;
			$(".notifications").html(text);
		}

	}

	update();
}
function skill(what) {
	if(what=="speed") {
		if(items[10].owned>=25) {
			items[10].owned-=25;
			skills[0].owned=true;
			$(".notifications").html(skills[0].desc);
		}
	}
	else if(what=="cooking") {
		if(items[11].owned>=25) {
			items[11].owned-=25;
			skills[1].owned=true;
			$(".notifications").html(skills[1].desc);
		}
	}
	else if(what=="mechanics") {
		if(items[11].owned>=50) {
			items[11].owned-=50;
			skills[2].owned=true;
			$(".notifications").html(skills[2].desc);
		}
	}
	else if(what=="exploration") {
		if(items[12].owned>=Math.round(Math.pow(10*(skills[3].level+1),0.8))) {
			items[12].owned-=Math.round(Math.pow(10*(skills[3].level+1),0.8));
			skills[3].level++;
			skills[3].owned=true;
			$(".notifications").html(skills[3].desc.replace("{km}",5+parseInt(skills[3].level)));
		}
	}
	else if(what=="armory") {
		if(items[11].owned>=200) {
			items[11].owned-=200;
			skills[4].owned=true;
			$(".notifications").html(skills[4].desc);
		}
	}
	else if(what=="statistics") {
		if(items[7].owned>=100) {
			items[7].owned-=100;
			skills[5].owned=true;
			$(".notifications").html(skills[5].desc);
		}
	}
	else if(what=="teleportation") {
		if(items[3].owned>=10) {
			items[3].owned-=10;
			skills[6].owned=true;
			$(".notifications").html(skills[6].desc);
		}
	}
	else if(what=="metabolism") {
		if(items[3].owned>=5) {
			items[3].owned-=5;
			skills[7].owned=true;
			$(".notifications").html(skills[7].desc);
		}
	}
	update();
}

function rolldice() {
	qty=$("#dicegame-qty").val();
	what=$("#dicegame-what").val();
	if(!isNaN(parseFloat(qty)) && parseFloat(qty) != "") {
		qty=Math.abs(Math.round(parseFloat(qty)));
		if(qty>items[what].owned) {
			alert('You can\'t give what you don\'t have :(');
		}
		else {
			items[what].owned-=qty;
			diceroll=getRandomInt(1,6);
			if(diceroll == 1 || diceroll == 6) {
				$("#dicegame-result").html("The dice lands on number "+diceroll+" and you get "+(qty*3)+" "+items[what].name+"s!");
				items[what].owned+=qty*3;
			}
			else {
				$("#dicegame-result").html("The dice lands on number  "+diceroll+" and you get nothing :(");
			}
		}
	}
	update();
}

function chickenatorprice() {
	if(tool<=5){weaponversion=1000; times=1;}
	if(tool==6){weaponversion=2000; times=1;}
	if(tool==7){weaponversion=4000; times=2;}
	if(tool==8){weaponversion=8000; times=4;}
	if(tool==9){weaponversion=9000; times=1;}
	if(tool==10){weaponversion=9999; times=1;}

	if(tool==5) {
		beginword='To craft a Chickenator '+weaponversion;
	}
	else {
		beginword='To upgrade your current Chickenator to Chickenator '+weaponversion;
	}

	alert(beginword+', you will need:\n\n'+times+' Hardened Emerald Chicken Meat\n'+times*10+' Hardened Diamond Chicken Meats\n'+times*100+' Hardened Gold Chicken Meats\n'+times*1000+' Hardened Iron Chicken Meats\n'+times*10000+' Hardened Chicken Meats');
}

function cipherclue() {
	if(items[14].owned<1) {
		alert('Oops, you doesn\'t seem have an emerald chicken nugget');
	}
	else {
		items[14].owned--;
		update();
		$(".cipher-clue-button").hide();
		$("#cipherclue").show();
	}
}

/* PORTAL STUFFS */

setInterval(function() {
	if(exploring) {
		totaldmg=0;
		for(i=0;i<enemies.length;i++) {
			if(!enemies[i].isdead) {
				totaldmg+=enemies[i].dmg;
			}
		}
		playerhp-=totaldmg;
		if(playerhp<=0 && !endgame) {
			playerhp=1;
			cd(Math.round(kmexplored/10),"enter-portal","enter the portal!");
			exitportal("die");
			$(".notifications").html("You almost died in battle, phew!");
		}


		update_battle();
		update();
	}
},2500);
function numbertotext(nbr) {
	if(nbr==0) {
		return "None";
	}
	else if(nbr==1) {
		return "Chicken";
	}
	else if(nbr==2) {
		return "Iron Chicken";
	}
	else if(nbr==3) {
		return "Gold Chicken";
	}
	else if(nbr==4) {
		return "Diamond Chicken";
	}
	else if(nbr==5) {
		return "Emerald Chicken";
	}
	else {
		return nbr;
	}
}
function update_battle() {
	$("#battle-log").html("");
	$("#enemycardarea").html("");
	$(".km-explored").html(kmexplored);
	$("#player-hp").html(playerhp);
	$("#player-maxhp").html(playerhpmax);
	$("#player-helmet").html(numbertotext(helmet));
	$("#player-chestplate").html(numbertotext(chestplate));
	$("#player-leggings").html(numbertotext(leggings));
	$("#player-boots").html(numbertotext(boots));

	if(tool==0) {
		playerdmg=1;
		playerweapon="Fists :o";
	}
	else if(tool==1) {
		playerdmg=2;
		playerweapon="Chicken Sword";
	}
	else if(tool==2) {
		playerdmg=3;
		playerweapon="Iron Chicken Sword";
	}
	else if(tool==3) {
		playerdmg=4;
		playerweapon="Gold Chicken Sword";
	}
	else if(tool==4) {
		playerdmg=5;
		playerweapon="Diamond Chicken Sword";
	}
	else if(tool==5) {
		playerdmg=6;
		playerweapon="Emerald Chicken Sword";
	}
	else if(tool==6) {
		playerdmg=7;
		playerweapon="Chickenator 1000";
	}
	else if(tool==7) {
		playerdmg=8;
		playerweapon="Chickenator 2000";
	}
	else if(tool==8) {
		playerdmg=10;
		playerweapon="Chickenator 4000";
	}
	else if(tool==9) {
		playerdmg=14;
		playerweapon="Chickenator 8000";
	}
	else if(tool==10) {
		playerdmg=15;
		playerweapon="Chickenator 9000";
	}
	else if(tool==11) {
		playerdmg=16;
		playerweapon="Chickenator 9999";
	}

	if(battleinvt[2].owned>0 && kmexplored!=0) {
		$("#use-tpdevice").css("display","inline-block");
		if(tpdevicekm!=kmexplored) {
			$("#use-tpdevice input").removeAttr("disabled");
			console.log(tpdevicekm);
		}
		else {
			$("#use-tpdevice input").attr("disabled","disabled");
		}
	}
	else {
		$("#use-tpdevice").hide();
	}

	$("#player-dmg").html(playerdmg);
	$("#player-weapon").html(playerweapon);

	if(enemies.length==0) {
		asddsa="a";
	}
	else {
		asddsa=enemies[0].name;
	}

	if(asddsa!="cliff") {

		if(explorechickenverse2) {
			divname="enemycardarea";
		}
		else {
			divname="battle-log";
		}

		bl=$("#"+divname).html();
		totalenemies=0;
		for(i=0;i<enemies.length;i++) {
			if(!enemies[i].isdead) {
				if(enemies[i].iscd==0) {
					atkbutton='<input type="button" value="Attack!" onclick="attackenemy('+i+')" id="attack-enemy-'+i+'">';
				}
				else {
					atkbutton='<input type="button" value="Attack! ['+enemies[i].iscd+']" onclick="attackenemy('+i+')" id="attack-enemy-'+i+'" disabled="disabled">';
				}

				if(enemies[i].name.substr(0,5)=="Angry") {
					additionalclass=" angry";
				}
				else if(enemies[i].name.substr(0,5)=="Crazy") {
					additionalclass=" crazy";
				}
				else {
					additionalclass="";
				}

				$("#"+divname).html(bl+'<div class="enemy-card'+additionalclass+'"><b>'+enemies[i].name+'</b><br>HP: '+enemies[i].hp+' / '+enemies[i].maxhp+'<br>Damage: '+enemies[i].dmg+'<br>'+atkbutton+'</div>');
				if(enemies[i].drop!=999999) {
					totalenemies++;
				}
			}
			else {
				for(k=0;k<drops.length;k++) {
					if(drops[k].id==enemies[i].id) {
						thisdrop=drops[k];
						break;
					}
				}
				if(!thisdrop.taken) {
					if(thisdrop.from!="no show") {
						if(thisdrop.iscd==0) {
							takebutton='<input type="button" value="Take!" onclick="takedrop('+enemies[i].id+')" id="take-drop-'+enemies[i].id+'">';
						}
						else {
							takebutton='<input type="button" value="Take! ['+thisdrop.iscd+']" onclick="takedrop('+enemies[i].id+')" id="take-drop-'+enemies[i].id+'">';
						}

						asddsa=thisdrop.drop;
						$("#"+divname).html(bl+'<div class="enemy-card ec-drop">The <b>'+thisdrop.from+'</b> drops a piece of '+items[asddsa].name+takebutton+'</div>');
					}
					else {
						$("#"+divname).html(bl+'<div class="enemy-card" style="opacity:0;"></div>');
					}
				}
				else {
					$("#"+divname).html(bl+'<div class="enemy-card" style="opacity:0;"></div>');
				}
			}
			bl=$("#"+divname).html();
		}
		$("#enemycardarea").html($("#enemycardarea").html()+"<br><br>");

	} //end if name cliff
	else {
		getscroll=true;
scroll='\n\
   _______________________________________________________\n\
 =(__    ___      __    _____   ___    __      ____  _    _)=\n\
   |                                                      |\n\
   |  Hello, wanderer! If you wonder who am I, I\'m just   |\n\
   |  a wanderer, like you too!                           |\n\
   |                                                      |\n\
   |  I think I know what you are thinking right now,     |\n\
   |  you wonder why there is a cliff right? And where    |\n\
   |  in the world are those chickens especially the      |\n\
   |  ruby ones (as we all know, everyone wants to eat    |\n\
   |  ruby chicken nugget!)                               |\n\
   |                                                      |\n\
   |  It is said that the ruby meat doesn\'t come from a   |\n\
   |  ruby chicken, but a legendary mutant chicken that   |\n\
   |  lives somewhere in the chickenverse, and currently  |\n\
   |  I\'m searching for it to kill it, I hope you will    |\n\
   |  search for it too!                                  |\n\
   |                                                      |\n\
   |  In this chest, I have included how you can make a   |\n\
   |  strong weapon that I named "Chickenator", this      |\n\
   |  weapon is strong and has many versions, the one     |\n\
   |  I give you is Chickenator 1000 and you can make     |\n\
   |  better versions like Chickenator 2000 till the      |\n\
   |  Chickenator 9999!                                   |\n\
   |__    ___   __    ___  ______    _____        ___     |\n\
 =(________________________________________________________)=\n\
';
		$("#battle-log").html("You ended up in a cliff<br>You wondered why there is a cliff<br>No more chickens????<br><br>But you found a chest that contains this scroll:<br><pre>"+scroll+"</pre>");
		$(".notifications").html("Hmm... maybe the trader knows something about the legendary mutant chicken");
	}

	if(kmexplored==0 && tpdevicekm!=0) {
		$("#battle-log").html('<input type="button" value="Teleport to the teleport device! ('+tpdevicekm+' km)" id="button-tp" onclick="tptotpdevice()">');
	}

	if(totalenemies==0) {
		thereisenemy=false;
		healcd=false;
		$("#exit-portal").removeAttr("disabled");
		if(battleinvt[0].owned<=0) {
			$("#explore-further").attr("disabled","disabled");
		}
		else {
			if(kmexplored<1800) {
				$("#explore-further").removeAttr("disabled");
			}
			else {
				$("#explore-further").attr("disabled","disabled");
			}
		}
	}
	else {
		thereisenemy=true;
		healcd=true;
		$("#explore-further").attr("disabled","disabled");
		$("#exit-portal").attr("disabled","disabled");
	}

	/*totaldrops=0;
	for(i=0;i<drops.length;i++) {
		if(!drops[i].taken) {

			if(drops[i].iscd==0) {
				takebutton='<input type="button" value="Take!" onclick="takedrop('+i+')" id="take-drop-'+i+'">';
			}
			else {
				takebutton='<input type="button" value="Take! ['+drops[i].iscd+']" onclick="takedrop('+i+')" id="take-drop-'+i+'">';
			}

			asddsa=drops[i].drop;
			$("#battle-log").html(bl+'<div class="enemy-card ec-drop">The <b>'+drops[i].from+'</b> drops a piece of '+items[asddsa].name+takebutton+'</div>');
			totaldrops++;
		}
		if(totaldrops==0 && i==drops.length-1) {
			drops=[];
		}
		bl=$("#battle-log").html();
	}*/

	update();
}

function reset_battle() {
	kmexplored=0;
	enemies=[];
	drops=[];
}
function enterportal() {
	cnqty=$("#bring-cn").val();
	icnqty=$("#bring-icn").val();
	tpdqty=$("#bring-tpd").val();
	if(!isNaN(parseFloat(cnqty)) && cnqty != "") {
		if(!isNaN(parseFloat(icnqty)) && icnqty != "") {
			if(!isNaN(parseFloat(tpdqty)) && tpdqty != "") {
				cnqty=Math.abs(Math.round(parseFloat(cnqty)));
				icnqty=Math.abs(Math.round(parseFloat(icnqty)));
				tpdqty=Math.abs(Math.round(parseFloat(tpdqty)));

				if(cnqty>items[10].owned || icnqty>items[11].owned || tpdqty>items[26].owned) {
					alert('You can\'t bring what you don\'t have');
				}
				else {

					items[10].owned-=cnqty;
					items[11].owned-=icnqty;
					items[26].owned-=tpdqty;
					battleinvt.push({itemid:10, owned:cnqty});
					battleinvt.push({itemid:11, owned:icnqty});
					battleinvt.push({itemid:26, owned:tpdqty});
					save('local');

					playerhp=100+helmet*10+chestplate*20+leggings*15+boots*5;
					playerhpmax=100+helmet*10+chestplate*20+leggings*15+boots*5;

					if(redditspecialstep>=4) {
						playerhp+=100;
						playerhpmax+=100;
					}

					update_battle();
					$("#player-stats").show();
					$("#before-adventure, #tab, #inventory").hide();
					exploring=true;
					reset_battle();


					if(cnqty==1234&&icnqty==567) {
						explorechickenverse2=true;
						$("#chickenverse2").show();
						$("#textbased-input").focus();
						if(!getscroll) {
							$("#notificationlog").html("<p>You don't know where you currently are<br>In front of you you see a mysterious hole, but you think you shouldn't go there</p>");
						}
						else {
							$("#notificationlog").html("<p>You are now here, at the Chickenverse 2.0<br>In front of you there is a mysterious hole</p>");

							rooms=[];
							newrooms=[];
							playerlocation="outside2";
							thereisroom=false;
							pathnotorch=false;

							addroom(1000,1000,"c");
							chance=0.5;

							generatepath(1000,1001,"n",1);
							generatepath(1001,1000,"e",1);
							generatepath(999,1000,"w",1);
							generatepath(1000,999,"s",1);

							$("#textbased-input").val("");
							$("#textbased-input").focus();

							/*for(i=0;i<newrooms.length;i++) {

							    if(caverooms>=roomlimit) {
							        console.log("limit");
							        break;
							    }

							    x=parseInt(newrooms[i].x);
							    y=parseInt(newrooms[i].y);
							    z=false;

								console.log("i "+i);

							    if(Math.random()<0.45 && newrooms[i].a) {
									//if(!roomexist(x-2,y) && !roomexist(x-1,y-1) && !roomexist(x-1,y-2) && !roomexist(x-1,y)) {
										addroom(x-1,y);
										addroomn(x-1,y);
										z=true;
									//}
							    }
							    if(Math.random()<0.45 && newrooms[i].a) {
									//if(!roomexist(x+2,y) && !roomexist(x+1,y-1) && !roomexist(x+1,y+1) && !roomexist(x+1,y)) {
										addroom(x+1,y);
										addroomn(x+1,y);
										z=true;
									//}
							    }
							    if(Math.random()<0.45 && newrooms[i].a) {
									//if(!roomexist(x,y+2) && !roomexist(x-1,y+1) && !roomexist(x+1,y+1) && !roomexist(x,y+1)) {
										addroom(x,y+1);
										addroomn(x,y+1);
										z=true;
									//}
							    }
							    if(Math.random()<0.45 && newrooms[i].a) {
									//if(!roomexist(x,y-2) && !roomexist(x-1,y-1) && !roomexist(x+1,y-1) && !roomexist(x,y-1)) {
										addroom(x,y-1);
										addroomn(x,y-1);
										z=true;
									//}
							    }
								console.log(rooms.length+" rooms");
							    if(z)removeroomn(i);

							    caverooms++;

							}*/

						}
					}
					else {
						$(".notifications").html("Never hesitate to explore, just explore as far as you can! Something is waiting you at the end...");
						$("#adventure").show();
					}

				}
			}
		}
	}
}
function exitportal(reason) {
	save('local');
	update_battle();
	$("#before-adventure, #tab, #inventory").show();
	$("#adventure, #chickenverse2, #player-stats, #bossbattleftw").hide();
	exploring=false;
	reset_battle();

	if(reason=="button") {
		for(e=0;e<battleinvt.length;e++) {
			items[battleinvt[e].itemid].owned+=battleinvt[e].owned;
		}
	}

	update();
	battleinvt=[];

}
function explorefurther() {

	enemies=[];
	drops=[];

	for(i=0;i<dropscd.length;i++) {
		clearTimeout(dropscd[i]);
	}

	kmexplored+=5;
	kmexplored+=skills[3].level;
	battleinvt[0].owned-=1;

	if(kmexplored>=50) {
		if(!tradebetterfurnace) {
			tradebetterfurnace=true;
			$(".notifications").html("Trader has something more to trade with you or maybe you want to play a game??");
			update();
		}
	}

	if(kmexplored>=300) {
		if(!introducetp) {
			introducetp=true;
			$(".notifications").html("Now you can learn new skills!");
			update();
		}
	}

	if(kmexplored>=20 && kmexplored<30) {
		if(getRandomInt(1,3)!=1) {
			a=getRandomInt(1,3);
			for(nbr=0;nbr<a;nbr++) {
				makeenemy("Chicken",0,1,0);
			}
		}
	}
	else if(kmexplored>=30 && kmexplored<40) { //more intense battle
		if(Math.random()<0.5) {
			a=getRandomInt(2,4);
			for(nbr=0;nbr<a;nbr++) {
				makeenemy("Chicken",0,1,0);
			}
		}
	}
	else if(kmexplored>=40 && kmexplored<50) { //more intense!
		a=getRandomInt(2,5);
		for(nbr=0;nbr<a;nbr++) {
			if(Math.random()<0.5) {
				if(Math.random()<0.5) {
					makeenemy("Chicken",0,1,0);
				}
				else {
					makeenemy("Angry Chicken",0,1,1);
				}
			}
			else {
				makeenemy("Iron Chicken",1,3,0);
			}
		}
	}
	else if(kmexplored>=50 && kmexplored<80) { //intenser!!! (RIP English)
		a=getRandomInt(3,7);
		for(nbr=0;nbr<a;nbr++) {
			b=getRandomInt(1,3);
			if(b==1) {
				if(Math.random()<0.5) {
					makeenemy("Chicken",0,1,0);
				}
				else {
					makeenemy("Angry Chicken",0,1,1);
				}
			}
			else if(b==2) {
				if(Math.random()<0.5) {
					makeenemy("Iron Chicken",1,3,0);
				}
				else {
					makeenemy("Angry Iron Chicken",1,3,2);
				}
			}
			else {
				makeenemy("Gold Chicken",2,5,0);
			}
		}
	}
	else if(kmexplored>=80 && kmexplored<100) { //intense++; (with glitched chicken)
		a=getRandomInt(5,8);
		for(nbr=0;nbr<a;nbr++) {
			b=getRandomInt(1,6);
			if(b==1) {
				if(Math.random()<0.5) {
					makeenemy("Chicken",0,1,0);
				}
				else {
					makeenemy("Angry Chicken",0,1,1);
				}
			}
			else if(b==2 || b==3) {
				if(Math.random()<0.5) {
					makeenemy("Iron Chicken",1,3,0);
				}
				else {
					makeenemy("Angry Iron Chicken",1,3,2);
				}
			}
			else {
				if(Math.random()<0.5) {
					makeenemy("Gold Chicken",2,5,0);
				}
				else {
					makeenemy("Angry Gold Chicken",2,5,4);
				}
			}
		}
		makeenemy("Glitched Chicken",999999,1,0);
	}
	else if(kmexplored>=100 && kmexplored<150) { //super
		a=getRandomInt(5,8);
		for(nbr=0;nbr<a;nbr++) {
			b=getRandomInt(1,7);
			if(b==1) {
				makeenemy("Angry Chicken",0,1,1);
			}
			else if(b==2 || b==3) {
				if(Math.random()<0.3) {
					makeenemy("Iron Chicken",1,3,0);
				}
				else {
					makeenemy("Angry Iron Chicken",1,3,2);
				}
			}
			else if(b>=4 && b<=6){
				if(Math.random()<0.4) {
					makeenemy("Gold Chicken",2,5,0);
				}
				else {
					makeenemy("Angry Gold Chicken",2,5,4);
				}
			}
			else {
				makeenemy("Glitched Chicken",999999,1,0);
			}
		}
	}
	else if(kmexplored>=150 && kmexplored<200) { //wow :o
		a=getRandomInt(5,8);
		for(nbr=0;nbr<a;nbr++) {
			b=getRandomInt(1,7);
			if(b==1) {
				makeenemy("Angry Chicken",0,1,1);
			}
			else if(b==2 || b==3) {
					makeenemy("Angry Iron Chicken",1,3,2);
			}
			else if(b>=4 && b<=6) {
				if(Math.random()<0.3) {
					makeenemy("Gold Chicken",2,5,0);
				}
				else {
					makeenemy("Angry Gold Chicken",2,5,4);
				}
			}
			else {
				makeenemy("Glitched Chicken",999999,1,0);
			}
		}
	}
	else if(kmexplored>=200 && kmexplored<250) { //introducing: diamond chickens + angry glitched chickens!
		a=getRandomInt(5,8);
		for(nbr=0;nbr<a;nbr++) {
			b=getRandomInt(1,65);
			if(b<10) {
				makeenemy("Angry Iron Chicken",1,3,2);
			}
			else if(b>=10 && b<=40) {
				makeenemy("Diamond Chicken",3,7,3);
			}
			else if(b>40 && b<=50) {
				makeenemy("Angry Gold Chicken",2,5,4);
			}
			else {
				if(Math.random()<0.5) {
					makeenemy("Glitched Chicken",999999,1,0);
				}
				else {
					makeenemy("Angry Glitched Ch.",999999,1,1);
				}
			}
		}
	}
	else if(kmexplored>=250 && kmexplored<350) { //collect those diamond chicken meats!
		a=getRandomInt(5,8);
		for(nbr=0;nbr<a;nbr++) {
			b=getRandomInt(1,50);
			if(b>=35) {
				makeenemy("Diamond Chicken",3,7,3);
			}
			else {
				makeenemy("Angry Gold Chicken",2,5,4);
			}
			if(Math.random()<0.3) {
				if(Math.random()<0.3) {
					makeenemy("Glitched Chicken",999999,1,0);
				}
				else {
					makeenemy("Angry Glitched Ch.",999999,1,2);
				}
			}
		}
	}
	else if(kmexplored>=350 && kmexplored<500) { //150km of boringness (maybe)
		a=getRandomInt(5,9);
		for(nbr=0;nbr<a;nbr++) {
			b=getRandomInt(1,90);
			if(b<=30) {
				makeenemy("Diamond Chicken",3,7,3);
			}
			else if(b>30 && b<=50) {
				if(Math.random()<0.3) {
					makeenemy("Glitched Chicken",999999,1,0);
				}
				else {
					makeenemy("Angry Glitched Ch.",999999,1,3);
				}
			}
			else {
				makeenemy("Angry Diamond Ch.",3,7,6);
			}
		}
	}
	else if(kmexplored>=500 && kmexplored<600) { //EMERALD CHICKEN!!!
		a=getRandomInt(7,9);
		for(nbr=0;nbr<a;nbr++) {
			b=getRandomInt(1,90);
			if(b<=5) {
				makeenemy("Emerald Chicken",4,10,5);
			}
			else if(b>30 && b<=50) {
				if(Math.random()<0.3) {
					makeenemy("Glitched Chicken",999999,1,0);
				}
				else {
					makeenemy("Angry Glitched Ch.",999999,1,3);
				}
			}
			else {
				makeenemy("Angry Diamond Ch.",3,7,6);
			}
		}
	}
	else if(kmexplored>=600 && kmexplored<750) { //CRAZY GLITCHED CHICKEN :o
		a=getRandomInt(7,9);
		for(nbr=0;nbr<a;nbr++) {
			b=getRandomInt(1,30);
			if(b<=5) {
				makeenemy("Emerald Chicken",4,10,5);
			}
			else if(b>=6 && b<=20) {
				makeenemy("Angry Diamond Ch.",3,7,6);
			}
			else {
				if(Math.random()<0.3) {
					makeenemy("Crazy Glitched Ch.",999999,1,6);
				}
				else {
					makeenemy("Angry Glitched Ch.",999999,1,3);
				}
			}
		}
	}
	else if(kmexplored>=750 && kmexplored<1500) { //CRAZY GLITCHED CHICKEN :o
		a=getRandomInt(7,9);
		for(nbr=0;nbr<a;nbr++) {
			b=getRandomInt(1,50);
			if(b<=5) {
				makeenemy("Emerald Chicken",4,10,5);
			}
			else if(b>=6 && b<=10) {
				makeenemy("Angry Emerald Ch.",4,10,8);
			}
			else if(b>=11 && b<=35) {
				makeenemy("Angry Diamond Ch.",3,7,6);
			}
			else {
				if(Math.random()<0.3) {
					makeenemy("Crazy Glitched Ch.",999999,1,6);
				}
				else {
					makeenemy("Angry Glitched Ch.",999999,1,3);
				}
			}
		}
	}
	else if(kmexplored>=1500 && kmexplored<1600) {
		if(rubysearchstep==0)$(".notifications").html("It's weird since there are no more chickens :/");
	}
	else if(kmexplored>=1600 && kmexplored<1700) {
		if(rubysearchstep==0)$(".notifications").html("Where is the ruby chicken? I wanna eat ruby chicken nuggets so bad");
	}
	else if(kmexplored>=1700 && kmexplored<1800) {
		if(rubysearchstep==0)$(".notifications").html("This is my new mission! (Check title bar)");
		rubysearchstep++;
	}
	else if(kmexplored>=1800) {
		makeenemy("cliff",0,0,0);
	}

	if(rubysearchstep>0){if(kmexplored>=1500 && kmexplored<1800)$(".notifications").html("Still no chickens :/");}

	if(kmexplored>=100 && items[23].owned==0) {
		makeenemy("Chest",23,15,0);
	}

	update_battle();
}
function attackenemy(i) {
	enemies[i].hp-=playerdmg;

	if(enemies[i].hp<=0) {
		enemies[i].hp=0;
		enemies[i].isdead=true;
		if(enemies[i].drop!=999999) {
			if(Math.random() < enemies[i].chance)  {
				makedrop(enemies[i].name,enemies[i].drop,enemies[i].id);
			}
			else {
				makedrop("no show",enemies[i].drop,enemies[i].id);
			}
		}
		update_battle();
	}
	else {
		update_battle();
		cdb(2,i)
	}
}
function makedrop(from,itemid,id) {
	drops.push({"from":from, "drop":itemid, "taken":false, "iscd":0, "id":id});
	cdi(5,id);
}
function makeenemy(name,drop,hp,dmg) {
	if(drop==3 || drop==4) {
		chance=0.5;
	}
	else {
		chance=1;
	}

	enemies.push({"name":name, "dmg":dmg, "hp":hp, "maxhp":hp, "isdead":false, "drop":drop, "iscd":0, "chance":chance, "id":enemies.length});
}
function takedrop(i) {
	for(k=0;k<drops.length;k++) {
		if(drops[k].id==i) {
			thisdrop=drops[k];
			break;
		}
	}
	thisdrop.taken=true;

	itemexists=9999999999;
	for(w=0;w<battleinvt.length;w++) {
		if(battleinvt[w].itemid==thisdrop.drop) {
			itemexists=w;
			break;
		}
	}

	if(itemexists==9999999999) {
		battleinvt.push({itemid:thisdrop.drop, owned:1});
	}
	else {
		battleinvt[itemexists].owned+=1;
	}

	update_battle();
}
function heal() {
	if(battleinvt[1].owned>=1 && playerhp!=playerhpmax) {

		battleinvt[1].owned--;

		if(healcd || bossbattleiscommencing) {
			cd(7,"heal-battle","Heal (1 iron chicken nugget)");
		}

		if(skills[7].owned) {
			playerhp+=15;
		}
		else {
			playerhp+=5;
		}

		if(playerhp>=playerhpmax) {
			playerhp=playerhpmax;
		}

		update_battle();
		update();
	}
}
function cdb(countdown,id) {
	if(countdown==0) {
		$("#attack-enemy-"+id).removeAttr("disabled").val("Attack!");
		enemies[id].iscd=0;
	}
	else {
		enemies[id].iscd=countdown;
		$("#attack-enemy-"+id).attr("disabled","disabled");
		$("#attack-enemy-"+id).val("Attack! ["+countdown+"]");
		setTimeout(function() {
			countdown--;
			cdb(countdown,id);
		},1000);
	}
}
function cdi(countdown,id) {
	for(k=0;k<drops.length;k++) {
		if(drops[k].id==id) {
			thisdrop=drops[k];
			break;
		}
	}
	if(countdown==0) {
		thisdrop.taken=true;
		thisdrop.iscd=0;
		update_battle();
	}
	else {
		thisdrop.iscd=countdown;
		$("#take-drop-"+id).val("Take! ["+countdown+"]");
		dropscd.push(setTimeout(function() {
			countdown--;
			cdi(countdown,id);
		},1000));
	}
}
function placetpdevice() {
	if(skills[6].owned) {
		if(battleinvt[2].owned>=1) {
			tpdevicekm=kmexplored;
			console.log(tpdevicekm+"A");
			battleinvt[2].owned--;
			$(".notifications").html("The teleportation device has been placed");
			update_battle();
		}
	}
	else {
		alert('Oops! It seems that you don\'t have knowledge to use this thing, try learning the \'teleportation\' skill');
	}
}
function tptotpdevice() {
	kmexplored=tpdevicekm-skills[3].level-5;
	explorefurther();
	update_battle();
}

function breedchickens() {
	chickenspop+=chickenspop/1000;
	ironchickenspop+=ironchickenspop/1000;
	goldchickenspop+=goldchickenspop/1000;
	if(chickenspop>999999999999) {chickenspop=999999999999;}
	if(ironchickenspop>999999999999) {ironchickenspop=999999999999;}
	if(goldchickenspop>999999999999) {goldchickenspop=999999999999;}
	update();
	setTimeout(function(){breedchickens();},breedinterval);
}

function executecmd(cmd) {
	spawnnewenemy=false;
	cmd=cmd.split(" ");
	if(cmd[0]=="exit") {
		exitportal();
	}
	else if(cmd[0]=="go") {
		if(cmd.length==1) {
			output='Usage:<br>\'go n\': go north<br>\'go e\': go east<br>\'go w\': go west<br>\'go s\': go south<br><br>You can also use arrow keys to move (but the input box must be focused)';
		}
		else {
			if(cmd[1]=="n") {
				if(playerlocation.substring(0,4)=="cave") {
					cavepos=playerlocation.replace("cave","").split("x");
					if(thereisenemy) { output='Kill those chickens first'; }
					else {
						if(roomexist(cavepos[0],parseInt(cavepos[1])+1)) {
							cavepos[1]++;
							battleinvt[0].owned-=1;
							output='You go to the north';
							playerlocation="cave"+cavepos[0]+"x"+cavepos[1];
							if(Math.random()<0.3) {
								spawnenemy();
								spawnnewenemy=true;
							}
							else {
								enemies=[];
								drops=[];
							}
						}
						else {
							output=bangwall("north");
						}
					}
				}
				if(playerlocation=="outside") {
					playerlocation="cave1000x1000";
					battleinvt[0].owned-=1;
					output='You entered the hole and you are teleported inside a cave, the cave has some rooms connected by doors and now you are insde one of the rooms<br><br>You don\'t know where to go...<br><br>You feel that the order of rooms inside this cave changes everytime you go here';
				}
				if(playerlocation=="outside1") {
					playerlocation="outside";
					battleinvt[0].owned-=1;
					output='Hmm.. it looks like a warp hole that warps you to somewhere...';
				}
				if(playerlocation=="outside2") {
					playerlocation="outside1";
					battleinvt[0].owned-=1;
					output='You are going forward to the hole...';
				}
			}
			else if(cmd[1]=="e") {
				if(playerlocation.substring(0,4)=="cave") {
					cavepos=playerlocation.replace("cave","").split("x");
					if(thereisenemy) { output='Kill those chickens first'; }
					else {
						if(roomexist(parseInt(cavepos[0])+1,cavepos[1])) {
							cavepos[0]++;
							battleinvt[0].owned-=1;
							output='You go to the east';
							playerlocation="cave"+cavepos[0]+"x"+cavepos[1];
							if(Math.random()<0.3) {
								spawnenemy();
								spawnnewenemy=true;
							}
							else {
								enemies=[];
								drops=[];
							}
						}
						else {
							output=bangwall("east");
						}
					}
				}
				if(playerlocation=="outside2" || playerlocation=="outside1" ||  playerlocation=="outside")output='You can\'t go there';
			}
			else if(cmd[1]=="w") {
				if(playerlocation.substring(0,4)=="cave") {
					cavepos=playerlocation.replace("cave","").split("x");
					if(thereisenemy) { output='Kill those chickens first'; }
					else {
						if(roomexist(parseInt(cavepos[0])-1,cavepos[1])) {
							cavepos[0]--;
							battleinvt[0].owned-=1;
							output='You go to the west';
							playerlocation="cave"+cavepos[0]+"x"+cavepos[1];
							if(Math.random()<0.3) {
								spawnenemy();
								spawnnewenemy=true;
							}
							else {
								enemies=[];
								drops=[];
							}
						}
						else {
							output=bangwall("west");
						}
					}
				}
				if(playerlocation=="outside2" || playerlocation=="outside1" ||  playerlocation=="outside")output='You can\'t go there';
			}
			else if(cmd[1]=="s") {
				if(playerlocation.substring(0,4)=="cave") {
					cavepos=playerlocation.replace("cave","").split("x");
					if(thereisenemy) { output='Kill those chickens first'; }
					else {
						if(roomexist(cavepos[0],parseInt(cavepos[1])-1)) {
							cavepos[1]--;
							battleinvt[0].owned-=1;
							output='You go to the south';
							playerlocation="cave"+cavepos[0]+"x"+cavepos[1];
							if(Math.random()<0.3) {
								spawnenemy();
								spawnnewenemy=true;
							}
							else {
								enemies=[];
								drops=[];
							}
						}
						else {
							output=bangwall("south");
						}
					}
				}
				if(playerlocation=="outside2" || playerlocation=="outside1" ||  playerlocation=="outside")output='You can\'t go there';
			}
			else {
				output='Usage:<br>\'go n\': go north<br>\'go e\': go east<br>\'go w\': go west<br>\'go s\': go south<br><br>You can also use arrow keys to move (but the input box must be focused)';
			}
		}

		if(spawnnewenemy) {
			output=output+"<br>There are some chickens here... better kill them first before exploring further";
		}

		if(playerlocation=="outside2" || playerlocation=="outside1" ||  playerlocation=="outside"){}
		else {
			cavepos=playerlocation.replace("cave","").split("x");
			if(rooms[roomid(cavepos[0],cavepos[1])].z=="t") {
				output=output+"<br>This room has no torch inside while other rooms have torches, this is weird :/";
			}
		}

		updateminimap();

	}
	else if(cmd[0]=="tp") { //for testing purposes only, maybe :p
		playerlocation="cave"+cmd[1]+"x"+cmd[2];
		output='Teleported you to '+cmd[1]+", "+cmd[2];
	}
	else if(cmd[0]=="pos") {
		if(playerlocation=="outside2" || playerlocation=="outside1" ||  playerlocation=="outside") {
			output="You are outside";
		}
		else if(playerlocation.substring(0,4)=="cave") {
			cavepos=playerlocation.replace("cave","").split("x");
			output="You are at x:"+cavepos[0]+", y:"+cavepos[1]+" inside the cave";
		}
	}
	else if(cmd[0]=="clear") {
		$("#notificationlog").html("");
		output="Log cleared";
	}
	else if(cmd[0]=="visual") {
		$("#visualizationarea").show().html("");
		for(they=1020;they>=980;they--) {
			for(thex=980;thex<=1020;thex++) {
				if(roomexist(thex,they)) {
					thechar=rooms[roomid(thex,they)].z;
					if(thex==1000 && they==1000)thechar="<b>"+thechar+"</b>";
					$("#visualizationarea").html($("#visualizationarea").html()+thechar);
				}
				else {
					$("#visualizationarea").html($("#visualizationarea").html()+"&nbsp;");
				}
			}
			$("#visualizationarea").html($("#visualizationarea").html()+"<br>");
		}
		output="Visualization visualized";
	}
	else if(cmd[0]=="map") {
		if(items[28].owned>=1) {
			if(playerlocation=="outside2" || playerlocation=="outside1" ||  playerlocation=="outside") {
				output='You must be inside the cave to use this command';
			}
			else {
				$("#visualizationarea").show().html("");
				updateminimap();
				output="The map has been shown";
			}
		}
		else {
			output="Oops, you haven't unlocked this command yet";
		}
	}
	else if(cmd[0]=="examine") {
		if(cmd[1]=="room") {
			cavepos=playerlocation.replace("cave","").split("x");
			if(rooms[roomid(cavepos[0],cavepos[1])].z=="t") {
				output="You examined the room and saw a button, wanna press it? Type 'press' to press the button";
			}
			else {
				output="Nothing to examine :/";
			}
		}
		else {
			output="Examine what?";
		}
	}
	else if(cmd[0]=="press") {
		cavepos=playerlocation.replace("cave","").split("x");
		if(rooms[roomid(cavepos[0],cavepos[1])].z=="t") {
			output="Are you sure? It is unknown what will happen when the button is presssed<br>Type 'yes' if you are sure";
		}
		else {
			output="Nothing to press :/";
		}
	}
	else if(cmd[0]=="yes") {
		cavepos=playerlocation.replace("cave","").split("x");
		if(rooms[roomid(cavepos[0],cavepos[1])].z=="t") {
			output="You are teleported to a place that you don't know where";
			setTimeout(function() {
				$("#chickenverse2").fadeOut(1000);
				setTimeout(function() {
					$("#bossbattleftw").fadeIn(1000);
						setTimeout(function() {
							$(".notifications").html("You finally met <b>The Legendary Mutant Chicken</b>!! :o");
							bossbattle();
						},1000);
				},1000);
			},1500);
		}
		else {
			output="Yes to what? :/";
		}
	}
	else {
		output='Command does not exist';
	}

	$("#cangoto").html("");

	if(playerlocation=="outside2" || playerlocation=="outside1" ||  playerlocation=="outside")$("#cangoto").html("north (&uarr;)");

	if(playerlocation.substring(0,4)=="cave") {
		cavepos=playerlocation.replace("cave","").split("x");
		if(roomexist(cavepos[0],parseInt(cavepos[1])+1)) {
			$("#cangoto").html($("#cangoto").html()+"north (&uarr;), ");
		}
		if(roomexist(parseInt(cavepos[0])+1,cavepos[1])) {
			$("#cangoto").html($("#cangoto").html()+"east (&rarr;), ");
		}
		if(roomexist(cavepos[0],parseInt(cavepos[1])-1)) {
			$("#cangoto").html($("#cangoto").html()+"south (&darr;), ");
		}
		if(roomexist(parseInt(cavepos[0])-1,cavepos[1])) {
			$("#cangoto").html($("#cangoto").html()+"west (&larr;), ");
		}
		qwerty=$("#cangoto").html();
		$("#cangoto").html(qwerty.substr(0,$("#cangoto").html().length-2));

		if(rooms[roomid(cavepos[0],cavepos[1])].c=="cn") {
			rooms[roomid(cavepos[0],cavepos[1])].c="none";
			bonuscn=getRandomInt(5,15);
			battleinvt[0].owned+=bonuscn;
			output=output+"<br><br>You found "+bonuscn+" chicken nuggets inside a chest inside this room, you are lucky!";
		}

	}

	addtolog(output);
	update_battle();
}

function updateminimap() {
	$("#visualizationarea").html("");
	cavepos=playerlocation.replace("cave","").split("x");
	for(they=parseInt(cavepos[1])+5;they>=parseInt(cavepos[1])-5;they--) {
		for(thex=parseInt(cavepos[0])-5;thex<=parseInt(cavepos[0])+5;thex++) {
			if(roomexist(thex,they)) {
				thechar="&bull;&nbsp;";
				if(thex==cavepos[0] && they==cavepos[1])thechar="<b>Y</b>&nbsp;";
				$("#visualizationarea").html($("#visualizationarea").html()+thechar);
			}
			else {
				$("#visualizationarea").html($("#visualizationarea").html()+"&nbsp;&nbsp;");
			}
		}
		$("#visualizationarea").html($("#visualizationarea").html()+"<br>");
	}
}

function addtolog(text) {
	alskdj=$("#notificationlog").html();
	$("#notificationlog").html(alskdj+"<p>"+text+"</p>").scrollTop($("#notificationlog").height()*999999);
}

function bangwall(dir) {
	q=getRandomInt(1,4);
	if(q==1) {
		return "You can\'t go "+dir+" anymore";
	}
	else if(q==2) {
		return "Oops, there is a wall!";
	}
	else if(q==3) {
		return "Bad idea, there is a wall here";
	}
	else if(q==4) {
		return "Nope don't go "+dir+", there is a wall";
	}
}

function addroom(x,y,z) {
	if(getRandomInt(1,20)==1) {
		collectibles="cn";
	}
	else {
		collectibles="none";
	}
	rooms.push({"x":x, "y":y, "c":collectibles, "z":z});
}

function addroomn(x,y,f) {
	newrooms.push({"x":x, "y":y, "a":true, "f":f});
}

function removeroomn(id) {
	newrooms[id].a=false;
}

function roomexist(x,y) {
	for(i=0;i<rooms.length;i++) {
		if(x==rooms[i].x && y==rooms[i].y) {
			return true;
		}
	}
	return false;
}

function roomid(x,y) {
	for(i=0;i<rooms.length;i++) {
		if(x==rooms[i].x && y==rooms[i].y) {
			return i;
		}
	}
	return false;
}

/*

	name, drop, hp, damage

	makeenemy("Chicken",0,1,0);
	makeenemy("Angry Chicken",0,1,1);
	makeenemy("Crazy Chicken",0,3,3);

	makeenemy("Iron Chicken",1,3,0);
	makeenemy("Angry Iron Chicken",1,3,2);
	makeenemy("Crazy Iron Chicken",1,5,4);

	makeenemy("Gold Chicken",2,5,0);
	makeenemy("Angry Gold Chicken",2,5,4);
	makeenemy("Crazy Gold Chicken",2,7,7);

	makeenemy("Diamond Chicken",3,7,3);
	makeenemy("Angry Diamond Ch.",3,7,6);
	makeenemy("Crazy Diamond Ch.",3,9,9);

	makeenemy("Emerald Chicken",4,10,5);
	makeenemy("Angry Emerald Ch.",4,10,8);
	makeenemy("Crazy Emerald Ch.",4,12,11);

	makeenemy("Glitched Chicken",999999,1,0);
	makeenemy("Angry Glitched Ch.",999999,1,1);

*/

function spawnenemy() {
	enemies=[];
	drops=[];
	numenemies=getRandomInt(1,6);
	for(i=1;i<=numenemies;i++) {
		enemytype=getRandomInt(1,5);
		if(enemytype==1) {
			makeenemy("Crazy Chicken",0,3,3);
		}
		else if(enemytype==2) {
			makeenemy("Crazy Iron Chicken",1,5,4);
		}
		else if(enemytype==3) {
			makeenemy("Crazy Gold Chicken",2,7,7);
		}
		else if(enemytype==4) {
			makeenemy("Crazy Diamond Ch.",3,9,9);
		}
		else if(enemytype==5) {
			makeenemy("Crazy Emerald Ch.",4,12,11);
		}
	}
}

function generatepath(x,y,to,level) {
	level++;
	to2=to;
	if(level==6){to2="t";console.log(to2);}
	length=getRandomInt(level*2,10);
	if(to=="n") {
		for(i=0;i<=length;i++) {
			addroom(x,y+i,to2);
		}
		if(level<5) {
			if(Math.random()<0.8)generatepath(x,y+i-(length-getRandomInt(length-Math.ceil(length/2),length)),"e",level);
			if(Math.random()<0.8)generatepath(x,y+i-(length-getRandomInt(length-Math.ceil(length/2),length)),"w",level);
		}
		if(level==5 && !pathnotorch) {
			pathnotorch=true;
			if(Math.random()<0.5) {
				generatepath(x,y+i-(length-getRandomInt(length-Math.ceil(length/2),length)),"e",level);
			}
			else {
				generatepath(x,y+i-(length-getRandomInt(length-Math.ceil(length/2),length)),"w",level);
			}
		}
	}
	else if(to=="e") {
		for(i=0;i<=length;i++) {
			addroom(x+i,y,to2);
		}
		if(level<5) {
			if(Math.random()<0.8)generatepath(x+i-(length-getRandomInt(length-Math.ceil(length/2),length)),y,"n",level);
			if(Math.random()<0.8)generatepath(x+i-(length-getRandomInt(length-Math.ceil(length/2),length)),y,"s",level);
		}
		if(level==5 && !pathnotorch) {
			pathnotorch=true;
			if(Math.random()<0.5) {
				generatepath(x+i-(length-getRandomInt(length-Math.ceil(length/2),length)),y,"n",level);
			}
			else {
				generatepath(x+i-(length-getRandomInt(length-Math.ceil(length/2),length)),y,"s",level);
			}
		}
	}
	else if(to=="w") {
		for(i=0;i<=length;i++) {
			addroom(x-i,y,to2);
		}
		if(level<5) {
			if(Math.random()<0.8)generatepath(x-i+(length-getRandomInt(length-Math.ceil(length/2),length)),y,"n",level);
			if(Math.random()<0.8)generatepath(x-i+(length-getRandomInt(length-Math.ceil(length/2),length)),y,"s",level);
		}
		if(level==5 && !pathnotorch) {
			pathnotorch=true;
			if(Math.random()<0.5) {
				generatepath(x-i+(length-getRandomInt(length-Math.ceil(length/2),length)),y,"n",level);
			}
			else {
				generatepath(x-i+(length-getRandomInt(length-Math.ceil(length/2),length)),y,"s",level);
			}
		}
	}
	else if(to=="s") {
		for(i=0;i<=length;i++) {
			addroom(x,y-i,to2);
		}
		if(level<5) {
			if(Math.random()<0.8)generatepath(x,y-i+(length-getRandomInt(length-Math.ceil(length/2),length)),"e",level);
			if(Math.random()<0.8)generatepath(x,y-i+(length-getRandomInt(length-Math.ceil(length/2),length)),"w",level);
		}
		if(level==5 && !pathnotorch) {
			pathnotorch=true;
			if(Math.random()<0.5) {
				generatepath(x,y-i+(length-getRandomInt(length-Math.ceil(length/2),length)),"e",level);
			}
			else {
				generatepath(x,y-i+(length-getRandomInt(length-Math.ceil(length/2),length)),"w",level);
			}
		}
	}
}

/* BOSS BATTLE */

function bossbattle() {

	bosshealth=400;
	bossbattleiscommencing=true;
	healcd=true;
	endgame=false;
	chickenstun=0;

	bossinterval=setInterval(function() {
		if(bosshealth>0 && !endgame && bossbattleiscommencing) {
			if(chickenstun>0) {
				chickenstun--;
			}
			else {
				bossdmg=getRandomInt(15,25);
				playerhp-=bossdmg;
				$(".notifications").html("The Legendary Mutant Chicken threw a fireball to you and causing <b>"+bossdmg+"</b> HP damage!");
				if(playerhp<=0) {
					playerhp=1;
					exitportal();
					$(".notifications").html("Phew! You are almost dead!");
				}
			}
			updateboss();
		}
		else {
			if(typeof bossinterval !== "undefined")clearInterval(bossinterval);
		}
	},5000);

	updateboss();

}

function updateboss() {
	bars=Math.ceil(bosshealth/10);
	$("#chickenhealth").html(repeat("-",bars)+repeat(" ",40-bars));
	update_battle();
	update();
}

function attackboss() {
	getbossdamage=getRandomInt(playerdmg-2,playerdmg+2);
	bosshealth-=getbossdamage;
	$(".notifications").html("You attacked The Legendary Mutant Chicken using "+playerweapon+" and causing <b>"+getbossdamage+"</b> HP damage to it!");
	cd(getRandomInt(3,6),"attack-boss","Attack the legendary mutant chicken!");
	if(bosshealth<=0) {
		bosshealth=0;
		endgame=true; // ULTIMATE WINNING!!!
		bossbattleiscommencing=false;
		if(typeof bossinterval !== "undefined")clearInterval(bossinterval);
		thefinal();
	}
	updateboss();
}

function throwdiamondnugget() {
	if(items[13].owned>0) {
		items[13].owned--;
		cd(getRandomInt(7,12),"throw-diamond-nugget","Throw a diamond chicken nugget");
		if(Math.random()<0.1) {
			if(Math.random()<0.5) {
				chickenstun+=getRandomInt(1,4);
				$(".notifications").html("You threw a diamond nugget but and it gets into the chicken's mouth! The chicken is now stunned for a few seconds. You have <b>"+items[3].owned+"</b> nugget(s) left");
			}
			else {
				damagegotten=getRandomInt(5,15);
				bosshealth-=damagegotten;
				$(".notifications").html("You threw a diamond nugget but and it gets into the chicken's mouth! The chicken gets an extra <b>"+bosshealth+"</b> HP damage. You have <b>"+items[3].owned+"</b> nugget(s) left");
				updateboss();
			}
		}
		else {
			$(".notifications").html("You threw a diamond nugget but it misses the chicken's mouth! You have <b>"+items[3].owned+"</b> nugget(s) left");
		}
	}
}

function runaway() {
	bossbattleiscommencing=false;
	if(typeof bossinterval !== "undefined")clearInterval(bossinterval);
	exitportal();
	$(".notifications").html("You finally choose to run away, maybe next time");
}

/* SAVING FUNCTIONS */

function save(what,param2) {
	if(what=="local") {
		localStorage.chickensgamesave=save("string");
		$("#mutenotif").html("Game saved").animate({"bottom":"-30px"},1000);
		setTimeout(function() {
			$("#mutenotif").animate({"bottom":"-82px"},1000);
		},2000);
	}
	else if(what=="load") {
		save("splitter");
	}
	else if(what=="reset") {
		if(confirm("Are you sure to reset your game?")) {
			if(confirm("Really?")) {
				if(confirm("You can't undo after reset")) {
					if(confirm("Maybe you want to save the save as text first?")) {
						if(confirm("This is the last confirmation, once you press OK, your game progress will lost forever (a long time!)")) {
							localStorage.chickensgamesave="";
							$("body").hide();
							alert('Your game has been reset, enjoy! :D');
							window.location=self.location;
						}
					}
				}
			}
		}
	}
	else if(what=="export") {
		prompt("Here's your save code",save("string"));
	}
	else if(what=="import") {
		code=prompt("Enter the save code (once you imported your game, it will be saved automatically and this page will be refreshed)","");
		if(code!=null && code!="") {
			save("splitter",code);
			save("local");
			window.location=self.location;
		}
	}
	else if(what=="autosave") {
		if(autosave) {
			autosave=false;
			if(typeof autosaveinterval !== "undefined")clearInterval(autosaveinterval);
			alert('Autosave disabled');
		}
		else {
			autosave=true;
			autosaveinterval=setInterval(function() {
				autosavetime--;
				if(autosavetime==0) {
					autosavetime=60;
					save("local");
				}
				$("#autosave-cd").html(autosavetime);
			},1000);
			alert('Autosave enabled');
		}
	}
	else if(what=="string") {
		return btoa(items[0].owned+"|"+items[1].owned+"|"+items[2].owned+"|"+items[3].owned+"|"+items[4].owned+"|"+items[5].owned+"|"+items[6].owned+"|"+items[7].owned+"|"+items[8].owned+"|"+items[9].owned+"|"+items[10].owned+"|"+items[11].owned+"|"+items[12].owned+"|"+items[13].owned+"|"+items[14].owned+"|"+items[15].owned+"|"+items[16].owned+"|"+items[17].owned+"|"+items[18].owned+"|"+items[19].owned+"|"+items[20].owned+"|"+items[21].owned+"|"+items[22].owned+"|"+items[23].owned+"|"+items[24].owned+"|"+items[25].owned+"|"+skills[0].owned+"|"+skills[1].owned+"|"+skills[2].owned+"|"+skills[3].owned+"|"+skills[3].level+"|"+skills[4].owned+"|"+skills[5].owned+"|"+skills[6].owned+"|"+skills[7].owned+"|"+chickenspop+"|"+ironchickenspop+"|"+goldchickenspop+"|"+invtnotif+"|"+tradernotif+"|"+beginning+"|"+unlockedskills+"|"+trademap+"|"+tradebetterfurnace+"|"+introducetp+"|"+playerhp+"|"+playerhpmax+"|"+usesound+"|"+tool+"|"+helmet+"|"+chestplate+"|"+leggings+"|"+boots+"|"+breedinterval+"|"+items[26].owned+"|"+tpdevicekm+"|"+tpdevicestock+"|"+rubysearchstep+"|"+getscroll+"|"+items[27].owned+"|"+redditspecialstep+"|"+items[28].owned);
	}
	else if(what=="splitter") {

		if(typeof param2 === "undefined") {
			tehcodez=localStorage.chickensgamesave;
		}
		else {
			tehcodez=param2;
		}

		tehcodez=atob(tehcodez).split("|");

		items[0].owned = parseFloat(tehcodez[0]);
		items[1].owned = parseFloat(tehcodez[1]);
		items[2].owned = parseFloat(tehcodez[2]);
		items[3].owned = parseFloat(tehcodez[3]);
		items[4].owned = parseFloat(tehcodez[4]);
		items[5].owned = parseFloat(tehcodez[5]);
		items[6].owned = parseFloat(tehcodez[6]);
		items[7].owned = parseFloat(tehcodez[7]);
		items[8].owned = parseFloat(tehcodez[8]);
		items[9].owned = parseFloat(tehcodez[9]);
		items[10].owned = parseFloat(tehcodez[10]);
		items[11].owned = parseFloat(tehcodez[11]);
		items[12].owned = parseFloat(tehcodez[12]);
		items[13].owned = parseFloat(tehcodez[13]);
		items[14].owned = parseFloat(tehcodez[14]);
		items[15].owned = parseFloat(tehcodez[15]);
		items[16].owned = parseFloat(tehcodez[16]);
		items[17].owned = parseFloat(tehcodez[17]);
		items[18].owned = parseFloat(tehcodez[18]);
		items[19].owned = parseFloat(tehcodez[19]);
		items[20].owned = parseFloat(tehcodez[20]);
		items[21].owned = parseFloat(tehcodez[21]);
		items[22].owned = parseFloat(tehcodez[22]);
		items[23].owned = parseFloat(tehcodez[23]);
		items[24].owned = parseFloat(tehcodez[24]);
		items[25].owned = parseFloat(tehcodez[25]);
		skills[0].owned = (tehcodez[26] === "true");
		skills[1].owned = (tehcodez[27] === "true");
		skills[2].owned = (tehcodez[28] === "true");
		skills[3].owned = (tehcodez[29] === "true");
		skills[3].level = parseFloat(tehcodez[30]);
		skills[4].owned = (tehcodez[31] === "true");
		skills[5].owned = (tehcodez[32] === "true");
		skills[6].owned = (tehcodez[33] === "true");
		skills[7].owned = (tehcodez[34] === "true");
		chickenspop = parseFloat(tehcodez[35]);
		ironchickenspop = parseFloat(tehcodez[36]);
		goldchickenspop = parseFloat(tehcodez[37]);
		invtnotif = (tehcodez[38] === "true");
		tradernotif = (tehcodez[39] === "true");
		beginning = (tehcodez[40] === "true");
		unlockedskills = (tehcodez[41] === "true");
		trademap = (tehcodez[42] === "true");
		tradebetterfurnace = (tehcodez[43] === "true");
		introducetp = (tehcodez[44] === "true");
		playerhp = parseFloat(tehcodez[45]);
		playerhpmax = parseFloat(tehcodez[46]);
		usesound = (tehcodez[47] === "true");
		tool = parseFloat(tehcodez[48]);
		helmet = parseFloat(tehcodez[49]);
		chestplate = parseFloat(tehcodez[50]);
		leggings = parseFloat(tehcodez[51]);
		boots = parseFloat(tehcodez[52]);
		breedinterval = parseFloat(tehcodez[53]);

		if(tehcodez.length>=55) {items[26].owned = parseFloat(tehcodez[54]);}else {items[26].owned = 0;}
		if(tehcodez.length>=56) {tpdevicekm = parseFloat(tehcodez[55]);} else {tpdevicekm = 0;}
		if(tehcodez.length>=57) {tpdevicestock = parseFloat(tehcodez[56]);} else {tpdevicestock = 5;}
		if(tehcodez.length>=58) {rubysearchstep = parseFloat(tehcodez[57]);} else {rubysearchstep = 0;}
		if(tehcodez.length>=59) {getscroll = (tehcodez[58] === "true");} else {getscroll = false;}
		if(tehcodez.length>=60) {items[27].owned = parseFloat(tehcodez[59]);}else {items[27].owned = 0;}
		if(tehcodez.length>=61) {redditspecialstep = parseFloat(tehcodez[60]);}else {redditspecialstep = 0;}
		if(tehcodez.length>=62) {items[28].owned = parseFloat(tehcodez[61]);}else {items[28].owned = 0;}

		if(breedinterval<1500) {
			breedinterval+=1000;
		}

		update();

	}
}

/*
	  ______ _   _ _____        _____          __  __ ______
 	 |  ____| \ | |  __ \      / ____|   /\   |  \/  |  ____|
 	 | |__  |  \| | |  | |    | |  __   /  \  | \  / | |__
 	 |  __| | . ` | |  | |    | | |_ | / /\ \ | |\/| |  __|
 	 | |____| |\  | |__| |    | |__| |/ ____ \| |  | | |____
 	 |______|_| \_|_____/      \_____/_/    \_\_|  |_|______|

*/

function thefinal() {
	playerhp=0;
	$("#transparentmask").show();
	$(".notifications").html("NO! The chicken threw it's super fireball before it dies and killed you instantly! You didn't expect this, thus you can't avoid it! :o");
	setTimeout(function() {
		$("#whitemask").fadeIn("slow");
		$(".notifications").html("");
		console.log("\n\nWell, luckily there's a console magic ;)\nType \"respawn()\" to respawn and enjoy those ruby chicken nuggets!\nLong live the developers!!!! :D\n\n");
	},7500);
}

function respawn() {
	//DEVELOPERS WIN!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
	console.log("Respawn commenced, enjoy those nuggets :D");
	$("#transparentmask, #whitemask, #tabbing, #tab0, #tab1, #tab2, #tab3, #tab4, #tab5, #tab6, #invtwrap").hide();
	$("#respawninvt, #respawnarea").show();
	$("#rcmqty").html(rubymeats);
	$("#rcnqty").html(rubynuggets);
}

function cookruby(qty) {
	rubymeats-=qty;
	rubynuggets+=qty;
	$("#rcmqty").html(rubymeats);
	$("#rcnqty").html(rubynuggets);
	if(rubymeats<0) {
		$(".notifications").html("Nobody cares about negative quantity of the meat, JUST EAT AS MANY AS YOU CAN!!!!!!");
	}
	else {
		$(".notifications").html("The newly cooked ruby chicken nugget smells very good! Can't wait to eat it!");
	}
}

function eatruby() {
	if(rubynuggets>0) {
		rubynuggets--;
		$(".notifications").html("DUDE! THIS IS THE BEST THING EVER!!! YOU MSUT EAT THIS!! THIS IS SUPER DELICIOUS!!!! NOMNOMNOMNOM");
		$("#rcmqty").html(rubymeats);
		$("#rcnqty").html(rubynuggets);
	}
	else {
		$(".notifications").html("Oops, no ruby nuggets, better cook some more");
	}
}

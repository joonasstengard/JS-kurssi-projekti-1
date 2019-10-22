function lisaysFunktio(){

	/*käytän näitä booleaneita tarkastamaan että onko tekemis/aika/kesto inputtien sisältö ok. tässä alussa ne nollataan falseksi,
	ja jos joku tai jotkut niistä jää falseksi niin siitä tulee varoitustekstiä käyttäjälle eikä sisältöä lisätä tableen.
	Mutta jos kaikki inputit on OK niin sitten kaikista näistä tulee true ja syöte lisätään tableen.*/
	var onkoTekemisInputOk = false;
	var onkoAikaInputOk = false;
	var onkoKestoInputOk = false;
	
	/*Nämä kolme riviä on jokaiselle kolmelle eri syötteelle omat varoitustekstit. Tyhjennetään ne tässä alussa,
	ja seuraavaksi kun syötteitä tarkastetaan niin näihin voidaan lisätä varoitustekstejä käyttäjälle jos joittenkin
	syötteiden syötteet on epäkelpoja*/
	document.getElementById("tekeminenVarotus").innerHTML = "";
	document.getElementById("aikaVarotus").innerHTML = "";
	document.getElementById("kestoVarotus").innerHTML = "";

	/*napataan tekeminen kentän syöte talteen että sitä voidaan ensiksi tutkia ja myöhemmin lisätä tableen jos se on OK,
	tämä voi olla const koska sitä ei tarvitse muuttaa*/
	const tekeminen = document.getElementById("tekeminen").value;
	/*seuraavissa riveissä tarkastetaan
	onko TEKEMINEN kentän syöte vähintään 1 merkki tai enintään 20 merkkiä, muuten tulee varotustekstiä*/
	if(tekeminen.length>0&&tekeminen.length<20){
		onkoTekemisInputOk = true;
	}else if(tekeminen.length<1){
		document.getElementById("tekeminenVarotus").innerHTML = "Action field empty!";
	}else{
		document.getElementById("tekeminenVarotus").innerHTML = "Too many characters!";
	}
	
	/*napataan aika syötteen tunnit ja minuutit talteen, nämä otetaan var:eina koska näitä pitää muuttaa myöhemmin nolliksi
	jos ne on jätetty tyhjiksi*/
	var aikaTunnit = document.getElementById("aikaTunnit").value;
	var aikaMinuutit = document.getElementById("aikaMinuutit").value;
	/*seuraavissa riveissä tarkastetaan
	onko AIKA kentän tunnit yli 23 tai minuutit yli 60, muuten tulee varotustekstiä*/
	if(aikaTunnit>23){
		document.getElementById("aikaVarotus").innerHTML = "Hour cannot be higher than 23!";
	}else if(aikaMinuutit>=60){
		document.getElementById("aikaVarotus").innerHTML = "Minutes cannot be higher than 59!";
	}else{
		onkoAikaInputOk = true;
	}
	
	/*jos aika inputit on tyhjiä, ne muutetaan nolliksi eli 0 tuntia ja/tai 0 minuuttia*/
	if(!aikaTunnit>0){
		aikaTunnit = 0;
	}if(!aikaMinuutit>0){
		aikaMinuutit = 0;
	}
	
	/*kesto syötteiden tunnit ja minuutit talteen. Minuutit voi olla const koska niitä ei tarvitse muuttaa,
	mutta tunnit muutetaan nolliksi jos niitä ei ole laitettu niin ne var:ina*/
	var kestoTunnit = document.getElementById("kestoTunnit").value;
	const kestoMinuutit = document.getElementById("kestoMinuutit").value;
	/*seuraavissa riveissä tarkastetaan onko KESTO kentän syöte yhteensä yli 0, muuten varotustekstiä*/
	if(kestoMinuutit<1&&kestoTunnit<1){
		document.getElementById("kestoVarotus").innerHTML = "Duration can't be 0!";
	}else{
		onkoKestoInputOk = true;
	}
	
	/*jos kesto tunteina ei ole laitettu inputissa, se muutetaan nollaksi, eli siis tyhjä input tunteihin = 0 tuntia*/
	if(!kestoTunnit>0){
		kestoTunnit = 0;
	}
	
	
	/* lisää inputtien sisällöt tableen jos ne on selvinnyt tarkastuksen*/
	if(onkoTekemisInputOk === true && onkoAikaInputOk === true && onkoKestoInputOk === true){
		
		/*tää on se table*/
		var taulu = document.getElementById("taulu");
		/*rivienmäärä lasketaan että uusi rivi voidaan laittaa siihen perään ja helpompaa pitää kirjaa siitä
		mikä rivi on kyseessä deletenappien suhteen*/
		var rivienMaara = document.getElementById("taulu").getElementsByTagName("tr").length;
		/*uusi rivi mihin lisätään käyttäjän syötteet*/
		var rivi = taulu.insertRow(rivienMaara);
		/*riville uniikki id jos haluaa lisätä myöhemmin lisää toiminnallisuutta helposti*/
		rivi.id = rivi+rivienMaara;
		/*actioni syote riviin*/
		var actioni = rivi.insertCell(0);
		/*aika syote myös*/
		var aika = rivi.insertCell(1);
		/*ja viimeisenä kesto*/
		var kesto = rivi.insertCell(2);
		
		/*seuraavassa kolmessa rivissä täytetään rivi käyttäjän kolmella syötteellä*/
		actioni.innerHTML = tekeminen;
		aika.innerHTML = aikaTunnit +":"+aikaMinuutit;
		kesto.innerHTML = kestoTunnit +" Hours "+ kestoMinuutit+" Min";
		
		/*lisätään deletenapit deletediviin eli niille valmiiksi tehtyyn paikkaan, heti syötteiden viereen*/
		var deletedivi = document.getElementById("deletenapit");
		/*delete nappien määrä lasketaan että jokainen niistä saa uniikin id:n*/
		var deletenappienMaara = deletedivi.childElementCount;
		/*tässä luodaan se deletenappi riville*/
		var nappi = document.createElement("BUTTON");
		/*delete napin tekstiksi DELETE*/
		var nappiTeksti = document.createTextNode("DELETE");
		/*DELETE teksti lisätään nappiin*/
		nappi.appendChild(nappiTeksti);
		/*tässä deletenappi saa sen uniikin id:n eli nappien määrä +1*/
		nappi.id = deletenappienMaara +1;
		/*onClick event listeneri deletenapille eli siitä se deletoi sen rivin minkä vieressä se on ja myös deletoi itsensä*/
		nappi.addEventListener('click', function(){
			/*poistetaan rivi*/
			rivi.parentNode.removeChild(rivi);
			/*nappi deletoi ittensä lopulta*/
			nappi.parentNode.removeChild(nappi); }, false);
		/*deletenappi lisätään deletediviin*/
		deletedivi.appendChild(nappi);
		

		/*seuraavat viisi riviä tyhjentää kaikki inputit, mutta vain jos ne lisättiin tableen eli selvisivät tarkastuksen,
		jos ei selvinnyt niin ne jää siihen varotustekstien kera ja käyttäjän on helppo korjata niitä ilman että joutuu
		kirjoittamaan uudestaan. Ja jos ne lisätään onnistuneesti niin helpompaa lisätä uutta tietysti kun ne tyhjennetään*/
		document.getElementById("tekeminen").value = "";
		document.getElementById("aikaTunnit").value = "";
		document.getElementById("aikaMinuutit").value = ""
		document.getElementById("kestoTunnit").value = "";
		document.getElementById("kestoMinuutit").value = "";
	}
}
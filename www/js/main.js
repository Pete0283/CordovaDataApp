var holder;
var peopleHolder;
var occasionHolder;
var db = openDatabase;

var app= {
	loadRequirements:0,
	init: function(){
  
		document.addEventListener("deviceready", app.onDeviceReady);
		document.addEventListener("DOMContentLoaded", app.onDomReady);
        
	},
	onDeviceReady: function(){
		app.loadRequirements++;
		if(app.loadRequirements === 2){
			app.start();
		}
	},
	onDomReady: function(){
		app.loadRequirements++;

		if(app.loadRequirements === 2){
			app.start();
		}
	},
	start: function(){
		//connect to database
        checkDB();
       
		//build the lists for the main pages based on data
		//add button and navigation listeners
    
        document.querySelector("[data-role=listview]").addEventListener('click', app.edit);
        document.getElementById('btnAddToPeo').addEventListener('click', function(){ loadModes('add-person') });
        document.getElementById('btnAddToOcc').addEventListener('click', function(){ loadModes('add-occasion') });
        document.getElementById('occAdd').addEventListener('click', function(){ loadModes('add-gift-occasion') });
        document.getElementById('giftAdd').addEventListener('click', function(){ loadModes('add-gift-person') });
        document.getElementById('back1').addEventListener('click', function(){ loadPage('people') });
        document.getElementById('back2').addEventListener('click', function(){ loadPage('occasions') });

    
        
        
        //document.getElementById("btnCancel").addEventListener("click", app.cancel);
        //document.getElementById("btnSave").addEventListener("click", app.save);
        hammerTime();
       
        //
    },
    cancel: function(){
        
        var totalSelected = document.querySelectorAll("[data-role=modal]");
        for(var i = 0; i < totalSelected.length; i++){
            totalSelected[i].style.display="none";
        }
        
        document.querySelector("[data-role=overlay]").style.display="none";
        
    },
    save: function(e){
        //insert query
        
        if (e.target.id == "savePeople") {
            var newPerson = document.createElement('li');
                //newPerson.setAttribute("data-ref", idResults);
                newPerson.innerHTML = document.getElementById("new-per").value;
            //var newOccasion = document.createElement(li);
            var peopleHolder = document.querySelector("#peopleView");
                peopleHolder.appendChild(newPerson);
            
            var totalSelected = document.querySelectorAll("[data-role=modal]");
            for(var i = 0; i < totalSelected.length; i++){
                totalSelected[i].style.display="none";
            }
        
            document.querySelector("[data-role=overlay]").style.display="none";
            
        } else if (e.target.id == "saveOccasion") {
            var newOccasion = document.createElement('li');
                newOccasion.innerHTML = document.querySelector("#new-occ").value;
            var occasionHolder = document.querySelector("#occasionView");
                occasionHolder.appendChild(newOccasion);
            
            var totalSelected = document.querySelectorAll("[data-role=modal]");
            for(var i = 0; i < totalSelected.length; i++){
                totalSelected[i].style.display="none";
            }

            document.querySelector("[data-role=overlay]").style.display="none";
            
        } else if (e.target.id == "saveoccasionGift") {
            var newoccasionGift = document.createElement('li');
                newoccasionGift.innerHTML = document.querySelector("#new-ideaO").value;
            var occasiongiftHolder = document.querySelector("#giftsOccasions");
                occasiongiftHolder.appendChild(newoccasionGift);
            
            var totalSelected = document.querySelectorAll("[data-role=modal]");
            for(var i = 0; i < totalSelected.length; i++){
                totalSelected[i].style.display="none";
            }

            document.querySelector("[data-role=overlay]").style.display="none";
            
        } else if (e.target.id == "savepeopleGift") {
            var newpeopleGift = document.createElement('li');
                newpeopleGift.innerHTML = document.querySelector("#new-ideaP").value;
            var peoplegiftHolder = document.querySelector("#giftsPeople");
                peoplegiftHolder.appendChild(newpeopleGift);
            
            var totalSelected = document.querySelectorAll("[data-role=modal]");
            for(var i = 0; i < totalSelected.length; i++){
                totalSelected[i].style.display="none";
            }

            document.querySelector("[data-role=overlay]").style.display="none";
        }
        
        
        //then app.cancel
        
    
    }
}

app.init();


/****************************CHECK DB*********************/


function checkDB(){
    //app start once deviceready occurs
   
    db = openDatabase('dataappDB', '', 'CordovaDB', 1024*1024);
    if(db.version == ''){
        console.info('First time running... create tables'); 
        //means first time creation of DB
        //increment the version and create the tables
        db.changeVersion('', '1.0',
                function(trans){
                    //something to do in addition to incrementing the value
                    //otherwise your new version will be an empty DB
                    console.info("DB version incremented");
                    //do the initial setup               
                    trans.executeSql('CREATE TABLE IF NOT EXISTS gifts(gift_id INTEGER PRIMARY KEY AUTOINCREMENT, person_id INTEGER, occ_id INTEGER, gift_idea VARCHAR, purchased BOOLEAN)', [], 
                                    function(tx, rs){
                                        //do something if it works
                                        console.info("Table GIFTS created");
                                    },
                                    function(tx, err){
                                        //failed to run query
                                        console.info( err.message);
                                    });
                    trans.executeSql('CREATE TABLE IF NOT EXISTS occasions(occ_id INTEGER PRIMARY KEY AUTOINCREMENT, occ_name VARCHAR)', [], 
                                    function(tx, rs){
                                        //do something if it works
                                        console.info("Table OCCASIONS created");
                                    },
                                    function(tx, err){
                                        //failed to run query
                                        console.info( err.message);
                                    });
                    trans.executeSql('CREATE TABLE IF NOT EXISTS people(people_id INTEGER PRIMARY KEY AUTOINCREMENT, people_name VARCHAR)', [], 
                                    function(tx, rs){
                                        //do something if it works
                                        console.info("Table PEOPLE created");
                                    },
                                    function(tx, err){
                                        //failed to run query
                                        console.info( err.message);
                                    });
                },
                function(err){
                    //error in changing version
                    //if the increment fails
                    console.info( err.message);
                },
                function(){
                    //successfully completed the transaction of incrementing the version number   
                });
        //addNavHandlers();
    }else{
        //version should be 1.0
        //this won't be the first time running the app
        console.info('Version: ', db.version)   
        //addNavHandlers();
    }
}



/*************DB CONNECTION*************************/




function hammerTime(){
    var cancelButtons = document.querySelectorAll('.btnCancel');
        
    //alert(cancelButtons[]);
    for(var i = 0; i < cancelButtons.length; i++){
            cancelButtons[i].addEventListener('click', app.cancel);
    }
    
    var saveButtons = document.querySelectorAll('.btnSave');
        
    //alert(cancelButtons[]);
    for(var i = 0; i < saveButtons.length; i++){
            saveButtons[i].addEventListener('click', app.save);
    }
    
    
var peoplePage = document.getElementById('people-list');    
var mc = new Hammer(peoplePage);
mc.on("swiperight", function(){ loadPage('occasions')});   
mc.on("swipeleft", function(){ loadPage('occasions')});
    
var peopleView = document.getElementById('peopleView');
    var mc2 = new Hammer(peopleView);
    mc2.on("tap", function(ev){
        document.getElementById('giftee').innerHTML = ev.target.innerHTML;
        loadPage('gifts-p');
    });

var occasionPage = document.getElementById('occasion-list');
var mc3 = new Hammer(occasionPage);
mc3.on("swiperight", function(){ loadPage('people')});
mc3.on("swipeleft", function(){ loadPage('people')});
    
var occasionView = document.getElementById('occasionView');
    var mc4 = new Hammer(occasionView);
    mc4.on("tap", function(ev){
        document.getElementById('occasiongiftee').innerHTML = ev.target.innerHTML;
        loadPage('gifts-o');
});
    
var purchased = document.getElementById('giftsPeople');
    var mc5 = new Hammer(purchased);
    mc5.on("tap", function(e){
        if(e.target.className == ""){
            e.target.className = "purchased";
        } else {
            e.target.className  = "";
        } 
    
})

var finishedOccasion = document.getElementById('giftsOccasions');
    var mc5 = new Hammer(finishedOccasion);
    mc5.on("tap", function(e){
        if(e.target.className == ""){
            e.target.className = "purchased";
        } else {
            e.target.className  = "";
        } 
    
})};



function loadPage(page){
    switch(page){
        case 'occasions': 
            document.getElementById('occasion-list').style.display = "block";
            document.getElementById('people-list').style.display = "none";
            document.getElementById('gift-person').style.display = "none";
            document.getElementById('gift-occasion').style.display = "none";
            
            break;
        
        case 'people': 
            document.getElementById('people-list').style.display = "block";
            document.getElementById('occasion-list').style.display = "none";
            document.getElementById('gift-person').style.display = "none";
            document.getElementById('gift-occasion').style.display = "none";
            break;
            
        case 'gifts-p': 
            document.getElementById('people-list').style.display = "none";
            document.getElementById('occasion-list').style.display = "none";
            document.getElementById('gift-person').style.display = "block";
            document.getElementById('gift-occasion').style.display = "none";
            break;
            
        case 'gifts-o': 
            document.getElementById('people-list').style.display = "none";
            document.getElementById('occasion-list').style.display = "none";
            document.getElementById('gift-person').style.display = "none";
            document.getElementById('gift-occasion').style.display = "block";
            break;
    }
}


function loadModes(modal){
   document.getElementById(modal).style.display="block";
    document.querySelector("[data-role=overlay]").style.display="block";
}




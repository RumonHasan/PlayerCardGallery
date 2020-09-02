// queries
const playerDOM = document.querySelector(".player-center");
// json file => parameter list: image, name, stats[4]

class playerData{
    async getPlayers(){ // in order to fetch the data from the json object 
        try{
            let result = await fetch("players.json");
            let Data = await result.json();
            let playerData = Data.player; // including the entire list of player.json in the player data list  
        
             playerData = playerData.map(playerIndex =>{ // transferring the items of the json file to players 
                const playerName = playerIndex.name;
                const {pace,skills,strengthShoot, dribble} = playerIndex.stats; // sub objects can have the same variable names
                const playerImage = playerIndex.image.url;
                
                return {playerName, pace, skills, strengthShoot, dribble, playerImage}
            })
            return playerData
        }
        catch(error){
            console.log("Failed to fetch the json player list ")
        }
    }
}

class UI{
    displayPlayers(playerItem){
        console.log(playerItem)// testing the console to check for json file 

        let resultArray = '';
        playerItem.forEach(playerIndex =>{
            resultArray = resultArray + `
            <div class="card">
            <div class="card-front face">
                <div class="content">
                    <img src=${playerIndex.playerImage} class="player-img">
                    <div class ="player-name">
                        <button class="player-btn" data-id="1">
                            ${playerIndex.playerName}
                        </button>
                    </div>   
                </div>
            </div>
            <div class="card-back face">
                <div class ="content-back">
                    <h1 class ="back-header">Player Stats</h1>
                    <div class ="skills-box">
                        <p>Pace</p>
                        <p>${playerIndex.pace}</p>
                        <div class ="skill">
                            <div class="skill-level" style ="width: ${playerIndex.pace}"></div>
                        </div>
                    </div>
                    <div class ="skills-box">
                        <p>Skills</p>
                        <p>${playerIndex.skills}</p>
                        <div class ="skill">
                            <div class="skill-level" style ="width: ${playerIndex.skills}"></div>
                        </div>
                    </div>
                    <div class ="skills-box">
                        <p>Strength & Shoot</p>
                        <p>${playerIndex.strengthShoot}</p>
                        <div class ="skill">
                            <div class="skill-level" style ="width: ${playerIndex.strengthShoot}"></div>
                        </div>
                    </div>
                    <div class ="skills-box">
                        <p>Dribble</p>
                        <p>${playerIndex.dribble}</p>
                        <div class ="skill">
                            <div class="skill-level" style ="width: ${playerIndex.dribble}"></div>
                        </div>
                    </div>
                </div>
            </div>
    </div> `

        })
        playerDOM.innerHTML = resultArray;
    } 
}

class storageConsole{
    static playerStorage(playerData){
        localStorage.setItem("playerData", JSON.stringify(playerData)) // setItem keyword enables the components to be stored
    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    // constructing instances 
    const ui = new UI(); 
    const players = new playerData();

    // retrieving the players then passing it through the ui class
    players.getPlayers().then(playerIndex=>{  
        ui.displayPlayers(playerIndex);
        storageConsole.playerStorage(playerIndex); //passing the players inside the local storage 
    })

})

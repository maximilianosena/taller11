let container = document.getElementById("container")

const url= "developer.marvel.com"

async function getInfo(){
    try{ 
        let response= await fetch(url);
    if (response.ok){
        let responseContents=await response.json();
    } else {
        console.log ("Error n°: " + response.status);
    }
    }
    catch (error){
        console.log (error)
    }
}

getInfo()
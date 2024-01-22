
// Écoutez les messages du contenu de la page
chrome.runtime.onMessage.addListener(function (message, sender, response) {
    if (message.from === 'content' && message.subject === 'sendDataToPopup') {
        // Utilisez les données renvoyées du serveur pour mettre à jour le HTML
        updatePopupHTML(message.data);
        p=message.data
        console.log("oke")
    }
});
console.log("hi");

chrome.tabs.query(
	{active: true, 
	currentWindow: true},
	function (tabs){
	chrome.tabs.sendMessage(tabs[0].id, 
		{from: 'popup',
	     subject: 'getData'});
        }
	);


function hideElements() {
    document.querySelectorAll('.chart-container, .progress-container, #seeMoreButton')
        .forEach(el => el.style.display = 'none');
}

function showElements() {
    document.querySelectorAll(' .progress-container,.chart-container, #seeMoreButton')
        .forEach(el => el.style.display = 'flex');
}
// Set up the event listener for the button
document.addEventListener('DOMContentLoaded', () => {
    
    var loadingBar = document.getElementById('loadingBar');
    // Show loading bar
    loadingBar.style.display = 'flex';
    hideElements();
    fetchDataFromServer();
});


function fetchDataFromServer() {
    fetch('http://127.0.0.1:5000/get_results')
    .then(response => {
        if (response.status === 202) {
            console.log("Data not ready, checking again...");
            setTimeout(fetchDataFromServer, 3000); // Check again after 3 seconds
        } else {
            return response.json(); // Parse the JSON file content
        }
    })
    .then(data => {
        if (data) {
            showElements();
            updatePopupWithReceivedData(data); // Function to update popup with the data
            document.getElementById('loadingBar').style.display = 'none';
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}



// Fonction pour mettre à jour le HTML du popup avec les données reçues
function updatePopupWithReceivedData(data) {
    // Utilisez les données renvoyées du serveur pour mettre à jour le HTML
    console.log('Data received in popup:', data);

    // Accédez aux pourcentages des variables indépendantes
    const negatif = data.general_sentiments.negative
    document.getElementById('negatifValue').textContent = `${negatif}%`;

    const positif = data.general_sentiments.positive
    document.getElementById('PositifValue').textContent = `${positif}%`;

    const neutre = data.general_sentiments.neutral
    document.getElementById('neutreValue').textContent = `${neutre}%`;

    
    // Sélectionnez l'élément path par sa classe
    var cercleDeProgression1 = document.querySelector('.circle-red');
    var cercleDeProgression2 = document.querySelector('.circle-green');
    var cercleDeProgression3 = document.querySelector('.circle-blue');
    

    // Mettez à jour la valeur de stroke-dasharray en fonction de la valeur dynamique
    cercleDeProgression1.setAttribute('stroke-dasharray', negatif + ', 100');
    cercleDeProgression2.setAttribute('stroke-dasharray', positif + ', 100');
    cercleDeProgression3.setAttribute('stroke-dasharray', neutre + ', 100');



    //categories
    

    var nom1 = data.feature_specific_analysis.Battery
    var nom2 = data.feature_specific_analysis.Price
    var nom3 = data.feature_specific_analysis.Connectivity
    var nom4 = data["feature_specific_analysis"]["Noise cancellation"]
    
    // Mettez à jour le contenu de la div
    document.getElementById("Categorie1").textContent = "Battery";
    document.getElementById("Categorie2").textContent = "Price";
    document.getElementById("Categorie3").textContent = "Connectivity";
    document.getElementById("Categorie4").textContent = "Noise cancellation";

    const neg1 = nom1.percentages.negative
    const pos1 = nom1.percentages.positive

    const neg2 = nom2.percentages.negative
    const pos2 = nom2.percentages.positive
    
    const neg3 = nom3.percentages.negative
    const pos3 = nom3.percentages.positive
    
    const neg4 = nom4.percentages.negative
    const pos4 = nom4.percentages.positive

// Obtenez les éléments par leur ID
    var progressBar1 = document.getElementById("progress-bar1");
    var progressRemaining1 = document.getElementById("progress-remaining1");
    
    var progressBar2 = document.getElementById("progress-bar2");
    var progressRemaining2 = document.getElementById("progress-remaining2");
    
    var progressBar3 = document.getElementById("progress-bar3");
    var progressRemaining3 = document.getElementById("progress-remaining3");

    var progressBar4 = document.getElementById("progress-bar4");
    var progressRemaining4 = document.getElementById("progress-remaining4");

    // Mettez à jour les styles et le texte
    progressBar1.style.width = `${neg1}%`;
    progressBar1.textContent = `${neg1}%`;
    progressRemaining1.textContent = `${pos1}%`;

    progressBar2.style.width = `${neg2}%`;
    progressBar2.textContent = `${neg2}%`;
    progressRemaining2.textContent = `${pos2}%`;

    progressBar3.style.width = `${neg3}%`;
    progressBar3.textContent = `${neg3}%`;
    progressRemaining3.textContent = `${pos3}%`;

    progressBar4.style.width = `${neg4}%`;
    progressBar4.textContent = `${neg4}%`;
    progressRemaining4.textContent = `${pos4}%`;

}
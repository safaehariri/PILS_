chrome.runtime.sendMessage(
	{
		from: 'content',
		subject: 'getTabId'
	});
	function scrollToLoadElements(selector, callback, maxScrolls = 10, interval = 500) {
		let scrolledTimes = 0;
	
		const intervalId = setInterval(() => {
			window.scrollBy(0, 3000); // Fait défiler la page de 1000 pixels
			scrolledTimes++;
	
			// Vérifie si les éléments sont présents
			if (document.querySelectorAll(selector).length > 0 || scrolledTimes >= maxScrolls) {
				clearInterval(intervalId);
				callback(); // Appelle la fonction de callback après le chargement des éléments
			}
		}, interval);
	}
	
	function scrapeData() {
		// Define an array to hold the scraped data
		let scrapedData = [];
	
		// Select elements of interest, e.g., product reviews
		// Replace '.review-class' with the actual class name or selector of the elements you want to scrape
		let elements = document.querySelectorAll('.cr-lighthouse-term[data-hook="lighthouse-term"]');

		elements.forEach((element) => {
			// Extract text or any other attribute from the element
			let elementText = element.innerText; // Use .innerText or .textContent
	
			// Add the extracted data to the array
			scrapedData.push(elementText);
		});
		return scrapedData
	}

	function sendDataToServer(data) {
		console.log("hi")
		fetch('http://127.0.0.1:5000/receive_data', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
		.then(response => response.json())
		.then(data => {
			console.log('Success:', data);
		})
		.catch((error) => {
			console.error('Error:', error);
		});
	}
	
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
				updatePopupWithReceivedData(data); // Function to update popup with the data
			}
		})
		.catch((error) => {
			console.error('Error:', error);
		});
	}
	
	 
	const currentUrl = window.location.href;
	chrome.runtime.onMessage.addListener(function(message, sender, response) {
		if (message.from === 'popup' && message.subject === 'getData') {
			scrollToLoadElements('.cr-lighthouse-term[data-hook="lighthouse-term"]', () => {
				let scrapedData = scrapeData(); // Récupérer les données scrapées
				sendDataToServer({ url: currentUrl, data: scrapedData }); // Envoyer les données et l'URL au serveur
				//fetchDataFromServer();
			});
			
			// Envoie la requête pour récupérer les données du serveur
			
			// Start the review scraping process
			
		}
	});
	
	
	
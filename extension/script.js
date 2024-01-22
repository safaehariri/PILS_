document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour extraire et afficher les commentaires
    function extractAndDisplayComments(csvFilePath, containerId) {
        fetch(csvFilePath)
            .then(response => response.text())
            .then(data => {
                const lines = data.split('\n');
                const commentsContainer = document.getElementById(containerId);
  
                for (let i = 0; i < lines.length; i++) {
                    const comment = lines[i].trim();
  
                    // Ignorer les lignes vides
                    if (comment !== '') {
                        // Créer un paragraphe pour chaque commentaire et l'ajouter au conteneur
                        const commentElement = document.createElement('p');
                        commentElement.textContent = comment;
                        commentsContainer.appendChild(commentElement);
                    }
                }
            })
            .catch(error => console.error(`Erreur lors de la récupération du fichier CSV ${csvFilePath}`, error));
    }
  
    // Utiliser la fonction pour chaque fichier CSV et chaque conteneur
    extractAndDisplayComments('comments1.csv', 'comments_container_1');
    extractAndDisplayComments('comments2.csv', 'comments-container-2');
    extractAndDisplayComments('comments2.csv', 'comments-container-3');
    extractAndDisplayComments('comments_neg.csv', 'comments_container_1_neg');
    // Ajoutez autant d'appels à extractAndDisplayComments que nécessaire
  });
  
  
  // script.js
  
  document.addEventListener('DOMContentLoaded', function() {
    const triggerElement = document.getElementById('triggerElement');
    const comments_container_1 = document.getElementById('comments_container_1');
    const comments_container_1_neg = document.getElementById('comments_container_1_neg');
  
    triggerElement.addEventListener('mouseover', function() {
        comments_container_1.classList.add('hidden');
        comments_container_1_neg.classList.remove('hidden');
    });
  
    triggerElement.addEventListener('mouseout', function() {
        comments_container_1.classList.remove('hidden');
        comments_container_1_neg.classList.add('hidden');
    });
  });
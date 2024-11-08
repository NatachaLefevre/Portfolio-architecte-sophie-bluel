document.addEventListener("DOMContentLoaded", function() {
    // Votre code JavaScript ici
  });


// Récupérer le formulaire de connexion
const form = document.querySelector('form');

// Écouter l'événement de soumission du formulaire
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    // Récupérer les valeurs du formulaire
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    // Créer un objet avec les données du formulaire
    const data = {
        email: email,
        password: password
    };

    function afficherMessageErreur() {
        var element = document.getElementById('errorMessage');
        element.classList.add('visible'); 
        // Pour afficher le message d'erreur si on tape les mauvais identifiants
      }
      
      function cacherMessageErreur() {
        var element = document.getElementById('errorMessage');
        element.classList.remove('visible');
        // Le message d'erreur est masqué par défaut
      }

    // Envoyer les données à un serveur (ex. en utilisant Fetch API ou une bibliothèque comme Axios)
    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            console.log(response.status);
            if (response.ok) {
                // Succès de la connexion
                window.location.href = "/FrontEnd/index.html";
            } else {
                // Gestion de l'erreur

                if (response.status === 404) {
                    // Utilisateur non trouvé (tel que précisé dans l'API (erreur 404))
                    console.error('Les identifiants que vous avez saisis sont incorrects. Veuillez vérifier et réessayer.');
                    console.log("Le message d'erreur devrait être affiché ici.")
                    afficherMessageErreur(); // Appel de la fonction pour afficher le message d'erreur
                
                } else if (response.status === 401) {
                    // Utilisateur non autorisé (à voir comment reproduire cette situation)
                    console.error('Vous n\'êtes pas autorisé à accéder à cette ressource. Veuillez vous connecter avec des identifiants valides.');
                    
               
                } else {
                    // Autre erreur
                    console.error('Une erreur s\'est produite. Veuillez réessayer ultérieurement.');
                   
                }
            }

        })
        .catch(error => {
            console.error(error);
        });
    // La fonction .catch() est utilisée pour capturer les erreurs 
    // qui peuvent survenir pendant l'exécution de la requête Fetch

});
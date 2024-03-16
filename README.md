# MUSQLAC-ChatBot

## Exécuter le projet
Téléchargez les fichiers "index.html", "index.js", et "style.css" dans un même dossier.
Ouvrez index.js.

## Processus de prompt engineering
Utilisation de "Instruction-based prompts" et "Contextual prompts"

Tentative d'utilisation de prompts simple tells que 
"Voici les symptômes du patient : {Symptomes}. Quel traitement devrait-il recevoir"

Puis complexification des demandes, ajout de contexte, ajout de dictionnaire, ajout de questions supplémentaires, nettoyage des réponses


## Scénarios
### Scénario 1
Utilisateur : I have chest pain
Bot : You might have pneumonia. I need more informations to be sure. Do you have a cough ? Do you have a fever ? Do you have a history of smoking ? If you have the answer to one of these questions, please answer.
Utilisateur : I have a little cough, a little fever, and i do not smoke
Bot : You might have a simple cough, or a pneumonia. You should drink a lot of water, and if the cough persists, you should see a doctor.


### Scénario 2  
Utilisateur : I have pain in my leg
Bot : It could be a muscle pain, or a bone pain. Can you describe your pain ? - You haven't told me about your pain's location. Where do you feel the pain ? - Your pain is not very clear. Can you describe it ? Is it a dull, a sharp or a burning pain ? - You haven't told me about the pain's strength. How strong is the pain ?
Utilisateur : Acutepain, near the knee, sharp
Bot : You might have a meniscal tear, you should probagly go to the doctor.

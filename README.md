# Nomad Journeys - Site de Voyage

Un site web de réservation de voyages moderne et responsive, construit avec HTML, CSS, et JavaScript.

## Fonctionnalités

- Interface utilisateur moderne et responsive
- Formulaire de recherche pour vols + hôtels, séjours, vols seuls, et hôtels
- Section des meilleures destinations avec effets de survol
- Support multilingue (FR/EN)
- Animations fluides et transitions
- Compatible mobile

## Structure du Projet

```
nomad-journeys/
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
│   ├── logo.png
│   ├── hero-bg.jpg
│   ├── dest-1.jpg
│   ├── dest-2.jpg
│   ├── dest-3.jpg
│   └── dest-4.jpg
└── index.html
```

## Installation

1. Clonez ce dépôt :
```bash
git clone https://github.com/votre-username/nomad-journeys.git
```

2. Naviguez vers le dossier du projet :
```bash
cd nomad-journeys
```

3. Ouvrez `index.html` dans votre navigateur ou utilisez un serveur local.

## Utilisation d'un Serveur Local

Pour démarrer un serveur local, vous pouvez utiliser Python :

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Puis ouvrez `http://localhost:8000` dans votre navigateur.

## Technologies Utilisées

- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 5.3.0
- Font Awesome 6.0.0

## Personnalisation

### Images
- Remplacez les images dans le dossier `images/` avec vos propres images
- Assurez-vous que les nouvelles images correspondent aux dimensions recommandées :
  - Hero background: 1920x1080px
  - Destination cards: 800x600px
  - Logo: 200x40px

### Styles
- Les couleurs principales peuvent être modifiées dans le fichier `css/style.css` en ajustant les variables CSS dans `:root`
- Les styles responsives sont inclus dans les media queries à la fin du fichier CSS

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commit vos changements
4. Push vers la branche
5. Ouvrir une Pull Request

## License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails. 
# Révisions ProgWeb et ProgServ2

Application de révision pour iPad, qui fonctionne **hors ligne** une fois ouverte une première fois.

## Mettre en ligne avec GitHub Pages
1. Sur github.com, ouvrez votre dépôt (public).
2. **Add file → Upload files**, glissez **tout le contenu** de ce dossier (y compris le dossier `icons`), puis **Commit changes**.
   Les fichiers doivent être à la racine du dépôt : `index.html` directement visible, pas dans un sous-dossier.
3. **Settings → Pages** : sous « Build and deployment », Source = **Deploy from a branch**, Branch = **main**, dossier **/ (root)**, puis **Save**.
4. Attendez une à deux minutes. L'adresse s'affiche en haut de la page Pages : `https://VOTRE-NOM.github.io/NOM-DU-DEPOT/`.

## Installer sur l'iPad (avant de partir, avec internet)
1. Ouvrez l'adresse dans **Safari**.
2. Bouton **Partager → Sur l'écran d'accueil → Ajouter**.
3. Ouvrez l'application depuis l'icône **Révisions**, et naviguez un peu (ouvrez une leçon, une question).
4. **Testez le hors ligne** : activez le mode avion, fermez l'application, rouvrez-la. Elle doit s'afficher normalement.

La progression (XP, réponses, erreurs) est enregistrée sur l'iPad, dans l'application de l'écran d'accueil.
Attention : Safari et l'icône de l'écran d'accueil ont chacun leur propre progression. Utilisez toujours l'icône.

## Mettre à jour le contenu
Remplacez les fichiers dans le dépôt, puis changez `VERSION` dans `sw.js` (par exemple `revisions-v2`) pour que l'iPad télécharge la nouvelle version à la prochaine ouverture avec internet.

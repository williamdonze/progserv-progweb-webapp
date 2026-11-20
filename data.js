/* ---------- Contenu ---------- */
const CHAPTERS = [
  { id: "pw-bases", course: "pw", title: "Bases et fonctions", tp: "TP 1 · Initiation aux fonctions",
    points: [
      "`===` compare la valeur et le type ; `==` convertit avant de comparer. `4 == '4'` → true, `4 === '4'` → false, `4.0 === 4` → true (c'est le même nombre).",
      "`const` interdit de réassigner la variable, pas de modifier son contenu : `const t = []; t.push(1);` fonctionne.",
      "`let` et `const` n'existent que dans le bloc `{ }` où ils sont déclarés. On n'utilise pas `var`.",
      "Entier aléatoire entre min et max inclus : `Math.floor(Math.random() * (max - min + 1)) + min`.",
      "Modulo : `n % 2 === 0` → pair ; `n % 7 === 0` → multiple de 7.",
      "Une fonction est une valeur : on peut la passer en paramètre (callback) ou la retourner (closure).",
      "Fonction fléchée : `n => n * 2` retourne la valeur ; avec des accolades `n => { return n * 2; }` il faut écrire `return`.",
      "Closure : une fonction retournée se souvient des variables de la fonction qui l'a créée.",
      "Paramètre rest `...args` : regroupe tous les arguments reçus dans un vrai tableau."
    ],
    code: `const double = n => n * 2;
const square = n => n * n;
const transform = (n, fn) => fn(n);
transform(5, square);          // 25

function repeatTransform(n, fn, times) {
  let result = n;
  for (let i = 0; i < times; i++) result = fn(result);
  return result;
}
repeatTransform(2, double, 3); // 16

function createGreeting(greeting) {
  return name => \`\${greeting} \${name} !\`;
}
createGreeting('Hello')('Ada'); // "Hello Ada !"`
  },
  { id: "pw-tableaux", course: "pw", title: "Tableaux et méthodes", tp: "TP 2 · Tableaux et programmation fonctionnelle",
    points: [
      "Ne modifient pas l'original : `forEach`, `map`, `filter`, `reduce`, `some`, `every`, `find`, `indexOf`, `slice`, `toSorted`.",
      "Modifient l'original : `sort`, `push`, `pop`, `shift`, `unshift`, `splice`, `reverse`.",
      "`map` → nouveau tableau de même longueur ; `filter` → les éléments pour lesquels la fonction renvoie true ; `reduce((acc, x) => …, init)` → une seule valeur.",
      "`some` → au moins un ; `every` → tous. Sur un tableau vide : `some` → false, `every` → true.",
      "`forEach` renvoie `undefined` : il sert à faire quelque chose, pas à produire un tableau.",
      "`indexOf(v)` renvoie -1 si v est absent ; `find(fn)` renvoie `undefined` si rien ne correspond.",
      "`slice(1)` → sans le premier ; `slice(0, -1)` → sans le dernier ; `[...t, x]` ajoute à la fin, `['Lorem', ...t]` au début.",
      "Tri sans fonction = tri de texte : `[10, 9, 1]` devient `[1, 10, 9]`. Nombres : `(a, b) => a - b` ; chaînes : `(a, b) => a.localeCompare(b)`.",
      "`Math.max(...t)` : le spread étale le tableau en arguments. `Math.max(t)` donne `NaN`."
    ],
    code: `const numbers = Object.freeze([3, 14, 15, 92, 65]);
numbers.map(n => n * 2);                // [6, 28, 30, 184, 130]
numbers.filter(n => n % 2 !== 0);       // [3, 15, 65]
numbers.reduce((acc, n) => acc + n, 0); // 189
numbers.some(n => n % 9 === 0);         // false
numbers.every(n => n > 0);              // true
numbers.toSorted((a, b) => a - b);      // copie triée
Math.max(...numbers);                   // 92
// Pairs d'abord, ordre conservé dans chaque groupe :
[...numbers.filter(n => n % 2 === 0), ...numbers.filter(n => n % 2 !== 0)];`
  },
  { id: "pw-objets", course: "pw", title: "Objets et collections", tp: "TP 2 · Exercice 3, le jeu de cartes",
    points: [
      "Accès : `card.rank` ou `card['rank']`. Les crochets servent quand la clé est dans une variable : `card[key]`.",
      "Tableau d'objets : `cards.map(c => c.rank)` extrait une propriété ; `cards.filter(c => c.suit === 'hearts')` garde certains objets.",
      "Parcours : `for (const c of cards)` donne les valeurs ; `for (const k in obj)` donne les clés (des chaînes, même sur un tableau) ; `Object.entries(obj)` donne les paires [clé, valeur].",
      "Déstructuration : `const { rank, suit } = card;` et `const [first, ...rest] = cards;`.",
      "`[...deck]` copie le tableau, mais les objets à l'intérieur sont les mêmes : modifier `copy[0].rank` modifie aussi `deck[0].rank`.",
      "`Object.freeze` empêche de modifier le tableau lui-même (ajouter, retirer, remplacer un élément).",
      "Fonction de comparaison : négatif si a < b, 0 si égaux, positif si a > b. Exemple : `(a, b) => a.rank - b.rank`.",
      "Fisher–Yates : pour i du dernier indice jusqu'à 1, tirer j entre 0 et i inclus, puis échanger `t[i]` et `t[j]`."
    ],
    code: `const SUITS = ['hearts', 'spades', 'clubs', 'diamonds'];

function buildBaseDeck() {
  const deck = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) deck.push({ rank, suit });
  }
  return deck;                       // 52 cartes
}

function shuffleInPlace(t) {
  for (let i = t.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [t[i], t[j]] = [t[j], t[i]];     // échange par déstructuration
  }
}

function getHighestCard(hand) {
  let best = hand[0];
  for (const c of hand) if (c.rank > best.rank) best = c; // > strict : garde la première
  return best;
}`
  },
  { id: "pw-dom", course: "pw", title: "DOM : sélectionner et modifier", tp: "TP 3 · Manipulation du DOM",
    points: [
      "`querySelector(sel)` → le premier élément ou `null` ; `querySelectorAll(sel)` → une NodeList (elle a `forEach`, pas `map` ni `filter`).",
      "`[...el.querySelectorAll(sel)]` transforme la NodeList en vrai tableau.",
      "Chercher dans un conteneur seulement : `deck.querySelectorAll('.heart')` ne regarde que les descendants de `deck`.",
      "Sélecteurs : `#id`, `.classe`, `[attribut]`, `a, b` (l'un ou l'autre), `.a.b` (les deux sur le même élément), `.a .b` (b à l'intérieur de a), `:not(.a)`.",
      "`document.getElementById('hand')` s'écrit sans `#`.",
      "Classes : `classList.add`, `remove`, `toggle`, `contains`.",
      "`textContent` insère du texte brut ; `innerHTML` interprète du HTML (à éviter avec une saisie de l'utilisateur).",
      "Attributs : `setAttribute`, `getAttribute`, `removeAttribute`, `hasAttribute`. `data-face-card` se lit `el.dataset.faceCard` (tiret → majuscule).",
      "Parcours : `parentElement`, `children`, `previousElementSibling`, `nextElementSibling` (null s'il n'y en a pas), `closest(sel)`.",
      "Insérer : `append` (fin), `prepend` (début), `before`, `after`, `replaceChildren(...noeuds)`. Supprimer : `el.remove()`.",
      "Un `<script type=\"module\">` dans le `<head>` s'exécute après la lecture du HTML : le DOM est déjà prêt."
    ],
    code: `const deck = document.querySelector('.deck');

function clearSelection() {
  deck.querySelectorAll('.selected').forEach(c => c.classList.remove('selected'));
}

deck.querySelector('#SPADE-ACE');                    // 1 carte
deck.querySelectorAll('.heart');                     // 13
deck.querySelectorAll('.heart, .diamond');           // 26
deck.querySelectorAll('[data-face-card]');           // 12
deck.querySelectorAll('.heart[data-face-card], .diamond[data-face-card]'); // 6
deck.querySelectorAll('playing-card:not(.spade)');   // 39`
  },
  { id: "pw-clones", course: "pw", title: "Cloner et templates", tp: "TP 3 et 4 · Tirer une main, créer des cartes",
    points: [
      "`el.cloneNode(true)` copie l'élément avec tous ses enfants ; `cloneNode()` copie seulement la balise et ses attributs, sans contenu.",
      "Un clone garde l'`id` de l'original : on le retire avec `removeAttribute('id')` pour éviter deux éléments avec le même id.",
      "Un clone n'apparaît pas dans la page tant qu'on ne l'insère pas (`append`, `replaceChildren`…).",
      "`append` d'un élément déjà présent dans la page le déplace : il n'existe jamais en deux exemplaires.",
      "Le contenu d'un `<template>` n'est pas affiché et n'est pas dans le DOM de la page : on y accède par `template.content`.",
      "Méthode : récupérer une fois le modèle au démarrage, le cloner à chaque création, ne jamais modifier le modèle lui-même.",
      "`replaceChildren(...cards)` vide le conteneur et insère les nouveaux éléments en une seule opération ; sans argument, il vide le conteneur."
    ],
    code: `const deckCards = [...document.querySelectorAll('.deck playing-card')];

document.querySelector('#draw-hand').addEventListener('click', () => {
  const copy = [...deckCards];
  shuffleInPlace(copy);
  const handCards = copy.slice(0, 5).map(card => {
    const clone = card.cloneNode(true);
    clone.removeAttribute('id');
    clone.classList.remove('selected');
    return clone;
  });
  document.querySelector('#hand').replaceChildren(...handCards);
});

const tmplItem = document.querySelector('#item-template').content.querySelector('article.item');
function createItem(name) {
  const item = tmplItem.cloneNode(true);
  item.querySelector('.name').textContent = name;
  return item;
}`
  },
  { id: "pw-events", course: "pw", title: "Événements et délégation", tp: "TP 4 · DOM et délégation d'événements",
    points: [
      "`el.addEventListener('click', fn)` : `fn` reçoit un objet `event`.",
      "`submit` se déclenche sur le `<form>` : par le bouton d'envoi comme par la touche Entrée dans un champ. On écoute donc `submit`, pas `click`.",
      "`event.preventDefault()` annule l'action par défaut. Pour un formulaire : pas d'envoi, pas de rechargement de la page.",
      "Propagation : l'événement part de l'élément cliqué et remonte vers ses parents jusqu'au document.",
      "`event.target` = l'élément réellement cliqué (par exemple un `<span>` dans le bouton) ; `event.currentTarget` = l'élément qui porte l'écouteur.",
      "Délégation : un seul écouteur sur un parent, puis `event.target.closest('button[data-action]')` pour retrouver le bouton. Si c'est `null`, on ignore le clic.",
      "Avantages de la délégation : un seul écouteur, et elle marche aussi pour les éléments ajoutés après coup.",
      "`confirm('…')` renvoie true ou false ; on supprime seulement si c'est true.",
      "Valeur d'un champ : `input.value.trim()` ; `form.reset()` vide le formulaire."
    ],
    code: `const TIERS = ['S', 'A', 'B', 'C', 'D'];

document.querySelector('#add-item-form').addEventListener('submit', event => {
  event.preventDefault();
  const input = event.currentTarget.querySelector('input');
  const name = input.value.trim();
  if (name === '') return;
  document.querySelector('#tier-s .items').append(createItem(name));
  event.currentTarget.reset();
});

document.querySelector('#tiers').addEventListener('click', event => {
  const btn = event.target.closest('button[data-action]');
  if (!btn) return;
  const card = btn.closest('.item');
  const action = btn.dataset.action;
  if (action === 'delete' && confirm('Supprimer ?')) card.remove();
  if (action === 'up' || action === 'down') {
    const i = TIERS.indexOf(card.closest('.tier').dataset.tier);
    const j = action === 'up' ? i - 1 : i + 1;
    if (j < 0 || j >= TIERS.length) return;
    document.querySelector(\`.tier[data-tier="\${TIERS[j]}"] .items\`).append(card);
  }
});`
  },

  { id: "ps-php", course: "ps", title: "Rappels PHP", tp: "Séance 1",
    points: [
      "Architecture client-serveur : le navigateur (client) envoie une requête HTTP ; le serveur web (Apache, Nginx, ou `php -S` en local) la passe à l'interpréteur PHP, qui peut lire la base de données et l'espace de stockage, puis renvoie le résultat. L'hébergement (Infomaniak en cours) fournit tout cela en ligne.",
      "PHP s'exécute sur le serveur : le navigateur ne comprend pas le PHP et ne reçoit que le résultat (HTML, CSS, JavaScript).",
      "Constantes : `define('PI', 3.14159);` ou `const EULER = 2.71828;`. En majuscules, sans `$`, impossibles à modifier.",
      "Fonctions typées avec valeur par défaut : `function greet(string $name = 'World'): string`. `add(2.5, 'Hello')` sur des `int` provoque une erreur de type.",
      "Types de base : `int`, `float`, `string`, `bool`, `array`, `object` (sans type : `mixed`).",
      "Variables `$nom` ; concaténation avec `.` ; `\"Bonjour $nom\"` remplace la variable, `'Bonjour $nom'` ne la remplace pas.",
      "Tableau indexé `[1, 2, 3]` ; associatif `['nom' => 'Ada', 'age' => 36]` ; parcours `foreach ($t as $cle => $valeur)`.",
      "Formulaire : `$_GET` contient les paramètres de l'URL, `$_POST` le corps de la requête (formulaire en `method=\"post\"`).",
      "`isset($x)` : la variable existe et n'est pas null. `empty($x)` : absente, vide, 0 ou ''.",
      "`??` donne une valeur par défaut : `$_GET['page'] ?? 'accueil'`.",
      "`===` compare valeur et type, comme en JavaScript.",
      "`<?= $x ?>` est le raccourci de `<?php echo $x; ?>`."
    ],
    code: `<?php
$fruits = ['pomme' => 3, 'poire' => 5];
foreach ($fruits as $nom => $quantite) {
    echo "<li>$nom : $quantite</li>";
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
}`
  },
  { id: "ps-poo", course: "ps", title: "Programmation orientée objet", tp: "Séance 2",
    points: [
      "La POO est un paradigme (une façon de représenter l'information) qui regroupe les données et les comportements dans des classes.",
      "Concepts clés : classes, objets (instances), attributs (l'état), méthodes (les comportements), encapsulation, constructeurs et destructeurs, interfaces, héritage, classes abstraites.",
      "Avantages : lisibilité, réutilisabilité, maintenabilité. Désavantages : complexité (surtout pour une petite application), performance un peu moindre (souvent négligeable).",
      "Une classe est un plan ; un objet (une instance) est créé en mémoire avec `new`.",
      "`__construct` s'exécute à la création de l'objet ; `$this` désigne l'objet courant.",
      "`__destruct` s'exécute quand l'objet est détruit : à la fin du script, ou quand plus rien ne le référence (variable mise à `null` ou réassignée).",
      "Visibilité : `public` partout ; `protected` dans la classe et ses sous-classes ; `private` seulement dans la classe.",
      "Encapsulation : attributs `private` et méthodes publiques (getters, setters) qui contrôlent l'accès.",
      "`->` pour une instance (`$pet->getName()`) ; `::` pour le statique et les constantes (`Pet::SPECIES`, `self::$count`).",
      "`static` : appartient à la classe, pas à un objet ; partagé par toutes les instances.",
      "Héritage : `class Dog extends Pet`. Une seule classe parente. `parent::__construct(...)` appelle le constructeur du parent.",
      "Une sous-classe peut redéfinir une méthode héritée, et appeler l'original avec `parent::methode()`.",
      "Classe `abstract` : ne peut pas être instanciée ; ses méthodes abstraites doivent être écrites par les sous-classes.",
      "Interface : un contrat, une liste de méthodes publiques à implémenter. Une classe peut `implements` plusieurs interfaces.",
      "Limites : pas d'héritage multiple en PHP. Éviter les hiérarchies trop profondes, difficiles à comprendre et à maintenir.",
      "Organisation : une classe par fichier dans `src/` (Animal.php, Pet.php, Dog.php…), chaque fichier inclut son parent avec `require`."
    ],
    code: `<?php
class Pet {
    public const SPECIES = 'inconnue';
    private static int $count = 0;

    public function __construct(private string $name, protected int $age) {
        self::$count++;
    }
    public function getName(): string { return $this->name; }
    public function describe(): string { return "{$this->name}, {$this->age} ans"; }
    public static function getCount(): int { return self::$count; }
}

class Dog extends Pet {
    public function describe(): string {
        return parent::describe() . ' (chien)';
    }
}

$rex = new Dog('Rex', 4);
echo $rex->describe();   // Rex, 4 ans (chien)
echo Pet::getCount();    // 1`
  },
  { id: "ps-pdo", course: "ps", title: "Bases de données et PDO", tp: "Séance 3 · MySQL/MariaDB et déploiement",
    points: [
      "Connexion : `new PDO('mysql:host=…;dbname=…;charset=utf8mb4', $user, $pass)`.",
      "`PDO::ERRMODE_EXCEPTION` : une erreur SQL lance une exception au lieu d'échouer en silence.",
      "Requête préparée : `prepare` (avec `:email` ou `?`), puis `bindValue` ou un tableau passé à `execute`, puis `fetch` ou `fetchAll`.",
      "`fetch()` renvoie une ligne, ou `false` s'il n'y en a pas ; `fetchAll()` renvoie un tableau, vide s'il n'y a rien.",
      "`PDO::FETCH_ASSOC` : chaque ligne est un tableau associatif (`$row['email']`).",
      "`$pdo->lastInsertId()` : l'id généré par le dernier `INSERT`.",
      "SQL : `SELECT … FROM … WHERE`, `INSERT INTO t (a, b) VALUES (…)`, `UPDATE t SET a = … WHERE …`, `DELETE FROM t WHERE …`.",
      "Sans `WHERE`, `UPDATE` et `DELETE` touchent toutes les lignes de la table.",
      "Contraintes : `PRIMARY KEY`, `AUTO_INCREMENT`, `UNIQUE`, `NOT NULL`, `FOREIGN KEY`.",
      "Formulaire : validation côté serveur (un tableau `$errors`, une condition par règle) obligatoire ; validation côté client (`required`, `minlength`, `type=\"email\"`, `min`) seulement pour le confort, car elle se contourne.",
      "Conserver la saisie en cas d'erreur : `value=\"<?= htmlspecialchars($firstName ?? '') ?>\"`.",
      "Exceptions : un « signal d'alarme ». On la jette avec `throw new Exception('…')`, on l'attrape avec `try { … } catch (Exception $e) { echo $e->getMessage(); }`. Si personne ne l'attrape, le script s'arrête.",
      "Fichier de configuration `config/database.ini` (host, port, database, username, password), lu avec `parse_ini_file`. On modifie les paramètres sans toucher au code et on garde les mots de passe hors du code.",
      "Déploiement : en local, une base MariaDB (Docker, phpMyAdmin) ; en production, l'hébergement Infomaniak avec sa propre base MariaDB, et le fichier de configuration adapté."
    ],
    code: `<?php
const DATABASE_CONFIGURATION_FILE = __DIR__ . '/../config/database.ini';
$config = parse_ini_file(DATABASE_CONFIGURATION_FILE, true);
if (!$config) {
    throw new Exception('Erreur lors de la lecture du fichier de configuration');
}
$host = $config['host']; $port = $config['port']; $database = $config['database'];

try {
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$database;charset=utf8mb4",
                   $config['username'], $config['password']);
} catch (PDOException $e) {
    die('Connexion impossible : ' . $e->getMessage());
}
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stmt = $pdo->prepare('SELECT * FROM users WHERE email = :email');
$stmt->execute(['email' => $email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);   // tableau ou false

$stmt = $pdo->prepare('INSERT INTO users (email, password) VALUES (:email, :password)');
$stmt->execute(['email' => $email, 'password' => password_hash($mdp, PASSWORD_DEFAULT)]);
$id = $pdo->lastInsertId();`
  },
  { id: "ps-include", course: "ps", title: "Réutiliser des parties d'interface", tp: "Séance 4",
    points: [
      "`include` : si le fichier manque, un avertissement et le script continue.",
      "`require` : si le fichier manque, une erreur fatale et le script s'arrête.",
      "`include_once` / `require_once` : le fichier n'est inclus qu'une fois, même demandé plusieurs fois.",
      "Dans le cours : `require_once` pour les fichiers de fonctions et de constantes (pas de redéfinition) ; `require` pour les parties d'interface, qu'on peut inclure plusieurs fois dans une même page.",
      "On sort les parties communes (`head.php`, `header.php`, `footer.php`) : une modification se fait à un seul endroit.",
      "Composant avec variables : le fichier inclus voit les variables de la page. Dans `head.php` : `<title><?= htmlspecialchars($title ?? 'ninetendogs') ?></title>`.",
      "Piège du cours : le `??` va à l'intérieur de `htmlspecialchars`. `htmlspecialchars($title) ?? 'x'` n'utilise jamais la valeur par défaut, car `htmlspecialchars` ne renvoie jamais null.",
      "Défaut de cette approche : rien n'indique quelles variables le composant attend, et une faute de nom passe en silence. Solution : une fonction `render($component, $data)` qui passe les valeurs explicitement (avec `extract`).",
      "On échappe tout ce qu'on affiche, même ce qui vient de notre propre code : c'est une habitude contre le XSS.",
      "`__DIR__` est le dossier du fichier courant, pour des chemins fiables : `require __DIR__ . '/../src/functions.php';`."
    ],
    code: `<?php // index.php
$title = 'Mes animaux';
$description = 'Liste de mes animaux';
?>
<!DOCTYPE html>
<html>
<?php require __DIR__ . '/components/head.php'; ?>
<body>
    <?php require __DIR__ . '/components/header.php'; ?>
    <main>…</main>
    <?php require __DIR__ . '/components/footer.php'; ?>
</body>
</html>

<?php // Version explicite (src/functions.php)
function render(string $component, array $data = []): void {
    $componentPath = __DIR__ . '/../components/' . $component . '.php';
    extract($data, EXTR_SKIP);  // les clés deviennent des variables
    require $componentPath;     // require : affichable plusieurs fois
}
render('head', ['title' => 'Mes animaux']);`
  },
  { id: "ps-securite", course: "ps", title: "Sécurité et nettoyage des saisies", tp: "Séance 5",
    points: [
      "Validation = vérifier que la saisie respecte des règles (un email valide, une longueur), et la rejeter sinon. Nettoyage = supprimer ou échapper les caractères spéciaux ou malveillants.",
      "Échapper = remplacer un caractère spécial par une séquence lue comme du texte : `<` → `&lt;`, `>` → `&gt;`, `&` → `&amp;`, `\"` → `&quot;`, `'` → `&apos;`.",
      "Règle de base : ne jamais faire confiance au client. `$_GET`, `$_POST` et `$_COOKIE` peuvent contenir n'importe quoi.",
      "Injection SQL : la saisie est collée dans la requête et en change le sens (`' OR '1'='1`). Protection : requêtes préparées, jamais de concaténation.",
      "XSS : la saisie contient du HTML ou du JavaScript réaffiché dans la page (`<script>`). Protection : `htmlspecialchars($valeur)` au moment de l'affichage.",
      "`htmlspecialchars('<b>')` donne `&lt;b&gt;` : le navigateur affiche le texte au lieu de l'interpréter.",
      "`htmlspecialchars` protège l'affichage, pas la base de données ; les requêtes préparées protègent la base, pas l'affichage.",
      "Validation côté serveur : `trim`, champs obligatoires, longueurs, `filter_var($email, FILTER_VALIDATE_EMAIL)` (renvoie l'email ou false), `is_numeric`.",
      "La validation HTML (`required`, `type=\"email\"`) est un confort pour l'utilisateur, pas une sécurité : elle se contourne facilement."
    ],
    code: `<?php
$errors = [];
$name  = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$age   = $_POST['age'] ?? '';

if ($name === '' || strlen($name) > 50) $errors[] = 'Nom requis (50 caractères max).';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Email invalide.';
if (!is_numeric($age) || $age < 0 || $age > 120) $errors[] = 'Âge invalide.';
?>
<p>Bonjour <?= htmlspecialchars($name) ?></p>`
  },
  { id: "ps-cookies", course: "ps", title: "Cookies et i18n", tp: "Séance 6",
    points: [
      "!HTTP est sans état (stateless) : chaque requête est indépendante, le serveur ne se souvient pas de la précédente. Cookies et sessions comblent ce manque.",
      "Un cookie est un petit fichier texte stocké dans le navigateur. Le serveur l'envoie avec l'en-tête HTTP `Set-Cookie` ; le navigateur le renvoie ensuite à chaque requête vers le même domaine, avec l'en-tête `Cookie`.",
      "Usages : préférence de langue, thème clair ou sombre, panier, identifiant de session, suivi.",
      "Persistant (gardé jusqu'à son expiration) ou de session (supprimé à la fermeture du navigateur). Options : domaine et chemin, `Secure` (HTTPS seulement), `HttpOnly` (inaccessible au JavaScript), expiration.",
      "!Taille : environ 4 Ko par cookie, soit 4 096 octets. Un entier de 16 bits prend 2 octets : environ 2 000 entiers.",
      "!`time()` renvoie le nombre de secondes écoulées depuis le 1er janvier 1970 (temps Unix). L'expiration d'un cookie est une date absolue en secondes : `time() + 3600` = dans une heure.",
      "Créer : `setcookie('language', 'fr', time() + (30 * 24 * 60 * 60), '/');` (30 jours, valable pour tout le site). À appeler avant tout `echo` ou HTML, car il envoie un en-tête HTTP.",
      "Expiration à 0 ou absente : cookie de session, supprimé à la fermeture du navigateur.",
      "Lire : `if (isset($_COOKIE['language'])) { … }`, et `htmlspecialchars` à l'affichage. Un cookie créé n'apparaît dans `$_COOKIE` qu'à la requête suivante.",
      "Supprimer : `setcookie('language', '', time() - 3600, '/');` (une date passée), ou le recréer avec une valeur vide.",
      "Le client peut lire et modifier ses cookies : seulement des préférences non sensibles, et toujours vérifier la valeur lue.",
      "i18n (dans le cours) : un tableau `$translations` avec une clé par langue (`'fr' => ['welcome' => 'Bienvenue']`), une constante `DEFAULT_LANGUAGE`, et `array_key_exists` pour vérifier que la langue du cookie existe."
    ],
    code: `<?php // translations.php
$translations = [
    'en' => ['welcome' => 'Welcome', 'hello' => 'Hello'],
    'fr' => ['welcome' => 'Bienvenue', 'hello' => 'Bonjour'],
];

<?php // index.php
require_once 'translations.php';
const DEFAULT_LANGUAGE = 'en';

$language = DEFAULT_LANGUAGE;
if (isset($_COOKIE['language']) && array_key_exists($_COOKIE['language'], $translations)) {
    $language = $_COOKIE['language'];
}
echo $translations[$language]['welcome'];

// Changer de langue (avant tout affichage) :
setcookie('language', 'fr', time() + (30 * 24 * 60 * 60), '/');`
  },
  { id: "ps-sessions", course: "ps", title: "Sessions et authentification", tp: "Séance 7 · Sessions, authentification et autorisation",
    points: [
      "!Une session est un rapport privilégié entre le client et le serveur, le temps de la visite.",
      "!Les variables de session sont stockées sur le serveur et contiennent des informations qui concernent ce client. Le client ne garde qu'un identifiant de session (cookie `PHPSESSID`).",
      "!Les superglobales sont des tableaux associatifs : `$_GET`, `$_POST`, `$_COOKIE`, `$_SESSION`.",
      "Une session repose sur un cookie : au premier `session_start()`, PHP crée un fichier de session sur le serveur et envoie l'identifiant au navigateur. Le navigateur le renvoie ensuite à chaque requête.",
      "`session_start()` au début de chaque script qui utilise la session, avant tout `echo`, `print` ou espace hors des balises PHP.",
      "Écrire et lire : `$_SESSION['user_id'] = 123;` puis `$_SESSION['username'] ?? 'Invité'`.",
      "Durée de vie : la session expire après une période d'inactivité, 24 minutes par défaut en PHP. Il est déconseillé d'allonger cette durée, pour limiter le détournement de session.",
      "Détruire : `session_start();` puis `session_destroy();` (on doit d'abord démarrer la session pour y accéder).",
      "Sessions et cookies, 4 différences : stockage (serveur / navigateur), sécurité (données hors de portée du client / cookies falsifiables ou volables), taille (grande / quelques Ko), durée de vie (courte, liée à l'inactivité / fixée par le serveur ou jusqu'à la fermeture).",
      "Usage : cookies pour les préférences non sensibles (la langue) ; sessions pour les informations sensibles et temporaires (l'état de connexion, le rôle).",
      "Authentification = vérifier l'identité (connexion par identifiant et mot de passe). Autorisation = déterminer ce que l'utilisateur a le droit de faire (rôle admin ou standard).",
      "Page protégée : pas connecté → `header('Location: login.php'); exit();`. Connecté mais pas le bon rôle → `http_response_code(403); exit();`. Sans `exit`, la suite s'exécute quand même.",
      "Hacher un mot de passe = le transformer en une chaîne fixe qu'on ne peut pas inverser. `password_hash($password, PASSWORD_DEFAULT)` à l'inscription, `password_verify($password, $hash)` à la connexion.",
      "En plus (pas forcément vu en cours) : `session_regenerate_id(true)` après la connexion, et un message d'erreur vague (« identifiants incorrects »)."
    ],
    code: `<?php // login.php
session_start();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $stmt = $pdo->prepare('SELECT * FROM users WHERE email = :email');
    $stmt->execute(['email' => trim($_POST['email'] ?? '')]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($_POST['password'] ?? '', $user['password'])) {
        session_regenerate_id(true);
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['role'] = $user['role'];
        header('Location: index.php');
        exit();
    }
    $error = 'Identifiants incorrects.';
}

<?php // admin.php
session_start();
if (!isset($_SESSION['user_id'])) {   // authentification
    header('Location: login.php');
    exit();
}
if ($_SESSION['role'] !== 'admin') {  // autorisation
    http_response_code(403);
    exit();
}`
  }
];

/* type : qcm (une réponse), open (prédire / expliquer), paper (écrire sur papier) */
const EXERCISES = [
  // ---------- ProgWeb : bases
  { id: "b1", ch: "pw-bases", type: "qcm", q: "Qu'affiche ce code ?", code: `console.log(4 == '4', 4 === '4', 4.0 === 4);`,
    opts: ["true false true", "true false false", "false false true", "true true true"], a: 0,
    exp: "`==` convertit '4' en nombre, donc true. `===` compare aussi le type (number contre string), donc false. 4.0 et 4 sont le même nombre, donc true." },
  { id: "b2", ch: "pw-bases", type: "qcm", q: "Que renvoie double(5) ?", code: `const double = n => { n * 2 };`,
    opts: ["10", "undefined", "NaN", "Une erreur"], a: 1,
    exp: "Avec des accolades, la fonction fléchée ne renvoie rien sans `return`. Il faut écrire `n => n * 2` ou `n => { return n * 2; }`." },
  { id: "b3", ch: "pw-bases", type: "qcm", q: "Que se passe-t-il ?", code: `const t = [1];
t.push(2);
t = [3];`,
    opts: ["t vaut [3]", "t vaut [1, 2]", "Erreur à la ligne 2", "Erreur à la ligne 3"], a: 3,
    exp: "`const` autorise de modifier le contenu (push fonctionne) mais interdit de réassigner la variable : `t = [3]` lance une TypeError." },
  { id: "b4", ch: "pw-bases", type: "qcm", q: "Quelle expression donne un entier entre 1 et 6 inclus, comme un dé ?",
    opts: ["`Math.round(Math.random() * 6)`", "`Math.floor(Math.random() * 6) + 1`", "`Math.floor(Math.random() * 5) + 1`", "`Math.random(1, 6)`"], a: 1,
    exp: "`Math.random()` donne un nombre dans [0, 1[. Multiplié par 6 → [0, 6[, arrondi vers le bas → 0 à 5, +1 → 1 à 6. `Math.round` donnerait 0 à 6, et 0 et 6 seraient deux fois moins fréquents." },
  { id: "b5", ch: "pw-bases", type: "open", q: "Que renvoie cet appel ? Écrivez chaque étape.", code: `const double = n => n * 2;
repeatTransform(3, double, 2);`,
    sol: `12  (3 → 6 → 12)`, exp: "La fonction est appliquée 2 fois : d'abord sur 3, puis sur le résultat." },
  { id: "b6", ch: "pw-bases", type: "qcm", q: "Qu'affiche ce code ?", code: `function makeCounter() {
  let c = 0;
  return () => ++c;
}
const a = makeCounter();
const b = makeCounter();
a(); a(); b();
console.log(a(), b());`,
    opts: ["3 2", "4 4", "3 1", "1 1"], a: 0,
    exp: "Chaque appel à `makeCounter` crée sa propre variable `c` (closure). `a` en est à 3 au quatrième appel, `b` à 2 au deuxième." },
  { id: "b7", ch: "pw-bases", type: "qcm", q: "Que renvoie cl(1, 'a', [2, 3]) ?", code: `function cl(...args) { return args.length; }`,
    opts: ["4", "3", "1", "undefined"], a: 1,
    exp: "`...args` regroupe les arguments dans un tableau : [1, 'a', [2, 3]], soit 3 éléments. Le tableau [2, 3] compte pour un seul argument." },
  { id: "b8", ch: "pw-bases", type: "paper", q: "Sur papier : écrivez `transform(n, fn)` et `createGreeting(greeting)` (voir l'énoncé du TP 1).",
    sol: `const transform = (n, fn) => fn(n);

function createGreeting(greeting) {
  return name => \`\${greeting} \${name} !\`;
}`, exp: "`transform` reçoit une fonction et l'appelle. `createGreeting` retourne une fonction qui se souvient de `greeting`." },
  { id: "b9", ch: "pw-bases", type: "paper", q: "Sur papier : écrivez `isPrime(n)` qui renvoie true si n est un nombre premier.",
    sol: `function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}`, exp: "0 et 1 ne sont pas premiers. On teste les diviseurs jusqu'à la racine de n : au-delà, on retrouverait les mêmes paires." },

  // ---------- ProgWeb : tableaux
  { id: "t1", ch: "pw-tableaux", type: "open", q: "Expliquez ce code. Que contient result ? Le tableau numbers a-t-il été modifié ?", code: `const numbers = [4, 7, 10, 3];
const result = numbers.filter(n => n > 5);`,
    sol: `result = [7, 10]
numbers = [4, 7, 10, 3] (inchangé)`, exp: "C'est l'exemple 2 de la page Eval 1. `filter` parcourt le tableau, garde les éléments pour lesquels la fonction renvoie true, et crée un nouveau tableau." },
  { id: "t2", ch: "pw-tableaux", type: "qcm", q: "Que vaut sorted ?", code: `const scores = [10, 9, 1];
const sorted = scores.toSorted();`,
    opts: ["[1, 9, 10]", "[1, 10, 9]", "[10, 9, 1]", "Une erreur"], a: 1,
    exp: "Sans fonction de comparaison, les valeurs sont comparées comme du texte : '1' < '10' < '9'. Tri numérique : `toSorted((a, b) => a - b)`." },
  { id: "t3", ch: "pw-tableaux", type: "qcm", q: "Que renvoie ce code ?", code: `[1, 2, 3, 4].reduce((acc, n) => acc + n * 2, 0);`,
    opts: ["10", "20", "18", "[2, 4, 6, 8]"], a: 1,
    exp: "acc part de 0 : 0+2 = 2, 2+4 = 6, 6+6 = 12, 12+8 = 20." },
  { id: "t4", ch: "pw-tableaux", type: "qcm", q: "Que renvoie ce code ?", code: `[].every(n => n > 0);`,
    opts: ["true", "false", "undefined", "Une erreur"], a: 0,
    exp: "Sur un tableau vide, `every` renvoie true (aucun élément ne contredit la condition) et `some` renvoie false." },
  { id: "t5", ch: "pw-tableaux", type: "qcm", q: "Laquelle de ces lignes laisse le tableau numbers intact ?",
    opts: ["`numbers.sort()`", "`numbers.reverse()`", "`numbers.toSorted()`", "`numbers.splice(0, 1)`"], a: 2,
    exp: "`toSorted` renvoie une copie triée. `sort`, `reverse` et `splice` modifient le tableau d'origine (et échouent sur un tableau gelé avec `Object.freeze`)." },
  { id: "t6", ch: "pw-tableaux", type: "qcm", q: "Que vaut r ?", code: `const t = [3, 14, 15];
const r = t.map(n => n % 2 === 0);`,
    opts: ["[14]", "[false, true, false]", "[3, 15]", "true"], a: 1,
    exp: "`map` garde la même longueur et met le résultat de la fonction à chaque position : ici un booléen. Pour garder seulement les pairs, c'est `filter`." },
  { id: "t7", ch: "pw-tableaux", type: "qcm", q: "Que renvoie [3, 14, 15].indexOf(7) ?",
    opts: ["undefined", "null", "-1", "false"], a: 2,
    exp: "`indexOf` renvoie l'indice de la première occurrence, ou -1 si la valeur est absente." },
  { id: "t8", ch: "pw-tableaux", type: "paper", q: "Sur papier : renvoyez un nouveau tableau où les nombres pairs précèdent les impairs, en gardant leur ordre (TP 2, exercice 1.10).",
    sol: `const evensFirst = t => [
  ...t.filter(n => n % 2 === 0),
  ...t.filter(n => n % 2 !== 0),
];`, exp: "Deux `filter` gardent l'ordre de chaque groupe ; le spread les assemble dans un nouveau tableau." },
  { id: "t9", ch: "pw-tableaux", type: "paper", q: "Sur papier : à partir de strings = ['Sator', 'Arepo', 'Tenet', 'Opera', 'Rotas'], renvoyez les mots qui contiennent au moins un « r » (minuscule ou majuscule), puis le premier mot par ordre alphabétique.",
    sol: `strings.filter(w => w.toLowerCase().includes('r'));
strings.toSorted((a, b) => a.localeCompare(b))[0];   // "Arepo"`,
    exp: "`toLowerCase` pour ne pas rater le R majuscule de Rotas. `toSorted` ne touche pas au tableau d'origine." },

  // ---------- ProgWeb : objets
  { id: "o1", ch: "pw-objets", type: "qcm", q: "Laquelle de ces fonctions renvoie bien le score maximal ?", code: `// A
function getMaxScore(players) {
  let max = players[0].score;
  for (const p of players) {
    if (p.score > max) return p.score;
  }
  return max;
}
// B
function getMaxScore(players) {
  let max = players[0].score;
  for (const p of players) {
    if (p.score > max) max = p.score;
  }
  return max;
}
// C
function getMaxScore(players) {
  return Math.max(...players);
}`,
    opts: ["A", "B", "C"], a: 1,
    exp: "A s'arrête au premier score supérieur au premier joueur (`return` dans la boucle). C passe des objets à `Math.max`, ce qui donne NaN. B met à jour le maximum pendant tout le parcours, puis le renvoie." },
  { id: "o2", ch: "pw-objets", type: "qcm", q: "Qu'affiche ce code ?", code: `const deck = [{ rank: 2 }];
const copy = [...deck];
copy[0].rank = 14;
console.log(deck[0].rank);`,
    opts: ["2", "14", "undefined", "Une erreur"], a: 1,
    exp: "Le spread copie le tableau, mais pas les objets qu'il contient : `copy[0]` et `deck[0]` sont le même objet." },
  { id: "o3", ch: "pw-objets", type: "qcm", q: "Quelle expression renvoie 'hearts' ?", code: `const card = { rank: 12, suit: 'hearts' };
const key = 'suit';`,
    opts: ["`card.key`", "`card[key]`", "`card['key']`", "`card.suit()`"], a: 1,
    exp: "Avec une variable qui contient le nom de la propriété, on utilise les crochets sans guillemets. `card.key` cherche une propriété qui s'appelle vraiment « key »." },
  { id: "o4", ch: "pw-objets", type: "open", q: "Que renvoie ce code ?", code: `const players = [
  { name: 'Ada', score: 12 },
  { name: 'Linus', score: 30 },
  { name: 'Grace', score: 25 },
];
players.filter(p => p.score > 20).map(p => p.name);`,
    sol: `['Linus', 'Grace']`, exp: "`filter` garde les deux joueurs à plus de 20 points, puis `map` ne garde que leur nom." },
  { id: "o5", ch: "pw-objets", type: "qcm", q: "Qu'affiche ce code ?", code: `for (const x in ['a', 'b']) console.log(x);`,
    opts: ["a puis b", "0 puis 1 (des chaînes)", "0 puis 1 (des nombres)", "Rien"], a: 1,
    exp: "`for...in` parcourt les clés : sur un tableau, ce sont les indices sous forme de chaînes '0' et '1'. Pour les valeurs, c'est `for...of`." },
  { id: "o6", ch: "pw-objets", type: "qcm", q: "Avec compareRank = (a, b) => a.rank - b.rank, que signifie compareRank({ rank: 14 }, { rank: 11 }) ?",
    opts: ["−3 : la première carte est plus faible", "0 : égalité", "3 : la première carte est plus forte", "true"], a: 2,
    exp: "14 − 11 = 3, un nombre positif : la première carte est plus forte. C'est aussi la convention attendue par `toSorted`." },
  { id: "o7", ch: "pw-objets", type: "paper", q: "Sur papier : écrivez getTopPlayer(players) qui renvoie le nom du joueur qui a le meilleur score. D'abord avec une boucle, puis avec reduce.",
    sol: `function getTopPlayer(players) {
  let best = players[0];
  for (const p of players) {
    if (p.score > best.score) best = p;
  }
  return best.name;
}

const getTopPlayer2 = players =>
  players.reduce((best, p) => (p.score > best.score ? p : best)).name;`,
    exp: "On garde l'objet entier pendant le parcours, puis on renvoie son nom à la fin. Sans valeur initiale, `reduce` part du premier élément." },
  { id: "o8", ch: "pw-objets", type: "paper", q: "Sur papier : écrivez buildBaseDeck() qui renvoie les 52 cartes { rank, suit } à partir de RANKS et SUITS.",
    sol: `function buildBaseDeck() {
  const deck = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({ rank, suit });
    }
  }
  return deck;
}`, exp: "Deux boucles imbriquées : 4 couleurs × 13 rangs = 52. `{ rank, suit }` est le raccourci de `{ rank: rank, suit: suit }`." },

  // ---------- ProgWeb : DOM
  { id: "d1", ch: "pw-dom", type: "qcm", q: "Quel sélecteur choisit les figures de cœur ou de carreau (6 cartes) ?",
    opts: ["`.heart, .diamond[data-face-card]`", "`.heart[data-face-card], .diamond[data-face-card]`", "`.heart .diamond [data-face-card]`", "`[data-face-card].heart.diamond`"], a: 1,
    exp: "La virgule sépare deux sélecteurs complets. La première option prend tous les cœurs (13) plus les figures de carreau. La quatrième exige les deux classes sur la même carte, ce qui n'arrive jamais." },
  { id: "d2", ch: "pw-dom", type: "qcm", q: "Combien d'éléments renvoie deck.querySelectorAll('.heart [data-face-card]') ?",
    opts: ["6, les figures de cœur", "0", "13, tous les cœurs", "12, toutes les figures"], a: 1,
    exp: "L'espace veut dire « à l'intérieur de ». On cherche un élément avec data-face-card à l'intérieur d'une carte de cœur : les spans n'ont pas cet attribut, donc 0. Sans espace, `.heart[data-face-card]`, on obtient les 3 figures de cœur." },
  { id: "d3", ch: "pw-dom", type: "qcm", q: "Pour sélectionner les cartes qui ne sont pas des piques, quel sélecteur faut-il passer à deck.querySelectorAll ?",
    opts: ["`:not(.spade)`", "`playing-card:not(.spade)`", "`.spade:not()`", "`!.spade`"], a: 1,
    exp: "`:not(.spade)` seul prend aussi les spans à l'intérieur des cartes. Il faut cibler les cartes elles-mêmes, ce qui donne 39 éléments." },
  { id: "d4", ch: "pw-dom", type: "qcm", q: "Que se passe-t-il ?", code: `document.querySelectorAll('.card').map(c => c.id);`,
    opts: ["Un tableau d'id", "Une NodeList d'id", "TypeError : map n'est pas une fonction", "undefined"], a: 2,
    exp: "Une NodeList a `forEach` mais pas `map`. Il faut d'abord la convertir : `[...document.querySelectorAll('.card')].map(c => c.id)`." },
  { id: "d5", ch: "pw-dom", type: "qcm", q: "Comment lire l'attribut data-face-card d'un élément el ?",
    opts: ["`el.dataset.faceCard`", "`el.dataset['face-card']`", "`el.data.faceCard`", "`el.faceCard`"], a: 0,
    exp: "Dans `dataset`, le préfixe data- disparaît et chaque tiret suivi d'une lettre devient une majuscule. `getAttribute('data-face-card')` marche aussi." },
  { id: "d6", ch: "pw-dom", type: "open", q: "Il n'y a pas d'élément #nope dans la page. Que se passe-t-il, et pourquoi ?", code: `const p = document.querySelector('#nope');
p.classList.add('x');`,
    sol: `TypeError : impossible de lire classList de null`, exp: "`querySelector` renvoie `null` quand rien ne correspond, et `null` n'a pas de propriété classList." },
  { id: "d7", ch: "pw-dom", type: "qcm", q: "Qu'affiche la page après ce code ?", code: `el.textContent = '<b>Salut</b>';`,
    opts: ["Salut en gras", "Le texte <b>Salut</b> tel quel", "Rien", "Une erreur"], a: 1,
    exp: "`textContent` insère du texte, sans l'interpréter comme du HTML. Avec `innerHTML`, on obtiendrait Salut en gras." },
  { id: "d8", ch: "pw-dom", type: "qcm", q: "Que renvoie previousElementSibling sur le premier enfant de son parent ?",
    opts: ["Le dernier enfant", "Le parent", "null", "undefined"], a: 2,
    exp: "Il n'y a pas d'élément avant le premier, donc null. C'est pour ça qu'il faut tester le voisin avant d'appeler swapNodes dans la tier list." },
  { id: "d9", ch: "pw-dom", type: "paper", q: "Sur papier : écrivez clearSelection() qui retire la classe selected de toutes les cartes du paquet .deck, sans toucher à la main.",
    sol: `function clearSelection() {
  document
    .querySelectorAll('.deck playing-card')
    .forEach(card => card.classList.remove('selected'));
}`, exp: "Le sélecteur `.deck playing-card` limite la recherche au paquet. Retirer une classe absente ne provoque pas d'erreur." },

  // ---------- ProgWeb : clones
  { id: "c1", ch: "pw-clones", type: "qcm", q: "card est un <playing-card> qui contient deux <span>. Que contient card.cloneNode() ?",
    opts: ["La carte et ses deux spans", "La balise <playing-card> avec ses attributs, sans les spans", "Rien, il faut un argument", "Une référence vers la même carte"], a: 1,
    exp: "Sans `true`, le clone est superficiel : la balise et ses attributs, mais aucun enfant. Il faut `cloneNode(true)` pour copier les spans." },
  { id: "c2", ch: "pw-clones", type: "qcm", q: "card est une carte du paquet. Que fait hand.append(card) ?",
    opts: ["Copie la carte dans la main", "Déplace la carte du paquet vers la main", "Rien, elle est déjà dans la page", "Lance une erreur"], a: 1,
    exp: "Un élément n'est qu'à un seul endroit. `append` d'un élément déjà dans la page le déplace. Pour copier, il faut d'abord `cloneNode(true)`." },
  { id: "c3", ch: "pw-clones", type: "qcm", q: "La page contient <template id=\"item-template\"><article class=\"item\">…</article></template>. Que renvoie document.querySelector('#item-template .item') ?",
    opts: ["L'article", "null", "Le template", "Une NodeList"], a: 1,
    exp: "Le contenu d'un template ne fait pas partie du DOM de la page. Il faut passer par `.content` : `document.querySelector('#item-template').content.querySelector('.item')`." },
  { id: "c4", ch: "pw-clones", type: "qcm", q: "Après ce code, l'original card a-t-il la classe x ?", code: `const c = card.cloneNode(true);
c.classList.add('x');`,
    opts: ["Oui", "Non", "Seulement si card est dans la page", "Seulement si on fait append(c)"], a: 1,
    exp: "Le clone est un nouvel élément indépendant : le modifier ne touche pas l'original. C'est pour ça qu'on peut cloner le modèle autant de fois qu'on veut." },
  { id: "c5", ch: "pw-clones", type: "qcm", q: "Que fait hand.replaceChildren() sans argument ?",
    opts: ["Rien", "Vide #hand", "Supprime #hand de la page", "Lance une erreur"], a: 1,
    exp: "`replaceChildren` remplace tous les enfants par ceux qu'on donne. Sans argument, il ne reste aucun enfant." },
  { id: "c6", ch: "pw-clones", type: "paper", q: "Sur papier : au clic sur #draw-hand, copiez deck, mélangez la copie, prenez 5 cartes, clonez-les sans id ni classe selected, et remplacez le contenu de #hand.",
    sol: `document.querySelector('#draw-hand').addEventListener('click', () => {
  const copy = [...deck];
  shuffleInPlace(copy);
  const handCards = copy.slice(0, 5).map(card => {
    const clone = card.cloneNode(true);
    clone.removeAttribute('id');
    clone.classList.remove('selected');
    return clone;
  });
  document.querySelector('#hand').replaceChildren(...handCards);
});`, exp: "On mélange une copie pour ne pas toucher à `deck`. Les clones n'ont pas d'id, sinon il y aurait deux #HEART-2 dans la page." },
  { id: "c7", ch: "pw-clones", type: "paper", q: "Sur papier : écrivez createItem(name) qui clone tmplItem, met name dans son élément .name et renvoie la carte.",
    sol: `const tmplItem = document
  .querySelector('#item-template')
  .content.querySelector('article.item');

function createItem(name) {
  const item = tmplItem.cloneNode(true);
  item.querySelector('.name').textContent = name;
  return item;
}`, exp: "On récupère le modèle une seule fois, et on le clone à chaque création sans jamais le modifier. `textContent` évite d'interpréter du HTML tapé par l'utilisateur." },

  // ---------- ProgWeb : événements
  { id: "e1", ch: "pw-events", type: "qcm", q: "Le bouton contient <span>▲</span>. L'écouteur est sur #tiers. Pourquoi écrire event.target.closest('button[data-action]') ?",
    opts: ["Parce que event.target peut être le span", "Parce que closest est plus rapide", "Pour empêcher la propagation", "Parce que event.target vaut toujours #tiers"], a: 0,
    exp: "`event.target` est l'élément réellement cliqué, souvent le span. `closest` remonte jusqu'au bouton (ou le renvoie lui-même si on a cliqué sur le bouton)." },
  { id: "e2", ch: "pw-events", type: "qcm", q: "Au démarrage, on ajoute un écouteur click à chaque bouton .delete avec une boucle. Puis l'utilisateur crée une nouvelle carte. Que se passe-t-il quand il clique sur son bouton .delete ?",
    opts: ["La carte est supprimée", "Rien : ce bouton n'a pas d'écouteur", "Toutes les cartes sont supprimées", "Une erreur"], a: 1,
    exp: "La boucle n'a vu que les boutons existants. C'est exactement le problème que règle la délégation : un écouteur sur le parent marche aussi pour les éléments ajoutés plus tard." },
  { id: "e3", ch: "pw-events", type: "qcm", q: "Dans l'écouteur submit du formulaire, on oublie event.preventDefault(). Que voit l'utilisateur ?",
    opts: ["La carte est ajoutée normalement", "La page se recharge et la carte ajoutée disparaît", "Une erreur dans la console", "Le formulaire ne réagit pas"], a: 1,
    exp: "L'action par défaut d'un formulaire est de l'envoyer, ce qui recharge la page. Tout ce que le JavaScript avait ajouté est perdu." },
  { id: "e4", ch: "pw-events", type: "qcm", q: "Le bouton Add et la touche Entrée doivent ajouter une carte. Quel événement faut-il écouter ?",
    opts: ["click sur le bouton", "submit sur le formulaire", "keydown sur l'input", "click sur le formulaire"], a: 1,
    exp: "Le bouton d'envoi comme la touche Entrée dans un champ déclenchent `submit` sur le formulaire. Un seul écouteur couvre les deux cas." },
  { id: "e5", ch: "pw-events", type: "open", q: "L'écouteur est sur #tiers. On clique sur le <span> à l'intérieur d'un bouton. Que valent event.target et event.currentTarget ?",
    sol: `event.target        → le <span>
event.currentTarget → #tiers`, exp: "target = où le clic a eu lieu ; currentTarget = l'élément qui porte l'écouteur en train de s'exécuter." },
  { id: "e6", ch: "pw-events", type: "qcm", q: "Dans l'écouteur délégué, que vaut btn si on clique dans une zone vide de #tiers ?", code: `const btn = event.target.closest('button[data-action]');`,
    opts: ["#tiers", "undefined", "null", "Le premier bouton de la page"], a: 2,
    exp: "`closest` renvoie null si aucun ancêtre ne correspond. D'où le `if (!btn) return;` juste après." },
  { id: "e7", ch: "pw-events", type: "paper", q: "Sur papier : écrivez la gestion de l'action up : déplacer la carte dans la catégorie précédente, sans rien faire si elle est déjà en S. TIERS = ['S', 'A', 'B', 'C', 'D'].",
    sol: `function moveUp(card) {
  const tier = card.closest('.tier').dataset.tier;
  const i = TIERS.indexOf(tier);
  if (i === 0) return;
  const target = document.querySelector(
    \`.tier[data-tier="\${TIERS[i - 1]}"] .items\`
  );
  target.append(card);
}`, exp: "On lit la catégorie actuelle avec `dataset`, on trouve son indice, puis la section précédente par son attribut. `append` déplace la carte à la fin de `.items`." },
  { id: "e8", ch: "pw-events", type: "paper", q: "Sur papier : à la soumission de #add-item-form, créez une carte avec le nom saisi (createItem) et ajoutez-la à la fin de #tier-s .items.",
    sol: `document.querySelector('#add-item-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const name = form.querySelector('input').value.trim();
  if (name === '') return;
  document.querySelector('#tier-s .items').append(createItem(name));
  form.reset();
});`, exp: "`preventDefault` d'abord, puis lire et nettoyer la saisie, créer, insérer, vider le formulaire." },

  // ---------- ProgServ2 : PHP
  { id: "p1", ch: "ps-php", type: "qcm", q: "Qu'affiche ce code ?", code: `$nom = 'Ada';
echo 'Salut $nom';`,
    opts: ["Salut Ada", "Salut $nom", "Salut", "Une erreur"], a: 1,
    exp: "Entre guillemets simples, PHP n'interprète pas les variables. Avec des guillemets doubles, `\"Salut $nom\"` afficherait Salut Ada." },
  { id: "p2", ch: "ps-php", type: "qcm", q: "Quel opérateur concatène deux chaînes en PHP ?",
    opts: ["`+`", "`.`", "`&`", "`concat`"], a: 1,
    exp: "En PHP, c'est le point : `'Bonjour ' . $nom`. Le `+` additionne des nombres." },
  { id: "p3", ch: "ps-php", type: "qcm", q: "Un formulaire a method=\"post\" et un champ name=\"email\". Où se trouve la valeur côté serveur ?",
    opts: ["`$_GET['email']`", "`$_POST['email']`", "`$_COOKIE['email']`", "`$email`"], a: 1,
    exp: "Avec la méthode POST, les champs arrivent dans `$_POST`. En GET, ils sont dans l'URL et dans `$_GET`." },
  { id: "p4", ch: "ps-php", type: "open", q: "On ouvre page.php sans paramètre. Que vaut $age ?", code: `$age = $_GET['age'] ?? 18;`,
    sol: `18`, exp: "`??` renvoie la valeur de gauche si elle existe et n'est pas null, sinon la valeur de droite. Ici, il n'y a pas de clé age." },
  { id: "p5", ch: "ps-php", type: "qcm", q: "Que voit l'utilisateur s'il affiche le code source d'une page PHP dans son navigateur ?",
    opts: ["Le code PHP", "Le HTML produit par le serveur", "Rien", "Le code PHP et le HTML"], a: 1,
    exp: "PHP s'exécute sur le serveur. Le navigateur ne reçoit que le résultat : du HTML." },
  { id: "p6", ch: "ps-php", type: "paper", q: "Sur papier : à partir de $notes = ['Ada' => 5.5, 'Linus' => 4], affichez une liste HTML « Ada : 5.5 », « Linus : 4 ».",
    sol: `<ul>
<?php foreach ($notes as $nom => $note): ?>
    <li><?= htmlspecialchars($nom) ?> : <?= $note ?></li>
<?php endforeach; ?>
</ul>`, exp: "`foreach` avec `$cle => $valeur` sur un tableau associatif. `htmlspecialchars` sur ce qui pourrait venir d'un utilisateur." },

  // ---------- ProgServ2 : POO
  { id: "o_1", ch: "ps-poo", type: "qcm", q: "La classe Pet a un attribut private string $name. Que fait echo $rex->name; à l'extérieur de la classe ?",
    opts: ["Affiche le nom", "Erreur fatale : attribut privé", "Affiche une chaîne vide", "Affiche null"], a: 1,
    exp: "Un attribut `private` n'est accessible que depuis la classe elle-même. De l'extérieur, on passe par un getter : `$rex->getName()`." },
  { id: "o_2", ch: "ps-poo", type: "qcm", q: "Un attribut protected de Pet est-il accessible dans la classe Dog extends Pet ?",
    opts: ["Oui", "Non", "Seulement en lecture", "Seulement s'il est static"], a: 0,
    exp: "`protected` : accessible dans la classe et dans ses sous-classes, pas depuis l'extérieur." },
  { id: "o_3", ch: "ps-poo", type: "qcm", q: "On crée 3 objets new Pet(...) avec le constructeur de la fiche. Que renvoie Pet::getCount() ?",
    opts: ["1", "3", "0", "Une erreur"], a: 1,
    exp: "`$count` est `static` : un seul compteur partagé par toute la classe, incrémenté à chaque construction." },
  { id: "o_4", ch: "ps-poo", type: "qcm", q: "Que se passe-t-il avec new Shape(); si Shape est déclarée abstract ?",
    opts: ["Un objet Shape est créé", "Une erreur : une classe abstraite ne s'instancie pas", "Un objet vide", "Rien"], a: 1,
    exp: "Une classe abstraite sert de base. On instancie ses sous-classes concrètes, qui implémentent ses méthodes abstraites." },
  { id: "o_5", ch: "ps-poo", type: "qcm", q: "Laquelle de ces déclarations est valide en PHP ?",
    opts: ["`class C extends A, B {}`", "`class C implements I, J {}`", "`class C extends I implements A {}` avec I une interface", "`interface I extends C {}` avec C une classe"], a: 1,
    exp: "Une classe n'hérite que d'une seule classe, mais peut implémenter plusieurs interfaces." },
  { id: "o_6", ch: "ps-poo", type: "open", q: "Qu'affiche ce code (avec les classes de la fiche) ?", code: `$rex = new Dog('Rex', 4);
echo $rex->describe();`,
    sol: `Rex, 4 ans (chien)`, exp: "Dog redéfinit `describe`, appelle la version de Pet avec `parent::describe()` et ajoute « (chien) »." },
  { id: "o_7", ch: "ps-poo", type: "qcm", q: "Comment lire la constante SPECIES de la classe Pet depuis l'extérieur ?",
    opts: ["`Pet->SPECIES`", "`Pet::SPECIES`", "`$Pet.SPECIES`", "`Pet::$SPECIES`"], a: 1,
    exp: "`::` pour ce qui appartient à la classe (constantes, statiques). `->` pour ce qui appartient à un objet." },
  { id: "o_8", ch: "ps-poo", type: "paper", q: "Sur papier : écrivez une classe Book avec deux attributs privés title et author, un constructeur, deux getters et une méthode describe() qui renvoie « Titre, de Auteur ».",
    sol: `class Book {
    private string $title;
    private string $author;

    public function __construct(string $title, string $author) {
        $this->title = $title;
        $this->author = $author;
    }
    public function getTitle(): string { return $this->title; }
    public function getAuthor(): string { return $this->author; }
    public function describe(): string {
        return "{$this->title}, de {$this->author}";
    }
}`, exp: "Attributs privés, constructeur qui les remplit avec `$this->`, accès par getters : c'est l'encapsulation." },

  // ---------- ProgServ2 : PDO
  { id: "q1", ch: "ps-pdo", type: "qcm", q: "Aucun utilisateur n'a cet email. Que renvoie $stmt->fetch() ?",
    opts: ["null", "Un tableau vide", "false", "Une exception"], a: 2,
    exp: "`fetch` renvoie false quand il n'y a plus de ligne. D'où le test `if ($user && …)`. `fetchAll` renverrait un tableau vide." },
  { id: "q2", ch: "ps-pdo", type: "qcm", q: "Quelle requête est protégée contre l'injection SQL ?",
    opts: ["`$pdo->query(\"SELECT * FROM users WHERE id = $id\")`", "`$pdo->prepare('SELECT * FROM users WHERE id = :id')` puis `execute(['id' => $id])`", "`$pdo->query('SELECT * FROM users WHERE id = ' . htmlspecialchars($id))`", "`$pdo->query(\"SELECT * FROM users WHERE id = '$id'\")`"], a: 1,
    exp: "Avec une requête préparée, la valeur est envoyée à part et ne peut jamais devenir du SQL. `htmlspecialchars` protège l'affichage HTML, pas les requêtes." },
  { id: "q3", ch: "ps-pdo", type: "qcm", q: "Que fait DELETE FROM users; ?",
    opts: ["Supprime la table", "Supprime toutes les lignes de la table", "Rien sans WHERE", "Une erreur de syntaxe"], a: 1,
    exp: "Sans `WHERE`, la condition s'applique à toutes les lignes. La table existe toujours, mais elle est vide. `DROP TABLE` supprime la table." },
  { id: "q4", ch: "ps-pdo", type: "open", q: "Écrivez la requête SQL qui change l'email de l'utilisateur d'id 3 en ada@heig.ch.",
    sol: `UPDATE users SET email = 'ada@heig.ch' WHERE id = 3;`, exp: "UPDATE … SET … WHERE. Sans le WHERE, tous les utilisateurs auraient cet email." },
  { id: "q5", ch: "ps-pdo", type: "qcm", q: "À quoi sert $pdo->lastInsertId() ?",
    opts: ["Compter les lignes", "Récupérer l'id généré par le dernier INSERT", "Supprimer la dernière ligne", "Récupérer le dernier utilisateur connecté"], a: 1,
    exp: "Avec `AUTO_INCREMENT`, c'est la base qui choisit l'id ; `lastInsertId` permet de le connaître juste après l'insertion." },
  { id: "q6", ch: "ps-pdo", type: "qcm", q: "Pourquoi ne pas mettre les identifiants de la base dans un fichier versionné sur GitHub ?",
    opts: ["Le fichier serait trop gros", "Toute personne ayant accès au dépôt pourrait se connecter à la base", "PHP ne peut pas lire un fichier de Git", "Ça ralentit le site"], a: 1,
    exp: "Le dépôt est souvent public ou partagé. Les identifiants vont dans un fichier de configuration exclu de Git (par exemple via `.gitignore`)." },
  { id: "q7", ch: "ps-pdo", type: "paper", q: "Sur papier : écrivez findUserByEmail(PDO $pdo, string $email) qui renvoie l'utilisateur (tableau associatif) ou null.",
    sol: `function findUserByEmail(PDO $pdo, string $email): ?array {
    $stmt = $pdo->prepare('SELECT * FROM users WHERE email = :email');
    $stmt->execute(['email' => $email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    return $user === false ? null : $user;
}`, exp: "prepare → execute → fetch. On transforme le false de `fetch` en null pour un retour plus clair." },

  // ---------- ProgServ2 : include
  { id: "i1", ch: "ps-include", type: "qcm", q: "Le fichier nav.php n'existe pas. Que fait include 'nav.php'; ?",
    opts: ["Erreur fatale, le script s'arrête", "Avertissement, le script continue", "Rien du tout", "Crée le fichier"], a: 1,
    exp: "`include` émet un avertissement et continue. `require` produirait une erreur fatale et arrêterait le script." },
  { id: "i2", ch: "ps-include", type: "qcm", q: "Que faut-il utiliser pour un fichier de configuration indispensable, inclus depuis plusieurs fichiers ?",
    opts: ["`include`", "`include_once`", "`require_once`", "`require`"], a: 2,
    exp: "`require` parce qu'on ne peut pas continuer sans lui, `_once` pour qu'il ne soit chargé qu'une fois même s'il est demandé plusieurs fois." },
  { id: "i3", ch: "ps-include", type: "qcm", q: "Erreur : Cannot declare class User, because the name is already in use. Quelle est la cause la plus probable ?",
    opts: ["La classe a une faute de frappe", "Le fichier de la classe est inclus deux fois avec require", "Il manque session_start", "La base de données est vide"], a: 1,
    exp: "Inclure deux fois le même fichier déclare deux fois la classe. `require_once` règle le problème." },
  { id: "i4", ch: "ps-include", type: "open", q: "header.php contient <title><?= $title ?></title>. Qu'affiche l'onglet du navigateur ?", code: `<?php
$title = 'Mes livres';
require 'header.php';`,
    sol: `Mes livres`, exp: "Le fichier inclus voit les variables définies avant l'inclusion, comme si son code était collé à cet endroit." },
  { id: "i5", ch: "ps-include", type: "qcm", q: "Que contient __DIR__ ?",
    opts: ["Le dossier racine du serveur", "Le dossier du fichier PHP où il est écrit", "Le dossier où se trouve le navigateur", "Le nom du fichier courant"], a: 1,
    exp: "`__DIR__` donne le dossier du fichier courant. Les chemins construits avec lui marchent quel que soit le fichier qui a lancé le script." },

  // ---------- ProgServ2 : sécurité
  { id: "s1", ch: "ps-securite", type: "qcm", q: "Que se passe-t-il si un utilisateur tape ' OR '1'='1 dans le champ email ?", code: `$sql = "SELECT * FROM users WHERE email = '$email'";`,
    opts: ["Rien de spécial", "La condition devient toujours vraie : la requête renvoie tous les utilisateurs", "PHP refuse la requête", "Le mot de passe est chiffré"], a: 1,
    exp: "La requête devient `WHERE email = '' OR '1'='1'`, toujours vraie. C'est l'injection SQL ; la protection est une requête préparée." },
  { id: "s2", ch: "ps-securite", type: "qcm", q: "Un commentaire contient <script>…<\/script> et s'affiche sur la page de tous les visiteurs. Comment s'appelle cette attaque, et comment s'en protéger ?",
    opts: ["Injection SQL, requêtes préparées", "XSS, htmlspecialchars à l'affichage", "CSRF, session_start", "XSS, password_hash"], a: 1,
    exp: "C'est du XSS : du JavaScript injecté s'exécute chez les autres visiteurs. `htmlspecialchars` transforme < et > en entités, donc le texte s'affiche au lieu de s'exécuter." },
  { id: "s3", ch: "ps-securite", type: "qcm", q: "Le champ a l'attribut HTML required et type=\"email\". Faut-il encore valider en PHP ?",
    opts: ["Non, le navigateur bloque déjà", "Oui, la validation HTML se contourne facilement", "Seulement pour les mots de passe", "Seulement en GET"], a: 1,
    exp: "On peut retirer l'attribut dans l'inspecteur ou envoyer la requête sans navigateur. Seule la validation côté serveur compte pour la sécurité." },
  { id: "s4", ch: "ps-securite", type: "qcm", q: "Que renvoie filter_var('ada@', FILTER_VALIDATE_EMAIL) ?",
    opts: ["'ada@'", "true", "false", "null"], a: 2,
    exp: "L'adresse n'a pas de domaine : la validation échoue et renvoie false. Pour une adresse valide, elle renvoie l'adresse elle-même." },
  { id: "s5", ch: "ps-securite", type: "open", q: "Qu'est-ce que htmlspecialchars('<b>Ada</b>') renvoie ? Qu'affiche le navigateur ?",
    sol: `&lt;b&gt;Ada&lt;/b&gt;
Le navigateur affiche le texte <b>Ada</b> tel quel, pas en gras.`, exp: "Les caractères spéciaux du HTML sont remplacés par des entités : ils sont affichés au lieu d'être interprétés." },
  { id: "s6", ch: "ps-securite", type: "qcm", q: "Lesquelles de ces données peuvent être modifiées par l'utilisateur ?",
    opts: ["Seulement $_POST", "$_GET et $_POST, pas $_COOKIE", "$_GET, $_POST et $_COOKIE", "Aucune si on utilise HTTPS"], a: 2,
    exp: "Tout ce qui vient du client est contrôlé par lui, cookies compris. Seul `$_SESSION`, stocké sur le serveur, ne peut pas être modifié directement." },
  { id: "s7", ch: "ps-securite", type: "paper", q: "Sur papier : validez un formulaire avec name (obligatoire, 50 caractères max), email (valide) et age (nombre entre 0 et 120). Remplissez un tableau $errors.",
    sol: `$errors = [];
$name  = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$age   = $_POST['age'] ?? '';

if ($name === '' || strlen($name) > 50) {
    $errors[] = 'Nom requis (50 caractères max).';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Email invalide.';
}
if (!is_numeric($age) || $age < 0 || $age > 120) {
    $errors[] = 'Âge invalide.';
}`, exp: "`??` évite une erreur si le champ manque, `trim` enlève les espaces, puis une condition par règle." },

  // ---------- ProgServ2 : cookies
  { id: "k1", ch: "ps-cookies", type: "qcm", q: "Que veut dire « HTTP est stateless » ?",
    opts: ["HTTP n'est pas sécurisé", "Le serveur ne garde aucun souvenir entre deux requêtes", "HTTP ne transporte que du texte", "Le serveur ne peut pas envoyer de cookies"], a: 1,
    exp: "Chaque requête est traitée seule. Pour reconnaître un visiteur d'une page à l'autre, on utilise des cookies et des sessions." },
  { id: "k2", ch: "ps-cookies", type: "qcm", q: "time() renvoie le nombre de secondes écoulées depuis quelle date ?",
    opts: ["1er janvier 1900", "1er janvier 1970", "1er janvier 1990", "1er janvier 2000"], a: 1,
    exp: "C'est le temps Unix, compté depuis le 1er janvier 1970 à minuit (UTC)." },
  { id: "k3", ch: "ps-cookies", type: "qcm", q: "Un cookie peut faire environ 4 Ko. Combien d'entiers de 16 bits peut-il contenir, environ ?",
    opts: ["500", "2 000", "4 000", "32 000"], a: 1,
    exp: "16 bits = 2 octets. 4 Ko ≈ 4 000 octets (4 096 exactement), divisé par 2 : environ 2 000 entiers." },
  { id: "k4", ch: "ps-cookies", type: "qcm", q: "Quel appel crée un cookie qui expire dans 7 jours ?",
    opts: ["`setcookie('x', 'v', 7)`", "`setcookie('x', 'v', 7 * 24 * 3600)`", "`setcookie('x', 'v', time() + 7 * 24 * 3600)`", "`setcookie('x', 'v', time() + 7)`"], a: 2,
    exp: "L'expiration est une date absolue en secondes. `7 * 24 * 3600` seul correspondrait au 8 janvier 1970, une date passée : le cookie serait supprimé tout de suite." },
  { id: "k5", ch: "ps-cookies", type: "qcm", q: "Que contient $_COOKIE['lang'] juste après setcookie('lang', 'en', …), dans le même script, si le cookie n'existait pas ?",
    opts: ["'en'", "Rien : la clé n'existe pas encore", "true", "null"], a: 1,
    exp: "`setcookie` envoie le cookie dans la réponse. Le navigateur ne le renverra qu'à la requête suivante ; c'est là qu'il apparaîtra dans `$_COOKIE`." },
  { id: "k6", ch: "ps-cookies", type: "qcm", q: "Comment supprimer le cookie language ?",
    opts: ["`unset($_COOKIE['language'])`", "`setcookie('language', '', time() - 3600, '/')`", "`$_COOKIE['language'] = ''`", "`session_destroy()`"], a: 1,
    exp: "On renvoie le cookie avec une date d'expiration passée, et le navigateur le supprime. `unset` et l'affectation ne changent que la copie dans le script en cours : le navigateur garde son cookie." },
  { id: "k7", ch: "ps-cookies", type: "qcm", q: "Que se passe-t-il ?", code: `<?php echo 'Bonjour'; setcookie('lang', 'fr');`,
    opts: ["Le cookie est créé normalement", "Avertissement « headers already sent » : le cookie n'est pas envoyé", "Le texte n'est pas affiché", "Erreur fatale"], a: 1,
    exp: "Un cookie voyage dans les en-têtes HTTP, qui partent dès le premier affichage. `setcookie`, `header` et `session_start` doivent venir avant tout `echo` ou HTML." },
  { id: "k8", ch: "ps-cookies", type: "qcm", q: "Où un cookie est-il stocké ?",
    opts: ["Sur le serveur", "Dans le navigateur du client", "Dans la base de données", "Dans $_SESSION"], a: 1,
    exp: "Le cookie est stocké chez le client, qui le renvoie à chaque requête. C'est pour ça qu'il peut être lu et modifié par l'utilisateur." },
  { id: "k9", ch: "ps-cookies", type: "paper", q: "Sur papier : avec le tableau $translations du cours (clés 'en' et 'fr'), choisissez la langue depuis le cookie language, avec 'en' par défaut et si la valeur est inconnue, puis affichez la traduction de welcome.",
    sol: `require_once 'translations.php';
const DEFAULT_LANGUAGE = 'en';

$language = DEFAULT_LANGUAGE;
if (isset($_COOKIE['language']) && array_key_exists($_COOKIE['language'], $translations)) {
    $language = $_COOKIE['language'];
}
echo $translations[$language]['welcome'];`, exp: "On ne fait jamais confiance à la valeur du cookie : `array_key_exists` vérifie qu'une traduction existe pour cette langue." },

  // ---------- ProgServ2 : sessions
  { id: "x1", ch: "ps-sessions", type: "qcm", q: "Où sont stockées les variables de session ?",
    opts: ["Dans le navigateur", "Sur le serveur", "Dans l'URL", "Dans un cookie de 4 Ko"], a: 1,
    exp: "Les données de `$_SESSION` restent sur le serveur. Le client ne garde qu'un identifiant de session." },
  { id: "x2", ch: "ps-sessions", type: "qcm", q: "Avec une session, que garde le client ?",
    opts: ["Toutes les variables de session", "Un identifiant de session, dans un cookie", "Son mot de passe", "Rien"], a: 1,
    exp: "Le cookie PHPSESSID contient l'identifiant ; à chaque requête, le serveur retrouve les données de session qui y correspondent." },
  { id: "x3", ch: "ps-sessions", type: "qcm", q: "Laquelle de ces variables n'est pas une superglobale PHP ?",
    opts: ["`$_GET`", "`$_SESSION`", "`$_DATA`", "`$_COOKIE`"], a: 2,
    exp: "`$_DATA` n'existe pas. Les superglobales vues en cours sont `$_GET`, `$_POST`, `$_COOKIE` et `$_SESSION` : des tableaux associatifs accessibles partout." },
  { id: "x4", ch: "ps-sessions", type: "qcm", q: "Comment stocker un mot de passe dans la base ?",
    opts: ["En clair", "Avec `md5($mdp)`", "Avec `password_hash($mdp, PASSWORD_DEFAULT)`", "Avec `base64_encode($mdp)`"], a: 2,
    exp: "`password_hash` produit un hash lent et salé, vérifié ensuite avec `password_verify`. md5 est trop rapide à casser, base64 se décode immédiatement." },
  { id: "x5", ch: "ps-sessions", type: "qcm", q: "Que se passe-t-il pour un visiteur non connecté ?", code: `if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
}
echo 'Données secrètes';`,
    opts: ["Il est redirigé et ne voit rien", "« Données secrètes » est quand même envoyé dans la réponse", "Une erreur fatale", "La session est détruite"], a: 1,
    exp: "`header` ajoute seulement un en-tête : le script continue. Il faut `exit();` juste après la redirection." },
  { id: "x6", ch: "ps-sessions", type: "qcm", q: "Un utilisateur connecté essaie de supprimer l'article d'un autre utilisateur. Quel contrôle doit l'en empêcher ?",
    opts: ["L'authentification", "L'autorisation", "Le cookie", "htmlspecialchars"], a: 1,
    exp: "Il est déjà authentifié (on sait qui il est). La question est de savoir s'il a le droit : c'est l'autorisation." },
  { id: "x7", ch: "ps-sessions", type: "open", q: "Pourquoi stocker le rôle (admin ou user) en session plutôt que dans un cookie ?",
    sol: `Le client peut modifier ses cookies : il pourrait écrire role=admin.
La session est stockée sur le serveur, le client ne peut pas la changer.`, exp: "Tout ce qui décide d'un droit doit rester côté serveur." },
  { id: "x8", ch: "ps-sessions", type: "qcm", q: "Une page utilise $_SESSION['user_id'] mais oublie session_start(). Que se passe-t-il ?",
    opts: ["Ça marche quand même", "La session n'est pas chargée : user_id n'est pas trouvé", "Le serveur crée un nouvel utilisateur", "Le cookie est supprimé"], a: 1,
    exp: "Sans `session_start()`, PHP ne relit pas les données de session : l'utilisateur semble déconnecté sur cette page." },
  { id: "x9", ch: "ps-sessions", type: "paper", q: "Sur papier : écrivez le traitement d'un formulaire de connexion (email, password) qui vérifie le mot de passe, met l'id en session et redirige vers index.php.",
    sol: `session_start();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $stmt = $pdo->prepare('SELECT * FROM users WHERE email = :email');
    $stmt->execute(['email' => trim($_POST['email'] ?? '')]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($_POST['password'] ?? '', $user['password'])) {
        session_regenerate_id(true);
        $_SESSION['user_id'] = $user['id'];
        header('Location: index.php');
        exit();
    }
    $error = 'Identifiants incorrects.';
}`, exp: "Requête préparée, `password_verify`, identifiant en session, redirection suivie de `exit`. `session_regenerate_id` et le message vague sont des bonnes pratiques en plus." },

  // ---------- Ajouts tirés des supports du cours ProgServ2
  { id: "p7", ch: "ps-php", type: "qcm", q: "Que se passe-t-il ?", code: `const EULER = 2.71828;
EULER = 3.14;`,
    opts: ["EULER vaut 3.14", "Une erreur : une constante ne peut pas être modifiée", "EULER vaut 2.71828 sans erreur", "Il faut écrire $EULER"], a: 1,
    exp: "Une constante, définie avec `const` ou `define`, ne peut plus changer. On l'utilise sans `$`." },
  { id: "p8", ch: "ps-php", type: "qcm", q: "Que donne add(2, 'Hello') ?", code: `function add(int $a, int $b): int {
    return $a + $b;
}`,
    opts: ["2", "'2Hello'", "Une erreur de type : l'argument 2 doit être un int", "0"], a: 2,
    exp: "Avec le typage, PHP vérifie les arguments : une chaîne qui n'est pas un nombre ne passe pas pour un `int`." },
  { id: "p9", ch: "ps-php", type: "open", q: "Qu'affichent ces deux appels ?", code: `function greet(string $name = "World"): string {
    return "Hello, " . $name . "!";
}
echo greet();
echo greet("Alice");`,
    sol: `Hello, World!
Hello, Alice!`, exp: "Sans argument, le paramètre prend sa valeur par défaut." },
  { id: "p10", ch: "ps-php", type: "qcm", q: "Dans l'architecture client-serveur, qui exécute le code PHP ?",
    opts: ["Le navigateur", "L'interpréteur PHP, sur le serveur", "La base de données", "Le serveur, puis le navigateur une seconde fois"], a: 1,
    exp: "Le serveur web (Apache, Nginx) transmet la requête à l'interpréteur PHP, qui exécute le code et renvoie le résultat. Le navigateur ne comprend pas le PHP." },

  { id: "o_9", ch: "ps-poo", type: "qcm", q: "Lequel de ces points n'est pas un avantage de la POO selon le cours ?",
    opts: ["Lisibilité", "Réutilisabilité", "Maintenabilité", "Performance"], a: 3,
    exp: "La performance est listée dans les désavantages (gestion supplémentaire des objets), avec la complexité. La différence est souvent négligeable." },
  { id: "o_10", ch: "ps-poo", type: "qcm", q: "Person a une méthode __destruct() qui affiche un message. Quand s'affiche-t-il ?", code: `$p = new Person('Ada', 36);
$p = null;
echo 'Fin';`,
    opts: ["Jamais", "Avant « Fin », quand $p est mis à null", "Seulement après « Fin »", "À la création de l'objet"], a: 1,
    exp: "Un objet est détruit quand plus rien ne le référence, ou à la fin du script. Ici, `$p = null` le libère tout de suite." },
  { id: "o_11", ch: "ps-poo", type: "open", q: "Citez trois avantages et deux désavantages de la POO.",
    sol: `Avantages : lisibilité, réutilisabilité, maintenabilité.
Désavantages : complexité (surtout pour de petites applications), performance un peu moindre.`, exp: "C'est mot pour mot une section du cours : une question de théorie très probable." },

  { id: "q8", ch: "ps-pdo", type: "qcm", q: "PDO lance une exception et aucun bloc try-catch ne l'attrape. Que se passe-t-il ?",
    opts: ["Rien, PHP l'ignore", "Le script s'arrête brusquement avec une erreur", "La requête est relancée", "PHP affiche une page blanche et continue"], a: 1,
    exp: "Comme un signal d'alarme que personne n'entend : sans `catch`, le programme s'arrête. Avec `try-catch`, on peut afficher un message ou corriger." },
  { id: "q9", ch: "ps-pdo", type: "qcm", q: "Pourquoi le cours met-il les paramètres de connexion dans config/database.ini ?",
    opts: ["Parce que PDO ne lit que les fichiers .ini", "Pour modifier les paramètres sans toucher au code et garder les mots de passe hors du code", "Pour rendre la connexion plus rapide", "Pour que le navigateur puisse lire la configuration"], a: 1,
    exp: "Le fichier est lu avec `parse_ini_file`. Entre le local et Infomaniak, seul ce fichier change." },
  { id: "q10", ch: "ps-pdo", type: "qcm", q: "Le formulaire contient une erreur. Comment réafficher le prénom saisi, sans risque ?",
    opts: ["`value=\"<?= $firstName ?>\"`", "`value=\"<?= htmlspecialchars($firstName ?? '') ?>\"`", "`value=\"<?= htmlspecialchars($firstName) ?? '' ?>\"`", "On ne peut pas, il faut tout ressaisir"], a: 1,
    exp: "`??` évite l'erreur si la variable n'existe pas encore, et `htmlspecialchars` empêche le XSS. Le `??` doit être à l'intérieur de l'appel." },
  { id: "q11", ch: "ps-pdo", type: "paper", q: "Sur papier : connectez-vous à la base avec PDO dans un try-catch. En cas d'échec, affichez « Connexion impossible » suivi du message de l'exception.",
    sol: `try {
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$database;charset=utf8mb4",
                   $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'Connexion impossible : ' . $e->getMessage();
    exit();
}`, exp: "`PDOException` est une sous-classe d'`Exception` ; `getMessage()` donne le texte de l'erreur." },

  { id: "i6", ch: "ps-include", type: "qcm", q: "$title n'est pas défini. Quelle ligne affiche bien « ninetendogs » sans avertissement ?",
    opts: ["`<?= htmlspecialchars($title ?? 'ninetendogs') ?>`", "`<?= htmlspecialchars($title) ?? 'ninetendogs' ?>`", "`<?= $title ?? htmlspecialchars('ninetendogs') ?>`", "`<?= htmlspecialchars($title) ?>`"], a: 0,
    exp: "Le `??` doit être à l'intérieur : `htmlspecialchars` ne renvoie jamais null, donc un `??` placé après n'est jamais utilisé, et `$title` non défini provoque un avertissement." },
  { id: "i7", ch: "ps-include", type: "qcm", q: "Le composant pet-card.php est affiché une fois par animal dans la même page. Quelle instruction utiliser ?",
    opts: ["`require_once`", "`require`", "`include_once`", "Aucune, il faut copier le code"], a: 1,
    exp: "Le cours réserve `require_once` aux fonctions et constantes. Une partie d'interface peut être incluse plusieurs fois : `require`." },
  { id: "i8", ch: "ps-include", type: "qcm", q: "Quel est le défaut de passer $title à head.php par une simple variable définie dans la page ?",
    opts: ["C'est plus lent", "Rien n'indique quelles variables le composant attend, et une faute de nom passe en silence", "Les variables ne sont pas visibles dans le fichier inclus", "Ça empêche htmlspecialchars"], a: 1,
    exp: "La dépendance est cachée. La fonction `render('head', ['title' => …])` rend le passage des valeurs explicite." },

  { id: "s8", ch: "ps-securite", type: "qcm", q: "Remplacer < par &lt; avant l'affichage, c'est…",
    opts: ["De la validation", "Du nettoyage (échappement)", "Une requête préparée", "Du hachage"], a: 1,
    exp: "Valider, c'est accepter ou rejeter selon des règles. Nettoyer, c'est supprimer ou échapper les caractères dangereux." },
  { id: "s9", ch: "ps-securite", type: "qcm", q: "Que devient le caractère & après htmlspecialchars ?",
    opts: ["`&lt;`", "`&amp;`", "`&quot;`", "Il ne change pas"], a: 1,
    exp: "& → &amp;, < → &lt;, > → &gt;, \" → &quot;, ' → &apos;." },

  { id: "k10", ch: "ps-cookies", type: "qcm", q: "Par quel en-tête HTTP le serveur envoie-t-il un cookie au navigateur ?",
    opts: ["`Cookie`", "`Set-Cookie`", "`Location`", "`Content-Type`"], a: 1,
    exp: "Le serveur répond avec `Set-Cookie` ; le navigateur renvoie ensuite le cookie dans l'en-tête `Cookie` de ses requêtes." },
  { id: "k11", ch: "ps-cookies", type: "qcm", q: "À quoi sert l'option HttpOnly d'un cookie ?",
    opts: ["À l'envoyer seulement en HTTPS", "À empêcher le JavaScript de la page de le lire", "À le supprimer à la fermeture du navigateur", "À le rendre valable sur tout le site"], a: 1,
    exp: "HttpOnly : inaccessible au JavaScript. Secure : envoyé seulement en HTTPS. Le chemin '/' le rend valable pour tout le site." },
  { id: "k12", ch: "ps-cookies", type: "open", q: "Avec le code i18n de la fiche (DEFAULT_LANGUAGE = 'en'), le cookie language vaut 'de'. Qu'est-ce qui s'affiche ?",
    sol: `Welcome`, exp: "'de' n'est pas une clé de `$translations`, donc `array_key_exists` renvoie false et la langue par défaut est gardée." },

  { id: "x10", ch: "ps-sessions", type: "qcm", q: "Par défaut en PHP, quand une session expire-t-elle ?",
    opts: ["Après 24 heures", "Après 24 minutes d'inactivité", "À la fermeture du serveur", "Jamais"], a: 1,
    exp: "24 minutes d'inactivité par défaut. Le cours déconseille d'allonger cette durée, pour limiter le détournement de session." },
  { id: "x11", ch: "ps-sessions", type: "qcm", q: "Un utilisateur connecté avec le rôle user ouvre admin.php. D'après le cours, que doit faire le serveur ?",
    opts: ["Le rediriger vers login.php", "Répondre 403 Forbidden avec `http_response_code(403)`", "Le déconnecter", "Afficher la page"], a: 1,
    exp: "Il est authentifié, donc pas de redirection vers la connexion. Il n'est pas autorisé : accès refusé, 403." },
  { id: "x12", ch: "ps-sessions", type: "open", q: "Donnez les 4 différences entre sessions et cookies vues en cours.",
    sol: `Stockage : session sur le serveur, cookie dans le navigateur.
Sécurité : session plus sûre ; un cookie peut être volé ou falsifié.
Taille : session plus grande ; cookie limité à quelques Ko.
Durée de vie : session courte (24 min d'inactivité) ; cookie selon son expiration ou jusqu'à la fermeture du navigateur.`, exp: "Question de théorie typique. Ajoutez l'usage : cookies pour les préférences, sessions pour l'état de connexion." },
  { id: "x13", ch: "ps-sessions", type: "qcm", q: "Que signifie hacher un mot de passe ?",
    opts: ["Le chiffrer pour pouvoir le déchiffrer plus tard", "Le transformer en une chaîne fixe qu'on ne peut pas inverser", "Le stocker dans un cookie", "Le couper en morceaux"], a: 1,
    exp: "Un hash ne se déchiffre pas. À la connexion, `password_verify` compare le mot de passe saisi au hash stocké." },
  { id: "x14", ch: "ps-sessions", type: "qcm", q: "Pour déconnecter l'utilisateur, que faut-il écrire avant session_destroy() ?",
    opts: ["Rien", "`session_start()`", "`setcookie('PHPSESSID')`", "`exit()`"], a: 1,
    exp: "Il faut d'abord démarrer la session pour accéder à la session en cours, puis la détruire." }
];


/* ---------- Exercices pratiques (entraînement du jour) ----------
   q : énoncé · code : contexte fourni · hints : indices dévoilés un par un · sol : correction · exp : explication */
const PRACTICE = [
  // ProgWeb : bases
  { id: "pb1", ch: "pw-bases", q: "Écrivez `compare(a, b)` qui renvoie « strictement égaux » si `a === b`, « égaux après conversion » si seulement `a == b`, et « différents » sinon. Testez avec (4, 4), (4, '4') et (4, 5).",
    hints: ["Testez d'abord le cas le plus strict.", "Trois `if` qui renvoient chacun une chaîne, dans l'ordre : `===`, puis `==`, puis le reste."],
    sol: `function compare(a, b) {
  if (a === b) return 'strictement égaux';
  if (a == b) return 'égaux après conversion';
  return 'différents';
}
compare(4, 4);     // strictement égaux
compare(4, '4');   // égaux après conversion
compare(4, 5);     // différents`, exp: "L'ordre compte : si on testait `==` en premier, (4, 4) donnerait aussi « égaux après conversion »." },
  { id: "pb2", ch: "pw-bases", q: "Écrivez `createMultiplier(factor)` qui retourne une fonction. `createMultiplier(3)(5)` doit renvoyer 15. Créez ensuite `double` et `triple` avec.",
    hints: ["C'est le même principe que `createGreeting` : une fonction qui retourne une fonction.", "La fonction retournée reçoit un nombre `n` et utilise `factor`, qu'elle garde en mémoire."],
    sol: `const createMultiplier = factor => n => n * factor;

const double = createMultiplier(2);
const triple = createMultiplier(3);
double(5);   // 10
triple(5);   // 15`, exp: "La fonction retournée est une closure : elle se souvient de `factor`." },
  { id: "pb3", ch: "pw-bases", q: "Écrivez `randomInt(min, max)` (entier entre min et max inclus), puis `rollDice(n)` qui renvoie un tableau de n lancers de dé à 6 faces.",
    hints: ["Formule : `Math.floor(Math.random() * (max - min + 1)) + min`.", "Pour `rollDice`, une boucle `for` qui fait `push(randomInt(1, 6))` dans un tableau vide."],
    sol: `function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rollDice(n) {
  const rolls = [];
  for (let i = 0; i < n; i++) rolls.push(randomInt(1, 6));
  return rolls;
}
rollDice(3);   // par exemple [4, 1, 6]`, exp: "On réutilise `randomInt` plutôt que de réécrire la formule." },

  // ProgWeb : tableaux
  { id: "pt1", ch: "pw-tableaux", q: "Avec `const numbers = [3, 14, 15, 92, 65, 35, 89, 79];`, écrivez une ligne pour chaque demande : (1) les doubles ; (2) les impairs ; (3) la somme ; (4) y a-t-il un multiple de 9 ? ; (5) sont-ils tous positifs ?",
    hints: ["(1) `map`, (2) `filter`, (3) `reduce`, (4) `some`, (5) `every`.", "Impair : `n % 2 !== 0`. Multiple de 9 : `n % 9 === 0`."],
    sol: `numbers.map(n => n * 2);                // [6, 28, 30, 184, 130, 70, 178, 158]
numbers.filter(n => n % 2 !== 0);       // [3, 15, 65, 35, 89, 79]
numbers.reduce((acc, n) => acc + n, 0); // 392
numbers.some(n => n % 9 === 0);         // false
numbers.every(n => n > 0);              // true`, exp: "Une méthode par question. Aucune ne modifie `numbers`." },
  { id: "pt2", ch: "pw-tableaux", q: "Écrivez `stats(t)` qui renvoie un objet `{ min, max, average }` pour un tableau de nombres, sans le modifier.",
    hints: ["`Math.min(...t)` et `Math.max(...t)`.", "La moyenne, c'est la somme (avec `reduce`) divisée par `t.length`."],
    sol: `function stats(t) {
  const sum = t.reduce((acc, n) => acc + n, 0);
  return {
    min: Math.min(...t),
    max: Math.max(...t),
    average: sum / t.length,
  };
}
stats([2, 8, 5]);   // { min: 2, max: 8, average: 5 }`, exp: "Le spread passe les valeurs une par une à `Math.min` et `Math.max`." },
  { id: "pt3", ch: "pw-tableaux", q: "Avec `const strings = ['Sator', 'Arepo', 'Tenet', 'Opera', 'Rotas'];` : (1) les mots en majuscules ; (2) les palindromes (qui se lisent dans les deux sens) ; (3) les mots triés par ordre alphabétique, sans modifier strings.",
    hints: ["Pour retourner un mot : `[...mot].reverse().join('')`. On peut utiliser `reverse` ici, car `[...mot]` est une copie.", "Comparez en minuscules : 'Tenet' et 'teneT' doivent être considérés comme égaux."],
    sol: `strings.map(w => w.toUpperCase());

strings.filter(w => {
  const lower = w.toLowerCase();
  return lower === [...lower].reverse().join('');
});                                                   // ['Tenet']

strings.toSorted((a, b) => a.localeCompare(b));       // ['Arepo', 'Opera', 'Rotas', 'Sator', 'Tenet']`, exp: "`toSorted` avec `localeCompare` trie correctement le texte, sans toucher à l'original." },

  // ProgWeb : objets
  { id: "po1", ch: "pw-objets", q: "Avec `players = [{ name: 'Ada', score: 12 }, { name: 'Linus', score: 30 }, { name: 'Grace', score: 25 }]` : (1) les noms des joueurs à plus de 20 points ; (2) le score moyen ; (3) les joueurs triés du meilleur au moins bon, sans modifier players.",
    hints: ["(1) `filter` puis `map`.", "(3) Pour trier du plus grand au plus petit, inversez la soustraction : `b.score - a.score`."],
    sol: `players.filter(p => p.score > 20).map(p => p.name);            // ['Linus', 'Grace']
players.reduce((acc, p) => acc + p.score, 0) / players.length;  // 22.33…
players.toSorted((a, b) => b.score - a.score);                  // Linus, Grace, Ada`, exp: "`a - b` trie dans l'ordre croissant, `b - a` dans l'ordre décroissant." },
  { id: "po2", ch: "pw-objets", q: "Écrivez `countBySuit(cards)` qui renvoie le nombre de cartes de chaque couleur, par exemple `{ hearts: 2, spades: 1 }`.",
    hints: ["Partez d'un objet vide `{}` et parcourez les cartes avec `for...of`.", "La clé est dans une variable : `counts[card.suit]`. Si elle n'existe pas encore, partez de 0 avec `?? 0`."],
    sol: `function countBySuit(cards) {
  const counts = {};
  for (const card of cards) {
    counts[card.suit] = (counts[card.suit] ?? 0) + 1;
  }
  return counts;
}
countBySuit([{ suit: 'hearts' }, { suit: 'spades' }, { suit: 'hearts' }]);
// { hearts: 2, spades: 1 }`, exp: "Les crochets sont obligatoires, car le nom de la couleur est dans `card.suit`." },
  { id: "po3", ch: "pw-objets", q: "Écrivez `drawCards(deck, n)` qui renvoie n cartes au hasard sans modifier deck. Vous pouvez utiliser `shuffleInPlace`.",
    hints: ["Ne mélangez jamais `deck` lui-même : faites une copie avec `[...deck]`.", "Après le mélange, `slice(0, n)` prend les n premières."],
    sol: `function drawCards(deck, n) {
  const copy = [...deck];
  shuffleInPlace(copy);
  return copy.slice(0, n);
}`, exp: "Copier, mélanger, couper : le paquet d'origine reste intact." },

  // ProgWeb : DOM
  { id: "pd1", ch: "pw-dom", q: "Dans le paquet `.deck` du TP 3, écrivez les six sélections : l'as de pique ; tous les cœurs ; les cœurs et les carreaux ; les figures ; les figures rouges ; toutes les cartes sauf les piques. Notez le nombre attendu.",
    hints: ["Virgule = l'un ou l'autre ; collé = les deux sur le même élément.", "Pour « sauf les piques », ciblez les `playing-card` elles-mêmes, sinon les spans sont pris aussi."],
    sol: `const deck = document.querySelector('.deck');
deck.querySelector('#SPADE-ACE');                                            // 1
deck.querySelectorAll('.heart');                                             // 13
deck.querySelectorAll('.heart, .diamond');                                   // 26
deck.querySelectorAll('[data-face-card]');                                   // 12
deck.querySelectorAll('.heart[data-face-card], .diamond[data-face-card]');   // 6
deck.querySelectorAll('playing-card:not(.spade)');                           // 39`, exp: "Exactement ce que l'examen peut demander de lire ou d'écrire." },
  { id: "pd2", ch: "pw-dom", q: "Écrivez `selectCards(selector)` qui retire d'abord la classe selected de toutes les cartes du paquet, puis l'ajoute à celles qui correspondent au sélecteur.",
    hints: ["Deux `querySelectorAll` dans `.deck` : un pour tout désélectionner, un pour sélectionner.", "`forEach` existe sur une NodeList."],
    sol: `function selectCards(selector) {
  const deck = document.querySelector('.deck');
  deck.querySelectorAll('.selected').forEach(c => c.classList.remove('selected'));
  deck.querySelectorAll(selector).forEach(c => c.classList.add('selected'));
}
selectCards('.heart[data-face-card]');`, exp: "En cherchant dans `deck`, on ne touche pas aux cartes de la main." },
  { id: "pd3", ch: "pw-dom", q: "Écrivez `swapWithPrevious(card)` qui échange une carte avec sa voisine précédente, et ne fait rien si elle est déjà la première.",
    hints: ["`card.previousElementSibling` vaut `null` pour le premier élément.", "`prev.before(card)` place card juste avant prev."],
    sol: `function swapWithPrevious(card) {
  const prev = card.previousElementSibling;
  if (!prev) return;
  prev.before(card);   // card est déplacée avant prev
}`, exp: "Pas besoin de cloner : insérer un élément déjà présent le déplace." },

  // ProgWeb : clones
  { id: "pc1", ch: "pw-clones", q: "Ajoutez deux boutons : #clear-hand vide la main, et #sort-hand trie les cartes de la main par l'attribut data-rank (un nombre).",
    hints: ["Vider : `replaceChildren()` sans argument.", "Trier : transformez `hand.children` en tableau, triez avec `dataset.rank`, puis remettez les cartes avec `replaceChildren(...)`."],
    sol: `const hand = document.querySelector('#hand');

document.querySelector('#clear-hand').addEventListener('click', () => {
  hand.replaceChildren();
});

document.querySelector('#sort-hand').addEventListener('click', () => {
  const sorted = [...hand.children].toSorted(
    (a, b) => Number(a.dataset.rank) - Number(b.dataset.rank)
  );
  hand.replaceChildren(...sorted);
});`, exp: "`dataset` renvoie des chaînes : on les convertit en nombres avant de les soustraire." },
  { id: "pc2", ch: "pw-clones", q: "Écrivez `createItem(name, imageUrl)` : clonez le modèle `article.item` du template, mettez le nom dans `.name`, et l'image dans `img` (attributs src et alt).",
    hints: ["Le modèle se récupère par `.content` du template, une seule fois.", "`img.src = imageUrl;` et `img.alt = name;`."],
    sol: `const tmplItem = document
  .querySelector('#item-template')
  .content.querySelector('article.item');

function createItem(name, imageUrl) {
  const item = tmplItem.cloneNode(true);
  item.querySelector('.name').textContent = name;
  const img = item.querySelector('img');
  img.src = imageUrl;
  img.alt = name;
  return item;
}`, exp: "On ne touche jamais au modèle : on modifie le clone." },

  // ProgWeb : événements
  { id: "pe1", ch: "pw-events", q: "Le formulaire #add-item-form contient un input et un `<select name=\"tier\">` (S, A, B, C, D). À la soumission, ajoutez la carte dans la catégorie choisie.",
    hints: ["Lisez la catégorie avec `form.querySelector('select').value`.", "Cible : `.tier[data-tier=\"…\"] .items`, construite avec un gabarit de chaîne."],
    sol: `const form = document.querySelector('#add-item-form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const name = form.querySelector('input').value.trim();
  const tier = form.querySelector('select').value;
  if (name === '') return;
  document
    .querySelector(\`.tier[data-tier="\${tier}"] .items\`)
    .append(createItem(name));
  form.reset();
});`, exp: "`preventDefault`, lire, vérifier, créer, insérer, vider." },
  { id: "pe2", ch: "pw-events", q: "Écrivez l'écouteur délégué complet sur #tiers pour les trois actions : up, down et delete (avec confirmation).",
    hints: ["Un seul écouteur, puis `event.target.closest('button[data-action]')`.", "Pour up et down : indice actuel avec `TIERS.indexOf`, puis ±1, en vérifiant les bornes."],
    sol: `const TIERS = ['S', 'A', 'B', 'C', 'D'];

document.querySelector('#tiers').addEventListener('click', event => {
  const btn = event.target.closest('button[data-action]');
  if (!btn) return;
  const card = btn.closest('.item');
  const action = btn.dataset.action;

  if (action === 'delete') {
    if (confirm('Supprimer ?')) card.remove();
    return;
  }
  const i = TIERS.indexOf(card.closest('.tier').dataset.tier);
  const j = action === 'up' ? i - 1 : i + 1;
  if (j < 0 || j >= TIERS.length) return;
  document.querySelector(\`.tier[data-tier="\${TIERS[j]}"] .items\`).append(card);
});`, exp: "C'est l'essentiel du TP 4 : un seul écouteur gère toutes les cartes, même celles ajoutées ensuite." },
  { id: "pe3", ch: "pw-events", q: "Un bouton #plus et un `<span id=\"count\">0</span>`. Chaque clic sur #plus augmente le nombre. Un clic sur le nombre le remet à 0.",
    hints: ["Gardez le compteur dans une variable `let`.", "Après chaque changement, mettez à jour `textContent`."],
    sol: `let count = 0;
const out = document.querySelector('#count');

document.querySelector('#plus').addEventListener('click', () => {
  count++;
  out.textContent = count;
});
out.addEventListener('click', () => {
  count = 0;
  out.textContent = count;
});`, exp: "Deux écouteurs `click`, une variable d'état, un affichage mis à jour." },

  // ProgServ2 : PHP
  { id: "pp1", ch: "ps-php", q: "Écrivez une page qui affiche « Bonjour Ada » pour l'URL `page.php?nom=Ada`, et « Bonjour inconnu » sans paramètre. Échappez la valeur.",
    hints: ["`$_GET['nom'] ?? 'inconnu'`.", "`htmlspecialchars` au moment de l'affichage."],
    sol: `<?php
$nom = $_GET['nom'] ?? 'inconnu';
?>
<p>Bonjour <?= htmlspecialchars($nom) ?></p>`, exp: "`??` évite l'erreur si le paramètre manque, `htmlspecialchars` évite le XSS." },
  { id: "pp2", ch: "ps-php", q: "Écrivez une fonction typée `average(array $notes): float` qui renvoie 0 pour un tableau vide. Puis affichez chaque élève de `['Ada' => 5.5, 'Linus' => 4.5]` avec sa note, et la moyenne.",
    hints: ["`count($notes) === 0` pour le cas vide ; `array_sum` donne la somme.", "`foreach ($notes as $nom => $note)`."],
    sol: `<?php
function average(array $notes): float {
    if (count($notes) === 0) return 0;
    return array_sum($notes) / count($notes);
}

$notes = ['Ada' => 5.5, 'Linus' => 4.5];
foreach ($notes as $nom => $note) {
    echo "<p>$nom : $note</p>";
}
echo '<p>Moyenne : ' . average($notes) . '</p>';   // 5`, exp: "Le typage documente la fonction et protège contre les mauvais appels." },
  { id: "pp3", ch: "ps-php", q: "Un formulaire POST a un champ age. Affichez « majeur » ou « mineur », en utilisant une constante `MAJORITY` qui vaut 18.",
    hints: ["`const MAJORITY = 18;`", "Testez d'abord que le formulaire a été envoyé et que l'âge est un nombre."],
    sol: `<?php
const MAJORITY = 18;
if ($_SERVER['REQUEST_METHOD'] === 'POST' && is_numeric($_POST['age'] ?? '')) {
    $age = (int) $_POST['age'];
    echo $age >= MAJORITY ? 'majeur' : 'mineur';
}
?>
<form method="post">
    <input name="age" type="number">
    <button>Envoyer</button>
</form>`, exp: "Une constante évite d'écrire 18 en dur à plusieurs endroits." },

  // ProgServ2 : POO
  { id: "pq1", ch: "ps-poo", q: "Écrivez une classe `BankAccount` : un attribut privé `$balance` (0 au départ), `deposit(float $amount)`, `withdraw(float $amount)` qui lance une exception si le solde est insuffisant, et `getBalance()`.",
    hints: ["L'attribut est `private` : seules les méthodes y touchent (encapsulation).", "`throw new Exception('Solde insuffisant');`"],
    sol: `<?php
class BankAccount {
    private float $balance = 0;

    public function deposit(float $amount): void {
        $this->balance += $amount;
    }
    public function withdraw(float $amount): void {
        if ($amount > $this->balance) {
            throw new Exception('Solde insuffisant');
        }
        $this->balance -= $amount;
    }
    public function getBalance(): float {
        return $this->balance;
    }
}

$account = new BankAccount();
$account->deposit(100);
try {
    $account->withdraw(150);
} catch (Exception $e) {
    echo $e->getMessage();   // Solde insuffisant
}`, exp: "Personne ne peut écrire `$account->balance = 1000000` : la classe contrôle ses données." },
  { id: "pq2", ch: "ps-poo", q: "Écrivez une classe abstraite `Shape` avec une méthode abstraite `area(): float`, puis `Rectangle` et `Circle`. Affichez l'aire de chaque forme d'un tableau.",
    hints: ["`abstract class Shape { abstract public function area(): float; }`", "Aire du cercle : `M_PI * $r * $r`."],
    sol: `<?php
abstract class Shape {
    abstract public function area(): float;
}

class Rectangle extends Shape {
    public function __construct(private float $w, private float $h) {}
    public function area(): float { return $this->w * $this->h; }
}

class Circle extends Shape {
    public function __construct(private float $r) {}
    public function area(): float { return M_PI * $this->r * $this->r; }
}

$shapes = [new Rectangle(2, 3), new Circle(1)];
foreach ($shapes as $shape) {
    echo $shape->area() . '<br>';   // 6, puis 3.14…
}`, exp: "Chaque sous-classe fournit sa propre version de `area`. On ne peut pas faire `new Shape()`." },

  // ProgServ2 : PDO
  { id: "pr1", ch: "ps-pdo", q: "Écrivez en SQL : la table `pets` (id automatique, name obligatoire, species, age), puis les requêtes pour ajouter Rex (chien, 4 ans), lister tous les animaux, passer Rex à 5 ans et supprimer Rex.",
    hints: ["`id INT AUTO_INCREMENT PRIMARY KEY`, `name VARCHAR(40) NOT NULL`.", "N'oubliez pas le `WHERE` dans `UPDATE` et `DELETE`."],
    sol: `CREATE TABLE pets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    species VARCHAR(40),
    age INT
);

INSERT INTO pets (name, species, age) VALUES ('Rex', 'chien', 4);
SELECT * FROM pets;
UPDATE pets SET age = 5 WHERE name = 'Rex';
DELETE FROM pets WHERE name = 'Rex';`, exp: "Les quatre opérations CRUD. Sans `WHERE`, toute la table serait modifiée ou vidée." },
  { id: "pr2", ch: "ps-pdo", q: "Écrivez `addPet(PDO $pdo, string $name, int $age): int` qui insère l'animal avec une requête préparée et renvoie son id.",
    hints: ["`prepare` avec `:name` et `:age`, puis `execute` avec un tableau.", "`$pdo->lastInsertId()` renvoie une chaîne : convertissez avec `(int)`."],
    sol: `<?php
function addPet(PDO $pdo, string $name, int $age): int {
    $stmt = $pdo->prepare('INSERT INTO pets (name, age) VALUES (:name, :age)');
    $stmt->execute(['name' => $name, 'age' => $age]);
    return (int) $pdo->lastInsertId();
}`, exp: "Les valeurs passent par `execute`, jamais dans la chaîne SQL." },
  { id: "pr3", ch: "ps-pdo", q: "Formulaire d'ajout d'animal : validez name (obligatoire, 2 à 40 caractères) et age (nombre de 0 à 50). En cas d'erreur, affichez les erreurs et conservez les valeurs saisies.",
    hints: ["Un tableau `$errors`, une condition par règle, `strlen` pour la longueur.", "`value=\"<?= htmlspecialchars($name ?? '') ?>\"` dans le champ."],
    sol: `<?php
$errors = [];
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $age = $_POST['age'] ?? '';
    if (strlen($name) < 2 || strlen($name) > 40) $errors[] = 'Le nom doit faire 2 à 40 caractères.';
    if (!is_numeric($age) || $age < 0 || $age > 50) $errors[] = "L'âge doit être entre 0 et 50.";
    if (empty($errors)) {
        addPet($pdo, $name, (int) $age);
        header('Location: index.php');
        exit();
    }
}
?>
<?php foreach ($errors as $error): ?>
    <p class="error"><?= htmlspecialchars($error) ?></p>
<?php endforeach; ?>
<form method="post">
    <input name="name" value="<?= htmlspecialchars($name ?? '') ?>" required minlength="2">
    <input name="age" type="number" value="<?= htmlspecialchars($age ?? '') ?>" min="0" max="50">
    <button>Ajouter</button>
</form>`, exp: "Validation côté serveur obligatoire ; les attributs HTML ne sont qu'un confort en plus." },

  // ProgServ2 : includes
  { id: "pi1", ch: "ps-include", q: "Découpez un site en composants : `head.php` (titre variable, « ninetendogs » par défaut), `header.php` (le menu) et `footer.php`. Écrivez `index.php` et `about.php` qui les utilisent.",
    hints: ["Chaque page définit `$title` avant d'inclure `head.php`.", "Le `??` va à l'intérieur de `htmlspecialchars`."],
    sol: `<?php // components/head.php ?>
<head>
    <meta charset="utf-8">
    <title><?= htmlspecialchars($title ?? 'ninetendogs') ?></title>
</head>

<?php // components/header.php ?>
<header><nav><a href="index.php">Accueil</a> <a href="about.php">À propos</a></nav></header>

<?php // components/footer.php ?>
<footer>© ninetendogs</footer>

<?php // about.php
$title = 'À propos';
?>
<!DOCTYPE html>
<html>
<?php require __DIR__ . '/components/head.php'; ?>
<body>
    <?php require __DIR__ . '/components/header.php'; ?>
    <main><h1>À propos</h1></main>
    <?php require __DIR__ . '/components/footer.php'; ?>
</body>
</html>`, exp: "Une modification du menu se fait dans `header.php` et s'applique partout." },
  { id: "pi2", ch: "ps-include", q: "Écrivez la fonction `render($component, $data)` et un composant `pet-card.php` qui affiche le nom et l'âge. Affichez une carte pour chaque animal de `$pets`.",
    hints: ["`extract($data, EXTR_SKIP)` puis `require` (pas `require_once` : le composant est affiché plusieurs fois).", "Dans la boucle : `render('pet-card', ['pet' => $pet]);`."],
    sol: `<?php // src/functions.php
function render(string $component, array $data = []): void {
    extract($data, EXTR_SKIP);
    require __DIR__ . '/../components/' . $component . '.php';
}

<?php // components/pet-card.php ?>
<article class="pet">
    <h2><?= htmlspecialchars($pet['name']) ?></h2>
    <p><?= (int) $pet['age'] ?> ans</p>
</article>

<?php // index.php
require_once __DIR__ . '/src/functions.php';
foreach ($pets as $pet) {
    render('pet-card', ['pet' => $pet]);
}`, exp: "`require_once` pour le fichier de fonctions, `require` pour le composant répété." },

  // ProgServ2 : sécurité
  { id: "ps1", ch: "ps-securite", q: "Ce code contient deux failles de sécurité. Nommez-les et corrigez le code.",
    code: `<?php
$name = $_GET['name'];
$stmt = $pdo->query("SELECT * FROM pets WHERE name = '$name'");
foreach ($stmt as $pet) {
    echo "<li>{$pet['name']}</li>";
}`,
    hints: ["Une faille vient de la requête SQL, l'autre de l'affichage.", "Requête préparée pour la première, `htmlspecialchars` pour la seconde."],
    sol: `<?php
$name = $_GET['name'] ?? '';
$stmt = $pdo->prepare('SELECT * FROM pets WHERE name = :name');   // 1. injection SQL
$stmt->execute(['name' => $name]);
foreach ($stmt->fetchAll() as $pet) {
    echo '<li>' . htmlspecialchars($pet['name']) . '</li>';          // 2. XSS
}`, exp: "1. Injection SQL : la saisie était collée dans la requête. 2. XSS : un nom contenant `<script>` aurait été exécuté chez les visiteurs." },
  { id: "ps2", ch: "ps-securite", q: "Formulaire d'inscription : email valide, mot de passe d'au moins 8 caractères, confirmation identique. Remplissez un tableau `$errors`.",
    hints: ["`filter_var($email, FILTER_VALIDATE_EMAIL)`.", "`strlen($password) < 8` et `$password !== $confirm`."],
    sol: `<?php
$errors = [];
$email = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';
$confirm = $_POST['confirm'] ?? '';

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Email invalide.';
if (strlen($password) < 8) $errors[] = 'Mot de passe : 8 caractères minimum.';
if ($password !== $confirm) $errors[] = 'Les mots de passe ne correspondent pas.';`, exp: "On ne fait pas de `trim` sur un mot de passe : les espaces peuvent en faire partie." },

  // ProgServ2 : cookies
  { id: "pk1", ch: "ps-cookies", q: "Préférence de thème : les liens `?theme=dark` et `?theme=light` enregistrent un cookie de 30 jours. La page lit le cookie (light par défaut, toute autre valeur refusée) et met la classe correspondante sur `<body>`.",
    hints: ["Liste des valeurs autorisées et `in_array`.", "Quand on vient de cliquer, le cookie n'est pas encore dans `$_COOKIE` : utilisez directement la valeur du lien."],
    sol: `<?php
$allowed = ['light', 'dark'];
$theme = 'light';

if (isset($_GET['theme']) && in_array($_GET['theme'], $allowed)) {
    $theme = $_GET['theme'];
    setcookie('theme', $theme, time() + (30 * 24 * 60 * 60), '/');
} elseif (isset($_COOKIE['theme']) && in_array($_COOKIE['theme'], $allowed)) {
    $theme = $_COOKIE['theme'];
}
?>
<body class="<?= $theme ?>">
    <a href="?theme=light">Clair</a> <a href="?theme=dark">Sombre</a>
</body>`, exp: "`setcookie` avant tout affichage. La valeur du cookie est vérifiée, car le client peut la modifier." },
  { id: "pk2", ch: "ps-cookies", q: "Compteur de visites avec un cookie : la page affiche « Visite n° X » et augmente X à chaque visite.",
    hints: ["`(int) ($_COOKIE['visits'] ?? 0)` pour lire la valeur actuelle.", "Ajoutez 1, renvoyez le cookie, puis affichez."],
    sol: `<?php
$visits = (int) ($_COOKIE['visits'] ?? 0) + 1;
setcookie('visits', (string) $visits, time() + (365 * 24 * 60 * 60), '/');
echo "Visite n° $visits";`, exp: "On calcule la nouvelle valeur nous-mêmes, car `$_COOKIE` ne sera à jour qu'à la requête suivante." },

  // ProgServ2 : sessions
  { id: "px1", ch: "ps-sessions", q: "Compteur de pages vues pendant la session : chaque rechargement affiche « Pages vues : X ».",
    hints: ["`session_start()` en premier.", "`$_SESSION['views'] = ($_SESSION['views'] ?? 0) + 1;`"],
    sol: `<?php
session_start();
$_SESSION['views'] = ($_SESSION['views'] ?? 0) + 1;
echo 'Pages vues : ' . $_SESSION['views'];`, exp: "Contrairement au cookie, la valeur est stockée sur le serveur et disponible tout de suite." },
  { id: "px2", ch: "ps-sessions", q: "Écrivez `logout.php` et une page protégée `profile.php` qui renvoie vers `login.php` si l'utilisateur n'est pas connecté, et affiche son email sinon (stocké dans `$_SESSION['email']`).",
    hints: ["Dans les deux fichiers, `session_start()` d'abord.", "Redirection : `header('Location: login.php');` puis `exit();`."],
    sol: `<?php // logout.php
session_start();
session_destroy();
header('Location: login.php');
exit();

<?php // profile.php
session_start();
if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit();
}
?>
<p>Connecté en tant que <?= htmlspecialchars($_SESSION['email']) ?></p>
<a href="logout.php">Se déconnecter</a>`, exp: "Sans `exit()`, le contenu protégé serait quand même envoyé." },
  { id: "px3", ch: "ps-sessions", q: "Écrivez `register.php` (enregistre email et mot de passe haché) et la partie de `login.php` qui vérifie le mot de passe et ouvre la session.",
    hints: ["Inscription : `password_hash($password, PASSWORD_DEFAULT)`.", "Connexion : chercher l'utilisateur par email, puis `password_verify`."],
    sol: `<?php // register.php (après validation)
$hash = password_hash($password, PASSWORD_DEFAULT);
$stmt = $pdo->prepare('INSERT INTO users (email, password) VALUES (:email, :password)');
$stmt->execute(['email' => $email, 'password' => $hash]);

<?php // login.php
session_start();
$stmt = $pdo->prepare('SELECT * FROM users WHERE email = :email');
$stmt->execute(['email' => $email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($password, $user['password'])) {
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['email'] = $user['email'];
    header('Location: profile.php');
    exit();
}
$error = 'Identifiants incorrects.';`, exp: "La base ne contient que le hash ; `password_verify` fait la comparaison." }
];

/* ---------- Remettre des lignes dans l'ordre (problèmes de Parsons) ----------
   lines : les lignes DANS LE BON ORDRE (elles sont mélangées à l'affichage) */
const ORDER = [
  { id: "ord-w1", ch: "pw-objets", q: "Remettez dans l'ordre la fonction qui renvoie le score le plus élevé.",
    lines: ["function getMaxScore(players) {", "  let max = players[0].score;", "  for (const p of players) {", "    if (p.score > max) max = p.score;", "  }", "  return max;", "}"],
    exp: "Toujours le même schéma : créer `max` avant la boucle, le mettre à jour dedans, le renvoyer après. Le `return` doit être après l'accolade qui ferme la boucle." },
  { id: "ord-w2", ch: "pw-clones", q: "Remettez dans l'ordre le tirage d'une main de 5 cartes.",
    lines: ["const copy = [...deckCards];", "shuffleInPlace(copy);", "const handCards = copy.slice(0, 5).map(card => card.cloneNode(true));", "document.querySelector('#hand').replaceChildren(...handCards);"],
    exp: "Copier, mélanger, couper et cloner, insérer. Chaque ligne utilise la variable créée par la précédente : c'est ce qui impose l'ordre." },
  { id: "ord-w3", ch: "pw-clones", q: "Remettez dans l'ordre la création d'une carte à partir du template.",
    lines: ["const tmpl = document.querySelector('#item-template').content.querySelector('.item');", "const item = tmpl.cloneNode(true);", "item.querySelector('.name').textContent = name;", "list.append(item);"],
    exp: "On récupère le modèle, on le clone, on remplit le clone, puis on l'insère. On ne modifie jamais `tmpl` lui-même." },
  { id: "ord-w4", ch: "pw-events", q: "Remettez dans l'ordre l'écouteur du formulaire.",
    lines: ["form.addEventListener('submit', event => {", "  event.preventDefault();", "  const name = form.querySelector('input').value.trim();", "  if (name === '') return;", "  list.append(createItem(name));", "  form.reset();", "});"],
    exp: "`preventDefault` en premier (par convention), puis lire, vérifier, créer et insérer, et enfin vider le formulaire. Le test du nom vide doit venir avant l'ajout." },
  { id: "ord-w5", ch: "pw-events", q: "Remettez dans l'ordre l'écouteur délégué qui supprime une carte.",
    lines: ["document.querySelector('#tiers').addEventListener('click', event => {", "  const btn = event.target.closest('button[data-action]');", "  if (!btn) return;", "  const card = btn.closest('.item');", "  card.remove();", "});"],
    exp: "On retrouve d'abord le bouton, on vérifie qu'il existe, puis on remonte jusqu'à la carte. Utiliser `btn` avant le test `if (!btn)` provoquerait une erreur pour un clic hors d'un bouton." },
  { id: "ord-w6", ch: "pw-tableaux", q: "Remettez dans l'ordre pour obtenir les noms des joueurs à plus de 20 points, triés par ordre alphabétique.",
    lines: ["const result = players", "  .filter(p => p.score > 20)", "  .map(p => p.name)", "  .toSorted((a, b) => a.localeCompare(b));"],
    exp: "On filtre sur `score` avant le `map` : après le `map`, il ne reste que des noms, et on ne pourrait plus tester le score. Le tri se fait sur les noms, donc après le `map`." },

  { id: "ord-s1", ch: "ps-sessions", q: "Remettez dans l'ordre le traitement de la connexion.",
    lines: ["session_start();", "$stmt = $pdo->prepare('SELECT * FROM users WHERE email = :email');", "$stmt->execute(['email' => $email]);", "$user = $stmt->fetch();", "if ($user && password_verify($password, $user['password'])) {", "    $_SESSION['user_id'] = $user['id'];", "    header('Location: profile.php');", "    exit();", "}"],
    exp: "`session_start()` tout en haut. Puis prepare, execute, fetch, toujours dans cet ordre. On vérifie le mot de passe avant d'écrire dans la session, et `exit()` vient juste après `header()`." },
  { id: "ord-s2", ch: "ps-sessions", q: "Remettez dans l'ordre la page réservée aux administrateurs.",
    lines: ["session_start();", "if (!isset($_SESSION['user_id'])) {", "    header('Location: login.php');", "    exit();", "}", "if ($_SESSION['role'] !== 'admin') {", "    http_response_code(403);", "    exit();", "}", "echo 'Page d\\'administration';"],
    exp: "D'abord l'authentification (connecté ?), puis l'autorisation (admin ?), et seulement ensuite l'affichage. Chaque refus est suivi d'un `exit()`." },
  { id: "ord-s3", ch: "ps-cookies", q: "Remettez dans l'ordre la page qui enregistre la langue choisie.",
    lines: ["<?php", "$lang = $_GET['lang'] ?? 'fr';", "setcookie('language', $lang, time() + 3600, '/');", "?>", "<p>Langue : <?= htmlspecialchars($lang) ?></p>"],
    exp: "`setcookie` envoie un en-tête HTTP : il doit être appelé avant tout affichage, donc avant le HTML. Et `$lang` doit exister avant d'être utilisé." },
  { id: "ord-s4", ch: "ps-pdo", q: "Remettez dans l'ordre la connexion à la base avec le fichier de configuration.",
    lines: ["$config = parse_ini_file(__DIR__ . '/config/database.ini');", "if (!$config) {", "    throw new Exception('Erreur lors de la lecture du fichier de configuration');", "}", "$dsn = \"mysql:host={$config['host']};dbname={$config['database']};charset=utf8mb4\";", "$pdo = new PDO($dsn, $config['username'], $config['password']);", "$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);"],
    exp: "Lire le fichier, vérifier qu'il a été lu, construire le DSN, créer la connexion, puis la configurer. `setAttribute` a besoin de `$pdo`, qui a besoin de `$dsn`, qui a besoin de `$config`." },
  { id: "ord-s5", ch: "ps-pdo", q: "Remettez dans l'ordre l'ajout d'un animal dans la base.",
    lines: ["$stmt = $pdo->prepare('INSERT INTO pets (name, age) VALUES (:name, :age)');", "$stmt->execute(['name' => $name, 'age' => $age]);", "$id = $pdo->lastInsertId();", "echo \"Animal n° $id ajouté\";"],
    exp: "prepare, puis execute. `lastInsertId` n'a de sens qu'après l'`INSERT`, et on l'affiche en dernier." },
  { id: "ord-s6", ch: "ps-poo", q: "Remettez dans l'ordre la sous-classe Dog.",
    lines: ["class Dog extends Pet {", "    public function describe(): string {", "        return parent::describe() . ' (chien)';", "    }", "}"],
    exp: "La classe contient la méthode, qui contient le `return`. La première accolade fermante ferme la méthode, la deuxième ferme la classe." },
  { id: "ord-s7", ch: "ps-include", q: "Remettez dans l'ordre la page about.php qui utilise le composant head.php.",
    lines: ["<?php", "$title = 'À propos';", "?>", "<!DOCTYPE html>", "<html>", "<?php require __DIR__ . '/components/head.php'; ?>", "<body><h1>À propos</h1></body>", "</html>"],
    exp: "`$title` doit être défini avant le `require`, sinon `head.php` affiche le titre par défaut. Le `<head>` vient entre `<html>` et `<body>`." },
  { id: "ord-s8", ch: "ps-securite", q: "Remettez dans l'ordre le traitement sécurisé d'un formulaire d'inscription. Indice : la première ligne crée le tableau d'erreurs.",
    lines: ["$errors = [];", "$email = trim($_POST['email'] ?? '');", "if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Email invalide.';", "if (empty($errors)) {", "    $stmt = $pdo->prepare('INSERT INTO users (email) VALUES (:email)');", "    $stmt->execute(['email' => $email]);", "}"],
    exp: "Préparer le tableau d'erreurs, nettoyer la saisie avec `trim`, valider, puis n'écrire dans la base que s'il n'y a aucune erreur, avec une requête préparée." }
];
ORDER.forEach(o => { o.type = "order"; o.sol = o.lines.join("\n"); });
EXERCISES.push(...ORDER);

/* ---------- Compléter le code ----------
   Dans code, [[0]], [[1]]… marquent les trous. blanks[i].a = bonne réponse, blanks[i].opts = propositions (dont la bonne). */
const FILL = [
  // ProgWeb
  { id: "f-w1", ch: "pw-tableaux", q: "Complétez pour obtenir les doubles des nombres plus grands que 5.",
    code: "const result = numbers\n  .[[0]](n => n > 5)\n  .[[1]](n => n * 2);",
    blanks: [{ a: "filter", opts: ["filter", "map", "some", "find"] }, { a: "map", opts: ["map", "filter", "reduce", "forEach"] }],
    exp: "`filter` garde les éléments qui passent la condition, puis `map` transforme chacun d'eux. `forEach` renverrait `undefined`." },
  { id: "f-w2", ch: "pw-tableaux", q: "Complétez les deux tris, sans modifier les tableaux d'origine.",
    code: "const sortedWords = words.[[0]]((a, b) => a.[[1]](b));\nconst sortedNumbers = numbers.toSorted((a, b) => [[2]]);",
    blanks: [{ a: "toSorted", opts: ["toSorted", "sort", "filter"] }, { a: "localeCompare", opts: ["localeCompare", "compare", "minus"] }, { a: "a - b", opts: ["a - b", "a > b", "b - a"] }],
    exp: "`toSorted` renvoie une copie (`sort` modifierait l'original). `localeCompare` compare des mots ; `a - b` trie des nombres dans l'ordre croissant." },
  { id: "f-w3", ch: "pw-objets", q: "Complétez la fonction qui renvoie le score le plus élevé.",
    code: "function getMaxScore(players) {\n  let max = players[0].score;\n  for (const p [[0]] players) {\n    if (p.score > max) [[1]];\n  }\n  [[2]];\n}",
    blanks: [{ a: "of", opts: ["of", "in", "from"] }, { a: "max = p.score", opts: ["max = p.score", "return p.score", "let max = p.score"] }, { a: "return max", opts: ["return max", "return p.score", "max"] }],
    exp: "`for...of` donne les valeurs. On met à jour `max` sans `let` (sinon on crée une autre variable), et on renvoie après la boucle." },
  { id: "f-w4", ch: "pw-objets", q: "Complétez la somme des prix d'un panier.",
    code: "const total = cart.reduce((acc, item) => [[0]], [[1]]);",
    blanks: [{ a: "acc + item.price * item.qty", opts: ["acc + item.price * item.qty", "item.price * item.qty", "acc + item"] }, { a: "0", opts: ["0", "''", "cart[0]"] }],
    exp: "On ajoute chaque montant à l'accumulateur, qui part de 0. Sans le 0, `acc` serait le premier objet du panier." },
  { id: "f-w5", ch: "pw-bases", q: "Complétez le compteur (closure) et le lancer de dé.",
    code: "function makeCounter() {\n  let c = 0;\n  return [[0]];\n}\nconst roll = Math.[[1]](Math.random() * 6) + 1;",
    blanks: [{ a: "() => ++c", opts: ["() => ++c", "c + 1", "++c"] }, { a: "floor", opts: ["floor", "round", "random"] }],
    exp: "`makeCounter` renvoie une fonction qui garde l'accès à `c`. `Math.floor` arrondit vers le bas : 0 à 5, puis +1 donne 1 à 6." },
  { id: "f-w6", ch: "pw-dom", q: "Complétez pour sélectionner tous les cœurs et lire l'attribut data-face-card d'une carte.",
    code: "document.[[0]]('.heart').forEach(c => c.[[1]].add('selected'));\nconst face = card.dataset.[[2]];",
    blanks: [{ a: "querySelectorAll", opts: ["querySelectorAll", "querySelector", "getElementById"] }, { a: "classList", opts: ["classList", "className", "class"] }, { a: "faceCard", opts: ["faceCard", "face-card", "facecard"] }],
    exp: "`querySelectorAll` renvoie tous les éléments. `classList.add` ajoute une classe. Dans `dataset`, `data-face-card` devient `faceCard`." },
  { id: "f-w7", ch: "pw-clones", q: "Complétez la copie d'une carte vers la main.",
    code: "const clone = card.[[0]];\nclone.[[1]]('id');\nhand.[[2]](clone);",
    blanks: [{ a: "cloneNode(true)", opts: ["cloneNode(true)", "cloneNode()", "copy()"] }, { a: "removeAttribute", opts: ["removeAttribute", "remove", "deleteAttribute"] }, { a: "append", opts: ["append", "push", "add"] }],
    exp: "`cloneNode(true)` copie aussi les enfants. On retire l'id pour éviter les doublons, puis `append` insère le clone à la fin." },
  { id: "f-w8", ch: "pw-clones", q: "Complétez la récupération du modèle dans le template.",
    code: "const tmpl = document.querySelector('#item-template').[[0]].querySelector('.item');\nconst item = tmpl.cloneNode(true);\nitem.querySelector('.name').[[1]] = name;",
    blanks: [{ a: "content", opts: ["content", "children", "innerHTML"] }, { a: "textContent", opts: ["textContent", "value", "innerText()"] }],
    exp: "Le contenu d'un template n'est accessible que par `.content`. `textContent` insère du texte sans l'interpréter comme du HTML." },
  { id: "f-w9", ch: "pw-events", q: "Complétez l'écouteur du formulaire.",
    code: "form.addEventListener('[[0]]', event => {\n  event.[[1]];\n  const name = input.value.[[2]];\n  if (name === '') return;\n  list.append(createItem(name));\n  form.[[3]];\n});",
    blanks: [{ a: "submit", opts: ["submit", "click", "send"] }, { a: "preventDefault()", opts: ["preventDefault()", "stopPropagation()", "cancel()"] }, { a: "trim()", opts: ["trim()", "clean()", "strip()"] }, { a: "reset()", opts: ["reset()", "clear()", "empty()"] }],
    exp: "On écoute `submit` (bouton et touche Entrée), on empêche le rechargement, on enlève les espaces autour, et on vide le formulaire à la fin." },
  { id: "f-w10", ch: "pw-events", q: "Complétez l'écouteur délégué.",
    code: "list.addEventListener('click', event => {\n  const btn = event.[[0]].[[1]]('button[data-action]');\n  if ([[2]]) return;\n  btn.closest('li').remove();\n});",
    blanks: [{ a: "target", opts: ["target", "currentTarget", "button"] }, { a: "closest", opts: ["closest", "querySelector", "parent"] }, { a: "!btn", opts: ["!btn", "btn", "btn === undefined"] }],
    exp: "`event.target` est l'élément cliqué (peut-être le span). `closest` remonte jusqu'au bouton, ou renvoie `null` : dans ce cas, on ignore le clic." },

  // ProgServ2
  { id: "f-s1", ch: "ps-sessions", q: "Complétez l'inscription et la connexion.",
    code: "// register.php\n$hash = [[0]]($password, PASSWORD_DEFAULT);\n\n// login.php\n[[1]];\n$stmt = $pdo->[[2]]('SELECT * FROM users WHERE email = :email');\n$stmt->execute(['email' => $email]);\n$user = $stmt->[[3]];\nif ($user && [[4]]($password, $user['password'])) {\n    $_SESSION['user_id'] = $user['id'];\n    header('Location: profile.php');\n    [[5]];\n}",
    blanks: [{ a: "password_hash", opts: ["password_hash", "md5", "password_verify"] }, { a: "session_start()", opts: ["session_start()", "start_session()", "session_open()"] }, { a: "prepare", opts: ["prepare", "query", "execute"] }, { a: "fetch()", opts: ["fetch()", "fetchAll()", "execute()"] }, { a: "password_verify", opts: ["password_verify", "password_hash", "hash_equals"] }, { a: "exit()", opts: ["exit()", "return", "break"] }],
    exp: "On stocke le hash, jamais le mot de passe. `session_start()` en premier, prepare → execute → fetch, `password_verify` compare au hash, et `exit()` suit toujours `header()`." },
  { id: "f-s2", ch: "ps-cookies", q: "Complétez la création (valable une heure) puis la suppression du cookie.",
    code: "setcookie('language', 'fr', [[0]], '/');\n// plus tard, pour le supprimer :\nsetcookie('language', '', [[1]], '/');",
    blanks: [{ a: "time() + 3600", opts: ["time() + 3600", "3600", "time()"] }, { a: "time() - 3600", opts: ["time() - 3600", "0", "null"] }],
    exp: "L'expiration est une date absolue : `time()` (secondes depuis 1970) plus une durée. Une date passée supprime le cookie." },
  { id: "f-s3", ch: "ps-cookies", q: "Complétez le choix de la langue depuis le cookie.",
    code: "$language = DEFAULT_LANGUAGE;\nif ([[0]]($_COOKIE['language'])\n    && [[1]]($_COOKIE['language'], $translations)) {\n    $language = $_COOKIE['language'];\n}",
    blanks: [{ a: "isset", opts: ["isset", "empty", "exists"] }, { a: "array_key_exists", opts: ["array_key_exists", "in_array", "isset"] }],
    exp: "On vérifie que le cookie existe, puis que la langue est une clé de `$translations`. Le client peut mettre n'importe quoi dans un cookie." },
  { id: "f-s4", ch: "ps-pdo", q: "Complétez la requête préparée.",
    code: "$stmt = $pdo->[[0]]('SELECT * FROM pets WHERE id = [[1]]');\n$stmt->[[2]](['id' => $id]);\n$pet = $stmt->fetch(PDO::FETCH_ASSOC);\nif ($pet === [[3]]) {\n    echo 'Introuvable';\n}",
    blanks: [{ a: "prepare", opts: ["prepare", "query", "exec"] }, { a: ":id", opts: [":id", "$id", "'$id'"] }, { a: "execute", opts: ["execute", "run", "bind"] }, { a: "false", opts: ["false", "null", "0"] }],
    exp: "Le marqueur `:id` remplace la valeur dans le SQL ; la vraie valeur part avec `execute`. `fetch` renvoie `false` quand il n'y a rien." },
  { id: "f-s5", ch: "ps-pdo", q: "Complétez la gestion d'erreur de la connexion.",
    code: "[[0]] {\n    $pdo = new PDO($dsn, $username, $password);\n} [[1]] (PDOException $e) {\n    echo 'Connexion impossible : ' . $e->[[2]];\n    exit();\n}",
    blanks: [{ a: "try", opts: ["try", "if", "do"] }, { a: "catch", opts: ["catch", "else", "except"] }, { a: "getMessage()", opts: ["getMessage()", "message", "error()"] }],
    exp: "`try` essaie, `catch` attrape l'exception, `getMessage()` donne le texte de l'erreur. Sans `catch`, le script s'arrêterait." },
  { id: "f-s6", ch: "ps-securite", q: "Complétez la validation et l'affichage sécurisés.",
    code: "if (!filter_var($email, [[0]])) {\n    $errors[] = 'Email invalide.';\n}\necho '<p>' . [[1]]($comment) . '</p>';",
    blanks: [{ a: "FILTER_VALIDATE_EMAIL", opts: ["FILTER_VALIDATE_EMAIL", "FILTER_EMAIL", "VALIDATE_EMAIL"] }, { a: "htmlspecialchars", opts: ["htmlspecialchars", "trim", "strip_tags_sql"] }],
    exp: "`filter_var` avec `FILTER_VALIDATE_EMAIL` valide l'email. `htmlspecialchars` échappe le texte à l'affichage, contre le XSS." },
  { id: "f-s7", ch: "ps-include", q: "Complétez le composant et les inclusions.",
    code: "// components/head.php\n<title><?= htmlspecialchars($title [[0]] 'ninetendogs') ?></title>\n\n// index.php\n[[1]] __DIR__ . '/src/functions.php';\n[[2]] __DIR__ . '/components/head.php';",
    blanks: [{ a: "??", opts: ["??", "||", "?:"] }, { a: "require_once", opts: ["require_once", "include", "require"] }, { a: "require", opts: ["require", "require_once", "include_once"] }],
    exp: "`??` donne la valeur par défaut si `$title` n'existe pas. `require_once` pour les fonctions (jamais deux fois), `require` pour un composant d'interface." },
  { id: "f-s8", ch: "ps-poo", q: "Complétez la classe et sa sous-classe.",
    code: "class Pet {\n    [[0]] string $name;\n    public function __construct(string $name) {\n        [[1]]->name = $name;\n    }\n    public function describe(): string { return $this->name; }\n}\nclass Dog [[2]] Pet {\n    public function describe(): string {\n        return [[3]]describe() . ' (chien)';\n    }\n}",
    blanks: [{ a: "private", opts: ["private", "public", "static"] }, { a: "$this", opts: ["$this", "self", "this"] }, { a: "extends", opts: ["extends", "implements", "inherits"] }, { a: "parent::", opts: ["parent::", "$this->", "super."] }],
    exp: "Attribut privé (encapsulation), `$this` désigne l'objet, `extends` pour hériter, `parent::` pour appeler la méthode du parent." },
  { id: "f-s9", ch: "ps-poo", q: "Complétez le compteur statique et la constante.",
    code: "class Pet {\n    public const SPECIES = 'inconnue';\n    private [[0]] int $count = 0;\n    public function __construct() { [[1]]$count++; }\n}\necho Pet[[2]]SPECIES;",
    blanks: [{ a: "static", opts: ["static", "const", "final"] }, { a: "self::", opts: ["self::", "$this->", "Pet->"] }, { a: "::", opts: ["::", "->", "."] }],
    exp: "Un attribut `static` appartient à la classe ; on y accède avec `self::` à l'intérieur. Les constantes se lisent avec `::` sur la classe." },
  { id: "f-s10", ch: "ps-sessions", q: "Complétez la page réservée aux administrateurs.",
    code: "session_start();\nif (![[0]]($_SESSION['user_id'])) {\n    header('Location: login.php');\n    exit();\n}\nif ($_SESSION['role'] !== 'admin') {\n    [[1]];\n    exit();\n}",
    blanks: [{ a: "isset", opts: ["isset", "empty", "is_null"] }, { a: "http_response_code(403)", opts: ["http_response_code(403)", "header('Location: login.php')", "session_destroy()"] }],
    exp: "Pas connecté → redirection vers la connexion. Connecté mais pas admin → 403 Forbidden : il est authentifié, mais pas autorisé." },
  { id: "f-s11", ch: "ps-php", q: "Complétez la fonction typée et la lecture d'un paramètre.",
    code: "function greet(string $name [[0]]): string {\n    return \"Hello, $name!\";\n}\n$page = $_GET['page'] [[1]] 'accueil';",
    blanks: [{ a: "= 'World'", opts: ["= 'World'", "?? 'World'", ": 'World'"] }, { a: "??", opts: ["??", "||", "or"] }],
    exp: "Une valeur par défaut s'écrit avec `=` dans la liste des paramètres. `??` donne une valeur par défaut si la clé n'existe pas." }
];
FILL.forEach(f => { f.type = "fill"; });

/* ---------- Leçons : un écran par notion ----------
   p : paragraphes · flow : schéma en étapes · table : {head, rows} · code · prof / trap / keep : encadrés */
const LESSONS = {
"pw-bases": [
  { t: "Comparer : == et ===",
    p: ["JavaScript a deux façons de tester l'égalité. `==` est **permissif** : avant de comparer, il convertit les deux valeurs dans le même type. `===` est **strict** : si les types sont différents, la réponse est false.",
        "En pratique, on utilise toujours `===`. L'examen pose souvent la question de `==` pour vérifier que vous connaissez la différence."],
    code: `4 == '4'     // true  : '4' est d'abord converti en 4
4 === '4'    // false : un number n'est pas une string
4.0 === 4    // true  : c'est le même nombre
0 == ''      // true  : les deux deviennent 0`,
    keep: "`===` compare la valeur **et** le type. `==` convertit d'abord." },
  { t: "Déclarer : const et let",
    p: ["`const` crée une variable qu'on ne peut **pas réassigner**. `let` crée une variable qui peut changer. Les deux n'existent que dans le bloc `{ }` où elles sont déclarées. On n'utilise plus `var`.",
        "Attention : `const` protège la **variable**, pas son **contenu**. Un tableau déclaré avec `const` peut toujours recevoir des éléments."],
    code: `const t = [1];
t.push(2);     // OK : on modifie le contenu → [1, 2]
t = [3];       // TypeError : on essaie de réassigner la variable

let total = 0;
total = total + 5;   // OK avec let`,
    trap: "`t.push(3)` sur un `const` fonctionne. `t = [3]` provoque une erreur." },
  { t: "Les fonctions sont des valeurs",
    p: ["En JavaScript, une fonction est une valeur comme une autre. On peut la ranger dans une variable, la **passer à une autre fonction**, ou la **retourner**. Une fonction passée en paramètre s'appelle un **callback**.",
        "La fonction fléchée est l'écriture courte : `n => n * 2`. Sans accolades, la valeur est renvoyée automatiquement. Avec des accolades, il faut écrire `return`."],
    code: `const double = n => n * 2;
const square = n => n * n;

// transform reçoit une fonction et l'appelle
const transform = (n, fn) => fn(n);
transform(5, double);   // 10
transform(5, square);   // 25

// repeatTransform applique fn plusieurs fois
function repeatTransform(n, fn, times) {
  let result = n;
  for (let i = 0; i < times; i++) {
    result = fn(result);
  }
  return result;
}
repeatTransform(2, double, 3);   // 2 → 4 → 8 → 16`,
    trap: "`n => { n * 2 }` renvoie `undefined` : avec des accolades, le `return` est obligatoire." },
  { t: "Les closures",
    p: ["Quand une fonction crée une autre fonction et la retourne, la fonction retournée **se souvient** des variables de celle qui l'a créée, même après la fin de son exécution. C'est ce qu'on appelle une **closure**.",
        "Chaque appel de la fonction « usine » crée une nouvelle mémoire, indépendante des autres."],
    code: `function createGreeting(greeting) {
  return name => \`\${greeting} \${name} !\`;   // se souvient de greeting
}
const sayHello = createGreeting('Hello');
const sayHi = createGreeting('Hi');
sayHello('Ada');   // "Hello Ada !"
sayHi('Ada');      // "Hi Ada !"

function makeCounter() {
  let c = 0;
  return () => ++c;
}
const a = makeCounter();
const b = makeCounter();
a(); a();   // a en est à 2
b();        // b en est à 1 : mémoire séparée`,
    keep: "Une fonction retournée garde l'accès aux variables de la fonction qui l'a créée." },
  { t: "Trois outils à connaître",
    p: ["**Nombre aléatoire entier** entre min et max inclus. `Math.random()` donne un nombre dans [0, 1[. On le multiplie par le nombre de valeurs possibles, on arrondit vers le bas, puis on décale.",
        "**Modulo** `%` : le reste de la division. Il sert à tester si un nombre est pair ou multiple d'un autre.",
        "**Paramètre rest** `...args` : regroupe tous les arguments reçus dans un vrai tableau."],
    code: `// entier entre min et max inclus
Math.floor(Math.random() * (max - min + 1)) + min;
Math.floor(Math.random() * 6) + 1;   // un dé : 1 à 6

7 % 2 === 1     // impair
14 % 7 === 0    // multiple de 7

function cl(...args) {           // args est un tableau
  args.forEach(a => console.log(a));
}
cl(1, 'a', [2, 3]);   // 3 arguments`,
    trap: "`Math.round` au lieu de `Math.floor` rend les valeurs extrêmes deux fois moins probables." }
],
"pw-tableaux": [
  { t: "Deux familles de méthodes",
    p: ["Certaines méthodes **créent un nouveau tableau** et laissent l'original intact. D'autres **modifient le tableau sur place**. C'est une question classique d'examen.",
        "Dans le TP, les tableaux sont gelés avec `Object.freeze` : une méthode qui modifie l'original y provoque une erreur."],
    table: { head: ["Méthode", "Renvoie", "Modifie l'original ?"], rows: [
      ["`map(fn)`", "Nouveau tableau, même longueur", "Non"],
      ["`filter(fn)`", "Nouveau tableau, éléments gardés", "Non"],
      ["`reduce(fn, init)`", "Une seule valeur", "Non"],
      ["`some` / `every`", "true ou false", "Non"],
      ["`find` / `indexOf`", "Un élément / un indice (-1 si absent)", "Non"],
      ["`slice(a, b)`", "Copie de a à b (b exclu)", "Non"],
      ["`toSorted(fn)`", "Copie triée", "Non"],
      ["`forEach(fn)`", "`undefined`", "Non"],
      ["`sort`, `reverse`", "Le même tableau", "**Oui**"],
      ["`push`, `pop`, `shift`, `splice`", "Variable", "**Oui**"] ] },
    keep: "Les méthodes « to… » (`toSorted`) et les méthodes fonctionnelles ne touchent jamais l'original." },
  { t: "map et filter",
    p: ["`map` applique une fonction à **chaque** élément et met le résultat à la même position. Le nouveau tableau a toujours la **même longueur**.",
        "`filter` garde seulement les éléments pour lesquels la fonction renvoie true. Le nouveau tableau est souvent **plus court**.",
        "On peut les enchaîner : d'abord trier les éléments avec `filter`, puis les transformer avec `map`."],
    flow: ["[4, 7, 10, 3]", "filter(n => n > 5)", "[7, 10]", "map(n => n * 2)", "[14, 20]"],
    code: `const numbers = [3, 14, 15, 92, 65];
numbers.map(n => n * 2);           // [6, 28, 30, 184, 130]
numbers.filter(n => n % 2 !== 0);  // [3, 15, 65]
numbers.map(n => n % 2 === 0);     // [false, true, false, true, false]`,
    trap: "`map` avec une condition renvoie des booléens, pas les éléments. Pour garder certains éléments, c'est `filter`." },
  { t: "reduce : tout réduire à une valeur",
    p: ["`reduce` parcourt le tableau en transportant un **accumulateur** (`acc`). À chaque tour, la fonction reçoit l'accumulateur et l'élément, et renvoie le nouvel accumulateur. La valeur de départ est le deuxième argument.",
        "Le plus simple pour ne pas se tromper à l'examen : faire le tableau des tours au brouillon."],
    code: `[1, 2, 3, 4].reduce((acc, n) => acc + n * 2, 0);   // 20`,
    table: { head: ["Tour", "acc avant", "n", "acc + n × 2"], rows: [
      ["1", "0", "1", "2"], ["2", "2", "2", "6"], ["3", "6", "3", "12"], ["4", "12", "4", "**20**"] ] },
    keep: "Sans valeur de départ, `reduce` commence avec le premier élément comme accumulateur." },
  { t: "Chercher : some, every, find, indexOf",
    p: ["`some` répond à « **au moins un** élément respecte-t-il la condition ? ». `every` répond à « **tous** les éléments la respectent-ils ? ».",
        "`find` renvoie le premier élément qui correspond (ou `undefined`). `indexOf` renvoie la position d'une valeur (ou -1)."],
    code: `const numbers = [3, 14, 15, 92, 65];
numbers.some(n => n % 9 === 0);   // false
numbers.every(n => n > 0);        // true
numbers.find(n => n > 50);        // 92
numbers.indexOf(7);               // -1

[].some(n => n > 0);    // false
[].every(n => n > 0);   // true (personne ne contredit)`,
    trap: "Sur un tableau vide, `every` renvoie **true**." },
  { t: "Copier, découper, trier",
    p: ["`slice` copie une partie du tableau. Un indice négatif compte depuis la fin.",
        "Le **spread** `...` étale un tableau : pour le copier, pour lui ajouter des éléments, ou pour passer ses valeurs une par une à une fonction comme `Math.max`.",
        "Pour trier, il faut presque toujours une **fonction de comparaison**. Sans elle, JavaScript compare les valeurs comme du texte."],
    code: `const t = [3, 14, 15, 92];
t.slice(1);          // [14, 15, 92]  sans le premier
t.slice(0, -1);      // [3, 14, 15]   sans le dernier
[...t, 7];           // ajout à la fin
['Lorem', ...t];     // ajout au début
Math.max(...t);      // 92

[10, 9, 1].toSorted();                 // [1, 10, 9] tri de texte !
[10, 9, 1].toSorted((a, b) => a - b);  // [1, 9, 10]
['b', 'a'].toSorted((a, b) => a.localeCompare(b));   // ['a', 'b']`,
    trap: "`Math.max(t)` sans les `...` donne `NaN`." }
],
"pw-objets": [
  { t: "Lire une propriété",
    p: ["Un objet regroupe des valeurs sous des noms (les **clés**). On lit une propriété avec un point, ou avec des crochets et une chaîne.",
        "Les crochets sont **obligatoires** quand le nom de la propriété est dans une variable."],
    code: `const card = { rank: 12, suit: 'hearts' };
card.rank;        // 12
card['suit'];     // 'hearts'

const key = 'suit';
card[key];        // 'hearts' : on lit la variable key
card.key;         // undefined : cherche une propriété appelée « key »`,
    keep: "Variable qui contient le nom → crochets sans guillemets : `card[key]`." },
  { t: "Tableaux d'objets",
    p: ["C'est le cas le plus fréquent à l'examen : une liste de joueurs, de cartes ou de produits. On combine les méthodes de tableau avec l'accès aux propriétés.",
        "Pour trouver un maximum avec une boucle : on part du premier élément, on **met à jour** pendant le parcours, et on renvoie le résultat **après** la boucle."],
    code: `const players = [
  { name: 'Ada', score: 12 },
  { name: 'Linus', score: 30 },
  { name: 'Grace', score: 25 },
];
players.map(p => p.name);                 // ['Ada', 'Linus', 'Grace']
players.filter(p => p.score > 20);        // Linus et Grace

function getMaxScore(players) {
  let max = players[0].score;
  for (const p of players) {
    if (p.score > max) max = p.score;    // mise à jour
  }
  return max;                             // après la boucle
}
Math.max(...players.map(p => p.score));   // version courte : 30`,
    trap: "Un `return` **dans** la boucle arrête la fonction au premier tour qui passe la condition. Et `Math.max(...players)` donne `NaN` : ce sont des objets, pas des nombres." },
  { t: "Parcourir",
    p: ["Trois façons de parcourir, à ne pas confondre."],
    table: { head: ["Écriture", "Donne", "Sur ['a', 'b']"], rows: [
      ["`for (const x of t)`", "les valeurs", "'a', puis 'b'"],
      ["`for (const k in obj)`", "les clés (des chaînes)", "'0', puis '1'"],
      ["`Object.entries(obj)`", "des paires [clé, valeur]", "[['0', 'a'], ['1', 'b']]"] ] },
    keep: "`of` pour les valeurs d'un tableau, `in` pour les clés d'un objet." },
  { t: "Déstructurer et copier",
    p: ["La **déstructuration** sort des valeurs d'un objet ou d'un tableau dans des variables, en une ligne.",
        "Le spread `[...deck]` copie le tableau, mais **pas** les objets qu'il contient : la copie et l'original pointent vers les mêmes objets. C'est une copie superficielle."],
    code: `const { rank, suit } = card;        // deux variables
const [first, ...rest] = players;   // premier, puis le reste
[a, b] = [b, a];                    // échanger deux valeurs

const deck = [{ rank: 2 }];
const copy = [...deck];
copy[0].rank = 14;
deck[0].rank;   // 14 ! même objet`,
    trap: "Modifier un objet de la copie modifie aussi l'original." },
  { t: "Le jeu de cartes",
    p: ["Le TP 2 construit un paquet de 52 cartes avec **deux boucles imbriquées** : 4 couleurs × 13 rangs.",
        "Une **fonction de comparaison** renvoie un nombre négatif si a est plus petit, 0 si égal, positif si a est plus grand. C'est ce qu'attend `toSorted`.",
        "Le mélange de **Fisher–Yates** parcourt le tableau depuis la fin et échange chaque case avec une case au hasard située avant elle (ou elle-même)."],
    code: `function buildBaseDeck() {
  const deck = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) deck.push({ rank, suit });
  }
  return deck;
}

const compareRank = (a, b) => a.rank - b.rank;
compareRank({ rank: 14 }, { rank: 11 });   // 3 : la première est plus forte

function shuffleInPlace(t) {
  for (let i = t.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));   // 0 à i
    [t[i], t[j]] = [t[j], t[i]];
  }
}`,
    keep: "Comparaison : négatif = a avant b, positif = a après b." }
],
"pw-dom": [
  { t: "Le DOM, c'est quoi ?",
    p: ["Quand le navigateur lit le HTML, il construit un **arbre d'objets** : le DOM (Document Object Model). Chaque balise devient un élément que JavaScript peut lire et modifier.",
        "Quand JavaScript modifie le DOM, la page affichée change immédiatement, sans rechargement."],
    flow: ["Fichier HTML", "Le navigateur le lit", "Arbre DOM", "JavaScript le modifie", "La page change"],
    keep: "Un `<script type=\"module\">` s'exécute après la lecture du HTML : le DOM est prêt." },
  { t: "Sélectionner des éléments",
    p: ["`querySelector` renvoie le **premier** élément qui correspond au sélecteur CSS, ou `null` s'il n'y en a aucun.",
        "`querySelectorAll` renvoie **tous** les éléments, dans une NodeList. Une NodeList a `forEach`, mais pas `map` ni `filter` : pour ça, on la transforme en tableau.",
        "On peut chercher dans un élément précis plutôt que dans toute la page."],
    code: `const deck = document.querySelector('.deck');
deck.querySelectorAll('.heart');               // seulement dans le paquet
[...deck.querySelectorAll('playing-card')];    // un vrai tableau
document.getElementById('hand');               // sans le #`,
    trap: "`querySelector` renvoie `null` si rien ne correspond : `null.classList` provoque une erreur. Et `querySelectorAll(...).map` n'existe pas." },
  { t: "Les sélecteurs CSS",
    p: ["Le TP 3 en demande six. La différence entre **espace**, **virgule** et **collé** est la source d'erreur la plus fréquente."],
    table: { head: ["Sélecteur", "Signifie", "Résultat dans le TP"], rows: [
      ["`#SPADE-ACE`", "l'élément avec cet id", "1 carte"],
      ["`.heart`", "les éléments avec cette classe", "13 cartes"],
      ["`.heart, .diamond`", "virgule : l'un **ou** l'autre", "26 cartes"],
      ["`[data-face-card]`", "les éléments qui ont cet attribut", "12 figures"],
      ["`.heart[data-face-card]`", "collé : les deux **sur le même** élément", "3 figures de cœur"],
      ["`.heart [data-face-card]`", "espace : le second **à l'intérieur** du premier", "0 (les spans n'ont pas l'attribut)"],
      ["`playing-card:not(.spade)`", "toutes sauf les piques", "39 cartes"] ] },
    keep: "Virgule = ou. Collé = et. Espace = à l'intérieur de." },
  { t: "Modifier un élément",
    p: ["**Classes** : `classList` permet d'ajouter, retirer, basculer ou tester une classe.",
        "**Texte** : `textContent` insère du texte brut. `innerHTML` interprète le HTML : à éviter avec ce que l'utilisateur tape.",
        "**Attributs** : `setAttribute`, `getAttribute`, `removeAttribute`. Les attributs `data-…` se lisent aussi avec `dataset`, en transformant les tirets en majuscules."],
    code: `card.classList.add('selected');
card.classList.remove('selected');
card.classList.toggle('selected');     // ajoute ou retire
card.classList.contains('selected');   // true / false

el.textContent = '<b>Salut</b>';   // affiche le texte tel quel
el.innerHTML = '<b>Salut</b>';     // affiche Salut en gras

card.removeAttribute('id');
card.dataset.faceCard;   // lit data-face-card
section.dataset.tier;    // lit data-tier`,
    trap: "`data-face-card` → `dataset.faceCard`, pas `dataset['face-card']`." },
  { t: "Se déplacer et insérer",
    p: ["Depuis un élément, on peut remonter vers ses parents, descendre vers ses enfants, ou passer à ses voisins. `closest` remonte jusqu'au premier ancêtre qui correspond au sélecteur (en commençant par l'élément lui-même).",
        "Pour insérer : `append` à la fin, `prepend` au début, `before` et `after` à côté. `replaceChildren` remplace tout le contenu."],
    code: `el.parentElement;            // le parent
el.children;                 // les enfants
el.previousElementSibling;   // le voisin d'avant (null si premier)
el.nextElementSibling;       // le voisin d'après (null si dernier)
el.closest('.tier');         // l'ancêtre .tier le plus proche

hand.append(card);           // à la fin
hand.prepend(card);          // au début
hand.replaceChildren(...cards);   // vide puis remplit
hand.replaceChildren();      // vide
card.remove();               // supprime`,
    keep: "Toujours tester un voisin avant de l'utiliser : il peut valoir `null`." }
],
"pw-clones": [
  { t: "Copier un élément : cloneNode",
    p: ["`cloneNode(true)` crée une copie **profonde** : l'élément et tout son contenu. `cloneNode()` sans argument ne copie que la balise et ses attributs, **sans les enfants**.",
        "Le clone garde l'`id` de l'original. Deux éléments avec le même id dans une page, c'est une erreur : on le retire.",
        "Un clone n'est pas dans la page tant qu'on ne l'a pas inséré."],
    code: `const clone = card.cloneNode(true);   // avec les <span>
clone.removeAttribute('id');
clone.classList.remove('selected');
hand.append(clone);                    // maintenant visible

card.cloneNode();   // <playing-card> vide, sans les spans`,
    trap: "Oublier `true` donne une carte vide." },
  { t: "Un élément n'est qu'à un seul endroit",
    p: ["Si on fait `append` d'un élément **déjà présent** dans la page, il est **déplacé**, pas copié. Il quitte son ancien parent.",
        "C'est pratique pour la tier list (déplacer une carte d'une catégorie à l'autre), mais pour tirer une main sans vider le paquet, il faut cloner d'abord."],
    flow: ["Carte dans .deck", "hand.append(carte)", "Carte dans #hand", ".deck a une carte de moins"],
    keep: "Pour copier : `cloneNode(true)` puis `append`. Pour déplacer : `append` directement." },
  { t: "Les templates",
    p: ["La balise `<template>` contient du HTML qui n'est **pas affiché** et qui **ne fait pas partie du DOM** de la page. On y accède par sa propriété `content`.",
        "La méthode : récupérer le modèle **une seule fois** au démarrage, puis le cloner à chaque fois qu'on veut créer un élément. On ne modifie jamais le modèle lui-même."],
    code: `<template id="item-template">
  <article class="item"><span class="name"></span> …</article>
</template>

const tmplItem = document
  .querySelector('#item-template')
  .content.querySelector('article.item');

function createItem(name) {
  const item = tmplItem.cloneNode(true);
  item.querySelector('.name').textContent = name;
  return item;
}`,
    trap: "`document.querySelector('#item-template .item')` renvoie `null` : il faut passer par `.content`." },
  { t: "Exemple complet : tirer une main",
    p: ["Le TP 3 demande de tirer 5 cartes au hasard sans toucher au paquet. On copie le tableau des cartes, on mélange la copie, on prend les 5 premières, on les clone, puis on remplace le contenu de la main."],
    code: `const deckCards = [...document.querySelectorAll('.deck playing-card')];

document.querySelector('#draw-hand').addEventListener('click', () => {
  const copy = [...deckCards];          // ne pas mélanger l'original
  shuffleInPlace(copy);
  const handCards = copy.slice(0, 5).map(card => {
    const clone = card.cloneNode(true);
    clone.removeAttribute('id');
    clone.classList.remove('selected');
    return clone;
  });
  document.querySelector('#hand').replaceChildren(...handCards);
});`,
    keep: "Copier → mélanger → couper → cloner → insérer." }
],
"pw-events": [
  { t: "Écouter un événement",
    p: ["Un événement, c'est quelque chose qui se passe sur la page : un clic, l'envoi d'un formulaire. On s'y abonne avec `addEventListener`.",
        "La fonction reçoit un objet `event` qui décrit ce qui s'est passé. À l'Eval 1, seuls `click` et `submit` sont au programme."],
    code: `button.addEventListener('click', event => {
  console.log('cliqué !', event.target);
});`,
    keep: "`addEventListener('click', fonction)` : la fonction s'exécute à chaque clic." },
  { t: "Les formulaires : submit",
    p: ["L'événement `submit` se déclenche **sur le formulaire**, que l'utilisateur clique sur le bouton d'envoi ou appuie sur **Entrée** dans un champ. On écoute donc `submit`, pas `click`.",
        "Par défaut, un formulaire envoie ses données et **recharge la page**. `event.preventDefault()` annule ce comportement."],
    code: `form.addEventListener('submit', event => {
  event.preventDefault();                 // pas de rechargement
  const input = form.querySelector('input');
  const name = input.value.trim();       // enlever les espaces
  if (name === '') return;
  // … créer la carte …
  form.reset();                           // vider le champ
});`,
    trap: "Sans `preventDefault`, la page se recharge et tout ce que le JavaScript a ajouté disparaît." },
  { t: "La propagation",
    p: ["Quand on clique sur un élément, l'événement ne reste pas sur lui : il **remonte** vers son parent, puis le parent du parent, jusqu'au document. On appelle ça la propagation (bubbling).",
        "Dans l'écouteur, `event.target` est l'élément **réellement cliqué**. `event.currentTarget` est l'élément **qui porte l'écouteur**."],
    flow: ["<span>▲</span>", "<button>", "<section class=\"tier\">", "#tiers", "document"],
    table: { head: ["Clic sur le span, écouteur sur #tiers", "Vaut"], rows: [
      ["`event.target`", "le `<span>`"], ["`event.currentTarget`", "`#tiers`"] ] },
    keep: "L'événement monte de l'élément cliqué vers ses ancêtres." },
  { t: "La délégation",
    p: ["Au lieu de mettre un écouteur sur chaque bouton, on en met **un seul sur un parent commun**. Grâce à la propagation, il reçoit tous les clics.",
        "Dans cet écouteur, `closest` retrouve le bouton concerné, même si on a cliqué sur un `<span>` à l'intérieur. Si le clic n'était pas sur un bouton, `closest` renvoie `null` et on ignore.",
        "Gros avantage : ça marche aussi pour les éléments **ajoutés plus tard**, puisque l'écouteur est sur le parent."],
    code: `document.querySelector('#tiers').addEventListener('click', event => {
  const btn = event.target.closest('button[data-action]');
  if (!btn) return;                         // clic ailleurs
  const card = btn.closest('.item');
  if (btn.dataset.action === 'delete' && confirm('Supprimer ?')) {
    card.remove();
  }
});`,
    trap: "Une boucle `forEach` qui ajoute un écouteur à chaque bouton ne couvre pas les cartes créées ensuite." },
  { t: "Exemple complet : monter une carte",
    p: ["Dans la tier list, le bouton ▲ déplace la carte dans la catégorie du dessus. On lit la catégorie actuelle dans `data-tier`, on cherche sa position dans la liste, puis on déplace la carte avec `append`."],
    code: `const TIERS = ['S', 'A', 'B', 'C', 'D'];

function moveUp(card) {
  const tier = card.closest('.tier').dataset.tier;   // ex. 'B'
  const i = TIERS.indexOf(tier);                     // 2
  if (i === 0) return;                               // déjà en S
  const target = document.querySelector(
    \`.tier[data-tier="\${TIERS[i - 1]}"] .items\`      // la section A
  );
  target.append(card);                               // déplacement
}`,
    keep: "`dataset` pour lire, `indexOf` pour situer, `append` pour déplacer." }
],

"ps-php": [
  { t: "Client et serveur",
    p: ["Une application web est découpée en deux. Le **client**, c'est le navigateur : il affiche la page. Le **serveur** reçoit les requêtes, exécute le code PHP, lit la base de données si besoin, et renvoie le résultat.",
        "Le navigateur ne comprend pas le PHP. Il ne reçoit **jamais** le code PHP, seulement ce qu'il produit : du HTML, du CSS, du JavaScript."],
    flow: ["Navigateur", "Requête HTTP", "Serveur web (Apache, Nginx)", "Interpréteur PHP ↔ base de données", "HTML renvoyé"],
    keep: "PHP s'exécute sur le serveur. Le navigateur ne voit que le HTML produit. L'hébergement utilisé en cours est Infomaniak." },
  { t: "Syntaxe de base",
    p: ["Les variables commencent par `$`. On colle deux chaînes avec le **point** `.`.",
        "Entre **guillemets doubles**, PHP remplace les variables par leur valeur. Entre **guillemets simples**, il écrit le texte tel quel.",
        "Une **constante** ne peut pas changer. On l'écrit en majuscules, sans `$`."],
    code: `$nom = 'Ada';
echo 'Bonjour ' . $nom;    // Bonjour Ada
echo "Bonjour $nom";       // Bonjour Ada
echo 'Bonjour $nom';       // Bonjour $nom

define('PI', 3.14159);
const EULER = 2.71828;
echo PI;                   // sans $`,
    trap: "`'Salut $nom'` avec des guillemets simples affiche littéralement « $nom »." },
  { t: "Tableaux",
    p: ["Un tableau **indexé** range les valeurs par position (0, 1, 2…). Un tableau **associatif** les range sous des noms, comme un objet en JavaScript.",
        "On parcourt avec `foreach`. Avec `$cle => $valeur`, on récupère aussi le nom."],
    code: `$fruits = ['pomme', 'poire'];
echo $fruits[0];                       // pomme

$personne = ['nom' => 'Ada', 'age' => 36];
echo $personne['nom'];                 // Ada

foreach ($personne as $cle => $valeur) {
    echo "$cle : $valeur<br>";
}
count($personne);                      // 2`,
    keep: "`foreach ($t as $cle => $valeur)` pour un tableau associatif." },
  { t: "Fonctions typées",
    p: ["On peut indiquer le **type** des paramètres et de la valeur renvoyée. PHP vérifie alors les appels et provoque une erreur si le type ne correspond pas.",
        "Un paramètre peut avoir une **valeur par défaut**, utilisée quand on ne le donne pas."],
    code: `function add(int $a, int $b): int {
    return $a + $b;
}
add(2, 3);          // 5
add(2, 'Hello');    // erreur de type

function greet(string $name = 'World'): string {
    return "Hello, $name!";
}
greet();            // Hello, World!
greet('Alice');     // Hello, Alice!`,
    keep: "Types de base : `int`, `float`, `string`, `bool`, `array`." },
  { t: "Recevoir un formulaire",
    p: ["Les données d'un formulaire arrivent dans des **superglobales** : des tableaux associatifs disponibles partout. `$_GET` contient les paramètres de l'URL, `$_POST` le contenu d'un formulaire envoyé en POST.",
        "Un champ peut manquer : on utilise `??` pour donner une valeur par défaut, ou `isset` pour tester."],
    code: `// <form method="post"> … <input name="email"> …
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
}

$page = $_GET['page'] ?? 'accueil';   // page.php?page=contact
isset($_GET['page']);                 // existe et n'est pas null ?`,
    keep: "`method=\"post\"` → `$_POST`. Paramètre dans l'URL → `$_GET`." }
],
"ps-poo": [
  { t: "Pourquoi la POO ?",
    p: ["La programmation orientée objet est une façon d'organiser le code. On regroupe dans une **classe** les données (les **attributs**) et les comportements (les **méthodes**) d'une même chose : un animal, un utilisateur, un livre.",
        "Le cours demande de connaître ses avantages et ses désavantages."],
    table: { head: ["Avantages", "Désavantages"], rows: [
      ["**Lisibilité** : le code ressemble aux objets du monde réel", "**Complexité** : plus lourd pour une petite application"],
      ["**Réutilisabilité** : une classe sert à plusieurs endroits", "**Performance** : un peu moins rapide (souvent négligeable)"],
      ["**Maintenabilité** : un changement à un seul endroit", ""] ] },
    keep: "Concepts clés : classe, objet, attribut, méthode, encapsulation, constructeur, destructeur, héritage, interface, classe abstraite." },
  { t: "Classe, objet, constructeur",
    p: ["Une **classe** est un plan. Un **objet** (une instance) est une chose construite à partir de ce plan, avec `new`.",
        "Le **constructeur** `__construct` s'exécute à la création de l'objet, pour remplir ses attributs. `$this` désigne l'objet en cours.",
        "Le **destructeur** `__destruct` s'exécute quand l'objet disparaît : à la fin du script, ou quand plus aucune variable ne le référence."],
    code: `class Pet {
    private string $name;
    private int $age;

    public function __construct(string $name, int $age) {
        $this->name = $name;
        $this->age = $age;
    }
    public function __destruct() {
        echo "{$this->name} est détruit";
    }
    public function describe(): string {
        return "{$this->name}, {$this->age} ans";
    }
}

$rex = new Pet('Rex', 4);
echo $rex->describe();   // Rex, 4 ans
$rex = null;             // le destructeur s'exécute ici`,
    keep: "`new` crée l'objet, `__construct` l'initialise, `->` accède à ses membres." },
  { t: "Encapsulation et visibilité",
    p: ["L'**encapsulation** consiste à protéger les attributs : on les met en `private`, et on donne accès par des méthodes publiques (**getters** et **setters**). La classe garde le contrôle de ses données."],
    table: { head: ["Mot-clé", "Accessible depuis"], rows: [
      ["`public`", "partout"], ["`protected`", "la classe et ses sous-classes"], ["`private`", "la classe uniquement"] ] },
    code: `class Pet {
    private string $name;
    public function getName(): string { return $this->name; }
    public function setName(string $name): void {
        if ($name !== '') $this->name = $name;   // contrôle
    }
}
$rex->name;        // erreur : attribut privé
$rex->getName();   // OK`,
    trap: "Accéder à un attribut `private` depuis l'extérieur provoque une erreur fatale." },
  { t: "static et constantes",
    p: ["Un attribut ou une méthode `static` appartient à la **classe**, pas à un objet. Il est partagé par toutes les instances.",
        "Pour un objet, on utilise la flèche `->`. Pour la classe (statique et constantes), on utilise `::`. À l'intérieur de la classe, `self::` désigne la classe elle-même."],
    code: `class Pet {
    public const SPECIES = 'inconnue';
    private static int $count = 0;

    public function __construct() { self::$count++; }
    public static function getCount(): int { return self::$count; }
}
new Pet(); new Pet(); new Pet();
echo Pet::getCount();   // 3
echo Pet::SPECIES;      // inconnue`,
    keep: "Objet → `->`. Classe → `::`." },
  { t: "Héritage, classes abstraites, interfaces",
    p: ["**Héritage** : `class Dog extends Pet` récupère tout ce que Pet a de public et protégé. Dog peut **redéfinir** une méthode, et appeler la version du parent avec `parent::`.",
        "**Classe abstraite** : un modèle incomplet qu'on ne peut pas instancier. Ses méthodes abstraites doivent être écrites par les sous-classes.",
        "**Interface** : un contrat, une liste de méthodes que la classe s'engage à fournir.",
        "Limites : en PHP, une classe n'hérite que d'**une seule** classe, mais peut implémenter **plusieurs** interfaces. Il faut éviter les hiérarchies trop profondes."],
    code: `interface Describable { public function describe(): string; }

abstract class Animal implements Describable {
    public function __construct(protected string $name) {}
    abstract public function speak(): string;
    public function describe(): string { return $this->name; }
}

class Dog extends Animal {
    public function speak(): string { return 'Wouf'; }
    public function describe(): string {
        return parent::describe() . ' (chien)';
    }
}
new Animal('x');   // erreur : classe abstraite`,
    keep: "`extends` : une seule classe. `implements` : plusieurs interfaces. Dans le cours, une classe par fichier dans `src/`." }
],
"ps-pdo": [
  { t: "Se connecter avec PDO",
    p: ["PDO est la façon de parler à une base de données en PHP. On crée un objet PDO avec une chaîne de connexion (le **DSN**), un nom d'utilisateur et un mot de passe.",
        "Dans le cours, ces paramètres sont rangés dans un **fichier de configuration** `config/database.ini`, lu avec `parse_ini_file`. On peut ainsi changer de base (local, puis Infomaniak) sans toucher au code, et les mots de passe ne sont pas écrits dans le code."],
    code: `; config/database.ini
host = localhost
port = 3306
database = app
username = app_user
password = secret

<?php
$config = parse_ini_file(__DIR__ . '/../config/database.ini');
$dsn = "mysql:host={$config['host']};port={$config['port']};dbname={$config['database']};charset=utf8mb4";
$pdo = new PDO($dsn, $config['username'], $config['password']);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);`,
    keep: "`ERRMODE_EXCEPTION` : une erreur SQL lance une exception au lieu d'échouer en silence." },
  { t: "Les requêtes préparées",
    p: ["On n'écrit **jamais** une valeur venant de l'utilisateur directement dans le SQL. On prépare la requête avec des **marqueurs** (`:email`), puis on envoie les valeurs à part. La base ne peut pas confondre une valeur avec du SQL.",
        "Après l'exécution, `fetch` récupère une ligne et `fetchAll` toutes les lignes."],
    flow: ["prepare('… WHERE email = :email')", "execute(['email' => $email])", "fetch() ou fetchAll()"],
    code: `$stmt = $pdo->prepare('SELECT * FROM users WHERE email = :email');
$stmt->execute(['email' => $email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);   // un tableau, ou false
$all = $stmt->fetchAll();                  // un tableau (vide si rien)

$stmt = $pdo->prepare('INSERT INTO users (email) VALUES (:email)');
$stmt->execute(['email' => $email]);
$id = $pdo->lastInsertId();                // l'id créé`,
    trap: "`fetch()` renvoie **false** quand il n'y a pas de résultat, pas null." },
  { t: "Le SQL à connaître",
    p: ["Les quatre opérations de base, souvent appelées CRUD : créer, lire, modifier, supprimer."],
    table: { head: ["Opération", "SQL"], rows: [
      ["Créer", "`INSERT INTO users (email, name) VALUES ('a@b.ch', 'Ada')`"],
      ["Lire", "`SELECT * FROM users WHERE id = 3`"],
      ["Modifier", "`UPDATE users SET email = 'x@y.ch' WHERE id = 3`"],
      ["Supprimer", "`DELETE FROM users WHERE id = 3`"] ] },
    p2: "Contraintes de table : `PRIMARY KEY`, `AUTO_INCREMENT`, `UNIQUE`, `NOT NULL`, `FOREIGN KEY`.",
    trap: "Sans `WHERE`, `UPDATE` et `DELETE` touchent **toutes** les lignes." },
  { t: "Les exceptions : try / catch",
    p: ["Une exception est comme un **signal d'alarme** : quand quelque chose tourne mal, le code « lance » une exception. Si personne ne l'attrape, le script **s'arrête**.",
        "Avec `try / catch`, on essaie un bloc de code et on attrape l'erreur pour réagir proprement, par exemple afficher un message."],
    code: `try {
    $pdo = new PDO($dsn, $username, $password);
} catch (PDOException $e) {
    echo 'Connexion impossible : ' . $e->getMessage();
    exit();
}

if (!$config) {
    throw new Exception('Fichier de configuration illisible');
}`,
    keep: "`throw` lance, `try / catch` attrape, `getMessage()` donne le texte." },
  { t: "Formulaires : valider et garder la saisie",
    p: ["La **validation côté serveur** est obligatoire : on remplit un tableau `$errors`, une condition par règle. La validation côté client (`required`, `type=\"email\"`, `minlength`) n'est qu'un confort, car elle se contourne.",
        "Si le formulaire contient une erreur, on **réaffiche ce que l'utilisateur avait tapé**, pour qu'il n'ait pas tout à refaire."],
    code: `<input name="first-name"
       value="<?= htmlspecialchars($firstName ?? '') ?>"
       required minlength="2">`,
    keep: "`?? ''` évite l'erreur si la variable n'existe pas, `htmlspecialchars` évite le XSS." },
  { t: "Déployer",
    p: ["En local, on développe avec une base MariaDB (avec Docker et phpMyAdmin). En production, on met l'application chez l'hébergeur, **Infomaniak** dans le cours, qui fournit sa propre base MariaDB.",
        "Seul le **fichier de configuration** change entre les deux. C'est aussi pour ça qu'il ne doit pas être publié sur GitHub : il contient les mots de passe."],
    flow: ["Local : PHP + MariaDB", "Copier les fichiers chez Infomaniak", "Créer la base et l'utilisateur", "Adapter database.ini"],
    keep: "Identifiants de la base : dans un fichier de configuration, jamais dans le code publié." }
],
"ps-include": [
  { t: "Pourquoi découper l'interface ?",
    p: ["Toutes les pages d'un site partagent des morceaux : le `<head>`, l'en-tête, le pied de page. Plutôt que de les copier dans chaque page, on les met dans des fichiers à part, des **composants**, qu'on inclut.",
        "Résultat : une modification se fait **à un seul endroit**, et elle s'applique à toutes les pages."],
    code: `<!DOCTYPE html>
<html>
<?php require __DIR__ . '/components/head.php'; ?>
<body>
    <?php require __DIR__ . '/components/header.php'; ?>
    <main>…</main>
    <?php require __DIR__ . '/components/footer.php'; ?>
</body>
</html>`,
    keep: "`__DIR__` est le dossier du fichier courant : les chemins restent justes." },
  { t: "include, require et _once",
    p: ["Quatre instructions, deux différences : que se passe-t-il si le fichier **manque**, et peut-on l'inclure **plusieurs fois** ?"],
    table: { head: ["Instruction", "Si le fichier manque", "Plusieurs fois ?", "Usage dans le cours"], rows: [
      ["`include`", "avertissement, le script continue", "oui", "rare"],
      ["`require`", "erreur fatale, le script s'arrête", "oui", "les parties d'interface"],
      ["`include_once`", "avertissement", "une seule fois", "rare"],
      ["`require_once`", "erreur fatale", "une seule fois", "fonctions, constantes, classes"] ] },
    trap: "Inclure deux fois un fichier qui déclare une classe ou une fonction provoque une erreur : d'où `require_once`." },
  { t: "Composants avec des variables",
    p: ["Un fichier inclus **voit les variables** de la page qui l'inclut. On peut donc définir `$title` dans la page, puis l'utiliser dans `head.php`.",
        "On échappe toujours ce qu'on affiche avec `htmlspecialchars`, même si la valeur vient de notre code : c'est une habitude contre le XSS."],
    code: `<?php // index.php
$title = 'Mes animaux';
require __DIR__ . '/components/head.php';

<?php // components/head.php
<head>
    <title><?= htmlspecialchars($title ?? 'ninetendogs') ?></title>
</head>`,
    trap: "Le `??` va **à l'intérieur** : `htmlspecialchars($title) ?? 'x'` n'utilise jamais la valeur par défaut, car `htmlspecialchars` ne renvoie jamais null." },
  { t: "Passer les valeurs explicitement",
    p: ["Le défaut des variables partagées : rien n'indique **quelles variables** un composant attend, et une faute de frappe passe en silence.",
        "La solution du cours : une fonction `render` qui reçoit le nom du composant et un tableau de valeurs. `extract` transforme chaque clé du tableau en variable, juste pour le composant."],
    code: `function render(string $component, array $data = []): void {
    $componentPath = __DIR__ . '/../components/' . $component . '.php';
    extract($data, EXTR_SKIP);   // ['title' => …] devient $title
    require $componentPath;
}

render('head', ['title' => 'Mes animaux']);`,
    keep: "Avec `render`, les valeurs dont le composant a besoin sont visibles dans l'appel." }
],
"ps-securite": [
  { t: "Ne jamais faire confiance au client",
    p: ["Tout ce qui vient du navigateur peut être modifié par l'utilisateur : les champs de formulaire, l'URL, les cookies. Même un champ caché ou une liste déroulante.",
        "La règle : on **vérifie tout côté serveur**. La validation HTML (`required`, `type=\"email\"`) est un confort pour l'utilisateur, pas une protection : on peut la retirer dans l'inspecteur."],
    keep: "`$_GET`, `$_POST` et `$_COOKIE` peuvent contenir n'importe quoi. Seul `$_SESSION` reste sur le serveur." },
  { t: "Valider ou nettoyer ?",
    p: ["Deux notions différentes, à savoir définir."],
    table: { head: ["", "Valider", "Nettoyer"], rows: [
      ["Ce que c'est", "vérifier que la saisie respecte des règles", "supprimer ou échapper les caractères dangereux"],
      ["Si ça ne va pas", "on rejette, avec un message d'erreur", "on transforme la valeur"],
      ["Exemples", "`filter_var($email, FILTER_VALIDATE_EMAIL)`, longueur, `is_numeric`", "`trim`, `htmlspecialchars`"] ] },
    code: `$errors = [];
$name = trim($_POST['name'] ?? '');
if ($name === '' || strlen($name) > 50) $errors[] = 'Nom requis (50 max).';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Email invalide.';`,
    keep: "`filter_var` renvoie la valeur si elle est valide, sinon false." },
  { t: "L'injection SQL",
    p: ["Si on colle la saisie de l'utilisateur dans une requête SQL, il peut taper du SQL qui **change le sens** de la requête.",
        "La protection est toujours la même : les **requêtes préparées**."],
    code: `// DANGEREUX
$sql = "SELECT * FROM users WHERE email = '$email'";
// l'utilisateur tape :  ' OR '1'='1
// la requête devient : … WHERE email = '' OR '1'='1'  → toujours vrai

// PROTÉGÉ
$stmt = $pdo->prepare('SELECT * FROM users WHERE email = :email');
$stmt->execute(['email' => $email]);`,
    trap: "`htmlspecialchars` ne protège **pas** contre l'injection SQL." },
  { t: "Le XSS",
    p: ["Le **XSS** (cross-site scripting) : un utilisateur écrit du HTML ou du JavaScript, par exemple dans un commentaire, et ce code s'exécute chez **les autres visiteurs** quand la page l'affiche.",
        "Protection : `htmlspecialchars` au moment de **l'affichage**. Il remplace les caractères spéciaux par des **entités** : le navigateur les affiche comme du texte au lieu de les exécuter."],
    table: { head: ["Caractère", "Devient"], rows: [
      ["`<`", "`&lt;`"], ["`>`", "`&gt;`"], ["`&`", "`&amp;`"], ["`\"`", "`&quot;`"], ["`'`", "`&apos;`"] ] },
    code: `<p><?= htmlspecialchars($comment) ?></p>
// <script>alert(1)<\/script>  s'affiche comme du texte`,
    keep: "Base de données → requêtes préparées. Affichage → `htmlspecialchars`." }
],
"ps-cookies": [
  { t: "HTTP ne se souvient de rien",
    p: ["HTTP est un protocole **sans état** (stateless) : chaque requête est traitée seule, le serveur ne se souvient pas de la précédente. Sans aide, il ne saurait pas que c'est vous qui revenez sur la page suivante.",
        "Les **cookies** et les **sessions** servent à combler ce manque."],
    prof: "HTTP, c'est stateless." },
  { t: "Comment fonctionne un cookie",
    p: ["Un cookie est un petit texte que le serveur demande au navigateur de **garder**. Ensuite, le navigateur le **renvoie automatiquement** à chaque requête vers le même site.",
        "Il est stocké **chez le client** : l'utilisateur peut donc le lire et le modifier."],
    flow: ["Serveur : en-tête Set-Cookie", "Navigateur : garde le cookie", "Requête suivante : en-tête Cookie", "PHP : $_COOKIE"],
    prof: "Un cookie fait environ 4 Ko, soit 4 096 octets. Un entier de 16 bits prend 2 octets : on peut donc stocker environ 2 000 entiers.",
    keep: "Usages : langue, thème, panier, identifiant de session. Jamais de donnée sensible." },
  { t: "Créer, lire, supprimer",
    p: ["`setcookie(nom, valeur, expiration, chemin)`. L'**expiration** est une date absolue, exprimée en secondes depuis 1970 : on part donc de `time()` et on ajoute une durée.",
        "`setcookie` envoie un en-tête HTTP : il doit être appelé **avant tout affichage**. Le cookie n'apparaît dans `$_COOKIE` qu'à la **requête suivante**."],
    prof: "`time()` renvoie le nombre de secondes écoulées depuis le 1er janvier 1970 (et pas 1990).",
    code: `// créer : valable 30 jours, sur tout le site
setcookie('language', 'fr', time() + (30 * 24 * 60 * 60), '/');

// lire
if (isset($_COOKIE['language'])) {
    echo htmlspecialchars($_COOKIE['language']);
}

// supprimer : une date passée
setcookie('language', '', time() - 3600, '/');`,
    trap: "`setcookie('x', 'v', 7 * 24 * 3600)` sans `time()` correspond au 8 janvier 1970 : le cookie est déjà expiré." },
  { t: "Types et options",
    p: ["Un cookie **de session** n'a pas d'expiration : il disparaît à la fermeture du navigateur. Un cookie **persistant** reste jusqu'à sa date d'expiration."],
    table: { head: ["Option", "Effet"], rows: [
      ["expiration", "date de fin (0 = cookie de session)"],
      ["chemin `'/'`", "valable sur tout le site"],
      ["`Secure`", "envoyé seulement en HTTPS"],
      ["`HttpOnly`", "inaccessible au JavaScript de la page"] ] },
    keep: "Le client peut modifier ses cookies : on vérifie toujours la valeur lue." },
  { t: "Plusieurs langues avec un cookie",
    p: ["Dans le cours, les traductions sont rangées dans un tableau `$translations`, avec une clé par langue. La langue choisie est gardée dans un cookie.",
        "Comme le cookie peut contenir n'importe quoi, on vérifie avec `array_key_exists` que la langue existe, sinon on garde la langue par défaut."],
    code: `$translations = [
    'en' => ['welcome' => 'Welcome'],
    'fr' => ['welcome' => 'Bienvenue'],
];
const DEFAULT_LANGUAGE = 'en';

$language = DEFAULT_LANGUAGE;
if (isset($_COOKIE['language'])
    && array_key_exists($_COOKIE['language'], $translations)) {
    $language = $_COOKIE['language'];
}
echo $translations[$language]['welcome'];`,
    keep: "Langue inconnue ou absente → langue par défaut." }
],
"ps-sessions": [
  { t: "Qu'est-ce qu'une session ?",
    p: ["Une session permet au serveur de **reconnaître un visiteur** d'une page à l'autre et de garder des informations sur lui : son identité, son rôle, son panier.",
        "Les données sont stockées **sur le serveur**. Le navigateur ne garde qu'un **identifiant de session**, dans un cookie (`PHPSESSID`), qu'il renvoie à chaque requête."],
    flow: ["session_start()", "Le serveur crée un fichier de session", "Le navigateur reçoit l'identifiant (cookie)", "Requêtes suivantes : PHP retrouve $_SESSION"],
    prof: "Une session est un rapport privilégié entre le client et le serveur. Les variables de session, stockées sur le serveur, contiennent des informations qui nous concernent. Les superglobales sont des tableaux associatifs : `$_GET`, `$_POST`, `$_COOKIE`, `$_SESSION`." },
  { t: "Utiliser une session",
    p: ["`session_start()` se place au **début de chaque page** qui utilise la session, avant tout affichage. Sans lui, `$_SESSION` n'est pas chargé.",
        "La session **expire** après une période d'inactivité : **24 minutes** par défaut en PHP. Le cours déconseille d'allonger cette durée."],
    code: `session_start();
$_SESSION['user_id'] = 123;                   // écrire
$name = $_SESSION['username'] ?? 'Invité';    // lire

// déconnexion
session_start();     // il faut d'abord démarrer la session
session_destroy();`,
    trap: "Oublier `session_start()` : l'utilisateur semble déconnecté sur cette page." },
  { t: "Sessions ou cookies ?",
    p: ["Les quatre différences du cours, à connaître par cœur."],
    table: { head: ["", "Session", "Cookie"], rows: [
      ["Stockage", "sur le serveur", "dans le navigateur"],
      ["Sécurité", "le client ne peut pas modifier les données", "peut être volé ou modifié"],
      ["Taille", "grande", "environ 4 Ko"],
      ["Durée de vie", "courte (24 min d'inactivité)", "jusqu'à l'expiration ou la fermeture du navigateur"] ] },
    keep: "Cookie → préférences non sensibles (langue). Session → informations sensibles (connexion, rôle)." },
  { t: "Authentification et autorisation",
    p: ["**Authentification** : vérifier **qui** est l'utilisateur (la connexion avec un identifiant et un mot de passe).",
        "**Autorisation** : vérifier **ce qu'il a le droit** de faire (par exemple, seul un admin peut ouvrir la page d'administration).",
        "Pas connecté → on le redirige vers la connexion. Connecté mais pas le droit → on refuse avec le code **403**. Dans les deux cas, `exit()` juste après, sinon la suite de la page s'exécute quand même."],
    code: `session_start();
if (!isset($_SESSION['user_id'])) {      // authentification
    header('Location: login.php');
    exit();
}
if ($_SESSION['role'] !== 'admin') {     // autorisation
    http_response_code(403);
    exit();
}`,
    trap: "`header('Location: …')` sans `exit()` : le contenu secret est quand même envoyé." },
  { t: "Stocker les mots de passe",
    p: ["On ne stocke **jamais** un mot de passe en clair. On stocke son **hash** : une chaîne de longueur fixe, calculée à partir du mot de passe, qu'on **ne peut pas inverser**.",
        "À la connexion, `password_verify` compare le mot de passe tapé au hash stocké."],
    code: `// inscription
$hash = password_hash($password, PASSWORD_DEFAULT);
// on enregistre $hash dans la base

// connexion
if ($user && password_verify($password, $user['password'])) {
    $_SESSION['user_id'] = $user['id'];
    header('Location: index.php');
    exit();
}`,
    keep: "Hacher n'est pas chiffrer : un hash ne se déchiffre pas." }
]
};

/* ---------- Exemples animés, pas à pas ----------
   line : ligne(s) surlignée(s) · note : explication · vars : variables · groups : boîtes (tableaux, DOM, navigateur/serveur)
   items : texte, ou {v, c} avec c = hl (en cours) | keep (gardé) | drop (écarté) | new (nouveau) · out : résultat affiché */
const ANIMS = [
{ ch: "pw-bases", lesson: "Les fonctions sont des valeurs", title: "repeatTransform(2, double, 3), tour par tour",
  code: `const double = n => n * 2;
function repeatTransform(n, fn, times) {
  let result = n;
  for (let i = 0; i < times; i++) {
    result = fn(result);
  }
  return result;
}
repeatTransform(2, double, 3);`,
  steps: [
    { line: 9, note: "On appelle la fonction avec n = 2, fn = double et times = 3.", vars: { n: "2", fn: "double", times: "3" } },
    { line: 3, note: "result part de la valeur de n.", vars: { result: "2" } },
    { line: [4, 5], note: "Tour i = 0 : result = double(2).", vars: { i: "0", result: "4" } },
    { line: [4, 5], note: "Tour i = 1 : result = double(4).", vars: { i: "1", result: "8" } },
    { line: [4, 5], note: "Tour i = 2 : result = double(8).", vars: { i: "2", result: "16" } },
    { line: 4, note: "i vaut 3 : la condition i < 3 est fausse, la boucle s'arrête.", vars: { i: "3", result: "16" } },
    { line: 7, note: "On renvoie result.", vars: { result: "16" }, out: "16" }
  ] },
{ ch: "pw-bases", lesson: "Les closures", title: "Deux compteurs, deux mémoires",
  code: `function makeCounter() {
  let c = 0;
  return () => ++c;
}
const a = makeCounter();
const b = makeCounter();
a();
a();
b();
console.log(a(), b());`,
  steps: [
    { line: 5, note: "Premier appel : une variable c est créée et vaut 0. La fonction retournée est rangée dans a, et elle garde l'accès à ce c.", groups: [{ label: "Mémoire de a", items: [{ v: "c = 0", c: "new" }] }] },
    { line: 6, note: "Deuxième appel : un nouveau c est créé, complètement séparé du premier.", groups: [{ label: "Mémoire de a", items: ["c = 0"] }, { label: "Mémoire de b", items: [{ v: "c = 0", c: "new" }] }] },
    { line: 7, note: "a() augmente le c de a.", groups: [{ label: "Mémoire de a", items: [{ v: "c = 1", c: "hl" }] }, { label: "Mémoire de b", items: ["c = 0"] }] },
    { line: 8, note: "Encore une fois.", groups: [{ label: "Mémoire de a", items: [{ v: "c = 2", c: "hl" }] }, { label: "Mémoire de b", items: ["c = 0"] }] },
    { line: 9, note: "b() augmente seulement le c de b.", groups: [{ label: "Mémoire de a", items: ["c = 2"] }, { label: "Mémoire de b", items: [{ v: "c = 1", c: "hl" }] }] },
    { line: 10, note: "a() passe à 3, b() passe à 2.", groups: [{ label: "Mémoire de a", items: [{ v: "c = 3", c: "hl" }] }, { label: "Mémoire de b", items: [{ v: "c = 2", c: "hl" }] }], out: "3 2" }
  ] },
{ ch: "pw-tableaux", lesson: "map et filter", title: "filter, puis map, élément par élément",
  code: `const numbers = [4, 7, 10, 3];
const big = numbers.filter(n => n > 5);
const result = big.map(n => n * 2);`,
  steps: [
    { line: 1, note: "Le tableau de départ.", groups: [{ label: "numbers", items: ["4", "7", "10", "3"] }] },
    { line: 2, note: "filter regarde 4 : 4 > 5 ? Non, il n'est pas gardé.", groups: [{ label: "numbers", items: [{ v: "4", c: "drop" }, "7", "10", "3"] }, { label: "big", items: [] }] },
    { line: 2, note: "7 > 5 ? Oui, il est copié dans le nouveau tableau.", groups: [{ label: "numbers", items: [{ v: "4", c: "drop" }, { v: "7", c: "keep" }, "10", "3"] }, { label: "big", items: [{ v: "7", c: "new" }] }] },
    { line: 2, note: "10 > 5 ? Oui.", groups: [{ label: "numbers", items: [{ v: "4", c: "drop" }, { v: "7", c: "keep" }, { v: "10", c: "keep" }, "3"] }, { label: "big", items: ["7", { v: "10", c: "new" }] }] },
    { line: 2, note: "3 > 5 ? Non. filter a fini : big contient 2 éléments.", groups: [{ label: "numbers", items: [{ v: "4", c: "drop" }, { v: "7", c: "keep" }, { v: "10", c: "keep" }, { v: "3", c: "drop" }] }, { label: "big", items: ["7", "10"] }] },
    { line: 3, note: "map applique n * 2 au premier élément de big.", groups: [{ label: "big", items: [{ v: "7", c: "hl" }, "10"] }, { label: "result", items: [{ v: "14", c: "new" }] }] },
    { line: 3, note: "Puis au deuxième. map garde la même longueur : 2 éléments.", groups: [{ label: "big", items: ["7", { v: "10", c: "hl" }] }, { label: "result", items: ["14", { v: "20", c: "new" }] }] },
    { line: 3, note: "numbers n'a pas changé : filter et map créent de nouveaux tableaux.", groups: [{ label: "numbers", items: ["4", "7", "10", "3"] }, { label: "result", items: ["14", "20"] }], out: "[14, 20]" }
  ] },
{ ch: "pw-tableaux", lesson: "reduce : tout réduire à une valeur", title: "reduce, avec l'accumulateur",
  code: `const total = [1, 2, 3, 4].reduce(
  (acc, n) => acc + n * 2,
  0
);`,
  steps: [
    { line: 3, note: "L'accumulateur part de la valeur de départ : 0.", vars: { acc: "0" }, groups: [{ label: "tableau", items: ["1", "2", "3", "4"] }] },
    { line: 2, note: "Tour 1 : acc + 1 × 2.", vars: { acc: "0 → 2", n: "1" }, groups: [{ label: "tableau", items: [{ v: "1", c: "hl" }, "2", "3", "4"] }] },
    { line: 2, note: "Tour 2 : le nouvel acc est transmis au tour suivant.", vars: { acc: "2 → 6", n: "2" }, groups: [{ label: "tableau", items: ["1", { v: "2", c: "hl" }, "3", "4"] }] },
    { line: 2, note: "Tour 3.", vars: { acc: "6 → 12", n: "3" }, groups: [{ label: "tableau", items: ["1", "2", { v: "3", c: "hl" }, "4"] }] },
    { line: 2, note: "Tour 4.", vars: { acc: "12 → 20", n: "4" }, groups: [{ label: "tableau", items: ["1", "2", "3", { v: "4", c: "hl" }] }] },
    { line: 1, note: "Plus d'éléments : reduce renvoie le dernier acc.", vars: { total: "20" }, out: "20" }
  ] },
{ ch: "pw-objets", lesson: "Tableaux d'objets", title: "Le piège : return dans la boucle",
  code: `function getMax(players) {
  let max = players[0].score;
  for (const p of players) {
    if (p.score > max) return p.score;
  }
  return max;
}
getMax(players);   // scores : 12, 20, 25`,
  steps: [
    { line: 8, note: "Les scores sont 12, 20 et 25. La bonne réponse serait 25.", groups: [{ label: "players (scores)", items: ["12", "20", "25"] }] },
    { line: 2, note: "max part du premier score.", vars: { max: "12" }, groups: [{ label: "players (scores)", items: [{ v: "12", c: "hl" }, "20", "25"] }] },
    { line: [3, 4], note: "p = 12 : 12 > 12 ? Non, on continue.", vars: { max: "12", "p.score": "12" }, groups: [{ label: "players (scores)", items: [{ v: "12", c: "hl" }, "20", "25"] }] },
    { line: [3, 4], note: "p = 20 : 20 > 12 ? Oui… et return arrête toute la fonction.", vars: { max: "12", "p.score": "20" }, groups: [{ label: "players (scores)", items: ["12", { v: "20", c: "hl" }, "25"] }] },
    { line: 4, note: "Résultat : 20. Le 25 n'a jamais été regardé.", groups: [{ label: "players (scores)", items: ["12", { v: "20", c: "keep" }, { v: "25", c: "drop" }] }], out: "20 (faux)" }
  ] },
{ ch: "pw-objets", lesson: "Tableaux d'objets", title: "La bonne version : mettre à jour, puis renvoyer",
  code: `function getMax(players) {
  let max = players[0].score;
  for (const p of players) {
    if (p.score > max) max = p.score;
  }
  return max;
}
getMax(players);   // scores : 12, 20, 25`,
  steps: [
    { line: 2, note: "max part du premier score.", vars: { max: "12" }, groups: [{ label: "players (scores)", items: [{ v: "12", c: "hl" }, "20", "25"] }] },
    { line: [3, 4], note: "p = 12 : pas plus grand.", vars: { max: "12", "p.score": "12" }, groups: [{ label: "players (scores)", items: [{ v: "12", c: "hl" }, "20", "25"] }] },
    { line: [3, 4], note: "p = 20 : plus grand, on met à jour max et on continue.", vars: { max: "20", "p.score": "20" }, groups: [{ label: "players (scores)", items: ["12", { v: "20", c: "hl" }, "25"] }] },
    { line: [3, 4], note: "p = 25 : plus grand, on met à jour.", vars: { max: "25", "p.score": "25" }, groups: [{ label: "players (scores)", items: ["12", "20", { v: "25", c: "hl" }] }] },
    { line: 6, note: "La boucle est finie : on renvoie max.", vars: { max: "25" }, out: "25" }
  ] },
{ ch: "pw-dom", lesson: "Modifier un élément", title: "Sélectionner, puis modifier les classes",
  code: `const deck = document.querySelector('.deck');
const hearts = deck.querySelectorAll('.heart');
hearts.forEach(card => card.classList.add('selected'));
deck.querySelector('#SPADE-ACE').classList.toggle('selected');`,
  steps: [
    { line: 1, note: "querySelector renvoie le premier élément .deck : le paquet.", groups: [{ label: ".deck", items: ["♥2", "♥3", "♠A", "♦K", "♥Q"] }] },
    { line: 2, note: "querySelectorAll renvoie toutes les cartes avec la classe heart, dans une NodeList.", groups: [{ label: ".deck", items: [{ v: "♥2", c: "hl" }, { v: "♥3", c: "hl" }, "♠A", "♦K", { v: "♥Q", c: "hl" }] }], vars: { "hearts.length": "3" } },
    { line: 3, note: "forEach ajoute la classe selected à chaque cœur. La page change tout de suite.", groups: [{ label: ".deck", items: [{ v: "♥2 selected", c: "keep" }, { v: "♥3 selected", c: "keep" }, "♠A", "♦K", { v: "♥Q selected", c: "keep" }] }] },
    { line: 4, note: "toggle ajoute la classe si elle est absente (et la retirerait si elle était là).", groups: [{ label: ".deck", items: ["♥2 selected", "♥3 selected", { v: "♠A selected", c: "new" }, "♦K", "♥Q selected"] }] }
  ] },
{ ch: "pw-clones", lesson: "Un élément n'est qu'à un seul endroit", title: "Cloner ou déplacer",
  code: `const card = deck.querySelector('#HEART-2');
hand.append(card.cloneNode(true));
hand.append(card);`,
  steps: [
    { line: 1, note: "On récupère la carte ♥2 du paquet.", groups: [{ label: ".deck", items: [{ v: "♥2", c: "hl" }, "♠A", "♦K"] }, { label: "#hand", items: [] }] },
    { line: 2, note: "cloneNode(true) crée une copie. append la met dans la main. Le paquet ne change pas.", groups: [{ label: ".deck", items: ["♥2", "♠A", "♦K"] }, { label: "#hand", items: [{ v: "♥2 (copie)", c: "new" }] }] },
    { line: 3, note: "append de la carte d'origine : elle est déplacée. Le paquet la perd.", groups: [{ label: ".deck", items: ["♠A", "♦K"] }, { label: "#hand", items: ["♥2 (copie)", { v: "♥2", c: "new" }] }] }
  ] },
{ ch: "pw-events", lesson: "La propagation", title: "Un clic remonte jusqu'à l'écouteur",
  code: `tiers.addEventListener('click', event => {
  const btn = event.target.closest('button[data-action]');
  if (!btn) return;
  const card = btn.closest('.item');
  if (btn.dataset.action === 'delete') card.remove();
});`,
  steps: [
    { line: [], note: "L'utilisateur clique sur l'icône ✕, qui est un <span> dans le bouton.", groups: [{ label: "Chemin de l'événement", items: [{ v: "<span>✕</span>", c: "hl" }, "<button data-action=\"delete\">", "<article class=\"item\">", "<section class=\"tier\">", "#tiers"] }] },
    { line: [], note: "Le span n'a pas d'écouteur : l'événement remonte vers le bouton…", groups: [{ label: "Chemin de l'événement", items: ["<span>✕</span>", { v: "<button data-action=\"delete\">", c: "hl" }, "<article class=\"item\">", "<section class=\"tier\">", "#tiers"] }] },
    { line: [], note: "…puis vers la carte et la section, qui n'ont pas d'écouteur non plus…", groups: [{ label: "Chemin de l'événement", items: ["<span>✕</span>", "<button data-action=\"delete\">", { v: "<article class=\"item\">", c: "hl" }, { v: "<section class=\"tier\">", c: "hl" }, "#tiers"] }] },
    { line: 1, note: "…jusqu'à #tiers, qui a l'écouteur : la fonction s'exécute.", vars: { "event.target": "<span>", "event.currentTarget": "#tiers" }, groups: [{ label: "Chemin de l'événement", items: ["<span>✕</span>", "<button data-action=\"delete\">", "<article class=\"item\">", "<section class=\"tier\">", { v: "#tiers (écouteur)", c: "keep" }] }] },
    { line: 2, note: "closest part du span et remonte jusqu'au premier bouton avec data-action.", vars: { btn: "<button data-action=\"delete\">" } },
    { line: 3, note: "btn n'est pas null : on continue.", vars: { btn: "<button …>" } },
    { line: 4, note: "On remonte encore jusqu'à la carte.", vars: { btn: "<button …>", card: "<article class=\"item\">" } },
    { line: 5, note: "L'action est delete : la carte est retirée de la page.", groups: [{ label: "#tiers", items: [{ v: "carte supprimée", c: "drop" }] }] }
  ] },
{ ch: "pw-events", lesson: "Les formulaires : submit", title: "Entrée dans le champ : que se passe-t-il ?",
  code: `form.addEventListener('submit', event => {
  event.preventDefault();
  const name = form.querySelector('input').value.trim();
  if (name === '') return;
  list.append(createItem(name));
  form.reset();
});`,
  steps: [
    { line: [], note: "L'utilisateur tape « Mario » puis appuie sur Entrée. Ça déclenche submit sur le formulaire, comme le bouton.", groups: [{ label: "Champ", items: ["  Mario "] }, { label: "Liste", items: ["Luigi"] }] },
    { line: 2, note: "On annule l'envoi : la page ne se recharge pas.", groups: [{ label: "Page", items: [{ v: "pas de rechargement", c: "keep" }] }] },
    { line: 3, note: "On lit la valeur et on retire les espaces autour.", vars: { name: "'Mario'" } },
    { line: 4, note: "Le nom n'est pas vide : on continue." },
    { line: 5, note: "On crée la carte à partir du modèle et on l'ajoute à la fin.", groups: [{ label: "Liste", items: ["Luigi", { v: "Mario", c: "new" }] }] },
    { line: 6, note: "On vide le formulaire pour la saisie suivante.", groups: [{ label: "Champ", items: [""] }, { label: "Liste", items: ["Luigi", "Mario"] }] }
  ] },

{ ch: "ps-php", lesson: "Client et serveur", title: "Le trajet d'une requête",
  code: `<?php
$nom = $_GET['nom'] ?? 'inconnu';
?>
<p>Bonjour <?= htmlspecialchars($nom) ?></p>`,
  steps: [
    { line: [], note: "Le navigateur demande la page page.php?nom=Ada au serveur.", groups: [{ label: "Navigateur", items: [{ v: "GET page.php?nom=Ada", c: "hl" }] }, { label: "Serveur", items: [] }] },
    { line: 2, note: "Le serveur web passe le fichier à l'interpréteur PHP. Le paramètre de l'URL est dans $_GET.", vars: { "$_GET['nom']": "'Ada'", "$nom": "'Ada'" }, groups: [{ label: "Navigateur", items: ["en attente…"] }, { label: "Serveur", items: [{ v: "PHP exécute page.php", c: "hl" }] }] },
    { line: 4, note: "PHP remplace la balise <?= ?> par la valeur. Le résultat est du HTML pur.", groups: [{ label: "Serveur", items: [{ v: "<p>Bonjour Ada</p>", c: "new" }] }] },
    { line: [], note: "Le navigateur reçoit uniquement le HTML. Il ne voit jamais le code PHP.", groups: [{ label: "Navigateur", items: [{ v: "<p>Bonjour Ada</p>", c: "keep" }] }, { label: "Serveur", items: ["terminé"] }], out: "Bonjour Ada" }
  ] },
{ ch: "ps-poo", lesson: "static et constantes", title: "Objets et compteur statique",
  code: `class Pet {
    public static int $count = 0;
    public function __construct(public string $name) {
        self::$count++;
    }
}
$a = new Pet('Rex');
$b = new Pet('Ayo');
echo Pet::$count;`,
  steps: [
    { line: 2, note: "Le compteur appartient à la classe : il n'existe qu'une fois, avant même le premier objet.", groups: [{ label: "Classe Pet (partagé)", items: ["$count = 0"] }, { label: "Objets en mémoire", items: [] }] },
    { line: 7, note: "new crée un objet. Le constructeur reçoit 'Rex'.", groups: [{ label: "Classe Pet (partagé)", items: ["$count = 0"] }, { label: "Objets en mémoire", items: [{ v: "$a : name = Rex", c: "new" }] }] },
    { line: 4, note: "self::$count++ augmente le compteur de la classe.", groups: [{ label: "Classe Pet (partagé)", items: [{ v: "$count = 1", c: "hl" }] }, { label: "Objets en mémoire", items: ["$a : name = Rex"] }] },
    { line: [8, 4], note: "Deuxième objet, avec son propre name. Le compteur, lui, est le même.", groups: [{ label: "Classe Pet (partagé)", items: [{ v: "$count = 2", c: "hl" }] }, { label: "Objets en mémoire", items: ["$a : name = Rex", { v: "$b : name = Ayo", c: "new" }] }] },
    { line: 9, note: "On lit le statique avec :: sur la classe.", out: "2" }
  ] },
{ ch: "ps-pdo", lesson: "Les requêtes préparées", title: "prepare, execute, fetch",
  code: `$stmt = $pdo->prepare('SELECT * FROM users WHERE email = :email');
$stmt->execute(['email' => 'ada@heig.ch']);
$user = $stmt->fetch(PDO::FETCH_ASSOC);`,
  steps: [
    { line: 1, note: "prepare envoie à la base la requête avec un trou nommé :email. Aucune valeur pour l'instant.", groups: [{ label: "PHP", items: ["requête avec :email"] }, { label: "Base de données", items: [{ v: "SELECT … WHERE email = ?", c: "new" }] }] },
    { line: 2, note: "execute envoie la valeur à part. La base la traite comme une simple donnée, jamais comme du SQL.", groups: [{ label: "PHP", items: [{ v: "'ada@heig.ch'", c: "hl" }] }, { label: "Base de données", items: ["SELECT … WHERE email = ?", { v: "valeur : 'ada@heig.ch'", c: "new" }] }] },
    { line: 3, note: "fetch récupère la première ligne trouvée, en tableau associatif.", vars: { "$user['id']": "3", "$user['email']": "'ada@heig.ch'" } },
    { line: 3, note: "S'il n'y avait aucun résultat, fetch aurait renvoyé false.", vars: { "$user (si rien)": "false" } }
  ] },
{ ch: "ps-include", lesson: "Composants avec des variables", title: "Ce que fait require, concrètement",
  code: `// index.php
$title = 'Mes animaux';
require __DIR__ . '/components/head.php';

// components/head.php
<title><?= htmlspecialchars($title ?? 'ninetendogs') ?></title>`,
  steps: [
    { line: 2, note: "La page définit la variable $title.", vars: { "$title": "'Mes animaux'" } },
    { line: 3, note: "require colle le contenu de head.php à cet endroit, comme si on l'avait écrit dans index.php.", groups: [{ label: "index.php exécuté", items: ["$title = …", { v: "contenu de head.php", c: "new" }] }] },
    { line: 6, note: "head.php voit donc $title. Elle existe : le ?? n'est pas utilisé.", vars: { "$title": "'Mes animaux'" }, out: "<title>Mes animaux</title>" },
    { line: 6, note: "Sur une page qui n'a pas défini $title, le ?? prend le relais.", vars: { "$title": "non défini" }, out: "<title>ninetendogs</title>" }
  ] },
{ ch: "ps-securite", lesson: "L'injection SQL", title: "Comment la requête est détournée",
  code: `$email = $_POST['email'];
$sql = "SELECT * FROM users WHERE email = '$email'";
$result = $pdo->query($sql);`,
  steps: [
    { line: 1, note: "Au lieu d'un email, l'utilisateur tape un morceau de SQL.", vars: { "$email": "' OR '1'='1" } },
    { line: 2, note: "PHP colle la saisie dans la chaîne. Les apostrophes de l'utilisateur ferment et rouvrent les guillemets du SQL.", vars: { "$sql": "SELECT * FROM users WHERE email = '' OR '1'='1'" } },
    { line: 2, note: "La condition devient « email vide OU 1 égale 1 ». La deuxième partie est toujours vraie.", groups: [{ label: "WHERE", items: [{ v: "email = ''", c: "drop" }, "OR", { v: "'1'='1' → toujours vrai", c: "hl" }] }] },
    { line: 3, note: "La base renvoie tous les utilisateurs. Avec une requête préparée, la saisie resterait une simple valeur.", groups: [{ label: "Résultat", items: [{ v: "Ada", c: "new" }, { v: "Linus", c: "new" }, { v: "Grace", c: "new" }, { v: "…", c: "new" }] }] }
  ] },
{ ch: "ps-securite", lesson: "Le XSS", title: "htmlspecialchars à l'affichage",
  code: `$comment = $_POST['comment'];
echo "<p>$comment</p>";                         // dangereux
echo '<p>' . htmlspecialchars($comment) . '</p>'; // protégé`,
  steps: [
    { line: 1, note: "Un visiteur poste un commentaire qui contient du JavaScript.", vars: { "$comment": "<script>alert(1)<\/script>" } },
    { line: 2, note: "Affiché tel quel, le navigateur des autres visiteurs voit une vraie balise <script> et l'exécute.", out: "une fenêtre « 1 » s'ouvre chez chaque visiteur", groups: [{ label: "Navigateur", items: [{ v: "exécute le script", c: "drop" }] }] },
    { line: 3, note: "htmlspecialchars remplace < et > par des entités.", vars: { "après": "&lt;script&gt;alert(1)&lt;/script&gt;" } },
    { line: 3, note: "Le navigateur affiche le texte au lieu de l'exécuter.", groups: [{ label: "Navigateur", items: [{ v: "affiche du texte", c: "keep" }] }], out: "<script>alert(1)<\/script>  (simple texte)" }
  ] },
{ ch: "ps-cookies", lesson: "Créer, lire, supprimer", title: "Un cookie sur deux visites",
  code: `<?php
if (isset($_COOKIE['language'])) {
    echo 'Langue : ' . $_COOKIE['language'];
} else {
    setcookie('language', 'fr', time() + 3600, '/');
    echo 'Pas encore de cookie';
}`,
  steps: [
    { line: [], note: "Première visite. Le navigateur n'a aucun cookie pour ce site : la requête n'en contient pas.", groups: [{ label: "Navigateur (cookies)", items: [] }, { label: "Requête", items: ["GET index.php"] }] },
    { line: 2, note: "$_COOKIE est vide : la condition est fausse.", vars: { "$_COOKIE": "[]" } },
    { line: 5, note: "setcookie ajoute un en-tête à la réponse. Le cookie n'est pas encore dans $_COOKIE.", groups: [{ label: "Réponse", items: [{ v: "Set-Cookie: language=fr", c: "new" }] }] },
    { line: 6, note: "La page s'affiche, puis le navigateur enregistre le cookie.", groups: [{ label: "Navigateur (cookies)", items: [{ v: "language = fr (1 h)", c: "new" }] }], out: "Pas encore de cookie" },
    { line: [], note: "Deuxième visite. Le navigateur renvoie automatiquement le cookie.", groups: [{ label: "Navigateur (cookies)", items: ["language = fr"] }, { label: "Requête", items: ["GET index.php", { v: "Cookie: language=fr", c: "new" }] }] },
    { line: [2, 3], note: "Cette fois, $_COOKIE contient la valeur.", vars: { "$_COOKIE['language']": "'fr'" }, out: "Langue : fr" }
  ] },
{ ch: "ps-sessions", lesson: "Qu'est-ce qu'une session ?", title: "Une session sur deux visites",
  code: `session_start();
if (!isset($_SESSION['user_id'])) {
    $_SESSION['user_id'] = 42;   // après une connexion réussie
    echo 'Connecté';
} else {
    echo 'Re-bonjour, utilisateur ' . $_SESSION['user_id'];
}`,
  steps: [
    { line: [], note: "Première visite : le navigateur n'a pas d'identifiant de session.", groups: [{ label: "Navigateur", items: [] }, { label: "Serveur (fichiers de session)", items: [] }] },
    { line: 1, note: "session_start crée une session vide sur le serveur et envoie son identifiant au navigateur, dans un cookie.", groups: [{ label: "Navigateur", items: [{ v: "PHPSESSID = abc123", c: "new" }] }, { label: "Serveur (fichiers de session)", items: [{ v: "abc123 : { }", c: "new" }] }] },
    { line: [2, 3], note: "user_id n'existe pas : on l'enregistre. Il est écrit sur le serveur, pas dans le navigateur.", groups: [{ label: "Navigateur", items: ["PHPSESSID = abc123"] }, { label: "Serveur (fichiers de session)", items: [{ v: "abc123 : { user_id: 42 }", c: "hl" }] }] },
    { line: 4, note: "La page s'affiche.", out: "Connecté" },
    { line: [], note: "Deuxième visite : le navigateur renvoie seulement l'identifiant.", groups: [{ label: "Requête", items: [{ v: "Cookie: PHPSESSID=abc123", c: "hl" }] }, { label: "Serveur (fichiers de session)", items: ["abc123 : { user_id: 42 }"] }] },
    { line: 1, note: "session_start retrouve le fichier abc123 et remplit $_SESSION.", vars: { "$_SESSION['user_id']": "42" } },
    { line: [5, 6], note: "user_id existe : on reconnaît l'utilisateur. Le client n'a jamais eu le 42 entre les mains.", out: "Re-bonjour, utilisateur 42" }
  ] },
{ ch: "ps-sessions", lesson: "Authentification et autorisation", title: "Trois visiteurs sur admin.php",
  code: `session_start();
if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit();
}
if ($_SESSION['role'] !== 'admin') {
    http_response_code(403);
    exit();
}
echo 'Page d\\'administration';`,
  steps: [
    { line: [1, 2], note: "Visiteur 1 : pas connecté. Il n'y a pas de user_id en session.", vars: { "$_SESSION": "[]" } },
    { line: [3, 4], note: "On le redirige vers la connexion, et exit arrête tout de suite le script.", out: "redirection vers login.php" },
    { line: [2, 6], note: "Visiteur 2 : connecté (authentifié), mais son rôle est user.", vars: { "user_id": "7", "role": "'user'" } },
    { line: [7, 8], note: "Il n'est pas autorisé : réponse 403, puis exit.", out: "403 Forbidden" },
    { line: [2, 6, 10], note: "Visiteur 3 : connecté et admin. Les deux tests passent.", vars: { "user_id": "1", "role": "'admin'" }, out: "Page d'administration" }
  ] }
];
for (const A of ANIMS) {
  const L = (LESSONS[A.ch] || []).find(l => l.t === A.lesson);
  if (L) (L.anims = L.anims || []).push(A);
  else console.warn("Leçon introuvable pour l'animation", A.ch, A.lesson);
}

// Mini-jeux : une partie mélange 3 jeux longs et 7 jeux courts.
//
// Champs communs à tous les jeux :
//   title, type, text : le nom, l'étiquette et le but affiché en grand
//   rules  : les étapes, dans l'ordre (affichées en liste numérotée)
//   points : comment on marque
//   need   : ce qu'il faut prévoir (si besoin)
//
// Outils intégrés (facultatifs) :
//   timer    : chrono en secondes
//   canvas   : zone de dessin
//   tally    : compteur { label, start, max, perPlayer }
//   answers  : réponses écrites en secret { count: 1 ou 2, label, rows }
//   folded   : papier plié, une étape par joueur [{ label, example }]
//   tictactoe, hangman, nim : morpion, pendu, jeu du 21
//
// Jeux longs uniquement :
//   rounds : les étapes (mots, questions, lettres…)
//   count  : nombre d'étapes tirées au hasard dans rounds (sinon toutes, dans l'ordre)
//   sets   : plusieurs listes d'étapes, une seule est tirée au hasard
//   secret : l'étape est cachée, seul le joueur concerné la regarde
//   alternate : les joueurs jouent chacun leur tour à chaque étape
//   board  : liste affichée en permanence (les catégories du petit bac)
//   stepLabel : mot affiché devant le numéro d'étape

const TIMES_UP_WORDS = [
  ["Tour Eiffel", "Brosse à dents", "Licorne", "Pompier", "Tiramisu"],
  ["Astronaute", "Parapluie", "Crocodile", "Karaoké", "Croissant"],
  ["Père Noël", "Machine à laver", "Pingouin", "Mariage", "Volcan"],
  ["Superman", "Aspirateur", "Kangourou", "Pique-nique", "Glace à la vanille"],
  ["Pirate", "Trottinette", "Girafe", "Anniversaire", "Raclette"]
];

const MINI_LONG = [
  {
    title: "PICTIONARY DE COUPLE", type: "Dessin", text: "Dessine, l'autre devine !",
    rules: [
      "Le joueur indiqué appuie sur « Voir le mot » sans montrer l'écran.",
      "Il lance le chrono et dessine le mot dans la zone de dessin : pas de lettres, pas de chiffres, pas un mot.",
      "L'autre propose autant de réponses qu'il veut avant la fin du chrono.",
      "Étape suivante : on échange les rôles."
    ],
    points: "Mot trouvé à temps : 1 point pour chacun.",
    timer: 60, secret: true, alternate: true, canvas: true, count: 6, stepLabel: "Dessin",
    rounds: [
      "Notre premier rendez-vous", "Un petit-déjeuner au lit", "Une dispute pour la télécommande", "Voler la couette",
      "Un câlin sur le canapé", "Une demande en mariage", "Un voyage en avion", "Faire la vaisselle",
      "S'endormir devant un film", "Se perdre en voiture", "Un pique-nique", "Cuisiner à deux",
      "Une photo de vacances", "Danser dans le salon", "Un bisou sous la pluie", "Un ronflement",
      "Les courses du samedi", "Un cadeau raté", "Une soirée pyjama", "Un message d'amour",
      "Une valise trop pleine", "Une balade main dans la main", "Un plat brûlé", "Une sieste à deux"
    ]
  },
  {
    title: "DRAW MY LIFE", type: "Dessin", text: "Ta vie en 5 dessins, racontée à voix haute.",
    rules: [
      "Chaque étape est un moment de la vie. Le joueur indiqué lance le chrono et dessine son propre moment dans la zone de dessin.",
      "Pendant qu'il dessine, il raconte à voix haute ce qu'il dessine, comme dans les vidéos « Draw my life ».",
      "Étape suivante : l'autre dessine le même moment de sa vie à lui. Vous alternez ainsi jusqu'à la 5e étape.",
      "Celui qui écoute peut poser une question à la fin de chaque dessin."
    ],
    points: "Chacun a fini ses 5 dessins : 1 point pour chacun. Chaque anecdote que l'autre ne connaissait pas : 1 point bonus.",
    timer: 60, alternate: true, canvas: true, stepLabel: "Dessin",
    rounds: [
      "Étape 1 · Ta naissance et tes premières années", "Étape 1 · Ta naissance et tes premières années",
      "Étape 2 · Ton enfance et l'école", "Étape 2 · Ton enfance et l'école",
      "Étape 3 · Ton adolescence", "Étape 3 · Ton adolescence",
      "Étape 4 · Une rencontre qui a tout changé", "Étape 4 · Une rencontre qui a tout changé",
      "Étape 5 · Ta vie aujourd'hui… et tes rêves pour demain", "Étape 5 · Ta vie aujourd'hui… et tes rêves pour demain"
    ]
  },
  {
    title: "PETIT BAC DE COUPLE", type: "Rapidité", text: "Une lettre, sept catégories, une minute et demie.",
    rules: [
      "Pas fan des catégories ou de la lettre ? Changez-les avec les boutons 🎲.",
      "Le joueur indiqué lance le chrono et écrit, dans sa case, un mot par catégorie commençant par la lettre.",
      "À la sonnerie (ou avant), il cache ses réponses et passe le téléphone.",
      "L'autre relance le chrono et fait pareil.",
      "Révélez les réponses et comparez catégorie par catégorie."
    ],
    points: "Mot valable : 1 point. Mot valable que l'autre n'a pas trouvé : 2 points.",
    timer: 90, count: 3, stepLabel: "Lettre",
    answers: { count: 2, rows: 7, label: "Un mot par ligne, dans l'ordre des catégories" },
    rerollLabel: "🎲 Autre lettre",
    boardSize: 7,
    boardPool: [
      "Un plat que tu adores", "Un lieu où partir à deux", "Un film ou une série", "Un surnom ou un mot doux", "Une qualité de ton ou ta partenaire",
      "Une activité à faire à deux", "Un objet de la maison", "Un pays", "Une ville", "Un animal", "Un fruit ou un légume", "Un métier",
      "Un prénom", "Une marque", "Un chanteur ou une chanteuse", "Un sport", "Un vêtement", "Une couleur", "Un cadeau à offrir", "Un dessert",
      "Un personnage de dessin animé", "Une boisson", "Quelque chose qu'on trouve dans une salle de bain", "Un défaut", "Un moyen de transport",
      "Un instrument de musique", "Une célébrité", "Une émotion", "Quelque chose qu'on emporte en vacances", "Un endroit pour un rendez-vous"
    ],
    rounds: "ABCDEFGHIJLMNOPRSTV".split("").map(l => "Lettre " + l)
  },
  {
    title: "QUI DE NOUS DEUX ?", type: "Désignation", text: "Comptez jusqu'à trois et désignez-vous.",
    rules: [
      "Lisez la question à voix haute.",
      "Comptez « 1, 2, 3 » et pointez du doigt, en même temps, la personne qui correspond (vous ou l'autre).",
      "Pas d'accord ? Chacun a 10 secondes pour défendre son choix."
    ],
    points: "Même personne désignée : 1 point pour chacun.",
    count: 10, stepLabel: "Question",
    rounds: [
      "Qui de nous deux s'endort le premier ?", "Qui de nous deux met le plus de temps à se préparer ?", "Qui de nous deux dit pardon en premier ?",
      "Qui de nous deux dépense le plus ?", "Qui de nous deux est le plus têtu ?", "Qui de nous deux pleure devant les films ?",
      "Qui de nous deux oublie le plus de choses ?", "Qui de nous deux est le plus jaloux ?", "Qui de nous deux est le plus drôle ?",
      "Qui de nous deux cuisine le mieux ?", "Qui de nous deux a le plus mauvais sens de l'orientation ?", "Qui de nous deux prend le plus de place dans le lit ?",
      "Qui de nous deux est le plus romantique ?", "Qui de nous deux survivrait le plus longtemps sur une île déserte ?", "Qui de nous deux regarde le plus son téléphone ?",
      "Qui de nous deux fait le plus de bêtises ?", "Qui de nous deux est le plus maniaque ?", "Qui de nous deux a dit « je t'aime » en premier ?",
      "Qui de nous deux est le plus grognon le matin ?", "Qui de nous deux serait le meilleur parent d'un chat ?"
    ]
  },
  {
    title: "TU PRÉFÈRES ?", type: "Choix simultané", text: "Répondez en même temps, sans vous concerter.",
    rules: [
      "Lisez les deux choix à voix haute.",
      "Comptez « 1, 2, 3 » et dites votre choix en même temps.",
      "Réponses différentes ? Chacun explique son choix en une phrase."
    ],
    points: "Même réponse : 1 point pour chacun.",
    count: 8, stepLabel: "Choix",
    rounds: [
      "Tu préfères une soirée sur le canapé ou une soirée au restaurant ?", "Tu préfères la mer ou la montagne ?", "Tu préfères un petit-déjeuner au lit ou un dîner aux chandelles ?",
      "Tu préfères qu'on parte en vacances sans programme ou avec tout de réservé ?", "Tu préfères recevoir une lettre d'amour ou un cadeau surprise ?", "Tu préfères vivre à la campagne ou en ville ?",
      "Tu préfères te lever tôt ou te coucher tard ?", "Tu préfères un film d'amour ou un film d'action ?", "Tu préfères qu'on cuisine ensemble ou commander à manger ?",
      "Tu préfères un grand mariage ou une petite fête intime ?", "Tu préfères une semaine sans téléphone ou une semaine sans sucre ?", "Tu préfères un chien ou un chat à la maison ?",
      "Tu préfères fêter ton anniversaire à deux ou entouré(e) de tout le monde ?", "Tu préfères résoudre une dispute tout de suite ou le lendemain ?", "Tu préfères voyager loin une fois ou près plusieurs fois ?",
      "Tu préfères qu'on danse ou qu'on chante en karaoké ?"
    ]
  },
  {
    title: "LE QUIZ DE NOTRE COUPLE", type: "Mémoire", text: "Connaissez-vous vraiment votre histoire ?",
    rules: [
      "Lisez la question à voix haute.",
      "Chacun écrit sa réponse en secret dans l'application, puis la cache.",
      "Révélez les deux réponses et comparez."
    ],
    points: "Même réponse (ou presque) : 1 point pour chacun.",
    count: 8, stepLabel: "Question",
    answers: { count: 2, rows: 2, label: "Ta réponse" },
    rounds: [
      "Où a eu lieu notre premier rendez-vous ?", "Qui a envoyé le premier message ?", "Quelle est la date de notre rencontre ?",
      "Quel a été notre premier voyage ensemble ?", "Quel est notre restaurant préféré ?", "Quel film a-t-on regardé le plus souvent ?",
      "Quelle chanson nous représente le mieux ?", "Quelle a été notre première dispute, et pourquoi ?", "Quel cadeau a le plus compté entre nous ?",
      "Quel surnom utilise-t-on le plus ?", "Quel est notre meilleur souvenir de vacances ?", "Quelle est la plus grosse bêtise qu'on ait faite ensemble ?",
      "Quel plat cuisine-t-on le plus souvent ?", "Quel ami commun nous connaît le mieux ?", "Où aimerait-on vivre dans dix ans ?"
    ]
  },
  {
    title: "LE MOT SECRET", type: "Devinette", text: "Fais deviner le mot sans jamais le dire.",
    rules: [
      "Le joueur indiqué appuie sur « Voir le mot » sans montrer l'écran.",
      "Il lance le chrono et décrit le mot avec des phrases, sans le dire ni utiliser un mot de la même famille (« aimer » pour « amour », par exemple).",
      "Interdit de mimer, d'épeler ou de dire « ça commence par… »."
    ],
    points: "Mot trouvé à temps : 1 point pour chacun. Mot interdit prononcé : le mot est perdu.",
    timer: 45, secret: true, alternate: true, count: 6, stepLabel: "Mot",
    rounds: [
      "Tendresse", "Jalousie", "Couette", "Lune de miel", "Dispute", "Anniversaire", "Canapé", "Confiance",
      "Valise", "Câlin", "Surprise", "Belle-famille", "Bague", "Déménagement", "Rendez-vous", "Vaisselle",
      "Fou rire", "Pardon", "Souvenir", "Week-end"
    ]
  },
  {
    title: "LE MIME DU COUPLE", type: "Mime", text: "Pas un mot : mime la scène !",
    rules: [
      "Le joueur indiqué appuie sur « Voir le mot » sans montrer l'écran.",
      "Il lance le chrono et mime la scène, sans un mot ni un son.",
      "L'autre doit retrouver la scène dans les grandes lignes."
    ],
    points: "Scène trouvée à temps : 1 point pour chacun.",
    timer: 45, secret: true, alternate: true, count: 6, stepLabel: "Mime",
    rounds: [
      "Tu cherches tes clés en retard", "Tu fais semblant d'aimer un cadeau", "Tu essaies de ne pas réveiller l'autre", "Tu montes un meuble sans notice",
      "Tu danses seul(e) dans la cuisine", "Tu boudes après une dispute", "Tu demandes pardon avec des fleurs", "Tu goûtes un plat trop salé",
      "Tu vois une araignée dans la douche", "Tu prends un selfie de couple raté", "Tu refais ta valise pour la troisième fois", "Tu attends l'autre qui se prépare",
      "Tu te réveilles avec les cheveux en bataille", "Tu es perdu(e) mais tu refuses de demander ton chemin"
    ]
  },
  {
    title: "LE PORTRAIT CHINOIS", type: "Se connaître", text: "Si j'étais… qu'est-ce que je serais ?",
    rules: [
      "Le joueur indiqué lit la question, écrit sa réponse en secret dans l'application et la cache.",
      "L'autre a 3 essais, à voix haute, pour deviner la réponse.",
      "Révélez la réponse : le joueur explique son choix."
    ],
    points: "Réponse devinée en 3 essais maximum : 1 point pour celui qui a deviné.",
    alternate: true, count: 8, stepLabel: "Portrait",
    answers: { count: 1, rows: 1, label: "Ta réponse secrète" },
    rounds: [
      "Si j'étais un animal, lequel serais-je ?", "Si j'étais un plat, lequel serais-je ?", "Si j'étais une saison, laquelle serais-je ?", "Si j'étais une ville, laquelle serais-je ?",
      "Si j'étais une chanson, laquelle serais-je ?", "Si j'étais une couleur, laquelle serais-je ?", "Si j'étais un personnage de film, lequel serais-je ?", "Si j'étais un objet de la maison, lequel serais-je ?",
      "Si j'étais une odeur, laquelle serais-je ?", "Si j'étais un métier, lequel serais-je ?", "Si j'étais une boisson, laquelle serais-je ?", "Si j'étais un moment de la journée, lequel serais-je ?"
    ]
  },
  {
    title: "DEUX VÉRITÉS, UN MENSONGE", type: "Bluff", text: "Démasque le mensonge !",
    rules: [
      "Le joueur indiqué lance le chrono : il a 30 secondes pour préparer trois phrases sur le thème, deux vraies et une fausse.",
      "Il les dit à voix haute, sur le même ton, sans sourire.",
      "L'autre désigne celle qu'il pense fausse."
    ],
    points: "Mensonge trouvé : 1 point pour celui qui devine. Raté : 1 point pour le menteur.",
    timer: 30, alternate: true, count: 4, stepLabel: "Thème",
    rounds: ["Thème : ton enfance", "Thème : tes goûts", "Thème : tes voyages", "Thème : ton adolescence", "Thème : ta famille", "Thème : tes anciennes passions", "Thème : tes plus grosses bêtises", "Thème : ta vie à l'école"]
  },
  {
    title: "VINGT QUESTIONS", type: "Devinette", text: "Vingt questions pour trouver à quoi je pense.",
    rules: [
      "Le joueur indiqué pense à la chose demandée, sans rien dire.",
      "L'autre pose des questions auxquelles on ne peut répondre que par « oui » ou « non ».",
      "Ajoutez +1 au compteur à chaque question. Une proposition de réponse compte aussi comme une question."
    ],
    points: "Trouvé en 20 questions ou moins : 1 point pour celui qui devine. Sinon : 1 point pour celui qui pensait.",
    alternate: true, count: 2, stepLabel: "Tour",
    tally: { label: "Questions posées", max: 20 },
    rounds: [
      "Pense à un souvenir que nous avons en commun.", "Pense à une personne que nous connaissons tous les deux.", "Pense à un objet de notre maison.",
      "Pense à un animal.", "Pense à un film ou une série qu'on a vu ensemble.", "Pense à une célébrité.", "Pense à un endroit où nous sommes allés ensemble.",
      "Pense à un plat.", "Pense à un métier.", "Pense à un pays."
    ]
  },
  {
    title: "LE FILM DE NOTRE VIE", type: "Imagination", text: "Votre histoire arrive au cinéma !",
    rules: [
      "Lisez la question de la scène.",
      "Discutez et mettez-vous d'accord sur une seule réponse.",
      "Passez à la scène suivante, jusqu'au générique."
    ],
    points: "Arrivés au générique d'accord sur tout : 1 point pour chacun.",
    stepLabel: "Scène",
    rounds: [
      "Quel serait le titre du film de notre vie ?", "Ce serait une comédie, un film d'action ou un drame ?", "Quel acteur ou quelle actrice jouerait chacun de nous ?",
      "Quelle serait la scène de notre rencontre ?", "Quelle serait la scène la plus drôle ?", "Quel serait le pire moment, avant que tout s'arrange ?",
      "Quelle serait la musique du film ?", "Comment le film se terminerait-il ?"
    ]
  },
  {
    title: "NOS TOPS 5", type: "Comparaison", text: "Vos classements sont-ils les mêmes ?",
    rules: [
      "Le joueur indiqué lance le chrono et écrit son top 5 en secret, du n°1 au n°5, puis le cache.",
      "L'autre relance le chrono et fait pareil.",
      "Révélez et comparez vos listes."
    ],
    points: "Élément présent dans les deux listes : 1 point pour chacun. Même rang en plus : 1 point bonus.",
    timer: 60, count: 3, stepLabel: "Classement",
    answers: { count: 2, rows: 5, label: "1. …  2. …  3. …  4. …  5. …" },
    rounds: [
      "Top 5 de nos plus beaux moments", "Top 5 de nos plus gros fous rires", "Top 5 de nos endroits préférés", "Top 5 des plats qu'on aime manger ensemble",
      "Top 5 des voyages qu'on aimerait faire", "Top 5 de nos films ou séries à deux", "Top 5 des choses qu'on devrait faire plus souvent"
    ]
  },
  {
    title: "LE BLIND TEST FREDONNÉ", type: "Musique", text: "Fredonne, l'autre devine la chanson !",
    rules: [
      "Le joueur indiqué choisit en silence une chanson qui correspond à la consigne.",
      "Il lance le chrono et la fredonne (« lalala » ou bouche fermée), sans aucune parole.",
      "L'autre doit donner le titre ou l'artiste."
    ],
    points: "Chanson trouvée à temps : 1 point pour chacun.",
    timer: 30, alternate: true, count: 6, stepLabel: "Chanson",
    rounds: [
      "Une chanson qui te fait penser à nous", "Une chanson de ton adolescence", "Une chanson qu'on écoute en voiture", "Une chanson de dessin animé",
      "Une chanson que tu chantes sous la douche", "Une chanson que tu détestes mais que tu connais par cœur", "Une chanson pour danser en soirée", "Une chanson de notre première année ensemble"
    ]
  },
  {
    title: "L'INTERVIEW", type: "Se connaître", text: "Deux minutes pour tout savoir.",
    rules: [
      "Lancez le chrono.",
      "Le joueur indiqué pose à l'autre toutes les questions qu'il veut sur le thème. L'autre répond franchement.",
      "À la sonnerie, l'intervieweur résume ce qu'il a appris de nouveau."
    ],
    points: "Au moins une chose nouvelle apprise : 1 point pour l'intervieweur.",
    timer: 120, alternate: true, count: 3, stepLabel: "Interview",
    rounds: [
      "Interviewe l'autre sur son enfance.", "Interviewe l'autre sur ses rêves.", "Interviewe l'autre sur ses peurs.", "Interviewe l'autre sur sa vision de notre avenir.",
      "Interviewe l'autre sur son adolescence.", "Interviewe l'autre sur son travail ou ses études.", "Interviewe l'autre sur ses amis.",
      "Interviewe l'autre sur ses goûts en musique.", "Interviewe l'autre sur sa famille.", "Interviewe l'autre sur ses plus grandes fiertés."
    ]
  },

  // ——— NOUVEAUX : de vrais jeux de soirée, adaptés à deux ———
  {
    title: "TABOU", type: "Jeu de mots", text: "Fais deviner le mot… sans les mots interdits.",
    rules: [
      "Le joueur indiqué appuie sur « Voir le mot » sans montrer l'écran : il découvre le mot à faire deviner et 3 mots interdits.",
      "Il lance le chrono et décrit le mot sans prononcer ni le mot, ni les mots interdits, ni un mot de leur famille.",
      "Pas de mime, pas de « ça rime avec… », pas d'épellation."
    ],
    points: "Mot trouvé à temps : 1 point pour chacun. Mot interdit prononcé : le mot est perdu.",
    timer: 60, secret: true, alternate: true, count: 6, stepLabel: "Carte",
    rounds: [
      "AMOUR — interdits : cœur, aimer, couple", "VACANCES — interdits : été, plage, partir", "CAFÉ — interdits : boire, matin, tasse",
      "MARIAGE — interdits : bague, robe, fête", "CINÉMA — interdits : film, écran, salle", "PIZZA — interdits : Italie, fromage, four",
      "DOUCHE — interdits : eau, salle de bain, laver", "ANNIVERSAIRE — interdits : gâteau, bougie, âge", "RÉVEIL — interdits : matin, sonner, dormir",
      "CHAT — interdits : miauler, animal, souris", "NOËL — interdits : sapin, cadeau, décembre", "SMARTPHONE — interdits : téléphone, appeler, écran",
      "BISOU — interdits : lèvres, embrasser, joue", "VALISE — interdits : voyage, bagage, vêtements", "PARAPLUIE — interdits : pluie, ouvrir, mouillé",
      "CHOCOLAT — interdits : cacao, sucré, marron"
    ]
  },
  {
    title: "TIME'S UP À DEUX", type: "Mémoire", text: "Les mêmes mots, trois manches, de plus en plus dur.",
    rules: [
      "Le joueur indiqué appuie sur « Voir le mot » sans montrer l'écran, lance le chrono et fait deviner un maximum des 5 mots.",
      "Manche 1 : on parle librement. Manche 2 : un seul mot par carte. Manche 3 : mime uniquement.",
      "Ce sont les mêmes 5 mots aux trois manches : retenez bien les réponses !",
      "Le joueur qui fait deviner change à chaque manche."
    ],
    points: "Chaque mot trouvé à temps : 1 point pour chacun.",
    timer: 45, secret: true, alternate: true, stepLabel: "Manche",
    sets: TIMES_UP_WORDS.map(w => [
      "Parle librement : " + w.join(" · "),
      "Un seul mot par carte : " + w.join(" · "),
      "Mime uniquement : " + w.join(" · ")
    ])
  },
  {
    title: "LE PENDU", type: "Lettres", text: "Trouve le mot avant d'être pendu.",
    rules: [
      "Le joueur indiqué tape en secret un mot du thème, puis le cache.",
      "L'autre touche une lettre à la fois. Bonne lettre : elle s'affiche à sa place. Mauvaise lettre : un trait de plus au pendu.",
      "8 erreurs et le dessin est complet : c'est perdu."
    ],
    points: "Mot trouvé : 1 point pour celui qui devine. Pendu : 1 point pour celui qui a choisi le mot.",
    alternate: true, count: 2, stepLabel: "Mot", hangman: true,
    rounds: ["Thème : un pays", "Thème : un plat", "Thème : un animal", "Thème : un film ou une série", "Thème : un objet de la maison", "Thème : un métier", "Thème : une ville"]
  },
  {
    title: "LE MORPION", type: "Stratégie", text: "Trois signes alignés et c'est gagné.",
    rules: [
      "Le joueur indiqué joue les croix (X) et commence ; l'autre joue les ronds (O).",
      "À tour de rôle, touchez une case vide de la grille.",
      "Le premier qui aligne 3 signes (ligne, colonne ou diagonale) gagne la manche.",
      "Jouez 3 manches avec « Nouvelle manche » : celui qui commence change à chaque fois."
    ],
    points: "Celui qui gagne le plus de manches prend 1 point.",
    stepLabel: "Partie", tictactoe: true,
    rounds: ["Au meilleur des 3 manches !"]
  },
  {
    title: "JE PARS EN VOYAGE…", type: "Mémoire", text: "Répète toute la liste et ajoute un objet.",
    rules: [
      "Le joueur indiqué dit la phrase de départ et ajoute un objet.",
      "L'autre répète la phrase, tous les objets déjà cités dans l'ordre, et en ajoute un.",
      "Continuez à tour de rôle. Le premier qui oublie un objet ou se trompe d'ordre perd la manche."
    ],
    points: "Manche gagnée : 1 point.",
    alternate: true, count: 3, stepLabel: "Manche",
    rounds: [
      "« Je pars en vacances et dans ma valise, je mets… »", "« Je suis allé(e) au marché et j'ai acheté… »", "« Pour notre soirée parfaite, il nous faut… »",
      "« Dans notre future maison, il y aura… »", "« Pour survivre sur une île déserte, j'emporte… »"
    ]
  },
  {
    title: "LE JEU DES CATÉGORIES", type: "Rapidité", text: "Un mot chacun, sans hésiter ni répéter.",
    rules: [
      "Lisez la catégorie. Le joueur indiqué commence.",
      "À tour de rôle, citez un élément de la catégorie. Relancez le chrono de 5 secondes à chaque réponse.",
      "Silence à la sonnerie, réponse fausse ou déjà dite : manche perdue."
    ],
    points: "Manche gagnée : 1 point.",
    timer: 5, alternate: true, count: 4, stepLabel: "Catégorie",
    rounds: [
      "Des marques de voiture", "Des pays d'Europe", "Des fruits", "Des chanteurs ou chanteuses français", "Des dessins animés",
      "Des choses qu'on trouve dans une salle de bain", "Des plats italiens", "Des sports", "Des métiers", "Des villes de France", "Des choses rouges", "Des animaux de la ferme"
    ]
  },
  {
    title: "HEUREUSEMENT, MALHEUREUSEMENT", type: "Improvisation", text: "Une histoire qui ne cesse de basculer.",
    rules: [
      "Le joueur indiqué lit le début de l'histoire et ajoute une phrase qui commence par « Malheureusement… ».",
      "L'autre continue avec une phrase qui commence par « Heureusement… », puis on alterne.",
      "Relancez le chrono de 10 secondes à chaque phrase. Au bout de 10 phrases, l'histoire peut se terminer."
    ],
    points: "Celui qui sèche à la sonnerie perd : 1 point pour l'autre. Arrivés à 10 phrases : 1 point pour chacun.",
    timer: 10, alternate: true, count: 2, stepLabel: "Histoire",
    rounds: [
      "Ce matin, nous avons gagné un voyage à l'autre bout du monde.", "Nous avons décidé d'adopter un chien.", "Nous avons été invités au mariage d'une star.",
      "Notre voisin a frappé à la porte à minuit.", "Nous avons ouvert un restaurant.", "Nous sommes partis camper dans la forêt."
    ]
  },
  {
    title: "QUI SUIS-JE ?", type: "Devinette", text: "Devine le personnage avec des questions en oui / non.",
    rules: [
      "Le joueur indiqué doit deviner : il ferme les yeux. L'autre appuie sur « Voir le mot », retient le personnage, puis le cache.",
      "Lancez le chrono. Le devineur pose des questions fermées (« Je suis réel ? », « Je chante ? »…). L'autre répond seulement oui ou non.",
      "Il peut proposer un nom à tout moment."
    ],
    points: "Personnage trouvé avant la sonnerie : 1 point pour chacun.",
    timer: 120, secret: true, alternate: true, count: 4, stepLabel: "Personnage",
    rounds: [
      "Harry Potter", "Napoléon", "Shrek", "Marie Curie", "Zinédine Zidane", "Cendrillon", "Le père Noël", "Astérix",
      "Albert Einstein", "Spider-Man", "Mickey", "Céline Dion", "Pikachu", "Sherlock Holmes", "Cléopâtre", "Batman",
      "Dark Vador", "Louis XIV", "Mario", "Tintin"
    ]
  },
  {
    title: "LE BLUFF DU DICTIONNAIRE", type: "Bluff", text: "Vraie ou fausse définition ?",
    rules: [
      "Le joueur indiqué appuie sur « Voir le mot » sans montrer l'écran : il découvre un mot rare et sa vraie définition.",
      "Il invente une fausse définition crédible.",
      "Il lit le mot, puis les deux définitions, dans l'ordre qu'il veut.",
      "L'autre choisit celle qu'il pense vraie."
    ],
    points: "Vraie définition trouvée : 1 point pour celui qui devine. Raté : 1 point pour le bluffeur.",
    secret: true, alternate: true, count: 6, stepLabel: "Mot",
    rounds: [
      "CALLIPYGE : qui a de belles fesses", "BILLEVESÉE : une idée creuse, une sornette", "GALIMATIAS : un discours confus, incompréhensible",
      "CHAFOUIN : qui a l'air rusé et sournois", "BISBILLE : une petite dispute pour pas grand-chose", "PÉTRICHOR : l'odeur de la terre après la pluie",
      "NYCTHÉMÈRE : une durée de 24 heures, un jour et une nuit", "ATARAXIE : une tranquillité de l'âme absolue", "VESPÉRAL : qui a lieu le soir",
      "TURLUPINER : tracasser, tourmenter quelqu'un", "COQUECIGRUE : une chose absurde, une baliverne", "CACOCHYME : de santé fragile, souvent malade",
      "RIBOULDINGUE : une fête, une partie de plaisir", "MIRLIFLORE : un jeune homme élégant et prétentieux", "JACTANCE : une attitude vantarde",
      "PALINODIE : un brusque changement d'opinion"
    ]
  },
  {
    title: "JE N'AI JAMAIS", type: "Aveux", text: "Cinq doigts levés… pour combien de temps ?",
    rules: [
      "Chacun commence avec 5 doigts levés (compteur ci-dessous).",
      "Lisez la phrase à voix haute.",
      "Celui qui l'a déjà fait baisse un doigt (−1 sur son compteur) et raconte en une phrase.",
      "Celui qui n'a plus de doigt levé a perdu."
    ],
    points: "1 point pour celui à qui il reste le plus de doigts à la fin.",
    count: 10, stepLabel: "Phrase",
    tally: { label: "Doigts levés", start: 5, perPlayer: true, keep: true, max: 5 },
    rounds: [
      "Je n'ai jamais chanté sous la douche.", "Je n'ai jamais raté un avion ou un train.", "Je n'ai jamais menti sur mon âge.",
      "Je n'ai jamais pleuré devant un dessin animé.", "Je n'ai jamais mangé quelque chose tombé par terre.", "Je n'ai jamais fait semblant d'être malade pour éviter quelque chose.",
      "Je n'ai jamais oublié un anniversaire important.", "Je n'ai jamais dansé sur une table.", "Je n'ai jamais envoyé un message à la mauvaise personne.",
      "Je n'ai jamais fait de nuit blanche.", "Je n'ai jamais cassé quelque chose en accusant quelqu'un d'autre.", "Je n'ai jamais parlé tout(e) seul(e) dans la rue.",
      "Je n'ai jamais regardé une série entière en un week-end.", "Je n'ai jamais dit « je t'aime » en premier.", "Je n'ai jamais fait un selfie avec une star."
    ]
  },
  {
    title: "LES QUESTIONS QUI RAPPROCHENT", type: "Se connaître", text: "Inspiré des 36 questions du psychologue Arthur Aron.",
    rules: [
      "Le joueur indiqué lit la question et y répond en premier.",
      "L'autre répond ensuite à la même question.",
      "Prenez votre temps : il n'y a ni bonne ni mauvaise réponse."
    ],
    points: "Question à laquelle vous avez répondu tous les deux : 1 point pour chacun.",
    alternate: true, count: 5, stepLabel: "Question",
    rounds: [
      "Si tu pouvais dîner avec n'importe qui au monde, qui choisirais-tu ?", "Aimerais-tu être célèbre ? Pour quoi ?",
      "À quoi ressemblerait, pour toi, une journée parfaite ?", "Si tu pouvais te réveiller demain avec une nouvelle qualité, laquelle choisirais-tu ?",
      "De quoi rêves-tu depuis longtemps ? Qu'est-ce qui t'a empêché(e) de le faire ?", "Quel est ton souvenir le plus précieux ?",
      "Que représente l'amitié pour toi ?", "Cite trois choses que nous avons en commun, selon toi.",
      "Termine la phrase : « J'aimerais avoir quelqu'un avec qui partager… »", "Quand as-tu pleuré devant quelqu'un pour la dernière fois ?",
      "Dis-moi, en toute franchise, ce que tu aimes déjà chez moi.", "Si tu savais qu'il te restait un an à vivre, que changerais-tu ?"
    ]
  },
  {
    title: "LA RÈGLE SECRÈTE", type: "Enquête", text: "Découvre la règle cachée de l'autre.",
    rules: [
      "Le joueur indiqué appuie sur « Voir le mot » sans montrer l'écran : c'est sa règle secrète.",
      "Lancez le chrono. L'autre lui pose des questions ; il répond en respectant toujours sa règle.",
      "L'autre doit deviner la règle avant la sonnerie."
    ],
    points: "Règle trouvée : 1 point pour celui qui devine. Sinon : 1 point pour celui qui la cachait.",
    timer: 120, secret: true, alternate: true, count: 2, stepLabel: "Règle",
    rounds: [
      "Tu commences chaque réponse par « Alors… »", "Tu touches ton oreille avant chaque réponse", "Tu réponds toujours par une autre question",
      "Tu mens à chaque réponse", "Tu cites une couleur dans chaque réponse", "Tu réponds toujours en trois mots exactement",
      "Tu croises les bras avant de répondre", "Tu parles de nourriture dans chaque réponse", "Tu réponds comme si tu étais l'autre joueur"
    ]
  },
  // ——— JEUX DE LETTRES, DE CHIFFRES ET DE PLATEAU (pas seulement pour les couples) ———
  {
    title: "L'ÉCHELLE DE MOTS", type: "Lettres", text: "De POTS à MURS, une lettre à la fois.",
    rules: [
      "L'appli donne un mot de départ et un mot d'arrivée de 4 lettres (🎲 pour un autre défi).",
      "À tour de rôle, changez une seule lettre du dernier mot pour former un vrai mot : POTS → MOTS → MORS → MURS.",
      "Tapez le mot et validez : l'appli vérifie qu'une seule lettre a changé et que le mot existe.",
      "Pas d'idée avant la sonnerie du chrono ? Touchez « Je bloque, je passe »."
    ],
    points: "Arrivés au mot final : 1 point pour chacun. Chaque « je passe » : 1 point pour l'autre.",
    timer: 30, ladder: true
  },
  {
    title: "LE MOT LE PLUS LONG", type: "Lettres", text: "Neuf lettres, trente secondes, un seul mot.",
    rules: [
      "Le joueur indiqué tire 9 lettres en choisissant à chaque fois « voyelle » ou « consonne » (ou tirage automatique).",
      "Lancez le chrono : 30 secondes pour trouver le mot le plus long avec ces lettres, chacune utilisée une seule fois.",
      "Chacun écrit son mot en secret, puis révélez : l'appli vérifie les mots et montre le plus long possible."
    ],
    points: "Mot valable le plus long : 1 point. Égalité : 1 point chacun.",
    timer: 30, longest: true
  },
  {
    title: "LE COMPTE EST BON", type: "Calcul", text: "Six nombres, une cible, quatre opérations.",
    rules: [
      "L'appli tire 6 nombres et un nombre à atteindre (🎲 pour un autre tirage).",
      "Lancez le chrono : avec +, −, × et ÷, utilisez chaque nombre au plus une fois pour atteindre la cible. Pas de résultat négatif ni de fraction.",
      "À la sonnerie, chacun annonce son résultat et explique son calcul. « Voir une solution » pour vérifier."
    ],
    points: "Le compte est bon, ou le résultat le plus proche : 1 point. Égalité : 1 point chacun.",
    timer: 45, compte: true
  },
  {
    title: "MOTUS", type: "Lettres", text: "Cinq lettres, six essais, la première est offerte.",
    rules: [
      "L'appli choisit un mot de 5 lettres et donne la première lettre.",
      "Le joueur indiqué propose des mots de 5 lettres qui commencent par cette lettre (6 essais).",
      "Case verte : bonne lettre bien placée. Case jaune : bonne lettre mal placée.",
      "Ensuite « Mot suivant » : c'est à l'autre, avec un nouveau mot. Jouez autant de mots chacun."
    ],
    points: "Le plus petit total d'essais gagne : 1 point.",
    motus: true
  },
  {
    title: "MASTERMIND", type: "Logique", text: "Perce le code secret de quatre couleurs.",
    rules: [
      "L'appli cache un code de 4 couleurs (une couleur peut revenir plusieurs fois).",
      "Le joueur indiqué compose une combinaison et valide : ● = bonne couleur bien placée, ○ = bonne couleur mal placée.",
      "10 essais pour trouver. Ensuite c'est à l'autre, avec un nouveau code."
    ],
    points: "Le plus petit total d'essais gagne : 1 point.",
    mastermind: true
  },
  {
    title: "PUISSANCE 4", type: "Plateau", text: "Aligne quatre pions avant l'autre.",
    rules: [
      "Le joueur indiqué joue les 🔴 et commence ; l'autre joue les 🟡.",
      "À tour de rôle, touchez une colonne : le pion tombe tout en bas.",
      "Le premier qui aligne 4 pions (ligne, colonne ou diagonale) gagne.",
      "« Nouvelle partie » pour rejouer : celui qui commence change."
    ],
    points: "Partie gagnée : 1 point.",
    connect4: true
  },
  {
    title: "MEMORY", type: "Mémoire", text: "Huit paires cachées. Qui a la meilleure mémoire ?",
    rules: [
      "16 cartes face cachée, soit 8 paires.",
      "À tour de rôle, retournez deux cartes. Paire trouvée : vous la gardez et vous rejouez.",
      "Pas de paire : les cartes se retournent et c'est à l'autre.",
      "Quand toutes les paires sont trouvées, celui qui en a le plus gagne."
    ],
    points: "1 point pour le gagnant.",
    memory: true
  },
  {
    title: "ANAGRAMMES", type: "Lettres", text: "Remets les lettres dans l'ordre.",
    rules: [
      "L'appli mélange les lettres d'un mot.",
      "Le premier qui trouve le mot le dit à voix haute.",
      "« Voir la réponse » pour vérifier, puis « Mot suivant ». Jouez 5 mots."
    ],
    points: "Mot trouvé en premier : 1 point.",
    anagram: true
  },
  {
    title: "BOGGLE", type: "Lettres", text: "Seize lettres, deux minutes, un maximum de mots.",
    rules: [
      "Le joueur indiqué lance le chrono et cherche des mots dans la grille ; l'autre ne regarde pas.",
      "Un mot = au moins 3 lettres qui se touchent (par un côté ou en diagonale), sans réutiliser une case.",
      "Il écrit ses mots en secret puis passe le téléphone : l'autre relance le chrono et fait pareil.",
      "Révélez : l'appli vérifie chaque mot et compte les points."
    ],
    points: "3-4 lettres : 1 · 5 lettres : 2 · 6 : 3 · 7 : 5 · 8 et plus : 11. Mot trouvé par les deux : 0. Le plus gros total gagne 1 point.",
    timer: 120, boggle: true
  }
];

const MINI_SHORT = [
  {
    title: "LE CHIFFRE COMMUN", type: "Télépathie", text: "Pensez à la même chose, en même temps.",
    variantLabel: "Thème", variants: ["Un nombre entre 1 et 10", "Une couleur", "Un fruit", "Un pays", "Un animal", "Un prénom", "Un plat", "Un chiffre entre 1 et 5", "Une saison", "Un super-héros"],
    rules: ["Lisez le thème affiché (🎲 pour en changer).", "Comptez « 1, 2, 3 » et dites en même temps une réponse sur ce thème.", "Faites 5 essais, en changeant de thème si vous voulez."],
    points: "À chaque réponse identique : 1 point pour chacun."
  },
  {
    title: "PIERRE-FEUILLE-CISEAUX", type: "Duel", text: "Le duel le plus célèbre du monde.",
    variantLabel: "Gage du perdant", variants: ["Faire un compliment sincère au gagnant", "Masser les épaules du gagnant pendant une minute", "Préparer la prochaine boisson du gagnant", "Faire la prochaine corvée à la place du gagnant", "Chanter le refrain d'une chanson choisie par le gagnant", "Donner un bisou là où le gagnant le décide"],
    rules: [
      "Dites ensemble « pierre, feuille, ciseaux » et montrez votre main au dernier mot.",
      "La pierre casse les ciseaux, les ciseaux coupent la feuille, la feuille enveloppe la pierre.",
      "Notez les manches gagnées dans le compteur. Le premier à 3 manches gagne."
    ],
    points: "1 point pour le gagnant. Le perdant fait le gage affiché.",
    tally: { label: "Manches gagnées", perPlayer: true, max: 3 }
  },
  {
    title: "LE MOT DU COUPLE", type: "Choix simultané", text: "Dites le même mot en même temps.",
    variantLabel: "Thème", variants: ["Un mot qui décrit votre couple", "Un pays où partir ensemble", "Un plat pour ce soir", "Un prénom pour un futur chat", "Un film à regarder", "Une activité pour dimanche", "Un mot qui décrit votre premier rendez-vous"],
    rules: [
      "Comptez « 1, 2, 3 » et dites en même temps un mot sur le thème affiché.",
      "Mots différents ? Recomptez et dites un mot qui relie vos deux mots précédents.",
      "Continuez jusqu'à dire le même mot, en 7 essais maximum (compteur ci-dessous)."
    ],
    points: "Même mot en 7 essais ou moins : 1 point pour chacun.",
    tally: { label: "Essais", max: 7 }
  },
  {
    title: "LA CHAÎNE DE MOTS", type: "Rapidité", text: "Un mot en appelle un autre.",
    variantLabel: "Mot de départ", variants: ["amour", "vacances", "chocolat", "plage", "nuit", "musique", "Noël", "café", "voyage", "dimanche"],
    rules: ["Le joueur indiqué dit le mot de départ affiché.", "À tour de rôle, dites un mot lié au mot précédent. Relancez le chrono de 5 secondes à chaque mot.", "Silence à la sonnerie ou mot déjà dit : perdu."],
    points: "1 point pour celui qui n'a pas séché.",
    timer: 5
  },
  {
    title: "RIRE INTERDIT", type: "Duel", text: "Le premier qui rit a perdu.",
    rules: ["Regardez-vous droit dans les yeux, à un bras de distance.", "Les grimaces sont autorisées. Interdit de parler ou de toucher l'autre.", "Le premier qui rit ou détourne le regard perd."],
    points: "1 point pour le gagnant."
  },
  {
    title: "LE DESSIN À QUATRE MAINS", type: "Créativité", text: "Un dessin, deux artistes, zéro parole.",
    variantLabel: "Sujet", variants: ["Une maison", "Un chat", "Notre futur salon", "Un dragon", "Un vélo", "Un portrait de nous deux", "Une voiture", "Un bateau sur la mer"],
    rules: ["Dessinez le sujet affiché dans la zone de dessin, un trait chacun, à tour de rôle.", "Interdit de parler ou de se faire des signes.", "Au bout de 10 traits chacun, donnez un titre à votre œuvre."],
    points: "Vous reconnaissez tous les deux le sujet : 1 point pour chacun.",
    canvas: true
  },
  {
    title: "SPEED DATING", type: "Jeu de rôle", text: "30 secondes pour séduire.",
    variantLabel: "Situation", variants: ["Vous vous rencontrez dans un train", "Vous vous rencontrez à un mariage", "Vous êtes dans la même file d'attente", "Vous venez de matcher sur une appli", "Vous êtes voisins de table au restaurant", "Vous êtes coincés dans un ascenseur"],
    rules: ["Faites comme si vous ne vous connaissiez pas, dans la situation affichée.", "Le joueur indiqué lance le chrono : il a 30 secondes pour se présenter et donner envie d'un deuxième rendez-vous.", "Relancez le chrono pour l'autre. Chacun dit ensuite s'il accepte le rendez-vous."],
    points: "Rendez-vous accepté : 1 point pour le séducteur.",
    timer: 30
  },
  {
    title: "TROIS MOTS", type: "Se connaître", text: "Trois mots, pas un de plus.",
    variantLabel: "Thème", variants: ["Décris l'autre en trois mots", "Décris notre couple en trois mots", "Décris notre premier rendez-vous en trois mots", "Décris l'autre au réveil en trois mots", "Décris nos dernières vacances en trois mots", "Décris l'autre quand il ou elle est fâché(e)"],
    rules: ["Lancez le chrono : 30 secondes de réflexion en silence.", "Chacun répond au thème affiché en trois mots.", "Chacun dit lequel des mots de l'autre le surprend le plus, et pourquoi."],
    points: "1 point pour chacun si vous avez joué le jeu.",
    timer: 30
  },
  {
    title: "LA PHRASE CULTE", type: "Imitation", text: "Imite sa phrase fétiche.",
    rules: ["Chacun choisit une phrase que l'autre dit tout le temps.", "À tour de rôle, imitez-la avec sa voix et ses gestes.", "Votez ensemble : quelle imitation était la plus ressemblante ?"],
    points: "1 point pour la meilleure imitation."
  },
  {
    title: "LE GPS HUMAIN", type: "Confiance", text: "Guide l'autre les yeux fermés.",
    rules: ["L'un ferme les yeux. L'autre choisit un objet de la pièce, sans dire lequel.", "Lancez le chrono. Le guide donne seulement des indications à la voix : « deux pas à gauche », « tends la main »…", "Puis échangez les rôles."],
    points: "Objet touché avant la sonnerie : 1 point pour le guide.",
    timer: 60
  },
  {
    title: "NI OUI NI NON", type: "Concentration", text: "Le grand classique : ni oui, ni non.",
    rules: ["Le joueur indiqué pose des questions rapides et pièges pendant le chrono.", "L'autre répond sans jamais dire « oui » ni « non » (ni « ouais », ni hochement de tête).", "Puis échangez les rôles."],
    points: "Tenir jusqu'à la sonnerie : 1 point.",
    timer: 60
  },
  {
    title: "LE SOUVENIR TRUQUÉ", type: "Mémoire", text: "Trouve l'erreur dans l'histoire.",
    variantLabel: "Thème du souvenir", variants: ["Notre premier rendez-vous", "Nos dernières vacances", "Un anniversaire", "Une soirée entre amis", "Notre premier voyage", "Une dispute qui a fini en fou rire"],
    rules: ["L'un raconte un souvenir commun sur le thème affiché, en y glissant une seule erreur.", "À la fin du récit, l'autre doit trouver l'erreur.", "Puis échangez les rôles."],
    points: "Erreur trouvée : 1 point pour celui qui l'a repérée. Sinon : 1 point pour le conteur."
  },
  {
    title: "L'INVENTAIRE", type: "Observation", text: "Que cache son sac ?",
    rules: ["Le joueur indiqué lance le chrono et cite tout ce qu'il pense trouver dans le sac ou les poches de l'autre.", "Relancez le chrono pour l'autre.", "Videz ensuite les sacs pour vérifier."],
    points: "Objet juste : 1 point.",
    timer: 45, tally: { label: "Objets justes", perPlayer: true }
  },
  {
    title: "LE GOÛT MYSTÈRE", type: "Sens", text: "Goûte les yeux fermés.", need: "quelques aliments de la cuisine",
    rules: ["L'un ferme les yeux.", "L'autre lui fait goûter un aliment de la cuisine (rien de piquant, ni d'allergène).", "Il a deux essais pour le nommer. Puis échangez."],
    points: "Aliment trouvé : 1 point."
  },
  {
    title: "LE MÊME CHOIX", type: "Choix simultané", text: "Le même choix, au même moment.",
    variantLabel: "Le choix", variants: ["Soirée tranquille ou sortie improvisée ?", "Mer ou montagne ?", "Sucré ou salé ?", "Film d'horreur ou comédie romantique ?", "Grasse matinée ou lever avec le soleil ?", "Chien ou chat ?", "Restaurant ou plat fait maison ?", "Voyage en train ou en voiture ?", "Pizza ou burger ?", "Été ou hiver ?"],
    rules: ["Lisez le choix affiché (🎲 pour en changer) et comptez « 1, 2, 3 ».", "Dites votre réponse en même temps.", "Chacun explique son choix en une phrase."],
    points: "Même choix : 1 point pour chacun."
  },
  {
    title: "QUI LE FERAIT ?", type: "Désignation", text: "Qui de vous deux le ferait ?",
    variantLabel: "La question", variants: ["Qui se perdrait avec un GPS ?", "Qui oublierait les clés en partant ?", "Qui pleurerait devant une pub ?", "Qui mangerait le dernier morceau sans demander ?", "Qui ferait une fête surprise ?", "Qui s'endormirait au cinéma ?", "Qui parlerait à un inconnu dans le métro ?", "Qui dépenserait tout son salaire en un week-end ?"],
    rules: ["Lisez la question affichée à voix haute (🎲 pour en changer).", "Comptez « 1, 2, 3 » et désignez du doigt, en même temps, la personne concernée.", "Recommencez avec d'autres questions si vous voulez."],
    points: "Même personne désignée : 1 point pour chacun."
  },
  {
    title: "TOP 5", type: "Course contre la montre", text: "Cinq réponses communes avant la sonnerie.",
    variantLabel: "Thème", variants: ["Cinq choses que vous aimez tous les deux", "Cinq plats que vous adorez tous les deux", "Cinq endroits où vous aimeriez aller ensemble", "Cinq films ou séries que vous aimez tous les deux", "Cinq chanteurs que vous écoutez tous les deux", "Cinq activités pour un dimanche parfait"],
    rules: ["Lancez le chrono.", "Ensemble, trouvez cinq réponses sur le thème affiché qui vous plaisent à tous les deux. Ajoutez +1 au compteur à chaque trouvaille."],
    points: "5 trouvées avant la sonnerie : 1 point pour chacun.",
    timer: 45, tally: { label: "Trouvées", max: 5 }
  },
  {
    title: "MOT INTERDIT", type: "Concentration", text: "Surtout, ne dis pas le mot !",
    variantLabel: "Mot interdit · sujet", variants: ["« je » · vos dernières vacances", "« genre » · votre semaine", "« bon » · votre plat préféré", "« oui » · vos projets pour l'été", "« trop » · votre premier rendez-vous", "« alors » · vos amis", "« en fait » · votre film préféré"],
    rules: ["Le mot interdit et le sujet sont affichés (🎲 pour en changer).", "Lancez le chrono et discutez du sujet.", "À chaque fois que quelqu'un dit le mot, l'autre marque un point."],
    points: "1 point à chaque fois que l'autre prononce le mot.",
    timer: 60
  },
  {
    title: "CLASSEMENT SECRET", type: "Révélation", text: "Quatre choses, un classement secret.",
    variantLabel: "À classer", variants: ["Mer, montagne, ville, campagne", "Pizza, sushi, burger, raclette", "Printemps, été, automne, hiver", "Cinéma, restaurant, concert, balade", "Chien, chat, lapin, poisson rouge", "Matin, midi, soir, nuit", "Bisou, câlin, massage, mot doux"],
    rules: ["Chacun classe en secret les quatre choses affichées, de la préférée à la moins aimée, et cache sa réponse.", "Révélez les deux classements.", "Comparez et expliquez vos choix."],
    points: "Même n°1 : 1 point pour chacun. Classement identique : 2 points chacun.",
    answers: { count: 2, rows: 4, label: "1. …  2. …  3. …  4. …" }
  },
  {
    title: "DEVINE LE SOUVENIR", type: "Mémoire", text: "Trois indices pour un souvenir.",
    variantLabel: "Thème du souvenir", variants: ["Un souvenir commun, au choix", "Un repas mémorable", "Un fou rire", "Un voyage ou une sortie", "Un moment gênant", "Un cadeau"],
    rules: ["L'un pense à un souvenir commun sur le thème affiché.", "Il donne un indice à la fois, sans nom de lieu ni de personne.", "L'autre a droit à une seule proposition après chaque indice."],
    points: "Trouvé au 1er indice : 3 points. Au 2e : 2 points. Au 3e : 1 point."
  },
  {
    title: "DÉFI ALPHABET", type: "Créativité", text: "Un mot pour chaque lettre.",
    variantLabel: "Thème", variants: ["Un mot positif qui décrit l'autre", "Un plat ou un aliment", "Un pays ou une ville", "Une raison de m'aimer", "Un endroit où partir ensemble", "Un prénom"],
    rules: ["À tour de rôle, dites un mot sur le thème affiché, en suivant l'alphabet : A, puis B, puis C…", "Relancez le chrono de 10 secondes à chaque mot. On peut passer les lettres difficiles (K, W, X, Y).", "Celui qui sèche à la sonnerie perd."],
    points: "1 point pour celui qui n'a pas séché.",
    timer: 10
  },
  {
    title: "UNE HISTOIRE À DEUX", type: "Improvisation", text: "Une phrase chacun.",
    variantLabel: "Première phrase", variants: ["Il était une fois…", "Ce matin-là, le réveil n'a pas sonné…", "Quand nous avons ouvert la porte, il y avait un éléphant dans le salon…", "Le jour où nous avons gagné au loto…", "Dans notre future maison, il y a une pièce secrète…", "Ce soir-là, la panne de courant a tout changé…"],
    rules: ["Le joueur indiqué commence l'histoire avec la première phrase affichée.", "À tour de rôle, ajoutez une seule phrase.", "Après six phrases, donnez un titre à votre histoire.", "Option BD : lancez le chrono et dessinez vite votre histoire en 6 cases, une case par phrase. Chacun dessine les cases de ses propres phrases."],
    points: "Une histoire qui tient debout : 1 point pour chacun. Option BD finie avant la sonnerie : 1 point bonus chacun.",
    timer: 120, canvas: true, panels: 6
  },

  // ——— NOUVEAUX : de vrais jeux courts, sans matériel ———
  {
    title: "LA BATAILLE DE POUCES", type: "Duel", text: "« 1, 2, 3, 4, je déclare la guerre des pouces ! »",
    rules: ["Accrochez vos mains droites, doigts repliés, pouces levés.", "Dites la formule ensemble, puis essayez de bloquer le pouce de l'autre sous le vôtre pendant 3 secondes.", "Le premier à 2 manches gagne."],
    points: "1 point pour le gagnant.",
    tally: { label: "Manches gagnées", perPlayer: true, max: 2 }
  },
  {
    title: "LE JEU DU 21", type: "Stratégie", text: "Celui qui dit 21 a perdu.",
    rules: ["Le joueur indiqué commence à compter à partir de 1.", "À tour de rôle, chacun dit 1, 2 ou 3 nombres qui se suivent : touchez +1, +2 ou +3.", "Celui qui est obligé de dire « 21 » perd la manche. Jouez 3 manches."],
    points: "1 point par manche gagnée.",
    nim: true
  },
  {
    title: "LE ROI DU SILENCE", type: "Duel", text: "Le premier qui parle a perdu.",
    rules: ["Dites ensemble « 1, 2, 3, silence ! ».", "Interdit de parler, de rire aux éclats ou de faire un bruit avec la bouche. Grimaces et gestes autorisés.", "Le premier qui craque perd."],
    points: "1 point pour le gagnant."
  },
  {
    title: "LE MOT CHAÎNÉ", type: "Lettres", text: "Chaque mot commence par la dernière lettre du précédent.",
    variantLabel: "Mot de départ", variants: ["sapin", "amour", "chocolat", "plage", "valise", "bisou", "dimanche", "lune"],
    rules: ["Le joueur indiqué dit le mot de départ affiché.", "L'autre dit un mot qui commence par sa dernière lettre (« sapin » → « nuage »), et ainsi de suite. Relancez le chrono de 5 secondes à chaque mot.", "Pas de répétition, pas de nom propre."],
    points: "Celui qui sèche à la sonnerie perd : 1 point pour l'autre.",
    timer: 5
  },
  {
    title: "CHICHE ?", type: "Défi", text: "Quelles sont les chances que tu le fasses ?",
    variantLabel: "Idée de défi", variants: ["Chiche que tu chantes debout sur le canapé ?", "Chiche que tu imites ta star préférée pendant 30 secondes ?", "Chiche que tu manges une cuillère de moutarde ?", "Chiche que tu fais 10 pompes ?", "Chiche que tu envoies « je t'aime » à ta mère ?", "Chiche que tu parles avec un accent toute la soirée ?", "Chiche que tu danses sans musique pendant une minute ?"],
    rules: [
      "L'un lance le petit défi affiché (🎲 pour en changer) ou en invente un.",
      "L'autre choisit un nombre maximum entre 3 et 10.",
      "Comptez « 1, 2, 3 » et dites en même temps un nombre entre 1 et ce maximum.",
      "Même nombre ? Le défi doit être fait ! Puis échangez les rôles."
    ],
    points: "Défi réalisé : 1 point pour celui qui l'a fait."
  },
  {
    title: "LE CADAVRE EXQUIS", type: "Surréaliste", text: "La phrase absurde à quatre mains.",
    rules: ["Chacun écrit à son tour un morceau de phrase, sans voir ce que l'autre a écrit.", "Appuyez sur « Plier et passer » après chaque morceau.", "Dépliez la feuille et lisez votre phrase à voix haute."],
    points: "Fou rire garanti : 1 point pour chacun.",
    folded: [
      { label: "un sujet avec un adjectif", example: "Le chat amoureux" },
      { label: "un verbe", example: "dévore" },
      { label: "un complément", example: "un nuage à la vanille" },
      { label: "un lieu ou un moment", example: "dans l'ascenseur, à minuit" }
    ]
  },
  {
    title: "LES 5 SECONDES", type: "Rapidité", text: "Trois réponses en cinq secondes.",
    variantLabel: "Thème", variants: ["Cite 3 fromages", "Cite 3 pays d'Afrique", "Cite 3 films de Disney", "Cite 3 marques de voiture", "Cite 3 choses qu'on trouve dans un frigo", "Cite 3 sports d'hiver", "Cite 3 chanteurs français", "Cite 3 desserts", "Cite 3 métiers qui commencent par P", "Cite 3 animaux de la jungle", "Cite 3 choses rouges", "Cite 3 instruments de musique"],
    rules: ["Le joueur indiqué lit le thème affiché à l'autre (🎲 pour un nouveau thème à chaque tour).", "Il lance le chrono : l'autre doit donner 3 réponses avant la sonnerie.", "Échangez les rôles. Faites 5 thèmes chacun."],
    points: "3 réponses avant la sonnerie : 1 point.",
    timer: 5, tally: { label: "Réussites", perPlayer: true }
  },
  {
    title: "C'EST PLUS, C'EST MOINS", type: "Devinette", text: "Trouve le nombre secret entre 1 et 100.",
    rules: [
      "Le joueur indiqué tape un nombre secret entre 1 et 100 ; l'autre ne regarde pas.",
      "L'autre propose des nombres : l'appli répond « c'est plus » ou « c'est moins ».",
      "Une fois trouvé, échangez les rôles."
    ],
    points: "Le moins d'essais gagne : 1 point.",
    higherLower: true
  },
  {
    title: "LE PLUS RAPIDE", type: "Réflexes", text: "Le premier qui touche au signal gagne.",
    rules: [
      "Posez le téléphone entre vous, chacun un doigt au-dessus du bouton à son prénom.",
      "Touchez « Prêts ? » et attendez : dès que « TOUCHEZ ! » s'affiche, appuyez le plus vite possible.",
      "Toucher avant le signal fait perdre la manche. Le premier à 3 manches gagne."
    ],
    points: "1 point pour le gagnant.",
    reflex: true
  }
];

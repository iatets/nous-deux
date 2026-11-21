// Sur l'oreiller : questions et mini-jeux à faire dans le lit, à deux.
// Une partie = 3 questions + 3 jeux longs + 4 jeux courts, mélangés.
// Les jeux utilisent les mêmes champs que les mini-jeux (voir mini-jeux.js).

const OREILLER_QUESTIONS = [
  // ——— CÂLINS & SOMMEIL ———
  "Quel est ton côté du lit préféré, et serais-tu prêt(e) à me le laisser ?",
  "Tu préfères t'endormir collé(e) contre moi ou avoir un peu d'espace ?",
  "Dans quelle position de câlin t'endors-tu le plus vite ?",
  "Qu'est-ce que je fais en dormant qui te fait rire ?",
  "Qui de nous deux vole la couette, en vrai ?",
  "Quel est ton rituel préféré juste avant de dormir ?",
  "Tu préfères qu'on se réveille avec un câlin, un bisou ou un café ?",
  "Quelle est la plus belle grasse matinée qu'on ait passée ensemble ?",
  "Qu'est-ce que tu penses quand tu me regardes dormir ?",
  "Quelle est la dernière chose à laquelle tu penses avant de t'endormir ?",
  "Si on pouvait rester au lit toute une journée, qu'est-ce qu'on ferait ?",
  "Quel petit geste aimerais-tu que je fasse chaque soir en me couchant ?",

  // ——— CONFIDENCES SUR L'OREILLER ———
  "Quel moment de la journée as-tu préféré aujourd'hui avec moi ?",
  "Qu'est-ce que tu n'oses dire que dans le noir ?",
  "Quel souvenir de nous te fait sourire quand tu n'arrives pas à dormir ?",
  "Quelle est la chose la plus douce que je t'aie dite au lit ?",
  "De quoi as-tu besoin quand tu fais un cauchemar ?",
  "Quel rêve as-tu déjà fait sur moi ?",
  "Quelle partie de moi préfères-tu caresser quand on discute dans le lit ?",
  "Qu'est-ce qui te fait te sentir le plus en sécurité contre moi ?",
  "Quel câlin de moi t'a le plus marqué(e) ?",
  "Tu préfères les longues discussions au lit ou t'endormir en silence contre moi ?",

  // ——— ÇA CHAUFFE UN PEU ———
  "Quelle tenue de nuit préfères-tu me voir porter… ou ne pas porter ?",
  "Qu'est-ce qui te donne envie de moi quand on est déjà couchés ?",
  "Tu préfères qu'on se câline avant de dormir ou qu'on se réveille en se câlinant ?",
  "Quel est l'endroit de ton cou où tu préfères que je t'embrasse ?",
  "Qu'est-ce que je pourrais te chuchoter à l'oreille pour te faire craquer ?",
  "Tu préfères dormir habillé(e), en sous-vêtements ou tout nu ?",
  "Quel est le bisou que je te fais et qui te donne le plus de frissons ?",
  "Est-ce que tu aimes quand je te réveille doucement avec des caresses ?",
  "Quel geste sous la couette te fait perdre tous tes moyens ?",
  "Qu'est-ce qui te plaît le plus dans mon corps quand je suis allongé(e) près de toi ?",
  "Tu préfères les câlins lents et doux ou plus passionnés ?",
  "Quelle est la zone de ton corps qu'on oublie trop souvent ?",
  "Est-ce que tu as déjà eu envie de moi en me regardant dormir ?",
  "Quel serait pour toi le réveil le plus sexy possible ?",
  "À quoi ressemblerait ta nuit parfaite avec moi, du coucher au réveil ?",
  "Quelle petite chose aimerais-tu qu'on essaie au lit, juste pour voir ?",
  "Qu'est-ce que tu préfères : que je prenne l'initiative ou que je te laisse faire ?",
  "Quel est ton souvenir le plus chaud d'une nuit ensemble ?",
  "Quelle musique mettrais-tu pour une nuit rien qu'à nous ?",
  "Tu aimes mieux la lumière éteinte, une bougie, ou toutes les lumières allumées ?",
  "Est-ce qu'il y a un endroit de mon corps que tu aimerais découvrir plus lentement ?",
  "Quel mot doux ou quel surnom te fait de l'effet quand je te le dis au lit ?",

  // ——— OLÉ OLÉ ———
  "Quel est le meilleur moment qu'on ait passé dans ce lit, et pourquoi celui-là ?",
  "Qu'est-ce que tu aimerais que je te fasse ce soir, en une seule phrase ?",
  "Quel fantasme tu n'as encore jamais osé me raconter, même à moitié ?",
  "Tu préfères qu'on fasse l'amour le matin, le soir ou au milieu de la nuit ?",
  "Quelle position te donne le plus l'impression d'être proche de moi ?",
  "Qu'est-ce que tu aimes entendre de ma bouche quand on fait l'amour ?",
  "As-tu déjà eu envie de me réveiller en pleine nuit pour ça ? Raconte.",
  "Quelle est la chose la plus osée que tu aimerais qu'on fasse sous la couette ?",
  "Quel accessoire aimerais-tu qu'on garde sur la table de nuit ?",
  "Tu préfères qu'on prenne tout notre temps ou qu'on se jette l'un sur l'autre ?",
  "Qu'est-ce que je fais au lit qui te rend complètement fou ou folle ?",
  "Y a-t-il quelque chose que tu aimerais que je fasse plus souvent quand on se touche ?",
  "Quelle est la tenue qui te ferait craquer à coup sûr si tu me voyais dans le lit en rentrant ?",
  "Est-ce que tu aimes qu'on se regarde dans les yeux quand on fait l'amour ?",
  "Quel serait ton scénario idéal pour une nuit où on ne dort presque pas ?",
  "Quel mot ou quel geste pourrait être notre signal secret pour dire « j'ai envie » ?"
];

const OREILLER_LONG = [
  {
    title: "DESSINE SUR MON DOS", type: "Toucher", text: "Du bout du doigt, sur la peau.",
    rules: [
      "Celui qui devine s'allonge sur le ventre, le dos nu ou en t-shirt fin.",
      "Le joueur indiqué appuie sur « Voir le mot », lance le chrono et trace le mot lentement, du bout du doigt, sur le dos de l'autre (une lettre à la fois pour les mots).",
      "L'autre a 3 essais pour deviner."
    ],
    points: "Trouvé : 1 point pour chacun.",
    timer: 45, secret: true, alternate: true, count: 6, stepLabel: "Dessin",
    rounds: [
      "Un cœur", "Une étoile", "Un soleil", "Une lune", "Un smiley", "Une maison",
      "Tes initiales", "Ses initiales", "Le mot OUI", "Le mot BISOU", "Le mot TOI", "Le mot ENCORE",
      "Le chiffre 69", "Une flèche vers le bas", "Une fleur", "Les lèvres d'un bisou", "Le mot NU", "Le mot CÂLIN"
    ]
  },
  {
    title: "OÙ T'AI-JE EMBRASSÉ ?", type: "Yeux fermés", text: "Un bisou, un seul indice : la sensation.",
    rules: [
      "Celui qui devine ferme les yeux.",
      "Le joueur indiqué appuie sur « Voir le mot » et dépose un bisou à l'endroit indiqué.",
      "L'autre dit où, en un seul essai. Chacun peut dire « pas là » à tout moment."
    ],
    points: "Trouvé du premier coup : 1 point pour chacun.",
    secret: true, alternate: true, count: 6, stepLabel: "Bisou",
    rounds: [
      "Le creux du poignet", "La paume de la main", "Le bout du nez", "Une paupière", "Le lobe de l'oreille", "La nuque",
      "L'épaule", "Le creux du coude", "Le genou", "La cheville", "Le ventre", "Le bas du dos",
      "La clavicule", "Le cou, juste sous l'oreille", "L'intérieur de la cuisse", "Le front", "Le menton", "La hanche"
    ]
  },
  {
    title: "LE MASSAGE À LA CARTE", type: "Détente", text: "Une minute de massage, pas une seconde de moins.",
    rules: [
      "Le joueur indiqué lit le massage, lance le chrono et masse l'autre jusqu'à la sonnerie.",
      "Celui qui reçoit peut guider : « plus fort », « plus doux », « là ».",
      "À la sonnerie, il donne une note sur 10."
    ],
    points: "Note de 8/10 ou plus : 1 point pour le masseur.",
    timer: 60, alternate: true, count: 4, stepLabel: "Massage",
    rounds: [
      "Massage des mains, doigt par doigt", "Massage des pieds", "Massage de la nuque et des épaules", "Massage du crâne, dans les cheveux",
      "Massage du dos, du haut vers le bas", "Massage des jambes, des chevilles jusqu'aux genoux", "Massage du visage, tout en douceur",
      "Massage du bas du dos", "Massage au choix de celui qui reçoit", "Massage avec seulement le bout des ongles", "Massage des cuisses", "Massage des fesses, sans rire"
    ]
  },
  {
    title: "LE CHEF D'ORCHESTRE", type: "Guider", text: "Tu donnes les ordres, l'autre obéit.",
    rules: [
      "Le joueur indiqué est le chef : il lit la consigne et lance le chrono.",
      "Il guide l'autre uniquement à la voix : « plus lentement », « plus haut », « encore », « stop ».",
      "L'autre obéit à la lettre jusqu'à la sonnerie."
    ],
    points: "Chef satisfait : 1 point pour chacun.",
    timer: 60, alternate: true, count: 4, stepLabel: "Partition",
    rounds: [
      "Guide ses caresses sur ton dos", "Guide ses bisous dans ton cou", "Guide ses mains dans tes cheveux", "Guide son massage de tes épaules",
      "Guide ses bisous sur ton visage", "Guide ses caresses le long de tes bras", "Guide ses mains sur ton ventre", "Guide ses bisous où tu veux",
      "Guide un baiser : rythme, durée, intensité", "Guide ses caresses sur tes jambes"
    ]
  },
  {
    title: "LE TRÉSOR SOUS LA COUETTE", type: "Cache-cache", text: "Froid… tiède… brûlant !",
    rules: [
      "L'autre ferme les yeux pendant que le joueur indiqué cache l'objet sur lui ou sous la couette.",
      "Lancez le chrono. Le chercheur fouille avec les mains, les yeux toujours fermés.",
      "Seuls indices autorisés : « froid », « tiède », « chaud » ou « brûlant »."
    ],
    points: "Trouvé avant la sonnerie : 1 point pour le chercheur. Sinon : 1 point pour celui qui a caché.",
    timer: 60, alternate: true, count: 4, stepLabel: "Trésor",
    rounds: [
      "Cache une chaussette", "Cache une bague ou un bracelet", "Cache un bonbon", "Cache un élastique à cheveux",
      "Cache un petit mot plié", "Cache une pièce de monnaie", "Cache une barrette ou une pince", "Cache un capuchon de stylo"
    ]
  },
  {
    title: "LE QUIZ EFFEUILLÉ", type: "Strip quiz", text: "Mauvaise réponse ? Un vêtement en moins.",
    rules: [
      "Le joueur indiqué lit la question et répond à voix haute, à propos de l'autre.",
      "L'autre dit si c'est juste.",
      "Mauvaise réponse : il enlève un vêtement de son choix. Plus rien à enlever ? Il donne un bisou là où l'autre le décide."
    ],
    points: "Bonne réponse : 1 point.",
    alternate: true, count: 8, stepLabel: "Question",
    rounds: [
      "Quelle est sa position préférée pour dormir ?", "De quel côté du lit dort-il ou elle ?", "Quelle est sa tenue de nuit préférée ?",
      "Où préfère-t-il ou elle être embrassé(e) ?", "Quel est son parfum ou son gel douche ?", "Chatouilleux ou chatouilleuse où, exactement ?",
      "Qu'est-ce qui le ou la réveille le plus vite ?", "Plutôt du matin ou du soir pour les câlins ?", "Quelle est la couleur de ses sous-vêtements, là, maintenant ?",
      "Quel est le mot doux qu'il ou elle préfère ?", "Quelle partie de son corps préfère-t-il ou elle ?", "Quelle est la chose qui le ou la fait craquer à coup sûr ?",
      "Quel est son pire défaut au lit (pour dormir !) ?", "Que porte-t-il ou elle pour dormir quand il fait très chaud ?"
    ]
  },
  {
    title: "TU PRÉFÈRES… SOUS LA COUETTE", type: "Choix simultané", text: "Répondez en même temps, sans réfléchir.",
    rules: [
      "Lisez les deux choix à voix haute.",
      "Comptez « 1, 2, 3 » et dites votre choix en même temps.",
      "Réponses différentes ? À vous de négocier…"
    ],
    points: "Même réponse : 1 point pour chacun.",
    count: 8, stepLabel: "Choix",
    rounds: [
      "Tu préfères un câlin cuillère ou face à face ?", "Tu préfères la grasse matinée ou le réveil avec des bisous ?", "Tu préfères une couette chacun ou une seule pour deux ?",
      "Tu préfères les bisous dans le cou ou sur la bouche ?", "Tu préfères un massage ou des caresses ?", "Tu préfères t'endormir en parlant ou en silence ?",
      "Tu préfères les draps frais ou un lit tout chaud ?", "Tu préfères qu'on le fasse lentement ou passionnément ?", "Tu préfères la lumière éteinte ou une bougie ?",
      "Tu préfères prendre l'initiative ou te laisser faire ?", "Tu préfères le matin ou le soir pour les câlins coquins ?", "Tu préfères des mots doux ou des mots crus à l'oreille ?",
      "Tu préfères qu'on dorme nus ou en pyjama ?", "Tu préfères une nuit très tendre ou une nuit très sauvage ?"
    ]
  },
  {
    title: "QUI DE NOUS DEUX… AU LIT ?", type: "Désignation", text: "Comptez jusqu'à trois et désignez-vous.",
    rules: [
      "Lisez la question à voix haute.",
      "Comptez « 1, 2, 3 » et pointez du doigt, en même temps, la bonne personne.",
      "Pas d'accord ? Chacun défend son choix en une phrase."
    ],
    points: "Même personne désignée : 1 point pour chacun.",
    count: 10, stepLabel: "Question",
    rounds: [
      "Qui de nous deux s'endort le premier ?", "Qui de nous deux ronfle le plus ?", "Qui de nous deux vole la couette ?",
      "Qui de nous deux prend le plus de place ?", "Qui de nous deux a les pieds les plus froids ?", "Qui de nous deux parle en dormant ?",
      "Qui de nous deux réclame le plus de câlins ?", "Qui de nous deux prend le plus souvent l'initiative ?", "Qui de nous deux est le plus bruyant… au lit ?",
      "Qui de nous deux est le plus chatouilleux ?", "Qui de nous deux a le plus de mal à se lever ?", "Qui de nous deux s'endort juste après l'amour ?",
      "Qui de nous deux est le plus coquin le matin ?", "Qui de nous deux donne les meilleurs massages ?", "Qui de nous deux craque le plus vite ?"
    ]
  },
  {
    title: "JE N'AI JAMAIS… SUR L'OREILLER", type: "Aveux", text: "Si tu l'as déjà fait, tu payes un bisou.",
    rules: [
      "Lisez la phrase à voix haute.",
      "Celui qui l'a déjà fait donne un bisou à l'autre, là où l'autre le décide, et ajoute +1 à son compteur.",
      "Raconter l'histoire est facultatif : le mystère est permis."
    ],
    points: "À la fin, celui qui a donné le moins de bisous prend 1 point.",
    count: 8, stepLabel: "Aveu",
    tally: { label: "Bisous donnés", perPlayer: true, keep: true },
    rounds: [
      "Je n'ai jamais fait semblant de dormir pour éviter de me lever.", "Je n'ai jamais rêvé de toi de façon très coquine.", "Je n'ai jamais volé la couette exprès.",
      "Je n'ai jamais pensé à toi en me réveillant seul(e).", "Je n'ai jamais dormi complètement nu(e) avec toi.", "Je n'ai jamais eu envie de toi en pleine nuit sans te le dire.",
      "Je n'ai jamais regardé quelque chose de coquin en pensant à toi.", "Je n'ai jamais refait le lit juste pour que tu le défasses.", "Je n'ai jamais porté un de tes vêtements pour dormir.",
      "Je n'ai jamais fait l'amour en essayant de ne pas faire de bruit.", "Je n'ai jamais mis une tenue exprès pour te faire craquer.", "Je n'ai jamais envoyé un message coquin en sachant que tu étais occupé(e).",
      "Je n'ai jamais imaginé une nuit entière avec toi pendant ma journée.", "Je n'ai jamais fait l'amour ailleurs que dans un lit."
    ]
  },
  {
    title: "L'HISTOIRE QUI CHAUFFE", type: "Improvisation", text: "Une phrase chacun, de plus en plus chaude.",
    rules: [
      "Le joueur indiqué lit le début de l'histoire à l'oreille de l'autre.",
      "À tour de rôle, ajoutez une phrase à voix basse, chacune un peu plus chaude que la précédente. Relancez le chrono de 20 secondes à chaque phrase.",
      "Celui qui rit ou qui sèche à la sonnerie perd."
    ],
    points: "1 point pour celui qui n'a pas craqué.",
    timer: 20, alternate: true, count: 3, stepLabel: "Histoire",
    rounds: [
      "« Il pleuvait, la porte de la chambre d'hôtel venait de se refermer… »", "« Le dernier métro était parti, il ne restait qu'un taxi et une seule adresse… »",
      "« Elle avait laissé un petit mot sur l'oreiller : rejoins-moi à minuit… »", "« Le chalet était coupé du monde, et il n'y avait qu'un seul lit… »",
      "« Il était trois heures du matin quand j'ai senti ta main… »", "« On s'était promis d'être sages ce soir-là… »"
    ]
  },
  {
    title: "LES SENS EN ÉVEIL", type: "Yeux bandés", text: "Fermez les yeux, laissez faire.",
    rules: [
      "Celui qui reçoit ferme les yeux (ou met un foulard).",
      "Le joueur indiqué appuie sur « Voir le mot », lance le chrono et fait ce qui est demandé.",
      "L'autre doit deviner ce qu'il a senti, goûté, entendu ou touché."
    ],
    points: "Bonne réponse : 1 point pour chacun.",
    timer: 45, secret: true, alternate: true, count: 5, stepLabel: "Sensation",
    rounds: [
      "Fais-lui sentir quelque chose de la maison", "Fais-lui goûter quelque chose de sucré", "Passe un objet doux sur son bras", "Souffle doucement à un endroit de son corps",
      "Passe tes cheveux sur sa peau", "Fais-lui écouter un son de la pièce", "Pose quelque chose de froid sur sa peau", "Caresse-le ou la avec un tissu",
      "Fais-lui sentir ton parfum à un endroit de ton cou", "Fais-lui deviner avec quelle partie de ton corps tu le ou la touches"
    ]
  },

  // ——— NOUVEAUX : de vrais jeux coquins pour couple ———
  {
    title: "LES DÉS COQUINS", type: "Hasard", text: "Deux dés : une action, un endroit.",
    rules: [
      "Les dés sont lancés : une action et un endroit du corps.",
      "Le joueur indiqué lance le chrono et fait l'action, à cet endroit, sur l'autre, jusqu'à la sonnerie.",
      "Un endroit ne plaît pas ? Celui qui reçoit dit « relance » : touchez « 🎲 Relancer », sans discuter."
    ],
    points: "Pas de perdant : 1 point pour chacun si vous allez au bout des lancers.",
    timer: 30, alternate: true, count: 8, stepLabel: "Lancer", nextLabel: "Lancer suivant →", rerollLabel: "🎲 Relancer",
    dice: [
      ["Embrasse", "Caresse", "Masse", "Souffle sur", "Mordille doucement", "Effleure du bout des doigts", "Lèche", "Chatouille"],
      ["le cou", "l'oreille", "le ventre", "la nuque", "les lèvres", "l'intérieur du poignet", "le bas du dos", "les épaules", "la cuisse", "le torse", "la hanche", "l'endroit de ton choix"]
    ]
  },
  {
    title: "ACTION OU VÉRITÉ COQUIN", type: "Classique", text: "Action ou vérité ? Tu choisis, tu assumes.",
    rules: [
      "Le joueur indiqué annonce à voix haute : « action » ou « vérité ».",
      "Lisez sur la carte la partie choisie : V pour vérité, A pour action.",
      "Il répond franchement ou fait l'action. Refuser est permis : il enlève alors un vêtement."
    ],
    points: "Vérité dite ou action faite : 1 point.",
    alternate: true, count: 8, stepLabel: "Carte",
    rounds: [
      "V : Quel est ton fantasme le plus inavouable ?  ·  A : Embrasse-moi 20 secondes sans utiliser les mains.",
      "V : Quelle est la première chose que tu as remarquée chez moi ?  ·  A : Enlève-moi un vêtement avec les dents.",
      "V : Où aimerais-tu qu'on le fasse au moins une fois ?  ·  A : Fais-moi un massage du cou d'une minute.",
      "V : Quel est ton meilleur souvenir coquin avec moi ?  ·  A : Chuchote-moi à l'oreille ce que tu veux me faire ce soir.",
      "V : Qu'est-ce qui t'excite le plus chez moi ?  ·  A : Fais-moi un strip-tease de 30 secondes (en musique, c'est mieux).",
      "V : As-tu déjà pensé à moi au travail de façon pas très sage ?  ·  A : Embrasse-moi à trois endroits que je choisis.",
      "V : Quelle tenue aimerais-tu me voir porter ?  ·  A : Mets-toi en sous-vêtements jusqu'au prochain tour.",
      "V : Qu'est-ce que tu n'as jamais osé me demander au lit ?  ·  A : Laisse-moi te bander les yeux jusqu'au prochain tour.",
      "V : Quel mot doux ou cru t'allume le plus ?  ·  A : Mordille mon oreille pendant 10 secondes.",
      "V : Plutôt dominer ou être dominé(e) ?  ·  A : Donne-moi un ordre que je dois exécuter tout de suite.",
      "V : Quelle est ta zone la plus sensible ?  ·  A : Fais glisser tes lèvres de mon cou à mon nombril.",
      "V : Quelle est la chose la plus folle que tu aimerais essayer avec moi ?  ·  A : Danse collé(e) contre moi pendant toute une chanson."
    ]
  },
  {
    title: "7 MINUTES AU PARADIS", type: "Classique", text: "Sept minutes. Des bisous. Pas un mot.",
    rules: [
      "Lancez le chrono de 7 minutes.",
      "Bisous, câlins et caresses autorisés, selon vos envies… mais interdit de parler.",
      "Le premier qui dit un mot avant la sonnerie perd."
    ],
    points: "1 point pour celui qui a gardé le silence.",
    timer: 420, stepLabel: "Paradis",
    rounds: ["C'est parti : plus un mot !"]
  }
];

const OREILLER_SHORT = [
  {
    title: "LE MOT-STOP", type: "Avant tout", text: "Un mot pour tout arrêter, sans discussion.",
    rules: [
      "Choisissez ensemble un mot rigolo qu'on ne dirait jamais par hasard : « ananas », « pastèque »…",
      "Si l'un de vous le dit pendant la partie, on arrête le jeu en cours tout de suite, sans se justifier.",
      "Scellez le pacte avec un bisou."
    ],
    points: "Mot choisi : 1 point pour chacun."
  },
  {
    title: "LE REGARD", type: "Duel", text: "Une minute les yeux dans les yeux.",
    rules: ["Allongez-vous face à face, à 20 centimètres, et lancez le chrono.", "Regardez-vous dans les yeux sans parler.", "Le premier qui rit ou détourne le regard perd."],
    points: "1 point pour le gagnant. Tenu tous les deux : 1 point chacun.",
    timer: 60
  },
  {
    title: "QUI CRAQUE EN PREMIER ?", type: "Tentation", text: "Si près… sans s'embrasser.",
    rules: ["Face à face, rapprochez vos lèvres millimètre par millimètre.", "Interdit de s'embrasser ; les mains restent sur le lit.", "Le premier qui craque et embrasse l'autre a perdu."],
    points: "1 point pour celui qui a résisté."
  },
  {
    title: "LA CUILLÈRE BAVARDE", type: "Tendresse", text: "Trois mots doux, dans le dos.",
    variantLabel: "Thème", variants: ["Trois choses que tu aimes chez l'autre", "Trois souvenirs préférés avec l'autre", "Trois envies pour demain", "Trois endroits où tu voudrais l'emmener", "Trois choses qu'il ou elle fait mieux que personne"],
    rules: ["Mettez-vous en cuillère.", "Celui qui est derrière chuchote trois choses sur le thème affiché.", "Échangez les places et recommencez."],
    points: "1 point pour chacun."
  },
  {
    title: "LE SOUFFLE", type: "Résistance", text: "Surtout, ne frissonne pas !",
    rules: ["L'un s'allonge, immobile, les yeux fermés. Lancez le chrono.", "L'autre souffle doucement sur sa nuque, son oreille et son ventre.", "S'il frissonne ou bouge avant la sonnerie, il perd. Puis échangez."],
    points: "Tenir jusqu'à la sonnerie : 1 point.",
    timer: 30
  },
  {
    title: "LE BAISER AU RALENTI", type: "Douceur", text: "Un baiser de 30 secondes.",
    rules: ["Lancez le chrono et embrassez-vous.", "Le baiser doit durer jusqu'à la sonnerie, le plus lentement possible.", "Celui qui accélère ou s'arrête avant perd."],
    points: "Tenu jusqu'au bout : 1 point pour chacun.",
    timer: 30
  },
  {
    title: "LA BATAILLE D'OREILLERS", type: "Duel", text: "Le gagnant choisit le prochain câlin.",
    rules: ["Chacun prend un oreiller.", "Lancez le chrono : bataille ! On vise le corps, jamais la tête.", "À la sonnerie, désignez ensemble le gagnant de la manche. Premier à 2 manches."],
    points: "1 point pour le gagnant… et le choix du câlin.",
    timer: 15, tally: { label: "Manches gagnées", perPlayer: true, max: 2 }
  },
  {
    title: "LA VOIX DE VELOURS", type: "Fou rire", text: "La notice la plus sexy du monde.",
    rules: ["Prenez un objet de la chambre avec une étiquette ou une notice.", "Chacun à son tour en lit quelques lignes avec la voix la plus sensuelle possible.", "Le premier qui éclate de rire perd."],
    points: "1 point pour le gagnant."
  },
  {
    title: "LA COUETTE CONQUISE", type: "Duel", text: "Toute la couette pour soi… ou presque.",
    rules: ["Chacun attrape un bout de la couette.", "À « 3 », tirez ! Le premier qui récupère toute la couette gagne.", "Le gagnant doit ensuite la partager… avec un câlin."],
    points: "1 point pour le gagnant."
  },
  {
    title: "LA PLUME", type: "Résistance", text: "45 secondes sans rire.",
    rules: ["L'un s'allonge sur le ventre. Lancez le chrono.", "L'autre lui caresse très lentement le bras puis le dos, du bout des ongles.", "Il doit tenir jusqu'à la sonnerie sans rire ni bouger. Puis échangez."],
    points: "Tenir jusqu'à la sonnerie : 1 point.",
    timer: 45
  },
  {
    title: "LE STRIP PIERRE-FEUILLE-CISEAUX", type: "Coquin", text: "Chaque manche perdue coûte un vêtement.",
    rules: ["Jouez à pierre-feuille-ciseaux.", "Le perdant de chaque manche enlève un vêtement de son choix (ou donne un bisou, si vous préférez).", "Notez les manches gagnées : le premier à 3 gagne."],
    points: "1 point pour le gagnant.",
    tally: { label: "Manches gagnées", perPlayer: true, max: 3 }
  },
  {
    title: "LE BAISER À LA CARTE", type: "Bisous", text: "Commande ton bisou.",
    variantLabel: "Exemple de commande", variants: ["Un bisou papillon, avec les cils", "Un bisou esquimau, nez contre nez", "Un bisou dans le cou", "Un baiser langoureux", "Un bisou surprise, où tu veux", "Un bisou sur chaque paupière"],
    rules: ["L'un annonce un type de bisou : papillon (avec les cils), esquimau (nez contre nez), dans le cou, langoureux, surprise…", "L'autre l'exécute.", "Trois commandes chacun."],
    points: "1 point pour chacun."
  },
  {
    title: "TROIS ENDROITS", type: "Bisous", text: "Montre où tu veux tes bisous.",
    rules: ["Chacun montre trois endroits où il aime être embrassé.", "L'autre embrasse chaque endroit, sans se presser.", "Puis échangez."],
    points: "1 point pour chacun."
  },
  {
    title: "LE PILOTE", type: "Guider", text: "Guide sa main, sans un mot.",
    rules: ["L'un prend la main de l'autre et lance le chrono.", "Il la guide là où il aime être caressé, sans parler, jusqu'à la sonnerie.", "Puis échangez les rôles."],
    points: "1 point pour chacun.",
    timer: 60
  },
  {
    title: "LE FANTASME CHUCHOTÉ", type: "Confidence", text: "Une envie, une phrase, à l'oreille.",
    rules: ["Chacun à son tour chuchote à l'oreille de l'autre une envie ou un fantasme, en une seule phrase.", "Interdit de commenter ou de juger : on répond juste par un bisou.", "On peut passer son tour, sans explication."],
    points: "1 point pour chacun."
  },
  {
    title: "LE FRISSONOMÈTRE", type: "Toucher", text: "Note tes frissons de 1 à 10.",
    rules: ["L'un caresse trois endroits du corps de l'autre, l'un après l'autre.", "L'autre donne une note de frisson de 1 à 10 pour chaque endroit.", "Puis échangez."],
    points: "L'endroit le mieux noté gagne un bisou bonus. 1 point pour la meilleure note."
  },
  {
    title: "SANS LES MAINS", type: "Défi", text: "Une minute, zéro main.",
    variantLabel: "À enlever", variants: ["Une chaussette", "Un bracelet ou une montre", "Un élastique à cheveux", "Un t-shirt", "Une paire de lunettes", "Un collier"],
    rules: ["L'un doit enlever à l'autre ce qui est affiché (🎲 pour changer).", "Lancez le chrono : il doit l'enlever sans utiliser ses mains.", "Puis échangez."],
    points: "Réussi avant la sonnerie : 1 point.",
    timer: 60
  },
  {
    title: "LE NOM DE CODE", type: "Complicité", text: "Un mot secret pour « j'ai envie de toi ».",
    rules: ["Chacun écrit en secret un mot ou un geste discret qui voudra dire « j'ai envie de toi ».", "Révélez vos propositions et choisissez ensemble la meilleure.", "Utilisez-la au moins une fois cette semaine, devant les autres."],
    points: "1 point pour celui dont la proposition est choisie.",
    answers: { count: 2, rows: 1, label: "Ton mot de code" }
  },
  {
    title: "LA RESPIRATION", type: "Tendresse", text: "Une minute, un seul souffle.",
    rules: ["Collez-vous l'un contre l'autre et lancez le chrono.", "Sans parler, essayez de respirer exactement au même rythme jusqu'à la sonnerie."],
    points: "Synchronisés jusqu'au bout : 1 point pour chacun.",
    timer: 60
  },
  {
    title: "LE PREMIER QUI BOUGE", type: "Tentation", text: "Immobiles… malgré la main.",
    rules: ["Allongez-vous l'un contre l'autre et lancez le chrono.", "L'un pose doucement sa main où il veut sur l'autre.", "Le premier qui bouge ou qui rit avant la sonnerie perd. Puis échangez."],
    points: "1 point pour le gagnant.",
    timer: 30
  },
  {
    title: "LE COMPLIMENT DE LA PEAU", type: "Compliments", text: "Trois compliments très précis.",
    rules: ["Chacun fait trois compliments sur le corps de l'autre, à l'oreille.", "Ils doivent être précis : « le grain de beauté sur ta nuque » plutôt que « tout ».", "Un compliment trop vague ne compte pas."],
    points: "Trois compliments valables : 1 point."
  },
  {
    title: "LA CHATOUILLE FATALE", type: "Fou rire", text: "Trouve son point faible.",
    rules: ["Le joueur indiqué lance le chrono et cherche l'endroit le plus chatouilleux de l'autre.", "Relancez le chrono et échangez.", "Celui qui a crié ou ri le plus fort perd."],
    points: "1 point pour le gagnant.",
    timer: 30
  },
  {
    title: "LE RÉVEIL IDÉAL", type: "Demain matin", text: "Comment veux-tu être réveillé(e) demain ?",
    rules: ["Chacun décrit en trois phrases son réveil idéal pour demain matin.", "L'autre dit s'il relève le défi."],
    points: "Défi accepté : 1 point… à condition de le faire !"
  },
  {
    title: "LE DERNIER VÊTEMENT", type: "Coquin", text: "Lentement, sans un mot.",
    rules: ["Chacun choisit un vêtement que l'autre doit lui enlever.", "L'autre l'enlève très lentement, sans parler.", "Puis échangez."],
    points: "1 point pour chacun."
  },

  // ——— NOUVEAUX ———
  {
    title: "LE GLAÇON", type: "Classique", text: "Passe-le sans le faire tomber.", need: "un glaçon",
    variantLabel: "Bonus", variants: ["Faites-le glisser sur le cou de l'autre avant de le passer", "Faites-le glisser le long de sa colonne vertébrale", "Faites-le fondre sur son ventre", "Passez-le derrière son oreille", "Faites-le glisser sur ses lèvres"],
    rules: ["L'un prend un glaçon entre ses lèvres.", "Faites-le passer de bouche à bouche, sans les mains, jusqu'à ce qu'il fonde.", "Bonus : faites ce qui est affiché avant de le passer (🎲 pour un autre bonus)."],
    points: "Celui qui fait tomber le glaçon donne 1 point à l'autre."
  },
  {
    title: "NI OUI NI NON… COQUIN", type: "Concentration", text: "Chaque « oui » ou « non » coûte un vêtement.",
    rules: ["Le joueur indiqué lance le chrono et pose des questions coquines.", "L'autre répond sans jamais dire « oui » ni « non ».", "À chaque erreur : un vêtement en moins. Puis échangez."],
    points: "Tenir jusqu'à la sonnerie : 1 point.",
    timer: 60
  },
  {
    title: "LES BONS POUR", type: "Coupons", text: "Trois coupons à utiliser cette semaine.",
    rules: [
      "Chacun écrit en secret trois « Bon pour… » : un massage, un petit-déjeuner au lit, un câlin de 10 minutes…",
      "Révélez-les, puis prenez l'écran en photo pour les garder.",
      "Chacun pourra utiliser un bon de l'autre quand il veut cette semaine (le mot-stop reste valable !)."
    ],
    points: "1 point pour chacun… à condition de les honorer !",
    answers: { count: 2, rows: 3, label: "Bon pour… (un par ligne)" }
  },
  {
    title: "CHICHE SOUS LA COUETTE ?", type: "Défi", text: "Quelles sont les chances que tu le fasses ?",
    variantLabel: "Idée de défi", variants: ["Chiche que tu dors nu(e) cette nuit ?", "Chiche que tu me fais un strip-tease de 30 secondes ?", "Chiche que tu m'envoies un message coquin demain au travail ?", "Chiche que tu portes ma chemise toute la soirée ?", "Chiche que tu me laisses te bander les yeux 5 minutes ?", "Chiche que tu me fais un massage de 10 minutes ?"],
    rules: [
      "L'un lance le défi coquin affiché (🎲 pour en changer) ou en invente un.",
      "L'autre choisit un nombre maximum entre 3 et 10.",
      "Comptez « 1, 2, 3 » et dites en même temps un nombre entre 1 et ce maximum.",
      "Même nombre ? Le défi doit être fait ! Puis échangez les rôles."
    ],
    points: "Défi réalisé : 1 point pour celui qui l'a fait."
  }
];

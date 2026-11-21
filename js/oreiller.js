// Sur l'oreiller : questions et mini-jeux à faire dans le lit, à deux.
// Une partie = 3 questions + 3 jeux longs + 4 jeux courts, mélangés.
// Les jeux longs utilisent les mêmes champs que MINI_LONG (voir mini-jeux.js).
// Les jeux courts : [TITRE, consigne, étiquette].

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
    hint: "Chacun votre tour : regarde le mot sans le montrer, puis dessine-le du bout du doigt sur le dos de l'autre. Il a 3 essais pour deviner. Bonne réponse : 1 point pour chacun.",
    timer: 45, secret: true, alternate: true, count: 6, stepLabel: "Dessin",
    rounds: [
      "Un cœur", "Une étoile", "Un soleil", "Une lune", "Un smiley", "Une maison",
      "Tes initiales", "Ses initiales", "Le mot OUI", "Le mot BISOU", "Le mot TOI", "Le mot ENCORE",
      "Le chiffre 69", "Une flèche vers le bas", "Une fleur", "Les lèvres d'un bisou", "Le mot NU", "Le mot CÂLIN"
    ]
  },
  {
    title: "OÙ T'AI-JE EMBRASSÉ ?", type: "Yeux fermés", text: "Un bisou, un seul indice : la sensation.",
    hint: "Celui qui ne joue pas ferme les yeux. L'autre regarde l'endroit indiqué, puis y dépose un bisou. Trouvé du premier coup : 1 point pour chacun. Chacun peut dire « pas là » à tout moment.",
    secret: true, alternate: true, count: 6, stepLabel: "Bisou",
    rounds: [
      "Le creux du poignet", "La paume de la main", "Le bout du nez", "Une paupière", "Le lobe de l'oreille", "La nuque",
      "L'épaule", "Le creux du coude", "Le genou", "La cheville", "Le ventre", "Le bas du dos",
      "La clavicule", "Le cou, juste sous l'oreille", "L'intérieur de la cuisse", "Le front", "Le menton", "La hanche"
    ]
  },
  {
    title: "LE MASSAGE À LA CARTE", type: "Détente", text: "Une minute de massage, pas une seconde de moins.",
    hint: "Chacun votre tour, offrez le massage indiqué pendant que le chrono tourne. Celui qui reçoit donne une note sur 10 : 8 ou plus, 1 point pour le masseur.",
    timer: 60, alternate: true, count: 4, stepLabel: "Massage",
    rounds: [
      "Massage des mains, doigt par doigt", "Massage des pieds", "Massage de la nuque et des épaules", "Massage du crâne, dans les cheveux",
      "Massage du dos, du haut vers le bas", "Massage des jambes, des chevilles jusqu'aux genoux", "Massage du visage, tout en douceur",
      "Massage du bas du dos", "Massage au choix de celui qui reçoit", "Massage avec seulement le bout des ongles", "Massage des cuisses", "Massage des fesses, sans rire"
    ]
  },
  {
    title: "LE CHEF D'ORCHESTRE", type: "Guider", text: "Tu donnes les ordres, l'autre obéit.",
    hint: "Le joueur indiqué guide l'autre uniquement à la voix : « plus lentement », « plus haut », « encore »… L'autre suit à la lettre jusqu'à la fin du chrono. Si tout s'est bien passé, 1 point pour chacun.",
    timer: 60, alternate: true, count: 4, stepLabel: "Partition",
    rounds: [
      "Guide ses caresses sur ton dos", "Guide ses bisous dans ton cou", "Guide ses mains dans tes cheveux", "Guide son massage de tes épaules",
      "Guide ses bisous sur ton visage", "Guide ses caresses le long de tes bras", "Guide ses mains sur ton ventre", "Guide ses bisous où tu veux",
      "Guide un baiser : rythme, durée, intensité", "Guide ses caresses sur tes jambes"
    ]
  },
  {
    title: "LE TRÉSOR SOUS LA COUETTE", type: "Cache-cache", text: "Chaud… tiède… brûlant !",
    hint: "Celui qui cache glisse l'objet indiqué quelque part sur lui ou sous la couette. L'autre cherche les yeux fermés, avec les mains. Le seul indice autorisé : « froid », « chaud » ou « brûlant ». Trouvé avant le chrono : 1 point pour le chercheur.",
    timer: 60, alternate: true, count: 4, stepLabel: "Trésor",
    rounds: [
      "Cache une chaussette", "Cache une bague ou un bracelet", "Cache un bonbon", "Cache un élastique à cheveux",
      "Cache un petit mot plié", "Cache une pièce de monnaie", "Cache une barrette ou une pince", "Cache un capuchon de stylo"
    ]
  },
  {
    title: "LE QUIZ EFFEUILLÉ", type: "Quiz coquin", text: "Mauvaise réponse ? Un vêtement en moins.",
    hint: "Chacun votre tour, réponds à la question sur l'autre. Bonne réponse : 1 point. Mauvaise réponse : tu enlèves un vêtement (ou tu donnes un bisou si tu n'as plus rien à enlever).",
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
    hint: "Lisez les deux choix, comptez jusqu'à trois et répondez ensemble. Même réponse : 1 point pour chacun. Réponse différente : à vous de négocier…",
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
    hint: "Lisez la question, comptez jusqu'à trois, puis montrez la bonne personne en même temps. Si vous êtes d'accord, 1 point pour chacun.",
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
    hint: "Lisez la phrase à voix haute. Celui qui l'a déjà fait donne un bisou à l'autre, où l'autre le veut. Celui qui a donné le moins de bisous à la fin gagne… ou perd, à vous de voir !",
    count: 8, stepLabel: "Aveu",
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
    hint: "Lisez le début de l'histoire, puis continuez-la une phrase chacun, à voix basse, à l'oreille de l'autre. Chaque phrase doit être un peu plus chaude que la précédente. Le premier qui rit perd le point.",
    timer: 90, alternate: true, count: 3, stepLabel: "Histoire",
    rounds: [
      "« Il pleuvait, la porte de la chambre d'hôtel venait de se refermer… »", "« Le dernier métro était parti, il ne restait qu'un taxi et une seule adresse… »",
      "« Elle avait laissé un petit mot sur l'oreiller : rejoins-moi à minuit… »", "« Le chalet était coupé du monde, et il n'y avait qu'un seul lit… »",
      "« Il était trois heures du matin quand j'ai senti ta main… »", "« On s'était promis d'être sages ce soir-là… »"
    ]
  },
  {
    title: "LES SENS EN ÉVEIL", type: "Yeux bandés", text: "Fermez les yeux, laissez faire.",
    hint: "Celui qui reçoit ferme les yeux (ou met un foulard). L'autre fait ce qui est indiqué. Celui qui reçoit doit deviner ce qui se passe. Bonne réponse : 1 point pour chacun.",
    timer: 45, alternate: true, count: 5, stepLabel: "Sensation",
    rounds: [
      "Fais-lui sentir quelque chose de la maison", "Fais-lui goûter quelque chose de sucré", "Passe un objet doux sur son bras", "Souffle doucement à un endroit de son corps",
      "Passe tes cheveux sur sa peau", "Fais-lui écouter un son de la pièce", "Pose quelque chose de froid sur sa peau", "Caresse-le ou la avec un tissu",
      "Fais-lui sentir ton parfum à un endroit de ton cou", "Fais-lui deviner avec quelle partie de ton corps tu le ou la touches"
    ]
  }
];

const OREILLER_SHORT = [
  ["LE MOT-STOP", "Avant de jouer, choisissez ensemble un mot rigolo qui veut dire « on arrête », sans discussion. Puis scellez-le avec un bisou.", "Avant tout"],
  ["LE REGARD", "Allongés face à face, à 20 centimètres, regardez-vous dans les yeux pendant une minute, sans parler. Le premier qui rit ou détourne les yeux perd.", "Duel"],
  ["QUI CRAQUE EN PREMIER ?", "Face à face, rapprochez vos lèvres millimètre par millimètre… sans vous embrasser. Le premier qui craque et embrasse l'autre a perdu.", "Tentation"],
  ["LA CUILLÈRE BAVARDE", "Mettez-vous en cuillère. Celui qui est derrière chuchote trois choses qu'il aime chez l'autre. Puis échangez les places.", "Tendresse"],
  ["LE SOUFFLE", "L'un reste immobile, les yeux fermés. L'autre souffle doucement sur sa nuque, son oreille et son ventre pendant 30 secondes. S'il frissonne ou bouge, il perd.", "Résistance"],
  ["LE BAISER AU RALENTI", "Faites un baiser qui dure 30 secondes, le plus lentement possible. Interdit d'accélérer.", "Douceur"],
  ["LA BATAILLE D'OREILLERS", "Trois manches de bataille d'oreillers. Le gagnant choisit le prochain câlin.", "Duel"],
  ["LA VOIX DE VELOURS", "Chacun lit la notice d'un objet de la chambre avec la voix la plus sensuelle possible. Le premier qui éclate de rire perd.", "Fou rire"],
  ["LA COUETTE CONQUISE", "Chacun tient un bout de la couette. À trois, le premier qui récupère toute la couette gagne… et doit la partager avec un câlin.", "Duel"],
  ["LA PLUME", "Du bout des ongles, l'un caresse très lentement le bras puis le dos de l'autre. L'autre doit tenir 45 secondes sans rire ni bouger.", "Résistance"],
  ["LE STRIP PIERRE-FEUILLE-CISEAUX", "Au meilleur des cinq manches. À chaque manche perdue, un vêtement en moins (ou un bisou, si vous préférez).", "Coquin"],
  ["LE BAISER À LA CARTE", "L'un annonce un type de bisou (papillon, esquimau, dans le cou, langoureux, surprise…), l'autre l'exécute. Trois chacun.", "Bisous"],
  ["TROIS ENDROITS", "Chacun montre trois endroits où il aime être embrassé. L'autre s'exécute, sans se presser.", "Bisous"],
  ["LE PILOTE", "Sans parler, l'un guide la main de l'autre là où il aime être caressé, pendant une minute. Puis échangez les rôles.", "Guider"],
  ["LE FANTASME CHUCHOTÉ", "Chacun chuchote à l'oreille de l'autre une envie ou un fantasme, en une seule phrase. Interdit de commenter, juste un bisou pour dire merci.", "Confidence"],
  ["LE FRISSONOMÈTRE", "L'un caresse trois endroits du corps de l'autre. L'autre donne une note de frisson de 1 à 10 pour chacun. Le meilleur endroit gagne un bisou de plus.", "Toucher"],
  ["SANS LES MAINS", "Interdit d'utiliser les mains : l'un doit enlever une chaussette, un bracelet ou un élastique à l'autre en moins d'une minute.", "Défi"],
  ["LE NOM DE CODE", "Inventez ensemble un mot de code discret pour vous dire « j'ai envie de toi » devant les autres.", "Complicité"],
  ["LA RESPIRATION", "Une minute de câlin sans parler, en essayant de respirer exactement au même rythme.", "Tendresse"],
  ["LE PREMIER QUI BOUGE", "Allongés l'un contre l'autre, l'un pose doucement sa main où il veut. Le premier qui bouge ou qui rit pendant 30 secondes perd.", "Tentation"],
  ["LE COMPLIMENT DE LA PEAU", "Chacun fait trois compliments très précis sur le corps de l'autre, à l'oreille. Interdit de dire « tout » !", "Compliments"],
  ["LA CHATOUILLE FATALE", "Trouvez l'endroit le plus chatouilleux de l'autre en 30 secondes. Puis échangez. Celui qui crie le plus fort perd.", "Fou rire"],
  ["LE RÉVEIL IDÉAL", "Chacun décrit en trois phrases comment il aimerait être réveillé demain matin. L'autre choisit s'il relève le défi.", "Demain matin"],
  ["LE DERNIER VÊTEMENT", "Chacun choisit un vêtement que l'autre doit lui enlever, lentement, sans rien dire.", "Coquin"]
];

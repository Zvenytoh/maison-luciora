export interface Artwork {
  slug: string;
  number: number;
  roman: string;
  name: string;
  motif: 'sun' | 'star' | 'moon' | 'strength' | 'world';
  keywords: string[];
  tagline: string;
  excerpt: string;
  meaning: string[];
  forSelf: string;
  forGift: string;
  details: { title: string; text: string }[];
}

export const artworks: Artwork[] = [
  {
    slug: 'le-soleil', number: 19, roman: 'XIX', name: 'Le Soleil', motif: 'sun',
    keywords: ['Clarté', 'Vitalité', 'Accomplissement'],
    tagline: 'La lumière après le doute.',
    excerpt: 'Une œuvre pour les moments de confiance retrouvée et les horizons qui s’éclaircissent.',
    meaning: [
      'Le Soleil évoque la clarté retrouvée, les liens sincères et l’élan qui apparaît lorsque l’on cesse de douter du chemin parcouru.',
      'Chez Maison Luciora, il devient un symbole de confiance, de vitalité et d’accomplissement. Une présence lumineuse, à retrouver du regard au fil des jours.',
      'Il peut accompagner une période heureuse, célébrer une réussite ou simplement rappeler qu’une part de lumière demeure après les passages plus incertains.'
    ],
    forSelf: 'Pour garder près de soi un symbole d’élan, de confiance et de lumière retrouvée.',
    forGift: 'Pour célébrer une réussite, un nouveau projet ou une personne qui apporte de la lumière autour d’elle.',
    details: [
      { title: 'Le visage solaire', text: 'Une présence sereine au centre de l’œuvre, comme un point de retour à soi.' },
      { title: 'Les rayons', text: 'Droits et ondulants, ils dessinent un mouvement continu, entre force et douceur.' },
      { title: 'L’arche', text: 'Une architecture ouverte qui accueille la lumière et donne au symbole sa place.' }
    ]
  },
  {
    slug: 'l-etoile', number: 17, roman: 'XVII', name: 'L’Étoile', motif: 'star',
    keywords: ['Espoir', 'Sérénité', 'Renouveau'],
    tagline: 'Ce qui commence doucement.',
    excerpt: 'Un repère paisible pour les nouveaux départs et les possibilités encore ouvertes.',
    meaning: [
      'L’Étoile parle de cette confiance discrète qui revient après une période de changement. Elle n’impose pas un chemin : elle laisse entrevoir une direction.',
      'Sa lumière calme évoque le renouveau, la générosité et le temps nécessaire pour retrouver un équilibre. Une façon de donner une place à ce qui peut encore grandir.',
      'Elle accompagne les commencements, les projets fragiles et les jours où l’on choisit de regarder un peu plus loin.'
    ],
    forSelf: 'Pour accueillir un nouveau chapitre et garder un repère de sérénité dans les moments de transition.',
    forGift: 'Pour un nouveau départ, une naissance, un déménagement ou une personne à qui l’on souhaite de beaux horizons.',
    details: [
      { title: 'L’étoile à huit branches', text: 'Une lumière centrale, assez claire pour guider, assez douce pour laisser rêver.' },
      { title: 'La constellation', text: 'Des points reliés comme autant de possibilités qui trouvent leur place.' },
      { title: 'Les lignes d’eau', text: 'Un mouvement paisible qui évoque la continuité et le renouvellement.' }
    ]
  },
  {
    slug: 'la-lune', number: 18, roman: 'XVIII', name: 'La Lune', motif: 'moon',
    keywords: ['Intuition', 'Sensibilité', 'Mystère'],
    tagline: 'Écouter ce qui se devine.',
    excerpt: 'Une invitation à laisser une place aux nuances, à l’imaginaire et à la vie intérieure.',
    meaning: [
      'La Lune évoque ce qui ne se laisse pas immédiatement expliquer. Elle parle de sensibilité, d’imagination et des paysages que l’on porte en soi.',
      'Son croissant laisse une part d’ombre autant qu’il révèle une lumière. Chez Maison Luciora, cette figure devient une invitation à accueillir les nuances.',
      'Elle peut accompagner une période de recherche, un geste créatif ou le besoin simple de faire davantage confiance à son regard.'
    ],
    forSelf: 'Pour donner une place à son intuition et à ce qui ne demande pas toujours à être expliqué.',
    forGift: 'Pour une personne sensible, un esprit créatif ou quelqu’un dont on aime la manière singulière de voir le monde.',
    details: [
      { title: 'Le croissant', text: 'Une forme incomplète qui rappelle que tout n’a pas besoin d’être révélé.' },
      { title: 'L’orbite', text: 'Une ligne délicate qui inscrit la lune dans un mouvement plus vaste.' },
      { title: 'Les étoiles', text: 'Des repères légers, dispersés dans l’espace comme une pensée qui se forme.' }
    ]
  },
  {
    slug: 'la-force', number: 11, roman: 'XI', name: 'La Force', motif: 'strength',
    keywords: ['Courage', 'Persévérance', 'Maîtrise'],
    tagline: 'La douceur est une force.',
    excerpt: 'Un symbole de courage tranquille, celui qui avance sans avoir besoin de s’imposer.',
    meaning: [
      'La Force représente un courage qui ne se mesure pas au bruit qu’il fait. Elle évoque la patience, la maîtrise de soi et la persévérance.',
      'Le lion rencontre ici une ligne végétale, plus souple. Leur dialogue traduit l’idée qu’une force durable peut aussi être attentive et douce.',
      'Cette œuvre peut rappeler un chemin traversé, soutenir un engagement ou honorer la ténacité de quelqu’un que l’on aime.'
    ],
    forSelf: 'Pour se rappeler le chemin parcouru et trouver dans la patience une manière de continuer.',
    forGift: 'Pour reconnaître un courage discret, un défi relevé ou la présence rassurante d’une personne proche.',
    details: [
      { title: 'Le lion', text: 'Une figure de courage et de présence, dessinée sans agressivité.' },
      { title: 'Le signe de l’infini', text: 'Une ligne continue, comme une persévérance qui se renouvelle.' },
      { title: 'Les feuillages', text: 'Le végétal apporte au symbole une souplesse et un rythme vivant.' }
    ]
  },
  {
    slug: 'le-monde', number: 21, roman: 'XXI', name: 'Le Monde', motif: 'world',
    keywords: ['Harmonie', 'Équilibre', 'Aboutissement'],
    tagline: 'Trouver sa place dans l’ensemble.',
    excerpt: 'Une œuvre pour les cycles qui s’achèvent et le sentiment d’être, enfin, à sa place.',
    meaning: [
      'Le Monde évoque l’aboutissement d’un parcours. Il ne raconte pas une perfection figée, mais un instant où les différentes parties d’une vie trouvent leur accord.',
      'La couronne végétale dessine un espace d’harmonie. Les lignes du globe relient les directions, comme les expériences qui composent une histoire personnelle.',
      'Cette figure accompagne les accomplissements, les retrouvailles et les étapes que l’on souhaite marquer avec gratitude.'
    ],
    forSelf: 'Pour célébrer une étape accomplie et garder une trace de ce qui trouve son équilibre.',
    forGift: 'Pour un diplôme, un projet achevé, un départ en voyage ou une nouvelle place trouvée dans le monde.',
    details: [
      { title: 'Le globe', text: 'Des lignes qui se croisent et relient les parties d’un même ensemble.' },
      { title: 'La couronne', text: 'Un cercle végétal qui accueille le symbole et évoque l’accomplissement.' },
      { title: 'Les quatre directions', text: 'Des repères pour penser l’équilibre comme une relation, toujours vivante.' }
    ]
  }
];

export const intentions = [
  { name: 'Amour', slug: 'le-soleil', text: 'Pour les liens qui éclairent.' },
  { name: 'Nouveau départ', slug: 'l-etoile', text: 'Pour ce qui commence doucement.' },
  { name: 'Confiance', slug: 'le-soleil', text: 'Pour retrouver sa lumière.' },
  { name: 'Protection', slug: 'la-force', text: 'Pour une présence rassurante.' },
  { name: 'Courage', slug: 'la-force', text: 'Pour la force de continuer.' },
  { name: 'Transformation', slug: 'l-etoile', text: 'Pour accueillir un nouveau chapitre.' },
  { name: 'Équilibre', slug: 'le-monde', text: 'Pour ce qui trouve son accord.' },
  { name: 'Accomplissement', slug: 'le-monde', text: 'Pour le chemin parcouru.' }
];

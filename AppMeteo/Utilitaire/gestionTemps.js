const jourSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi',
    'Dimanche'
];


let ajd = new Date();
let options = { weekday: 'long' };
let jourActuel = ajd.toLocaleDateString('fr-FR', options)
    // console.log(jourActuel, ajd);

// jourActuel = jourActuel.charAt.toUppercase() + jourActuel.slice(1);

let tabJourEnOrdre = jourSemaine.slice(jourSemaine.indexOf(jourActuel)).concat(jourSemaine.slice(0, jourSemaine.indexOf(jourActuel)));
//console.log(tabJourEnOrdre);

export default tabJourEnOrdre;
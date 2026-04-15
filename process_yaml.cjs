const fs = require('fs');

const filePath = '/opt/src/github/appfair/keepandroidopen.github.io/src/data/quotes/changeorg.yaml';
let content = fs.readFileSync(filePath, 'utf8');

// First, remove existing flags to start fresh
content = content.replace(/\n  flag: ".*"/g, '');

const parts = content.split('\n- content: |');
const output = [parts[0]];

const flaggedAuthors = {
  "Rain": { pattern: /\bfuck\b/i, flag: "contains profanity" },
  "WESLEY": { pattern: /\bfuck\b/i, flag: "contains profanity" },
  "Rishit": { pattern: /\bfuck\b/i, flag: "contains profanity" },
  "kossom": { pattern: /يا ولاد المرة المتناكة/i, flag: "contains profanity and vulgar language" },
  "梁健豪": { pattern: /谷歌我操你妈/i, flag: "contains profanity" },
  "Tiradentes": { pattern: /Drug drug drug/i, flag: "spam or completely nonsensical text" },
  "Daniel": { pattern: /prosecute the pedos/i, flag: "extreme rhetoric or crackpot theory" },
  "Kayleigh": { pattern: /f\*ck/i, flag: "contains profanity" },
  "Nathan": { pattern: /Run by camel-rider/i, flag: "contains racist or discriminatory remarks" },
  "Stinky": { pattern: /FARK YOU BLUDDY/i, flag: "contains profanity or vulgar language" },
  "John": { pattern: /dysgenic world order|retarded/i, flag: "contains offensive language and crackpot theories" },
  "Matheus": { pattern: /Pau no cu do Google/i, flag: "contains profanity" },
  "Nick": { pattern: /\bFUCK\b/i, flag: "contains profanity" },
  "Genital": { pattern: /./, flag: "author name is vulgar" },
  "Michael": { pattern: /\bfuck off\b|gargle my balls/i, flag: "contains profanity or vulgar language" },
  "Petunio": { pattern: /Beyblade burst/i, flag: "spam or completely nonsensical text" },
  "Maximov": { pattern: /chupa el pene/i, flag: "contains profanity or vulgar language" },
  "pissed": { pattern: /fucking idiots/i, flag: "contains profanity" },
  "Vance": { pattern: /GODDAMNED LIFE|ASSHOLE/i, flag: "contains profanity or vulgar language" },
  "Ben": { pattern: /pornographic Pokémon/i, flag: "contains profanity or vulgar language" },
  "Santiago": { pattern: /\bPeneeeeeee\b/i, flag: "contains profanity or vulgar language" },
  "Alexis": { pattern: /Clcsmrlptgfdp/i, flag: "spam or completely nonsensical text" },
  "Super": { pattern: /totalitarian government \(NWO\)/i, flag: "conspiracy theory" },
  "Shawn": { pattern: /stop fucking/i, flag: "contains profanity" },
  "Aline": { pattern: /\bFuck\b/i, flag: "contains profanity" },
  "Cameron": { pattern: /\bFuck\b/i, flag: "contains profanity" },
  "Austin": { pattern: /\bFuck\b/i, flag: "contains profanity" },
  "B": { pattern: /\bfuck\b/i, flag: "contains profanity" },
  "aldiyar": { pattern: /\bfuck off\b/i, flag: "contains profanity" },
  "Howard": { pattern: /fnck/i, flag: "contains profanity" },
  "Memo": { pattern: /Nazi policies/i, flag: "contains offensive language" },
  "Elías": { pattern: /\bFuck\b/i, flag: "contains profanity" },
  "Gabe": { pattern: /asfktfg/i, flag: "spam or completely nonsensical text" },
  "Ivan": { pattern: /dipshit cock sucker/i, flag: "contains profanity or vulgar language" },
  "Luis": { pattern: /chingas a tu madre/i, flag: "contains profanity or vulgar language" },
  "estilhaços": { pattern: /merdas|foder/i, flag: "contains profanity" },
  "Joseph": { pattern: /\bFuck\b/i, flag: "contains profanity" },
  "Lucca": { pattern: /fui estuprada/i, flag: "spam or nonsensical" },
  "dylan": { pattern: /vai se foder/i, flag: "contains profanity" },
  "Lukas": { pattern: /Vamo vê 12345678/i, flag: "spam or completely nonsensical text" },
  "Benicio": { pattern: /juegos polno/i, flag: "contains profanity or vulgar language" },
  "Hannah": { pattern: /I dont give a shit/i, flag: "contains profanity" },
  "Luerick": { pattern: /whatever the fuck/i, flag: "contains profanity" },
  "Chris": { pattern: /\bFuck\b/i, flag: "contains profanity" },
  "James": { pattern: /\bsuck ass\b/i, flag: "contains profanity" },
  "Bob": { pattern: /Vatican City/i, flag: "conspiracy theory" },
  "Fábio": { pattern: /\.\.\.\.\.\./, flag: "spam or completely nonsensical text" },
  "Andrey": { pattern: /https:\/\/c\.org/i, flag: "spam" },
  "Kleberson": { pattern: /Oi boa noite/i, flag: "spam" }
};

const seenContent = new Set();

for (let i = 1; i < parts.length; i++) {
  let block = parts[i];
  
  // Extract author
  const authorMatch = block.match(/\n  author: "(.*)"/);
  const author = authorMatch ? authorMatch[1] : null;
  
  // Extract content string
  const authorIndex = block.indexOf('\n  author:');
  const contentStr = block.substring(0, authorIndex).trim();

  let flag = null;

  if (author && flaggedAuthors[author]) {
    if (flaggedAuthors[author].pattern.test(contentStr)) {
      flag = flaggedAuthors[author].flag;
    }
  }

  if (!flag) {
    // Precise profanity check
    if (/\b(fuck|fucking|shit|asshole|pissed|dick|pussy|cunt|bastard|bitch|slut|whore|nigger|chink|kike|spic|faggot|retard|pendejo|mierda|foder|caralho|desgraça|porra|puta|mamada|pene|vagina|hentai)\b/i.test(contentStr)) {
       if (!contentStr.includes("enshittification")) {
         flag = "contains profanity or vulgar language";
       }
    }
  }

  // Check for repeated content
  if (!flag) {
    if (seenContent.has(contentStr)) {
      flag = "spam (duplicate content)";
    } else {
      seenContent.add(contentStr);
    }
  }

  if (flag) {
    const authorLineStart = block.indexOf('\n  author:');
    block = block.substring(0, authorLineStart) + `\n  flag: "${flag}"` + block.substring(authorLineStart);
  }
  
  output.push(block);
}

fs.writeFileSync(filePath, output.join('\n- content: |'), 'utf8');
console.log('Processed ' + (parts.length - 1) + ' quotes.');

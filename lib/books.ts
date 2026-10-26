export type Book={id:string;title:string;author:string;isbn?:string;cover?:string;topics:string[];status?:'Read'|'Reading'|'Want to Read';favorite?:boolean};
export type Profile={id:string;name:string;handle:string;bio:string;interests:string[];books:Book[];image:string;visibility:'public'|'private';demo:boolean;createdAt:string;topics?:string;cardImage?:string};
const rows:[string,string,string,string[]][]=[
['The Beginning of Infinity','David Deutsch','9780143121350',['Science','Philosophy']],
['Zero to One','Peter Thiel','9780804139298',['Startups','Investing']],
['Thinking, Fast and Slow','Daniel Kahneman','9780374533557',['Psychology','Science']],
['Sapiens','Yuval Noah Harari','9780062316097',['History','Philosophy']],
['The Creative Act','Rick Rubin','9780593652886',['Creativity','Design']],
['The Design of Everyday Things','Don Norman','9780465050659',['Design','Psychology']],
['Superintelligence','Nick Bostrom','9780198739838',['AI','Philosophy']],
['The Psychology of Money','Morgan Housel','9780857197689',['Investing','Psychology']],
['Atomic Habits','James Clear','9780735211292',['Psychology','Creativity']],
['Meditations','Marcus Aurelius','9780812968255',['Philosophy','History']],
['Dune','Frank Herbert','9780441172719',['Literature','Science']],
['A Brief History of Time','Stephen Hawking','9780553380163',['Science']],
['The Lean Startup','Eric Ries','9780307887894',['Startups','Design']],
['Ways of Seeing','John Berger','9780140135152',['Design','Creativity']],
['Man’s Search for Meaning','Viktor E. Frankl','9780807014271',['Philosophy','Psychology']],
['The Three-Body Problem','Cixin Liu','9780765382030',['Literature','Science']],
['Braiding Sweetgrass','Robin Wall Kimmerer','9781571313560',['Nature','Science','Philosophy']],
['The Left Hand of Darkness','Ursula K. Le Guin','9780441478125',['Literature','Philosophy']],
['Gödel, Escher, Bach','Douglas Hofstadter','9780465026562',['AI','Creativity','Science']],
['On Writing','Stephen King','9781439156810',['Literature','Creativity']],
['The Art of Gathering','Priya Parker','9781594634932',['Psychology','Creativity']],
['The Intelligent Investor','Benjamin Graham','9780060555665',['Investing']],
['Life 3.0','Max Tegmark','9781101970317',['AI','Robotics','Science']],
['The Innovators','Walter Isaacson','9781476708706',['Startups','Science','History']],
['Steal Like an Artist','Austin Kleon','9780761169253',['Creativity','Design']],
['The Overstory','Richard Powers','9780393356687',['Literature','Nature']],
['Invisible Women','Caroline Criado Perez','9781419735219',['Design','Science','Psychology']],
['The Gene','Siddhartha Mukherjee','9781476733524',['Science','History']],
['Deep Work','Cal Newport','9781455586691',['Creativity','Psychology']],
['The Republic','Plato','9780140455113',['Philosophy','History']]
];
export const books:Book[]=rows.map(([title,author,isbn,topics])=>({id:'isbn:'+isbn,title,author,isbn,topics,cover:`https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`,status:'Read'}));
export const interests=['AI','Philosophy','Startups','Design','Psychology','Science','Creativity','Literature','Investing','Robotics','Nature','History'];
export function infer(bs:Book[]){const counts=new Map<string,number>();bs.forEach(b=>b.topics.forEach(t=>counts.set(t,(counts.get(t)||0)+1)));return [...counts].sort((a,b)=>b[1]-a[1]).slice(0,5).map(([t])=>t)}
const people:[string,string,string,number[]][]=[
['Alex Chen','Builder of things. Collector of better questions.','San Francisco',[0,1,6,18,22,2,12,23]],
['Sofia Rivera','Finding the human in design, and the design in everything.','New York',[4,5,13,20,24,26,2,8]],
['Oliver Park','A little philosophy. A little science fiction. A lot of curiosity.','London',[0,3,9,10,11,15,17,18]],
['Maya Patel','Studying minds, making things, changing mine.','Toronto',[2,4,5,7,8,14,20,28]],
['Theo Brooks','What can nature teach us about the future?','Portland',[16,25,27,11,0,3]],
['Nora Kim','Technology is a human story.','Seoul',[6,18,22,23,5,26]],
['Sam Okafor','Building companies that deserve to exist.','Lagos',[1,12,7,21,23,8]],
['Emma Laurent','An artist with a very full nightstand.','Paris',[4,13,19,24,17,20]],
['Leo Martin','Exploring the universe from a small apartment.','Berlin',[0,11,15,18,22,27]],
['Priya Shah','Good questions make the best conversations.','Mumbai',[2,3,9,14,26,29]],
['James Wilson','Patient investing. Restless curiosity.','Boston',[1,7,21,2,12]],
['Ava Thompson','Stories are how we understand each other.','Melbourne',[10,17,19,25,14,3]],
['Daniel Wu','Robotics, minds, and the things between.','Taipei',[6,22,18,0,5,11]],
['Isabel Santos','Designing a more thoughtful everyday.','Lisbon',[5,13,24,26,4,16]],
['Noah Reed','Reading across disciplines, thinking across borders.','Amsterdam',[0,2,3,9,16,23,29]]];
export const demos:Profile[]=people.map(([name,bio,city,ids],i)=>({id:`demo-${i+1}`,name,handle:`${name.toLowerCase().replaceAll(' ','')}_demo`,bio:bio+' · '+city,books:ids.map((n,j)=>({...books[n],favorite:j<3})),interests:infer(ids.map(n=>books[n])),image:`/images/shelf-${i%3+1}.jpg`,visibility:'public',demo:true,createdAt:new Date(Date.UTC(2026,9,25-i)).toISOString()}));
export const sample:Profile={...demos[0],id:'sample',name:'Your sample shelf',handle:'sample',books:[0,1,2,3,6,18,22,4].map(n=>({...books[n]})),interests:infer([0,1,2,3,6,18,22,4].map(n=>books[n]))};
export function normalize(s:string){return s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]/g,'')}
function keys(b:Book){return [b.id,b.isbn?'isbn:'+b.isbn:'',`title:${normalize(b.title)}:${normalize(b.author)}`].filter(Boolean)}
export function sameBook(a:Book,b:Book){return keys(a).some(k=>keys(b).includes(k))}
function unique(bs:Book[]){return bs.filter((b,i)=>!bs.slice(0,i).some(x=>sameBook(x,b)))}
export function match(a:Profile,b:Profile){const aa=unique(a.books),bb=unique(b.books);const shared=aa.filter(x=>bb.some(y=>sameBook(x,y)));const sharedInterests=[...new Set(a.interests)].filter(t=>b.interests.includes(t));const bookScore=aa.length&&bb.length?2*shared.length/(aa.length+bb.length):0;const union=new Set([...a.interests,...b.interests]);const interestScore=union.size?sharedInterests.length/union.size:0;
// Transparent bag-of-topics cosine similarity. No per-match model calls.
const va:Record<string,number>={},vb:Record<string,number>={};aa.forEach(x=>x.topics.forEach(t=>va[t]=(va[t]||0)+1));bb.forEach(x=>x.topics.forEach(t=>vb[t]=(vb[t]||0)+1));const dot=Object.keys(va).reduce((s,t)=>s+va[t]*(vb[t]||0),0);const norm=Math.sqrt(Object.values(va).reduce((s,n)=>s+n*n,0)*Object.values(vb).reduce((s,n)=>s+n*n,0));const topicScore=norm?dot/norm:0;const score=Math.round((bookScore*.5+interestScore*.3+topicScore*.2)*100);return{score,shared,sharedInterests,bookScore,interestScore,topicScore,lowConfidence:Math.min(aa.length,bb.length)<5};}

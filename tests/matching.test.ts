import assert from 'node:assert/strict';
import {demos,sample,match,type Profile} from '../lib/books.ts';
assert.equal(demos.length,15);
assert.equal(match(sample,sample).score,100);
for(const p of demos){assert.equal(match(sample,p).score,match(p,sample).score);assert.ok(match(sample,p).score>=0&&match(sample,p).score<=100);}
const none:Profile={...sample,books:[],interests:[]};assert.equal(match(none,none).score,0);assert.equal(match(none,sample).lowConfidence,true);
const duplicate={...sample,books:[...sample.books,...sample.books]};assert.equal(match(duplicate,sample).score,100);
const other={...sample,books:[{id:'other',title:'Unrelated',author:'Someone',topics:['Nature']}],interests:['Nature']};assert.equal(match(sample,other).score,0);
const small={...sample,books:sample.books.slice(0,2)};assert.equal(match(small,sample).lowConfidence,true);
console.log('Matching checks passed: symmetry, bounds, identity, duplicates, empty/disjoint collections, confidence, and 15 demo profiles.');

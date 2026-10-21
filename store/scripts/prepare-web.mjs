// Copies the web build from the repo root (../index.html + icons) into ./www for Capacitor.
import {cpSync,mkdirSync,rmSync,existsSync} from 'node:fs';
rmSync('www',{recursive:true,force:true});
mkdirSync('www',{recursive:true});
for(const f of ['index.html','icon-180.png','icon-192.png','icon-512.png']){
  if(!existsSync('../'+f)){console.error('missing ../'+f);process.exit(1)}
  cpSync('../'+f,'www/'+f);
}
console.log('www ready');

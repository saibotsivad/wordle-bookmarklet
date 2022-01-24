# wordle-bookmarklet

Bookmarklet to show spoiler-avoiding Wordle tiles, style first seen on [Tom Francis' Twitter](https://twitter.com/Pentadact).

Instead of this:

```
Wordle 219 6/6

⬜⬜⬜⬜⬜
⬜⬜🟨⬜⬜
⬜🟨⬜🟩⬜
🟨🟨⬜⬜⬜
🟩⬜⬜⬜⬜
🟩🟩🟩🟩🟩
```

You can use this bookmarklet to generate this:

```
Wordle 219 6/6

⬛⬛⬛⬛⬛
⬛⬛2️⃣⬛⬛
⬛3️⃣⬛4️⃣⬛
4️⃣3️⃣⬛⬛⬛
1️⃣⬛⬛⬛⬛
🟩🟩🟩🟩🟩
```

Explanation: the 2️⃣ on the second line lets people know that the third letter of your second guess was the second letter of the solution.

## How to Use

Copy the minified code below, then add a bookmark to your browser and paste it in as the URL.

```
javascript:function betterTiles(){let e=[];window.document.querySelector("game-app").shadowRoot.querySelectorAll("game-row").forEach((t=>e.push(t.attributes.letters.textContent)));const t=()=>window.document.querySelector("game-app").shadowRoot.querySelector("game-page").querySelector("game-settings");t()||window.document.querySelector("game-app").shadowRoot.querySelector("#settings-button").click();const o=t().shadowRoot.querySelector("#puzzle-number").textContent.replace("#",""),r=["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣"],n=e.pop().split(""),l=e.reverse().map((e=>e.split("").map((e=>{const t=n.indexOf(e);return t>=0?r[t]:"⬛"})).join(""))).reverse().join("\n")+"\n"+n.map((()=>"🟩")).join(""),a=`Wordle ${o} ${e.length+1}/6\n`+l;console.log(a),(e=>{if(navigator.clipboard&&window.isSecureContext)return navigator.clipboard.writeText(e);{let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.left="-999999px",t.style.top="-999999px",document.body.appendChild(t),t.focus(),t.select(),new Promise(((e,o)=>{document.execCommand("copy")?e():o(),t.remove()}))}})(a)}betterTiles();
```

Once you've solved the Wordle puzzle, click on the bookmark and it'll copy the spoiler-avoiding version to your clipboard.

This version uses a white square instead of a black square, if you like it the original color better:

```
javascript:function betterTiles(){let e=[];window.document.querySelector("game-app").shadowRoot.querySelectorAll("game-row").forEach((t=>e.push(t.attributes.letters.textContent)));const t=()=>window.document.querySelector("game-app").shadowRoot.querySelector("game-page").querySelector("game-settings");t()||window.document.querySelector("game-app").shadowRoot.querySelector("#settings-button").click();const o=t().shadowRoot.querySelector("#puzzle-number").textContent.replace("#",""),r=["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣"],n=e.pop().split(""),l=e.reverse().map((e=>e.split("").map((e=>{const t=n.indexOf(e);return t>=0?r[t]:"⬜"})).join(""))).reverse().join("\n")+"\n"+n.map((()=>"🟩")).join(""),a=`Wordle ${o} ${e.length+1}/6\n`+l;console.log(a),(e=>{if(navigator.clipboard&&window.isSecureContext)return navigator.clipboard.writeText(e);{let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.left="-999999px",t.style.top="-999999px",document.body.appendChild(t),t.focus(),t.select(),new Promise(((e,o)=>{document.execCommand("copy")?e():o(),t.remove()}))}})(a)}betterTiles();
```

## Build

If you want to build from scratch, simply run `npm run build` and then take the output and add `javascript:` to the start. (That'll be the complete code.)

(I just make the white-square version manually, at the moment.)

## License

Published and released under the [Very Open License](http://veryopenlicense.com).

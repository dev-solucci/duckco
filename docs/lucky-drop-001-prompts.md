# Lucky Drop 001 — Prompts para IA de imagem

> Prompts para gerar a primeira coleção de lançamento da Duck Co. Escritos em
> inglês (os modelos respondem melhor). Mantêm o Luke real, a paleta exata e a
> direção Lucky Sport. Veja [`visual-reference.md`](./visual-reference.md) e a
> arte em [`/assets`](../assets).
>
> **Regra de ouro da consistência:** use a arte existente do Luke como imagem de
> referência (Midjourney `--cref` / "character reference", ou image reference no
> Flux / Nano / GPT Image). Assim a coleção sai com o MESMO pato, não um novo.
>
> **Paleta (cole quando precisar):** preto `#0E110C`, creme `#F6E7C5`, amarelo
> `#ECB71E`, verde `#2D783B`, verde escuro `#334023`, marrom `#5A3A25`.

---

## 0. Campanha de lançamento (key visual principal)

O visual de abertura do drop. A primeira aparição oficial.

```
Streetwear launch campaign key visual for "Duck Co. Lucky Drop 001". A confident
young model on a wet night city street, shot with direct on camera flash,
wearing an oversized cream t shirt and a black coach jacket, a black cap turned
back. Beside the model stands Luke, the lucky duck mascot: a vintage cartoon
style yellow duck with a sly confident smirk, bold thick outlines, original
character. Urban background: convenience store light, asphalt reflections, old
city facades. Color grade built on deep black, cream and a single punch of lucky
yellow. Premium streetwear editorial, raw but art directed, film grain. Heavy
condensed uppercase type space reserved for the logo. Vertical poster.
--ar 4:5 --style raw
```

Variação só do mascote (sem modelo): troque a pessoa por `Luke alone, full body,
hands in pockets, owning the street`.

---

## 1. Flat lay da coleção completa

Para o lookbook e o anúncio do drop.

```
Top down flat lay of a streetwear capsule collection on a duck cream paper
backdrop with subtle grain. Neatly arranged: a black oversized t shirt, a cream
t shirt, a grey hoodie with a small embroidered duck patch, a black cap with an
embroidered duck head, a black coach jacket, a pair of socks, and a set of
stickers of a cartoon duck. Cohesive palette of black, cream, lucky yellow and
money green. Small race plate number tags reading "001 / 250". Premium catalog
photography, soft even light, crisp focus. Vintage athletic mood.
--ar 1:1
```

---

## 2. Peças, uma a uma

Estilo "ghost mannequin" / produto limpo. Gere cada uma e depois aplique as
estampas reais (Luke e wordmark) no vetor para fidelidade total.

**Camiseta preta oversized (Luke nas costas)**
```
Product shot, back view, of an oversized heavyweight black t shirt on an
invisible mannequin against a warm cream background. Large back print of Luke,
a confident vintage cartoon yellow duck, original character, bold outlines.
Small "DUCK CO." chest tag visible at the nape. Premium streetwear, studio
light, soft shadow, fabric texture. --ar 4:5
```

**Camiseta creme Luke Classic (Too Lucky To Lose)**
```
Product shot, front view, of a cream heavyweight t shirt on an invisible
mannequin against a soft black background. Front print: Luke the lucky duck in a
confident pose, plus a heavy condensed uppercase slogan "TOO LUCKY TO LOSE".
Vintage cartoon meets streetwear, yellow, green and black inks on cream. Studio
product photography. --ar 4:5
```

**Moletom com patch bordado do Luke**
```
Product shot of a premium grey heavyweight hoodie, front view, invisible
mannequin, cream background. A small embroidered patch of a cartoon duck head on
the left chest, money green and yellow threads with black outline. Clean,
premium, soft studio light, visible loopback fleece and stitching detail.
--ar 4:5
```

**Boné com cabeça do Luke bordada**
```
Product shot of a black six panel cap, three quarter front view on a plain cream
background. Embroidered front logo: the head of a confident cartoon duck in
lucky yellow with black outline. Small side embroidery reading "TOO LUCKY TO
LOSE". Premium streetwear headwear, studio light, crisp stitching. --ar 1:1
```

**Jaqueta coach Lucky Duck Club**
```
Product shot, back view, of a black nylon coach jacket on an invisible
mannequin, cream background. Large back print: a vintage athletic crest reading
"LUCKY DUCK CLUB" with a small cartoon duck head in the center, cream and yellow
on black. Snap buttons, boxy fit, premium streetwear, studio light. --ar 4:5
```

**Meias com pegada de pato**
```
Product shot of a pair of cream ribbed crew socks on a black background, neatly
styled. Repeating small duck footprint motif in money green and a single lucky
yellow stripe at the top. Clean premium catalog photography, soft light.
--ar 1:1
```

**Pack de stickers do Luke**
```
Top down shot of a set of die cut vinyl stickers on a cream surface, featuring
several variations of Luke the lucky duck: classic, with sunglasses, running,
and a head logo. Bold vintage cartoon style, thick outlines, yellow green black
and cream. Glossy finish, subtle shadows. Sticker pack product photography.
--ar 1:1
```

---

## 3. On model (campanha de rua)

Para gerar o lookbook vestido. Repita trocando a peça em destaque.

```
Editorial streetwear photo, direct flash at night, a stylish young person on a
city street wearing [PEÇA da Duck Co.]. Natural confident posture, oversized
fit, cap, sneakers. Background: train station, convenience store, textured wall,
wet asphalt. Color grade of black, cream and lucky yellow. Real but strongly art
directed, film grain, no studio gloss. --ar 4:5 --style raw
```

Troque `[PEÇA]` por: `the black oversized tee`, `the cream Luke tee`, `the grey
duck hoodie`, `the black coach jacket`, `the black duck cap`.

---

## Dicas

- **Trave o Luke primeiro.** Use a arte de [`luke-front.svg`](../assets/luke-front.svg)
  e [`luke-avatar.svg`](../assets/luke-avatar.svg) como referência para o pato
  sair idêntico em toda a coleção.
- **Estampas com fidelidade total:** gere a peça em branco / mockup e aplique o
  Luke e o wordmark reais por cima no Photoshop ou no vetor. A IA erra texto e
  detalhe de logo.
- **Cores:** os modelos não acertam hex. Ajuste no final para bater com a paleta.
- **Ferramenta:** Midjourney ou Flux para campanha e mascote, Ideogram ou GPT
  Image quando precisar de texto legível na estampa.
- **Número do drop:** mantenha o selo de placa "001 / 250" como assinatura
  recorrente, igual ao site.

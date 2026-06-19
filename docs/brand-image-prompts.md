# Duck Co. — Prompts para IA de imagem

> Para gerar a marca (mascote Luke, símbolo, wordmark). Escritos em inglês
> (modelos respondem melhor). Tom da direção: ver [`visual-reference.md`](./visual-reference.md).
>
> **Qual ferramenta:** Midjourney/Flux = melhor ilustração do Luke. Ideogram/
> DALL·E/GPT-Image = melhor para LOGO com texto legível. Para vetor final,
> gere a referência e revetorize (Illustrator/recraft).

---

## 1. Luke Classic — mascote herói (o mais importante)

```
Original cartoon mascot of a confident, stylish duck named Luke for a
streetwear brand. Vintage 1930s rubber-hose cartoon DNA reinterpreted with
modern streetwear attitude — NOT Donald or Daffy, fully original character.
Charming, lucky, a little cocky, relaxed posture. Big expressive head, unique
short beak, confident half-lidded eyes, a small styled feather/quiff on top, a
sly malandro smirk. Wearing urban streetwear: oversized varsity jacket, a cap
tilted back, a thin chain. Bold clean thick outlines, strong silhouette,
slightly exaggerated proportions, flat color fills, subtle paper grain.
Limited palette: cream background (#F3E7CF), duck in lucky yellow (#F5B700),
black outlines, money green and street brown accents. Premium streetwear
mascot, sticker-ready, reads in a single color. Centered, full body,
front 3/4 view. Flat vector illustration, high contrast.
--ar 1:1 --style raw
```

**Variações** (troque o trecho do figurino/mood):
- _Luke Rich:_ `...trap aesthetic, sunglasses, gold chains and grills, money
  green background, victorious pose, chrome jewelry shine`
- _Luke Runner:_ `...athletic tracksuit and running sneakers, mid-stride,
  motion lines, sporty energy`
- _Luke Brasil:_ `...flip-flops, soccer jersey vibe, warm urban Brazilian
  street, playful malandragem, no caricature`
- _Bad Luck Luke:_ `...everything going wrong around him (broken umbrella,
  rain) but still looking stylish and unbothered, ironic`

---

## 2. Símbolo — cabeça do Luke (ícone da marca)

Para patch, bordado, favicon, sticker, etiqueta. Tem que funcionar minúsculo.

```
Minimal logo icon: the head of Luke the lucky duck, original streetwear
mascot. Confident half-lidded eyes, unique short beak, sly smirk, small styled
feather on top. Bold geometric thick outlines, ultra-strong silhouette,
single-color black on cream, no gradients, no shading. Designed to work as a
tiny embroidered patch and favicon. Iconic, clean, memorable, flat vector
emblem, centered on plain background.
--ar 1:1 --style raw
```

---

## 3. Wordmark / Logo (use Ideogram ou DALL·E p/ texto)

```
Streetwear brand wordmark logo, text "DUCK CO." in a heavy bold condensed
uppercase sans-serif, tight letter spacing, high visual weight, slight vintage
sport/varsity feel with subtle controlled imperfections. Premium urban finish,
not childish, not startup-generic. Black text on cream background. Below it a
small tagline "TOO LUCKY TO LOSE" in spaced-out condensed caps. Clean flat
vector logo lockup, centered.
```

**Selo circular (alternativo):**
```
Circular streetwear team emblem / badge. Outer ring text "LUCKY DUCK CLUB ·
DUCK CLOTHES COMPANY". Center: small bold head silhouette of Luke the duck.
Heavy condensed type, vintage athletic crest style, single color, black on
cream, flat vector, premium streetwear patch.
```

---

## 4. Brand sheet (character turnaround / model sheet)

Para travar o personagem antes de produzir os drops.

```
Character model sheet for Luke, an original streetwear duck mascot. Multiple
views: front, 3/4, side, and back of the same character. Plus a row of facial
expressions (confident, smirking, surprised, laughing). Consistent design:
bold thick outlines, flat colors, vintage-cartoon-meets-streetwear, cream
background, lucky yellow duck, black lines. Clean layout, labeled, reference
sheet style. Flat vector illustration.
--ar 16:9 --style raw
```

---

## Dicas

- **Consistência:** trave o Luke Classic primeiro; depois use a melhor imagem
  como referência (`--cref` no Midjourney / image reference) para as variações.
- **Cores fiéis:** os modelos erram hex — gere e ajuste a cor no vetor final
  para bater com `lucky-yellow #F5B700` e `duck-cream #F3E7CF`.
- **Originalidade:** sempre manter "original character, NOT Donald/Daffy" no
  prompt para evitar derivar de personagens existentes.
- **Vetor:** o uso final (silk, bordado, web) pede vetor — gere PNG de
  referência e revetorize.

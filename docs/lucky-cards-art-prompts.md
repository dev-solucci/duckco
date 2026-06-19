# Lucky Cards — Prompts para a arte das cartas

> Prompts para gerar a arte de cada carta do set Lucky Drop 001. Escritos em
> inglês (os modelos respondem melhor). Mantêm o Luke real, a paleta e a direção
> Lucky Sport. A arte entra na janela de arte da carta (ver
> [`Card.tsx`](../src/components/cards/Card.tsx)).
>
> **Consistência:** trave o Luke com [`luke-front.svg`](../assets/luke-front.svg)
> e [`luke-avatar.svg`](../assets/luke-avatar.svg) como referência (`--cref` no
> Midjourney, image reference no Flux / GPT Image). Assim sai o mesmo pato em
> toda a coleção.
>
> **Paleta:** preto `#0E110C`, creme `#F6E7C5`, amarelo `#ECB71E`, verde
> `#2D783B`, verde escuro `#334023`, marrom `#5A3A25`.
>
> **Formato:** a janela de arte é quase quadrada. Gere em `--ar 4:5` ou `1:1`,
> com o personagem centralizado e fundo simples (depois recorto para a moldura).

---

## 0. Estilo mestre (cole em toda carta)

```
Vintage 1930s rubber hose cartoon style reinterpreted as modern streetwear,
bold thick clean outlines, flat color fills, subtle paper grain, strong
silhouette, slightly exaggerated proportions, high contrast, premium trading
card art. Original characters, NOT Donald or Daffy. Limited palette of cream,
lucky yellow, money green and black.
```

---

## 1. Personas (as cartas herói)

Base: Luke, o pato amarelo, olhar confiante e malandro, bico curto único.

**Luke Classic** (Drop)
```
[estilo mestre] Luke the lucky duck, confident relaxed pose, cream v neck tee,
green shorts, backwards cap, flip flops, sly smirk. Centered hero portrait,
cream background. --ar 4:5
```

**Luke Rich** (Chrome, foil)
```
[estilo mestre] Luke the lucky duck in trap rich mode, gold chains, sunglasses,
grills, money green background with chrome shine, victorious confident pose.
--ar 4:5
```

**Luke Runner** (Drop)
```
[estilo mestre] Luke the lucky duck mid stride running, athletic tracksuit and
chunky sneakers, motion lines, sporty energy, dynamic pose. --ar 4:5
```

**Luke Tokyo** (Drop)
```
[estilo mestre] Luke the lucky duck, Japanese street fashion, oversized layered
pieces, side bag, patches, refined graphic background, fashion pose. --ar 4:5
```

**Luke London** (Drop)
```
[estilo mestre] Luke the lucky duck, grime street style, dark jacket, cap,
serious cold street attitude, cloudy muted background. --ar 4:5
```

**Luke Brasil** (Drop)
```
[estilo mestre] Luke the lucky duck, Brazilian street malandragem, soccer jersey
vibe, flip flops, warm sunny urban background, playful confident, no caricature.
--ar 4:5
```

**Bad Luck Luke** (Grail, foil, 1 of 1)
```
[estilo mestre] Luke the lucky duck having a chaotic unlucky day, broken
umbrella, black cat, rain, but still looking stylish and unbothered, ironic,
dramatic spotlight, premium 1 of 1 grail treatment. --ar 4:5
```

---

## 2. Gear (as peças do drop)

Mostrar a peça como produto ilustrado, no mesmo traço cartoon.

**Camiseta Preta Oversized** (Street)
```
[estilo mestre] An oversized black streetwear t shirt floating, with a small
Luke duck print on the chest, illustrated as a hero object, cream background.
--ar 4:5
```

**Moletom com Patch** (Drop)
```
[estilo mestre] A grey streetwear hoodie illustrated as a hero object, with an
embroidered Luke duck head patch on the chest, cream background. --ar 4:5
```

**Boné Cabeça do Luke** (Street)
```
[estilo mestre] A black streetwear cap illustrated as a hero object, with an
embroidered yellow Luke duck head on the front, cream background. --ar 4:5
```

**Jaqueta Coach Lucky Duck Club** (Chrome, foil)
```
[estilo mestre] A black coach jacket illustrated as a hero object, Lucky Duck
Club crest, chrome shine accents, money green background. --ar 4:5
```

---

## 3. Charms (os amuletos da sorte)

Objeto único, estilizado, brilho de carta colecionável.

**Trevo da Sorte** (Street)
```
[estilo mestre] A four leaf clover charm, bold cartoon style, glowing slightly,
cream background, simple iconic hero object. --ar 1:1
```

**Moeda da Virada** (Drop)
```
[estilo mestre] A lucky gold coin with a small Luke duck head stamped on it,
mid flip with motion arc, cream background, iconic hero object. --ar 1:1
```

**Número 7** (Grail, foil, 777 / 777)
```
[estilo mestre] A glowing golden number 7 as a premium grail charm, sparkles,
laurel and small diamonds, money green background, ornate 1 of 1 treatment.
--ar 1:1
```

---

## 4. Verso da carta (opcional, premium)

Para o baralho físico e a versão digital virada.

```
[estilo mestre] Trading card back design for "Lucky Cards by Duck Co". Centered
Luke duck head emblem, symmetrical pattern of small clovers, sevens and stars,
deep green and black with cream and yellow lines, ornate border. Flat vector.
--ar 5:7
```

---

## Dicas

- **Trave o Luke primeiro**, depois gere as personas usando essa arte como
  referência para o pato sair idêntico.
- **Fundo simples** (creme ou verde liso) facilita recortar para a janela de
  arte. Ou peça fundo transparente para PNG.
- **Foil:** as raras Chrome e Grail já têm o brilho holográfico no site; na arte,
  só pedir "chrome shine" / "grail treatment" reforça.
- **Cores:** ajuste o hex no final para bater com a paleta.
- **Onde entra no código:** a arte substitui o símbolo do Luke na janela de arte.
  Quando tiver os PNGs, adiciono um campo de imagem no `CardDef` e troco o
  placeholder pela arte real.

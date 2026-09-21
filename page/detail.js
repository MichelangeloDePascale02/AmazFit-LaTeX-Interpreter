import { createWidget, widget, text_style, align } from '@zos/ui'

Page({
  onInit(params) {
    try {
      this.steps = params ? JSON.parse(params) : ['No data']
    } catch (e) {
      this.steps = ['Error while reading data']
    }
  },

  parseLatex(text) {
    let parsed = text;

    // 0. Ritorni a capo espliciti
    parsed = parsed.replace(/\\\\/g, '\n');

    // 1. Integrali definiti senza graffe (es. \int_a^b)
    parsed = parsed.replace(/\\int_([^{}\s]+)\^([^{}\s]+)/g, '∫[$1 → $2]');

    // --- MOTORE INSIDE-OUT PER STRUTTURE ANNIDATE ---
    // Risolve sempre prima le graffe più interne (usando [^{}]+ che esclude le graffe)

    // 2. Limiti, Integrali e Somme con graffe
    while (/\\int_\{([^{}]+)\}\^\{([^{}]+)\}/.test(parsed)) {
      parsed = parsed.replace(/\\int_\{([^{}]+)\}\^\{([^{}]+)\}/g, '∫[$1 → $2]');
    }
    while (/\\sum_\{([^{}]+)\}\^\{([^{}]+)\}/.test(parsed)) {
      parsed = parsed.replace(/\\sum_\{([^{}]+)\}\^\{([^{}]+)\}/g, 'Σ[$1 → $2]');
    }
    while (/\\lim_\{([^{}]+)\}/.test(parsed)) {
      parsed = parsed.replace(/\\lim_\{([^{}]+)\}/g, 'lim[$1] ');
    }

    // 3. Apici e Pedici Multipli (es. ^{12} o _{i+1})
    const superscripts = {
      '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
      '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
      'n': 'ⁿ', 'i': 'ⁱ', 'x': 'ˣ', 'y': 'ʸ', '+': '⁺', '-': '⁻'
    };
    const subscripts = {
      '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
      '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
      '+': '₊', '-': '₋', 'a': 'ₐ', 'e': 'ₑ', 'h': 'ₕ', 'i': 'ᵢ',
      'j': 'ⱼ', 'k': 'ₖ', 'l': 'ₗ', 'm': 'ₘ', 'n': 'ₙ', 'o': 'ₒ',
      'p': 'ₚ', 'r': 'ᵣ', 's': 'ₛ', 't': 'ₜ', 'u': 'ᵤ', 'v': 'ᵥ',
      'x': 'ₓ', 'β': 'ᵦ', 'γ': 'ᵧ', 'ρ': 'ᵨ', 'φ': 'ᵩ', 'χ': 'ᵪ'
    };

    while (/\^{([^{}]+)}/.test(parsed) || /_{([^{}]+)}/.test(parsed)) {
      parsed = parsed.replace(/\^{([^{}]+)}/g, (match, group) => {
        const allExist = group.split('').every(c => superscripts[c]);
        return allExist ? group.split('').map(c => superscripts[c]).join('') : `^(${group})`;
      });
      parsed = parsed.replace(/_{([^{}]+)}/g, (match, group) => {
        const allExist = group.split('').every(c => subscripts[c]);
        return allExist ? group.split('').map(c => subscripts[c]).join('') : `_(${group})`;
      });
    }

    // 4. Radici e Frazioni (Ora supportano radici dentro frazioni, o frazioni dentro frazioni!)
    while (/\\sqrt\{([^{}]+)\}/.test(parsed)) {
      parsed = parsed.replace(/\\sqrt\{([^{}]+)\}/g, '√($1)');
    }
    while (/\\frac\{([^{}]+)\}\{([^{}]+)\}/.test(parsed)) {
      parsed = parsed.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '($1) / ($2)');
    }
    // --- FINE MOTORE INSIDE-OUT ---

    // 5. Apici/Pedici Singoli (es. ^2 o _x)
    parsed = parsed.replace(/\^([^{}\s])/g, (match, char) => superscripts[char] || `^${char}`);
    parsed = parsed.replace(/_([^{}\s])/g, (match, char) => subscripts[char] || `_${char}`);

    // 6. Frecce e Operatori Testuali
    parsed = parsed.replace(/<->/g, '↔');
    parsed = parsed.replace(/<=>/g, '⇔');
    parsed = parsed.replace(/->/g, '→');
    parsed = parsed.replace(/=>/g, '⇒');
    parsed = parsed.replace(/>=/g, '≥');
    parsed = parsed.replace(/<=/g, '≤');
    parsed = parsed.replace(/!=/g, '≠');
    parsed = parsed.replace(/\+-/g, '±');
    parsed = parsed.replace(/\*/g, '·');

    // 7. Simboli LaTeX Puri
    parsed = parsed.replace(/\\int/g, '∫');
    parsed = parsed.replace(/\\lim/g, 'lim');
    parsed = parsed.replace(/\\infty/g, '∞');
    parsed = parsed.replace(/\\Delta/g, 'Δ');
    parsed = parsed.replace(/\\partial/g, '∂');
    parsed = parsed.replace(/\\gamma/g, 'γ');
    parsed = parsed.replace(/\\beta/g, 'β');
    parsed = parsed.replace(/\\alpha/g, 'α');

    return parsed;
  },

  build() {
    createWidget(widget.TEXT, {
      x: 0, y: 30, w: 480, h: 40,
      text: 'Steps:',
      color: 0xaaaaaa,
      text_size: 24,
      align_h: align.CENTER_H
    })

    let currentY = 90;

    this.steps.forEach((step, index) => {
      const cleanString = this.parseLatex(step)

      const explicitNewLines = (cleanString.match(/\n/g) || []).length;
      const wrapLines = Math.floor(cleanString.length / 28);
      const estimatedLines = Math.max(explicitNewLines, wrapLines) + 1;
      // console.log("Indice " + (index + 1) + " explicitNewLines " + explicitNewLines);
      // console.log("Indice " + (index + 1) + " wrapLines " + wrapLines);

      // ALTEZZE RIDOTTE: 32 pixel per riga invece di 40, minimo 45px invece di 60px
      const stepHeight = Math.max(estimatedLines * 36, 10);

      createWidget(widget.TEXT, {
        x: 20,
        y: currentY,
        w: 440,
        h: stepHeight,
        text: `${index + 1}.  ${cleanString}`,
        color: 0xefefef,
        text_size: 26, // Font leggermente ridotto (da 28 a 26) per adattarsi allo spazio più stretto
        text_style: text_style.WRAP,
        align_h: align.CENTER_H // <-- Aggiunto allineamento centrato
      })

      // MARGINE RIDOTTO: solo 8 pixel di spazio tra un blocco e l'altro invece di 15
      currentY += stepHeight + 16;
    })

    createWidget(widget.TEXT, {
      x: 0, y: currentY, w: 480, h: 80, text: ''
    })
  }
})
import { createWidget, widget, text_style, align } from '@zos/ui'

Page({
  onInit(params) {
    try {
      this.steps = params ? JSON.parse(params) : ['No data']
    } catch (e) {
      this.steps = ['Error while reading data']
    }
  },

  parseLatex(latexString) {
    const superscripts = {
      '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', 
      '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', 
      'n': 'ⁿ', '+': '⁺', '-': '⁻'
    };
    const subscripts = {
      '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', 
      '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
      '+': '₊', '-': '₋'
    };

    let parsed = latexString
      .replace(/\\\\/g, '\n') // Gestione multiriga: il doppio backslash diventa a capo
      .replace(/\\alpha/g, 'α')
      .replace(/\\beta/g, 'β')
      .replace(/\\gamma/g, 'γ')
      .replace(/\\delta/g, 'δ')
      .replace(/\\epsilon/g, 'ε')
      .replace(/\\theta/g, 'θ')
      .replace(/\\pi/g, 'π')
      .replace(/\\sum/g, '∑')
      .replace(/\\int/g, '∫')
      .replace(/\\infty/g, '∞')
      .replace(/\\partial/g, '∂')
      .replace(/\\nabla/g, '∇')
      // Frecce e operatori testuali ASCII (Ordine dal più lungo al più corto)
      .replace(/<->/g, '↔')
      .replace(/<=>/g, '⇔')
      .replace(/->/g, '→')
      .replace(/=>/g, '⇒')
      .replace(/>=/g, '≥')
      .replace(/<=/g, '≤')
      .replace(/!=/g, '≠')
      .replace(/\\rightarrow/g, '→')
      .replace(/\\to/g, '→') // Comoda abbreviazione per la freccia destra
      .replace(/\\Rightarrow/g, '⇒')
      .replace(/\\leftarrow/g, '←')
      .replace(/\\Leftarrow/g, '⇐')
      .replace(/\\leftrightarrow/g, '↔')
      .replace(/\\Leftrightarrow/g, '⇔')
      .replace(/\+-/g, '±') // Digiti +- e ottieni ±
      .replace(/\*/g, '·')  // Digiti * e ottieni il punto centrale
      .replace(/\\sqrt{([^{}]+)}/g, '√($1)') // \sqrt{x} diventa √(x)

    // Frazioni: trasforma \frac{A}{B} in (A) / (B)
    parsed = parsed.replace(/\\frac{([^{}]+)}{([^{}]+)}/g, '($1) / ($2)');

    // Apici e pedici
    parsed = parsed.replace(/\^([0-9n\+\-])/g, (match, char) => superscripts[char] || match);
    parsed = parsed.replace(/_([0-9\+\-])/g, (match, char) => subscripts[char] || match);
    parsed = parsed.replace(/\^{([^}]+)}/g, (match, group) => group.split('').map(c => superscripts[c] || c).join(''));
    parsed = parsed.replace(/_{([^}]+)}/g, (match, group) => group.split('').map(c => subscripts[c] || c).join(''));

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
      const stepHeight = Math.max(estimatedLines * 34, 10);

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
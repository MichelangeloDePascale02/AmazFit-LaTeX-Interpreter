import { BaseSideService } from '@zeppos/zml/base-side'

AppSideService(
  BaseSideService({
    onInit() {
      // Invia aggiornamenti in tempo reale quando salvi dalle impostazioni
      settings.settingsStorage.addListener('change', ({ key, newValue }) => {
        if (key === 'formulas_list_string') {
          const topics = this.parseRawText(newValue)
          this.call({
            method: 'UPDATE_FORMULAS',
            params: topics
          })
        }
      })
    },

    onRequest(req, res) {
      // Invia i dati quando l'orologio li richiede esplicitamente
      if (req.method === 'GET_FORMULAS') {
        const raw = settings.settingsStorage.getItem('formulas_list_string') || '# Teorema Fondamentale\n\\int_a^b f(x)dx = F(b) - F(a)\nF\'(x) = f(x)\nQ.E.D.\n\n# Energia ed Impulso\nE = \\gamma m_0 c^2\np = \\gamma m_0 v'
        const topics = this.parseRawText(raw)
        res(null, { formulas: topics })
      }
    },

    // Il nuovo parser che converte il testo in oggetti { title, steps }
    parseRawText(raw) {
      if (!raw) return []
      const lines = raw.split('\n').map(l => l.trim())
      const topics = []
      let currentTopic = null

      for (const line of lines) {
        if (line.startsWith('#')) {
          // Se c'è già un topic aperto, salvalo prima di iniziarne uno nuovo
          if (currentTopic) topics.push(currentTopic)
          
          currentTopic = { 
            title: line.substring(1).trim(), // Rimuove il '#' e gli spazi
            steps: [] 
          }
        } else if (line.length > 0 && currentTopic) {
          // Aggiunge la riga come passaggio al topic corrente
          currentTopic.steps.push(line)
        }
      }
      
      // Salva l'ultimo topic elaborato
      if (currentTopic) topics.push(currentTopic)
      
      return topics
    }
  })
)
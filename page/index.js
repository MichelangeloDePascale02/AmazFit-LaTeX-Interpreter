import { createWidget, widget, align, deleteWidget } from '@zos/ui'
import { push } from '@zos/router'
import { BasePage } from '@zeppos/zml/base-page'
import { localStorage } from '@zos/storage'

Page(
  BasePage({
    state: {
      widgets: [],
      topics: []
    },

    onInit() {
      // 1. Carica la cache locale
      const savedData = localStorage.getItem('saved_topics')
      if (savedData) {
        try {
          this.state.topics = JSON.parse(savedData)
        } catch (e) {
          this.state.topics = []
        }
      }

    },

    // 2. Ascolta i push spontanei (DEVE stare fuori da onInit)
    onCall(req) {
      if (req.method === 'UPDATE_FORMULAS') {
        this.saveAndRender(req.params)
      }
    },

    build() {
      this.renderList()
    },

    // Sincronizzazione manuale Bluetooth
    fetchData() {
      this.state.topics = [{ title: 'Syncing...', steps: [] }]
      this.renderList()

      this.request({ method: 'GET_FORMULAS' })
        .then((data) => {
          if (data && data.formulas) {
            this.saveAndRender(data.formulas)
          }
        })
        .catch(err => {
          this.state.topics = [{ title: 'Phone companion app error...', steps: [] }]
          this.renderList()
        })
    },

    saveAndRender(newTopics) {
      this.state.topics = newTopics
      localStorage.setItem('saved_topics', JSON.stringify(newTopics))
      this.renderList()
    },

    renderList() {
      this.state.widgets.forEach(w => deleteWidget(w))
      this.state.widgets = []

      // Titolo fisso
      this.state.widgets.push(createWidget(widget.TEXT, {
        x: 0, y: 20, w: 480, h: 50,
        text: 'My files', color: 0xffffff, text_size: 28, align_h: align.CENTER_H
      }))

      // Tasto di sincronizzazione
      this.state.widgets.push(createWidget(widget.BUTTON, {
        x: 80, y: 80, w: 320, h: 50,
        text: '🔄 Sync', 
        color: 0xffffff, normal_color: 0x0055ff, press_color: 0x0033aa, radius: 25,
        click_func: () => this.fetchData()
      }))

      let startY = 150
      
      if (this.state.topics.length === 0) {
        this.state.widgets.push(createWidget(widget.TEXT, {
          x: 0, y: startY, w: 480, h: 50,
          text: 'No data. Please!', color: 0xaaaaaa, text_size: 26, align_h: align.CENTER_H
        }))
        return;
      }

      this.state.topics.forEach((topic, index) => {
        const btn = createWidget(widget.BUTTON, {
          x: 40, y: startY + (index * 80), w: 400, h: 65,
          text: topic.title, text_size: 26,
          color: 0xffffff, normal_color: 0x262626, press_color: 0x444444, radius: 16,
          click_func: () => {
            if (topic.title.includes('Sync') || topic.title.includes('error')) return;            
            // Passiamo l'array dei passaggi al dettaglio
            push({ 
              url: 'page/detail', 
              params: JSON.stringify(topic.steps) 
            })
          }
        })
        this.state.widgets.push(btn)
      })

      this.state.widgets.push(createWidget(widget.TEXT, {
        x: 0, y: startY + (this.state.topics.length * 80), w: 480, h: 80, text: ''
      }))
    }
  })
)
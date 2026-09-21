AppSettingsPage({
  build(props) {
    return View(
      { style: { padding: '16px', fontFamily: 'sans-serif', backgroundColor: '#ffffff' } },
      [
        // Titolo principale
        Text(
          { style: { fontSize: '24px', fontWeight: 'bold', color: '#222222', marginBottom: '20px', textAlign: 'center' } },
          ['Math Notes Configuration']
        ),

        // Scheda Istruzioni
        View(
          { style: { backgroundColor: '#f4f7f6', borderRadius: '12px', padding: '16px', marginBottom: '24px', border: '1px solid #e0e0e0' } },
          [
            Text({ style: { fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#0055ff' } }, ['📝 Syntax Guide']),
            Text({ style: { fontSize: '14px', color: '#444444', marginBottom: '6px' } }, ['• Use # for the Topic Title.']),
            Text({ style: { fontSize: '14px', color: '#444444', marginBottom: '6px' } }, ['• Write equations on the following lines.']),
            Text({ style: { fontSize: '14px', color: '#444444', marginBottom: '6px' } }, ['• Use \\\\ to force a new line within the same step.']),
            Text({ style: { fontSize: '14px', color: '#444444', marginBottom: '0px' } }, ['• Leave an empty line between different topics.'])
          ]
        ),

        // Etichetta Editor
        Text(
          { style: { fontSize: '16px', fontWeight: 'bold', color: '#333333', marginBottom: '8px' } },
          ['Your Formulas']
        ),

        // Area di Testo
        TextInput({
          label: '',
          settingsKey: 'formulas_list_string',
          multiline: true,
          rows: 15,
          placeholder: 'Type your math notes here...',
          value: props.settingsStorage.getItem('formulas_list_string') || '# Fundamental Theorem\n\\int_a^b f(x)dx = F(b) - F(a)\nF\'(x) = f(x)\nQ.E.D.\n\n# Energy & Momentum\nE = \\gamma m_0 c^2\np = \\gamma m_0 v',
          onChange: (value) => {
            props.settingsStorage.setItem('formulas_list_string', value)
          }
        }),
        
        // Footer esplicativo
        Text(
          { style: { fontSize: '12px', color: '#888888', marginTop: '16px', textAlign: 'center' } },
          ['Changes are saved automatically. Tap "Sync" on your watch to update the list.']
        )
      ]
    )
  }
})
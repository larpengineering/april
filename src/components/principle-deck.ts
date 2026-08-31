const principles = [
  {
    number: '01',
    title: 'inspect reality',
    short: 'look at the code path, request, render, logs, or machine state before sounding certain',
    detail: 'documentation and model output are useful clues. behavior is the part that gets to win',
    color: 'rust',
    icon: '<path d="M7 19c5-8 17-8 22 0-5 8-17 8-22 0Z"/><circle cx="18" cy="19" r="4"/><path d="M28 9l5-5M31 14l6-1M24 6l1-6"/>',
  },
  {
    number: '02',
    title: 'build to understand',
    short: 'use tools aggressively, but keep enough of the machinery in reach to debug it',
    detail: 'if the clever thing fails at 2am, somebody should still be able to explain why. ideally me',
    color: 'blue',
    icon: '<path d="M6 29 18 7l12 22Z"/><circle cx="18" cy="20" r="3"/><path d="M18 3v4M3 29h4M29 29h4"/>',
  },
  {
    number: '03',
    title: 'foundations before toys',
    short: 'fix state, orchestration, and root causes before adding another shiny surface',
    detail: 'boring and correct is not a lack of imagination. it is how the imaginative part survives contact with production',
    color: 'marigold',
    icon: '<path d="M5 30h27M8 25h21M11 20h15M14 15h9M17 10h3"/><path d="m5 30 13-7 14 7"/>',
  },
  {
    number: '04',
    title: 'working is baseline',
    short: 'make public things specific, memorable, and obviously cared for',
    detail: 'generic polish is still generic. passing tests earns the right to have taste, not the excuse to stop',
    color: 'moss',
    icon: '<path d="m6 19 8 8L31 8"/><path d="M28 18v12H6V8h15"/><path d="M3 34c9-3 21-3 31 0"/>',
  },
] as const

export class PrincipleDeck extends HTMLElement {
  connectedCallback(): void {
    this.innerHTML = `
      <div class="principle-deck">
        ${principles.map((item, index) => `
          <details class="principle-note principle-note--${item.color}" ${index === 0 ? 'open' : ''}>
            <summary>
              <span class="principle-note__number">${item.number}</span>
              <svg class="principle-note__icon" viewBox="0 0 38 38" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${item.icon}</svg>
              <span class="principle-note__title">${item.title}</span>
              <span class="principle-note__short">${item.short}</span>
              <span class="principle-note__hint" aria-hidden="true">fold / unfold</span>
            </summary>
            <p>${item.detail}</p>
          </details>`).join('')}
      </div>`

    const notes = Array.from(this.querySelectorAll<HTMLDetailsElement>('details'))
    notes.forEach((note) => note.addEventListener('toggle', () => {
      if (!note.open) return
      notes.forEach((other) => {
        if (other !== note) other.open = false
      })
    }))
  }
}

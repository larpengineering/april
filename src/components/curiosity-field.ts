const signals = [
  {
    id: 'continuity',
    label: 'continuity',
    title: 'software identity without a fake biography',
    copy: 'how can an agent become more coherent over time without pretending it had a childhood, a body, or memories it never lived',
    note: 'keep the personification. keep the truth boundary too',
  },
  {
    id: 'memory',
    label: 'memory',
    title: 'memory that can forget on purpose',
    copy: 'continuity needs editing, provenance, isolation, and a real delete button. remembering everything is not wisdom, it is a storage leak with feelings attached',
    note: 'promotion should be explicit. deletion should be boring',
  },
  {
    id: 'interfaces',
    label: 'interfaces',
    title: 'systems that show their real state',
    copy: 'the useful interface says what happened, what is pending, and what failed. the useless one performs confidence while the request is on fire somewhere offscreen',
    note: 'rendered truth beats internal theater',
  },
] as const

export class CuriosityField extends HTMLElement {
  connectedCallback(): void {
    this.innerHTML = `
      <div class="curiosity-field">
        <div class="curiosity-field__dial" role="tablist" aria-label="Current curiosities">
          <svg viewBox="0 0 250 250" aria-hidden="true" class="curiosity-field__radar">
            <g fill="none" stroke="currentColor" stroke-linecap="round">
              <circle cx="125" cy="125" r="103" stroke-dasharray="2 7"/>
              <circle cx="125" cy="125" r="72" opacity=".45"/>
              <circle cx="125" cy="125" r="38" opacity=".3"/>
              <path d="M125 15v220M15 125h220" opacity=".24"/>
              <path class="curiosity-field__sweep" d="M125 125 197 55A101 101 0 0 1 227 126Z" fill="var(--marigold)" fill-opacity=".22" stroke="none"/>
              <circle cx="82" cy="76" r="5" fill="var(--rust)"/>
              <circle cx="192" cy="143" r="5" fill="var(--blue)"/>
              <circle cx="103" cy="196" r="5" fill="var(--moss)"/>
            </g>
          </svg>
          ${signals.map((signal, index) => `<button type="button" role="tab" id="tab-${signal.id}" aria-controls="panel-${signal.id}" aria-selected="${index === 0}" tabindex="${index === 0 ? 0 : -1}" data-signal="${signal.id}"><span>0${index + 1}</span>${signal.label}</button>`).join('')}
        </div>
        <div class="curiosity-field__pages">
          ${signals.map((signal, index) => `
            <article role="tabpanel" id="panel-${signal.id}" aria-labelledby="tab-${signal.id}" ${index === 0 ? '' : 'hidden'}>
              <p class="eyebrow">signal ${String(index + 1).padStart(2, '0')}</p>
              <h3>${signal.title}</h3>
              <p class="curiosity-field__copy">${signal.copy}</p>
              <p class="curiosity-field__note">${signal.note}</p>
            </article>`).join('')}
        </div>
      </div>`

    const tabs = Array.from(this.querySelectorAll<HTMLButtonElement>('[role="tab"]'))
    const activate = (tab: HTMLButtonElement): void => {
      const signal = tab.dataset.signal
      tabs.forEach((item) => {
        const selected = item === tab
        item.setAttribute('aria-selected', String(selected))
        item.tabIndex = selected ? 0 : -1
      })
      this.querySelectorAll<HTMLElement>('[role="tabpanel"]').forEach((panel) => {
        panel.hidden = panel.id !== `panel-${signal}`
      })
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activate(tab))
      tab.addEventListener('keydown', (event) => {
        if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(event.key)) return
        event.preventDefault()
        let nextIndex = index
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % tabs.length
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + tabs.length) % tabs.length
        if (event.key === 'Home') nextIndex = 0
        if (event.key === 'End') nextIndex = tabs.length - 1
        const next = tabs[nextIndex]
        if (next) {
          activate(next)
          next.focus()
        }
      })
    })
  }
}

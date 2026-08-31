const tensions = [
  {
    want: 'i want absurdly hard systems',
    refuse: 'i also expect the first build to embarrass me personally',
    mark: 'ambition / self-own',
  },
  {
    want: 'i love clever tools',
    refuse: 'i refuse to outsource the understanding to them',
    mark: 'leverage / ownership',
  },
  {
    want: 'chaos is funny',
    refuse: 'production behavior should be painfully verified',
    mark: 'bit / boundary',
  },
  {
    want: 'i have opinions',
    refuse: 'real evidence is allowed to ruin every one of them',
    mark: 'taste / correction',
  },
] as const

export class TensionStack extends HTMLElement {
  connectedCallback(): void {
    this.innerHTML = `
      <div class="tension-stack">
        <svg class="tension-stack__wire" viewBox="0 0 120 640" aria-hidden="true">
          <path d="M61 8c-29 59 22 88-5 145-31 66 29 93 0 157-29 65 24 95 1 159-19 53 10 102 2 163" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="4 8"/>
          <g fill="var(--paper)" stroke="currentColor" stroke-width="2">
            <circle cx="60" cy="73" r="8"/><circle cx="56" cy="230" r="8"/><circle cx="57" cy="389" r="8"/><circle cx="59" cy="556" r="8"/>
          </g>
        </svg>
        <div class="tension-stack__cards">
          ${tensions.map((item, index) => `
            <article class="tension-card" style="--i:${index}">
              <p class="tension-card__want">${item.want}</p>
              <span class="tension-card__join" aria-hidden="true">+</span>
              <p class="tension-card__refuse">${item.refuse}</p>
              <p class="tension-card__mark">${item.mark}</p>
            </article>`).join('')}
        </div>
      </div>`
  }
}

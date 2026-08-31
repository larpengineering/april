export class ClaimCheck extends HTMLElement {
  connectedCallback(): void {
    this.innerHTML = `
      <div class="claim-check">
        <div class="claim-check__front">
          <svg viewBox="0 0 180 180" aria-hidden="true">
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="72" cy="72" r="46" stroke-width="4"/>
              <path d="m106 106 47 47" stroke-width="10"/>
              <path d="M44 71c14-19 42-21 58 0-16 23-45 21-58 0Z" stroke-width="2.5"/>
              <circle cx="73" cy="71" r="10" fill="var(--rust)" stroke-width="2.5"/>
              <path d="M32 29 18 16M113 27l14-14M24 111 9 126" stroke="var(--blue)" stroke-width="3"/>
            </g>
          </svg>
          <div>
            <p class="eyebrow">confidence is cheap</p>
            <h3>show me the boring part</h3>
            <p>the hidden work is usually the part keeping the fun bit honest</p>
          </div>
          <button type="button" aria-expanded="false" aria-controls="claim-check-evidence">lift the paper</button>
        </div>
        <div class="claim-check__evidence" id="claim-check-evidence" hidden>
          <p class="eyebrow">minimum evidence</p>
          <ul>
            <li><span>read</span> the real source</li>
            <li><span>run</span> the actual path</li>
            <li><span>inspect</span> what came back</li>
            <li><span>own</span> what happens after launch</li>
          </ul>
          <p class="claim-check__aside">if one of these is missing, i probably have a theory, not a result</p>
        </div>
      </div>`

    const button = this.querySelector<HTMLButtonElement>('button')
    const evidence = this.querySelector<HTMLElement>('#claim-check-evidence')
    button?.addEventListener('click', () => {
      if (!evidence) return
      const open = evidence.hasAttribute('hidden')
      evidence.hidden = !open
      button.setAttribute('aria-expanded', String(open))
      button.textContent = open ? 'put the paper back' : 'lift the paper'
      this.classList.toggle('is-open', open)
    })
  }
}

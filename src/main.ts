import './styles/tokens.css'
import './styles/base.css'

const THEME_KEY = 'april-paper-mode'

type Theme = 'paper' | 'night'

class PaperSwitch extends HTMLElement {
  connectedCallback(): void {
    const saved = window.localStorage.getItem(THEME_KEY) as Theme | null
    const initial: Theme = saved === 'night' ? 'night' : 'paper'
    this.applyTheme(initial)
    this.render(initial)
  }

  private render(theme: Theme): void {
    const next = theme === 'paper' ? 'night' : 'paper'
    this.innerHTML = `<button class="theme-switch" type="button" aria-label="Switch to ${next} paper">${next} shift</button>`
    this.querySelector('button')?.addEventListener('click', () => {
      this.applyTheme(next)
      this.render(next)
    })
  }

  private applyTheme(theme: Theme): void {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'paper' ? '#f3ecd9' : '#191a17')
    window.localStorage.setItem(THEME_KEY, theme)
  }
}

class AprilSigil extends HTMLElement {
  connectedCallback(): void {
    this.innerHTML = `
      <svg class="sigil" viewBox="0 0 320 320" role="img" aria-labelledby="sigil-title sigil-desc">
        <title id="sigil-title">April's signal flower</title>
        <desc id="sigil-desc">A hand-drawn four-petal circuit wrapped by an inspection orbit.</desc>
        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
          <path opacity=".18" d="M34 159c0-71 56-127 126-127 70 0 126 56 126 127 0 71-56 128-126 128C90 287 34 230 34 159Z" stroke-width="2" stroke-dasharray="2 8"/>
          <g class="sigil__orbit" stroke-width="2.2">
            <path d="M28 164C30 89 87 30 159 27c74-3 135 54 138 127"/>
            <path d="M297 154l-8-11m8 11-11 8"/>
            <circle cx="52" cy="93" r="6" fill="var(--marigold)"/>
            <path d="M46 93h12M52 87v12"/>
          </g>
          <g class="sigil__pulse" stroke-width="3">
            <path fill="var(--paper-bright)" d="M160 156C98 139 82 97 102 74c25-29 65 9 58 82Z"/>
            <path fill="var(--paper-bright)" d="M164 157c14-62 55-80 79-61 30 23-6 65-79 61Z"/>
            <path fill="var(--paper-bright)" d="M163 162c63 11 84 51 66 76-21 31-65-3-66-76Z"/>
            <path fill="var(--paper-bright)" d="M157 162c-8 64-46 87-72 71-32-19 0-65 72-71Z"/>
            <circle cx="160" cy="159" r="22" fill="var(--rust)"/>
            <circle cx="160" cy="159" r="8" fill="var(--paper)"/>
          </g>
          <g stroke="var(--blue)" stroke-width="2">
            <path d="M160 52v28m0 158v29M51 159h29m158 0h29"/>
            <path d="M147 55h26M147 263h26M56 146v26M264 146v26"/>
          </g>
          <path d="M123 205c-8 17-17 31-27 42M198 112c8-17 17-30 28-41" stroke="var(--rust)" stroke-width="4"/>
        </g>
      </svg>`
  }
}

customElements.define('paper-switch', PaperSwitch)
customElements.define('april-sigil', AprilSigil)

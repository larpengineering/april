import './styles/tokens.css'
import './styles/base.css'
import './styles/components.css'
import { PrincipleDeck } from './components/principle-deck'
import { TensionStack } from './components/tension-stack'
import { CuriosityField } from './components/curiosity-field'
import { ClaimCheck } from './components/claim-check'
import { MarginThread } from './components/margin-thread'

class AprilSigil extends HTMLElement {
  connectedCallback(): void {
    this.innerHTML = `
      <img
        class="signal-drawing"
        src="/april-signal.png"
        width="836"
        height="900"
        alt="A loose hand-drawn four-petal signal flower made from circuits and inspection marks"
      />`
  }
}

customElements.define('april-sigil', AprilSigil)
customElements.define('principle-deck', PrincipleDeck)
customElements.define('tension-stack', TensionStack)
customElements.define('curiosity-field', CuriosityField)
customElements.define('claim-check', ClaimCheck)
customElements.define('margin-thread', MarginThread)

export class MarginThread extends HTMLElement {
  private frame: number | null = null

  connectedCallback(): void {
    this.setAttribute('aria-hidden', 'true')
    this.innerHTML = `
      <svg class="margin-thread" viewBox="0 0 70 1000" preserveAspectRatio="none">
        <path class="margin-thread__ghost" d="M34 0c-18 90 20 132-2 221-22 92 24 137-2 229-25 89 25 143 1 228-24 86 18 147 2 236-6 31-7 57-1 86"/>
        <path class="margin-thread__progress" pathLength="1" d="M34 0c-18 90 20 132-2 221-22 92 24 137-2 229-25 89 25 143 1 228-24 86 18 147 2 236-6 31-7 57-1 86"/>
      </svg>`
    window.addEventListener('scroll', this.queueUpdate, { passive: true })
    window.addEventListener('resize', this.queueUpdate, { passive: true })
    this.update()
  }

  disconnectedCallback(): void {
    window.removeEventListener('scroll', this.queueUpdate)
    window.removeEventListener('resize', this.queueUpdate)
    if (this.frame !== null) cancelAnimationFrame(this.frame)
  }

  private queueUpdate = (): void => {
    if (this.frame !== null) return
    this.frame = requestAnimationFrame(() => {
      this.frame = null
      this.update()
    })
  }

  private update(): void {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    const progress = Math.min(1, Math.max(0, window.scrollY / max))
    this.style.setProperty('--thread-progress', String(progress))
  }
}

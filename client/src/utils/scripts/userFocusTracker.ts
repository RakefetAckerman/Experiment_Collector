class UserFocusTracker {
  private focusPercentage: number;
  private readonly maxFocus: number = 100.0;
  private readonly minFocus: number = 0.0;
  private readonly decayRate: number = 0.1; // Rate at which focus decreases over time
  private lastInteractionTime: number;

  constructor() {
    this.focusPercentage = this.maxFocus; // Start with max focus
    this.lastInteractionTime = Date.now();

    this.initEventListeners();
    this.startFocusDecay();
  }

  private initEventListeners() {
    document.addEventListener("click", () => this.increaseFocus(10));
    document.addEventListener("scroll", () => this.increaseFocus(5));
    document.addEventListener("keypress", () => this.increaseFocus(15));
    document.addEventListener("mousemove", () => this.increaseFocus(2));
    document.addEventListener("touchstart", () => this.increaseFocus(10));
  }

  private increaseFocus(value: number) {
    const now = Date.now();
    const timeElapsed = (now - this.lastInteractionTime) / 1000; // in seconds

    // Increase focus based on user interaction
    this.focusPercentage = Math.min(
      this.maxFocus,
      this.focusPercentage + value - this.decayRate * timeElapsed
    );

    this.lastInteractionTime = now;
    this.updateDisplay();
  }

  private startFocusDecay() {
    setInterval(() => {
      const now = Date.now();
      const timeElapsed = (now - this.lastInteractionTime) / 1000; // in seconds

      // Decrease focus over time if no interaction
      if (timeElapsed > 1) {
        this.focusPercentage = Math.max(
          this.minFocus,
          this.focusPercentage - this.decayRate * timeElapsed
        );
        this.updateDisplay();
      }
    }, 1000); // Check every second
  }

  private updateDisplay() {
    // Update the display of the focus percentage
    console.log(`Current focus: ${this.focusPercentage.toFixed(2)}%`);
    // You can also update a DOM element or use other methods to display the value
  }

  public getCurrentFocus() {
    return this.focusPercentage;
  }
}

export default UserFocusTracker;

let highestZ = 1;

class Paper {
  holdingPaper = false;
  mouseTouchX = 0;
  mouseTouchY = 0;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    // Mouse Move Event
    document.addEventListener('mousemove', (e) => {
      this.handleMouseMove(e, paper);
    });

    // Touch Move Event
    document.addEventListener('touchmove', (e) => {
      this.handleTouchMove(e, paper);
    });

    // Mouse Down Event
    paper.addEventListener('mousedown', (e) => {
      this.handleMouseDown(e, paper);
    });

    // Touch Start Event
    paper.addEventListener('touchstart', (e) => {
      this.handleTouchStart(e, paper);
    });

    // Mouse Up Event
    window.addEventListener('mouseup', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });

    // Touch End Event
    window.addEventListener('touchend', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });
  }

  handleMouseMove(e, paper) {
    if (!this.rotating) {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;

      this.velX = this.mouseX - this.prevMouseX;
      this.velY = this.mouseY - this.prevMouseY;
    }

    const dirX = this.mouseX - this.mouseTouchX;
    const dirY = this.mouseY - this.mouseTouchY;
    const dirLength = Math.sqrt(dirX * dirX + dirY * dirY);
    const dirNormalizedX = dirX / dirLength;
    const dirNormalizedY = dirY / dirLength;

    const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
    let degrees = 180 * angle / Math.PI;
    degrees = (360 + Math.round(degrees)) % 360;
    if (this.rotating) {
      this.rotation = degrees;
    }

    if (this.holdingPaper) {
      if (!this.rotating) {
        this.currentPaperX += this.velX;
        this.currentPaperY += this.velY;
      }
      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;

      paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
    }
  }

  handleTouchMove(e, paper) {
    const touch = e.touches[0]; // Get the first touch point
    this.mouseX = touch.clientX;
    this.mouseY = touch.clientY;

    if (this.holdingPaper) {
      this.currentPaperX += this.mouseX - this.prevMouseX;
      this.currentPaperY += this.mouseY - this.prevMouseY;

      paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
    }

    this.prevMouseX = this.mouseX;
    this.prevMouseY = this.mouseY;

    // Prevent scrolling when dragging
    e.preventDefault();
  }

  handleMouseDown(e, paper) {
    if (this.holdingPaper) return;
    this.holdingPaper = true;

    paper.style.zIndex = highestZ;
    highestZ += 1;

    if (e.button === 0) {
      this.mouseTouchX = this.mouseX;
      this.mouseTouchY = this.mouseY;
      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;
    }
    if (e.button === 2) {
      this.rotating = true;
    }
  }

  handleTouchStart(e, paper) {
    if (this.holdingPaper) return;
    this.holdingPaper = true;

    paper.style.zIndex = highestZ;
    highestZ += 1;

    const touch = e.touches[0]; // Get the first touch point
    this.mouseTouchX = touch.clientX;
    this.mouseTouchY = touch.clientY;
    this.prevMouseX = this.mouseTouchX;
    this.prevMouseY = this.mouseTouchY;
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});

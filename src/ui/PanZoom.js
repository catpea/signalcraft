/*


<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  #panZoomContainer {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: relative;
  }

  #content {
    transform-origin: 0 0;
    transition: transform 0.5s ease-out;
  }
</style>
</head>
<body>
<pan-zoom>
  <div style="width: 200%; height: 200%;">
    <!-- Your large content goes here -->
    <img src="your-large-image.jpg" alt="Large Image">
  </div>
</pan-zoom>

*/

class PanZoom extends HTMLElement {
    constructor() {
      super();

      // Create a shadow DOM for encapsulation
      this.attachShadow({ mode: 'open' });

      // Create container for pan and zoom
      const panZoomContainer = document.createElement('div');
      panZoomContainer.id = 'panZoomContainer';

      // Create content container
      const contentContainer = document.createElement('div');
      contentContainer.id = 'content';

      // Append content to the container
      const content = this.querySelector('div');
      contentContainer.appendChild(content.cloneNode(true));

      // Append content container to panZoomContainer
      panZoomContainer.appendChild(contentContainer);

      // Append panZoomContainer to the shadow DOM
      this.shadowRoot.appendChild(panZoomContainer);

      // Set initial scale and position
      this.scale = 1;
      this.translateX = 0;
      this.translateY = 0;

      // Add event listeners for drag and zoom
      panZoomContainer.addEventListener('mousedown', this.handleMouseDown.bind(this));
      window.addEventListener('mouseup', this.handleMouseUp.bind(this));
      panZoomContainer.addEventListener('wheel', this.handleWheel.bind(this));
    }

    connectedCallback() {
      this.updateTransform();
    }

    handleMouseDown(event) {
      this.isDragging = true;
      this.startX = event.clientX - this.translateX;
      this.startY = event.clientY - this.translateY;
      window.addEventListener('mousemove', this.handleMouseMove.bind(this));
    }

    handleMouseMove(event) {
      if (!this.isDragging) return;

      this.translateX = event.clientX - this.startX;
      this.translateY = event.clientY - this.startY;
      this.updateTransform();
    }

    handleMouseUp() {
      this.isDragging = false;
      window.removeEventListener('mousemove', this.handleMouseMove.bind(this));
    }

    handleWheel(event) {
      event.preventDefault();

      const zoomSpeed = 0.02;
      const delta = event.deltaY > 0 ? 1 + zoomSpeed : 1 - zoomSpeed;

      this.scale *= delta;
      this.updateTransform();
    }

    updateTransform() {
      this.shadowRoot.getElementById('content').style.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`;
    }
  }

  customElements.define('pan-zoom', PanZoom);

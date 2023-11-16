// Import utility functions from utils.js
import { calcWinsize, getCursorPos, lerp, map } from './utils.js';

// Calculate the viewport size
let winsize = calcWinsize();
// Add an event listener to re-calculate the viewport size when the window is resized
window.addEventListener('resize', () => winsize = calcWinsize());

// Initialize the cursor position to the center of the viewport
let cursor = {x: winsize.width/2, y: winsize.height/2};
// Update the cursor position on mouse move
window.addEventListener('mousemove', ev => cursor = getCursorPos(ev));

// Export the InteractiveTilt class
export class InteractiveTilt {
    // Object to hold references to DOM elements
    DOM = {
        el: null, // Main element (.content)
        wrapEl: null // Wrap element (.content__img-wrap)
    };

    // Default options for the InteractiveTilt effect
    defaults = {
        perspective: 800, // CSS perspective value for the 3D effect
        // Range of values for translation and rotation on x and y axes
        valuesFromTo: {
            x: [-35, 35],
            y: [-35, 35],
            rx: [-18, 18], // rotation on the X-axis
            ry: [-10, 10], // rotation on the Y-axis
            rz: [-4, 4]   // rotation on the Z-axis
        },
        // Amount to interpolate values for smooth animation (higher value, less smoothing)
        amt: 0.1
    };

    // Object to store the current transform values for the image element
    imgTransforms = {x: 0, y: 0, rx: 0, ry: 0, rz: 0};

    /**
     * Constructor for the InteractiveTilt class.
     * @param {Element} DOM_el - The .content element to be animated
     * @param {Object} options - Custom options for the effect
     */
    constructor(DOM_el, options) {
        // Assign DOM elements to the DOM object
        this.DOM.el = DOM_el;
        this.DOM.wrapEl = this.DOM.el.querySelector('.content__img-wrap');
        // Merge the default options with any user-provided options
        this.options = Object.assign(this.defaults, options);
        
        // If a perspective value is provided, apply it to the main element
        if (this.options.perspective) {
            this.DOM.el.style.perspective = `${this.options.perspective}px`;
        }

        // Start the rendering loop for the animation
        requestAnimationFrame(() => this.render());
    }
    
    /**
     * Animation loop that applies the tilt effect based on the cursor position.
     */
    render() {
        // Interpolate the current transform values towards the target values
        // based on the cursor's position on the screen
        this.imgTransforms.x = lerp(this.imgTransforms.x, map(cursor.x, 0, winsize.width, this.options.valuesFromTo.x[0], this.options.valuesFromTo.x[1]), this.options.amt);
        this.imgTransforms.y = lerp(this.imgTransforms.y, map(cursor.y, 0, winsize.height, this.options.valuesFromTo.y[0], this.options.valuesFromTo.y[1]), this.options.amt);
        this.imgTransforms.rz = lerp(this.imgTransforms.rz, map(cursor.x, 0, winsize.width, this.options.valuesFromTo.rz[0], this.options.valuesFromTo.rz[1]), this.options.amt);

        // Apply rotation on the X and Y-axis only if perspective is enabled
        this.imgTransforms.rx = !this.options.perspective ? 0 : lerp(this.imgTransforms.rx, map(cursor.y, 0, winsize.height, this.options.valuesFromTo.rx[0], this.options.valuesFromTo.rx[1]), this.options.amt);
        this.imgTransforms.ry = !this.options.perspective ? 0 : lerp(this.imgTransforms.ry, map(cursor.x, 0, winsize.width, this.options.valuesFromTo.ry[0], this.options.valuesFromTo.ry[1]), this.options.amt);
        
        // Apply the calculated transform values to the wrap element to create the 3D tilt effect
        this.DOM.wrapEl.style.transform = `translateX(${this.imgTransforms.x}px) translateY(${this.imgTransforms.y}px) rotateX(${this.imgTransforms.rx}deg) rotateY(${this.imgTransforms.ry}deg) rotateZ(${this.imgTransforms.rz}deg)`;
        
        // Continue the loop with the next animation frame
        requestAnimationFrame(() => this.render());
    } 
}
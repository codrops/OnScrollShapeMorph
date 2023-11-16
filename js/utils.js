/**
 * Preloads images specified by the CSS selector.
 * @function
 * @param {string} [selector='img'] - CSS selector for target images.
 * @returns {Promise} - Resolves when all specified images are loaded.
 */
const preloadImages = (selector = 'img') => {
    return new Promise((resolve) => {
        // The imagesLoaded library is used to ensure all images (including backgrounds) are fully loaded.
        imagesLoaded(document.querySelectorAll(selector), {background: true}, resolve);
    });
};

/**
 * Linear interpolation
 * @param {Number} a - first value to interpolate
 * @param {Number} b - second value to interpolate 
 * @param {Number} n - amount to interpolate
 */
const lerp = (a, b, n) => (1 - n) * a + n * b;

 /**
  * Gets the cursor position
  * @param {Event} ev - mousemove event
  */
const getCursorPos = ev => {
     return { 
         x : ev.clientX, 
         y : ev.clientY 
     };
 };

/**
 * Map number x from range [a, b] to [c, d] 
 */
const map = (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c;

/**
 * Calculates the viewport size
 */
const calcWinsize = () => {
    return {
        width: window.innerWidth, 
        height: window.innerHeight
    }
}

// Exporting utility functions for use in other modules.
export {
    preloadImages,
    lerp,
    getCursorPos,
    map,
    calcWinsize
};

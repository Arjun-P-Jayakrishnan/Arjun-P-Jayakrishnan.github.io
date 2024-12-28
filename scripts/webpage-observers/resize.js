
/**
 * @description adds a resize
 * @param {(event)=>void} fn  callback function 
 */
export function resizeObserver(fn) {
  window.addEventListener("resize", (event) => {
    //console.log("resize",event);
    fn(event)
  });
}

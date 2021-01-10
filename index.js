const postcss = require('postcss');

/**
 * Check if selector contains `[deep]`
 * @param  {String} selector
 * @return {Boolean}
 */
function hasDeep(selector) {
  return /\[deep\]/.test(selector) || /::ng-deep/.test(selector)
}

/**
 * Returns selector: removes `[deep]` and all subsequent `[_ngcontent-*]` instances
 * @param  {String} selector
 * @return {String}
 */
function getChangedDeepSelector(selector) {
  const [start, deep] = selector.split(/\[deep\]|::ng-deep/)
  return (start + deep.replace(/\[_ngcontent-[^\s]+\]/g,'')).replace(/\s+/g, ' ')
}

/**
 * The `::ng-deep` is deprecated without alternative.
 * This plugin removes `[deep]` as well as `::ng-deep` in a selector and
 * removes all subsequent `[_ngcontent-*]` occurrences.
 * @see https://angular.io/guide/component-styles#deprecated-deep--and-ng-deep
 */
module.exports = postcss.plugin('postcss-deep', () => css => css.walkRules(rule=>{
  if (rule.selectors) {
    rule.selectors = rule.selectors.map(selector =>
      hasDeep(selector)
        ?getChangedDeepSelector(selector)
        :selector
    )
  }
}))

// var postcss = require('postcss');
//
// /**
//  * Check if specified selector is a :host
//  * @param  {String} selector
//  * @return {Boolean}
//  */
// function isHostSelector(selector) {
//   return /\:host:/.test(selector);
// }
//
// /**
//  * Returns :host(:pseudo-selector) from a wrong :host:pseudo-selector
//  * @param  {String} selector
//  * @return {String}
//  */
// function getChangedHostSelector(selector) {
//   return selector.replace(/:host:(.+)/, ':host(:$1)');
// }
//
// /**
//  * PostCSS rule optimiser
//  * @param {Rule} rule
//  */
// function optimise(rule) {
//   if (rule.selectors) {
//     rule.selectors = rule.selectors.map(selector => {
//       if (hasDeep(selector)) {
//         return getChangedDeepSelector(selector);
//       }
//       return selector;
//     });
//   }
// }
//
// module.exports = postcss.plugin('postcss-minify-selectors', () => {
//   return css => css.walkRules(optimise);
// });

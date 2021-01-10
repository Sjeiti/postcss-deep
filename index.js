/**
 * The `::ng-deep` is deprecated without 
 * alternative, here is an alternative.
 * This plugin removes `[deep]` in a selector
 * and removea all subsequent `[_ngcontent-*]`
 * occurrences.
 * @see https://angular.io/guide/component-styles#deprecated-deep--and-ng-deep
 */

module.exports = function () {
  return {
    postcssPlugin: 'postcss-deep',
    Rule(rule) {
      rule.selector = rule.selectors
        .map(selector =>
          hasDeep(selector)
            ?getChangedDeepSelector(selector)
            :selector
        )
        .join(', ')
    },
  }
}

module.exports.postcss = true

/**
 * Check if selector contains `[deep]`
 * @param  {String} selector
 * @return {Boolean}
 */
function hasDeep(selector) {
  return /\[deep\]/.test(selector)
}

/**
 * Returns selector: removes `[deep]` and all subsequent `[_ngcontent-*]` instances
 * @param  {String} selector
 * @return {String}
 */
function getChangedDeepSelector(selector) {
  const [start, deep] = cssText.split(/\[deep\]/)
  return start + deep.replace(/\[_ngcontent-[^\s]+\]/g,'')
}


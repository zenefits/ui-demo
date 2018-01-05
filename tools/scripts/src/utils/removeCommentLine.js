// @ts-check

/**
 * Eemove the line that ends with a code comment contaning `${COMMENT}`
 *
 * Exmaple:
 *  in this code
 *    `
 *      var a = 1;
 *      var b = 2; // line-to-be-removed-by-preprocessor
 *      var c = 3;
 *    `
 *  the line with `var b` will be removed
 */

const COMMENT = 'line-to-be-removed-by-preprocessor';

module.exports = {
  removeCommentLine(src) {
    const rx = new RegExp(`\\n.+?\\/\\/ ${COMMENT}\\s*\\n`, 'g');
    return src.replace(rx, '');
  },
  COMMENT,
};

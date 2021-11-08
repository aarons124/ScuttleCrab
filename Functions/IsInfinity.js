/**
 * Returns a boolean value indicating whether a value is the value is Infinity.
 * @param number A numeric value.
 */

function isInfinity(number) {
  return number === Infinity || number === -Infinity;
}

module.exports = isInfinity;

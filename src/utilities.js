/**
 * Computes a class name string for the given inputs.
 * Inputs can consist of:
 *   1. `String`: will be used as a distinct class name.
 *   2. `Object`: each key in the object will be used as a distinct class name if the value of the property is truthy.
 *   3. `Array`: each entry will have a class name generated for it before each is added as a distinct class name.
 * @param {Array<String|Object|Array<*>>} classes Inputs for class name generation.
 * @returns {String} A stringified class name generated from all inputs.
 */
export const classnames = (...classes) =>
  classes
    .reduce((names, clazz) => {
      let classname = '';

      if (!clazz) {
        classname = '';
      } else if (typeof clazz === 'string') {
        classname = clazz;
      } else if (Array.isArray(clazz)) {
        classname = classnames(...clazz);
      } else if (typeof clazz === 'object') {
        classname = Object.keys(clazz)
          .filter(key => key.length > 0 && !!clazz[key])
          .reduce((str, key) => {
            return `${str} ${key}`;
          }, '');
      }

      // trim the name before checking if it should be prepended
      classname = classname.trim().replace(/\s+/gim, ' ');

      // return the appended name as long as we have a non-empty string
      return classname.length > 0 ? `${names} ${classname}` : names;
    }, '')
    .trim()
    .replace(/\s+/gim, ' ');

/**
 * Merge multiple properties from multiple objects into a base object.
 * Respects priority of properties in the base object. That is, properties are only overwritten if they do not exist in the both object or one of the earlier source objects.
 * Properties are therefore taken with precedence from left to right.
 * Only merges properties at the top most level.
 * Mutates the base object passed in.
 * @param {Object} [base={}] The object to merge all other sources into.
 * @param {Array<Object>} [sources] All other arguments are objects of source properties to be merged into the base object.
 * @returns {Object} The base object is returned after the merge is completed.
 */
export const mergeShallow = (base = {}, ...sources) => {
  sources.forEach(source => {
    if (!source) return;

    Object.keys(source)
      .filter(key => !base.hasOwnProperty(key))
      .forEach(key => (base[key] = source[key]));
  });

  return base;
};

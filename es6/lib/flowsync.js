/* Dependencies */
var async = require('async');

/**
 * # Async
 *
 * Manage serial/parallel flow-control and iteration.
 *
 * ## Why Not Use Async.js Directly?
 *
 * Async.js provides a lot of great functionality, but at 5k gzipped, it's hard to justify the entire library when all we need are a few flow-control and iteration methods. This is especially true now that FAM has switched to browserify, as any superfluous code delivered to the client is undesireable.
 *
 * Async currently wraps Async.js so that it can be replaced with lean, specialized functions at a later time. For now, it is only a wrapper for Async.js that provides an immutable standard interface.
 *
 * # Static Functions
 *
 * ## Async.parallel(functionCollection, callback)
 *
 * ```javascript
 * Async.parallel(functionCollection, functionsCompleted);
 *
 * var functionCollection = [
 *   functionOne, // Called at same time as functionTwo
 *   functionTwo // Called at same time as functionOne
 * ]
 *
 * function functionOne(callback) {
 *   console.log('functionOne started');
 *   setTimeout(completed, 5000);
 *   function completed(){
 *     console.log('functionOne finished');
 *     callback();
 *   }
 * }
 *
 * function functionTwo(callback) {
 *   console.log('functionTwo started');
 *   setTimeout(completed, 3000);
 *   function completed(){
 *     console.log('functionTwo finished');
 *     callback();
 *   }
 * }
 *
 * function functionsCompleted() {
 *   console.log('all functions completed.');
 * }
 * ```
 *
 * ## Async.series(functionCollection, callback)
 *
 * ```javascript
 * Async.series(functionCollection, functionsCompleted);
 *
 * var functionCollection = [
 *   functionOne, // Called first
 *   functionTwo // Called after functionOne completes
 * ]
 *
 * function functionOne(callback) {
 *   console.log('functionOne started');
 *   setTimeout(completed, 5000);
 *   function completed(){
 *     console.log('functionOne finished');
 *     callback();
 *   }
 * }
 *
 * function functionTwo(callback) {
 *   console.log('functionTwo started');
 *   setTimeout(completed, 3000);
 *   function completed(){
 *     console.log('functionTwo finished');
 *     callback();
 *   }
 * }
 *
 * function functionsCompleted() {
 *   console.log('all functions completed.');
 * }
 * ```
 *
 * ## Async.mapSeries(values, iterator, callback)
 *
 * ```javascript
 * Async.mapSeries(values, iteratorFunction, iterationsCompleted);
 *
 * var values = [1, 2, 3];
 *
 * // This iteratorFunction will be called once per value, in serial order of the values
 * function iteratorFunction(value, callback) {
 *    callback(value + 1);
 * }
 *
 * function iterationsCompleted(error, results) {
 *   if (error) { throw error; }
 *   results; // [2, 3, 4]
 *   console.log('iterator has completed all values. The new values are: ' + toString(results));
 * }
 * ```
 *
 * ## Async.mapParallel(values, iterator, callback)
 *
 * ```javascript
 * Async.mapParallel(values, iteratorFunction, iterationsCompleted);
 *
 * var values = [1, 2, 3];
 *
 * // This iteratorFunction will be called once per value, in parallel of one another
 * function iteratorFunction(value, callback) {
 *    callback(value + 1);
 * }
 *
 * function iterationsCompleted(error, results) {
 *   if (error) { throw error; }
 *   results; // [2, 3, 4]
 *   console.log('iterator has completed all values. The new values are: ' + toString(results));
 * }
 * ```
 *
 * @class Async
 * @static
 */
export default class Async {
  /* Static Interface */

  /**
  * Calls each function provided in parallel, then calls callback when all functions have completed.
  *
  * @method parallel
  * @static
  * @param {Array.<Function>} functionCollection Array of Functions to be called in serial order.
  * @param {Function} callback
  *
  * @example
  *
  * ```javascript
  * Async.parallel(functionCollection, functionsCompleted);
  *
  * var functionCollection = [
  *   functionOne, // Called at same time as functionTwo
  *   functionTwo // Called at same time as functionOne
  * ]
  *
  * function functionOne(callback) {
  *   console.log('functionOne started');
  *   setTimeout(completed, 5000);
  *   function completed(){
  *     console.log('functionOne finished');
  *     callback();
  *   }
  * }
  *
  * function functionTwo(callback) {
  *   console.log('functionTwo started');
  *   setTimeout(completed, 3000);
  *   function completed(){
  *     console.log('functionTwo finished');
  *     callback();
  *   }
  * }
  *
  * function functionsCompleted() {
  *   console.log('all functions completed.');
  * }
  * ```
  */
  static parallel(...options) {
    async.parallel(...options);
  }

  /**
  * Calls the provided iterator function once for each item in parallel.
  * @method eachParallel
  * @static
  * @param {Array} array to iterate
  * @param {Function} iterator function
  * @param {Function} callback called after the iteration
  * @example
  *
  * ```javascript
  * var items = [1,2,3];
  * function callback(error, result) {
  *   //some final code
  * }
  * function iteratorFunction(item, finishStep) {
  *   //some code
  *   finishStep(error, result);
  * }
  * Async.eachParallel(items, iteratorFunction, callback);
  * ```
  */
  static eachParallel(...options) {
    async.each(...options);
  }

  /**
  * Calls the provided iterator function once for each item in series.
  * @method eachSeries
  * @static
  * @param {Array} array to iterate
  * @param {Function} iterator function
  * @param {Function} callback called after the iteration
  * @example
  *
  * ```javascript
  * var items = [1,2,3];
  * function callback(error, result) {
  *   //some final code
  * }
  * function iteratorFunction(item, finishStep) {
  *   //some code
  *   finishStep(error, result);
  * }
  * Async.eachSeries(items, iteratorFunction, callback);
  * ```
  */
  static eachSeries(...options) {
    async.eachSeries(...options);
  }

  /**
  * Calls provided iterator function with each element of the array as an argument, and produces a new array.
  *
  * @method mapParallel
  * @static
  * @param {Array.<Function>} functionCollection Array of Functions to be called in serial order.
  * @param {Function} iterator Function that each element of Array is passed to
  * @param {Function} callback
  *
  * @example
  *
  * ```javascript
  * Async.mapParallel(values, iteratorFunction, iterationsCompleted);
  *
  * var values = [1, 2, 3];
  *
  * // This iteratorFunction will be called once per value, in parallel of one another
  * function iteratorFunction(value, callback) {
  *    callback(value + 1);
  * }
  *
  * function iterationsCompleted(error, results) {
  *   if (error) { throw error; }
  *   results; // [2, 3, 4]
  *   console.log('iterator has completed all values. The new values are: ' + toString(results));
  * }
  * ```
  */
  static mapParallel(...options) {
    async.map(...options);
  }

  /**
  * Calls each function provided in serial order, then calls callback.
  *
  * @method series
  * @static
  * @param {Array.<Function>} functionCollection Array of Functions to be called in serial order.
  * @param {Function} callback
  *
  * @example
  *
  * ```javascript
  * Async.series(functionCollection, functionsCompleted);
  *
  * var functionCollection = [
  *   functionOne, // Called first
  *   functionTwo // Called after functionOne completes
  * ]
  *
  * function functionOne(callback) {
  *   console.log('functionOne started');
  *   setTimeout(completed, 5000);
  *   function completed(){
  *     console.log('functionOne finished');
  *     callback();
  *   }
  * }
  *
  * function functionTwo(callback) {
  *   console.log('functionTwo started');
  *   setTimeout(completed, 3000);
  *   function completed(){
  *     console.log('functionTwo finished');
  *     callback();
  *   }
  * }
  *
  * function functionsCompleted() {
  *   console.log('all functions completed.');
  * }
  * ```
  */
  static series(...options) {
    async.series(...options);
  }

  /**
  * Calls provided iterator function with each element of the array as an argument, in serial order.
  *
  * @method mapSeries
  * @static
  * @param {Array.<Function>} functionCollection Array of Functions to be called in serial order.
  * @param {Function} iterator Function that each element of Array is passed to
  * @param {Function} callback
  *
  * @example
  *
  * ```javascript
  * Async.mapSeries(values, iteratorFunction, iterationsCompleted);
  *
  * var values = [1, 2, 3];
  *
  * // This iteratorFunction will be called once per value, in serial order of the values
  * function iteratorFunction(value, callback) {
  *    callback(value + 1);
  * }
  *
  * function iterationsCompleted(error, results) {
  *   if (error) { throw error; }
  *   results; // [2, 3, 4]
  *   console.log('iterator has completed all values. The new values are: ' + toString(results));
  * }
  * ```
  */
  static mapSeries(...options) {
    async.mapSeries(...options);
  }
}

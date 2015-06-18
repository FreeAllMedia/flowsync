/* Dependencies */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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

var Async = (function () {
  function Async() {
    _classCallCheck(this, Async);
  }

  _createClass(Async, null, [{
    key: 'parallel',

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
    value: function parallel() {
      for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
      }

      async.parallel.apply(async, options);
    }
  }, {
    key: 'eachParallel',

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
    value: function eachParallel() {
      for (var _len2 = arguments.length, options = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        options[_key2] = arguments[_key2];
      }

      async.each.apply(async, options);
    }
  }, {
    key: 'eachSeries',

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
    value: function eachSeries() {
      for (var _len3 = arguments.length, options = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        options[_key3] = arguments[_key3];
      }

      async.eachSeries.apply(async, options);
    }
  }, {
    key: 'mapParallel',

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
    value: function mapParallel() {
      for (var _len4 = arguments.length, options = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        options[_key4] = arguments[_key4];
      }

      async.map.apply(async, options);
    }
  }, {
    key: 'series',

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
    value: function series() {
      for (var _len5 = arguments.length, options = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        options[_key5] = arguments[_key5];
      }

      async.series.apply(async, options);
    }
  }, {
    key: 'mapSeries',

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
    value: function mapSeries() {
      for (var _len6 = arguments.length, options = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        options[_key6] = arguments[_key6];
      }

      async.mapSeries.apply(async, options);
    }
  }]);

  return Async;
})();

exports['default'] = Async;
module.exports = exports['default'];
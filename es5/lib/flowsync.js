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
      async.parallel.apply(async, arguments);
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
      async.each.apply(async, arguments);
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
      async.eachSeries.apply(async, arguments);
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
      async.map.apply(async, arguments);
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
      async.series.apply(async, arguments);
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
      async.mapSeries.apply(async, arguments);
    }
  }]);

  return Async;
})();

exports['default'] = Async;
module.exports = exports['default'];
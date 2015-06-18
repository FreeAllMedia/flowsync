"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _libFlowsyncJs = require("../lib/flowsync.js");

var _libFlowsyncJs2 = _interopRequireDefault(_libFlowsyncJs);

describe("Flowsync", function () {
	var component = undefined;

	before(function () {
		component = new _libFlowsyncJs2["default"]();
	});

	it("should say something", function () {
		component.saySomething().should.equal("Something");
	});
});
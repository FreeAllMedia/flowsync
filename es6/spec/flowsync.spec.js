import Flowsync from "../lib/flowsync.js";

describe("Flowsync", () => {
	let component;

	before(() => {
		component = new Flowsync();
	});

	it("should say something", () => {
		component.saySomething().should.equal("Something");
	});
});

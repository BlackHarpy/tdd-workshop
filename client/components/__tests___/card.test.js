import React from "react";
import { shallow, render, mount } from "enzyme";
import Foo from "../card";
describe("A suite", function() {
  it("should render without throwing an error", function() {
    expect(shallow(<Foo />).contains(<div className="foo">Bar</div>)).toBe(
      true
    );
  });
  it('should be selectable by class "foo"', function() {
    expect(shallow(<Foo />).is(".foo")).toBe(true);
  });
  it("should mount in a full DOM", function() {
    expect(mount(<Foo />).find(".foo").length).toBe(1);
  });
  it("should render to static HTML", function() {
    expect(render(<Foo />).text()).toEqual("Bar");
  });
});

import {
  restaurantPaymentCalculator,
  calculateElectricityBill
} from "../simple-testing";

describe("Simple testing", () => {
  test("Should calculate amount per person including tip", () => {
    expect(restaurantPaymentCalculator(400, 4)).toEqual(110);
  });
});

export function restaurantPaymentCalculator(total, people, tipPercentage) {
  const payPerPeople = total / people;
  return Math.round(payPerPeople * 1.1);
}

export function calculateElectricityBill(consumption, rate) {
  if (consumption <= 200) {
    return Math.round(rate * consumption);
  }
  if (consumption > 200 && consumption < 500) {
    return Math.round(rate * consumption * 1.1);
  }
  return Math.round(rate * consumption * 1.3);
}

describe("helper function tests ", function() {
  it("tests tip percent calculation", function() {
    expect(calculateTipPercent(150, 25)).toEqual(17);
    expect(calculateTipPercent(150, 0)).toEqual(0);
  });

  it("tests sumPaymentTotal function", function() {
    allPayments = {
      payment1: {
        billAmt: "4",
        tipAmt: "3",
        tipPercent: 75
      },

      payment2: {
        billAmt: "4",
        tipAmt: "1",
        tipPercent: 0
      },

      payment3: {
        billAmt: "24",
        tipAmt: "5",
        tipPercent: 0
      }
    };
    expect(sumPaymentTotal("tipAmt")).toEqual(9);
    expect(sumPaymentTotal("billAmt")).toEqual(32);
    expect(sumPaymentTotal("stringtypo")).toBeNaN();
  });

  it("tests to see a new td element appended for a given table row element", function() {
    let testTr = document.createElement("tr");
    appendTd(testTr, "hello");
    expect(testTr.innerHTML).toEqual("<td>hello</td>");
  });

  afterEach(function() {
    allPayments = {};
    paymentId = 0;
    billAmtInput.value = "";
    tipAmtInput.value = "";
    paymentTbody.innerHTML = "";
    summaryTds[0].innerHTML = "";
    summaryTds[1].innerHTML = "";
    summaryTds[2].innerHTML = "";
    serverTbody.innerHTML = "";
  });
});

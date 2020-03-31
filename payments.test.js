describe("testing curPayment function. should return curPayment object with billAmt & tipAmt inputs", function() {
  beforeEach(function() {
    billAmtInput.value = 100;
    tipAmtInput.value = 20;
  });
  it("tests curPayment function with billAmt & tipAmt > 0", function() {
    let testCurPayment = {
      billAmt: "100",
      tipAmt: "20",
      tipPercent: 20
    };
    expect(createCurPayment()).toEqual(testCurPayment);
  });

  it("tests curPayment function with billAmt > 0 & tipAmt = 0", function() {
    tipAmtInput.value = 0;
    let testCurPayment = {
      billAmt: "100",
      tipAmt: "0",
      tipPercent: 0
    };
    expect(createCurPayment()).toEqual(testCurPayment);
  });

  it("should not create a curPayment with billAmt = 0 & tipAmt > 0", function() {
    billAmtInput.value = 0;
    tipAmtInput.value = 10;
    let testCurPayment = createCurPayment();
    expect(testCurPayment).toBeUndefined();
  });

  it("should not create a curPayment with billAmt < 0 & tipAmt > 0", function() {
    billAmtInput.value = -100;
    tipAmtInput.value = 10;
    let testCurPayment = createCurPayment();
    expect(testCurPayment).toBeUndefined();
  });

  afterEach(function() {
    testCurPayment = {};
    billAmtInput.value = "";
    tipAmtInput.value = "";
  });
});

describe("appendPaymentTable: Create table row element and pass to appendTd with input value", function() {
  it("Create table row element with paymentId", function() {
    paymentId = 3;
    let testCurPayment = { billAmt: "100", tipAmt: "10", tipPercent: 10 };
    appendPaymentTable(testCurPayment);
    let curTdList = document.querySelectorAll("#paymentTable tbody tr td");

    expect(curTdList.length).toEqual(3);
    expect(curTdList[0].innerText).toEqual("$100");
    expect(curTdList[1].innerText).toEqual("$10");
    expect(curTdList[2].innerText).toEqual("10%");
  });

  afterEach(function() {
    paymentId = 0;
    testCurPayment = {};
    document.querySelector("#payment3").parentElement.remove();
  });
});

describe("updateSummary Creates table row element and pass to appendTd with calculated sum of all payment", function() {
  beforeEach(function() {
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
  });

  it("adds the correct amounts to the right fields", function() {
    updateSummary();
    expect(summaryTds[0].innerHTML).toContain("$32");
    expect(summaryTds[1].innerHTML).toContain("$9");
    expect(summaryTds[2].innerHTML).toContain("25%");
  });

  afterEach(function() {
    document.querySelector("#summaryTable tbody").innerHTML = "";
    allPayments = {};
  });
});

describe("submitPaymentInfo adds a curPayment object to allPayments, update html and reset input values", function() {
  beforeEach(function() {
    billAmtInput.value = 100;
    tipAmtInput.value = 20;
  });
  it("adds a curPayment object to allPayments", function() {
    submitPaymentInfo();
    expect(Object.keys(allPayments).length).toEqual(1);
    expect(allPayments["payment1"].billAmt).toEqual("100");
    expect(allPayments["payment1"].tipAmt).toEqual("20");
    expect(allPayments["payment1"].tipPercent).toEqual(20);
  });

  it("updates html with curPayment object info", function() {
    let curPayment = createCurPayment();
    allPayments["payment1"] = curPayment;

    appendPaymentTable(curPayment);

    let curTdList = document.querySelectorAll("#paymentTable tbody tr td");
    
    console.log(curTdList);
    console.log(curTdList[0]);
    console.log(curTdList[1]);
    console.log(curTdList[2]);
    expect(curTdList.length).toEqual(3);
    expect(curTdList[0].innerText).toEqual("$100");
    expect(curTdList[1].innerText).toEqual("$20");
    expect(curTdList[2].innerText).toEqual("20%");
  });

  afterEach(function() {
    billAmtInput.value = "";
    tipAmtInput.value = "";
    allPayments = {};
  });
});

describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function() {
    // initialization logic
    serverNameInput.value = "Alice";
  });

  it("should add a new server to allServers on submitServerInfo()", function() {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers["server" + serverId].serverName).toEqual("Alice");
  });

  it("should have an updated server table in the DOM", function() {
    submitServerInfo();
    expect(serverTbody.innerHTML).toContain((id = "server1"));
    expect(serverTbody.innerHTML).toContain("$0.00");
    // expect(Object.keys(allServers).length).toEqual(1);
    // expect(allServers["server" + serverId].serverName).toEqual("Alice");
  });

  afterEach(function() {
    serverTbody.innerHTML = "";
    allServers = {};
    serverId = 0;
  });
});
//submitServerInfo
//update ServerTable

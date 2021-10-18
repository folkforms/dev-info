const devInfo = require("../../devInfo");
const fileio = require("@folkforms/file-io");
const handler = require("../../handler");
const { dummyShellJs } = require("dummy-shells");

beforeEach(() => {
  dummyShellJs._clear();
});

test('{{ description | first | esq }} (file: {{ @filename }})', () => {

  // Arrange
  let data;
  const inputData = "{{ inputData | join | edq }}".trim();
  if(inputData.startsWith("file:")) {
    const file = inputData.substring(5).trim();
    data = fileio.readJson(file);
  } else {
    data = JSON.parse(inputData);
  }
  const treeSearch = "{{ inputArgs | trimarray }}".split(" ");
  const options = JSON.parse("{{ internalOptions | join | edq }}");
  const expectedCommands = [
    {{ expectedCommands | trimarray | doublequote | join(",\n") | indent(4) }}
  ];
  const expectedEchos = [
    {{ expectedEchos | trimarray | doublequote | join(",\n") | indent(4) }}
  ];
  const expectedErrorCode = {{ expectedErrorCode | trimarray | usedefault(0) }};

  // Act
  const r = devInfo(data, treeSearch, handler, dummyShellJs, options);

  // Assert
  expect(r.code).toEqual(expectedErrorCode);

  const echoList = dummyShellJs.echoList.filter(item => item.length > 0);
  expectedEchos.forEach(cmd => {
    expect(echoList).toContain(cmd);
  });
  expect(echoList.length).toEqual(expectedEchos.length);

  expectedCommands.forEach(cmd => {
    expect(dummyShellJs.execList).toContain(cmd);
  });
  expect(dummyShellJs.execList.length).toEqual(expectedCommands.length);
});

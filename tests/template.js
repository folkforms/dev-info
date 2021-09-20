const fs = require("fs-extra");
const yaml = require("js-yaml");
const { dummyShellJs } = require("dummy-shells");
const hs = require("../../hs");

beforeEach(() => {
  dummyShellJs._clear();
});

test('{{ description | first | esq }} (file: {{ @filename }})', () => {

  const yamlFile = fs.readFileSync("hs-commands.yaml", "utf8");
  const yamlData = yaml.load(yamlFile);
  const inputArgs = "{{ inputArgs | trimarray }}".split(" ");
  const expectedCommands = [
    {{ expectedCommands | trimarray | doublequote | join(",\n") | indent(4) }}
  ];
  const expectedEchos = [
    {{ expectedEchos | trimarray | doublequote | join(",\n") | indent(4) }}
  ];
  const expectedErrorCode = {{ expectedErrorCode | trimarray | usedefault(0) }};

  const retVal = hs(yamlData, inputArgs); // dummyShellJs, props, inputArgs

  expect(retVal.code).toEqual(expectedErrorCode);
  expectedCommands.forEach(cmd => {
    expect(dummyShellJs.execList).toContain(cmd);
  });
  expect(dummyShellJs.execList.length).toEqual(expectedCommands.length);
  expectedEchos.forEach(cmd => {
    expect(dummyShellJs.echoList).toContain(cmd);
  });
  expect(dummyShellJs.echoList.length).toEqual(expectedEchos.length);
});

export const CODE_TEMPLATES = {
  consoleLog: {
    label: 'console.log example',
    code: `console.log('Hello, IMJS!');`,
  },
  setTimeout: {
    label: 'setTimeout example',
    code: `
  console.log('Start');
  
  setTimeout(() => {
    console.log('Inside timeout');
  }, 1000);
  
  console.log('End');
  `.trim(),
  },
  functionDeclaration: {
    label: 'function declaration example',
    code: `
function fn1() {
  console.log('fn1');
}

function fn2() {
  console.log('fn2');
}
  
console.log('Start');

fn1();
fn2();

console.log('End');
  `.trim(),
  },
} as const;

export type CodeTemplateKey = keyof typeof CODE_TEMPLATES;

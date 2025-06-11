import * as acorn from 'acorn';
import { Command } from '@core/command/command';
import { ConsoleLogCommand } from '@core/command/console-log-command';
import { SetTimeoutCommand } from '@core/command/set-timeout-command';

let commandId = 0;
const nextId = () => `cmd_${commandId++}`;

export class Interpreter {
  interpret(code: string): Command[] {
    const ast = acorn.parse(code, {
      ecmaVersion: 'latest',
      locations: true,
      sourceType: 'script',
    });

    const commands: Command[] = [];

    for (const node of ast.body) {
      if (node.type !== 'ExpressionStatement') continue;

      const expr = node.expression;

      if (
        expr.type === 'CallExpression' &&
        expr.callee.type === 'MemberExpression' &&
        expr.callee.object.type === 'Identifier' &&
        expr.callee.property.type === 'Identifier' &&
        expr.callee.object.name === 'console' &&
        expr.callee.property.name === 'log'
      ) {
        const arg = expr.arguments[0];
        if (arg?.type === 'Literal' && typeof arg.value === 'string') {
          commands.push(new ConsoleLogCommand(arg.value, node.loc!));
        }
      } else if (
        expr.type === 'CallExpression' &&
        expr.callee.type === 'Identifier' &&
        expr.callee.name === 'setTimeout'
      ) {
        const callback = expr.arguments[0];
        const delayArg = expr.arguments[1];
        const delay = delayArg?.type === 'Literal' && typeof delayArg.value === 'number' ? delayArg.value : 0;

        if (callback?.type === 'ArrowFunctionExpression') {
          commands.push(new SetTimeoutCommand(nextId(), delay, node.loc!));
        }
      }
    }

    return commands;
  }
}

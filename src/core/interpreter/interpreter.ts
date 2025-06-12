import * as acorn from 'acorn';

import type { Command } from '../command/command';
import { PushCallStackCommand } from '../command/push-call-stack-command';
import { PopCallStackCommand } from '../command/pop-call-stack-command';
import { ConsoleLogCommand } from '../command/console-log-command';
import { SetTimeoutCommand } from '../command/set-timeout-command';

export class Interpreter {
  private functionDeclarations: Record<
    string,
    acorn.FunctionDeclaration | acorn.FunctionExpression | acorn.ArrowFunctionExpression
  > = {};

  interpret(code: string): Command[] {
    const ast = this.parse(code);
    const commands = this.generateCommands(ast, code);

    return commands;
  }

  private parse(code: string): acorn.Program {
    return acorn.parse(code, {
      ecmaVersion: 'latest',
      locations: true,
      sourceType: 'script',
    });
  }

  private generateCommands(ast: acorn.Program, code: string): Command[] {
    const commands: Command[] = [];
    this.traverseNode(ast, code, commands);
    return commands;
  }

  private traverseNode(node: acorn.Node, code: string, commands: Command[]): void {
    switch (node.type) {
      case 'Program':
        for (const stmt of (node as acorn.Program).body) {
          this.traverseNode(stmt, code, commands);
        }
        break;

      case 'BlockStatement':
        for (const stmt of (node as acorn.BlockStatement).body) {
          this.traverseNode(stmt, code, commands);
        }
        break;

      case 'ExpressionStatement':
        this.traverseNode((node as acorn.ExpressionStatement).expression, code, commands);
        break;

      case 'CallExpression':
        this.handleCallExpression(node as acorn.CallExpression, code, commands);
        break;

      case 'IfStatement':
        const ifStmt = node as acorn.IfStatement;
        this.traverseNode(ifStmt.test, code, commands);
        this.traverseNode(ifStmt.consequent, code, commands);
        if (ifStmt.alternate) {
          this.traverseNode(ifStmt.alternate, code, commands);
        }
        break;

      case 'WhileStatement':
        const whileStmt = node as acorn.WhileStatement;
        this.traverseNode(whileStmt.test, code, commands);
        this.traverseNode(whileStmt.body, code, commands);
        break;

      case 'ForStatement':
        const forStmt = node as acorn.ForStatement;
        if (forStmt.init) this.traverseNode(forStmt.init, code, commands);
        if (forStmt.test) this.traverseNode(forStmt.test, code, commands);
        if (forStmt.update) this.traverseNode(forStmt.update, code, commands);
        this.traverseNode(forStmt.body, code, commands);
        break;

      case 'FunctionDeclaration':
      case 'FunctionExpression':
      case 'ArrowFunctionExpression':
        const funcNode = node as acorn.FunctionDeclaration | acorn.FunctionExpression | acorn.ArrowFunctionExpression;
        this.functionDeclarations[funcNode.id?.name ?? ''] = funcNode;
        break;
    }
  }

  private handleCallExpression(expr: acorn.CallExpression, code: string, out: Command[]): void {
    if (
      expr.callee.type === 'MemberExpression' &&
      expr.callee.object.type === 'Identifier' &&
      expr.callee.property.type === 'Identifier' &&
      expr.callee.object.name === 'console' &&
      expr.callee.property.name === 'log'
    ) {
      const loc = expr.loc!;
      const argTexts = expr.arguments.map((arg) => code.slice(arg.start, arg.end)).join(', ');

      out.push(new PushCallStackCommand(loc, code.slice(expr.start, expr.end)));
      out.push(new ConsoleLogCommand(loc, argTexts));
      out.push(new PopCallStackCommand(loc));
    } else if (expr.callee.type === 'Identifier' && expr.callee.name === 'setTimeout') {
      const [callbackNode, delayNode] = expr.arguments;

      if (
        callbackNode &&
        (callbackNode.type === 'FunctionExpression' || callbackNode.type === 'ArrowFunctionExpression')
      ) {
        const loc = expr.loc!;
        const label = code.slice(expr.start, expr.end);
        const bodySource = this.extractBodySource(callbackNode, code);
        const callbackCmds = this.interpret(bodySource);
        const delay = this.extractDelay(delayNode);

        out.push(new PushCallStackCommand(loc, label));
        out.push(new SetTimeoutCommand(loc, callbackCmds, delay, label));
        out.push(new PopCallStackCommand(loc));
      }
    } else if (expr.callee.type === 'Identifier') {
      const loc = expr.loc!;
      const functionName = expr.callee.name;

      out.push(new PushCallStackCommand(loc, code.slice(expr.start, expr.end)));

      const functionNode = this.functionDeclarations[functionName];
      if (functionNode && functionNode.body.type === 'BlockStatement') {
        this.traverseNode(functionNode.body, code, out);
      }

      out.push(new PopCallStackCommand(loc));
    }
  }

  private extractDelay(node: acorn.Expression | acorn.SpreadElement): number {
    return node && node.type === 'Literal' && typeof node.value === 'number' ? node.value : 0;
  }

  private extractBodySource(fnNode: acorn.FunctionExpression | acorn.ArrowFunctionExpression, code: string): string {
    if (fnNode.body.type === 'BlockStatement') {
      return code.slice(fnNode.body.start, fnNode.body.end);
    }
    // Arrow shorthand: () => expression
    return `return ${code.slice(fnNode.body.start, fnNode.body.end)};`;
  }
}

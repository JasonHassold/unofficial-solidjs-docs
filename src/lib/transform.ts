'use server'

import { transformAsync, TransformOptions as BabelTransformOptions } from '@babel/core'
import type { VisitNodeObject, Node } from '@babel/traverse'
import { format } from 'prettier'

// @ts-expect-error: No typinggs needed
import babelTs from '@babel/preset-typescript'

import prettierConfig from '../../prettier.config.js'

export async function formatCode(code: string) {
  try {
    return await format(code, { ...prettierConfig, parser: 'typescript' })
  } catch (error: any) {
    // If formatting fails, return the original code
    // This prevents Position objects from being serialized
    return code
  }
}

/**
 * Transform TypeScript code into vanilla JavaScript without affecting the formatting
 * @param code            Source coude
 * @param fileName        File name for the source
 * @param options         Options
 */
async function transform(code: string): Promise<string> {
  code = await removeTypes(code)

  code = await formatCode(code)

  return code
}

async function removeTypes(code: string) {
  // We want to collapse newline runs created by removing types while preserving
  // newline runes in the original code. This is especially important for
  // template literals, which can contain literal newlines.
  // Keep track of how many newlines in a newline run were replaced.
  code = code.replace(/\n\n+/g, (match) => `\n/* @detype: empty-line=${match.length} */\n`)
  code = processMagicComments(code)

  // Babel visitor to remove leading comments
  const removeComments: VisitNodeObject<unknown, Node> = {
    enter(p) {
      if (!p.node.leadingComments) return

      for (let i = p.node.leadingComments.length - 1; i >= 0; i--) {
        const comment = p.node.leadingComments[i]!

        if (code.slice(comment.end).match(/^\s*\n\s*\n/) || comment.value.includes('@detype: empty-line')) {
          // There is at least one empty line between the comment and the TypeScript specific construct
          // We should keep this comment and those before it
          break
        }
        comment.value = '@detype: remove-me'
      }
    },
  }

  const babelConfig: BabelTransformOptions = {
    filename: 'code.tsx',
    retainLines: true,
    plugins: [
      // Plugin to remove leading comments attached to TypeScript-only constructs
      {
        name: 'detype-comment-remover',
        visitor: {
          TSTypeAliasDeclaration: removeComments,
          TSInterfaceDeclaration: removeComments,
          TSDeclareFunction: removeComments,
          TSDeclareMethod: removeComments,
          TSImportType: removeComments,
        },
      },
    ].filter(Boolean),
    presets: [babelTs],
    generatorOpts: {
      shouldPrintComment: (comment) =>
        comment !== '@detype: remove-me' && !comment.match(/^\s*(@ts-ignore|@ts-expect-error)/),
    },
  }

  try {
    const babelOutput = await transformAsync(code, babelConfig)

    if (!babelOutput || babelOutput.code === undefined || babelOutput.code === null) {
      throw new Error('Babel error')
    }

    return (
      babelOutput.code
        .replaceAll(/\n\n*/g, '\n')
        // Subtract 2 from the newline count because we inserted two surrounding
        // newlines when we initially created the detype: empty-line comment.
        .replace(/\/\* @detype: empty-line=([0-9]+) \*\//g, (_match, p1) => `\n`.repeat(p1 - 2))
    )
  } catch (error: any) {
    // If Babel transformation fails, return the original code
    console.warn('Babel transformation failed:', error.message)
    return code
  }
}

export function processMagicComments(input: string): string {
  const REPLACE_COMMENT = '// @detype: replace\n'
  const WITH_COMMENT = '// @detype: with\n'
  const END_COMMENT = '// @detype: end\n'

  let start = input.indexOf(REPLACE_COMMENT)

  while (start >= 0) {
    const middle = input.indexOf(WITH_COMMENT, start)
    if (middle < 0) return input
    const middleEnd = middle + WITH_COMMENT.length

    const end = input.indexOf(END_COMMENT, middleEnd)
    if (end < 0) return input
    const endEnd = end + END_COMMENT.length

    const before = input.slice(0, start)
    const newText = input.slice(middleEnd, end).replaceAll(/^\s*\/\//gm, '')
    const after = input.slice(endEnd)

    input = before + newText + after

    start = input.indexOf(REPLACE_COMMENT, before.length + newText.length)
  }

  return input
}

// /**
//  * Removes magic comments without performing the TS to JS transform
//  * @param code            Source coude
//  * @param fileName        File name for the source
//  * @param prettierOptions Options to pass to prettier
//  */
// export async function removeMagicComments(
//   code: string,
// ): Promise<string> {
//   const REPLACE_COMMENT = '// @detype: replace\n'
//   const WITH_COMMENT = '// @detype: with\n'
//   const END_COMMENT = '// @detype: end\n'

//   let start = code.indexOf(REPLACE_COMMENT)
//   let startEnd = start + REPLACE_COMMENT.length

//   while (start >= 0) {
//     const middle = code.indexOf(WITH_COMMENT, start)
//     if (middle < 0) return code
//     const middleEnd = middle + WITH_COMMENT.length

//     const end = code.indexOf(END_COMMENT, middleEnd)
//     if (end < 0) return code
//     const endEnd = end + END_COMMENT.length

//     const before = code.slice(0, start)
//     const keptText = code.slice(startEnd, middle)
//     const after = code.slice(endEnd)

//     code = before + keptText + after

//     start = code.indexOf(REPLACE_COMMENT, before.length + keptText.length)
//     startEnd = start + REPLACE_COMMENT.length
//   }

//   code = await format(code, {
//     ...prettierOptions,
//     filepath: fileName,
//   })

//   return code
// }

export async function transformCode(code: string) {
  const jsCode = await transform(code)

  return jsCode
}

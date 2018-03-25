package net.demurgos.midl.lang.psi

import com.intellij.psi.tree.IElementType
import com.intellij.psi.tree.TokenSet
import net.demurgos.midl.lang.MidlLanguage

open class MidlTokenType(debugName: String) : IElementType(debugName, MidlLanguage) {
  override fun toString(): String {
    return "MidlTokenType." + super.toString()
  }
}

val MIDL_KEYWORDS = TokenSet.create(
//  MOD,
//  STRUCT,
//  UNION
)

//val MIDL_OPERATORS = tokenSetOf(
//  NOT,
//  OPTIONAL
//)
//
//val MIDL_BINARY_OPS = tokenSetOf(
//  AND,
//  OR
//)
//
//val MIDL_DOC_COMMENTS = tokenSetOf(
//  INNER_BLOCK_DOC_COMMENT, OUTER_BLOCK_DOC_COMMENT,
//  INNER_EOL_DOC_COMMENT, OUTER_EOL_DOC_COMMENT
//)
//
//val MIDL_COMMENTS = TokenSet.orSet(
//  tokenSetOf(EOL_COMMENT),
//  MIDL_DOC_COMMENTS)
//
//val MIDL_EOL_COMMENTS = tokenSetOf(EOL_COMMENT, INNER_EOL_DOC_COMMENT, OUTER_EOL_DOC_COMMENT)
//
//val RS_STRING_LITERALS = tokenSetOf(STRING_LITERAL, BYTE_STRING_LITERAL)
//
//val RS_RAW_LITERALS = tokenSetOf(RAW_STRING_LITERAL, RAW_BYTE_STRING_LITERAL)
//
//val RS_LITERALS = tokenSetOf(STRING_LITERAL, BYTE_STRING_LITERAL, RAW_STRING_LITERAL, RAW_BYTE_STRING_LITERAL,
//  CHAR_LITERAL, BYTE_LITERAL, INTEGER_LITERAL, FLOAT_LITERAL, BOOL_LITERAL)
//
//val RS_CONTEXTUAL_KEYWORDS = tokenSetOf(DEFAULT, UNION, AUTO, DYN)
//
//val RS_LIST_OPEN_SYMBOLS = tokenSetOf(LPAREN, LT)
//val RS_LIST_CLOSE_SYMBOLS = tokenSetOf(RPAREN, GT)
//
//val RS_BLOCK_LIKE_EXPRESSIONS = tokenSetOf(WHILE_EXPR, IF_EXPR, FOR_EXPR, LOOP_EXPR, MATCH_EXPR, BLOCK_EXPR)

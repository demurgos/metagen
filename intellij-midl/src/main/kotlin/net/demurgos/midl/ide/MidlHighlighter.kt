package net.demurgos.midl.ide

import com.intellij.lexer.Lexer
import com.intellij.openapi.editor.DefaultLanguageHighlighterColors
import com.intellij.openapi.editor.colors.TextAttributesKey
import com.intellij.openapi.editor.colors.TextAttributesKey.createTextAttributesKey
import com.intellij.openapi.fileTypes.SyntaxHighlighterBase
import com.intellij.psi.tree.IElementType
import gnu.trove.THashMap
import net.demurgos.midl.lang.lexer.MidlLexerAdapter
import net.demurgos.midl.lang.psi.MidlTypes.*

class MidlHighlighter : SyntaxHighlighterBase() {

  override fun getHighlightingLexer(): Lexer = MidlLexerAdapter()

  override fun getTokenHighlights(tokenType: IElementType): Array<out TextAttributesKey> =
    pack(tokenMap[tokenType])

  private val tokenMap: Map<IElementType, TextAttributesKey> =
    THashMap<IElementType, TextAttributesKey>().apply {
      put(BLOCK_DOC, createTextAttributesKey("MIDL_BLOCK_DOC", DefaultLanguageHighlighterColors.DOC_COMMENT))
      put(LINE_COMMENT, createTextAttributesKey("MIDL_LINE_COMMENT", DefaultLanguageHighlighterColors.LINE_COMMENT))
      put(BLOCK_COMMENT, createTextAttributesKey("MIDL_BLOCK_COMMENT", DefaultLanguageHighlighterColors.BLOCK_COMMENT))

      put(IDENTIFIER, createTextAttributesKey("MIDL_IDENTIFIER", DefaultLanguageHighlighterColors.IDENTIFIER))
      put(BOOL_LITERAL, createTextAttributesKey("MIDL_BOOLEAN", DefaultLanguageHighlighterColors.KEYWORD))
      put(STRUCT_KW, createTextAttributesKey("MIDL_STRUCT_KW", DefaultLanguageHighlighterColors.KEYWORD))
      put(TYPE_KW, createTextAttributesKey("MIDL_TYPE_KW", DefaultLanguageHighlighterColors.KEYWORD))
      put(EQ, createTextAttributesKey("MIDL_EQ", DefaultLanguageHighlighterColors.OPERATION_SIGN))
    }
}

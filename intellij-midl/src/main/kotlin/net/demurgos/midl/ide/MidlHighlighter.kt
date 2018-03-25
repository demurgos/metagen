package net.demurgos.midl.ide

import com.intellij.lexer.Lexer
import com.intellij.openapi.editor.DefaultLanguageHighlighterColors
import com.intellij.openapi.editor.colors.TextAttributesKey
import com.intellij.openapi.editor.colors.TextAttributesKey.createTextAttributesKey
import com.intellij.openapi.fileTypes.SyntaxHighlighterBase
import com.intellij.psi.tree.IElementType
import gnu.trove.THashMap
import net.demurgos.midl.lang.lexer.MidlLexerAdapter
import net.demurgos.midl.lang.psi.MidlTypes.BOOLEAN

class MidlHighlighter : SyntaxHighlighterBase() {

  override fun getHighlightingLexer(): Lexer = MidlLexerAdapter()

  override fun getTokenHighlights(tokenType: IElementType): Array<out TextAttributesKey> =
    pack(tokenMap[tokenType])

  private val tokenMap: Map<IElementType, TextAttributesKey> =
    THashMap<IElementType, TextAttributesKey>().apply {
      put(BOOLEAN, createTextAttributesKey("MIDL_BOOLEAN", DefaultLanguageHighlighterColors.PREDEFINED_SYMBOL))
    }
}

package net.demurgos.midl.lang.parser

import com.intellij.lang.ASTNode
import com.intellij.lang.ParserDefinition
import com.intellij.lang.PsiParser
import com.intellij.lexer.Lexer
import com.intellij.openapi.project.Project
import com.intellij.psi.FileViewProvider
import com.intellij.psi.PsiElement
import com.intellij.psi.PsiFile
import com.intellij.psi.TokenType
import com.intellij.psi.tree.IFileElementType
import com.intellij.psi.tree.TokenSet
import net.demurgos.midl.lang.MidlLanguage
import net.demurgos.midl.lang.lexer.MidlLexerAdapter
import net.demurgos.midl.lang.psi.MidlFile
import net.demurgos.midl.lang.psi.MidlTypes

class MidlParserDefinition : ParserDefinition {
  val WHITE_SPACES = TokenSet.create(TokenType.WHITE_SPACE)
  val COMMENTS = TokenSet.create(MidlTypes.COMMENT)
  val FILE = IFileElementType(MidlLanguage)

  override fun createLexer(project: Project?): Lexer = MidlLexerAdapter()
  override fun getWhitespaceTokens(): TokenSet = WHITE_SPACES
  override fun getCommentTokens(): TokenSet = COMMENTS
  override fun getStringLiteralElements(): TokenSet = TokenSet.EMPTY
  override fun createParser(project: Project?): PsiParser = MidlParser()
  override fun getFileNodeType(): IFileElementType = FILE
  override fun createFile(viewProvider: FileViewProvider): PsiFile = MidlFile(viewProvider)

  override fun spaceExistanceTypeBetweenTokens(left: ASTNode, right: ASTNode): ParserDefinition.SpaceRequirements {
    return ParserDefinition.SpaceRequirements.MAY
  }

  override fun createElement(node: ASTNode): PsiElement {
    return MidlTypes.Factory.createElement(node)
  }
}

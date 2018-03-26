package net.demurgos.midl.lang.lexer;
import com.intellij.lexer.*;
import com.intellij.psi.tree.IElementType;
import static net.demurgos.midl.lang.psi.MidlTypes.*;

%%

%public
%class MidlLexer
%implements FlexLexer
%function advance
%type IElementType
%unicode


///////////////////////////////////////////////////////////////////////////////////////////////////
// Whitespaces
///////////////////////////////////////////////////////////////////////////////////////////////////

EOL_WS = \n | \r | \r\n
LINE_WS = [\ \t]
WHITE_SPACE_CHAR = {EOL_WS} | {LINE_WS}
WHITE_SPACE = {WHITE_SPACE_CHAR}+

///////////////////////////////////////////////////////////////////////////////////////////////////
// Identifier
///////////////////////////////////////////////////////////////////////////////////////////////////

SIMPLE_IDENTIFIER = [_\p{xidstart}][\p{xidcontinue}]*
IDENTIFIER = {SIMPLE_IDENTIFIER}

///////////////////////////////////////////////////////////////////////////////////////////////////
// Literals
///////////////////////////////////////////////////////////////////////////////////////////////////

INT_LITERAL = {DEC_LITERAL}
  | {HEX_LITERAL}
  | {OCT_LITERAL}
  | {BIN_LITERAL}

DEC_LITERAL = [0-9] [0-9_]*
HEX_LITERAL = "0x" [a-fA-F0-9_]*
OCT_LITERAL = "0o" [0-7_]*
BIN_LITERAL = "0b" [01_]*

STRING_LITERAL = \" ( [^\\\"] | \\[^] )* ( \" | \\ )?

BOOL_LITERAL = true | false

COMMENT = "#"

%%
<YYINITIAL> {
  {INT_LITERAL} { return INT_LITERAL; }
  {BOOL_LITERAL} { return BOOL_LITERAL; }
  {STRING_LITERAL} { return STRING_LITERAL; }

  "{" { return LCURLY; }
  "}" { return RCURLY; }
  "[" { return LBRACK; }
  "]" { return RBRACK; }
  "(" { return LPAREN; }
  ")" { return RPAREN; }
  ":" { return COLON; }
  ";" { return SEMICOLON; }
  "=" { return EQ; }
  "!=" { return EXCLEQ; }
  "==" { return EQEQ; }
  "!" { return EXCL; }
  "|" { return OR; }
  "&" { return AND; }

  "struct" { return STRUCT_KW; }
  "type" { return TYPE_KW; }

  {IDENTIFIER} { return IDENTIFIER; }

  {WHITE_SPACE} { return WHITE_SPACE; }
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// Catch All
///////////////////////////////////////////////////////////////////////////////////////////////////

[^] { return com.intellij.psi.TokenType.BAD_CHARACTER; }

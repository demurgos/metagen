# MIDL specification

Metagen Interface Description Language (MIDL) is a language-agnostic and format-agnostic way to
define types. It is intended for generation of code handling data validation, serialization and
deserialization.

## Primitives

### Sint8

Signed 8-bit integer. Represents an integer in the inclusive range `[-128, 127]`.

<details><summary>Javascript</summary>
  `number` primitive
</details>

### Sint16
### Sint32
### Sint64
### Uint8
### Uint16
### Uint32
### Uint64
### Bytes
### Ucs2String
### UsvString
### Boolean

## Enum



https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.1.md



#[derive(Serialize, Deserialize, Debug, PartialEq, Eq)]
pub struct MorphGradient {
  pub spread: GradientSpread,
  pub color_space: ColorSpace,
  pub colors: Vec<MorphColorStop>,
}

```midl
type Lang
```

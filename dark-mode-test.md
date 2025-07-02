# Dark Mode Test Document

This document tests all markdown elements to ensure proper dark mode styling.

## Headings Test

# Heading 1
## Heading 2  
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

## Text Formatting

This is **bold text** and this is *italic text*.

This is ~~strikethrough text~~ and this is `inline code`.

Here's a paragraph with regular text to test the base text color in dark mode.

## Lists

### Regular Lists
- Item 1
- Item 2
  - Nested item
  - Another nested

### Numbered Lists
1. First item
2. Second item
   1. Nested numbered

### Task Lists
- [x] Completed task
- [ ] Incomplete task
  - [x] Nested completed
  - [ ] Nested incomplete

## Tables

| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Row 2    | Data     | More     |

## Aligned Tables

| Left | Center | Right |
|:-----|:------:|------:|
| Left aligned | Center aligned | Right aligned |
| More content | More content | More content |

## Links

[Regular link](https://example.com)

[Reference link][ref1]

[ref1]: https://example.com "Reference link example"

## Code Blocks

```javascript
function example() {
    console.log("Code block test");
    return true;
}
```

## Blockquotes

> This is a blockquote
> It can span multiple lines
> 
> And have multiple paragraphs

## Math (if supported)

Inline math: $E = mc^2$

Block math:
$$
\sum_{i=1}^{n} x_i = x_1 + x_2 + \cdots + x_n
$$

## Definition Lists

Term 1
: Definition for term 1

Term 2
: Definition for term 2
: Second definition for term 2

## Footnotes

This text has a footnote[^1] and another one[^2].

[^1]: This is the first footnote.
[^2]: This is the second footnote with more text.

## Horizontal Rules

---

Above and below are horizontal rules.

***

## Escape Characters

This is \*not italic\* and this is \`not code\`.

## Mixed Content

Here's a paragraph with **bold**, *italic*, `code`, and a [link](https://example.com).

1. Numbered list with **formatting**
   - Nested bulleted item with *emphasis*
   - Another with `code`

> Blockquote with **bold text** and *italic text*
> 
> Another paragraph in blockquote

| Header | Content |
|--------|---------|
| **Bold** | `Code` |
| *Italic* | [Link](https://example.com) | 
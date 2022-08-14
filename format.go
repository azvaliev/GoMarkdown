package main

import (
	"fmt"
	"regexp"

	"html/template"
)

type MdRegExps struct {
	Bold, Italic, LineBreak, Paragraph, Headers *regexp.Regexp
}

var fmtRegExps = MdRegExps{
	Bold:      regexp.MustCompile(`(?m)(?:\*\*((?:\n[^\n]|[^*])+)\*\*)|(?:(\b_?)__((?:\n[^\n]|[^_])+)__(_?\b))`),
	Italic:    regexp.MustCompile(`(?m)(?:\*((?:\n[^\n]|[^*])+)\*)|(?:(\b)_((?:\n[^\n]|[^_])+)_(\b))`),
	LineBreak: regexp.MustCompile(`(?m)^([^#\n])([^\n]*)(?: {2})$\n`),
	Paragraph: regexp.MustCompile(`(?m)^((?:<[^h>|<h[^\d])|[^#\n])((?:\n[^\n]|<[^h]|<h[^\d]|[^h]\d|[^<][h][\d]|[^\d<\n])*)(?:\n\n|\n?\z|\n(<[h]))`),
	Headers:   regexp.MustCompile(`(?m)(#{1,6}) ([^\n]+)`),
}

func Format(raw string) string {
	sanitizedRaw := template.HTMLEscapeString(raw)
	var formatted string

	// Add bold
	formatted = fmtRegExps.Bold.ReplaceAllString(sanitizedRaw, "$2<b>$1$3</b>$4")

	// Add italic
	formatted = fmtRegExps.Italic.ReplaceAllString(formatted, "$2<i>$1$3</i>$4")

	// Add newlines
	formatted = fmtRegExps.LineBreak.ReplaceAllString(formatted, "$1$2<br />")

	// Add headers
	formatted = fmtRegExps.Headers.ReplaceAllStringFunc(formatted, func(match string) string {
		parts := fmtRegExps.Headers.FindAllStringSubmatch(match, 1)[0][1:]
		level, content := len(parts[0]), parts[1]
		return fmt.Sprintf("<h%d>%s</h%d>", level, content, level)
	})

	// Add paragraphs
	formatted = fmtRegExps.Paragraph.ReplaceAllString(formatted, "<p>$1$2</p>$3")

	return formatted
}

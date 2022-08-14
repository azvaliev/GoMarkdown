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
	Bold:      regexp.MustCompile(`(?m)(?:\*\*((?:\n[^\n]|[^*])+)\*\*)|(?:(\b)__((?:\n[^\n]|[^_])+)__(\b))`),
	Italic:    regexp.MustCompile(`(?m)(?:\*(.+)\*)|(?:(\W)_(.+)_(\W))`),
	LineBreak: regexp.MustCompile(`(?m)^([^#\n])([^\n]*)(?: {2})$\n`),
	Paragraph: regexp.MustCompile(`(?m)^([^#\n])((?:\n[^\n]|.)*)(?:(?:\n\n)|\z)`),
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
	formatted = fmtRegExps.LineBreak.ReplaceAllString(formatted, "$1$2<br>")

	// Add paragraphs
	formatted = fmtRegExps.Paragraph.ReplaceAllString(formatted, "<p>$1$2</p>")

	// Add headers
	formatted = fmtRegExps.Headers.ReplaceAllStringFunc(formatted, func(match string) string {
		parts := fmtRegExps.Headers.FindAllStringSubmatch(match, 1)[0][1:]
		level, content := len(parts[0]), parts[1]
		return fmt.Sprintf("<h%d>%s</h%d>", level, content, level)
	})

	return formatted
}

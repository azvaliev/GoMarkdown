package main

import (
	"fmt"
	"regexp"

	"html/template"
)

type MdRegExps struct {
	NewLine, Headers, Bold *regexp.Regexp
}

var fmtRegExps = MdRegExps{
	NewLine: regexp.MustCompile(`(?m)^([^#|\n]*)(?:\n| {2})$\n`),
	Headers: regexp.MustCompile(`(?mi)(#{1,6}) ([^\n]+)`),
	Bold:    regexp.MustCompile(`(?m)(?:\*\*(.+)\*\*)|(?:(\W)__(.+)__(\W))`),
}

func Format(raw string) string {
	sanitizedRaw := template.HTMLEscapeString(raw)
	var formatted string

	// Add bold
	formatted = fmtRegExps.Bold.ReplaceAllString(sanitizedRaw, "$2<b>$1$3</b>$4")

	// Add newlines
	formatted = fmtRegExps.NewLine.ReplaceAllString(formatted, "$1<br>")

	// Add headers
	formatted = fmtRegExps.Headers.ReplaceAllStringFunc(formatted, func(match string) string {
		parts := fmtRegExps.Headers.FindAllStringSubmatch(match, 1)[0][1:]
		level, content := len(parts[0]), parts[1]
		return fmt.Sprintf("<h%d>%s</h%d>", level, content, level)
	})

	return formatted
}

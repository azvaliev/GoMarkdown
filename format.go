package main

import (
	"fmt"
	"regexp"

	"html/template"
)

type MdRegExps struct {
	NewLine *regexp.Regexp
	Headers *regexp.Regexp
}

var fmtRegExps = MdRegExps{
	NewLine: regexp.MustCompile(`(?m)^([^#|\n]*)(?:\n| {2})$\n`),
	Headers: regexp.MustCompile(`(?mi)(#{1,6}) ([^\n]+)`),
}

func Format(raw string) string {
	sanitizedRaw := template.HTMLEscapeString(raw)
	var formatted string

	// Add newlines
	formatted = fmtRegExps.NewLine.ReplaceAllString(sanitizedRaw, "$1<br>")

	// Add headers
	formatted = fmtRegExps.Headers.ReplaceAllStringFunc(formatted, func(match string) string {
		parts := fmtRegExps.Headers.FindAllStringSubmatch(match, 1)[0][1:]
		level, content := len(parts[0]), parts[1]
		return fmt.Sprintf("<h%d>%s</h%d>", level, content, level)
	})

	return formatted
}

package main

import (
	"fmt"
	"regexp"
	"strings"

	"html/template"
)

type MdRegExps struct {
	Bold, Italic, List, LineBreak, Paragraph, Header, Link *regexp.Regexp
}

var fmtRegExps = MdRegExps{
	Bold:      regexp.MustCompile(`(?m)(?:\*\*((?:\n[^\n]|[^*])+)\*\*)|(?:(\b_?)__((?:\n[^\n]|[^_])+)__(_?\b))`),
	Italic:    regexp.MustCompile(`(?m)(?:\*((?:\n[^\n]|[^*])+)\*)|(?:(\b)_((?:\n[^\n]|[^_])+)_(\b))`),
	List:      regexp.MustCompile(`(?m)((?:-|\d)(?:[^\n]|\n[^#\n])*)`),
	LineBreak: regexp.MustCompile(`(?m)^([^#\n])([^\n]*)(?: {2})$\n`),
	Paragraph: regexp.MustCompile(`(?m)^((?:<[^uoh>|<h[^\d])|[^#\n])((?:\n[^\n]|<[^h]|<h[^\d]|[^h]\d|[^<][h][\d]|[uo][^l]|[uo]l[^>]|[^uo\d<\n])*)(?:\n\n|\n?\z|\n(<[h]))`),
	Header:    regexp.MustCompile(`(?m)(#{1,6}) ([^\n]+)`),
	Link:      regexp.MustCompile(`(?m)\[([^\n\]]+)\]\((#[^\n)]+|https?://[^\n)]+)\)`),
}

var linkSplitter *regexp.Regexp = regexp.MustCompile(`(?m)(#|http)`)
var listSplitter *regexp.Regexp = regexp.MustCompile(`(?m)\n?(?:-|\d.) ([^\n]*)`)

func Format(raw string) string {
	sanitizedRaw := template.HTMLEscapeString(raw)
	var formatted string

	// Add bold
	formatted = fmtRegExps.Bold.ReplaceAllString(sanitizedRaw, "$2<b>$1$3</b>$4")

	// Add italic
	formatted = fmtRegExps.Italic.ReplaceAllString(formatted, "$2<i>$1$3</i>$4")

	// Add lists
	formatted = fmtRegExps.List.ReplaceAllStringFunc(formatted, func(match string) string {
		// unordered list
		if strings.HasPrefix(match, "-") {
			return `<ul>` + listSplitter.ReplaceAllString(match, "<li>$1</li>") + `</ul>`
		}

		// ordered list
		return `<ol>` + listSplitter.ReplaceAllString(match, "<li>$1</li>") + `</ol>`
	})

	fmt.Println(formatted)

	// Add newlines
	formatted = fmtRegExps.LineBreak.ReplaceAllString(formatted, "$1$2<br />")

	// Add headers
	formatted = fmtRegExps.Header.ReplaceAllStringFunc(formatted, func(match string) string {
		parts := fmtRegExps.Header.FindAllStringSubmatch(match, 1)[0][1:]
		level, content := len(parts[0]), parts[1]
		return fmt.Sprintf("<h%d>%s</h%d>", level, content, level)
	})

	// Add paragraphs
	formatted = fmtRegExps.Paragraph.ReplaceAllString(formatted, "<p>$1$2</p>$3")

	formatted = fmtRegExps.Link.ReplaceAllStringFunc(formatted, func(match string) string {
		parts := linkSplitter.Split(match, 2)
		text, link := parts[0], parts[1]

		if strings.Contains(link, "://") && !strings.HasPrefix(link, "http") {
			return `<a href="http` + link[0:len(link)-1] + `" rel="noopener noreferrer" target="_blank">` + text[1:len(text)-2] + `</a>`
		}

		return `<a href="#` + link[0:len(link)-1] + `" rel="noopener noreferrer">` + text[1:len(text)-2] + `</a>`
	})

	return formatted
}

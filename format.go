package main

import (
	"fmt"
	"regexp"
)

type MdRegExps struct {
	Headers *regexp.Regexp
}

var fmtRegExps = MdRegExps{
  Headers: regexp.MustCompile(`(?mi)(#{1,6}) ([^\n]*)`),
}

func Format(raw string) string {
  var formatted string

  // Format the raw text with headers
  formatted = fmtRegExps.Headers.ReplaceAllStringFunc(raw, func(match string) string {
    parts := fmtRegExps.Headers.FindAllStringSubmatch(match, 1)[0]
    headerLevel := len(parts[1])
    return fmt.Sprintf("<h%d>%s</h%d>", headerLevel, parts[2], headerLevel)
  })

	return formatted
}

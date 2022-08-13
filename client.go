package main

import (
  godom "github.com/azvaliev/godom/document"
)

func main() {
  dom := godom.DOM{}
  dom.Init()

  // Get the textarea with md input
  textarea, err := dom.QuerySelector(".editing-area > textarea")
  if err != nil {
    godom.LogErrorf("%s\n%s", err.Msg, err.Stacktrace)
    return
  }

  // Check that text area was selected
  if !textarea.Exists() {
    godom.LogError("Textarea not found, exiting")
    return
  }

  // Get the preview area
  preview, err := dom.QuerySelector(".preview-area")
  if err != nil {
    godom.LogErrorf("%s\n%s", err.Msg, err.Stacktrace)
    return
  }
  if !preview.Exists() {
    godom.LogError("Preview area not found, exiting")
    return
  }

  // Listen for textarea changes
  textarea.AddEventListener("keyup", func(this *godom.Element, e godom.Event) {
    // Get the textarea value
    text, err := textarea.GetAttribute("value")
    if err != nil {
      godom.LogErrorf("%s\n%s", err.Msg, err.Stacktrace)
      return
    }
    
    // Format the text
    result := Format(text)

    // Set the preview area value
    preview.SetAttribute("innerHTML", result)
  })

  <-make(chan bool)
}

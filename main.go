package main

import godom "github.com/azvaliev/godom/document"

func main() {
	dom := godom.DOM{}
	dom.Init()

	godom.LogInfo("Hello, world!")

}

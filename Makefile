GOROOT:=$(shell go env GOROOT)

build:
	cp ${GOROOT}/misc/wasm/wasm_exec.js ./static/wasm_exec.js
	GOOS=js GOARCH=wasm go build -o  ./static/out.wasm	
dev: 
	Make build
	lsof -ti:3000 | xargs kill
	npx http-server ./static -p 3000
test:
	Make dev & npx cypress run

GOROOT:=$(shell go env GOROOT)

build:
	cp ${GOROOT}/misc/wasm/wasm_exec.js ./static/wasm_exec.js
	GOOS=js GOARCH=wasm go build -o  ./static/out.wasm	
dev: 
	make build
	lsof -ti:3000 | xargs kill
	npx http-server ./static -p 3000
test:
	make dev & npx cypress run

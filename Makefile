build:
	GOOS=js GOARCH=wasm go build -o  ./static/out.wasm	
dev: 
	Make build
	lsof -ti:3000 | xargs kill
	python3 -m http.server 3000 -d ./static
	# httpwatcher -p 3000 -w ./static -r ./static

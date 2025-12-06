.PHONY: build serve copy-assets dev clean

# Build the excalidraw renderer in development mode
build:
	cd ./excalidraw-renderer && npm run build:dev

# Copy built assets to mkdocs_excalidraw/assets
copy-assets:
	cp ./excalidraw-renderer/dist/* ./mkdocs_excalidraw/assets

# Serve mkdocs on 0.0.0.0:8899
serve:
	mkdocs serve -a 0.0.0.0:8899

# Clean build artifacts
clean:
	rm -rf ./excalidraw-renderer/dist && rm -rf ./mkdocs_excalidraw/assets/*

# Production build
build-prod:
	cd ./excalidraw-renderer && npm run build:prod

# Install dependencies
install:
	cd ./excalidraw-renderer && npm install

# Development workflow: clean, build, copy assets, and serve
dev: clean build copy-assets serve

# CI workflow
prod: install clean build-prod copy-assets
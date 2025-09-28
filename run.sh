cd ./excalidraw-renderer && \
npm run build && \
cd .. && \
cp ./excalidraw-renderer/dist/excalidraw-renderer.bundle.js ./mkdocs_excalidraw/assets/excalidraw-renderer.bundle.js && \
mkdocs serve -a 0.0.0.0:8899
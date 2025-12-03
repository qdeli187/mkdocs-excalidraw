cd ./excalidraw-renderer && \
rm -rf ./dist && \
npm run build:dev && \
cd .. && \
cp ./excalidraw-renderer/dist/* ./mkdocs_excalidraw/assets/* && \
mkdocs serve -a 0.0.0.0:8899
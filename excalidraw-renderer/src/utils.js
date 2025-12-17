function filterDrawing(data, frame_name) {
  if (frame_name == null || frame_name == null) {
    let els = data.elements.filter((e) => e.type != "frame");
    data.elements = els;
    return data;
  }
  // find the frame object
  let frame_obj = data.elements.find((e) => e.name == frame_name);
  if (frame_obj == undefined) {
    throw new Error(`Frame not found: ${frame_name}`);
  }
  let els = data.elements.filter((e) => e.frameId == frame_obj.id);
  data.elements = els;
  return data;
}

function renderDrawing(data) {
  var urlCreator = window.URL || window.webkitURL;
  return urlCreator.createObjectURL(data);
}

function handleLightbox(src,imageUrl,style) {
  const lbAvailable = typeof lightbox !== "undefined";
  if (lbAvailable) {
    style += "cursor: pointer;";
    let index = lightbox.elements.findIndex(
      (e) => e.instance.element.alt == src,
    );
    if (index === -1) {
      lightbox.insertSlide({
        href: imageUrl,
        type: "image",
        alt: src,
      });
    } else {
      lightbox.removeSlide(index);
      lightbox.insertSlide(
        {
          href: imageUrl,
          type: "image",
          alt: src,
        },
        index,
      );
    }
  }
  return style;
}

export { filterDrawing, renderDrawing, handleLightbox };

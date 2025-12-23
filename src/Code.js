function onOpen() {
  SlidesApp.getUi()
    .createAddonMenu()
    .addItem("Open Editor", "showSidebar")
    .addToUi();
}

function showSidebar() {
  var html = HtmlService.createTemplateFromFile("Sidebar")
    .evaluate()
    .setTitle("LizardTypst")
    .setWidth(450);
  SlidesApp.getUi().showSidebar(html);
}

// Insert base64 encoded image data to slide (SVG isn't supported)
function insertImageToSlide(base64Data, desiredWidth) {
  var presentation = SlidesApp.getActivePresentation();
  var slide = presentation.getSelection().getCurrentPage();
  if (!slide) throw new Error("No slide is selected.");

  // Remove the "data:image/png;base64," part and convert to image data
  var data = Utilities.base64Decode(base64Data.split(",")[1]);
  var blob = Utilities.newBlob(data, MimeType.PNG, "equation.png");

  var image = slide.insertImage(blob);

  if (desiredWidth && typeof desiredWidth === "number" && desiredWidth > 0) {
    var originalWidth = image.getWidth();
    var originalHeight = image.getHeight();
    var aspectRatio = originalHeight / originalWidth;

    image.setWidth(desiredWidth);
    image.setHeight(desiredWidth * aspectRatio);
  }
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

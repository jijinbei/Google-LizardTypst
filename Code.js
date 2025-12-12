function onOpen() {
  SlidesApp.getUi()
    .createMenu("LizardTypst")
    .addItem("Open Editor", "showSidebar")
    .addToUi();
}

function showSidebar() {
  var html = HtmlService.createHtmlOutputFromFile("Sidebar")
    .setTitle("LizardTypst")
    .setWidth(450);
  SlidesApp.getUi().showSidebar(html);
}

// ToDo: 受け取ったPNG画像をスライドに貼る
function insertImageToSlide(base64Data) {
  var presentation = SlidesApp.getActivePresentation();
  var slide = presentation.getSelection().getCurrentPage();
  if (!slide) throw new Error("No slide is selected.");

  // Remove the "data:image/png;base64," part and convert to image data
  var data = Utilities.base64Decode(base64Data.split(",")[1]);
  var blob = Utilities.newBlob(data, MimeType.PNG, "equation.png");

  slide.insertImage(blob);
}

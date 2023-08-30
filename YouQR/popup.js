document.addEventListener("DOMContentLoaded", function () {
  const qrCodeDiv = document.getElementById("qrCode");

  chrome.tabs.query({ active: true, lastFocusedWindow: true}, function (tabs) {
    const currentUrl = tabs[0].url;
    const qrCode = new QRCode(qrCodeDiv, {
      text: currentUrl,
      width: 128,
      height: 128,
    });
  });
});

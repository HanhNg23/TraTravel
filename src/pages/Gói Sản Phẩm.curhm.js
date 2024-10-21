// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world

$w.onReady(function () {
    $w('#multistatePackage').changeState("boxBasicPackState");
      $w('#circleChooseBasic').show();
      $w('#circleChoosePre').hide();
    $w("#buttonBasic").onClick(() => {
      $w('#multistatePackage').changeState("boxBasicPackState");
      $w('#circleChooseBasic').show();
      $w('#circleChoosePre').hide();

    });
    $w("#buttonPre").onClick(() => {
      $w('#multistatePackage').changeState("boxPrePackState");
      $w('#circleChooseBasic').hide();
      $w('#circleChoosePre').show();
    });
  });
  

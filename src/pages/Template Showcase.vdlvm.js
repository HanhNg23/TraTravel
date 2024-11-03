// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world

$w.onReady(function () {
    $w("#dynamicDataset").onReady(() => {
        $w("#repeater1").forEachItem(($item, itemData, index) => {
          if (itemData.price === itemData.discountedPrice) {
            $item("#originalPrice").delete();
          }
        });
      });
});


  $w.onReady(function () {
    $w("#traveltemplatedatabase").onReady(() => {
      $w("#repeaterintop").forEachItem(($item, itemData, index) => {
        if (itemData.price === 0) {
          $item("#price").text = "Miễn phí";
        } else {
          $item("#price").text = itemData.price;
        }
      });
    });
  });
  
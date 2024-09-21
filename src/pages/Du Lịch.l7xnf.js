$w("#repeaterintop").onItemReady(($item, itemData, index) => {
    let originalText = itemData.price;
    let modifiedText = originalText === 0 ? 'Miễn phí' : originalText;
    console.log(modifiedText);
    $item("#price").text = modifiedText;
  });


  
  
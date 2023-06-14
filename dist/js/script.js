$(function() {
    const columnGap = parseInt($(".slider-row-upper-inner").css('column-gap'));
    const upperSliderRowInner = $(".slider-row-upper-inner");
    const lowerSliderRowInner = $(".slider-row-lower-inner");
    const wrapperWidth = $(".wrapper").width();
  
    const duplicateImages = (sliderRow, images) => {
      let sliderWidth = sliderRow.width();
      let i = 0;
      while (sliderWidth <= wrapperWidth) {
        sliderRow.append($(images).eq(i).clone());
        sliderWidth += $(images).eq(i).width();
        i++;
      }
    }
  
    duplicateImages(upperSliderRowInner, ".upper-slider-image");
    duplicateImages(lowerSliderRowInner, ".lower-slider-image");
  
    const sliderButtons = {
      left: $("#left-button"),
      right: $("#right-button")
    };
  
    sliderButtons.right
      .on("mouseenter", function() {
        $(this).children("img").attr("src", "./assets/arrow-gray-right.png");
      })
      .on("mouseleave", function() {
        $(this).children("img").attr("src", "./assets/arrow-blue-right.png");
      });
  
    sliderButtons.left
      .on("mouseenter", function() {
        $(this).children("img").attr("src", "./assets/arrow-gray-left.png");
      })
      .on("mouseleave", function() {
        $(this).children("img").attr("src", "./assets/arrow-blue-left.png");
      });
  
    let animating = false;
  
    sliderButtons.right.on("click", function() {
      if (animating) return;
      animating = true;
  
      const upperSliderItm = $(".upper-slider-image");
      const upperCurrentImage = upperSliderItm.first();
  
      sliderButtonClick(upperSliderItm, upperCurrentImage, upperSliderRowInner);
  
      const lowerSliderItm = $(".lower-slider-image");
      const lowerCurrentImage = lowerSliderItm.first();
  
      sliderButtonClick(lowerSliderItm, lowerCurrentImage, lowerSliderRowInner);
    });
  
    const sliderButtonClick = (sliderItem, currentImg, sliderRowInner) => {
      sliderRowInner.animate({ left: currentImg.width() + columnGap + "px" }, 300, function() {
        sliderRowInner.css("left", 0);
  
        currentImg.insertBefore(sliderItem.last());
  
        animating = false;
      });
    };
  
    sliderButtons.left.on("click", function() {
      if (animating) return;
      animating = true;
  
      const upperSliderItm = $(".upper-slider-image");
      const upperCurrentImage = upperSliderItm.last();
  
      sliderButtonClick(upperSliderItm, upperCurrentImage, upperSliderRowInner);
  
      const lowerSliderItm = $(".lower-slider-image");
      const lowerCurrentImage = lowerSliderItm.last();
  
      sliderButtonClick(lowerSliderItm, lowerCurrentImage, lowerSliderRowInner);
    });
  
    const leftBtnClick = (sliderItem, currentImg, sliderRowInner) => {
      sliderRowInner.animate({ left: -currentImg.width() - columnGap + "px" }, 300, function() {
        sliderRowInner.css("left", 0);
  
        const newRightImg = currentImg.insertBefore(sliderItem.first());
  
        newRightImg.css("display", "none");
  
        newRightImg.fadeIn();
  
        animating = false;
      });
    };
  });
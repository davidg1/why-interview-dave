(function() {

  const $loadingModal = $('#loading-modal');
  const $card = $('#card');
  const $introImage = $('#intro-image');
  const $disclaimerLink1 = $('#disclaimer-link-1');
  const $disclaimerLink2 = $('#disclaimer-link-2');
  const $clickButtonCaption = $('#click-button-caption');
  const $disclaimerInfo1 = $('#disclaimer-info-1');
  const $disclaimerInfo2 = $('#disclaimer-info-2');
  const $disclaimerInfoButton1 = $('#disclaimer-info-button-1');
  const $disclaimerInfoButton2 = $('#disclaimer-info-button-2');
  const $readDisclaimerInstructions = $('#read-disclaimer-instructions');
  const $qualificationsButton = $('#qualifications-button');
  const $qualificationsContainer = $('#qualifications-container');

  let firstDisclaimerLinkClicked = false;
  let secondDisclaimerLinkClicked = false;


  // Preload images for "flipping card"
  const preloadedImages = [
    'images/smiling-man-with-laptop.jpg',
    'images/stressed-developer.jpg',
    'images/blue-background.jpg',
    'images/orange-rectangle-background.jpg'
  ];

  let imagesLoadedCount = 0;

  preloadedImages.forEach(imagePath => {
    const image = new Image();
    
    $(image).on('load', function() {
      imagesLoadedCount++;
      if (imagesLoadedCount === 4) {
        $loadingModal.hide();
        imagesLoaded();
      }
    });
    
    image.src = imagePath;
  });


  function imagesLoaded() {
    $qualificationsButton.on('click', function () {
      if (!firstDisclaimerLinkClicked || !secondDisclaimerLinkClicked) {
        $readDisclaimerInstructions.css("display", "inline-block");
      } else {
        $qualificationsContainer.show();
      }
    });



    $disclaimerLink1.on('click', function (evt) {
      firstDisclaimerLinkClicked = true;
      displayDisclaimerInfo($disclaimerLink1, evt);
    });

    $disclaimerLink2.on('click', function (evt) {
      secondDisclaimerLinkClicked = true;
      displayDisclaimerInfo($disclaimerLink2, evt);
    });

    function displayDisclaimerInfo(disclaimerLink, event) {
      disclaimerLink.hide();
      $qualificationsButton.prop('disabled', true);
      $readDisclaimerInstructions.hide();
      $card.addClass("rotate");
      event.preventDefault();
    }



    $disclaimerInfoButton1.on('click', function () {
      $card.removeClass("rotate");
      
      $introImage.attr({
        src: 'images/stressed-developer.jpg',
        alt: 'stressed developer'
      });
      
      $disclaimerLink2.show();
      $qualificationsButton.prop('disabled', false);
      
      setTimeout(() => {
        $disclaimerInfo1.css("display", "none");
        $disclaimerInfo2.css("display", "flex");
      }, 350)
    });

    $disclaimerInfoButton2.on('click', function () {
      $card.removeClass("rotate");
      $clickButtonCaption.show();
      $qualificationsButton.prop('disabled', false);
    });
  }

})();



function initLighthouseMap() {
  const lighthouse = { lat: 42.7727, lng: -86.2124 };

  const lighthouseMap = new google.maps.Map($('#lighthouse-map').get(0), {
    zoom: 6,
    center: lighthouse
  });

  const marker = new google.maps.Marker({
    position: lighthouse,
    map: lighthouseMap
  });

  $('#lighthouse-modal').on('shown.bs.modal', function () {
    google.maps.event.trigger(lighthouseMap, 'resize');
    lighthouseMap.setCenter(lighthouse);
    lighthouseMap.setZoom(6);
  });
}

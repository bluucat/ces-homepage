$(document).on('click', 'a[href^="#"]', function(e) {
  var id = $(this).attr('href');
  var $id = $(id);
  if($id.length === 0) {return;}
  e.preventDefault();
  var pos = $(id).offset().top;
  $('body', 'html').animate({scrollTop: pos}, 1000);
});

$("#star-field").particleground({
  particleRadius: 3.5,
  density: 5000,
  dotColor: 'rgba(255,255,255,0.5)',
  lineColor: 'rgba(255,255,255,0)'
});

$(".request-form").submit(function(e) {
  var $email = $(this).find("#email-field");
  var $thankYou = $(this).find("#thank-you");

  var $emailHideable = $email.parents(".input-field");
  var $thankYouHideable = $thankYou.parents("div");
  var $submitHideable = $(this).find("button[type='submit']");

  var emailHidden = $emailHideable.css('display') == 'none';

  var email = $email.val();
  var dateAdded = moment().toISOString();
  var source = "FAV5";
  var ctaClicked = $email.parents(".request-form").hasClass("top")?"top":"bottom";
  var client = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?"mobile":"browser";

  var $otherForm = ctaClicked==="top"?$(".request-form.bottom"):$(".request-form.top");
  var $email2= $otherForm.find("#email-field");
  var $thankYou2 = $otherForm.find("#thank-you"); 

  var $emailHideable2 = $email2.parents(".input-field"); 
  var $thankYouHideable2 = $thankYou2.parents("div");
  var $submitHideable2 = $otherForm.find("button[type='submit']");

  e.preventDefault();
  
  if(!emailHidden && $email.val() !== "" && validateEmail($email.val())) {

    var formData = {
      "entry.2128920738": email,
      "entry.151069198": source,
      "entry.1434195805": ctaClicked,
      "entry.1316281563": client
    };

    fbq('track', 'Lead');

    $.ajax({
      url: "https://docs.google.com/a/cosmoslabs.io/forms/d/1NpVjllyr9xMdI9zRzN-FJH_m7JFPB2Njglpi_F8l23M/formResponse",
      data: formData,
      type: "POST",
      dataType: "xml",
      statusCode: {
        200: function() {
          alert("YO");
        }
      }
    });

    $submitHideable.fadeOut();
    $submitHideable2.fadeOut();
    $emailHideable.fadeOut(function() {
      $thankYouHideable.fadeIn();
      $emailHideable2.fadeOut(function() {
        console.log("hey");
        $thankYouHideable2.fadeIn();
      });
    });
  } else {
    $email.focus();
  }
});

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

$("#email-field, #email-field-bottom").focus(function(){
  $(this).parents("form").addClass("focus");
});

$("#email-field, #email-field-bottom").focusout(function(){
  $(this).parents("form").removeClass("focus");
});

$("#email-field, #email-field-bottom").change(function(){
    $(this).removeClass("not-empty");
    if( $(this).val() !== "" ) {
        $(this).addClass("not-empty");
    }
});
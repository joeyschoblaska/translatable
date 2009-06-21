$(function() {
  var languages = ['en', 'ru', 'es'];
  var links_text = $.map(languages, function(n, i) { return '<span class="link">' + n + '</span>' }).join(' | ');
  var links = '<div class="translatable-links">Translate: ' + links_text + '</div>';
  $('.translatable').wrapInner('<span class="translatable-original"></span>').prepend(links);
  $('.translatable-links .link').click( perform_translation ).mouseover( function() { this.style.cursor = 'pointer' } );
});

function perform_translation() {
  var original = $(this).parent().siblings('.translatable-original')[0];
  var target_language = this.innerHTML;
  google.language.detect(original.innerHTML, function(result){ if (!result.error) {
    google.language.translate(original.innerHTML, result.language, target_language, function(result){ if (!result.error) {
      $(original).siblings('.translatable-translated').remove();
      $(original).before('<span class="translatable-translated">' + result.translation + '</span>').hide();
    }});
  }});
}

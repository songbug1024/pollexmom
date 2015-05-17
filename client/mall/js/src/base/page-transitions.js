
var isAnimating = false,
  endCurrPage = false,
  endNextPage = false,
  animEndEventNames = {
    'WebkitAnimation' : 'webkitAnimationEnd',
    'OAnimation' : 'oAnimationEnd',
    'msAnimation' : 'MSAnimationEnd',
    'animation' : 'animationend'
  },
  // animation end event name
  animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
  // support css animations
  support = Modernizr.cssanimations;

function changePage(options) {
  options = options || {};

  var $currPage = options.$currPage;
  var $nextPage = options.$nextPage;

  if( isAnimating ) {
    return false;
  }

  isAnimating = true;

  var outClass = !options.back ? 'pt-page-moveToLeftEasing pt-page-ontop' : 'pt-page-moveToRightEasing pt-page-ontop';
  var inClass = !options.back ? 'pt-page-moveFromRight' : 'pt-page-moveFromLeft';

  $currPage.addClass( outClass ).on( animEndEventName, function() {
    $currPage.off( animEndEventName );
    endCurrPage = true;
    if( endNextPage ) {
      onEndAnimation( $currPage, $nextPage );

      if (options.outAnimationEnd) {
        options.outAnimationEnd();
      }
    }
  } );

  $nextPage.addClass( inClass ).on( animEndEventName, function() {
    $nextPage.off( animEndEventName );
    endNextPage = true;
    if( endCurrPage ) {
      onEndAnimation( $currPage, $nextPage );

      if (options.inAnimationEnd) {
        options.inAnimationEnd();
      }
    }
  } );

  if( !support ) {
    onEndAnimation( $currPage, $nextPage );
  }

}

function onEndAnimation( $outpage, $inpage ) {
  endCurrPage = false;
  endNextPage = false;
  resetPage( $outpage, $inpage );
  isAnimating = false;
}

function resetPage( $outpage, $inpage ) {
  $outpage.attr( 'class', $outpage.data( 'originalClassList' ) );
  $inpage.attr( 'class', $inpage.data( 'originalClassList' ) + ' active' );
}

module.exports = changePage;
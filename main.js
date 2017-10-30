$(document).ready(function() {

    // These need to be outside to avoid undefineds
    var quote;
    var author;
    
    function getNewQuote() {
        $.ajax({
            url: 'http://api.forismatic.com/api/1.0/', 
            jsonp: 'jsonp',
            dataType: 'jsonp',
            data: {
                method: 'getQuote',
                lang: 'en',
                format: 'jsonp'
            },
            // Call back if success
            success: function(response) {
               quote = response.quoteText;
               author = response.quoteAuthor;
               $('#quote').text(quote);

               // In case quote doesn't have an author (empty string)
               if (author) {
                   $('#author').text(' - ' + author);
               } else {
                   $('#author').text('- unknown');
               }

            }

        });
    }
    getNewQuote();

    $('.get-quote').on('click', function(event) {
        // Prevents page scrolling up after click, when window is smaller
        event.preventDefault();
        getNewQuote();
    });

    // Share on Twitter function
    $('.share-quote').on('click', function(event) {
        event.preventDefault();
        window.open('https://twitter.com/intent/tweet?text=' + quote + ' - ' + author);
    });
});
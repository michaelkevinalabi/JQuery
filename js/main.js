$(document).ready(function(){
    $('#container')
        .find('.hot')
        .children()
        .last()
        .prev()
        .addClass('highlight');
});
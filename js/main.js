var cart = 0;

function addItem(id, name, description, price, moreInfo) {
  let html = '';
  html += '<div class="item" data-id="' + id + '">';
  html += '<div class="name">' + name + '</div>';
  html += '<img src="assets/house.jpg"></img>';
  html += '<div class="description">' + description + '</div>';
  html += '<div class="price">' + price + '</div>';
  html += '<button class="item-add">Add to cart</button>';
  html += '<button class="item-remove">Remove</button>';
  html += '<br/>';
  html += '<a class="more-info-link" href="#">More info</a>';
  html += '<div class="more-info">' + moreInfo + '</div>';
  html += '</div>';

    $('#container').prepend(html);  
}
    
    $(document).ready(function(){
    $('#container').on('click','.more-info-link',function(event){
        event.preventDefault();
        
       $(this).parent().find('.more-info').slideToggle('slow');
    $(this)
      .animate({ "opacity": 0.5, "margin-left": 10 }, 150)
      .animate({ "opacity": 1.0, "margin-left": 0 }, 150);
  });

     $('#container').on('click','.item-remove',function(){
        $(this).parent().remove();
    });
    
    $.ajax('data/item.json', {
    DataType: 'json',
    contentType: 'application/json',
    cache: false
    })
        .done(function(respnse){
        let items = respnse.items;
        items.forEach(function(item){
      addItem(item.name, item.description, item.price, item.moreInfo);
        });
    })
        .fail(function(request, errorType, errorMessage){
        console.log(errorMessage);
        })
        .always(function(){
        
    });
        
        $('#container').on('click','.item-add',function(){
            let id = $(this).parent().data('id');
             $.ajax('data/addToCart.json', {
      type: 'post',
      data: { id: id },
      dataType: 'json',
      contentType: 'application/json'
        })
            .done(function(response){
        if (response.message === 'success'){
            let price = response.price;

            cart += price;
        
        $('#cart-container').text('$' + cart);
        }
                  
         });
    });
});
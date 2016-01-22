var jobs = (function () {
    var table = new Table({
        rows: 8
    });

    function getData(query){
        var url = '_/api/listings.php';

        if(query){
            url += '?query=' + query;
        }

        $.get(url, function(data){
            table.bindData(JSON.parse(data));
        });
    }

    function registerHandlers(){
        var $body = $('body');

        $body.on('click', 'th.table-sort' ,function(){
            var $el = $(this);
            table.goToPage(1);
            table.sort($el)
        });

        $body.on('click', '.refresh' ,function(){
            $('.search').find('input').val('');
            getData();
        });

        $('.search').find('input').keyup( _.debounce(function(){
            var query = $(this).val();
            getData(query);
        }, 500));


        $body.on('click', '.page' ,function(){
           var id = $(this).attr('id');
           table.goToPage(id);
        });
    }


    return{
        init: function(){
            getData();
            registerHandlers();
        }
    };
})();

$(function(){
    jobs.init();
});





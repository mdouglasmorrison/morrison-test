(function() {
    this.Table = function(args) {
        var defaults = {
            pagination: true,
            rows: 10
        };
        this.options = _.extend(defaults, args);
    };

    Table.prototype.bindData = function(data){
        this.data = data;
        this.render(1);
    };

    Table.prototype.render = function(start){
        var i,
            rows,
            html = '',
            startIndex = (start - 1) * this.options.rows;

        if((this.data.length - startIndex) < this.options.rows){
            rows = this.data.length - startIndex;
        }else{
            rows = this.options.rows;
        }

        if(this.data.length){
            for(i = 0; i < rows; i++){
                html += '<tr>' +
                    '<td>' + this.data[i + startIndex].title + '</td>' +
                    '<td>' + this.data[i + startIndex].company + '</td>' +
                    '<td>' + this.data[i + startIndex].code +' </td>' +
                    '<td>' + this.data[i + startIndex].created + '</td>' +
                    '<td>11:11 am</td>' +
                    '</tr>'
            }
        }else{
            html = '<tr><td colspan="5">No results were found.</td></tr>';
        }

        $('#table').find('tbody').empty().append(html);
        if(this.options.pagination){
            drawPagination(this.data.length, this.options.rows, start);
        }
    };

    Table.prototype.goToPage = function(id){
        this.render(id);
    };

    Table.prototype.sort = function($el){
        var id = $el.attr('id'),
            order;

        $el.siblings().each(function() {
            $(this).removeClass('ascending').removeClass('descending');
        });

        if($el.hasClass('ascending')){
            order = 'descending';
            $el.removeClass('ascending').addClass('descending');
        }else{
            order = 'ascending';
            $el.removeClass('descending').addClass('ascending');
        }

        this.data = sortByKey(this.data, id, order);
        this.goToPage(1);
    };

    Table.prototype.clearSorting = function(){
        $('.table-sort').each(function(){
            $(this).removeClass('ascending').removeClass('descending');
        })
    };

    function drawPagination(length, rows, start){
        var pageCount = Math.ceil(length/rows),
            i,
            html = '';

        if (pageCount > 1){
            html += '<span>Pages:</span>';
            for(i = 1; i <= pageCount; i++){
                html += '<a href="javascript:void(0)" class="page" id=' + i + '>' + i + '</a>';
            }
        }

        $('.pagination').empty().append(html);
        setActivePage(start);
    }

    function setActivePage(start){
        $('#' + start).addClass('active');
    }

    function sortByKey(array, key, direction) {
        return array.sort(function(a, b) {
            var x = (a[key] === null) ? "zz" : "" + a[key],
                y = (b[key] === null) ? "zz" : "" + b[key];

            if (typeof x == "string"){
                x = x.toLowerCase();
                y = y.toLowerCase();
            }

            if(direction === 'ascending'){
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            }else{
                return ((x > y) ? -1 : ((x < y) ? 1 : 0));
            }
        });
    }
}());

var Product = function (firstName) {
	this.firstName = firstName;
};

function mountHead() {
	return '<tr><td>Nome</td><td>Valor</td><td>estoque</td></tr>';
};

function mountLine(product) {
	return '<tr><td>' + product.nome + '</td><td>' + product.valor + '</td><td>' + product.estoque + '</td></tr>';
};

Product.prototype.mountTable = function(products) {
    var table = '<table>';
    table += mountHead();
    $.each(products, function(i, product){
        table += mountLine(product);
    });	
    table += '</table>';
    return table;
};

Product.prototype.setListOnScrean = function(component) {
	var products = this.getList();
	var table = this.mountTable(products);
    $(component).html(table);
};

Product.prototype.getList = function() {
    return this.request('GET', 'http://localhost:3000/product/', {});
};

Product.prototype.request = function(type, url, data) {
    var result = false;
    $.ajax({
        type: type,
        url: url,
        data: (data),
        dataType: "json",
        async: false,
        success: function(data) {
            result = data;
        },
        error: function() {
            alert('Error occured');
        }
    });
    return result;
};
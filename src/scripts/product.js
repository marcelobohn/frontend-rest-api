var Product = function (firstName) {
	this.firstName = firstName;
};

function request(type, url, data) {
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

function mountLine(product) {
	var line = '<tr data-id="' + product.id + '">';
	line += '<td>' + product.nome + '</td>';
	line += '<td>' + product.valor + '</td>';
	line += '<td>' + product.estoque + '</td>';
	line += '<td><span class="glyphicon glyphicon-pencil clickable btnEdit" ></span></td>';
	line += '<td><span class="glyphicon glyphicon-remove clickable btnDelete" ></span></td>';
	line += '</tr>';
	return line;
};

function mountDataForm(component) {
	var form = $(component);
	var nome = form.find('#nome').val();
	var valor = form.find('#valor').val();
	var estoque = form.find('#estoque').val();
	return {"nome":nome, "valor":valor, "estoque": estoque, "status":"A"};	
}

function setEventsTable() {
    $('#btnNew').click(function(){
    	new Product().new('#content');    	
    });
    $('.btnEdit').click(function(){
    	console.log('edit');
    });
    $('.btnDelete').click(function(){
    	new Product().delete(this);
    });    
}

function setEventsForm() {
	$('#btnGravar').click(function(){
		var data = mountDataForm('#form');
		new Product().save(data);
    	$('#form').hide();
    });
	$('#btnCancel').click(function(){
    	console.log('cancelou');
    	$('#form').hide();
    });
}

Product.prototype.mountTable = function(component, products) {
    $.each(products, function(i, product){
        $(component).find('tbody').append(mountLine(product));
    });	
};

Product.prototype.setListOnScrean = function(component) {
	$(component +"tbody > tr").remove();
	var products = this.getList();
	if (products.length > 0) {
		this.mountTable(component, products);
	    setEventsTable();
	}
};

Product.prototype.getList = function() {
    return request('GET', 'http://localhost:3000/product/', {});
};

Product.prototype.new = function() {
	$('#form').show();
	setEventsForm();
};

Product.prototype.save = function(data) {
	var newProduct = request('POST', 'http://localhost:3000/product/', data);
	$("#tableProducts").find('tbody').append(mountLine(newProduct));
};

Product.prototype.delete = function(element) {
	var id = $(element).parents('tr').data('id');
	var deleteProduct = request('DELETE', 'http://localhost:3000/product/'+id, {});
	if (deleteProduct) {
		$(element).parents('tr').remove();
	}
};
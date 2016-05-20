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
	line += '<td class="colNome">' + product.nome + '</td>';
	line += '<td class="colValor">' + product.valor + '</td>';
	line += '<td class="colEstoque">' + product.estoque + '</td>';
	line += '<td><span class="glyphicon glyphicon-pencil clickable btnEdit"></span></td>';
	line += '<td><span class="glyphicon glyphicon-remove clickable btnDelete"></span></td>';
	line += '</tr>';
	return line;
};

function mountDataForm(component) {
	var form = $(component);
	var id = form.data('id');
	var nome = form.find('#nome').val();
	var valor = form.find('#valor').val();
	var estoque = form.find('#estoque').val();
	return {"id":id, "nome":nome, "valor":valor, "estoque": estoque, "status":"A"};	
}

function setEventsTable() {
    $('#btnNew').unbind( "click" );
    $('#btnNew').click(function(){
    	new Product().insert('#content');
    });
    $('.btnEdit').unbind( "click" );
    $('.btnEdit').click(function(){
    	new Product().edit(this);
    });
    $('.btnDelete').unbind( "click" );
    $('.btnDelete').click(function(){
		var r = confirm("Confirma deletar o registro?");
		if (r === true) {    	
	    	new Product().delete(this);
	    }
    });    
}

function setEventsForm() {
	$('#btnGravar').click(function(){
		var data = mountDataForm('#form');
		var product = new Product().save(data);
    	if (product) {
			$('#form').hide();
			$('#list').show();	
    	}
    });
	$('#btnCancel').click(function(){
    	$('#form').hide();
		$('#list').show();	
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
	    setEventsForm();
	}
	document.title = 'Products';
	$('#btnHome').removeClass('active');
	$('#btnProducts').parents('li').addClass('active');
};

Product.prototype.getList = function() {
    return request('GET', config.productUrl, {});
};

function fillForm(product) {
	$('#form').data("id", (product) ? product.id : 0);
	$('#form').find('#nome').val((product) ? product.nome : '');
	$('#form').find('#valor').val((product) ? product.valor : '');
	$('#form').find('#estoque').val((product) ? product.estoque : '');	
	$('#form').show();
	$('#list').hide();
	$('#titleForm').html((product) ? 'Editando' : 'Inserindo');
}

function updateRow(product) {
	var $row = $('tr[data-id="' + product.id + '"]');
	$row.find('.colNome').html(product.nome);
	$row.find('.colValor').html(product.valor);
	$row.find('.colEstoque').html(product.estoque);
}

Product.prototype.insert = function() {
	fillForm();	
};

Product.prototype.edit = function(element) {
	var id = $(element).parents('tr').data('id');
	var editProduct = request('GET', config.productUrl+id, {});
	if (editProduct) {
		fillForm(editProduct);
	}
};

Product.prototype.save = function(data) {
	if (data.id > 0) {
		var product = request('PUT', config.productUrl+data.id, data);
		if (product) {
			updateRow(product);
			return product;
		} else {
			return false;
		}
	} else {
		var product = request('POST', config.productUrl, data);
		if (product) {
			$("#tableProducts").find('tbody').append(mountLine(product));
			setEventsTable();
			return product;
		} else {
			return false;
		}
	}
};

Product.prototype.delete = function(element) {
	var id = $(element).parents('tr').data('id');
	var deleteProduct = request('DELETE', config.productUrl+id, {});
	if (deleteProduct) {
		$(element).parents('tr').remove();
	}
};
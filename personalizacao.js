(function () {
    var loadScript = function (url, callback) {

        /* JavaScript that will load the jQuery library on Google's CDN.
           We recommend this code: https://snipplr.com/view/18756/loadscript/.
           Once the jQuery library is loaded, the callback function will be executed. */
        var script = document.createElement("script");
        script.type = "text/javascript";

        // If the browser is Internet Explorer.
        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
            // For any other browser.
        } else {
            script.onload = function () {
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    };

    var myAppJavaScript = function ($) {

        var html_nome_numero = "<div style='display:none;' class='div_propertie_camisa'> <div class='form-group'> <label class='form-label'>Nome na camisa</label> <input type='text' name='properties[Nome na camisa]' class='form-control nome-camisa'> </div><div class='form-group'> <label class='form-label'>Número na camisa</label> <input type='number' name='properties[Número na camisa]' class='form-control'> </div></div>";

        //$(html_nome_numero).insertAfter("#product_form > .js-product-variants");
        //$(html_nome_numero).insertAfter('form.js-product-form > .js-product-variants');
        //var item_buy = document.querySelector(".item-product");

        $("form.js-product-form > .js-product-variants").each(function (index) {
            $(this).after(html_nome_numero);
        });

        $(".item-buy-variants form.js-product-form").each(function (index) {
            var elemento_atual = $(this);
            var elemento_imagem = elemento_atual.parents('.item-image');
            var altura_imagem = elemento_imagem.height();
            console.log('altura imagemm!');
            elemento_atual.css('overflow-x', 'hidden');
            elemento_atual.css('width', 'auto');
            elemento_atual.css('height', altura_imagem + 'px');
            elemento_atual.css('overflow-y', 'scroll');
        });
        //var form_pagina_inicial = $(".item-buy-variants form.js-product-form");

        //console.log("Item buy: " + item_buy);

        var possiveis_valores = ['Com Personalização', 'COM PERSONALIZAÇÃO', 'Sim', 'SIM', 'Com modificação'];

        for (var i = 0; i < possiveis_valores.length; i++) {
            var query = 'select option:contains("' + possiveis_valores[i] + '")';

            if ($(query).length > 0) {
                var possiveis_valores_string = possiveis_valores.join(" ");
                $(query).each(function (index) {

                    var select = $(this).parent();
                    //vai subindo os elementos pai até encontrar o FORM
                    var form = select.parents('form.js-product-form');
                    //encontra a div customizada no form
                    var div_customizada = form.find('.div_propertie_camisa');

                    if (possiveis_valores_string.indexOf(select.val()) != -1) {
                        div_customizada.show();
                        form.find('.nome-camisa').focus();
                    }
                    
                    select.change(function () {
                        if (possiveis_valores_string.indexOf(select.val()) != -1) {
                            div_customizada.show();
                            form.find('.nome-camisa').focus();
                        } else {
                            div_customizada.hide();
                        }
                    });
                });
                break;
            }
        }

    };

    var target = [3, 1, 0];

    var current = typeof jQuery === 'undefined' ? [0, 0, 0] : $.fn.jquery.split('.').map(function (item) {
        return parseInt(item);
    });

    if (current[0] < target[0] || (current[0] == target[0] && current[1] < target[1])) {
        loadScript('https://code.jquery.com/jquery-3.6.0.min.js', function () {
            var jQuery1101 = jQuery.noConflict(true);
            myAppJavaScript(jQuery1101);
        });
    } else {
        myAppJavaScript(jQuery);
    }
})();

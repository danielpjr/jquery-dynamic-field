/**
 * @developer Daniel Pierobon Jr
 * @email danielpjr80@gmail.com
 * @created 11/05/18 12:19
 *
 * @repository https://github.com/danielpjr/jquery-dynamic-field
 *
 * @dependencies jQuery Masked Input Plugin
 *				 http://digitalbush.com/projects/masked-input-plugin/#license)
 *
 * @credits Bubelbub
 * 			https://bootsnipp.com/snippets/featured/dynamic-form-fields-add-amp-remove-bs3
 *			https://github.com/Bubelbub
 */

(function( $ ) {

    'use strict';

    $.fn.agDynamicFields = function( options ) {

        // Defaults

        $.fn.agDynamicFields.defaults = {
            valuesSeparator : ',',
            containerClass : '',
            inputGroupClass : '',
            btnGroupClass : '',
            something: ''
        };

        var settings = $.extend( {}, $.fn.agDynamicFields.defaults, options );
		
        $.fn.agDynamicFields.option = function( name, value ) {
            name = name || false;
            value = value || false;

            if( !name )
            {
                return;
            }
            if( !value )
            {
                if( settings.hasOwnProperty( name ) )
                {
                    return settings[name];
                }
                else
                {
                    return;
                }
            }
            else
            {
                if( settings.hasOwnProperty( name ) )
                {
                    settings[name] = value;
                }
                else
                {
                    return;
                }
            }
        };

        var $values = $.trim( (this.data( 'ag-dynamic-fields-values' ) || '') + '' ).split( settings.valuesSeparator ) || [],
            $valuesLength = $values.length,
            $clone = this.clone(),
            $container = $( '<div class="ag-dynamic-fields">' ),
            $inputGroup = $( '<div class="entry input-group">' ),
            $btnGroup = $(
                '<span class="input-group-btn">' +
                ' <button class="btn" type="button">' +
                '  <i class="fa"></i>' +
                ' </button>' +
                '</span>'
            );

        $container.addClass( settings.containerClass );
        $btnGroup.addClass( settings.btnGroupClass );

        var $btnGroupAdd = $btnGroup,
            $btnGroupRemove = $btnGroup.clone();

        $btnGroupAdd.find( 'button' ).addClass( 'btn-add btn-primary' )
                    .find( 'i' ).addClass( 'fa-plus' );

        $btnGroupRemove.find( 'button' ).addClass( 'btn-remove btn-danger' )
                       .find( 'i' ).addClass( 'fa-minus' );

        this.after( $container );

        if( $valuesLength <= 1 )
        {
            $clone.val( $valuesLength ? $values[0] : '' );

            $inputGroup.prepend( $clone )
                       .append( $btnGroupAdd )
                       .addClass( settings.inputGroupClass );

            $container.html( $inputGroup );
        }
        else
        {
            for( var i in $values )
            {
                var $cloneAux = $clone.clone();

                $cloneAux.val( $values[i] );

                var $inputGroupAux = $inputGroup.clone();

                $inputGroupAux.prepend( $cloneAux ).addClass( settings.inputGroupClass );

                $inputGroupAux.append( ($valuesLength > (i + 1)) ? $btnGroupRemove : $btnGroupAdd );

                $container.append( $inputGroupAux );
            }
        }

        this.remove();

        $container.on( 'click', '.btn-add', function( e ) {

            e.preventDefault();

            var $this = $( this );

            var $currentEntry = $( this ).parents( '.entry:first' ),
                $newEntry = $( $currentEntry.clone() ).appendTo( $container ),
                $input = $newEntry.find( 'input' );

            $input.val( '' );

            if( $input.data( 'input-mask' ) )
            {
                if( $.isFunction($.fn[ 'themePluginMaskedInput']) )
                {
                    var opts = {};

					var pluginOptions = $this.data( 'plugin-options' );

					if( pluginOptions )
					{
						opts = pluginOptions;
					}

					$input.themePluginMaskedInput( opts );
				}
            }

            $container.find( '.entry:not(:last) .btn-add' )
                 .removeClass( 'btn-add' ).addClass( 'btn-remove' )
                 .removeClass( 'btn-primary' ).addClass( 'btn-danger' )
                 .html( '<span class="fa fa-minus"></span>' );

        } ).on( 'click', '.btn-remove', function( e ) {

            $( this ).parents( '.entry:first' ).remove();

            e.preventDefault();

            return false;
        } );
    };

}( jQuery ));
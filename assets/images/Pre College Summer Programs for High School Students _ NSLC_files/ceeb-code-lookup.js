jQuery(document).ready(function($){
	
	var _container = $('.ceeb-lookup-plugin');
	var hide_options = function() {
		_container.find('.new_school').addClass('hidden');
		_container.find('.new_school').hide();

	}
	
	var html_options = {
		div_group_class: (_container.attr('div-group-class') ? _container.attr('div-group-class') : '')
		,ceeb_code_class: (_container.attr('ceeb-code-class') ? _container.attr('ceeb-code-class') : '')
		,item_class: (_container.attr('item-class') ? _container.attr('item-class') : '')
		,submit_button_class:  (_container.attr('submit-button-class') ? _container.attr('submit-button-class') : '')
		,actions_hide:  (_container.attr('actions-hide') ? parseInt(_container.attr('actions-hide')) : 0)
		,custom_header:  (_container.attr('custom-header') ? '<h4>'+_container.attr('custom-header')+'</h4>' : '')
		,custom_init_methods:  (_container.attr('custom-init-methods') ? _container.attr('custom-init-methods').split(',') : new Array())
		,custom_home_schooled_methods: (_container.attr('custom-home-schooled-methods') ? _container.attr('custom-home-schooled-methods').split(',') : new Array())
		,custom_add_school_methods: (_container.attr('custom-add-school-methods') ? _container.attr('custom-add-school-methods').split(',') : new Array())
		,custom_selected_school_methods: (_container.attr('custom-selected-school-methods') ? _container.attr('custom-selected-school-methods').split(',') : new Array())
		,custom_no_default_ceeb_methods: (_container.attr('custom-no-default-ceeb-methods') ? _container.attr('custom-no-default-ceeb-methods').split(',') : new Array())
		,custom_search_methods: (_container.attr('custom-search-methods') ? _container.attr('custom-search-methods').split(',') : new Array())
		,remove_required: (_container.attr('remove-required') ? _container.attr('remove-required') : 0)
		,web_filter: (_container.attr('web-filter') ? _container.attr('web-filter') : '')
	};
	
	// default ceeb code
	var default_ceeb_code = $('#ceeb_code').val();
	
	$(document).on( 'click', 'input[name="search_submit"]', function () {
		$('.busy').show();
		$('.ceeb-form-fields').addClass('inactive');
	});
	
	$(document).on( 'ajax_completed', function () {
		$('.busy').hide();
		$('.ceeb-form-fields').removeClass('inactive');
	});
	
	/*$(document).ajaxComplete(function () {
		$('.busy').hide();
		$('.ceeb-form-fields').removeClass('inactive');
	});*/
	
	var html = '<div class="busy"></div>\
		<div class="ceeb-form-fields">\
		<div class="action search" '+(html_options.actions_hide && default_ceeb_code ? 'style="display: none;"' : '')+'>\
			'+html_options.custom_header+'\
			<div class="alert alert-info">\
				<h5><strong>Search Tips</strong></h5>\
				<ol>\
					<li>Look for abbreviations or the full name of your school. Examples: "Saint" vs. "St." or "WF" vs. "William Franklin"</li>\
					<li>If you cannot find your school, try searching by just state (with no city) to see a full list of your state\'s schools.</li>\
				</ol>\
			</div>\
			\
			<div class="row">\
				<div class="col-md-4">\
					<div class="form-group '+ html_options.div_group_class +'">\
						<select name="search_country" class="form-control search_country '+ html_options.item_class +'" data-validate="true" />\
						</select>\
					</div>\
				</div>\
				\
				<div class="col-md-4">\
					<div class="form-group '+ html_options.div_group_class +'">\
						<input type="text" placeholder="City" name="search_city" value="" class="form-control '+ html_options.item_class +'" />\
					</div>\
				</div>\
				\
				<div class="col-md-4">\
					<div class="form-group search_state_el '+ html_options.div_group_class +'">\
						<select name="search_states" class="form-control search_states '+ html_options.item_class +'">\
							<option value="">-- States --</option>\
						</select>\
					</div>\
				</div>\
			</div>\
			\
			<div class="form-group text-center">\
			<input type="button" name="search_submit" value="Search" class=" btn btn-primary" disabled="disabled" />\
			</div>\
		</div>\
		<div class="alert alert-info" role="alert"><p><span class="search_status '+ html_options.div_group_class +'"></span></p></div>\
		\
		<p class="ceeb-code '+ html_options.ceeb_code_class +'"></p>\
		<div class="non-action" '+(html_options.actions_hide && default_ceeb_code ? '' : 'style="display: none;"')+'>\
			<div class="form-group text-center">\
				<input type="button" name="change_school_submit" value="Change School" class=" btn btn-primary" />\
			</div>\
		</div>\
		<div class="action" '+(html_options.actions_hide && default_ceeb_code ? 'style="display: none;"' : '')+'>\
			<p style="display:none"><label><input type="radio" id="added_school" name="find_school" /> Manual entry</label></p>\
			<input type="hidden" name="school_temp_id" value="" />\
			<div class="new_school hidden">\
				<p><span class="submit_status"></span></p>\
				\
				<div class="row" id="add-new-school">\
					<div class="col-md-6">\
						<div class="form-group '+ html_options.div_group_class +'">\
							<input type="text" placeholder="School Name" name="school_name" value="" size="30" class="form-control school_name '+ html_options.item_class +'" '+ (html_options.remove_required ? '' : 'required')+' />\
						</div>\
					</div>\
					\
					<div class="col-md-6">\
						<div id="school_type" class="form-group '+ html_options.div_group_class +'">\
							<select name="school_type" class="form-control school_type '+ html_options.item_class +'" '+ (html_options.remove_required ? '' : 'required')+'>\
								<option value="">-- Type --</option>\
								<option value="elementary">Elementary (current 6th graders only)</option>\
								<option value="middle-junior">Middle School</option>\
								<option value="high-junior">Jr./Sr. High School</option>\
								<option value="high">High School</option>\
							</select>\
						</div>\
					</div>\
					\
					<div class="col-md-6">\
						<div id="school_country" class="form-group '+ html_options.div_group_class +'">\
							<select name="school_country" placeholder="School Country" class="form-control countries school_country '+ html_options.item_class +'" '+ (html_options.remove_required ? '' : 'required')+' />\
							</select>\
						</div>\
					</div>\
					\
					<div class="col-md-6">\
						<div class="form-group school_state '+ html_options.div_group_class +'">\
							<select name="school_state" id="school_state" class="form-control states '+ html_options.item_class +'" '+ (html_options.remove_required ? '' : 'required')+'>\
							</select>\
						</div>\
						<div class="form-group school_state_other" style="display:none;">\
							<input type="text" placeholder="State/Province/Region" name="school_state_other" id="school_state_other" value="" class="form-control" />\
						</div>\
					</div>\
					\
					<div class="col-md-4">\
						<div class="form-group '+ html_options.div_group_class +'">\
							<input type="text" placeholder="School Address Line 1" name="school_address1" value="" size="30" class="form-control school_address1 '+ html_options.item_class +'" '+ (html_options.remove_required ? '' : 'required')+' />\
						</div>\
					</div>\
					\
					<div class="col-md-3">\
						<div class="form-group '+ html_options.div_group_class +'">\
							<input type="text" placeholder="School Address Line 2" name="school_address2" value="" size="30" class="form-control school_address2 '+ html_options.item_class +'" />\
						</div>\
					</div>\
					\
					<div class="col-md-3">\
						<div class="form-group '+ html_options.div_group_class +'">\
							<input type="text" placeholder="School City" name="school_city" value="" size="30" class="form-control school_city '+ html_options.item_class +'" '+ (html_options.remove_required ? '' : 'required')+' />\
						</div>\
					</div>\
					\
					<div class="col-md-2">\
						<div class="form-group '+ html_options.div_group_class +'">\
							<input type="text" placeholder="School Zip" name="school_zip" value="" size="30" class="form-control school_zip '+ html_options.item_class +'" />\
						</div>\
					</div>\
					\
					<div class="col-md-12">\
						<div class="form-group text-center">\
							<input type="button" class="btn btn-primary school_submit '+ html_options.submit_button_class +'" value="Add School"/>\
						</div>\
					</div>\
				</div>\
			</div>\
		</div>\
	</div>';
	
	_container.html( html );
	
	
	// update countries
	var request = $.ajax({
		url: "/json/countries/",
		type: "GET",
		dataType: "html",
		success: function(obj) {
			_container.find('.countries').html(obj);
			_container.find('.search_country').html(obj);
		}	  
	});
	
	// update states
	var request = $.ajax({
		url: "/json/states/",
		type: "GET",
		dataType: "html",
		success: function(obj) {
			_container.find('.states').html(obj);
			_container.find('.search_states').html(obj);
		}	  
	});
	
	// countries dropdown
	_container.find("select.search_country").change( function() {
		var this_val = $(this).val();
		
		if( this_val.toLowerCase() == 'united states' || this_val.toLowerCase() == 'canada' ) {
			_container.find('.search_state_el').show();
			$('.search-city-req').show();
			
			/* Svilen (14 Feb 2018): Removed State requirement per Joel's reques */
			// $('.search-state-req').show();
			// $('.search_states').attr('required',true);
		} else {
			_container.find('.search_state_el').hide();
		}
		
		$('input[name="search_submit"]').attr('disabled', false);
	});
	
	// clear error class on entry
	if ( typeof $('form').validator != 'undefined' ) { 
		$(document).on( 'change', '.ceeb-lookup-plugin select,.ceeb-lookup-plugin input', function() {
			if ( $(this).val() ) $(this).closest('div').removeClass('has-error');
		})
	}
	
	// search submit 
	_container.find('input[name="search_submit"]').click( function(e) {
		if ($('#add-new-school').is(':hidden')) {
             $('#add-new-school').show();
        }
        else {
            $('#add-new-school').hide();
         }
		
		// validation
		//if (_container.find('.search_country').val() != '' && _container.find('.search_country').val() == 'United States' && _container.find('.search_states').val() == '') {
		if (_container.find('.search_country').val() == '' && _container.find('#ceeb_code').val() == '') {
			_container.find('.search_country').closest('div').addClass('has-error');
			return false;
		}
		else {
			_container.find('.search_country').closest('div').removeClass('has-error');
		}
		if (_container.find('.search_name').val() == '' && _container.find('#ceeb_code').val() == '') {
			_container.find('.search_name').closest('div').addClass('has-error');
			return false;
		}
		else {
			_container.find('.search_name').closest('div').removeClass('has-error');
		}
				
		if ( $(this).val() ) {
			var country = _container.find("select.search_country").val() ? '&country=' + _container.find("select.search_country").val() : '';
			var city = _container.find('input[name="search_city"]').val() ? '&city=' + _container.find('input[name="search_city"]').val() : '';
			var state = _container.find("select.search_states:visible").val() && country.toLowerCase() != 'united states' ? '&state=' + _container.find("select.search_states").val() : '';
			
			var ceeb_code = $("#ceeb_code").val();
			var ceeb_code_string = ceeb_code ? '&ceeb_code=' + ceeb_code : '';
			
			var s = city + state + ceeb_code_string + (html_options.web_filter ? '&web_filter='+html_options.web_filter : '');
			
			if ( s == ""  && ( country == "" || country.toLowerCase().indexOf('united states') != -1 ) ) return false;  // this partly to mitigate unexplained auto-search which otherwise generates huge dropdown of every registered high school
			
			s = s + country;
			
			var request = $.ajax({
				  url: "/json/ceeb-code-lookup/",
				  type: "GET",
				  data: 'search=true' + s,
				  dataType: "json",
				  success: function(obj) {
					  	
					  	// Let's create the search results dropdown
					  	updateSearchDropDown( e, obj );
					  	
					  	// Attach all necessary Search DropDown actions
						attachSearchDropDownActions();
						
						if ( !e.originalEvent && html_options.actions_hide )
							_container.find("select.schools").trigger('change');
						else
							hide_options();
						
						$('.ceeb-code-popup').hide().show();
						
						$(document).trigger( 'ajax_completed' );
						
						return false;
				  }	  
			});
			
		}
	});
	
	/**
	 * Update the Search Results dropdown
	 */
	function updateSearchDropDown ( e, obj ) {
		var ceeb_code = $("#ceeb_code").val();
		
		if ( typeof( e ) !== 'undefined' && !e.originalEvent && html_options.actions_hide )
			var str = '<label>Your Current School:</label> <br />';
		else 
			var str = '<label>Select your school from the search results: <span class="req">*</span></label> <br />';
		
		str += '<select name="schools" class="form-control schools '+ html_options.item_class +'" required>';
		str += '<option value=""> --- Search Results --- </option>';
		
		if ( typeof( e ) !== 'undefined' && e.originalEvent || !html_options.actions_hide )
			str += '<option value="" val="add_school">My school is not listed.</option>';
		
		str += '<option value="hmschl" '+(typeof (ceeb_code) != 'undefined' && ceeb_code == 'hmschl' ? 'selected="selected"' : '')+'>I am homeschooled and my instructional program is not listed.</option>';
		str += '<option value="">---</option>';
		
		if ( obj ) {
			for (i in obj) {
				str += '<option value="'+obj[i].code+'" '+(( Object.keys(obj).length == 1 && typeof (ceeb_code) != 'undefined' && obj[i].code == ceeb_code) ? 'selected="selected"' : '')+'>'+obj[i].name+' (' + (obj[i].country ? obj[i].country : '')+(obj[i].city ? ', '+obj[i].city : '') + (obj[i].state ? ', '+obj[i].state : '')+(obj[i].zip ? ', '+obj[i].zip : '') + ')</option>';
			}
		}
		str += '</select>';
		
		_container.find('.search_status').html(str);
	}
	
	function attachSearchDropDownActions () {
		// select schools - show ceeb code
		_container.find("select.schools").change( function() {
			if ( $(this).find('option:selected').attr('val') == 'add_school' ) {
				$(document).trigger('event_add_school');
				
				// $('#add_school').attr('checked',true).trigger('click');
			}
			// homeschooled logic
			else if ( $(this).val() == 'hmschl' ) {
				hide_options();
				_container.find('.ceeb-code').html('<strong>CEEB Code</strong> for this school is: <strong>hmschl</strong>');
				
				// invoke custom search school methods
				if ( html_options.custom_search_methods ) {
					for (i in html_options.custom_search_methods) {
						eval (html_options.custom_search_methods[i]+'();');
					}
				}
				
				$('#ceeb_code').val( $(this).val() );
				$('#ceeb_code').trigger('change');
				
				$('.ceeb-code-popup').hide().show();
				
				// invoke custom home school methods
				if ( html_options.custom_home_schooled_methods ) {
					for (i in html_options.custom_home_schooled_methods) {
						eval (html_options.custom_home_schooled_methods[i]+'();');
					}
				}
				
				$('.counselors').attr( 'data-validate', false ).attr('required', false);
				
				if ( typeof $('form').validator != 'undefined' ) { 
					$('form').validator('update');
				}
			}
			else if ( $(this).val() ) {
				hide_options();
				_container.find('.ceeb-code').html('<strong>CEEB Code</strong> for this school is: <strong>' + $(this).val() + '</strong>');
				// invoke custom search school methods
				if ( html_options.custom_search_methods ) {
					for (i in html_options.custom_search_methods) {
						eval (html_options.custom_search_methods[i]+'();');
					}
				}
				
				$('#ceeb_code').val( $(this).val() );
				$('#ceeb_code').trigger('change');
				
				$('.ceeb-code-popup').hide().show();
				
				$('.counselors').attr( 'data-validate', true ).attr('required', 'required');
				
				if ( typeof $('form').validator != 'undefined' ) { 
					$('form').validator('update');
				}
			}
			
			// remove check for added school if any
			$('#added_school').prop('checked', false);
		});
	}
	
	$(document).on('click', '#added_school', function() {
		if ( typeof $('form').validator != 'undefined' ) { 
			$('#ceeb_code').val( 'temp' );
			
			// set Search Dropdown to none selected state
			_container.find("select.schools").val('').removeAttr('required');
			
		} else {
			$('#ceeb_code').val( $('#added_ceeb_code').val() );
			_container.find('.ceeb-code').html('<strong>CEEB Code</strong> for this school is: <strong>' + $('#added_ceeb_code').val() + '</strong>');
		}
		
		$('div.form-group').find('[type=submit]').attr('disabled',false);
		
		if ( typeof $('form').validator != 'undefined' ) { 
			$('form').validator('update').validator('validate');
		}
	});
	
	$(document).on('click', '#added_school', function() {
		$('.counselor_info').show();
		$('.counselor_info_dropdown').hide();
		$('.recommender_info').show();
		$('.recommender_info_dropdown').hide();
		$('input[name="add_counselor"]').hide();
		$('input[name="add_recommender"]').hide();
	});

	// home school / manual entry
	$(document).on( 'click', "#added_school,input.school_submit", function() {
		// svilen: (06 Nov) Joel asked that we do not hide the search
		// _container.find('.action.search').hide();
		_container.find('.new_school').addClass('hidden');
		_container.find('.new_school').hide();
		
		// add school submit
		_container.find('[name="search_again_submit"]').click( function() {
			$('.non-action').hide();
			$('.action').show();
			$('.search_status').html('');
		});
		
		if ( typeof $('form').validator != 'undefined' ) { 
			_container.find('div.new_school input[type="text"][required], div.new_school select[required]').removeAttr('required').attr('was-required',true);
			$('form').validator('update');
		}
	});
	
	// add school click
	$(document).on('event_add_school', function(e) {
		$('.counselor_info').show();
		$('.counselor_info_dropdown').hide();
		$('.recommender_info').show();
		$('.recommender_info_dropdown').hide();
		$('input[name="add_counselor"]').hide();
		$('input[name="add_recommender"]').hide();
		
		// change school type dropdown values
		if ( html_options.web_filter == 'nslc' ) {
			var str = '<option value="">-- Type --</option>\
								<option value="high-junior">Jr./Sr. High School</option>\
								<option value="high">High School</option>';
		}
		else if ( html_options.web_filter == 'jnslc' ) {
			var str = '<option value="">-- Type --</option>\
								<option value="elementary">Elementary (current 6th graders only)</option>\
								<option value="middle-junior">Middle School</option>\
								<option value="high-junior">Jr./Sr. High School</option>';
		}
		else {
			var str = '<option value="">-- Type --</option>\
								<option value="elementary">Elementary (current 6th graders only)</option>\
								<option value="middle-junior">Middle School</option>\
								<option value="high-junior">Jr./Sr. High School</option>\
								<option value="high">High School</option>';
		}
		
		_container.find('.school_type').html(str);
		
		_container.find('.new_school').removeClass('hidden');
		_container.find('.new_school').show();
		
		// svilen: (06 Nov) Joel asked that we do not hide the search
		// _container.find('.search_status').html('<div class="form-group text-center"><input type="button" name="search_again_submit" value="Search Again" class=" btn btn-primary" /></div>');
		$('#ceeb_code').val( '' ).trigger('change');
		$('div.form-group').find('[type=submit]').attr('disabled',true);
		
		// add school submit
		_container.find('[name="search_again_submit"]').click( function() {
			$('.non-action').hide();
			$('.action').show();
			$('.search_status').html('');
			_container.find('.new_school').addClass('hidden');
			_container.find('.new_school').hide();
		});
		
		_container.find('input[name="school_name"]').focus();
	
		
		// invoke custom add school methods
		if ( html_options.custom_add_school_methods ) {
			
			for (i in html_options.custom_add_school_methods) {
				eval (html_options.custom_add_school_methods[i]+'();');
			}
		}
		
		if ( typeof $('form').validator != 'undefined' ) { 
			_container.find('div.new_school input[type="text"][was-required], div.new_school select[was-required]').removeAttr('was-required').attr( 'required', true );
			$('form').validator('update');
		}
	});
	
	// add school submit
	_container.find('.new_school .school_submit').click( function() {
		// validation
		var error = false;
		
		if (_container.find('.new_school .school_name').val() == '') {
			_container.find('.new_school .school_name').closest('div').addClass('has-error');
			error = true;
		}
		else {
			_container.find('.new_school .school_name').closest('div').removeClass('has-error');
		}
		
		if (_container.find('.new_school .school_type').val() == '') {
			_container.find('.new_school .school_type').closest('div').addClass('has-error');
			error = true;
		}
		else {
			_container.find('.new_school .school_type').closest('div').removeClass('has-error');
		}
		
		if (_container.find('.new_school .school_country').val() == '') {
			_container.find('.new_school .school_country').closest('div').addClass('has-error');
			error = true;
		}
		else {
			_container.find('.new_school .school_country').closest('div').removeClass('has-error');
		}
		
		if (_container.find('.new_school .school_address1').val() == '') {
			_container.find('.new_school .school_address1').closest('div').addClass('has-error');
			error = true;
		}
		else {
			_container.find('.new_school .school_address1').closest('div').removeClass('has-error');
		}
		
		if (_container.find('.new_school .school_city').val() == '') {
			_container.find('.new_school .school_city').closest('div').addClass('has-error');
			error = true;
		}
		else {
			_container.find('.new_school .school_city').closest('div').removeClass('has-error');
		}
		
		if (_container.find('.new_school .school_country').val() != '' && ( _container.find('.new_school .school_country').val() == 'United States' || _container.find('.new_school .school_country').val() == 'Canada' ) && _container.find('.new_school #school_state').val() == '') {
			_container.find('.new_school #school_state').closest('div').addClass('has-error');
			error = true;
		}
		else {
			_container.find('.new_school #school_state').closest('div').removeClass('has-error');
		}
		
		if (_container.find('.new_school .school_zip').val() == '' && _container.find('.new_school .school_country').val() != '' && ( _container.find('.new_school .school_country').val() == 'United States' || _container.find('.new_school .school_country').val() == 'Canada' )) {
			_container.find('.new_school .school_zip').closest('div').addClass('has-error');
			error = true;
		}
		else {
			_container.find('.new_school .school_zip').closest('div').removeClass('has-error');
		}
		
		if ( error ) {
			return false;
		}
		else {
			_container.find('.new_school input:visible').closest('div').removeClass('has-error');
		}
		
		if ( $(this).val() ) {
			$('#ceeb_code').val('temp');
			$('input[type="submit"]').focus();
			
			var addurl = "/json/ceeb-code-lookup/";
			if ( $('body').hasClass('body-admin') )
				addurl = addurl + 'admin-add';
			else
				addurl = addurl + 'add';
			
			var request = $.ajax({
			url: addurl,
			type: "GET",
			data: "school_name=" + _container.find('input[name="school_name"]').val() + "&school_type=" + _container.find('select[name="school_type"]').val() + "&school_address1=" + _container.find('input[name="school_address1"]').val() + "&school_address2=" + _container.find('input[name="school_address2"]').val() + "&school_city=" + _container.find('input[name="school_city"]').val() +  "&school_state=" + ( ( _container.find('[name="school_country"]').val() == 'United States' || _container.find('[name="school_country"]').val() == 'Canada' ) ? _container.find('[name="school_state"]').val() : _container.find('[name="school_state_other"]').val() )+ "&school_zip=" + _container.find('input[name="school_zip"]').val() + "&school_country=" + _container.find('select[name="school_country"]').val() + ( _container.find('input[name="school_temp_id"]').val() ? "&temp_id=" + _container.find('input[name="school_temp_id"]').val() : '' ),
			dataType: "json",
			success: function(obj) {
					if( obj.status == 'success' )
						$('input[name="school_temp_id"]').val( obj.temp_id );
						
					$('div.form-group').find('[type=submit]').attr('disabled',false);
				
					//_container.find('.new_school .submit_status').html( '<strong>' + obj.school_name + '</strong> was successfully created');
					_container.find('input[name="search_school"]').val('');
					_container.find('input[name="search_country"]').val('');
					_container.find('input[name="search_city"]').val('');
					_container.find('input[name="search_states"]').val('');
					
					//_container.find('input[name="search_submit"]').trigger('click');
					
					if ( html_options.actions_hide ) {
						_container.find('.new_school').addClass('hidden');
						_container.find('.new_school').hide();
						
						_container.find('.non-action').show();
						_container.find('.action').hide();
					}
					
					if ( typeof $('form').validator != 'undefined' ) { 
						$('.search_status').html( obj.school_name );
						$('.duplicate_counselor_id').attr( 'data-validate', false );
						$('#ceeb_code').val( 'temp' );
						$('input#added_ceeb_code').val( 'temp' );
						
						window.scrollTo(0,0);
					} else {
						$('input#ceeb_code').val(obj.highschool_code);
						$('input#added_ceeb_code').val(obj.highschool_code);
					}
					
					$('#added_school').closest('p').show().html( '<label><input type="radio" id="added_school" name="find_school" /> Manual entry: ' + obj.school_name + '</label>' );
					$('#added_school').attr('checked',true).trigger('click');
					$('select[name="schools"]').hide( function() {
						if ( typeof $('form').validator != 'undefined' ) { 
							$('form').validator('update');
						}
					});
					
					$(document).trigger( 'ajax_completed' );
				}
			});
		
		}
	});
	
	_container.find('[name="school_country"]').bind('change', function() {
		if ( $(this).val() == 'United States' || $(this).val() == 'Canada') {
			_container.find('.school_state').show();
			_container.find('.school_state_other').hide();
			_container.find('.zip-label').html('School Zip <span class="req">*</span>');
			_container.find('.zip-label span').show();
			_container.find('[name="school_zip"]').attr('required',true);
		} else {
			_container.find('.school_state').hide();
			_container.find('.school_state_other').show();
			_container.find('.zip-label').html('School Postal Code');
			_container.find('[name="school_zip"]').removeAttr('required').closest('div').removeClass('has-error').removeClass('has-danger');
		}
		
		if ( typeof $('form').validator != 'undefined' ) { 
			$('form').validator('update');
		}
	});
	
	// school search result select
	/*$(document).on( 'change', 'select[name="schools"]', function() {
		if ( typeof $(this).val() != 'undefined' && $(this).val() != 'add_school' ) {
			_container.find('#selected_school').closest('p').show().html( '<label><input type="radio" id="selected_school" name="find_school" value="' + $(this).val() + '" />&nbsp;' +  $(this).find('option:selected').html() + '</label>' );
			_container.find('#selected_school').trigger('click');
		}
		
		if ( typeof $('form').validator != 'undefined' ) { 
			$('form').validator('update');
		}
	});*/
	
	/*$(document).on( 'change', 'input[name="schools"]', function() {
		if ( $('select.schools').val() != 'add_school' ) {
			_container.find('#selected_school').closest('p').hide().html( '<label><input type="radio" id="selected_school" name="find_school" value="' + $(this).val() + '" />&nbsp;' +  $(this).nextAll('strong').html() + '</label>' );
		}
		
		if ( typeof $('form').validator != 'undefined' ) { 
			$('form').validator('update');
		}
	});*/
	
	/*$(document).on( 'click', 'input[name="find_school"]', function() {
		if ( _container.find('#selected_school').attr('value') && $('select.schools').val() != 'add_school') {
			_container.find('#selected_school').closest('p').show();
		}
	});*/
	
	$(document).on( 'change', '#ceeb_code', function() {
		if ( $(this).val() == '' )
			$('div.form-group').find('[type=submit]').attr('disabled',true);
		else
			$('div.form-group').find('[type=submit]').attr('disabled',false);
	
		if ( typeof $('form').validator != 'undefined' ) { 
			$('form').validator('update');
			$('form').validator('validate');
		}
	});
	
	// add school submit
	_container.find('[name="change_school_submit"]').click( function() {
		$('.non-action').hide();
		$('.action').show();
		
		// Clear Ceeb Code first
		$('#ceeb_code').val( $(this).val() );
		$('#ceeb_code').trigger('change');
				
		// Let's create the search results dropdown
	  	updateSearchDropDown( );
	  	
	  	// Attach all necessary Search DropDown actions
		attachSearchDropDownActions();
		
		if ( typeof $('form').validator != 'undefined' ) { 
			$('form').validator('update').validator('validate');
		}
	});
	
	// default ceeb code
	if ( default_ceeb_code ) {
		_container.find('input[name="search_submit"]').trigger('click');
	}
	else {
		// invoke custom no default ceeb methods
		if ( html_options.custom_no_default_ceeb_methods ) {
			
			for (i in html_options.custom_no_default_ceeb_methods) {
				eval (html_options.custom_no_default_ceeb_methods[i]+'();');
			}
		}
		
		$(document).trigger( 'ajax_completed' );
	}
	
	$(document).on( 'keydown', 'input[name="search_city"]', function(e) {
		var keyCode = e.keyCode || e.which;

		if (keyCode == 13) {
			e.preventDefault();
			_container.find('input[name="search_submit"]').trigger('click');
			return false;
		}
	});
	
	$(document).on( 'keydown', 'div.new_school input, div.new_school select', function(e) {
		var keyCode = e.keyCode || e.which;

		if (keyCode == 13) {
			e.preventDefault();
			$(this).closest('div').nextAll(':visible').find('input[type="text"],select,input[type="button"]').first().focus();
			return false;
		}
	});
	
	$('[name="user[home_country]"]').bind('change', function() {
		if ( $(this).val() == 'United States' || $(this).val() == 'Canada') {
			$('[name="user[home_zip_code]"]').attr('required',true).prevAll('label').html('Zip Code <span class="req">*</span>');
			$('[name="user[home_zip_code]"]').prevAll('label span').show();
		} else {
			$('[name="user[home_zip_code]"]').removeAttr('required').prevAll('label').html('Postal Code');
			$('[name="user[home_zip_code]"]').prevAll('label').html('Postal Code');
		}
		
		if ( typeof $('form').validator != 'undefined' ) { 
			$('form').validator('update');
		}
	});
	
	// invoke custom init methods
	if ( html_options.custom_init_methods ) {
		for (i in html_options.custom_init_methods) {
			eval (html_options.custom_init_methods[i]+'();');
		}
	}	
});
$.mobile.allowCrossDomainPages = true;
_debug = false;

var popUp;
var city_id='';
var category_id='';

var gallery_cat='';
var galstr='';
var player_cat='';
var fix_cat='';

var reg_id="";
var isuserexist=false;


var lastattemptpage='';

var connectionStatus = 'online';


var cart = { cartdata: []};
var indexary=new Array();
var ids = [];
var cityarr=new Array();
var cityidarr=new Array();

var user = {
	"store_id" : "",
	"store_name" : "",
	"redeem_logic" : "",
	"mobile" : "",
	"mode" : "",
	"email" : "",
	"billno" : "",
	"name" : "",
	"store_code" : ""
};

var SERVER = "https://nanduschicken.mloyalretail.com/apis/";
var SERVER1 = "https://nanduschicken.mloyalretail.com/m/"; 

$(document).ready(function(event){

                 
				 $( function() {
					$( "#otp_pop" ).enhanceWithin().popup();
				});

                
                 $("#wait").css("display","none"); // hide it initially
				
                 $(document).ajaxStart(function() {
                       $("#wait").css("display","block");
                    });

                 $(document).ajaxStop(function() {
                       $("#wait").css("display","none");
                    });
				


				 var stid = localStorage.getItem("st_nandusbot2");

                 if(typeof stid==undefined || stid==null)
                    stid=''

				

				 if(stid=='') 
	                 {
					  
                        $.mobile.changePage('#mylocation', { transition: 'flip', allowSamePageTransition: true, reverse: false});
					   
	                 }
				   else
					  {
						if(localStorage.getItem("username_nandusbot2")!=null && localStorage.getItem("username_nandusbot2")!='' && localStorage.getItem("password_nandusbot2")!=null && localStorage.getItem("password_nandusbot2")!='')
	                    {
	                           $('#username_store').val(localStorage.getItem("username_nandusbot2"));
	                           $('#password_store').val(localStorage.getItem("password_nandusbot2"));

							 
							   authenticate();

	                                                
	                     }
						  else{
							  
									
									   $('#username_store').val(localStorage.getItem("username_nandusbot2"));
									   $('#password_store').val(localStorage.getItem("password_nandusbot2"));
									   $.mobile.changePage( "#mylocation", { transition: "none"} );
						  }	
							
					  }
                   
});

$(document).on('pageshow', '#feedback', function (event, ui) {
	
		$("#submitbtn").css('background', '#459dcc');
		$("#submitbtn").html("Submit");

});

function getOTP()
{
	 var mob = $('#forgot_mobile').val();
	 
	 if(mob==''){
		 toast('Please enter your mobile number');
	 }
	 else if(mob.length==10){
		 
		 $.ajax({
			
			url: SERVER+'redemption_otp_request_json_api.asp',
			type: 'GET',
			timeout: 30000,
			dataType: 'html',
		
			data: {'mobileno': mob,'store_id' : user.store_id},
			success: function(data, textStatus, xhr) {

				if(data.indexOf("<meta charset")>=0)
				{
					data = data.substr(data.indexOf("{"),data.length);
				}

				data=JSON.parse(data);
			 console.log(data);
			 console.log(textStatus);
			 if(data.error=='No Data available!!'){
				 
				  console.log("In forgot_pswd.asp");
				  toast("No OTP found for "+mob);
				 // toast('The  passcode has been sent to your mobile.Please check your SMS.');
				 
			      //$('#forgot_otp').val(myotp);
				 
				
              }
			  else{
			  	$("#gtpblock").css('display', 'block');
			  	$("#voublock").css('display', 'none');
				 $('#forgot_otp').val(data.data[0].otp);
				
			 }
                    
			 },
			error: function(xhr, textStatus, errorThrown) {
				 toast('Could not connect to Server, make sure you are connected to Internet');
				}
		});
  }else{
   toast('Please enter 10 digits mobile number');
  }

}


function getVouOtp()
{
	 var mob = $('#forgot_mobile').val();

	 var ccode= $('#ccode').val();
	 
	 if(mob=='' || ccode=='' ){
		 toast('Please enter your mobile number and coupon code both');
	 }
	 else if(mob.length==10){
		 
		 $.ajax({
			
			url: SERVER+'coupon_otp_json_api.asp',
			type: 'GET',
			timeout: 30000,
				dataType: 'html',
		
			data: {'apiuid':'MLOYALAPI','apipswd':'Ml0yalAP!2o14','mobileno': mob,'coupon':ccode,'store_id' : user.store_id},
			success: function(data, textStatus, xhr) {

				if(data.indexOf("<meta charset")>=0)
				{
					data = data.substr(data.indexOf("{"),data.length);
				}

				data=JSON.parse(data);
			 console.log(data);
			 console.log(textStatus);
			 if(data.error=='No Coupon available !!'){
				 
				  console.log("In forgot_pswd.asp");
				  toast("No OTP found for "+mob);
				 // toast('The  passcode has been sent to your mobile.Please check your SMS.');
				 
			      //$('#forgot_otp').val(myotp);
				 
				
              }
			  else{
			  	$("#gtpblock").css('display', 'block');
			  	$("#voublock").css('display', 'none');
				 $('#forgot_otp').val(data.data[0].otp);
				
			 }
                    
			 },
			error: function(xhr, textStatus, errorThrown) {
				 toast('Could not connect to Server, make sure you are connected to Internet');
				}
		});
  }else{
   toast('Please enter 10 digits mobile number');
  }

}



function getVou()
{
	 var mob = $('#forgot_mobile').val();
	 
	 if(mob==''){
		 toast('Please enter your mobile number');
	 }
	 else if(mob.length==10){
		 
		 $.ajax({
			
			url: SERVER+'coupon_json_api.asp',
			type: 'GET',
			timeout: 30000,
				dataType: 'html',
		
			data: {'apiuid':'MLOYALAPI','apipswd':'Ml0yalAP!2o14','mobileno': mob,'store_id' : user.store_id},
			success: function(data, textStatus, xhr) {

				if(data.indexOf("<meta charset")>=0)
				{
					data = data.substr(data.indexOf("{"),data.length);
				}

				data=JSON.parse(data);

				
			 console.log(data.error);
			 console.log(textStatus);
			 if(data.error=='No Coupon available !!'){
				 
				  console.log("In forgot_pswd.asp");
				  toast("No Voucher found for "+mob);
				 // toast('The  passcode has been sent to your mobile.Please check your SMS.');
				 
			      //$('#forgot_otp').val(myotp);
				 
				
              }
			  else{

			  	 var str='';

			  	  for (var j = 0; j < data.data.length; j++)
					{
						str +='<div class="ui-grid-solo">';
                        str +='<div class="ui-block-a">';	
                        str +='<div class="approval_block"><span class="customer_name">Coupon Code :'+data.data[j].CouponCode+'</span></div>';
                         str +='<div class="approval_block"><span class="customer_name">Expiry Date :'+data.data[j].ExpiryDate+'</span></div>';
                          str +='<div class="approval_block"><span class="customer_name">Discount :'+data.data[j].Discount+'</span></div>';
						str +='</div>';
						
						str +='</div>';

					}

			  	$("#gtpblock").css('display', 'none');
			  	$("#voublock").css('display', 'block');

			  	document.getElementById("vblock").innerHTML=str;
				 
			 }
                    
			 },
			error: function(xhr, textStatus, errorThrown) {
				 toast('Could not connect to Server, make sure you are connected to Internet');
				}
		});
  }else{
   toast('Please enter 10 digits mobile number');
  }

}

function authenticate()
{

	 var uname = $('#username_store').val();
	 var pass = $('#password_store').val();
	 
	 if(uname=='' || pass==''){
		 toast('Please enter credentials');
	 }
	 else{
		 $.ajax({
		   url: SERVER+'login_json_api.asp',
		   type: 'GET',
		   timeout: 50000,
			dataType: 'html', //xml/html/script/json/jsonp
			data: {'apiuid':'MLOYALAPI','apipswd':'Ml0yalAP!2o14','userid': uname, 'pswd': pass},
			complete: function(xhr, textStatus) {
		   //called when complete
			},
			success: function(data, textStatus, xhr) {

				if(data.indexOf("<meta charset")>=0)
				{
					data = data.substr(data.indexOf("{"),data.length);
				}

				data=JSON.parse(data);
			    console.log(JSON.stringify(data));
			    //console.log(textStatus);
			    
			     if(data.data.length=='1')
				 {

				 user.store_id = data.data[0].store_id;
				 user.store_name = data.data[0].store_name;
				 user.redeem_logic = data.data[0].redeem_logic;
				 user.store_code = data.data[0].store_code;

				 $('#username_store').val('');
				 $('#password_store').val('');
				
				
				 localStorage.setItem("st_nandusbot2",user.store_id);
				 localStorage.setItem("stcode_nandusbot2",user.store_code);

				 localStorage.setItem("st1_nandusbot2",uname);
				 localStorage.setItem('username_nandusbot2',uname);
				 localStorage.setItem('password_nandusbot2',pass);
				 document.getElementById("sname").innerHTML =user.store_name ;
	             $.mobile.changePage( '#home' );

				}
				else
				{
					toast('Invalid Username and Password.');
				}
			   
			  
                    
			 },
			error: function(xhr, textStatus, errorThrown) {
				 toast('Could not connect to Server, make sure you are connected to Internet'+textStatus);
				}
		});
  
	 }
  

}


function openInWebView(url)
	{
		
	
          //var ref = window.open(url, '_blank', 'location=yes,toolbar=yes');
		  cordova.ThemeableBrowser.open(url, '_blank', {
               backButtonCanClose: true,
    statusbar: {
        color: '#231F20'
    },
    toolbar: {
        height: 78,
        color: '#231F20'
    },
    title: {
        color: '#ffffff',
  staticText: '', 
        showPageTitle: false
    },
    backButton: {
        wwwImage: '',
        wwwImagePressed: '',
        align: 'left',
        event: ''
    },
    forwardButton: {
        wwwImage: '',
        wwwImagePressed: '',
        align: 'center',
        event: ''
    },
    closeButton: {
        wwwImage: 'img/leftMenu_back.png',
        wwwImagePressed: 'img/leftMenu_back.png',
        align: 'left',
  marginLeft: '16px',
        event: ''
    },
    customButtons: [
        {
            image: 'share',
            imagePressed: 'share_pressed',
            align: 'right',
            event: 'sharePressed'
        }
    ],
    menu: {
        image: 'menu',
        imagePressed: 'menu_pressed',
        title: 'Test',
        cancel: 'Cancel',
        align: 'right',
        items: [
           /* {
                event: 'helloPressed',
                label: 'Hello World!'
            },
            {
                event: 'testPressed',
                label: 'Test!'
            }*/
        ]
    },
    backButtonCanClose: true
}).addEventListener('backPressed', function(e) {
    //alert('back pressed');
}).addEventListener('helloPressed', function(e) {
    //alert('hello pressed');
}).addEventListener('sharePressed', function(e) {
    //alert(e.url);
}).addEventListener(cordova.ThemeableBrowser.EVT_ERR, function(e) {
    console.error(e.message);
}).addEventListener(cordova.ThemeableBrowser.EVT_WRN, function(e) {
    console.log(e.message);
});



	}

var toast = function (msg) {
    $("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h5>" + msg + "</h5></div>")
            .css({display: "block",
                opacity: 0.99,
                position: "fixed",
                padding: "7px",
                "text-align": "center",
                width: "270px",
                background: "#CA2217",
                "text-shadow": "none",
                "color": "#ffffff",
                //left: ($(window).width() - 284) / 2,
                top: $(window).height() / 2})
            .appendTo($.mobile.pageContainer).delay(2500)
            .fadeOut(400, function () {
                $(this).remove();
            });
}

var toast2 = function (msg) {
    $("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h5>" + msg + "</h5></div>")
            .css({display: "block",
                opacity: 0.99,
                position: "fixed",
                padding: "7px",
                "text-align": "center",
                width: "270px",
                background: "#CA2217",
                "text-shadow": "none",
                "color": "#ffffff",
                //left: ($(window).width() - 284) / 2,
                top: $(window).height() / 2})
            .appendTo($.mobile.pageContainer).delay(7000)
            .fadeOut(400, function () {
                $(this).remove();
            });
}

function resendPoints()
{

  var mob = $('#p1_mob').val();

  if(mob=='')
  {
		toast('Please enter mobile no.');
  }
  else
  {
		
    $.ajax({
     url: SERVER+'myapi',
     type: 'POST',
     timeout: 50000,
     dataType: 'json',
     data: {
				'mob': mob
			},
   
    success: function(data, textStatus, xhr) {

				console.log('JSONDATA:'+JSON.stringify(data));

				if(data.success=='1')
				{
					toast('Request sent successfully.');

					$('#p1_mob').val('');
				}
				else
				{
					toast('Error in sending request..');
				}

				$.mobile.changePage( "#home", { transition: "none"} );

    },
    error: function(xhr, textStatus, errorThrown) {
				toast('Could not connect to Server, make sure you are connected to Internet'+textStatus+': '+errorThrown);
    }
  });

 }

}


function resendCoupon()
{

  var mob = $('#p2_mob').val();

  if(mob=='')
  {
		toast('Please enter mobile no.');
  }
  else
  {
		
    $.ajax({
     url: SERVER+'myapi',
     type: 'GET',
     timeout: 50000,
     dataType: 'json',
     data: {
				'mob': mob
			},
   
    success: function(data, textStatus, xhr) {

				console.log('JSONDATA:'+JSON.stringify(data));

				if(data.success=='1')
				{
					toast('Request sent successfully.');

					$('#p2_mob').val('');
				}
				else
				{
					toast('Error in sending request..');
				}

				$.mobile.changePage( "#home", { transition: "none"} );

    },
    error: function(xhr, textStatus, errorThrown) {
				toast('Could not connect to Server, make sure you are connected to Internet'+textStatus+': '+errorThrown);
    }
  });

 }

}

function reactPoints()
{

  var mob = $('#p3_mob').val();
  var pts = $('#p3_rpoints').val();
  var billno = $('#p3_billno').val();
  var store = $('#p3_store').val();

  if(mob=='' || pts=='' || billno=='' || store=='' )
  {
		toast('Please enter mandatory fields');
  }
  else
  {
		
    $.ajax({
     url: SERVER+'myapi',
     type: 'GET',
     timeout: 50000,
     dataType: 'json',
     data: {
				'mob': mob,
				'pts': pts,
				'billno': billno,
				'store': store
			},
   
    success: function(data, textStatus, xhr) {

				console.log('JSONDATA:'+JSON.stringify(data));

				if(data.success=='1')
				{
					toast('Request sent successfully.');
				}
				else
				{
					toast('Error in sending request..');
				}

				$.mobile.changePage( "#home", { transition: "none"} );

    },
    error: function(xhr, textStatus, errorThrown) {
				toast('Could not connect to Server, make sure you are connected to Internet'+textStatus+': '+errorThrown);
    }
  });

 }

}

function reactCoupon()
{

  var mob = $('#p4_mob').val();
  var rcode = $('#p4_rcode').val();
  //var billno = $('#p4_billno').val();

  if(mob=='' || rcode=='' )
  {
		toast('Please enter mandatory fields');
  }
  else if(mob.length!=10)
  {
		toast('Invalid mobile no.');
  }
  else
  {
		
    $.ajax({
     url: SERVER+'reactivate_coupon_api_bot.asp',
     type: 'GET',
     timeout: 50000,
     dataType: 'json',
     data: {
		        'apiuid': 'MLOYALAPI',
				'apipswd': 'Ml0yalAP!2o14',
				'mobileno': mob,
				'coupon_code': rcode,
				'storeuid':  localStorage.getItem("username_nandusbot2"),
				'storepswd': localStorage.getItem("password_nandusbot2")
			},
   
    success: function(data, textStatus, xhr) {

				console.log('JSONDATA:'+JSON.stringify(data));

				if(data.error.length>0)
				{
					toast(data.error);
				}
				else
				{
					toast2(data.data);
				}

				$('#p4_mob').val('');
                $('#p4_rcode').val('');

				//$.mobile.changePage( "#home", { transition: "none"} );

    },
    error: function(xhr, textStatus, errorThrown) {
				toast('Could not connect to Server, make sure you are connected to Internet'+textStatus+': '+errorThrown);
    }
  });

 }

}

function updateMob()
{

  var mob1 = $('#p5_mobnew').val();
  var mob2 = $('#p5_mobold').val();

  if(mob1=='' || mob2=='' )
  {
		toast('Please enter both mobile no.');
  }
  else
  {
		
    $.ajax({
     url: SERVER+'myapi',
     type: 'GET',
     timeout: 50000,
     dataType: 'json',
     data: {
				'mobnew': mob1,
				'mobold': mob2
			},
   
    success: function(data, textStatus, xhr) {

				console.log('JSONDATA:'+JSON.stringify(data));

				if(data.success=='1')
				{
					toast('Request sent successfully.');
				}
				else
				{
					toast('Error in sending request..');
				}

				$.mobile.changePage( "#home", { transition: "none"} );

    },
    error: function(xhr, textStatus, errorThrown) {
				toast('Could not connect to Server, make sure you are connected to Internet'+textStatus+': '+errorThrown);
    }
  });

 }

}

function mergeMob()
{

  var mob1 = $('#p6_mobnew').val();
  var mob2 = $('#p6_mobold').val();

  if(mob1=='' || mob2=='' )
  {
		toast('Please enter both mobile no.');
  }
  else
  {
		
    $.ajax({
     url: SERVER+'myapi',
     type: 'GET',
     timeout: 50000,
     dataType: 'json',
     data: {
				'mobnew': mob1,
				'mobold': mob2
			},
   
    success: function(data, textStatus, xhr) {

				console.log('JSONDATA:'+JSON.stringify(data));

				if(data.success=='1')
				{
					toast('Request sent successfully.');
				}
				else
				{
					toast('Error in sending request..');
				}

				$.mobile.changePage( "#home", { transition: "none"} );

    },
    error: function(xhr, textStatus, errorThrown) {
				toast('Could not connect to Server, make sure you are connected to Internet'+textStatus+': '+errorThrown);
    }
  });

 }

}

function sendptOtp_old()
{

  var mob = $('#p7_mob').val();
  var pts = $('#p7_rpoints').val();
  var billno = $('#p7_billno').val();

  
  if(mob=='' || pts=='' || billno=='')
  {
		toast('Please enter mandatory fields');
  }
  else if(mob.length!=10)
  {
		toast('invalid mobile no.');
  }
  else
  {
		
    $.ajax({
     url: SERVER+'burn_points_otp_json_api.asp',
     type: 'GET',
     timeout: 50000,
     dataType: 'json',
     data: {
				'apiuid': 'MLOYALAPI',
				'apipswd': 'Ml0yalAP!2o14',
				'mobileno': mob,
				'redeem_points': pts,
				'ref_bill_number': billno,
				'scode': user.store_id
			},
   
    success: function(data, textStatus, xhr) {

				console.log('JSONDATA:'+JSON.stringify(data));

				if(data.error.length>0)
				{
					toast(data.error);
				}
				else
				{
					toast2(data.data);
				}

				$.mobile.changePage( "#home", { transition: "none"} );

				$('#p7_mob').val('');
				$('#p7_rpoints').val('');
				$('#p7_billno').val('');

    },
    error: function(xhr, textStatus, errorThrown) {
				toast('Could not connect to Server, make sure you are connected to Internet'+textStatus+': '+errorThrown);
    }
  });

 }

}

function sendptOtp()
{

  var mob = $('#p7_mob').val();
  //var pts = $('#p7_rpoints').val();
  //var billno = $('#p7_billno').val();

  
  if(mob=='')
  {
		toast('Please enter mandatory fields');
  }
  else if(mob.length!=10)
  {
		toast('invalid mobile no.');
  }
  else
  {
		
    $.ajax({
     url: SERVER+'redemption_otp_request_json_api.asp',
			type: 'GET',
			timeout: 30000,
			dataType: 'html',
		
			data: {'mobileno': mob },
			success: function(data, textStatus, xhr) {

				if(data.indexOf("<meta charset")>=0)
				{
					data = data.substr(data.indexOf("{"),data.length);
				}

				data=JSON.parse(data);
			    console.log(data);


				if(data.hasOwnProperty('error')) 
				{
					if(data.error.length>0)
					{
						toast(data.error);
					}
				}
				else
				{
					toast2('OTP is: '+data.data[0].otp);
				}

				/*if(data.error.length>0)
				{
					toast(data.error);
				}
				else 
				{
					toast2('OTP is: '+data.otp);
				}*/

				$.mobile.changePage( "#home", { transition: "none"} );

				$('#p7_mob').val('');
				//$('#p7_rpoints').val('');
				//$('#p7_billno').val('');


			 

    },
    error: function(xhr, textStatus, errorThrown) {
				toast('Could not connect to Server, make sure you are connected to Internet'+textStatus+': '+errorThrown);
    }
  });

 }

}

function sendappOtp()
{
  document.getElementById("otp_div").innerHTML='';
  var mob = $('#p19_mob').val();

  if(mob=='')
  {
		toast('Please enter mobile no.');
  }
  else if(mob.length!=10)
  {
		toast('Invalid mobile no.');
  }
  else
  {
		
    $.ajax({
     url: SERVER1+'msg_history_json_1.asp',
     type: 'GET',
     timeout: 50000,
     dataType: 'json',
     data: {
				'mno': mob
			},
   
    success: function(data, textStatus, xhr) {

				 console.log('JSONDATA:'+JSON.stringify(data));

				 if (data.length == 0) 
				 {
						toast('No OTP Found');
						$('#p19_mob').val('');
				 }
				 else
				 {
					 var smsbody=data[0].msg;

					 var getotptoend=smsbody.substr(smsbody.indexOf('password is')+12,smsbody.length);

					 var getotp=getotptoend.substr(0,getotptoend.indexOf('.'));
			
					 //console.log(getotp);
					 toast('OTP is: '+getotp);
					 document.getElementById("otp_div").innerHTML=getotp;

					 $('#otp_pop').popup();
					 $('#otp_pop').popup('open');

					 $('#p19_mob').val('');

				 }


    },
    error: function(xhr, textStatus, errorThrown) {
				toast('Could not connect to Server, make sure you are connected to Internet'+textStatus+': '+errorThrown);
    }
  });

 }

}

function sendcpnOtp()
{
	 document.getElementById("otp_div").innerHTML='';
	 var mob = $('#p8_mob').val();
	 var couponcode = $('#p8_couponcode').val();
	 var billno = $('#p8_billno').val();

	 
	 if(mob=='' || couponcode=='' || billno==''){
		 toast('Please enter your mobile number/coupon code');
	 }
	 else if(mob.length==10){
		 
		 $.ajax({
			
			url: SERVER+'get_redeem_coupon_otp_json_api.asp',
			type: 'GET',
			timeout: 30000,
			dataType: 'json',
			data: {
				'apiuid': 'MLOYALAPI',
				'apipswd': 'Ml0yalAP!2o14',
				'mobileno': mob,
				'couponcode': couponcode,
				'scode':  user.store_id,
				'ref_bill_number':  billno
			},
			success: function(data, textStatus, xhr) {

				console.log('JSONDATA:'+JSON.stringify(data));

				/*if(data.indexOf("<meta charset")>=0)
				{
					data = data.substr(data.indexOf("{"),data.length);
				}

				data=JSON.parse(data);
			 console.log(data);
			 console.log(textStatus);
			 if(data.error=='No Data available!!')
			 {
				 
				  console.log("In forgot_pswd.asp");
				  toast("No OTP found for "+mob);
				  $('#p8_mob').val('');
				
             }
			 else
			 {
			  

				toast('OTP is: '+data.data[0].otp);
				document.getElementById("otp_div").innerHTML=data.data[0].otp;

				$('#otp_pop').popup();
			    $('#otp_pop').popup('open');

				$('#p8_mob').val('');


				}*/
				if(data.error.length>0)
				{
					toast(data.error);
				}
				else
				{
					toast2(data.data);
				}

                $('#p8_mob').val('');
	            $('#p8_couponcode').val('');
				$('#p8_billno').val('');
				
			 
                    
			 },
			error: function(xhr, textStatus, errorThrown) {
				 toast('Could not connect to Server, make sure you are connected to Internet');
				}
		});
  }else{
   toast('Please enter 10 digits mobile number');
  }

}

function updateBill()
{

  var mob = $('#p9_mob').val();
  var billno = $('#p9_billno').val();
  var billdt = $('#p9_billdt').val();
  var store = $('#p9_store').val();

  var dob = billdt.split('-');
		var mm = dob.length == 3 ? dob[1] : '';
		var dd = dob.length == 3 ? dob[2] : '';
		var yyyy = dob.length == 3 ? dob[0] : '';

  if(mob=='' || billno=='' || billdt=='' || store=='' )
  {
		toast('Please enter mandatory fields');
  }
  else
  {
		
    $.ajax({
     url: SERVER+'myapi',
     type: 'GET',
     timeout: 50000,
     dataType: 'json',
     data: {
				'mob': mob,
				'billno': billno,
				'billdt': billdt,
				'store': store
			},
   
    success: function(data, textStatus, xhr) {

				console.log('JSONDATA:'+JSON.stringify(data));

				if(data.success=='1')
				{
					toast('Request sent successfully.');
				}
				else
				{
					toast('Error in sending request..');
				}

				$.mobile.changePage( "#home", { transition: "none"} );

    },
    error: function(xhr, textStatus, errorThrown) {
				toast('Could not connect to Server, make sure you are connected to Internet'+textStatus+': '+errorThrown);
    }
  });

 }

}

function unsubPsms()
{

  var mob = $('#p10_mob').val();

  if(mob=='')
  {
		toast('Please enter mobile no.');
  }
  else
  {
		
    $.ajax({
     url: SERVER+'myapi',
     type: 'GET',
     timeout: 50000,
     dataType: 'json',
     data: {
				'mob': mob
			},
   
    success: function(data, textStatus, xhr) {

				console.log('JSONDATA:'+JSON.stringify(data));

				if(data.success=='1')
				{
					toast('Request sent successfully.');
				}
				else
				{
					toast('Error in sending request..');
				}

				$.mobile.changePage( "#home", { transition: "none"} );

    },
    error: function(xhr, textStatus, errorThrown) {
				toast('Could not connect to Server, make sure you are connected to Internet'+textStatus+': '+errorThrown);
    }
  });

 }

}

function unsubTsms()
{

  var mob = $('#p11_mob').val();

  if(mob=='')
  {
		toast('Please enter mobile no.');
  }
  else
  {
		
    $.ajax({
     url: SERVER+'myapi',
     type: 'GET',
     timeout: 50000,
     dataType: 'json',
     data: {
				'mob': mob
			},
   
    success: function(data, textStatus, xhr) {

				console.log('JSONDATA:'+JSON.stringify(data));

				if(data.success=='1')
				{
					toast('Request sent successfully.');
				}
				else
				{
					toast('Error in sending request..');
				}

				$.mobile.changePage( "#home", { transition: "none"} );

    },
    error: function(xhr, textStatus, errorThrown) {
				toast('Could not connect to Server, make sure you are connected to Internet'+textStatus+': '+errorThrown);
    }
  });

 }

}

function deactPro()
{

  var mob = $('#p12_mob').val();

  if(mob=='')
  {
		toast('Please enter mobile no.');
  }
  else
  {
		
    $.ajax({
     url: SERVER+'myapi',
     type: 'GET',
     timeout: 50000,
     dataType: 'json',
     data: {
				'mob': mob
			},
   
    success: function(data, textStatus, xhr) {

				console.log('JSONDATA:'+JSON.stringify(data));

				if(data.success=='1')
				{
					toast('Request sent successfully.');
				}
				else
				{
					toast('Error in sending request..');
				}

				$.mobile.changePage( "#home", { transition: "none"} );

    },
    error: function(xhr, textStatus, errorThrown) {
				toast('Could not connect to Server, make sure you are connected to Internet'+textStatus+': '+errorThrown);
    }
  });

 }

}

function blockCust()
{

  var mob = $('#p13_mob').val();

  if(mob=='')
  {
		toast('Please enter mobile no.');
  }
  else
  {
		
    $.ajax({
     url: SERVER+'myapi',
     type: 'GET',
     timeout: 50000,
     dataType: 'json',
     data: {
				'mob': mob
			},
   
    success: function(data, textStatus, xhr) {

				console.log('JSONDATA:'+JSON.stringify(data));

				if(data.success=='1')
				{
					toast('Request sent successfully.');
				}
				else
				{
					toast('Error in sending request..');
				}

				$.mobile.changePage( "#home", { transition: "none"} );

    },
    error: function(xhr, textStatus, errorThrown) {
				toast('Could not connect to Server, make sure you are connected to Internet'+textStatus+': '+errorThrown);
    }
  });

 }

}

$(document).on('pageshow', '#page14', function (event, ui) {

	loadcitylist();

});

function loadcitylist()
{

$.ajax({
   url: SERVER1+'city_locator_json.asp',
   type: 'GET',
   timeout: 50000,
   dataType: 'json',
   data: {},
   complete: function(xhr, textStatus) {
   //called when complete
    },
    success: function(data, textStatus, xhr) {
  
   //called when successful

	var listItems= "";
	    listItems+= "<option value='0' disabled='disabled' style='background-color:#3E3E3E'  selected='selected'>-Select City-</option>";
				 for (var i = 0; i < data.data.length; i++)
					{
						listItems+= "<option value='" + data.data[i].cityid + "'>" + data.data[i].cityname + "</option>";
					}
     
	  $("#p14_city").html(listItems);
   
   
    },
    error: function(xhr, textStatus, errorThrown) {

    }
  });
}

function updateProfile()
{
	    var mobile = $('#p14_mob').val();
		var firstname = $('#p14_cname').val();
		var lastname = '';
		var email = $('#p14_email').val();
		var gender=$('input[name="p14_gender"]:checked').val();

	
		/*var birthday = $('#update_dob').val();
		var dob = birthday.split('-');
		var mm = dob.length == 3 ? dob[1] : '';
		var dd = dob.length == 3 ? dob[2] : '';
		var yyyy = dob.length == 3 ? dob[0] : '';*/

		//var devid=$('#push_reg_no').val();

		var dd =$('#p14_dd').val();
		var mm =$('#p14_mm').val();
		var yyyy =$('#p14_yyyy').val();
		var dd1 =$('#p14_dd1').val();
		var mm1 =$('#p14_mm1').val();
		var yyyy1 =$('#p14_yyyy1').val();


		var city = $('#p14_city').val();
		var state = $('#p14_state').val();

		var cityname = $("#p14_city option:selected").text();

		var deviceType = (navigator.userAgent.match(/iPad/i)) == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i)) == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";
       				
                   if(deviceType=='null')
                        deviceType='Android';


		//console.log('city:'+city);

		if(mobile=='' || firstname=='' || email=='' || city=='0' || city==null || city=='null' || city=='undefined' || city==undefined || gender=='' || gender=='undefined' || gender==undefined)
		{
			toast('Please enter mandatory fields.');
		}
		else
		{
    
	$.ajax({
			url: SERVER1+'mloyalprofileupdate.asp',
			type: 'GET',
			timeout: 30000,
		  	data: {
				FirstName: firstname,
				LastName: lastname,
				deviceid:reg_id,
				cname:'',
				Emailid: email,
				mobileno: mobile,
				dd: dd,
				mm: mm,
				yy: yyyy,
				dd1: dd1,
				mm1: mm1,
				yy1: yyyy1,
                deviceType:deviceType,
                city: city,
				state: state
				

				//subscribe: bc_hair
				
			},
			success: function(data, textStatus, xhr) {
				
				if (data.indexOf("Success")>=0)
				{
						toast('Your profile has been updated successfully.');
						
				}
				else if(data=='Failed')
					toast('Update failed.');
				else
					toast(data);
					
				
					$.mobile.changePage( "#home", {transition: "slideup"} );    
                 
				
				
			},
			error: function(xhr, textStatus, errorThrown) {
				toast('Could not connect to Server, make sure you are connected to Internet');
			}
		});
		
		}
}

function genBdaycode()
{

  var mob = $('#p15_mob').val();
  var bdate = $('#p15_dob').val();

  var dob = bdate.split('-');
		var mm = dob.length == 3 ? dob[1] : '';
		var dd = dob.length == 3 ? dob[2] : '';
		var yyyy = dob.length == 3 ? dob[0] : '';

  if(mob=='' ||  bdate=='')
  {
		toast('Please enter mobile no.');
  }
  else
  {
		
    $.ajax({
     url: SERVER+'myapi',
     type: 'GET',
     timeout: 50000,
     dataType: 'json',
     data: {
				'mob': mob,
				'dob': dob
			},
   
    success: function(data, textStatus, xhr) {

				console.log('JSONDATA:'+JSON.stringify(data));

				if(data.success=='1')
				{
					toast('Request sent successfully.');
				}
				else
				{
					toast('Error in sending request..');
				}

				$.mobile.changePage( "#home", { transition: "none"} );

    },
    error: function(xhr, textStatus, errorThrown) {
				toast('Could not connect to Server, make sure you are connected to Internet'+textStatus+': '+errorThrown);
    }
  });

 }

}

function genAnnicode()
{

  var mob = $('#p16_mob').val();
  var adate = $('#p16_doa').val();

  var doa = adate.split('-');
		var mm = doa.length == 3 ? doa[1] : '';
		var dd = doa.length == 3 ? doa[2] : '';
		var yyyy = doa.length == 3 ? doa[0] : '';

  if(mob=='' || adate=='')
  {
		toast('Please enter mobile no.');
  }
  else
  {
		
    $.ajax({
     url: SERVER+'myapi',
     type: 'GET',
     timeout: 50000,
     dataType: 'json',
     data: {
				'mob': mob,
				'doa': doa
			},
   
    success: function(data, textStatus, xhr) {

				console.log('JSONDATA:'+JSON.stringify(data));

				if(data.success=='1')
				{
					toast('Request sent successfully.');
				}
				else
				{
					toast('Error in sending request..');
				}

				$.mobile.changePage( "#home", { transition: "none"} );

    },
    error: function(xhr, textStatus, errorThrown) {
				toast('Could not connect to Server, make sure you are connected to Internet'+textStatus+': '+errorThrown);
    }
  });

 }

}

function sysIssue()
{

  var mob = $('#p17_mob').val();
  var issuedt = $('#p17_dof').val();
  var store = $('#p17_store').val();

  var dof = issuedt.split('-');
		var mm = dof.length == 3 ? dof[1] : '';
		var dd = dof.length == 3 ? dof[2] : '';
		var yyyy = dof.length == 3 ? dof[0] : '';

  if(mob=='' || issuedt=='' || store=='' )
  {
		toast('Please enter details');
  }
  else
  {
		
    $.ajax({
     url: SERVER+'myapi',
     type: 'GET',
     timeout: 50000,
     dataType: 'json',
     data: {
				'mob': mob,
				'issuedt': issuedt,
				'store': store
			},
   
    success: function(data, textStatus, xhr) {

				console.log('JSONDATA:'+JSON.stringify(data));

				if(data.success=='1')
				{
					toast('Request sent successfully.');
				}
				else
				{
					toast('Error in sending request..');
				}

				$.mobile.changePage( "#home", { transition: "none"} );

    },
    error: function(xhr, textStatus, errorThrown) {
				toast('Could not connect to Server, make sure you are connected to Internet'+textStatus+': '+errorThrown);
    }
  });

 }

}

function reqTransact()
{

  var mob = $('#p18_mob').val();
  var storemail = $('#p18_email').val();

  if(mob=='' || storemail=='')
  {
		toast('Please enter details');
  }
  else
  {
		
    $.ajax({
     url: SERVER+'myapi',
     type: 'GET',
     timeout: 50000,
     dataType: 'json',
     data: {
				'mob': mob,
				'storemail': storemail
			},
   
    success: function(data, textStatus, xhr) {

				console.log('JSONDATA:'+JSON.stringify(data));

				if(data.success=='1')
				{
					toast('Request sent successfully.');

					$('#p2_mob').val('');
				}
				else
				{
					toast('Error in sending request..');
				}

				$.mobile.changePage( "#home", { transition: "none"} );

    },
    error: function(xhr, textStatus, errorThrown) {
				toast('Could not connect to Server, make sure you are connected to Internet'+textStatus+': '+errorThrown);
    }
  });

 }

}

function fetchCustomer()
{

 var mob =$('#p14_mob').val();


 $.ajax({

	   url: SERVER+'get_points_json_api.asp',
	   type: 'GET',
	   timeout: 50000,
		dataType: 'html',
		data: {'apiuid':'MLOYALAPI','apipswd':'Ml0yalAP!2o14','mobileno': mob },
		complete: function(xhr, textStatus) {
	   //called when complete
		},
		success: function(data, textStatus, xhr) {

		//console.log('JSONDATA:'+JSON.stringify(data));

		if(data.indexOf("<meta charset")>=0)
		{
			data = data.substr(data.indexOf("{"),data.length);
		}
		
		console.log('after removing style JSONDATA:'+JSON.stringify(data));
        data=JSON.parse(data);

		console.log("success2:"+JSON.stringify(data));

		if(data.data.length>0)
			{
				//toast('Customer is registered with us');

				$('#p14_cname').val(data.data[0].CustomerName);
				$('#p14_email').val(data.data[0].Email);


				$('input[name="p14_gender"]:checked').val(data.data[0].gender);

				if(data.data[0].dobday=='null' || data.data[0].dobday==null || data.data[0].dobday=='')
					data.data[0].dobday='00';
				if(data.data[0].dobmonth=='null' || data.data[0].dobmonth==null || data.data[0].dobmonth=='')
					data.data[0].dobmonth='00';
				if(data.data[0].dobyear=='null' || data.data[0].dobyear==null || data.data[0].dobyear=='')
					data.data[0].dobyear='0';

				if(data.data[0].doaday=='null' || data.data[0].doaday==null || data.data[0].doaday=='')
					data.data[0].doaday='00';
				if(data.data[0].doamonth=='null' || data.data[0].doamonth==null || data.data[0].doamonth=='')
					data.data[0].doamonth='00';
				if(data.data[0].doayear=='null' || data.data[0].doayear==null || data.data[0].doayear=='')
					data.data[0].doayear='0';

				data.data[0].dobday = (data.data[0].dobday).trim();
				data.data[0].doaday = (data.data[0].doaday).trim();
				data.data[0].dobmonth = (data.data[0].dobmonth).trim();
				data.data[0].doamonth = (data.data[0].doamonth).trim();


				if((data.data[0].dobday).length<2)
				   data.data[0].dobday='0'+(data.data[0].dobday);
				  
				if((data.data[0].doaday).length<2)
				   data.data[0].doaday='0'+(data.data[0].doaday);

				if((data.data[0].dobmonth).length<2)
				   data.data[0].dobmonth='0'+(data.data[0].dobmonth);

				if((data.data[0].doamonth).length<2)
				   data.data[0].doamonth='0'+(data.data[0].doamonth);
				   

				$('#p14_dd').val(data.data[0].dobday);
				$('#p14_mm').val(data.data[0].dobmonth);
				$('#p14_yyyy').val(data.data[0].dobyear);
				$('#p14_dd1').val(data.data[0].doaday);
				$('#p14_mm1').val(data.data[0].doamonth);
				$('#p14_yyyy1').val(data.data[0].doayear);


				if(data.data[0].gender=='male' || data.data[0].gender=='Male')
				{
					document.getElementById("p14_gender_male").checked = true;
				}
				else if(data.data[0].gender=='female' || data.data[0].gender=='Female')
				{
					document.getElementById("p14_gender_female").checked = true;
				}
				else
				{
					//do nothing
				}

			}
		else
			{
			    toast('Customer is not registered with us');
				
			}

		},
		error: function(xhr, textStatus, errorThrown) {
			//toast('Could not connect to Server, make sure you are connected to Internet'+textStatus+': '+errorThrown);
		}
  });

}

function get_Offersvcr()
{

  var mob = $('#p7_mob').val();
  
  if(mob=='')
  {
		toast('Please enter mobile no.');
  }
  else if(mob.length!=10)
  {
		toast('invalid mobile no.');
  }
  else
  {
		
    $.ajax({
     url: SERVER+'get_offer_for_mobileno_json_api.asp',
			type: 'GET',
			timeout: 30000,
			dataType: 'json',
			data: {'apiuid':'MLOYALAPI','apipswd':'Ml0yalAP!2o14','mobileno': mob,'store_code':user.store_code},
			success: function(data, textStatus, xhr) {

				
				 console.log("data:"+JSON.stringify(data));

				 if(data.error.length>0)
				 {
					toast(data.error);
				 }
				 else
				 {

					  var str = '';
 
				      str +='<div class="table-responsive">';
					  str +='<table class="table offer_list">';
					  str +='<thead class="table_header"><th>S.No.</th><th>Offer</th><th>Issued on</th><th>Status</th></thead>';
					  for (var i = 0; i < data.data.length; i++)
					  {
						  
							str+='<tr>';
							str+='<td class="list_link">'+checkforundefined(i+1)+'.</td>';
							str+='<td class="list_link">'+checkforundefined(data.data[i].OfferName)+'</td>';
							//str+='<td class="list_link">'+checkforundefined(data.data[i].CouponCode)+'</td>';
							str+='<td class="list_link">'+checkforundefined(data.data[i].IssuedOn)+'</td>';
							str+='<td class="list_link">'+checkforundefined(data.data[i].CouponStatus)+'</td>';
							str+='</tr>';
								   
					  }	  
					  str +='</table>';
					  str +='</div>';


					  document.getElementById("page8_div").innerHTML= str;
					  $.mobile.changePage( "#page8", { transition: "none"} );

				 }


			 
    },
    error: function(xhr, textStatus, errorThrown) {
				toast('Could not connect to Server, make sure you are connected to Internet'+textStatus+': '+errorThrown);
    }
  });

 }

}

function checkforundefined(str)
{
    if(typeof str==undefined || str=='undefined'|| str==null || str=='null' || str=='')
    {
        str='';
    }
        return str;
}

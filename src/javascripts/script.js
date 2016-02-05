
function calculatorInsulineAdvanced(){
	var insulineUnit;
	var carbohydrate = parseInt($(".carbohydrate").val());
	var productWeight = parseInt($(".product-weight").val());
	var relativeWeight = parseInt($(".relative-weight").val());

	insulineUnit = Math.round((((productWeight/relativeWeight)*carbohydrate)/10)*1.5);
	$(".answers span").text(insulineUnit);
	// return insulineUnit;
}

function calculatorInsuline(){
	var insulineUnit;
	var carbohydrate = parseInt($(".carbohydrate-only").val());

	insulineUnit = Math.round((carbohydrate/10)*1.5);
	$(".answers span").text(insulineUnit);
	// return insulineUnit;
}
$(document).ready(function() {
    $('.tabs .tab-links a').on('click', function(e)  {
        var currentAttrValue = $(this).attr('href');

        console.log($(currentAttrValue), $(currentAttrValue).siblings());
 
        // Show/Hide Tabs
        $(currentAttrValue).addClass("active");
        $(currentAttrValue).siblings().removeClass("active");

 
        // Change/remove current tab to active
        $(this).parent('li').addClass('active').siblings().removeClass('active');
 
        e.preventDefault();
    });
});

$(".submit-advanced").click(function(){
	// console.log(calculatorInsuline());
	calculatorInsulineAdvanced();
});

$(".submit").click(function(){
	// console.log(calculatorInsuline());
	calculatorInsuline();
});
require('jquery');
echarts1 = require('echarts');
var tmp = require.async('relation');

boxSize();

$(window).resize(function() {
	$(".contain").width(0);
	$(".contain").height(0);

	boxSize();
});

function boxSize() {
	var winWidth = $(window).width();
	var winHeight = $(window).height();

	var leftWidth = (winWidth - 10 * 2 * 3) * 0.757;
	var rightWidth = (winWidth - 10 * 2 * 3) * 0.242
	var upHeight = (winHeight - 10 * 2 * 3) * 0.6046;
	var downHeight = (winHeight - 10 * 2 * 3) * 0.3954;

	$(".contain").width(winWidth - 20);
	$(".contain").height(winHeight - 20);

	$(".relation_cont").width(leftWidth);
	$(".relation_cont").height(upHeight);

	$(".risky_assets_cont").width(rightWidth);
	$(".risky_assets_cont").height(upHeight);

	$(".module_cont").width((leftWidth - 20) / 2);
	$(".module_cont").height(downHeight);

	$(".visit_cont").width((leftWidth - 20) / 2);
	$(".visit_cont").height(downHeight);

	$(".level_cont").width(rightWidth);
	$(".level_cont").height(downHeight);

}
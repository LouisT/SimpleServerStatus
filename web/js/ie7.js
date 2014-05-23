(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'status\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-freebsd': '&#xe600;',
		'icon-switch': '&#xe601;',
		'icon-smiley': '&#xe602;',
		'icon-sad': '&#xe603;',
		'icon-warning': '&#xe604;',
		'icon-tux': '&#xe605;',
		'icon-apple': '&#xe606;',
		'icon-windows': '&#xe608;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());

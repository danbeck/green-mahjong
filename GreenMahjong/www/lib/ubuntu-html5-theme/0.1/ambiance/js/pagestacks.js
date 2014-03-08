/*
 * Copyright (C) 2013 Adnane Belmadiaf <daker@ubuntu.com>
 * License granted by Canonical Limited
 *
 * This file is part of ubuntu-html5-theme.
 *
 * This package is free software; you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as 
 * published by the Free Software Foundation; either version 3 of the 
 * License, or
 * (at your option) any later version.
 
 * This package is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 
 * You should have received a copy of the GNU Lesser General Public 
 * License along with this program. If not, see 
 * <http://www.gnu.org/licenses/>.
 */

/* Pagestack */
var Pagestack = (function () {
    
    function __safeCall(f, args, errorfunc) {
	if (typeof(f) !== 'function')
	    return;
	try {
	    f.apply(null, args);
	}
	catch(e) { if (errorfunc && typeof(errorfunc) === 'function') errorfunc(e) }
    };

    function Pagestack () {
	this._pages = [];
    };

    Pagestack.prototype = {
	__setAllPagesVisibility: function (visible) {
	    var visibility = visible ? "block" : "none";
	    [].forEach.call(document.querySelectorAll("[data-role='pagestack'] [data-role='page']"), function(el) {
		el.style.display = visibility;

		// treat footers separately
		var footer = el.querySelector('footer');
		if (footer)
		    footer.style.display = visibility;
	    });
	},
	__isPage: function (element) {
	    return element.getAttribute('data-role') === 'page';
	},
	__deactivate: function (id) {
	    if (!id || typeof(id) !== 'string')
		return;
	    var page = document.getElementById(id);
	    if ( ! this.__isPage(page)) {
		return;
	    }
	    page.style.display = "none";
	    if (page.querySelector('footer')) {
		var footer = page.querySelector('footer');
		footer.style.display = 'none';
		footer.classList.remove('revealed');
	    }
	},
	__activate: function (id) {
	    if (!id || typeof(id) !== 'string')
		return;
	    var page = document.getElementById(id);
	    if ( ! this.__isPage(page)) {
		return;
	    }
	    page.style.display = "block";
	    if (page.querySelector('footer')) {
		var footer = page.querySelector('footer');
		footer.style.display = 'block';
		footer.classList.add('revealed');
	    }
	},
	push: function (id, properties) {
	    try {
		__safeCall(this.__setAllPagesVisibility.bind(this), [false]);

		this.__activate(id);
		this._pages.push(id);
	    }
	    catch(e) {}
	},
	isEmpty: function () {
	    return this._pages.length === 0;
	},
	currentPage: function () {
	    return this.isEmpty() ? null : this._pages[this._pages.length-1];
	},
	depth: function() {
	    return this._pages.length;
	},
	clear: function() {
	    if (this.isEmpty())
		return;
	    __safeCall(this.__deactivate.bind(this), [this.currentPage()]);
	    this._pages = [];
	},
	pop: function() {
	    if(this.isEmpty())
		return;
	    __safeCall(this.__deactivate.bind(this), [this.currentPage()]);
	    this._pages.pop();
	    __safeCall(this.__activate.bind(this), [this.currentPage()]);
	}
    }

    return Pagestack;
})();
    

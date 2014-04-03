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

/* Lists */
var List = (function () {
    var LIST_DATA_ROLE = 'list';

    var __addUlIfNotFound = function(list) {
	if (list) {
	    var uls = list.querySelectorAll('ul');
	    if (uls == null || uls.length == 0) {
		var ul = document.createElement('ul');
		list.appendChild(ul);
	    }
	}
    };

    var List = function (selector) {
	var list = document.querySelector(selector);
	if (list == null || list.nodeName.toLowerCase() !== 'section' || list.getAttribute('data-role') != LIST_DATA_ROLE) {
	    throw new Error('Element with selector "' + selector + '" does not exist or not declared as a "list" <section>');
	}
	this._list = list;

	__addUlIfNotFound(this._list);
    };

    List.prototype = {
	setHeader: function (text) {
	    if (typeof(text) == 'string') {
		var header = this._list.querySelectorAll('header');
		if (header) {
		    if (header.length > 1) {
			// more than one <header> detected
			throw new Error("More than one <header> tag detected");
		    }
		    if (header.length == 1)
			header = header[0];
		    else
			header = null;
		}

		if (!header)
		    header = document.createElement('header');

		header.innerText = text;
	    }
	},
	/*
	  \brief Appends a item to the list
	  
	  Appends a given item to the current list.
	  
	  \param text A string of text (images & custom html not supported at the moment)
	  \param onclick (optional) A function callback that is to be called when the item is clicked.
	                 It will be called with the clicked node as a parameter along with the value of
			 user_data (if any).
	  \param id (optional) An optional Id for the added node, the id will only be added if it does not already
	                       conflict with another one.
          \param user_data (optional) An javascript entity that will be passed to the onclick callback (if any)
	                              when the event has been trigger.
	  \return added item node or null
	 */
	append: function (text, label, id, onclick, user_data) {
	    var li = document.createElement('li');
	    var a = document.createElement('a');

	    a.setAttribute('href', '#');
	    if (onclick && typeof(onclick) == 'function') {
		li.addEventListener('click', function(event) {
		    onclick(event ? event.target : null, user_data);
		    if (event)
			event.preventDefault();
		});
	    }
	    //FIXME: no real checks on text content
	    a.innerText = text;
	    li.appendChild(a);

	    if (label && typeof(label) == 'string') {
		var n = document.createElement('label');
		n.innerText = label;
		li.appendChild(n);
	    }

	    if (id && typeof(id) == 'string') {
		if ( ! document.getElementById(id))
		    li.setAttribute('id', id);
	    }
	    this._list.querySelector('ul').appendChild(li);

	    return li;
	},
	/*
	  \brief returns the nth child item from a list
	  
	  \param index Index of the child to return (0 based number)
	  \return selected item node or null
	 */
	at: function (index) {
	    if (typeof(index) != 'number')
		return null;
	    return this._list.querySelector('ul').querySelector('li:nth-child(' + index + ')');
	},
	/*
	  \brief removes the nth child item from a list
	  
	  \param index Index of the child to remove (0 based number)
	  \return nothing
	 */
	remove: function (index) {
	    var item = this.at(index);
	    if (item) {
		item.parendNode.removeChild(item);
	    }
	},
	/*
	  \brief removes all the child items from a list
	  \return nothing
	 */
	removeAllItems: function() {
	    if (this._list.querySelector('ul'))
		this._list.querySelector('ul').innerHTML = '';
	},
	/*
	  \brief iterator over the list of list items and calls a function on each one
	  
	  \param func function to be called for each list item. The function
	              receives the DOM node associated with the current item along with its
		      index.
	  \return nothing
	*/
	forEach: function (func) {
	    if (typeof(func) !== 'function')
		return;
	    var items = this._list.querySelector('ul').querySelectorAll('li');
	    Array.prototype.forEach.call(items, function (element, index) {
		func(element, index);
	    });
	},
    };

    return List;
}) ();



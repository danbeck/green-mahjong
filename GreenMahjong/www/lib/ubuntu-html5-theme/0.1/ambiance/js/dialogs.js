/*
 * Copyright (C) 2013 Adnane Belmadiaf <daker@ubuntu.com>
 * License granted by Canonical Limited
 *
 * This file is part of ubuntu-html5-ui-toolkit.
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

/**
 * Dialogs are modal full-screen popups that prevent other GUI interactions with the application until dismissed.

Dialogs wrap arbitrary markup.

Dialogs are declared at the top level inside the <em>content</em> div.
 * @class Dialog
 * @constructor
 * @namespace UbuntuUI
 * @example
      <div data-role="content">
        <div data-role="pagestack">
          [...]
        </div>
        <div data-role="dialog" id="dialogID">
          [...]
        </div>
      </div>

      JavaScript access:
      var dialog = UI.dialog("dialogID");

 */
var Dialog = function (id) {
    this.id = id;
    this.dialog = document.getElementById(id);
};

Dialog.prototype = {
    /**
     * Display a dialog by adding 'active' CSS class
     * @method show
     */
    show: function () {
        this.dialog.classList.add('active');
    },
    /**
     * Hide a dialog by removing 'active' class
     * @method hide
     */
    hide: function () {
        this.dialog.classList.remove('active');
    },
    /**
     * Toggle a dialog, which means removing its 'active' class if it has one, or adding the 'active' class if it does not have one
     * @method toggle
     */
    toggle: function () {
        this.dialog.classList.toggle('active');
    },
    /**
     * Returns the DOM element associated with the id this widget is bind to.
     * @method element
     * @return {DOMElement}
     * @example
        var mydialog = UI.dialog("dialogid").element();
     */
    element: function () {
	return document.getElementById(this.id);
    }
};

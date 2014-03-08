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
 * A Progress.

 Note the Ubuntu CSS style classes: <em>infinite</em>

 * @class Progress
 * @constructor
 * @namespace UbuntuUI
 * @example
      <progress value="80" max="100"></progress>

      Javascript access:
      var pre = UI.progrss("progressID");
 */
var Progress = (function () {

    function Progress(id) {
        this.id = id;
        this.max = 1;
        this.ele = this.element();
        this.__setupMessage();
    }

    Progress.prototype = {
        /**
         * Returns the DOM element associated with the id this widget is bind to.
         * @method element
         * @example
            var myprogress = UI.progress("progressid").element();
         */
        element: function() {
            if(document.getElementById(this.id)) {
                return document.getElementById(this.id);
            }
        },

        /**
         * Updates the value of the progress bar
         * @method update
         * @example
            myprogress.update(30);
         */
        update: function(value) {
            if(value != null && this.__IsNumeric(value)) {
                this.ele.value = value;
                this.__updateMessage(value);
            }else{
                console.error('Progress bar value element is NaN - ID:', this.id);
            }
        },

        /**
         * @private
         */
        __setupMessage: function() {
            if(this.ele) {
                if(this.ele.getAttribute("max") && this.__IsNumeric(this.ele.getAttribute("max"))) {
                    this.max = this.ele.getAttribute("max");
                }else{
                console.error('Progress bar max element is NaN - ID:', this.id);
            }
                if(this.ele.getAttribute("value")) {
                    this.update(this.ele.getAttribute("value"));
                }
            }else{
                console.error('Progress bar missing - ID:', this.id);
            }
        },

        /**
         * @private
         */
        __updateMessage: function(value) {
            this.ele.setAttribute('data-percentage', Math.max(0, Math.min(100, Math.floor((100 / this.max) * value))) + '%');
        },

        /**
         * @private
         */
        __IsNumeric: function(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        },
    };
    return Progress;
})();

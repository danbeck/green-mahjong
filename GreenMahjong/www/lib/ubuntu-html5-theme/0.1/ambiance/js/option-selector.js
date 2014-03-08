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
 * <http://www.gnu.org/licenses/>
 */

/**
 * OptionSelector is a component displaying either a single selected value or expanded multiple choice with an optional image and subtext when not expanded, when expanding it opens a
    listing of all the possible values for selection with an additional option of always being expanded. If multiple choice is selected the list is expanded automatically.

 * @class OptionSelector
 * @constructor
 * @namespace UbuntuUI
 * @example
      <section data-role="option-selector" id="OptionSelectorID">
        <ul>
          <li data-value="0">
            <p>Label 1</p>
          </li>
          <li data-value="1">
            <p>Label 2</p>
          </li>
          <li data-value="3">
            <p>Label 3</p>
          </li>
        </ul>
      </section>

      JavaScript:
      UI.optionselector.METHOD();
*/
var OptionSelector = (function () {

    var  __values = "";

    function OptionSelector (id, expanded, multiSelection) {
        this.currentIndex = 0;
        this.currentlyExpanded = false;
        this.expanded = typeof expanded !== 'undefined' ? expanded : false;
        this.multiSelection = typeof multiSelection !== 'undefined' ? multiSelection : false;

        if (this.multiSelection)
            this.expanded = true;

        this.optionselector = document.getElementById(id);

        if (this.optionselector == null) {
            console.error('The OptionSelector with the ID #' + this.id + ' doesn\'t exist');
            return;
        }

        this.optionselector_ul = this.optionselector.querySelectorAll('ul')[0];
        if (this.optionselector_ul == null)
            return;

        if (this.optionselector_ul.length == 0)
            return;


        this.optionselector_ul_li = this.optionselector.querySelectorAll('li');
        if (this.optionselector_ul == null)
            return;
        if (this.optionselector_ul_li.length == 0)
            return;

        [].forEach.call(this.optionselector_ul_li, function (elm) {
            elm.addEventListener('click', this.__onClicked.bind(this, elm), false);
        }.bind(this));

        if (this.expanded) {
            this.__open();
            this.optionselector_ul_li[0].classList.add('active');
        }
        else {
            if (this.currentlyExpanded) {
                this.__open();
                this.optionselector_ul_li[0].classList.add('active');
            } else {
                this.__close(this.currentIndex);
                this.optionselector_ul_li[0].classList.add('closed');
            }
        }
    }

    OptionSelector.prototype = {

        /**
         * @private
         */
        __onClicked: function (elm, e) {
            __values = "";
            this.currentIndex = 0;

            if (this.expanded) {
                if (!this.multiSelection) {
                    [].forEach.call(this.optionselector_ul_li, function (elm) {
                        elm.classList.remove('active');
                    });
                    elm.classList.toggle('active');
                }
                else {
                    elm.classList.toggle('active');
                }
            }
            else {

                for(i = 0, max = this.optionselector_ul_li.length; i < max; i++) {
                    if (this.optionselector_ul_li[i]==elm) break;
                    this.currentIndex++;
                }

                if (this.currentlyExpanded) {
                    this.__close(this.currentIndex);
                    elm.classList.add('active');
                    elm.classList.add('closed');
                    elm.style.borderTop = '0';
                }
                else {
                    elm.classList.add('active');
                    elm.classList.remove('closed');
                    this.__open();
                    elm.style.borderTop = '1px solid #C7C7C7';
                }
            }

            k = 0;
            for (i = 0, max = this.optionselector_ul_li.length; i < max; i++) {
                var li = this.optionselector_ul_li[i];
                if ((li.className).indexOf('active') > -1) {
                    if (k === 0) {
                        __values = li.getAttribute("data-value");
                    } else {
                        __values = __values + ", " + li.getAttribute("data-value");
                    }
                    k++;
                }
            }

            if (!this.currentlyExpanded && !this.expanded) {
                this.__ClickEvent(elm);
            }
            else {
                if (this.expanded) {
                    this.__ClickEvent(elm);
                }
            }

            e.preventDefault();
        },

        /**
         * @private
         */
        __ClickEvent: function (elm) {
            elm._evt = document.createEvent('Event');
            elm._evt.initEvent('onclicked', true, true);
            elm._evt.values = __values;
            elm.dispatchEvent(elm._evt);
        },

        /**
         * @private
         */
        __open: function () {
            this.optionselector_ul.style['-webkit-transition-duration'] = '.4s';
            this.optionselector_ul.style.webkitTransform = 'translate3d(0, 0rem,0)';
            this.optionselector.style.height = 3.07*this.optionselector_ul_li.length + 'rem';
            this.currentlyExpanded = true;
        },

        /**
         * @private
         */
        __close: function (currentIndex) {
            this.optionselector_ul.style['-webkit-transition-duration'] = '.4s';
            this.optionselector_ul.style.webkitTransform = 'translate3d(0,' + -3*currentIndex + 'rem,0)';
            this.optionselector.style.height = '3rem';
            [].forEach.call(this.optionselector_ul_li, function (elm) {
                elm.classList.remove('active');
            });
            this.currentlyExpanded = false;
        },

        onClicked : function(callback){
            this.optionselector_ul.addEventListener("onclicked", callback);
        }
    };
    return OptionSelector;
})();

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
 *i18n is a context property that provides internationalization support.
*/
var i18n = (function () {
    var defaultLocale = 'en-US';

    function i18n() {
        this.rtl = ["ar", "dv", "fa", "ha", "he", "ks", "ku", "ps", "ur", "yi"];
        this.i18nElements = [];

        this.userLocale = navigator.language || navigator.userLanguage;
        this.userLocale = "en";

        console.log("[i18n] Using " + this.userLocale + " as locale");

        var nodes = document.getElementsByTagName('*'),
            n = nodes.length;

        for (var i = 0; i < n; i++) {
            if (nodes[i].getAttribute('data-i18n-id'))
                this.i18nElements.push(nodes[i]);
        }
        console.log(this.i18nElements);
        this.__getLocalesLink();
        this.__getI18nDict(this.userLocale);
    }

    i18n.prototype = {


        __load: function (url) {
            var t = this;
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, /*async: */ true);
            if (xhr.overrideMimeType) {
                xhr.overrideMimeType('application/json; charset=utf-8');
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200 || xhr.status === 0) {
                        var data = JSON.parse(xhr.responseText);
                        // Pass on the contents for parsing
                        t.__parse(url, data);
                    } else {
                        new Error('Failed to load ' + url);
                    }
                }
            };
            xhr.send(null);

        },

        /**
         * @private
         */
        __getI18nDict: function (lang) {

        },

        /**
         * @private
         */
        __getLocalesLink: function () {
            var locales_index = document.querySelector('link[type="application/i18n"]').getAttribute('href');
            console.log(locales_index);
            this.__load(locales_index);
            return;
        },

        __parse: function (url, data) {
            console.log(url);
            console.log(data);
            if (typeof data[this.userLocale] != 'undefined') {
                this.__load(data[this.userLocale]);
            }
        }
    };


    return i18n;
})();
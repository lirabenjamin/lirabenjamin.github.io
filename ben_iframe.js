/**
 * VERSION 0.1
 * Wharton namespace.
 * @namespace
 */
var Wharton = Wharton || {

    /**
     * Qualtrics Iframe Wrapper.
     * @namespace
     * @memberof Wharton
     */
    iframe: (function () {

        function setup_iframe(src, width, height) {
            const iframe = document.createElement('IFRAME')
            iframe.setAttribute('src', src)
            iframe.setAttribute('id', 'whartoniframe')
            iframe.style.width = width
            iframe.style.height = height
            iframe.style.border = '0'
            iframe.style.overflow = 'hidden'
            return iframe
        }



        function isSafari() {
            var ua = navigator.userAgent.toLowerCase();
            return ((ua.indexOf('safari') != -1) && (ua.indexOf('chrome') === -1));
        }
        function setIframeFocus() {
            const iframe = window.document.querySelector('iframe')
            iframe.focus();
            if (isSafari()) {
                window.setTimeout(function () {
                    iframe.contentWindow.focus();
                }, 100)
            }
        }

        function objectToURLParams(obj) {
            const params = new URLSearchParams();

            // Loop through the object properties and add them as URL parameters
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    params.append(key, obj[key]);
                }
            }

            // Convert the URLSearchParams object to a string of URL parameters
            return params.toString();
        }

        /**
         * Displays an application within an iframe on the webpage.
         * @function show_app
         * @memberof Wharton.iframe
         * @param {Object} [options] - An object containing various options for the application display.
         * @param {number} [options.app_options = {}] - Options to be passed as query params to the app
         * @param {Function} [options.eventer_callback = () => {}] - A callback function to be executed when an event is received from the iframe.
         * @param {string} options.base_url - The base URL of the application to be displayed in the iframe.
         * @param {Object} [options.qualtrics_context] - A context object related to Qualtrics, which may contain additional data needed for the application.
         */
        function show_app({
            app_options = {},
            eventer_callback,
            base_url,
            qualtrics_context
        } = {}
        ) {
            const URL_OPTIONS = objectToURLParams(app_options)
            console.log(URL_OPTIONS);
            const URL = `${base_url}?${URL_OPTIONS}`
            const iframe = setup_iframe(URL, '100%', '600px')
            jQuery('#Wrapper').hide()
            jQuery('.Skin')[0].insert(iframe)
            window.scrollTo(0, 0)
            iframe.onload = setIframeFocus;
            var eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent'
            var eventer = window[eventMethod]
            var messageEvent = eventMethod == 'attachEvent' ? 'onmessage' : 'message'
            eventer(
                messageEvent,
                function (e) {
                    if (typeof eventer_callback === 'function') {
                        eventer_callback(e, qualtrics_context)
                    }
                })
        }
        return {
            show_app: show_app,
        }
    })()
}
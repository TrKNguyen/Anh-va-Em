/*!
 * Project : simply-countdown
 * File : simplyCountdown
 * Date : 27/06/2015
 * License : MIT
 * Version : 1.3.2
 * Author : Vincent Loy <vincent.loy1@gmail.com>
 * Contributors : 
 *  - Justin Beasley <JustinB@harvest.org>
 *  - Nathan Smith <NathanS@harvest.org>
 */
/*global window, document*/
(function (exports) {
    'use strict';

    var // functions
        extend,
        createElements,
        createCountdownElt,
        simplyCountdown;

    /**
     * Function that merge user parameters with defaults one.
     * @param out
     * @returns {*|{}}
     */
    extend = function (out) {
        var i,
            obj,
            key;
        out = out || {};

        for (i = 1; i < arguments.length; i += 1) {
            obj = arguments[i];

            if (obj) {
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (typeof obj[key] === 'object') {
                            extend(out[key], obj[key]);
                        } else {
                            out[key] = obj[key];
                        }
                    }
                }
            }
        }

        return out;
    };

    /**
     * Function that create a countdown section
     * @param countdown
     * @param parameters
     * @param typeClass
     * @returns {{full: (*|Element), amount: (*|Element), word: (*|Element)}}
     */
    createCountdownElt = function (countdown, parameters, typeClass) {
        var innerSectionTag,
            sectionTag,
            amountTag,
            wordTag;

        sectionTag = document.createElement('div');
        amountTag = document.createElement('span');
        wordTag = document.createElement('span');
        innerSectionTag = document.createElement('div');

        innerSectionTag.appendChild(amountTag);
        innerSectionTag.appendChild(wordTag);
        sectionTag.appendChild(innerSectionTag);

        sectionTag.classList.add(parameters.sectionClass);
        sectionTag.classList.add(typeClass);
        amountTag.classList.add(parameters.amountClass);
        wordTag.classList.add(parameters.wordClass);

        countdown.appendChild(sectionTag);

        return {
            full: sectionTag,
            amount: amountTag,
            word: wordTag
        };
    };

    /**
     * Function that create full countdown DOM elements calling createCountdownElt
     * @param parameters
     * @param countdown
     * @returns {{days: (*|Element), hours: (*|Element), minutes: (*|Element), seconds: (*|Element)}}
     */
    createElements = function (parameters, countdown) {
        var spanTag;

        if (!parameters.inline) {
            return {
                days: createCountdownElt(countdown, parameters, 'simply-days-section'),
                hours: createCountdownElt(countdown, parameters, 'simply-hours-section'),
                minutes: createCountdownElt(countdown, parameters, 'simply-minutes-section'),
                seconds: createCountdownElt(countdown, parameters, 'simply-seconds-section')
            };
        }

        spanTag = document.createElement('span');
        spanTag.classList.add(parameters.inlineClass);
        return spanTag;
    };

    /**
     * simplyCountdown, create and display the coundtown.
     * @param elt
     * @param args (parameters)
     */
    simplyCountdown = function (elt, args) {
        var parameters = extend({
                year: 2015,
                month: 6,
                day: 28,
                hours: 0,
                minutes: 0,
                seconds: 0,
				displayAsDay: false,
                words: NUI_DATE_LANGUAGE,
                plural: true,
                inline: false,
                enableUtc: true,
                onEnd: function () {
                    return;
                },
                refresh: 1000,
                inlineClass: 'simply-countdown-inline',
                sectionClass: 'simply-section',
                amountClass: 'simply-amount',
                wordClass: 'simply-word',
                zeroPad: false
            }, args),
            interval,
            targetDate,
            targetTmpDate,
            now,
            nowUtc,
            secondsLeft,
            secondsNui,
            days,
            hours,
            minutes,
            seconds,
            cd = document.querySelectorAll(elt);

        targetTmpDate = new Date(
            parameters.year,
            parameters.month - 1,
            parameters.day,
            parameters.hours,
            parameters.minutes,
            parameters.seconds
        );

        if (parameters.enableUtc) {
            targetDate = new Date(
                /*targetTmpDate.getUTCFullYear(),
                targetTmpDate.getUTCMonth(),*/
                targetTmpDate.getUTCDate(),
                targetTmpDate.getUTCHours(),
                targetTmpDate.getUTCMinutes(),
                targetTmpDate.getUTCSeconds()
            );
        } else {
            targetDate = targetTmpDate;
        }

        Array.prototype.forEach.call(cd, function (countdown) {
            var fullCountDown = createElements(parameters, countdown),
                refresh;

            refresh = function () {
                var dayWord,
                    hourWord,
                    minuteWord,
                    secondWord;

                now = new Date();
                if (parameters.enableUtc) {
                    nowUtc = new Date(now.getFullYear(), now.getMonth(), now.getDate(),
                        now.getHours(), now.getMinutes(), now.getSeconds());
                    secondsNui = (nowUtc.getTime() - targetDate) / 1000;

                } else {
                    secondsNui = (now.getTime() - targetDate) / 1000;
                }
				
				//get year data
				var nuiyear = 0;
				for (nuiyear = 0 ; true; nuiyear++) {
					var dtemp1 = new Date(targetDate.getTime());
					dtemp1.setYear(parameters.year + nuiyear);
					if (dtemp1.getTime() - now.getTime() < 0) {
						continue;
					} else {
						nuiyear--;
						break;
					}
				}
				
				var dtemp = new Date(targetDate.getTime());
				dtemp = new Date(parameters.year + nuiyear,
					parameters.month - 1,
					parameters.day,
					parameters.hours,
					parameters.minutes,
					parameters.seconds);
				var timegap = now.getTime() - dtemp.getTime();
				dtemp.setDate(1);
				dtemp.setMonth(0);
				dtemp.setTime(dtemp.getTime() + timegap);
				console.log(timegap)
				//console.log(nuiyear, dtemp.getMonth(), dtemp.getDate()-1, dtemp.getHours());
				
				//maping
				days = nuiyear;
				hours = dtemp.getMonth();
                var now1 = new Date(); 
                var next = new Date('2023-02-22 00:00:00')
                var timegapnew = now1.getTime() - next.getTime();
				minutes = Math.floor(timegapnew/ (1000 * 3600 * 24));
                //minutes = timegapnew/ (1000 * 3600 * 24)
                //minutes = ;
				seconds = dtemp.getHours();
                var pthh = dtemp.getMinutes();
                var ptkk = dtemp.getSeconds();
                /*if (secondsNui > 0) {
					
					
                    days = parseInt(secondsNui / 86400, 10);
                    secondsNui = secondsNui % 86400;

                    hours = parseInt(secondsNui / 3600, 10);
                    secondsNui = secondsNui % 3600;

                    minutes = parseInt(secondsNui / 60, 10);
                    seconds = parseInt(secondsNui % 60, 10);
                } else {
                    days = 0;
                    hours = 0;
                    minutes = 0;
                    seconds = 0;
                    window.clearInterval(interval);
                    parameters.onEnd();
                }*/

                if (parameters.plural) {
                    dayWord = days > 1
                        ? parameters.words.days + parameters.words.pluralLetter
                        : parameters.words.days;

                    hourWord = hours > 1
                        ? parameters.words.hours + parameters.words.pluralLetter
                        : parameters.words.hours;

                    minuteWord = minutes > 1
                        ? parameters.words.minutes + parameters.words.pluralLetter
                        : parameters.words.minutes;

                    secondWord = seconds > 1
                        ? parameters.words.seconds + parameters.words.pluralLetter
                        : parameters.words.seconds;

                } else {
                    dayWord = parameters.words.days;
                    hourWord = parameters.words.hours;
                    minuteWord = parameters.words.minutes;
                    secondWord = parameters.words.seconds;
                }

                /* display an inline countdown into a span tag */
                if (parameters.inline) {
                    countdown.innerHTML =
                        days + ' ' + dayWord + ', ' +
                        hours + ' ' + hourWord + ', ' +
                        minutes + ' ' + minuteWord + ', ' +
                        seconds + ' ' + secondWord + '.';

                } else {
                    fullCountDown.days.amount.textContent = (parameters.zeroPad && minutes.toString().length < 2 ? '0' : '') + minutes +" :";
                    fullCountDown.days.word.textContent = "Day";

                    fullCountDown.hours.amount.textContent = (seconds.toString().length < 2 ? '0' : '') + seconds +" :";
                    fullCountDown.hours.word.textContent = "Hour";

                    fullCountDown.minutes.amount.textContent = (pthh.toString().length < 2 ? '0' : '') + pthh+" :";
                    fullCountDown.minutes.word.textContent = "Minute";

                    fullCountDown.seconds.amount.textContent = (ptkk.toString().length < 2 ? '0' : '') + ptkk;
                    fullCountDown.seconds.word.textContent = "Second";
                }
            };

            // Refresh immediately to prevent a Flash of Unstyled Content
            refresh();
            interval = window.setInterval(refresh, parameters.refresh);
        });
    };

    exports.simplyCountdown = simplyCountdown;
}(window));

/*global $, jQuery, simplyCountdown*/
if (window.jQuery) {
    (function ($, simplyCountdown) {
        'use strict';

        function simplyCountdownify(el, options) {
            simplyCountdown(el, options);
        }

        $.fn.simplyCountdown = function (options) {
            return simplyCountdownify(this.selector, options);
        };
    }(jQuery, simplyCountdown));
}

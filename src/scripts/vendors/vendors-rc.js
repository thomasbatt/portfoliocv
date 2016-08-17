(function(window, angular, undefined) {
    'use strict';
    var ngRouteModule = angular.module('ngRoute', ['ng']).provider('$route', $RouteProvider),
        $routeMinErr = angular.$$minErr('ngRoute');

    function $RouteProvider() {
        function inherit(parent, extra) {
            return angular.extend(Object.create(parent), extra);
        }
        var routes = {};
        this.when = function(path, route) {
            var routeCopy = angular.copy(route);
            if (angular.isUndefined(routeCopy.reloadOnSearch)) {
                routeCopy.reloadOnSearch = true;
            }
            if (angular.isUndefined(routeCopy.caseInsensitiveMatch)) {
                routeCopy.caseInsensitiveMatch = this.caseInsensitiveMatch;
            }
            routes[path] = angular.extend(routeCopy, path && pathRegExp(path, routeCopy));
            if (path) {
                var redirectPath = (path[path.length - 1] == '/') ? path.substr(0, path.length - 1) : path + '/';
                routes[redirectPath] = angular.extend({
                    redirectTo: path
                }, pathRegExp(redirectPath, routeCopy));
            }
            return this;
        };
        this.caseInsensitiveMatch = false;

        function pathRegExp(path, opts) {
            var insensitive = opts.caseInsensitiveMatch,
                ret = {
                    originalPath: path,
                    regexp: path
                },
                keys = ret.keys = [];
            path = path.replace(/([().])/g, '\\$1').replace(/(\/)?:(\w+)([\?\*])?/g, function(_, slash, key, option) {
                var optional = option === '?' ? option : null;
                var star = option === '*' ? option : null;
                keys.push({
                    name: key,
                    optional: !!optional
                });
                slash = slash || '';
                return '' + (optional ? '' : slash) + '(?:' + (optional ? slash : '') + (star && '(.+?)' || '([^/]+)') + (optional || '') + ')' + (optional || '');
            }).replace(/([\/$\*])/g, '\\$1');
            ret.regexp = new RegExp('^' + path + '$', insensitive ? 'i' : '');
            return ret;
        }
        this.otherwise = function(params) {
            if (typeof params === 'string') {
                params = {
                    redirectTo: params
                };
            }
            this.when(null, params);
            return this;
        };
        this.$get = ['$rootScope', '$location', '$routeParams', '$q', '$injector', '$templateRequest', '$sce', function($rootScope, $location, $routeParams, $q, $injector, $templateRequest, $sce) {
            var forceReload = false,
                preparedRoute, preparedRouteIsUpdateOnly, $route = {
                    routes: routes,
                    reload: function() {
                        forceReload = true;
                        $rootScope.$evalAsync(function() {
                            prepareRoute();
                            commitRoute();
                        });
                    },
                    updateParams: function(newParams) {
                        if (this.current && this.current.$$route) {
                            newParams = angular.extend({}, this.current.params, newParams);
                            $location.path(interpolate(this.current.$$route.originalPath, newParams));
                            $location.search(newParams);
                        } else {
                            throw $routeMinErr('norout', 'Tried updating route when with no current route');
                        }
                    }
                };
            $rootScope.$on('$locationChangeStart', prepareRoute);
            $rootScope.$on('$locationChangeSuccess', commitRoute);
            return $route;

            function switchRouteMatcher(on, route) {
                var keys = route.keys,
                    params = {};
                if (!route.regexp) return null;
                var m = route.regexp.exec(on);
                if (!m) return null;
                for (var i = 1, len = m.length; i < len; ++i) {
                    var key = keys[i - 1];
                    var val = m[i];
                    if (key && val) {
                        params[key.name] = val;
                    }
                }
                return params;
            }

            function prepareRoute($locationEvent) {
                var lastRoute = $route.current;
                preparedRoute = parseRoute();
                preparedRouteIsUpdateOnly = preparedRoute && lastRoute && preparedRoute.$$route === lastRoute.$$route && angular.equals(preparedRoute.pathParams, lastRoute.pathParams) && !preparedRoute.reloadOnSearch && !forceReload;
                if (!preparedRouteIsUpdateOnly && (lastRoute || preparedRoute)) {
                    if ($rootScope.$broadcast('$routeChangeStart', preparedRoute, lastRoute).defaultPrevented) {
                        if ($locationEvent) {
                            $locationEvent.preventDefault();
                        }
                    }
                }
            }

            function commitRoute() {
                var lastRoute = $route.current;
                var nextRoute = preparedRoute;
                if (preparedRouteIsUpdateOnly) {
                    lastRoute.params = nextRoute.params;
                    angular.copy(lastRoute.params, $routeParams);
                    $rootScope.$broadcast('$routeUpdate', lastRoute);
                } else if (nextRoute || lastRoute) {
                    forceReload = false;
                    $route.current = nextRoute;
                    if (nextRoute) {
                        if (nextRoute.redirectTo) {
                            if (angular.isString(nextRoute.redirectTo)) {
                                $location.path(interpolate(nextRoute.redirectTo, nextRoute.params)).search(nextRoute.params).replace();
                            } else {
                                $location.url(nextRoute.redirectTo(nextRoute.pathParams, $location.path(), $location.search())).replace();
                            }
                        }
                    }
                    $q.when(nextRoute).then(function() {
                        if (nextRoute) {
                            var locals = angular.extend({}, nextRoute.resolve),
                                template, templateUrl;
                            angular.forEach(locals, function(value, key) {
                                locals[key] = angular.isString(value) ? $injector.get(value) : $injector.invoke(value, null, null, key);
                            });
                            if (angular.isDefined(template = nextRoute.template)) {
                                if (angular.isFunction(template)) {
                                    template = template(nextRoute.params);
                                }
                            } else if (angular.isDefined(templateUrl = nextRoute.templateUrl)) {
                                if (angular.isFunction(templateUrl)) {
                                    templateUrl = templateUrl(nextRoute.params);
                                }
                                if (angular.isDefined(templateUrl)) {
                                    nextRoute.loadedTemplateUrl = $sce.valueOf(templateUrl);
                                    template = $templateRequest(templateUrl);
                                }
                            }
                            if (angular.isDefined(template)) {
                                locals['$template'] = template;
                            }
                            return $q.all(locals);
                        }
                    }).then(function(locals) {
                        if (nextRoute == $route.current) {
                            if (nextRoute) {
                                nextRoute.locals = locals;
                                angular.copy(nextRoute.params, $routeParams);
                            }
                            $rootScope.$broadcast('$routeChangeSuccess', nextRoute, lastRoute);
                        }
                    }, function(error) {
                        if (nextRoute == $route.current) {
                            $rootScope.$broadcast('$routeChangeError', nextRoute, lastRoute, error);
                        }
                    });
                }
            }

            function parseRoute() {
                var params, match;
                angular.forEach(routes, function(route, path) {
                    if (!match && (params = switchRouteMatcher($location.path(), route))) {
                        match = inherit(route, {
                            params: angular.extend({}, $location.search(), params),
                            pathParams: params
                        });
                        match.$$route = route;
                    }
                });
                return match || routes[null] && inherit(routes[null], {
                    params: {},
                    pathParams: {}
                });
            }

            function interpolate(string, params) {
                var result = [];
                angular.forEach((string || '').split(':'), function(segment, i) {
                    if (i === 0) {
                        result.push(segment);
                    } else {
                        var segmentMatch = segment.match(/(\w+)(?:[?*])?(.*)/);
                        var key = segmentMatch[1];
                        result.push(params[key]);
                        result.push(segmentMatch[2] || '');
                        delete params[key];
                    }
                });
                return result.join('');
            }
        }];
    }
    ngRouteModule.provider('$routeParams', $RouteParamsProvider);

    function $RouteParamsProvider() {
        this.$get = function() {
            return {};
        };
    }
    ngRouteModule.directive('ngView', ngViewFactory);
    ngRouteModule.directive('ngView', ngViewFillContentFactory);
    ngViewFactory.$inject = ['$route', '$anchorScroll', '$animate'];

    function ngViewFactory($route, $anchorScroll, $animate) {
        return {
            restrict: 'ECA',
            terminal: true,
            priority: 400,
            transclude: 'element',
            link: function(scope, $element, attr, ctrl, $transclude) {
                var currentScope, currentElement, previousLeaveAnimation, autoScrollExp = attr.autoscroll,
                    onloadExp = attr.onload || '';
                scope.$on('$routeChangeSuccess', update);
                update();

                function cleanupLastView() {
                    if (previousLeaveAnimation) {
                        $animate.cancel(previousLeaveAnimation);
                        previousLeaveAnimation = null;
                    }
                    if (currentScope) {
                        currentScope.$destroy();
                        currentScope = null;
                    }
                    if (currentElement) {
                        previousLeaveAnimation = $animate.leave(currentElement);
                        previousLeaveAnimation.then(function() {
                            previousLeaveAnimation = null;
                        });
                        currentElement = null;
                    }
                }

                function update() {
                    var locals = $route.current && $route.current.locals,
                        template = locals && locals.$template;
                    if (angular.isDefined(template)) {
                        var newScope = scope.$new();
                        var current = $route.current;
                        var clone = $transclude(newScope, function(clone) {
                            $animate.enter(clone, null, currentElement || $element).then(function onNgViewEnter() {
                                if (angular.isDefined(autoScrollExp) && (!autoScrollExp || scope.$eval(autoScrollExp))) {
                                    $anchorScroll();
                                }
                            });
                            cleanupLastView();
                        });
                        currentElement = clone;
                        currentScope = current.scope = newScope;
                        currentScope.$emit('$viewContentLoaded');
                        currentScope.$eval(onloadExp);
                    } else {
                        cleanupLastView();
                    }
                }
            }
        };
    }
    ngViewFillContentFactory.$inject = ['$compile', '$controller', '$route'];

    function ngViewFillContentFactory($compile, $controller, $route) {
        return {
            restrict: 'ECA',
            priority: -400,
            link: function(scope, $element) {
                var current = $route.current,
                    locals = current.locals;
                $element.html(locals.$template);
                var link = $compile($element.contents());
                if (current.controller) {
                    locals.$scope = scope;
                    var controller = $controller(current.controller, locals);
                    if (current.controllerAs) {
                        scope[current.controllerAs] = controller;
                    }
                    $element.data('$ngControllerController', controller);
                    $element.children().data('$ngControllerController', controller);
                }
                scope[current.resolveAs || '$resolve'] = locals;
                link(scope);
            }
        };
    }
})(window, window.angular);
var duScrollDefaultEasing = function(x) {
    'use strict';
    if (x < 0.5) {
        return Math.pow(x * 2, 2) / 2;
    }
    return 1 - Math.pow((1 - x) * 2, 2) / 2;
};
var duScroll = angular.module('duScroll', ['duScroll.scrollspy', 'duScroll.smoothScroll', 'duScroll.scrollContainer', 'duScroll.spyContext', 'duScroll.scrollHelpers']).value('duScrollDuration', 350).value('duScrollSpyWait', 100).value('duScrollGreedy', false).value('duScrollOffset', 0).value('duScrollEasing', duScrollDefaultEasing).value('duScrollCancelOnEvents', 'scroll mousedown mousewheel touchmove keydown').value('duScrollBottomSpy', false).value('duScrollActiveClass', 'active');
if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = duScroll;
}
angular.module('duScroll.scrollHelpers', ['duScroll.requestAnimation']).run(["$window", "$q", "cancelAnimation", "requestAnimation", "duScrollEasing", "duScrollDuration", "duScrollOffset", "duScrollCancelOnEvents", function($window, $q, cancelAnimation, requestAnimation, duScrollEasing, duScrollDuration, duScrollOffset, duScrollCancelOnEvents) {
    'use strict';
    var proto = {};
    var isDocument = function(el) {
        return (typeof HTMLDocument !== 'undefined' && el instanceof HTMLDocument) || (el.nodeType && el.nodeType === el.DOCUMENT_NODE);
    };
    var isElement = function(el) {
        return (typeof HTMLElement !== 'undefined' && el instanceof HTMLElement) || (el.nodeType && el.nodeType === el.ELEMENT_NODE);
    };
    var unwrap = function(el) {
        return isElement(el) || isDocument(el) ? el : el[0];
    };
    proto.duScrollTo = function(left, top, duration, easing) {
        var aliasFn;
        if (angular.isElement(left)) {
            aliasFn = this.duScrollToElement;
        } else if (angular.isDefined(duration)) {
            aliasFn = this.duScrollToAnimated;
        }
        if (aliasFn) {
            return aliasFn.apply(this, arguments);
        }
        var el = unwrap(this);
        if (isDocument(el)) {
            return $window.scrollTo(left, top);
        }
        el.scrollLeft = left;
        el.scrollTop = top;
    };
    var scrollAnimation, deferred;
    proto.duScrollToAnimated = function(left, top, duration, easing) {
        if (duration && !easing) {
            easing = duScrollEasing;
        }
        var startLeft = this.duScrollLeft(),
            startTop = this.duScrollTop(),
            deltaLeft = Math.round(left - startLeft),
            deltaTop = Math.round(top - startTop);
        var startTime = null,
            progress = 0;
        var el = this;
        var cancelScrollAnimation = function($event) {
            if (!$event || (progress && $event.which > 0)) {
                if (duScrollCancelOnEvents) {
                    el.unbind(duScrollCancelOnEvents, cancelScrollAnimation);
                }
                cancelAnimation(scrollAnimation);
                deferred.reject();
                scrollAnimation = null;
            }
        };
        if (scrollAnimation) {
            cancelScrollAnimation();
        }
        deferred = $q.defer();
        if (duration === 0 || (!deltaLeft && !deltaTop)) {
            if (duration === 0) {
                el.duScrollTo(left, top);
            }
            deferred.resolve();
            return deferred.promise;
        }
        var animationStep = function(timestamp) {
            if (startTime === null) {
                startTime = timestamp;
            }
            progress = timestamp - startTime;
            var percent = (progress >= duration ? 1 : easing(progress / duration));
            el.scrollTo(startLeft + Math.ceil(deltaLeft * percent), startTop + Math.ceil(deltaTop * percent));
            if (percent < 1) {
                scrollAnimation = requestAnimation(animationStep);
            } else {
                if (duScrollCancelOnEvents) {
                    el.unbind(duScrollCancelOnEvents, cancelScrollAnimation);
                }
                scrollAnimation = null;
                deferred.resolve();
            }
        };
        el.duScrollTo(startLeft, startTop);
        if (duScrollCancelOnEvents) {
            el.bind(duScrollCancelOnEvents, cancelScrollAnimation);
        }
        scrollAnimation = requestAnimation(animationStep);
        return deferred.promise;
    };
    proto.duScrollToElement = function(target, offset, duration, easing) {
        var el = unwrap(this);
        if (!angular.isNumber(offset) || isNaN(offset)) {
            offset = duScrollOffset;
        }
        var top = this.duScrollTop() + unwrap(target).getBoundingClientRect().top - offset;
        if (isElement(el)) {
            top -= el.getBoundingClientRect().top;
        }
        return this.duScrollTo(0, top, duration, easing);
    };
    proto.duScrollLeft = function(value, duration, easing) {
        if (angular.isNumber(value)) {
            return this.duScrollTo(value, this.duScrollTop(), duration, easing);
        }
        var el = unwrap(this);
        if (isDocument(el)) {
            return $window.scrollX || document.documentElement.scrollLeft || document.body.scrollLeft;
        }
        return el.scrollLeft;
    };
    proto.duScrollTop = function(value, duration, easing) {
        if (angular.isNumber(value)) {
            return this.duScrollTo(this.duScrollLeft(), value, duration, easing);
        }
        var el = unwrap(this);
        if (isDocument(el)) {
            return $window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
        }
        return el.scrollTop;
    };
    proto.duScrollToElementAnimated = function(target, offset, duration, easing) {
        return this.duScrollToElement(target, offset, duration || duScrollDuration, easing);
    };
    proto.duScrollTopAnimated = function(top, duration, easing) {
        return this.duScrollTop(top, duration || duScrollDuration, easing);
    };
    proto.duScrollLeftAnimated = function(left, duration, easing) {
        return this.duScrollLeft(left, duration || duScrollDuration, easing);
    };
    angular.forEach(proto, function(fn, key) {
        angular.element.prototype[key] = fn;
        var unprefixed = key.replace(/^duScroll/, 'scroll');
        if (angular.isUndefined(angular.element.prototype[unprefixed])) {
            angular.element.prototype[unprefixed] = fn;
        }
    });
}]);
angular.module('duScroll.polyfill', []).factory('polyfill', ["$window", function($window) {
    'use strict';
    var vendors = ['webkit', 'moz', 'o', 'ms'];
    return function(fnName, fallback) {
        if ($window[fnName]) {
            return $window[fnName];
        }
        var suffix = fnName.substr(0, 1).toUpperCase() + fnName.substr(1);
        for (var key, i = 0; i < vendors.length; i++) {
            key = vendors[i] + suffix;
            if ($window[key]) {
                return $window[key];
            }
        }
        return fallback;
    };
}]);
angular.module('duScroll.requestAnimation', ['duScroll.polyfill']).factory('requestAnimation', ["polyfill", "$timeout", function(polyfill, $timeout) {
    'use strict';
    var lastTime = 0;
    var fallback = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = $timeout(function() {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
    return polyfill('requestAnimationFrame', fallback);
}]).factory('cancelAnimation', ["polyfill", "$timeout", function(polyfill, $timeout) {
    'use strict';
    var fallback = function(promise) {
        $timeout.cancel(promise);
    };
    return polyfill('cancelAnimationFrame', fallback);
}]);
angular.module('duScroll.spyAPI', ['duScroll.scrollContainerAPI']).factory('spyAPI', ["$rootScope", "$timeout", "$window", "$document", "scrollContainerAPI", "duScrollGreedy", "duScrollSpyWait", "duScrollBottomSpy", "duScrollActiveClass", function($rootScope, $timeout, $window, $document, scrollContainerAPI, duScrollGreedy, duScrollSpyWait, duScrollBottomSpy, duScrollActiveClass) {
    'use strict';
    var createScrollHandler = function(context) {
        var timer = false,
            queued = false;
        var handler = function() {
            queued = false;
            var container = context.container,
                containerEl = container[0],
                containerOffset = 0,
                bottomReached;
            if (typeof HTMLElement !== 'undefined' && containerEl instanceof HTMLElement || containerEl.nodeType && containerEl.nodeType === containerEl.ELEMENT_NODE) {
                containerOffset = containerEl.getBoundingClientRect().top;
                bottomReached = Math.round(containerEl.scrollTop + containerEl.clientHeight) >= containerEl.scrollHeight;
            } else {
                var documentScrollHeight = $document[0].body.scrollHeight || $document[0].documentElement.scrollHeight;
                bottomReached = Math.round($window.pageYOffset + $window.innerHeight) >= documentScrollHeight;
            }
            var compareProperty = (duScrollBottomSpy && bottomReached ? 'bottom' : 'top');
            var i, currentlyActive, toBeActive, spies, spy, pos;
            spies = context.spies;
            currentlyActive = context.currentlyActive;
            toBeActive = undefined;
            for (i = 0; i < spies.length; i++) {
                spy = spies[i];
                pos = spy.getTargetPosition();
                if (!pos) continue;
                if ((duScrollBottomSpy && bottomReached) || (pos.top + spy.offset - containerOffset < 20 && (duScrollGreedy || pos.top * -1 + containerOffset) < pos.height)) {
                    if (!toBeActive || toBeActive[compareProperty] < pos[compareProperty]) {
                        toBeActive = {
                            spy: spy
                        };
                        toBeActive[compareProperty] = pos[compareProperty];
                    }
                }
            }
            if (toBeActive) {
                toBeActive = toBeActive.spy;
            }
            if (currentlyActive === toBeActive || (duScrollGreedy && !toBeActive)) return;
            if (currentlyActive) {
                currentlyActive.$element.removeClass(duScrollActiveClass);
                $rootScope.$broadcast('duScrollspy:becameInactive', currentlyActive.$element, angular.element(currentlyActive.getTargetElement()));
            }
            if (toBeActive) {
                toBeActive.$element.addClass(duScrollActiveClass);
                $rootScope.$broadcast('duScrollspy:becameActive', toBeActive.$element, angular.element(toBeActive.getTargetElement()));
            }
            context.currentlyActive = toBeActive;
        };
        if (!duScrollSpyWait) {
            return handler;
        }
        return function() {
            if (!timer) {
                handler();
                timer = $timeout(function() {
                    timer = false;
                    if (queued) {
                        handler();
                    }
                }, duScrollSpyWait, false);
            } else {
                queued = true;
            }
        };
    };
    var contexts = {};
    var createContext = function($scope) {
        var id = $scope.$id;
        var context = {
            spies: []
        };
        context.handler = createScrollHandler(context);
        contexts[id] = context;
        $scope.$on('$destroy', function() {
            destroyContext($scope);
        });
        return id;
    };
    var destroyContext = function($scope) {
        var id = $scope.$id;
        var context = contexts[id],
            container = context.container;
        if (container) {
            container.off('scroll', context.handler);
        }
        delete contexts[id];
    };
    var defaultContextId = createContext($rootScope);
    var getContextForScope = function(scope) {
        if (contexts[scope.$id]) {
            return contexts[scope.$id];
        }
        if (scope.$parent) {
            return getContextForScope(scope.$parent);
        }
        return contexts[defaultContextId];
    };
    var getContextForSpy = function(spy) {
        var context, contextId, scope = spy.$scope;
        if (scope) {
            return getContextForScope(scope);
        }
        for (contextId in contexts) {
            context = contexts[contextId];
            if (context.spies.indexOf(spy) !== -1) {
                return context;
            }
        }
    };
    var isElementInDocument = function(element) {
        while (element.parentNode) {
            element = element.parentNode;
            if (element === document) {
                return true;
            }
        }
        return false;
    };
    var addSpy = function(spy) {
        var context = getContextForSpy(spy);
        if (!context) return;
        context.spies.push(spy);
        if (!context.container || !isElementInDocument(context.container)) {
            if (context.container) {
                context.container.off('scroll', context.handler);
            }
            context.container = scrollContainerAPI.getContainer(spy.$scope);
            context.container.on('scroll', context.handler).triggerHandler('scroll');
        }
    };
    var removeSpy = function(spy) {
        var context = getContextForSpy(spy);
        if (spy === context.currentlyActive) {
            $rootScope.$broadcast('duScrollspy:becameInactive', context.currentlyActive.$element);
            context.currentlyActive = null;
        }
        var i = context.spies.indexOf(spy);
        if (i !== -1) {
            context.spies.splice(i, 1);
        }
        spy.$element = null;
    };
    return {
        addSpy: addSpy,
        removeSpy: removeSpy,
        createContext: createContext,
        destroyContext: destroyContext,
        getContextForScope: getContextForScope
    };
}]);
angular.module('duScroll.scrollContainerAPI', []).factory('scrollContainerAPI', ["$document", function($document) {
    'use strict';
    var containers = {};
    var setContainer = function(scope, element) {
        var id = scope.$id;
        containers[id] = element;
        return id;
    };
    var getContainerId = function(scope) {
        if (containers[scope.$id]) {
            return scope.$id;
        }
        if (scope.$parent) {
            return getContainerId(scope.$parent);
        }
        return;
    };
    var getContainer = function(scope) {
        var id = getContainerId(scope);
        return id ? containers[id] : $document;
    };
    var removeContainer = function(scope) {
        var id = getContainerId(scope);
        if (id) {
            delete containers[id];
        }
    };
    return {
        getContainerId: getContainerId,
        getContainer: getContainer,
        setContainer: setContainer,
        removeContainer: removeContainer
    };
}]);
angular.module('duScroll.smoothScroll', ['duScroll.scrollHelpers', 'duScroll.scrollContainerAPI']).directive('duSmoothScroll', ["duScrollDuration", "duScrollOffset", "scrollContainerAPI", function(duScrollDuration, duScrollOffset, scrollContainerAPI) {
    'use strict';
    return {
        link: function($scope, $element, $attr) {
            $element.on('click', function(e) {
                if ((!$attr.href || $attr.href.indexOf('#') === -1) && $attr.duSmoothScroll === '') return;
                var id = $attr.href ? $attr.href.replace(/.*(?=#[^\s]+$)/, '').substring(1) : $attr.duSmoothScroll;
                var target = document.getElementById(id) || document.getElementsByName(id)[0];
                if (!target || !target.getBoundingClientRect) return;
                if (e.stopPropagation) e.stopPropagation();
                if (e.preventDefault) e.preventDefault();
                var offset = $attr.offset ? parseInt($attr.offset, 10) : duScrollOffset;
                var duration = $attr.duration ? parseInt($attr.duration, 10) : duScrollDuration;
                var container = scrollContainerAPI.getContainer($scope);
                container.duScrollToElement(angular.element(target), isNaN(offset) ? 0 : offset, isNaN(duration) ? 0 : duration);
            });
        }
    };
}]);
angular.module('duScroll.spyContext', ['duScroll.spyAPI']).directive('duSpyContext', ["spyAPI", function(spyAPI) {
    'use strict';
    return {
        restrict: 'A',
        scope: true,
        compile: function compile(tElement, tAttrs, transclude) {
            return {
                pre: function preLink($scope, iElement, iAttrs, controller) {
                    spyAPI.createContext($scope);
                }
            };
        }
    };
}]);
angular.module('duScroll.scrollContainer', ['duScroll.scrollContainerAPI']).directive('duScrollContainer', ["scrollContainerAPI", function(scrollContainerAPI) {
    'use strict';
    return {
        restrict: 'A',
        scope: true,
        compile: function compile(tElement, tAttrs, transclude) {
            return {
                pre: function preLink($scope, iElement, iAttrs, controller) {
                    iAttrs.$observe('duScrollContainer', function(element) {
                        if (angular.isString(element)) {
                            element = document.getElementById(element);
                        }
                        element = (angular.isElement(element) ? angular.element(element) : iElement);
                        scrollContainerAPI.setContainer($scope, element);
                        $scope.$on('$destroy', function() {
                            scrollContainerAPI.removeContainer($scope);
                        });
                    });
                }
            };
        }
    };
}]);
angular.module('duScroll.scrollspy', ['duScroll.spyAPI']).directive('duScrollspy', ["spyAPI", "duScrollOffset", "$timeout", "$rootScope", function(spyAPI, duScrollOffset, $timeout, $rootScope) {
    'use strict';
    var Spy = function(targetElementOrId, $scope, $element, offset) {
        if (angular.isElement(targetElementOrId)) {
            this.target = targetElementOrId;
        } else if (angular.isString(targetElementOrId)) {
            this.targetId = targetElementOrId;
        }
        this.$scope = $scope;
        this.$element = $element;
        this.offset = offset;
    };
    Spy.prototype.getTargetElement = function() {
        if (!this.target && this.targetId) {
            this.target = document.getElementById(this.targetId) || document.getElementsByName(this.targetId)[0];
        }
        return this.target;
    };
    Spy.prototype.getTargetPosition = function() {
        var target = this.getTargetElement();
        if (target) {
            return target.getBoundingClientRect();
        }
    };
    Spy.prototype.flushTargetCache = function() {
        if (this.targetId) {
            this.target = undefined;
        }
    };
    return {
        link: function($scope, $element, $attr) {
            var href = $attr.ngHref || $attr.href;
            var targetId;
            if (href && href.indexOf('#') !== -1) {
                targetId = href.replace(/.*(?=#[^\s]+$)/, '').substring(1);
            } else if ($attr.duScrollspy) {
                targetId = $attr.duScrollspy;
            } else if ($attr.duSmoothScroll) {
                targetId = $attr.duSmoothScroll;
            }
            if (!targetId) return;
            var timeoutPromise = $timeout(function() {
                var spy = new Spy(targetId, $scope, $element, -($attr.offset ? parseInt($attr.offset, 10) : duScrollOffset));
                spyAPI.addSpy(spy);
                $scope.$on('$locationChangeSuccess', spy.flushTargetCache.bind(spy));
                var deregisterOnStateChange = $rootScope.$on('$stateChangeSuccess', spy.flushTargetCache.bind(spy));
                $scope.$on('$destroy', function() {
                    spyAPI.removeSpy(spy);
                    deregisterOnStateChange();
                });
            }, 0, false);
            $scope.$on('$destroy', function() {
                $timeout.cancel(timeoutPromise);
            });
        }
    };
}]);
'use strict';
angular.module('angular-parallax', []).directive('parallax', ['$window', function($window) {
    return {
        restrict: 'A',
        scope: {
            parallaxRatio: '@',
            parallaxVerticalOffset: '@',
            parallaxHorizontalOffset: '@',
        },
        link: function($scope, elem, attrs) {
            var setPosition = function() {
                var calcValY = $window.pageYOffset * ($scope.parallaxRatio ? $scope.parallaxRatio : 1.1);
                if (calcValY <= $window.innerHeight) {
                    var topVal = (calcValY < $scope.parallaxVerticalOffset ? $scope.parallaxVerticalOffset : calcValY);
                    elem.css('transform', 'translate(' + $scope.parallaxHorizontalOffset + 'px, ' + topVal + 'px)');
                }
            };
            setPosition();
            angular.element($window).bind("scroll", setPosition);
            angular.element($window).bind("touchmove", setPosition);
        }
    };
}]).directive('parallaxBackground', ['$window', function($window) {
    return {
        restrict: 'A',
        transclude: true,
        template: '<div ng-transclude></div>',
        scope: {
            parallaxRatio: '@',
        },
        link: function($scope, elem, attrs) {
            var setPosition = function() {
                var calcValY = (elem.prop('offsetTop') - $window.pageYOffset) * ($scope.parallaxRatio ? $scope.parallaxRatio : 1.1);
                elem.css('background-position', "left " + calcValY + "px");
            };
            angular.element($window).bind('load', function(e) {
                setPosition();
                $scope.$apply();
            });
            angular.element($window).bind("scroll", setPosition);
            angular.element($window).bind("touchmove", setPosition);
        }
    };
}]);
window.matchMedia || (window.matchMedia = function() {
    "use strict";
    var styleMedia = (window.styleMedia || window.media);
    if (!styleMedia) {
        var style = document.createElement('style'),
            script = document.getElementsByTagName('script')[0],
            info = null;
        style.type = 'text/css';
        style.id = 'matchmediajs-test';
        script.parentNode.insertBefore(style, script);
        info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;
        styleMedia = {
            matchMedium: function(media) {
                var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';
                if (style.styleSheet) {
                    style.styleSheet.cssText = text;
                } else {
                    style.textContent = text;
                }
                return info.width === '1px';
            }
        };
    }
    return function(media) {
        return {
            matches: styleMedia.matchMedium(media || 'all'),
            media: media || 'all'
        };
    };
}());
(function() {
    'use strict';
    angular.module('ngTooltip', []).directive('tooltip', tooltip);

    function tooltip($rootScope) {
        var directive = {
            restrict: 'A',
            link: link
        }
        return directive;

        function link(scope, element, attrs) {
            var tooltip, container, span, arrow = {};
            var enter, leave, move;
            scope.$on('ngTooltip:hide', function() {
                leave();
                element.off('mouseenter');
                element.off('mouseleave');
                element.off('mousemove');
            });
            scope.$on('ngTooltip:show', function() {
                element.on('mouseenter', enter);
                element.on('mouseleave', leave);
                element.on('mousemove', move);
            });
            enter = function() {
                if (container) {
                    leave();
                }
                container = angular.element('<div></div>').addClass('tooltip').append('<span>' + attrs.tooltip + '</span><div class="arrow"></div>');
                $('body').append(container);
                tooltip = angular.element(container)[0];
                span = tooltip.querySelector('span');
                arrow = tooltip.querySelector('.arrow');
                arrow.style.left = +$(span).width() / 2 + 'px';
                span.style.width = +$(span).width() + 15 + 'px';
            };
            leave = function() {
                $('body').find(container).remove();
                tooltip, container, span, arrow = {};
            };
            move = function(e) {
                var x = (e.clientX - +$(span).width() / 2 - 5) + 'px',
                    y = (e.clientY - 45) + 'px';
                tooltip.style.display = 'block';
                tooltip.style.width = +$(span).width() + 15 + 'px';
                tooltip.style.top = y;
                tooltip.style.left = x;
            };
            element.on('mouseenter', enter);
            element.on('mouseleave', leave);
            element.on('mousemove', move);
        }
    }
})();
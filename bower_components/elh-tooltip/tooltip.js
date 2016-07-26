(function (angular) {

	'use strict';

	angular.module('interface').directive('tooltip', tooltipDirective);

	function tooltipDirective($timeout) {
		return {
			restrict: 'A',
			link: tooltipLink,
			templateUrl: './tooltip.html',
			scope: {
				tooltip: '@',
			},
		};

		function tooltipLink(scope, element) {
			var childElement = null;
			var width = null;

			$timeout(function () {
				childElement = angular.element(element[0].firstElementChild);
				width = (childElement[0].offsetWidth / 2) + (element[0].offsetWidth / 2);

				childElement.css({
					top: element[0].offsetTop + (element[0].offsetHeight / 2) + 'px',
					left: element[0].offsetLeft - width + 'px',
				});
			});

			element
				.on('mouseenter', function () {
					$timeout(function () {
						element.addClass('active');
					});
				}).on('mouseleave', function () {
					$timeout(function () {
						element.removeClass('active');
					});
				});
		}
	}
})(window.angular);
var async = require('async');

module.exports.jangle = function () {
	var
		responseArgs,
		errored = false,
		links = [],
		detectFn;

	var self = {
		seq: function() {
			var
				args = Array.prototype.slice.call(arguments),
				fn = args.shift();

			links.push(function(callback) {
				args.push(callback);
				fn.apply(fn, args);
			});

			return self;
		},
		detect: function(fn) {
			detectFn = function(error) {
				if (error || fn.apply(fn, arguments)) {
					responseArgs = Array.prototype.slice.call(arguments);
				}
			};
			return self;
		},
		error: function(fn) {
			var error = [responseArgs ? responseArgs.shift() : null];
			if (error[0]) {
				fn.apply(fn, error);
				errored = true;
			}
			return self;
		},
		run: function(fn) {
			async.forEachSeries(links, function(linkFn, done) {

				linkFn.bind(linkFn, function() {
					var stop = false;
					if (detectFn) {
						stop = detectFn.apply(detectFn, arguments);
					}
					done(stop);
				})();

			}, function() {
				if (!errored) {
					fn.apply(fn, responseArgs);
				}
			});
		}
	};

	return self;
};
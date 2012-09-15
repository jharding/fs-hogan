#
# Run command line tests
#
test:
	@ node test/run.js test/index.html

#
# Run hulk tests
#
hulk:
	@ node test/hulk.js

#
# Run Mustache spec tests
#
spec:
	@ node test/spec.js

#
# Run benchmark
#
benchmark:
	@ node benchmark/console/index.js

.PHONY: test spec benchmark

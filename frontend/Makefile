
# Path to this Makefile.
self := $(abspath $(lastword ${MAKEFILE_LIST}))


.PHONY: run
run:	# Run the frontend.
	npm start

.PHONY: test-all
test-all: test test-mut	# Run all tests.

.PHONY: test
test:	# Run unit tests.
	npm test

.PHONY: test-mut
test-mut:	# Run mutation tests.
	npx stryker run

.PHONY: mut
mut: test-mut	# Alias for `test-mut`.

.PHONY: coverage
coverage:	# Get test line coverage.
	npm run coverage

.PHONY: visualize
visualize:	# Visualize frontend components in isolation.
	npm run storybook

.PHONY: help
help:	# Generate a list of targets.
	@cat ${self} | grep '^[[:alnum:]_-]*:' | \
		sed 's/^\([[:alnum:]_-]*\):[[:space:][:alnum:]_-]*/\1\t\t/' | sort



# Path to this Makefile.
self := $(abspath $(lastword ${MAKEFILE_LIST}))

.PHONY: run
run:	# Run the project.
	mvn spring-boot:run

.PHONY: compile
compile:	# Compile the project without running.
	mvn compile

.PHONY: package
package:	# Package the package into a JAR.
	mvn package

.PHONY: test-all
test-all: test test-mut	# Run all tests.

.PHONY: test
test:	# Run unit tests.
	mvn test

.PHONY: test-mut
test-mut:	# Run mutation tests.
	mvn test org.pitest:pitest-maven:mutationCoverage

.PHONY: mut
mut: test-mut	# Alias for `test-mut`.

.PHONY: test-report
test-report:	# Generate a test report.
	mvn test jacoco:report

.PHONY: clean
clean:	# Clean up package artifacts.
	mvn clean

.PHONY: help
help:	# Generate a list of targets.
	@cat ${self} | grep '^[[:alnum:]_-]*:' | \
		sed 's/^\([[:alnum:]_-]*\):[[:space:][:alnum:]_-]*/\1\t\t/' | sort

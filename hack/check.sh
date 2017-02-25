#!/bin/bash
# The script does automatic checking on a Go package and its sub-packages, including:
# 1. gofmt         (http://golang.org/cmd/gofmt/)
# 2. goimports     (https://github.com/bradfitz/goimports)
# 3. golint        (https://github.com/golang/lint)
# 4. go vet        (http://golang.org/cmd/vet)
# 5. race detector (http://blog.golang.org/race-detector)
# 6. test coverage (http://blog.golang.org/cover)

set -e

GO="go"

# Run test coverage on each subdirectories and merge the coverage profile.

echo "mode: count" > go-coverage.txt

# Standard $GO tooling behavior is to ignore dirs with leading underscors
for dir in $(find . -maxdepth 10 -not -path './.git*' -not -path './Godeps*' -not -path './contrib*' -type d);
do
    if ls $dir/*.go &> /dev/null; then
	$GO test -v -race -covermode=atomic -coverprofile="$dir/profile.tmp" "$dir"
	if [ -f $dir/profile.tmp ]
	then
            cat $dir/profile.tmp | tail -n +2 >> go-coverage.txt
            rm $dir/profile.tmp
	fi
    fi
done

$GO tool cover -func go-coverage.txt

#!/bin/bash

# exit on error
set -e

# Usage
function usage {
cat << EOF
usage: $0 [options] URL [firefox options]

Run firefox against the JSCover URL and wait for the report to be generated.

OPTIONS:
   -h      Help
   -f      Specify which firefox binary to use (default: $DEFAULT_FIREFOX)
   -r      Report directory (default: $DEFAULT_REPORTDIR)
   -t      Timeout in seconds (0 for no timeout, default: $DEFAULT_TIMEOUT)
   -v      Verbose
EOF
}

# If verbose is enabled echo the given message
function v {
    if [ $verbose -ne 0 ]
    then
        echo $*
    fi
}

# Parse options and args
DEFAULT_TIMEOUT=300
timeout=$DEFAULT_TIMEOUT

basedir=$(cd $(dirname $0) && pwd)
DEFAULT_REPORTDIR=${basedir}/reports/jasmine
reportdir=$DEFAULT_REPORTDIR

DEFAULT_FIREFOX=firefox
firefox=$DEFAULT_FIREFOX

verbose=0

while getopts "hf:r:t:v" option
do
    case $option in
        h)
            usage
            exit
            ;;
        f)
            firefox=$OPTARG
            ;;
        r)
            reportdir=$OPTARG
            ;;
        t)
            timeout=$OPTARG
            ;;
        v)
            verbose=1
            ;;
    esac
done

shift $(($OPTIND - 1))
url=$1

if [ -z $url ]
then
    echo "URL is required"
    usage
    exit 1
fi

shift
firefox_opts=$*

# Clear out report directory so we can detect when it's created
rm -rf $reportdir

# Start running the tests in the background with firefox
$firefox $firefox_opts $url &
firefox_pid=$!

# kill firefox on exit
trap "ps -p $firefox_pid >&- && kill $firefox_pid" EXIT

# Track time spent so we can timeout if need be
start=$(date +%s)

# Run the tests waiting for the report dir to be created or for a timeout
while true
do
    timespent=$(( $(date +%s) - $start ))
    if [ $timespent -gt $timeout ]
    then
        v "Timeout"
        exit 1
    fi

    if [ -d src/public/test/reports/jasmine/ ]
    then
        v "Report created!"
        exit
    fi

    if ! ps -p $firefox_pid >&-;
    then
        v "Firefox closed without generating a report"
        exit 1
    fi

    sleep 1
done


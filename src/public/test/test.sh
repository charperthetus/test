#! /bin/sh

# test.sh - shell script used by maven to star/stop JSCover server
#
# Usage: test.sh [start|stop]

ROOTDIR="$( cd "$( dirname "$0")" && pwd )"
COMMAND=$1

if [[ $COMMAND == "start" ]]; then
	echo 'Starting JSCover in background...'

    # NOTE: this assumes we are running in ${project.basedir}/src  If not, all these directories are broken

    # DEVOPS: this path for the JAR will likely need to be updated..
	java -jar ~/.m2/repository/com/github/tntim96/JSCover/0.3.0/JSCover-0.3.0.jar -ws --document-root=public --report-dir=public/test/reports --no-instrument=ext --no-instrument=test > $ROOTDIR/jscover.out 2> $ROOTDIR/jscover.err < /dev/null &

	echo $! > $ROOTDIR/jscover.pid
fi

if [[ $COMMAND == "stop" ]]; then
    echo 'Stopping JSCover...'

	PID=`cat $ROOTDIR/jscover.pid`
	kill $PID

    echo 'Cleaning up JSCover files...'

	rm -f $ROOTDIR/jscover.out $ROOTDIR/jscover.err $ROOTDIR/jscover.pid
fi

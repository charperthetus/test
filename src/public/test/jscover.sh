#! /bin/sh

# jscover.sh - shell script used by maven to star/stop JSCover server
#
# Usage: jscover.sh [start|stop]

ROOTDIR="$( cd "$( dirname "$0")" && pwd )"
COMMAND=$1
REPORT_DIR=$2

if [[ $COMMAND == "start" ]]; then
	echo "Starting JSCover in background with reportdir $REPORT_DIR ..."

    # NOTE: this assumes we are running in ${project.basedir}/src  If not, all these directories are broken

    # DEVOPS: this path for the JAR will likely need to be updated..
    # NOTE: the flexpaper code is currently being left out of instrumentation as it is not being actively worked...
	java -jar ~/.m2/repository/com/github/tntim96/JSCover/0.3.0/JSCover-0.3.0.jar -ws --document-root=public --report-dir=../target --no-instrument=ext --no-instrument=resources --no-instrument=test --no-instrument=app/flexpaper > $ROOTDIR/jscover.out 2> $ROOTDIR/jscover.err < /dev/null &

	echo $! > $ROOTDIR/jscover.pid
fi

if [[ $COMMAND == "stop" ]]; then
    echo 'Stopping JSCover...'

	PID=`cat $ROOTDIR/jscover.pid`
	kill $PID

    echo 'Cleaning up JSCover files...'

	rm -f $ROOTDIR/jscover.out $ROOTDIR/jscover.err $ROOTDIR/jscover.pid

    echo 'Creating Cobertura reports...'

    if [ ! -d "$REPORT_DIR" ]; then
        mkdir -p $REPORT_DIR
    fi

  	java -cp ~/.m2/repository/com/github/tntim96/JSCover/0.3.0/JSCover-0.3.0.jar jscover.report.Main --format=COBERTURAXML $REPORT_DIR $REPORT_DIR/original-src/app > $ROOTDIR/jscover-report.out 2> $ROOTDIR/jscover-report.err < /dev/null &

    echo 'Cleaning up JSCover report files...'

    rm -f  $ROOTDIR/jscover-report.out $ROOTDIR/jscover-report.err
fi

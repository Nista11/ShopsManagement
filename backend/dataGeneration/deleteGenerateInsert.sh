#!/bin/bash

if [ $# -ne 2 ]; then
    echo "Usage: $0 inserts batches"
    exit 1
fi

./generateScripts.out -i $1 -b $2 --all &
./deleteAllRecords.exp &

wait

./generateAll.exp &

wait

exit 0
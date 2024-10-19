#!/bin/bash

# 'app'을 포함한 프로세스 ID를 가져옵니다.
pids=$(ps -ef | grep vue | grep -v grep | awk '{print $2}')

# 프로세스 ID가 존재하는 경우에만 종료합니다.
if [ -n "$pids" ]; then
    for pid in $pids; do
        echo "Killing process $pid"
        kill "$pid"
    done
else
    echo "No processes found for 'app'."
fi

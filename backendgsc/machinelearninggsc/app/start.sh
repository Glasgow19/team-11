#!/bin/bash
source env/bin/activate
python3 server.py 8080 &
python3 server.py 8081 &
python3 server.py 8082 &
python3 server.py 8083 &


